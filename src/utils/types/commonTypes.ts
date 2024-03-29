import { SortChoice } from "../../api/wordAPI";

export type ThunkError = { rejectValue: { errors: string } };
export type ProjectTypeReturn<T> = {
  item: T;
  resultCode: number;
  error: string;
  message?: string;
};

export type SliderTypeBanners = {
  id: number;
  img: string;
  title: string;
  description: string;
  focus: boolean;
};

export type ChoiceAuthType = {
  id: number;
  isActive: boolean;
};

export type NavType = {
  id: number;
  name: string;
  path: string;
  img: string;
  style: boolean;
};

export type SortElementsType = {
  id: number;
  name: string;
  sort: SortChoice;
};

export type AttributesImageType = {
  src: string;
  alt: string;
  role: string;
  width: string;
  title: string;
};

export type TLevel = {
  letter: string;
  sup: string;
  color: string;
  goal: number;
};

export type TLevelsEnglish = {
  [key: string]: TLevel;
  a0: TLevel;
  a1: TLevel;
  a2: TLevel;
  b1: TLevel;
  b2: TLevel;
  c1: TLevel;
  c2: TLevel;
};

export type TStatusChoices = {
  name:string
  code:string
}
