(function(){
  function init(){
    var toggle=document.getElementById('MENU_AS_CONTAINER_TOGGLE');
    var menu=document.getElementById('MENU_AS_CONTAINER');
    if(!toggle||!menu) return;

    var prev = {
      display: menu.style.display || '',
      position: menu.style.position || '',
      inset: menu.style.inset || '',
      zIndex: menu.style.zIndex || '',
      visibility: menu.style.visibility || '',
      opacity: menu.style.opacity || ''
    };

    function closeMenu(){
      menu.style.display='none';
      menu.setAttribute('data-undisplayed','true');
      menu.setAttribute('aria-hidden','true');
      document.body.style.overflow='';
      toggle.setAttribute('aria-label','Navigationsmenü öffnen');
      toggle.setAttribute('aria-expanded','false');
      toggle.style.position='';
      toggle.style.zIndex='';
    }

    function openMenu(){
      menu.style.display='block';
      menu.style.position='fixed';
      menu.style.inset='0';
      menu.style.zIndex='2147483000';
      menu.style.visibility='visible';
      menu.style.opacity='1';
      menu.removeAttribute('data-undisplayed');
      menu.setAttribute('aria-hidden','false');

      var c=document.getElementById('container-MENU_AS_CONTAINER');
      var o=document.getElementById('overlay-MENU_AS_CONTAINER');
      if(c){c.style.visibility='visible';c.style.opacity='1';}
      if(o){o.style.visibility='visible';o.style.opacity='1';}

      document.body.style.overflow='hidden';
      toggle.setAttribute('aria-label','Navigationsmenü schließen');
      toggle.setAttribute('aria-expanded','true');
      toggle.style.position='fixed';
      toggle.style.zIndex='2147483647';
    }

    closeMenu();

    toggle.addEventListener('click',function(e){
      e.preventDefault();
      e.stopImmediatePropagation();
      if(menu.style.display==='block') closeMenu(); else openMenu();
    },true);

    toggle.addEventListener('keydown',function(e){
      if(e.key==='Enter'||e.key===' '){
        e.preventDefault();
        if(menu.style.display==='block') closeMenu(); else openMenu();
      }
    },true);

    var overlay=document.getElementById('overlay-MENU_AS_CONTAINER');
    if(overlay) overlay.addEventListener('click',function(e){
      if(e.target===overlay) closeMenu();
    },true);

    document.addEventListener('keydown',function(e){
      if(e.key==='Escape') closeMenu();
    });
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',init,{once:true});
  }else{
    init();
  }
})();