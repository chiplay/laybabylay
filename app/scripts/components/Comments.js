import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchComments } from 'actions';
import 'styles/comments.less';

class Comments extends Component {
  componentWillMount() {
    const { actions, post } = this.props;
    if (post && !post.comments) actions.fetchComments(post.slug);
  }

  render() {
    // const { post } = this.props;

    return (
      <div className="comments">
        <h2>Discussion</h2>
        <span className="comment-count" />
        <ul className="comment-list" />

        <button className="see-all-comments">
          See all <span className="comment-count" />
        </button>

        <div className="comment-form form">
          <div id="respond" className="comment-respond">

            <h3 id="reply-title" className="comment-reply-title">
              Reply to <button href="#" className="reply-to-name" />
            </h3>

            <form action="http://laybabylay.com/wp-comments-post.php" method="post" id="commentform">
              <p className="comment-complete">Thank you for posting a comment!</p>

              <textarea className="form-area" name="comment" placeholder="Leave a comment" />

              <label htmlFor="author">
                Name
                <input className="form-input" type="text" id="author" placeholder="What’s your name?" value="" />
              </label>
              <label htmlFor="email">
                Email
                <input className="form-input" type="email" id="email" placeholder="What’s your email address?" value="" />
              </label>
              <label htmlFor="url">
                Website
                <input className="form-input" type="text" id="url" placeholder="What's your website url? (optional)" value="" />
              </label>
              <p className="form-submit">
                <input name="submit" type="submit" id="submit" value="Submit" />
              </p>

              <button href="#" className="cancel pull-right">cancel</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Comments.propTypes = {
  post: PropTypes.object,
  actions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchComments
    }, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Comments);
