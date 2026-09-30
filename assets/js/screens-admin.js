/* ===========================================================================
   SheTu Mobile — administration and the verification operator
   The panel keeps the same material; only the density changes, because these
   screens are read by someone working through a queue.
   =========================================================================== */
(function (w) {
  'use strict';
  var U = w.UI, D = w.DATA, S = w.SCREENS, ic = w.ic, esc = U.esc;

  function abar(title, sub, right) {
    return U.appbar({
      back: true, title: title, sub: sub,
      right: (right || '') + U.iconbtn('moon', { act: 'theme' })
    });
  }
  function queue(rows, opts) {
    opts = opts || {};
    return '<div style="display:grid;gap:10px">' + rows.map(function (r, i) {
      return '<div class="card rv" style="--i:' + i + '"><div class="card__body">' +
        '<div style="display:flex;gap:10px;align-items:flex-start">' +
          '<span class="lrow__ic">' + ic(opts.icon || 'doc') + '</span>' +
          '<div style="flex:1;min-width:0"><b style="color:var(--ink);display:block">' + r.head + '</b>' +
          '<span class="tiny muted">' + r.sub + '</span></div>' + (r.tag || '') +
        '</div></div>' +
        (opts.acts === false ? '' :
          '<div class="card__foot" style="display:flex;gap:8px">' +
            '<button class="btn xs quiet" style="flex:1" data-act="decline">' + esc(opts.no || 'বাতিল') + '</button>' +
            '<button class="btn xs" style="flex:1" data-act="accept">' + esc(opts.yes || 'অনুমোদন') + '</button>' +
          '</div>') +
        '</div>';
    }).join('') + '</div>';
  }

  /* ------------------------------------------------------------ dashboard */
  S['admin-dashboard'] = function () {
    return {
      mode: 'matri', tab: 'adash', tabGroup: 'admin', bg: 'ribbons',
      appbar: U.appbar({
        left: '<button class="brandmark" data-go="landing"><span>সে</span></button>',
        title: 'প্রশাসন', sub: 'অ্যাডমিন · রাফাত',
        right: U.iconbtn('bell', { dot: true, act: 'soon' }) + U.iconbtn('moon', { act: 'theme' })
      }),
      body: '<div class="pad">' +
        '<div class="stats two rv">' + D.adminStats.map(function (s) {
          return '<div class="stat"><b class="countup" data-to="' + esc(s.v) + '">' + esc(s.v) + '</b>' +
            '<span>' + esc(s.k) + '</span>' +
            '<div class="tiny" style="color:var(--ok);margin-top:2px">' + esc(s.d) + '</div></div>';
        }).join('') + '</div>' +

        '<div class="card rv" style="--i:1;margin-top:12px"><div class="card__body">' +
          '<div class="sechead" style="margin:0 0 10px"><h2 style="font-size:.98rem">গত ৭ দিনের নিবন্ধন</h2>' +
          '<span class="tiny muted">+১৮%</span></div>' +
          '<div class="spark">' + [38, 52, 44, 68, 59, 81, 74].map(function (v, i) {
            return '<i style="--h:' + v + '%;animation-delay:' + (i * 70) + 'ms"></i>';
          }).join('') + '</div>' +
        '</div></div>' +

        U.sechead('দ্রুত কাজ', null) +
        '<div class="quick rv">' +
          [['shield', 'মডারেশন ৩', 'admin-moderation'], ['verified', 'যাচাই ৪৭', 'admin-verifications'],
           ['wallet', 'পেমেন্ট ১', 'admin-payments'], ['flag', 'সমস্যা ২', 'admin-problems'],
           ['mail', 'মেইল', 'admin-mail'], ['menu', 'আরও', 'admin-more']]
            .map(function (q, i) {
              return '<button class="quick__i" style="--i:' + i + '" data-go="' + q[2] + '">' +
                '<span>' + ic(q[0]) + '</span>' + esc(q[1]) + '</button>';
            }).join('') + '</div>' +

        U.sechead('অপেক্ষমাণ', 'সব', 'admin-more') +
        '<div class="list rv">' +
          U.lrow({ title: 'মডারেশন সারি', sub: '৩টি আইটেম', icon: 'shield', end: U.pill('৩', 'warn'), go: 'admin-moderation' }) +
          U.lrow({ title: 'যাচাই সারি', sub: '৪৭টি কেস', icon: 'verified', end: U.pill('৪৭', 'warn'), go: 'admin-verifications' }) +
          U.lrow({ title: 'ম্যানুয়াল পেমেন্ট', sub: '১টি যাচাই বাকি', icon: 'wallet', end: U.pill('১', 'warn'), go: 'admin-payments' }) +
          U.lrow({ title: 'অ্যাকাউন্ট বন্ধের অনুরোধ', sub: '২টি', icon: 'trash', go: 'admin-closures' }) +
        '</div>' +
        U.sechead('সাম্প্রতিক সদস্য', 'সব', 'admin-members') +
        '<div class="list rv">' + D.adminMembers.slice(0, 4).map(function (m) {
          return U.lrow({
            title: esc(m.name), sub: esc(m.id + ' · ' + m.plan),
            lead: U.avatar({ h: 1, mono: m.name.slice(0, 1) }),
            end: U.pill(m.state, m.state === 'সক্রিয়' ? 'ok' : m.state === 'স্থগিত' ? 'bad' : 'warn'),
            go: 'admin-member'
          });
        }).join('') + '</div><div style="height:14px"></div></div>'
    };
  };

  /* ------------------------------------------------------------ members */
  S['admin-members'] = function () {
    return {
      tab: 'amem', tabGroup: 'admin',
      appbar: U.appbar({ title: 'সদস্য', sub: '১২,৪৮০ জন', right: U.iconbtn('filter', { act: 'adminfilter' }) }),
      body: '<div class="pad" style="padding-top:2px">' + U.field({ icon: 'search', ph: 'আইডি, নাম, মোবাইল' }) + '</div>' +
        '<div class="pad">' + U.chips(['সব', 'সক্রিয়', 'অপেক্ষমাণ', 'স্থগিত', 'প্রিমিয়াম', 'যাচাইকৃত'], 0, true) + '</div>' +
        '<div class="pad"><div class="list rv">' + D.adminMembers.concat(D.adminMembers).map(function (m, i) {
          return U.lrow({
            title: esc(m.name), sub: esc(m.id + ' · ' + m.plan + ' · ' + m.at),
            lead: U.avatar({ h: (i % 6) + 1, mono: m.name.slice(0, 1) }),
            end: U.pill(m.state, m.state === 'সক্রিয়' ? 'ok' : m.state === 'স্থগিত' ? 'bad' : 'warn'),
            go: 'admin-member'
          });
        }).join('') + '</div>' +
        '<button class="btn quiet block" style="margin:14px 0" data-act="soon">আরও লোড করুন</button></div>'
    };
  };

  S['admin-member'] = function () {
    return {
      appbar: abar('নুসরাত জাহান', '#48213', U.iconbtn('dots', { act: 'membermenu' })),
      body: '<div class="pad">' +
        '<div class="card rv"><div class="card__body" style="display:flex;gap:12px;align-items:center">' +
          U.avatar({ h: 1, mono: 'নু', size: 'lg' }) +
          '<div style="flex:1"><b style="color:var(--ink)">নুসরাত জাহান' + U.tick() + '</b>' +
          '<div class="tiny muted">#48213 · যোগ দিয়েছেন ১২ মার্চ ২০২৬</div></div>' +
          U.pill('সক্রিয়', 'ok') + '</div></div>' +
        '<div class="ptabs" style="margin-top:12px">' +
          ['তথ্য', 'ছবি', 'কার্যকলাপ', 'পেমেন্ট', 'নোট'].map(function (t, i) {
            return '<button class="ptab' + (i === 0 ? ' is-on' : '') + '">' + t + '</button>';
          }).join('') + '</div>' +
        '<div data-panel style="padding-top:14px">' +
          '<dl class="facts">' + U.fact('নাম', 'নুসরাত জাহান') + U.fact('মোবাইল', '+৮৮০১৭xxxxxx১২') +
            U.fact('ইমেইল', 'nusrat@example.com') + U.fact('বয়স', '২৬') + U.fact('জেলা', 'ঢাকা') +
            U.fact('প্ল্যান', 'প্রিমিয়াম (১৮ দিন)') + U.fact('যাচাই', 'এনআইডি ✓ সেলফি ✓') +
            U.fact('সম্পূর্ণতা', '৭৮%') + '</dl>' +
          '<div class="btn-row" style="margin-top:14px">' +
            '<button class="btn ghost" data-act="soon">সম্পাদনা</button>' +
            '<button class="btn quiet" data-act="soon">প্ল্যান দিন</button></div>' +
          '<button class="btn danger block" style="margin-top:10px" data-act="suspend">স্থগিত করুন</button>' +
        '</div>' +
        '<div data-panel hidden style="padding-top:14px"><div class="mgrid">' +
          [1, 2, 3].map(function (i) {
            return '<div class="mcard">' + U.photo({ h: i, mono: 'সে' }) +
              '<span class="mcard__fav" data-act="soon">' + ic('dots') + '</span></div>';
          }).join('') + '</div></div>' +
        '<div data-panel hidden style="padding-top:14px"><div class="steps">' +
          [['সাইন ইন', 'আজ, ৯:৪১'], ['প্রোফাইল সম্পাদনা', 'গতকাল'], ['আগ্রহ পাঠিয়েছেন', '২ দিন আগে'],
           ['যাচাই সম্পন্ন', '৪ দিন আগে'], ['নিবন্ধন', '১২ মার্চ']]
            .map(function (l, i) {
              return '<div class="step ' + (i === 0 ? 'now' : 'done') + '"><b>' + esc(l[0]) + '</b><span>' + esc(l[1]) + '</span></div>';
            }).join('') + '</div></div>' +
        '<div data-panel hidden style="padding-top:14px"><div class="tbl-wrap"><table class="tbl">' +
          '<thead><tr><th>রেফ</th><th>পরিমাণ</th><th>অবস্থা</th></tr></thead><tbody>' +
          D.payments.map(function (p) {
            return '<tr><td>' + esc(p.ref) + '</td><td>৳' + esc(p.amt) + '</td><td>' +
              U.pill(p.state, p.state === 'গৃহীত' ? 'ok' : 'warn') + '</td></tr>';
          }).join('') + '</tbody></table></div></div>' +
        '<div data-panel hidden style="padding-top:14px">' +
          U.field({ type: 'textarea', ph: 'অভ্যন্তরীণ নোট (সদস্য দেখবেন না)' }) +
          '<button class="btn block" data-act="save">নোট যোগ করুন</button></div>' +
        '<div style="height:14px"></div></div>'
    };
  };

  S['admin-member-photos'] = function () {
    return {
      appbar: abar('ছবি মডারেশন', '#48213'),
      body: '<div class="pad"><div class="mgrid">' + [1, 2, 3, 4].map(function (i) {
        return '<div class="card"><div class="ph" data-h="' + i + '" style="aspect-ratio:3/4">' +
          '<span class="ph-mono">সে</span></div>' +
          '<div class="card__foot" style="display:flex;gap:6px">' +
            '<button class="btn xs quiet" style="flex:1" data-act="decline">বাদ</button>' +
            '<button class="btn xs" style="flex:1" data-act="accept">ঠিক</button></div></div>';
      }).join('') + '</div></div>'
    };
  };

  /* ------------------------------------------------------------ moderation */
  S['admin-moderation'] = function () {
    return {
      tab: 'amod', tabGroup: 'admin',
      appbar: U.appbar({ title: 'মডারেশন', sub: '৩টি অপেক্ষমাণ', right: U.iconbtn('filter', { act: 'adminfilter' }) }),
      body: '<div class="pad">' + U.seg(['সব', 'প্রোফাইল', 'ছবি', 'বার্তা'], 0) +
        '<div data-panel style="margin-top:14px">' + queue(D.moderation.map(function (m) {
          return {
            head: esc(m.kind + ' · ' + m.who), sub: esc(m.why + ' · ' + m.at),
            tag: U.pill('নতুন', 'warn')
          };
        }), { icon: 'shield', no: 'প্রত্যাখ্যান', yes: 'অনুমোদন' }) + '</div>' +
        '<div data-panel hidden style="margin-top:14px">' + U.empty('shield', 'কিছু নেই', 'এই সারি খালি।') + '</div>' +
        '<div data-panel hidden style="margin-top:14px">' +
          '<button class="btn quiet block" data-go="admin-member-photos">ছবি সারি খুলুন</button></div>' +
        '<div data-panel hidden style="margin-top:14px">' + U.empty('chat', 'কিছু নেই', 'এই সারি খালি।') + '</div>' +
        '<div class="btn-row" style="margin-top:14px">' +
          '<button class="btn quiet" data-act="soon">সব প্রত্যাখ্যান</button>' +
          '<button class="btn ghost" data-act="soon">সব অনুমোদন</button></div></div>'
    };
  };

  S['admin-words'] = function () {
    return {
      appbar: abar('নিষিদ্ধ শব্দ', D.words.length + 'টি'),
      body: '<div class="pad">' +
        '<div style="display:flex;gap:8px;margin-bottom:14px">' +
          '<input class="input" placeholder="নতুন শব্দ" style="flex:1">' +
          '<button class="btn" data-act="save">' + ic('plus') + '</button></div>' +
        '<div class="chips">' + D.words.map(function (x) {
          return '<span class="chip">' + esc(x) + ' <button data-act="soon">' + ic('close') + '</button></span>';
        }).join('') + '</div>' +
        U.notice('এই শব্দগুলো থাকলে বার্তা ও প্রোফাইল স্বয়ংক্রিয়ভাবে মডারেশনে যায়।', null, 'info') + '</div>'
    };
  };

  /* ------------------------------------------------------------ verification */
  S['admin-verifications'] = function () {
    return {
      appbar: abar('যাচাই সারি', '৪৭টি কেস'),
      body: '<div class="pad">' + U.chips(['নতুন', 'পর্যালোচনায়', 'তথ্য চাওয়া', 'সম্পন্ন'], 0, true) +
        queue(D.verifQueue.map(function (v) {
          return { head: esc(v.who), sub: esc(v.kind + ' · ' + v.at), tag: U.pill(v.state, 'warn') };
        }), { icon: 'verified', no: 'প্রত্যাখ্যান', yes: 'যাচাই করুন' }) +
        '<button class="btn quiet block" style="margin-top:14px" data-go="op-cases">অপারেটর প্যানেল খুলুন</button></div>'
    };
  };

  S['admin-verification'] = function () {
    return {
      appbar: abar('যাচাই — #48204', 'এনআইডি + সেলফি'),
      body: '<div class="pad">' +
        '<div class="mgrid rv">' +
          '<div class="card"><div class="ph" data-h="3" style="aspect-ratio:3/2"><span class="ph-mono">ID</span></div>' +
            '<div class="card__body tiny center muted">সামনের দিক</div></div>' +
          '<div class="card"><div class="ph" data-h="5" style="aspect-ratio:3/2"><span class="ph-mono">ID</span></div>' +
            '<div class="card__body tiny center muted">পেছনের দিক</div></div>' +
          '<div class="card"><div class="ph" data-h="1" style="aspect-ratio:1"><span class="ph-mono">সে</span></div>' +
            '<div class="card__body tiny center muted">সেলফি</div></div>' +
          '<div class="card"><div class="ph" data-h="2" style="aspect-ratio:1"><span class="ph-mono">প্র</span></div>' +
            '<div class="card__body tiny center muted">প্রোফাইল ছবি</div></div>' +
        '</div>' +
        '<dl class="facts rv" style="margin-top:14px">' +
          U.fact('নাম (নথিতে)', 'ইমরান হোসেন') + U.fact('নাম (প্রোফাইলে)', 'ইমরান হোসেন') +
          U.fact('জন্মতারিখ', '১২-০৪-১৯৯৫') + U.fact('নম্বর', '১৯৯৫xxxxxxx') +
        '</dl>' +
        '<span class="label" style="margin-top:14px">সিদ্ধান্ত</span>' +
        U.check('অনুমোদন — নাম ও মুখ মিলেছে', true, true) +
        U.check('তথ্য চাইব — ছবি অস্পষ্ট', false, true) +
        U.check('প্রত্যাখ্যান — নথি অবৈধ', false, true) +
        U.field({ label: 'নোট', type: 'textarea', ph: 'সদস্যকে যা জানানো হবে' }) +
        '<button class="btn block" data-act="accept">সিদ্ধান্ত জমা দিন</button><div style="height:14px"></div></div>'
    };
  };

  /* ------------------------------------------------------------ money */
  S['admin-payments'] = function () {
    return {
      tab: 'apay', tabGroup: 'admin',
      appbar: U.appbar({ title: 'পেমেন্ট', sub: 'এ মাসে ৳৮.২ লক্ষ', right: U.iconbtn('download', { act: 'soon' }) }),
      body: '<div class="pad">' +
        '<div class="stats rv">' + U.stat('৳৮.২ল', 'এ মাস') + U.stat('১৮৪', 'লেনদেন') + U.stat('১', 'যাচাই বাকি') + '</div>' +
        U.seg(['সব', 'যাচাই বাকি', 'গৃহীত', 'বাতিল'], 0) +
        '<div data-panel style="margin-top:14px"><div class="tbl-wrap card"><table class="tbl">' +
          '<thead><tr><th>রেফ</th><th>সদস্য</th><th>পরিমাণ</th><th>মাধ্যম</th><th>অবস্থা</th></tr></thead><tbody>' +
          D.payments.concat(D.payments).map(function (p) {
            return '<tr><td>' + esc(p.ref) + '</td><td>' + esc(p.who) + '</td><td>৳' + esc(p.amt) + '</td><td>' +
              esc(p.via) + '</td><td>' + U.pill(p.state, p.state === 'গৃহীত' ? 'ok' : 'warn') + '</td></tr>';
          }).join('') + '</tbody></table></div></div>' +
        '<div data-panel hidden style="margin-top:14px">' + queue([{
          head: 'BKS-99231 · #48213', sub: '৳২,৪৯০ · বিকাশ · প্রমাণ সংযুক্ত', tag: U.pill('যাচাই বাকি', 'warn')
        }], { icon: 'wallet', no: 'বাতিল', yes: 'গ্রহণ' }) + '</div>' +
        '<div data-panel hidden style="margin-top:14px">' + U.empty('check', 'সব ঠিক আছে', 'গৃহীত লেনদেন এখানে।') + '</div>' +
        '<div data-panel hidden style="margin-top:14px">' + U.empty('close', 'কিছু বাতিল হয়নি', '') + '</div>' +
        '<div style="height:14px"></div></div>'
    };
  };

  S['admin-pricing'] = function () {
    return {
      appbar: abar('মূল্য ও প্ল্যান', null, U.iconbtn('plus', { go: 'admin-pricing-edit' })),
      body: '<div class="pad">' + D.plans.map(function (p, i) {
        return '<div class="card rv" style="--i:' + i + ';margin-bottom:12px"><div class="card__body" ' +
          'style="display:flex;gap:10px;align-items:center">' +
          '<span class="medal">' + ic('crown') + '</span>' +
          '<div style="flex:1"><b style="color:var(--ink)">' + esc(p.name) + '</b>' +
          '<div class="tiny muted">৳' + esc(p.price) + ' ' + esc(p.per) + '</div></div>' +
          U.pill('সক্রিয়', 'ok') + '</div>' +
          '<div class="card__foot" style="display:flex;gap:8px">' +
            '<button class="btn xs quiet" style="flex:1" data-act="soon">আর্কাইভ</button>' +
            '<button class="btn xs" style="flex:1" data-go="admin-pricing-edit">সম্পাদনা</button></div></div>';
      }).join('') + '</div>'
    };
  };

  S['admin-pricing-edit'] = function () {
    return {
      appbar: abar('প্ল্যান সম্পাদনা', 'সেতু প্রিমিয়াম'),
      body: '<div class="pad">' +
        U.field({ label: 'নাম', val: 'সেতু প্রিমিয়াম' }) +
        '<div class="row2">' + U.field({ label: 'মূল্য (৳)', val: '২৪৯০' }) +
          U.field({ label: 'দিন', val: '১৮০' }) + '</div>' +
        '<div class="row2">' + U.field({ label: 'আগ্রহ / মাস', val: 'সীমাহীন' }) +
          U.field({ label: 'বার্তা / মাস', val: 'সীমাহীন' }) + '</div>' +
        U.sw(true, 'যোগাযোগ নম্বর দেখানো') + U.sw(true, 'পারিবারিক পরিচয় পর্ব') +
        U.sw(false, 'সবচেয়ে জনপ্রিয় ব্যাজ') +
        U.field({ label: 'সুবিধার তালিকা', type: 'textarea', val: 'সীমাহীন আগ্রহ\nসীমাহীন বার্তা\nযোগাযোগ নম্বর' }) +
        '<button class="btn block" data-act="save">সংরক্ষণ</button><div style="height:14px"></div></div>'
    };
  };

  S['admin-offers'] = function () {
    return {
      appbar: abar('অফার', null, U.iconbtn('plus', { act: 'soon' })),
      body: '<div class="pad"><div class="list rv">' + D.offers.map(function (o) {
        return U.lrow({
          title: esc(o.t), sub: esc(o.code + ' · ' + o.till), icon: 'gift',
          end: '<button class="sw' + (o.on ? ' is-on' : '') + '" data-sw></button>', chev: false
        });
      }).join('') + '</div>' +
      U.notice('সক্রিয় অফার ল্যান্ডিং পাতার টিকারে ঘুরতে থাকে।', null, 'info') + '</div>'
    };
  };

  S['admin-coupons'] = function () {
    return {
      appbar: abar('কুপন', null, U.iconbtn('plus', { go: 'admin-coupon-edit' })),
      body: '<div class="pad"><div class="tbl-wrap card rv"><table class="tbl">' +
        '<thead><tr><th>কোড</th><th>ছাড়</th><th>ব্যবহার</th><th></th></tr></thead><tbody>' +
        D.coupons.map(function (c) {
          return '<tr><td><b>' + esc(c.code) + '</b></td><td>' + esc(c.off) + '</td><td>' +
            esc(c.used + ' / ' + c.cap) + '</td><td>' + U.pill(c.on ? 'চালু' : 'বন্ধ', c.on ? 'ok' : 'bad') + '</td></tr>';
        }).join('') + '</tbody></table></div>' +
        '<button class="btn block" style="margin-top:14px" data-go="admin-coupon-edit">' + ic('plus') + ' নতুন কুপন</button></div>'
    };
  };

  S['admin-coupon-edit'] = function () {
    return {
      appbar: abar('কুপন সম্পাদনা'),
      body: '<div class="pad">' +
        U.field({ label: 'কোড', val: 'EID25' }) +
        '<div class="row2">' + U.field({ label: 'ছাড়', type: 'select', opts: ['শতকরা', 'নির্দিষ্ট টাকা', 'বাড়তি দিন'] }) +
          U.field({ label: 'মান', val: '২৫' }) + '</div>' +
        '<div class="row2">' + U.field({ label: 'শুরু', type: 'date' }) + U.field({ label: 'শেষ', type: 'date' }) + '</div>' +
        U.field({ label: 'সর্বোচ্চ ব্যবহার', val: '৫০০' }) +
        U.field({ label: 'কোন প্ল্যানে', type: 'select', opts: ['সব', 'প্লাস', 'প্রিমিয়াম'] }) +
        U.sw(true, 'চালু') +
        '<button class="btn block" data-act="save">সংরক্ষণ</button></div>'
    };
  };

  S['admin-fees'] = function () {
    return {
      appbar: abar('সাফল্য ফি'),
      body: '<div class="pad">' +
        U.notice('বিয়ে সম্পন্ন হলে স্বেচ্ছায় দেওয়া ফি — বাধ্যতামূলক নয়।', null, 'gift') +
        '<div class="list rv" style="margin-top:12px">' +
          U.lrow({ title: '#48213 ও #48210', sub: 'ঘোষণা ১২ মার্চ · ৳৫,০০০', icon: 'ring2', end: U.pill('নিশ্চিত', 'ok'), chev: false }) +
          U.lrow({ title: '#48187 ও #48199', sub: 'ঘোষণা ৪ মার্চ · অপেক্ষমাণ', icon: 'ring2', end: U.pill('অপেক্ষা', 'warn'), act: 'accept' }) +
        '</div></div>'
    };
  };

  S['admin-rewards'] = function () {
    return {
      appbar: abar('পুরস্কার ও রেফারেল', null, U.iconbtn('refresh', { act: 'soon' })),
      body: '<div class="pad">' +
        '<div class="stats rv">' + U.stat('৯২', 'রেফারেল') + U.stat('৪৮', 'দেওয়া') + U.stat('২', 'অপেক্ষমাণ') + '</div>' +
        '<div class="list rv" style="margin-top:12px">' + D.rewards.map(function (r) {
          return U.lrow({
            title: esc(r.who + ' · ' + r.kind), sub: esc(r.amt), icon: 'gift',
            end: U.pill(r.state, r.state === 'অপেক্ষমাণ' ? 'warn' : 'ok'), act: 'accept', chev: false
          });
        }).join('') + '</div>' +
        '<button class="btn quiet block" style="margin-top:14px" data-act="soon">রেফারেল নিয়ম বদলান</button></div>'
    };
  };

  /* ------------------------------------------------------------ mail */
  S['admin-mail'] = function () {
    return {
      appbar: abar('মেইল', null, U.iconbtn('plus', { go: 'admin-mail-compose' })),
      body: '<div class="pad">' + U.seg(['পাঠানো', 'খসড়া', 'টেমপ্লেট'], 0) +
        '<div data-panel style="margin-top:14px"><div class="list">' + D.adminMails.map(function (m) {
          return U.lrow({
            title: esc(m.sub), sub: esc(m.to + ' · ' + m.at), icon: 'mail',
            end: U.pill(m.state, m.state === 'পাঠানো' ? 'ok' : 'warn'), go: 'admin-mail-show'
          });
        }).join('') + '</div></div>' +
        '<div data-panel hidden style="margin-top:14px"><div class="list">' +
          U.lrow({ title: 'এপ্রিলের নতুন সদস্যদের স্বাগতম', sub: 'খসড়া', icon: 'doc', go: 'admin-mail-compose' }) +
        '</div></div>' +
        '<div data-panel hidden style="margin-top:14px"><div class="list">' +
          ['স্বাগতম', 'প্রোফাইল অসম্পূর্ণ', 'প্ল্যান শেষ হচ্ছে', 'যাচাই সম্পন্ন'].map(function (t) {
            return U.lrow({ title: t, sub: 'টেমপ্লেট', icon: 'doc', go: 'admin-mail-compose' });
          }).join('') + '</div></div>' +
        '<button class="btn block" style="margin-top:14px" data-go="admin-mail-compose">' + ic('plus') + ' নতুন মেইল</button></div>'
    };
  };

  S['admin-mail-compose'] = function () {
    return {
      appbar: abar('মেইল লিখুন', null, U.iconbtn('eye', { act: 'soon' })),
      body: '<div class="pad">' +
        U.field({ label: 'প্রাপক', type: 'select', opts: ['সবাই (১২,৪৮০)', 'নতুন সদস্য', 'প্রোফাইল অসম্পূর্ণ', 'প্ল্যান শেষ হচ্ছে', 'নির্দিষ্ট আইডি'] }) +
        U.field({ label: 'বিষয়', ph: 'মেইলের বিষয়' }) +
        U.field({ label: 'শিরোনাম', ph: 'বড় করে যা দেখাবে' }) +
        U.field({ label: 'মূল লেখা', type: 'textarea', ph: 'মেইলের বডি' }) +
        U.field({ label: 'বাটনের লেখা', ph: 'প্রোফাইল সম্পূর্ণ করুন' }) +
        U.field({ label: 'বাটনের লিংক', ph: '/member/profile' }) +
        U.sw(false, 'অফার সংযুক্ত করুন') +
        '<div class="btn-row" style="margin-top:8px">' +
          '<button class="btn quiet" data-act="save">খসড়া</button>' +
          '<button class="btn ghost" data-act="soon">নিজেকে পাঠান</button></div>' +
        '<button class="btn block" style="margin-top:10px" data-act="sendmail">পাঠান</button>' +
        '<div style="height:14px"></div></div>'
    };
  };

  S['admin-mail-show'] = function () {
    return {
      appbar: abar('ঈদ অফার ঘোষণা', 'পাঠানো গতকাল'),
      body: '<div class="pad">' +
        '<div class="stats rv">' + U.stat('১২,৪৮০', 'পাঠানো') + U.stat('৮,১২২', 'খোলা') + U.stat('১,৯০৪', 'ক্লিক') + '</div>' +
        '<div class="card rv" style="margin-top:12px"><div class="card__body">' +
          '<div class="center" style="padding:8px 0 14px">' +
            '<div class="brandmark" style="margin:0 auto"><span>সে</span></div></div>' +
          '<h3 class="center">ঈদ মোবারক</h3>' +
          '<p class="tiny muted center" style="margin:8px 0 14px">এই ঈদে সব প্ল্যানে ২৫% ছাড়। কোড EID25।</p>' +
          '<div class="center"><span class="btn xs">প্ল্যান দেখুন</span></div>' +
        '</div></div>' +
        '<button class="btn quiet block" style="margin-top:14px" data-go="admin-mail-compose">অনুরূপ মেইল লিখুন</button></div>'
    };
  };

  /* ------------------------------------------------------------ content */
  S['admin-stories'] = function () {
    return {
      appbar: abar('সফল গল্প', null, U.iconbtn('plus', { go: 'admin-story-edit' })),
      body: '<div class="pad"><div class="list rv">' + D.stories.map(function (s) {
        return U.lrow({
          title: esc(s.couple), sub: esc(s.city + ' · ' + s.year),
          lead: U.avatar({ h: s.h, mono: '❤' }), end: U.pill('প্রকাশিত', 'ok'), go: 'admin-story-edit'
        });
      }).join('') + '</div>' +
      '<button class="btn block" style="margin-top:14px" data-go="admin-story-edit">' + ic('plus') + ' নতুন গল্প</button></div>'
    };
  };

  S['admin-story-edit'] = function () {
    return {
      appbar: abar('গল্প সম্পাদনা'),
      body: '<div class="pad">' +
        U.field({ label: 'দম্পতির নাম', val: 'তানভীর ও সাদিয়া' }) +
        '<div class="row2">' + U.field({ label: 'শহর', type: 'select', opts: D.cities }) +
          U.field({ label: 'সাল', val: '২০২৫' }) + '</div>' +
        U.field({ label: 'উদ্ধৃতি', type: 'textarea', val: D.stories[0].quote }) +
        U.field({ label: 'পুরো লেখা', type: 'textarea', ph: 'বিস্তারিত গল্প' }) +
        '<div class="uploadbox" data-act="soon"><span>' + ic('image') + '</span><b>ছবি যোগ করুন</b>' +
          '<span class="tiny muted">নমুনা প্লেসহোল্ডার ব্যবহৃত হবে</span></div>' +
        U.sw(true, 'প্রকাশিত') + U.sw(false, 'ল্যান্ডিং পাতায় দেখান') +
        '<button class="btn block" data-act="save">সংরক্ষণ</button></div>'
    };
  };

  S['admin-tips'] = function () {
    return {
      appbar: abar('পরামর্শ', null, U.iconbtn('plus', { act: 'soon' })),
      body: '<div class="pad"><div class="list rv">' + D.tips.map(function (t) {
        return U.lrow({
          title: esc(t.title), sub: esc(t.cat + ' · ' + t.read), icon: 'book',
          end: U.pill('প্রকাশিত', 'ok'), act: 'soon'
        });
      }).join('') + '</div></div>'
    };
  };

  S['admin-hero'] = function () {
    return {
      appbar: abar('হিরো স্লাইড', null, U.iconbtn('plus', { act: 'soon' })),
      body: '<div class="pad"><div style="display:grid;gap:12px">' + D.heroSlides.map(function (h, i) {
        return '<div class="card rv" style="--i:' + i + '">' +
          '<div class="ph" data-h="' + h.h + '" style="aspect-ratio:16/9"><span class="ph-mono">সে</span>' +
          '<span class="ph-tag">' + esc(h.t) + '</span></div>' +
          '<div class="card__foot" style="display:flex;gap:8px;align-items:center">' +
            '<button class="sw' + (h.on ? ' is-on' : '') + '" data-sw></button>' +
            '<span class="tiny muted" style="flex:1">' + (h.on ? 'দেখানো হচ্ছে' : 'বন্ধ') + '</span>' +
            '<button class="btn xs quiet" data-act="soon">' + ic('sort') + '</button>' +
            '<button class="btn xs quiet" data-act="soon">' + ic('trash') + '</button></div></div>';
      }).join('') + '</div></div>'
    };
  };

  S['admin-appearance'] = function () {
    return {
      appbar: abar('চেহারা', 'থিম ও টাইপোগ্রাফি'),
      body: '<div class="pad">' +
        U.sechead('রঙের থিম', null) +
        '<div class="mgrid">' + [['আলতা লাল', 1], ['বোটানিক্যাল টিল', 4], ['সোনালি', 5], ['নেভি', 3]].map(function (t, i) {
          return '<button class="card press rv" style="--i:' + i + '">' +
            '<div class="ph" data-h="' + t[1] + '" style="aspect-ratio:16/10"><span class="ph-mono">Aa</span></div>' +
            '<div class="card__body tiny center">' + esc(t[0]) + (i === 0 ? ' ' + ic('check') : '') + '</div></button>';
        }).join('') + '</div>' +
        U.sechead('টাইপোগ্রাফি', null) +
        '<div class="card"><div class="card__body">' +
          U.field({ label: 'ফন্ট জোড়া', type: 'select', opts: ['Newsreader', 'Playfair Display ও Inter', 'Lora ও Source Sans'] }) +
          U.field({ label: 'মূল ফন্ট সাইজ', type: 'select', opts: ['১৪px', '১৫px', '১৬px'] }) +
          '<p style="font-family:var(--font-head);font-size:1.3rem;color:var(--ink);margin-top:10px">দুই পরিবারের মাঝে একটি সেতু</p>' +
          '<p class="tiny muted">The quick brown fox jumps over the lazy dog</p>' +
        '</div></div>' +
        U.sechead('পটভূমির অ্যানিমেশন', null) +
        '<div class="card"><div class="card__body">' +
          U.sw(true, 'বোকেহ (ল্যান্ডিং)') + '<hr class="rule">' +
          U.sw(true, 'অরোরা (সাইন ইন)') + '<hr class="rule">' +
          U.sw(true, 'হৃদয় (গল্প)') + '<hr class="rule">' +
          U.sw(false, 'রিবন সব পাতায়') +
        '</div></div>' +
        '<button class="btn block" style="margin-top:14px" data-act="save">প্রয়োগ করুন</button><div style="height:14px"></div></div>'
    };
  };

  S['admin-content'] = function () {
    return {
      appbar: abar('কনটেন্ট', 'সর্বসাধারণ পাতাগুলো'),
      body: '<div class="pad"><div class="list rv">' +
        [['ল্যান্ডিং শিরোনাম', 'home'], ['ম্যাট্রিমনি দরজা', 'matrimony'], ['কানেক্ট দরজা', 'dating'],
         ['আমাদের সম্পর্কে', 'about'], ['নিরাপত্তা', 'safety'], ['শর্তাবলি', 'legal'],
         ['প্রশ্নোত্তর', 'faq'], ['সাইন ইন পাতার বাণী', 'login']]
          .map(function (c) { return U.lrow({ title: c[0], sub: '/' + c[1], icon: 'doc', act: 'editcontent' }); }).join('') +
        '</div></div>'
    };
  };

  S['admin-seo'] = function () {
    return {
      appbar: abar('এসইও', null, U.iconbtn('refresh', { act: 'soon' })),
      body: '<div class="pad">' +
        U.field({ label: 'সাইটের শিরোনাম', val: 'সেতু — বিয়ের সন্ধান, পরিবারসহ' }) +
        U.field({ label: 'মেটা বিবরণ', type: 'textarea', val: 'যাচাই করা বায়োডাটা, পারিবারিক পরিচয় পর্ব ও সম্পূর্ণ গোপনীয়তা।' }) +
        U.field({ label: 'কীওয়ার্ড', ph: 'কমা দিয়ে' }) +
        U.sw(true, 'সাইটম্যাপ তৈরি করুন') + U.sw(true, 'প্রোফাইল ইনডেক্স হবে') + U.sw(false, 'রোবট বন্ধ করুন') +
        '<div class="card rv" style="margin-top:14px"><div class="card__body">' +
          '<p class="tiny" style="color:#1a0dab">সেতু — বিয়ের সন্ধান, পরিবারসহ</p>' +
          '<p class="tiny" style="color:var(--ok)">shetu.example</p>' +
          '<p class="tiny muted">যাচাই করা বায়োডাটা, পারিবারিক পরিচয় পর্ব ও সম্পূর্ণ গোপনীয়তা।</p>' +
        '</div></div>' +
        '<button class="btn block" style="margin-top:14px" data-act="save">সংরক্ষণ</button></div>'
    };
  };

  S['admin-porichoy'] = function () {
    return {
      appbar: abar('পরিচয় নমুনা', 'উদাহরণ বায়োডাটা'),
      body: '<div class="pad"><div class="list rv">' +
        ['নমুনা ১ — সম্পূর্ণ', 'নমুনা ২ — সংক্ষিপ্ত', 'নমুনা ৩ — প্রবাসী', 'নমুনা ৪ — ইংরেজি'].map(function (t) {
          return U.lrow({ title: t, sub: 'প্রকাশিত', icon: 'doc', act: 'soon' });
        }).join('') + '</div>' +
        '<button class="btn quiet block" style="margin-top:14px" data-act="soon">নমুনা রিসেট করুন</button></div>'
    };
  };

  S['admin-problems'] = function () {
    return {
      appbar: abar('সমস্যা রিপোর্ট', D.problems.length + 'টি'),
      body: '<div class="pad">' + U.chips(['খোলা', 'সমাধান', 'সব'], 0, true) +
        queue(D.problems.map(function (p) {
          return { head: esc(p.t), sub: esc(p.who + ' · ' + p.at), tag: U.pill(p.state, p.state === 'খোলা' ? 'warn' : 'ok') };
        }), { icon: 'flag', no: 'বন্ধ করুন', yes: 'সমাধান' }) + '</div>'
    };
  };

  S['admin-closures'] = function () {
    return {
      appbar: abar('অ্যাকাউন্ট বন্ধের অনুরোধ', '২টি'),
      body: '<div class="pad">' + queue([
        { head: '#48155 · রাফসান করিম', sub: 'কারণ: বিয়ে হয়ে গেছে · গতকাল', tag: U.pill('নতুন', 'warn') },
        { head: '#48099 · নাম গোপন', sub: 'কারণ: জানাতে চান না · ৩ দিন', tag: U.pill('নতুন', 'warn') }
      ], { icon: 'trash', no: 'ফিরিয়ে দিন', yes: 'বন্ধ করুন' }) +
      U.notice('অনুমোদনের ৩০ দিন পর সব তথ্য স্থায়ীভাবে মুছে যায়।', 'warn') + '</div>'
    };
  };

  S['admin-export'] = function () {
    return {
      appbar: abar('রপ্তানি'),
      body: '<div class="pad">' +
        U.field({ label: 'কী রপ্তানি করবেন', type: 'select', opts: ['সদস্য', 'পেমেন্ট', 'যাচাই', 'সমস্যা', 'রেফারেল'] }) +
        '<div class="row2">' + U.field({ label: 'থেকে', type: 'date' }) + U.field({ label: 'পর্যন্ত', type: 'date' }) + '</div>' +
        U.field({ label: 'ফরম্যাট', type: 'select', opts: ['CSV', 'XLSX', 'JSON'] }) +
        U.sw(false, 'ব্যক্তিগত তথ্য বাদ দিন', 'মোবাইল ও ইমেইল মাস্ক করা হবে') +
        '<button class="btn block" style="margin-top:12px" data-act="soon">' + ic('download') + ' রপ্তানি শুরু করুন</button>' +
        U.sechead('সাম্প্রতিক', null) +
        '<div class="list">' +
          U.lrow({ title: 'members-2026-03.csv', sub: '১.২ এমবি · ২ দিন আগে', icon: 'doc', act: 'soon' }) +
          U.lrow({ title: 'payments-2026-02.xlsx', sub: '০.৪ এমবি · ১ মাস আগে', icon: 'doc', act: 'soon' }) +
        '</div></div>'
    };
  };

  S['admin-messenger'] = function () {
    return {
      appbar: abar('মেসেঞ্জার তদারকি', 'রিপোর্ট হওয়া কথোপকথন'),
      body: '<div class="pad"><div class="list rv">' +
        [['#48210 ↔ #48204', 'নিষিদ্ধ শব্দ · ২ ঘণ্টা'], ['#48187 ↔ #48199', 'রিপোর্ট করা হয়েছে · গতকাল']]
          .map(function (t) { return U.lrow({ title: t[0], sub: t[1], icon: 'chat', act: 'soon' }); }).join('') +
        '</div>' + U.notice('বার্তা কেবল রিপোর্ট বা স্বয়ংক্রিয় চিহ্নিত হলেই দেখা যায়।', null, 'lock') + '</div>'
    };
  };

  S['admin-help'] = function () {
    return {
      appbar: abar('সহায়তা বট', 'প্রশ্ন ও উত্তর'),
      body: '<div class="pad">' +
        U.field({ label: 'বটের নাম', val: 'সেতু সহায়' }) +
        U.field({ label: 'স্বাগত বার্তা', type: 'textarea', val: 'আসসালামু আলাইকুম! কীভাবে সাহায্য করতে পারি?' }) +
        U.sechead('প্রশ্নোত্তর জোড়া', null) +
        '<div class="list">' + D.faq.slice(0, 3).map(function (f) {
          return U.lrow({ title: esc(f.q), sub: 'উত্তর সেট করা আছে', icon: 'help', act: 'soon' });
        }).join('') + '</div>' +
        '<button class="btn block" style="margin-top:14px" data-act="save">সংরক্ষণ</button></div>'
    };
  };

  S['admin-more'] = function () {
    var groups = [
      ['সদস্য ও নিরাপত্তা', [['admin-members', 'সদস্য', 'users'], ['admin-moderation', 'মডারেশন', 'shield'],
        ['admin-verifications', 'যাচাই সারি', 'verified'], ['admin-verification', 'যাচাই কেস', 'doc'],
        ['admin-words', 'নিষিদ্ধ শব্দ', 'ban'], ['admin-closures', 'বন্ধের অনুরোধ', 'trash'],
        ['admin-messenger', 'মেসেঞ্জার তদারকি', 'chat'], ['admin-problems', 'সমস্যা', 'flag']]],
      ['টাকা', [['admin-payments', 'পেমেন্ট', 'wallet'], ['admin-pricing', 'মূল্য', 'tag'],
        ['admin-offers', 'অফার', 'gift'], ['admin-coupons', 'কুপন', 'card'],
        ['admin-rewards', 'পুরস্কার', 'star'], ['admin-fees', 'সাফল্য ফি', 'ring2']]],
      ['কনটেন্ট', [['admin-stories', 'গল্প', 'heart'], ['admin-tips', 'পরামর্শ', 'book'],
        ['admin-hero', 'হিরো স্লাইড', 'image'], ['admin-content', 'পাতার লেখা', 'doc'],
        ['admin-porichoy', 'পরিচয় নমুনা', 'stack'], ['admin-seo', 'এসইও', 'trend']]],
      ['ব্যবস্থা', [['admin-mail', 'মেইল', 'mail'], ['admin-appearance', 'চেহারা', 'sun'],
        ['admin-export', 'রপ্তানি', 'download'], ['admin-help', 'সহায়তা বট', 'help'],
        ['op-cases', 'অপারেটর প্যানেল', 'tools'], ['sitemap', 'সব স্ক্রিন', 'grid']]]
    ];
    return {
      tab: 'amore', tabGroup: 'admin',
      appbar: U.appbar({ title: 'আরও', right: U.iconbtn('logout', { act: 'signout' }) }),
      body: '<div class="pad">' + groups.map(function (g, gi) {
        return U.sechead(g[0]) + '<div class="list rv" style="--i:' + gi + '">' +
          g[1].map(function (r) { return U.lrow({ title: r[1], icon: r[2], go: r[0] }); }).join('') + '</div>';
      }).join('') +
      '<button class="btn quiet block" style="margin:16px 0" data-act="signout">' + ic('logout') + ' সাইন আউট</button></div>'
    };
  };

  /* ------------------------------------------------------------ operator */
  S['op-cases'] = function () {
    return {
      appbar: U.appbar({
        left: '<button class="brandmark" data-go="landing"><span>সে</span></button>',
        title: 'অপারেটর', sub: 'যাচাই কেস · ৩টি',
        right: U.iconbtn('search', { go: 'op-search' }) + U.iconbtn('moon', { act: 'theme' })
      }),
      body: '<div class="pad">' +
        '<div class="stats rv">' + U.stat('৩', 'আমার সারি') + U.stat('৪৭', 'মোট') + U.stat('১২', 'আজ শেষ') + '</div>' +
        U.chips(['নতুন', 'পর্যালোচনায়', 'তথ্য চাওয়া', 'সব'], 0, true) +
        '<div class="list rv">' + D.opCases.map(function (c) {
          return U.lrow({
            title: esc(c.no + ' · ' + c.who), sub: esc(c.kind + ' · ' + c.age), icon: 'verified',
            end: U.pill(c.state, c.state === 'নতুন' ? 'warn' : 'brand'), go: 'op-case'
          });
        }).join('') + '</div>' +
        U.notice('একটি কেস খুললে সেটি ২০ মিনিটের জন্য আপনার নামে লক হয়।', null, 'clock') +
        '<button class="btn quiet block" style="margin-top:14px" data-act="signout">' + ic('logout') + ' সাইন আউট</button></div>'
    };
  };

  S['op-case'] = function () {
    var s = S['admin-verification']();
    s.appbar = U.appbar({ back: true, title: 'KYC-2291', sub: '#48204 · লক ১৯:৪২ পর্যন্ত', right: U.iconbtn('clock', { act: 'soon' }) });
    return s;
  };

  S['op-candidate'] = function () {
    return {
      appbar: abar('প্রার্থী যাচাই', '#48204'),
      body: '<div class="pad">' +
        '<div class="card rv"><div class="card__body" style="display:flex;gap:12px;align-items:center">' +
          U.avatar({ h: 3, mono: 'ইম', size: 'lg' }) +
          '<div style="flex:1"><b style="color:var(--ink)">ইমরান হোসেন</b>' +
          '<div class="tiny muted">#48204 · সিলেট</div></div>' + U.pill('অপেক্ষমাণ', 'warn') + '</div></div>' +
        '<dl class="facts rv" style="margin-top:14px">' +
          U.fact('প্রোফাইল খুলেছেন', 'পরিবার (বড় ভাই)') + U.fact('প্রার্থীর সম্মতি', 'অপেক্ষমাণ') +
          U.fact('মোবাইল যাচাই', 'সম্পন্ন') + U.fact('নথি', 'এনআইডি জমা') +
        '</dl>' +
        '<div class="btn-row" style="margin-top:16px">' +
          '<button class="btn quiet" data-act="soon">সম্মতি চান</button>' +
          '<button class="btn" data-act="accept">যাচাই করুন</button></div></div>'
    };
  };

  S['op-search'] = function () {
    return {
      appbar: abar('কেস খুঁজুন'),
      body: '<div class="pad">' +
        U.field({ icon: 'search', ph: 'কেস নম্বর, সদস্য আইডি, নথি নম্বর' }) +
        U.chips(['কেস', 'সদস্য', 'নথি'], 0, true) +
        '<div class="list rv">' + D.opCases.map(function (c) {
          return U.lrow({ title: esc(c.no), sub: esc(c.who + ' · ' + c.kind), icon: 'verified', go: 'op-case' });
        }).join('') + '</div></div>'
    };
  };

  /* ------------------------------------------------------------ behaviours */
  w.ACTIONS.adminfilter = function () {
    U.sheet({
      title: 'ফিল্টার',
      body: U.field({ label: 'অবস্থা', type: 'select', opts: ['সব', 'সক্রিয়', 'অপেক্ষমাণ', 'স্থগিত'] }) +
        U.field({ label: 'প্ল্যান', type: 'select', opts: ['সব', 'ফ্রি', 'প্লাস', 'প্রিমিয়াম'] }) +
        U.field({ label: 'জেলা', type: 'select', opts: ['সব'].concat(D.cities) }) +
        '<div class="row2">' + U.field({ label: 'থেকে', type: 'date' }) + U.field({ label: 'পর্যন্ত', type: 'date' }) + '</div>' +
        U.sw(true, 'শুধু যাচাইকৃত') +
        '<button class="btn block" style="margin-top:12px" data-close data-act="save">প্রয়োগ</button>'
    });
  };
  w.ACTIONS.membermenu = function () {
    U.sheet({
      title: 'সদস্য',
      body: '<div class="list">' +
        U.lrow({ title: 'ছবি মডারেশন', icon: 'image', go: 'admin-member-photos' }) +
        U.lrow({ title: 'প্ল্যান দিন', icon: 'crown', act: 'soon' }) +
        U.lrow({ title: 'পাসওয়ার্ড রিসেট মেইল', icon: 'key', act: 'soon' }) +
        U.lrow({ title: 'হিসেবে সাইন ইন', icon: 'user', act: 'soon' }) +
        U.lrow({ title: 'স্থগিত করুন', icon: 'pause', act: 'suspend' }) +
        U.lrow({ title: 'মুছে ফেলুন', icon: 'trash', act: 'suspend' }) +
        '</div>'
    });
  };
  w.ACTIONS.suspend = function () {
    U.dialog({
      title: 'নিশ্চিত?', text: 'এই কাজটি সদস্যকে জানানো হবে এবং কার্যবিবরণীতে লেখা থাকবে।',
      icon: 'warn', okLabel: 'করুন'
    });
  };
  w.ACTIONS.sendmail = function () {
    U.dialog({
      title: '১২,৪৮০ জনকে পাঠাবেন?', text: 'পাঠানো শুরু হলে থামানো যাবে না।',
      icon: 'mail', okLabel: 'পাঠান'
    });
  };
  w.ACTIONS.editcontent = function () {
    U.sheet({
      title: 'পাতার লেখা',
      body: U.field({ label: 'শিরোনাম', val: 'দুই পরিবারের মাঝে একটি সেতু' }) +
        U.field({ label: 'উপশিরোনাম', type: 'textarea', val: 'যাচাই করা প্রোফাইল, পরিবারকে সঙ্গে নিয়ে পরিচয়।' }) +
        '<button class="btn block" data-close data-act="save">সংরক্ষণ</button>'
    });
  };
})(window);
