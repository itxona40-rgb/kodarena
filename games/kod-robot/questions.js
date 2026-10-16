const r=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const DIRS=["Sharq (→)","Janub (↓)","G'arb (←)","Shimol (↑)"],DX=[1,0,-1,0],DY=[0,1,0,-1];
const F={t:"F"},R={t:"R"},L={t:"L"};
const lp=(n,body)=>({t:"LOOP",n,body});
const rep=(c,n)=>Array.from({length:n},()=>c);
const pos=(x,y)=>"("+x+", "+y+")";
// dasturni bajarib, robotning oxirgi holatini hisoblaydi
function run(p){
 const s={x:0,y:0,d:0,path:[pos(0,0)],calls:0};
 (function ex(a){for(const c of a){
  if(c.t=="F"){s.x+=DX[s.d];s.y+=DY[s.d];s.calls++;s.path.push(pos(s.x,s.y))}
  else if(c.t=="R")s.d=(s.d+1)%4;
  else if(c.t=="L")s.d=(s.d+3)%4;
  else for(let i=0;i<c.n;i++)ex(c.body);
 }})(p);
 return s;
}
// dasturni C++ ko'rinishida yozadi
function code(p){
 const out=["// Robot (0, 0) dan boshlaydi va sharqqa (→) qaraydi.","// Koordinata (x, y): x — o'ngga, y — pastga."];
 (function w(a,ind){for(const c of a){
  const sp="  ".repeat(ind),v=["i","j","k"][ind];
  if(c.t=="F")out.push(sp+"moveForward();");
  else if(c.t=="R")out.push(sp+"turnRight();");
  else if(c.t=="L")out.push(sp+"turnLeft();");
  else{out.push(sp+"for (int "+v+" = 0; "+v+" < "+c.n+"; "+v+"++) {");w(c.body,ind+1);out.push(sp+"}")}
 }})(p,0);
 return out.join("\n");
}
function posOpts(x,y){
 const s=[pos(x,y)];let t=0;
 while(s.length<4&&t++<400){const o=pos(Math.max(0,x+r(-2,2)),Math.max(0,y+r(-2,2)));if(!s.includes(o))s.push(o)}
 return s;
}
function numOpts(n){
 const s=[String(n)];let t=0;
 while(s.length<4&&t++<400){const o=String(Math.max(1,n+r(-4,4)));if(!s.includes(o))s.push(o)}
 return s;
}
const GAME={title:"🤖 Kod Robot",file:"robot.cpp",lang:"cpp",badge:"Robot",build(){
 const Q=[];
 const pq=(p,text)=>{const s=run(p);Q.push({q:text||"Dastur tugagach robot qaysi katakda bo'ladi?",c:code(p),o:posOpts(s.x,s.y),e:"Yo'l: "+s.path.join(" → ")+". Javob: "+pos(s.x,s.y)})};
 pq(rep(F,r(2,4)));
 pq([lp(r(3,5),[F])]);
 {const a=r(1,3),b=r(1,3);pq([...rep(F,a),R,...rep(F,b)])}
 {const a=r(2,4),b=r(1,3);pq([R,...rep(F,a),L,...rep(F,b)])}
 {const t=[];for(let i=0,n=r(3,5);i<n;i++)t.push(Math.random()<.5?R:L);
  const s=run(t);let d=0;const tr=[DIRS[0]];for(const c of t){d=(d+(c.t=="R"?1:3))%4;tr.push(DIRS[d])}
  Q.push({q:"Dastur tugagach robot qaysi tomonga qarab turadi?",c:code(t),o:[DIRS[s.d],...DIRS.filter((_,i)=>i!=s.d)],e:"Yo'nalishlar: "+tr.join(" → ")})}
 pq([lp(r(2,3),[F,R,F,L])]);
 pq([lp(r(2,3),[F,F,R])]);
 {const a=r(2,4),b=r(2,4),p=[lp(a,[lp(b,[F])])],s=run(p);
  Q.push({q:"Bu dastur moveForward() ni jami necha marta chaqiradi?",c:code(p),o:numOpts(s.calls),e:"Tashqi tsikl "+a+" marta, ichki tsikl har safar "+b+" marta: "+a+" × "+b+" = "+s.calls})}
 pq([lp(r(2,4),[F,R])]);
 pq([lp(r(2,3),[F,F,R,F,L])],"Final! Dastur tugagach robot qaysi katakda bo'ladi?");
 return Q;
}};
