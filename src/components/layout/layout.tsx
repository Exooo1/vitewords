import React, { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Auth } from "../auth/auth";
import { Registration } from "../auth/registration/registration";
import { CheckMail } from "../auth/checkMail/check-mail";
import { ConfirmAccount } from "../auth/confirmAccount/confirm-account";
import { NotFound } from "../auth/notFound/not-found";
import { Login } from "../auth/login/login";
import { AppVocabulary } from "../app/app-vocabulary";
import { Words } from "../app/words/words";

import styles from "./layout.module.scss";
import { Building } from "../building/building";
import { Chat } from "../../pages/chat/chat";

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
          <Route key="auth/email" path="auth/email" element={<CheckMail />} />
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
              element={
                <div style={{ width: "100%" }}>
                  <Building />
                </div>
              }
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
