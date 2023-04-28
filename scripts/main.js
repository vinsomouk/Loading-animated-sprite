import { Frame } from "./models/frames.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 1480;
const CANVAS_HEIGHT = 100;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const image = new Image();
image.src = "../assets/byleth-projet.png";

export const spriteWidth = 107; // largeur d'un cadre
export const spriteHeight = 100; // hauteur d'un cadre

const idleFrames = new Frame("idle", 6, 0, 0, spriteWidth, spriteHeight);
const idle2Frames = new Frame("idle2", 6, 1, 5, spriteWidth, spriteHeight);
const jumpFrames = new Frame("jump", 5, 2, 0, spriteWidth, spriteHeight);
const jump2Frames = new Frame("jump2", 6, 6, 0, spriteWidth, spriteHeight);
const reverserunFrames = new Frame("reverserun", 3, 5, 1, spriteWidth, spriteHeight);
const run2Frames = new Frame("run2", 6, 6, 0, spriteWidth, spriteHeight);
const comingFrames = new Frame("coming", 3, 3, 0, spriteWidth, spriteHeight);
const coming2Frames = new Frame("coming2", 3, 3, 0, spriteWidth, spriteHeight);

const spriteAnimations = idleFrames.packSprites([
idleFrames,
idle2Frames,
jumpFrames, // nouveau cadre d'animation pour le saut
jump2Frames, // nouveau cadre d'animation pour le saut
reverserunFrames,
run2Frames,
comingFrames,
coming2Frames,
]);

let spriteX = 0; // position horizontale du sprite
const spriteY = 0; // position verticale du sprite
const spriteSpeed = 15; // vitesse de déplacement du sprite
let currentAnimation = spriteAnimations[1]; // animation par défaut : idleFrames



document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowLeft") {
    spriteX -= spriteSpeed;
    currentAnimation = spriteAnimations[4];
  } else if (event.code === "ArrowRight") {
    spriteX += spriteSpeed;
    currentAnimation = spriteAnimations[5];
  } 
});

document.addEventListener("keyup", (event) => {
  if (event.code === "ArrowLeft") {
    spriteX -= spriteSpeed;
    currentAnimation = spriteAnimations[1];
  } else if (event.code === "ArrowRight") {
    spriteX += spriteSpeed;
    currentAnimation = spriteAnimations[1];
  } 
});

let gameFrame = 0;
let staggerFrames = 15;

const progressBar = document.getElementById("progress-bar");
let progress = 0;
const maxProgress = 100;
const progressSpeed = 1; // vitesse de progression de la barre

document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowRight") {
    progress += progressSpeed;
    if (progress > maxProgress) {
      progress = 0;
      window.location.reload();
    }
    progressBar.style.width = `${progress}%`;
  }
  if (event.code === "ArrowLeft") {
    progress -= progressSpeed;
    if (progress > maxProgress) {
      progress = 0;
      window.location.reload();
    }
    progressBar.style.width = `${progress}%`;
  }
});


function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  const position = Math.floor(gameFrame / staggerFrames) % currentAnimation.loc.length;
  console.log(currentAnimation)

  const frameX = currentAnimation.loc[position].x;
  const frameY = currentAnimation.loc[position].y;

  ctx.drawImage(image, frameX, frameY, spriteWidth, spriteHeight, spriteX, spriteY, spriteWidth, spriteHeight);

  gameFrame++;

 

  requestAnimationFrame(animate);
}




image.addEventListener("load", () => {
    console.log("ok")
  animate();
});

