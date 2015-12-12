import { RECEIVE_POSTS, RECEIVE_POST } from '../actions';

const defaultState = {
    posts: [],
    activePost: {},
    pageNum: 1,
    totalPages: 1
};

export default function posts(state = defaultState, action) {
    switch(action.type) {
        case RECEIVE_POSTS:
            const { pageNum, totalPages, posts } = action.payload;

            return Object.assign({}, state, {
                posts,
                pageNum,
                post: posts[0],
                totalPages: parseInt(totalPages)
            });

        case RECEIVE_POST:
            const { post } = action.payload;

            return Object.assign({}, state, {
                posts: state.posts.push(post),
                activePost: post
            });

        default:
            return state;
    }

}