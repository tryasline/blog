import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { useAppDispatch } from '../../hook/redux-hook';
import { Article } from '../../types/article-type';
import { fetchOneArticle } from '../../store/reducer/article/action-creator';

import OneArticleItem from './oneArticle';

interface ArtickeItemProps {
  oneArticle: Article;
  error: string;
  isLoading: boolean;
  isAuth: boolean;
}

function WrappedOneArticl({ oneArticle, error, isLoading, isAuth }: ArtickeItemProps) {
  const dispatch = useAppDispatch();
  const { slug } = useParams();

  useEffect(() => {
    dispatch(fetchOneArticle(slug!));
  }, [dispatch, slug]);

  if (isLoading) return <h1>Идёт загрузка...</h1>;
  if (error) return <div>{error}</div>;
  if (oneArticle) {
    return <OneArticleItem oneArticle={oneArticle} isAuth={isAuth} />;
  }
  return <h1>Hello</h1>;
}

export default WrappedOneArticl;
