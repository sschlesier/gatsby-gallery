import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from "../styles/Home.module.css"

const Gallery = ({ data }) => {
  const name = data.gallery.name
  const images = data.gallery.images

  return (
    <div>
      <head>
        <title>{name}</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <main>
        <div className={styles.outer}>
          {images.map(image => (
            <article className={styles.inner} key={image.name}>
              <GatsbyImage
                image={image.gatsbyImageData}
                alt={image.parent.name}
              />
              <h2>{image.parent.name}</h2>
            </article>
          ))}
        </div>
      </main>
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
