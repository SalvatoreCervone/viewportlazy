# Contributing to ViewPortLazy

Thank you for your interest in contributing to `@salvatorecervone/viewportlazy`!

## Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SalvatoreCervone/viewportlazy.git
   cd viewportlazy
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the local playground:**
   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev`: Starts the interactive demo playground on `http://localhost:3000`.
- `npm run build`: Compiles the library bundles into `dist/` (ESM, UMD, and TypeScript declarations).
- `npm run test`: Runs the Vitest automated test suite.
- `npm run test:watch`: Runs tests in watch mode.

## Pull Request Guidelines

1. Ensure tests pass before opening a PR:
   ```bash
   npm run test
   ```
2. Verify that the build succeeds without warnings:
   ```bash
   npm run build
   ```
3. Add tests for new features or bug fixes whenever appropriate.
4. Keep commit messages clear and descriptive.

## License

By contributing to this repository, you agree that your contributions will be licensed under the [MIT License](LICENSE.md).
