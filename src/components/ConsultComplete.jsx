// src/components/ConsultComplete.jsx
import { useLocation } from "react-router-dom";

function ConsultComplete() {
    const location = useLocation();
    const { data } = location.state || {};

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>상담 신청이 완료되었습니다!</h2>
            {data ? (
                <>
                    <p>
                        <strong>이름:</strong> {data.name}
                    </p>
                    <p>
                        <strong>연락처:</strong> {data.phone}
                    </p>
                    <p>
                        <strong>이메일:</strong> {data.email}
                    </p>
                    <p>
                        <strong>상담 상품:</strong> {data.selectProduct}
                    </p>
                    <p>
                        <strong>희망 날짜:</strong> {data.date}
                    </p>
                    <p>
                        <strong>희망 시간대:</strong> {data.time}
                    </p>
                </>
            ) : (
                <p>상담 정보가 없습니다.</p>
            )}
            <p>빠른 시일 내에 연락드리겠습니다.</p>
            <a href="/">메인으로 돌아가기</a>
        </div>
    );
}

export default ConsultComplete;
