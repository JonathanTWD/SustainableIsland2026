import { BrowserRouter, Route, Routes } from "react-router"
import { HomePage } from "../pages/HomePageView"
import { ProfilePage } from "../pages/ProfilePageView"
import { CalculatorPage } from "../pages/CalculatorPageView"
import { InformationPage } from "../pages/InformationPageView"

export const Routing = () => {
    // Top-level routes share the same layout.
    return (

        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<div>Shared Layout</div>}>
                    
        
                        <Route index element={<HomePage />} />
                        <Route path="/Profile" element={<ProfilePage />} />
                        <Route path="/Calculator" element={<CalculatorPage />} />
                        <Route path="/Information" element={<InformationPage />} />
                    </Route>

                </Routes>
            </BrowserRouter>

        </>
    )
}