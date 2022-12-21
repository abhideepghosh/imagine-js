window.addEventListener("load", function () {
  const textInput = document.getElementById("textInput");

  /*----- Canvas Setup -----*/
  const canvas = document.querySelector("#canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  /* -----Setting Up Canvas Functionality----- */

  ctx.lineWidth = 3;

  // Test Line To Align Words
  ctx.strokeStyle = "red";
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();

  // Test Line To Align Words
  ctx.strokeStyle = "blue";
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.stroke();

  // Writing On Canvas
  const text = "Hello how are you";
  //   console.log(ctx);
  const textX = canvas.width / 2;
  const textY = canvas.height / 2;
  ctx.fillStyle = "yellow";
  ctx.strokeStyle = "white";
  //   ctx.letterSpacing = "10px";
  ctx.font = "80px Helvetica";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  //   ctx.fillText(text, textX, textY);
  //   ctx.strokeText(text, textX, textY);

  const maxTextWidth = canvas.width * 0.8;
  const lineHeight = 80;

  /* Function: Text Splitting For Fitting Into Canvas */
  const wrapText = (text) => {
    const linesArray = [];
    let lineCounter = 0;
    let line = "";
    const words = text.split(" ");

    words.forEach((word, i) => {
      let testLine = line + word + " ";
      if (ctx.measureText(testLine).width > maxTextWidth) {
        line = word + " ";
        lineCounter++;
      } else {
        line = testLine;
      }
      linesArray[lineCounter] = line;
    });

    let textHeight = lineHeight * lineCounter;
    let textY = canvas.height / 2 - textHeight / 2;

    linesArray.forEach((el, index) => {
      ctx.fillText(el, canvas.width / 2, textY + index * lineHeight);
    });
    console.log(linesArray);
  };

  //   wrapText("Hello how are you");
  textInput.addEventListener("keyup", (e) => {
    // console.log(e.target.value);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    wrapText(e.target.value);
  });
});
