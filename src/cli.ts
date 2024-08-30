import process from "node:process";
import path from "node:path";
import fs from "node:fs";
import { cac } from "cac";
import open from "open";
import { log } from "@bernankez/utils";
import { version } from "../package.json";

function loadArgs(argv = process.argv) {
  const cli = cac("npm-open");
  cli.version(version).usage("[options]").option("--cwd", "Root directory to search for package.json").help();
  const result = cli.parse(argv);
  return result.options;
}

function main() {
  const args = loadArgs();
  if (args.help || args.version) {
    process.exit(0);
  }
  const cwd = args.cwd || process.cwd();
  const packageJsonPath = path.resolve(cwd, "package.json");
  if (!fs.existsSync(packageJsonPath)) {
    log.error(`${packageJsonPath} not found`);
    process.exit(1);
  }
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  const packageName = packageJson.name;
  const url = `https://www.npmjs.com/package/${packageName}`;
  open(url);
}

main();
