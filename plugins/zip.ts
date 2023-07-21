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
        /**
         * must use .replaceAll('\\\\', '/')
         *
         * ![image](https://github.com/lisonge/Disable-CSP/assets/38517192/64292207-9a8b-4b1a-861c-8f634c851009)
         */
        const pathname = fp.substring(`dist/`.length).replaceAll(`\\`, `/`);
        zip.file(pathname, fs.readFile(fp));
      }
      const bf = await zip.generateAsync({ type: 'nodebuffer' });
      fs.writeFile(`dist.zip`, bf);
    },
  };
};
