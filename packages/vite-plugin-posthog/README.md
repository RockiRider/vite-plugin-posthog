## vite-plugin-posthog

A Package that adds PostHog to your Vite project. Compatible with Vue, Svelte and React.

- Only the script is injected into the DOM.
- V2 can add Vue, React and Svelte compatible "hooks" that can be exported from the plugin.

Need to fix the following:

- [ ] A Package within a Package. JS works but the types don't. [Check out](https://github.com/PostHog/posthog-js/blob/master/package.json) and [this](https://github.com/PostHog/posthog-js/blob/master/react/package.json)
