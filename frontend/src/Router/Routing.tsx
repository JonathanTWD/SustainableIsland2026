import { BrowserRouter, Route, Routes, Outlet } from "react-router";
import { HomePage } from "../pages/HomePageView";
import { ProfilePage } from "../pages/ProfilePageView";
import { CalculatorPage } from "../pages/CalculatorPageView";
import { InformationPage } from "../pages/InformationPageView";
import LoginPage from "../pages/LoginPageView";
import SignupPage from "../pages/SignUpPageView";
import { Nav } from "../component/Nav/Nav";

const Layout = () => {
  return (
    <div>
      <Outlet />
      <Nav />
    </div>
  );
};

export const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="calculator" element={<CalculatorPage />} />
          <Route path="information" element={<InformationPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
