(function () {
  var tool = document.querySelector('.contrast-tool');
  if (!tool) return;

  var colorPicker = tool.querySelector('#contrast-color-picker');
  var hexInput = tool.querySelector('#contrast-hex-input');
  var prefixInput = tool.querySelector('#contrast-prefix-input');
  var scaleContainer = tool.querySelector('#contrast-tool-scale');
  var status = tool.querySelector('#contrast-tool-status');
  var error = tool.querySelector('#contrast-tool-error');
  var steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  var copyStatusTimer;

  function hexToRgb(hex) {
    var value = hex.replace('#', '');
    return {
      r: parseInt(value.substring(0, 2), 16),
      g: parseInt(value.substring(2, 4), 16),
      b: parseInt(value.substring(4, 6), 16)
    };
  }

  function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h;
    var s;
    var l = (max + min) / 2;

    if (max === min) {
      h = 0;
      s = 0;
    } else {
      var delta = max - min;
      s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

      switch (max) {
        case r:
          h = ((g - b) / delta + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / delta + 2) / 6;
          break;
        default:
          h = ((r - g) / delta + 4) / 6;
      }
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
  }

  function hslToHex(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    var r;
    var g;
    var b;

    if (s === 0) {
      r = l;
      g = l;
      b = l;
    } else {
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;

      function hueToRgb(t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      }

      r = hueToRgb(h + 1 / 3);
      g = hueToRgb(h);
      b = hueToRgb(h - 1 / 3);
    }

    return '#' + [r, g, b].map(function (channel) {
      return Math.round(channel * 255).toString(16).padStart(2, '0');
    }).join('');
  }

  function relativeLuminance(rgb) {
    var channels = [rgb.r, rgb.g, rgb.b].map(function (channel) {
      channel /= 255;
      return channel <= 0.03928
        ? channel / 12.92
        : Math.pow((channel + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
  }

  function contrastRatio(hex, backgroundHex) {
    var foregroundLuminance = relativeLuminance(hexToRgb(hex));
    var backgroundLuminance = relativeLuminance(hexToRgb(backgroundHex));
    var lighter = Math.max(foregroundLuminance, backgroundLuminance);
    var darker = Math.min(foregroundLuminance, backgroundLuminance);
    return ((lighter + 0.05) / (darker + 0.05)).toFixed(2);
  }

  function createBadge(ratio) {
    var numericRatio = parseFloat(ratio);
    var badge = document.createElement('span');
    badge.className = 'contrast-tool-badge';

    if (numericRatio >= 7) {
      badge.classList.add('contrast-tool-badge-aaa');
      badge.textContent = 'AAA';
    } else if (numericRatio >= 4.5) {
      badge.classList.add('contrast-tool-badge-pass');
      badge.textContent = 'AA';
    } else if (numericRatio >= 3) {
      badge.classList.add('contrast-tool-badge-pass');
      badge.textContent = 'AA Large';
    } else {
      badge.classList.add('contrast-tool-badge-fail');
      badge.textContent = 'Fail';
    }

    return badge;
  }

  function createContrastGroup(ratio) {
    var group = document.createElement('span');
    group.className = 'contrast-tool-badge-group';

    var value = document.createElement('span');
    value.className = 'contrast-tool-ratio';
    value.textContent = ratio + ':1';

    group.appendChild(value);
    group.appendChild(createBadge(ratio));
    return group;
  }

  function generateScale(hex) {
    var rgb = hexToRgb(hex);
    var hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    var lightnesses = [95, 90, 80, 68, 56, 45, 36, 27, 18, 11];

    return steps.map(function (step, index) {
      var saturation = step <= 200 ? hsl.s * 0.6 : step >= 700 ? hsl.s * 0.8 : hsl.s;
      return { step: step, hex: hslToHex(hsl.h, saturation, lightnesses[index]) };
    });
  }

  function render() {
    var hex = hexInput.value.trim();
    var validHex = /^#[0-9A-Fa-f]{6}$/.test(hex);
    hexInput.setAttribute('aria-invalid', String(!validHex));
    colorPicker.setAttribute('aria-invalid', String(!validHex));

    if (!validHex) {
      error.textContent = 'Enter a valid 6-digit hex color, such as #FF4457.';
      return;
    }

    error.textContent = '';
    scaleContainer.replaceChildren();
    var prefix = prefixInput.value.trim() || 'color';

    generateScale(hex).forEach(function (shade) {
      var tokenName = prefix + '-' + shade.step;
      var ratioToWhite = contrastRatio(shade.hex, '#ffffff');
      var ratioToBlack = contrastRatio(shade.hex, '#000000');
      var row = document.createElement('button');
      row.type = 'button';
      row.className = 'contrast-tool-swatch';
      row.style.backgroundColor = shade.step >= 600 ? '#1a1d20' : '#1e2226';
      row.setAttribute('aria-label', 'Copy ' + tokenName + ', ' + shade.hex.toUpperCase() +
        ', contrast ' + ratioToWhite + ' to 1 against white and ' + ratioToBlack + ' to 1 against black');

      var swatch = document.createElement('span');
      swatch.className = 'contrast-tool-swatch-block';
      swatch.style.backgroundColor = shade.hex;

      var token = document.createElement('span');
      token.className = 'contrast-tool-token';
      token.textContent = tokenName;

      var hexValue = document.createElement('span');
      hexValue.className = 'contrast-tool-hex';
      hexValue.textContent = shade.hex.toUpperCase();

      row.appendChild(swatch);
      row.appendChild(token);
      row.appendChild(hexValue);
      row.appendChild(createContrastGroup(ratioToWhite));
      row.appendChild(createContrastGroup(ratioToBlack));
      row.addEventListener('click', function () { copyToken(tokenName); });
      scaleContainer.appendChild(row);
    });
  }

  function copyFallback(text) {
    var temporaryInput = document.createElement('textarea');
    temporaryInput.value = text;
    temporaryInput.setAttribute('readonly', '');
    temporaryInput.style.position = 'fixed';
    temporaryInput.style.opacity = '0';
    document.body.appendChild(temporaryInput);
    temporaryInput.select();
    var copied = document.execCommand('copy');
    temporaryInput.remove();
    return copied;
  }

  function copyToken(tokenName) {
    var copyPromise = navigator.clipboard && navigator.clipboard.writeText
      ? navigator.clipboard.writeText(tokenName)
      : Promise.reject(new Error('Clipboard API is unavailable'));

    copyPromise.then(function () {
      showCopyStatus('Copied ' + tokenName);
    }).catch(function () {
      if (copyFallback(tokenName)) {
        showCopyStatus('Copied ' + tokenName);
      } else {
        showCopyStatus('Could not copy. Please copy the token manually.');
      }
    });
  }

  function showCopyStatus(message) {
    status.textContent = message;
    window.clearTimeout(copyStatusTimer);
    copyStatusTimer = window.setTimeout(function () {
      status.textContent = '';
    }, 2200);
  }

  colorPicker.addEventListener('input', function () {
    hexInput.value = colorPicker.value.toUpperCase();
    render();
  });

  hexInput.addEventListener('input', function () {
    if (/^#[0-9A-Fa-f]{6}$/.test(hexInput.value.trim())) {
      colorPicker.value = hexInput.value.trim();
    }
    render();
  });

  prefixInput.addEventListener('input', render);
  render();
})();
