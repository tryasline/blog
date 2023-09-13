import { FC, useState } from "react";
import { useForm } from "react-hook-form";

import classes from "./CreatingArticle.module.scss";

type newArticleType = {
  title: string;
  desription: string;
  text: string;
};

const CreatingArticle: FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState("");

  const { register, handleSubmit } = useForm<newArticleType>({
    mode: "onChange",
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  // const removeTag = (item: string, e: any) => {
  //   console.log(e);
  //   const newArr = tags.filter((ar) => item !== ar);
  //   setTags(newArr);
  // };

  // const addTag = (e: any) => {
  //   e.stopPropagation();
  //   setTags([...tags, tag]);
  //   setTag("");
  // };

  const toggleBtn = (e: any, item?: string) => {
    if (e.target.dataset.rem) {
      console.log("dlete");
      const newArr = tags.filter((ar) => item !== ar);
      setTags(newArr);
    }
    if (e.target.dataset.add) {
      e.stopPropagation();
      e.preventDefault();
      console.log("add");
      setTags([...tags, tag]);
      setTag("");
    }
  };

  let uniKey = 110;

  return (
    <div className={classes.newArticleWrap}>
      <h2>Create new article</h2>
      <form
        className={classes.formNewArticle}
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className={classes.titleArticle}>
          <span>Title</span>
          <input placeholder="Title" {...register("title")}></input>
        </label>

        <label className={classes.destiptionArticle}>
          <span>Short description</span>
          <input
            placeholder="Short description"
            {...register("desription")}
          ></input>
        </label>

        <label className={classes.textArticle}>
          <span>Text</span>
          <textarea placeholder="Text" {...register("text")}></textarea>
        </label>
        <label className={classes.tags}>
          <span>Tags</span>
          {tags.length === 0 ? (
            <div>
              <input
                value={tag}
                onChange={(e) => {
                  setTag(e.target.value);
                }}
              ></input>
              <div>
                <button
                  data-add="1"
                  type="button"
                  onClick={(e) => {
                    toggleBtn(e);
                  }}
                >
                  Add tag
                </button>
              </div>
            </div>
          ) : null}
          {tags.length > 0 ? (
            <div>
              {tags.map((tagg, i) => {
                if (i === tags.length - 1) {
                  return (
                    <div className={classes.lastTag}>
                      <div key={uniKey++}>
                        <span>{tagg}</span>
                        <div>
                          <button
                            data-rem="2"
                            type="button"
                            onClick={(e) => {
                              // removeTag(tagg, e);
                              // console.log("removetag 106");
                              toggleBtn(e, tagg);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <div key={uniKey++}>
                        <input
                          value={tag}
                          onChange={(e) => {
                            setTag(e.target.value);
                          }}
                        ></input>
                        <button
                          data-add="1"
                          type="button"
                          onClick={(e) => toggleBtn(e)}
                        >
                          Add tag
                        </button>
                      </div>
                    </div>
                  );
                }
                if (i !== tags.length - 1) {
                  return (
                    <div key={uniKey++}>
                      <span>{tagg}</span>
                      <button
                        data-rem="2"
                        type="button"
                        onClick={(e) => toggleBtn(e, tagg)}
                      >
                        Delete
                      </button>
                    </div>
                  );
                }
              })}
            </div>
          ) : null}
        </label>
        <button>Create</button>
      </form>
    </div>
  );
};

export default CreatingArticle;
