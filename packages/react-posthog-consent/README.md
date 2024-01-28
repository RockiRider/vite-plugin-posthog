# react-posthog-consent

![NPM Version](https://img.shields.io/npm/v/react-posthog-consent)
![NPM Downloads](https://img.shields.io/npm/dt/react-posthog-consent)
![NPM License](https://img.shields.io/npm/l/react-posthog-consent)

A Package that gives you easy access to better consent management for PostHog. If you want to ensure you are only tracking users who have given consent, this package is for you.

Supports:

- `vite-plugin-posthog` [Unofficial PostHog Vite SDK](https://www.npmjs.com/package/vite-plugin-posthog)
- `posthog-js` [Official PostHog React SDK](https://www.npmjs.com/package/posthog-js)

## Vite & React Installation

`npm i react-posthog-consent vite-plugin-posthog`

## Vite & React Usage

Ensure the initial posthog config is as follows:

```ts
//vite.config.ts
return defineConfig({
  plugins: [
    react(),
    VitePostHog({
      apiKey: process.env.VITE_POSTHOG_KEY,
      hostUrl: "https://eu.posthog.com",
      config: {
        autocapture: false, // This is the important
        disable_session_recording: true, // This is the important
        opt_out_capturing_by_default: true, // This is the important
      },
    }),
  ],
});
```

Then use the `ConsentProvider` component to wrap your app:

```tsx
import { ConsentProvider } from "react-posthog-consent/vite";
import CookieBanner from "./CookieBanner";

const COOKIE_PREFIX = "my_app_name";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConsentProvider
      cookieBanner={<CookieBanner />}
      config={{
        cookiePrefix: COOKIE_PREFIX,
        opt_in_name: "Opt In",
        cookie_expiration: 30,
        secure_cookie: true,
      }}
    >
      <App />
    </ConsentProvider>
  </React.StrictMode>
);
```

And then use `useConsent` hook to access the consent state.

If you want to avoid using the `Provider` component, you can go underneath the hood and utilise the `usePostHogConsent` hook directly, however be aware that its easier and quicker to just use the `ConsentProvider`.

## Pure React Installation

`npm i react-posthog-consent posthog-js`

## Pure React Usage

```tsx
import { ConsentProvider } from "react-posthog-consent/core";
import CookieBanner from "./CookieBanner";

const COOKIE_PREFIX = "my_app_name";

const options = {
  api_host: process.env.REACT_APP_PUBLIC_POSTHOG_HOST,
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PostHogProvider
      apiKey={process.env.REACT_APP_PUBLIC_POSTHOG_KEY}
      options={options}>
      <ConsentProvider
        cookieBanner={<CookieBanner />}
        config={{
          cookiePrefix: COOKIE_PREFIX,
          opt_in_name: "Opt In",
          cookie_expiration: 30,
          secure_cookie: true,
        }}
      >
        <App />
      </ConsentProvider>
    </PostHogProvider>

```
