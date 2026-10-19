(function () {
  var sharedNav = `
    <div class="site-nav-overlay js-nav" aria-hidden="true">
      <div class="nav-content">
        <ul class="nav-categories">
          <li class="nav-category">
            <a href="index.html#work" class="nav-link">Work</a>
            <div class="nav-sublinks">
              <a class="nav-link nav-sublink" href="shop-to-shop.html">Shop-to-Shop Shipping</a>
              <a class="nav-link nav-sublink" href="cs-and-dispute.html">Dispute and Dispute Resolution Center</a>
              <a class="nav-link nav-sublink" href="ka-design-system.html">Kleinanzeigen Design System</a>
              <a class="nav-link nav-sublink" href="transactions-overview.html">Transactions Overview</a>
              <a class="nav-link nav-sublink" href="xing-design-system.html">XING Design System</a>
              <a class="nav-link nav-sublink" href="deutsche-bank-advisors-platform.html">Deutsche Bank Advisors Platform</a>
              <a class="nav-link nav-sublink" href="google-snapseed.html">Google Snapseed</a>
            </div>
          </li>
          <li class="nav-category">
            <a href="index.html#projects" class="nav-link">Projects</a>
            <div class="nav-sublinks">
              <a class="nav-link nav-sublink" href="contrast-scale.html">Contrast Scale</a>
              <a class="nav-link nav-sublink" href="moving-things.html">Moving things</a>
            </div>
          </li>
          <li class="nav-category"><a href="index.html#contact" class="nav-link">A bit about me</a></li>
        </ul>
      </div>
    </div>`;

  Array.prototype.forEach.call(document.querySelectorAll('.site-nav-placeholder'), function (placeholder) {
    placeholder.insertAdjacentHTML('beforebegin', sharedNav);
    placeholder.remove();
  });
})();
