import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import ArticleRequest, { Article } from "../../../types/article-type";

interface ArticleState {
  article: Article[];
  oneArticle: Article;
  articlesCount: number;
  isLoading: boolean;
  error: string;
  isAuth: boolean;
}

const initialState: ArticleState = {
  article: [],
  oneArticle: {
    slug: "",
    title: "",
    description: "",
    body: "",
    tagList: [],
    createdAt: "",
    updatedAt: "",
    favorited: false,
    favoritesCount: 0,
    author: {
      username: "",
      bio: "",
      image: "",
      following: false,
    },
  },
  articlesCount: 0,
  isLoading: false,
  error: "",
  isAuth: false,
};

export const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    articleFetching(state) {
      state.isLoading = true;
    },

    articleFetchingSuccess(state, action: PayloadAction<ArticleRequest>) {
      state.isLoading = false;
      state.article = action.payload.articles;
      state.articlesCount = action.payload.articlesCount;
      state.error = "";
    },
    oneArticleFetchingSuccess(state, action: PayloadAction<Article>) {
      state.isLoading = false;
      state.oneArticle = action.payload;
      state.error = "";
    },

    articleFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default articleSlice.reducer;
