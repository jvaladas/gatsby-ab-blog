import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const SignUp = ({ data, location }) => {
  const title = data.site.siteMetadata.title

  return (
    <Layout location={location} title={title}>
      <h1>Register</h1>
      <p>Thank you so much for your interest, fill the form below to register!</p>
    </Layout>
  )
}

export default SignUp

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
