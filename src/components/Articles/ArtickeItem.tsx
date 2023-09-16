import { useState, useMemo, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import format from 'date-fns/format';

import { fetchLike } from '../../store/reducer/article/action-creator';
import { GetCookie } from '../../hook/Cookies';
import { useAppDispatch } from '../../hook/redux-hook';
import logo from '../../assets/images/Rectangle 1.svg';
import heart from '../../assets/images/heart 1.svg';
import heartRed from '../../assets/images/heartRed.svg';

import clasess from './ArtickeItem.module.scss';

function ArticleItem({ title, description, favoritesCount, tagList, author, slug, createdAt, isAuth, favorited }: any) {
  const [like, setLike] = useState(false);
  const dispatch = useAppDispatch();

  const token = useMemo(() => JSON.parse(GetCookie('userToken')!), []);

  const handelLike = useCallback(
    (post: string) => {
      setLike(!like);
      dispatch(fetchLike(post, !like, `${token}`));
    },
    [dispatch, like, token]
  );

  if (!slug) return <h1>Not Found</h1>;
  let unikKey = 100;
  return (
    <div className={clasess.articleWrapp}>
      <div className={clasess.articleHeader}>
        <div className={clasess.articleInfo}>
          <div className={clasess.titleWrap}>
            <span className={clasess.title}>
              <NavLink to={`/articles/${slug}`}>{title}</NavLink>
            </span>
            <button onClick={() => handelLike(slug)} disabled={!isAuth} type="button">
              {like && <img src={heartRed} alt="heartRed" />}
              {!like && <img src={heart} alt="heart" />}
            </button>
            <span>{favoritesCount}</span>
          </div>
          <div className={clasess.tagWrap}>
            {tagList.length > 0
              ? tagList.map((tag: string, i: number) => {
                  if (tag === null && i < 4)
                    return (
                      <span key={unikKey++} className={clasess.oneTag}>
                        #
                      </span>
                    );
                  if (i < 4)
                    return (
                      <span key={unikKey++} className={clasess.oneTag}>
                        {tag}
                      </span>
                    );
                })
              : null}
          </div>
        </div>
        <div className={clasess.authorInfo}>
          <div className={clasess.nameData}>
            <span>{author.username}</span>
            <span className={clasess.timePost}>{format(new Date(createdAt), 'MMMM d,y')}</span>
          </div>
          <div className={clasess.img}>
            <img src={logo} alt="#" />
          </div>
        </div>
      </div>
      <div className={clasess.articleDesraption}>
        <p className={clasess.description}>{description}</p>
      </div>
    </div>
  );
}

export default ArticleItem;
