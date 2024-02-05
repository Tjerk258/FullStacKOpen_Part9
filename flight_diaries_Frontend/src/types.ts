export interface Diary {
  date:string;
  weather: string;
  visibility: string;
  id: number;
}

export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export type NewDiary = Omit<Diary, 'id'>

export type AddDairyFunctionType = (diary: Diary) => void;