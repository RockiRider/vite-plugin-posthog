# vite-plugin-posthog

A package that allows you to integrate with PostHog specifically designed with Vite in mind. Currently only compatible with React, but support for Vue and Svelte is planned.

## Advantages over official Posthog React SDK

- No need to wrap your app in a `<PosthogProvider />` component
- Easy to get started with, just add it to your `vite.config.js` file
- Easily turn off tracking in development mode

## Installation

Inside your vite.config.ts file:

```ts
import { VitePostHog } from "vite-plugin-posthog";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  // import.meta.env.VITE_NAME available here with: process.env.VITE_NAME

  return defineConfig({
    plugins: [
      react(),
      VitePostHog({
        apiKey: process.env.VITE_POSTHOG_KEY,
        hostUrl: "https://eu.posthog.com",
        isDevModeOn: true,
        config: {
          autocapture: false,
          capture_pageview: false,
          // ...other posthog config options
        },
      }),
    ],
  });
};
```

## Usage with React

```jsx
import {
  useVitePostHog,
  useFeatureFlagEnabled,
} from "vite-plugin-posthog/react";

const App = () => {
  const posthog = useVitePostHog();

  return (
    <div>
      <button
        onClick={() => {
          posthog?.capture("button clicked", { buttonName: "test" });
        }}
      >
        Click me
      </button>
    </div>
  );
};
```