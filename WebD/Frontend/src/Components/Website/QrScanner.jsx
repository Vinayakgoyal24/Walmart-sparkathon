import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

const QrScanner = ({ onScan }) => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when this component mounts
  }, []);
  const navigate = useNavigate();
  const [isCameraMode, setIsCameraMode] = useState(true);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      navigate("/store-layout/store123");
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target.result;
        Html5Qrcode.scanFile(result, true)
          .then((decodedText) => {
            onScan(decodedText);
            navigate(`/store-layout/${decodedText}`);
          })
          .catch((err) => console.warn("File scanning error:", err));
      };
      reader.readAsDataURL(file);
    }
  };

  const startCameraScan = () => {
    const scanner = new Html5QrcodeScanner("qr-reader", {
      fps: 10,
      qrbox: 250,
    });

    scanner.render(
      (decodedText) => {
        onScan(decodedText);
        navigate(`/store-layout/${decodedText}`);
      },
      (error) => console.warn(`QR code scan error: ${error}`)
    );

    return () => {
      scanner.clear();
    };
  };

  return (
    <div className=" w-full h-screen flex justify-center items-center bg-slate-200">
      <div className="w-full md:w-1/3 h-2/3 bg-[#0071DC] rounded-3xl flex flex-col items-center justify-center gap-4 p-8 dp">
        <img src="/images/logo.png" className="w-36" alt="" />
        <div className="bg-slate-300 p-3 rounded-3xl flex flex-col items-center gap-3">
          <h1 className="text-4xl text-gray-700 bg-[#FEBB0C] rounded-3xl px-4 py-1">
            Walmart Store Assistance
          </h1>
          <h1 className="text-xl leading-4 font-bold">
            Please Scan the unique store Qr
          </h1>
        </div>
        <button
          className="text-white bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-3xl w-full dp"
          onClick={() => {
            setIsCameraMode(true);
            startCameraScan();
          }}
        >
          Use Camera
        </button>

        <div className="text-white">OR</div>

        <button
          className="text-white bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-3xl w-full dp"
          onClick={() => setIsCameraMode(false)}
        >
          Upload File
        </button>

        {!isCameraMode && (
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="mt-4 text-gray-700 bg-slate-200 rounded-3xl"
          />
        )}
      </div>
      {isCameraMode && (
        <div
          id="qr-reader"
          className="ml-10 bg-slate-300 rounded-3xl mb-4 dp"
          style={{ width: "20%" }}
        ></div>
      )}
    </div>
  );
};

export default QrScanner;
