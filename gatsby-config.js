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
        "http://localhost:8888/.netlify/functions/virtuallolly",
    },
  }],
}