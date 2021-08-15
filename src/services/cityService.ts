import { City } from "../_context/types";
import { cities } from "../_mockData";

export const getCities:() => Promise<City[]> = () => new Promise(res => {
  return res(cities)
});
