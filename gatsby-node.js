exports.onCreateNode = ({ node, getNode, actions, createNodeId, createContentDigest }) => {
    const { createNode, createNodeField } = actions;
    if (node.internal.type === 'ImageSharp') {
      const parent = getNode(node.parent);

      const gallery = {
          name: parent.relativeDirectory,
          thumbnail: node,
          images: [],
      }

      // createNodeField({
      //   node,
      //   name: 'gallery',
      //   value: gallery,
      // });

      createNode({
        ...gallery,
        id: createNodeId(parent.id),
        internal: {
          type: 'gallery',
          contentDigest: createContentDigest(gallery),
        },
      })
    }
}