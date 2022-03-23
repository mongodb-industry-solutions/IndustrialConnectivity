/*
 *
 * HomeScreen reducer
 *
 */
import produce from 'immer';

export const initialState = {
};

/* eslint-disable default-case, no-param-reassign */
const homeScreenReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case 'LOGIN_USER':
        return {
          user: action.user
        };
    }

  });

export default homeScreenReducer;
