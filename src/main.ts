window.canvas = document.querySelector("canvas");
window.canvasContext = canvas?.getContext("2d");

window.__DEV__ = false;

window.battle = {
  initiated: false,
};

window.UI = document.querySelectorAll(".ui");

// Define game resolution
canvas!.width = 1024;
canvas!.height = 576;

canvasContext!.fillStyle = "white";
canvasContext?.fillRect(0, 0, canvas!.width, canvas!.height);
