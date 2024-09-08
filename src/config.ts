import process from "node:process";
import { loadConfig as _loadConfig } from "c12";
import type { RegistryPresetValue } from "./package";

export interface NpmOpenConfig {
  npm?: boolean;
  registry?: Record<string, RegistryPresetValue>;
}

export interface NpmOpenConfigWithCwd extends NpmOpenConfig {
  // Root for package.json
  cwd?: string;
}

const defaultConfig: NpmOpenConfig = {
  npm: false,
};

export async function loadConfig(configFromArgs?: NpmOpenConfigWithCwd): Promise<NpmOpenConfigWithCwd> {
  const { cwd, ...argsConfig } = configFromArgs || {};
  const { config } = await _loadConfig({
    name: "npmopen",
    cwd: process.cwd(),
    rcFile: false,
    defaultConfig,
    overrides: argsConfig,
  });
  return {
    ...config,
    cwd: cwd || process.cwd(),
  };
}

export function defineConfig(config: NpmOpenConfig): NpmOpenConfig {
  return config;
}
