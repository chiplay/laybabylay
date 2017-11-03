// import { createSelector } from 'reselect';

// import * as fromSearchDishes from './searchDishes';
// import * as fromDishes from './dishes';

export * from './posts';
export * from './pages';
export * from './search';

// export const getUserId = createSelector(
//   [
//     fromAuth.getAuthUserId,
//     fromAccount.getAccountUserId
//   ],
//   (authUserId, accountUserId) => authUserId || accountUserId
// );
//
// /* Memoized search results selector */
// export const getSearchDishesResult = createSelector(
//   [fromSearchDishes.getSearchResultDishIds, fromDishes.getMapOfDishes],
//   (dishIds, mapOfDishes) => dishIds.map(dishId => mapOfDishes[dishId])
// );
//
// // Filter out any variants that are already in the cart
// export const getFilteredReplacementProductsMap = createSelector(
//   [
//     fromCart.getCartProductIdMap,
//     fromProducts.getReplacementProductIdMap,
//     fromProducts.getMapOfProducts
//   ],
//   (cartProductIdMap, replacementProductsMap, mapOfProducts) => {
//     const cartProductIds = Object.keys(cartProductIdMap);
//
//     return Object.keys(replacementProductsMap)
//       .reduce((map, key) => {
//         const filteredProductIds = _difference(replacementProductsMap[key], cartProductIds);
//
//         // eslint-disable-next-line no-param-reassign
//         map[key] = filteredProductIds.map(id => mapOfProducts[id]);
//         return map;
//       }, {});
//   }
// );
//
// export const getCartAwareProductDiscoveryResults = createSelector(
//   [
//     fromProductDiscovery.getProductDiscoveryResults,
//     state => state
//   ],
//   (productIds = [], state) => {
//     return productIds.map(productId => {
//       const product = fromProducts.getProductById(state, { productId });
//       const variantMetadata = getProductVariantMetadata(state, { productId });
//       const { orderItems } = variantMetadata;
//       return {
//         variantMetadata,
//         product,
//         inDish
//       };
//     });
//   }
// );
