import users from "./data/user.js";
import "./UserCard.css";

function UserCard() {
  return (
    <div>
      {users.map((user) => {
        return <UserCardDetail {...user} />;
      })}
    </div>
  );
}

function UserCardDetail({ name, userInfo, message }) {
  return (
    <div className="card">
      <h2 className="greeting">{name}님, 안녕하세요</h2>
      <p style={{ backgroundColor: "black", color: "white" }}>
        처음 만든 리액트 컴포넌트입니다.
      </p>
      <div>
        {name}님의 나이는 {userInfo.age}살입니다.
      </div>
      <div>학교는 {userInfo.school}입니다.</div>
      <div>취미는 {userInfo.hobby.join(", ")}입니다.</div>
      <div>
        {name}님은 {userInfo.isMember ? "정회원" : "비회원"}입니다.
      </div>
      {message > 0 && <div>읽지 않은 메시지 {message}개가 있습니다.</div>}
    </div>
  );
}

export default UserCard;
