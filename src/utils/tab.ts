import { createMemo, createSignal, onCleanup } from 'solid-js';

export const useTab = () => {
  const [tab, updateTab] = createSignal<chrome.tabs.Tab>();
  chrome.tabs
    .query({ active: true, lastFocusedWindow: true })
    .then(([newTab]) => {
      updateTab(newTab);
    });
  const listener = (
    tabId: number,
    changeInfo: chrome.tabs.TabChangeInfo,
    newTab: chrome.tabs.Tab,
  ) => {
    if (newTab.id == tab()?.id) {
      updateTab(newTab);
    }
  };
  chrome.tabs.onUpdated.addListener(listener);
  onCleanup(() => {
    chrome.tabs.onUpdated.removeListener(listener);
  });
  return tab;
};

export const useOrigin = () => {
  const currentTab = useTab();
  return createMemo(() => {
    const url = currentTab()?.url;
    if (!url) return;
    const u = new URL(url);
    if (u.protocol != `http:` && u.protocol != `https:`) return;
    return u.origin;
  });
};
