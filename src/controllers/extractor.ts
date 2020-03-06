import axios from "axios";

export async function httpRequest(
  url: string,
  n: number = 3,
  client: Function = axios,
  options = {
    method: "get",
    timeout: 500,
    responseType: "document"
  }
) {
  let error;
  for (let i = 0; i < n; i++) {
    try {
      return await client({ ...options, url: url });
    } catch (err) {
      error = err;
    }
  }
  throw new SCUPageNotAvailable(error.message);
}

class SCUPageNotAvailable extends Error {}

export default httpRequest;
