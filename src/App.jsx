import React, { useRef } from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";

import "./style/main.scss";
import { drawMesh } from "./utilities";

export default function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const executeFacemesh = async () => {
    const net = await facemesh.load({
      videoResolution: { height: 500, width: 400 },
      scale: 0.8,
    });
    setInterval(() => {
      detector(net);
    }, 200);
  };

  const detector = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const faceDetection = await net.estimateFaces(video);

      const ctx = canvasRef.current.getContext("2d");
      drawMesh(faceDetection, ctx);
    }
  };

  executeFacemesh();

  return (
    <main>
      <Webcam ref={webcamRef} className="webcam_element" />
      <canvas ref={canvasRef} className="canvas_element" />
    </main>
  );
}
