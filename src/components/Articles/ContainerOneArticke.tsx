import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "../../hook/redux-hook";

import OneArticleItem from "./oneArticle";
import { Article } from "../../types/article-type";
import { fetchOneArticle } from "../../store/reducer/article/action-creator";

interface ArtickeItemProps {
  oneArticle: Article;
  error: string;
  isLoading: boolean;
}

const WrappedOneArticl = ({
  oneArticle,
  error,
  isLoading,
}: ArtickeItemProps) => {
  const dispatch = useAppDispatch();
  const { slug } = useParams();

  useEffect(() => {
    dispatch(fetchOneArticle(slug!));
  }, [dispatch, slug]);

  if (isLoading) return <h1>Идёт загрузка...</h1>;
  if (error) return <div>{error}</div>;
  else if (oneArticle) {
    return <OneArticleItem oneArticle={oneArticle} />;
  } else return <h1>Hello</h1>;
};

export default WrappedOneArticl;
