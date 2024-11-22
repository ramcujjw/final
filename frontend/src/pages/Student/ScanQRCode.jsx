import React from "react";
import QrScanner from "react-qr-scanner";

const ScanQRCode = () => {
  const handleScan = (data) => {
    if (data) {
      alert(`Scanned Data: ${data.text}`);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  return (
    <div>
      <h1>Scan QR Code</h1>
      <QrScanner
        delay={300}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
      />
    </div>
  );
};

export default ScanQRCode;
