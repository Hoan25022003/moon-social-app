import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
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
          <Route path="/home" element={<HomePage></HomePage>}></Route>
          <Route path="/friends" element={<FriendPage></FriendPage>}></Route>
          <Route path="/groups" element={<GroupPage></GroupPage>}></Route>
          <Route
            path="/profile/:id"
            element={<ProfilePage></ProfilePage>}
          ></Route>
          <Route path="/search" element={<FilterPage></FilterPage>}></Route>
          <Route path="/post-saved" element={<SavedPage></SavedPage>}></Route>
          <Route path="/chats" element={<ChatPage />}></Route>
          <Route path="/chats/t/:id" element={<MessagePage />}></Route>
        </Route>
        <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
      </Routes>
    </Suspense>
  );
}

export default App;
