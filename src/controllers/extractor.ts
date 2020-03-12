import fetch from "node-fetch";

export async function httpRequest(url: string) {
  try {
    const res = await fetch(url);
    return res;
  } catch (err) {
    throw new SCUPageNotAvailable(err.message);
  }
}

class SCUPageNotAvailable extends Error {}

export default httpRequest;
