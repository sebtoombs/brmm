import request from "supertest";
import { test, describe } from "vitest";
import { runner } from "clet";

describe("server", () => {
  test("should work with long-running processes in parallel", async () => {
    await runner()
      .cwd("e2e/fixtures/server")
      .fork("../../../dist/brmm.js", ["test"])
      .wait("stdout", /Server is running on /)
      .expect(async () => {
        request("http://127.0.0.1:8000")
          .get("/")
          .expect(200)
          .expect("My first server! 8000");

        request("http://127.0.0.1:8100")
          .get("/")
          .expect(200)
          .expect("My first server! 81000");
      })
      .kill();
  });
});
