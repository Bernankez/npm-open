# npm-open

[![npm](https://img.shields.io/npm/v/@bernankez/npm-open?color=red&label=npm)](https://www.npmjs.com/package/@bernankez/npm-open)
[![CI](https://github.com/Bernankez/npm-open/workflows/CI/badge.svg)](https://github.com/Bernankez/npm-open/actions)

Type `npm-open` to open the npm package page in the browser. Similar to `git-open`.

## Install

```sh
pnpm add -g @bernankez/npm-open
```

## Usage

Run in the project root directory:

```sh
npm-open
```

You can also specify the root directory using the `--cwd` flag:

```sh
npm-open --cwd <path to project>
```

By default, it opens page with your current npm registry. If you want to open the npm package page, using the `-n` or `--npm`:

```sh
npm-open -n
```

## Config

`npm-open` suppports customizing npm registry config via `npmopen.config.ts`. You can customize the website page url.

```ts
// npmopen.config.ts
import { defineConfig } from "@bernankez/npm-open";

export default defineConfig({
  // Always open npm package page or not
  npm: false,
  // Custom registry config
  registry: [
    {
      name: "custom",
      url: "https://your-custom-registry/",
      website: pkgName => `https://your-custom-registry/page/${pkgName}`
    }
  ]
});
```

## API Usage

```ts
import { resolvePackage } from "@bernankez/npm-open";

const pkgName = "@bernankez/npm-open";

async function load(): Promise<void> {
  const pkg = await resolvePackage(pkgName, {
    npm: true,
  });
  console.log(pkg);
  // {
  //   name: "npm",
  //   url: "https://registry.npmjs.org/@bernankez/npm-open",
  //   website: "https://www.npmjs.com/package/@bernankez/npm-open",
  // }
}

load();
```

## License

[MIT](LICENSE) License © 2024-PRESENT [科科Cole](https://github.com/Bernankez)
