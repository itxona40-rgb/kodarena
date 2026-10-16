(function(){
const $=i=>document.getElementById(i),G=GAME;
const LANG={
 cpp:{kw:"int|void|for|if|else|while|return|continue|break|char|double|bool|const|struct|class|string|nullptr",fn:"cout|cin|main|endl",c:"\\/\\/.*|\\/\\*.*?\\*\\/"},
 js:{kw:"let|const|var|function|while|for|if|else|return|true|false",fn:"console|log",c:"\\/\\/.*"},
 sql:{kw:"SELECT|FROM|WHERE|AND|OR|NOT|ORDER|BY|GROUP|HAVING|LIMIT|JOIN|ON|LIKE|IN|BETWEEN|AS|DISTINCT|DESC|ASC|NULL|INSERT|INTO|VALUES|UPDATE|SET|DELETE",fn:"COUNT|SUM|AVG|MAX|MIN",c:"--.*",i:"i"},
 html:{kw:"display|flex|grid|color|margin|padding|position|font-size|background|border|width|height|justify-content|align-items|transform|scale",fn:"hover",c:"&lt;!--.*?--&gt;",tag:1},
 py:{kw:"def|for|if|else|elif|while|return|import|in|True|False|None",fn:"print|len|range",c:"#.*"},
 xls:{kw:"IF|AND|OR|TRUE|FALSE",fn:"SUM|AVERAGE|COUNT|MAX|MIN|VLOOKUP",c:"(?!)"},
 bin:{kw:"(?!)",fn:"(?!)",c:"(?!)"}
};
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
function hl(s,l){
 const L=LANG[l]||LANG.bin;
 const R=new RegExp("("+L.c+")|(\"[^\"\\n]*\"|'[^'\\n]*')|(#include|#define)|("+(L.tag?"&lt;\\/?[a-zA-Z][\\w-]*|\\/?&gt;":"(?!)")+")|\\b("+L.kw+")\\b|\\b("+L.fn+")\\b|\\b(\\d+)\\b","g"+(L.i||""));
 return esc(s).replace(R,(m,a,b,c,d,e,f)=>'<span class="'+(a?"cm":b?"st2":c?"pp":d||e?"kw":f?"fn":"nu")+'">'+m+"</span>");
}
const shuf=a=>a.map(x=>[Math.random(),x]).sort((p,q)=>p[0]-q[0]).map(x=>x[1]);
let Q,lv=0,score=0,lock=false,tm=0,res=[],cur=[];
function stats(){
 $("sc").textContent="Ball: "+score+"/"+Q.length;
 $("pg").innerHTML=Q.map((_,i)=>'<i class="'+(i<res.length?(res[i]?"d":"x"):i==lv?"c":"")+'"></i>').join("");
 $("lv").textContent="Savol "+Math.min(lv+1,Q.length)+"/"+Q.length;
}
function start(){Q=G.build?G.build():G.questions;lv=0;score=0;res=[];load()}
function load(){
 lock=false;const q=Q[lv];
 $("task").innerHTML="<em>// savol "+(lv+1)+":</em> "+esc(q.q);
 const ed=$("code");
 if(q.c){ed.style.display="";ed.innerHTML=q.c.split("\n").map((l,i)=>'<div class="ln"><b>'+(i+1)+"</b><span>"+hl(l,q.lang||G.lang)+"</span></div>").join("")}else ed.style.display="none";
 cur=shuf(q.o.map((t,i)=>({t,ok:i==0})));
 $("opts").innerHTML="";
 cur.forEach((o,i)=>{const b=document.createElement("button");b.className="o";b.innerHTML="<b>"+"ABCD"[i]+")</b>";b.appendChild(document.createTextNode(o.t));b.onclick=()=>pick(i);$("opts").appendChild(b)});
 $("msg").innerHTML='<span class="cm">&gt; javobni tanlang. Keyingi savolga o\'zi o\'tadi.</span>';
 stats();
}
function pick(i){
 if(lock)return;lock=true;
 const ok=cur[i].ok,bs=[...$("opts").children];
 bs.forEach((b,j)=>{b.disabled=true;if(cur[j].ok)b.classList.add("ok")});
 if(!ok)bs[i].classList.add("bad");
 if(ok)score++;res.push(ok);stats();
 $("msg").innerHTML=(ok?'<span class="ok2">&gt; ✔ To\'g\'ri! +1 ball</span>':'<span class="er">&gt; ✖ Noto\'g\'ri. To\'g\'ri javob yashil rangda.</span>')+'<br><span class="cm">// '+esc(Q[lv].e||"")+'</span><br><button class="sk" id="sk">keyingisi ▶</button>';
 $("sk").onclick=next;
 tm=setTimeout(next,ok?1200:2600);
}
function next(){
 if(!lock)return;clearTimeout(tm);lv++;
 lv<Q.length?load():finish();
}
function finish(){
 lock=false;stats();
 const g=score>=9?"A'lo natija 🏆":score>=7?"Yaxshi 👍":score>=5?"Qoniqarli 🙂":"Yana mashq qiling 💪";
 $("task").innerHTML="<em>// natija:</em> o'yin tugadi!";
 $("code").style.display="";
 $("code").innerHTML='<div class="ln"><b>1</b><span><span class="kw">return</span> <span class="nu">'+score+'</span>; <span class="cm">// '+Q.length+' tadan</span></span></div>';
 $("opts").innerHTML='<button class="o" id="again"><b>↻</b>Qayta o\'ynash</button><a class="o" href="../../index.html" style="text-decoration:none;display:block"><b>←</b>Bosh sahifa (KodArena)</a>';
 $("again").onclick=start;
 $("msg").innerHTML='<span class="ok2">&gt; '+g+' Siz '+Q.length+' tadan '+score+' ta to\'g\'ri javob berdingiz.</span>';
}
$("gt").textContent=G.title;$("fname").textContent=G.file;$("lang").textContent=G.badge;
start();
})();
