import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { fetchCreatingArticle } from '../../store/reducer/article/action-creator';
import { useAppDispatch } from '../../hook/redux-hook';
import { GetCookie } from '../../hook/Cookies';

import classes from './CreatingArticle.module.scss';

type newArticleType = {
  title: string;
  description: string;
  text: string;
};

const CreatingArticle: FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState('');
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<newArticleType>({
    mode: 'onBlur',
  });

  const onSubmit = (data: any) => {
    console.log(tags);
    const { title, description, text: body } = data;
    dispatch(fetchCreatingArticle({ title, description, body, tagList: tags }, JSON.parse(GetCookie('userToken')!)));
  };

  const addTag = () => {
    setTags([...tags, tag]);
    setTag('');
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
      <h2>Create new article</h2>
      <form className={classes.formNewArticle} onSubmit={handleSubmit(onSubmit)}>
        <label className={classes.titleArticle}>
          <span>Title</span>
          <input placeholder="Title" {...register('title', { required: 'Обязательное поле' })} />
          <div className={classes.errorName}>{errors?.title && <p>{errors.title.message || 'Error'}</p>}</div>
        </label>

        <label className={classes.destiptionArticle}>
          <span>Short description</span>
          <input placeholder="Short description" {...register('description', { required: 'Обязательное поле' })} />
          <div className={classes.errorName}>
            {errors?.description && <p>{errors.description.message || 'Error'}</p>}
          </div>
        </label>

        <label className={classes.textArticle}>
          <span>Text</span>
          <textarea placeholder="Text" {...register('text', { required: 'Обязательное поле' })} />
          <div className={classes.errorName}>{errors?.text && <p>{errors.text.message || 'Error'}</p>}</div>
        </label>
        <label className={classes.tags}>
          <span className={classes.titleTags}>Tags</span>
          <div>
            {tags.map((tagg) => (
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
            ))}
          </div>
          <div className={classes.firstForm}>
            <input
              value={tag}
              onChange={(e) => {
                setTag(e.target.value);
              }}
            />
            <button data-add="1" type="button" onClick={addTag} className={classes.addBtn}>
              Add tag
            </button>
          </div>
        </label>
        <button className={classes.creatingBtn} type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreatingArticle;
