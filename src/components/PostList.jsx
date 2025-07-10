import "./PostList.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function PostList() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/post");
      setPosts(response.data);
    } catch (error) {
      console.error("데이터 가져오는 중 에러 발생", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <div className="board-container">
        <header className="board-header">
          <h2>게시판 목록</h2>
          <button
            className="write-btn"
            onClick={() => {
              navigate("/post/create");
            }}
          >
            글 작성
          </button>
        </header>
        <table className="board-table">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => {
              return (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>
                    <Link to={`/post/detail/${post.id}`}>{post.title}</Link>
                  </td>
                  <td>{post.created_at}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PostList;
