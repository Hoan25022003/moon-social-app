import React, { lazy, Suspense } from "react";
import { Route, Routes, topbar } from "react-router-loading";
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

topbar.config({
  autoRun: false,
  barThickness: 3,
  barColors: {
    0: "#00dbde",
    1.0: "#fc00ff",
  },
  shadowBlur: 5,
  shadowColor: "",
  className: "topbar",
});

function App() {
  return (
    <Suspense>
      <Routes>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
        <Route element={<MainLayout></MainLayout>}>
          <Route path="/home" element={<HomePage></HomePage>}></Route>
          <Route
            path="/friends"
            element={<FriendPage></FriendPage>}
            loading
          ></Route>
          <Route
            path="/groups"
            element={<GroupPage></GroupPage>}
            loading
          ></Route>
          <Route
            path="/groups/:id"
            element={<GroupPage></GroupPage>}
            loading
          ></Route>
          <Route
            path="/profile/:id"
            element={<ProfilePage></ProfilePage>}
            // loading
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
          <Route path="/chats" element={<ChatPage />}></Route>
          <Route path="/chats/t/:id" element={<MessagePage />}></Route>
        </Route>
        <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
      </Routes>
    </Suspense>
  );
}

export default App;
