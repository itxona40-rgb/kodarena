const r=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const B=(n,l)=>n.toString(2).padStart(l||0,"0");
function opts(ans,gen){const s=[String(ans)];let t=0;while(s.length<4&&t++<300){const x=String(gen());if(!s.includes(x))s.push(x)}return s}
const near=n=>()=>Math.max(0,n+r(-5,5));
const flip=b=>()=>{const a=b.split(""),k=r(0,a.length-1);a[k]=a[k]=="0"?"1":"0";return a.join("")};
const GAME={title:"🔢 Binary Master",file:"binary.bin",lang:"bin",badge:"Binary",build(){
 const Q=[];
 for(let i=0;i<10;i++){
  if(i<3){const l=[4,4,5][i],n=r(5,(1<<l)-1),b=B(n,l);
   Q.push({q:"Ikkilik sonni o'nlikka o'tkazing:",c:"("+b+")₂",o:opts(n,near(n)),e:b.split("").map((x,k)=>x+"·"+(1<<(l-1-k))).join(" + ")+" = "+n});}
  else if(i<6){const l=[4,5,5][i-3],n=r(1<<(l-1),(1<<l)-1),b=B(n,l);
   Q.push({q:"O'nlik sonni ikkilikka o'tkazing:",c:n+"  →  ?",o:opts(b,flip(b)),e:n+" = "+b+" (2 lik)"});}
  else if(i<8){const n=r(16,255),h=n.toString(16).toUpperCase();
   Q.push({q:"O'n oltilik sonni o'nlikka o'tkazing:",c:"0x"+h,o:opts(n,near(n)),e:"0x"+h+" = "+parseInt(h[0],16)+"·16 + "+parseInt(h[1],16)+" = "+n});}
  else if(i==8){const a=r(5,15),b=r(5,15),x=a&b;
   Q.push({q:"Bitli AND (&) natijasi nechaga teng?",c:a+" & "+b,o:opts(x,near(x)),e:B(a,4)+" & "+B(b,4)+" = "+B(x,4)+" = "+x});}
  else{const a=r(2,12);
   Q.push({q:"Chapga 2 bit siljitish natijasi nechaga teng?",c:a+" << 2",o:opts(a*4,near(a*4)),e:"Har bir siljitish 2 ga ko'paytiradi: "+a+" × 4 = "+(a*4)});}
 }
 return Q;
}};
