import * as faceapi from "face-api.js";
import Image from "next/image";
import React from "react";
import { PrimaryButton } from "./Buttons";

function FaceRecognition({ setDetections, verify }) {
  const [modelsLoaded, setModelsLoaded] = React.useState(false);
  const [captureVideo, setCaptureVideo] = React.useState(false);

  const videoRef = React.useRef(null);
  const videoHeight = 480;
  const videoWidth = 640;
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const loadModels = async () => {
      //   const MODEL_URL = process.env.PUBLIC_URL + "/models";
      const MODEL_URL = "/models";

      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(setModelsLoaded(true));
    };
    loadModels();
  }, []);

  const startVideo = () => {
    setCaptureVideo(true);
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };

  const closeWebcam = () => {
    videoRef.current.pause();
    videoRef.current?.srcObject?.getTracks()[0]?.stop();
    setCaptureVideo(false);
  };

  const handleVideoOnPlay = () => {
    const interval = setInterval(async () => {
      if (canvasRef && canvasRef.current) {
        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
          videoRef.current
        );
        const displaySize = {
          width: videoWidth,
          height: videoHeight,
        };

        faceapi.matchDimensions(canvasRef.current, displaySize);

        const detections = await faceapi
          .detectSingleFace(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceDescriptor();

        // const resizedDetections = faceapi.resizeResults(
        //   detections,
        //   displaySize
        // );

        // canvasRef &&
        //   canvasRef.current &&
        //   canvasRef.current
        //     .getContext("2d")
        //     .clearRect(0, 0, videoWidth, videoHeight);
        // canvasRef &&
        //   canvasRef.current &&
        //   faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        // canvasRef &&
        //   canvasRef.current &&
        //   faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);

        if (detections?.descriptor) {
          handleClose([detections?.descriptor]);
        }
      }
    }, 100);

    const handleClose = (detections) => {
      clearInterval(interval);
      setDetections(detections);
      closeWebcam();
    };
  };

  const FACE_MATCHER_THRESHOLD = 0.6;
  const handleRecognition = (descriptor) => {
    const faceMatcher = new faceapi.FaceMatcher(
      descriptor,
      FACE_MATCHER_THRESHOLD
    );
  };

  return (
    <div>
      <div style={{ textAlign: "center", padding: "10px" }}>
        {captureVideo && modelsLoaded ? (
          <PrimaryButton
            text="Cancel Verification"
            onClick={closeWebcam}
            className="w-fit mx-auto font-semibold bg-[#115baa] text-white py-3 px-6 text-lg text-center rounded"
          />
        ) : (
          <div
            onClick={startVideo}
            className="cursor-pointer border rounded h-[40vh] bg-gray-200 w-full mt-10 mb-24 text-center p-8"
          >
            <span className="text-sm opacity-40">
              Click to Scan before entry
            </span>
            <Image
              src={"/images/face-scan.png"}
              width={200}
              height={200}
              alt="face"
              className="mx-auto"
            />
          </div>
        )}
      </div>
      {captureVideo ? (
        modelsLoaded ? (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "10px",
              }}
            >
              <video
                ref={videoRef}
                height={videoHeight}
                width={videoWidth}
                onPlay={handleVideoOnPlay}
                style={{ borderRadius: "10px" }}
              />
              <canvas ref={canvasRef} style={{ position: "absolute" }} />
            </div>
          </div>
        ) : (
          <div>loading...</div>
        )
      ) : (
        <></>
      )}
    </div>
  );
}

export default FaceRecognition;
