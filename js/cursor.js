(function () {
  if (window.matchMedia('(hover: none)').matches) return;

  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  document.body.appendChild(cursor);

  let x = -100, y = -100;
  let cx = -100, cy = -100;
  let scale = 1, targetScale = 1;
  let hovering = false;

  const interactive = 'a, button, [role="button"], input, textarea, select, label';

  document.addEventListener('mousemove', e => { x = e.clientX; y = e.clientY; });
  document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
  document.addEventListener('mouseenter', () => cursor.style.opacity = '1');

  document.addEventListener('mouseover', e => {
    if (e.target.closest(interactive)) { hovering = true;  targetScale = 3.5; }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(interactive)) { hovering = false; targetScale = 1; }
  });

  document.addEventListener('mousedown', () => targetScale = hovering ? 2.5 : 0.7);
  document.addEventListener('mouseup',   () => targetScale = hovering ? 3.5 : 1);

  function lerp(a, b, t) { return a + (b - a) * t; }

  function animate() {
    cx    = lerp(cx, x, 0.14);
    cy    = lerp(cy, y, 0.14);
    scale = lerp(scale, targetScale, 0.12);
    cursor.style.transform = `translate(${cx}px, ${cy}px) scale(${scale})`;
    requestAnimationFrame(animate);
  }
  animate();
})();
