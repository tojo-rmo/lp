/* 下層ページ共通：ヘッダー状態・メニュー・reveal */
const hdr=document.getElementById('hdr');
addEventListener('scroll',()=>hdr.classList.toggle('scrolled',scrollY>30));
const burger=document.getElementById('burger'),nav=document.getElementById('navlinks');
function toggleMenu(open){
  const o=open!==undefined?open:!nav.classList.contains('open');
  nav.classList.toggle('open',o);
  burger.classList.toggle('open',o);
  document.body.style.overflow=o?'hidden':'';
}
burger.addEventListener('click',()=>toggleMenu());
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>toggleMenu(false)));
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}
}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
