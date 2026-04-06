import confetti from 'canvas-confetti';

export const resizeCanvas = (canvas) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

export const launchConfetti = (canvas) => {
  const myConfetti = confetti.create(canvas, { resize: false });

  const base = { particleCount: 80, spread: 60 };
  // Centro lado izquierdo
  myConfetti({
    ...base,
    angle: 60,
    origin: { x: 0, y: 0.5 },
  });
  // Centro lado derecho
  myConfetti({
    ...base,
    angle: 120,
    origin: { x: 1, y: 0.5 },
  });
}
