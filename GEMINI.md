# Workspace Directives

## Toolchain & Environment

- **Package Manager:** Exclusively use `pnpm`. NEVER use `npm` or `yarn`.
- **Node Environment:** Managed by `mise`. Ensure any scripts or package executions are routed through `pnpm run`.

## Vue 3 & Type Checking

- This is a Vue 3 project.
- **CRITICAL:** Do NOT evaluate TypeScript errors in `.vue` files using standard TS static analysis. It will fail.
- To check for type errors, run `pnpm run type-check` (or the equivalent `vue-tsc` script) and read the terminal output. Do not hallucinate errors.

## Formatting & Linting

- Strictly adhere to the project's Prettier and ESLint configurations.
- Before suggesting stylistic or formatting changes, use your file-read tools to parse `.prettierrc` (or `prettier.config.js`) and the ESLint config.

## Testing

Testing is not implemented yet, do not attempt for now
