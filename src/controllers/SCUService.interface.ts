import DayMenu from "../models/DayMenu";

export interface SCUService {
  getDayMenu(day: number, month: number, year: number): Promise<DayMenu>;
}
