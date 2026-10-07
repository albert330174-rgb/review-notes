
(function(){
  var r=document.documentElement, mq=window.matchMedia?matchMedia('(prefers-color-scheme: dark)'):null;
  function get(){ var v=null; try{ v=localStorage.getItem('rn_theme'); }catch(e){}
    if(v==='paper'){ v='white'; try{ localStorage.setItem('rn_theme','white'); }catch(e){} }
    if(v==='white'||v==='dark') r.dataset.theme=v;   // 10-08 kit.js가 없는 페이지(피드백·처리 현황)는 고른 테마가 새로고침에 풀렸다 — 여기서도 건다(과목 페이지는 kit.js와 같은 값)
    return v; }
  function dark(){ var v=get(); return v ? v==='dark' : !!(mq&&mq.matches); }
  var css=document.createElement('style'); css.textContent=
    '.rn-tg{position:fixed;top:calc(12px + env(safe-area-inset-top));right:calc(12px + env(safe-area-inset-right));z-index:62;width:40px;height:40px;border:0;border-radius:20px;'+
    'background:var(--glass,var(--card));-webkit-backdrop-filter:blur(20px) saturate(180%);backdrop-filter:blur(20px) saturate(180%);color:var(--label);'+
    'box-shadow:0 0 0 .5px var(--sep),0 4px 14px rgba(0,0,0,.10);display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0}'+
    '.rn-tg svg{width:20px;height:20px}body.rn-open .rn-tg{display:none}@media print{.rn-tg{display:none!important}}';
  document.head.appendChild(css);
  var SUN='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6"/></svg>';
  var MOON='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7z"/></svg>';
  var b=document.createElement('button'); b.type='button'; b.className='rn-tg';
  function paint(){ var d=dark(); b.innerHTML=d?SUN:MOON; b.setAttribute('aria-label', d?'라이트 모드로':'다크 모드로'); b.title=b.getAttribute('aria-label'); }
  b.onclick=function(){ var v=dark()?'white':'dark'; try{ localStorage.setItem('rn_theme',v); }catch(e){} r.dataset.theme=v; paint(); };
  if(mq&&mq.addEventListener) mq.addEventListener('change', paint);
  get(); paint(); document.body.appendChild(b);
})();
