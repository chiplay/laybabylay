import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Flex, Box } from 'grid-styled';
import Sidebar from 'components/Sidebar';

import 'styles/post.less';

export default class Post extends Component {

  render() {
    const { sidebarTiles } = this.props;
    // const { error } = post;

    return (
      <Box
        width={1}
        m="auto"
        pb={20}
        px={[10, 10, 10, 40]}
        is="article"
        className="post"
      >
        <Flex wrap>
          <Box width={[1, 1, 1, 2/3]}>
            <Helmet>
              <title itemProp="name" lang="en">404 - Post Not Found</title>
              <meta name="prerender-status-code" content="404" />
            </Helmet>

            <Box
              width={1}
              m="auto"
              pt={[30, 30, 30, 50]}
              px={[15, 15, 15, 40]}
              is="header"
              className="post__header"
            >
              <h1 className="post__title">404 Post Not Found</h1>
            </Box>

            <Box
              width={1}
              m="auto"
              pt={10}
              px={[15, 15, 15, 40]}
              className="post__content"
            >
              <div>
                <p>Please try one of the links above to continue browsing.</p>
              </div>
            </Box>
          </Box>

          <Sidebar tiles={sidebarTiles} />
        </Flex>
      </Box>
    );
  }
}

Post.propTypes = {
  sidebarTiles: PropTypes.array
};
