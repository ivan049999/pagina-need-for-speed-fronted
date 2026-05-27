-- =============================================================================
-- Need for Speed — Esquema inicial para Supabase
-- Ejecutar en: Supabase Dashboard → SQL Editor → New query → Run
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Tipos enumerados
-- -----------------------------------------------------------------------------
CREATE TYPE public.car_tier AS ENUM (
  'D', 'C', 'B', 'A', 'S', 'S_PLUS', 'X'
);

-- -----------------------------------------------------------------------------
-- 2. Tablas
-- -----------------------------------------------------------------------------

-- Perfiles de piloto (vinculados a auth.users de Supabase Auth)
CREATE TABLE public.profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  pilot_name    TEXT NOT NULL,
  first_name    TEXT,
  last_name     TEXT,
  birth_date    DATE,
  country_code  TEXT,
  language_code TEXT DEFAULT 'es',
  phone_dial_code TEXT,
  phone_number    TEXT,
  phone_verified  BOOLEAN NOT NULL DEFAULT false,
  two_factor_enabled BOOLEAN NOT NULL DEFAULT false,
  two_factor_method  TEXT,
  secondary_email TEXT,
  secondary_email_verified BOOLEAN NOT NULL DEFAULT false,
  avatar_url    TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.profiles IS 'Datos públicos del piloto; id = auth.users.id';

-- Catálogo de coches (sección Coches)
CREATE TABLE public.cars (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          TEXT NOT NULL UNIQUE,
  name          TEXT NOT NULL,
  description   TEXT NOT NULL DEFAULT '',
  tier          public.car_tier NOT NULL,
  featured      BOOLEAN NOT NULL DEFAULT FALSE,
  image_url     TEXT NOT NULL DEFAULT '',
  top_speed     INTEGER NOT NULL CHECK (top_speed > 0),
  acceleration  SMALLINT NOT NULL CHECK (acceleration BETWEEN 1 AND 10),
  brand         TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.cars IS 'Catálogo global de vehículos NFS';

-- Garaje del usuario (sección Garaje) — hasta 6 slots por piloto
CREATE TABLE public.garage_entries (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES public.profiles (id) ON DELETE CASCADE,
  car_id        UUID NOT NULL REFERENCES public.cars (id) ON DELETE CASCADE,
  slot_number   SMALLINT NOT NULL CHECK (slot_number BETWEEN 1 AND 6),
  nickname      TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, slot_number),
  UNIQUE (user_id, car_id)
);

COMMENT ON TABLE public.garage_entries IS 'Coches guardados por cada piloto en su garaje';

-- Clasificación / leaderboard (sección Clasificación)
CREATE TABLE public.leaderboard_entries (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES public.profiles (id) ON DELETE CASCADE,
  car_id          UUID NOT NULL REFERENCES public.cars (id) ON DELETE RESTRICT,
  track_slug      TEXT NOT NULL DEFAULT 'palm-city',
  lap_time_ms     INTEGER NOT NULL CHECK (lap_time_ms > 0),
  recorded_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, car_id, track_slug)
);

COMMENT ON TABLE public.leaderboard_entries IS 'Mejor vuelta por piloto, coche y circuito';
COMMENT ON COLUMN public.leaderboard_entries.lap_time_ms IS 'Tiempo en milisegundos (ej. 1:42.08 → 102080)';

-- Noticias (sección Noticias)
CREATE TABLE public.news_articles (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          TEXT NOT NULL UNIQUE,
  title         TEXT NOT NULL,
  excerpt       TEXT NOT NULL DEFAULT '',
  content       TEXT NOT NULL DEFAULT '',
  published_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_published  BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.news_articles IS 'Artículos y novedades del sitio';

-- -----------------------------------------------------------------------------
-- 3. Índices (rendimiento)
-- -----------------------------------------------------------------------------
CREATE INDEX idx_cars_slug ON public.cars (slug);
CREATE INDEX idx_cars_featured ON public.cars (featured) WHERE featured = TRUE;
CREATE INDEX idx_cars_tier ON public.cars (tier);

CREATE INDEX idx_garage_user ON public.garage_entries (user_id);

CREATE INDEX idx_leaderboard_track_time ON public.leaderboard_entries (track_slug, lap_time_ms);
CREATE INDEX idx_leaderboard_user ON public.leaderboard_entries (user_id);

CREATE INDEX idx_news_slug ON public.news_articles (slug);
CREATE INDEX idx_news_published ON public.news_articles (published_at DESC)
  WHERE is_published = TRUE;

-- -----------------------------------------------------------------------------
-- 4. Vista de clasificación (ranking calculado)
-- -----------------------------------------------------------------------------
CREATE OR REPLACE VIEW public.leaderboard_ranked
WITH (security_invoker = true)
AS
SELECT
  ROW_NUMBER() OVER (
    PARTITION BY le.track_slug
    ORDER BY le.lap_time_ms ASC
  )::INTEGER AS rank,
  le.id,
  le.track_slug,
  le.lap_time_ms,
  (
    FLOOR(le.lap_time_ms / 60000)::TEXT || ':' ||
    LPAD(FLOOR((le.lap_time_ms % 60000) / 1000)::TEXT, 2, '0') || '.' ||
    LPAD(FLOOR((le.lap_time_ms % 1000) / 10)::TEXT, 2, '0')
  ) AS lap_time_display,
  p.id AS user_id,
  p.pilot_name,
  c.id AS car_id,
  c.name AS car_name,
  c.slug AS car_slug,
  le.recorded_at
FROM public.leaderboard_entries le
JOIN public.profiles p ON p.id = le.user_id
JOIN public.cars c ON c.id = le.car_id;

COMMENT ON VIEW public.leaderboard_ranked IS 'Clasificación con posición; usar en /leaderboard';

-- -----------------------------------------------------------------------------
-- 5. Funciones y triggers
-- -----------------------------------------------------------------------------

-- Actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_cars_updated_at
  BEFORE UPDATE ON public.cars
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_news_updated_at
  BEFORE UPDATE ON public.news_articles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Crear perfil al registrarse un usuario en Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, pilot_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'pilot_name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data ->> 'avatar_url'
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- -----------------------------------------------------------------------------
-- 6. Row Level Security (RLS)
-- -----------------------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.garage_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaderboard_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;

-- profiles: lectura pública de nombres; edición solo del propio perfil
CREATE POLICY "profiles_select_public"
  ON public.profiles FOR SELECT
  TO anon, authenticated
  USING (TRUE);

CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- cars: catálogo legible por todos
CREATE POLICY "cars_select_public"
  ON public.cars FOR SELECT
  TO anon, authenticated
  USING (TRUE);

-- garage: solo el dueño ve y gestiona su garaje
CREATE POLICY "garage_select_own"
  ON public.garage_entries FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "garage_insert_own"
  ON public.garage_entries FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "garage_update_own"
  ON public.garage_entries FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "garage_delete_own"
  ON public.garage_entries FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- leaderboard: lectura pública; cada piloto registra sus propias vueltas
CREATE POLICY "leaderboard_select_public"
  ON public.leaderboard_entries FOR SELECT
  TO anon, authenticated
  USING (TRUE);

CREATE POLICY "leaderboard_insert_own"
  ON public.leaderboard_entries FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "leaderboard_update_own"
  ON public.leaderboard_entries FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- news: solo artículos publicados visibles para visitantes
CREATE POLICY "news_select_published"
  ON public.news_articles FOR SELECT
  TO anon, authenticated
  USING (is_published = TRUE);

-- -----------------------------------------------------------------------------
-- 7. Datos de ejemplo (opcional — mismos mocks que el frontend)
-- -----------------------------------------------------------------------------
INSERT INTO public.cars (slug, name, description, tier, featured, image_url, top_speed, acceleration, brand)
VALUES
  (
    'porsche-911-gt3',
    'Porsche 911 GT3',
    'Icono de pista con equilibrio perfecto entre grip y potencia.',
    'S_PLUS',
    TRUE,
    '/images/cars/porsche-911-gt3.webp',
    318,
    9,
    'Porsche'
  ),
  (
    'nissan-skyline-gtr',
    'Nissan Skyline GT-R',
    'Leyenda JDM preparada para dominio urbano.',
    'S',
    TRUE,
    '/images/cars/nissan-skyline-gtr.webp',
    305,
    8,
    'Nissan'
  ),
  (
    'mclaren-p1',
    'McLaren P1',
    'Hiperdeportivo híbrido con tecnología de F1.',
    'X',
    FALSE,
    '/images/cars/mclaren-p1.webp',
    350,
    10,
    'McLaren'
  )
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.news_articles (slug, title, excerpt, content, published_at)
VALUES
  (
    'nuevo-modo-carrera',
    'Nuevo modo carrera nocturna',
    'Explora Palm City bajo las luces de neón.',
    'Contenido completo del artículo...',
    '2026-05-20 10:00:00+00'
  ),
  (
    'actualizacion-garaje',
    'Actualización del garaje virtual',
    'Más slots y personalización de liveries.',
    'Contenido completo del artículo...',
    '2026-05-15 10:00:00+00'
  )
ON CONFLICT (slug) DO NOTHING;

-- Perfiles y leaderboard de demo (requieren usuarios en auth.users;
-- descomenta y sustituye los UUID cuando tengas usuarios reales)
/*
INSERT INTO public.profiles (id, pilot_name) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Ghost_Racer'),
  ('00000000-0000-0000-0000-000000000002', 'NeonDrift');

INSERT INTO public.leaderboard_entries (user_id, car_id, track_slug, lap_time_ms)
SELECT
  '00000000-0000-0000-0000-000000000001',
  c.id,
  'palm-city',
  102080
FROM public.cars c WHERE c.slug = 'porsche-911-gt3';
*/
