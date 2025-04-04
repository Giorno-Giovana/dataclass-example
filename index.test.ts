import { describe, expect, it, test } from "vitest";
import { dataclassWay, interfaceWay } from "./index";
import { MockedUser } from "./mocks";

describe("Real api calls", () => {
  test.skip(
    "interfaceWay",
    async () => {
      console.dir(await interfaceWay(), { depth: null, colors: true });
    },
    Infinity
  );

  test.skip("dataclassWay", async () => {
    console.dir(await dataclassWay(), { depth: null, colors: true });
  });
});

describe("Mocked entities", () => {
  it("should create user with posts and comments", async () => {
    const user = await MockedUser.new();

    expect(user).toBeInstanceOf(MockedUser);
    expect(user.posts).toHaveLength(2);
    expect(user.posts[0].comments).toHaveLength(2);
  });

  it("should link posts to user and comments to post", async () => {
    const user = await MockedUser.new();

    const post = user.posts[0];
    const comment = post.comments[0];

    expect(post.userId).toBe(user.id);
    expect(comment.postId).toBe(post.id);
  });

  it("should generate unique ids", async () => {
    const [user1, user2] = await MockedUser.list();
    const post1 = user1.posts[0];
    const post2 = user1.posts[1];

    expect(user1.id).not.toBe(user2.id);
    expect(post1.id).not.toBe(post2.id);
  });

  it("should generate valid list of users", async () => {
    const users = await MockedUser.list();
    expect(users).toHaveLength(2);
    expect(users[0].posts).toHaveLength(2);
  });
});
