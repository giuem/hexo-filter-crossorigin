import { matchDomain } from "../appendAttr";

const domains = [
  "1.com",
  "2.net"
]

test("matchDomain", () => {
  expect(matchDomain("https://1.com/dadasda", domains)).toBeTruthy();
  expect(matchDomain("http://1.com/dasda", domains)).toBeTruthy();
  expect(matchDomain("//1.com/dafqw", domains)).toBeTruthy();
  expect(matchDomain("//1.com/dafqw", undefined)).toBeTruthy();
  expect(matchDomain("//1.com/dafqw")).toBeTruthy();
  expect(matchDomain("//2.com/dafqw", domains)).toBeFalsy();
  // data-url
  expect(matchDomain("data:", domains)).toBeFalsy();
})
