import type { Plugin } from 'vite';
import fs from 'node:fs/promises';
import path from 'node:path';
import JSZIP from 'jszip';

async function* walk(dirPath: string) {
  const pathnames = (await fs.readdir(dirPath)).map((s) =>
    path.join(dirPath, s),
  );
  while (pathnames.length > 0) {
    const pathname = pathnames.pop()!;
    const state = await fs.lstat(pathname);
    if (state.isFile()) {
      yield pathname;
    } else if (state.isDirectory()) {
      pathnames.push(
        ...(await fs.readdir(pathname)).map((s) => path.join(pathname, s)),
      );
    }
  }
}
export type ZipOption = {};
export const zip = (zipOption: ZipOption = {}): Plugin => {
  return {
    name: `zip`,
    apply: 'build',
    enforce: 'post',
    async closeBundle() {
      const zip = new JSZIP();
      for await (const fp of walk(`dist`)) {
        zip.file(fp.substring(5), fs.readFile(fp));
      }
      const bf = await zip.generateAsync({ type: 'nodebuffer' });
      fs.writeFile(`dist.zip`, bf);
    },
  };
};
