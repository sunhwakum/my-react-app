import "./ConsultForm.css";
import { useState } from "react";

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

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("올바른 이메일 형식이 아닙니다.");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailError) {
      alert("이메일 형식을 확인해주세요.");
      return;
    }

    const formData = {
      name,
      phone,
      email,
      selectProduct,
      date,
      time,
      memo,
      isAgree,
    };

    console.log("제출된 데이터:", formData);
    alert("상담 신청이 완료되었습니다!");

    // 초기화
    setName("");
    setPhone("");
    setEmail("");
    setSelectProduct("");
    setDate("");
    setTime("");
    setMemo("");
    setIsAgree(false);
    setEmailError("");
  };

  return (
    <form className="consult-form" onSubmit={handleSubmit}>
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

      <button type="submit">상담 신청</button>
    </form>
  );
}

export default ConsultForm;
