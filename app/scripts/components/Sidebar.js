import React, { Component } from 'react';
import 'styles/sidebar.less';
import Author from '../components/Author';


export default class Sidebar extends Component {

  buildTiles(tiles) {
    return tiles.length ? tiles.map(tile =>
      <div key={tile.index}>{tile.title}</div>
    ) : <div />;
  }

  render() {
    const { tiles } = this.props;

    return (
      <div className="sidebar">
        <Author {...this.props} />

        {this.buildTiles(tiles)}

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