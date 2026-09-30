/* ===========================================================================
   SheTu Mobile — the signed-in matrimony side
   =========================================================================== */
(function (w) {
  'use strict';
  var U = w.UI, D = w.DATA, S = w.SCREENS, ic = w.ic, esc = U.esc;

  /* ------------------------------------------------------------ dashboard */
  S.dashboard = S['member-dashboard'] = function () {
    return {
      mode: 'matri', bg: 'bokeh', tab: 'home', tabGroup: 'matri',
      appbar: U.appbar({
        left: '<button class="brandmark" data-go="landing"><span>সে</span></button>',
        title: 'আসসালামু আলাইকুম', sub: D.me.name,
        right: U.iconbtn('bell', { go: 'notifications', dot: true }) + U.iconbtn('moon', { act: 'theme' })
      }),
      body:
        '<div class="pad">' +
          /* completeness */
          '<div class="card rv sheen"><div class="card__body" style="display:flex;gap:14px;align-items:center">' +
            U.ring(D.me.complete, D.me.completeBn + '%') +
            '<div style="flex:1;min-width:0"><b style="color:var(--ink)">প্রোফাইল ' + D.me.completeBn + '% সম্পূর্ণ</b>' +
            '<p class="tiny muted" style="margin:4px 0 10px">ছবি ও পরিবারের তথ্য যোগ করলে ৩ গুণ বেশি আগ্রহ আসে।</p>' +
            '<button class="btn xs" data-go="profile-edit">সম্পূর্ণ করুন</button></div>' +
          '</div></div>' +

          '<div class="stats rv" style="--i:1;margin-top:12px">' +
            U.stat('২৪', 'আজ দেখেছে') + U.stat('৭', 'নতুন আগ্রহ') + U.stat('৩', 'বার্তা') +
          '</div>' +

          /* plan */
          '<div class="card tinted rv" style="--i:2;margin-top:12px"><div class="card__body" ' +
            'style="display:flex;gap:12px;align-items:center">' +
            '<span class="medal">' + ic('crown') + '</span>' +
            '<div style="flex:1"><b style="color:var(--ink)">' + esc(D.me.plan) + '</b>' +
            '<div class="tiny muted">' + D.me.planLeft + ' দিন বাকি</div>' + U.bar(62) + '</div>' +
            '<button class="btn xs ghost" data-go="plans">নবায়ন</button>' +
          '</div></div>' +

          /* quick actions */
          '<div class="quick rv" style="--i:3">' +
            [['search', 'খুঁজুন', 'search'], ['doc', 'বায়োডাটা', 'biodata'],
             ['shield', 'যাচাই', 'verification'], ['users', 'পরিবার', 'member-family'],
             ['bookmark', 'শর্টলিস্ট', 'shortlist'], ['sparkle', 'কানেক্ট', 'connect-deck']]
              .map(function (q, i) {
                return '<button class="quick__i" style="--i:' + i + '" data-go="' + q[2] + '">' +
                  '<span>' + ic(q[0]) + '</span>' + esc(q[1]) + '</button>';
              }).join('') +
          '</div>' +

          U.notice('আপনার এনআইডি যাচাই সম্পন্ন — প্রোফাইলে সবুজ টিক যোগ হয়েছে।', 'ok', 'shield') +

          U.sechead('আজকের মিল', 'সব দেখুন', 'search') +
        '</div>' +
        '<div class="rail">' + D.members.slice(0, 6).map(function (m, i) { return U.mcard(m, i); }).join('') + '</div>' +

        '<div class="pad">' +
          U.sechead('সাম্প্রতিক আগ্রহ', 'সব', 'requests') +
          '<div class="list rv">' + D.requests.filter(function (r) { return r.dir === 'in'; }).map(function (r) {
            return U.lrow({
              lead: U.avatar({ h: r.h, mono: r.mono }), title: esc(r.who),
              sub: r.kind + ' · ' + r.at, go: 'requests'
            });
          }).join('') + '</div>' +

          U.sechead('কে দেখেছে', null) +
          '<div class="card rv"><div class="card__body" style="display:flex;align-items:center;gap:12px">' +
            '<div class="av-stack">' + D.members.slice(0, 4).map(function (m) {
              return U.photo({ h: m.h, mono: m.mono, cls: 'av sm' });
            }).join('') + '</div>' +
            '<div style="flex:1"><b style="color:var(--ink)">২৪ জন</b>' +
            '<div class="tiny muted">গত ৭ দিনে আপনার প্রোফাইল দেখেছেন</div></div>' +
            '<button class="btn xs soft" data-act="soon">দেখুন</button>' +
          '</div></div>' +

          U.sechead('আজকের পরামর্শ', 'সব', 'tips') +
          '<button class="card press rv" style="width:100%;text-align:left" data-go="tip:t1">' +
            '<div class="card__body" style="display:flex;gap:12px;align-items:center">' +
            U.photo({ h: 1, mono: 'প', cls: 'av lg' }) +
            '<div><b style="color:var(--ink)">' + esc(D.tips[0].title) + '</b>' +
            '<div class="tiny muted">' + esc(D.tips[0].read) + '</div></div>' + ic('chev', 'chev') +
            '</div></button>' +
          '<div style="height:12px"></div>' +
        '</div>',
      after: '<button class="fab" data-act="help" aria-label="সহায়তা">' + ic('help') + '</button>'
    };
  };

  /* ------------------------------------------------------------ search */
  S.search = S['member-search'] = function () {
    return {
      mode: 'matri', tab: 'search', tabGroup: 'matri',
      appbar: U.appbar({
        title: 'খুঁজুন', sub: '১২,৪৮০ জন',
        right: U.iconbtn('sliders', { act: 'filter' }) + U.iconbtn('bookmark', { go: 'shortlist' })
      }),
      body:
        '<div class="pad" style="padding-top:2px">' + U.field({ icon: 'search', ph: 'নাম, পেশা, শহর' }) + '</div>' +
        '<div class="pad">' + U.chips(['সব', 'ভেরিফায়েড', 'নতুন', 'অনলাইন', 'ঢাকা', 'ডাক্তার', 'প্রবাসী'], 0, true) + '</div>' +
        '<div class="pad" style="display:flex;justify-content:space-between;align-items:center">' +
          '<span class="tiny muted">১২টি ফলাফল</span>' +
          '<button class="chip" data-act="sort">' + ic('sort') + ' সাজান</button></div>' +
        '<div class="pad"><div class="mgrid">' +
          D.members.map(function (m, i) { return U.mcard(m, i); }).join('') +
        '</div>' +
        '<button class="btn quiet block" style="margin:16px 0" data-act="more">আরও দেখুন</button></div>'
    };
  };

  S.shortlist = function () {
    return {
      tab: 'search', tabGroup: 'matri',
      appbar: U.appbar({ back: true, title: 'শর্টলিস্ট', sub: '৪ জন' }),
      body: '<div class="pad">' + U.seg(['শর্টলিস্ট', 'যারা আমাকে', 'লুকানো'], 0) +
        '<div data-panel style="margin-top:14px"><div class="mgrid">' +
          D.members.slice(0, 4).map(function (m, i) { return U.mcard(m, i); }).join('') + '</div></div>' +
        '<div data-panel hidden style="margin-top:14px"><div class="mgrid">' +
          D.members.slice(4, 8).map(function (m, i) { return U.mcard(m, i); }).join('') + '</div></div>' +
        '<div data-panel hidden style="margin-top:14px">' +
          U.empty('eyeOff', 'কাউকে লুকাননি', 'কোনো প্রোফাইল লুকালে সেটি এখানে থাকবে।') + '</div>' +
        '</div>'
    };
  };

  /* ------------------------------------------------------------ profile hub */
  S['profile-hub'] = function () {
    return {
      mode: 'matri', tab: 'me', tabGroup: 'matri',
      appbar: U.appbar({ title: 'আমার প্রোফাইল', right: U.iconbtn('settings', { go: 'settings' }) }),
      body:
        '<div class="pad">' +
          '<div class="card rv"><div class="card__body" style="display:flex;gap:14px;align-items:center">' +
            '<span class="av-ring">' + U.photo({ h: D.me.hue, mono: D.me.mono, cls: 'av xl' }) + '</span>' +
            '<div style="flex:1;min-width:0">' +
              '<h3>' + esc(D.me.name) + U.tick() + '</h3>' +
              '<div class="tiny muted">' + esc(D.me.id + ' · ' + D.me.job) + '</div>' +
              '<div class="chips" style="margin-top:8px">' + U.pill(D.me.plan, 'gold') + U.pill('সক্রিয়', 'ok') + '</div>' +
            '</div></div>' +
            '<div class="card__foot" style="display:flex;gap:8px">' +
              '<button class="btn xs ghost" style="flex:1" data-go="profile-preview">' + ic('eye') + ' প্রিভিউ</button>' +
              '<button class="btn xs" style="flex:1" data-go="profile-edit">' + ic('edit') + ' সম্পাদনা</button>' +
            '</div>' +
          '</div>' +

          '<div class="card rv" style="--i:1;margin-top:12px"><div class="card__body">' +
            '<div class="meter"><span class="tiny" style="color:var(--ink);min-width:90px">সম্পূর্ণতা</span>' +
            U.bar(D.me.complete) + '<b>' + D.me.completeBn + '%</b></div>' +
            '<div class="chips" style="margin-top:10px">' +
              U.pill('ছবি বাকি ২', 'warn') + U.pill('পরিবার বাকি', 'warn') + U.pill('মূল তথ্য ✓', 'ok') +
            '</div></div></div>' +

          U.sechead('প্রোফাইল', null) +
          '<div class="list rv">' +
            U.lrow({ title: 'মূল তথ্য', sub: 'বয়স, উচ্চতা, ধর্ম', icon: 'user', go: 'profile-edit' }) +
            U.lrow({ title: 'ছবি', sub: '৩টি যোগ করা', icon: 'image', go: 'photos' }) +
            U.lrow({ title: 'বায়োডাটা', sub: 'ছাপার উপযোগী শিট', icon: 'doc', go: 'biodata' }) +
            U.lrow({ title: 'পছন্দ', sub: 'কেমন সঙ্গী খুঁজছেন', icon: 'sliders', go: 'preferences' }) +
            U.lrow({ title: 'পরিবার', sub: 'অভিভাবক ও সদস্য', icon: 'users', go: 'member-family' }) +
          '</div>' +

          U.sechead('অ্যাকাউন্ট', null) +
          '<div class="list rv">' +
            U.lrow({ title: 'যাচাইকরণ', sub: 'এনআইডি ও সেলফি', icon: 'shield', go: 'verification', end: U.pill('সম্পন্ন', 'ok') }) +
            U.lrow({ title: 'গোপনীয়তা', sub: 'কে কী দেখবে', icon: 'lock', go: 'privacy' }) +
            U.lrow({ title: 'প্ল্যান ও বিল', sub: D.me.plan, icon: 'wallet', go: 'invoices' }) +
            U.lrow({ title: 'রেফারেল', sub: 'বন্ধুকে আনলে ১৫ দিন ফ্রি', icon: 'gift', go: 'referral' }) +
            U.lrow({ title: 'সেটিংস', icon: 'settings', go: 'settings' }) +
          '</div>' +
          '<button class="btn quiet block" style="margin:16px 0" data-act="signout">' + ic('logout') + ' সাইন আউট</button>' +
        '</div>'
    };
  };

  S['profile-preview'] = function () {
    var s = S.profile({ id: 'me' });
    s.appbar = U.appbar({ back: true, title: 'অন্যরা যেমন দেখে', right: U.iconbtn('edit', { go: 'profile-edit' }) });
    s.body = '<div class="pad" style="padding-top:8px">' +
      U.notice('এটি আপনার প্রোফাইলের সর্বসাধারণ রূপ। লুকানো ঘরগুলো ছায়া দিয়ে দেখানো হয়েছে।', null, 'eye') +
      '</div>' + s.body;
    return s;
  };

  S['profile-edit'] = function () {
    var groups = ['মূল', 'অবস্থান', 'শিক্ষা ও পেশা', 'পরিবার', 'জীবনযাপন'];
    return {
      appbar: U.appbar({ back: true, title: 'প্রোফাইল সম্পাদনা', right: '<button class="btn xs" data-act="save">সংরক্ষণ</button>' }),
      body:
        '<div class="ptabs">' + groups.map(function (g, i) {
          return '<button class="ptab' + (i === 0 ? ' is-on' : '') + '">' + esc(g) + '</button>';
        }).join('') + '</div>' +
        '<div class="pad" data-panel style="padding-top:14px">' +
          U.field({ label: 'পুরো নাম', val: D.me.name }) +
          '<div class="row2">' + U.field({ label: 'জন্মসাল', type: 'select', opts: ['২০০০', '১৯৯৯', '১৯৯৮'] }) +
            U.field({ label: 'উচ্চতা', type: 'select', opts: ['৫\'২"', '৫\'৪"', '৫\'৬"', '৫\'৮"'] }) + '</div>' +
          '<div class="row2">' + U.field({ label: 'বৈবাহিক', type: 'select', opts: ['অবিবাহিত', 'বিপত্নীক/বিধবা', 'তালাকপ্রাপ্ত'] }) +
            U.field({ label: 'ওজন', type: 'select', opts: ['৫০ কেজি', '৫৫ কেজি', '৬০ কেজি'] }) + '</div>' +
          U.field({ label: 'ধর্ম', type: 'select', opts: ['ইসলাম', 'হিন্দু', 'খ্রিস্টান', 'বৌদ্ধ'] }) +
          U.field({ label: 'নিজের কথায়', type: 'textarea', ph: 'তিন থেকে পাঁচ বাক্য', hint: 'যোগাযোগ নম্বর লিখবেন না — মডারেশনে আটকে যাবে।' }) +
        '</div>' +
        '<div class="pad" data-panel hidden style="padding-top:14px">' +
          U.field({ label: 'দেশ', type: 'select', opts: ['বাংলাদেশ', 'সৌদি আরব', 'মালয়েশিয়া', 'যুক্তরাজ্য'] }) +
          U.field({ label: 'বিভাগ', type: 'select', opts: ['ঢাকা', 'চট্টগ্রাম', 'সিলেট', 'রাজশাহী'] }) +
          U.field({ label: 'জেলা', type: 'select', opts: D.cities }) +
          U.field({ label: 'বর্তমান শহর', ph: 'যেখানে এখন আছেন' }) +
          U.sw(true, 'শহর দেখান', 'বন্ধ রাখলে শুধু বিভাগ দেখা যাবে') +
        '</div>' +
        '<div class="pad" data-panel hidden style="padding-top:14px">' +
          U.field({ label: 'সর্বোচ্চ শিক্ষা', type: 'select', opts: ['স্নাতক', 'স্নাতকোত্তর', 'পিএইচডি', 'এইচএসসি'] }) +
          U.field({ label: 'প্রতিষ্ঠান', ph: 'বিশ্ববিদ্যালয়ের নাম' }) +
          U.field({ label: 'পেশা', type: 'select', opts: D.professions }) +
          U.field({ label: 'প্রতিষ্ঠানের নাম', ph: 'ঐচ্ছিক' }) +
          U.field({ label: 'মাসিক আয়', type: 'select', opts: ['প্রকাশ করব না', '৩০-৫০ হাজার', '৫০-৮০ হাজার', '৮০+ হাজার'] }) +
        '</div>' +
        '<div class="pad" data-panel hidden style="padding-top:14px">' +
          U.field({ label: 'পিতার পেশা', ph: 'ঐচ্ছিক' }) +
          U.field({ label: 'মাতার পেশা', ph: 'ঐচ্ছিক' }) +
          '<div class="row2">' + U.field({ label: 'ভাই', type: 'select', opts: ['০', '১', '২', '৩+'] }) +
            U.field({ label: 'বোন', type: 'select', opts: ['০', '১', '২', '৩+'] }) + '</div>' +
          U.field({ label: 'পারিবারিক ধরন', type: 'select', opts: ['যৌথ', 'একক'] }) +
          U.field({ label: 'পারিবারিক অবস্থা', type: 'select', opts: ['মধ্যবিত্ত', 'উচ্চ মধ্যবিত্ত', 'সচ্ছল'] }) +
        '</div>' +
        '<div class="pad" data-panel hidden style="padding-top:14px">' +
          U.sw(true, 'নামাজ পড়ি', 'নিয়মিত') + U.sw(false, 'ধূমপান') + U.sw(false, 'দাড়ি রাখি') +
          U.field({ label: 'পর্দা', type: 'select', opts: ['হিজাব', 'নিকাব', 'পড়ি না'] }) +
          U.field({ label: 'শখ', ph: 'পড়া, রান্না, ভ্রমণ' }) +
        '</div>' +
        '<div class="pad"><button class="btn block" data-act="save">সংরক্ষণ করুন</button><div style="height:14px"></div></div>'
    };
  };

  S.photos = function () {
    return {
      appbar: U.appbar({ back: true, title: 'ছবি', sub: '৩ / ৮', right: U.iconbtn('help', { act: 'photoguide' }) }),
      body: '<div class="pad">' +
        U.notice('মুখ স্পষ্ট থাকতে হবে। দলগত ছবি, রোদচশমা বা খুব দূর থেকে তোলা ছবি বাদ দিন।', 'warn', 'camera') +
        '<div class="mgrid" style="margin-top:14px">' +
          [1, 2, 3].map(function (i) {
            return '<div class="mcard">' + U.photo({ h: i, mono: 'সে', alt: 'নমুনা ছবি ' + i }) +
              (i === 1 ? '<span class="pill brand" style="position:absolute;z-index:5;left:8px;top:8px">প্রধান</span>' : '') +
              '<span class="mcard__fav" data-act="soon">' + ic('dots') + '</span></div>';
          }).join('') +
          '<button class="mcard addphoto" data-act="soon"><span>' + ic('plus') + '<b>ছবি যোগ</b></span></button>' +
        '</div>' +
        U.sechead('ছবির দৃশ্যমানতা', null) +
        '<div class="card"><div class="card__body">' +
          U.check('সবাই দেখতে পাবে', false, true) +
          U.check('শুধু যাচাইকৃত সদস্য', true, true) +
          U.check('অনুমতি দিলে তবেই', false, true) +
          U.sw(true, 'ঝাপসা করে দেখান', 'অনুমতির আগে ছবি ঝাপসা থাকবে') +
        '</div></div></div>'
    };
  };

  S.preferences = function () {
    return {
      appbar: U.appbar({ back: true, title: 'সঙ্গীর পছন্দ', right: '<button class="btn xs" data-act="save">সংরক্ষণ</button>' }),
      body: '<div class="pad">' +
        '<span class="label">বয়স</span><div class="row2">' +
          U.field({ type: 'select', opts: ['২২', '২৪', '২৬'] }) + U.field({ type: 'select', opts: ['৩০', '৩২', '৩৫'] }) + '</div>' +
        '<span class="label">উচ্চতা</span><div class="row2">' +
          U.field({ type: 'select', opts: ['৫\'০"', '৫\'৪"'] }) + U.field({ type: 'select', opts: ['৫\'১০"', '৬\'০"'] }) + '</div>' +
        U.field({ label: 'ধর্ম', type: 'select', opts: ['ইসলাম', 'যেকোনো'] }) +
        U.field({ label: 'বৈবাহিক অবস্থা', type: 'select', opts: ['অবিবাহিত', 'যেকোনো'] }) +
        '<span class="label">জেলা (একাধিক)</span>' +
        '<div class="chips" data-chips data-multi="1" style="margin-bottom:14px">' +
          D.cities.map(function (c, i) { return '<button class="chip' + (i < 2 ? ' is-on' : '') + '">' + c + '</button>'; }).join('') + '</div>' +
        '<span class="label">পেশা (একাধিক)</span>' +
        '<div class="chips" data-chips data-multi="1" style="margin-bottom:14px">' +
          D.professions.map(function (c, i) { return '<button class="chip' + (i === 0 ? ' is-on' : '') + '">' + c + '</button>'; }).join('') + '</div>' +
        U.sw(true, 'শুধু যাচাইকৃত দেখান') + U.sw(false, 'প্রবাসী গ্রহণযোগ্য') +
        '<button class="btn block" style="margin-top:10px" data-act="save">সংরক্ষণ</button></div>'
    };
  };

  /* ------------------------------------------------------------ biodata */
  S.biodata = S['member-biodata'] = function () {
    return {
      appbar: U.appbar({
        back: true, title: 'বায়োডাটা',
        right: U.iconbtn('share', { act: 'share' }) + U.iconbtn('download', { act: 'soon' })
      }),
      body: '<div class="pad">' +
        U.seg(['শিট', 'পোস্টার', 'খসড়া'], 0) +
        '<div data-panel style="margin-top:14px">' +
          '<div class="sheetdoc rv">' +
            '<div class="crest">' + ic('ring2') + '</div>' +
            '<h2>বায়োডাটা</h2>' +
            '<p class="center tiny muted" style="margin-bottom:14px">সেতু · ' + esc(D.me.id) + '</p>' +
            '<dl class="facts">' +
              U.fact('নাম', D.me.name) + U.fact('বয়স', D.me.age + ' বছর') +
              U.fact('উচ্চতা', '৫ ফুট ৪ ইঞ্চি') + U.fact('ধর্ম', 'ইসলাম') +
              U.fact('শিক্ষা', 'বিএসসি, সিএসই') + U.fact('পেশা', D.me.job) +
              U.fact('জেলা', D.me.city) + U.fact('পিতা', 'নমুনা নাম') +
              U.fact('মাতা', 'নমুনা নাম') + U.fact('ভাইবোন', '১ ভাই, ১ বোন') +
              U.fact('যোগাযোগ', '', true) +
            '</dl>' +
          '</div>' +
          '<div class="btn-row" style="margin-top:14px">' +
            '<button class="btn ghost" data-go="biodata-poster">পোস্টার বানান</button>' +
            '<button class="btn" data-act="soon">' + ic('download') + ' পিডিএফ</button></div>' +
        '</div>' +
        '<div data-panel hidden style="margin-top:14px">' +
          '<div class="mgrid">' + ['নেভি', 'ম্যাগাজিন', 'নিমন্ত্রণ', 'টাইমলাইন', 'স্প্লিট', 'ক্লাসিক'].map(function (n, i) {
            return '<button class="mcard" data-go="biodata-poster">' +
              '<div class="ph" data-h="' + (i % 6 + 1) + '" style="aspect-ratio:3/4">' +
              '<span class="ph-mono">' + esc(n.slice(0, 1)) + '</span></div>' +
              '<span class="mcard__meta"><b>' + esc(n) + '</b></span></button>';
          }).join('') + '</div>' +
        '</div>' +
        '<div data-panel hidden style="margin-top:14px">' +
          '<div class="list">' +
            U.lrow({ title: 'খসড়া — এপ্রিল', sub: 'সর্বশেষ সম্পাদনা ৩ দিন আগে', icon: 'doc', act: 'soon' }) +
            U.lrow({ title: 'খসড়া — ইংরেজি', sub: 'সর্বশেষ সম্পাদনা ২ সপ্তাহ আগে', icon: 'doc', act: 'soon' }) +
          '</div>' +
          '<button class="btn quiet block" style="margin-top:12px" data-act="soon">' + ic('plus') + ' নতুন খসড়া</button>' +
        '</div></div>'
    };
  };

  S['biodata-poster'] = function () {
    return {
      bg: 'ribbons',
      appbar: U.appbar({ back: true, title: 'পোস্টার', right: U.iconbtn('download', { act: 'soon' }) }),
      body: '<div class="pad">' +
        '<div class="poster rv-scale">' +
          U.photo({ h: D.me.hue, mono: D.me.mono, cls: 'poster__img', alt: 'নমুনা ছবি' }) +
          '<div class="poster__body">' +
            '<p class="eyebrow">সেতু বায়োডাটা</p>' +
            '<h2>' + esc(D.me.name) + '</h2>' +
            '<p class="tiny muted">' + esc(D.me.age + ' · ' + D.me.job + ' · ' + D.me.city) + '</p>' +
            '<dl class="facts" style="margin-top:10px">' +
              U.fact('উচ্চতা', '৫\'৪"') + U.fact('শিক্ষা', 'বিএসসি') + U.fact('ধর্ম', 'ইসলাম') +
            '</dl>' +
          '</div>' +
        '</div>' +
        '<span class="label" style="margin-top:16px">রঙ</span>' +
        '<div class="chips" data-chips>' + ['নেভি', 'গোলাপ', 'সোনালি', 'সবুজ'].map(function (t, i) {
          return '<button class="chip' + (i === 0 ? ' is-on' : '') + '">' + t + '</button>';
        }).join('') + '</div>' +
        '<div class="btn-row" style="margin-top:16px">' +
          '<button class="btn ghost" data-act="share">শেয়ার</button>' +
          '<button class="btn" data-act="soon">ডাউনলোড</button></div></div>'
    };
  };

  /* ------------------------------------------------------------ mailbox */
  S.mailbox = S['member-mailbox'] = function () {
    return {
      mode: 'matri', tab: 'mailbox', tabGroup: 'matri',
      appbar: U.appbar({ title: 'বার্তা', sub: '২টি নতুন', right: U.iconbtn('search', { act: 'soon' }) }),
      body:
        '<div class="pad">' + U.seg(['সব', 'অনুরোধ', 'সংরক্ষিত'], 0) + '</div>' +
        '<div data-panel><div class="pad"><div class="list rv">' +
          D.threads.map(function (t) {
            return U.lrow({
              lead: U.avatar({ h: t.h, mono: t.mono, on: t.on }),
              title: esc(t.who), sub: esc(t.last), unread: !!t.unread,
              end: '<span style="text-align:right"><span class="tiny muted">' + esc(t.time) + '</span>' +
                (t.unread ? '<br><i class="badge" style="position:static;display:inline-grid">' + t.unread + '</i>' : '') + '</span>',
              go: 'thread:' + t.id, chev: false
            });
          }).join('') + '</div></div></div>' +
        '<div data-panel hidden><div class="pad">' +
          U.empty('inbox', 'অনুরোধ নেই', 'নতুন কেউ বার্তা পাঠালে এখানে দেখাবে।') + '</div></div>' +
        '<div data-panel hidden><div class="pad">' +
          U.empty('bookmark', 'সংরক্ষিত নেই', 'কোনো কথোপকথন সংরক্ষণ করলে এখানে থাকবে।') + '</div></div>'
    };
  };

  S.thread = function (p) {
    var t = D.threads.filter(function (x) { return x.id === p.id; })[0] || D.threads[0];
    return {
      appbar: U.appbar({
        back: true,
        left: '<button class="iconbtn" data-back>' + ic('back') + '</button>',
        title: t.who, sub: t.on ? 'অনলাইন' : 'সর্বশেষ ২ ঘণ্টা আগে',
        right: U.iconbtn('phone', { act: 'call' }) + U.iconbtn('video', { act: 'call' }) + U.iconbtn('dots', { act: 'threadmenu' })
      }),
      cls: 'is-chat',
      body:
        '<div class="thread">' +
          '<div class="daysep">আজ</div>' +
          D.chat.map(function (m, i) {
            return '<div class="bub ' + (m.me ? 'me' : 'them') + '" style="animation-delay:' + (i * 70) + 'ms">' +
              esc(m.t) + '<time>' + esc(m.at) + '</time></div>';
          }).join('') +
          '<div class="bub them typing" style="animation-delay:.5s"><i></i><i></i><i></i></div>' +
        '</div>',
      after:
        '<div class="composer">' +
          '<button class="iconbtn" data-act="soon">' + ic('paperclip') + '</button>' +
          '<input class="input" placeholder="বার্তা লিখুন…" data-msg>' +
          '<button class="iconbtn" data-act="soon">' + ic('emoji') + '</button>' +
          '<button class="send" data-act="send">' + ic('send') + '</button>' +
        '</div>'
    };
  };

  /* ------------------------------------------------------------ requests */
  S.requests = S['member-requests'] = function () {
    function rowsFor(dir) {
      var rows = D.requests.filter(function (r) { return r.dir === dir; });
      if (!rows.length) return U.empty('heart', 'কিছু নেই', 'এখানে কিছু এলে দেখাবে।');
      return '<div style="display:grid;gap:12px">' + rows.map(function (r, i) {
        return '<div class="card rv" style="--i:' + i + '"><div class="card__body" style="display:flex;gap:12px;align-items:center">' +
          U.avatar({ h: r.h, mono: r.mono, size: 'lg' }) +
          '<div style="flex:1;min-width:0"><b style="color:var(--ink)">' + esc(r.who) + '</b>' +
          '<div class="tiny muted">' + esc(r.kind + ' · ' + r.at) + '</div></div></div>' +
          '<div class="card__foot" style="display:flex;gap:8px">' +
            (dir === 'in'
              ? '<button class="btn xs quiet" style="flex:1" data-act="decline">ফিরিয়ে দিন</button>' +
                '<button class="btn xs" style="flex:1" data-act="accept">গ্রহণ করুন</button>'
              : '<button class="btn xs quiet" style="flex:1" data-act="soon">প্রত্যাহার</button>' +
                '<button class="btn xs ghost" style="flex:1" data-go="profile:m1">প্রোফাইল</button>') +
          '</div></div>';
      }).join('') + '</div>';
    }
    return {
      mode: 'matri', tab: 'requests', tabGroup: 'matri', bg: 'hearts',
      appbar: U.appbar({ title: 'আগ্রহ ও অনুরোধ', sub: '২টি নতুন' }),
      body: '<div class="pad">' + U.seg(['আমাকে পাঠানো', 'আমি পাঠিয়েছি', 'গৃহীত'], 0) +
        '<div data-panel style="margin-top:14px">' + rowsFor('in') + '</div>' +
        '<div data-panel hidden style="margin-top:14px">' + rowsFor('out') + '</div>' +
        '<div data-panel hidden style="margin-top:14px">' +
          U.empty('check', 'এখনো কিছু গৃহীত হয়নি', 'কেউ আপনার আগ্রহ গ্রহণ করলে এখানে দেখাবে।') + '</div>' +
        '</div>'
    };
  };

  /* ------------------------------------------------------------ notifications */
  S.notifications = S['member-notifications'] = function () {
    return {
      appbar: U.appbar({ back: true, title: 'নোটিফিকেশন', right: '<button class="btn xs quiet" data-act="notif-seen">সব পড়া</button>' }),
      body: '<div class="pad"><div class="list rv">' +
        D.notifications.map(function (n) {
          return U.lrow({ title: esc(n.t), sub: esc(n.at), icon: n.ic, unread: n.unread, act: 'soon' });
        }).join('') + '</div>' +
        '<p class="center tiny muted" style="padding:20px 0">৩০ দিনের পুরোনো নোটিফিকেশন মুছে যায়</p></div>'
    };
  };

  /* ------------------------------------------------------------ verification */
  S.verification = S['member-verification'] = function () {
    return {
      appbar: U.appbar({ back: true, title: 'যাচাইকরণ' }),
      body: '<div class="pad">' +
        '<div class="card rv"><div class="card__body center">' +
          '<div class="empty" style="padding:0 0 10px"><div class="ic" style="background:color-mix(in srgb,var(--ok) 16%,transparent);color:var(--ok)">' +
          ic('verified') + '</div></div>' +
          '<h3>আপনি যাচাইকৃত</h3>' +
          '<p class="tiny muted" style="margin-top:6px">আপনার প্রোফাইলে সবুজ টিক দেখানো হচ্ছে।</p>' +
        '</div></div>' +
        U.sechead('উপাদানসমূহ', null) +
        '<div class="list rv">' +
          U.lrow({ title: 'মোবাইল', sub: '+৮৮০ ১৭xx-xxxx১২', icon: 'phone', end: U.pill('সম্পন্ন', 'ok'), chev: false }) +
          U.lrow({ title: 'ইমেইল', sub: 'nusrat@example.com', icon: 'mail', end: U.pill('সম্পন্ন', 'ok'), chev: false }) +
          U.lrow({ title: 'পরিচয়পত্র', sub: 'এনআইডি', icon: 'doc', end: U.pill('সম্পন্ন', 'ok'), go: 'verification-document' }) +
          U.lrow({ title: 'সেলফি', sub: 'ছবির সাথে মিল', icon: 'camera', end: U.pill('সম্পন্ন', 'ok'), go: 'verification-selfie' }) +
          U.lrow({ title: 'পেশা', sub: 'অফিস আইডি বা নিয়োগপত্র', icon: 'briefcase', end: U.pill('বাকি', 'warn'), act: 'soon' }) +
          U.lrow({ title: 'শিক্ষা', sub: 'সনদ', icon: 'school', end: U.pill('বাকি', 'warn'), act: 'soon' }) +
        '</div>' +
        U.notice('যাচাইয়ের নথি কেবল আমাদের অপারেটর দেখেন, অন্য সদস্যরা কখনো নয়।', null, 'lock') +
        '</div>'
    };
  };

  S['verification-document'] = function () {
    return {
      appbar: U.appbar({ back: true, title: 'পরিচয়পত্র' }),
      body: '<div class="pad">' +
        '<div class="chips" data-chips style="margin-bottom:14px">' +
          ['এনআইডি', 'পাসপোর্ট', 'জন্ম নিবন্ধন', 'ড্রাইভিং'].map(function (t, i) {
            return '<button class="chip' + (i === 0 ? ' is-on' : '') + '">' + t + '</button>';
          }).join('') + '</div>' +
        '<div class="uploadbox rv" data-act="soon"><span>' + ic('upload') + '</span><b>সামনের দিক</b>' +
          '<span class="tiny muted">ছবি তুলুন বা ফাইল বাছুন</span></div>' +
        '<div class="uploadbox rv" style="--i:1;margin-top:12px" data-act="soon"><span>' + ic('upload') + '</span><b>পেছনের দিক</b>' +
          '<span class="tiny muted">ছবি তুলুন বা ফাইল বাছুন</span></div>' +
        U.field({ label: 'নম্বর', ph: '০০০০ ০০০০ ০০০', hint: 'নম্বরটি এনক্রিপ্ট করে রাখা হয়।' }) +
        U.notice('ছবির চারটি কোনা দেখা যেতে হবে, লেখা পড়া যেতে হবে।', 'warn', 'camera') +
        '<button class="btn block" style="margin-top:14px" data-go="verification-selfie">পরবর্তী — সেলফি</button></div>'
    };
  };

  S['verification-selfie'] = function () {
    return {
      appbar: U.appbar({ back: true, title: 'সেলফি যাচাই' }),
      body: '<div class="pad">' +
        '<div class="selfie rv-scale">' +
          '<div class="selfie__ring"></div>' +
          U.photo({ h: D.me.hue, mono: D.me.mono, cls: 'selfie__img' }) +
        '</div>' +
        '<p class="center lede rv" style="margin-top:16px">ক্যামেরার দিকে সরাসরি তাকান</p>' +
        '<p class="center tiny muted rv" style="--i:1">আলো মুখের ওপরে থাকুক, চশমা বা টুপি খুলে নিন।</p>' +
        '<div class="steps rv" style="--i:2;margin:20px 0">' +
          '<div class="step done"><b>ডানে তাকান</b><span>সম্পন্ন</span></div>' +
          '<div class="step now"><b>বামে তাকান</b><span>চলছে…</span></div>' +
          '<div class="step"><b>একবার হাসুন</b><span>বাকি</span></div>' +
        '</div>' +
        '<button class="btn block" data-act="verifdone">' + ic('camera') + ' ছবি তুলুন</button></div>'
    };
  };

  /* ------------------------------------------------------------ privacy */
  S.privacy = S['member-privacy'] = function () {
    return {
      appbar: U.appbar({ back: true, title: 'গোপনীয়তা' }),
      body: '<div class="pad">' +
        U.sechead('কে দেখতে পাবে', null) +
        '<div class="card"><div class="card__body">' +
          U.sw(true, 'প্রোফাইল সবার জন্য', 'বন্ধ করলে শুধু যাচাইকৃত সদস্য দেখবেন') +
          '<hr class="rule">' + U.sw(true, 'ছবি ঝাপসা রাখুন', 'অনুমতি দিলে তবেই স্পষ্ট হবে') +
          '<hr class="rule">' + U.sw(false, 'সার্চ ইঞ্জিনে দেখান', 'গুগলে প্রোফাইল আসবে কি না') +
          '<hr class="rule">' + U.sw(true, 'অনলাইন অবস্থা লুকান') +
          '<hr class="rule">' + U.sw(false, 'শেষ কবে এসেছেন দেখান') +
        '</div></div>' +
        U.sechead('যোগাযোগ', null) +
        '<div class="card"><div class="card__body">' +
          U.check('কেউ সরাসরি বার্তা পাঠাতে পারবে না', true, true) +
          U.check('শুধু আগ্রহ গ্রহণ করলে', false, true) +
          U.check('সবাই পাঠাতে পারবে', false, true) +
        '</div></div>' +
        U.sechead('লুকানো প্রোফাইল', null) +
        '<div class="list">' +
          U.lrow({ title: 'ইমরান হোসেন', sub: 'লুকানো ৩ দিন আগে', lead: U.avatar({ h: 3, mono: 'ই' }), end: '<button class="btn xs quiet">ফেরান</button>', chev: false }) +
        '</div>' +
        U.sechead('বিপজ্জনক এলাকা', null) +
        '<div class="list">' +
          U.lrow({ title: 'প্রোফাইল সাময়িক স্থগিত', sub: 'কেউ খুঁজে পাবে না', icon: 'pause', act: 'soon' }) +
          U.lrow({ title: 'অ্যাকাউন্ট বন্ধ করুন', sub: '৩০ দিনে সব তথ্য মুছে যাবে', icon: 'trash', act: 'closure' }) +
        '</div><div style="height:16px"></div></div>'
    };
  };

  /* ------------------------------------------------------------ settings */
  S.settings = S['member-settings'] = function () {
    return {
      appbar: U.appbar({ back: true, title: 'সেটিংস' }),
      body: '<div class="pad">' +
        U.sechead('অ্যাকাউন্ট', null) +
        '<div class="list">' +
          U.lrow({ title: 'ইমেইল', sub: D.me.email, icon: 'mail', act: 'soon' }) +
          U.lrow({ title: 'মোবাইল', sub: D.me.phone, icon: 'phone', act: 'soon' }) +
          U.lrow({ title: 'পাসওয়ার্ড বদলান', icon: 'lock', go: 'password-reset' }) +
          U.lrow({ title: 'ভাষা', sub: 'বাংলা', icon: 'globe', act: 'lang' }) +
        '</div>' +
        U.sechead('চেহারা', null) +
        '<div class="card"><div class="card__body">' +
          '<span class="label">থিম</span>' + U.seg(['স্বয়ংক্রিয়', 'দিন', 'রাত'], 0, 'theme') +
          '<div style="height:12px"></div>' +
          '<span class="label">পণ্য</span>' +
          '<div class="btn-row">' +
            '<button class="btn xs ghost" data-act="mode-matri">ম্যাট্রিমনি</button>' +
            '<button class="btn xs ghost" data-act="mode-connect">কানেক্ট</button></div>' +
        '</div></div>' +
        U.sechead('নোটিফিকেশন', null) +
        '<div class="card"><div class="card__body">' +
          U.sw(true, 'নতুন আগ্রহ') + '<hr class="rule">' +
          U.sw(true, 'নতুন বার্তা') + '<hr class="rule">' +
          U.sw(false, 'সাপ্তাহিক মিলের ইমেইল') + '<hr class="rule">' +
          U.sw(false, 'অফার ও ছাড়') +
        '</div></div>' +
        U.sechead('অন্যান্য', null) +
        '<div class="list">' +
          U.lrow({ title: 'সহায়তা', icon: 'help', act: 'help' }) +
          U.lrow({ title: 'শর্তাবলি ও গোপনীয়তা', icon: 'doc', go: 'legal' }) +
          U.lrow({ title: 'সমস্যা জানান', icon: 'flag', go: 'problem' }) +
          U.lrow({ title: 'সব স্ক্রিন (ডেমো)', icon: 'grid', go: 'sitemap' }) +
        '</div>' +
        '<button class="btn quiet block" style="margin:16px 0" data-act="signout">' + ic('logout') + ' সাইন আউট</button>' +
        '<p class="center tiny muted">সেতু মোবাইল · সংস্করণ ১.০ ডেমো</p><div style="height:16px"></div></div>'
    };
  };

  S.referral = S['member-referral'] = function () {
    return {
      bg: 'bokeh',
      appbar: U.appbar({ back: true, title: 'রেফারেল' }),
      body: '<div class="pad">' +
        '<div class="card tinted rv"><div class="card__body center">' +
          '<div class="empty" style="padding:0 0 8px"><div class="ic wiggle">' + ic('gift') + '</div></div>' +
          '<h3>বন্ধুকে আনুন, ১৫ দিন পান</h3>' +
          '<p class="tiny muted" style="margin:6px 0 14px">আপনার লিংকে কেউ নিবন্ধন করলে দুজনেই ১৫ দিন ফ্রি।</p>' +
          '<div class="codebox"><code>NUSRAT26</code>' +
            '<button class="btn xs" data-act="share">' + ic('copy') + ' কপি</button></div>' +
        '</div></div>' +
        '<div class="stats rv" style="--i:1;margin-top:12px">' +
          U.stat('৪', 'আমন্ত্রিত') + U.stat('২', 'যোগ দিয়েছেন') + U.stat('৩০', 'দিন পেয়েছেন') + '</div>' +
        U.sechead('আপনার আমন্ত্রণ', null) +
        '<div class="list rv">' +
          U.lrow({ title: 'ফারহানা ইসলাম', sub: 'যোগ দিয়েছেন · ১৫ দিন পেয়েছেন', lead: U.avatar({ h: 2, mono: 'ফা' }), end: U.pill('সম্পন্ন', 'ok'), chev: false }) +
          U.lrow({ title: 'তাসনিম আক্তার', sub: 'যোগ দিয়েছেন · অপেক্ষমাণ', lead: U.avatar({ h: 5, mono: 'তা' }), end: U.pill('অপেক্ষা', 'warn'), chev: false }) +
        '</div></div>'
    };
  };

  /* ------------------------------------------------------------ billing */
  S.checkout = S['member-checkout'] = function () {
    return {
      appbar: U.appbar({ back: true, title: 'চেকআউট' }),
      body: '<div class="pad">' +
        '<div class="card rv"><div class="card__body">' +
          '<div style="display:flex;justify-content:space-between"><span>সেতু প্রিমিয়াম · ৬ মাস</span><b style="color:var(--ink)">৳২,৪৯০</b></div>' +
          '<hr class="rule" style="margin:10px 0">' +
          '<div style="display:flex;justify-content:space-between" class="tiny muted"><span>কুপন EID25</span><span>−৳৬২২</span></div>' +
          '<hr class="rule" style="margin:10px 0">' +
          '<div style="display:flex;justify-content:space-between"><b style="color:var(--ink)">মোট</b><b style="color:var(--ink);font-size:1.2rem">৳১,৮৬৮</b></div>' +
        '</div></div>' +
        U.sechead('পরিশোধের মাধ্যম', null) +
        '<div class="card"><div class="card__body">' +
          U.check('বিকাশ', true, true) + U.check('নগদ', false, true) +
          U.check('রকেট', false, true) + U.check('কার্ড (ভিসা / মাস্টার)', false, true) +
          U.check('ম্যানুয়াল — নিজে পাঠিয়ে প্রমাণ দিন', false, true) +
        '</div></div>' +
        U.notice('পেমেন্ট সফল হলে প্ল্যান সঙ্গে সঙ্গে চালু হবে।', 'ok', 'wallet') +
        '<button class="btn block lg" style="margin-top:16px" data-act="paid">৳১,৮৬৮ পরিশোধ করুন</button>' +
        '<button class="btn quiet block" style="margin-top:10px" data-go="pay-manual">ম্যানুয়াল পেমেন্ট</button></div>'
    };
  };

  S['pay-manual'] = function () {
    return {
      appbar: U.appbar({ back: true, title: 'ম্যানুয়াল পেমেন্ট' }),
      body: '<div class="pad">' +
        U.notice('নিচের নম্বরে সেন্ড মানি করুন, তারপর ট্রানজেকশন আইডি দিন। আমরা ২৪ ঘণ্টার মধ্যে যাচাই করব।', null, 'info') +
        '<div class="card rv" style="margin-top:12px"><div class="card__body">' +
          '<div class="fact"><dt>বিকাশ</dt><dd>০১৭xx-xxxxxx (পার্সোনাল)</dd></div>' +
          '<div class="fact"><dt>নগদ</dt><dd>০১৮xx-xxxxxx</dd></div>' +
          '<div class="fact" style="border:0"><dt>পরিমাণ</dt><dd>৳১,৮৬৮</dd></div>' +
        '</div></div>' +
        U.field({ label: 'যে নম্বর থেকে পাঠিয়েছেন', ph: '০১৭xx-xxxxxx' }) +
        U.field({ label: 'ট্রানজেকশন আইডি', ph: 'BKS0000XXXX' }) +
        '<div class="uploadbox" data-act="soon"><span>' + ic('image') + '</span><b>স্ক্রিনশট যোগ করুন</b>' +
          '<span class="tiny muted">ঐচ্ছিক</span></div>' +
        '<button class="btn block" style="margin-top:14px" data-act="save">প্রমাণ জমা দিন</button></div>'
    };
  };

  S.invoices = S['member-invoices'] = function () {
    return {
      appbar: U.appbar({ back: true, title: 'প্ল্যান ও বিল' }),
      body: '<div class="pad">' +
        '<div class="card tinted rv"><div class="card__body" style="display:flex;gap:12px;align-items:center">' +
          '<span class="medal">' + ic('crown') + '</span>' +
          '<div style="flex:1"><b style="color:var(--ink)">' + esc(D.me.plan) + '</b>' +
          '<div class="tiny muted">শেষ হবে ২৮ এপ্রিল ২০২৬</div>' + U.bar(62) + '</div>' +
          '<button class="btn xs" data-go="plans">নবায়ন</button></div></div>' +
        U.sechead('ইনভয়েস', null) +
        '<div class="list rv">' + D.invoices.map(function (v) {
          return U.lrow({
            title: esc(v.no), sub: esc(v.plan + ' · ' + v.at), icon: 'doc',
            end: '<span style="text-align:right"><b style="color:var(--ink)">৳' + esc(v.amt) + '</b><br>' +
              U.pill(v.state, v.state === 'পরিশোধিত' ? 'ok' : 'bad') + '</span>',
            act: 'soon', chev: false
          });
        }).join('') + '</div>' +
        '<button class="btn quiet block" style="margin-top:14px" data-act="soon">' + ic('download') + ' সব ইনভয়েস নামান</button></div>'
    };
  };

  /* ------------------------------------------------------------ family (member side) */
  S['member-family'] = function () {
    return {
      appbar: U.appbar({ back: true, title: 'পরিবার', right: U.iconbtn('plus', { act: 'invite' }) }),
      body: '<div class="pad">' +
        U.notice('পরিবারের সদস্যরা আপনার হয়ে কথা বলতে পারেন। কে কী দেখবে তা আপনিই ঠিক করবেন।', null, 'users') +
        U.sechead('সদস্যরা', null) +
        '<div class="list rv">' +
          U.lrow({ title: 'আম্মা', sub: 'অভিভাবক · সব দেখতে পারেন', lead: U.avatar({ h: 1, mono: 'আ' }), end: U.pill('সক্রিয়', 'ok'), go: 'family-members' }) +
          U.lrow({ title: 'বড় ভাই', sub: 'দর্শক · শুধু বায়োডাটা', lead: U.avatar({ h: 3, mono: 'ভা' }), end: U.pill('সক্রিয়', 'ok'), go: 'family-members' }) +
          U.lrow({ title: 'খালা', sub: 'আমন্ত্রণ পাঠানো হয়েছে', lead: U.avatar({ h: 5, mono: 'খা' }), end: U.pill('অপেক্ষা', 'warn'), act: 'soon' }) +
        '</div>' +
        U.sechead('সংযোগ', null) +
        '<div class="list rv">' +
          U.lrow({ title: 'পারিবারিক কক্ষ', sub: 'দুই পরিবারের আলাপ', icon: 'house', go: 'family-room' }) +
          U.lrow({ title: 'কার্যবিবরণী', sub: 'কে কী করেছেন', icon: 'list', go: 'family-log' }) +
          U.lrow({ title: 'পরিবার ড্যাশবোর্ড', sub: 'সম্পূর্ণ পরিবার মডিউল', icon: 'grid', go: 'family-dashboard' }) +
        '</div>' +
        '<button class="btn block" style="margin-top:16px" data-act="invite">' + ic('plus') + ' সদস্য আমন্ত্রণ করুন</button></div>'
    };
  };

  S['family-members'] = function () {
    return {
      appbar: U.appbar({ back: true, title: 'সদস্যের অনুমতি' }),
      body: '<div class="pad">' +
        '<div class="card rv"><div class="card__body" style="display:flex;gap:12px;align-items:center">' +
          U.avatar({ h: 1, mono: 'আ', size: 'lg' }) +
          '<div><b style="color:var(--ink)">আম্মা</b><div class="tiny muted">অভিভাবক · যোগ দিয়েছেন ৪ মাস আগে</div></div>' +
        '</div></div>' +
        U.sechead('কী দেখতে পারবেন', null) +
        '<div class="card"><div class="card__body">' +
          U.sw(true, 'বায়োডাটা') + '<hr class="rule">' + U.sw(true, 'আগ্রহ ও অনুরোধ') + '<hr class="rule">' +
          U.sw(false, 'বার্তা পড়া') + '<hr class="rule">' + U.sw(true, 'পরিচয় পর্বে অংশ নেওয়া') + '<hr class="rule">' +
          U.sw(false, 'আমার হয়ে বার্তা পাঠানো') +
        '</div></div>' +
        '<button class="btn danger block" style="margin-top:16px" data-act="soon">অ্যাকসেস বন্ধ করুন</button></div>'
    };
  };

  S['family-room'] = function () {
    return {
      appbar: U.appbar({ back: true, title: 'পারিবারিক কক্ষ', sub: '৫ জন', right: U.iconbtn('video', { act: 'call' }) }),
      cls: 'is-chat',
      body: '<div class="thread">' +
        '<div class="daysep">গতকাল</div>' +
        '<div class="bub them"><b class="tiny" style="display:block;opacity:.7">আম্মা</b>ছেলেটির পরিবার সম্পর্কে খোঁজ নিয়েছি, ভালো।<time>৮:১২</time></div>' +
        '<div class="bub them"><b class="tiny" style="display:block;opacity:.7">বড় ভাই</b>শুক্রবার একবার ভিডিওতে বসা যায়?<time>৮:৩০</time></div>' +
        '<div class="bub me">আমি শুক্রবার সন্ধ্যায় ফ্রি আছি।<time>৯:০২</time></div>' +
        '<div class="daysep">আজ</div>' +
        '<div class="bub them"><b class="tiny" style="display:block;opacity:.7">আম্মা</b>তাহলে শুক্রবার সাতটায় ঠিক থাকল।<time>১০:১৫</time></div>' +
        '</div>',
      after: '<div class="composer">' +
        '<button class="iconbtn" data-act="soon">' + ic('paperclip') + '</button>' +
        '<input class="input" placeholder="পরিবারকে লিখুন…" data-msg>' +
        '<button class="send" data-act="send">' + ic('send') + '</button></div>'
    };
  };

  S['family-log'] = function () {
    return {
      appbar: U.appbar({ back: true, title: 'কার্যবিবরণী' }),
      body: '<div class="pad"><div class="steps rv" style="margin-top:8px">' +
        [['আম্মা একটি প্রোফাইল শর্টলিস্ট করেছেন', 'আজ, ১০:২২', 'now'],
         ['বড় ভাই বায়োডাটা দেখেছেন', 'আজ, ৯:৪০', 'done'],
         ['আম্মা পরিচয় পর্বের প্রস্তাব দিয়েছেন', 'গতকাল', 'done'],
         ['আপনি খালাকে আমন্ত্রণ করেছেন', '৩ দিন আগে', 'done'],
         ['পরিবার সংযোগ শুরু হয়েছে', '৪ মাস আগে', 'done']]
          .map(function (l) {
            return '<div class="step ' + l[2] + '"><b>' + esc(l[0]) + '</b><span>' + esc(l[1]) + '</span></div>';
          }).join('') + '</div></div>'
    };
  };

  /* ------------------------------------------------------------ behaviours */
  w.ACTIONS.send = function (el) {
    var root = el.closest('.screen');
    var inp = U.$('[data-msg]', root);
    var txt = (inp && inp.value || '').trim();
    if (!txt) { inp && inp.focus(); return; }
    var thread = U.$('.thread', root);
    var typing = U.$('.typing', thread);
    var b = document.createElement('div');
    b.className = 'bub me';
    b.innerHTML = U.esc(txt) + '<time>এইমাত্র</time>';
    if (typing) thread.insertBefore(b, typing); else thread.appendChild(b);
    inp.value = '';
    var sc = U.$('.scroller', root) || thread.parentElement;
    sc.scrollTop = sc.scrollHeight;
    setTimeout(function () {
      var r = document.createElement('div');
      r.className = 'bub them';
      r.innerHTML = 'ধন্যবাদ, দেখে জানাচ্ছি ইনশাআল্লাহ।<time>এইমাত্র</time>';
      if (typing) thread.insertBefore(r, typing); else thread.appendChild(r);
      sc.scrollTop = sc.scrollHeight;
    }, 1400);
  };
  w.ACTIONS.call = function () {
    var host = U.$('.device');
    var el = document.createElement('div');
    el.className = 'call';
    el.innerHTML =
      '<div style="text-align:center;padding-top:20px">' +
        '<span class="av-ring breathe">' + U.photo({ h: 1, mono: 'তা', cls: 'av xl' }) + '</span>' +
        '<h2 style="color:inherit;margin-top:14px">তানভীর রহমান</h2>' +
        '<p style="opacity:.8">সংযোগ হচ্ছে…</p></div>' +
      '<div class="dots">' +
        '<button class="callbtn">' + ic('mic') + '</button>' +
        '<button class="callbtn">' + ic('video') + '</button>' +
        '<button class="callbtn end" data-endcall>' + ic('phone') + '</button>' +
      '</div>';
    host.appendChild(el);
    U.wire(el);
    el.querySelector('[data-endcall]').addEventListener('click', function () {
      el.style.animation = 'fade-out .24s ease forwards';
      setTimeout(function () { el.remove(); }, 260);
    });
  };
  w.ACTIONS.accept = function (el) {
    var card = el.closest('.card');
    card.style.transition = 'transform .3s var(--e-in), opacity .3s ease';
    card.style.transform = 'translateX(40px)'; card.style.opacity = '0';
    setTimeout(function () { card.remove(); }, 320);
    U.confetti(); U.toast('গ্রহণ করা হয়েছে', 'check');
  };
  w.ACTIONS.decline = function (el) {
    var card = el.closest('.card');
    card.style.transition = 'transform .3s var(--e-in), opacity .3s ease';
    card.style.transform = 'translateX(-40px)'; card.style.opacity = '0';
    setTimeout(function () { card.remove(); }, 320);
    U.toast('ফিরিয়ে দেওয়া হয়েছে', 'close');
  };
  w.ACTIONS.paid = function () {
    U.confetti();
    U.dialog({ title: 'পেমেন্ট সফল', text: 'সেতু প্রিমিয়াম চালু হয়েছে — ১৮০ দিনের জন্য।', icon: 'check', cancel: false, okLabel: 'চমৎকার' });
  };
  w.ACTIONS.verifdone = function () {
    U.confetti();
    U.dialog({ title: 'জমা হয়েছে', text: 'আমাদের অপারেটর ২৪ ঘণ্টার মধ্যে দেখে জানাবেন।', icon: 'shield', cancel: false });
  };
  w.ACTIONS.invite = function () {
    U.sheet({
      title: 'সদস্য আমন্ত্রণ',
      body: U.field({ label: 'নাম', ph: 'সম্পর্ক বা নাম' }) +
        U.field({ label: 'মোবাইল', icon: 'phone', ph: '০১৭xx-xxxxxx' }) +
        '<span class="label">ভূমিকা</span>' +
        U.check('অভিভাবক — সব দেখতে ও কথা বলতে পারবেন', true, true) +
        U.check('দর্শক — শুধু বায়োডাটা দেখবেন', false, true) +
        '<button class="btn block" style="margin-top:14px" data-close data-act="save">আমন্ত্রণ পাঠান</button>'
    });
  };
  w.ACTIONS.closure = function () {
    U.dialog({
      title: 'অ্যাকাউন্ট বন্ধ করবেন?',
      text: '৩০ দিনের মধ্যে প্রোফাইল, ছবি ও বার্তা স্থায়ীভাবে মুছে যাবে। এটি ফেরানো যায় না।',
      icon: 'warn', okLabel: 'বন্ধের অনুরোধ'
    });
  };
  w.ACTIONS.sort = function () {
    U.sheet({
      title: 'সাজান',
      body: '<div class="card flat"><div class="card__body">' +
        U.check('সর্বশেষ সক্রিয়', true, true) + U.check('নতুন সদস্য', false, true) +
        U.check('সবচেয়ে মিল', false, true) + U.check('বয়স — কম থেকে বেশি', false, true) +
        '</div></div><button class="btn block" style="margin-top:12px" data-close>প্রয়োগ</button>'
    });
  };
  w.ACTIONS.more = function (el) {
    el.classList.add('is-off');
    el.innerHTML = '<span class="spin" style="display:inline-block">' + ic('refresh') + '</span> লোড হচ্ছে…';
    setTimeout(function () {
      var grid = el.previousElementSibling;
      D.members.slice(0, 4).forEach(function (m, i) {
        grid.insertAdjacentHTML('beforeend', U.mcard(m, i));
      });
      U.wire(grid); U.reveal(grid);
      el.classList.remove('is-off');
      el.textContent = 'আরও দেখুন';
    }, 900);
  };
  w.ACTIONS.threadmenu = function () {
    U.sheet({
      title: 'কথোপকথন',
      body: '<div class="list">' +
        U.lrow({ title: 'প্রোফাইল দেখুন', icon: 'user', go: 'profile:m1' }) +
        U.lrow({ title: 'যোগাযোগ চান', icon: 'phone', act: 'soon' }) +
        U.lrow({ title: 'পরিবারকে দেখান', icon: 'users', act: 'soon' }) +
        U.lrow({ title: 'সংরক্ষণ করুন', icon: 'bookmark', act: 'save' }) +
        U.lrow({ title: 'রিপোর্ট করুন', icon: 'flag', act: 'soon' }) +
        U.lrow({ title: 'ব্লক করুন', icon: 'ban', act: 'soon' }) +
        '</div>'
    });
  };
  w.ACTIONS.photoguide = function () {
    U.sheet({
      title: 'ছবির নির্দেশিকা',
      body: '<div class="mgrid">' +
        [['ভালো', 'ok', 1], ['ভালো', 'ok', 2], ['বাদ', 'bad', 3], ['বাদ', 'bad', 5]].map(function (x, i) {
          return '<div class="mcard">' + U.photo({ h: x[2], mono: i < 2 ? '✓' : '✕' }) +
            '<span class="mcard__meta"><b>' + x[0] + '</b></span></div>';
        }).join('') + '</div>' +
        '<p class="tiny muted" style="margin-top:12px">মুখ স্পষ্ট, আলো সামনে, একা তোলা — এই তিনটিই যথেষ্ট।</p>'
    });
  };
})(window);
