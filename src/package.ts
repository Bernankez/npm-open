import process from "node:process";
import path from "node:path";
import fs from "node:fs";
import { log } from "@bernankez/utils";
import type { PackageJson } from "type-fest";
import { resolveRegistry } from "./registry";

export interface RegistryPresetValue {
  website: (pkg: string) => string;
}

export const registryPreset: Record<string, RegistryPresetValue> = {
  "https://registry.npmjs.org/": {
    website: pkg => `https://www.npmjs.com/package/${pkg}`,
  },
  "https://registry.npmmirror.com/": {
    website: pkg => `https://npmmirror.com/package/${pkg}`,
  },
  "https://r.cnpmjs.org/": {
    website: pkg => `https://npmmirror.com/package/${pkg}`,
  },
};

export interface ResolvePackageOptions {
  npm?: boolean;
}
export interface ResolvePackageReturn {
  registry: string;
  website?: string;
}

export async function resolvePackage(pkg: string, options?: ResolvePackageOptions): Promise<ResolvePackageReturn> {
  const { npm } = options || {};
  if (npm) {
    const registry = "https://registry.npmjs.org/";
    return {
      registry,
      website: registryPreset[registry].website(pkg),
    };
  }
  const currentRegistry = await resolveRegistry();
  const resolved: ResolvePackageReturn = {
    registry: currentRegistry,
  };
  if (registryPreset[currentRegistry]) {
    resolved.website = registryPreset[currentRegistry].website(pkg);
  }
  return resolved;
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
