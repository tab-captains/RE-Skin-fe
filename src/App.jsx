import {BrowserRouter as Router, Routes, Route} from "react-router-dom"; 
import {AuthProvider} from "./features/auth/context/AuthContext";
import './App.css'
/* 이곳에 page들 import 후, return 안에 <Route ></Route> 형태로 페이지 연동해 사용. */
import MainPage from './features/main/pages/MainPage';
import RootLayout from './features/layout/RootLayout';
import LoginPage from './features/auth/pages/LoginPage';
import RegisterPage from './features/auth/pages/RegisterPage';
import AnalysisOverviewPage from './features/analysis/pages/AnalysisOverviewPage';
import CommunityPage from './features/community/pages/CommunityPage';
import Infoboard from "./features/infoboard/pages/InfoboardPage";

import Skinguide from "./features/infoboard/pages/Skinguide";
import Skindictionary from "./features/infoboard/pages/Skindictionary";
import ImageUploadPage from './features/analysis/pages/ImageUploadPage'; 
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
            <Route path="community" element={<CommunityPage />}/>
            <Route path="infoboard" element={<Infoboard />}/>
            <Route path="skinguide" element={<Skinguide />}/> 
            <Route path="infoboard/skinguide" element={<Skinguide />} />
            <Route path="infoboard/skindictionary" element={<Skindictionary />} />
          
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
