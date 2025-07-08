import "./Home.css";

function Home() {
  return (
    <div className="home-bg">
      <div className="home-card">
        <h1 className="greeting neon-text">안녕하세용 <span role="img" aria-label="smile">😊</span></h1>
        <p className="subtitle">여기는 <span className="highlight">홈 화면</span>이에요.<br />반갑습니다!</p>
        <div className="shine" />
      </div>
      <div className="home-footer">
        <span>ⓒ {new Date().getFullYear()} My react!</span>
      </div>
    </div>
  );
}

export default Home;
