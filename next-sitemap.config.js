const config = {
  siteUrl: 'https://itnerds.ru',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', disallow: '/api/' },
      { userAgent: '*', allow: '/' },
    ],
  },
};

module.exports = config;
