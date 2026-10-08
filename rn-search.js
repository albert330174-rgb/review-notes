
(function(){
  var FILE=decodeURIComponent(location.pathname.split('/').pop()||'index.html');
  var SUBJ=(FILE.match(/^\d+\.(.+)\.html$/)||[])[1]||'';
  var ICON='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></svg>';
  var css=document.createElement('style');
  css.textContent=
   '.rn-r{display:flex;align-items:center;gap:2px;justify-self:end}'+
   '.rn-sxf{display:flex;align-items:center;gap:8px;width:100%;height:36px;margin:0 0 12px;padding:0 12px;border:0;border-radius:10px;background:var(--fill);color:var(--ter);font:inherit;font-size:15px;cursor:pointer;text-align:left}'+
   '.rn-sxf svg{width:17px;height:17px;flex:0 0 auto}.in .rn-sxf{height:44px;font-size:17px;border-radius:12px;margin:0 0 24px}'+
   '.rn-sx{position:fixed;inset:0;z-index:95;display:none;background:rgba(0,0,0,.32);align-items:flex-start;justify-content:center;padding:10vh 16px 16px;box-sizing:border-box}'+
   '.rn-sx.on{display:flex}'+
   '.rn-sx-in{width:100%;max-width:640px;max-height:80vh;display:flex;flex-direction:column;background:var(--bg);border-radius:22px;box-shadow:0 20px 60px rgba(0,0,0,.25);overflow:hidden}'+
   '.rn-sx-hd{display:flex;align-items:center;gap:8px;padding:14px 14px 10px}'+
   '.rn-sx-f{flex:1;min-width:0;display:flex;align-items:center;gap:8px;height:42px;padding:0 6px 0 12px;border-radius:12px;background:var(--fill);color:var(--ter)}'+
   '.rn-sx-f svg{width:18px;height:18px;flex:0 0 auto}'+
   '.rn-sx-f input{flex:1;min-width:0;border:0;background:transparent;font:inherit;font-size:17px;color:var(--label);outline:none;padding:0}'+
   '.rn-sx-f input::-webkit-search-cancel-button{display:none}'+
   '.rn-sx-c{width:28px;height:28px;border:0;border-radius:14px;background:transparent;color:var(--ter);font-size:15px;cursor:pointer;visibility:hidden}.rn-sx-c.on{visibility:visible}'+
   '.rn-sx-x{border:0;background:none;color:var(--acc);font:inherit;font-size:17px;padding:8px 4px;cursor:pointer;flex:0 0 auto}'+
   '.rn-sx-seg{display:flex;margin:0 14px 10px;padding:2px;border-radius:9px;background:var(--fill)}'+
   '.rn-sx-seg button{flex:1;height:30px;border:0;border-radius:7px;background:transparent;color:var(--label);font:inherit;font-size:14px;font-weight:500;cursor:pointer}'+
   '.rn-sx-seg button.on{background:var(--card);box-shadow:0 1px 3px rgba(0,0,0,.12);font-weight:600}'+
   '.rn-sx-ls{overflow:auto;padding:0 14px 14px;-webkit-overflow-scrolling:touch}'+
   '.rn-sx-ls:empty{padding:0}'+
   '.rn-sx-g{background:var(--card);border-radius:14px;box-shadow:var(--shadow);overflow:hidden}'+
   '.rn-sx-g a{display:block;padding:11px 16px 12px;color:var(--label);text-decoration:none;position:relative}'+
   '.rn-sx-g a+a::before{content:"";position:absolute;top:0;left:16px;right:0;height:.5px;background:var(--sep)}'+
   '.rn-sx-g a:hover,.rn-sx-g a.sel{background:var(--fill)}'+
   '.rn-sx-p{display:block;font-size:12px;line-height:16px;color:var(--sec);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'+
   '.rn-sx-t{display:block;font-size:16px;line-height:22px;font-weight:600;margin-top:1px}'+
   '.rn-sx-e{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;font-size:14px;line-height:20px;color:var(--sec);margin-top:2px;word-break:keep-all}'+
   '.rn-sx-e mark,.rn-sx-t mark{background:color-mix(in srgb,var(--acc) 18%,transparent);color:var(--label);border-radius:3px;padding:0 1px}'+
   '.rn-sx-n{padding:18px 4px;text-align:center;color:var(--sec);font-size:15px}'+
   '@keyframes rnSxHit{from{background:color-mix(in srgb,var(--acc) 22%,transparent)}to{background:transparent}}'+
   '.rn-sx-hit{animation:rnSxHit 1.8s ease-out;border-radius:6px}'+
   '@media (max-width:640px){.rn-sx{padding:0;background:var(--bg)}.rn-sx-in{max-width:none;max-height:none;height:100%;border-radius:0;box-shadow:none}'+
     '.rn-sx-hd{padding-top:calc(10px + env(safe-area-inset-top))}}'+
   '@media (min-width:1400px){.rn-bar .rn-sxb{display:none}}@media (max-width:1399px){.sidebar .rn-sxf{display:none}}'+
   '@media print{.rn-sx,.rn-sxf,.rn-sxb{display:none!important}}';
  document.head.appendChild(css);

  
  var openers=[];
  var bar=document.querySelector('.rn-bar');
  if(bar){ var b=document.createElement('button'); b.type='button'; b.className='rn-sxb'; b.setAttribute('aria-label','검색'); b.innerHTML=ICON;
    var last=bar.lastElementChild, r=document.createElement('div'); r.className='rn-r'; r.appendChild(b);
    if(last && !last.classList.contains('rn-t')) r.appendChild(last); bar.appendChild(r); openers.push(b); }
  function field(){ var f=document.createElement('button'); f.type='button'; f.className='rn-sxf'; f.innerHTML=ICON+'<span>검색</span>'; openers.push(f); return f; }
  var sh=document.querySelector('.sidebar .rn-sh'); if(sh) sh.parentNode.insertBefore(field(), sh.nextSibling);
  var h1=document.querySelector('.in > h1'); if(h1) h1.parentNode.insertBefore(field(), h1.nextSibling);

  
  var sx=document.createElement('div'); sx.className='rn-sx'; sx.setAttribute('role','dialog'); sx.setAttribute('aria-label','노트 검색');
  sx.innerHTML='<div class="rn-sx-in"><div class="rn-sx-hd"><label class="rn-sx-f">'+ICON+'<input type="search" enterkeyhint="search" autocomplete="off" spellcheck="false" placeholder="노트 검색"><button class="rn-sx-c" type="button" aria-label="지우기">✕</button></label>'+
    '<button class="rn-sx-x" type="button">닫기</button></div>'+
    (SUBJ?'<div class="rn-sx-seg"><button type="button" data-s="1" class="on"></button><button type="button" data-s="0">전체 과목</button></div>':'')+
    '<div class="rn-sx-ls"></div></div>';
  document.body.appendChild(sx);
  var inp=sx.querySelector('input'), ls=sx.querySelector('.rn-sx-ls'), clr=sx.querySelector('.rn-sx-c'), here=!!SUBJ;
  if(SUBJ){ sx.querySelector('[data-s="1"]').textContent=SUBJ;
    [].forEach.call(sx.querySelectorAll('.rn-sx-seg button'), function(x){ x.onclick=function(){ here=x.dataset.s==='1';
      [].forEach.call(sx.querySelectorAll('.rn-sx-seg button'), function(y){ y.classList.toggle('on', y===x); }); run(); inp.focus(); }; }); }

  var pf=null, pfP=null;
  function load(){ if(!pfP) pfP=import('./pagefind/pagefind.js').then(function(m){ pf=m; return m.init?m.init():null; }).then(function(){ return pf; }); return pfP; }
  function open(){ if(document.body.classList.contains('rn-open')) return; sx.classList.add('on'); inp.focus(); inp.select(); load().catch(function(){}); if(inp.value) run(); }
  function close(){ sx.classList.remove('on'); }
  openers.forEach(function(o){ o.onclick=function(){ var sb=document.querySelector('.sidebar.open'), tb=document.querySelector('.tocbtn'); if(sb&&tb&&innerWidth<1400) tb.click(); open(); }; });
  sx.querySelector('.rn-sx-x').onclick=close;
  sx.onclick=function(e){ if(e.target===sx) close(); };
  clr.onclick=function(e){ e.preventDefault(); inp.value=''; run(); inp.focus(); };
  document.addEventListener('keydown', function(e){
    var t=e.target, typing=t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.isContentEditable);
    if(!sx.classList.contains('on')){ if((e.key==='/'&&!typing&&!e.ctrlKey&&!e.metaKey) || ((e.ctrlKey||e.metaKey)&&(e.key==='k'||e.key==='K'))){ e.preventDefault(); open(); } return; }
    if(e.key==='Escape'){ e.preventDefault(); close(); return; }
    var rows=[].slice.call(ls.querySelectorAll('a')), i=rows.indexOf(ls.querySelector('a.sel'));
    if(e.key==='ArrowDown'||e.key==='ArrowUp'){ if(!rows.length) return; e.preventDefault(); i=e.key==='ArrowDown'?Math.min(rows.length-1,i+1):Math.max(0,i-1);
      rows.forEach(function(a,k){ a.classList.toggle('sel', k===i); }); rows[i].scrollIntoView({block:'nearest'}); }
    else if(e.key==='Enter' && t===inp){ var a=rows[i<0?0:i]; if(a){ e.preventDefault(); a.click(); } }
  });

  var HS=/ /g;
  function clean(s){ return String(s||'').replace(HS,''); }
  
  function tidy(h){ return clean(h).replace(/([(\[「『〈]) /g,'$1').replace(/ ([)\]」』〉,])/g,'$1').replace(/ · /g,'·').replace(/ (<\/mark>)([)\]」』〉,])/g,'$1$2'); }
  
  function dropTitle(h, title){ var plain=h.replace(/<[^>]+>/g,''), pre=title+' . '; if(plain.trim()===title+' .'||plain.trim()===title) return '';
    var k=plain.indexOf(pre); if(k<0||k>2) return h; var n=k+pre.length, cnt=0;
    return h.split(/(<[^>]+>)/).map(function(x){ if(!x||x.charAt(0)==='<') return x; if(cnt>=n) return x; var take=Math.min(x.length, n-cnt); cnt+=take; return x.slice(take); }).join('').replace(/<mark><\/mark>/g,''); }
  function esc(s){ return String(s).replace(/[&<>"]/g,function(m){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]; }); }
  function norm(s){ return clean(s).toLowerCase().replace(/[^\p{L}\p{N}]/gu,''); }
  function hits(ex, terms){ var ms=[], m, re=/<mark>([\s\S]*?)<\/mark>/g; while((m=re.exec(ex))) ms.push(norm(m[1]));
    return terms.every(function(t){ return ms.some(function(x){ return x.indexOf(t)===0; }); }); }
  var seq=0, tm=0;
  inp.addEventListener('input', function(){ clr.classList.toggle('on', !!inp.value); clearTimeout(tm); tm=setTimeout(run, 140); });
  function run(){
    var q=inp.value.trim(), my=++seq; if(!q){ ls.innerHTML=''; return; }
    load().then(function(p){
      return p.search(q, here&&SUBJ?{filters:{subj:SUBJ}}:{}).then(function(r){ return Promise.all(r.results.slice(0,40).map(function(x){ return x.data(); })); });
    }).then(function(ds){
      if(my!==seq) return;
      var terms=q.split(/\s+/).map(norm).filter(Boolean);
      ds=ds.filter(function(d){ return hits(d.excerpt, terms) || hits('<mark>'+(d.meta.title||'')+'</mark>', terms); }).slice(0,25);
      if(!ds.length){ ls.innerHTML='<div class="rn-sx-n">찾는 말이 없어요</div>'; return; }
      ls.innerHTML='<div class="rn-sx-g">'+ds.map(function(d){
        var path=[here&&SUBJ?'':d.meta.subj, clean(d.meta.path)].filter(Boolean).join(' › ');
        return '<a href="'+esc(d.url.replace(/^\/+/,''))+'">'+(path?'<span class="rn-sx-p">'+esc(path)+'</span>':'')+
          '<span class="rn-sx-t">'+esc(clean(d.meta.title))+'</span><span class="rn-sx-e">'+dropTitle(tidy(d.excerpt), tidy(d.meta.title))+'</span></a>'; }).join('')+'</div>';
      ls.scrollTop=0;
    }).catch(function(){ if(my===seq) ls.innerHTML='<div class="rn-sx-n">검색을 불러오지 못했어요</div>'; });
  }

  
  function flash(id){ var el=document.getElementById(id); if(!el) return; el.classList.remove('rn-sx-hit'); void el.offsetWidth; el.classList.add('rn-sx-hit'); }
  ls.addEventListener('click', function(e){
    var a=e.target.closest('a'); if(!a) return; var href=a.getAttribute('href'), k=href.indexOf('#'), f=decodeURIComponent(href.slice(0,k)), id=decodeURIComponent(href.slice(k+1));
    try{ sessionStorage.setItem('rn_sx_hit', id); }catch(er){}
    if(f!==FILE) return;
    e.preventDefault(); close();
    if(decodeURIComponent(location.hash.slice(1))===id) history.replaceState(null,'',location.pathname+location.search);
    location.hash=encodeURIComponent(id).replace(/%2F/g,'/');
    setTimeout(function(){ var el=document.getElementById(id); if(el) el.scrollIntoView({block:'start'}); flash(id); }, 60);
  });
  try{ var hid=sessionStorage.getItem('rn_sx_hit'); if(hid){ sessionStorage.removeItem('rn_sx_hit'); if(decodeURIComponent(location.hash.slice(1))===hid) setTimeout(function(){ flash(hid); }, 400); } }catch(er){}

  
  fetch('pagefind/pagefind-entry.json', {method:'HEAD'}).then(function(r){ if(!r.ok) throw 0; }).catch(function(){ openers.forEach(function(o){ o.style.display='none'; }); });
})();
