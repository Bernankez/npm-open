import process from "node:process";
import { cac } from "cac";
import open from "open";
import { log } from "@bernankez/utils";
import { version } from "../package.json";
import { getPackageJson, resolvePackage } from "./package";

function loadArgs(argv = process.argv): {
  [k: string]: any;
} {
  const cli = cac("npm-open");
  cli.version(version).usage("[options]")
    .option("-n --npm", "Open npm package page regardless of current registry")
    .option("--cwd", "Root directory to search for package.json").help();
  const result = cli.parse(argv);
  return result.options;
}

async function main(): Promise<void> {
  const args = loadArgs();
  if (args.help || args.version) {
    process.exit(0);
  }
  const cwd = args.cwd;
  const packageJson = getPackageJson(cwd);
  if (!packageJson) {
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
  const pkg = await resolvePackage(packageName, { npm: args.npm || args.n });
  const url = pkg.website ?? pkg.registry;
  open(url);
}

main();
