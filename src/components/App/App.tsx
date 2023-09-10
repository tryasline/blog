import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import WrappedArticleItemList from "../Articles/ContainerArtickeItem";
import Layout from "../Layout/Layout";
import Account from "../Account/Account";

import { useAppDispatch, useAppSelector } from "../../hook/redux-hook";
import { fetchArticle } from "../../store/reducer/article/action-creator";

const App = () => {
  const disptach = useAppDispatch();
  const { article, articlesCount, error, isLoading, oneArticle } =
    useAppSelector((state) => state.articleReducer);
  useEffect(() => {
    disptach(fetchArticle());
  }, [disptach]);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <WrappedArticleItemList
              articles={article}
              articlesCount={articlesCount}
              error={error}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path="/articles/:slug"
          element={
            <WrappedArticleItemList
              articles={article}
              articlesCount={articlesCount}
              error={error}
              isLoading={isLoading}
              oneArticle={oneArticle}
            />
          }
        />
        <Route path="/sign-up" element={<Account />} />
        <Route path="#" element={<div>Not found</div>} />
      </Route>
    </Routes>
  );
};

export default App;
