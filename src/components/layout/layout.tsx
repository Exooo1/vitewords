import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Auth } from "../auth/auth";
import { Registration } from "../../pages/registration/registration";
import { AuthenticationEmail } from "../../pages/authenticationemail/authentication-email";
import { ConfirmAccount } from "../../pages/confirmaccount/confirm-account";
import { NotFound } from "../auth/notFound/not-found";
import { Login } from "../../pages/login/login";
import { AppVocabulary } from "../app/app-vocabulary";
import { Words } from "../app/words/words";

import styles from "./layout.module.scss";
import { Building } from "../building/building";
import { Chat } from "../../pages/chat/chat";
import {Profile} from "../../pages/profile/profile";

export const Layout: FC = () => {
  return (
    <main className={styles.main}>
      <div style={{ height: "88vh" }}>
        <Routes>
          <Route key="*" path="*" element={<NotFound />} />
          <Route key="/" path="/" element={<Navigate to="/auth" />} />
          <Route key="path" path="auth" element={<Auth />}>
            <Route index element={<Registration />} />
            <Route key="login" path="login" element={<Login />} />
          </Route>
          <Route
            key="auth/email"
            path="auth/email"
            element={<AuthenticationEmail />}
          />
          <Route
            key="auth/confirmed/:id"
            path="auth/confirmed/:id"
            element={<ConfirmAccount />}
          />
          <Route key="app" path="/app" element={<AppVocabulary />}>
            <Route key="words" path="words" element={<Words />} />
            <Route
              key="profile"
              path="profile"
              element={<Profile />}
            />
            <Route key="chat" path="chat" element={<Chat />} />
            <Route
              key="dashboard"
              path="dashboard"
              element={
                <div style={{ width: "100%" }}>
                  <Building />
                </div>
              }
            />
            <Route
              key="achievements"
              path="achievements"
              element={
                <div style={{ width: "100%" }}>
                  <Building />
                </div>
              }
            />
          </Route>
        </Routes>
      </div>
      {/*<Footer />*/}
    </main>
  );
};
