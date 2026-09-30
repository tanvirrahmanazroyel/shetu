/* ===========================================================================
   SheTu Mobile — sign in, sign up, verification of the account itself
   The aurora sits behind every one of these, as it does on the web.
   =========================================================================== */
(function (w) {
  'use strict';
  var U = w.UI, D = w.DATA, S = w.SCREENS, ic = w.ic, esc = U.esc;

  function authShell(o) {
    return {
      bg: o.bg || 'aurora', cls: 'is-auth',
      appbar: U.appbar({
        back: o.back !== false, title: '',
        right: U.iconbtn('globe', { act: 'lang' }) + U.iconbtn('moon', { act: 'theme' }),
        transparent: true
      }),
      body:
        '<div class="pad authwrap">' +
          '<div class="authmark rv-scale">' + ic('ring2') + '</div>' +
          '<h1 class="rv" style="--i:1">' + esc(o.title) + '</h1>' +
          '<p class="lede rv" style="--i:2;margin:8px 0 20px">' + esc(o.sub) + '</p>' +
          '<div class="card rv" style="--i:3"><div class="card__body">' + o.form + '</div></div>' +
          (o.below || '') +
        '</div>'
    };
  }

  /* ------------------------------------------------------------ sign in */
  S.login = function () {
    return authShell({
      back: false,
      title: 'আবার স্বাগতম',
      sub: 'সেতুতে ফিরে আসার জন্য ধন্যবাদ।',
      form:
        U.field({ label: 'মোবাইল বা ইমেইল', icon: 'user', ph: '০১৭xx-xxxxxx' }) +
        '<label class="field"><span class="label">পাসওয়ার্ড</span>' +
          '<span class="field-icon">' + ic('lock') +
          '<input class="input" type="password" placeholder="••••••••" style="padding-right:44px">' +
          '<button class="iconbtn" data-act="peek" style="position:absolute;right:2px;top:50%;transform:translateY(-50%)">' +
          ic('eye') + '</button></span></label>' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin:2px 0 16px">' +
          U.check('মনে রাখুন', true) +
          '<button class="tiny" style="color:var(--brand)" data-go="password-request">পাসওয়ার্ড ভুলে গেছেন?</button>' +
        '</div>' +
        '<button class="btn block" data-act="signin">সাইন ইন</button>' +
        '<div class="orline"><span>অথবা</span></div>' +
        '<button class="btn quiet block" style="margin-bottom:8px" data-go="login-code">' + ic('key') + ' কোড দিয়ে সাইন ইন</button>' +
        '<button class="btn ghost block" data-act="soon">' + ic('globe') + ' গুগল দিয়ে চালিয়ে যান</button>',
      below:
        '<p class="center rv" style="--i:4;margin-top:18px">অ্যাকাউন্ট নেই? ' +
        '<button style="color:var(--brand);font-weight:600" data-go="register-1">নিবন্ধন করুন</button></p>' +
        '<p class="center tiny muted rv" style="--i:5;margin-top:18px">স্টাফ? ' +
        '<button style="color:var(--brand)" data-go="staff-login">এখানে সাইন ইন</button></p>'
    });
  };

  S['login-code'] = function () {
    return authShell({
      title: 'কোড দিয়ে সাইন ইন',
      sub: 'পাসওয়ার্ড লাগবে না — মোবাইলে একটি কোড পাঠাব।',
      form:
        U.field({ label: 'মোবাইল নম্বর', icon: 'phone', ph: '০১৭xx-xxxxxx' }) +
        '<button class="btn block" data-go="otp">কোড পাঠান</button>' +
        U.notice('প্রতি নম্বরে দিনে সর্বোচ্চ ৫ বার কোড পাঠানো যায়।', null, 'info')
    });
  };

  S.otp = function () {
    return authShell({
      title: 'কোডটি লিখুন',
      sub: '০১৭xx-xxxxxx নম্বরে ৬ সংখ্যার কোড পাঠানো হয়েছে।',
      form:
        '<div class="otp" data-otp>' + [0, 1, 2, 3, 4, 5].map(function (i) {
          return '<input class="otp__box" inputmode="numeric" maxlength="1" aria-label="সংখ্যা ' + (i + 1) + '">';
        }).join('') + '</div>' +
        '<button class="btn block" style="margin-top:16px" data-act="signin">নিশ্চিত করুন</button>' +
        '<p class="center tiny muted" style="margin-top:14px">কোড আসেনি? ' +
        '<button style="color:var(--brand)" data-act="resend">আবার পাঠান <span data-countdown>(৫৯)</span></button></p>'
    });
  };

  S['password-request'] = function () {
    return authShell({
      title: 'পাসওয়ার্ড ভুলে গেছেন?',
      sub: 'ইমেইল দিন, লিংক পাঠিয়ে দিচ্ছি।',
      form: U.field({ label: 'ইমেইল', icon: 'mail', ph: 'you@example.com' }) +
        '<button class="btn block" data-go="password-reset">লিংক পাঠান</button>'
    });
  };

  S['password-reset'] = function () {
    return authShell({
      title: 'নতুন পাসওয়ার্ড',
      sub: 'অন্তত ৮ অক্ষর, একটি সংখ্যা রাখুন।',
      form:
        U.field({ label: 'নতুন পাসওয়ার্ড', icon: 'lock', type: 'password', ph: '••••••••' }) +
        '<div class="meter" style="margin:-6px 0 14px">' + U.bar(72) + '<b>ভালো</b></div>' +
        U.field({ label: 'আবার লিখুন', icon: 'lock', type: 'password', ph: '••••••••' }) +
        '<button class="btn block" data-go="login">পাসওয়ার্ড বদলান</button>'
    });
  };

  S['verify-email'] = function () {
    return authShell({
      title: 'ইমেইল যাচাই করুন',
      sub: 'nusrat@example.com ঠিকানায় একটি লিংক পাঠানো হয়েছে।',
      form:
        '<div class="center" style="padding:6px 0 14px"><div class="empty" style="padding:0">' +
        '<div class="ic breathe">' + ic('mail') + '</div></div></div>' +
        '<button class="btn block" data-act="signin">যাচাই হয়েছে, এগোই</button>' +
        '<button class="btn ghost block" style="margin-top:10px" data-act="resend">আবার পাঠান</button>' +
        '<button class="btn quiet block" style="margin-top:10px" data-act="soon">ইমেইল বদলান</button>'
    });
  };

  /* ------------------------------------------------------------ sign up */
  S['register-1'] = function () {
    return authShell({
      title: 'অ্যাকাউন্ট খুলুন',
      sub: 'ধাপ ১ / ২ — পরিচয়ের প্রাথমিক তথ্য।',
      form:
        '<div class="stepper"><i class="on"></i><i></i></div>' +
        '<span class="label">প্রোফাইলটি কার জন্য</span>' +
        '<div class="chips" data-chips style="margin-bottom:14px">' +
          ['নিজের', 'ছেলের', 'মেয়ের', 'ভাই/বোনের', 'আত্মীয়ের'].map(function (t, i) {
            return '<button class="chip' + (i === 0 ? ' is-on' : '') + '">' + t + '</button>';
          }).join('') + '</div>' +
        U.field({ label: 'পুরো নাম', icon: 'user', ph: 'নাম লিখুন' }) +
        '<div class="row2">' +
          U.field({ label: 'লিঙ্গ', type: 'select', opts: ['নারী', 'পুরুষ'] }) +
          U.field({ label: 'জন্মসাল', type: 'select', opts: ['২০০৪', '২০০২', '২০০০', '১৯৯৮', '১৯৯৬'] }) +
        '</div>' +
        U.field({ label: 'মোবাইল', icon: 'phone', ph: '০১৭xx-xxxxxx' }) +
        U.field({ label: 'ইমেইল (ঐচ্ছিক)', icon: 'mail', ph: 'you@example.com' }) +
        '<button class="btn block" style="margin-top:6px" data-go="register-2">পরবর্তী ধাপ</button>',
      below: '<p class="center rv" style="--i:4;margin-top:18px">অ্যাকাউন্ট আছে? ' +
        '<button style="color:var(--brand);font-weight:600" data-go="login">সাইন ইন</button></p>'
    });
  };

  S['register-2'] = function () {
    return authShell({
      title: 'আর সামান্য',
      sub: 'ধাপ ২ / ২ — পাসওয়ার্ড ও সম্মতি।',
      form:
        '<div class="stepper"><i class="on"></i><i class="on"></i></div>' +
        U.field({ label: 'ধর্ম', type: 'select', opts: ['ইসলাম', 'হিন্দু', 'খ্রিস্টান', 'বৌদ্ধ', 'অন্যান্য'] }) +
        U.field({ label: 'জেলা', type: 'select', opts: D.cities }) +
        U.field({ label: 'পাসওয়ার্ড', icon: 'lock', type: 'password', ph: '••••••••' }) +
        '<div class="meter" style="margin:-6px 0 14px">' + U.bar(48) + '<b>মাঝারি</b></div>' +
        U.check('শর্তাবলি ও গোপনীয়তা নীতিতে সম্মত', false) +
        U.check('বিয়ের উদ্দেশ্যেই ব্যবহার করছি', false) +
        '<button class="btn block" style="margin-top:12px" data-go="otp">নিবন্ধন সম্পন্ন করুন</button>'
    });
  };

  S['staff-login'] = function () {
    return authShell({
      bg: 'ribbons',
      title: 'স্টাফ সাইন ইন',
      sub: 'প্রশাসন ও অপারেটর প্যানেল।',
      form:
        U.field({ label: 'স্টাফ আইডি', icon: 'user', ph: 'STF-0000' }) +
        U.field({ label: 'পাসওয়ার্ড', icon: 'lock', type: 'password', ph: '••••••••' }) +
        U.field({ label: 'দুই ধাপের কোড', icon: 'key', ph: '০০০ ০০০' }) +
        '<div class="btn-row" style="margin-top:6px">' +
          '<button class="btn ghost" data-go="op-cases">অপারেটর</button>' +
          '<button class="btn" data-go="admin-dashboard">প্রশাসন</button></div>'
    });
  };

  S['candidate-confirm'] = function () {
    return authShell({
      title: 'আপনার সম্মতি দরকার',
      sub: 'রহমান পরিবার আপনার হয়ে একটি প্রোফাইল খুলেছে।',
      form:
        '<div class="list" style="margin-bottom:14px">' +
          U.lrow({ lead: U.avatar({ h: 1, mono: 'র' }), title: 'রহমান পরিবার', sub: 'অভিভাবক — মা', chev: false }) +
        '</div>' +
        '<p class="tiny muted" style="margin-bottom:14px">সম্মতি দিলে প্রোফাইলটি সক্রিয় হবে এবং আপনি নিজেই ঠিক করতে পারবেন কী দেখানো হবে।</p>' +
        '<div class="btn-row">' +
          '<button class="btn ghost" data-go="candidate-rejected">না, আমি চাই না</button>' +
          '<button class="btn" data-go="candidate-confirmed">সম্মতি দিচ্ছি</button></div>'
    });
  };
  S['candidate-confirmed'] = function () {
    return authShell({
      title: 'ধন্যবাদ',
      sub: 'প্রোফাইলটি এখন সক্রিয়।',
      form: '<div class="center"><div class="empty" style="padding:6px 0 14px">' +
        '<div class="ic" style="background:color-mix(in srgb,var(--ok) 16%,transparent);color:var(--ok)">' + ic('check') + '</div></div>' +
        '<button class="btn block" data-act="signin">প্রোফাইলে যান</button></div>'
    });
  };
  S['candidate-rejected'] = function () {
    return authShell({
      title: 'বুঝেছি',
      sub: 'প্রোফাইলটি সরিয়ে ফেলা হয়েছে, পরিবারকে জানানো হয়েছে।',
      form: '<button class="btn block" data-go="landing">হোমে ফিরুন</button>'
    });
  };

  /* ------------------------------------------------------------ behaviours */
  w.ACTIONS.peek = function (el) {
    var inp = el.parentElement.querySelector('input');
    var on = inp.type === 'password';
    inp.type = on ? 'text' : 'password';
    el.innerHTML = w.ic(on ? 'eyeOff' : 'eye');
  };
  w.ACTIONS.resend = function () { U.toast('কোড আবার পাঠানো হয়েছে', 'send'); };

  /* The OTP boxes advance themselves, and paste fills the whole row. */
  w.SCREEN_HOOKS.otp = function (root) {
    var boxes = U.$$('.otp__box', root);
    boxes.forEach(function (b, i) {
      b.addEventListener('input', function () {
        b.value = b.value.replace(/\D/g, '').slice(0, 1);
        if (b.value && boxes[i + 1]) boxes[i + 1].focus();
        if (boxes.every(function (x) { return x.value; })) {
          U.$('.btn.block', root).classList.add('breathe');
        }
      });
      b.addEventListener('keydown', function (e) {
        if (e.key === 'Backspace' && !b.value && boxes[i - 1]) boxes[i - 1].focus();
      });
      b.addEventListener('paste', function (e) {
        var t = (e.clipboardData || w.clipboardData).getData('text').replace(/\D/g, '');
        if (!t) return;
        e.preventDefault();
        boxes.forEach(function (x, k) { x.value = t[k] || ''; });
        (boxes[Math.min(t.length, 5)] || boxes[5]).focus();
      });
    });
    if (boxes[0]) setTimeout(function () { boxes[0].focus(); }, 420);

    var cd = U.$('[data-countdown]', root), n = 59;
    if (cd) {
      var t = setInterval(function () {
        n--;
        if (n <= 0) { clearInterval(t); cd.textContent = ''; return; }
        cd.textContent = '(' + String(n).replace(/\d/g, function (c) { return '০১২৩৪৫৬৭৮৯'[+c]; }) + ')';
      }, 1000);
    }
  };
})(window);
