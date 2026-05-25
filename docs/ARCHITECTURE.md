# Arquitectura

## Stack

- **Next.js 15** (App Router)
- **React 19** + **TypeScript**
- **Tailwind CSS**

## Organización

| Carpeta | Responsabilidad |
|---------|-----------------|
| `src/app` | Rutas, layouts, API routes |
| `src/components` | UI compartida (layout, ui, sections) |
| `src/features` | Dominio por feature (cars, garage, news…) |
| `src/lib` | Utilidades y cliente API |
| `src/types` | Tipos globales |
| `public` | Assets estáticos |

## Convención feature-based

Cada feature en `src/features/<nombre>/` contiene:

- `components/` — UI del dominio
- `services/` — Lógica de datos
- `data/` — Mocks / fixtures
- `hooks/` — Estado cliente (si aplica)
