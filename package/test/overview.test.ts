import zrok from "../src/zrok";
import { expect, test } from "bun:test";

test("overview", async () => {
  const overview = await zrok.overview();
  expect(overview).toHaveProperty("environments");
});
