import React, { Component } from 'react';

// Dumb component
export default class Post extends Component {
  createMarkup(html) {
    return {
      __html: html
    };
  }

  // TODO - related post and comments, social buttons logic (actions?)

  render() {
    const { post } = this.props;

    return (
      <div className="container">

        <header className="align-center">
          <h1 className="title">{post.title}</h1>
          <h2 className="subtitle">{post.subtitle}</h2>
        </header>

        <div className="meta">
          <div className="date">{post.date}</div>
          <div className="color-palette-region" />
        </div>

        <div className="content" dangerouslySetInnerHTML={this.createMarkup(post.content)} />

        <div className="categories-region" />

        <div className="addthis-region">
          <button className="pinterest-button">Pin It</button>
          <button className="tweet-button">Tweet</button>
          <button className="facebook-button">Share on Facebook</button>
        </div>

        <div className="comments-region" />
        <div className="related-posts-region" />

      </div>

    );
  }
}