import React from "react"

export default function Home() {
  return (
    <div>
      <head>
        <title>A Gallery</title> {/* todo use a config value for title and description */}
        <link rel="icon" href="/favicon.ico" />
      </head>

      <main>
        {/* <div className={styles.outer} style={{columns: props.columns}}> */}
        <div>
          {/* { props.galleries.map( (gallery) => (
            <article className={styles.inner} key={gallery.title}>
              <Link href={gallery.webPath} > 
                  <a>
                    <img
                      src={gallery.thumbnail}
                      alt={gallery.title}
                      width="180"
                      height="180" />
                  </a>
              </Link>
            <h2>{gallery.title}</h2>
            </article>
          ))} */}
          <article>Galleris go here</article>
        </div>
      </main>
    </div>
  )
}

// export async function getStaticProps(context) {
//   var globalConfig = await getGlobalConfig();
//   var galleries = await getGalleries();

//   const obj = {props: {
//       columns: 2,
//       ...galleries,
//       ...globalConfig}}
//   // console.log(JSON.stringify(obj.props.columns));
//   return obj;
// }