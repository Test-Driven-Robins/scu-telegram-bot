/* istanbul ignore file */
import fs from 'fs';
export class FsAdapter {
  async writeToFile(fileName: string, data: string) {
    fs.writeFile(fileName, data, err => {
      if (err) throw err;
    });
  }

  readFromFile(fileName: string): Promise<String> {
    return new Promise<String>((resolve, reject) => {
      fs.readFile(fileName, (err, data) => {
        if (err) reject(err);
        else resolve(data.toString());
      });
    });
  }
}
