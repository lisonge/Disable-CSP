# Disable-CSP

A browser extension to disable http header Content-Security-Policy and html meta Content-Security-Policy

In the process of website development and testing, we inevitably need to inject cross-domain resources into some websites, but Content-Security-Policy prevents this. So you can use this extension to disable Content-Security-Policy so that you have a better development experience

- disable http header csp
- disable html meta csp (**must open devtools**)

![image](https://github.com/lisonge/Disable-CSP/assets/38517192/530218b5-2183-4c5a-9801-315fdadd6f93)

## Install

- [releases](https://github.com/lisonge/Disable-CSP/releases)
- [chrome webstore](https://chrome.google.com/webstore/detail/disable-csp/hgegihapiofjgmmgigbblnjaicgjhoko)
- [edge addons](https://microsoftedge.microsoft.com/addons/detail/disablecsp/kleofklkancfimlfjhkjegnljkpjafcc)

## Sample

<details open>
  <summary>http header csp</summary>

![image](https://github.com/lisonge/Disable-CSP/assets/38517192/08a00a09-873d-4044-a4b4-f7abb7018734)

</details>

<details open>
  <summary>disable http header csp </summary>

![image](https://github.com/lisonge/Disable-CSP/assets/38517192/d5bf1e81-5482-4479-a8ed-17df47a5643c)

</details>

<details open>
  <summary>html meta csp</summary>

![image](https://github.com/lisonge/Disable-CSP/assets/38517192/cc223640-6e8e-4935-b356-828e1c0de75e)

</details>

<details open>
  <summary>disable html meta csp (**must open devtools**)</summary>

![image](https://github.com/lisonge/Disable-CSP/assets/38517192/18486f78-101c-4964-9de4-2a2a91387708)

</details>

## Permission Specification

1.declarativeNetRequest: disable http header Content-Security-Policy, remove response headers

2.debugger: disable http meta Content-Security-Policy, attach devtools then modify http response body

3.storage: save disable/enable csp user config

4.tabs: disable http meta Content-Security-Policy, attach the current tabId of devtools then modify http response body

5.host_permissions<all_urls>: disable the Content-Security-Policy of any host
