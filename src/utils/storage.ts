import { createSignal, onCleanup } from 'solid-js';

type StorageListener = (changes: {
  [key: string]: chrome.storage.StorageChange;
}) => void;
type ConfigListener = (newConfig: Config, oldConfig: Config) => void;

const storage = import.meta.env.DEV
  ? chrome.storage.local
  : chrome.storage.sync;

const useStorageConfig = <T>(key: string, defaultValue: T) => {
  const [config, updateStorage] = createSignal(defaultValue);
  const [initialized, updateInitialized] = createSignal(false);
  storage.get(key).then((r) => {
    updateStorage(r[key] ?? defaultValue);
    updateInitialized(true);
  });
  const listener: StorageListener = (changes) => {
    const d = changes[key];
    if (!d?.newValue) return;
    updateStorage(d.newValue);
  };
  storage.onChanged.addListener(listener);
  onCleanup(() => {
    storage.onChanged.removeListener(listener);
  });
  const updateConfig = async (newValue: T) => {
    await storage.set({ [key]: newValue });
  };
  return { config, updateConfig, initialized };
};

const CONFIG_KEY = `config`;
export type Config = {
  csp_http_disabled: boolean;
  csp_html_disabled: boolean;
};

const getDefaultValue = () =>
  ({
    csp_http_disabled: false,
    csp_html_disabled: false,
  }) as Config;
export const useConfig = () => {
  return useStorageConfig<Config>(CONFIG_KEY, getDefaultValue());
};

export const getConfig = async () => {
  return (
    ((await storage.get(CONFIG_KEY))[CONFIG_KEY] as Config) ?? getDefaultValue()
  );
};
const listenerMap = new WeakMap<ConfigListener, StorageListener>();
export const addConfigListener = (listener: ConfigListener) => {
  if (listenerMap.has(listener)) return;
  const realListener: StorageListener = (changes) => {
    const value = changes[CONFIG_KEY];
    if (!value) return;
    listener(value.newValue, value.oldValue);
  };
  listenerMap.set(listener, realListener);
  storage.onChanged.addListener(realListener);
};
export const removeConfigListener = (listener: ConfigListener) => {
  const realListener = listenerMap.get(listener);
  if (!realListener) return;
  storage.onChanged.removeListener(realListener);
};
