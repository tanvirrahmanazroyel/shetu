/* ===========================================================================
   SheTu Mobile — public screens (no account needed)
   =========================================================================== */
(function (w) {
  'use strict';
  var U = w.UI, D = w.DATA, S = (w.SCREENS = w.SCREENS || {});
  var ic = w.ic, esc = U.esc;

  /* ------------------------------------------------------------ landing */
  S.landing = function () {
    var body =
      '<section class="hero">' +
        '<div class="hero__art" data-parallax=".24">' + U.globe() + '</div>' +
        '<div class="pad hero__copy">' +
          '<p class="eyebrow rv">সেতু · SheTu</p>' +
          '<h1 class="wordfly">দুই পরিবারের মাঝে একটি সেতু</h1>' +
          '<p class="lede rv" style="--i:2;margin-top:12px">যাচাই করা প্রোফাইল, পরিবারকে সঙ্গে নিয়ে পরিচয়, আর গোপনীয়তা সম্পূর্ণ আপনার নিয়ন্ত্রণে।</p>' +
          '<div class="btn-row rv" style="--i:3;margin-top:20px">' +
            '<button class="btn" data-go="register-1">শুরু করুন</button>' +
            '<button class="btn ghost" data-go="login">সাইন ইন</button>' +
          '</div>' +
        '</div>' +
      '</section>' +

      '<div class="ticker rv"><div class="ticker__run">' +
        [1, 2].map(function () {
          return D.offers.filter(function (o) { return o.on; }).map(function (o) {
            return '<span>' + ic('gift') + esc(o.t + ' · ' + o.code) + '</span>';
          }).join('') + '<span>' + ic('shield') + 'সব প্রোফাইল হাতে যাচাই করা</span>';
        }).join('') +
      '</div></div>' +

      '<div class="pad">' +
        '<div class="stats rv" style="margin-top:20px">' +
          U.stat('১২,৪৮০', 'সদস্য') + U.stat('১,২১৪', 'সফল বিয়ে') + U.stat('৪৬', 'জেলা') +
        '</div>' +

        '<div class="doors rv" style="--i:1">' +
          '<button class="door matri" data-go="matrimony">' +
            '<span class="door__bg"></span>' +
            '<span class="door__ic">' + ic('ring2') + '</span>' +
            '<b>সেতু ম্যাট্রিমনি</b><span>পরিবারসহ, বিয়ের জন্য</span>' +
            '<i>' + ic('chev') + '</i></button>' +
          '<button class="door connect" data-go="dating">' +
            '<span class="door__bg"></span>' +
            '<span class="door__ic">' + ic('sparkle') + '</span>' +
            '<b>সেতু কানেক্ট</b><span>নিজে থেকে পরিচয়</span>' +
            '<i>' + ic('chev') + '</i></button>' +
        '</div>' +

        U.sechead('কেন সেতু', null) +
        '<div class="feats">' +
          [['shield', 'হাতে যাচাই', 'এনআইডি ও সেলফি — প্রতিটি অপারেটর নিজে মিলিয়ে দেখেন।'],
           ['lock', 'আপনার গোপনীয়তা', 'ছবি, নম্বর, বিবরণ — কে দেখবে আপনি ঠিক করবেন।'],
           ['users', 'পরিবার সঙ্গে', 'অভিভাবক অ্যাকাউন্ট দিয়ে পরিবারও অংশ নিতে পারে।'],
           ['ban', 'কোনো দালালি নয়', 'কোনো মধ্যস্বত্বভোগী নেই, কোনো লুকানো ফি নেই।']]
          .map(function (f, i) {
            return '<div class="feat rv" style="--i:' + i + '"><span class="feat__ic">' + ic(f[0]) + '</span>' +
              '<b>' + f[1] + '</b><p>' + f[2] + '</p></div>';
          }).join('') +
        '</div>' +

        U.sechead('সাম্প্রতিক সদস্য', 'সব দেখুন', 'public-search') +
      '</div>' +
      '<div class="rail">' + D.members.slice(0, 6).map(function (m, i) { return U.mcard(m, i); }).join('') + '</div>' +

      '<div class="pad">' + U.sechead('সফল গল্প', 'সব গল্প', 'stories') + '</div>' +
      '<div class="rail">' + D.stories.map(function (s) {
        return '<article class="story rv">' + U.photo({ h: s.h, mono: '❤', alt: s.couple, tag: s.year }) +
          '<div class="story__body"><span class="qmark">”</span><q>' + esc(s.quote) + '</q>' +
          '<cite>' + esc(s.couple + ' · ' + s.city) + '</cite></div></article>';
      }).join('') + '</div>' +

      '<div class="pad">' +
        U.sechead('সদস্যরা যেখানে', null) +
        '<div class="rv">' + U.worldmap() + '</div>' +
        U.sechead('পরামর্শ', 'সব পরামর্শ', 'tips') +
        '<div class="list rv">' + D.tips.slice(0, 3).map(function (t) {
          return U.lrow({ title: esc(t.title), sub: t.cat + ' · ' + t.read, icon: 'book', go: 'tip:' + t.id });
        }).join('') + '</div>' +

        '<div class="card tinted rv" style="margin-top:22px">' +
          '<div class="card__body center">' +
            '<h3>আজই শুরু করুন</h3>' +
            '<p class="muted tiny" style="margin:6px 0 14px">প্রোফাইল তৈরি বিনামূল্যে। পছন্দ হলে তবেই প্ল্যান।</p>' +
            '<button class="btn block" data-go="register-1">অ্যাকাউন্ট খুলুন</button>' +
          '</div></div>' +

        '<div class="footlinks rv">' +
          [['about', 'আমাদের সম্পর্কে'], ['faq', 'সচরাচর প্রশ্ন'], ['safety', 'নিরাপত্তা'],
           ['legal', 'শর্তাবলি ও গোপনীয়তা'], ['classifieds', 'বিজ্ঞাপন'], ['plans', 'প্ল্যান'],
           ['problem', 'সমস্যা জানান'], ['sitemap', 'সাইটম্যাপ']]
            .map(function (l) { return '<button data-go="' + l[0] + '">' + l[1] + '</button>'; }).join('') +
        '</div>' +
        '<p class="center tiny muted" style="padding:14px 0 6px">© ২০২৬ সেতু · এটি একটি ডেমো ইউআই</p>' +
      '</div>';

    return {
      bg: 'bokeh', tab: 'ghome', tabGroup: 'guest', cls: 'is-landing',
      appbar: U.appbar({
        left: '<button class="brandmark" data-go="landing"><span>সে</span></button>',
        title: '', sub: '',
        right: U.iconbtn('globe', { act: 'lang', label: 'ভাষা' }) +
               U.iconbtn('moon', { act: 'theme', label: 'থিম' }),
        transparent: true
      }),
      body: body
    };
  };

  /* ------------------------------------------------------------ the two doors */
  function doorScreen(o) {
    return {
      mode: o.mode, bg: o.bg, tab: 'ghome', tabGroup: 'guest',
      appbar: U.appbar({ back: true, title: o.title, right: U.iconbtn('moon', { act: 'theme' }) }),
      body:
        '<div class="pad">' +
          '<p class="eyebrow rv">' + esc(o.eyebrow) + '</p>' +
          '<h1 class="wordfly" style="font-size:2rem">' + esc(o.head) + '</h1>' +
          '<p class="lede rv" style="--i:2;margin-top:10px">' + esc(o.lede) + '</p>' +
          '<div class="btn-row rv" style="--i:3;margin:18px 0 6px">' +
            '<button class="btn" data-go="' + o.cta + '">' + esc(o.ctaLabel) + '</button>' +
            '<button class="btn ghost" data-go="plans">প্ল্যান দেখুন</button></div>' +
          '<div class="steps rv" style="margin-top:22px">' +
            o.steps.map(function (s, i) {
              return '<div class="step ' + (i === 0 ? 'now' : '') + '"><b>' + esc(s[0]) + '</b><span>' + esc(s[1]) + '</span></div>';
            }).join('') +
          '</div>' +
          U.sechead(o.listTitle, 'সব দেখুন', o.listGo) +
        '</div>' +
        '<div class="rail">' + o.cards + '</div>' +
        '<div class="pad">' + U.notice(o.note, 'ok', 'shield') + '</div>'
    };
  }

  S.matrimony = function () {
    return doorScreen({
      mode: 'matri', bg: 'hearts', title: 'সেতু ম্যাট্রিমনি',
      eyebrow: 'বিয়ের জন্য', head: 'পরিবার জানে, পরিবার পাশে',
      lede: 'বায়োডাটা, ভেরিফিকেশন আর পারিবারিক পরিচয় পর্ব — সবই এক জায়গায়।',
      cta: 'register-1', ctaLabel: 'বায়োডাটা তৈরি করুন',
      steps: [['প্রোফাইল তৈরি', 'বায়োডাটার ঘরগুলো পূরণ করুন'],
              ['যাচাই করান', 'এনআইডি ও সেলফি দিন'],
              ['পছন্দ করুন', 'আগ্রহ পাঠান, পরিবারকে জানান'],
              ['পরিচয় পর্ব', 'দুই পরিবার ভিডিওতে বসুন']],
      listTitle: 'নতুন বায়োডাটা', listGo: 'public-search',
      cards: D.members.slice(0, 6).map(function (m, i) { return U.mcard(m, i); }).join(''),
      note: 'কোনো প্রোফাইল যাচাই ছাড়া যোগাযোগের অনুমতি পায় না।'
    });
  };

  S.dating = function () {
    return doorScreen({
      mode: 'connect', bg: 'aurora', title: 'সেতু কানেক্ট',
      eyebrow: 'নিজে থেকে', head: 'ধীরে, সম্মানে, নিজের শর্তে',
      lede: 'নিজের মতো করে পরিচয় — তবু সেই একই যাচাই আর একই গোপনীয়তা।',
      cta: 'register-1', ctaLabel: 'কানেক্টে যোগ দিন',
      steps: [['প্রোফাইল', 'কয়েকটি লাইন, কয়েকটি আগ্রহ'],
              ['ডেক', 'একজন করে দেখুন, সিদ্ধান্ত আপনার'],
              ['ম্যাচ', 'দুজনেই হ্যাঁ বললে তবেই চ্যাট'],
              ['দেখা', 'প্রস্তুত হলে ভিডিওতে কথা']],
      listTitle: 'কানেক্টে নতুন', listGo: 'connect-people',
      cards: D.connect.map(function (m, i) { return U.mcard(m, i); }).join(''),
      note: 'ম্যাচ না হলে কেউ কারও সাথে বার্তা পাঠাতে পারে না।'
    });
  };

  /* ------------------------------------------------------------ public search */
  S['public-search'] = function () {
    return {
      bg: null, tab: 'gsearch', tabGroup: 'guest',
      appbar: U.appbar({
        back: true, title: 'প্রোফাইল খুঁজুন', sub: '১২,৪৮০ জন সদস্য',
        right: U.iconbtn('filter', { act: 'filter', label: 'ফিল্টার' })
      }),
      body:
        '<div class="pad" style="padding-top:4px">' +
          U.field({ icon: 'search', ph: 'নাম, পেশা বা শহর' }) +
          U.chips(['সব', 'ভেরিফায়েড', 'ঢাকা', 'ডাক্তার', 'প্রবাসী', 'নতুন'], 0, true) +
          '<div class="sechead"><h2>ফলাফল</h2><span class="muted tiny">১২ জন</span></div>' +
          '<div class="mgrid">' + D.members.map(function (m, i) { return U.mcard(m, i); }).join('') + '</div>' +
          '<div class="center" style="padding:18px 0">' +
            '<button class="btn soft" data-go="login">আরও দেখতে সাইন ইন করুন</button></div>' +
        '</div>'
    };
  };

  /* ------------------------------------------------------------ public profile */
  S.profile = S['public-profile'] = function (p) {
    var m = D.members.filter(function (x) { return x.id === p.id; })[0] ||
            D.connect.filter(function (x) { return x.id === p.id; })[0] || D.members[0];
    return {
      appbar: U.appbar({
        back: true, title: m.name, sub: U.bn(m.age) + ' · ' + m.city,
        right: U.iconbtn('share', { act: 'share' }) + U.iconbtn('dots', { act: 'soon' })
      }),
      body:
        '<div class="profhead">' +
          '<div class="profhead__media">' +
            U.photo({ h: m.h, mono: m.mono, alt: m.name, cls: 'profhead__img' }) +
            '<div class="profhead__over">' +
              '<h2>' + esc(m.name) + (m.v ? U.tick() : '') + '</h2>' +
              '<p>' + esc((m.job || '') + ' · ' + m.city) + '</p>' +
              '<div class="chips" style="margin-top:8px">' +
                U.pill(U.bn(m.age) + ' বছর', 'brand') + U.pill(m.edu || 'স্নাতক') +
                (m.v ? U.pill('যাচাইকৃত', 'ok') : U.pill('যাচাই বাকি', 'warn')) +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="profhead__thumbs">' + [1, 2, 3, 4].map(function (i) {
            return U.photo({ h: [1, 2, 3, 5][i - 1], mono: m.mono, cls: 'thumb', alt: 'নমুনা ছবি ' + i });
          }).join('') + '</div>' +
        '</div>' +
        '<div class="pad">' +
          U.notice('বিস্তারিত তথ্য ও যোগাযোগ দেখতে সাইন ইন করুন।', null, 'lock') +
          '<h3 style="margin:18px 0 4px">নিজের কথায়</h3>' +
          '<p class="rv">' + esc(m.note || '') + ' পরিবার নিয়ে সহজ, ধর্মীয় অনুশীলনে নিয়মিত, আর কাজ নিয়ে আন্তরিক। ভবিষ্যতের সঙ্গীর কাছে সততা আর ধৈর্যটুকুই চাওয়া।</p>' +
          '<h3 style="margin:20px 0 4px">বায়োডাটা</h3>' +
          '<dl class="facts rv">' +
            U.fact('বয়স', U.bn(m.age) + ' বছর') + U.fact('উচ্চতা', '৫ ফুট ৬ ইঞ্চি') +
            U.fact('ধর্ম', 'ইসলাম') + U.fact('পেশা', m.job || '—') +
            U.fact('শিক্ষা', m.edu || '—') + U.fact('জেলা', m.city) +
            U.fact('বৈবাহিক', 'অবিবাহিত') + U.fact('যোগাযোগ', '', true) +
            U.fact('পরিবার', '', true) +
          '</dl>' +
          '<div class="btn-row" style="margin:20px 0 8px">' +
            '<button class="btn ghost" data-go="login">বায়োডাটা</button>' +
            '<button class="btn" data-act="interest"><span>আগ্রহ জানান</span></button>' +
          '</div>' +
        '</div>'
    };
  };

  /* ------------------------------------------------------------ plans */
  S.plans = function () {
    return {
      bg: 'ribbons', tab: null,
      appbar: U.appbar({ back: true, title: 'প্ল্যান ও মূল্য' }),
      body:
        '<div class="pad">' +
          '<p class="lede rv">প্রোফাইল তৈরি চিরকাল ফ্রি। যোগাযোগ শুরু করার সময়েই কেবল প্ল্যান লাগে।</p>' +
          '<div style="margin:14px 0 18px">' + U.seg(['৩ মাস', '৬ মাস', '১২ মাস'], 1) + '</div>' +
          D.plans.map(function (pl, i) {
            return '<div class="plan rv' + (pl.best ? ' best' : '') + '" style="--i:' + i + ';margin-bottom:14px">' +
              '<div style="display:flex;align-items:center;gap:10px">' +
                '<span class="medal">' + (i === 2 ? ic('crown') : i === 1 ? ic('star') : ic('user')) + '</span>' +
                '<div><b style="color:var(--ink);font-size:1.02rem">' + esc(pl.name) + '</b>' +
                '<div class="tiny muted">' + (i === 0 ? 'শুরু করার জন্য' : i === 1 ? 'বেশিরভাগের জন্য' : 'দ্রুত এগোতে') + '</div></div></div>' +
              '<div class="plan__price" style="margin-top:12px">৳' + esc(pl.price) +
                ' <small>' + esc(pl.per) + '</small></div>' +
              '<ul>' + pl.yes.map(function (t) { return '<li>' + ic('check') + esc(t) + '</li>'; }).join('') +
                pl.no.map(function (t) { return '<li class="off">' + ic('close') + esc(t) + '</li>'; }).join('') + '</ul>' +
              '<button class="btn block" style="margin-top:14px" data-go="checkout">' +
                (i === 0 ? 'ফ্রি শুরু করুন' : 'এই প্ল্যান নিন') + '</button>' +
            '</div>';
          }).join('') +
          U.notice('বিকাশ, নগদ ও কার্ডে পরিশোধ করা যায়। যেকোনো সময় বাতিল করা যাবে।', null, 'wallet') +
          U.sechead('কুপন আছে?', null) +
          '<div style="display:flex;gap:8px">' +
            '<input class="input" placeholder="কুপন কোড" style="flex:1">' +
            '<button class="btn quiet" data-act="save">প্রয়োগ</button></div>' +
        '</div>'
    };
  };

  /* ------------------------------------------------------------ stories */
  S.stories = function () {
    return {
      bg: 'hearts', tab: 'gstories', tabGroup: 'guest',
      appbar: U.appbar({ back: true, title: 'সফল গল্প', sub: '১,২১৪টি বিয়ে' }),
      body:
        '<div class="pad">' +
          '<div class="chips scroll" data-chips>' +
            ['সব', '২০২৬', '২০২৫', '২০২৪', 'প্রবাসী'].map(function (t, i) {
              return '<button class="chip' + (i === 0 ? ' is-on' : '') + '">' + t + '</button>';
            }).join('') + '</div>' +
          D.stories.map(function (s, i) {
            return '<button class="card press rv" style="--i:' + i + ';margin-bottom:12px;width:100%;text-align:left" data-go="story:' + s.id + '">' +
              U.photo({ h: s.h, mono: '❤', alt: s.couple, style: 'aspect-ratio:16/9', tag: s.year }) +
              '<div class="card__body"><span class="qmark">”</span>' +
                '<q style="display:block;font-family:var(--font-head);color:var(--ink);font-size:1rem;line-height:1.45">' + esc(s.quote) + '</q>' +
                '<div class="tiny muted" style="margin-top:8px">' + esc(s.couple + ' · ' + s.city + ' · ' + s.year) + '</div>' +
              '</div></button>';
          }).join('') +
          '<div class="card tinted rv"><div class="card__body center">' +
            '<h3>আপনার গল্পও বলুন</h3><p class="tiny muted" style="margin:6px 0 12px">সেতুতে বিয়ে হয়েছে? আমাদের জানান।</p>' +
            '<button class="btn" data-act="soon">গল্প পাঠান</button></div></div>' +
        '</div>'
    };
  };

  S.story = function (p) {
    var s = D.stories.filter(function (x) { return x.id === p.id; })[0] || D.stories[0];
    return {
      appbar: U.appbar({ back: true, title: s.couple, right: U.iconbtn('share', { act: 'share' }) }),
      body:
        U.photo({ h: s.h, mono: '❤', alt: s.couple, style: 'aspect-ratio:4/3' }) +
        '<div class="pad">' +
          '<p class="eyebrow rv" style="margin-top:16px">' + esc(s.city + ' · ' + s.year) + '</p>' +
          '<h1 class="rv" style="--i:1">' + esc(s.couple) + '</h1>' +
          '<span class="qmark">”</span>' +
          '<p class="lede rv" style="--i:2">' + esc(s.quote) + '</p>' +
          '<p class="rv" style="--i:3;margin-top:14px">প্রথম বার্তা থেকে বিয়ে পর্যন্ত পুরো পথটা আমরা ধীরেই হেঁটেছি। সেতুর ভেরিফিকেশন আর পারিবারিক পরিচয় পর্ব দুটোই আমাদের অভিভাবকদের নিশ্চিন্ত করেছে — তাঁদের প্রশ্নগুলো আমাদের আগেই জিজ্ঞেস করা হয়েছিল, মুখোমুখি বসার আগেই।</p>' +
          '<p class="rv" style="--i:4;margin-top:12px">যাঁরা শুরু করছেন, তাঁদের বলব — তাড়াহুড়ো করবেন না। প্রোফাইলটা সৎভাবে পূরণ করুন, আর পরিবারকে শুরু থেকেই সঙ্গে রাখুন।</p>' +
          '<div class="card tinted rv" style="margin-top:20px"><div class="card__body center">' +
            '<button class="btn" data-go="register-1">আপনিও শুরু করুন</button></div></div>' +
        '</div>'
    };
  };

  /* ------------------------------------------------------------ tips */
  S.tips = function () {
    return {
      tab: 'gtips', tabGroup: 'guest',
      appbar: U.appbar({ back: true, title: 'পরামর্শ' }),
      body:
        '<div class="pad">' +
          U.field({ icon: 'search', ph: 'পরামর্শ খুঁজুন' }) +
          U.chips(['সব', 'প্রোফাইল', 'যোগাযোগ', 'পরিবার', 'নিরাপত্তা', 'সাক্ষাৎ'], 0, true) +
          '<div style="display:grid;gap:12px;margin-top:6px">' +
          D.tips.map(function (t, i) {
            return '<button class="card press rv" style="--i:' + i + ';text-align:left;width:100%" data-go="tip:' + t.id + '">' +
              '<div style="display:flex;gap:12px;align-items:center;padding:12px">' +
                U.photo({ h: t.h, mono: t.cat.slice(0, 1), cls: 'av lg', alt: t.title }) +
                '<div style="min-width:0"><b style="color:var(--ink);display:block">' + esc(t.title) + '</b>' +
                '<span class="tiny muted">' + esc(t.cat + ' · ' + t.read) + '</span></div>' +
                ic('chev', 'chev') +
              '</div></button>';
          }).join('') + '</div>' +
        '</div>'
    };
  };

  S.tip = function (p) {
    var t = D.tips.filter(function (x) { return x.id === p.id; })[0] || D.tips[0];
    return {
      appbar: U.appbar({ back: true, title: t.cat, right: U.iconbtn('bookmark', { act: 'save' }) }),
      body:
        U.photo({ h: t.h, mono: t.cat.slice(0, 1), alt: t.title, style: 'aspect-ratio:2/1' }) +
        '<div class="pad">' +
          '<p class="eyebrow rv" style="margin-top:16px">' + esc(t.cat + ' · ' + t.read) + '</p>' +
          '<h1 class="rv" style="--i:1">' + esc(t.title) + '</h1>' +
          '<div class="rv" style="--i:2;margin-top:14px;display:grid;gap:14px">' +
            ['একটি বায়োডাটা আসলে একটি চিঠি — যিনি পড়ছেন, তিনি আপনাকে চেনেন না। তাই প্রথম কাজ সৎ হওয়া, দ্বিতীয় কাজ স্পষ্ট হওয়া।',
             'বয়স, উচ্চতা, পেশা আর শিক্ষা — এই চারটি ঘর ফাঁকা রাখলে বেশিরভাগ মানুষ পরের প্রোফাইলে চলে যান। ঘরগুলো ছোট, কিন্তু সেগুলোই প্রথম ছাঁকনি।',
             '“নিজের কথায়” অংশটি তিন থেকে পাঁচ বাক্যে লিখুন। কী করেন, কী ভালোবাসেন, আর সঙ্গীর কাছে কী চান — এই তিনটি যথেষ্ট।',
             'ছবিতে মুখ স্পষ্ট থাকতে হবে। দল বেঁধে তোলা ছবি, রোদচশমা বা খুব দূর থেকে তোলা ছবি বাদ দিন।',
             'যোগাযোগের নম্বর বিবরণে লিখবেন না — সেটি মডারেশনে আটকাবে, আর আপনার নিরাপত্তার জন্যও ভালো নয়।',
             'সবশেষে, একবার নিজের প্রোফাইলটি অচেনা চোখে পড়ুন। যা পড়ে আপনি নিজে আগ্রহ পেতেন না, সেটুকু বদলান।']
              .map(function (para, i) {
                return (i === 0 ? '<p class="lede">' : '<p>') + esc(para) + '</p>';
              }).join('') +
          '</div>' +
          U.notice('এই লেখাটি নমুনা কনটেন্ট — ডেমো ইউআই দেখানোর জন্য।', 'warn', 'info') +
          U.sechead('আরও পড়ুন', null) +
          '<div class="list rv">' + D.tips.slice(1, 4).map(function (x) {
            return U.lrow({ title: esc(x.title), sub: x.read, icon: 'book', go: 'tip:' + x.id });
          }).join('') + '</div>' +
        '</div>'
    };
  };

  /* ------------------------------------------------------------ static pages */
  function accordion(items) {
    return '<div class="list">' + items.map(function (f) {
      return '<div><button class="lrow" data-accordion style="width:100%">' +
        '<span class="lrow__txt"><b>' + esc(f.q) + '</b></span>' + ic('chevDown', 'chev') + '</button>' +
        '<div class="acc-body" style="max-height:0"><p class="pad tiny" style="padding-bottom:14px;color:var(--muted)">' +
        esc(f.a) + '</p></div></div>';
    }).join('') + '</div>';
  }

  S.faq = function () {
    return {
      appbar: U.appbar({ back: true, title: 'সচরাচর প্রশ্ন' }),
      body: '<div class="pad">' + U.field({ icon: 'search', ph: 'প্রশ্ন খুঁজুন' }) +
        accordion(D.faq) +
        '<div class="card tinted rv" style="margin-top:18px"><div class="card__body center">' +
        '<h3>উত্তর পাননি?</h3><p class="tiny muted" style="margin:6px 0 12px">সরাসরি লিখুন, আমরা উত্তর দেব।</p>' +
        '<button class="btn" data-go="problem">সমস্যা জানান</button></div></div></div>'
    };
  };

  S.about = function () {
    return {
      bg: 'ribbons',
      appbar: U.appbar({ back: true, title: 'আমাদের সম্পর্কে' }),
      body: '<div class="pad">' +
        '<h1 class="wordfly">সেতু কেন</h1>' +
        '<p class="lede rv" style="--i:2;margin-top:12px">বিয়ের খোঁজ বাংলাদেশে বরাবরই পরিবারের কাজ। অনলাইন সেই কাজটিকে সহজ করতে পারে, কিন্তু পরিবারকে বাদ দিয়ে নয়।</p>' +
        '<p class="rv" style="--i:3;margin-top:12px">সেতু তাই দুটো জিনিস একসাথে রাখে — আধুনিক একটি খোঁজার ব্যবস্থা, আর পরিবারের জন্য সত্যিকারের জায়গা। অভিভাবক অ্যাকাউন্ট, পারিবারিক পরিচয় পর্ব, আর প্রতিটি প্রোফাইলের হাতে-করা যাচাই — তিনটিই সেই কারণে।</p>' +
        '<div class="stats rv" style="margin:20px 0">' + U.stat('২০২৪', 'যাত্রা শুরু') + U.stat('১২,৪৮০', 'সদস্য') + U.stat('৪৬', 'জেলা') + '</div>' +
        U.sechead('আমাদের নীতি', null) +
        '<div class="list rv">' +
          [['shield', 'যাচাই ছাড়া যোগাযোগ নয়'], ['lock', 'ডেটা বিক্রি করা হয় না'],
           ['ban', 'কোনো ঘটকালি কমিশন নেই'], ['users', 'পরিবার সিদ্ধান্তে থাকবে']]
          .map(function (x) { return U.lrow({ title: x[1], icon: x[0], chev: false }); }).join('') +
        '</div>' +
        U.sechead('যোগাযোগ', null) +
        '<div class="list rv">' +
          U.lrow({ title: 'hello@shetu.example', icon: 'mail', chev: false }) +
          U.lrow({ title: '+৮৮০ ১৭xx-xxxxxx', icon: 'phone', chev: false }) +
          U.lrow({ title: 'ধানমন্ডি, ঢাকা', icon: 'pin', chev: false }) +
        '</div></div>'
    };
  };

  S.safety = function () {
    return {
      appbar: U.appbar({ back: true, title: 'নিরাপত্তা' }),
      body: '<div class="pad">' +
        U.notice('কেউ টাকা চাইলে সঙ্গে সঙ্গে রিপোর্ট করুন। সেতু কখনো ব্যক্তিগতভাবে টাকা চায় না।', 'bad', 'warn') +
        U.sechead('যা করবেন', null) +
        '<div class="list">' + [
          ['check', 'প্রথম দেখা প্রকাশ্য জায়গায় করুন'],
          ['check', 'পরিবারকে জানিয়ে রাখুন কোথায় যাচ্ছেন'],
          ['check', 'ভিডিও কলে একবার কথা বলে নিন'],
          ['check', 'ভেরিফায়েড ব্যাজ দেখে নিন']
        ].map(function (x) { return U.lrow({ title: x[1], icon: x[0], chev: false }); }).join('') + '</div>' +
        U.sechead('যা করবেন না', null) +
        '<div class="list">' + [
          ['ban', 'কাউকে টাকা পাঠাবেন না'],
          ['ban', 'এনআইডি বা ব্যাংক তথ্য দেবেন না'],
          ['ban', 'প্রথমেই অন্য অ্যাপে চলে যাবেন না'],
          ['ban', 'তাড়াহুড়োর চাপ মানবেন না']
        ].map(function (x) { return U.lrow({ title: x[1], icon: x[0], chev: false }); }).join('') + '</div>' +
        '<button class="btn block danger" style="margin-top:18px" data-go="problem">' + ic('flag') + ' রিপোর্ট করুন</button>' +
        '</div>'
    };
  };

  S.legal = function () {
    return {
      appbar: U.appbar({ back: true, title: 'শর্তাবলি ও গোপনীয়তা' }),
      body: '<div class="pad">' +
        U.seg(['শর্তাবলি', 'গোপনীয়তা', 'রিফান্ড'], 0) +
        '<div data-panel style="margin-top:14px">' +
          ['সেতু একটি পরিচয় করিয়ে দেওয়ার মাধ্যম। বিয়ের সিদ্ধান্ত সম্পূর্ণভাবে সংশ্লিষ্ট পরিবার ও ব্যক্তির।',
           'প্রতিটি অ্যাকাউন্ট একজন প্রাপ্তবয়স্ক ব্যক্তির। একজনের একাধিক অ্যাকাউন্ট গ্রহণযোগ্য নয়।',
           'মিথ্যা তথ্য, অন্যের ছবি বা হয়রানিমূলক আচরণে অ্যাকাউন্ট স্থায়ীভাবে বন্ধ করা হয়।',
           'প্ল্যানের মেয়াদ কেনার দিন থেকে গণনা শুরু হয়।']
            .map(function (t, i) { return '<p class="rv" style="--i:' + i + ';margin-bottom:12px">' + (i + 1) + '. ' + esc(t) + '</p>'; }).join('') +
        '</div>' +
        '<div data-panel hidden style="margin-top:14px">' +
          ['আপনার দেওয়া তথ্য কেবল পরিচয় করিয়ে দেওয়ার কাজে ব্যবহৃত হয়।',
           'ছবি ও যোগাযোগ কে দেখবে তা আপনি নিজেই ঠিক করেন।',
           'আমরা কোনো তৃতীয় পক্ষের কাছে ডেটা বিক্রি করি না।',
           'অ্যাকাউন্ট বন্ধের ৩০ দিনের মধ্যে সব তথ্য মুছে ফেলা হয়।']
            .map(function (t, i) { return '<p class="rv" style="--i:' + i + ';margin-bottom:12px">' + (i + 1) + '. ' + esc(t) + '</p>'; }).join('') +
        '</div>' +
        '<div data-panel hidden style="margin-top:14px">' +
          '<p class="rv">কেনার ৭ দিনের মধ্যে, প্ল্যানের সুবিধা ব্যবহার না করা হলে সম্পূর্ণ ফেরত। এরপর আনুপাতিক হারে।</p>' +
        '</div></div>'
    };
  };

  S.classifieds = function () {
    return {
      appbar: U.appbar({ back: true, title: 'বিজ্ঞাপন', right: U.iconbtn('plus', { go: 'classified-create' }) }),
      body: '<div class="pad">' +
        U.chips(['সব', 'পাত্র চাই', 'পাত্রী চাই', 'প্রবাসী'], 0, true) +
        '<div style="display:grid;gap:12px">' + D.classifieds.map(function (c, i) {
          return '<button class="card press rv" style="--i:' + i + ';width:100%;text-align:left" data-go="classified-show:' + c.id + '">' +
            '<div class="card__body"><div style="display:flex;gap:10px;align-items:center">' +
            U.photo({ h: c.h, mono: 'সে', cls: 'av' }) +
            '<div><b style="color:var(--ink)">' + esc(c.title) + '</b>' +
            '<div class="tiny muted">' + esc(c.by + ' · ' + c.at) + '</div></div></div></div></button>';
        }).join('') + '</div></div>',
      after: '<button class="fab" data-go="classified-create" aria-label="নতুন বিজ্ঞাপন">' + ic('plus') + '</button>'
    };
  };

  S['classified-show'] = function (p) {
    var c = D.classifieds.filter(function (x) { return x.id === p.id; })[0] || D.classifieds[0];
    return {
      appbar: U.appbar({ back: true, title: 'বিজ্ঞাপন', right: U.iconbtn('flag', { act: 'soon' }) }),
      body: '<div class="pad">' +
        '<h1 class="rv">' + esc(c.title) + '</h1>' +
        '<p class="tiny muted rv" style="--i:1">' + esc(c.by + ' · ' + c.at) + '</p>' +
        '<dl class="facts rv" style="--i:2;margin-top:14px">' +
          U.fact('বয়সসীমা', '২৪ – ২৮') + U.fact('জেলা', 'ঢাকা') +
          U.fact('শিক্ষা', 'স্নাতক বা তদূর্ধ্ব') + U.fact('পেশা', 'যেকোনো') +
          U.fact('পরিবার', 'মধ্যবিত্ত, ধর্মপ্রাণ') + U.fact('যোগাযোগ', '', true) +
        '</dl>' +
        '<button class="btn block" style="margin-top:18px" data-go="login">যোগাযোগ দেখতে সাইন ইন</button></div>'
    };
  };

  S['classified-create'] = function () {
    return {
      appbar: U.appbar({ back: true, title: 'নতুন বিজ্ঞাপন' }),
      body: '<div class="pad">' +
        U.field({ label: 'শিরোনাম', ph: 'পাত্রী চাই — ঢাকা' }) +
        '<div class="row2">' + U.field({ label: 'বয়স থেকে', type: 'select', opts: ['১৮', '২০', '২২', '২৪'] }) +
          U.field({ label: 'বয়স পর্যন্ত', type: 'select', opts: ['২৮', '৩০', '৩২', '৩৫'] }) + '</div>' +
        U.field({ label: 'জেলা', type: 'select', opts: D.cities }) +
        U.field({ label: 'বিস্তারিত', type: 'textarea', ph: 'পরিবার, প্রত্যাশা, অন্যান্য তথ্য' }) +
        U.notice('যোগাযোগ নম্বর বিজ্ঞাপনে লিখবেন না — মডারেশনে আটকে যাবে।', 'warn') +
        '<button class="btn block" style="margin-top:16px" data-act="save">জমা দিন</button></div>'
    };
  };

  S.problem = function () {
    return {
      appbar: U.appbar({ back: true, title: 'সমস্যা জানান' }),
      body: '<div class="pad">' +
        U.field({ label: 'ধরন', type: 'select', opts: ['অ্যাকাউন্ট', 'পেমেন্ট', 'হয়রানি', 'ভুয়া প্রোফাইল', 'অন্যান্য'] }) +
        U.field({ label: 'কোন প্রোফাইল (যদি থাকে)', ph: 'SETU-XXXXX' }) +
        U.field({ label: 'বিস্তারিত', type: 'textarea', ph: 'কী হয়েছে, কখন হয়েছে' }) +
        '<button class="btn quiet block" style="margin-bottom:12px" data-act="soon">' + ic('paperclip') + ' স্ক্রিনশট যোগ করুন</button>' +
        '<button class="btn block" data-act="save">পাঠান</button>' +
        U.notice('জরুরি হলে সরাসরি কল করুন: ১৬xxx', null, 'phone') + '</div>'
    };
  };

  S.sitemap = function () {
    var groups = [
      ['সর্বসাধারণ', [['landing', 'ল্যান্ডিং'], ['matrimony', 'ম্যাট্রিমনি'], ['dating', 'কানেক্ট'],
        ['public-search', 'সার্চ'], ['plans', 'প্ল্যান'], ['stories', 'গল্প'], ['tips', 'পরামর্শ'],
        ['faq', 'প্রশ্নোত্তর'], ['about', 'সম্পর্কে'], ['safety', 'নিরাপত্তা'], ['legal', 'আইনি'],
        ['classifieds', 'বিজ্ঞাপন'], ['problem', 'সমস্যা'], ['biodata-public', 'বায়োডাটা মেকার']]],
      ['সাইন ইন', [['login', 'লগইন'], ['login-code', 'কোডে লগইন'], ['otp', 'ওটিপি'],
        ['register-1', 'নিবন্ধন ১'], ['register-2', 'নিবন্ধন ২'], ['verify-email', 'ইমেইল যাচাই'],
        ['password-request', 'পাসওয়ার্ড ভুলে গেছি'], ['password-reset', 'পাসওয়ার্ড বদল'],
        ['staff-login', 'স্টাফ লগইন'], ['candidate-confirm', 'প্রার্থী নিশ্চিতকরণ']]],
      ['সদস্য', [['dashboard', 'ড্যাশবোর্ড'], ['search', 'সার্চ'], ['profile-hub', 'প্রোফাইল হাব'],
        ['profile-edit', 'প্রোফাইল সম্পাদনা'], ['profile-preview', 'প্রিভিউ'], ['biodata', 'বায়োডাটা'],
        ['biodata-poster', 'পোস্টার'], ['mailbox', 'বার্তা'], ['thread', 'কথোপকথন'],
        ['requests', 'অনুরোধ'], ['notifications', 'নোটিফিকেশন'], ['verification', 'যাচাই'],
        ['verification-document', 'ডকুমেন্ট'], ['verification-selfie', 'সেলফি'],
        ['privacy', 'গোপনীয়তা'], ['settings', 'সেটিংস'], ['checkout', 'চেকআউট'],
        ['pay-manual', 'ম্যানুয়াল পেমেন্ট'], ['invoices', 'ইনভয়েস'], ['member-family', 'পরিবার'],
        ['shortlist', 'শর্টলিস্ট'], ['photos', 'ছবি'], ['preferences', 'সঙ্গীর পছন্দ'],
        ['referral', 'রেফারেল'], ['thread:th1', 'কথোপকথন'], ['family-members', 'সদস্যের অনুমতি'],
        ['family-room', 'পারিবারিক কক্ষ'], ['family-log', 'কার্যবিবরণী']]],
      ['কানেক্ট', [['connect-deck', 'ডেক'], ['connect-people', 'মানুষ'], ['connect-matches', 'ম্যাচ'],
        ['connect-messenger', 'চ্যাট'], ['connect-chat:c1', 'কথোপকথন'], ['connect-profile', 'প্রোফাইল'],
        ['connect-plans', 'প্ল্যান'], ['connect-settings', 'সেটিংস'], ['connect-notifications', 'নোটিফিকেশন']]],
      ['পরিবার', [['family-dashboard', 'ড্যাশবোর্ড'], ['family-families', 'পরিবারসমূহ'],
        ['family-connection', 'সংযোগ'], ['family-introductions', 'পরিচয়সমূহ'], ['family-introduction', 'পরিচয়'],
        ['family-meetings', 'সাক্ষাৎ'], ['family-meet', 'সাক্ষাৎ কক্ষ'], ['family-profile', 'পরিবারের প্রোফাইল'],
        ['family-questions', 'প্রশ্ন'], ['family-guide', 'নির্দেশিকা'], ['family-join', 'যোগ দিন'],
        ['family-accepted', 'যোগ দেওয়া হয়েছে']]],
      ['প্রশাসন', [['admin-dashboard', 'ড্যাশবোর্ড'], ['admin-members', 'সদস্য'], ['admin-member', 'সদস্য বিবরণ'],
        ['admin-moderation', 'মডারেশন'], ['admin-verifications', 'যাচাই'], ['admin-payments', 'পেমেন্ট'],
        ['admin-member-photos', 'ছবি মডারেশন'], ['admin-verification', 'যাচাই কেস'],
        ['admin-pricing', 'মূল্য'], ['admin-pricing-edit', 'মূল্য সম্পাদনা'],
        ['admin-offers', 'অফার'], ['admin-coupons', 'কুপন'], ['admin-coupon-edit', 'কুপন সম্পাদনা'],
        ['admin-mail', 'মেইল'], ['admin-mail-compose', 'মেইল লিখুন'], ['admin-mail-show', 'মেইল দেখুন'],
        ['admin-stories', 'গল্প'], ['admin-story-edit', 'গল্প সম্পাদনা'],
        ['admin-tips', 'পরামর্শ'], ['admin-hero', 'হিরো'], ['admin-appearance', 'চেহারা'],
        ['admin-content', 'কনটেন্ট'], ['admin-seo', 'এসইও'], ['admin-words', 'নিষিদ্ধ শব্দ'],
        ['admin-problems', 'সমস্যা'], ['admin-rewards', 'পুরস্কার'], ['admin-closures', 'অ্যাকাউন্ট বন্ধ'],
        ['admin-export', 'রপ্তানি'], ['admin-porichoy', 'পরিচয় নমুনা'], ['admin-fees', 'সাফল্য ফি'],
        ['admin-messenger', 'মেসেঞ্জার'], ['admin-help', 'সহায়তা'], ['admin-more', 'আরও']]],
      ['অপারেটর', [['op-cases', 'কেসসমূহ'], ['op-case', 'কেস'], ['op-candidate', 'প্রার্থী'], ['op-search', 'সার্চ']]],
      ['ত্রুটি', [['e404', '৪০৪'], ['e403', '৪০৩'], ['e419', '৪১৯'], ['e500', '৫০০']]]
    ];
    return {
      appbar: U.appbar({ back: true, title: 'সব স্ক্রিন', sub: 'ডেমো নেভিগেশন' }),
      body: '<div class="pad">' + groups.map(function (g, gi) {
        return U.sechead(g[0]) + '<div class="chips rv" style="--i:' + gi + '">' +
          g[1].map(function (r) {
            return '<button class="chip" data-go="' + r[0] + '">' + esc(r[1]) + '</button>';
          }).join('') + '</div>';
      }).join('') + '<div style="height:20px"></div></div>'
    };
  };

  /* ------------------------------------------------------------ biodata maker (public) */
  S['biodata-public'] = function () {
    return {
      appbar: U.appbar({ back: true, title: 'বায়োডাটা মেকার', right: U.iconbtn('download', { act: 'soon' }) }),
      body: '<div class="pad">' +
        '<p class="lede rv">অ্যাকাউন্ট ছাড়াই একটি ছাপার উপযোগী বায়োডাটা বানিয়ে নিন।</p>' +
        '<div style="margin:14px 0">' + U.seg(['তথ্য', 'নকশা', 'প্রিভিউ'], 0) + '</div>' +
        '<div data-panel>' +
          U.field({ label: 'নাম', ph: 'পুরো নাম' }) +
          '<div class="row2">' + U.field({ label: 'জন্মসাল', ph: '২০০০' }) + U.field({ label: 'উচ্চতা', ph: '৫\'৬"' }) + '</div>' +
          U.field({ label: 'পেশা', type: 'select', opts: D.professions }) +
          U.field({ label: 'জেলা', type: 'select', opts: D.cities }) +
          U.field({ label: 'পরিবার', type: 'textarea', ph: 'পিতা, মাতা, ভাইবোন' }) +
        '</div>' +
        '<div data-panel hidden>' +
          '<div class="mgrid">' + ['নেভি', 'ম্যাগাজিন', 'নিমন্ত্রণ', 'টাইমলাইন'].map(function (n, i) {
            return '<button class="mcard"><div class="ph" data-h="' + (i + 1) + '" style="aspect-ratio:3/4">' +
              '<span class="ph-mono">' + esc(n.slice(0, 1)) + '</span></div>' +
              '<span class="mcard__meta"><b>' + esc(n) + '</b></span></button>';
          }).join('') + '</div>' +
        '</div>' +
        '<div data-panel hidden>' +
          '<div class="sheetdoc rv">' +
            '<div class="crest">' + ic('ring2') + '</div>' +
            '<h2>বায়োডাটা</h2>' +
            '<p class="center tiny muted" style="margin-bottom:12px">বিসমিল্লাহির রাহমানির রাহিম</p>' +
            '<dl class="facts">' + U.fact('নাম', 'নমুনা নাম') + U.fact('জন্মসাল', '২০০০') +
              U.fact('উচ্চতা', '৫ ফুট ৬ ইঞ্চি') + U.fact('পেশা', 'প্রকৌশলী') +
              U.fact('জেলা', 'ঢাকা') + U.fact('পিতা', 'নমুনা') + U.fact('মাতা', 'নমুনা') + '</dl>' +
          '</div>' +
          '<div class="btn-row" style="margin-top:14px">' +
            '<button class="btn ghost" data-act="share">শেয়ার</button>' +
            '<button class="btn" data-act="soon">' + ic('download') + ' ডাউনলোড</button></div>' +
        '</div></div>'
    };
  };

  /* ------------------------------------------------------------ errors */
  function errScreen(code, title, txt, icon) {
    return function () {
      return {
        bg: 'aurora', appbar: U.appbar({ back: true, title: '' }),
        body: '<div class="pad" style="display:grid;place-items:center;min-height:62vh;text-align:center">' +
          '<div><div class="empty"><div class="ic">' + ic(icon) + '</div>' +
          '<h1 style="font-size:3.2rem;line-height:1">' + code + '</h1>' +
          '<h3 style="margin:8px 0 6px">' + esc(title) + '</h3>' +
          '<p class="muted">' + esc(txt) + '</p></div>' +
          '<button class="btn" data-go="landing">হোমে ফিরুন</button></div></div>'
      };
    };
  }
  S.e404 = S['not-found'] = errScreen('৪০৪', 'পাতাটি নেই', 'যে ঠিকানাটি খুঁজছেন সেটি আর নেই।', 'search');
  S.e403 = errScreen('৪০৩', 'অনুমতি নেই', 'এই পাতাটি দেখার অনুমতি আপনার নেই।', 'lock');
  S.e419 = errScreen('৪১৯', 'সময় শেষ', 'নিরাপত্তার জন্য পাতাটি মেয়াদোত্তীর্ণ হয়েছে। আবার চেষ্টা করুন।', 'clock');
  S.e500 = errScreen('৫০০', 'কিছু একটা ভেঙেছে', 'আমরা জানি, ঠিক করছি। একটু পরে দেখুন।', 'warn');

  /* ------------------------------------------------------------ shared sheets */
  w.SHEETS.filter = function () {
    U.sheet({
      title: 'ফিল্টার',
      body:
        '<span class="label">বয়স</span>' +
        '<div class="row2">' + U.field({ type: 'select', opts: ['১৮', '২০', '২২', '২৪', '২৬'] }) +
          U.field({ type: 'select', opts: ['২৮', '৩০', '৩২', '৩৫', '৪০'] }) + '</div>' +
        U.field({ label: 'জেলা', type: 'select', opts: ['সব'].concat(D.cities) }) +
        U.field({ label: 'পেশা', type: 'select', opts: ['সব'].concat(D.professions) }) +
        '<span class="label">অন্যান্য</span>' +
        U.sw(true, 'শুধু যাচাইকৃত', 'এনআইডি মিলিয়ে দেখা হয়েছে') +
        U.sw(false, 'ছবি আছে এমন') +
        U.sw(false, 'প্রবাসী') +
        '<div class="btn-row" style="margin-top:14px">' +
          '<button class="btn quiet" data-close>রিসেট</button>' +
          '<button class="btn" data-close data-act="save">প্রয়োগ করুন</button></div>'
    });
  };
  w.SHEETS.help = function () {
    U.sheet({
      title: 'সহায়তা',
      body: '<div class="list">' +
        U.lrow({ title: 'সচরাচর প্রশ্ন', icon: 'help', go: 'faq' }) +
        U.lrow({ title: 'নিরাপত্তা নির্দেশিকা', icon: 'shield', go: 'safety' }) +
        U.lrow({ title: 'সমস্যা জানান', icon: 'flag', go: 'problem' }) +
        U.lrow({ title: 'সব স্ক্রিন (ডেমো)', icon: 'grid', go: 'sitemap' }) +
        '</div>'
    });
  };
})(window);
