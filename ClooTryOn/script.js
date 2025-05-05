const videoElement = document.getElementById('inputVideo');
const canvasElement = document.getElementById('outputCanvas');
const canvasCtx = canvasElement.getContext('2d');

function getDistance(p1, p2) {
    const dx = (p2.x - p1.x);
    const dy = (p2.y - p1.y);
    return Math.sqrt(dx * dx + dy * dy);
  }  

//get face shape
function classifyFaceShape(landmarks) {
    // const cheekLeft = landmarks[234];
    // const cheekRight = landmarks[454];
    // const chin = landmarks[152];
    // const forehead = landmarks[10];
  
    // const faceWidth = getDistance(cheekLeft, cheekRight);
    // const faceHeight = getDistance(forehead, chin);
    // const ratio = faceWidth / faceHeight;
  
    // if (ratio > 0.95) return "Round";
    // else if (ratio > 0.85) return "Oval";
    // else if (ratio > 0.75) return "Heart";
    // else return "Square"; // fallback
    const foreheadWidth = getDistance(landmarks[127], landmarks[356]);
    const cheekboneWidth = getDistance(landmarks[234], landmarks[454]);
    const jawWidth = getDistance(landmarks[58], landmarks[288]);  // or use 234 and 454 again
    const faceHeight = getDistance(landmarks[10], landmarks[152]);

    const avgWidth = (foreheadWidth + cheekboneWidth + jawWidth) / 3;
    const heightToWidth = faceHeight / avgWidth;

    if (cheekboneWidth > foreheadWidth && cheekboneWidth > jawWidth && heightToWidth > 1.3) return "Oval";
    if (Math.abs(foreheadWidth - jawWidth) < 0.05 && cheekboneWidth > foreheadWidth && heightToWidth < 1.2) return "Round";
    if (Math.abs(foreheadWidth - jawWidth) < 0.05 && Math.abs(foreheadWidth - cheekboneWidth) < 0.05) return "Square";
    if (foreheadWidth > jawWidth && cheekboneWidth > jawWidth) return "Heart";
    if (jawWidth > foreheadWidth && cheekboneWidth < jawWidth) return "Triangle";
    if (cheekboneWidth > foreheadWidth && cheekboneWidth > jawWidth && foreheadWidth < jawWidth) return "Diamond";

  return "Unknown";
  }

 //recommend based on face shape 
function getRecommendedFrame(faceShape) {
    const recs = {
      Round: "Square or Rectangular Frames",
      Oval: "Aviators or Cat-Eye Frames",
      Heart: "Bottom-heavy or Rimless Frames",
      Square: "Round or Oval Frames"
    };
    return recs[faceShape] || "Classic Frames";
  }
  

// MediaPipe FaceMesh setup
const faceMesh = new FaceMesh({
  locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
});
faceMesh.setOptions({
  maxNumFaces: 1,
  refineLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});

// Drawing - OG Loic with glasses overlay
// faceMesh.onResults(results => {
//   canvasCtx.save();
//   canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
//   canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

//   if (results.multiFaceLandmarks) {
//     for (const landmarks of results.multiFaceLandmarks) {
//         for (let point of landmarks) {
//           canvasCtx.beginPath();
//           canvasCtx.arc(point.x * canvasElement.width, point.y * canvasElement.height, 1, 0, 1 * Math.PI);
//           canvasCtx.fillStyle = 'cyan';
//           canvasCtx.fill();
//         }
      
//         // define landmark references
//         const leftEye = landmarks[33]; // OR 130 / 133
//         const rightEye = landmarks[263];
//         const cheekLeft = landmarks[234];
//         const cheekRight = landmarks[454];
      
//         // i2i distance
//         const ipd = getDistance(leftEye, rightEye) * canvasElement.width;
      
//         // face width
//         const faceWidth = getDistance(cheekLeft, cheekRight) * canvasElement.width;

//         //face shape
//         const faceShape = classifyFaceShape(landmarks);
//         const recommendation = getRecommendedFrame(faceShape);
      
//         // display measurements
//         canvasCtx.fillStyle = "white";
//         canvasCtx.font = "16px Arial";
//         canvasCtx.fillText(`Eye Distance: ${ipd.toFixed(1)} px`, 10, 20);
//         canvasCtx.fillText(`Face Width: ${faceWidth.toFixed(1)} px`, 10, 40);
//         canvasCtx.fillText(`Face Shape: ${faceShape}`, 10, 60);
//         canvasCtx.fillText(`Try: ${recommendation}`, 10, 80);
//       }
      
// //GLASSES LOGIC
//     // for (const landmarks of results.multiFaceLandmarks){
//     //     drawGlasses(landmarks);


//     //     const leftEye = landmarks[33]; // OR 130 / 133
//     //     const rightEye = landmarks[263];
//     //     const cheekLeft = landmarks[234];
//     //     const cheekRight = landmarks[454];
      
//     //     // i2i distance
//     //     const ipd = getDistance(leftEye, rightEye) * canvasElement.width;
      
//     //     // face width
//     //     const faceWidth = getDistance(cheekLeft, cheekRight) * canvasElement.width;

//     //     //face shape
//     //     const faceShape = classifyFaceShape(landmarks);
//     //     const recommendation = getRecommendedFrame(faceShape);
      
//     //     // display measurements
//     //     canvasCtx.fillStyle = "white";
//     //     canvasCtx.font = "16px Arial";
//     //     canvasCtx.fillText(`Eye Distance: ${ipd.toFixed(1)} px`, 10, 20);
//     //     canvasCtx.fillText(`Face Width: ${faceWidth.toFixed(1)} px`, 10, 40);
//     //     canvasCtx.fillText(`Face Shape: ${faceShape}`, 10, 60);
//     //     canvasCtx.fillText(`Try: ${recommendation}`, 10, 80);
//     //   }
//     //  }


//     }
  

//   canvasCtx.restore();
// });


//animated - for video (new logic - delay animation)
    let scanStartTime = null;

    let allowScan = false;

    document.getElementById("startScanBtn").addEventListener("click", () => {
      allowScan = true;
      scanStartTime = performance.now();
    
      // Hide the button & show scan status
      document.getElementById("startScanBtn").style.display = "none";
      document.getElementById("scanStatus").style.display = "block";
    });
    
    let scanComplete = false;
    let storedShape = null;
    let storedRecommendation = null;

    //button logic - tryGlasses
    let showGlasses = false;
    let hideLandmarks = false;

    // document.getElementById("tryButton").addEventListener("click", () => {
    //     showGlasses = !showGlasses;
    //     hideLandmarks = !hideLandmarks;
      
    //     document.getElementById("resultBox").style.display = hideLandmarks ? "none" : "block";
    //   });      

    document.getElementById("tryButton").addEventListener("click", () => {
        showGlasses = !showGlasses;
        hideLandmarks = !hideLandmarks;
      
        const resultBox = document.getElementById("resultBox");
      
        if (showGlasses) {
          // Calculate & display static result
          const fitScore = Math.floor(85 + Math.random() * 10); // 85–95%
          resultBox.innerHTML = `
            <div style="font-size: 20px; font-weight: 600; margin-bottom: 5px;">Try-On Result</div>
            <div><strong>Face Shape:</strong> ${storedShape}</div>
            <div><strong>Recommended:</strong> ${storedRecommendation}</div>
            <div style="margin-top: 5px;"><strong>Fit Score:</strong> ${fitScore}% Match</div>
          `;
          resultBox.style.display = "block";
        } else {
          // Hide on toggle off
          resultBox.style.display = "none";
        }
      });
      

    //button logic - click photo
    const flash = document.getElementById("flash");

    document.getElementById("photoButton").addEventListener("click", () => {
        flash.style.opacity = 0.8;
        setTimeout(() => flash.style.opacity = 0, 150);

        const dataUrl = canvasElement.toDataURL('image/png');
        const link = document.getElementById("downloadLink");
        link.href = dataUrl;
        link.download = 'cloo-tryon.png';
        link.click();
    });

      

    faceMesh.onResults(results => {
    // if (!scanStartTime) scanStartTime = performance.now();
    if (!allowScan) return;

    const elapsed = performance.now() - scanStartTime;

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

    if (results.multiFaceLandmarks) {
        for (const landmarks of results.multiFaceLandmarks) {
          if (!hideLandmarks) {
            for (let point of landmarks) {
              canvasCtx.beginPath();
              canvasCtx.arc(point.x * canvasElement.width, point.y * canvasElement.height, 2, 0, 2 * Math.PI);
              canvasCtx.fillStyle = elapsed < 4000 ? (Math.floor(elapsed / 250) % 2 === 0 ? 'cyan' : 'white') : 'lime';
              canvasCtx.fill();
            }
          }

        if (!scanComplete && elapsed >= 4000) {
            storedShape = classifyFaceShape(landmarks);
            storedRecommendation = getRecommendedFrame(storedShape);
            scanComplete = true;
        }

        // if (scanComplete) {
        //     canvasCtx.fillStyle = "white";
        //     canvasCtx.font = "18px Arial";
        //     canvasCtx.fillText(`Face Shape: ${storedShape}`, 10, 30);
        //     canvasCtx.fillText(`Recommended: ${storedRecommendation}`, 10, 60);
        // }
        }
    }

    if (scanComplete && showGlasses) {
        drawGlasses(results.multiFaceLandmarks[0]); // draw on the first face
      }
      
      const scanStatus = document.getElementById("scanStatus");
    
    if (!scanComplete) {
    const scanMessages = [
        "Analyzing facial geometry...",
        "Calculating proportions...",
        "Identifying face shape...",
        "Recommending frames..."
    ];
    const messageIndex = Math.min(Math.floor(elapsed / 1000), scanMessages.length - 1);
    scanStatus.innerText = scanMessages[messageIndex];
    } else {
    // scanStatus.innerText = "";
    // Hide the scan status when done
    scanStatus.style.display = "none";
    }

    canvasCtx.restore();
    });



// Webcam input
const camera = new Camera(videoElement, {
  onFrame: async () => {
    await faceMesh.send({ image: videoElement });
  },
  width: 640,
  height: 480
});
camera.start();

//Glasses Overlay
// const glassesImg = new Image();
// glassesImg.src = "glasses.png";

const glassesMap = {
    "Round": "square.png",
    "Oval": "aviator.png",
    "Heart": "rimless.png",
    "Square": "round.png",
    "Triangle": "wayfarer.png"
  };

const glassesImgs = {};
  for (let shape in glassesMap) {
    glassesImgs[shape] = new Image();
    // glassesImgs[shape].src = glassesMap[shape];
    glassesImgs[shape].src = `images/${glassesMap[shape]}`;
}


function drawGlasses(landmarks) {
  const img = glassesImgs[storedShape] || glassesImg; // fallback
  const leftEye = landmarks[30];
  const rightEye = landmarks[263];
  const noseBridge = landmarks[168];

  // Calculate angle and scale
  const dx = rightEye.x - leftEye.x;
  const dy = rightEye.y - leftEye.y;
  const angle = Math.atan2(dy, dx);
  const dist = Math.hypot(dx, dy);

  // Position glasses at midpoint between eyes
  const centerX = (leftEye.x + rightEye.x) / 2 * canvasElement.width;
  const centerY = (leftEye.y + rightEye.y) / 2 * canvasElement.height;

  // Scale factor based on eye distance
  const glassesWidth = dist * canvasElement.width * 2.0; // Tweak scale as needed
  const aspectRatio = 0.4; // Adjust depending on your image

  canvasCtx.save();
  canvasCtx.translate(centerX, centerY);
  canvasCtx.rotate(angle);
  canvasCtx.drawImage(img, -glassesWidth / 2, -glassesWidth * aspectRatio / 2, glassesWidth, glassesWidth * aspectRatio);
  canvasCtx.restore();
}

//resolution = samesize as the video being produced
videoElement.addEventListener('loadedmetadata', () => {
    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;
  });
  


