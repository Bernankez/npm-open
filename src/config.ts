import { loadConfig as _loadConfig } from "c12";
import type { Registry } from "./package";

export interface NpmOpenConfig {
  npm?: boolean;
  registry?: Registry[];
}

const defaultConfig: NpmOpenConfig = {
  npm: false,
};

export async function loadConfig(cwd = "."): Promise<NpmOpenConfig> {
  const { config } = await _loadConfig({
    name: "npmopen",
    cwd,
    rcFile: false,
    defaultConfig,
  });
  return config;
}

export function defineConfig(config: NpmOpenConfig): NpmOpenConfig {
  return config;
}
