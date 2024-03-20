export default {
  logo: <span style={{ fontWeight: 600 }}>MUI Sonner</span>,
  project: {
    link: "https://github.com/RockiRider/mui-sonner",
  },
  docsRepositoryBase:
    "https://github.com/RockiRider/mui-sonner/tree/main/apps/docs",
  useNextSeoProps() {
    return {
      titleTemplate: "%s | Vite Posthog",
      description: "Vite Posthog",
      openGraph: {
        description: "A vite integration with Posthog",
        siteName: "Vite Posthog",
      },
      twitter: {},
    };
  },
  head: <></>,
  feedback: {
    content: null,
  },
  footer: {
    text: (
      <span>
        MIT {new Date().getFullYear()} ©{" "}
        <a href="https://vite-posthog.tsotne.co.uk" target="_blank">
          Vite Posthog
        </a>
        .
      </span>
    ),
  },
};
