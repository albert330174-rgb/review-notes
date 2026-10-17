
(function(){
  var main=document.querySelector('main.wrap'); if(!main) return;
  var KEY='rn_mask', MODES=['off','term','desc'];
  var BTN={off:'끔', term:'개념어 마스킹', desc:'설명 마스킹'};
  var ITEMS=[['off','끄기',''],['term','개념어 마스킹','개념어 · 파란 제목'],['desc','설명 마스킹','개념어 옆 설명']];
  var BOX='<svg viewBox="0 0 20 16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="1.5" y="3" width="17" height="10" rx="2.5" stroke-dasharray="3 2.4"/></svg>';
  var BOXF='<svg viewBox="0 0 20 16" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="1.5" y="3" width="17" height="10" rx="2.5" fill="currentColor" fill-opacity=".22"/></svg>';
  var CHECK='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5l3.2 3L13 4.5"/></svg>';
  var css=document.createElement('style'); var H=':not(.rn-show):not(.rn-pass)';   // rn-pass = 「틀린 것만 가리기」에서 안 가리는 칸
  
  
  var T=[['body.rn-m-term .rn-k'+H,'k'],['body.rn-m-desc .rn-k'+H,'k'],['body.rn-m-term .rn-c'+H,'c'],['body.rn-m-term .rn-h'+H,'h'],['body.rn-m-desc .rn-d'+H,'d']];
  var on=T.map(function(t){ return t[0]+' .rn-in'+t[1]+','+t[0]+'.rn-in'+t[1]; }).join(',');
  var sel=function(suf){ return on.split(',').map(function(s){ return s+suf; }).join(','); };
  css.textContent=
    on+'{color:transparent!important;background:linear-gradient(var(--rn-mf,var(--fill)),var(--rn-mf,var(--fill))) 0 50%/100% 1.05em no-repeat!important;text-decoration:none!important;-webkit-box-decoration-break:clone;box-decoration-break:clone}'+
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
    '.rn-mm .nt u{text-decoration-color:var(--acc);text-underline-offset:2px}@media (hover:none){.rn-mm .kb{display:none}}'+
    
    '.rn-ty{position:absolute;z-index:40;display:flex;align-items:center;gap:4px;padding:2px;border-radius:8px;background:var(--card,var(--bg));box-shadow:0 0 0 1.5px var(--acc),0 4px 14px rgba(0,0,0,.12)}'+
    '.rn-ty input{min-width:72px;border:0;outline:0;background:transparent;color:var(--label);font:inherit;padding:0 4px;height:calc(1.4em + 4px)}'+
    '.rn-ty button{border:0;background:var(--fill);color:var(--label);font:inherit;font-size:13px;font-weight:600;height:calc(1.4em + 2px);padding:0 8px;border-radius:6px;cursor:pointer;white-space:nowrap}'+
    '.rn-ty.bad{animation:rnTyX .28s}@keyframes rnTyX{25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}'+
    '.rn-tyok .rn-in,.rn-tyok.rn-in{color:#2A8A52!important}.rn-tyno .rn-in,.rn-tyno.rn-in{color:#D1453B!important}'+
    'html[data-theme="dark"] .rn-tyok .rn-in,html[data-theme="dark"] .rn-tyok.rn-in{color:#62CC88!important}html[data-theme="dark"] .rn-tyno .rn-in,html[data-theme="dark"] .rn-tyno.rn-in{color:#FF7F74!important}'+
    '@media (prefers-color-scheme:dark){html:not([data-theme]) .rn-tyok .rn-in,html:not([data-theme]) .rn-tyok.rn-in{color:#62CC88!important}html:not([data-theme]) .rn-tyno .rn-in,html:not([data-theme]) .rn-tyno.rn-in{color:#FF7F74!important}}'+
    '.rn-mm .tg{margin-top:4px;border-top:.5px solid var(--sep);border-radius:0 0 9px 9px;padding-top:11px}'+
    
    'body.rn-g .rn-k,body.rn-g .rn-c,body.rn-g .rn-d,body.rn-g .rn-h{--rn-mf:initial}'+
    'body.rn-g .rn-gr{--rn-mf:color-mix(in srgb,#30A15A 24%,var(--fill))}body.rn-g .rn-gy{--rn-mf:color-mix(in srgb,#E8A400 30%,var(--fill))}body.rn-g .rn-gw{--rn-mf:color-mix(in srgb,#E0483E 30%,var(--fill))}'+
    '.rn-mm .rs{display:flex;align-items:center;gap:10px;padding:6px 10px 8px 36px;font-size:12px;color:var(--sec,var(--mk));font-variant-numeric:tabular-nums}'+
    '.rn-mm .rs i{flex:1 1 auto;display:flex;height:6px;border-radius:3px;overflow:hidden;background:var(--fill)}.rn-mm .rs i b{display:block;height:100%}'+
    '.rn-mm:not(.g) .go{display:none!important}.rn-mm .x b{color:#E0483E}'+
    '@media print{.rn-ty{display:none!important}'+on+'{color:inherit!important;background:none!important}'+sel(' *')+'{color:inherit!important}.rn-mk,.rn-mm{display:none!important}}';
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
  
  var GKEY='rn_mask_grade', WKEY='rn_mask_wrong', RKEY='rn_mask_rec_v1', all={}, rec, lastT=null;
  var PAGE=decodeURIComponent(location.pathname.split('/').pop()||'index');
  try{ all=JSON.parse(localStorage.getItem(RKEY)||'{}')||{}; }catch(e){ all={}; }
  rec=all[PAGE]||(all[PAGE]={});
  function flag(k){ var v='0'; try{ v=localStorage.getItem(k)||'0'; }catch(e){} return v==='1'; }
  function grading(){ return mode!=='off' && flag(GKEY); }
  function save(){ try{ localStorage.setItem(RKEY, JSON.stringify(all)); }catch(e){} }
  function lv(r){ var h=r && typeof r[2]==='string' ? r[2] : ''; if(!h) return ''; var k=h.split('1').length-1; return k===h.length?'r':k?'y':'w'; }   // r 초록 · y 노랑 · w 빨강
  function tint(t){ var l=lv(rec[t.dataset.rk]); t.classList.toggle('rn-gr', l==='r'); t.classList.toggle('rn-gy', l==='y'); t.classList.toggle('rn-gw', l==='w'); }
  (function(){ var seen={};
    [].forEach.call(main.querySelectorAll('.rn-k,.rn-c,.rn-d,.rn-h'), function(e){
      var k=(e.classList.contains('rn-k')?'k':e.classList.contains('rn-c')?'c':e.classList.contains('rn-h')?'h':'d')+(e.textContent||'').replace(/\s+/g,' ').trim().slice(0,60);
      var n=seen[k]=(seen[k]||0)+1; e.dataset.rk=n>1?k+'#'+n:k; tint(e); }); })();
  
  var before=new WeakMap();
  function mark(t, ok){ var k=t.dataset.rk; if(!k) return; var r=rec[k]||[0,0,''], was=t.dataset.ro, c=ok?'1':'0';
    if(typeof r[2]!=='string') r[2]='';
    if(was==null){ before.set(t, rec[k]?rec[k].slice():null); r[0]++; if(!ok) r[1]++; r[2]=(r[2]+c).slice(-3); }
    else { if(was==='1' && !ok) r[1]++; else if(was==='0' && ok) r[1]=Math.max(0,r[1]-1); r[2]=r[2].slice(0,-1)+c; }
    rec[k]=r; t.dataset.ro=c;
    t.classList.add('rn-show'); t.classList.toggle('rn-tyok', !!ok); t.classList.toggle('rn-tyno', !ok); tint(t); lastT=t; save(); }
  function shut(t, undo){ t.classList.remove('rn-show','rn-tyok','rn-tyno');
    if(undo && t.dataset.ro!=null && before.has(t)){ var p=before.get(t), k=t.dataset.rk; if(p) rec[k]=p; else delete rec[k]; tint(t); save(); }   // 닫기 키 = 잘못 연 칸 → 이번 기록 되돌림
    before.delete(t); delete t.dataset.ro; }
  function hidden(el){ return !el.classList.contains('rn-pass') && ((mode!=='off' && el.classList.contains('rn-k')) || (mode==='term' && (el.classList.contains('rn-c')||el.classList.contains('rn-h'))) || (mode==='desc' && el.classList.contains('rn-d'))); }
  
  main.addEventListener('click', function(ev){ if(mode==='off') return;
    var t=ev.target.closest('.rn-k,.rn-c,.rn-d,.rn-h'); while(t && !hidden(t)) t=t.parentElement && t.parentElement.closest('.rn-k,.rn-c,.rn-d,.rn-h');
    if(!t || !main.contains(t)) return;
    if(!t.classList.contains('rn-show')){ ev.preventDefault(); ev.stopPropagation(); if(typing()&&!t.classList.contains('rn-d')){ tyOpen(t); return; }
      if(grading()){ mark(t,1); return; } }
    else if(grading()){ ev.preventDefault(); ev.stopPropagation(); if(t.dataset.ro!=='0') mark(t,0); else shut(t); return; }   // 기록 켜짐 = 연 칸 한 번 더 = 틀림 · 또 한 번 = 닫힘
    t.classList.toggle('rn-show'); }, true);
  
  var TKEY='rn_mask_type', ty=null;
  function typing(){ var v='0'; try{ v=localStorage.getItem(TKEY)||'0'; }catch(e){} return mode==='term' && v==='1'; }
  function ans(t){ var ps=t.classList.contains('rn-in')?[t]:[].slice.call(t.querySelectorAll('.rn-in')).filter(function(x){ return !x.parentElement.closest('.rn-in'); });
    return ps.map(function(x){ return x.textContent; }).join(''); }
  var norm=function(x){ return (x||'').toLowerCase().replace(/[\s·ㆍ・,.:;!?'"“”‘’「」『』()（）\[\]{}<>〈〉《》\-–—~/]/g,''); };
  function tyClose(){ if(ty){ ty.box.remove(); ty=null; } }
  function nextHidden(t){ var all=[].slice.call(main.querySelectorAll('.rn-k,.rn-c,.rn-h')).filter(function(e){ return hidden(e) && !e.classList.contains('rn-show') && e.getClientRects().length && !e.parentElement.closest('.rn-k:not(.rn-show),.rn-c:not(.rn-show),.rn-h:not(.rn-show)'); });
    for(var i=0;i<all.length;i++) if(t.compareDocumentPosition(all[i])&4) return all[i]; return null; }
  function reveal(t, cls){ if(grading()){ mark(t, cls==='rn-tyok'?1:0); return; }   // 기록 켜짐 = 맞힘만 맞음 · 보기·두 번 틀림은 틀림
    t.classList.add('rn-show'); if(cls) t.classList.add(cls); }
  function go(t){ tyClose(); var n=t&&nextHidden(t); if(!n) return; var r=n.getBoundingClientRect(); if(r.top<60||r.bottom>innerHeight-80) n.scrollIntoView({block:'center'}); tyOpen(n); }
  function tyOpen(t){ tyClose(); var r=(t.querySelector('.rn-in')||t).getClientRects()[0]||t.getBoundingClientRect();
    var box=document.createElement('div'); box.className='rn-ty'; box.innerHTML='<input type="text" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="가린 말 쓰기"><button type="button">보기</button>';
    var cs=getComputedStyle(t.querySelector('.rn-in')||t); box.style.font=cs.font; box.style.left=Math.max(4, r.left+scrollX-4)+'px'; box.style.top=(r.top+scrollY-4)+'px';
    var inp=box.firstChild; inp.style.width=Math.max(72, Math.round(r.width)+8)+'px'; document.body.appendChild(box);
    var miss=0, want=norm(ans(t)); ty={box:box, t:t};
    box.lastChild.onclick=function(ev){ ev.stopPropagation(); reveal(t); go(t); };
    box.addEventListener('click', function(ev){ ev.stopPropagation(); });
    inp.addEventListener('keydown', function(ev){
      if(ev.isComposing||ev.keyCode===229) return;   // 한글 조합 중 Enter는 글자 확정만
      if(ev.key==='Escape'){ ev.preventDefault(); reveal(t); tyClose(); }
      else if(ev.key==='Tab'){ ev.preventDefault(); go(t); }
      else if(ev.key==='Enter'){ ev.preventDefault(); var v=norm(inp.value); if(!v){ reveal(t); go(t); return; }
        if(v===want){ reveal(t,'rn-tyok'); go(t); }
        else if(++miss>=2){ reveal(t,'rn-tyno'); tyClose(); }
        else { box.classList.remove('bad'); void box.offsetWidth; box.classList.add('bad'); inp.select(); } } });
    setTimeout(function(){ inp.focus(); }, 0); }
  document.addEventListener('click', function(ev){ if(ty && !ty.box.contains(ev.target)) tyClose(); }, true);   // 화면 크기 바뀜으로는 닫지 않는다(폰·패드 키보드가 올라올 때 resize가 난다)
  
  var kOpened=[];
  function allHidden(){ return [].slice.call(main.querySelectorAll('.rn-k,.rn-c,.rn-h,.rn-d')).filter(function(e){ return hidden(e) && !e.classList.contains('rn-show') && e.getClientRects().length && !e.parentElement.closest('.rn-k:not(.rn-show),.rn-c:not(.rn-show),.rn-h:not(.rn-show),.rn-d:not(.rn-show)'); }); }
  function barB(){ var b=document.querySelector('.rn-bar'); var r=b&&b.getBoundingClientRect(); return r&&r.bottom>0?r.bottom:0; }   // 위 막대가 덮는 높이(내려가 숨으면 0)
  function inView(e){ var r=e.getBoundingClientRect(); return r.bottom>barB()+4 && r.top<innerHeight-40; }
  
  function follow(n){ var r=n.getBoundingClientRect(); if(r.top>innerHeight*.6 || r.bottom<barB()+4) scrollBy({top:Math.round(r.top-innerHeight*.33), behavior:'smooth'}); }
  function kNext(){
    if(ty){ var tt=ty.t; reveal(tt); kOpened.push(tt); tyClose(); }   // 입력칸이 떠 있으면 = 「보기」 하고 다음으로
    var all=allHidden(), last=kOpened[kOpened.length-1], n=null;
    if(last && document.contains(last) && inView(last)){ for(var i=0;i<all.length;i++) if(last.compareDocumentPosition(all[i])&4){ n=all[i]; break; } }
    if(!n){ var bt=barB()+4; for(var j=0;j<all.length;j++){ var r=all[j].getBoundingClientRect(); if(r.bottom>bt){ n=all[j]; break; } } }
    if(!n) return;
    follow(n);
    if(typing() && !n.classList.contains('rn-d')){ tyOpen(n); return; }
    if(grading()) mark(n,1); else n.classList.add('rn-show'); kOpened.push(n); }
  function kPrev(){ tyClose(); var p=kOpened.pop(); if(p){ shut(p, true); follow(p); } }
  function kMark(ok){ var t=lastT; if(!grading() || !t || !t.classList.contains('rn-show') || !document.contains(t)) return; mark(t, ok); }
  
  document.addEventListener('keydown', function(ev){
    var sp=ev.key===' '||ev.code==='Space', cv=(ev.code==='KeyC'||ev.code==='KeyV') && !ev.shiftKey && grading();   // C 맞음 · V 틀림 — 글자 대신 자리(code)로 본다(한글 자판이면 key 가 ㅊ·ㅍ)
    if(mode==='off' || ev.metaKey || ev.ctrlKey || ev.altKey || (!sp && !cv && ev.key!=='ArrowRight' && ev.key!=='ArrowLeft')) return;
    var a=document.activeElement; if(ty || opener || (a && (/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName) || a.isContentEditable))) return;
    ev.preventDefault(); if(cv) kMark(ev.code==='KeyC'?1:0); else if(ev.key==='ArrowLeft' || (sp && ev.shiftKey)) kPrev(); else kNext(); });
  
  var padPrev=[], padT=0;
  function padLoop(){ try{ var gs=navigator.getGamepads(), g=null; for(var i=0;i<gs.length;i++) if(gs[i]&&gs[i].connected){ g=gs[i]; break; }
      if(g && !opener){ var b=g.buttons, now=Date.now(), dn=function(k){ return !!(b[k]&&(b[k].pressed||b[k].value>.5)); };
        [[0,kNext],[15,kNext],[2,kPrev],[14,kPrev],[1,function(){ kMark(1); }],[3,function(){ kMark(0); }]].forEach(function(x){ var is=dn(x[0]); if(is && !padPrev[x[0]] && mode!=='off') x[1](); padPrev[x[0]]=is; });
        [12,13].forEach(function(k){ var is=dn(k); if(is && (!padPrev[k] || now-padT>110)){ scrollBy(0, (k===13?1:-1)*Math.round(innerHeight*.12)); padT=now; } padPrev[k]=is; }); } }catch(e){}
    requestAnimationFrame(padLoop); }
  if(navigator.getGamepads) requestAnimationFrame(padLoop);
  
  var mm=document.createElement('div'); mm.className='rn-mm'; mm.setAttribute('role','menu');
  mm.innerHTML=ITEMS.map(function(x){ return '<button type="button" role="menuitemradio" data-m="'+x[0]+'"><span class="ck">'+CHECK+'</span><span class="t"><b>'+x[1]+'</b>'+(x[2]?'<small>'+x[2]+'</small>':'')+'</span></button>'; }).join('')+
    '<button type="button" class="tg" role="menuitemcheckbox" data-t="1"><span class="ck">'+CHECK+'</span><span class="t"><b>타이핑으로 열기</b><small>개념어 마스킹에서 · 모르면 보기</small></span></button>'+
    '<button type="button" role="menuitemcheckbox" data-g="1"><span class="ck">'+CHECK+'</span><span class="t"><b>맞음·틀림 기록</b><small>연 칸 한 번 더 누르면 틀림</small></span></button>'+
    '<button type="button" class="go" role="menuitemcheckbox" data-w="1"><span class="ck">'+CHECK+'</span><span class="t"><b>헷갈린 것만 가리기</b><small>빨강·노랑 칸만</small></span></button>'+
    '<div class="go rs"></div>'+
    '<button type="button" class="go x" data-x="1"><span class="ck"></span><span class="t"><b>이 과목 기록 지우기</b></span></button>'+
    '<div class="nt">교육과정 글은 어느 쪽이든 <u>밑줄 친 핵심어</u>만 가림 · 가린 칸을 누르면 열림<span class="kb"> · 키보드 Space 다음 칸 · Shift+Space 닫기</span><span class="kb go"> · C 맞음 · V 틀림</span></div>';
  document.body.appendChild(mm);
  var btns=[], opener=null;
  function paint(){ document.body.classList.toggle('rn-m-term', mode==='term'); document.body.classList.toggle('rn-m-desc', mode==='desc');
    btns.forEach(function(b){ b.innerHTML=(mode==='off'?BOX:BOXF)+'<span>마스킹</span>'; b.classList.toggle('on', mode!=='off'); b.setAttribute('aria-label','마스킹 — 지금 '+BTN[mode]); b.title=b.getAttribute('aria-label'); });
    [].forEach.call(mm.querySelectorAll('button[data-m]'), function(x){ x.classList.toggle('sel', x.dataset.m===mode); x.setAttribute('aria-checked', x.dataset.m===mode); });
    var tv='0'; try{ tv=localStorage.getItem(TKEY)||'0'; }catch(e){} var tb=mm.querySelector('button[data-t]'); tb.classList.toggle('sel', tv==='1'); tb.setAttribute('aria-checked', tv==='1');
    [['g',GKEY],['w',WKEY]].forEach(function(x){ var b=mm.querySelector('button[data-'+x[0]+']'), v=flag(x[1]); b.classList.toggle('sel', v); b.setAttribute('aria-checked', v); });
    var g=grading(), wo=g && flag(WKEY); mm.classList.toggle('g', flag(GKEY)); document.body.classList.toggle('rn-g', g);
    [].forEach.call(main.querySelectorAll('[data-rk]'), function(e){ var l=lv(rec[e.dataset.rk]); e.classList.toggle('rn-pass', wo && l!=='w' && l!=='y'); }); }   // 「헷갈린 것만」 고르기는 여기서만(푸는 도중 칸이 들쭉날쭉하지 않게)
  
  function stats(){ var el=mm.querySelector('.rs'), c={r:0,y:0,w:0}, n=0, w=0, m=0;
    for(var k in rec){ var r=rec[k], l=lv(r); if(!l) continue; c[l]++; m++; n+=r[0]; w+=r[1]; }
    if(!m){ el.style.display='none'; return; } el.style.display='';
    var seg=function(x,col){ return c[x]?'<b style="width:'+(c[x]*100/m)+'%;background:'+col+'"></b>':''; };
    el.innerHTML='<span>'+m+'칸 · 정답률 '+Math.round((n-w)*100/Math.max(1,n))+'%</span><i>'+seg('r','#30A15A')+seg('y','#E8A400')+seg('w','#E0483E')+'</i>'; }
  function shutAll(){ [].forEach.call(main.querySelectorAll('.rn-show'), function(e){ shut(e); }); tyClose(); kOpened=[]; lastT=null; }
  function close(){ mm.classList.remove('on'); if(opener) opener.setAttribute('aria-expanded','false'); opener=null; }
  function open(b){ stats(); var r=b.getBoundingClientRect(); mm.classList.add('on');
    mm.style.top=(r.bottom+6)+'px'; mm.style.left=Math.max(8, Math.min(innerWidth-mm.offsetWidth-8, r.right-mm.offsetWidth))+'px';
    opener=b; b.setAttribute('aria-expanded','true'); }
  mm.addEventListener('click', function(ev){ var tb=ev.target.closest('button[data-t]');
    if(tb){ var tv='0'; try{ tv=localStorage.getItem(TKEY)||'0'; localStorage.setItem(TKEY, tv==='1'?'0':'1'); }catch(e){} tyClose(); paint(); return; }
    var fb=ev.target.closest('button[data-g],button[data-w]');
    if(fb){ var fk=fb.hasAttribute('data-g')?GKEY:WKEY; try{ localStorage.setItem(fk, flag(fk)?'0':'1'); }catch(e){} shutAll(); paint(); return; }
    if(ev.target.closest('button[data-x]')){ close();
      if(confirm('이 과목의 맞음·틀림 기록을 모두 지우겠습니까?')){ rec=all[PAGE]={}; save(); [].forEach.call(main.querySelectorAll('[data-rk]'), tint); shutAll(); paint(); }
      return; }
    var x=ev.target.closest('button[data-m]'); if(!x) return;
    var to=(x.dataset.m===mode && mode!=='off')?'off':x.dataset.m;   // 체크된 것을 다시 누르면 끈다(10-08)
    if(to!==mode){ mode=to; try{ localStorage.setItem(KEY,mode); }catch(e){}
      shutAll(); paint(); }
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
