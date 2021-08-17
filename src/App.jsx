import React, { useRef } from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";

import "./style/main.scss";

export default function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  return (
    <main>
      <Webcam ref={webcamRef} className="webcam_element" />
      <canvas ref={canvasRef} className="canvas_element" />
    </main>
  );
}
