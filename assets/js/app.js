/* ===========================================================================
   SheTu Mobile — shell, router, theme
   ---------------------------------------------------------------------------
   A single page. Each screen is a function on window.SCREENS that returns
   { appbar, body, tab, bg, scroller }. The router swaps two .screen layers
   and plays a stack transition between them: forward pushes in from the
   right, back reverses it, a tab switch cross-fades.
   =========================================================================== */
(function (w, d) {
  'use strict';

  var U = w.UI, $ = U.$, $$ = U.$$;
  var App = { stack: [], mode: 'matri', theme: 'auto', signedIn: true };

  /* ------------------------------------------------------------ theme */
  function readPref(k, def) { try { return localStorage.getItem('shetu.' + k) || def; } catch (e) { return def; } }
  function writePref(k, v) { try { localStorage.setItem('shetu.' + k, v); } catch (e) {} }

  App.setTheme = function (t) {
    App.theme = t;
    if (t === 'auto') d.documentElement.removeAttribute('data-theme');
    else d.documentElement.setAttribute('data-theme', t);
    writePref('theme', t);
  };
  App.toggleTheme = function () {
    var now = d.documentElement.getAttribute('data-theme');
    var dark = now ? now === 'dark'
      : w.matchMedia('(prefers-color-scheme: dark)').matches;
    App.setTheme(dark ? 'light' : 'dark');
    U.toast(dark ? 'দিনের থিম' : 'রাতের থিম', dark ? 'sun' : 'moon');
  };
  App.setMode = function (m) {
    App.mode = m;
    if (m === 'connect') d.documentElement.setAttribute('data-mode', 'connect');
    else d.documentElement.removeAttribute('data-mode');
    writePref('mode', m);
  };

  /* ------------------------------------------------------------ tab bar */
  var TABS = {
    matri: [
      { k: 'home', ic: 'home', label: 'হোম', go: 'dashboard' },
      { k: 'search', ic: 'search', label: 'খুঁজুন', go: 'search' },
      { k: 'requests', ic: 'heart', label: 'আগ্রহ', go: 'requests', badge: 2 },
      { k: 'mailbox', ic: 'chat', label: 'বার্তা', go: 'mailbox', badge: 2 },
      { k: 'me', ic: 'user', label: 'আমি', go: 'profile-hub' }
    ],
    connect: [
      { k: 'deck', ic: 'cards', label: 'ডেক', go: 'connect-deck' },
      { k: 'people', ic: 'users', label: 'মানুষ', go: 'connect-people' },
      { k: 'matches', ic: 'sparkle', label: 'ম্যাচ', go: 'connect-matches' },
      { k: 'messenger', ic: 'chat', label: 'চ্যাট', go: 'connect-messenger', badge: 3 },
      { k: 'cme', ic: 'user', label: 'আমি', go: 'connect-profile' }
    ],
    family: [
      { k: 'fhome', ic: 'house', label: 'পরিবার', go: 'family-dashboard' },
      { k: 'ffam', ic: 'users', label: 'পরিবারসমূহ', go: 'family-families' },
      { k: 'fintro', ic: 'hands', label: 'পরিচয়', go: 'family-introductions' },
      { k: 'fmeet', ic: 'video', label: 'সাক্ষাৎ', go: 'family-meetings' },
      { k: 'fq', ic: 'help', label: 'প্রশ্ন', go: 'family-questions' }
    ],
    admin: [
      { k: 'adash', ic: 'chart', label: 'ড্যাশ', go: 'admin-dashboard' },
      { k: 'amem', ic: 'users', label: 'সদস্য', go: 'admin-members' },
      { k: 'amod', ic: 'shield', label: 'মডারেশন', go: 'admin-moderation', badge: 3 },
      { k: 'apay', ic: 'wallet', label: 'পেমেন্ট', go: 'admin-payments' },
      { k: 'amore', ic: 'menu', label: 'আরও', go: 'admin-more' }
    ],
    guest: [
      { k: 'ghome', ic: 'home', label: 'হোম', go: 'landing' },
      { k: 'gsearch', ic: 'search', label: 'খুঁজুন', go: 'public-search' },
      { k: 'gstories', ic: 'heart', label: 'গল্প', go: 'stories' },
      { k: 'gtips', ic: 'book', label: 'পরামর্শ', go: 'tips' },
      { k: 'gin', ic: 'user', label: 'সাইন ইন', go: 'login' }
    ]
  };

  function tabbar(group, active) {
    var items = TABS[group] || TABS.matri;
    return '<nav class="tabbar" role="tablist">' + items.map(function (t) {
      return '<button class="tab' + (t.k === active ? ' is-on' : '') + '" data-go="' + t.go +
        '" data-tab="1" role="tab" aria-selected="' + (t.k === active) + '">' +
        w.ic(t.ic) + '<span>' + t.label + '</span>' +
        (t.badge ? '<i class="badge">' + t.badge + '</i>' : '') + '</button>';
    }).join('') + '</nav>';
  }
  App.tabbar = tabbar;

  /* ------------------------------------------------------------ status bar */
  function statusbar() {
    return '<div class="statusbar"><span>৯:৪১</span><span class="sb-right">' +
      '<span class="sb-bars"><i></i><i></i><i></i><i></i></span>' +
      '<span style="font-size:.62rem;letter-spacing:.06em">5G</span>' +
      '<span class="sb-batt"><span></span></span></span></div>';
  }

  /* ------------------------------------------------------------ backgrounds */
  function bgFor(kind) {
    if (!kind) return '';
    if (kind === 'aurora') return U.bgAurora();
    if (kind === 'bokeh') return U.bgBokeh();
    if (kind === 'hearts') return U.bgHearts();
    if (kind === 'ribbons') return U.bgRibbons();
    if (kind === 'aurora+hearts') return U.bgAurora() + U.bgHearts(8);
    if (kind === 'bokeh+ribbons') return U.bgRibbons() + U.bgBokeh(12);
    return '';
  }

  /* ------------------------------------------------------------ render */
  function buildScreen(name, params) {
    var fn = w.SCREENS[name];
    if (!fn) fn = w.SCREENS['not-found'];
    var s = fn(params || {}) || {};
    var el = d.createElement('section');
    el.className = 'screen';
    el.dataset.screen = name;
    if (s.mode) App.setMode(s.mode);

    var inner = '';
    inner += bgFor(s.bg);
    inner += statusbar();
    if (s.appbar !== false) inner += (s.appbar || '');
    inner += '<div class="scroller' + (s.tab ? '' : ' no-tabbar') + '"' +
      (s.scrollerCls ? ' data-x="' + s.scrollerCls + '"' : '') + '>' + (s.body || '') + '</div>';
    if (s.after) inner += s.after;
    if (s.tab) inner += tabbar(s.tabGroup || 'matri', s.tab);
    el.innerHTML = inner;
    if (s.cls) el.classList.add(s.cls);
    return el;
  }

  var busy = false;
  App.render = function (name, params, how) {
    var host = $('#screens');
    var old = $('.screen', host);
    var next = buildScreen(name, params);

    var inCls = 'enter-fwd', outCls = 'exit-fwd';
    if (how === 'back') { inCls = 'enter-back'; outCls = 'exit-back'; }
    else if (how === 'fade') { inCls = 'enter-fade'; outCls = 'exit-fade'; }
    else if (how === 'up') { inCls = 'enter-up'; outCls = 'exit-up'; }
    else if (how === 'none') { inCls = ''; outCls = ''; }

    if (how === 'back' && old) { host.insertBefore(next, old); }
    else { host.appendChild(next); }

    if (inCls) next.classList.add(inCls);
    if (old) {
      if (outCls) {
        old.classList.add(outCls);
        /* The router refuses a second navigation while a transition is in
           flight; without that, a double tap leaves two screens on screen. */
        busy = true;
        setTimeout(function () { old.remove(); busy = false; }, 380);
      } else {
        old.remove();
      }
    }
    if (inCls) setTimeout(function () { next.classList.remove(inCls); }, 400);

    U.wire(next);
    U.wordfly(next);
    U.reveal(next);
    U.counters(next);
    wireScroller(next);
    if (typeof w.SCREEN_HOOKS[name] === 'function') w.SCREEN_HOOKS[name](next, params || {});
    d.documentElement.scrollTop = 0;
  };

  /* the app bar picks up a hairline once the body has moved under it */
  function wireScroller(root) {
    var sc = $('.scroller', root), bar = $('.appbar', root);
    if (!sc) return;
    if (bar) {
      sc.addEventListener('scroll', function () {
        bar.classList.toggle('is-stuck', sc.scrollTop > 6);
      }, { passive: true });
    }
    /* parallax for anything that asks for it */
    var pl = $$('[data-parallax]', root);
    if (pl.length) {
      sc.addEventListener('scroll', function () {
        var y = sc.scrollTop;
        pl.forEach(function (el) {
          el.style.transform = 'translate3d(0,' + (y * (+el.dataset.parallax || .3)) + 'px,0)';
        });
      }, { passive: true });
    }
  }

  /* ------------------------------------------------------------ routing */
  App.go = function (route, how) {
    if (busy) return;
    var parts = String(route).split(':');
    var name = parts[0], param = parts.slice(1).join(':');
    var params = param ? { id: param } : {};
    if (how !== 'back') App.stack.push({ name: name, params: params });
    App.render(name, params, how || 'fwd');
    try { history.replaceState(null, '', '#' + route); } catch (e) {}
  };
  App.back = function () {
    if (App.stack.length > 1) {
      App.stack.pop();
      var prev = App.stack[App.stack.length - 1];
      App.render(prev.name, prev.params, 'back');
      try { history.replaceState(null, '', '#' + prev.name); } catch (e) {}
    } else {
      App.go('dashboard', 'back');
    }
  };
  App.tab = function (route) {
    var parts = String(route).split(':');
    App.stack = [{ name: parts[0], params: {} }];
    App.render(parts[0], {}, 'fade');
    try { history.replaceState(null, '', '#' + route); } catch (e) {}
  };

  /* ------------------------------------------------------------ delegated clicks */
  d.addEventListener('click', function (e) {
    var go = e.target.closest('[data-go]');
    if (go) {
      var route = go.dataset.go;
      if (go.dataset.tab) App.tab(route);
      else App.go(route);
      return;
    }
    if (e.target.closest('[data-back]')) { App.back(); return; }
    var act = e.target.closest('[data-act]');
    if (act) handleAct(act.dataset.act, act, e);
  });

  var ACTS = {
    'theme': function () { App.toggleTheme(); },
    'mode-matri': function () { App.setMode('matri'); App.tab('dashboard'); U.toast('সেতু ম্যাট্রিমনি', 'ring2'); },
    'mode-connect': function () { App.setMode('connect'); App.tab('connect-deck'); U.toast('সেতু কানেক্ট', 'sparkle'); },
    'signout': function () {
      U.dialog({
        title: 'সাইন আউট করবেন?', text: 'আবার সাইন ইন করলে সব তথ্য আগের মতোই থাকবে।',
        okLabel: 'সাইন আউট', icon: 'logout', act: 'signout-yes'
      });
    },
    'signout-yes': function () { App.setMode('matri'); App.stack = []; App.go('login', 'fade'); },
    'signin': function () { App.stack = []; App.go('dashboard', 'fade'); U.toast('স্বাগতম, নুসরাত', 'sparkle'); },
    'lang': function () {
      U.sheet({
        title: 'ভাষা নির্বাচন',
        body: '<div class="list">' + w.DATA.langs.map(function (l, i) {
          return U.lrow({ title: l.n, sub: l.c.toUpperCase(), act: 'lang-pick', end: i === 0 ? w.ic('check') : '', chev: false });
        }).join('') + '</div>'
      });
    },
    'lang-pick': function () { U.closeOverlay(); U.toast('ভাষা পরিবর্তিত হয়েছে', 'globe'); },
    'filter': function () { if (w.SHEETS.filter) w.SHEETS.filter(); },
    'share': function () { U.toast('লিংক কপি হয়েছে', 'link'); },
    'save': function () { U.toast('সংরক্ষিত হয়েছে', 'check'); },
    'soon': function () { U.toast('এটি একটি ডেমো স্ক্রিন', 'info'); },
    'confetti': function () { U.confetti(); },
    'help': function () { if (w.SHEETS.help) w.SHEETS.help(); },
    'notif-seen': function () { U.toast('সব পড়া হয়েছে চিহ্নিত', 'check'); },
    'interest': function (el) {
      el.classList.add('is-off');
      el.innerHTML = w.ic('check') + '<span>আগ্রহ পাঠানো হয়েছে</span>';
      U.confetti(); U.toast('আগ্রহ পাঠানো হয়েছে', 'heart');
    }
  };
  function handleAct(name, el, e) {
    if (w.ACTIONS && typeof w.ACTIONS[name] === 'function') return w.ACTIONS[name](el, e);
    if (ACTS[name]) return ACTS[name](el, e);
    U.toast('ডেমো — এই কাজটি নমুনা', 'info');
  }
  App.act = handleAct;
  /* The screen files fill these before app.js runs, so they are only
     created here if a build ever loads app.js on its own. */
  w.ACTIONS = w.ACTIONS || {};
  w.SHEETS = w.SHEETS || {};
  w.SCREEN_HOOKS = w.SCREEN_HOOKS || {};

  /* ------------------------------------------------------------ boot */
  function boot() {
    App.setTheme(readPref('theme', 'auto'));
    App.setMode(readPref('mode', 'matri'));

    var splash = $('#splash');
    setTimeout(function () { if (splash) splash.remove(); }, 2150);

    var hash = (location.hash || '').replace('#', '');
    var first = hash || 'landing';
    App.stack = [{ name: first.split(':')[0], params: {} }];
    App.render(first.split(':')[0], first.split(':')[1] ? { id: first.split(':')[1] } : {}, 'none');

    /* Escape closes whatever is on top; the hardware back gesture maps to
       the stack rather than to browser history. */
    d.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { U.closeOverlay(); }
      if (e.key === 'Backspace' && e.target === d.body) { e.preventDefault(); App.back(); }
    });
    w.addEventListener('hashchange', function () {
      var h = (location.hash || '').replace('#', '');
      if (h && (!App.stack.length || App.stack[App.stack.length - 1].name !== h.split(':')[0])) {
        App.go(h, 'fade');
      }
    });
  }

  w.App = App;
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', boot);
  else boot();
})(window, document);
