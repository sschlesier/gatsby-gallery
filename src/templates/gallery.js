import React from "react"
import { graphql } from "gatsby"

const Gallery = ({ data }) => <pre>{JSON.stringify(data, null, 4)}</pre>

export const query = graphql`
  query ($galleryName: String!) {
    allGallery(filter: { name: { eq: $galleryName } }) {
      nodes {
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
  }
`

export default Gallery
