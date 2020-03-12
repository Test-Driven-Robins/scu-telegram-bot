import httpRequest from "../controllers/extractor";

test("Extrator fetches google", () => {
  httpRequest("http://www.google.es").then(res => {
    expect(res.status).toBe(200);
  });
});
