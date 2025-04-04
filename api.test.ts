import { describe, test } from "vitest";
import { api, req } from "./api";

describe.skip("api", () => {
  test("Users", async () => {
    console.log(await api.users());
  });

  test("Posts", async () => {
    console.log(await api.posts(1));
  });
});
