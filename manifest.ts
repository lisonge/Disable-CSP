export default <chrome.runtime.ManifestV3>{
  manifest_version: 3,
  name: 'Disable-CSP',
  version: '1.0.1',
  author: `lisonge`,
  homepage_url: `https://github.com/lisonge/Disable-CSP`,
  description: `disable http header csp and html meta csp`,
  icons: {
    128: `src/assets/icon.png`,
  },
  permissions: [`declarativeNetRequest`, `debugger`, `storage`, `tabs`],
  host_permissions: [`<all_urls>`],
  action: {
    default_popup: 'html/popup.html',
    default_icon: {
      128: `src/assets/icon.png`,
    },
  },
  background: {
    service_worker: 'src/background.ts',
    type: 'module',
  },
  devtools_page: `html/devtools.html`,
};
