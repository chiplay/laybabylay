import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Flex, Box } from 'grid-styled';

import { fetchPosts, fetchPage, setActiveFilter } from 'actions';
import PostCards from 'components/PostCards';
import RecentPosts from 'components/RecentPosts';
import Sidebar from 'components/Sidebar';

import { getPageBySlug, getActivePosts } from 'selectors';

// Smart component
class HomeContainer extends Component {
  componentWillMount() {
    const { actions, home } = this.props;

    // Fetch featured posts via homepage relationship field
    if (!home.featured_posts.length) actions.fetchPage('home');
  }

  render() {
    const { home, actions, activePosts } = this.props;

    return (
      <Flex wrap>
        <Box width={1} mb={[10, 10, 40, 40]}>
          <PostCards featured={home.featured_posts} />
        </Box>

        <Box width={1} px={100} mx="auto" className="home__container">
          <Flex wrap>
            <RecentPosts home={home} activePosts={activePosts} actions={actions} />
            <Sidebar tiles={home.sidebar_tiles} />
          </Flex>
        </Box>
      </Flex>
    );
  }
}

HomeContainer.propTypes = {
  home: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  activePosts: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    home: getPageBySlug(state, 'home'),
    activePosts: getActivePosts(state, 'home')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchPosts,
      fetchPage,
      setActiveFilter
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
