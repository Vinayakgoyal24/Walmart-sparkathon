import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

const QrScanner = ({ onScan }) => {
  const navigate = useNavigate(); // Moved here

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("qr-reader", {
      fps: 10,
      qrbox: 250,
    });

    scanner.render(
      (decodedText) => {
        // Trigger the onScan prop function
        onScan(decodedText);

        // The navigate function is called within the success callback (where the QR code is successfully scanned) to route the user to the store-layout page using the decoded QR code text.
        navigate(`/store-layout/${decodedText}`);
      },
      (error) => {
        console.warn(`QR code scan error: ${error}`);
      }
    );

    return () => {
      scanner.clear();
    };
  }, [onScan, navigate]); // Added navigate to dependencies

  return <div id="qr-reader" style={{ width: "100%" }}></div>;
};

export default QrScanner;

//FLOW
// When a QR code is scanned, the onScan function (if provided) is called with the decoded text.
// Immediately after, the application navigates to the store-layout/:storeId route, where storeId is the decoded text from the QR code.