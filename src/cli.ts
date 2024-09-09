import process from "node:process";
import { log } from "@bernankez/utils";
import { cac } from "cac";
import open from "open";
import { version } from "../package.json";
import { loadConfig } from "./config";
import { getPackageJson, resolvePackage } from "./package";

function loadArgs(argv = process.argv): { npm: boolean; cwd: string } {
  const cli = cac("npm-open");
  cli.version(version).usage("[options]").option("-n --npm", "Open npm package page regardless of current registry").option("--cwd", "Root directory to search for package.json").help();
  const result = cli.parse(argv);
  const options = result.options;
  if (options.help || options.version) {
    process.exit(0);
  }
  const npm = options.npm || options.n;
  return {
    npm,
    cwd: options.cwd || process.cwd(),
  };
}

async function main(): Promise<void> {
  const args = loadArgs();
  const configFile = await loadConfig(process.cwd());
  const config = { ...configFile, ...args };
  const packageJson = getPackageJson(config.cwd);
  if (!packageJson) {
    log.error(`package.json not found in ${config.cwd}`);
    process.exit(1);
  }
  const packageName = packageJson.name;
  if (!packageName) {
    log.error(`package.json does not contain a name`);
    process.exit(1);
  }
  const isPrivate = packageJson.private;
  if (isPrivate) {
    log.error(`${packageName} is private. Will not open package page`);
    process.exit(0);
  }
  const pkg = await resolvePackage(packageName, { ...config });
  const url = pkg.website ?? pkg.url;
  open(url);
}

main();
