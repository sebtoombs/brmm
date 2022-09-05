import validateConfig from "./validateConfig";

describe("validateConfig", () => {
  test.each([[null], [false], [true], ["string"], [{}], [{ tasks: [] }]])(
    'validation should fail for "%s"',
    (config) => {
      // @ts-ignore
      expect(validateConfig(config)).rejects.toThrow();
    }
  );

  test.each([[{ tasks: {} }]])(
    'validation should pass for "%s"',
    async (config) => {
      expect(await validateConfig(config)).toEqual(config);
    }
  );
});
