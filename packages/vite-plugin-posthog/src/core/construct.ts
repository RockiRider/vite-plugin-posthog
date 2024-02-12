import { PostHogInitConfig } from "./types";

const BASE_SCRIPT = `!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);`;

const formatConfig = (config: PostHogInitConfig) => {
  const formatted = Object.entries(config)
    .map(([key, value]) => {
      if (typeof value === "function") {
        return `${key}: ${value.toString()}`;
      } else if (typeof value === "boolean") {
        return `${key}: ${value}`;
      } else {
        return `${key}: '${value}'`;
      }
    })
    .join(", ");

  return `{${formatted}}`;
};

const constructInit = (key: string, config: PostHogInitConfig) =>
  `posthog.init('${key}', ${formatConfig(config)})`;

const constructDevModeInit = (
  key: string,
  config: PostHogInitConfig
) => `if (!window.location.host.includes('127.0.0.1') && !window.location.host.includes('localhost')) {
  ${constructInit(key, config)}
}`;

export const constructScript = (
  key: string,
  isCheckingForDevMode: boolean,
  config: PostHogInitConfig
) => `${BASE_SCRIPT}
${
  isCheckingForDevMode
    ? constructDevModeInit(key, config)
    : constructInit(key, config)
}`;
