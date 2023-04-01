import {
  fetchGetProfile,
  profileReducer,
  slice
} from "../../redux/ProfileReducer";
import { FullNameType } from "../../api/profileAPI";

it("NavBar", () => {
  const nav = [
    {
      id: 1,
      name: "Profile",
      path: "profile",
      img: "https://cdn-icons-png.flaticon.com/512/456/456141.png",
      style: true
    },
    {
      id: 2,
      name: "Dashboard",
      path: "dashboard",
      img: "https://cdn-icons-png.flaticon.com/512/1365/1365346.png",
      style: false
    },
    {
      id: 3,
      name: "Words",
      path: "",
      img: "https://cdn-icons-png.flaticon.com/512/2501/2501356.png",
      style: false
    },
    {
      id: 4,
      name: "Achievements",
      path: "achievements",
      img: "https://cdn-icons-png.flaticon.com/512/8711/8711195.png",
      style: false
    }
  ];
  const mock = jest.fn(item => item);
  const changeNav = (id: number) => {
    const item = nav.findIndex(item => item.id === id);
    nav.splice(item, 1);
  };
  nav.map(item => mock(item));
  expect(mock.mock.calls.length).toBe(4);
  expect(mock.mock.results[0].value.style).toBeTruthy();
  expect(mock.mock.lastCall[0].style).toBeFalsy();
  expect(nav).toBeInstanceOf(Array);
  expect(nav.length).toBe(4);
  changeNav(2);
  expect(nav.length).toBe(3);
});
it("fetchGetProfile", () => {
  const initialState = {
    firstName: "",
    lastName: ""
  };
  const fullName: FullNameType = {
    firstName: "Vlas",
    lastName: "Maskalenchik"
  };
  const reducer = slice.reducer;
  const result = reducer(
    initialState,
    fetchGetProfile.fulfilled(fullName, "", undefined)
  );
  expect(result).toEqual({ firstName: "Vlas", lastName: "Maskalenchik" });
});
