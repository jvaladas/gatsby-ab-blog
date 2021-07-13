import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"

const PostAuthor = ({
  name,
  summary,
}) => {
  return (
    <div className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["AUTO", "WEBP", "AVIF"]}
        src="../images/profile-pic.jpeg"
        width={50}
        height={50}
        quality={95}
        alt="Profile picture"
      />
      <div>
        <p>
          Written by <strong>{name || 'Bill Gates himself'}</strong>.
        </p>
        <p>
          {summary || 'This author has not written his life summary.'}
        </p>
      </div>
    </div>
  )
}

export default PostAuthor
