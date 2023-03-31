import profile from "../../Assets/Images/profile.png";

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
