import { AxiosError } from "axios";
import { apiAuth, EmailType, LoginType } from "./authAPI";
import { ProjectTypeReturn } from "../Common/Types/CommonType";

const user = {
  name: "Vlas",
  surname: "Maskalenchik",
  email: "vlasmaskalenchik1998@gmail.com",
  password: "Vlas20101234"
};
const initial = {
  auth: 0
};
it("authApiAuth", async () => {
  try {
    const { data } = await apiAuth.registration(user);
  } catch (err) {
    const { response } = err as AxiosError<ProjectTypeReturn<string>>;
    expect(response?.data.error).toMatch("you are authorized");
  }
});
it("authArentAuth", async () => {
  try {
    const { data } = await apiAuth.registration({
      ...user,
      email: `${Math.random().toString(36).slice(2)}@gmail.com`
    });
    expect(data.resultCode).toBe(1);
    expect(data.item).toBeInstanceOf(String);
  } catch (err) {}
});
it("testResponse", async () => {
  await expect(apiAuth.registration(user)).rejects.toThrow();
});
it("logintest", async () => {
  await expect(
    apiAuth.registration({
      ...user,
      email: `${Math.random().toString(36).slice(2)}@gmail.com`
    })
  ).resolves.toBeTruthy();
});
it("SendEmailApiResolve", async () => {
  await expect(
    apiAuth.sendEmail({ email: user.email, name: "Exoool", verify: "test" })
  );
});
describe("TestingTypes", () => {
  const sendEmail: EmailType = {
    email: "",
    name: "",
    verify: ""
  };
  const login: LoginType = {
    email: "",
    password: ""
  };
  it("CheckAuthTypes", () => {
    expect(sendEmail).toBeInstanceOf(Object);
    expect(login).toBeInstanceOf(Object);
    expect(login).toBeInstanceOf(Object);
  });
});
