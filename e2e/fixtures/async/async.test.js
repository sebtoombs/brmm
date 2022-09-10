import request from "supertest";
import { test, describe } from "vitest";
import { runner } from "clet";

describe("async", () => {
  test("should wait for output of async task", async () => {
    await runner()
      .cwd("e2e/fixtures/async")
      .fork("../../../dist/brmm.js", ["test"])
      .stdout("Finished");
  });
});
