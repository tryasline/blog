import { articlesApi } from "../../../components/API/API";
import { AppDispatch } from "../../store";
import { articleSlice } from "./article-slice";

export const fetchArticle = () => {
  return async (disptach: AppDispatch) => {
    try {
      disptach(articleSlice.actions.articleFetching());
      const res = await articlesApi.getArticles();
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
      const res = await articlesApi.getPageArticles(page);
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
      const res = await articlesApi.getOneArticles(slug);
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
