import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./features/auth/context/AuthContext";
import "./App.css";

import MainPage from "./features/main/pages/MainPage";
import RootLayout from "./features/layout/RootLayout";
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import AnalysisOverviewPage from "./features/analysis/pages/AnalysisOverviewPage";
import CommunityPage from "./features/community/pages/CommunityPage";
import Infoboard from "./features/infoboard/pages/InfoboardPage";
import Skinguide from "./features/infoboard/pages/Skinguide";
import Skindictionary from "./features/infoboard/pages/Skindictionary";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<MainPage />} />
            <Route path="analysisOverview" element={<AnalysisOverviewPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="community" element={<CommunityPage />} />

            <Route path="infoboard">
              <Route index element={<Infoboard />} />
              <Route path="skinguide" element={<Skinguide />} />
              <Route path="skindictionary" element={<Skindictionary />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
