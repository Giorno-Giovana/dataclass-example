import { api } from "./api";
import { User } from "./dataclasses";
import { IUser, IPost, IComment } from "./interfaces";

export async function interfaceWay() {
  const users = await api.users();

  const uesrsWithPostsAndComments = new Map<IUser, Map<IPost, IComment[]>>();

  for (const user of users.slice(0, 2)) {
    uesrsWithPostsAndComments.set(user, new Map());

    const posts = await api.posts(user.id);

    for (const post of posts.slice(0, 2)) {
      const comments = await api.comments(post.id);
      uesrsWithPostsAndComments.get(user)!.set(post, comments.slice(0, 2));
    }
  }

  return uesrsWithPostsAndComments;
}

export async function dataclassWay() {
  const users = await User.list();

  return users.map((u) => u.posts.map((p) => p.comments)).flat(Infinity);
}
