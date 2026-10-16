// matritsa
(function(){
 const cv=document.getElementById("mx"),cx=cv.getContext("2d"),fs=16,ch="01{}<>/;=+()[]*&アイウエオカキクケコサシスセソ";
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
const clk=document.getElementById("clk"),DN=["Yak","Dush","Sesh","Chor","Pay","Jum","Shan"];
function tickClk(){
 const d=new Date(),p=n=>String(n).padStart(2,"0");
 clk.innerHTML="🕒 "+p(d.getHours())+":"+p(d.getMinutes())+":"+p(d.getSeconds())+' <span style="color:var(--mu)">'+DN[d.getDay()]+" "+p(d.getDate())+"."+p(d.getMonth()+1)+"</span>";
}
tickClk();setInterval(tickClk,1000);
