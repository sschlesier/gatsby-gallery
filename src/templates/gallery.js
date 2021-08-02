import React from "react"
import { graphql } from "gatsby"

const Gallery = ({ data }) => {
  const name = data.gallery.name
  const images = data.gallery.images

  return (
    <div>
      <head>
        <title>{name}</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <h1>{name}</h1>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
  )
}

export const query = graphql`
  query ($galleryName: String!) {
    gallery(name: { eq: $galleryName }) {
      name
      images {
        parent {
          ... on File {
            name
          }
        }
        gatsbyImageData
      }
    }
  }
`

export default Gallery
