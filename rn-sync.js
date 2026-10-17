
(function(){
  var DB='https://rn-feedback-signal-default-rtdb.asia-southeast1.firebasedatabase.app/sync/', KEY='rn_quiz_v1', SYK=KEY+'_sync';
  var $=function(i){ return document.getElementById(i); };
  var sy=null; try{ sy=JSON.parse(localStorage.getItem(SYK)||'null'); if(sy&&!/^[A-Z2-9]{12}$/.test(sy.code||'')) sy=null; }catch(e){ sy=null; }
  function sySave(){ try{ if(sy) localStorage.setItem(SYK, JSON.stringify(sy)); else localStorage.removeItem(SYK); }catch(e){} }
  function getRec(){ try{ return JSON.parse(localStorage.getItem(KEY)||'{}')||{}; }catch(e){ return {}; } }
  function putRec(r){ try{ localStorage.setItem(KEY, JSON.stringify(r)); }catch(e){} }
  var FKEEP=60*864e5;   
  function lsJ(k, v){ try{ return JSON.parse(localStorage.getItem(k)||'null')||v; }catch(e){ return v; } }
  function lsP(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
  function fbMerge(F, up){ var now=Date.now(), sent=lsJ('rn-fb-sent',[]).filter(function(x){ return x&&x.t&&x.s&&now-x.t<FKEEP; }), gone=lsJ('rn-fb-gone',[]).filter(function(t){ return now-t<FKEEP; }), ch=false;
    var have={}; sent.forEach(function(x){ have[x.t]=x; });
    Object.keys(F||{}).forEach(function(t){ var v=F[t], n=+t; if(!(now-n<FKEEP)) return;
      if(v===''){ if(gone.indexOf(n)<0){ gone.push(n); ch=true; } if(have[n]){ sent=sent.filter(function(x){ return x.t!==n; }); delete have[n]; ch=true; } }
      else if(!have[n] && gone.indexOf(n)<0){ have[n]={t:n, s:String(v).slice(0,20)}; sent.push(have[n]); ch=true; } });
    sent.forEach(function(x){ if(!F || F[x.t]==null) up['f/'+x.t]=String(x.s).slice(0,20); });
    gone.forEach(function(t){ if(!F || F[t]!=='') up['f/'+t]=''; });
    if(ch){ sent.sort(function(a,b){ return a.t-b.t; }); lsP('rn-fb-sent', sent.slice(-200)); lsP('rn-fb-gone', gone); }
    return ch; }
  function idMerge(rid, up){ var mine=null; try{ mine=localStorage.getItem('rn-fb-id'); }catch(e){}
    if(rid && /^[A-Z2-9]{4}$/.test(rid)){ if(rid!==mine){ try{ localStorage.setItem('rn-fb-id', rid); }catch(e){} return true; } }
    else if(mine && /^[A-Z2-9]{4}$/.test(mine)) up.id=mine; return false; }
  function enc(r){ return r.join(','); }
  function dec(s){ var a=String(s||'').split(',').map(Number); return a.length===4&&a.every(function(x){ return isFinite(x); })?a:null; }
  function norm(s){ return String(s||'').toUpperCase().replace(/[^A-Z0-9]/g,''); }
  function fmt(c){ return c.slice(0,4)+'-'+c.slice(4,8)+'-'+c.slice(8); }
  var cbs=[];
  function changed(){ cbs.forEach(function(f){ try{ f(); }catch(e){} }); paintRow(); }
  function paintRow(){ var v=$('rnSyncV'); if(v) v.textContent=sy?'켜짐':'꺼짐'; }
  function paintAt(){ var e=$('rnsAt'); if(!e||!sy||!sy.at) return; var d=new Date(sy.at); e.innerHTML='<i></i>'+d.getHours()+':'+String(d.getMinutes()).padStart(2,'0'); }
  function push(up){ if(!sy) return Promise.resolve(); up=up||{}; up.at=Date.now(); if(sy.clr) up.clr=sy.clr;
    return fetch(DB+sy.code+'.json',{method:'PATCH',body:JSON.stringify(up)}).then(function(r){ if(!r.ok) throw new Error('push '+r.status); sy.at=Date.now(); sySave(); paintAt(); }); }
  function pull(){ if(!sy) return Promise.resolve(false);
    return fetch(DB+sy.code+'.json',{cache:'no-store'}).then(function(r){ if(!r.ok) throw new Error('pull '+r.status); return r.json(); }).then(function(d){
      d=d||{}; var R=d.r||{}, clr=Math.max(d.clr||0, sy.clr||0), up={}, ch=false, rec=getRec();
      Object.keys(rec).forEach(function(k){ if(!rec[k]||rec[k][2]<=clr){ delete rec[k]; ch=true; } });
      Object.keys(R).forEach(function(k){ var x=dec(R[k]); if(!x||x[2]<=clr) return; if(!rec[k]||rec[k][2]<x[2]){ rec[k]=x; ch=true; } });
      Object.keys(rec).forEach(function(k){ var x=R[k]&&dec(R[k]); if(!x||x[2]<rec[k][2]) up['r/'+k]=enc(rec[k]); });
      if(fbMerge(d.f, up)) ch=true; if(idMerge(d.id, up)) ch=true;
      sy.clr=clr; if(ch) putRec(rec); return push(up).then(function(){ if(ch) changed(); return ch; }); }); }
  var pend={}, pt=0;
  function mark(id){ if(!sy) return; pend[id]=1; clearTimeout(pt); pt=setTimeout(function(){ var rec=getRec(), up={}; Object.keys(pend).forEach(function(k){ if(rec[k]) up['r/'+k]=enc(rec[k]); }); pend={}; push(up).catch(function(){}); }, 2000); }
  function clear(){ putRec({}); if(sy){ sy.clr=Date.now(); sySave(); push({}).catch(function(){}); } }
  function sync(){ if(sy) pull().catch(function(){}); }
  window.RNSync={ on:function(){ return !!sy; }, fbGone:function(t){ var g=lsJ('rn-fb-gone',[]); if(g.indexOf(t)<0){ g.push(t); lsP('rn-fb-gone', g); } if(sy) push({['f/'+t]:''}).catch(function(){}); }, mark:mark, clear:clear, pull:function(){ return sy?pull().catch(function(){ return false; }):Promise.resolve(false); }, onChange:function(f){ cbs.push(f); } };
  document.addEventListener('visibilitychange', function(){ if(document.visibilityState==='visible') sync(); });
  paintRow();

  var pg=$('rnsPage');
  if(!pg){ sync(); return; }
  var css=document.createElement('style');
  css.textContent=
   '.rns-card{background:var(--card);border-radius:22px;box-shadow:var(--shadow);padding:20px;}'+
   '.rns-b{display:block;width:100%;min-height:50px;border:0;border-radius:25px;background:var(--acc);color:#fff;font:inherit;font-size:17px;font-weight:600;cursor:pointer;}'+
   '.rns-b.rns-sub{background:var(--fill);color:var(--acc);}.rns-b:disabled{opacity:.35;cursor:default;}'+
   '.rns-in-row{display:flex;gap:8px;}.rns-in-row input{flex:1;min-width:0;height:50px;box-sizing:border-box;border:0;border-radius:14px;background:var(--fill);padding:0 14px;font:inherit;font-size:18px;letter-spacing:.06em;color:var(--label);text-transform:uppercase;}'+
   '.rns-in-row input::placeholder{letter-spacing:0;text-transform:none;color:var(--ter);}.rns-in-row input:focus{outline:none;box-shadow:0 0 0 2px var(--acc);}.rns-in-row .rns-b{width:auto;flex:0 0 auto;padding:0 22px;}'+
   '.rns-link{display:block;margin:18px auto 0;border:0;background:none;color:var(--acc);font:inherit;font-size:15px;cursor:pointer;}'+
   '.rns-code{padding:14px 0;border-radius:14px;background:var(--fill);text-align:center;font-size:24px;line-height:30px;font-weight:700;letter-spacing:.08em;font-variant-numeric:tabular-nums;color:var(--label);user-select:all;-webkit-user-select:all;}'+
   '.rns-2{display:flex;gap:8px;margin-top:10px;}.rns-2 .rns-b{flex:1;}'+
   '.rns-t{font-size:15px;line-height:21px;color:var(--sec);margin:0 0 12px;}.rns-t:empty{display:none;}'+
   '.rns-keep{margin:14px 2px 0;font-size:14px;line-height:20px;color:var(--sec);}.rns-keep b{color:var(--label);}'+
   '.rns-st{display:flex;align-items:center;justify-content:center;gap:6px;margin-top:14px;font-size:13px;color:var(--sec);font-variant-numeric:tabular-nums;}.rns-st:empty{display:none;}.rns-st i{width:8px;height:8px;border-radius:4px;background:#34C759;}'+
   '.rns-off{display:block;margin:20px auto 0;border:0;background:none;color:#FF3B30;font:inherit;font-size:15px;cursor:pointer;}'+
   '.rns-err{margin:12px 0 0;text-align:center;font-size:13px;color:#FF3B30;}.rns-h{display:none!important;}';
  document.head.appendChild(css);
  pg.innerHTML='<div class="rns-card">'+
    '<div id="rnsOff"><div class="rns-in-row"><input id="rnsCode" placeholder="다른 기기의 연동 코드" autocomplete="off" autocapitalize="characters" spellcheck="false" maxlength="16" aria-label="연동 코드"><button class="rns-b" type="button" id="rnsGo">연결</button></div>'+
      '<button class="rns-link" type="button" id="rnsFirst">처음이면 새 코드 만들기</button></div>'+
    '<div id="rnsLink" class="rns-h"><p class="rns-t" id="rnsLinkT">이 코드로 연결</p><div class="rns-code" id="rnsLinkCode"></div><button class="rns-b" type="button" id="rnsLinkGo" style="margin-top:10px">연결</button></div>'+
    '<div id="rnsOn" class="rns-h"><p class="rns-t" id="rnsOnT"></p><div class="rns-code" id="rnsShow"></div>'+
      '<div class="rns-2"><button class="rns-b" type="button" id="rnsShare">링크 보내기</button><button class="rns-b rns-sub" type="button" id="rnsCp">코드 복사</button></div>'+
      '<p class="rns-keep rns-h" id="rnsKeep"><b>링크 저장해 두기</b> · 기록이 지워져도 다시 받을 수 있음</p>'+
      '<button class="rns-b rns-h" type="button" id="rnsDone" style="margin-top:12px">저장함</button>'+
      '<p class="rns-st" id="rnsAt"></p></div>'+
    '<p class="rns-err rns-h" id="rnsErr"></p></div>'+
    '<button class="rns-off rns-h" type="button" id="rnsOffB">연동 끊기</button>';
  var must=false;
  function only(id){ ['rnsOff','rnsLink','rnsOn'].forEach(function(x){ $(x).classList.toggle('rns-h', x!==id); }); $('rnsErr').classList.add('rns-h'); $('rnsOffB').classList.toggle('rns-h', id!=='rnsOn'); }
  function view(){ if(sy){ only('rnsOn'); $('rnsShow').textContent=fmt(sy.code); paintAt(); $('rnsDone').classList.toggle('rns-h', !must); $('rnsKeep').classList.toggle('rns-h', !must); if(must) $('rnsDone').disabled=true; }
    else only('rnsOff'); }
  function err(m){ var e=$('rnsErr'); e.textContent=m; e.classList.remove('rns-h'); }
  function linkUrl(){ return location.origin+location.pathname+'#sync='+fmt(sy.code); }
  function connect(k, b){ if(b) b.disabled=true;
    return fetch(DB+k+'.json',{cache:'no-store'}).then(function(r){ if(!r.ok) throw 0; return r.json(); }).then(function(d){
      if(!d){ err('이 코드를 찾지 못함 — 다시 확인'); return; }
      sy={code:k}; sySave(); return pull().then(function(){ var n=Object.keys(getRec()).length; view(); $('rnsOnT').textContent='연결됨 · '+n+'문제 맞춤'; $('rnsCode').value=''; paintRow(); }); })
    .catch(function(){ err('연결하지 못함 — 잠시 뒤 다시'); }).then(function(){ if(b) b.disabled=false; }); }
  $('rnsGo').onclick=function(){ var k=norm($('rnsCode').value); if(!/^[A-Z2-9]{12}$/.test(k)){ err('코드 12자리를 그대로 입력'); return; } connect(k, this); };
  $('rnsCode').addEventListener('keydown', function(e){ if(e.key==='Enter'&&!e.isComposing) $('rnsGo').click(); });
  $('rnsLinkGo').onclick=function(){ connect(this.dataset.k, this); };
  $('rnsFirst').onclick=function(){ var b=this, c='ABCDEFGHJKLMNPQRSTUVWXYZ23456789', a=new Uint32Array(12), k=''; crypto.getRandomValues(a); for(var i=0;i<12;i++) k+=c[a[i]%c.length];
    b.disabled=true; sy={code:k}; var rec=getRec(), up={}; Object.keys(rec).forEach(function(id){ up['r/'+id]=enc(rec[id]); }); fbMerge(null, up); idMerge(null, up);
    push(up).then(function(){ sySave(); must=true; view(); paintRow(); }).catch(function(){ sy=null; err('연결하지 못함 — 잠시 뒤 다시'); }).then(function(){ b.disabled=false; }); };
  $('rnsDone').onclick=function(){ must=false; view(); };
  $('rnsShare').onclick=function(){ var b=this, u=linkUrl(); $('rnsDone').disabled=false;
    if(navigator.share) navigator.share({title:'기기 연동', url:u}).catch(function(){});
    else (navigator.clipboard?navigator.clipboard.writeText(u):Promise.reject()).then(function(){ b.textContent='링크 복사됨'; setTimeout(function(){ b.textContent='링크 보내기'; },1500); }, function(){ err('복사 안 됨 — 코드를 길게 눌러 복사'); }); };
  $('rnsCp').onclick=function(){ var b=this; $('rnsDone').disabled=false; (navigator.clipboard?navigator.clipboard.writeText(fmt(sy.code)):Promise.reject()).then(function(){ b.textContent='복사됨'; setTimeout(function(){ b.textContent='코드 복사'; },1500); }, function(){ err('복사 안 됨 — 코드를 길게 눌러 복사'); }); };
  $('rnsOffB').onclick=function(){ if(!confirm('연동을 끊습니다. 기록은 이 기기에 남습니다.')) return; sy=null; sySave(); must=false; view(); paintRow(); };
  view(); sync();
  addEventListener('beforeunload', function(e){ if(must){ e.preventDefault(); e.returnValue=''; } });
  var m=location.hash.match(/^#sync=([A-Za-z0-9-]{12,16})$/);
  if(m){ var k=norm(m[1]); try{ history.replaceState(history.state,'',location.pathname+location.search); }catch(e){}
    if(/^[A-Z2-9]{12}$/.test(k)&&!(sy&&sy.code===k)){ only('rnsLink'); $('rnsLinkCode').textContent=fmt(k); $('rnsLinkGo').dataset.k=k;
      $('rnsLinkT').textContent=sy?'다른 코드로 연동 중 · 이 코드로 바꾸기':'이 코드로 연결'; } }
})();
