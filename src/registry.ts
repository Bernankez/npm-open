import { exec } from "node:child_process";

const urlReg = /^https?:\/\//;
export function resolveRegistry(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    exec("npm config get registry", (err, stdout) => {
      if (err) {
        reject(err);
      } else if (urlReg.test(stdout)) {
        resolve(stdout.trim());
      } else {
        reject(new Error(`Not valid registry: ${stdout}`));
      }
    });
  });
}
