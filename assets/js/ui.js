/* ===========================================================================
   SheTu Mobile — UI kit
   Small builders that return HTML strings, plus the few behaviours that have
   to be wired by hand: ripples, reveal-on-scroll, counters, sheets, toasts,
   and the generated background fields.
   =========================================================================== */
(function (w, d) {
  'use strict';

  var U = {};
  var esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  U.esc = esc;
  /* Latin digits to Bengali, for the numbers that arrive as numbers. */
  U.bn = function (v) {
    return String(v == null ? '' : v).replace(/\d/g, function (c) { return '০১২৩৪৫৬৭৮৯'[+c]; });
  };
  U.$ = function (sel, root) { return (root || d).querySelector(sel); };
  U.$$ = function (sel, root) { return Array.prototype.slice.call((root || d).querySelectorAll(sel)); };

  /* ---------------------------------------------------------------- photo
     Every "image" in this build is a generated sheet — a brand-ramp
     gradient with a monogram. Sample only; no binary ships. */
  U.photo = function (o) {
    o = o || {};
    var cls = 'ph' + (o.cls ? ' ' + o.cls : '') + (o.blur ? ' blurred' : '');
    return '<div class="' + cls + '" data-h="' + (o.h || 1) + '"' +
      (o.style ? ' style="' + o.style + '"' : '') + ' role="img" aria-label="' +
      esc(o.alt || 'নমুনা ছবি') + '">' +
      '<span class="ph-mono">' + esc(o.mono || 'সে') + '</span>' +
      (o.tag ? '<span class="ph-tag">' + esc(o.tag) + '</span>' : '') +
      '</div>';
  };
  U.avatar = function (o) {
    o = o || {};
    var size = o.size ? ' ' + o.size : '';
    return '<div style="position:relative;flex:0 0 auto">' +
      U.photo({ h: o.h, mono: o.mono, cls: 'av' + size, alt: o.alt }) +
      (o.on ? '<i class="on-dot"></i>' : '') + '</div>';
  };

  /* ---------------------------------------------------------------- chrome */
  U.appbar = function (o) {
    o = o || {};
    var left = o.back
      ? '<button class="iconbtn" data-back aria-label="পেছনে">' + w.ic('back') + '</button>'
      : (o.left || '');
    return '<header class="appbar' + (o.transparent ? ' is-transparent' : '') + '">' +
      left +
      '<div class="appbar__title">' +
        (o.title ? '<h1>' + esc(o.title) + '</h1>' : '') +
        (o.sub ? '<small>' + esc(o.sub) + '</small>' : '') +
      '</div>' + (o.right || '') + '</header>';
  };
  U.iconbtn = function (name, o) {
    o = o || {};
    return '<button class="iconbtn"' + (o.go ? ' data-go="' + o.go + '"' : '') +
      (o.act ? ' data-act="' + o.act + '"' : '') +
      ' aria-label="' + esc(o.label || name) + '">' + w.ic(name) +
      (o.dot ? '<i class="dot"></i>' : '') + '</button>';
  };

  /* ---------------------------------------------------------------- bits */
  U.sechead = function (title, moreLabel, go) {
    return '<div class="sechead"><h2>' + esc(title) + '</h2>' +
      (moreLabel ? '<button data-go="' + go + '">' + esc(moreLabel) + ' ›</button>' : '') + '</div>';
  };
  U.pill = function (txt, kind) {
    return '<span class="pill' + (kind ? ' ' + kind : '') + '">' + esc(txt) + '</span>';
  };
  U.tick = function () { return '<span class="tick">' + w.ic('check') + '</span>'; };
  U.notice = function (txt, kind, icon) {
    return '<div class="notice' + (kind ? ' ' + kind : '') + '">' + w.ic(icon || 'info') +
      '<div>' + txt + '</div></div>';
  };
  U.lrow = function (o) {
    o = o || {};
    var tag = o.go || o.act ? 'button' : 'div';
    return '<' + tag + ' class="lrow' + (o.unread ? ' unread' : '') + (o.cls ? ' ' + o.cls : '') + '"' +
      (o.go ? ' data-go="' + o.go + '"' : '') + (o.act ? ' data-act="' + o.act + '"' : '') + '>' +
      (o.lead || (o.icon ? '<span class="lrow__ic">' + w.ic(o.icon) + '</span>' : '')) +
      '<span class="lrow__txt"><b>' + (o.title || '') + '</b>' +
      (o.sub ? '<span>' + (o.sub) + '</span>' : '') + '</span>' +
      '<span class="lrow__end">' + (o.end || '') +
      (o.chev === false ? '' : w.ic('chev', 'chev')) + '</span></' + tag + '>';
  };
  U.stat = function (v, k, cls) {
    return '<div class="stat' + (cls ? ' ' + cls : '') + '"><b class="countup" data-to="' + esc(v) + '">' +
      esc(v) + '</b><span>' + esc(k) + '</span></div>';
  };
  U.fact = function (k, v, hidden) {
    return '<div class="fact"><dt>' + esc(k) + '</dt><dd' + (hidden ? ' class="hidden-val"' : '') + '>' +
      (hidden ? '••••••' : esc(v)) + '</dd></div>';
  };
  U.seg = function (items, active, act) {
    return '<div class="seg" data-seg="' + (act || '') + '"><span class="seg-ink"></span>' +
      items.map(function (t, i) {
        return '<button class="' + (i === (active || 0) ? 'is-on' : '') + '" data-i="' + i + '">' + esc(t) + '</button>';
      }).join('') + '</div>';
  };
  U.chips = function (items, active, scroll) {
    return '<div class="chips' + (scroll ? ' scroll' : '') + '" data-chips>' +
      items.map(function (t, i) {
        return '<button class="chip' + (i === active ? ' is-on' : '') + '">' + esc(t) + '</button>';
      }).join('') + '</div>';
  };
  U.sw = function (on, label, sub) {
    return '<label class="switch"><span class="sw-txt"><b>' + esc(label) + '</b>' +
      (sub ? '<span>' + esc(sub) + '</span>' : '') + '</span>' +
      '<button class="sw' + (on ? ' is-on' : '') + '" data-sw role="switch" aria-checked="' + !!on + '"></button></label>';
  };
  U.check = function (label, on, radio) {
    return '<button class="check' + (radio ? ' radio' : '') + (on ? ' is-on' : '') + '" data-check>' +
      '<span class="box">' + w.ic('check') + '</span><span>' + esc(label) + '</span></button>';
  };
  U.field = function (o) {
    o = o || {};
    var input = o.type === 'textarea'
      ? '<textarea class="textarea" placeholder="' + esc(o.ph || '') + '">' + esc(o.val || '') + '</textarea>'
      : o.type === 'select'
        ? '<select class="select">' + (o.opts || []).map(function (x) { return '<option>' + esc(x) + '</option>'; }).join('') + '</select>'
        : '<input class="input" type="' + (o.type || 'text') + '" placeholder="' + esc(o.ph || '') +
          '" value="' + esc(o.val || '') + '">';
    var body = o.icon ? '<span class="field-icon">' + w.ic(o.icon) + input + '</span>' : input;
    return '<label class="field">' + (o.label ? '<span class="label">' + esc(o.label) + '</span>' : '') +
      body + (o.hint ? '<span class="hint">' + esc(o.hint) + '</span>' : '') + '</label>';
  };
  U.bar = function (pct) {
    return '<div class="bar"><i data-w="' + pct + '"></i></div>';
  };
  U.ring = function (pct, label) {
    var c = 2 * Math.PI * 30;
    return '<div class="ring"><svg viewBox="0 0 74 74">' +
      '<defs><linearGradient id="ringgrad" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0%" stop-color="var(--brand)"/><stop offset="100%" stop-color="var(--action)"/>' +
      '</linearGradient></defs>' +
      '<circle class="trk" cx="37" cy="37" r="30"/>' +
      '<circle class="val" cx="37" cy="37" r="30" stroke-dasharray="' + c.toFixed(1) +
      '" stroke-dashoffset="' + c.toFixed(1) + '" data-ring="' + pct + '"/></svg>' +
      '<b>' + esc(label || pct + '%') + '</b></div>';
  };
  U.skeletonCard = function () {
    return '<div class="card"><div class="card__body"><div class="sk line"></div>' +
      '<div class="sk line"></div><div class="sk line short"></div></div></div>';
  };
  U.empty = function (icon, title, txt, btn) {
    return '<div class="empty rv"><div class="ic">' + w.ic(icon) + '</div><h3>' + esc(title) + '</h3>' +
      '<p>' + esc(txt) + '</p>' + (btn || '') + '</div>';
  };

  /* member card */
  U.mcard = function (m, i) {
    return '<button class="mcard rv" style="--i:' + (i || 0) + '" data-go="profile:' + m.id + '">' +
      U.photo({ h: m.h, mono: m.mono, alt: m.name }) +
      '<span class="mcard__fav" data-act="fav">' + w.ic('heart') + '</span>' +
      '<span class="mcard__meta"><b>' + esc(m.name) + (m.v ? U.tick() : '') + '</b>' +
      '<span>' + esc(U.bn(m.age) + ' • ' + m.city) + '</span></span></button>';
  };

  /* ---------------------------------------------------------------- backgrounds */
  /* Deterministic pseudo-random, so the field is stable across reloads
     rather than shimmering into a new arrangement every time. */
  function seeded(seed) {
    var s = seed || 20260901;
    return function () { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648; };
  }

  U.bgAurora = function () {
    return '<div class="bg" aria-hidden="true">' +
      '<span class="aurora-blob aurora-1"></span><span class="aurora-blob aurora-2"></span>' +
      '<span class="aurora-blob aurora-3"></span><span class="aurora-blob aurora-4"></span>' +
      '<span class="aurora-grain"></span></div>';
  };

  /* Hexagonal bokeh. Depth drives size, blur and opacity together — a big
     soft one is near the lens, a small sharp one is far away. Varying them
     independently is what makes fake bokeh look like coloured dots. */
  U.bgBokeh = function (count, seed) {
    var rnd = seeded(seed || 20260901), n = count || 16;
    var palette = ['#7A3D1B', '#965E3C', '#A14D48', '#B46C5E', '#C27443', '#C36F67', '#D89A5E'];
    var out = '<div class="bg" aria-hidden="true">';
    for (var i = 0; i < n; i++) {
      var depth = rnd();
      var size = Math.round(22 + depth * depth * 110);
      var blur = (1.5 + depth * 9).toFixed(1);
      var op = (0.07 + (1 - depth) * 0.17).toFixed(2);
      var left = Math.round(rnd() * 108 - 6);
      var dur = Math.round(26 + rnd() * 34);
      var delay = -Math.round(rnd() * dur);
      var col = palette[Math.floor(rnd() * palette.length)];
      out += '<span class="hex" style="left:' + left + '%;bottom:-16%;width:' + size + 'px;height:' +
        size * 1.08 + 'px;background:' + col + ';filter:blur(' + blur + 'px);opacity:' + op +
        ';animation-duration:' + dur + 's;animation-delay:' + delay + 's"></span>';
    }
    return out + '</div>';
  };

  U.bgHearts = function (count, seed) {
    var rnd = seeded(seed || 77321), n = count || 12, out = '<div class="bg" aria-hidden="true">';
    for (var i = 0; i < n; i++) {
      var s = (0.6 + rnd() * 1.5).toFixed(2);
      var dur = Math.round(16 + rnd() * 20);
      out += '<span class="heart" style="left:' + Math.round(rnd() * 100) + '%;bottom:-6%;transform:scale(' + s +
        ');animation-duration:' + dur + 's;animation-delay:-' + Math.round(rnd() * dur) + 's"></span>';
    }
    return out + '</div>';
  };

  U.bgRibbons = function () {
    return '<div class="bg" aria-hidden="true">' +
      '<span class="ribbon ribbon-1"></span><span class="ribbon ribbon-2"></span>' +
      '<span class="ribbon ribbon-3"></span></div>';
  };

  U.globe = function () {
    var pins = [[30, 34], [62, 28], [48, 58], [72, 62], [22, 62]];
    return '<div class="globe"><span class="globe__grid"></span><span class="globe__halo"></span>' +
      pins.map(function (p, i) {
        return '<span class="globe__pin" style="left:' + p[0] + '%;top:' + p[1] + '%;animation-delay:' + (i * .35) + 's"></span>';
      }).join('') + '</div>';
  };

  U.worldmap = function () {
    return '<div class="worldmap">' + w.DATA.mapDots.map(function (o, i) {
      return '<span class="mdot" data-label="' + esc(o.label) + '" style="left:' + o.x + '%;top:' + o.y +
        '%;animation-delay:' + (i * .3) + 's"></span>';
    }).join('') + '</div>';
  };

  U.confetti = function (host) {
    var el = d.createElement('div'); el.className = 'confetti';
    var cols = ['var(--brand)', 'var(--action)', 'var(--gold)', 'var(--ok)'];
    var html = '';
    for (var i = 0; i < 40; i++) {
      html += '<i style="left:' + Math.round(Math.random() * 100) + '%;background:' +
        cols[i % cols.length] + ';animation-delay:' + (Math.random() * .5).toFixed(2) +
        's;animation-duration:' + (1.6 + Math.random() * 1.4).toFixed(2) + 's"></i>';
    }
    el.innerHTML = html;
    (host || U.$('.device')).appendChild(el);
    setTimeout(function () { el.remove(); }, 3400);
  };

  /* ---------------------------------------------------------------- toast */
  U.toast = function (txt, icon) {
    var host = U.$('#toasts');
    var el = d.createElement('div');
    el.className = 'toast';
    el.innerHTML = w.ic(icon || 'check') + '<span>' + esc(txt) + '</span>';
    host.appendChild(el);
    setTimeout(function () {
      el.classList.add('is-out');
      setTimeout(function () { el.remove(); }, 320);
    }, 2200);
  };

  /* ---------------------------------------------------------------- sheet */
  U.sheet = function (o) {
    o = o || {};
    U.closeOverlay();
    var host = U.$('#overlay');
    host.innerHTML =
      '<div class="scrim" data-close></div>' +
      '<div class="sheet" role="dialog" aria-modal="true">' +
        '<span class="sheet__grab"></span>' +
        '<div class="sheet__head"><h3>' + esc(o.title || '') + '</h3>' +
          '<button class="iconbtn" data-close aria-label="বন্ধ">' + w.ic('close') + '</button></div>' +
        '<div class="sheet__body">' + (o.body || '') + '</div>' +
      '</div>';
    host.hidden = false;
    U.wire(host);
  };
  U.dialog = function (o) {
    o = o || {};
    U.closeOverlay();
    var host = U.$('#overlay');
    host.innerHTML =
      '<div class="scrim" data-close></div>' +
      '<div class="dialog" role="dialog" aria-modal="true">' +
        (o.icon ? '<div class="empty" style="padding:0 0 10px"><div class="ic">' + w.ic(o.icon) + '</div></div>' : '') +
        '<h3>' + esc(o.title || '') + '</h3>' +
        '<p class="muted" style="margin:8px 0 16px;font-size:.88rem">' + esc(o.text || '') + '</p>' +
        '<div class="btn-row">' +
          (o.cancel === false ? '' : '<button class="btn quiet" data-close>' + esc(o.cancelLabel || 'বাতিল') + '</button>') +
          '<button class="btn" data-close data-act="' + esc(o.act || '') + '">' + esc(o.okLabel || 'ঠিক আছে') + '</button>' +
        '</div>' +
      '</div>';
    host.hidden = false;
    U.wire(host);
  };
  U.closeOverlay = function () {
    var host = U.$('#overlay');
    if (!host || host.hidden) return;
    var sheet = U.$('.sheet', host), scrim = U.$('.scrim', host);
    if (sheet) sheet.classList.add('is-out');
    if (scrim) scrim.classList.add('is-out');
    setTimeout(function () { host.innerHTML = ''; host.hidden = true; }, 260);
  };

  /* ---------------------------------------------------------------- effects */
  U.ripple = function (e) {
    var el = e.currentTarget;
    var r = el.getBoundingClientRect();
    var size = Math.max(r.width, r.height);
    var s = d.createElement('span');
    s.className = 'ripple';
    s.style.cssText = 'width:' + size + 'px;height:' + size + 'px;left:' +
      ((e.clientX || r.left + r.width / 2) - r.left - size / 2) + 'px;top:' +
      ((e.clientY || r.top + r.height / 2) - r.top - size / 2) + 'px';
    el.appendChild(s);
    setTimeout(function () { s.remove(); }, 640);
  };

  var revealObserver = null;
  U.reveal = function (root) {
    if (!('IntersectionObserver' in w)) {
      U.$$('.rv,.rv-scale,.rv-left', root).forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('is-in'); revealObserver.unobserve(en.target); }
        });
      }, { threshold: 0.06, rootMargin: '0px 0px -6% 0px' });
    }
    U.$$('.rv,.rv-scale,.rv-left', root).forEach(function (el, i) {
      if (!el.style.getPropertyValue('--i')) el.style.setProperty('--i', (i % 8));
      revealObserver.observe(el);
    });
  };

  /* Counters climb to their value once, when the screen settles. */
  U.counters = function (root) {
    U.$$('.countup', root).forEach(function (el) {
      var target = el.dataset.to || el.textContent;
      var digits = target.replace(/[^\d০-৯]/g, '');
      if (!digits) return;
      var bn = /[০-৯]/.test(digits);
      var toLatin = function (s) { return s.replace(/[০-৯]/g, function (c) { return '০১২৩৪৫৬৭৮৯'.indexOf(c); }); };
      var toBn = function (s) { return String(s).replace(/\d/g, function (c) { return '০১২৩৪৫৬৭৮৯'[+c]; }); };
      var n = parseInt(toLatin(digits), 10);
      if (!isFinite(n) || n === 0) return;
      var start = performance.now(), dur = 900;
      function step(t) {
        var p = Math.min(1, (t - start) / dur);
        var eased = 1 - Math.pow(1 - p, 3);
        var val = Math.round(n * eased);
        el.textContent = target.replace(digits, bn ? toBn(val) : String(val));
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
    U.$$('.bar > i', root).forEach(function (el) {
      var to = el.dataset.w; if (!to) return;
      setTimeout(function () { el.style.width = to + '%'; }, 120);
    });
    U.$$('[data-ring]', root).forEach(function (el) {
      var c = 2 * Math.PI * 30;
      setTimeout(function () { el.style.strokeDashoffset = (c * (1 - el.dataset.ring / 100)).toFixed(1); }, 160);
    });
  };

  /* Word-by-word headline entry. */
  U.wordfly = function (root) {
    U.$$('.wordfly', root).forEach(function (el) {
      if (el.dataset.done) return;
      el.dataset.done = '1';
      el.innerHTML = el.textContent.trim().split(/\s+/).map(function (word, i) {
        return '<span style="animation-delay:' + (i * 72) + 'ms">' + esc(word) + '</span>';
      }).join(' ');
    });
  };

  /* ---------------------------------------------------------------- wiring
     One delegated pass over a freshly rendered subtree. */
  U.wire = function (root) {
    root = root || d;
    U.$$('.btn,.iconbtn,.tab,.chip,.dbtn,.fab,.callbtn', root).forEach(function (el) {
      if (el.dataset.rip) return;
      el.dataset.rip = '1';
      el.addEventListener('pointerdown', U.ripple);
    });
    U.$$('[data-sw]', root).forEach(function (el) {
      if (el.dataset.b) return; el.dataset.b = '1';
      el.addEventListener('click', function () {
        el.classList.toggle('is-on');
        el.setAttribute('aria-checked', el.classList.contains('is-on'));
      });
    });
    U.$$('[data-check]', root).forEach(function (el) {
      if (el.dataset.b) return; el.dataset.b = '1';
      el.addEventListener('click', function () {
        if (el.classList.contains('radio')) {
          var sibs = el.parentElement.querySelectorAll('.check.radio');
          Array.prototype.forEach.call(sibs, function (s) { s.classList.remove('is-on'); });
        }
        el.classList.toggle('is-on');
      });
    });
    U.$$('[data-chips]', root).forEach(function (box) {
      if (box.dataset.b) return; box.dataset.b = '1';
      box.addEventListener('click', function (e) {
        var b = e.target.closest('.chip'); if (!b) return;
        if (box.dataset.multi === '1') { b.classList.toggle('is-on'); return; }
        U.$$('.chip', box).forEach(function (x) { x.classList.remove('is-on'); });
        b.classList.add('is-on');
      });
    });
    U.$$('.seg', root).forEach(function (box) {
      if (box.dataset.b) return; box.dataset.b = '1';
      var ink = U.$('.seg-ink', box);
      function place() {
        var on = U.$('button.is-on', box); if (!on || !ink) return;
        ink.style.width = on.offsetWidth + 'px';
        ink.style.transform = 'translateX(' + (on.offsetLeft - 3) + 'px)';
      }
      box.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b) return;
        U.$$('button', box).forEach(function (x) { x.classList.remove('is-on'); });
        b.classList.add('is-on'); place();
        var panels = box.parentElement.querySelectorAll('[data-panel]');
        if (panels.length) {
          Array.prototype.forEach.call(panels, function (p, i) { p.hidden = (i !== +b.dataset.i); });
          U.reveal(panels[+b.dataset.i]);
        }
      });
      requestAnimationFrame(place);
      setTimeout(place, 320);
    });
    U.$$('.ptabs', root).forEach(function (box) {
      if (box.dataset.b) return; box.dataset.b = '1';
      box.addEventListener('click', function (e) {
        var b = e.target.closest('.ptab'); if (!b) return;
        U.$$('.ptab', box).forEach(function (x) { x.classList.remove('is-on'); });
        b.classList.add('is-on');
        b.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
        var panels = box.parentElement.querySelectorAll('[data-panel]');
        var i = U.$$('.ptab', box).indexOf(b);
        if (panels.length) {
          Array.prototype.forEach.call(panels, function (p, k) { p.hidden = (k !== i); });
          U.reveal(panels[i]);
        }
      });
    });
    U.$$('[data-close]', root).forEach(function (el) {
      if (el.dataset.b) return; el.dataset.b = '1';
      el.addEventListener('click', function () { U.closeOverlay(); });
    });
    U.$$('.mcard__fav', root).forEach(function (el) {
      if (el.dataset.b) return; el.dataset.b = '1';
      el.addEventListener('click', function (e) {
        e.stopPropagation();
        el.classList.toggle('is-on');
        U.toast(el.classList.contains('is-on') ? 'শর্টলিস্টে যোগ হয়েছে' : 'শর্টলিস্ট থেকে সরানো হয়েছে', 'heart');
      });
    });
    U.$$('[data-accordion]', root).forEach(function (el) {
      if (el.dataset.b) return; el.dataset.b = '1';
      el.addEventListener('click', function () {
        var body = el.nextElementSibling;
        var open = el.classList.toggle('is-open');
        body.style.maxHeight = open ? body.scrollHeight + 'px' : '0px';
        var chev = U.$('svg', el); if (chev) chev.style.transform = open ? 'rotate(180deg)' : '';
      });
    });
  };

  w.UI = U;
})(window, document);
