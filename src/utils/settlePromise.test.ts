import { settlePromise } from "./settlePromise";

describe("settlePromise", () => {
  it("returns a fulfilled result when the promise resolves", async () => {
    await expect(settlePromise(Promise.resolve("ok"))).resolves.toEqual({
      status: "fulfilled",
      value: "ok",
    });
  });

  it("returns a rejected result when the promise rejects", async () => {
    const error = new Error("fail");

    await expect(settlePromise(Promise.reject(error))).resolves.toEqual({
      status: "rejected",
      reason: error,
    });
  });
});
