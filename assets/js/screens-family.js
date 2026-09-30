/* ===========================================================================
   SheTu Mobile — the family module
   Two families meeting, with the candidates present but not alone.
   =========================================================================== */
(function (w) {
  'use strict';
  var U = w.UI, D = w.DATA, S = w.SCREENS, ic = w.ic, esc = U.esc;

  S['family-dashboard'] = function () {
    return {
      mode: 'matri', tab: 'fhome', tabGroup: 'family', bg: 'bokeh+love',
      appbar: U.appbar({
        left: '<button class="brandmark" data-go="dashboard"><span>সে</span></button>',
        title: 'পরিবার', sub: 'রহমান পরিবার',
        right: U.iconbtn('bell', { go: 'notifications', dot: true }) + U.iconbtn('help', { go: 'family-guide' })
      }),
      body: '<div class="pad">' +
        '<div class="card rv sheen"><div class="card__body">' +
          '<p class="eyebrow">চলমান পরিচয় পর্ব</p>' +
          '<div style="display:flex;gap:12px;align-items:center;margin-top:10px">' +
            U.avatar({ h: 1, mono: 'র', size: 'lg' }) +
            '<span class="muted">' + ic('link') + '</span>' +
            U.avatar({ h: 2, mono: 'আ', size: 'lg' }) +
            '<div style="flex:1"><b style="color:var(--ink)">রহমান ↔ আফরিন</b>' +
            '<div class="tiny muted">৩ / ৫ ধাপ সম্পন্ন</div></div></div>' +
          '<div style="margin-top:12px">' + U.bar(60) + '</div>' +
          '<button class="btn block" style="margin-top:12px" data-go="family-connection">বিস্তারিত দেখুন</button>' +
        '</div></div>' +

        '<div class="stats rv" style="--i:1;margin-top:12px">' +
          U.stat('২', 'পরিবার') + U.stat('১', 'পরিচয়') + U.stat('২', 'সাক্ষাৎ') + '</div>' +

        '<div class="quick rv" style="--i:2">' +
          [['users', 'পরিবারসমূহ', 'family-families'], ['hands', 'পরিচয়', 'family-introductions'],
           ['video', 'সাক্ষাৎ', 'family-meetings'], ['help', 'প্রশ্ন', 'family-questions'],
           ['book', 'নির্দেশিকা', 'family-guide'], ['link', 'যোগ দিন', 'family-join']]
            .map(function (q, i) {
              return '<button class="quick__i" style="--i:' + i + '" data-go="' + q[2] + '">' +
                '<span>' + ic(q[0]) + '</span>' + esc(q[1]) + '</button>';
            }).join('') + '</div>' +

        U.sechead('পরবর্তী ধাপ', null) +
        '<div class="card tinted rv"><div class="card__body" style="display:flex;gap:12px;align-items:center">' +
          '<span class="medal breathe">' + ic('video') + '</span>' +
          '<div style="flex:1"><b style="color:var(--ink)">পারিবারিক ভিডিও সাক্ষাৎ</b>' +
          '<div class="tiny muted">শুক্রবার, সন্ধ্যা ৭:০০</div></div>' +
          '<button class="btn xs" data-go="family-meet">যোগ দিন</button></div></div>' +

        U.sechead('সাম্প্রতিক', null) +
        '<div class="list rv">' +
          U.lrow({ title: 'আফরিন পরিবার প্রশ্নের উত্তর দিয়েছে', sub: '২ ঘণ্টা আগে', icon: 'help', go: 'family-questions' }) +
          U.lrow({ title: 'সাক্ষাতের সময় প্রস্তাব করা হয়েছে', sub: 'গতকাল', icon: 'calendar', go: 'family-meetings' }) +
          U.lrow({ title: 'বায়োডাটা বিনিময় সম্পন্ন', sub: '৩ দিন আগে', icon: 'doc', go: 'family-connection' }) +
        '</div><div style="height:14px"></div></div>'
    };
  };

  S['family-families'] = function () {
    return {
      tab: 'ffam', tabGroup: 'family',
      appbar: U.appbar({ title: 'পরিবারসমূহ', right: U.iconbtn('plus', { go: 'family-join' }) }),
      body: '<div class="pad">' +
        '<div style="display:grid;gap:12px">' + D.families.map(function (f, i) {
          return '<button class="card press rv" style="--i:' + i + ';width:100%;text-align:left" data-go="family-profile">' +
            '<div class="card__body" style="display:flex;gap:12px;align-items:center">' +
            U.avatar({ h: f.h, mono: f.mono, size: 'lg' }) +
            '<div style="flex:1"><b style="color:var(--ink)">' + esc(f.name) + '</b>' +
            '<div class="tiny muted">' + esc(f.role + ' · ' + f.members + ' জন') + '</div></div>' +
            U.pill(f.state, f.state === 'সক্রিয়' ? 'ok' : 'warn') + '</div></button>';
        }).join('') + '</div>' +
        '<button class="btn block" style="margin-top:14px" data-go="family-join">' + ic('plus') + ' পরিবার যোগ করুন</button>' +
        U.notice('এক পরিবারে সর্বোচ্চ ৮ জন সদস্য যোগ করা যায়।', null, 'users') + '</div>'
    };
  };

  S['family-profile'] = function () {
    return {
      appbar: U.appbar({ back: true, title: 'রহমান পরিবার', right: U.iconbtn('dots', { act: 'soon' }) }),
      body: '<div class="pad">' +
        '<div class="card rv"><div class="card__body center">' +
          U.avatar({ h: 1, mono: 'র', size: 'xl' }) +
          '<h3 style="margin-top:10px">রহমান পরিবার</h3>' +
          '<p class="tiny muted">ঢাকা · ৪ জন সদস্য</p></div></div>' +
        U.sechead('সদস্য', null) +
        '<div class="list rv">' +
          [['আম্মা', 'অভিভাবক', 1, 'আ'], ['আব্বা', 'অভিভাবক', 3, 'আ'],
           ['বড় ভাই', 'দর্শক', 5, 'ভা'], ['নুসরাত', 'প্রার্থী', 2, 'নু']]
          .map(function (m) {
            return U.lrow({ lead: U.avatar({ h: m[2], mono: m[3] }), title: m[0], sub: m[1], go: 'family-members' });
          }).join('') + '</div>' +
        U.sechead('সংযোগ', null) +
        '<div class="list rv">' +
          U.lrow({ title: 'আফরিন পরিবার', sub: 'চলমান পরিচয় পর্ব', lead: U.avatar({ h: 2, mono: 'আ' }), go: 'family-connection' }) +
        '</div></div>'
    };
  };

  S['family-connection'] = function () {
    return {
      appbar: U.appbar({ back: true, title: 'পরিচয় পর্ব', sub: 'রহমান ↔ আফরিন', right: U.iconbtn('dots', { act: 'soon' }) }),
      body: '<div class="pad">' +
        '<div class="card rv"><div class="card__body">' +
          '<div style="display:flex;gap:12px;align-items:center;justify-content:center">' +
            U.avatar({ h: 1, mono: 'র', size: 'lg' }) +
            '<span class="muted heartbeat">' + ic('heart') + '</span>' +
            U.avatar({ h: 2, mono: 'আ', size: 'lg' }) + '</div>' +
          '<div style="margin-top:14px">' + U.bar(60) + '</div>' +
          '<p class="center tiny muted" style="margin-top:8px">৩ / ৫ ধাপ</p>' +
        '</div></div>' +
        '<div class="steps rv" style="--i:1;margin-top:18px">' +
          [['পরিচয়ের অনুরোধ', 'দুই পরিবার সম্মত', 'done'],
           ['বায়োডাটা বিনিময়', 'সম্পন্ন', 'done'],
           ['প্রশ্নোত্তর', '৫টির মধ্যে ৩টি উত্তর এসেছে', 'now'],
           ['পারিবারিক সাক্ষাৎ', 'শুক্রবার নির্ধারিত', ''],
           ['সিদ্ধান্ত', 'দুই পরিবারের সম্মতি', '']]
            .map(function (s) {
              return '<div class="step ' + s[2] + '"><b>' + esc(s[0]) + '</b><span>' + esc(s[1]) + '</span></div>';
            }).join('') + '</div>' +
        '<div class="btn-row" style="margin-top:8px">' +
          '<button class="btn ghost" data-go="family-questions">প্রশ্ন দেখুন</button>' +
          '<button class="btn" data-go="family-meetings">সাক্ষাৎ ঠিক করুন</button></div>' +
        '<button class="btn quiet block" style="margin-top:10px" data-go="family-room">' + ic('chat') + ' পারিবারিক কক্ষ</button>' +
        '<button class="btn danger block" style="margin-top:10px" data-act="endconn">পরিচয় পর্ব শেষ করুন</button>' +
        '<div style="height:14px"></div></div>'
    };
  };

  S['family-introductions'] = function () {
    return {
      tab: 'fintro', tabGroup: 'family',
      appbar: U.appbar({ title: 'পরিচয়সমূহ' }),
      body: '<div class="pad">' + U.seg(['চলমান', 'অনুরোধ', 'শেষ হয়েছে'], 0) +
        '<div data-panel style="margin-top:14px">' +
          '<button class="card press rv" style="width:100%;text-align:left" data-go="family-connection">' +
            '<div class="card__body" style="display:flex;gap:12px;align-items:center">' +
            U.avatar({ h: 2, mono: 'আ', size: 'lg' }) +
            '<div style="flex:1"><b style="color:var(--ink)">আফরিন পরিবার</b>' +
            '<div class="tiny muted">৩ / ৫ ধাপ · সাক্ষাৎ শুক্রবার</div>' + U.bar(60) + '</div>' +
            ic('chev', 'chev') + '</div></button>' +
        '</div>' +
        '<div data-panel hidden style="margin-top:14px">' +
          '<div class="card rv"><div class="card__body" style="display:flex;gap:12px;align-items:center">' +
            U.avatar({ h: 3, mono: 'হো', size: 'lg' }) +
            '<div style="flex:1"><b style="color:var(--ink)">হোসেন পরিবার</b>' +
            '<div class="tiny muted">পরিচয়ের অনুরোধ · গতকাল</div></div></div>' +
            '<div class="card__foot" style="display:flex;gap:8px">' +
              '<button class="btn xs quiet" style="flex:1" data-act="decline">ফিরিয়ে দিন</button>' +
              '<button class="btn xs" style="flex:1" data-act="accept">গ্রহণ করুন</button></div></div>' +
        '</div>' +
        '<div data-panel hidden style="margin-top:14px">' +
          U.empty('book', 'এখনো কিছু শেষ হয়নি', 'কোনো পরিচয় পর্ব শেষ হলে এখানে থাকবে।') + '</div></div>'
    };
  };

  S['family-introduction'] = function () {
    return {
      appbar: U.appbar({ back: true, title: 'পরিচয়ের অনুরোধ' }),
      body: '<div class="pad">' +
        '<div class="card rv"><div class="card__body center">' +
          U.avatar({ h: 3, mono: 'হো', size: 'xl' }) +
          '<h3 style="margin-top:10px">হোসেন পরিবার</h3>' +
          '<p class="tiny muted">সিলেট · ৩ জন সদস্য</p></div></div>' +
        '<p class="rv" style="margin-top:16px">তাঁরা আপনার পরিবারের সাথে একটি পরিচয় পর্ব শুরু করতে চান। সম্মত হলে বায়োডাটা বিনিময় দিয়ে শুরু হবে।</p>' +
        U.notice('গ্রহণ করলেও যেকোনো সময় পর্ব শেষ করে দিতে পারবেন।', null, 'info') +
        '<div class="btn-row" style="margin-top:16px">' +
          '<button class="btn ghost" data-act="soon">ফিরিয়ে দিন</button>' +
          '<button class="btn" data-go="family-connection">গ্রহণ করুন</button></div></div>'
    };
  };

  S['family-meetings'] = function () {
    return {
      tab: 'fmeet', tabGroup: 'family',
      appbar: U.appbar({ title: 'সাক্ষাৎ', right: U.iconbtn('plus', { act: 'propose' }) }),
      body: '<div class="pad">' +
        '<div style="display:grid;gap:12px">' + D.meetings.map(function (m, i) {
          return '<div class="card rv" style="--i:' + i + '"><div class="card__body">' +
            '<div style="display:flex;gap:10px;align-items:center">' +
              '<span class="medal">' + ic('video') + '</span>' +
              '<div style="flex:1"><b style="color:var(--ink)">' + esc(m.with) + '</b>' +
              '<div class="tiny muted">' + esc(m.when + ' · ' + m.kind) + '</div></div>' +
              U.pill(m.state, m.state === 'নিশ্চিত' ? 'ok' : 'warn') + '</div></div>' +
            '<div class="card__foot" style="display:flex;gap:8px">' +
              (m.state === 'নিশ্চিত'
                ? '<button class="btn xs quiet" style="flex:1" data-act="soon">সময় বদলান</button>' +
                  '<button class="btn xs" style="flex:1" data-go="family-meet">যোগ দিন</button>'
                : '<button class="btn xs quiet" style="flex:1" data-act="soon">পাল্টা প্রস্তাব</button>' +
                  '<button class="btn xs" style="flex:1" data-act="accept">নিশ্চিত করুন</button>') +
            '</div></div>';
        }).join('') + '</div>' +
        '<button class="btn block" style="margin-top:14px" data-act="propose">' + ic('calendar') + ' নতুন সময় প্রস্তাব করুন</button>' +
        U.notice('সাক্ষাতের আগে দুই পরিবারই একটি করে অনুস্মারক পাবে।', null, 'bell') + '</div>'
    };
  };

  S['family-meet'] = S['family-room-video'] = function () {
    return {
      appbar: false, cls: 'is-meet',
      body: '<div class="meet">' +
        '<div class="meet__grid">' +
          [['রহমান পরিবার', 1, 'র'], ['আফরিন পরিবার', 2, 'আ'], ['নুসরাত', 5, 'নু'], ['তানভীর', 3, 'তা']]
            .map(function (p, i) {
              return '<div class="meet__tile rv-scale" style="--i:' + i + '">' +
                U.photo({ h: p[1], mono: p[2] }) +
                '<span class="meet__name">' + esc(p[0]) + (i === 0 ? ' ' + ic('mic') : '') + '</span></div>';
            }).join('') + '</div>' +
        '<div class="meet__bar">' +
          '<button class="callbtn">' + ic('mic') + '</button>' +
          '<button class="callbtn">' + ic('video') + '</button>' +
          '<button class="callbtn">' + ic('users') + '</button>' +
          '<button class="callbtn end" data-back>' + ic('phone') + '</button>' +
        '</div></div>'
    };
  };

  S['family-questions'] = function () {
    return {
      tab: 'fq', tabGroup: 'family',
      appbar: U.appbar({ title: 'প্রশ্নোত্তর', right: U.iconbtn('plus', { act: 'askq' }) }),
      body: '<div class="pad">' +
        U.notice('দুই পরিবার আগে থেকে প্রশ্ন লিখে রাখলে মুখোমুখি বসাটা সহজ হয়।', null, 'help') +
        U.sechead('আফরিন পরিবারের প্রশ্ন', null) +
        '<div style="display:grid;gap:12px">' + D.questions.map(function (q, i) {
          return '<div class="card rv" style="--i:' + i + '"><div class="card__body">' +
            '<b style="color:var(--ink);display:block">' + esc(q) + '</b>' +
            (i < 3
              ? '<p class="tiny" style="margin-top:8px;color:var(--muted)">উত্তর দেওয়া হয়েছে — ' +
                (i === 0 ? 'পরিবারকে সঙ্গে নিয়ে চলতে চাই, আলাদা হয়ে নয়।'
                 : i === 1 ? 'কাজ চালিয়ে যেতে চাই, পারিবারিক সম্মতি সাপেক্ষে।'
                 : 'আপাতত দেশে, ভবিষ্যৎ আলোচনা সাপেক্ষ।') + '</p>'
              : '<button class="btn xs soft" style="margin-top:10px" data-act="answer">উত্তর দিন</button>') +
            '</div></div>';
        }).join('') + '</div>' +
        '<button class="btn block" style="margin-top:14px" data-act="askq">' + ic('plus') + ' প্রশ্ন যোগ করুন</button>' +
        '<div style="height:14px"></div></div>'
    };
  };

  S['family-guide'] = function () {
    return {
      bg: 'ribbons',
      appbar: U.appbar({ back: true, title: 'পরিবারের নির্দেশিকা' }),
      body: '<div class="pad">' +
        '<h1 class="wordfly">পরিচয় পর্ব কীভাবে চলে</h1>' +
        '<div class="steps rv" style="--i:2;margin-top:18px">' +
          [['এক — সংযোগ', 'দুই পরিবার সম্মতি দেয়, তারপরই কিছু দেখা যায়।'],
           ['দুই — বায়োডাটা', 'দুই পক্ষের বায়োডাটা একসাথে খোলা হয়।'],
           ['তিন — প্রশ্ন', 'যে প্রশ্নগুলো মুখোমুখি জিজ্ঞেস করা কঠিন, সেগুলো লিখে রাখুন।'],
           ['চার — সাক্ষাৎ', 'ভিডিওতে দুই পরিবার একসাথে বসে।'],
           ['পাঁচ — সিদ্ধান্ত', 'দুই পক্ষ সম্মত হলে যোগাযোগ খুলে দেওয়া হয়।']]
            .map(function (s, i) {
              return '<div class="step ' + (i === 0 ? 'done' : '') + '"><b>' + esc(s[0]) + '</b><span>' + esc(s[1]) + '</span></div>';
            }).join('') + '</div>' +
        U.notice('কোনো পক্ষ যেকোনো সময় পর্ব শেষ করতে পারে — কারণ জানানো বাধ্যতামূলক নয়।', null, 'shield') +
        '<button class="btn block" style="margin-top:16px" data-go="family-families">শুরু করুন</button></div>'
    };
  };

  S['family-join'] = function () {
    return {
      bg: 'aurora',
      appbar: U.appbar({ back: true, title: 'পরিবারে যোগ দিন' }),
      body: '<div class="pad">' +
        '<div class="center rv" style="padding:14px 0"><div class="empty" style="padding:0">' +
          '<div class="ic breathe">' + ic('link') + '</div></div></div>' +
        '<p class="center lede rv" style="--i:1">আপনার পরিবারের কেউ আমন্ত্রণ পাঠিয়েছেন? কোডটি লিখুন।</p>' +
        '<div class="card rv" style="--i:2;margin-top:16px"><div class="card__body">' +
          U.field({ label: 'আমন্ত্রণ কোড', ph: 'SETU-FAM-0000' }) +
          '<button class="btn block" data-go="family-accepted">যোগ দিন</button>' +
        '</div></div>' +
        '<p class="center tiny muted" style="margin-top:14px">কোড নেই? পরিবারের সদস্যকে আবার পাঠাতে বলুন।</p></div>'
    };
  };

  S['family-accepted'] = function () {
    return {
      bg: 'hearts+love',
      appbar: U.appbar({ back: true, title: '' }),
      body: '<div class="pad center" style="padding-top:36px">' +
        '<div class="empty"><div class="ic" style="background:color-mix(in srgb,var(--ok) 16%,transparent);color:var(--ok)">' +
        ic('check') + '</div><h2>যোগ দেওয়া হয়েছে</h2>' +
        '<p class="muted">আপনি এখন রহমান পরিবারের একজন দর্শক।</p></div>' +
        '<button class="btn block" data-go="family-dashboard">পরিবার ড্যাশবোর্ডে যান</button></div>'
    };
  };

  /* ------------------------------------------------------------ behaviours */
  w.ACTIONS.propose = function () {
    U.sheet({
      title: 'সাক্ষাতের প্রস্তাব',
      body: U.field({ label: 'কোন পরিবার', type: 'select', opts: ['আফরিন পরিবার', 'হোসেন পরিবার'] }) +
        '<div class="row2">' + U.field({ label: 'তারিখ', type: 'date' }) + U.field({ label: 'সময়', type: 'time' }) + '</div>' +
        '<span class="label">ধরন</span>' +
        U.check('ভিডিও সাক্ষাৎ', true, true) + U.check('সরাসরি দেখা', false, true) +
        U.field({ label: 'নোট', type: 'textarea', ph: 'কারা থাকবেন, কতক্ষণ' }) +
        '<button class="btn block" style="margin-top:12px" data-close data-act="save">প্রস্তাব পাঠান</button>'
    });
  };
  w.ACTIONS.askq = function () {
    U.sheet({
      title: 'প্রশ্ন যোগ করুন',
      body: U.field({ label: 'প্রশ্ন', type: 'textarea', ph: 'যা জানতে চান' }) +
        U.sw(true, 'বেনামে জিজ্ঞেস করুন', 'কে জিজ্ঞেস করেছেন তা দেখানো হবে না') +
        '<button class="btn block" style="margin-top:12px" data-close data-act="save">পাঠান</button>'
    });
  };
  w.ACTIONS.answer = function (el) {
    U.sheet({
      title: 'উত্তর দিন',
      body: U.field({ type: 'textarea', ph: 'আপনার উত্তর' }) +
        '<button class="btn block" data-close data-act="save">জমা দিন</button>'
    });
  };
  w.ACTIONS.endconn = function () {
    U.dialog({
      title: 'পরিচয় পর্ব শেষ করবেন?',
      text: 'দুই পরিবারকেই জানানো হবে। কারণ জানানো বাধ্যতামূলক নয়।',
      icon: 'warn', okLabel: 'শেষ করুন'
    });
  };
})(window);
