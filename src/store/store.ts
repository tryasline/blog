import { combineReducers, configureStore } from '@reduxjs/toolkit';

import articleReducer from './reducer/article/article-slice';
import userReducer from './reducer/user/user-slice';

const rootReducer = combineReducers({
  articleReducer,
  userReducer,
});

export const setupstore = () =>
  configureStore({
    reducer: rootReducer,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupstore>;
export type AppDispatch = AppStore['dispatch'];
