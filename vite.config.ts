import { crx } from '@crxjs/vite-plugin';
import unocss from 'unocss/vite';
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import manifest from './manifest';
import { zip } from './plugins';

export default defineConfig({
  // unocss 如果在 solid 之前会造成无限卡死
  plugins: [
    solid(),
    unocss(),
    crx({
      // @ts-ignore
      manifest,
    }),
    zip(),
  ],
  server: {
    host: `127.0.0.1`,
    port: 8700,
    strictPort: true,
    hmr: {
      port: 8700,
    },
  },
});
