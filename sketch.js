let spriteSheet;
const TOTAL_FRAMES = 8;
let frameTicker = 0;
const FRAME_DELAY = 6; // 每隔多少個 draw 迴圈切換影格
let FRAME_W = 0;
let FRAME_H = 0;

// 新增第二個 sprite
let spriteSheet2;
const TOTAL_FRAMES2 = 18;
let FRAME_W2 = 0;
let FRAME_H2 = 0;
const GAP = 40; // 兩個動畫間距

// 新增第三個 sprite (all3.png)
let spriteSheet3;
const TOTAL_FRAMES3 = 12;
let FRAME_W3 = 0;
let FRAME_H3 = 0;

function preload() {
  // 請確保檔案位於 c:\Users\User\Downloads\20251124\2\all2.png
  spriteSheet = loadImage('2/all2.png');

  // 請確保檔案位於 c:\Users\User\Downloads\20251124\1\2939 177.png
  spriteSheet2 = loadImage('1/2939 177.png');

  // 請確保檔案位於 c:\Users\User\Downloads\20251124\3\all3.png
  spriteSheet3 = loadImage('3/all3.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  imageMode(CENTER);
  noSmooth();

  // spriteSheet 在 preload 已載入，這裡計算每格尺寸（若檔案有問題會保留 0）
  if (spriteSheet && spriteSheet.width > 0) {
    FRAME_W = spriteSheet.width / TOTAL_FRAMES;
    FRAME_H = spriteSheet.height;
  }

  if (spriteSheet2 && spriteSheet2.width > 0) {
    FRAME_W2 = spriteSheet2.width / TOTAL_FRAMES2;
    FRAME_H2 = spriteSheet2.height;
  }

  if (spriteSheet3 && spriteSheet3.width > 0) {
    FRAME_W3 = spriteSheet3.width / TOTAL_FRAMES3;
    FRAME_H3 = spriteSheet3.height;
  }
}

function draw() {
  background('#03045e');

  // 若三個圖都尚未載入，先不繪製
  if ((!spriteSheet || FRAME_W === 0) && (!spriteSheet2 || FRAME_W2 === 0) && (!spriteSheet3 || FRAME_W3 === 0)) return;

  frameTicker++;

  // 計算各 sprite 的目前影格
  let currentFrame = 0;
  if (spriteSheet && FRAME_W > 0) {
    currentFrame = Math.floor(frameTicker / FRAME_DELAY) % TOTAL_FRAMES;
  }

  let currentFrame2 = 0;
  if (spriteSheet2 && FRAME_W2 > 0) {
    currentFrame2 = Math.floor(frameTicker / FRAME_DELAY) % TOTAL_FRAMES2;
  }

  let currentFrame3 = 0;
  if (spriteSheet3 && FRAME_W3 > 0) {
    currentFrame3 = Math.floor(frameTicker / FRAME_DELAY) % TOTAL_FRAMES3;
  }

  const dy = height / 2;

  // 若三個動畫都存在，置中顯示並排
  if (FRAME_W > 0 && FRAME_W2 > 0 && FRAME_W3 > 0) {
    const totalWidth = FRAME_W + GAP + FRAME_W2 + GAP + FRAME_W3;
    const leftCenterX = width / 2 - totalWidth / 2 + FRAME_W / 2;
    const center2X = leftCenterX + FRAME_W + GAP;
    const center3X = center2X + FRAME_W2 + GAP;

    const sx = currentFrame * FRAME_W;
    image(spriteSheet, leftCenterX, dy, FRAME_W, FRAME_H, sx, 0, FRAME_W, FRAME_H);

    const sx2 = currentFrame2 * FRAME_W2;
    image(spriteSheet2, center2X, dy, FRAME_W2, FRAME_H2, sx2, 0, FRAME_W2, FRAME_H2);

    const sx3 = currentFrame3 * FRAME_W3;
    image(spriteSheet3, center3X, dy, FRAME_W3, FRAME_H3, sx3, 0, FRAME_W3, FRAME_H3);

  // 若只有前兩個存在（原邏輯）
  } else if (FRAME_W > 0 && FRAME_W2 > 0) {
    const totalWidth = FRAME_W + GAP + FRAME_W2;
    const leftCenterX = width / 2 - totalWidth / 2 + FRAME_W / 2;
    const rightCenterX = leftCenterX + FRAME_W + GAP;

    const sx = currentFrame * FRAME_W;
    image(spriteSheet, leftCenterX, dy, FRAME_W, FRAME_H, sx, 0, FRAME_W, FRAME_H);

    const sx2 = currentFrame2 * FRAME_W2;
    image(spriteSheet2, rightCenterX, dy, FRAME_W2, FRAME_H2, sx2, 0, FRAME_W2, FRAME_H2);

  // 若只有第二與第三存在，置中顯示並排（把第二放左、第三放右）
  } else if (FRAME_W2 > 0 && FRAME_W3 > 0 && FRAME_W === 0) {
    const totalWidth = FRAME_W2 + GAP + FRAME_W3;
    const leftCenterX = width / 2 - totalWidth / 2 + FRAME_W2 / 2;
    const rightCenterX = leftCenterX + FRAME_W2 + GAP;

    const sx2 = currentFrame2 * FRAME_W2;
    image(spriteSheet2, leftCenterX, dy, FRAME_W2, FRAME_H2, sx2, 0, FRAME_W2, FRAME_H2);

    const sx3 = currentFrame3 * FRAME_W3;
    image(spriteSheet3, rightCenterX, dy, FRAME_W3, FRAME_H3, sx3, 0, FRAME_W3, FRAME_H3);

  // 其他單一存在情況：置中顯示該動畫
  } else if (FRAME_W > 0) {
    const sx = currentFrame * FRAME_W;
    image(spriteSheet, width / 2, dy, FRAME_W, FRAME_H, sx, 0, FRAME_W, FRAME_H);
  } else if (FRAME_W2 > 0) {
    const sx2 = currentFrame2 * FRAME_W2;
    image(spriteSheet2, width / 2, dy, FRAME_W2, FRAME_H2, sx2, 0, FRAME_W2, FRAME_H2);
  } else if (FRAME_W3 > 0) {
    const sx3 = currentFrame3 * FRAME_W3;
    image(spriteSheet3, width / 2, dy, FRAME_W3, FRAME_H3, sx3, 0, FRAME_W3, FRAME_H3);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
