// src/components/PostCreate.jsx
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PostCreate() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    try {
      const response = await axios.post(
        "http://localhost:8000/post/form/",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      alert("게시글이 등록되었습니다.");
      navigate("/post"); // 게시판 목록으로 이동
    } catch (error) {
      console.error("업로드 실패:", error);
      alert("게시글 등록에 실패했습니다.");
    }
  };

  return (
    <div className="board-container">
      <header className="board-header">
        <h2>게시글 작성</h2>
      </header>
      <form className="write-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="제목" name="title" required />
        <input type="text" placeholder="작성자" name="author" required />
        <textarea placeholder="내용" name="content" required></textarea>
        <input type="file" name="file" />
        <div className="form-btns">
          <button type="submit" className="save-btn">저장</button>
          <button
            type="button"
            className="list-btn"
            onClick={() => navigate("/post")}
          >
            목록
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostCreate;
