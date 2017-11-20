import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RelatedPost from 'components/RelatedPost';

export default class RelatedPosts extends Component {

  buildPosts = (posts) => {
    return posts.length ? posts.map(post => {
      return (<div key={post.ID}><RelatedPost post={post} /></div>);
    }) : null;
  }

  render() {
    const { related } = this.props;

    return (
      <div className="related-posts">
        <h2 className="related-posts__title">Check Out These Similar Posts</h2>

        {this.buildPosts(related)}
      </div>
    );
  }
}

RelatedPosts.propTypes = {
  related: PropTypes.array.isRequired
};
