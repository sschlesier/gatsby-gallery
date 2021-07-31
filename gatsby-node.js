const galleries = [];

function createGallery(node) {
  const gallery = {
    name: node.relativePath,
    parent: node.id
  }

  galleries.push(gallery);
}

exports.onCreateNode = ({ node, getNode, actions, createNodeId, createContentDigest }) => {
  if (node.internal.type === 'Directory' && node.relativePath != "") {
    createGallery(node);
  }
}

exports.sourceNodes = ({ actions, createContentDigest, createNodeId }) => {
  const { createNode } = actions;
  console.log('creating galleries: ' + galleries.length); //todo use the info log level

  galleries.forEach(gallery =>
    createNode({
      ...gallery,
      id: createNodeId(gallery.parent),
      internal: {
        type: 'gallery',
        contentDigest: createContentDigest(gallery),
      },
    })
  );
}