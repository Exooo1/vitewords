import managment from "../Assets/Images/managerwords.png";
import {ChoiceAuthType, NavType, SliderTypeBanners} from "../Common/Types/CommonType";
import profile from "../Assets/Images/profile.png";
import dashboard from "../Assets/Images/dashboard.png";
import vocab from "../Assets/Images/vocab.png";
import rewards from "../Assets/Images/rewards.png";

export const SLIDER_BANNERS: Array<SliderTypeBanners> = [
  {
    id: 0,
    img: "https://www.webfx.com/wp-content/uploads/2021/10/dark-web-design-01-nerisson.png",
    title: "About this App",
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
export const NAV:Array<NavType> = [ {
    id: 1,
    name: "Profile",
    path: "profile",
    img: profile,
    style: false
},
    {
        id: 2,
        name: "Dashboard",
        path: "dashboard",
        img: dashboard,
        style: false
    },
    {
        id: 3,
        name: "Words",
        path: "",
        img: vocab,
        style: true
    },
    {
        id: 4,
        name: "Achievements",
        path: "achievements",
        img: rewards,
        style: false
    }]
