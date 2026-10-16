
(function(){
  var on=/[?&]dbg=1/.test(location.search);
  try{ if(/[?&]dbg=0/.test(location.search)){ sessionStorage.removeItem('rn_dbg'); return; } if(on) sessionStorage.setItem('rn_dbg','1'); else on=sessionStorage.getItem('rn_dbg')==='1'; }catch(e){}
  if(!on) return;
  var box=document.createElement('div');
  box.style.cssText='position:fixed;left:6px;bottom:6px;z-index:2147483647;max-width:min(94vw,560px);font:11px/1.35 ui-monospace,Menlo,monospace;background:rgba(0,0,0,.85);color:#7CFC00;padding:6px 8px;border-radius:8px;white-space:pre-wrap;word-break:break-all;pointer-events:none;max-height:48vh;overflow:hidden';
  document.body.appendChild(box);
  var L=[], t0=Date.now();
  function log(s){ L.push(((Date.now()-t0)/1000).toFixed(1)+' '+s); if(L.length>16) L.shift(); box.textContent=L.join('\n'); }
  function where(){ var st=String(new Error().stack||'').split(String.fromCharCode(10)).slice(3), out=[];
    for(var i=0;i<st.length&&out.length<2;i++){ var m=st[i].match(/([\w.%-]+\.(?:js|html))(?:\?[^:]*)?:(\d+)/); if(m) out.push(decodeURIComponent(m[1]).replace(/\.js$/,'')+':'+m[2]); }
    return out.join('<')||'?'; }
  var lastProg=0, lastS='';
  function wrap(o,k,name,quiet){ var f=o&&o[k]; if(typeof f!=='function') return;
    o[k]=function(){ lastProg=Date.now(); lastS=name+'@'+where(); if(!quiet) log('▶ '+lastS+' '+JSON.stringify([].slice.call(arguments)).slice(0,50)); return f.apply(this,arguments); }; }
  wrap(window,'scrollTo','scrollTo'); wrap(window,'scroll','scroll'); wrap(window,'scrollBy','scrollBy');
  wrap(Element.prototype,'scrollIntoView','intoView'); wrap(HTMLElement.prototype,'focus','focus');
  wrap(history,'pushState','push'); wrap(history,'replaceState','replace',true);
  try{ var se=document.scrollingElement||document.documentElement, d=Object.getOwnPropertyDescriptor(Element.prototype,'scrollTop');
    Object.defineProperty(se,'scrollTop',{configurable:true, get:function(){ return d.get.call(this); }, set:function(v){ lastProg=Date.now(); lastS='scrollTop@'+where(); log('▶ '+lastS+' '+v); d.set.call(this,v); }}); }catch(e){}
  var touching=false, tEnd=0;
  addEventListener('touchstart',function(){ touching=true; },{passive:true,capture:true});
  addEventListener('touchend',function(){ touching=false; tEnd=Date.now(); },{passive:true,capture:true});
  addEventListener('touchcancel',function(){ touching=false; tEnd=Date.now(); },{passive:true,capture:true});
  function topText(){ var e=document.elementFromPoint(innerWidth/2, Math.min(innerHeight-1,140)); return e?(e.textContent||'').replace(/\s+/g,' ').trim().slice(0,14):'-'; }
  var py=scrollY, ph=document.documentElement.scrollHeight;
  (function tick(){ var y=scrollY, h=document.documentElement.scrollHeight;
    if(Math.abs(y-py)>1200) log('⚡ '+Math.round(py)+'→'+Math.round(y)+(touching?' 손가락':' 뗀지 '+(Date.now()-tEnd)+'ms')+' · 코드 '+(lastProg?(Date.now()-lastProg)+'ms전 '+lastS:'없음')+' · 길이 '+ph+'→'+h+' · 높이 '+innerHeight+' · #'+decodeURIComponent(location.hash.slice(1)).slice(0,16)+' · '+topText());
    else if(Math.abs(h-ph)>800) log('↕ 길이 '+ph+'→'+h+' y '+Math.round(y));
    py=y; ph=h; requestAnimationFrame(tick); })();
  var rw=innerWidth, rh=innerHeight;
  addEventListener('resize',function(){ if(innerWidth!==rw) log('◻ 폭 '+rw+'→'+innerWidth); rw=innerWidth; rh=innerHeight; });
  addEventListener('hashchange',function(){ log('# '+decodeURIComponent(location.hash).slice(0,24)); });
  addEventListener('popstate',function(){ log('◀ popstate'); });
  addEventListener('pageshow',function(e){ log('pageshow'+(e.persisted?' 캐시':'')); });
  document.addEventListener('focusin',function(e){ var t=e.target; log('◎ 초점 '+t.tagName+'.'+String(t.className||'').slice(0,20)); });
  log('진단 켜짐 · '+innerWidth+'×'+innerHeight+' · y '+Math.round(scrollY));
})();

(function(){
  var sb=document.querySelector('.sidebar'), tb=document.querySelector('.tocbtn'), main=document.querySelector('main.wrap'); if(!sb||!tb||!main) return;
  var h1=main.querySelector('h1'), SUBJ=h1?h1.textContent.trim().replace(/^\d+\./,''):document.title;
  var PEN='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>';
  var DL='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11M7 10.5l5 5 5-5M5 20h14"/></svg>';
  var BACK='<svg viewBox="0 0 10 17" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 1.5 1.5 8.5l7 7"/></svg>';
  var css=document.createElement('style'); css.textContent=
   ':root{--rn-bar:52px}'+
   '.rn-bar{position:absolute;top:0;left:0;right:0;z-index:30;height:var(--rn-bar);display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);align-items:center;gap:4px;padding:0 8px;box-shadow:0 .5px 0 var(--sep);background:var(--bg)}'+
   '.rn-bar>.rn-menu{justify-self:start}.rn-bar>.rn-t{max-width:52vw}.rn-bar>:last-child:not(.rn-t){justify-self:end}'+   
   '.rn-bar.peek{position:fixed;background:var(--glass,var(--bg));-webkit-backdrop-filter:blur(20px) saturate(180%);backdrop-filter:blur(20px) saturate(180%);animation:rnDown .2s ease}'+
   '@keyframes rnDown{from{transform:translateY(-100%)}to{transform:none}}'+
   '.rn-bar a.rn-home{display:flex;align-items:center;gap:2px;color:var(--acc);text-decoration:none;font-size:16px;padding:8px 6px;white-space:nowrap}'+
   '.rn-bar a.rn-home svg{width:10px;height:17px}'+
   '.rn-bar .rn-t{min-width:0;text-align:center;font-weight:600;font-size:16px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--label)}'+
   '.rn-bar button,.rn-sf button{width:40px;height:40px;border:0;border-radius:20px;background:transparent;color:var(--label);display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0;flex:0 0 auto}'+
   '.rn-bar button:hover,.rn-sf button:hover{background:var(--fill)}.rn-bar button svg,.rn-sf button svg{width:21px;height:21px}'+
   '.rn-fb svg{color:var(--acc)}'+
   '.rn-pp{float:right;width:28px;height:28px;margin:-4px -6px 0 6px;border-radius:14px;display:flex;align-items:center;justify-content:center;color:var(--ter)}.rn-pp:hover{background:var(--fill);color:var(--acc)}.rn-pp svg{width:16px;height:16px}'+
   '.rn-bar a.rn-pdf,.rn-sf a.rn-pdf{width:40px;height:40px;border-radius:20px;color:var(--label);display:flex;align-items:center;justify-content:center;flex:0 0 auto}.rn-bar a.rn-pdf:hover,.rn-sf a.rn-pdf:hover{background:var(--fill)}.rn-bar a.rn-pdf svg,.rn-sf a.rn-pdf svg{width:21px;height:21px}'+
   '.rn-sf{position:sticky;bottom:0;margin:16px -20px 0;padding:8px 12px calc(12px + env(safe-area-inset-bottom));display:flex;align-items:center;gap:4px;background:var(--bg);box-shadow:0 -.5px 0 var(--sep)}'+
   '.rn-sf .rn-fb{width:auto;padding:0 12px;gap:6px;font:inherit;font-size:15px;font-weight:600;margin-right:auto}.rn-sf .rn-fb svg{width:18px;height:18px}'+
   '.rn-sh{font-size:24px;line-height:30px;font-weight:700;color:var(--label);margin:0 0 10px}'+
   '.rn-back{display:flex;align-items:center;gap:4px;align-self:flex-start;margin:0 0 6px -4px;padding:6px 10px 6px 6px;border-radius:10px;color:var(--acc);text-decoration:none;font-size:15px;font-weight:500}'+
   '.rn-back:hover{background:var(--fill)}.rn-back svg{width:9px;height:15px}'+
   
   '.tocbtn,.rn-tg,.rn-fab{display:none!important}'+
   '.sidebar{left:0;bottom:0;border-radius:0;box-shadow:0 0 0 .5px var(--sep);background:var(--bg);width:280px;padding:20px 20px 32px;display:flex;flex-direction:column}'+
   '.sidebar>.toc-view,.sidebar>.list-view{flex:1 0 auto}.sidebar .tochead{display:none}'+
   '.tnav a.rn-on,.tgrp>summary .gh.rn-on,.tgrp.one .gh.rn-on{color:var(--acc)!important;font-weight:600}'+
   
   '.rn-a{display:none}@media (hover:hover){.rn-a{display:inline;margin-left:.35em;color:var(--ter);text-decoration:none;font-weight:400;opacity:0;transition:opacity .12s}'+
     '.rn-ah:hover .rn-a{opacity:.55}.rn-a:hover{opacity:1!important;color:var(--acc)}}'+
   '.rn-hit{background:linear-gradient(rgba(255,206,0,.45),rgba(255,206,0,.45)) 0 50%/100% 1.15em no-repeat;-webkit-box-decoration-break:clone;box-decoration-break:clone;transition:background-size 1.1s ease-out}.rn-hit.rn-hit-out{background-size:100% 0}'+   
   '.rn-toast{position:fixed;left:50%;bottom:28px;transform:translateX(-50%);z-index:70;padding:8px 14px;border-radius:18px;background:var(--label);color:var(--bg);font-size:14px;opacity:0;transition:opacity .2s;pointer-events:none}.rn-toast.on{opacity:.92}'+
   
   'main.wrap .clpsd[hidden=until-found]{display:block!important;height:0!important;margin:0!important;padding:0!important;border:0!important;overflow:hidden}'+
   '@media (min-width:1400px){.rn-bar{display:none}main.wrap{padding-top:40px!important}'+
     '.sidebar{top:0!important;transform:none!important;transition:none;padding-bottom:0}.scrim{display:none!important}'+
     'main.wrap{margin-left:max(280px,calc((100% - 1160px)/2))!important;width:min(calc(100% - 280px),1160px)!important;transition:none}}'+
   '@media (min-width:1000px) and (max-width:1399px){body.tocopen main.wrap{margin-left:auto!important;width:min(100%,1160px)!important}body.tocopen .scrim{display:block}}'+
   '@media (max-width:1399px){body.tocopen .rn-top{display:none}main.wrap{padding-top:calc(var(--rn-bar) + 28px)!important}.sidebar{width:min(320px,86vw);max-width:none}}'+
   '.rn-top{position:fixed;right:calc(16px + env(safe-area-inset-right));bottom:calc(16px + env(safe-area-inset-bottom));z-index:29;width:44px;height:44px;border:0;border-radius:22px;padding:0;cursor:pointer;'+
     'display:flex;align-items:center;justify-content:center;color:var(--label);background:var(--glass,var(--card));-webkit-backdrop-filter:blur(20px) saturate(180%);backdrop-filter:blur(20px) saturate(180%);'+
     'box-shadow:0 0 0 .5px var(--sep),0 4px 14px rgba(0,0,0,.10);opacity:0;transform:translateY(8px);pointer-events:none;transition:opacity .2s,transform .2s}'+
   '.rn-top.on{opacity:1;transform:none;pointer-events:auto}.rn-top svg{width:20px;height:20px}'+
   'body.rn-open .rn-bar,body.rn-open .rn-top{display:none}'+
   '@media print{.rn-bar,.rn-a,.rn-top{display:none!important}main.wrap{padding-top:0!important;margin-left:auto!important}}';
  document.head.appendChild(css);
  
  var PF=decodeURIComponent(location.pathname.split('/').pop()||'').replace(/\.html$/,'.pdf');
  var PDFA=(window.RN_PDF&&/\.pdf$/.test(PF))?'<a class="rn-pdf" href="'+window.RN_PDF+encodeURIComponent(PF)+'" download="'+PF+'" aria-label="PDF로 받기" title="PDF로 받기">'+DL+'</a>':'';
  var bar=document.createElement('div'); bar.className='rn-bar';
  bar.innerHTML='<button class="rn-menu" type="button" aria-label="이 과목 목차"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>'+
    '<div class="rn-t"></div>';   // 오른쪽 = 가리기(rn-mask.js가 붙인다)
  var title=bar.querySelector('.rn-t'); title.textContent=SUBJ;
  document.body.insertBefore(bar, document.body.firstChild);
  
  var back=document.createElement('a'); back.className='rn-back'; back.href='index.html'; back.innerHTML=BACK+'전체 과목';
  var sh=document.createElement('div'); sh.className='rn-sh'; sh.textContent=SUBJ;
  sb.insertBefore(sh, sb.firstChild); sb.insertBefore(back, sh);
  var sf=document.createElement('div'); sf.className='rn-sf';
  sf.innerHTML='<button class="rn-fb" type="button">'+PEN+'<span>피드백</span></button>'+PDFA+'<button class="rn-th" type="button"></button>';
  sb.appendChild(sf);
  var fab=document.querySelector('.rn-fab'), tg=document.querySelector('.rn-tg');
  var fbs=[].slice.call(document.querySelectorAll('.rn-bar .rn-fb,.rn-sf .rn-fb')), ths=[].slice.call(document.querySelectorAll('.rn-bar .rn-th,.rn-sf .rn-th'));
  fbs.forEach(function(b){ if(fab) b.onclick=function(){ if(!wide()&&sb.classList.contains('open')) tb.click(); fab.click(); }; else b.remove(); });   // 좁은 화면 = 서랍 안 버튼이라 서랍을 닫고 연다
  function syncTh(){ ths.forEach(function(b){ b.innerHTML=tg.innerHTML; b.setAttribute('aria-label',tg.getAttribute('aria-label')||'테마'); }); }
  if(tg){ ths.forEach(function(b){ b.onclick=function(){ tg.click(); syncTh(); }; }); syncTh(); new MutationObserver(syncTh).observe(tg,{childList:true}); } else ths.forEach(function(b){ b.remove(); });
  bar.querySelector('.rn-menu').onclick=function(){ tb.click(); };
  
  function wide(){ return innerWidth>=1400; }
  sb.addEventListener('click', function(ev){ if(ev.target.closest('a[href^="#"]')&&!wide()&&innerWidth>=1000&&sb.classList.contains('open')) tb.click(); });   // kit은 1000 이상을 넓은 화면으로 보고 안 닫는다
  
  var sbHover=false, sbTouch=0;
  sb.addEventListener('mouseenter', function(){ sbHover=true; }); sb.addEventListener('mouseleave', function(){ sbHover=false; });
  ['wheel','touchstart','scroll'].forEach(function(e){ sb.addEventListener(e, function(){ if(!sb._rnAuto) sbTouch=Date.now(); }, {passive:true}); });
  
  function place(){ if(wide()){ sb.style.top=''; return; } var bh=bar.offsetHeight||52;
    sb.style.top=(bar.classList.contains('peek')?bh:Math.max(0,bh-scrollY))+'px'; }
  var wasWide=null;
  function fix(){ var w=wide();
    if(w&&!sb.classList.contains('open')){ sb.classList.add('open'); document.body.classList.add('tocopen'); dispatchEvent(new Event('resize')); }
    else if(!w&&wasWide!==false&&sb.classList.contains('open')) tb.click();   // 처음 열 때·넓다가 좁아질 때는 서랍을 닫아 둔다
    wasWide=w; place(); }
  fix(); addEventListener('resize', fix);
  
  var top=document.createElement('button'); top.type='button'; top.className='rn-top'; top.setAttribute('aria-label','맨 위로');
  top.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5.5 11.5 12 5l6.5 6.5"/></svg>';
  top.onclick=function(){ scrollTo({top:0,behavior:'smooth'}); }; document.body.appendChild(top);
  var lastY=scrollY; addEventListener('scroll', function(){ var y=scrollY, bh=bar.offsetHeight||52; top.classList.toggle('on', y>innerHeight);
    if(wide()||y<=bh) bar.classList.remove('peek');
    else if(!sb.classList.contains('open')){ if(y<lastY-8) bar.classList.add('peek'); else if(y>lastY+4) bar.classList.remove('peek'); }
    lastY=y; place(); spy(); }, {passive:true});
  
  var links=[].slice.call(sb.querySelectorAll('a[href^="#"]')).map(function(a){ return [a, document.getElementById(decodeURIComponent(a.getAttribute('href').slice(1)))]; }).filter(function(x){ return x[1]; });
  var on=null, hashT=0;
  
  var moved=!location.hash; ['wheel','touchmove','keydown','mousedown'].forEach(function(e){ addEventListener(e, function(){ moved=true; }, {passive:true, once:true}); });
  
  if(location.hash){ var hid=decodeURIComponent(location.hash.slice(1)), hel=document.getElementById(hid);
    if(hel){ var hv=hel.tagName==='A'?(hel.closest('h1,h2,h3,h4,h5,.rn-h')||hel.parentElement):hel, hdone=false, hk=[];
      
      var hn='', hp=[]; try{ var qs=new URLSearchParams(location.search); hn=(qs.get('n')||'').replace(/\s+/g,''); hp=(qs.get('p')||'').split('|').map(function(x){ return x.replace(/\s+/g,''); }).filter(Boolean); }catch(e){}
      if(hn){ var hw=document.createTreeWalker(document.body, 5), cs=[], hx; hw.currentNode=hel;
        while((hx=hw.nextNode())){ if(hx.nodeType===1){ if(hx.tagName==='H2'&&!hx.contains(hel)&&hx!==hv) break; continue; }
          if(hx.parentElement&&hx.parentElement.closest('.rn-a,script,style')) continue;
          for(var ci=0, cv=hx.nodeValue, c0=cv.search(/\S/); ci<cv.length; ci++) if(!/\s/.test(cv[ci])) cs.push([hx,ci,cv[ci],ci===c0]);
          if(cs.length>300000) break; }
        var hs=cs.map(function(c){ return c[2]; }).join(''), hfrom=0;
        hp.forEach(function(x){ var i=hs.indexOf(x, hfrom); if(i>=0) hfrom=i; });   
        var hat=hs.indexOf(hn, hfrom); if(hat<0) hat=hs.indexOf(hn);   // 줄 머리(텍스트 노드 첫 글자)에서 시작하는 것을 먼저 — 같은 말이 문장 중간에도 나올 때 용어 줄로
        for(var h1=hat; h1>=0; h1=hs.indexOf(hn, h1+1)) if(cs[h1][3]){ hat=h1; break; }
        if(hat>=0){ var seg=[]; cs.slice(hat, hat+hn.length).forEach(function(c){ var l=seg[seg.length-1]; if(l&&l[0]===c[0]) l[2]=c[1]+1; else seg.push([c[0],c[1],c[1]+1]); });
          seg.forEach(function(g){ try{ var r=document.createRange(); r.setStart(g[0],g[1]); r.setEnd(g[0],g[2]); var sp=document.createElement('span'); r.surroundContents(sp); hk.push(sp); }catch(e){} });
          if(hk.length&&!hk[0].getClientRects().length){ hk.forEach(function(sp){ var p=sp.parentNode; while(sp.firstChild) p.insertBefore(sp.firstChild, sp); p.removeChild(sp); p.normalize(); }); hk=[]; } } }
      var tg=hk[0]||hv;
      var hfix=function(){ if(moved) return; var y=Math.max(0, tg.getBoundingClientRect().top+scrollY-(hk.length?Math.round(innerHeight*.25):12)); if(Math.abs(y-scrollY)>4){ lastY=y; scrollTo(0, y); } bar.classList.remove('peek'); };   // lastY 먼저 — 위로 맞출 때 「위로 굴림」으로 읽혀 막대가 내려와 덮었다(10-09 패드) · 노드 줄은 화면 위에서 1/4에
      var hfin=function(){ if(hdone) return; hdone=true; hfix();
        if(!hk.length){ var mk=document.createElement('span'); [].slice.call(hv.childNodes).forEach(function(n){ if(!(n.nodeType===1&&n.classList.contains('rn-a'))) mk.appendChild(n); }); hv.insertBefore(mk, hv.firstChild); hk=[mk]; }
        hk.forEach(function(sp){ sp.className='rn-hit'; });
        try{ if(location.search) history.replaceState(history.state,'',location.pathname+location.hash); }catch(e){}
        setTimeout(function(){ hk.forEach(function(sp){ sp.classList.add('rn-hit-out'); }); setTimeout(function(){ hk.forEach(function(sp){ var p=sp.parentNode; if(!p) return; while(sp.firstChild) p.insertBefore(sp.firstChild, sp); p.removeChild(sp); p.normalize(); }); },1200); },2600); };
      if(document.fonts&&document.fonts.ready) document.fonts.ready.then(hfix);
      if(document.readyState==='complete') setTimeout(hfin,600); else addEventListener('load', function(){ hfix(); setTimeout(hfin,600); });
      setTimeout(hfin, 4000); } }
  
  var grps=[].slice.call(sb.querySelectorAll('details.tgrp')), curG=null;
  function openG(g){ if(!g||g===curG) return; curG=g; grps.forEach(function(d){ d.open=(d===g); }); }
  openG(grps[0]);
  function spy(){ var best=null, bt=-1e9, lim=innerHeight*.3; links.forEach(function(x){ if(!x[1].getClientRects().length) return; var t=x[1].getBoundingClientRect().top; if(t<=lim&&t>bt){ bt=t; best=x; } });
    var a=best&&best[0];
    clearTimeout(hashT); if(moved) hashT=setTimeout(function(){ var h=a&&scrollY>200?a.getAttribute('href'):''; if(location.hash!==h&&decodeURIComponent(location.hash)!==decodeURIComponent(h))
      history.replaceState(history.state,'',h||(location.pathname+location.search)); }, 250);
    if(a===on) return; if(on) on.classList.remove('rn-on'); on=a; if(on){ on.classList.add('rn-on'); openG(on.closest('details.tgrp'));
      if(wide()&&!sbHover&&Date.now()-sbTouch>1500){ var r=on.getBoundingClientRect(), s=sb.getBoundingClientRect();
        if(r.top<s.top+40||r.bottom>s.bottom-80){ sb._rnAuto=true; sb.scrollTop+=r.top-s.top-s.height/3; setTimeout(function(){ sb._rnAuto=false; },50); } } } }
  spy();
  
  function markHere(){ var el=on&&document.getElementById(decodeURIComponent(on.getAttribute('href').slice(1)));
    return el?{id:el.id, off:Math.round(el.getBoundingClientRect().top)}:{y:Math.round(scrollY)}; }
  function rnJump(id){ var el=document.getElementById(id); if(!el) return false;
    var st=history.state||{}, h='#'+encodeURIComponent(id).replace(/%2F/g,'/');
    try{ if(!st.rnj){ history.replaceState(Object.assign({}, st, {rnBack:markHere()}), '', location.href); history.pushState({rnj:1}, '', h); }
      else history.replaceState({rnj:1}, '', h); }
    catch(e){ return false; }
    moved=true; window.dispatchEvent(new HashChangeEvent('hashchange'));
    setTimeout(function(){ var e2=document.getElementById(id); if(e2) e2.scrollIntoView({block:'start'}); }, 30); return true; }
  window.rnJump=rnJump;
  sb.addEventListener('click', function(ev){ var a=ev.target.closest('a[href^="#"]'); if(!a||ev.metaKey||ev.ctrlKey||ev.shiftKey) return;
    if(rnJump(decodeURIComponent(a.getAttribute('href').slice(1)))) ev.preventDefault(); });
  addEventListener('popstate', function(ev){ var b=ev.state&&ev.state.rnBack; if(!b) return;
    var go=function(){ var el=b.id&&document.getElementById(b.id); if(el) scrollTo(0, Math.max(0, el.getBoundingClientRect().top+scrollY-b.off)); else if(b.y!=null) scrollTo(0, b.y); };
    go(); setTimeout(go, 60); });
  
  var toast=document.createElement('div'); toast.className='rn-toast'; document.body.appendChild(toast); var toT=0;
  function say(t){ toast.textContent=t; toast.classList.add('on'); clearTimeout(toT); toT=setTimeout(function(){ toast.classList.remove('on'); },1400); }
  links.forEach(function(x){ var id=x[1].id, el=x[1];   // 판의 표지는 제목 앞 빈 <a id> · 과목 묶음 <div id> — 붙일 자리는 그 제목
    if(el.tagName==='A') el=el.parentElement; else if(!/^H\d$/.test(el.tagName)) el=el.querySelector('h2,h3');
    if(!el||el.querySelector('.rn-a')) return;
    var a=document.createElement('a'); a.className='rn-a'; a.href='#'+id; a.textContent='#'; a.setAttribute('aria-label','이 절 링크 복사');
    a.onclick=function(ev){ ev.preventDefault(); ev.stopPropagation(); var u=location.origin+location.pathname+'#'+encodeURIComponent(id);
      (navigator.clipboard?navigator.clipboard.writeText(u):Promise.reject()).then(function(){ say('링크를 복사했어요'); }, function(){ history.replaceState(history.state,'','#'+id); say('주소창에 링크를 넣었어요'); }); };
    el.classList.add('rn-ah'); el.appendChild(a); });
  
  function mark(e){ if(e.classList.contains('clpsd')){ if(!e.hasAttribute('hidden')) e.setAttribute('hidden','until-found'); } else if(e.getAttribute('hidden')==='until-found') e.removeAttribute('hidden'); }
  if('onbeforematch' in document.body){
    new MutationObserver(function(ms){ ms.forEach(function(m){ mark(m.target); }); }).observe(main,{subtree:true,attributes:true,attributeFilter:['class']});
    [].forEach.call(main.querySelectorAll('.clpsd'), mark);
    main.addEventListener('beforematch', function(ev){ var el=ev.target;
      for(var n=0; n<4 && el.classList.contains('clpsd'); n++){ var hs=[].slice.call(main.querySelectorAll('.tg.closed')).filter(function(h){ return h.compareDocumentPosition(el)&Node.DOCUMENT_POSITION_FOLLOWING; });
        if(!hs.length) break; hs[hs.length-1].click(); } });
  }
  
  if(window.RN_PDF&&window.fetch){
    fetch(window.RN_PDF+'parts.json').then(function(r){ return r.ok?r.json():{}; }).then(function(man){
      var subj=decodeURIComponent(location.pathname.split('/').pop()||'').replace(/\.html$/,''), by={};
      (man[subj]||[]).forEach(function(p){ by[p.k]=p; });
      [].forEach.call(sb.querySelectorAll('.tgrp'), function(g,k){ var p=by[k+1]; if(!p) return;
        var host=g.tagName==='DETAILS'?g.querySelector(':scope > summary'):g; if(!host) return;
        var a=document.createElement('a'); a.className='rn-pp'; a.href=window.RN_PDF+p.file.split('/').map(encodeURIComponent).join('/');
        a.setAttribute('download',(SUBJ+' '+p.k+'. '+p.title).replace(/[\/:*?"<>|]/g,'·')+'.pdf');
        a.title='이 대주제만 PDF로 받기 ('+p.pages+'쪽)'; a.setAttribute('aria-label',a.title); a.innerHTML=DL;
        host.insertBefore(a,host.firstChild); });
    }).catch(function(){});
  }
})();
