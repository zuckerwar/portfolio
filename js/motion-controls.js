(function () {
  var button = document.querySelector('.motion-playback-toggle');
  var images = Array.prototype.slice.call(document.querySelectorAll('.moving-things-gallery img[data-animation-src]'));
  if (!button || !images.length) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var posterSources = images.map(function (image) { return image.getAttribute('src'); });
  var isPlaying = false;

  function setPlaying(shouldPlay) {
    isPlaying = shouldPlay;
    images.forEach(function (image, index) {
      image.src = shouldPlay ? image.getAttribute('data-animation-src') : posterSources[index];
    });
    button.textContent = shouldPlay ? 'Pause animations' : 'Play animations';
    button.setAttribute('aria-label', button.textContent);
  }

  button.addEventListener('click', function () {
    setPlaying(!isPlaying);
  });

  button.hidden = false;
  setPlaying(!reduceMotion.matches);
  reduceMotion.addEventListener('change', function (event) {
    if (event.matches) setPlaying(false);
  });
})();
