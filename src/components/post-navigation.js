import * as React from "react"
import { Link } from 'gatsby';
import { shortenString } from '../helpers/string-formatter';

const PostNavigation = ({
  previousPost,
  nextPost,
}) => {
  return (
    <nav className="blog-post-nav">
      <ul
        style={{
          display: `flex`,
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          listStyle: `none`,
          padding: 0,
        }}
      >
        <li>
          {previousPost && (
            <>
              <Link to={previousPost.fields.slug} rel="prev">
                ← {previousPost.frontmatter.title}
              </Link>
              <p>{shortenString(previousPost.frontmatter.description || previousPost.excerpt)}</p>
            </>
          )}
        </li>
        <li>
          {nextPost && (
            <>
              <Link to={nextPost.fields.slug} rel="next">
                {nextPost.frontmatter.title} →
              </Link>
              <p>{shortenString(nextPost.frontmatter.description || nextPost.excerpt)}</p>
            </>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default PostNavigation
