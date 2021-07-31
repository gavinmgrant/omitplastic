const { IconSitemap } = require("@tabler/icons");

const siteUrl = "https://www.omitplastic.com";

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", disallow: "/blog" },
      { userAgent: "*", disallow: "/create" },
      { userAgent: "*", disallow: "/draft" },
      { userAgent: "*", allow: "/" },
    ],
    additionalSitemaps: [
      `${siteUrl}/sitemap.xml`,
      `${siteUrl}/server-sitemap.xml`,
    ],
  },
  exclude: ["/p/*", "/blog", "/create", "/drafts"],
};
