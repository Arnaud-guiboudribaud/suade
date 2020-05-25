import { People } from './people';
import { SortedData } from './sorted-data';

export interface ReturnData {
  origin: People[];
  eyeColor: SortedData[];
  pet: SortedData[];
  fruit: SortedData[];
  gender: SortedData[];
  filters: {
    eyeColor: string[];
    pet: string[];
    fruit: string[];
    gender: string[];
  };
}
