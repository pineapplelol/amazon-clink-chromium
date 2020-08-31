"use strict";

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    const amznurl = /https:\/\/[a-zA-Z0-9._%+-=&?/]*amazon.com[a-zA-Z0-9._%+-=&?/]*dp\/[a-zA-Z0-9._%+-=&?/]+/gm;
    const product = /(dp[/])(.{0,10})/gm;

    if (amznurl.test(details.url)) {
      const m = product.exec(details.url);
      const clean = `https://www.amazon.com/dp/${m[2]}`;
      if (details.url !== clean) {
        return { redirectUrl: clean };
      }
    }
  },
  {
    urls: ["*://*.amazon.com/*"],
  },
  ["blocking"]
);
