import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Waypoint from 'react-waypoint';
import moment from 'moment';

import { fetchComments } from 'actions';
import 'styles/comments.less';

class Comments extends Component {

  // TODO - Add state to limit initial comment list to 5 w/ view all

  fetchComments = (props) => {
    const { actions, post } = props;
    if (post && !post.comments) actions.fetchComments(post.post_id);
  }

  createMarkup = (content) => {
    return {
      __html: content ? content.rendered : null
    };
  }

  renderCommentList = (comments = []) => {
    return comments.map(comment => {
      const {
        date,
        content,
        author_name,
        author_url,
        author_avatar_urls = {},
        status,
        id,
        parent
      } = comment;

      if (status !== 'approved') return null;

      const hex = Math.floor(Math.random() * 0xFFFFFF);
      const avatarBorderStyle = { borderColor: `#${(`000000${hex.toString(16)}`).substr(-6)}` };

      return (
        <li key={id} className={`comment comment-single normalize ${parent && 'child'}`}>
          <div className="comment-author-avatar" style={avatarBorderStyle}>
            <img alt="" src={author_avatar_urls['96']} className="avatar" height="80" width="80" />
          </div>
          <div className="comment-main">
            <h1 className="comment-author-name">
              <a href={author_url} target="_blank">{author_name}</a>
            </h1>
            <p className="comment-date">{moment(date).format('MMMM Do, YYYY')}</p>
            <button className="comment-reply-link">reply</button>
            <div className="comment-body" dangerouslySetInnerHTML={this.createMarkup(content)} />
          </div>
        </li>
      );
    });
  }

  render() {
    const { post } = this.props,
          { comments } = post;

    return (
      <div className="comments">
        <Waypoint
          scrollableAncestor={window}
          topOffset="-90px"
          onEnter={() => this.fetchComments(this.props)}
        />
        <h2>Discussion</h2>
        <span className="comment-count" />
        <ul className="comment-list">
          {this.renderCommentList(comments)}
        </ul>

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
