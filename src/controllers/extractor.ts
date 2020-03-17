import fetch from "node-fetch";

export async function httpRequest(url: string) {
  try {
    const res = await fetch(url, { timeout: 1000 });
    return res;
  } catch (err) {
    throw new PageNotAvailable(err.message);
  }
}

class PageNotAvailable extends Error {}

export default httpRequest;
