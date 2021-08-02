import * as React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from "../styles/Home.module.css"

const Home = ({ data }) => {
  const galleries = data.allGallery.nodes

  return (
    <div>
      <head>
        {/* todo use a config value for title and description */}
        <title>A Gallery</title>
        <link rel="icon" href="/favicon.ico" />
      </head>

      <main>
        <div className={styles.outer}>
          {galleries.map(gallery => (
            <article className={styles.inner} key={gallery.name}>
              <Link to={gallery.name}>
                <GatsbyImage
                  image={gallery.thumbnail.gatsbyImageData}
                  alt={gallery.thumbnail.parent.name}
                />
              </Link>
              <h2>{gallery.name}</h2>
            </article>
          ))}
        </div>
        {/* <pre>{JSON.stringify(data, null, 4)}</pre> */}
      </main>
    </div>
  )
}

export const query = graphql`
  query {
    allGallery {
      nodes {
        name
        thumbnail {
          parent {
            ... on File {
              name
            }
          }
          gatsbyImageData(placeholder: BLURRED, formats: [WEBP])
        }
      }
    }
  }
`

export default Home
