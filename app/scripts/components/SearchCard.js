import React, { Component } from 'react';
import { decodeHtml } from 'utils';
import URI from 'urijs';
import 'styles/search-card.less';

// Dumb component
export default class SearchCard extends Component {

  render() {
    const { item } = this.props,
          { image = {}, title } = item,
          filename = image.url ? new URI(image.url).filename() : null,
          imageSrc = filename ? `//res.cloudinary.com/laybabylay/image/upload/q_40,w_500/${filename.replace(/\.[^/.]+$/, '')}.jpg` : null;

    return (
      <article className="search-card">

        <div className="search-card__bg">
          <img className="search-card__image" src={imageSrc} alt={item.title} />
        </div>

        <header className="search-card__header">
          <h5 className="search-card__title">{decodeHtml(title)}</h5>
        </header>

      </article>
    );
  }
}