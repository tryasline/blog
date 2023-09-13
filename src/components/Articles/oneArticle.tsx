import format from "date-fns/format";
import { NavLink } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import clasess from "./ArtickeItem.module.scss";
import logo from "../../assets/images/Rectangle 1.svg";
import heart from "../../assets/images/heart 1.svg";

const OneArticleItem = ({
  slug,
  title,
  description,
  body,
  tags: tagList,
  createdAt,
  favorited,
  favoritesCount,
  author,
}: any) => {
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
            <span className={clasess.img}>
              <img src={heart} alt="heart" />
            </span>
            <span>{favoritesCount}</span>
          </div>
          <div className={clasess.tagWrap}>
            {tagList.length > 0
              ? tagList.map((tag: string, i: number) => {
                  if (tag === null && i < 4)
                    return <span key={unikKey++}>#</span>;
                  else if (i < 4) return <span key={unikKey++}>{tag}</span>;
                })
              : null}
          </div>
        </div>
        <div className={clasess.authorInfo}>
          <div className={clasess.nameData}>
            <span>{author.username}</span>
            <span className={clasess.timePost}>
              {format(new Date(createdAt), "MMMM d,y")}
            </span>
          </div>
          <div className={clasess.img}>
            <img src={logo} alt="#" />
          </div>
        </div>
      </div>
      <div className={clasess.articleDesraption}>
        <p className={clasess.description}>{description}</p>
      </div>
      <div className={clasess.body}>
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    </div>
  );
};

export default OneArticleItem;
