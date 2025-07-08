import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import UserCard from "./components/UserCard";
import ProductCard from "./components/ProductCard";
import Counter from "./components/Counter";
import RockPaperScissors from "./components/RockPaperScissors";
import Pacman from "./components/Pacman";  // 팩맨 컴포넌트 import 추가
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
        <Link to="/pacman">팩맨</Link> {/* 팩맨 네비게이션 추가 */}
      </nav>

      <Routes>
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
        <Route path="/pacman" element={<Pacman />} /> {/* 팩맨 라우터 추가 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
