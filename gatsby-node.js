const galleries = new Map();

function createGallery(node) {
  const gallery = {
    name: node.relativePath,
    parent: node.id
  };

  galleries.set(gallery.name, gallery);
}

function addImageToGallery(node, parentNode) {
  const name = parentNode.relativeDirectory;
  const gallery = galleries.get(name);

  if( gallery.thumbnail === undefined ) {
    gallery.thumbnail = node;
  }

  if( gallery.images === undefined ) {
    gallery.images = [];
  }

  gallery.images.push(node);
}

exports.onCreateNode = ({ node, getNode, actions, createNodeId, createContentDigest }) => {
  if (node.internal.type === 'Directory' && node.relativePath != "") {
    createGallery(node);
  }
  else if ( node.internal.type === 'ImageSharp') {
    addImageToGallery(node, getNode(node.parent))
  }
}

exports.sourceNodes = ({ actions, createContentDigest, createNodeId }) => {
  const { createNode } = actions;

  for (const [_, gallery] of galleries) {
    createNode({
      ...gallery,
      id: createNodeId(gallery.parent),
      internal: {
        type: 'gallery',
        contentDigest: createContentDigest(gallery),
      },
    })
  }
}