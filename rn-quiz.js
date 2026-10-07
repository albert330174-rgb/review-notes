
(function(){
  var Q=window.RN_QZ, main=document.querySelector('main.wrap'); if(!Q||!main) return;
  var ids=[].map.call(document.querySelectorAll('aside .tgrp>summary a[href^="#"]'), function(a){ return decodeURIComponent(a.getAttribute('href').slice(1)); });
  
  var css=document.createElement('style'); css.textContent=
    '.rn-qz{margin:22px 0 34px;padding-top:10px;border-top:.5px solid var(--sep,var(--hair));display:flex;justify-content:flex-end;width:100%;grid-column:1/-1;scroll-margin-top:96px}'+
    '.rn-qz a{display:inline-flex;align-items:center;gap:6px;padding:4px 0;color:var(--sec,var(--mk));text-decoration:none;font-size:14px;line-height:20px}'+
    '.rn-qz a b{font-weight:400;color:var(--acc,var(--v2acc))}.rn-qz svg{width:16px;height:16px;flex:0 0 auto;color:var(--acc,var(--v2acc))}'+
    '.rn-qz a:hover b{text-decoration:underline;text-underline-offset:3px}'+
    '@media print{.rn-qz{display:none!important}}';
  document.head.appendChild(css);
  var ICON='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="2.5"/><path d="M8.5 9.5l1.6 1.6 3-3M8.5 15.5h7"/></svg>';
  
  function spot(el){ return el.closest('h1,h2,h3,h4,h5,h6') || el; }   // 제목 안(마스킹 감싸개 안 포함)이면 제목째
  ids.forEach(function(id, i){
    var g=Q.g[id]; if(!g) return;
    var nx=null; for(var j=i+1;j<ids.length && !nx;j++) nx=document.getElementById(ids[j]);
    var d=document.createElement('div'); d.className='rn-qz'; d.id='rn-qz-'+id;   // 쪽지시험에서 돌아올 자리(읽던 단원 끝)
    d.innerHTML='<a href="quiz.html?s='+encodeURIComponent(Q.s)+'&t='+encodeURIComponent(g[0])+'&from='+encodeURIComponent(id)+'" title="'+g[0].replace(/[&<>"]/g,'')+' 쪽지시험">'+ICON+'<span>'+g[0].replace(/[&<>]/g,'')+' 쪽지시험 <b>'+g[1]+'문제 ›</b></span></a>';   // 묶음 = 왼쪽 목차 큰 제목 — 「단원」은 사이트 어디에도 없는 말이라 이름을 그대로(10-08)
    if(nx){ var b=spot(nx); b.parentElement.insertBefore(d, b); }
    else { var secs=main.querySelectorAll('section.pg'); (secs.length?secs[secs.length-1]:main).appendChild(d); }
  });
})();
