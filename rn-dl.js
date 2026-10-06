
(function(){
  document.addEventListener('click', function(ev){
    var a = ev.target.closest && ev.target.closest('a.dl, a.rn-pdf, a.rn-pp');
    if (!a || ev.metaKey || ev.ctrlKey || ev.shiftKey || !window.fetch || !window.Blob || !URL.createObjectURL) return;
    ev.preventDefault();
    if (a._busy) return; a._busy = 1; a.style.opacity = '.4';
    var name = a.getAttribute('download') || 'note.pdf';
    fetch(a.href).then(function(r){ if (!r.ok) throw new Error(r.status); return r.blob(); }).then(function(b){
      
      var u = URL.createObjectURL(new Blob([b], {type: 'application/octet-stream'}));
      var x = document.createElement('a'); x.href = u; x.download = name; x.style.display = 'none';
      document.body.appendChild(x); x.click(); x.remove();
      setTimeout(function(){ URL.revokeObjectURL(u); }, 60000);
    }).catch(function(){ location.href = a.href; }).then(function(){ a._busy = 0; a.style.opacity = ''; });
  });
})();
