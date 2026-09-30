/* ===========================================================================
   SheTu Mobile — icon sprite
   One stroked set at 24px, drawn inline so the build has no image files and
   every glyph inherits currentColor through every theme.
   =========================================================================== */
(function (w) {
  'use strict';

  var P = {
    /* navigation */
    home:      '<path d="M3 10.5 12 3l9 7.5"/><path d="M5.5 9.5V20h13V9.5"/><path d="M9.5 20v-6h5v6"/>',
    search:    '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/>',
    heart:     '<path d="M12 20.3S3.5 14.4 3.5 8.9A4.9 4.9 0 0 1 12 5.6a4.9 4.9 0 0 1 8.5 3.3c0 5.5-8.5 11.4-8.5 11.4Z"/>',
    chat:      '<path d="M20.5 11.5c0 4.1-3.8 7.4-8.5 7.4a10 10 0 0 1-2.7-.36L4 21l1.3-3.7A7 7 0 0 1 3.5 11.5C3.5 7.4 7.3 4.1 12 4.1s8.5 3.3 8.5 7.4Z"/>',
    user:      '<circle cx="12" cy="8" r="3.6"/><path d="M4.8 20c.6-3.7 3.6-6 7.2-6s6.6 2.3 7.2 6"/>',
    grid:      '<rect x="3.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.6"/>',
    cards:     '<rect x="6" y="3.5" width="12" height="17" rx="2.4"/><path d="M3 7.5v9"/><path d="M21 7.5v9"/>',
    users:     '<circle cx="9" cy="8" r="3.2"/><path d="M3 19c.5-3.2 3-5.2 6-5.2s5.5 2 6 5.2"/><path d="M16 5.2a3.2 3.2 0 0 1 0 5.9"/><path d="M17.5 13.9c2.1.5 3.6 2.3 4 5.1"/>',
    bell:      '<path d="M18 9a6 6 0 1 0-12 0c0 5-2 6.2-2 6.2h16S18 14 18 9Z"/><path d="M13.7 19a2 2 0 0 1-3.4 0"/>',
    /* actions */
    back:      '<path d="M15 5 8 12l7 7"/>',
    chev:      '<path d="M9 5l7 7-7 7"/>',
    chevDown:  '<path d="M5 9l7 7 7-7"/>',
    close:     '<path d="M6 6 18 18M18 6 6 18"/>',
    plus:      '<path d="M12 5v14M5 12h14"/>',
    check:     '<path d="m5 12.5 4.5 4.5L19 7"/>',
    filter:    '<path d="M3.5 6h17M6.5 12h11M10 18h4"/>',
    sort:      '<path d="M7 4v16M7 20l-3-3M17 20V4M17 4l3 3"/>',
    send:      '<path d="M4.5 12 20 4.5 15 20l-3.4-5.6L4.5 12Z"/>',
    edit:      '<path d="M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17v3Z"/>',
    trash:     '<path d="M4.5 6.5h15M9.5 6.5V4.8h5v1.7M7 6.5 8 20h8l1-13.5"/>',
    share:     '<circle cx="17.5" cy="6" r="2.5"/><circle cx="6.5" cy="12" r="2.5"/><circle cx="17.5" cy="18" r="2.5"/><path d="m8.8 10.8 6.4-3.6M8.8 13.2l6.4 3.6"/>',
    download:  '<path d="M12 4v11M7.5 10.5 12 15l4.5-4.5"/><path d="M4.5 19.5h15"/>',
    upload:    '<path d="M12 19V8M7.5 12.5 12 8l4.5 4.5"/><path d="M4.5 20.5h15"/>',
    camera:    '<path d="M3.5 8.5h3.2L8.2 6h7.6l1.5 2.5h3.2v11H3.5Z"/><circle cx="12" cy="13.5" r="3.4"/>',
    image:     '<rect x="3.5" y="4.5" width="17" height="15" rx="2.2"/><circle cx="8.6" cy="9.6" r="1.6"/><path d="m4.5 17 4.6-4.6 3.4 3.4 2.6-2.4 4.4 4.1"/>',
    star:      '<path d="m12 4 2.5 5.1 5.6.8-4 3.9 1 5.6-5.1-2.7-5.1 2.7 1-5.6-4-3.9 5.6-.8Z"/>',
    bookmark:  '<path d="M6.5 4.5h11v15L12 16l-5.5 3.5Z"/>',
    eye:       '<path d="M2.8 12S6.4 6.2 12 6.2 21.2 12 21.2 12 17.6 17.8 12 17.8 2.8 12 2.8 12Z"/><circle cx="12" cy="12" r="3"/>',
    eyeOff:    '<path d="M4 4l16 16"/><path d="M9.6 9.7A3 3 0 0 0 12 15a3 3 0 0 0 2.4-1.2"/><path d="M6.4 6.8A11.4 11.4 0 0 0 2.8 12S6.4 17.8 12 17.8c1.4 0 2.6-.3 3.7-.8M18 15.3A11.6 11.6 0 0 0 21.2 12S17.6 6.2 12 6.2c-.6 0-1.1 0-1.6.1"/>',
    lock:      '<rect x="4.8" y="10.5" width="14.4" height="9.7" rx="2.2"/><path d="M8.2 10.5V8a3.8 3.8 0 0 1 7.6 0v2.5"/>',
    shield:    '<path d="M12 3.4 19 6v5.6c0 4.2-3 7.3-7 9-4-1.7-7-4.8-7-9V6Z"/><path d="m9 12 2.2 2.2L15.3 10"/>',
    key:       '<circle cx="8.4" cy="12" r="3.8"/><path d="M12.2 12H21M17.6 12v3M20 12v2.2"/>',
    mail:      '<rect x="3.2" y="5.4" width="17.6" height="13.2" rx="2.2"/><path d="m3.6 7.2 8.4 6 8.4-6"/>',
    phone:     '<path d="M6.2 3.6h3.4l1.6 4.2-2.1 1.6a12.4 12.4 0 0 0 5.5 5.5l1.6-2.1 4.2 1.6v3.4a2 2 0 0 1-2.2 2C11.2 19.2 4.8 12.8 4.2 5.8a2 2 0 0 1 2-2.2Z"/>',
    video:     '<rect x="3" y="6.5" width="12.6" height="11" rx="2.2"/><path d="m15.6 11 5.4-3v8l-5.4-3Z"/>',
    mic:       '<rect x="9.4" y="3.4" width="5.2" height="10.2" rx="2.6"/><path d="M6 11.6a6 6 0 0 0 12 0M12 17.6V21"/>',
    calendar:  '<rect x="3.6" y="5.2" width="16.8" height="15.2" rx="2.2"/><path d="M8 3v4M16 3v4M3.6 10h16.8"/>',
    clock:     '<circle cx="12" cy="12" r="8.4"/><path d="M12 7.4V12l3 2"/>',
    pin:       '<path d="M12 21s6.4-6 6.4-10.4a6.4 6.4 0 1 0-12.8 0C5.6 15 12 21 12 21Z"/><circle cx="12" cy="10.4" r="2.4"/>',
    globe:     '<circle cx="12" cy="12" r="8.4"/><path d="M3.6 12h16.8"/><path d="M12 3.6c2.4 2.5 3.6 5.4 3.6 8.4S14.4 18 12 20.4C9.6 18 8.4 15 8.4 12S9.6 6 12 3.6Z"/>',
    tag:       '<path d="M11.2 3.6 20.4 12.8 13.2 20 4 10.8V3.6Z"/><circle cx="8" cy="7.6" r="1.4"/>',
    gift:      '<rect x="3.6" y="9" width="16.8" height="11.4" rx="2"/><path d="M3.6 13.4h16.8M12 9v11.4"/><path d="M12 9S9.2 9 8 7.8a2.2 2.2 0 1 1 4-1.2 2.2 2.2 0 1 1 4 1.2C14.8 9 12 9 12 9Z"/>',
    wallet:    '<rect x="3.2" y="6" width="17.6" height="12.6" rx="2.4"/><path d="M3.2 10.2h17.6"/><circle cx="16.6" cy="14.4" r="1.3"/>',
    card:      '<rect x="3" y="6" width="18" height="12" rx="2.4"/><path d="M3 10h18"/>',
    doc:       '<path d="M6.2 3.6h7.4L18.6 8v12.4H6.2Z"/><path d="M13.4 3.8V8.2h4.8"/><path d="M9 13h6M9 16.4h4"/>',
    book:      '<path d="M4.4 4.6h5.2A2.4 2.4 0 0 1 12 7v13a2 2 0 0 0-2-1.6H4.4Z"/><path d="M19.6 4.6h-5.2A2.4 2.4 0 0 0 12 7v13a2 2 0 0 1 2-1.6h5.6Z"/>',
    settings:  '<circle cx="12" cy="12" r="3.1"/><path d="M19.2 14.2a1.6 1.6 0 0 0 .32 1.76l.06.06a1.94 1.94 0 1 1-2.74 2.74l-.06-.06a1.6 1.6 0 0 0-1.76-.32 1.6 1.6 0 0 0-.97 1.46v.17a1.94 1.94 0 0 1-3.88 0v-.09a1.6 1.6 0 0 0-1.05-1.46 1.6 1.6 0 0 0-1.76.32l-.06.06a1.94 1.94 0 1 1-2.74-2.74l.06-.06a1.6 1.6 0 0 0 .32-1.76 1.6 1.6 0 0 0-1.46-.97H3.3a1.94 1.94 0 0 1 0-3.88h.09a1.6 1.6 0 0 0 1.46-1.05 1.6 1.6 0 0 0-.32-1.76l-.06-.06A1.94 1.94 0 1 1 7.2 4.7l.06.06a1.6 1.6 0 0 0 1.76.32h.08A1.6 1.6 0 0 0 10.06 3.6v-.17a1.94 1.94 0 0 1 3.88 0v.09a1.6 1.6 0 0 0 .97 1.46 1.6 1.6 0 0 0 1.76-.32l.06-.06a1.94 1.94 0 1 1 2.74 2.74l-.06.06a1.6 1.6 0 0 0-.32 1.76v.08a1.6 1.6 0 0 0 1.46.97h.17a1.94 1.94 0 0 1 0 3.88h-.09a1.6 1.6 0 0 0-1.46.97Z"/>',
    sliders:   '<path d="M4 7h10M18 7h2M4 12h4M12 12h8M4 17h9M17 17h3"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="15" cy="17" r="2"/>',
    logout:    '<path d="M14.4 7.2V4.8H5.2v14.4h9.2v-2.4"/><path d="M10 12h9.6M17 9l3 3-3 3"/>',
    info:      '<circle cx="12" cy="12" r="8.4"/><path d="M12 11v5.2M12 8.1v.1"/>',
    warn:      '<path d="M12 4.2 21 19.4H3Z"/><path d="M12 10v4M12 16.6v.1"/>',
    help:      '<circle cx="12" cy="12" r="8.4"/><path d="M9.8 9.6a2.3 2.3 0 1 1 3.1 2.2c-.6.3-.9.9-.9 1.6v.3M12 16.8v.1"/>',
    sparkle:   '<path d="m12 3 1.8 4.9L18.7 9.7l-4.9 1.8L12 16.4l-1.8-4.9-4.9-1.8 4.9-1.8Z"/><path d="M18.4 15.2l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8Z"/>',
    flame:     '<path d="M12 20.4c3.2 0 5.6-2.2 5.6-5.2 0-4-4-5.4-3.2-9.6-2.6 1-4 3.2-4 5.4 0 1-.6 1.6-1.2 1.6-.8 0-1.2-.8-1.2-1.8-1.2 1.2-1.6 2.8-1.6 4.4 0 3 2.4 5.2 5.6 5.2Z"/>',
    crown:     '<path d="m3.6 7.4 3.2 3.2L12 5l5.2 5.6 3.2-3.2-1.6 11H5.2Z"/>',
    link:      '<path d="M10 13.6a3.6 3.6 0 0 0 5.2.3l2.6-2.6a3.7 3.7 0 0 0-5.2-5.2l-1.5 1.5"/><path d="M14 10.4a3.6 3.6 0 0 0-5.2-.3l-2.6 2.6a3.7 3.7 0 1 0 5.2 5.2l1.5-1.5"/>',
    copy:      '<rect x="8.4" y="8.4" width="11.2" height="11.2" rx="2"/><path d="M15.6 5.6H6a1.6 1.6 0 0 0-1.6 1.6v9.6"/>',
    refresh:   '<path d="M20 12a8 8 0 1 1-2.4-5.7"/><path d="M20 4v4.4h-4.4"/>',
    moon:      '<path d="M20 14.4A8.4 8.4 0 0 1 9.6 4 8.6 8.6 0 1 0 20 14.4Z"/>',
    sun:       '<circle cx="12" cy="12" r="4.2"/><path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4 17 7M7 17l-1.6 1.6"/>',
    menu:      '<path d="M4 7h16M4 12h16M4 17h16"/>',
    dots:      '<circle cx="12" cy="5.4" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="18.6" r="1.5"/>',
    stack:     '<path d="m12 3.6 8.4 4.2L12 12 3.6 7.8Z"/><path d="m3.6 12 8.4 4.2 8.4-4.2"/><path d="m3.6 16.2 8.4 4.2 8.4-4.2"/>',
    chart:     '<path d="M4 20V4"/><path d="M4 20h16"/><rect x="7.4" y="12" width="3" height="5"/><rect x="12.4" y="8.4" width="3" height="8.6"/><rect x="17.4" y="10.4" width="3" height="6.6"/>',
    trend:     '<path d="m4 16 4.6-4.8 3.4 3 6-6.6"/><path d="M14.4 7.6H18V11"/>',
    ring2:     '<circle cx="9" cy="14.4" r="4.4"/><circle cx="15" cy="14.4" r="4.4"/><path d="m7.4 8.6 1.6-3.2 1.6 3.2M13.4 8.6 15 5.4l1.6 3.2"/>',
    hands:     '<path d="M8.6 20.4 4.4 16a2.3 2.3 0 0 1 3.2-3.2L9 14.2V5.6a1.6 1.6 0 1 1 3.2 0v5"/><path d="M12.2 10.6a1.6 1.6 0 1 1 3.2 0v1.4a1.6 1.6 0 1 1 3.2 0v3.2c0 3-2 5.2-5 5.2"/>',
    house:     '<path d="M4 11 12 4.4 20 11"/><path d="M6 10v10h12V10"/><path d="M10.4 20v-5.2h3.2V20"/>',
    briefcase: '<rect x="3.2" y="7.4" width="17.6" height="12" rx="2.2"/><path d="M9 7.4V5.6a1.6 1.6 0 0 1 1.6-1.6h2.8A1.6 1.6 0 0 1 15 5.6v1.8"/><path d="M3.2 12.4h17.6"/>',
    school:    '<path d="m12 4 9 4.2-9 4.2-9-4.2Z"/><path d="M6.4 10.6V16c0 1.6 2.6 3 5.6 3s5.6-1.4 5.6-3v-5.4"/>',
    flag:      '<path d="M5.4 21V4"/><path d="M5.4 5.2h11l-1.8 3.4 1.8 3.4h-11Z"/>',
    ban:       '<circle cx="12" cy="12" r="8.4"/><path d="m6.4 6.4 11.2 11.2"/>',
    verified:  '<path d="m12 3.2 2.2 1.7 2.8-.2.9 2.6 2.4 1.4-1 2.6 1 2.6-2.4 1.4-.9 2.6-2.8-.2L12 20.8l-2.2-1.7-2.8.2-.9-2.6-2.4-1.4 1-2.6-1-2.6 2.4-1.4.9-2.6 2.8.2Z"/><path d="m9.2 12 2 2 3.6-3.8"/>',
    smile:     '<circle cx="12" cy="12" r="8.4"/><path d="M8.8 14.2a4 4 0 0 0 6.4 0M9.4 9.8v.1M14.6 9.8v.1"/>',
    emoji:     '<circle cx="12" cy="12" r="8.4"/><path d="M8.8 14a4 4 0 0 0 6.4 0M9.4 9.8v.1M14.6 9.8v.1"/>',
    paperclip: '<path d="M18.4 11.2 12.6 17a3.8 3.8 0 1 1-5.4-5.4l6.6-6.6a2.5 2.5 0 1 1 3.6 3.6l-6.6 6.6a1.3 1.3 0 0 1-1.8-1.8l6-6"/>',
    inbox:     '<rect x="3.2" y="4.6" width="17.6" height="14.8" rx="2.2"/><path d="M3.2 13.6h4.2l1.4 2.4h6.4l1.4-2.4h4.2"/>',
    list:      '<path d="M8 6.4h12M8 12h12M8 17.6h12"/><circle cx="4.4" cy="6.4" r="1.2"/><circle cx="4.4" cy="12" r="1.2"/><circle cx="4.4" cy="17.6" r="1.2"/>',
    tools:     '<path d="m14.6 6.6 3-3a4.4 4.4 0 0 1-5.8 5.8l-6 6a2.1 2.1 0 1 0 3 3l6-6a4.4 4.4 0 0 0 5.8-5.8l-3 3-1.5-.4Z"/>',
    scale:     '<path d="M12 4v16M7 20h10"/><path d="m5 8 3 6H2Z"/><path d="m19 8 3 6h-6Z"/><path d="M5 8h14"/>',
    play:      '<path d="M7.6 4.8 19 12 7.6 19.2Z"/>',
    pause:     '<rect x="7" y="4.8" width="3.6" height="14.4" rx="1.2"/><rect x="13.4" y="4.8" width="3.6" height="14.4" rx="1.2"/>',
    mapPin:    '<path d="M12 21s6.4-6 6.4-10.4a6.4 6.4 0 1 0-12.8 0C5.6 15 12 21 12 21Z"/><circle cx="12" cy="10.4" r="2.4"/>',
    quote:     '<path d="M9.6 6.4C6.8 7.6 5.2 10 5.2 13v4.6h5.6V12H8c0-2 .8-3.4 2.4-4.2Z"/><path d="M19.2 6.4c-2.8 1.2-4.4 3.6-4.4 6.6v4.6h5.6V12h-2.8c0-2 .8-3.4 2.4-4.2Z"/>'
  };

  function icon(name, cls, size) {
    var body = P[name] || P.info;
    return '<svg class="' + (cls || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' +
      (size ? ' width="' + size + '" height="' + size + '"' : '') + '>' + body + '</svg>';
  }
  /* filled variant, for the states that read as "on" */
  function iconFill(name, cls) {
    var body = P[name] || P.info;
    return '<svg class="' + (cls || '') + '" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" ' +
      'stroke-width="1.4" stroke-linejoin="round" aria-hidden="true">' + body + '</svg>';
  }

  w.ic = icon;
  w.icf = iconFill;
  w.ICONS = P;
})(window);
