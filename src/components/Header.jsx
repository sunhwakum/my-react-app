import { FaBoxOpen } from "react-icons/fa"; // 아이콘 사용 (npm i react-icons 필요)

function Header() {
  return (
    <header className="product-header">
      <div className="header-content">
        <FaBoxOpen className="header-icon" />
        <h1 className="header-title">제품카드</h1>
      </div>
    </header>
  );
}

export default Header;
