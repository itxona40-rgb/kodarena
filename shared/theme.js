(function(){
 var KEY="kodarena-theme",root=document.documentElement;
 function get(){try{return localStorage.getItem(KEY)}catch(e){return null}}
 function put(v){try{localStorage.setItem(KEY,v)}catch(e){}}
 function sys(){return !!(window.matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches)}
 var saved=get();
 if(saved==="dark"||saved==="light")root.setAttribute("data-theme",saved);
 function isDark(){var t=root.getAttribute("data-theme");return t?t==="dark":sys()}
 function mk(){
  var b=document.createElement("button");
  b.id="themeBtn";b.type="button";b.setAttribute("aria-label","Mavzuni almashtirish");
  b.style.cssText="position:fixed;right:12px;bottom:calc(env(safe-area-inset-bottom,0px) + 12px);z-index:5;width:44px;height:44px;border-radius:50%;border:1px solid var(--gr);background:var(--pan);color:var(--tx);font-size:20px;line-height:1;cursor:pointer;box-shadow:var(--glow) var(--gr)";
  function paint(){b.textContent=isDark()?"☀️":"🌙";b.title=isDark()?"Yorug' rejim":"Qorong'i rejim"}
  b.onclick=function(){var n=isDark()?"light":"dark";root.setAttribute("data-theme",n);put(n);paint()};
  paint();document.body.appendChild(b);
 }
 if(document.body)mk();else addEventListener("DOMContentLoaded",mk);
})();
