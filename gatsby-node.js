const galleries = new Map()
const path = require("path")

function createGallery(node) {
  const gallery = {
    name: node.relativePath,
    parent: node.id,
  }

  galleries.set(gallery.name, gallery)
}

function addImageToGallery(node, parentNode) {
  const name = parentNode.relativeDirectory
  const gallery = galleries.get(name)

  if (gallery.thumbnail___NODE === undefined) {
    gallery.thumbnail___NODE = node.id
  }

  if (gallery.images___NODE === undefined) {
    gallery.images___NODE = []
  }

  gallery.images___NODE.push(node.id)
}

function applyYamlToGallery(node, parentNode) {
  const name = parentNode.relativeDirectory
  const gallery = galleries.get(name)

  gallery.name = node.name || gallery.name
}

exports.onCreateNode = ({ node, getNode }) => {
  if (node.internal.type === "Directory" && node.relativePath != "") {
    createGallery(node)
  } else if (node.internal.type === "ImageSharp") {
    addImageToGallery(node, getNode(node.parent))
  } else if (node.internal.owner === "gatsby-transformer-yaml") {
    applyYamlToGallery(node, getNode(node.parent))
  }
}

exports.sourceNodes = ({ actions, createContentDigest, createNodeId }) => {
  const { createNode } = actions

  for (const [_, gallery] of galleries) {
    createNode({
      ...gallery,
      id: createNodeId(gallery.parent),
      internal: {
        type: "gallery",
        contentDigest: createContentDigest(gallery),
      },
    })
  }
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(
    `
      {
        allGallery {
          nodes {
            name
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const galleryTemplatePath = path.resolve("src/templates/gallery.js")
  result.data.allGallery.nodes.forEach(gallery => {
    actions.createPage({
      path: gallery.name,
      component: galleryTemplatePath,
      context: {
        galleryName: gallery.name,
      },
    })
  })
}
