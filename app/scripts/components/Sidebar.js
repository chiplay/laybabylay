import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { checkStatus, parseJSON } from 'utils';
import { Link } from 'react-router';
import { Box } from 'grid-styled';
import URI from 'urijs';

import 'styles/sidebar.less';
import Author from '../components/Author';

export default class Sidebar extends Component {

  componentDidMount() {
    // fetch({
    //   url: 'https://www.instagram.com/laybabylay/?__a=1'
    // })
    //   .then(checkStatus)
    //   .then(parseJSON)
    //   .then(response => {
    //     console.log(response);
    //     if (response.user && response.user.media) {
    //       console.log(response.user.media[0]);
    //     }
    //   });
  }

  createTileLink = (tile) => {
    const {
      image = {},
      link,
      link_type,
      title
    } = tile;

    let img = <div />;

    if (image.url) {
      const filename = new URI(image.url).filename();
      const imageSrc = `//res.cloudinary.com/laybabylay/image/upload/f_auto,q_35,w_540,h_360,c_fill/${filename}`;
      img = <img src={imageSrc} alt={title} />;
    }

    if (link_type === 'external') {
      return (
        <a href={link} target="_blank" key={title} className="sidebar-tile">
          {img}
          <h4>{title}</h4>
        </a>
      );
    }
    return (
      <Link to={link} key={title} className="sidebar-tile">
        {img}
        <h4>{title}</h4>
      </Link>
    );
  }

  buildTiles(tiles) {
    return tiles.length ? tiles.map(this.createTileLink) : null;
  }

  render() {
    const { tiles } = this.props;

    return (
      <Box width={[1, 1, 1, 1/3]} pl={30} className="sidebar">
        <Author {...this.props} />

        <div className="sidebar-tiles">
          {this.buildTiles(tiles)}
        </div>
      </Box>
    );
  }
}

Sidebar.propTypes = {
  tiles: PropTypes.array.isRequired
};
