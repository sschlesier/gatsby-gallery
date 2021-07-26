import * as React from "react"
import { graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"

const Home = ({ data }) => {
  const galleries = data.allFile.group

  return (
    <div>
      <head>
        <title>A Gallery</title> {/* todo use a config value for title and description */}
        <link rel="icon" href="/favicon.ico" />
      </head>

      <main>
        <div>
          { galleries.map( (gallery) => (
            <article key={gallery.fieldValue}>
              <GatsbyImage
                image={gallery.nodes[0].childImageSharp.gatsbyImageData}
                alt={gallery.nodes[0].name}
              />
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
  allFile(filter: {relativePath: {ne: ""}, sourceInstanceName: {eq: "galleries"}}) {
    group(field: relativeDirectory, limit: 1) {
      fieldValue
      nodes {
        name
        childImageSharp {
          gatsbyImageData(width: 180, height: 180, placeholder: BLURRED, formats: [WEBP])
        }
      }
    }
  }
}


`
export default Home