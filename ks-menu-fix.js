(function(){
  function init(){
    var original=document.getElementById('MENU_AS_CONTAINER_TOGGLE');
    var menu=document.getElementById('MENU_AS_CONTAINER');
    if(!original||!menu) return;

    // Clone the visible Wix hamburger so Wix runtime cannot swallow our click.
    var trigger=original.cloneNode(true);
    trigger.id='KS_MENU_TRIGGER';
    original.style.pointerEvents='none';
    original.parentNode.insertBefore(trigger, original.nextSibling);

    trigger.style.position='absolute';
    trigger.style.inset='0';
    trigger.style.margin='0';
    trigger.style.pointerEvents='auto';
    trigger.style.cursor='pointer';
    trigger.style.zIndex='2147483647';

    // Keep clone layered exactly over the original icon.
    var host=original.parentElement;
    if(host && getComputedStyle(host).position==='static') host.style.position='relative';

    function setOpen(open){
      if(open){
        menu.classList.remove('Uym66v','nQIUtw');
        menu.removeAttribute('data-undisplayed');
        menu.setAttribute('aria-hidden','false');
        menu.style.setProperty('display','block','important');
        menu.style.setProperty('visibility','visible','important');
        menu.style.setProperty('opacity','1','important');
        menu.style.setProperty('position','fixed','important');
        menu.style.setProperty('inset','0','important');
        menu.style.setProperty('z-index','2147483000','important');

        var overlay=document.getElementById('overlay-MENU_AS_CONTAINER');
        var container=document.getElementById('container-MENU_AS_CONTAINER');
        if(overlay){
          overlay.style.setProperty('display','initial','important');
          overlay.style.setProperty('visibility','visible','important');
          overlay.style.setProperty('opacity','1','important');
        }
        if(container){
          container.style.setProperty('visibility','visible','important');
          container.style.setProperty('opacity','1','important');
        }
        document.documentElement.style.overflow='hidden';
        document.body.style.overflow='hidden';
        trigger.setAttribute('aria-expanded','true');
        trigger.setAttribute('aria-label','Navigationsmenü schließen');
      }else{
        menu.classList.add('Uym66v','nQIUtw');
        menu.setAttribute('data-undisplayed','true');
        menu.setAttribute('aria-hidden','true');
        menu.style.removeProperty('display');
        menu.style.removeProperty('visibility');
        menu.style.removeProperty('opacity');
        menu.style.removeProperty('position');
        menu.style.removeProperty('inset');
        menu.style.removeProperty('z-index');
        document.documentElement.style.overflow='';
        document.body.style.overflow='';
        trigger.setAttribute('aria-expanded','false');
        trigger.setAttribute('aria-label','Navigationsmenü öffnen');
      }
    }

    setOpen(false);

    function toggle(e){
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      setOpen(menu.getAttribute('data-undisplayed')==='true');
    }

    trigger.addEventListener('click',toggle,true);
    trigger.addEventListener('touchend',toggle,true);
    trigger.addEventListener('keydown',function(e){
      if(e.key==='Enter'||e.key===' '){ toggle(e); }
    },true);

    menu.addEventListener('click',function(e){
      var a=e.target.closest && e.target.closest('a');
      if(a) setTimeout(function(){setOpen(false)},0);
      else if(e.target.id==='overlay-MENU_AS_CONTAINER') setOpen(false);
    },true);

    document.addEventListener('keydown',function(e){
      if(e.key==='Escape') setOpen(false);
    });
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();