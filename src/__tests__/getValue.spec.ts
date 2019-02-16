import { getValue } from "../appendAttr";

test("getValue", () => {
  [
    [undefined, false],
    [false, false],
    [true, "anonymous"],
    ["anonymous", "anonymous"],
    ["use-credentials", "use-credentials"]
  ].forEach(([input, output]) => {
    expect((getValue as any)(input)).toBe(output);
  });
});
