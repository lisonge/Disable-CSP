export default <chrome.runtime.ManifestV3>{
  manifest_version: 3,
  name: 'Disable-CSP',
  version: '1.0.2',
  author: `lisonge`,
  homepage_url: `https://github.com/lisonge/Disable-CSP`,
  description: `A browser extension to disable http header Content-Security-Policy and html meta Content-Security-Policy`,
  icons: {
    128: `src/assets/icon-128.png`,
  },
  permissions: [`declarativeNetRequest`, `debugger`, `storage`, `tabs`],
  host_permissions: [`<all_urls>`],
  action: {
    default_popup: 'html/popup.html',
    default_icon: {
      128: `src/assets/icon-128.png`,
    },
  },
  background: {
    service_worker: 'src/background.ts',
    type: 'module',
  },
  devtools_page: `html/devtools.html`,
};
