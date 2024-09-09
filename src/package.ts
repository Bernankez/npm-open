import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { log } from "@bernankez/utils";
import type { PackageJson } from "type-fest";
import { resolveRegistry } from "./registry";

export interface Registry {
  name?: string;
  url: string;
  website: (pkgName: string) => string;
}

export const registryPreset = [
  {
    name: "npm",
    url: "https://registry.npmjs.org/",
    website: pkg => `https://www.npmjs.com/package/${pkg}`,
  },
  {
    name: "taobao",
    url: "https://registry.npmmirror.com/",
    website: pkg => `https://npmmirror.com/package/${pkg}`,
  },
  {
    name: "cnpm",
    url: "https://r.cnpmjs.org/",
    website: pkg => `https://npmmirror.com/package/${pkg}`,
  },
] satisfies Registry[];

export interface ResolvePackageOptions {
  npm?: boolean;
  customRegistry?: Registry[];
}
export interface ResolvePackageReturn {
  name?: string;
  url: string;
  website?: string;
}

export async function resolvePackage(pkgName: string, options?: ResolvePackageOptions): Promise<ResolvePackageReturn> {
  const { npm, customRegistry = [] } = options || {};
  const registry = [...registryPreset, ...customRegistry];
  if (npm) {
    const npmRegistry = registry.find(r => r.name === "npm")!;
    const url = npmRegistry.url + pkgName;
    const website = npmRegistry.website(pkgName);
    return {
      ...npmRegistry,
      url,
      website,
    };
  }
  const url = await resolveRegistry();
  const current = registry.find(r => r.url === url);
  let website: string | undefined;
  if (current) {
    website = current.website(pkgName);
  }
  return {
    ...current,
    url: url + pkgName,
    website,
  };
}

export function getPackageJson(cwd = process.cwd()): PackageJson | undefined {
  const packageJsonPath = path.resolve(cwd, "package.json");
  if (!fs.existsSync(packageJsonPath)) {
    log.error(`${packageJsonPath} not found`);
    return;
  }
  const packageJson: PackageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  return packageJson;
}
