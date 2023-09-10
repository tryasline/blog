import { combineReducers, configureStore } from "@reduxjs/toolkit";

import articleReducer from "./reducer/article/article-slice";

const rootReducer = combineReducers({
  articleReducer,
});

export const setupstore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupstore>;
export type AppDispatch = AppStore["dispatch"];
