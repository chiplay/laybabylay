import React, { Component } from 'react';
import 'styles/sidebar.less';
import Author from '../components/Author';
import { Link } from 'react-router';

export default class Sidebar extends Component {

  fetchInstagram() {
    // move to action
    // fetch({
    //     url: 'https://api.instagram.com/v1/users/23543575/media/recent?client_id=8f4de1ccc04b4b92a48a6877840a26a6&count=1&callback=something',
    //     dataType: 'jsonp'
    //   })
    //   .then(function(response) {
    //     console.log(response);
    //     // if (response.data && response.data[0] && response.data[0].images && response.data[0].images.standard_resolution) {
    //     //   _this.viewModel.set({ instagramSrc: response.data[0].images.standard_resolution.url });
    //     //   _this.stickit(_this.viewModel);
    //     // }
    //   });
  }

  createTileLink(tile) {
    const { image = {}, link, link_type } = tile;

    if (tile.link_type === 'external') {
      return (
        <a href={tile.link} target="_blank" key={tile.index} className="sidebar-tile">
          <img src={`//res.cloudinary.com/laybabylay/image/upload/${image.title}.jpg`} />
          <h4>{tile.title}</h4>
        </a>
      );
    } else {
      return (
        <Link to={tile.link} key={tile.index} className="sidebar-tile">
          <img src={`//res.cloudinary.com/laybabylay/image/upload/${image.title}.jpg`} />
          <h4>{tile.title}</h4>
        </Link>
      );
    }
  }

  buildTiles(tiles) {
    return tiles.length ? tiles.map(this.createTileLink) : null;
  }

  render() {
    const { tiles } = this.props;

    this.fetchInstagram();

    return (
      <div className="sidebar">
        <Author {...this.props} />

        <div className="sidebar-tiles">
          {this.buildTiles(tiles)}
        </div>

        <div className="sidebar-module">
          <h4>Archives</h4>
          <ol className="list-unstyled">
            <li><a href="#">March 2014</a></li>
            <li><a href="#">February 2014</a></li>
            <li><a href="#">January 2014</a></li>
            <li><a href="#">December 2013</a></li>
            <li><a href="#">November 2013</a></li>
            <li><a href="#">October 2013</a></li>
            <li><a href="#">September 2013</a></li>
            <li><a href="#">August 2013</a></li>
            <li><a href="#">July 2013</a></li>
            <li><a href="#">June 2013</a></li>
            <li><a href="#">May 2013</a></li>
            <li><a href="#">April 2013</a></li>
          </ol>
        </div>
      </div>
    );
  }
}