import zrok from "../src/zrok";
import { expect, test } from "bun:test";

test("version", async () => {
  const version = await zrok.version();
  expect(version).toMatch(/\d+\.\d+\.\d+/);
});
