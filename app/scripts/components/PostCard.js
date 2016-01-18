import React, { Component } from 'react';
import URI from 'urijs';
import 'styles/postcard.less';

export default class PostCard extends Component {

  // TODO - styles and router "Link" to single post

  render() {
    const { post } = this.props;
    const firstImage = post.attachments[0];
    let image = <div />;

    if (firstImage) {
      const filename = new URI(firstImage.url).filename();
      const imageSrc = 'https://res.cloudinary.com/laybabylay/image/upload/f_auto,q_40,w_500,h_1000,c_fill/v1448851561/' + filename;
      image = <figure className="postcard__image--wrapper"><img className="postcard__image" src={imageSrc} alt={post.title} /></figure>;
    }

    return (
      <div className="postcard">

        <header>
          <h1 className="postcard__title">{post.title}</h1>
          <h2 className="postcard__subtitle">{post.subtitle}</h2>

          <div className="postcard__meta">
            <div className="postcard__category">{post.category}</div>
          </div>
        </header>

        {image}

      </div>
    );
  }
}