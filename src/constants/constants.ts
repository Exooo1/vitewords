import managment from "../assets/images/managerwords.png";
import {
  ChoiceAuthType,
  NavType,
  SliderTypeBanners,
  SortElementsType,
  TLevelsEnglish,
  TStatusChoices
} from "../utils/types/commonTypes";
import profile from "../assets/images/profile.png";
import dashboard from "../assets/images/dashboard.png";
import vocab from "../assets/images/vocab.png";
import rewards from "../assets/images/rewards.png";
import chat from "../assets/images/chat.png";

export const SLIDER_BANNERS: Array<SliderTypeBanners> = [
  {
    id: 0,
    img: "https://www.webfx.com/wp-content/uploads/2021/10/dark-web-design-01-nerisson.png",
    title: "About this app",
    description:
      "This app will help you repeat and learn new words in English, you can track your actions and your new words.",
    focus: true
  },
  {
    id: 1,
    img: "https://i.pinimg.com/736x/71/3e/05/713e0501a1d1b10f0e967bfc8ff9532f.jpg",
    title: "Profile",
    description:
      "Create your profile with us, register and customize your profile for yourself.",
    focus: false
  },
  {
    id: 2,
    img: "https://i.pinimg.com/736x/c5/5b/74/c55b7466043c21650f4c837d7ce356e5.jpg",
    title: "Dashboard",
    description:
      "You can track your statistics, how much you visited the site and how many words you learned each day.",
    focus: false
  },
  {
    id: 3,
    img: "https://images.squarespace-cdn.com/content/v1/56e876c259827eab7e629fd0/1586061770488-8J7SWEF4HV9Q1LXBIVVK/09-Watchlist-UI-Scenario+detail+1.jpg?format=500w",
    title: "Feature",
    description:
      "At the same time, new features will appear in the title that will be in the future.",
    focus: false
  },
  {
    id: 4,
    img: managment,
    title: "ManagementWords",
    description:
      "Here, you can add and delete your words,also update and add new rules.",
    focus: false
  }
];
export const CHOICE_AUTH: Array<ChoiceAuthType> = [
  { id: 1, isActive: true },
  { id: 2, isActive: false }
];
export const NAV: Array<NavType> = [
  {
    id: 1,
    name: "Profile",
    path: "/app/profile",
    img: profile,
    style: false
  },
  {
    id: 2,
    name: "Dashboard",
    path: "/app/dashboard",
    img: dashboard,
    style: false
  },
  {
    id: 3,
    name: "Words",
    path: "/app",
    img: vocab,
    style: false
  },
  {
    id: 4,
    name: "Achievements",
    path: "/app/achievements",
    img: rewards,
    style: false
  },
  {
    id: 5,
    name: "Chat",
    path: "/app/chat",
    img: chat,
    style: false
  }
];
export const SORT_ELEMENTS: Array<SortElementsType> = [
  { id: 1, name: "Description of words", sort: "DESCRIPTION" },
  { id: 2, name: "Order of addition", sort: "ADDED" }
];

export const LEVEL_ENGLISH: TLevelsEnglish = {
  a0: { letter: "A", sup: "0", color: "red", goal: 0 },
  a1: { letter: "A", sup: "1", color: "orange", goal: 500 },
  a2: { letter: "A", sup: "2", color: "#d5d51a", goal: 1000 },
  b1: { letter: "B", sup: "1", color: "green", goal: 2000 },
  b2: { letter: "B", sup: "2", color: "#6868ff", goal: 3000 },
  c1: { letter: "C", sup: "1", color: "blue", goal: 4000 },
  c2: { letter: "C", sup: "2", color: "purple", goal: 5000 }
};

export const STATUS_CHOICES: Array<TStatusChoices> = [
  { name: "On vacation", code: "🌴" },
  { name: "Working from home", code: "🏠" },
  { name: "Just chill", code: "&#127774;" },
  { name: "Out sick", code: "🤒" },
  { name: "I am  a penguin", code: "🐧" },
  { name: "Focusing", code: "🎯" }
];

export const COMMON_EMOJI: Array<{ code: string }> = [
  { code: "🤖" },
  { code: "😈" },
  { code: "🥶" },
  { code: "🫁" },
  { code: "🧣" },
  { code: "☂️" },
  { code: "🎓" },
  { code: "💪🏻" },
  { code: "🌝" },
  { code: "⛄️" },
  { code: "🔮" },
  { code: "🐁" },
  { code: "💖" },
  { code: "🔕" },
  { code: "🧔🏻‍♂️" },
  { code: "🩲" },
  { code: "🥽" },
  { code: "🩱" },
  { code: "👑" },
  { code: "🦉" },
  { code: "🐥" },
  { code: "🐽" },
  { code: "🐸" },
  { code: "🐓" },
  { code: "🌘" },
  { code: "❄️" },
  { code: "⚡️" },
  { code: "🌟" }
];
