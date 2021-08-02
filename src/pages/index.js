import * as React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from "../styles/Home.module.css"

const Home = ({ data }) => {
  const galleries = data.allFile.group

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
            <article className={styles.inner} key={gallery.fieldValue}>
              <Link to={gallery.fieldValue}>
                <GatsbyImage
                  image={gallery.nodes[0].childImageSharp.gatsbyImageData}
                  alt={gallery.nodes[0].name}
                />
              </Link>
              <h2>{gallery.fieldValue}</h2>
            </article>
          ))}
          {/* <article>
            <pre>{JSON.stringify(data, null, 4)}</pre>
          </article> */}
        </div>
      </main>
    </div>
  )
}

export const query = graphql`
  query {
    allFile(
      filter: {
        relativePath: { ne: "" }
        sourceInstanceName: { eq: "galleries" }
      }
    ) {
      group(field: relativeDirectory, limit: 1) {
        fieldValue
        nodes {
          name
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, formats: [WEBP])
          }
        }
      }
    }
  }
`

export default Home
