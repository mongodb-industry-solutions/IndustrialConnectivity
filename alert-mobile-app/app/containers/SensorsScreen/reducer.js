import produce from 'immer';

export const initialState = {
};

/* eslint-disable default-case, no-param-reassign */
const sensorsScreenReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      default:
        break;
    }
  });

export default sensorsScreenReducer;
