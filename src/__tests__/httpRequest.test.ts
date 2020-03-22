import { httpRequest } from '../controllers/extractor';

jest.setTimeout(30000);

describe('httpRequest tests', () => {
  it('Extrator fetches google', async () => {
    const res = await httpRequest('http://www.google.es');
    expect(res.status).toBe(200);
  });

  it('Extrator throws if PageNotAvailable if it has to', async () => {
    await expect(httpRequest('http://www.lasdkfjlk.es')).rejects.toThrow();
  });
});
