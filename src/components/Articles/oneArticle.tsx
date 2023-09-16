import format from 'date-fns/format';
import { NavLink } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import logo from '../../assets/images/Rectangle 1.svg';
import heart from '../../assets/images/heart 1.svg';
import redheart from '../../assets/images/heartRed.svg';
import PopoverModal from '../Popover/Popover';

import clasess from './ArtickeItem.module.scss';
import { useCallback, useState } from 'react';
import { useAppDispatch } from '../../hook/redux-hook';
import { GetCookie } from '../../hook/Cookies';
import { fetchLike } from '../../store/reducer/article/action-creator';

function OneArticleItem(props: any) {
  const [like, setLike] = useState(false);
  const dispatch = useAppDispatch();
  const getUserToken = useCallback(() => JSON.parse(GetCookie('userToken')!), []);

  const handelLike = useCallback(
    (post: string) => {
      console.log('tog');
      setLike(!like);
      dispatch(fetchLike(post, !like, `${getUserToken()}`));
    },
    [dispatch, like]
  );
  let unikKey = 100;
  if (!props.oneArticle.slug) return <h2>Waiting...</h2>;
  return (
    <div className={clasess.articleWrapp}>
      <div className={clasess.articleHeader}>
        <div className={clasess.articleInfo}>
          <div className={clasess.titleWrap}>
            <span className={clasess.title}>
              <NavLink to={`/articles/${props.oneArticle.slug}`}>{props.oneArticle.title}</NavLink>
            </span>
            <button onClick={() => handelLike(props.oneArticle.slug)} disabled={!props.isAuth} type="button">
              {like && <img src={redheart} alt="heartRed" />}
              {!like && <img src={heart} alt="heart" />}
            </button>
            <span>{props.oneArticle.favoritesCount}</span>
          </div>
          <div className={clasess.tagWrap}>
            {props.oneArticle.tagList.length > 0
              ? props.oneArticle.tagList.map((tag: string, i: number) => {
                  if (tag === null && i < 4) return <span key={unikKey++}>#</span>;
                  if (i < 4) return <span key={unikKey++}>{tag}</span>;
                })
              : null}
          </div>
        </div>
        <div className={clasess.authorInfoOne}>
          <div className={clasess.author}>
            <div className={clasess.nameData}>
              <span>{props.oneArticle.author.username}</span>
              <span className={clasess.timePost}>{format(new Date(props.oneArticle.createdAt), 'MMMM d,y')}</span>
            </div>
            <div className={clasess.img}>
              <img src={logo} alt="#" />
            </div>
          </div>
          <div className={clasess.actionBtn}>
            <PopoverModal />
            <button className={clasess.btnEdit} type="button">
              <NavLink to={`/articles/${props.oneArticle.slug}/edit`}>Edit</NavLink>
            </button>
          </div>
        </div>
      </div>
      <div className={clasess.articleDesraption}>
        <p className={clasess.description}>{props.oneArticle.description}</p>
      </div>
      <div className={clasess.body}>
        <ReactMarkdown>{props.oneArticle.body}</ReactMarkdown>
      </div>
    </div>
  );
}

export default OneArticleItem;
