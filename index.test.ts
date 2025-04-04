import { test } from "vitest";
import { dataclassWay, interfaceWay } from "./index";

test.only(
  "interfaceWay",
  async () => {
    console.dir(await interfaceWay(), { depth: null, colors: true });
  },
  Infinity
);

test("dataclassWay", async () => {
  console.dir(await dataclassWay(), { depth: null, colors: true });
});
