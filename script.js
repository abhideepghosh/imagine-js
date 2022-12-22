window.addEventListener("load", function () {
  /*----- Canvas Setup -----*/
  const canvas = document.querySelector("#canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  /* -----Setting Up Canvas Functionality----- */

  class Particle {
    constructor() {}
    draw() {}
    update() {}
  }

  class Effect {
    constructor(context, canvasWidth, canvasHeight) {
      this.context = context;
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.textX = this.canvasWidth / 2;
      this.textY = this.canvasHeight / 2;
      this.fontSize = 80;
      this.maxTextWidth = this.canvasWidth * 0.8;
      this.lineHeight = this.fontSize * 0.9;
      this.textInput = document.getElementById("textInput");
      this.textInput.addEventListener("keyup", (e) => {
        if (e.key !== " ") {
          this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
          this.wrapText(e.target.value);
        }
      });
    }
    wrapText(text) {
      const gradient = this.context.createLinearGradient(
        0,
        0,
        this.canvasWidth,
        this.canvasHeight
      );
      gradient.addColorStop(0.3, "red");
      gradient.addColorStop(0.5, "fuchsia");
      gradient.addColorStop(0.7, "purple");
      this.context.fillStyle = gradient;
      this.context.textAlign = "center";
      this.context.textBaseline = "middle";
      this.context.lineWidth = 3;
      this.context.strokeStyle = "white";
      this.context.font = this.fontSize + "px Helvetica";

      // Break Multiline Text
      let linesArray = [];
      const words = text.split(" ");
      let lineCounter = 0;
      let line = "";
      for (let i = 0; i < words.length; i++) {
        let testLine = line + words[i] + " ";
        if (this.context.measureText(testLine).width > this.maxTextWidth) {
          line = words[i] + " ";
          lineCounter++;
        } else {
          line = testLine;
        }
        linesArray[lineCounter] = line;
      }
      console.log(linesArray);
      let textHeight = this.lineHeight * lineCounter;
      this.textY = this.canvasHeight / 2 - textHeight / 2;
      linesArray.forEach((el, index) => {
        this.context.fillText(
          el,
          this.textX,
          this.textY + index * this.lineHeight
        );
        this.context.strokeText(
          el,
          this.textX,
          this.textY + index * this.lineHeight
        );
      });
    }
    convertToParticles() {}
    render() {}
  }

  const effect = new Effect(ctx, canvas.width, canvas.height);
  console.log(effect);
  effect.wrapText("Hello how are you");

  const animate = () => {};

  // const maxTextWidth = canvas.width * 0.8;
  // const lineHeight = 80;

  // console.log(canvas.width, canvas.height);
  // /* Function: Text Splitting For Fitting Into Canvas */
  // const wrapText = (text) => {
  //   const linesArray = [];
  //   let lineCounter = 0;
  //   let line = "";
  //   const words = text.split(" ");

  //   words.forEach((word, i) => {
  //     let testLine = line + word + " ";
  //     if (ctx.measureText(testLine).width > maxTextWidth) {
  //       line = word + " ";
  //       lineCounter++;
  //     } else {
  //       line = testLine;
  //     }
  //     linesArray[lineCounter] = line;
  //   });

  //   let textHeight = lineHeight * lineCounter;
  //   let textY = canvas.height / 2 - textHeight / 2;

  //   linesArray.forEach((el, index) => {
  //     ctx.fillText(el, canvas.width / 2, textY + index * lineHeight);
  //   });
  //   console.log(linesArray);
  // };

  // //   wrapText("Hello how are you");
  // textInput.addEventListener("keyup", (e) => {
  //   // console.log(e.target.value);
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   wrapText(e.target.value);
  // });
});
