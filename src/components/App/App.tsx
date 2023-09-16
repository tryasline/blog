import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import WrappedArticleItemList from '../Articles/ContainerArtickeItem';
import Layout from '../Layout/Layout';
import CreatingAccount from '../CreatingAccount/CreatingAccount';
import SignInPage from '../SignIn/SignIn';
import Profile from '../Profile/Profile';
import CreatingArticle from '../CreatingArticle/CreatingArticle';
import UpdateArticle from '../UpdateArticle/UpdateArticle';
import { useAppDispatch, useAppSelector } from '../../hook/redux-hook';
import { fetchArticle } from '../../store/reducer/article/action-creator';
import { fetchAuth } from '../../store/reducer/user/action-creator';
import { GetCookie } from '../../hook/Cookies';
import WrappedOneArticl from '../Articles/ContainerOneArticke';

function App() {
  const disptach = useAppDispatch();
  const { article, articlesCount, error, isLoading, oneArticle } = useAppSelector((state) => state.articleReducer);
  const { isAuth } = useAppSelector((state) => state.userReducer);
  useEffect(() => {
    disptach(fetchArticle());
  }, [disptach]);

  useEffect(() => {
    if (GetCookie('userToken')) {
      disptach(fetchAuth());
    }
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
              isAuth={isAuth!}
            />
          }
        />
        <Route
          path="/articles/:slug"
          element={<WrappedOneArticl error={error} oneArticle={oneArticle} isLoading={isLoading} />}
        />
        <Route path="/sign-up" element={<CreatingAccount />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/creat-article" element={<CreatingArticle />} />
        <Route path="/articles/:slug/edit" element={<UpdateArticle oneArticle={oneArticle} />} />
        <Route path="#" element={<div>Not found</div>} />
      </Route>
    </Routes>
  );
}

export default App;
