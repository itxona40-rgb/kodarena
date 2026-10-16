const T=""; // havola ochilish rejimi
// ====== O'YINLAR RO'YXATI: yangi o'yin qo'shish uchun shu yerga qator yozing ======
const GAMES=[
 {icon:"⚙️",name:"C++ Challenge",tag:"C++",lvl:10,diff:"O'rta",href:"games/cpp-challenge/index.html",
  desc:"Kod natijasini toping. Javob bosilishi bilan keyingi savolga o'tiladi, har to'g'ri javob 1 ball."},
 {icon:"🤖",name:"Kod Robot",tag:"Algoritm",lvl:10,diff:"Oson",href:"games/kod-robot/index.html",
  desc:"Robot dasturi qayerda tugashini toping: ketma-ketlik, burilish va tsikllar. Savollar har safar yangi."},
 {icon:"🐞",name:"Xatoni top",tag:"Debugging",lvl:10,diff:"O'rta",href:"games/xatoni-top/index.html",
  desc:"C++ va JavaScript kodidagi yashirin xatoni toping."},
 {icon:"🔢",name:"Binary Master",tag:"Sanoq sistemalari",lvl:10,diff:"Oson",href:"games/binary-master/index.html",
  desc:"2 lik, 10 lik va 16 lik sonlar, AND va siljitish. Savollar har safar yangi."},
 {icon:"🎨",name:"HTML & CSS Quiz",tag:"Web",lvl:10,diff:"Oson",href:"games/html-css-quiz/index.html",
  desc:"Teglar, selektorlar va flexbox bo'yicha tezkor savollar."},
 {icon:"🕵️",name:"SQL Detektiv",tag:"SQL",lvl:10,diff:"O'rta",href:"games/sql-detektiv/index.html",
  desc:"So'rovlar yozib, gumondorlarni toping: SELECT, WHERE, GROUP BY."},
 {icon:"🧠",name:"Sun'iy intellekt",tag:"AI",lvl:10,diff:"Oson",href:"games/ai-intellekt/index.html",
  desc:"Mashinaviy o'rganish, neyron tarmoqlar, prompt va gallyutsinatsiya haqida savollar."},
 {icon:"📝",name:"Microsoft Word",tag:"Word",lvl:10,diff:"Oson",href:"games/word-hujjat/index.html",
  desc:"Tezkor tugmalar, menyular va hujjat bilan ishlash qoidalari."},
 {icon:"📊",name:"Microsoft Excel",tag:"Excel",lvl:10,diff:"O'rta",href:"games/excel-jadval/index.html",
  desc:"SUM, IF, VLOOKUP kabi formulalar va jadval bilan ishlash."},
 {icon:"🛡️",name:"Kiber xavfsizlik",tag:"Security",lvl:10,diff:"O'rta",href:"games/kiber-xavfsizlik/index.html",
  desc:"Parollar, phishing, SQL injection, DDoS va o'zingizni himoya qilish."}
];
// ================================================================================
const $=i=>document.getElementById(i);
const live=GAMES.filter(g=>!g.soon);
$("cards").innerHTML=GAMES.map(g=>{
 const inner='<div class="ic">'+g.icon+'</div><h3>'+g.name+'</h3><p>'+g.desc+'</p>'+
  '<div class="meta"><span class="t">'+g.tag+'</span>'+(g.soon?"":'<span>'+g.lvl+' daraja</span><span>'+g.diff+'</span>')+'</div>'+
  '<div class="go">'+(g.soon?"⏳ Tez kunda":"▶ O'ynash")+"</div>";
 return g.soon?'<div class="card soon">'+inner+"</div>":'<a class="card" href="'+g.href+'"'+T+">"+inner+"</a>";
}).join("");
$("stats").innerHTML='<span><b>'+live.length+'</b> ta o\'yin</span><span><b>'+live.reduce((a,g)=>a+g.lvl,0)+'</b> ta daraja</span><span><b>'+(GAMES.length-live.length)+'</b> ta tez kunda</span>';

// yozilayotgan terminal
const lines=[
 '<span class="g">$</span> ./kodarena --list',
 '<span class="cm">// '+live.length+' ta o\'yin topildi</span>',
 '<span class="g">$</span> ./kodarena --goal',
 '<span class="p">"Dasturlashni</span> <span class="c">o\'ynab</span> <span class="p">o\'rganing!"</span>'
];
(function(){
 const el=$("typed");let li=0,done="";
 function plain(h){const d=document.createElement("div");d.innerHTML=h;return d.textContent}
 function step(){
  if(li>=lines.length){el.innerHTML=done+'<span class="g">$</span> <span class="cur"></span>';return}
  const full=lines[li],txt=plain(full);let n=0;
  (function t(){
   n++;
   if(n>=txt.length){done+=full+"\n";li++;el.innerHTML=done;setTimeout(step,350);return}
   el.innerHTML=done+txt.slice(0,n)+'<span class="cur"></span>';
   setTimeout(t,28);
  })();
 }
 step();
})();

// matritsa
(function(){
 const cv=$("mx"),cx=cv.getContext("2d"),fs=16,ch="RUSTAM";
 let cols,drops,col="#3dffa2",bg="#070a10",tick=0;
 function size(){cv.width=innerWidth;cv.height=innerHeight;cols=Math.ceil(cv.width/fs);drops=Array.from({length:cols},()=>Math.random()*-50)}
 function colors(){const s=getComputedStyle(document.documentElement);col=s.getPropertyValue("--gr").trim()||col;bg=s.getPropertyValue("--bg").trim()||bg}
 size();colors();addEventListener("resize",size);
 setInterval(()=>{
  if(tick++%40==0)colors();
  cx.globalAlpha=.1;cx.fillStyle=bg;cx.fillRect(0,0,cv.width,cv.height);cx.globalAlpha=1;
  cx.font=fs+"px monospace";cx.fillStyle=col;
  for(let i=0;i<cols;i++){
   cx.fillText(ch[Math.floor(Math.random()*ch.length)],i*fs,drops[i]*fs);
   if(drops[i]*fs>cv.height&&Math.random()>.975)drops[i]=0;
   drops[i]++;
  }
 },60);
})();

// soat
const clk=$("clk"),DN=["Yak","Dush","Sesh","Chor","Pay","Jum","Shan"];
function tickClk(){
 const d=new Date(),p=n=>String(n).padStart(2,"0");
 clk.innerHTML="🕒 "+p(d.getHours())+":"+p(d.getMinutes())+":"+p(d.getSeconds())+' <span style="color:var(--mu)">'+DN[d.getDay()]+" "+p(d.getDate())+"."+p(d.getMonth()+1)+"</span>";
}
tickClk();setInterval(tickClk,1000);
