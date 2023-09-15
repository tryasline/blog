import { useState, useEffect } from "react";

import { Pagination } from "antd";

import { Article } from "../../types/article-type";
import ArticleItem from "./ArtickeItem";
import classes from "./ArtickeItem.module.scss";
import { useAppDispatch } from "../../hook/redux-hook";

import { fetchArticlePage } from "../../store/reducer/article/action-creator";

interface ArtickeItemProps {
  articles: Article[];
  oneArticle?: Article;
  articlesCount: number;
  error: string;
  isLoading: boolean;
  isAuth: boolean;
}

const WrappedArticleItemList = (props: ArtickeItemProps) => {
  const { error, isLoading } = props;

  const [page, setPage] = useState(1);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchArticlePage(page));
  }, [page, dispatch]);

  const changePage = (page: number) => {
    setPage((state) => (state = page));
  };

  if (error) return <div>{error}</div>;
  if (isLoading) return <h1>Идёт загрузка...</h1>;

  if (props.articles.length) {
    const countPage = Math.ceil((props.articlesCount / 5) * 10);
    return (
      <>
        {props.articles!.map((articl) => (
          <div className="container" key={articl.slug}>
            <ArticleItem {...articl} isAuth={props.isAuth} />
          </div>
        ))}
        <div className={classes.paginationArticle}>
          <Pagination
            defaultCurrent={page}
            total={countPage}
            onChange={(page) => changePage(page)}
          />
        </div>
      </>
    );
  } else return <div>Hello</div>;
};

export default WrappedArticleItemList;
