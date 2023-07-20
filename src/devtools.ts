import { safe } from './utils/error';
import { getConfig } from './utils/storage';

const attach = async (tabId: number) => {
  await chrome.debugger.attach(
    {
      tabId,
    },
    `1.3`,
  );

  await chrome.debugger.sendCommand({ tabId }, `Fetch.enable`, {
    patterns: [
      {
        urlPattern: `http*`,
        resourceType: `Document`,
        requestStage: `Response`,
      },
    ],
  });

  const parser = new DOMParser();

  chrome.debugger.onEvent.addListener(async (source, method, _params) => {
    const params = _params as {
      requestId: string;
      request: {
        url: string;
        urlFragment?: string;
        method: string;
        headers: Record<string, string>;
      };
      resourceType: string;
      responseStatusCode?: number;
      responseStatusText?: string;
      responseHeaders?: { name: string; value: string }[];
      networkId?: string;
      redirectedRequestId?: string;
    };
    if (source.tabId != tabId || method != `Fetch.requestPaused`) return;
    const { requestId } = params;

    const response = (await chrome.debugger.sendCommand(
      { tabId },
      `Fetch.getResponseBody`,
      { requestId },
    )) as { body: string; base64Encoded: boolean };

    let bodyText = (
      response.base64Encoded ? atob(response.body) : response.body
    ).toLowerCase();

    if (
      bodyText.includes(`http-equiv`) &&
      bodyText.includes(`content-security-policy`)
    ) {
      const html = safe(
        () => parser.parseFromString(bodyText, `text/html`),
        () => {},
      );
      if (html) {
        html.querySelectorAll(`meta`).forEach((meta) => {
          if (
            meta.getAttribute('http-equiv')?.toLowerCase() ==
            'content-security-policy'
          ) {
            meta.remove();
          }
        });
        bodyText = html.documentElement.outerHTML;
      }
    }

    await chrome.debugger.sendCommand({ tabId }, `Fetch.fulfillRequest`, {
      requestId,
      responseCode: params.responseStatusCode ?? 200,
      responseHeaders: params.responseHeaders,
      body: btoa(bodyText),
    });
  });
};

(async () => {
  const { tabId } = chrome.devtools.inspectedWindow;
  const tab = await chrome.tabs.get(tabId);
  if (tab.url?.startsWith(`http`) && (await getConfig()).csp_html_disabled) {
    await attach(tabId);
  }
})();
