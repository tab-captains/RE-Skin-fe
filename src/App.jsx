import {BrowserRouter as Router, Routes, Route} from "react-router-dom"; 
import {AuthProvider} from "./features/auth/context/AuthContext";
import './App.css'
/* 이곳에 page들 import 후, return 안에 <Route ></Route> 형태로 페이지 연동해 사용. */
import MainPage from './features/main/pages/MainPage';
import RootLayout from './features/layout/RootLayout';
import LoginPage from './features/auth/pages/LoginPage';
import RegisterPage from './features/auth/pages/RegisterPage';
import ProfilePage from './features/auth/pages/ProfilePage';
import AnalysisOverviewPage from './features/analysis/pages/AnalysisOverviewPage';
import CommunityPage from './features/community/pages/CommunityPage';
import PostWritePage from './features/community/pages/PostWritePage'; 
import PostDetailPage from "./features/community/pages/PostdatailPage";
import Infoboard from "./features/infoboard/pages/InfoboardPage";
import KakaoCallbackPage from "./features/auth/pages/KakaoCallbackPage";
import Skinguide from "./features/infoboard/pages/Skinguide";
import Skindictionary from "./features/infoboard/pages/Skindictionary";
import ImageUploadPage from './features/analysis/pages/ImageUploadPage'; 
import SkinTypeSurveyPage from './features/analysis/pages/SkinTypeSurveyPage';
import Skinreport from "./features/report/Skinreport";
import Analysis from "./features/analysis/pages/AnalysisPage";
import RoutineSelect from "./features/routine/pages/RoutineSelectPage";
import Morning from "./features/routine/pages/MorningRoutinePage";
import Night from "./features/routine/pages/NightRoutinePage";
import ProductCategoryPage from "./features/product/ProductCategoryPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<MainPage />} />
            <Route path="analysisOverview" element={<AnalysisOverviewPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="profile" element={<ProfilePage />} />
          <Route path="register" element={<RegisterPage />} />
            <Route path="community" element={<CommunityPage />}/>
            <Route path="community/post/:postId" element={<PostDetailPage />} />
            <Route path="write" element={<PostWritePage />}/>
            <Route path="infoboard" element={<Infoboard />}/>
            <Route path="skinguide" element={<Skinguide />}/> 
            <Route path="infoboard/skinguide" element={<Skinguide />} />
            <Route path="infoboard/skindictionary" element={<Skindictionary />} />
            <Route path="skinreport" element={<Skinreport />} />
            <Route path="skin-survey" element={<SkinTypeSurveyPage />} />
            <Route path="upload" element={<ImageUploadPage />} />
            <Route path="analysis" element={<Analysis />} />
            <Route path="routineSelect" element={<RoutineSelect/>}/>
            <Route path="morning" element={<Morning/>}/>
            <Route path="night" element={<Night/>}/>
            <Route path="login-success" element={ <KakaoCallbackPage />}/>
            <Route path="product/:category" element={<ProductCategoryPage />} />

            
          
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
