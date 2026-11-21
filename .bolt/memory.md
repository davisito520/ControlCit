# Project memory

## Product intent & audience

- Hospital/clinic management system with a role-based access screen.
- User roles: **recepcionista** (receptionist) and **médico** (doctor); doctors can be associated with a user when relevant.
- Users are created through an in-app form and persisted locally so they survive page reloads.

## Brand personality & voice

- UI language: **Spanish**.
- Professional healthcare tone; clean and trustworthy presentation.

## Visual design & UX direction

- Main access screen uses a local hospital photo as full-screen background with a dark overlay for legibility.
- Title styled with **serif italic** font for prominence/elegance.
- Persistent "Agregar usuario" button/form to create new users (select role, associate doctor if needed).
- Removed: test user cards and the helper text "Seleccione un usuario de prueba para entrar con un clic".
- Stack: Vite + React (JSX), Tailwind CSS, lucide-react icons; `@/` path alias for `src/`.

## Decisions, constraints & rationale

- All test/predefined users removed from the data file — no leftover references.
- New users stored in browser localStorage (no backend for user persistence yet).
- Background image referenced as a local asset, not remote URL.
- Dark overlay layer applied over background image to maintain text contrast.

## Open questions & assumptions

- Exact background image path/asset name not yet confirmed.
- Login/auth flow after selecting or creating a user not yet detailed.
- Whether doctor association is required only for "médico" role or optional for all roles — assumed role-dependent.
- No explicit color palette or typography system defined yet beyond the serif italic title.