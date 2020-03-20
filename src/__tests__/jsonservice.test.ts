import { JsonStorage } from '../services/JsonStorage.service';

const jsonService = new JsonStorage();

it('should throw if we query a day that doesnt exist', async () => {
  try {
    await jsonService.getDayMenu(10, 2, 1000);
    expect(true).toBe(false);
  } catch (err) {
    expect(err).toBeDefined();
  }
});
