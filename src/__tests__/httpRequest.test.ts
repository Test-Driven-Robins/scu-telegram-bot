import httpRequest from "../controllers/extractor";

test("Extrator fetches google", () => {
  return httpRequest("http://www.google.es").then(res => {
    expect(res.status).toBe(200);
  });
});

test("Extrator throws if PageNotAvailable if it has to", () => {
  return httpRequest("http://www.lasdkfjlk.es")
    .then(() => {
      expect(true).toBe(false);
    })
    .catch(err => {
      expect(err).toBeDefined();
    });
});
