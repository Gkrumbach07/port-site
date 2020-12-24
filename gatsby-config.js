module.exports = {
  siteMetadata: {
    title: "Portfolio Site",
  },
  plugins: [
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    `gatsby-plugin-react-helmet`,
  ],
};