/* Home hero entry for the promo video: injects only on the homepage.
   Base path is derived from this script's own src, so it works whether the
   site lives at the domain root or under a sub-path like /en/. */
(function () {
  function siteBase() {
    var s = document.currentScript || document.querySelector('script[src*="promo.js"]');
    if (!s || !s.src) return '';
    var m = s.src.match(/^(.*?)\/js\/promo\.js(\?.*)?$/);
    return m ? m[1].replace(/^https?:\/\/[^/]+/, '') : '';
  }

  function inject() {
    var info = document.getElementById('site-info');
    if (!info || info.querySelector('.hero-promo')) return;

    var a = document.createElement('a');
    a.className = 'hero-promo';
    a.href = siteBase() + '/video/';
    a.title = 'One minute on what this blog is about';
    a.innerHTML = '<span class="hero-promo-play"></span><span>One minute</span>';

    var social = document.getElementById('site_social_icons');
    if (social && social.parentNode === info) {
      info.insertBefore(a, social);
    } else {
      info.appendChild(a);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
  document.addEventListener('pjax:complete', inject);
})();
