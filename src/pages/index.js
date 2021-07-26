import * as React from "react"
import { graphql } from 'gatsby'

const Home = ({ data }) => {
  const galleries = data.allFile.group

  return (
    <div>
      <head>
        <title>A Gallery</title> {/* todo use a config value for title and description */}
        <link rel="icon" href="/favicon.ico" />
      </head>

      <main>
        {/* <div className={styles.outer} style={{columns: props.columns}}> */}
        <div>
          { galleries.map( (gallery) => (
            <article key={gallery.fieldValue}>
              {/* <img
                src={gallery.thumbnail}
                alt={gallery.title}
                width="180"
                height="180" /> */}
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
    group(field: relativeDirectory) {
      fieldValue
      nodes {
        id
        name
      }
    }
  }
}
`
export default Home