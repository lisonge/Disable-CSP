import { Show } from 'solid-js/web';
import NSwitch from './components/NSwitch';
import { useConfig } from './utils/storage';

export default function PopupApp() {
  const cspConfig = useConfig();

  return (
    <Show
      when={cspConfig.initialized()}
      fallback={<div whitespace-nowrap>Loading...</div>}
    >
      <div m-10px gap-15px flex flex-col>
        <NSwitch
          label={<div w-125px>Disabled HTTP CSP</div>}
          checked={cspConfig.config().csp_http_disabled}
          onChange={(csp_http_disabled) => {
            cspConfig.updateConfig({
              ...cspConfig.config(),
              csp_http_disabled,
            });
          }}
        />
        <NSwitch
          label={<div w-125px>Disabled HTML CSP</div>}
          checked={cspConfig.config().csp_html_disabled}
          onChange={(csp_html_disabled) => {
            cspConfig.updateConfig({
              ...cspConfig.config(),
              csp_html_disabled,
            });
          }}
        />
      </div>
    </Show>
  );
}
