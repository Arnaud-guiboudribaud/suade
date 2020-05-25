export interface People {
  _id: string;
  age: number;
  eyeColor: string;
  name: string;
  gender: string;
  location: {
    latitude: number;
    longitude: number;
  };
  preferences: {
    pet: string;
    fruit: string;
  };
}
