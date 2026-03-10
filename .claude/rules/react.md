---
globs: ["src/**/*.tsx"]
---

# React 19 Rules

- No APIs legacy: no `forwardRef` (usar `ref` prop directo), no `React.FC`, no `React.memo` sin necesidad medida.
- Preferir `function` components con nombre sobre arrow functions para componentes top-level.
- Props como `type Props = { ... }` (no `interface`).
- Destructurar props en la firma de la función: `function Button({ variant, children }: Props)`.
- No prefijo `React.` para tipos — importar directo: `import { type ReactNode } from "react"`.
- Named exports siempre — no default exports para componentes.
- Keys estables y únicas — nunca usar índice de array como key.
- Hooks: respetar reglas de hooks, usar `use()` para promises y context donde aplique.
- Eventos: tipar handlers con tipos de React (`MouseEvent`, `ChangeEvent`, etc.).
- Composición sobre herencia — usar children y render props, no HOCs.
