
(function(){
  var main=document.querySelector('main.wrap'); if(!main) return;
  var KEY='rn_mask', MODES=['off','term','desc'];
  var BTN={off:'끔', term:'개념어 마스킹', desc:'설명 마스킹'};
  var ITEMS=[['off','끄기',''],['term','개념어 마스킹','개념어 · 파란 제목'],['desc','설명 마스킹','개념어 옆 설명']];
  var BOX='<svg viewBox="0 0 20 16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="1.5" y="3" width="17" height="10" rx="2.5" stroke-dasharray="3 2.4"/></svg>';
  var BOXF='<svg viewBox="0 0 20 16" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="1.5" y="3" width="17" height="10" rx="2.5" fill="currentColor" fill-opacity=".22"/></svg>';
  var CHECK='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5l3.2 3L13 4.5"/></svg>';
  var css=document.createElement('style'); var H=':not(.rn-show)';
  var on='body.rn-m-term .rn-k'+H+',body.rn-m-desc .rn-k'+H+',body.rn-m-term .rn-c'+H+',body.rn-m-term .rn-h'+H+',body.rn-m-desc .rn-d'+H;
  var sel=function(suf){ return on.split(',').map(function(s){ return s+suf; }).join(','); };
  css.textContent=
    on+'{color:transparent!important;background:var(--fill)!important;border-radius:4px;text-decoration:none!important;cursor:pointer;-webkit-box-decoration-break:clone;box-decoration-break:clone}'+
    sel(' *')+'{color:transparent!important;text-decoration:none!important;background:transparent!important}'+
    sel(' svg')+','+sel(' img')+'{visibility:hidden}'+
    'body.rn-m-desc div.rn-d'+H+'{width:fit-content;max-width:100%}'+
    '.rn-show{cursor:pointer}'+
    
    '.rn-mk{height:34px;padding:0 8px;border:0;border-radius:10px;background:transparent;color:var(--label);font:inherit;font-size:15px;font-weight:600;display:flex;align-items:center;gap:6px;cursor:pointer;white-space:nowrap;flex:0 0 auto}'+
    '.rn-bar .rn-mk{width:auto!important;height:34px!important;border-radius:10px!important;padding:0 8px!important;margin-right:6px}'+
    '.rn-mk svg,.rn-bar .rn-mk svg{width:20px;height:16px;flex:0 0 auto}.rn-mk:hover,.rn-bar .rn-mk:hover{background:var(--fill)}.rn-mk:active{opacity:.6}'+
    '.rn-mk.on,.rn-bar .rn-mk.on{color:var(--acc)}'+
    '.rn-mkf{position:fixed;top:calc(12px + env(safe-area-inset-top));right:calc(16px + env(safe-area-inset-right));z-index:31;background:var(--glass,var(--card));-webkit-backdrop-filter:blur(20px) saturate(180%);backdrop-filter:blur(20px) saturate(180%);box-shadow:0 0 0 .5px var(--sep),0 4px 14px rgba(0,0,0,.08)}'+
    '@media (max-width:1399px){.rn-mkf{display:none}}@media (min-width:1400px){.rn-bar .rn-mk{display:none}}'+
    'body.rn-open .rn-mkf{display:none}'+
    
    '.rn-mm{position:fixed;z-index:71;min-width:236px;padding:6px;border-radius:14px;background:var(--card,var(--bg));box-shadow:0 0 0 .5px var(--sep),0 10px 32px rgba(0,0,0,.18);display:none}'+
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
  [].forEach.call(main.querySelectorAll('.desc'), function(e){ if(cur(e)) return; e.classList.add('rn-d'); });   // 노트 설명 속 밑줄은 설명째 가린다
  
  var probe=document.createElement('span'); probe.style.color='var(--v2acc)'; main.appendChild(probe); var ACC=getComputedStyle(probe).color; probe.remove();
  if(ACC && ACC!=='rgba(0, 0, 0, 0)'){
    [].forEach.call(main.querySelectorAll('h2,h3,h4,h5,.r-cell,.glab,.tcells>.branch>:first-child,.ctree>.ccell>:first-child,.sg>h4:first-child'), function(e){
      if(e.classList.contains('part') || e.querySelector('.rn-h') || e.closest('.rn-h')) return;
      if(getComputedStyle(e).color!==ACC || cur(e) || /^고려사항_/.test(e.id||'')) return;
      if(!e.textContent.trim()) return;
      var w=document.createElement('span'); w.className='rn-h';
      while(e.firstChild) w.appendChild(e.firstChild); e.appendChild(w); });
  }
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
    if(x.dataset.m!==mode){ mode=x.dataset.m; try{ localStorage.setItem(KEY,mode); }catch(e){}
      [].forEach.call(main.querySelectorAll('.rn-show'), function(e){ e.classList.remove('rn-show'); }); paint(); }
    close(); });
  document.addEventListener('click', function(ev){ if(opener && !mm.contains(ev.target) && !opener.contains(ev.target)) close(); }, true);
  document.addEventListener('keydown', function(ev){ if(ev.key==='Escape' && opener) close(); });
  addEventListener('scroll', function(){ if(opener) close(); }, {passive:true}); addEventListener('resize', close);
  function add(host, cls){ if(!host) return; var b=document.createElement('button'); b.type='button'; b.className='rn-mk'+(cls?' '+cls:'');
    b.setAttribute('aria-haspopup','menu'); b.setAttribute('aria-expanded','false');
    b.onclick=function(ev){ ev.stopPropagation(); if(opener===b) close(); else { close(); open(b); } }; host.appendChild(b); btns.push(b); }
  add(document.querySelector('.rn-bar'));       // 좁은 화면 = 막대 오른쪽 끝
  add(document.body, 'rn-mkf');                  // 넓은 화면 = 오른쪽 위에 떠 있음(막대가 없다)
  paint();
})();
