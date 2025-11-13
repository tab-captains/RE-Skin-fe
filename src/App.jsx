import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css'
/* 이곳에 page들 import 후, return 안에 <Route ></Route> 형태로 페이지 연동해 사용. */
import MainPage from './features/main/pages/MainPage';
import RootLayout from './features/layout/RootLayout';
import LoginPage from './features/auth/pages/LoginPage';
import AnalysisOverviewPage from './features/analysis/pages/AnalysisOverviewPage';
import CommunityPage from './features/community/pages/CommunityPage';



function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={< MainPage/>} />
          <Route path="analysisOverview" element={<AnalysisOverviewPage />}/>
          <Route path="login" element={<LoginPage />}/>
          <Route path="community" element={<CommunityPage />}/>
      </Route>
      </Routes>
    </Router>
  )
}

export default App