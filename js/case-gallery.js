(function () {
  document.querySelectorAll('.case-gallery').forEach(function (gallery) {
    var viewport = gallery.querySelector('.case-gallery-viewport');
    var firstItem = gallery.querySelector('.case-gallery-item');
    var previousButton = gallery.querySelector('.case-gallery-previous');
    var nextButton = gallery.querySelector('.case-gallery-next');

    function updateButtons() {
      var maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      previousButton.disabled = viewport.scrollLeft <= 1;
      nextButton.disabled = viewport.scrollLeft >= maxScroll - 1;
    }

    function scrollGallery(direction) {
      if (direction < 0 && previousButton.disabled) return;
      if (direction > 0 && nextButton.disabled) return;

      var trackStyles = window.getComputedStyle(gallery.querySelector('.case-gallery-track'));
      var gap = parseFloat(trackStyles.columnGap) || 0;
      viewport.scrollBy({
        left: direction * (firstItem.getBoundingClientRect().width + gap),
        behavior: 'smooth'
      });
    }

    previousButton.addEventListener('click', function () { scrollGallery(-1); });
    nextButton.addEventListener('click', function () { scrollGallery(1); });
    viewport.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons);
    viewport.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft' && !previousButton.disabled) {
        event.preventDefault();
        scrollGallery(-1);
      }
      if (event.key === 'ArrowRight' && !nextButton.disabled) {
        event.preventDefault();
        scrollGallery(1);
      }
    });

    updateButtons();
  });
})();
