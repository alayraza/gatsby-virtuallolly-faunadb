module.exports = {
  /* Your site config here */
  plugins: [
    {
    resolve: "gatsby-source-graphql",
    options: {
      // This type will contain remote schema Query type
      typeName: "result",
      // This is field under which it's accessible
      fieldName: "lolliesInfo",
      // Url to query from
      url:
        "https://suspicious-hypatia-df7d44.netlify.app/.netlify/functions/virtuallolly",
    },
  }],
}