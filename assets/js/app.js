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

  /* ------------------------------------------------------------ the navigator
     One button that never leaves: wherever you are, it opens the index of
     every screen in the build and takes you there. It sits in the device
     rather than in a screen, so no screen has to remember to draw it. */
  var NAV_GROUPS = [
    ['সর্বসাধারণ', 'globe', [
      ['landing', 'ল্যান্ডিং'], ['matrimony', 'ম্যাট্রিমনি'], ['porichoy', 'পরিচয় দরজা'],
      ['porichoy-join', 'পরিচয়ে যোগ'], ['public-search', 'সার্চ'], ['profile:m1', 'প্রোফাইল'],
      ['plans', 'প্ল্যান'], ['stories', 'গল্প'], ['story:s1', 'একটি গল্প'], ['tips', 'পরামর্শ'],
      ['tip:t1', 'একটি পরামর্শ'], ['faq', 'প্রশ্নোত্তর'], ['about', 'সম্পর্কে'], ['safety', 'নিরাপত্তা'],
      ['legal', 'আইনি'], ['classifieds', 'বিজ্ঞাপন'], ['classified-show:cl1', 'বিজ্ঞাপন বিবরণ'],
      ['classified-create', 'নতুন বিজ্ঞাপন'], ['biodata-public', 'বায়োডাটা মেকার'],
      ['problem', 'সমস্যা জানান'], ['sitemap', 'সাইটম্যাপ'],
      ['e404', '৪০৪'], ['e403', '৪০৩'], ['e419', '৪১৯'], ['e500', '৫০০']]],
    ['সাইন ইন', 'key', [
      ['login', 'লগইন'], ['login-code', 'কোডে লগইন'], ['otp', 'ওটিপি'], ['register-1', 'নিবন্ধন ১'],
      ['register-2', 'নিবন্ধন ২'], ['verify-email', 'ইমেইল যাচাই'], ['password-request', 'পাসওয়ার্ড ভুলে গেছি'],
      ['password-reset', 'পাসওয়ার্ড বদল'], ['staff-login', 'স্টাফ লগইন'],
      ['candidate-confirm', 'প্রার্থীর সম্মতি'], ['candidate-confirmed', 'সম্মতি দেওয়া'],
      ['candidate-rejected', 'সম্মতি নয়']]],
    ['সদস্য', 'user', [
      ['dashboard', 'ড্যাশবোর্ড'], ['search', 'সার্চ'], ['shortlist', 'শর্টলিস্ট'],
      ['profile-hub', 'প্রোফাইল হাব'], ['profile-edit', 'সম্পাদনা'], ['profile-preview', 'প্রিভিউ'],
      ['photos', 'ছবি'], ['preferences', 'সঙ্গীর পছন্দ'], ['biodata', 'বায়োডাটা'],
      ['biodata-poster', 'পোস্টার'], ['mailbox', 'বার্তা'], ['thread:th1', 'কথোপকথন'],
      ['requests', 'অনুরোধ'], ['notifications', 'নোটিফিকেশন'], ['verification', 'যাচাই'],
      ['verification-document', 'নথি'], ['verification-selfie', 'সেলফি'], ['privacy', 'গোপনীয়তা'],
      ['settings', 'সেটিংস'], ['referral', 'রেফারেল'], ['checkout', 'চেকআউট'],
      ['pay-manual', 'ম্যানুয়াল পেমেন্ট'], ['invoices', 'ইনভয়েস'], ['member-family', 'পরিবার'],
      ['family-members', 'সদস্যের অনুমতি'], ['family-room', 'পারিবারিক কক্ষ'], ['family-log', 'কার্যবিবরণী']]],
    ['পরিচয়', 'sparkle', [
      ['connect-deck', 'ডেক'], ['connect-people', 'মানুষ'], ['connect-matches', 'ম্যাচ'],
      ['connect-messenger', 'চ্যাট'], ['connect-chat:c1', 'কথোপকথন'], ['connect-profile', 'প্রোফাইল'],
      ['connect-notifications', 'নোটিফিকেশন'], ['connect-plans', 'প্ল্যান'], ['connect-settings', 'সেটিংস']]],
    ['পরিবার', 'house', [
      ['family-dashboard', 'ড্যাশবোর্ড'], ['family-families', 'পরিবারসমূহ'], ['family-profile', 'পরিবারের প্রোফাইল'],
      ['family-connection', 'পরিচয় পর্ব'], ['family-introductions', 'পরিচয়সমূহ'], ['family-introduction', 'অনুরোধ'],
      ['family-meetings', 'সাক্ষাৎ'], ['family-meet', 'সাক্ষাৎ কক্ষ'], ['family-questions', 'প্রশ্ন'],
      ['family-guide', 'নির্দেশিকা'], ['family-join', 'যোগ দিন'], ['family-accepted', 'যোগ দেওয়া হয়েছে']]],
    ['প্রশাসন', 'chart', [
      ['admin-dashboard', 'ড্যাশবোর্ড'], ['admin-members', 'সদস্য'], ['admin-member', 'সদস্য বিবরণ'],
      ['admin-member-photos', 'ছবি মডারেশন'], ['admin-moderation', 'মডারেশন'], ['admin-words', 'নিষিদ্ধ শব্দ'],
      ['admin-verifications', 'যাচাই সারি'], ['admin-verification', 'যাচাই কেস'], ['admin-payments', 'পেমেন্ট'],
      ['admin-pricing', 'মূল্য'], ['admin-pricing-edit', 'মূল্য সম্পাদনা'], ['admin-offers', 'অফার'],
      ['admin-coupons', 'কুপন'], ['admin-coupon-edit', 'কুপন সম্পাদনা'], ['admin-fees', 'সাফল্য ফি'],
      ['admin-rewards', 'পুরস্কার'], ['admin-mail', 'মেইল'], ['admin-mail-compose', 'মেইল লিখুন'],
      ['admin-mail-show', 'মেইল দেখুন'], ['admin-stories', 'গল্প'], ['admin-story-edit', 'গল্প সম্পাদনা'],
      ['admin-tips', 'পরামর্শ'], ['admin-hero', 'হিরো স্লাইড'], ['admin-appearance', 'চেহারা'],
      ['admin-content', 'পাতার লেখা'], ['admin-porichoy', 'পরিচয়ের উদাহরণ'], ['admin-seo', 'এসইও'],
      ['admin-problems', 'সমস্যা'], ['admin-closures', 'বন্ধের অনুরোধ'], ['admin-export', 'রপ্তানি'],
      ['admin-messenger', 'মেসেঞ্জার তদারকি'], ['admin-help', 'সহায়তা বট'], ['admin-more', 'আরও']]],
    ['অপারেটর', 'tools', [
      ['op-cases', 'কেসসমূহ'], ['op-case', 'একটি কেস'], ['op-candidate', 'প্রার্থী'], ['op-search', 'কেস সার্চ']]]
  ];

  function navSheet() {
    var here = App.stack.length ? App.stack[App.stack.length - 1].name : '';
    var body =
      '<div class="navfind">' +
        '<span class="field-icon">' + w.ic('search') +
        '<input class="input" placeholder="স্ক্রিন খুঁজুন…" data-navfind autocomplete="off"></span>' +
      '</div>' +
      '<div class="navquick">' +
        [['landing', 'home', 'ল্যান্ডিং'], ['dashboard', 'grid', 'সদস্য'],
         ['porichoy', 'sparkle', 'পরিচয়'], ['family-dashboard', 'house', 'পরিবার'],
         ['admin-dashboard', 'chart', 'প্রশাসন'], ['login', 'key', 'সাইন ইন']]
          .map(function (q) {
            return '<button class="navquick__i" data-go="' + q[0] + '" data-close>' +
              w.ic(q[1]) + '<span>' + q[2] + '</span></button>';
          }).join('') +
      '</div>' +
      NAV_GROUPS.map(function (g) {
        return '<div class="navgroup" data-navgroup>' +
          '<div class="navgroup__h">' + w.ic(g[1]) + '<span>' + g[0] + '</span>' +
          '<i class="tiny muted">' + U.bn(g[2].length) + '</i></div>' +
          '<div class="chips">' + g[2].map(function (r) {
            return '<button class="chip' + (r[0].split(':')[0] === here ? ' is-on' : '') +
              '" data-go="' + r[0] + '" data-close data-navitem>' + U.esc(r[1]) + '</button>';
          }).join('') + '</div></div>';
      }).join('');

    U.sheet({ title: 'সব স্ক্রিন', body: body, cls: 'navsheet' });

    var host = U.$('#overlay');
    var find = U.$('[data-navfind]', host);
    if (find) {
      find.addEventListener('input', function () {
        var q = find.value.trim().toLowerCase();
        $$('[data-navgroup]', host).forEach(function (g) {
          var shown = 0;
          $$('[data-navitem]', g).forEach(function (b) {
            var hit = !q || b.textContent.toLowerCase().indexOf(q) > -1 ||
              (b.dataset.go || '').toLowerCase().indexOf(q) > -1;
            b.hidden = !hit;
            if (hit) shown++;
          });
          g.hidden = shown === 0;
        });
      });
      setTimeout(function () { find.focus(); }, 420);
    }
  }
  App.navSheet = navSheet;

  /* ------------------------------------------------------------ backgrounds */
  function bgFor(kind) {
    if (!kind) return '';
    if (kind === 'aurora') return U.bgAurora();
    if (kind === 'bokeh') return U.bgBokeh();
    if (kind === 'hearts') return U.bgHearts();
    if (kind === 'ribbons') return U.bgRibbons();
    if (kind === 'love') return U.bgLove();
    if (kind === 'aurora+hearts') return U.bgAurora() + U.bgHearts(8);
    if (kind === 'aurora+love') return U.bgAurora() + U.bgLove(10);
    if (kind === 'bokeh+love') return U.bgBokeh(12) + U.bgLove(11);
    if (kind === 'hearts+love') return U.bgHearts(8) + U.bgLove(12);
    if (kind === 'ribbons+love') return U.bgRibbons() + U.bgLove(10);
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
    var launcher = $('#navbtn');
    if (launcher) {
      launcher.classList.toggle('is-low', !$('.tabbar', next));
      launcher.classList.toggle('on-chat', next.classList.contains('is-chat'));
      launcher.classList.toggle('on-meet', next.classList.contains('is-meet'));
      launcher.classList.remove('is-away');
    }
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
    /* The launcher gets out of the way on the way down and comes back on
       the way up, the way a native toolbar does. */
    var btn = $('#navbtn');
    if (btn) {
      var last = 0;
      sc.addEventListener('scroll', function () {
        var y = sc.scrollTop;
        if (Math.abs(y - last) > 8) {
          btn.classList.toggle('is-away', y > last && y > 60);
          last = y;
        }
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
    'mode-connect': function () { App.setMode('connect'); App.tab('connect-deck'); U.toast('পরিচয়', 'sparkle'); },
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
    'nav': function () { navSheet(); },
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
      if (e.key === '/' && e.target === d.body) { e.preventDefault(); navSheet(); }
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
