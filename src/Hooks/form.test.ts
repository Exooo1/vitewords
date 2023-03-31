import {
  fetchLogin,
  fetchRegistration,
  InitialStateAuth,
  slice
} from "../Redux/AuthReducer";
import info from "../Assets/Images/inform.png";
import { ItemProfileType } from "./Form";

type CreateAccountType = {
  name: string;
  surname: string;
  password: string;
  email: string;
};
type LoginType = {
  password: string;
  email: string;
};
const itemsProfile: Array<ItemProfileType> = [
  {
    id: 1,
    name: "name",
    change: () => {},
    type: "text",
    plc: "First name",
    img: info
  },
  {
    id: 2,
    name: "surname",
    change: () => {},
    type: "text",
    plc: "Last name",
    img: info
  }
];
const initialState: InitialStateAuth = {
  auth: 0,
  resultCode: 0
};
const reducer = slice.reducer;
const user = {
  name: "Vlas",
  surname: "Maskalenchik",
  email: "vlasmaskalenchik1998@gmail.com",
  password: "Vlas20101234"
};
const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const createAccount = ({
  name,
  surname,
  password,
  email
}: CreateAccountType) => {
  if (name.length < 1) return false;
  if (surname.length < 1) return false;
  if (password.length! < 6) return false;
  if (!reg.test(email)) return false;
  if (reg.test(email)) return true;
};
const login = ({ password, email }: LoginType) => {
  if (password.length! < 6) return false;
  if (!reg.test(email)) return false;
  if (reg.test(email)) return true;
};
it("loginRTK", () => {
  const value = login({ email: user.email, password: user.password });
  const result = reducer(
    initialState,
    fetchLogin.fulfilled(1, "", { email: user.email, password: user.password })
  );
  expect(result).toEqual({ auth: value ? 1 : 0, resultCode: 0 });
});
it("registrationRTK", () => {
  const result = reducer(
    initialState,
    fetchRegistration.fulfilled(1, "", { ...user })
  );
  expect(createAccount(user)).toBeTruthy();
  const value = createAccount(user);
  expect(result).toEqual({ auth: 0, resultCode: value ? 1 : 0 });
});
it("CheckItemsProfile", () => {
  let count = 0;
  const correctArray = [
    {
      id: 1,
      name: "name",
      change: () => {},
      type: "text",
      plc: "First name",
      img: ""
    },
    {
      id: 2,
      name: "surname",
      change: () => {},
      type: "text",
      plc: "Last name",
      img: ""
    }
  ];
  const mock = jest.fn();
  itemsProfile.map(item => {
    mock(item);
    expect(item.plc).toMatch(correctArray[count].plc);
    expect(item.id).toBe(correctArray[count].id);
    expect(item.img).toBe(info);
    count += 1;
  });
  expect(mock.mock.lastCall[0].id).toBe(2);
  expect(mock.mock.calls.length).toBe(2);
  expect(correctArray).toBeInstanceOf(Array<ItemProfileType>);
});

it("TestAllTypes", () => {
  expect({ email: "", password: "" }).toBeInstanceOf(Object);
  expect(initialState).toBeInstanceOf(Object);
  expect(user).toBeInstanceOf(Object);
});
