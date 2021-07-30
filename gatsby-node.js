exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;
    if (node.internal.type === 'ImageSharp') {
      const parent = getNode(node.parent);

      const gallery = {
          name: parent.relativeDirectory,
          thumbnail: node,
          images: [],
      }

      createNodeField({
        node,
        name: 'gallery',
        value: gallery,
      });
    }
}

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  var data = {
    fee: "fi"
  }

  actions.createNode({
    ...data,
    id: createNodeId(data.fee),
    internal: {
      type: 'gallery',
      contentDigest: createContentDigest(data),
    },
  })

  data = {
    fee: "fum"
  }

  actions.createNode({
    ...data,
    id: createNodeId(data.fee),
    internal: {
      type: 'gallery',
      contentDigest: createContentDigest(data),
    },
  })
}