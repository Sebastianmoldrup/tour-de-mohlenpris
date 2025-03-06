"use client";
import { useState } from "react";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a CSV file!");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8080/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      setJsonData(result.data);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div>
      <h2>CSV to JSON Converter</h2>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload & Convert</button>

      {jsonData && (
        <pre style={{ textAlign: "left", whiteSpace: "pre-wrap" }}>
          {JSON.stringify(jsonData, null, 2)}
        </pre>
      )}
    </div>
  );
}
