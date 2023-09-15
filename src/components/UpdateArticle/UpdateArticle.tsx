import { FC, useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";

import { useAppDispatch } from "../../hook/redux-hook";
import { GetCookie } from "../../hook/Cookies";

import classes from "./UpdateArticle.module.scss";
import { Article } from "../../types/article-type";
import { useParams } from "react-router-dom";

import {
  fetchOneArticle,
  fetchUpdateArticle,
} from "../../store/reducer/article/action-creator";

type newArticleType = {
  title: string;
  description: string;
  text: string;
};

type UpdateArticleProps = { oneArticle: Article };

const UpdateArticle: FC<UpdateArticleProps> = (props) => {
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState("");

  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  // const [body, setBody] = useState("");

  const dispatch = useAppDispatch();
  const { slug } = useParams();

  const infoArticle = useMemo(() => props.oneArticle, [props.oneArticle]);

  debugger;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<newArticleType>({
    mode: "onBlur",
  });

  useEffect(() => {
    if (slug) {
      dispatch(fetchOneArticle(slug));
    }
  }, [slug, dispatch]);

  useEffect(() => {
    if (props.oneArticle.slug) {
      setValue("title", props.oneArticle.title);
      setValue("text", props.oneArticle.body);
      setValue("description", props.oneArticle.description);
      setTags((state) => [...state, ...props.oneArticle.tagList]);
    }
  }, [infoArticle]);

  const onSubmit = (data: any) => {
    const { title, description, text: body } = data;
    console.log(data, slug);
    dispatch(
      fetchUpdateArticle(
        { title, description, body, tagList: tags },
        slug!,
        JSON.parse(GetCookie("userToken")!)
      )
    );
  };

  const addTag = () => {
    setTags([...tags, tag]);
    setTag("");
  };

  const removeTag = (e: any, remTag: string) => {
    e.stopPropagation();
    e.preventDefault();
    const newArr = tags.filter((item) => item !== remTag);
    setTags(newArr);
  };

  let uniKey = 110;

  return (
    <div className={classes.newArticleWrap}>
      <h2>Edit article</h2>
      <form
        className={classes.formNewArticle}
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className={classes.titleArticle}>
          <span>Title</span>
          <input
            placeholder="Title"
            {...register("title", { required: "Обязательное поле" })}
          ></input>
          <div className={classes.errorName}>
            {errors?.title && <p>{errors.title.message || "Error"}</p>}
          </div>
        </label>

        <label className={classes.destiptionArticle}>
          <span>Short description</span>
          <input
            placeholder="Short description"
            {...register("description", { required: "Обязательное поле" })}
          ></input>
          <div className={classes.errorName}>
            {errors?.description && (
              <p>{errors.description.message || "Error"}</p>
            )}
          </div>
        </label>

        <label className={classes.textArticle}>
          <span>Text</span>
          <textarea
            placeholder="Text"
            {...register("text", { required: "Обязательное поле" })}
          ></textarea>
          <div className={classes.errorName}>
            {errors?.text && <p>{errors.text.message || "Error"}</p>}
          </div>
        </label>
        <label className={classes.tags}>
          <span className={classes.titleTags}>Tags</span>
          <div>
            {tags.map((tagg) => {
              return (
                <div className={classes.lastTagWrap} key={uniKey++}>
                  <div className={classes.lastTag}>
                    <span className={classes.lastTagVal}>{tagg}</span>
                    <div>
                      <button
                        data-rem="2"
                        type="button"
                        onClick={(e) => removeTag(e, tagg)}
                        className={classes.removeBtn}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={classes.firstForm}>
            <input
              value={tag}
              onChange={(e) => {
                setTag(e.target.value);
              }}
            ></input>
            <button
              data-add="1"
              type="button"
              onClick={addTag}
              className={classes.addBtn}
            >
              Add tag
            </button>
          </div>
        </label>
        <button className={classes.creatingBtn}>Create</button>
      </form>
    </div>
  );
};

export default UpdateArticle;
