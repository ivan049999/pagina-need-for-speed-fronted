# Pagina Need for Speed — Frontend

Landing y web app temática **Need for Speed** con Next.js, TypeScript y Tailwind.

## Requisitos

- Node.js 20+
- npm 10+

## Inicio rápido

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run lint` | ESLint |
| `npm run typecheck` | Verificación TypeScript |
| `npm run test` | Tests unitarios (Vitest) |
| `npm run test:e2e` | Tests E2E (Playwright) |

## Estructura principal

```
src/
├── app/              # Rutas Next.js (App Router)
├── components/       # UI reutilizable
├── features/         # Módulos por dominio
├── hooks/
├── lib/
├── types/
└── config/
public/               # Imágenes, fuentes, vídeos
tests/                # unit + e2e
```

Ver [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) para más detalle.
