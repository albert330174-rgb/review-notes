
(function(){
  var main=document.querySelector('main.wrap'); if(!main) return;
  var KEY='rn_mask', MODES=['off','term','desc'];
  var BTN={off:'끔', term:'개념어 마스킹', desc:'설명 마스킹'};
  var ITEMS=[['off','끄기',''],['term','개념어 마스킹','개념어 · 파란 제목'],['desc','설명 마스킹','개념어 옆 설명']];
  var BOX='<svg viewBox="0 0 20 16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="1.5" y="3" width="17" height="10" rx="2.5" stroke-dasharray="3 2.4"/></svg>';
  var BOXF='<svg viewBox="0 0 20 16" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="1.5" y="3" width="17" height="10" rx="2.5" fill="currentColor" fill-opacity=".22"/></svg>';
  var CHECK='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5l3.2 3L13 4.5"/></svg>';
  var css=document.createElement('style'); var H=':not(.rn-show)';
  
  
  var T=[['body.rn-m-term .rn-k'+H,'k'],['body.rn-m-desc .rn-k'+H,'k'],['body.rn-m-term .rn-c'+H,'c'],['body.rn-m-term .rn-h'+H,'h'],['body.rn-m-desc .rn-d'+H,'d']];
  var on=T.map(function(t){ return t[0]+' .rn-in'+t[1]+','+t[0]+'.rn-in'+t[1]; }).join(',');
  var sel=function(suf){ return on.split(',').map(function(s){ return s+suf; }).join(','); };
  css.textContent=
    on+'{color:transparent!important;background:linear-gradient(var(--fill),var(--fill)) 0 50%/100% 1.05em no-repeat!important;text-decoration:none!important;-webkit-box-decoration-break:clone;box-decoration-break:clone}'+
    sel(' *')+'{color:transparent!important;text-decoration:none!important;background:transparent!important}'+
    sel(' svg')+','+sel(' img')+'{visibility:hidden}'+
    T.map(function(t){ return t[0]; }).join(',')+'{cursor:pointer}'+
    '.rn-show{cursor:pointer}'+
    
    '.rn-mk{height:34px;padding:0 8px;border:0;border-radius:10px;background:transparent;color:var(--label);font:inherit;font-size:15px;font-weight:600;display:flex;align-items:center;gap:6px;cursor:pointer;white-space:nowrap;flex:0 0 auto}'+
    '.rn-bar .rn-mk{width:auto!important;height:34px!important;border-radius:10px!important;padding:0 8px!important;margin-right:6px}'+
    '.rn-mk svg,.rn-bar .rn-mk svg{width:20px;height:16px;flex:0 0 auto}.rn-mk:hover,.rn-bar .rn-mk:hover{background:var(--fill)}.rn-mk:active{opacity:.6}'+
    '.rn-mk.on,.rn-bar .rn-mk.on{color:var(--acc)}'+
    
    '.rn-mkw{position:fixed;top:calc(12px + env(safe-area-inset-top));right:16px;z-index:31}'+
    '.rn-mkw .rn-mk{background:var(--glass,var(--card));-webkit-backdrop-filter:blur(20px) saturate(180%);backdrop-filter:blur(20px) saturate(180%);box-shadow:0 0 0 .5px var(--sep),0 4px 14px rgba(0,0,0,.08)}'+
    '@media (max-width:1399px){.rn-mkw{display:none}}@media (min-width:1400px){.rn-bar .rn-mk{display:none}}'+
    'body.rn-open .rn-mkw{display:none}'+
    
    '.rn-mm{position:fixed;z-index:71;min-width:236px;max-width:280px;padding:6px;border-radius:14px;background:var(--card,var(--bg));box-shadow:0 0 0 .5px var(--sep),0 10px 32px rgba(0,0,0,.18);display:none}'+
    '.rn-mm.on{display:block}'+
    '.rn-mm button{width:100%;display:flex;align-items:center;gap:10px;padding:9px 10px;border:0;border-radius:9px;background:transparent;color:var(--label);font:inherit;text-align:left;cursor:pointer}'+
    '.rn-mm button:hover{background:var(--fill)}.rn-mm .ck{width:16px;height:16px;flex:0 0 auto;color:var(--acc);visibility:hidden}.rn-mm button.sel .ck{visibility:visible}'+
    '.rn-mm .t{display:flex;flex-direction:column;gap:1px}.rn-mm .t b{font-size:15px;font-weight:600}.rn-mm .t small{font-size:12px;color:var(--sec,var(--mk))}'+
    '.rn-mm .nt{margin:4px 4px 2px;padding:8px 6px 2px;border-top:.5px solid var(--sep);font-size:12px;line-height:17px;color:var(--sec,var(--mk))}'+
    '.rn-mm .nt u{text-decoration-color:var(--acc);text-underline-offset:2px}'+
    '@media print{'+on+'{color:inherit!important;background:none!important}'+sel(' *')+'{color:inherit!important}.rn-mk,.rn-mm{display:none!important}}';
  document.head.appendChild(css);
  
  var parts=[].slice.call(main.querySelectorAll('.part'));
  var ALL=/총창/.test(document.title);   // 총론·창체 = 페이지 전체가 교육과정 글(창의적 체험활동 대주제 이름엔 「교육과정」이 없다)
  function curric(el){ if(ALL) return true; var p=null; for(var i=0;i<parts.length;i++){ if(parts[i].compareDocumentPosition(el)&4) p=parts[i]; else break; }
    return !!p && /교육과정/.test((p.id||'')+' '+p.textContent); }
  var CODE=/\[\d+[가-힣]+ ?\d+(?:-\d+)?\]/;
  [].forEach.call(main.querySelectorAll('.term,.desc'), function(e){ if(!CODE.test(e.textContent)) return; e.setAttribute('data-rn-cur','');
    if(e.classList.contains('term')){ var r=e.closest('.row')||e.parentElement, n=r&&r.nextElementSibling;
      if(n && !n.matches('.row,.prose,.part,h2,h3,h4,h5')) n.setAttribute('data-rn-cur',''); } });
  function cur(el){ if(el.closest('.std,.prose,[data-rn-cur]')) return true; var b=el.closest('.sub'); if(b && /성취기준/.test(b.textContent)) return true; return curric(el); }
  [].forEach.call(main.querySelectorAll('.key'), function(e){ if(cur(e)) e.classList.add('rn-k'); });
  [].forEach.call(main.querySelectorAll('.term'), function(e){ if(cur(e) || (e.parentElement&&e.parentElement.querySelector('.key'))) return; e.classList.add('rn-c'); });
  [].forEach.call(main.querySelectorAll('.desc,.ann,.lead'), function(e){ if(cur(e) || e.parentElement.closest('.rn-d')) return; e.classList.add('rn-d'); });   // 설명 = .desc + 단계 흐름 옆 주석(.ann) + 모형 요약 줄(.lead · 10-07 도덕에서 빠짐)   // 노트 설명 속 밑줄은 설명째 가린다
  
  var probe=document.createElement('span'); probe.style.color='var(--v2acc)'; main.appendChild(probe); var ACC=getComputedStyle(probe).color; probe.remove();
  if(ACC && ACC!=='rgba(0, 0, 0, 0)'){
    [].forEach.call(main.querySelectorAll('h2,h3,h4,h5,.r-cell,.glab,.tcells>.branch>:first-child,.ctree>.ccell>:first-child,.sg>h4:first-child'), function(e){
      if(e.classList.contains('part') || e.querySelector('.rn-h') || e.closest('.rn-h')) return;
      if(getComputedStyle(e).color!==ACC || cur(e) || /^고려사항_/.test(e.id||'')) return;
      if(!e.textContent.trim()) return;
      var w=document.createElement('span'); w.className='rn-h';
      while(e.firstChild) w.appendChild(e.firstChild); e.appendChild(w); });
  }
  
  function wrapIn(el, kind){ var run=[];
    function flush(){ if(!run.length) return; if(!run.some(function(n){ return n.nodeType!==3 || n.textContent.trim(); })){ run=[]; return; }
      var s=document.createElement('span'); s.className='rn-in rn-in'+kind; run[0].parentNode.insertBefore(s, run[0]); run.forEach(function(n){ s.appendChild(n); }); run=[]; }
    [].slice.call(el.childNodes).forEach(function(n){
      if(n.nodeType===1 && (n.classList.contains('mk') || (kind==='d' && n.classList.contains('term')))){ flush(); return; }   // 「:」「⇒」 기호 · 설명 안 개념어는 남긴다
      if(n.nodeType===3 || (n.nodeType===1 && /^inline/.test(getComputedStyle(n).display) && !n.querySelector('div,p,ul,ol,table'))) run.push(n);
      else { flush(); if(n.nodeType===1) wrapIn(n, kind); } });
    flush(); }
  [].forEach.call(main.querySelectorAll('.rn-k,.rn-c,.rn-d'), function(e){
    var k=e.classList.contains('rn-k')?'k':e.classList.contains('rn-c')?'c':'d';
    if(e.closest('.rn-in')) e.classList.add('rn-in','rn-in'+k);        // 바깥 대상의 글자 조각 안에 든 인라인 대상 = 그 자체가 조각
    else if(!e.querySelector('.rn-in'+k)) wrapIn(e, k); });
  [].forEach.call(main.querySelectorAll('.rn-h'), function(e){ e.classList.add('rn-in','rn-inh'); });   // 제목 감싸개는 이미 인라인 글자 조각
  var mode='off'; try{ mode=localStorage.getItem(KEY)||'off'; }catch(e){} if(MODES.indexOf(mode)<0) mode='off';
  function hidden(el){ return (mode!=='off' && el.classList.contains('rn-k')) || (mode==='term' && (el.classList.contains('rn-c')||el.classList.contains('rn-h'))) || (mode==='desc' && el.classList.contains('rn-d')); }
  
  main.addEventListener('click', function(ev){ if(mode==='off') return;
    var t=ev.target.closest('.rn-k,.rn-c,.rn-d,.rn-h'); while(t && !hidden(t)) t=t.parentElement && t.parentElement.closest('.rn-k,.rn-c,.rn-d,.rn-h');
    if(!t || !main.contains(t)) return;
    if(!t.classList.contains('rn-show')){ ev.preventDefault(); ev.stopPropagation(); }
    t.classList.toggle('rn-show'); }, true);
  
  var mm=document.createElement('div'); mm.className='rn-mm'; mm.setAttribute('role','menu');
  mm.innerHTML=ITEMS.map(function(x){ return '<button type="button" role="menuitemradio" data-m="'+x[0]+'"><span class="ck">'+CHECK+'</span><span class="t"><b>'+x[1]+'</b>'+(x[2]?'<small>'+x[2]+'</small>':'')+'</span></button>'; }).join('')+
    '<div class="nt">교육과정 글은 어느 쪽이든 <u>밑줄 친 핵심어</u>만 가려요 · 가린 칸을 누르면 열려요</div>';
  document.body.appendChild(mm);
  var btns=[], opener=null;
  function paint(){ document.body.classList.toggle('rn-m-term', mode==='term'); document.body.classList.toggle('rn-m-desc', mode==='desc');
    btns.forEach(function(b){ b.innerHTML=(mode==='off'?BOX:BOXF)+'<span>마스킹</span>'; b.classList.toggle('on', mode!=='off'); b.setAttribute('aria-label','마스킹 — 지금 '+BTN[mode]); b.title=b.getAttribute('aria-label'); });
    [].forEach.call(mm.querySelectorAll('button'), function(x){ x.classList.toggle('sel', x.dataset.m===mode); x.setAttribute('aria-checked', x.dataset.m===mode); }); }
  function close(){ mm.classList.remove('on'); if(opener) opener.setAttribute('aria-expanded','false'); opener=null; }
  function open(b){ var r=b.getBoundingClientRect(); mm.classList.add('on');
    mm.style.top=(r.bottom+6)+'px'; mm.style.left=Math.max(8, Math.min(innerWidth-mm.offsetWidth-8, r.right-mm.offsetWidth))+'px';
    opener=b; b.setAttribute('aria-expanded','true'); }
  mm.addEventListener('click', function(ev){ var x=ev.target.closest('button[data-m]'); if(!x) return;
    var to=(x.dataset.m===mode && mode!=='off')?'off':x.dataset.m;   // 체크된 것을 다시 누르면 끈다(10-08)
    if(to!==mode){ mode=to; try{ localStorage.setItem(KEY,mode); }catch(e){}
      [].forEach.call(main.querySelectorAll('.rn-show'), function(e){ e.classList.remove('rn-show'); }); paint(); }
    close(); });
  document.addEventListener('click', function(ev){ if(opener && !mm.contains(ev.target) && !opener.contains(ev.target)) close(); }, true);
  document.addEventListener('keydown', function(ev){ if(ev.key==='Escape' && opener) close(); });
  addEventListener('scroll', function(){ if(opener) close(); }, {passive:true}); addEventListener('resize', close);
  function add(host, cls){ if(!host) return; var b=document.createElement('button'); b.type='button'; b.className='rn-mk'+(cls?' '+cls:'');
    b.setAttribute('aria-haspopup','menu'); b.setAttribute('aria-expanded','false');
    b.onclick=function(ev){ ev.stopPropagation(); if(opener===b) close(); else { close(); open(b); } }; host.appendChild(b); btns.push(b); }
  add(document.querySelector('.rn-bar'));       // 좁은 화면 = 막대 오른쪽 끝
  var mw=document.createElement('div'); mw.className='rn-mkw'; document.body.appendChild(mw); add(mw);   // 넓은 화면 = 본문 오른쪽 위(막대가 없다)
  function place(){ var r=main.getBoundingClientRect(), pr=parseFloat(getComputedStyle(main).paddingRight)||0; mw.style.right=Math.max(8, Math.round(document.documentElement.clientWidth-r.right+pr))+'px'; }
  place(); addEventListener('resize', place); if(window.ResizeObserver) new ResizeObserver(place).observe(main);
  paint();
})();
