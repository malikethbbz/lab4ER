export function startParticles() {
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");

  let width, height;
  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  const particles = Array.from({ length: 80 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.3,
    dy: -Math.random() * 0.5 - 0.2,
  }));

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#c4a747";
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;

      // re-aparece desde abajo si se sale
      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
    });
    requestAnimationFrame(draw);
  }
  draw();
}
