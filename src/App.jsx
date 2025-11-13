import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css'
/* 이곳에 page들 import 후, return 안에 <Route ></Route> 형태로 페이지 연동해 사용. */
import MainPage from './features/main/pages/MainPage';
import RootLayout from './features/layout/RootLayout';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}></Route>
      </Routes>
    </Router>
  )
}

export default App