import React, { lazy, Suspense, useEffect } from "react";
import { socket } from "api/axios";
// import { Route, Routes } from "react-router-dom";
import { Route, Routes } from "react-router-loading";
import "swiper/scss";
import "swiper/scss/navigation";

const LoginPage = lazy(() => import("./views/LoginPage"));
const RegisterPage = lazy(() => import("./views/RegisterPage"));
const HomePage = lazy(() => import("./views/HomePage"));
const MainLayout = lazy(() => import("./layout/MainLayout"));
const ProfilePage = lazy(() => import("./views/ProfilePage"));
const GroupPage = lazy(() => import("./views/GroupPage"));
const FriendPage = lazy(() => import("./views/FriendPage"));
const FilterPage = lazy(() => import("./views/FilterPage"));
const SavedPage = lazy(() => import("./views/SavedPage"));
const ChatPage = lazy(() => import("./views/ChatPage"));
const MessagePage = lazy(() => import("./views/MessagePage"));
const NotFoundPage = lazy(() => import("./views/NotFoundPage"));

function App() {
  return (
    <Suspense>
      <Routes>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
        <Route element={<MainLayout></MainLayout>}>
          <Route path="/home" element={<HomePage></HomePage>} loading></Route>
          <Route
            path="/friends"
            element={<FriendPage></FriendPage>}
            loading
          ></Route>
          <Route path="/groups" element={<GroupPage></GroupPage>}></Route>
          <Route
            path="/profile/:id"
            element={<ProfilePage></ProfilePage>}
            loading
          ></Route>
          <Route
            path="/search"
            element={<FilterPage></FilterPage>}
            loading
          ></Route>
          <Route
            path="/post-saved"
            element={<SavedPage></SavedPage>}
            loading
          ></Route>
          <Route path="/chats" element={<ChatPage />} loading></Route>
          <Route path="/chats/t/:id" element={<MessagePage />} loading></Route>
        </Route>
        <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
      </Routes>
    </Suspense>
  );
}

export default App;
