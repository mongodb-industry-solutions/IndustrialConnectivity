/*
 *
 * DetailsScreen reducer
 *
 */
import produce from 'immer';

export const initialState = {};

const detailsScreenReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      default:
        break;
    }
  });

export default detailsScreenReducer;
