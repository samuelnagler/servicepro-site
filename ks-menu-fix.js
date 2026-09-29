(function(){
  function smallestTextMatch(label){
    var all=[].slice.call(document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span,div'));
    var matches=all.filter(function(el){
      var t=(el.textContent||'').replace(/\s+/g,' ').trim().toLowerCase();
      return t===label.toLowerCase();
    });
    matches.sort(function(a,b){return a.children.length-b.children.length;});
    return matches[0]||null;
  }

  function init(){
    var sourceMenu=document.getElementById('MENU_AS_CONTAINER');
    var sourceToggle=document.getElementById('MENU_AS_CONTAINER_TOGGLE');
    if(!sourceMenu||!sourceToggle) return;

    // Independent hit target over the visible Wix hamburger.
    var hit=document.createElement('button');
    hit.type='button';
    hit.id='KS_INDEPENDENT_MENU_HIT';
    hit.setAttribute('aria-label','Navigationsmenü öffnen');
    hit.style.cssText=[
      'position:fixed',
      'top:18px',
      'right:8px',
      'width:52px',
      'height:52px',
      'padding:0',
      'margin:0',
      'border:0',
      'background:transparent',
      'z-index:2147483647',
      'cursor:pointer',
      '-webkit-tap-highlight-color:transparent'
    ].join(';');
    document.body.appendChild(hit);

    // Clone the already-rendered original menu so the visual remains identical.
    var menu=sourceMenu.cloneNode(true);
    menu.id='KS_CLONED_MOBILE_MENU';
    menu.querySelectorAll('[id]').forEach(function(el){
      el.id='KS_'+el.id;
    });
    menu.classList.remove('Uym66v','nQIUtw');
    menu.removeAttribute('data-undisplayed');
    menu.removeAttribute('aria-hidden');
    menu.style.cssText=[
      'display:none',
      'visibility:visible',
      'opacity:1',
      'position:fixed',
      'inset:0',
      'width:100vw',
      'height:100vh',
      'margin:0',
      'z-index:2147483600',
      'overflow:auto'
    ].join(';');

    // Force the cloned Wix menu's internal wrappers visible.
    menu.querySelectorAll('*').forEach(function(el){
      var cs=getComputedStyle(el);
      if(cs.visibility==='hidden') el.style.setProperty('visibility','visible','important');
      if(cs.opacity==='0') el.style.setProperty('opacity','1','important');
    });

    document.body.appendChild(menu);

    var opened=false;
    function close(){
      opened=false;
      menu.style.setProperty('display','none','important');
      document.documentElement.style.overflow='';
      document.body.style.overflow='';
      hit.setAttribute('aria-label','Navigationsmenü öffnen');
    }
    function open(){
      opened=true;
      menu.style.setProperty('display','block','important');
      menu.style.setProperty('visibility','visible','important');
      menu.style.setProperty('opacity','1','important');
      document.documentElement.style.overflow='hidden';
      document.body.style.overflow='hidden';
      hit.setAttribute('aria-label','Navigationsmenü schließen');
    }

    hit.addEventListener('click',function(e){
      e.preventDefault();
      e.stopPropagation();
      opened?close():open();
    });
    hit.addEventListener('touchend',function(e){
      e.preventDefault();
      e.stopPropagation();
      opened?close():open();
    },{passive:false});

    menu.addEventListener('click',function(e){
      var a=e.target.closest && e.target.closest('a');
      if(!a) return;
      e.preventDefault();
      var label=(a.textContent||'').replace(/\s+/g,' ').trim();

      close();

      if(label==='Start'){
        window.scrollTo({top:0,behavior:'smooth'});
        return;
      }

      if(label==='Über mich'){
        var about=smallestTextMatch('Über mich') || smallestTextMatch('ÜBER MICH');
        if(about) about.scrollIntoView({behavior:'smooth',block:'start'});
        return;
      }

      if(label==='Instagram'){
        var insta=smallestTextMatch('Instagram') || smallestTextMatch('INSTAGRAM');
        if(insta) insta.scrollIntoView({behavior:'smooth',block:'start'});
        return;
      }

      if(label==='Impressum'){
        var imp=smallestTextMatch('Impressum') || smallestTextMatch('IMPRESSUM');
        if(imp) imp.scrollIntoView({behavior:'smooth',block:'start'});
        return;
      }

      if(a.href) location.href=a.href;
    });

    document.addEventListener('keydown',function(e){
      if(opened && e.key==='Escape') close();
    });

    close();
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',init,{once:true});
  } else {
    init();
  }
})();