import { Config, addConfigListener, getConfig } from './utils/storage';

const { RuleActionType, HeaderOperation, ResourceType } =
  chrome.declarativeNetRequest;

const rules: chrome.declarativeNetRequest.Rule[] = [
  {
    id: 1,
    action: {
      type: RuleActionType.MODIFY_HEADERS,
      responseHeaders: [
        {
          operation: HeaderOperation.REMOVE,
          header: `content-security-policy`,
        },
        {
          operation: HeaderOperation.REMOVE,
          header: `content-security-policy-report-only`,
        },
        {
          operation: HeaderOperation.REMOVE,
          header: `x-webkit-csp`,
        },
        {
          operation: HeaderOperation.REMOVE,
          header: `x-content-security-policy`,
        },
      ],
    },
    condition: {
      urlFilter: `|http*`,
      resourceTypes: [ResourceType.MAIN_FRAME, ResourceType.SUB_FRAME],
    },
  },
];

const updateRules = (newConfig: Config, oldConfig?: Config) => {
  if (
    oldConfig &&
    newConfig.csp_http_disabled === oldConfig?.csp_http_disabled
  ) {
    return;
  }
  if (newConfig.csp_http_disabled) {
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: rules.map((rule) => rule.id),
      addRules: rules,
    });
  } else {
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: rules.map((rule) => rule.id),
    });
  }
};
getConfig().then(updateRules);
addConfigListener(updateRules);
