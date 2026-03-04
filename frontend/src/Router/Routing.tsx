import { BrowserRouter, Route, Routes } from "react-router"
import { HomePage } from "../pages/HomePageView"
import { ProfilePage } from "../pages/ProfilePageView"
import { CalculatorPage } from "../pages/CalculatorPageView"
import { InformationPage } from "../pages/InformationPageView"
import Signup from "../pages/signup"
import Login from "../pages/login"

export const Routing = () => {
    // Top-level routes share the same layout.
    return (

        <>
            <BrowserRouter>
            <CalculatorPage />
                <Routes>
                    <Route element={<div>Shared Layout</div>}>
                    
        
                        <Route index element={<HomePage />} />
                        <Route path="/Profile" element={<ProfilePage />} />
                        <Route path="/Calculator" element={<CalculatorPage />} />
                        <Route path="/Information" element={<InformationPage />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                    </Route>

                </Routes>
            </BrowserRouter>

        </>
    )
}