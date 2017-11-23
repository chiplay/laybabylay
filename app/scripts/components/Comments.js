import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Waypoint from 'react-waypoint';
import moment from 'moment';
import classNames from 'classnames';
import URLSearchParams from 'url-search-params';

import { fetchComments, submitComment } from 'actions';
import 'styles/comments.less';

class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      form: false,
      complete: false,
      content: '',
      parent: '',
      author: '',
      email: '',
      url: '',
      replyTo: ''
    };
  }

  fetchComments = () => {
    const { actions, post } = this.props;
    if (post && !post.comments) actions.fetchComments(post.post_id);
  }

  expandComments = () => {
    this.setState({ expanded: true });
  }

  expandForm = () => {
    this.setState({ form: true });
  }

  collapseForm = () => {
    this.setState({ form: false, parent: '' });
  }

  handleInputChange = (event) => {
    const { target } = event,
          { value, name } = target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    const { actions, post } = this.props,
          { post_id } = post,
          {
            email,
            url,
            author,
            content,
            parent
          } = this.state;

    const searchParams = new URLSearchParams();
    searchParams.set('post_id', post_id);
    searchParams.set('url', url);
    searchParams.set('name', author);
    searchParams.set('content', content);
    searchParams.set('parent', parent);
    searchParams.set('email', email);

    actions.submitComment(searchParams);
    this.setState({
      complete: true,
      form: false,
      author: '',
      content: '',
      url: '',
      email: '',
      parent: ''
    });
    event.preventDefault();
  }

  showReplyForm = (id, author_name) => {
    this.setState({
      replyTo: author_name,
      parent: id,
      form: true
    });
  }

  createMarkup = (content) => {
    return {
      __html: content ? content.rendered : null
    };
  }

  renderCommentList = (comments = [], expanded) => {
    const commentList = expanded ? comments : comments.slice(0, 5);
    const { parent: replyParent } = this.state;

    return commentList.map(comment => {
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
            <button className="comment-reply-link" onClick={() => this.showReplyForm(id, author_name)}>reply</button>
            <div className="comment-body" dangerouslySetInnerHTML={this.createMarkup(content)} />
            {replyParent === id && this.renderCommentForm()}
          </div>
        </li>
      );
    });
  }

  renderCommentForm = () => {
    const { form, replyTo } = this.state;

    return (
      <div className="comment-form form">
        <div id="respond" className="comment-respond">

          {replyTo ?
            <h3 id="reply-title" className="comment-reply-title">
              Reply to {replyTo}
            </h3> : null
          }

          <form
            action="https://wp.laybabylay.com/wp-comments-post.php"
            method="post"
            id="commentform"
            onSubmit={this.handleSubmit}
          >
            <p className="comment-complete">Thank you for posting a comment!</p>

            <textarea
              className="form-area"
              name="content"
              id="content"
              placeholder="Leave a comment"
              onFocus={this.expandForm}
              value={this.state.content}
              onChange={this.handleInputChange}
            />

            {form && this.renderFormFields()}
          </form>
        </div>
      </div>
    );
  }

  renderFormFields = () => {
    return (
      <div>
        <label htmlFor="author">
          Name
          <input
            className="form-input"
            type="text"
            name="author"
            id="author"
            placeholder="What’s your name?"
            value={this.state.author}
            onChange={this.handleInputChange}
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            className="form-input"
            type="email"
            name="email"
            id="email"
            placeholder="What’s your email address?"
            value={this.state.email}
            onChange={this.handleInputChange}
          />
        </label>
        <label htmlFor="url">
          Website
          <input
            className="form-input"
            type="text"
            name="url"
            id="url"
            placeholder="What's your website url? (optional)"
            value={this.state.url}
            onChange={this.handleInputChange}
          />
        </label>
        <p className="form-submit">
          <input
            name="submit"
            type="submit"
            id="submit"
            value="Submit"
          />
        </p>
        <button
          href="#"
          className="cancel pull-right"
          onClick={this.collapseForm}
        >
          cancel
        </button>
      </div>
    );
  }

  render() {
    const { post } = this.props,
          {
            expanded,
            form,
            complete,
            parent
          } = this.state,
          { comments = [] } = post;

    const commentClasses = classNames('comments', { complete, form });

    return (
      <div className={commentClasses}>
        <Waypoint
          scrollableAncestor={window}
          topOffset="-90px"
          onEnter={this.fetchComments}
        />
        <h2>Discussion</h2>
        <span className="comment-count" />
        <ul className="comment-list">
          {this.renderCommentList(comments, expanded)}
        </ul>

        {comments.length > 5 && !expanded ?
          <button className="see-all-comments" onClick={this.expandComments}>
            See all <span className="comment-count">{comments.length}</span> comments
          </button> : null
        }

        {!parent && this.renderCommentForm()}
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
      fetchComments,
      submitComment
    }, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Comments);
