export async function settlePromise<T>(
  promise: Promise<T>
): Promise<PromiseSettledResult<T>> {
  try {
    return {
      status: "fulfilled",
      value: await promise,
    };
  } catch (error) {
    return {
      status: "rejected",
      reason: error,
    };
  }
}
