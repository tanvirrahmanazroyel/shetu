/* ===========================================================================
   SheTu Mobile — Connect, the second product
   Same shell, teal palette. The mode swap is what makes these screens read
   as a different product rather than a different page.
   =========================================================================== */
(function (w) {
  'use strict';
  var U = w.UI, D = w.DATA, S = w.SCREENS, ic = w.ic, esc = U.esc;

  /* ------------------------------------------------------------ deck */
  S['connect-deck'] = S.deck = function () {
    var cards = D.connect.slice(0, 4).map(function (m, i) {
      return '<article class="dcard" data-card style="transform:translateY(' + (i * -8) + 'px) scale(' +
        (1 - i * 0.035) + ');z-index:' + (10 - i) + ';opacity:' + (i > 2 ? 0 : 1) + '">' +
        U.photo({ h: m.h, mono: m.mono, alt: m.name }) +
        '<span class="dcard__stamp yes">হ্যাঁ</span><span class="dcard__stamp no">না</span>' +
        '<div class="dcard__meta"><h2>' + esc(m.name) + ', ' + U.bn(m.age) + '</h2>' +
        '<p>' + esc(m.job + ' · ' + m.city) + '</p>' +
        '<div class="chips" style="margin-top:8px">' + m.tags.map(function (t) {
          return '<span class="chip" style="background:rgba(255,255,255,.18);color:#fff;border-color:transparent">' + esc(t) + '</span>';
        }).join('') + '</div></div></article>';
    }).join('');

    return {
      mode: 'connect', tab: 'deck', tabGroup: 'connect', bg: 'aurora',
      appbar: U.appbar({
        left: '<button class="brandmark" data-act="mode-matri"><span>সে</span></button>',
        title: 'সেতু কানেক্ট', sub: 'আজ ৫ জন',
        right: U.iconbtn('sliders', { act: 'filter' }) + U.iconbtn('moon', { act: 'theme' })
      }),
      body: '<div class="deck"><div class="deck__stack" data-deck>' + cards + '</div></div>',
      after:
        '<div class="deck__acts" style="position:absolute;left:0;right:0;bottom:calc(var(--tabbar) + 10px + var(--safe-bottom));z-index:20">' +
          '<button class="dbtn no" data-act="swipe-no">' + ic('close') + '</button>' +
          '<button class="dbtn star" data-act="swipe-star">' + ic('star') + '</button>' +
          '<button class="dbtn yes big" data-act="swipe-yes">' + ic('heart') + '</button>' +
          '<button class="dbtn" data-act="soon">' + ic('refresh') + '</button>' +
        '</div>'
    };
  };

  /* ------------------------------------------------------------ people */
  S['connect-people'] = S.people = function () {
    return {
      mode: 'connect', tab: 'people', tabGroup: 'connect',
      appbar: U.appbar({ title: 'মানুষ', right: U.iconbtn('sliders', { act: 'filter' }) }),
      body: '<div class="pad" style="padding-top:2px">' + U.field({ icon: 'search', ph: 'নাম বা আগ্রহ' }) + '</div>' +
        '<div class="pad">' + U.chips(['কাছাকাছি', 'নতুন', 'সক্রিয়', 'একই আগ্রহ'], 0, true) + '</div>' +
        '<div class="pad"><div class="mgrid">' +
          D.connect.concat(D.connect).map(function (m, i) { return U.mcard(m, i); }).join('') +
        '</div><div style="height:14px"></div></div>'
    };
  };

  /* ------------------------------------------------------------ matches */
  S['connect-matches'] = S.matches = function () {
    return {
      mode: 'connect', tab: 'matches', tabGroup: 'connect', bg: 'hearts',
      appbar: U.appbar({ title: 'ম্যাচ', sub: '৪টি নতুন' }),
      body: '<div class="pad">' +
        U.sechead('নতুন ম্যাচ', null) +
        '<div class="rail" style="margin-left:0;margin-right:0;padding-left:0">' +
          D.connect.map(function (m, i) {
            return '<button class="rv" style="--i:' + i + ';text-align:center" data-go="connect-chat:' + m.id + '">' +
              '<span class="av-ring">' + U.photo({ h: m.h, mono: m.mono, cls: 'av xl' }) + '</span>' +
              '<div class="tiny" style="margin-top:6px;color:var(--ink)">' + esc(m.name) + '</div></button>';
          }).join('') + '</div>' +
        U.sechead('পারস্পরিক পছন্দ', null) +
        '<div class="mgrid">' + D.connect.slice(0, 4).map(function (m, i) { return U.mcard(m, i); }).join('') + '</div>' +
        U.sechead('আপনাকে পছন্দ করেছে', null) +
        '<div class="card tinted rv"><div class="card__body center">' +
          '<div class="av-stack" style="justify-content:center">' + D.connect.slice(0, 3).map(function (m) {
            return U.photo({ h: m.h, mono: m.mono, cls: 'av', blur: true });
          }).join('') + '</div>' +
          '<h3 style="margin-top:10px">৭ জন আপনাকে পছন্দ করেছেন</h3>' +
          '<p class="tiny muted" style="margin:6px 0 12px">কারা, তা দেখতে প্ল্যান লাগবে।</p>' +
          '<button class="btn" data-go="connect-plans">প্ল্যান দেখুন</button></div></div>' +
        '<div style="height:14px"></div></div>'
    };
  };

  /* ------------------------------------------------------------ messenger */
  S['connect-messenger'] = S.messenger = function () {
    return {
      mode: 'connect', tab: 'messenger', tabGroup: 'connect',
      appbar: U.appbar({ title: 'চ্যাট', right: U.iconbtn('search', { act: 'soon' }) }),
      body:
        '<div class="pad"><div class="rail" style="margin-left:0;margin-right:0;padding-left:0">' +
          D.connect.map(function (m, i) {
            return '<button style="text-align:center" data-go="connect-chat:' + m.id + '">' +
              '<span class="av-ring">' + U.photo({ h: m.h, mono: m.mono, cls: 'av lg' }) + '</span>' +
              '<div class="tiny" style="margin-top:5px">' + esc(m.name) + '</div></button>';
          }).join('') + '</div></div>' +
        '<div class="pad"><div class="list rv">' +
          D.connect.map(function (m, i) {
            return U.lrow({
              lead: U.avatar({ h: m.h, mono: m.mono, on: i % 2 === 0 }),
              title: esc(m.name), sub: i === 0 ? 'আপনি: কাল দেখা হবে?' : esc(m.bio),
              unread: i < 2,
              end: '<span class="tiny muted">' + (i === 0 ? '১২:০৪' : i === 1 ? 'গতকাল' : '৩ দিন') + '</span>',
              go: 'connect-chat:' + m.id, chev: false
            });
          }).join('') + '</div></div>'
    };
  };

  S['connect-chat'] = function (p) {
    var m = D.connect.filter(function (x) { return x.id === p.id; })[0] || D.connect[0];
    return {
      mode: 'connect', cls: 'is-chat',
      appbar: U.appbar({
        back: true, title: m.name, sub: 'অনলাইন',
        right: U.iconbtn('video', { act: 'call' }) + U.iconbtn('dots', { act: 'threadmenu' })
      }),
      body: '<div class="thread">' +
        '<div class="matchnote rv-scale">' + ic('sparkle') +
          '<b>আপনারা দুজনেই হ্যাঁ বলেছেন</b><span>' + esc(m.name) + ' এর সাথে কথা শুরু করুন</span></div>' +
        '<div class="bub them">হাই! প্রোফাইলে বইয়ের কথা দেখলাম — কী পড়ছেন এখন?<time>১১:৪০</time></div>' +
        '<div class="bub me">হাসান আজিজুল হকের আগুনপাখি। আপনি?<time>১১:৪৬</time></div>' +
        '<div class="bub them">দারুণ! আমি সদ্য শেষ করলাম দূরবীন।<time>১১:৫০</time></div>' +
        '<div class="bub me">কাল দেখা হবে?<time>১২:০৪</time></div>' +
        '<div class="bub them typing"><i></i><i></i><i></i></div></div>',
      after: '<div class="composer">' +
        '<button class="iconbtn" data-act="soon">' + ic('image') + '</button>' +
        '<input class="input" placeholder="বার্তা লিখুন…" data-msg>' +
        '<button class="iconbtn" data-act="soon">' + ic('emoji') + '</button>' +
        '<button class="send" data-act="send">' + ic('send') + '</button></div>'
    };
  };

  /* ------------------------------------------------------------ profile */
  S['connect-profile'] = function () {
    return {
      mode: 'connect', tab: 'cme', tabGroup: 'connect',
      appbar: U.appbar({ title: 'আমার কানেক্ট', right: U.iconbtn('settings', { go: 'connect-settings' }) }),
      body: '<div class="pad">' +
        '<div class="card rv"><div class="card__body center">' +
          '<span class="av-ring">' + U.photo({ h: 4, mono: 'নু', cls: 'av xl' }) + '</span>' +
          '<h3 style="margin-top:10px">' + esc(D.me.name) + '</h3>' +
          '<p class="tiny muted">' + esc(D.me.age + ' · ' + D.me.city) + '</p>' +
          '<div class="chips" style="justify-content:center;margin-top:10px">' +
            ['বই', 'চা', 'ভ্রমণ', 'সিনেমা'].map(function (t) { return '<span class="chip">' + t + '</span>'; }).join('') +
          '</div></div>' +
          '<div class="card__foot" style="display:flex;gap:8px">' +
            '<button class="btn xs ghost" style="flex:1" data-go="profile:c1">' + ic('eye') + ' প্রিভিউ</button>' +
            '<button class="btn xs" style="flex:1" data-act="editconnect">' + ic('edit') + ' সম্পাদনা</button></div>' +
        '</div>' +
        '<div class="stats rv" style="--i:1;margin-top:12px">' +
          U.stat('৪২', 'পছন্দ') + U.stat('৭', 'ম্যাচ') + U.stat('৩', 'চ্যাট') + '</div>' +
        U.sechead('আপনার কানেক্ট', null) +
        '<div class="list rv">' +
          U.lrow({ title: 'ছবি ও বায়ো', icon: 'image', act: 'editconnect' }) +
          U.lrow({ title: 'আগ্রহ ও ট্যাগ', icon: 'tag', act: 'editconnect' }) +
          U.lrow({ title: 'কাকে দেখাব', icon: 'sliders', act: 'filter' }) +
          U.lrow({ title: 'প্ল্যান', sub: 'কানেক্ট প্লাস', icon: 'crown', go: 'connect-plans' }) +
          U.lrow({ title: 'নোটিফিকেশন', icon: 'bell', go: 'connect-notifications' }) +
          U.lrow({ title: 'ম্যাট্রিমনিতে ফিরুন', icon: 'ring2', act: 'mode-matri' }) +
        '</div><div style="height:14px"></div></div>'
    };
  };

  S['connect-notifications'] = function () {
    return {
      mode: 'connect',
      appbar: U.appbar({ back: true, title: 'নোটিফিকেশন' }),
      body: '<div class="pad"><div class="list rv">' +
        [['sparkle', 'Anika এর সাথে আপনার ম্যাচ হয়েছে', 'এইমাত্র', true],
         ['heart', '৩ জন আপনাকে পছন্দ করেছেন', '২ ঘণ্টা আগে', true],
         ['chat', 'Rifat একটি বার্তা পাঠিয়েছেন', 'গতকাল', false],
         ['eye', 'আপনার প্রোফাইল ১৮ বার দেখা হয়েছে', '২ দিন আগে', false]]
          .map(function (n) {
            return U.lrow({ title: esc(n[1]), sub: esc(n[2]), icon: n[0], unread: n[3], act: 'soon' });
          }).join('') + '</div></div>'
    };
  };

  S['connect-plans'] = function () {
    return {
      mode: 'connect', bg: 'ribbons',
      appbar: U.appbar({ back: true, title: 'কানেক্ট প্ল্যান' }),
      body: '<div class="pad">' +
        '<p class="lede rv">কে আপনাকে পছন্দ করেছে দেখুন, আর প্রতিদিন বেশি মানুষ দেখুন।</p>' +
        [{ n: 'কানেক্ট ফ্রি', p: '০', per: 'ফ্রি', best: false, y: ['দিনে ১০ জন', 'ম্যাচ হলে চ্যাট'], no: ['কে পছন্দ করেছে', 'সুপার লাইক'] },
         { n: 'কানেক্ট প্লাস', p: '৫৯০', per: '/ মাস', best: true, y: ['সীমাহীন', 'কে পছন্দ করেছে', 'দিনে ৫ সুপার লাইক', 'ফিরে যাওয়া'], no: [] }]
          .map(function (pl, i) {
            return '<div class="plan rv' + (pl.best ? ' best' : '') + '" style="--i:' + i + ';margin-bottom:14px">' +
              '<b style="color:var(--ink);font-size:1.02rem">' + esc(pl.n) + '</b>' +
              '<div class="plan__price" style="margin-top:8px">৳' + esc(pl.p) + ' <small>' + esc(pl.per) + '</small></div>' +
              '<ul>' + pl.y.map(function (t) { return '<li>' + ic('check') + esc(t) + '</li>'; }).join('') +
                pl.no.map(function (t) { return '<li class="off">' + ic('close') + esc(t) + '</li>'; }).join('') + '</ul>' +
              '<button class="btn block" style="margin-top:12px" data-go="checkout">' +
                (i === 0 ? 'বর্তমান প্ল্যান' : 'নিন') + '</button></div>';
          }).join('') + '</div>'
    };
  };

  S['connect-settings'] = function () {
    return {
      mode: 'connect',
      appbar: U.appbar({ back: true, title: 'কানেক্ট সেটিংস' }),
      body: '<div class="pad">' +
        U.sechead('কাকে দেখাব', null) +
        '<div class="card"><div class="card__body">' +
          '<span class="label">বয়স</span><div class="row2">' +
            U.field({ type: 'select', opts: ['২২', '২৪', '২৬'] }) + U.field({ type: 'select', opts: ['৩০', '৩২', '৩৫'] }) + '</div>' +
          U.field({ label: 'দূরত্ব', type: 'select', opts: ['১০ কিমি', '২৫ কিমি', '৫০ কিমি', 'যেকোনো'] }) +
          U.sw(true, 'শুধু যাচাইকৃত') +
        '</div></div>' +
        U.sechead('গোপনীয়তা', null) +
        '<div class="card"><div class="card__body">' +
          U.sw(true, 'অনলাইন অবস্থা লুকান') + '<hr class="rule">' +
          U.sw(false, 'পড়েছি চিহ্ন') + '<hr class="rule">' +
          U.sw(true, 'শুধু ম্যাচ হলে বার্তা') +
        '</div></div>' +
        '<button class="btn quiet block" style="margin-top:16px" data-act="mode-matri">' + ic('ring2') + ' ম্যাট্রিমনিতে ফিরুন</button>' +
        '<button class="btn danger block" style="margin-top:10px" data-act="soon">কানেক্ট প্রোফাইল বন্ধ করুন</button>' +
        '<div style="height:14px"></div></div>'
    };
  };

  /* ------------------------------------------------------------ the deck's swipe
     Pointer drag moves the top card, rotates it a little, and fades in the
     stamp on whichever side you are heading. Past the threshold it flies off
     and the stack behind steps forward. */
  w.SCREEN_HOOKS['connect-deck'] = function (root) {
    var stack = U.$('[data-deck]', root);
    if (!stack) return;

    function top() { return stack.querySelector('[data-card]'); }
    function restack() {
      U.$$('[data-card]', stack).forEach(function (c, i) {
        c.style.transition = 'transform .42s var(--e-out), opacity .42s ease';
        c.style.transform = 'translateY(' + (i * -8) + 'px) scale(' + (1 - i * 0.035) + ')';
        c.style.zIndex = 10 - i;
        c.style.opacity = i > 2 ? 0 : 1;
      });
    }
    function fly(dir) {
      var c = top(); if (!c) return;
      c.style.transition = 'transform .45s var(--e-in), opacity .45s ease';
      c.style.transform = 'translateX(' + (dir * 140) + '%) rotate(' + (dir * 22) + 'deg)';
      c.style.opacity = '0';
      setTimeout(function () {
        c.remove();
        restack();
        if (!top()) {
          stack.innerHTML = '<div class="empty" style="padding-top:60px"><div class="ic">' + ic('refresh') +
            '</div><h3>আজকের সবাই শেষ</h3><p>কাল আবার নতুন মুখ আসবে।</p>' +
            '<button class="btn" style="margin-top:14px" data-go="connect-people">সবাইকে দেখুন</button></div>';
          U.wire(stack);
        }
      }, 420);
      if (dir > 0) { U.confetti(); U.toast('পছন্দ পাঠানো হয়েছে', 'heart'); }
    }

    w.ACTIONS['swipe-yes'] = function () { fly(1); };
    w.ACTIONS['swipe-no'] = function () { fly(-1); };
    w.ACTIONS['swipe-star'] = function () { U.confetti(); U.toast('সুপার লাইক পাঠানো হয়েছে', 'star'); fly(1); };

    var sx = 0, sy = 0, dragging = false, card = null;
    stack.addEventListener('pointerdown', function (e) {
      card = top(); if (!card) return;
      dragging = true; sx = e.clientX; sy = e.clientY;
      card.style.transition = 'none';
      card.setPointerCapture && card.setPointerCapture(e.pointerId);
    });
    stack.addEventListener('pointermove', function (e) {
      if (!dragging || !card) return;
      var dx = e.clientX - sx, dy = e.clientY - sy;
      card.style.transform = 'translate(' + dx + 'px,' + dy + 'px) rotate(' + (dx / 18) + 'deg)';
      var yes = card.querySelector('.yes'), no = card.querySelector('.no');
      if (yes) yes.style.opacity = Math.max(0, Math.min(1, dx / 90));
      if (no) no.style.opacity = Math.max(0, Math.min(1, -dx / 90));
    });
    function end(e) {
      if (!dragging || !card) return;
      dragging = false;
      var dx = (e.clientX || sx) - sx;
      var yes = card.querySelector('.yes'), no = card.querySelector('.no');
      if (yes) yes.style.opacity = 0;
      if (no) no.style.opacity = 0;
      if (Math.abs(dx) > 84) { fly(dx > 0 ? 1 : -1); }
      else { card.style.transition = 'transform .38s var(--e-spring)'; card.style.transform = ''; restack(); }
      card = null;
    }
    stack.addEventListener('pointerup', end);
    stack.addEventListener('pointercancel', end);
  };

  w.ACTIONS.editconnect = function () {
    U.sheet({
      title: 'কানেক্ট প্রোফাইল',
      body: U.field({ label: 'বায়ো', type: 'textarea', ph: 'দুই লাইনে নিজের কথা', val: 'চা, পুরোনো বই আর দীর্ঘ হাঁটা।' }) +
        '<span class="label">আগ্রহ</span>' +
        '<div class="chips" data-chips data-multi="1" style="margin-bottom:14px">' +
          ['বই', 'চা', 'ভ্রমণ', 'সিনেমা', 'রান্না', 'দৌড়', 'ছবি', 'গান'].map(function (t, i) {
            return '<button class="chip' + (i < 4 ? ' is-on' : '') + '">' + t + '</button>';
          }).join('') + '</div>' +
        '<button class="btn block" data-close data-act="save">সংরক্ষণ</button>'
    });
  };
})(window);
