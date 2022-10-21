import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const LoginPage = lazy(() => import("./views/LoginPage"));
const RegisterPage = lazy(() => import("./views/RegisterPage"));
const HomePage = lazy(() => import("./views/HomePage"));

function App() {
  return (
    <Suspense>
      <Routes>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
        <Route path="/" element={<HomePage></HomePage>}></Route>
      </Routes>
    </Suspense>
  );
}

export default App;
