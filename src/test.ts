import { developmentWebServer, feedPath } from ".";
import fetch from "node-fetch";
import fs from "fs";

test("create feed", async () => {
  const response = await fetch("http://localhost:8000", {
    method: "POST",
    body: new URLSearchParams({ name: "My Feed" })
  });
  const responseText = await response.text();
  const token = responseText.match(/(\w{20}).xml/)![1];
  const feed = fs.readFileSync(feedPath(token)).toString();

  expect(feed).toMatch("My Feed");
});

afterAll(() => {
  developmentWebServer.close();
});