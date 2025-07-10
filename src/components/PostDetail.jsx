import "./PostDetail.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function PostDetail() {
    const { id } = useParams();
    const postId = parseInt(id); // ⭐ 문자열을 숫자로 변환!
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const navigate = useNavigate();

    const fetchPost = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/post/id/${postId}`
            );
            setPost(response.data);
        } catch (error) {
            console.error("데이터를 불러오는 중 에러 발생", error);
        }
    };

    const fetchComments = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8000/comment/post_id/${postId}`
            );
            setComments(response.data);
        } catch (error) {
            console.error("댓글을 불러오는 중 에러 발생", error);
        }
    };

    const handleCommentSubmit = async () => {
        if (!newComment.trim()) return;

        try {
            const response = await axios.post(
                `http://localhost:8000/comment/`,
                {
                    post_id: postId,
                    content: newComment,
                    user: "익명",
                }
            );
            if (response.status === 201 || response.status === 200) {
                setNewComment("");
                fetchComments();
            }
        } catch (error) {
            console.error("댓글 등록 중 에러 발생", error);
        }
    };

    const deletePost = async () => {
        try {
            const response = await axios.delete(
                `http://localhost:8000/post/id/${postId}`
            );
            if (response.status === 204 || response.status === 200) {
                alert("삭제되었습니다.");
                navigate("/post/list");
            }
        } catch (error) {
            console.error("게시글 삭제 중 에러 발생", error);
        }
    };

    useEffect(() => {
        fetchPost();
        fetchComments();
    }, [postId]);

    if (!post) {
        return (
            <div className="board-container">
                <p>로딩 중...</p>
            </div>
        );
    }

    return (
        <div className="board-container">
            <header className="board-header">
                <h2>게시글 조회</h2>
            </header>
            <div className="detail-box">
                <div>
                    <strong>제목:</strong> {post.title}
                </div>
                <div>
                    <strong>작성일:</strong> {post.created_at}
                </div>
                <div>
                    <strong>내용:</strong>
                    <div className="detail-content">{post.content}</div>
                </div>
                <div>
                    <strong>첨부파일:</strong> {post.filename}
                </div>
            </div>

            <div className="detail-btns">
                <button
                    className="edit-btn"
                    onClick={() => navigate(`/post/update/${postId}`)}
                >
                    수정
                </button>
                <button className="delete-btn" onClick={deletePost}>
                    삭제
                </button>
                <button
                    className="list-btn"
                    onClick={() => navigate("/post/list")}
                >
                    목록
                </button>
            </div>

            <div className="comment-section">
                <h3>댓글</h3>
                <ul className="comment-list">
                    {comments.map((comment) => (
                        <li key={comment.id}>
                            <b>{comment.user || "익명"}:</b> {comment.content}
                        </li>
                    ))}
                </ul>
                <div className="comment-form">
                    <input
                        type="text"
                        placeholder="댓글을 입력하세요"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleCommentSubmit();
                            }
                        }}
                    />
                    <button onClick={handleCommentSubmit}>등록</button>
                </div>
            </div>
        </div>
    );
}

export default PostDetail;
