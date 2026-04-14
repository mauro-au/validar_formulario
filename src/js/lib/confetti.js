import confetti from 'canvas-confetti';

export const resizeCanvas = (canvas) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

export const launchConfetti = (canvas) => {
  const myConfetti = confetti.create(canvas, { resize: false });

  const baseConfig = { particleCount: 80, spread: 60 };

  myConfetti({
    ...baseConfig,
    angle: 60,
    origin: { x: 0, y: 0.5 },
  });

  myConfetti({
    ...baseConfig,
    angle: 120,
    origin: { x: 1, y: 0.5 },
  });
};
