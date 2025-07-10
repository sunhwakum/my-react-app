// src/components/WebcamCapture.jsx
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

export default function WebcamCapture() {
  const webcamRef = useRef(null);
  const [uploadStatus, setUploadStatus] = useState("");

  // 1) 캡처 버튼 클릭 시 호출
  const handleCaptureAndUpload = async () => {
    if (!webcamRef.current) return;

    // 2) 캡처: data URI (Base64) 형태로 이미지 얻기
    const dataUrl = webcamRef.current.getScreenshot();
    if (!dataUrl) {
      setUploadStatus("캡처 실패");
      return;
    }

    try {
      setUploadStatus("업로드 중...");
      // 3) Base64 를 Blob 으로 변환
      const blob = await (await fetch(dataUrl)).blob();

      // 4) FormData 에 담기
      const formData = new FormData();
      formData.append("file", blob, "capture.jpg");

      // 5) 서버로 POST
      const res = await fetch("http://localhost:8000/webcam/form", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setUploadStatus("업로드 성공!");
      } else {
        setUploadStatus(`업로드 실패: ${res.status}`);
      }
    } catch (err) {
      console.error(err);
      setUploadStatus("업로드 중 오류 발생");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <h2>웹캠 사진 캡처 및 서버 전송</h2>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{ width: 640, height: 480 }}
        style={{ width: "100%", maxWidth: 640 }}
      />
      <div style={{ marginTop: 10 }}>
        <button onClick={handleCaptureAndUpload}>사진 캡처 & 업로드</button>
      </div>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
}
