import "./ConsultForm.css";
import { useState } from "react";
import axios from "axios";

function ConsultForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectProduct, setSelectProduct] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [memo, setMemo] = useState("");
  const [isAgree, setIsAgree] = useState(false);
  const [emailError, setEmailError] = useState("");
  
  // 완료 여부 상태 추가
  const [isCompleted, setIsCompleted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("올바른 이메일 형식이 아닙니다.");
    } else {
      setEmailError("");
    }
  };

  const condName = name.trim() !== "";
  const condPhone = phone.trim() !== "";
  const condEmail = email.trim() !== "" && emailError === "";
  const condSelectProduct = selectProduct.trim() !== "";
  const condDate = date.trim() !== "";
  const condTime = time.trim() !== "";
  const condIsAgree = isAgree === true;

  const isFormValid =
    condName &&
    condPhone &&
    condEmail &&
    condSelectProduct &&
    condDate &&
    condTime &&
    condIsAgree;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      phone,
      email,
      selectProduct,
      date,
      time,
      memo,
      isAgree,
    };

    try {
      const response = await axios.post("http://localhost:8000/consalt/", data, {
        timeout: 5000,
      });

      console.log(response.data);

      // 제출 성공 시 완료 상태로 변경하고, 서버에서 받은 데이터 저장
      setIsCompleted(true);
      setSubmittedData(response.data);

      // 폼 초기화 (필요하면)
      setName("");
      setPhone("");
      setEmail("");
      setSelectProduct("");
      setDate("");
      setTime("");
      setMemo("");
      setIsAgree(false);
      setEmailError("");
    } catch (error) {
      if (error.response) {
        console.error("에러 상태코드:", error.response.status);
        console.error("에러 메시지:", error.response.data.message || "오류 발생");
        alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
      } else if (error.request) {
        console.error("서버 응답 없음:", error.request);
        alert("서버로부터 응답이 없습니다. 네트워크 상태를 확인해주세요.");
      } else {
        console.error("요청 중 오류:", error.message);
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  // 완료 상태면 완료 메시지 보여주기
  if (isCompleted && submittedData) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>상담 신청이 완료되었습니다!</h2>
        <p>
          <strong>이름:</strong> {submittedData.name}
        </p>
        <p>
          <strong>연락처:</strong> {submittedData.phone}
        </p>
        <p>
          <strong>이메일:</strong> {submittedData.email}
        </p>
        <p>
          <strong>상담 상품:</strong> {submittedData.selectProduct}
        </p>
        <p>
          <strong>희망 날짜:</strong> {submittedData.date}
        </p>
        <p>
          <strong>희망 시간대:</strong> {submittedData.time}
        </p>
        <p>빠른 시일 내에 연락드리겠습니다.</p>
        <a href="/">메인으로 돌아가기</a>
      </div>
    );
  }

  // 완료 전 폼 화면
  return (
    <form className="consult-form" onSubmit={handleSubmit}>
      {/* ...기존 폼 필드 동일하게 유지... */}

      <div className="formGroup">
        <label>*이름</label>
        <input
          type="text"
          placeholder="이름을 입력하세요"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="formGroup">
        <label>*연락처</label>
        <input
          type="tel"
          placeholder="숫자만 입력하세요"
          required
          value={phone}
          onChange={(e) => {
            const onlyNums = e.target.value.replace(/[^0-9]/g, "");
            setPhone(onlyNums);
          }}
        />
      </div>

      <div className="formGroup">
        <label>*이메일</label>
        <input
          type="email"
          placeholder="이메일을 입력하세요"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateEmail(e.target.value);
          }}
        />
        {emailError && <p className="error">{emailError}</p>}
      </div>

      <div className="formGroup">
        <label>*관심 있는 금융 상품</label>
        <select
          required
          value={selectProduct}
          onChange={(e) => setSelectProduct(e.target.value)}
        >
          <option value="">선택하세요</option>
          <option value="loan">대출</option>
          <option value="deposit">예금</option>
          <option value="investment">투자</option>
          <option value="card">신용카드</option>
        </select>
      </div>

      <div className="formGroup">
        <label>*상담 희망 날짜</label>
        <input
          required
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="formGroup">
        <label>*상담 시간대</label>
        <label>
          <input
            type="radio"
            name="time"
            value="morning"
            checked={time === "morning"}
            onChange={(e) => setTime(e.target.value)}
          />
          오전
        </label>
        <label>
          <input
            type="radio"
            name="time"
            value="afternoon"
            checked={time === "afternoon"}
            onChange={(e) => setTime(e.target.value)}
          />
          오후
        </label>
        <label>
          <input
            type="radio"
            name="time"
            value="evening"
            checked={time === "evening"}
            onChange={(e) => setTime(e.target.value)}
          />
          저녁
        </label>
      </div>

      <div className="formGroup">
        <label>추가 메모 (선택)</label>
        <textarea
          rows="4"
          placeholder="상담 요청사항이나 질문을 입력하세요"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        ></textarea>
      </div>

      <div className="formGroup">
        <label>
          <input
            type="checkbox"
            checked={isAgree}
            onChange={(e) => setIsAgree(e.target.checked)}
          />
          마케팅 수신에 동의합니다
        </label>
      </div>

      <button type="submit" className="submitButton" disabled={!isFormValid}>
        상담 신청하기
      </button>
    </form>
  );
}

export default ConsultForm;
