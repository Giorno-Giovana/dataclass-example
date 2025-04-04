import { Data } from "./dataclass";
import { api } from "./api";
import { IAddress, IComment, ICompany, IPost, IUser } from "./interfaces";

export class User extends Data implements IUser {
  id: number = 0;
  name: string = "";
  username: string = "";
  email: string = "";
  address: IAddress = {
    street: "",
    suite: "",
    city: "",
    zipcode: "",
    geo: {
      lat: "",
      lng: "",
    },
  };
  phone: string = "";
  website: string = "";
  company: ICompany = {
    name: "",
    catchPhrase: "",
    bs: "",
  };

  posts: Post[] = [];

  static async new(user: IUser) {
    const u = User.create(user);
    u.posts = await u.getPosts();
    return u;
  }

  static async list() {
    const users = await api.users();
    return Promise.all(users.slice(0, 2).map((u) => User.new(u)));
  }

  async getPosts() {
    const rawPosts = await api.posts(this.id);
    const posts = await Promise.all(
      rawPosts.slice(0, 2).map((p) => Post.new(p))
    );
    return posts;
  }
}

class Post extends Data implements IPost {
  userId: number = 0;
  id: number = 0;
  title: string = "";
  body: string = "";

  topic: string = "";
  comments: Comment[] = [];

  static async new(post: IPost) {
    const p = Post.create(post);
    p.topic = `${p.title}\n\n${p.body}`;
    p.comments = await p.getComments();
    return p;
  }

  async getComments() {
    const comments = await api.comments(this.id);
    return comments.map((c) => Comment.create(c));
  }
}

class Comment extends Data implements IComment {
  postId: number = 0;
  id: number = 0;
  name: string = "";
  email: string = "";
  body: string = "";
}
