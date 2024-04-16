import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Zroker",
  tagline: "Zroker is a gui client for zrok",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://zroker.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "lerte", // Usually your GitHub org/user name.
  projectName: "zroker", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/lerte/zroker/blob/main/docs/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/lerte/zroker/blob/main/docs/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "Zroker",
      logo: {
        alt: "Zroker Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Docs",
        },
        { to: "/download", label: "Download", position: "left" },
        {
          position: "right",
          className: "header-github-link",
          "aria-label": "GitHub repository",
          href: "https://github.com/lerte/zroker",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Invite",
              to: "/docs/invite",
            },
            {
              label: "Enable",
              to: "/docs/enable",
            },
            {
              label: "Overview",
              to: "/docs/overview",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Github",
              href: "https://github.com/lerte/zroker",
            },
            {
              label: "Twitter",
              href: "https://x.com/engroker",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Download",
              to: "/download",
            },
            {
              label: "Ngroker",
              href: "https://ngroker.com",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Zroker, Inc. Built ♥ by Ngroker.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
