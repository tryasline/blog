import axios from "axios";
import { AppDispatch } from "../../store";
import { articleSlice } from "./article-slice";
import ArticleRequest from "../../../types/article-type";

export const fetchArticle = () => {
  return async (disptach: AppDispatch) => {
    try {
      disptach(articleSlice.actions.articleFetching());
      const res = await axios.get<ArticleRequest>(
        "https://blog.kata.academy/api/articles?limit=5"
      );
      disptach(articleSlice.actions.articleFetchingSuccess(res.data));
    } catch (e: any) {
      disptach(articleSlice.actions.articleFetchingError(e.message));
    }
  };
};

export const fetchArticlePage = (page: number) => {
  return async (disptach: AppDispatch) => {
    try {
      disptach(articleSlice.actions.articleFetching());
      const res = await axios.get<ArticleRequest>(
        `https://blog.kata.academy/api/articles?limit=5&offset=${page * 5 - 5}`
      );
      disptach(articleSlice.actions.articleFetchingSuccess(res.data));
    } catch (e: any) {
      disptach(articleSlice.actions.articleFetchingError(e.message));
    }
  };
};
export const fetchOneArticle = (slug: string) => {
  return async (disptach: AppDispatch) => {
    try {
      disptach(articleSlice.actions.articleFetching());
      const res = await axios.get<any>(
        `https://blog.kata.academy/api/articles/${slug}`
      );
      disptach(
        articleSlice.actions.oneArticleFetchingSuccess(res.data.article)
      );
    } catch (e: any) {
      disptach(articleSlice.actions.articleFetchingError(e.message));
    }
  };
};

// 744
// offset numberPage * 5
