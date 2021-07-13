import * as React from "react";
import { graphql } from "gatsby";
import { parseHTML } from '../helpers/html-parser';
import { ABTest, trackPageview } from '../services/ab-testing';
import PostFooter from '../components/post-footer';
import Layout from "../components/layout";
import PostNavigation from "../components/post-navigation";

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data
  const [html, setHtml] = React.useState(post.html);

  React.useEffect(() => {
    if (typeof window !== 'undefined' ) {
      trackPageview(location.pathname);

      const parsed = parseHTML(post.html);
      const controls = parsed.querySelectorAll('ab-control');

      if (controls.length > 0) {
        controls.forEach((c) => ABTest(location.pathname, parsed, c));
        setHtml(parsed.body.innerHTML);
      }
    }
  }, [post.html, location.pathname]);

  return (
    <Layout location={location} title={siteTitle}>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: html }}
          itemProp="articleBody"
        />
        <PostFooter
          location={location}
          authorName={post.frontmatter.author}
        />
      </article>
      <PostNavigation
        previousPost={previous}
        nextPost={next}
      />
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      excerpt
      fields {
        slug
      }
      frontmatter {
        title
        description
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      excerpt
      fields {
        slug
      }
      frontmatter {
        title
        description
      }
    }
  }
`
