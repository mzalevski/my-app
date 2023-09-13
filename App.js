import React from "react";
import { WebView } from "react-native-webview";

const injectedJavaScript = `
  const style = document.createElement('style');
  style.innerHTML = \`
        .mobile-app-hidden {
          display: none!important;
        }
        header.sticky {
          display: none!important;
        }
      \`;
  document.head.appendChild(style);
  true;
  `;

const arrayAtPolyfill = `
function at(n) {
  // ToInteger() abstract op
  n = Math.trunc(n) || 0;
  // Allow negative indexing from the end
  if (n < 0) n += this.length;
  // OOB access is guaranteed to return undefined
  if (n < 0 || n >= this.length) return undefined;
  // Otherwise, this is just normal property access
  return this[n];
}
const TypedArray = Reflect.getPrototypeOf(Int8Array);
for (const C of [Array, String, TypedArray]) {
  Object.defineProperty(C.prototype, "at",
                        { value: at,
                          writable: true,
                          enumerable: false,
                          configurable: true });
}`;

export default function App() {
  const token = "kabsdjbasyubgdasd";

  const user = {
    firstName: "kabsdjabsjdybasd",
    lastName: "kabsdjabsjdybasd",
    id: "kabsdjabsjdybasd",
    email: "kabsdjabsjdybasd",
    pesel: "kabsdjabsjdybasd",
    phone: "kabsdjabsjdybasd",
    address: {
      flatNumber: "aksdbhiaus",
    },
  };

  const root = {
    deviceAnalyticsId: "asdasd",
  };

  const _onNavigationStateChange = (navState) => {
    if (
      !urlHistory.length ||
      urlHistory[urlHistory.length - 1] !== navState.url
    ) {
      setUrlHistory((prev) => prev.concat(navState.url));
      setCurrentUrl(navState.url);
    }
  };

  const jsToInject = `${arrayAtPolyfill}
  localStorage.setItem("analyticsId", "${
    root?.deviceAnalyticsId
  }");localStorage.setItem("user", JSON.stringify({
    isAuthenticated: true,
    JWT: "${token}",
    firstName: "${user?.firstName}",
    lastName: "${user?.lastName}",
    id: "${user?.id}",
    address: ${JSON.stringify(user?.address)},
    email: "${user?.email}",
    pesel: "${user?.pesel}",
    analyticsId: "${root?.deviceAnalyticsId}",
    phone: "${user?.phone}",
    flatNumber: "${user?.address?.flatNumber}",
  }));true;`;

  return (
    <WebView
      style={{ flex: 1 }}
      source={{ uri: "https://jutromedical.com/sklep" }}
      injectedJavaScript={injectedJavaScript}
      onNavigationStateChange={_onNavigationStateChange}
      injectedJavaScriptBeforeContentLoaded={
        user?.id ? jsToInject : arrayAtPolyfill
      }
    />
  );
}
