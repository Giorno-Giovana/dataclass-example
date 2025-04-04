import { IUser, IPost, IComment } from "./interfaces";

export function req<T>(url: string): Promise<T> {
  return fetch(`https://jsonplaceholder.typicode.com/${url}`).then((res) =>
    res.json()
  );
}

export const api = {
  users: () => req<IUser[]>("users"),
  posts: (id: IUser["id"]) => req<IPost[]>(`users/${id}/posts`),
  comments: (id: IPost["id"]) => req<IComment[]>(`posts/${id}/comments`),
};
