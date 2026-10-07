
(function(){
  var TOC=window.RN_TOC||{}, FORM='https://docs.google.com/forms/d/e/1FAIpQLSfz6jnwKa5X7m2UGdgl0CS1w878pH9G4IJCBow2QKHcaJN0Yg/formResponse', E_SUBJ='entry.1832714038', E_TEXT='entry.524873215';
  var h1=document.querySelector('main.wrap h1'); var SUBJ=(h1?h1.textContent:document.title).replace(/^.*?(\d+\.)?/, function(m){return '';});
  var file=decodeURIComponent(location.pathname.split('/').pop()||''); var m=file.match(/^\d+\.(.+)\.html$/); if(m) SUBJ=m[1];
  var G=TOC[SUBJ]; if(!G) return;
  var css=document.createElement('style'); css.textContent=
   '.rn-fab{position:fixed;right:16px;bottom:calc(16px + env(safe-area-inset-bottom));z-index:60;display:flex;align-items:center;gap:6px;height:44px;padding:0 16px;border:0;border-radius:22px;background:var(--card);color:var(--label);font:inherit;font-size:15px;font-weight:600;box-shadow:0 0 0 .5px var(--sep),0 8px 24px rgba(0,0,0,.16);cursor:pointer}'+
   '.rn-fab svg{width:18px;height:18px;color:var(--acc)}'+
   '.rn-pan{position:fixed;z-index:61;background:var(--bg);box-shadow:0 0 0 .5px var(--sep),0 12px 40px rgba(0,0,0,.22);display:flex;flex-direction:column;transition:transform .26s cubic-bezier(.2,.8,.2,1);font-size:17px;line-height:1.5;color:var(--label)}'+
   '@media (min-width:760px){.rn-pan{top:12px;right:12px;bottom:12px;width:340px;border-radius:22px;transform:translateX(calc(100% + 24px))} body.rn-open .rn-fab{display:none}}'+
   '@media (max-width:759px){.rn-pan{left:0;right:0;bottom:0;height:62vh;border-radius:22px 22px 0 0;transform:translateY(105%)} body.rn-open .rn-fab{display:none}}'+
   'body.rn-open .rn-pan{transform:none}'+
   'body:not(.rn-open) .rn-pan{box-shadow:none;visibility:hidden;transition:transform .26s cubic-bezier(.2,.8,.2,1),visibility 0s .26s}'+
   '.rn-hd{display:flex;align-items:center;justify-content:space-between;padding:16px 16px 8px 20px}.rn-hd b{font-size:22px;font-weight:700}'+
   '.rn-x{width:32px;height:32px;border:0;border-radius:16px;background:var(--fill);color:var(--sec);font-size:17px;cursor:pointer}'+
   '.rn-bd{flex:1;overflow:auto;padding:4px 16px calc(16px + env(safe-area-inset-bottom))}'+
   '.rn-grp{background:var(--card);border-radius:18px;overflow:hidden}.rn-row{display:flex;align-items:center;gap:10px;min-height:46px;padding:0 12px 0 16px;position:relative}'+
   '.rn-row+.rn-row:before{content:"";position:absolute;top:0;left:16px;right:0;height:.5px;background:var(--sep)}.rn-row>span{flex:0 0 40px;color:var(--sec);font-size:15px}'+
   '.rn-row select{flex:1;min-width:0;font:inherit;font-size:15px;color:var(--label);background:transparent;border:0;padding:10px 0;text-align:right;text-align-last:right;-webkit-appearance:none;appearance:none}'+
   '.rn-row .v{flex:1;text-align:right;font-size:15px}'+
   '.rn-ta{display:block;box-sizing:border-box;width:100%;min-height:130px;margin:12px 0 0;padding:12px 16px;border:0;border-radius:18px;background:var(--card);font:inherit;font-size:16px;line-height:1.5;color:var(--label);resize:vertical}'+
   '.rn-ta:focus{outline:none;box-shadow:0 0 0 2px var(--acc)}.rn-ta::placeholder{color:var(--ter)}.rn-send{display:block;width:100%;min-height:48px;margin-top:12px;border:0;border-radius:24px;background:var(--acc);color:#fff;font:inherit;font-size:17px;font-weight:600;cursor:pointer}.rn-send:disabled{opacity:.45}.rn-tip{position:fixed;z-index:200;transform:translate(-50%,-100%);padding:8px 14px;border-radius:18px;background:var(--label);color:var(--bg);font-size:14px;line-height:1.4;white-space:nowrap;opacity:0;transition:opacity .2s;pointer-events:none}.rn-tip.on{opacity:.92}'+
   '.rn-ok{display:none;text-align:center;color:var(--sec);padding:10px 0}.rn-ok a{color:var(--acc);text-decoration:none}'+
   
   '.rn-row select{display:none}.rn-pv{flex:1;min-width:0;display:flex;align-items:center;justify-content:flex-end;gap:8px;border:0;background:none;padding:10px 0;font:inherit;font-size:15px;color:var(--sec);cursor:pointer;text-align:right}'+
   '.rn-pv span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.rn-pv.set{color:var(--label)}.rn-pv svg{width:7px;height:12px;flex:0 0 auto;color:var(--ter)}'+
   '.rn-pk{position:absolute;inset:0;z-index:2;background:var(--bg);border-radius:inherit;display:none;flex-direction:column}.rn-pk.on{display:flex}'+
   '.rn-pk-ls{flex:1;overflow:auto;margin:0 16px 16px;background:var(--card);border-radius:14px}'+
   '.rn-pk-ls button{display:flex;align-items:center;gap:10px;width:100%;min-height:46px;padding:10px 14px;border:0;background:none;font:inherit;font-size:15px;line-height:1.4;color:var(--label);text-align:left;cursor:pointer;position:relative}'+
   '.rn-pk-ls button+button:before{content:"";position:absolute;top:0;left:14px;right:0;height:.5px;background:var(--sep)}.rn-pk-ls button.dim{color:var(--sec)}'+
   '.rn-pk-ls svg{width:15px;height:15px;flex:0 0 auto;margin-left:auto;color:var(--acc);visibility:hidden}.rn-pk-ls button.on svg{visibility:visible}.rn-pk-ls button.on{font-weight:600}'+
   '@media print{.rn-fab,.rn-pan{display:none!important}}';
  document.head.appendChild(css);
  var fab=document.createElement('button'); fab.className='rn-fab'; fab.type='button';
  fab.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>피드백';
  var pan=document.createElement('div'); pan.className='rn-pan'; pan.setAttribute('role','dialog'); pan.setAttribute('aria-label','피드백');
  pan.innerHTML='<div class="rn-hd"><b>피드백</b><button class="rn-x" type="button" aria-label="닫기">✕</button></div>'+
    '<div class="rn-bd"><div class="rn-grp"><div class="rn-row"><span>과목</span><div class="v"></div></div>'+
    '<div class="rn-row"><span>단원</span><select class="rn-g"><option value="">선택 안 함</option></select></div>'+
    '<div class="rn-row"><span>절</span><select class="rn-p"><option value="">선택 안 함</option></select></div></div>'+
    '<textarea class="rn-ta" placeholder="고칠 내용"></textarea>'+
    '<button class="rn-send" type="button">보내기</button><div class="rn-ok">보냈어요 · <a href="status.html">처리 현황</a></div></div>';
  document.body.appendChild(fab); document.body.appendChild(pan);
  var q=function(s){return pan.querySelector(s)}, selG=q('.rn-g'), selP=q('.rn-p'), ta=q('.rn-ta'), send=q('.rn-send'), ok=q('.rn-ok');
  q('.v').textContent=SUBJ;
  G.forEach(function(g,i){ var o=document.createElement('option'); o.value=i; o.textContent=g[0]; selG.appendChild(o); });
  function fillP(){ selP.length=1; var g=G[selG.value]; if(g) g[2].forEach(function(k){ var o=document.createElement('option'); o.value=k[0]; o.textContent=k[0]; selP.appendChild(o); }); }
  selG.onchange=fillP;
  var CV='<svg viewBox="0 0 8 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M1 1l6 6-6 6"/></svg>', CK='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5l3.2 3L13 4.5"/></svg>';
  var pk=document.createElement('div'); pk.className='rn-pk'; pk.innerHTML='<div class="rn-hd"><b></b><button class="rn-x" type="button" aria-label="닫기">✕</button></div><div class="rn-pk-ls"></div>'; pan.appendChild(pk);
  var pkFor=null;
  function esc(s){ return String(s).replace(/[&<>"]/g,function(m){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]; }); }
  [selG, selP].forEach(function(sel){ var b=document.createElement('button'); b.type='button'; b.className='rn-pv'; b.innerHTML='<span></span>'+CV; sel.parentNode.insertBefore(b, sel.nextSibling); sel._pv=b;
    b.onclick=function(){ if(sel.length<2) return; pkFor=sel; pk.querySelector('b').textContent=sel.parentNode.querySelector('span').textContent;
      pk.querySelector('.rn-pk-ls').innerHTML=[].map.call(sel.options, function(o){ return '<button type="button" data-v="'+esc(o.value)+'" class="'+(o.value===sel.value?'on':'')+(o.value?'':' dim')+'"><span>'+esc(o.textContent)+'</span>'+CK+'</button>'; }).join('');
      pk.classList.add('on'); var on=pk.querySelector('.rn-pk-ls .on'); if(on) on.scrollIntoView({block:'center'}); }; });
  function sync(){ [selG, selP].forEach(function(sel){ var b=sel._pv, o=sel.options[sel.selectedIndex]; b.firstChild.textContent=o?o.textContent:''; b.classList.toggle('set', !!sel.value); b.disabled=sel.length<2; }); }
  pk.querySelector('.rn-pk-ls').onclick=function(e){ var b=e.target.closest('button'); if(!b||!pkFor) return; pkFor.value=b.dataset.v; if(pkFor===selG) fillP(); pk.classList.remove('on'); sync(); };
  pk.querySelector('.rn-x').onclick=function(){ pk.classList.remove('on'); };
  sync();
  
  function here(){ var best=-1e9, gi=-1, kn=''; G.forEach(function(g,i){ [[g[1],'']].concat(g[2].map(function(k){return [k[1],k[0]]})).forEach(function(x){
      var el=x[0]&&document.getElementById(x[0]); if(!el||!el.getClientRects().length) return; var t=el.getBoundingClientRect().top;
      if(t<=100 && t>best){ best=t; gi=i; kn=x[1]; } }); });
    if(gi>=0){ selG.value=gi; fillP(); selP.value=kn; } sync(); }
  
  var tip=function(btn,msg){ var t=document.querySelector('.rn-tip'); if(!t){ t=document.createElement('div'); t.className='rn-tip'; document.body.appendChild(t); } var r=btn.getBoundingClientRect(); t.textContent=msg; t.style.left=(r.left+r.width/2)+'px'; t.style.top=(r.top-10)+'px'; t.classList.add('on'); clearTimeout(t._h); t._h=setTimeout(function(){ t.classList.remove('on'); },1800); }
  function check(){}
  ta.oninput=check;
  function open(){ here(); document.body.classList.add('rn-open'); ok.style.display='none'; setTimeout(function(){ ta.focus(); }, 280); }
  function close(){ document.body.classList.remove('rn-open'); pk.classList.remove('on'); }
  fab.onclick=open; q('.rn-x').onclick=close;
  document.addEventListener('keydown', function(e){ if(e.key==='Escape') close(); });
  send.onclick=function(){ if(send.disabled) return; if(!ta.value.trim()){ tip(send,'고칠 내용을 적어 주세요'); ta.focus(); return; } send.disabled=true; send.textContent='보내는 중…';
    var g=G[selG.value], where=[g&&g[0], selP.value].filter(Boolean).join(' > ');
    var body=new URLSearchParams(); body.append(E_SUBJ, SUBJ); body.append(E_TEXT, (where?'[위치] '+where+'\n':'')+'[내용] '+ta.value.trim());
    fetch(FORM,{method:'POST',mode:'no-cors',body:body}).then(function(){ ta.value=''; send.disabled=false; send.textContent='보내기'; ok.style.display='block'; })
      .catch(function(){ send.disabled=false; send.textContent='다시 보내기'; alert('보내지 못했어요'); }); };
})();
