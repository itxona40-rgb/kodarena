const L=[
 {goal:[3,0],walls:[],max:5,t:"Robot sharqqa qarab turibdi. ★ ga yetkazing. Buyruqlar ketma-ket bajariladi."},
 {goal:[4,0],walls:[],max:3,t:"Faqat 3 ta blok! Bir xil ishni takrorlash uchun tsikl (for) ishlating."},
 {goal:[2,2],walls:[[1,1],[3,1]],max:6,t:"Burilish buyrug'i yo'nalishni o'zgartiradi. Devorlarga urilmang."},
 {goal:[3,3],walls:[[2,0],[0,2],[3,1]],max:7,t:"Zinapoya: oldinga, o'ngga, oldinga, chapga. Naqshni tsiklga soling."},
 {goal:[4,4],walls:[[2,0],[3,0],[0,2],[0,3],[4,2]],max:7,t:"Eng katta zinapoya. Naqshni toping va tsiklga soling."},
 {goal:[0,4],walls:[[1,0],[1,1]],max:4,t:"Avval burilib, keyin yuring. Faqat 4 blok: tsiklsiz sig'maydi!"},
 {goal:[4,2],walls:[[1,1],[2,2]],max:7,t:"Ikki xil tsikl kerak: avval sharqqa, keyin janubga."},
 {goal:[4,4],walls:[[1,1],[2,2],[3,3],[1,3]],max:7,t:"Yuqori qirra bo'ylab yuring, so'ng o'ng qirra bo'ylab tushing."},
 {goal:[0,2],walls:[[1,1],[3,3],[4,4]],max:6,t:"Kvadrat bo'ylab aylaning. Tsikl ichida 3 ta buyruq bo'lishi mumkin."},
 {goal:[4,4],walls:[[0,2],[1,1],[3,0],[3,3],[0,4]],max:8,t:"Final! 2 qadam oldinga, o'ngga, 2 qadam oldinga, chapga. Naqshni 2 marta takrorlang."}
];
const DX=[1,0,-1,0],DY=[0,1,0,-1],AR=["▶","▼","◀","▲"];
const NAME={F:"moveForward();",L:"turnLeft();",R:"turnRight();",END:"}"};
let lv=0,prog=[],pos,dir,busy=false;
const $=i=>document.getElementById(i);
function load(){
  prog=[];busy=false;pos=[0,0];dir=0;
  $("lv").textContent="Daraja "+(lv+1)+"/"+L.length;
  $("task").innerHTML='<em>// vazifa:</em> '+L[lv].t;
  $("msg").innerHTML="";draw();upd();
}
function draw(){
  const g=$("grid");g.innerHTML="";
  for(let y=0;y<5;y++)for(let x=0;x<5;x++){
    const d=document.createElement("div");d.className="c";
    if(L[lv].walls.some(w=>w[0]==x&&w[1]==y))d.classList.add("w");
    else if(L[lv].goal[0]==x&&L[lv].goal[1]==y){d.classList.add("g");d.textContent="★"}
    if(pos[0]==x&&pos[1]==y){d.classList.add("r");d.innerHTML='🤖<span class="d">'+AR[dir]+"</span>"}
    g.appendChild(d);
  }
}
function upd(){
  $("cnt").textContent=prog.length+"/"+L[lv].max+" blok";
  $("prog").innerHTML=prog.map(p=>{
    const lp=p.startsWith("LOOP");
    return '<span class="t'+(lp||p=="END"?" l":"")+'">'+(lp?"for ×"+p.split(":")[1]+" {":NAME[p])+"</span>";
  }).join("")||'<span class="cm">// buyruq qo\'shing...</span>';
  let ind=0,n=0,out="";
  const row=(h,i)=>{n++;out+='<div class="ln"><b>'+n+'</b><span style="padding-left:'+i*16+'px">'+h+"</span></div>"};
  row('<span class="pp">#include</span> <span class="st2">&lt;iostream&gt;</span>',0);
  row('<span class="kw">int</span> <span class="fn">main</span>() {',0);ind=1;
  prog.forEach(p=>{
    if(p=="END"){ind=Math.max(1,ind-1);row("}",ind)}
    else if(p.startsWith("LOOP")){
      row('<span class="kw">for</span> (<span class="kw">int</span> i = <span class="nu">0</span>; i &lt; <span class="nu">'+p.split(":")[1]+"</span>; i++) {",ind);ind++;
    }else row('<span class="fn">'+NAME[p].replace("();","")+"</span>();",ind);
  });
  row('<span class="kw">return</span> <span class="nu">0</span>;<span class="cur"></span>',1);
  row("}",0);
  $("code").innerHTML=out;
}
document.querySelectorAll("[data-c]").forEach(b=>b.onclick=()=>{
  if(busy)return;
  if(prog.length>=L[lv].max){$("msg").innerHTML='<span class="er">&gt; ⚠ Bloklar limiti tugadi. Ixchamroq yozing!</span>';return}
  prog.push(b.dataset.c);upd();
});
$("undo").onclick=()=>{if(!busy){prog.pop();upd()}};
$("clr").onclick=()=>{if(!busy){prog=[];$("msg").innerHTML="";upd()}};
function compile(){
  const st=[[]];
  for(const p of prog){
    if(p.startsWith("LOOP")){const n={n:+p.split(":")[1],b:[]};st[st.length-1].push(n);st.push(n.b)}
    else if(p=="END"){if(st.length<2)return null;st.pop()}
    else st[st.length-1].push(p);
  }
  if(st.length!=1)return null;
  const flat=[];
  (function f(a){a.forEach(x=>{if(typeof x=="string")flat.push(x);else for(let i=0;i<x.n;i++)f(x.b)})})(st[0]);
  return flat;
}
function fail(m){$("msg").innerHTML='<span class="er">&gt; ✖ '+m+"</span>";busy=false;pos=[0,0];dir=0;setTimeout(draw,900)}
$("run").onclick=async()=>{
  if(busy)return;
  const steps=compile();
  if(!steps){$("msg").innerHTML='<span class="er">&gt; ✖ error: expected '}' at end of input (tsikl yopilmagan) yoki ortiqcha '}' bor.</span>';return}
  if(!steps.length)return;
  busy=true;pos=[0,0];dir=0;draw();$("msg").innerHTML='<span class="cm">&gt; bajarilmoqda...</span>';
  for(const s of steps){
    await new Promise(r=>setTimeout(r,420));
    if(s=="L")dir=(dir+3)%4;else if(s=="R")dir=(dir+1)%4;
    else{
      const nx=pos[0]+DX[dir],ny=pos[1]+DY[dir];
      if(nx<0||ny<0||nx>4||ny>4||L[lv].walls.some(w=>w[0]==nx&&w[1]==ny)){draw();fail("Segmentation fault (core dumped): robot devorga urildi. Debug qiling!");return}
      pos=[nx,ny];
    }
    draw();
  }
  if(pos[0]==L[lv].goal[0]&&pos[1]==L[lv].goal[1]){
    if(lv<L.length-1){$("msg").innerHTML='<span class="ok">&gt; ✔ Compiled successfully (exit code 0)</span><br><button class="k" id="nx">next_level() ▶</button>';$("nx").onclick=()=>{lv++;load()}}
    else $("msg").innerHTML='<span class="ok">&gt; 🏆 Barcha 10 daraja yechildi! Siz ketma-ketlik va tsikllarni o\'zlashtirdingiz.</span>';
  }else fail("assert(robot == goal) failed: robot ★ ga yetmadi. Dasturni o'zgartiring.");
  busy=false;
};
(function(){
 const cv=$("mx"),cx=cv.getContext("2d"),fs=16,ch="01{}<>/;=+()[]アイウエオカキクケコサシスセソ";
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
const clk=$("clk"),DN=["Yak","Dush","Sesh","Chor","Pay","Jum","Shan"];
function tickClk(){
 const d=new Date(),p=n=>String(n).padStart(2,"0");
 clk.innerHTML="🕒 "+p(d.getHours())+":"+p(d.getMinutes())+":"+p(d.getSeconds())+' <span style="color:var(--mu)">'+DN[d.getDay()]+" "+p(d.getDate())+"."+p(d.getMonth()+1)+"</span>";
}
tickClk();setInterval(tickClk,1000);
load();
