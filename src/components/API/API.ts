import axios from "axios";
import ArticleRequest from "../../types/article-type";
import { User } from "../../types/user-types";

const instanse = axios.create({
  baseURL: `https://blog.kata.academy/api/`,
});

export type userSignUp = {
  username: string;
  email: string;
  password: string;
};

export type uptadeUser = {
  username: string;
  email: string;
  password: string;
  image: string;
};

type userSignIn = Omit<userSignUp, "username">;

export type responseSignInAndUp = {
  user: User;
};

export const articlesApi = {
  getArticles: () => {
    return instanse.get<ArticleRequest>("articles?limit=5");
  },
  getPageArticles: (page: number) => {
    return instanse.get<ArticleRequest>(
      `articles?limit=5&offset=${page * 5 - 5}`
    );
  },
  getOneArticles: (slug: string) => {
    return instanse.get<any>(`articles/${slug}`);
  },
  deleteArticle: (slug: string, token: string) => {
    return instanse.delete<any>(`articles/${slug}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  creatingArtile(article: any, token: string) {
    return instanse.post(
      "articles ",
      { article },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },
  updateArtile(article: any, slug: string, token: string) {
    return instanse.put(
      `articles/${slug}`,
      { article },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },
  likeArticle: (slug: string, token: string) => {
    return instanse.post(`articles/${slug}/favorite`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  deslikeArticle: (slug: string, token: string) => {
    return instanse.delete(`articles/${slug}/favorite`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

export const actionAccount = {
  signUp: (user: userSignUp) => {
    return instanse.post<responseSignInAndUp>("users", { user });
  },
  signIn: (user: userSignIn) => {
    return instanse.post<responseSignInAndUp>("users/login", { user });
  },
  update: (user: uptadeUser, token: string) => {
    return instanse.put<responseSignInAndUp>(
      "user",
      { user },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  },
};
