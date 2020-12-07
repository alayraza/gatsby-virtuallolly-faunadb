/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path")
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const {data} = await graphql(`
    query MyQuery{
        lolliesInfo {
            lolliesInfo {
                lollyPath
                senderName
                recipientName
                message
                flavourMiddle
                flavourBottom
                flavourTop
            }
        }
    }
  `)
    console.log("isdata ",data.lolliesInfo.lolliesInfo);
    data.lolliesInfo.lolliesInfo.forEach((node) => {
        createPage({
            path: `lolly/${node.lollyPath}`,
            component: path.resolve("./src/pages/templates/template.tsx"),
            context: {
                flavourTop: node.flavourTop,
                flavourMiddle: node.flavourMiddle,
                flavourBottom: node.flavourBottom,
                lollyPath: node.lollyPath,
                message: node.message,
                senderName: node.senderName,
                recipientName: node.recipientName,
            },
        })
    })
}

exports.onCreatePage = async ({ page, actions }) => {
    const { createPage } = actions
    if (page.path.match(/^\/templates/)) {
      page.matchPath = "/templates/template/*"
      createPage(page)
    }
}

