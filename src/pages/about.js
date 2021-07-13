import * as React from "react"
import { graphql } from "gatsby"
import ABImage from '../images/ab-testing.png';

import Layout from "../components/layout"

const About = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const imageStyle = {
    width: '40rem',
  };

  const description = `Although the content of these posts is not
  of particular relevance, the content itself will change depending on which visitor
  is looking at it. When the user enters one of the pages several tests run and
  the result of these tests will choose which images/text is shown to the user.
  Refreshing the browser will not change these results.`;

  return (
    <Layout location={location} title={siteTitle}>
      <h1>About this blog</h1>
      <p>This sample blog was created by Jorge Valadas after being
        challenged to explore split/AB testing.</p>
      <p>{description}</p>
      <img src={ABImage} alt="ab-testing" style={imageStyle}/>
      <p>An example of how it works "in real life".</p>
    </Layout>
  )
}

export default About

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
