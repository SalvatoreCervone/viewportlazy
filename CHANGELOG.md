# Changelog

All notable changes to `@salvatorecervone/viewportlazy` will be documented in this file.

## [2.1.0] - 2026-08-21

### Added
- **Composable API**: Added `useViewportLazy(targetRef, options)` to easily observe visibility with reactive state (`isVisible`, `stop`, `start`).
- **Directive API**: Added `v-viewport-lazy` directive supporting callbacks, objects, and modifiers (`.once`).
- **Placeholder Slot**: Added `#placeholder` slot to `<ViewPortLazy>` to render skeletons or fallback UI before entering viewport (zero CLS).
- **Props Enhancements**: Added `rootMargin`, `threshold`, `once`, `tag`, and `minHeight` props to `<ViewPortLazy>`.
- **TypeScript Support**: Full TypeScript declarations and type definitions (`.d.ts`).
- **Modern Build System**: Migrated to Vite Library Mode supporting standard ESM (`.mjs`) and UMD (`.umd.cjs`).
- **Interactive Playground**: Added local Vite playground (`npm run dev`).
- **Vitest Test Suite**: Added automated unit tests for component, composable, and directive.
- **Documentation**: Added `CONTRIBUTING.md` and updated `README.md`.

### Changed
- Default `delayAllView` changed to `0` for instantaneous viewport detection (configurable).
- Output bundles correctly exported in `package.json` under `exports`, `main`, `module`, and `types`.

## [2.0.0]

- Initial Vue 3 component release.
