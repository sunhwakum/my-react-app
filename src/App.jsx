// src/App.jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./components/Home";
import UserCard from "./components/UserCard";
import ProductCard from "./components/ProductCard";
import Counter from "./components/Counter";
import RockPaperScissors from "./components/RockPaperScissors";
import Pacman from "./components/Pacman"; // 팩맨 컴포넌트
import ConsultForm from "./components/ConsultForm"; // 상담 폼 컴포넌트
import ConsultComplete from "./components/ConsultComplete";

import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import PostCreate from "./components/PostCreate";
import PostUpdate from "./components/PostUpdate";

import MyLineChart from "./components/MyLineChart";
import MyBarChart from "./components/MyBarChart";
import SeoulMeanTemp from "./components/SeoulMeanTemp";
import MyWordCloud from "./components/MyWordCloud";
import MyMap from "./components/MyMap";

import WebcamCapture from "./components/WebcamCapture"; // 웹캠 캡처 컴포넌트 추가

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">홈</Link>
        <Link to="/usercard">사용자 카드</Link>
        <Link to="/productcard">제품 카드</Link>
        <Link to="/counter">카운터</Link>
        <Link to="/rps">가위바위보</Link>
        <Link to="/pacman">팩맨</Link>
        <Link to="/consult">상담 폼</Link>
        <Link to="/consult/complete">상담 완료</Link>

        <Link to="/post/list">게시판 목록</Link>
        <Link to="/post/create">게시글 작성</Link>

        <Link to="/chart/line">라인 차트</Link>
        <Link to="/chart/bar">바 차트</Link>
        <Link to="/chart/seoultemp">서울 평균기온</Link>
        <Link to="/wordcloud">워드 클라우드</Link>
        <Link to="/map">지도</Link>

        {/* 웹캠 캡처 링크 추가 */}
        <Link to="/webcam">웹캠 캡처</Link>
      </nav>

      <Routes>
        {/* 기존 라우트 */}
        <Route path="/" element={<Home />} />
        <Route path="/usercard" element={<UserCard />} />
        <Route
          path="/productcard"
          element={
            <ProductCard
              productName="테스트 노트북"
              productDescript="고성능 노트북입니다."
              price={1500000}
              imgName="notebook3.jpeg"
            />
          }
        />
        <Route path="/counter" element={<Counter />} />
        <Route path="/rps" element={<RockPaperScissors />} />
        <Route path="/pacman" element={<Pacman />} />
        <Route path="/consult" element={<ConsultForm />} />
        <Route path="/consult/complete" element={<ConsultComplete />} />

        {/* 게시판 관련 라우트 */}
        <Route path="/post/list" element={<PostList />} />
        <Route path="/post/detail/:id" element={<PostDetail />} />
        <Route path="/post/create" element={<PostCreate />} />
        <Route path="/post/update/:id" element={<PostUpdate />} />

        {/* 차트 및 기타 컴포넌트 라우트 */}
        <Route path="/chart/line" element={<MyLineChart />} />
        <Route path="/chart/bar" element={<MyBarChart />} />
        <Route path="/chart/seoultemp" element={<SeoulMeanTemp />} />
        <Route path="/wordcloud" element={<MyWordCloud />} />
        <Route path="/map" element={<MyMap />} />

        {/* 웹캠 캡처 라우트 추가 */}
        <Route path="/webcam" element={<WebcamCapture />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
