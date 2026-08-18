/* =========================================================
   とうじょうRMO 共通スクリプト common.js
   ・ヘッダー（メニューバー）とフッターをここで一括生成
     → 各ページには <div id="site-header"></div> と
        <div id="site-footer"></div> を置くだけでOK。
        メニュー・フッターの修正は、このファイル1か所だけで済みます。
   ・ヘッダーのスクロール制御 / ハンバーガーメニュー / reveal も担当
   ========================================================= */

/* ---------- 共通メニューバー（ヘッダー） ---------- */
const HEADER_HTML = `
<header id="hdr">
  <div class="wrap nav">
    <a href="index.html" class="logo">とうじょうRMO<small>兵庫県加東市 東条地域</small></a>
    <nav class="nav-links" id="navlinks">
      <a href="index.html" data-nav="index.html">HOME</a>
      <a href="about.html" data-nav="about.html">RMOとは</a>
      <a href="solutions.html" data-nav="solutions.html">3つの目的</a>
      <a href="challenges.html" data-nav="challenges.html">地域の課題</a>
      <a href="index.html#news">お知らせ</a>
      <a href="https://www.instagram.com/kato.agri.japan/" class="btn-nav" data-nav="https://www.instagram.com/kato.agri.japan/"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5C19.43 22 22 19.43 22 16.25v-8.5C22 4.57 19.43 2 16.25 2h-8.5zm0 2h8.5A3.75 3.75 0 0 1 20 7.75v8.5A3.75 3.75 0 0 1 16.25 20h-8.5A3.75 3.75 0 0 1 4 16.25v-8.5A3.75 3.75 0 0 1 7.75 4zm8.75 1a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/></svg>Instagram</a>
    </nav>
    <button class="burger" id="burger" aria-label="menu"><span></span><span></span><span></span></button>
  </div>
</header>`;

/* ---------- 共通フッター ---------- */
const FOOTER_HTML = `
<footer>
  <div class="wrap">
    <div class="foot-top">
      <div>
        <div class="logo">とうじょうRMO<small>兵庫県加東市 東条地域</small></div>
        <p>岡本・森・南山の3地区が協力し、農地を守り、地域資源を活かし、暮らしを支える農村型地域運営組織です。</p>
      </div>
      <div class="foot-nav">
        <div class="foot-col">
          <h5>Contents</h5>
          <a href="index.html">HOME</a>
          <a href="about.html">RMOとは</a>
          <a href="solutions.html">3つの目的</a>
          <a href="challenges.html">地域の課題</a>
          <a href="contact.html">お問合せ</a>
        </div>
        <div class="foot-col">
          <h5>Links</h5>
          <a href="https://sites.google.com/view/okamotoeinou/" target="_blank" rel="noopener">㈱岡本営農互助会</a>
          <a href="https://www.welovetojo.com/" target="_blank" rel="noopener">We Love シン東条</a>
          <a href="https://www.instagram.com/kato.agri.japan/" target="_blank" rel="noopener">Instagram</a>
        </div>
      </div>
    </div>
    <div class="foot-bot"><p>© 2026 とうじょうRMO ｜ 兵庫県加東市東条地域</p></div>
  </div>
</footer>`;

/* ---------- ヘッダー / フッターの挿入 ---------- */
(function injectChrome(){
  const headerSlot = document.getElementById('site-header');
  const footerSlot = document.getElementById('site-footer');
  if(headerSlot) headerSlot.outerHTML = HEADER_HTML;
  if(footerSlot) footerSlot.outerHTML = FOOTER_HTML;

  /* いま開いているページのメニューを強調（任意） */
  const page = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav-links a[data-nav]').forEach(a=>{
    if(a.getAttribute('data-nav') === page){
      a.classList.add('current');
      a.setAttribute('aria-current','page');
    }
  });
})();

/* ---------- ヘッダーのスクロール制御 ---------- */
const hdr = document.getElementById('hdr');
if(hdr){
  addEventListener('scroll',()=>hdr.classList.toggle('scrolled',scrollY>30));
}

/* ---------- ハンバーガーメニュー ---------- */
const burger = document.getElementById('burger');
const nav = document.getElementById('navlinks');
function toggleMenu(open){
  if(!nav || !burger) return;
  const o = open!==undefined ? open : !nav.classList.contains('open');
  nav.classList.toggle('open',o);
  burger.classList.toggle('open',o);
  document.body.style.overflow = o ? 'hidden' : '';
}
if(burger && nav){
  burger.addEventListener('click',()=>toggleMenu());
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>toggleMenu(false)));
}

/* ---------- reveal（スクロールで表示） ---------- */
const io = new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}
}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
