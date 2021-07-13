import * as React from "react"
import { Link } from 'gatsby';
import { trackEvent } from '../services/ab-testing';
import PostAuthor from '../components/post-author';

const PostFooter = ({
  authorName,
  location,
}) => {
  const handleRegister = () => {
    trackEvent(location.pathname, 'Sign Up');
  };

  return (
    <footer>
      <div className="register-newsletter">
        <p>
          Did you enjoy reading this article? There's a lot more to get you inspired. {' '}
          <Link to={'/sign-up'} itemProp="url">
            <span onClick={handleRegister} aria-hidden="true">Register to our newsletter.</span>
          </Link>
        </p>
      </div>
      <hr />
      <PostAuthor
        name={authorName}
      />
    </footer>
  )
}

export default PostFooter
