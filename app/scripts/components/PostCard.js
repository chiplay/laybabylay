import React, { Component } from 'react';

export default class PostCard extends Component {

  // TODO - styles and router "Link" to single post

  render() {
    const { post } = this.props;
    const imageSrc = 'https://res.cloudinary.com/laybabylay/image/upload/q_60,w_400/v1448851561/' + post.attachments[0].slug + '.jpg';

    return (
      <div className="postcard">

        <header>
          <h1 className="postcard__title">{post.title}</h1>
          <h2 className="postcard__subtitle">{post.subtitle}</h2>

          <div className="postcard__meta">
            <div className="postcard__category">{post.category}</div>
          </div>
        </header>

        <figure>
          <img className="postcard__image" src={imageSrc} alt={post.title} />
        </figure>

      </div>
    );
  }
}