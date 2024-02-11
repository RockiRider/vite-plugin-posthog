# vite-plugin-posthog

![NPM Version](https://img.shields.io/npm/v/vite-plugin-posthog)
![NPM Downloads](https://img.shields.io/npm/dt/vite-plugin-posthog)
![NPM License](https://img.shields.io/npm/l/vite-plugin-posthog)

Helps you integrate with PostHog specifically designed with Vite in mind. Currently compatible with all frameworks/libraries built by Vite, however we provide additional support for React (Hooks and Components) to make it easier to get started with React. Additional support for other frameworks/libraries is planned, in order to make it easier to get started with PostHog in your framework/library of choice.

## Advantages over official Posthog React SDK

- Posthog will be initialised faster, as you don't need to wait for a `<PosthogProvider />` component to be mounted
- No need to wrap your app in an additional `context` component via `<PosthogProvider />`
- Easy to get started with, just add it to your `vite.config.js` file
- Easily turn off tracking in development mode
- Additional Hooks and Components to get you up and running quickly

## Installation

Inside your vite.config.ts file:

```ts
import { vitePostHog } from "vite-plugin-posthog";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  // import.meta.env.VITE_NAME available here with: process.env.VITE_NAME

  return defineConfig({
    plugins: [
      react(),
      vitePostHog({
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

### Available Hooks

| Hook                     | Description                                                                                     |
| ------------------------ | ----------------------------------------------------------------------------------------------- |
| useVitePostHog           | Returns the initialized posthog library                                                         |
| useFeatureFlagEnabled    | Returns a boolean indicating whether the feature flag is enabled.                               |
| useFeatureFlagPayload    | Returns the payload of the feature flag.                                                        |
| useFeatureFlagVariantKey | Returns the variant key of the feature flag.                                                    |
| useActiveFeatureFlags    | Returns an array of active feature flags.                                                       |
| useGetEnabledSurvey      | Returns a posthog survey matching the id you provided, if the user is able to access the survey |

### Available Components

| Component      | Description                                                                                                |
| -------------- | ---------------------------------------------------------------------------------------------------------- |
| PostHogFeature | A component that allows you to render different content based on whether a feature flag is enabled or not. |
| PageTrack      | A component that allows you to track that a specific route has been visited, on first render               |
