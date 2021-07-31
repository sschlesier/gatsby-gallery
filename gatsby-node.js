const galleries = new Map()

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

  if (gallery.thumbnail === undefined) {
    gallery.thumbnail = node.id
  }

  if (gallery.images === undefined) {
    gallery.images = []
  }

  gallery.images.push(node.id)
}

exports.onCreateNode = ({ node, getNode }) => {
  if (node.internal.type === "Directory" && node.relativePath != "") {
    createGallery(node)
  } else if (node.internal.type === "ImageSharp") {
    addImageToGallery(node, getNode(node.parent))
  }
}

function injectNode(node, name, getNode) {
  var linkedNode = getNode(node[name])
  node[name] = linkedNode
}

function injectArrayOfNodes(node, name, getNode) {
  var linkedNodes = node[name].map(id => getNode(id))
  node[name] = linkedNodes
}

exports.sourceNodes = ({
  actions,
  createContentDigest,
  createNodeId,
  getNode,
}) => {
  const { createNode } = actions

  for (const [_, gallery] of galleries) {
    injectNode(gallery, "thumbnail", getNode)
    injectArrayOfNodes(gallery, "images", getNode)

    console.log(JSON.stringify(gallery, null, 4))

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
