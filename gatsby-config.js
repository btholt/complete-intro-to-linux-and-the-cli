module.exports = {
  siteMetadata: {
    title: "Complete Intro to Linux and the CLI",
    subtitle: "Learn how to use the command",
    description:
      "The complete intro to using Linux and the command line as taught by Brian Holt",
    keywords: [
      "linux",
      "ubuntu",
      "command line",
      "cli",
      "javascript",
      "bash",
      "zsh",
      "js"
    ]
  },
  pathPrefix: "/complete-intro-to-linux-and-the-cli",
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-plugin-layout`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/lessons`,
        name: "markdown-pages"
      }
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-prismjs`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              linkImagesToOriginal: true,
              sizeByPixelDensity: false
            }
          }
        ]
      }
    }
  ]
};
