import DayMenu from '../models/DayMenu';

export interface Extractor {
  (url: string): Promise<DayMenu[]>;
}
