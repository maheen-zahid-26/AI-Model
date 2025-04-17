import { useState } from "react";
import "./styles.css";

const App = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<{ age: number; gender: string } | null>(
    null
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handlePredict = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);

    const response = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setResult(data);
  };

  return (
    <div className="container">
      <h1 className="title">Age & Gender Prediction</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="upload-input"
      />
      {preview && <img src={preview} alt="Preview" className="image-preview" />}
      <button onClick={handlePredict} className="predict-button">
        Predict
      </button>
      {result && (
        <div className="result-box">
          <p className="result-text">
            Age: <span className="result-value">{result.age}</span>
          </p>
          <p className="result-text">
            Gender: <span className="result-value">{result.gender}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
