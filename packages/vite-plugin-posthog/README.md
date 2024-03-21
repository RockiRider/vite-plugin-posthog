# vite-plugin-posthog

![NPM Version](https://img.shields.io/npm/v/vite-plugin-posthog)
![NPM Downloads](https://img.shields.io/npm/dt/vite-plugin-posthog)
![NPM License](https://img.shields.io/npm/l/vite-plugin-posthog)

Helps you integrate with PostHog specifically designed with Vite in mind. Currently compatible with all frameworks/libraries built by Vite, however we provide additional support for React (Hooks and Components) to make it easier to get started with React. Additional support for other frameworks/libraries is planned, in order to make it easier to get started with PostHog in your framework/library of choice.

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
