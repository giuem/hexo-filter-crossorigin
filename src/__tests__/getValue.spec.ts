import { getCrossOriginValue } from "../appendAttr";

test("getValue", () => {
  [
    [undefined, false],
    [false, false],
    [true, "anonymous"],
    ["anonymous", "anonymous"],
    ["use-credentials", "use-credentials"]
  ].forEach(([input, output]) => {
    expect((getCrossOriginValue as any)(input)).toBe(output);
  });
});
