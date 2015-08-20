/**
 * @param {String} domain
 * @param {Object} action
 * @param {String} action.data.filter
 */
export let SET_VISIBILITY_FILTER = (domain, action) => {
  return action.data.filter;
};
