import * as THREE from "three";

let cachedIconImage: HTMLImageElement | null = null;
let iconImageLoading: Promise<HTMLImageElement> | null = null;

function loadIconImage(): Promise<HTMLImageElement> {
  if (cachedIconImage) return Promise.resolve(cachedIconImage);
  if (iconImageLoading) return iconImageLoading;
  iconImageLoading = new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      cachedIconImage = img;
      resolve(img);
    };
    img.onerror = reject;
    img.src = "/images/uploft-icon-mark-clean.png";
  });
  return iconImageLoading;
}

// The sharp, in-focus version seen through the lens — the real icon, drawn
// at full contrast onto a square canvas so it maps cleanly onto a circle.
export async function createSharpIconTexture(): Promise<THREE.CanvasTexture> {
  const img = await loadIconImage();
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const iconAspect = img.naturalWidth / img.naturalHeight;
  const drawW = size * 0.62;
  const drawH = drawW / iconAspect;
  ctx.drawImage(img, (size - drawW) / 2, (size - drawH) / 2, drawW, drawH);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

// The oversized, softly blurred, lower-contrast version sitting behind the
// lens — same source, same registration point, so the two read as one
// symbol coming into focus rather than two unrelated marks.
export async function createBlurredIconTexture(): Promise<THREE.CanvasTexture> {
  const img = await loadIconImage();
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const iconAspect = img.naturalWidth / img.naturalHeight;
  const drawW = size * 0.62;
  const drawH = drawW / iconAspect;
  ctx.filter = "blur(14px)";
  ctx.globalAlpha = 0.5;
  ctx.drawImage(img, (size - drawW) / 2, (size - drawH) / 2, drawW, drawH);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}
