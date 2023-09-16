import { articlesApi } from '../../../components/API/API';
import { AppDispatch } from '../../store';

import { articleSlice } from './article-slice';

export const fetchArticle = () => async (disptach: AppDispatch) => {
  try {
    disptach(articleSlice.actions.articleFetching());
    const res = await articlesApi.getArticles();
    disptach(articleSlice.actions.articleFetchingSuccess(res.data));
  } catch (e: any) {
    disptach(articleSlice.actions.articleFetchingError(e.message));
  }
};
export const fetchLike = (slug: string, like: boolean, token: string) => async (disptach: AppDispatch) => {
  try {
    if (like) {
      const res = await articlesApi.likeArticle(slug, token);
      disptach(articleSlice.actions.articleLike(slug));
    }
    if (!like) {
      const res = await articlesApi.deslikeArticle(slug, token);
      disptach(articleSlice.actions.articleDesLike(slug));
    }
  } catch (e: any) {
    disptach(articleSlice.actions.articleFetchingError(e.message));
    console.log(e);
  }
};
export const fetchDeleteArticle = (slug: string, token: string) => async (disptach: AppDispatch) => {
  try {
    disptach(articleSlice.actions.articleFetching());
    const res = await articlesApi.deleteArticle(slug, token);
  } catch (e: any) {
    console.log(e);
    disptach(articleSlice.actions.articleFetchingError(e.message));
  }
};

export const fetchArticlePage = (page: number) => async (disptach: AppDispatch) => {
  try {
    disptach(articleSlice.actions.articleFetching());
    const res = await articlesApi.getPageArticles(page);

    disptach(articleSlice.actions.articleFetchingSuccess(res.data));
  } catch (e: any) {
    disptach(articleSlice.actions.articleFetchingError(e.message));
  }
};
export const fetchOneArticle = (slug: string) => async (disptach: AppDispatch) => {
  try {
    disptach(articleSlice.actions.articleFetching());
    const res = await articlesApi.getOneArticles(slug);

    disptach(articleSlice.actions.oneArticleFetchingSuccess(res.data.article));
  } catch (e: any) {
    disptach(articleSlice.actions.articleFetchingError(e.message));
  }
};
export const fetchCreatingArticle = (article: any, token: string) => async (disptach: AppDispatch) => {
  try {
    disptach(articleSlice.actions.articleFetching());
    const res = await articlesApi.creatingArtile(article, token);
  } catch (e: any) {
    disptach(articleSlice.actions.articleFetchingError(e.message));
    console.log(e);
  }
};
export const fetchUpdateArticle = (article: any, slug: string, token: string) => async (disptach: AppDispatch) => {
  try {
    disptach(articleSlice.actions.articleFetching());
    const res = await articlesApi.updateArtile(article, slug, token);
  } catch (e: any) {
    disptach(articleSlice.actions.articleFetchingError(e.message));
    console.log(e);
  }
};
