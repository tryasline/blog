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
export const fetchLike = (slug: string, like: boolean, token: string) => {
  return async (disptach: AppDispatch) => {
    try {
      if (like) {
        const res = await articlesApi.likeArticle(slug, token);
        debugger;
      }
      if (!like) {
        const res = await articlesApi.deslikeArticle(slug, token);
      }
    } catch (e: any) {
      disptach(articleSlice.actions.articleFetchingError(e.message));
      console.log(e);
    }
  };
};
export const fetchDeleteArticle = (slug: string, token: string) => {
  return async (disptach: AppDispatch) => {
    try {
      disptach(articleSlice.actions.articleFetching());
      const res = await articlesApi.deleteArticle(slug, token);
      debugger;
    } catch (e: any) {
      console.log(e);
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
export const fetchCreatingArticle = (article: any, token: string) => {
  return async (disptach: AppDispatch) => {
    try {
      disptach(articleSlice.actions.articleFetching());
      const res = await articlesApi.creatingArtile(article, token);
      debugger;
    } catch (e: any) {
      disptach(articleSlice.actions.articleFetchingError(e.message));
      console.log(e);
    }
  };
};
export const fetchUpdateArticle = (
  article: any,
  slug: string,
  token: string
) => {
  return async (disptach: AppDispatch) => {
    try {
      disptach(articleSlice.actions.articleFetching());
      const res = await articlesApi.updateArtile(article, slug, token);
      debugger;
    } catch (e: any) {
      disptach(articleSlice.actions.articleFetchingError(e.message));
      console.log(e);
    }
  };
};

// 744
// offset numberPage * 5
