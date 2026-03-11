import { BrowserRouter, Route, Routes, Outlet } from "react-router";
import HomePage from "../pages/HomePageView";
import { ProfilePage } from "../pages/ProfilePageView";
import { CalculatorPage } from "../pages/CalculatorPageView";
import { InformationPage } from "../pages/InformationPageView";
import LoginPage from "../pages/LoginPageView";
import SignupPage from "../pages/SignUpPageView";
import { Nav } from "../component/Nav/Nav";
import { ProtectedRoute } from "../component/ProtectedRoute/ProtectedRoute";

const Layout = () => {
  return (
    <>
      <Outlet />
      <Nav />
    </>
  );
};

export const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="calculator" element={<CalculatorPage />} />
          <Route path="information" element={<InformationPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
