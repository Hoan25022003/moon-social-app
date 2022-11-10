import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "swiper/scss";
import "swiper/scss/navigation";

const LoginPage = lazy(() => import("./views/LoginPage"));
const RegisterPage = lazy(() => import("./views/RegisterPage"));
const HomePage = lazy(() => import("./views/HomePage"));
const MainLayout = lazy(() => import("./layout/MainLayout"));
const PersonalPage = lazy(() => import("./views/PersonalPage"));
const GroupPage = lazy(() => import("./views/GroupPage"));
const FriendPage = lazy(() => import("./views/FriendPage"));
const NotFoundPage = lazy(() => import("./views/NotFoundPage"));

function App() {
  return (
    <Suspense>
      <Routes>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
        <Route element={<MainLayout></MainLayout>}>
          <Route path="/home" element={<HomePage></HomePage>}></Route>
          <Route path="/friends" element={<FriendPage></FriendPage>}></Route>
          <Route path="/groups" element={<GroupPage></GroupPage>}></Route>
          <Route
            path="/profile/:id"
            element={<PersonalPage></PersonalPage>}
          ></Route>
        </Route>
        <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
      </Routes>
    </Suspense>
  );
}

export default App;
