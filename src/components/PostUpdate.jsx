import "./PostUpdate.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function PostUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [filename, setFilename] = useState("");
  const [file, setFile] = useState(null); // 업데이트할 파일 별도 관리

  const fetchPost = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/post/id/${id}`);
      setPost(response.data);
    } catch (error) {
      console.error("게시글 불러오기 실패", error);
    }
  };

  useEffect(() => {
    if (id) fetchPost();
  }, [id]);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setFilename(post.filename);
    }
  }, [post]);

  if (!post) {
    return <>loading...</>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", title);
    data.append("content", content);
    if (file) {
      data.append("filename", file);
    }

    try {
      const response = await axios.put(
        `http://localhost:8000/post/form/id/${id}`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(response.status);
      alert("수정되었습니다!");
      navigate(`/post/detail/${id}`);
    } catch (error) {
      console.error("수정 실패", error);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="board-container">
      <header className="board-header">
        <h2>게시글 수정</h2>
      </header>
      <form className="write-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="제목"
          name="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="내용"
          name="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <div>
          현재 첨부파일: {filename ? filename : "없음"}
        </div>
        <div className="form-btns">
          <button type="submit" className="save-btn">
            저장
          </button>
          <button
            type="button"
            className="list-btn"
            onClick={() => navigate("/post/list")}
          >
            목록
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostUpdate;
