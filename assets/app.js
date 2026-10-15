(()=>{'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const C=window.DG_CONFIG||{};
const ls={get:k=>{try{return localStorage.getItem(k)}catch(e){return null}},set:(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}},del:k=>{try{localStorage.removeItem(k)}catch(e){}}};
let lt=0;const toast=m=>{if(Date.now()-lt<10000)return;lt=Date.now();const d=document.createElement('div');d.className='toast glass';d.setAttribute('role','alert');d.textContent=m;document.body.appendChild(d);setTimeout(()=>d.remove(),6000)};
addEventListener('error',()=>toast('Something went wrong. Please refresh the page.'));addEventListener('unhandledrejection',()=>toast('Something went wrong. Please refresh the page.'));
function path(p){return p.map((q,i)=>(i?'L':'M')+q[0].toFixed(1)+' '+q[1].toFixed(1)).join(' ')}
/* navigation */
const nav=$('#nav'),tp=$('#top'),prog=$('#prog'),bg=$('#bg'),lk=$('#links');
const onS=()=>{nav.classList.toggle('s',scrollY>20);tp&&tp.classList.toggle('v',scrollY>700);prog.style.width=(scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight)*100)+'%'};
addEventListener('scroll',onS,{passive:true});onS();
if(tp)tp.onclick=()=>scrollTo({top:0,behavior:'smooth'});
bg.onclick=()=>{const o=lk.classList.toggle('o');bg.setAttribute('aria-expanded',o)};
lk.addEventListener('click',e=>{if(e.target.closest('a'))lk.classList.remove('o')});
addEventListener('keydown',e=>{if(e.key==='Escape'){lk.classList.remove('o');bg.setAttribute('aria-expanded','false');const a=document.activeElement;if(a&&a.closest&&a.closest('.dd'))a.blur()}});
/* reveal */
$$('.pg>*:not(.bc):not(.ph)').forEach(e=>e.classList.add('reveal'));
const rv=$$('.reveal');if('IntersectionObserver' in window){const ro=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');ro.unobserve(e.target)}}),{threshold:.12});rv.forEach(r=>ro.observe(r))}else rv.forEach(r=>r.classList.add('in'));
/* faq */
document.addEventListener('click',e=>{const b=e.target.closest('.fq button');if(b){const q=b.parentElement,o=q.classList.toggle('o');b.setAttribute('aria-expanded',o)}});
document.addEventListener('mousemove',e=>{const c=e.target.closest&&e.target.closest('.sc');if(c){const r=c.getBoundingClientRect();c.style.setProperty('--x',e.clientX-r.left+'px');c.style.setProperty('--y',e.clientY-r.top+'px')}});
const t=$('#tilt');if(t&&matchMedia('(hover:hover)').matches){t.onmousemove=e=>{const r=t.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;t.style.transform=`perspective(900px) rotateY(${x*8}deg) rotateX(${-y*8}deg)`};t.onmouseleave=()=>t.style.transform=''}
const st=$$('.st');if(st.length){let pi=0;setInterval(()=>{st.forEach((x,i)=>x.classList.toggle('a',i===pi));pi=(pi+1)%st.length},1300)}
const sq=$('#sq');if(sq)sq.oninput=()=>{const s=sq.value.toLowerCase().trim();$$('.pg .sc').forEach(c=>{c.hidden=!!s&&!c.textContent.toLowerCase().includes(s)});$$('.pg .grid').forEach(g=>{const none=!g.querySelector('.sc:not([hidden])');g.hidden=none;const h=g.previousElementSibling;if(h&&h.tagName==='H2')h.hidden=none})};
/* home counters and hero chart, analytics demo */
if($('#hk1')){// counters
function cnt(el,to,f){let s=null;const d=1600;(function st(ts){s=s||ts;const p=Math.min((ts-s)/d,1),v=to*(1-Math.pow(1-p,3));el.textContent=f(v);if(p<1)requestAnimationFrame(st)})(performance.now())}
cnt($('#hk1'),428,v=>'$'+Math.round(v)+'k');cnt($('#hk2'),3120,v=>Math.round(v).toLocaleString());cnt($('#hk3'),98,v=>Math.round(v)+'%');
}
if($('#mseg')){// charts
const NS='http://www.w3.org/2000/svg',MN=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DATA={Revenue:[310,298,334,352,341,380,402,395,431,448,470,492],Orders:[2100,2040,2230,2350,2290,2540,2700,2650,2890,3000,3150,3300],Customers:[820,805,860,910,901,975,1030,1022,1100,1150,1210,1265]};
const FMT={Revenue:v=>'$'+Math.round(v)+'k',Orders:v=>Math.round(v).toLocaleString(),Customers:v=>Math.round(v).toLocaleString()};
let M='Revenue',R=12;
function seg(id,opts,cur,cb){const e=$(id);e.innerHTML=opts.map(o=>`<button class="${o==cur?'on':''}">${o}</button>`).join('');[...e.children].forEach(b=>b.onclick=()=>{[...e.children].forEach(x=>x.classList.remove('on'));b.classList.add('on');cb(b.textContent)})}
seg('#mseg',Object.keys(DATA),M,v=>{M=v;draw()});seg('#rseg',['3M','6M','12M'],'12M',v=>{R=parseInt(v);draw()});
function path(p){return p.map((q,i)=>(i?'L':'M')+q[0].toFixed(1)+' '+q[1].toFixed(1)).join(' ')}
function draw(){
 const all=DATA[M],d=all.slice(-R),lab=MN.slice(-R),n=d.length;
 // forecast: linear regression on shown data
 const xm=(n-1)/2,ym=d.reduce((a,b)=>a+b)/n;let nu=0,de=0;d.forEach((y,i)=>{nu+=(i-xm)*(y-ym);de+=(i-xm)**2});const sl=nu/de,ic=ym-sl*xm;
 const fc=[1,2,3].map(k=>ic+sl*(n-1+k)),tot=n+3,W=640,H=280,pl=46,pb=28,pt=14,pr=10;
 const mx=Math.max(...d,...fc)*1.08,mn=Math.min(...d,...fc)*.9;
 const X=i=>pl+i*(W-pl-pr)/(tot-1),Y=v=>pt+(1-(v-mn)/(mx-mn))*(H-pt-pb);
 const pts=d.map((v,i)=>[X(i),Y(v)]),fp=[pts[n-1],...fc.map((v,i)=>[X(n+i),Y(v)])];
 let g='<defs><linearGradient id="lg" x1="0" x2="1"><stop offset="0" stop-color="#20D9F3"/><stop offset="1" stop-color="#a78bfa"/></linearGradient><linearGradient id="ar" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#356BFF" stop-opacity=".35"/><stop offset="1" stop-color="#356BFF" stop-opacity="0"/></linearGradient></defs>';
 for(let k=0;k<4;k++){const v=mn+(mx-mn)*k/3,y=Y(v);g+=`<line x1="${pl}" x2="${W-pr}" y1="${y}" y2="${y}" stroke="rgba(255,255,255,.1)"/><text x="${pl-8}" y="${y+4}" fill="#9a9a9a" font-size="11" text-anchor="end">${FMT[M](v)}</text>`}
 const nx=['Next 1','Next 2','Next 3'];[...lab,...nx].forEach((l,i)=>{if(tot<=10||i%2===0)g+=`<text x="${X(i)}" y="${H-8}" fill="#9a9a9a" font-size="11" text-anchor="middle">${l.replace('Next ','+')}</text>`});
 g+=`<path d="${path(pts)} L${X(n-1)} ${H-pb} L${X(0)} ${H-pb}Z" fill="url(#ar)"/><path class="ln" d="${path(pts)}" fill="none" stroke="url(#lg)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="${path(fp)}" fill="none" stroke="#fbbf24" stroke-width="2.5" stroke-dasharray="6 6"/>`;
 pts.forEach((p,i)=>g+=`<circle class="pt" data-i="${i}" cx="${p[0]}" cy="${p[1]}" r="4.5" fill="#000" stroke="#20D9F3" stroke-width="2.5" style="cursor:pointer"/>`);
 fp.slice(1).forEach((p,i)=>g+=`<circle class="pt" data-f="${i}" cx="${p[0]}" cy="${p[1]}" r="4.5" fill="#000" stroke="#fbbf24" stroke-width="2.5" style="cursor:pointer"/>`);
 const m=$('#main');m.innerHTML=g;$('#ct').textContent=M+' trend and forecast';
 const L=m.querySelector('.ln'),len=L.getTotalLength();L.style.strokeDasharray=len;L.style.strokeDashoffset=len;L.getBoundingClientRect();L.style.transition='stroke-dashoffset 1.2s ease';L.style.strokeDashoffset=0;
 const tip=$('#tip');$$('#main .pt').forEach(c=>{c.onmouseenter=c.onfocus=()=>{const f=c.dataset.f!==undefined,v=f?fc[+c.dataset.f]:d[+c.dataset.i],l=f?'Forecast +'+(+c.dataset.f+1):lab[+c.dataset.i];tip.innerHTML=`<b>${l}</b><br>${FMT[M](v)}`;const b=m.getBoundingClientRect(),pb2=m.parentElement.getBoundingClientRect();tip.style.left=(c.getBoundingClientRect().left-pb2.left+12)+'px';tip.style.top=(c.getBoundingClientRect().top-pb2.top-48)+'px';tip.style.opacity=1;c.setAttribute('r',7)};c.onmouseleave=c.onblur=()=>{tip.style.opacity=0;c.setAttribute('r',4.5)}});
 // KPIs
 const tt=d.reduce((a,b)=>a+b),last=d[n-1],first=d[0],gr=(last/first-1)*100;
 const k=[[M==='Revenue'?'Total revenue':'Total '+M.toLowerCase(),FMT[M](tt)],['Latest month',FMT[M](last)],['Growth over period',(gr>=0?'+':'')+gr.toFixed(1)+'%'],['Forecast, next month',FMT[M](fc[0])]];
 $('#kpis').innerHTML=k.map((x,i)=>`<div><small>${x[0]}</small><strong>${x[1]}</strong>${i==2?`<em style="color:${gr>=0?'#34d399':'#fb7185'}">${gr>=0?'▲':'▼'} vs first month</em>`:''}</div>`).join('');
 // categories
 const C=[['Apparel',.34,'#20D9F3'],['Home',.24,'#356BFF'],['Beauty',.19,'#a78bfa'],['Sports',.14,'#34d399'],['Other',.09,'#fbbf24']];
 $('#cat').innerHTML=C.map((c,i)=>{const w=c[1]*(.9+.1*Math.sin(R+i))/.34*190;return `<text x="0" y="${i*29+17}" fill="#9a9a9a" font-size="12">${c[0]}</text><rect x="60" y="${i*29+4}" height="18" rx="9" fill="${c[2]}" width="0"><animate attributeName="width" from="0" to="${w}" dur=".9s" fill="freeze" begin="0s"/></rect><text x="${68+w}" y="${i*29+17}" fill="#fff" font-size="12">${Math.round(c[1]*100)}%</text>`}).join('')}
draw();
(function(){const q=96,c=2*Math.PI*38;$('#ring').innerHTML=`<circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="9"/><circle cx="50" cy="50" r="38" fill="none" stroke="#34d399" stroke-width="9" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c}" transform="rotate(-90 50 50)"><animate attributeName="stroke-dashoffset" to="${c*(1-q/100)}" dur="1.4s" fill="freeze"/></circle><text x="50" y="55" fill="#fff" font-size="20" font-weight="800" text-anchor="middle">${q}%</text>`})();
}
if($('#hs')){// hero chart
(function(){const v=[40,52,47,66,60,82,78,104,98,130,124,152],s=$('#hs');const P=v.map((y,i)=>[i*(400/11),180-y*1.1]);const d=path(P);
 s.innerHTML+=`<path d="${d} L400 190 L0 190Z" fill="url(#hf)"/><path id="hl" d="${d}" fill="none" stroke="url(#hg)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`+P.map((p,i)=>`<circle cx="${p[0]}" cy="${p[1]}" r="4" fill="#fff"><animate attributeName="opacity" values="1;.2;1" dur="3s" begin="${i*.25}s" repeatCount="indefinite"/></circle>`).join('');
 const l=$('#hl'),n=l.getTotalLength();l.style.strokeDasharray=n;l.style.strokeDashoffset=n;l.style.transition='stroke-dashoffset 2s ease .6s';requestAnimationFrame(()=>l.style.strokeDashoffset=0)})();
}
/* contact info from config */
const ci=$('#cinfo');if(ci){const p=[];if(/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(C.email||'')){const a=document.createElement('a');a.href='mailto:'+C.email;a.textContent=C.email;a.style.textDecoration='underline';p.push(['Email: ',a])}p.forEach(x=>{const d=document.createElement('p');d.append(x[0],x[1]);ci.appendChild(d)})}
if(/^[+0-9 ()-]{6,24}$/.test(C.phone||'')){const tl='tel:'+C.phone.replace(/[^+0-9]/g,'');$$('[data-phone]').forEach(x=>x.href=tl);$$('[data-phtext]').forEach(x=>x.textContent=C.phone)}
/* inquiry form */
const F=$('#cf');if(F){
const lim=(s,n)=>String(s||'').replace(/[\u0000-\u001f\u007f]/g,' ').trim().slice(0,n);
const DK=['name','email','company','service','desc','budget','time','via'];
try{const d=JSON.parse(ls.get('dg_draft')||'{}');DK.forEach(k=>{if(typeof d[k]==='string'&&F.elements[k])F.elements[k].value=d[k].slice(0,3000)})}catch(e){}
const q=new URLSearchParams(location.search);
const so=[...F.elements.service.options].find(o=>o.dataset.slug&&o.dataset.slug===q.get('service'));if(so)F.elements.service.value=so.value;
const ind=lim(q.get('industry'),80);if(ind&&!F.elements.desc.value)F.elements.desc.value='Industry: '+ind+'. ';
let sv;F.addEventListener('input',()=>{clearTimeout(sv);sv=setTimeout(()=>{const d={};DK.forEach(k=>d[k]=F.elements[k].value.slice(0,3000));ls.set('dg_draft',JSON.stringify(d))},400)});
const T0=Date.now();let busy=false;const r=$('#res'),sb=$('#sb');
const sErr=(k,m)=>{const el=F.elements[k],s=el.parentElement.querySelector('.er');if(s)s.textContent=m||'';el.setAttribute('aria-invalid',m?'true':'false')};
const say=(m,err)=>{r.style.display='block';r.className=err?'err':'';r.textContent=m};
const done=()=>{busy=false;sb.disabled=false;sb.textContent='Send inquiry'};
const fallback=(v,msg)=>{const txt=['Name: '+v.name,'Email: '+v.email,'Company: '+(v.company||'-'),'Service: '+v.service,'Budget: '+(v.budget||'-'),'Timeline: '+(v.time||'-'),'Contact via: '+v.via,'','Project: '+v.desc].join('\n');
 const ok=/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(C.email||'');r.className='';r.style.display='block';r.textContent='';const b=document.createElement('b');b.style.color='#fff';b.textContent=msg;r.append(b,document.createElement('pre'));r.querySelector('pre').textContent=txt;
 const row=document.createElement('div');row.style.cssText='display:flex;gap:10px;flex-wrap:wrap;margin-top:12px';
 if(ok){const a=document.createElement('a');a.className='btn p';a.textContent='Open email app';a.href='mailto:'+C.email+'?subject='+encodeURIComponent('Project inquiry: '+v.service)+'&body='+encodeURIComponent(txt.slice(0,1500));row.appendChild(a)}
 const cp=document.createElement('button');cp.type='button';cp.className='btn';cp.textContent='Copy inquiry';cp.onclick=()=>{navigator.clipboard?navigator.clipboard.writeText(txt).then(()=>cp.textContent='Copied',()=>cp.textContent='Select the text above to copy'):cp.textContent='Select the text above to copy'};row.appendChild(cp);r.appendChild(row)};
const finish=()=>{ls.set('dg_last',String(Date.now()));ls.del('dg_draft');F.reset();DK.forEach(k=>sErr(k,''));done();r.scrollIntoView({behavior:'smooth',block:'nearest'})};
F.onsubmit=e=>{e.preventDefault();if(busy)return;const f=new FormData(F);if(f.get('website'))return;
 const v={};DK.forEach(k=>v[k]=lim(f.get(k),k==='desc'?3000:k==='name'?100:120));
 const E={};if(v.name.length<2)E.name='Enter your name.';if(!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(v.email))E.email='Enter a valid email address.';if(!v.service)E.service='Choose a service.';if(v.desc.length<20)E.desc='Describe your project in at least 20 characters.';
 ['name','email','service','desc'].forEach(k=>sErr(k,E[k]));const ok=f.get('ok');$('#oker').textContent=ok?'':'Please accept the privacy policy to continue.';
 if(Object.keys(E).length||!ok){say('Please fix the highlighted fields and try again.',1);return}
 if(Date.now()-T0<1500)return;
 if(Date.now()-(+ls.get('dg_last')||0)<60000){say('You sent an inquiry a moment ago. Please wait a minute before sending another.',1);return}
 busy=true;sb.disabled=true;sb.textContent='Sending…';
 if(/^https:\/\//.test(C.formEndpoint||'')){const ctl=new AbortController(),to=setTimeout(()=>ctl.abort(),12000);
  fetch(C.formEndpoint,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(v),signal:ctl.signal}).then(x=>{clearTimeout(to);if(!x.ok)throw 0;say('Thank you. Your inquiry has been sent. We will be in touch.');finish()}).catch(()=>{clearTimeout(to);done();fallback(v,'We could not send your inquiry automatically. Please use the options below.')})}
 else{setTimeout(()=>{fallback(v,'Your inquiry is ready.');finish_keep()},500)}
 function finish_keep(){ls.set('dg_last',String(Date.now()));ls.del('dg_draft');F.reset();DK.forEach(k=>sErr(k,''));done()}
}}
/* theme switch */
const tb=$('#theme');if(tb){const SUN='<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',MOON='<svg viewBox="0 0 24 24"><path d="M21 13A9 9 0 1111 3a7 7 0 0010 10z"/></svg>';
 const setT=t=>{document.documentElement.setAttribute('data-theme',t);ls.set('dg_theme',t);tb.innerHTML=t==='light'?MOON:SUN;tb.setAttribute('aria-label',t==='light'?'Switch to dark theme':'Switch to light theme')};
 setT(document.documentElement.getAttribute('data-theme')==='light'?'light':'dark');tb.onclick=()=>setT(document.documentElement.getAttribute('data-theme')==='light'?'dark':'light')}
/* English / Nepali */
const NE=window.DG_NE||{},lb=$('#lang'),orig=new WeakMap(),h1=$('h1[aria-label]');if(h1)h1.dataset.en=h1.innerHTML;
function applyLang(l){document.documentElement.lang=l;
 const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:n=>/^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA)$/.test(n.parentNode.nodeName)||!n.nodeValue.trim()?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});let n;
 while((n=w.nextNode())){if(!orig.has(n))orig.set(n,n.nodeValue);const o=orig.get(n),k=o.trim();n.nodeValue=l==='ne'&&NE[k]?o.replace(k,()=>NE[k]):o}
 $$('[placeholder]').forEach(e=>{if(!e.dataset.ph)e.dataset.ph=e.placeholder;e.placeholder=l==='ne'&&NE[e.dataset.ph]?NE[e.dataset.ph]:e.dataset.ph});
 if(h1){const a=h1.getAttribute('aria-label');if(l==='ne'&&NE[a])h1.textContent=NE[a];else h1.innerHTML=h1.dataset.en}
 if(lb){lb.textContent=l==='ne'?'EN':'नेपाली';lb.setAttribute('aria-label',l==='ne'?'Switch to English':'नेपालीमा हेर्नुहोस्')}}
if(lb){lb.onclick=()=>{const l=document.documentElement.lang==='ne'?'en':'ne';ls.set('dg_lang',l);applyLang(l)}}
if(ls.get('dg_lang')==='ne')applyLang('ne');else if(lb)lb.textContent='नेपाली';
/* WhatsApp and booking links from config */
const wa=/^\d{8,15}$/.test(C.whatsapp||'')?C.whatsapp:'';$$('[data-wa]').forEach(a=>{if(wa)a.href='https://wa.me/'+wa+'?text='+encodeURIComponent('Hello DtrionGlobal, I would like to discuss a data project.');else a.hidden=true});
const bk=/^https:\/\//.test(C.bookingUrl||'')?C.bookingUrl:'';$$('[data-booking]').forEach(a=>{if(bk){a.href=bk;a.target='_blank';a.rel='noopener noreferrer';a.hidden=false}});
/* checklist download form */
const CK=$('#ckf');if(CK){const ep=/^https:\/\//.test(C.formEndpoint||'')?C.formEndpoint:'',dd=$('#ckdirect');
 if(!ep){CK.hidden=true;dd.hidden=false}
 else CK.onsubmit=e=>{e.preventDefault();const f=new FormData(CK),r=$('#ckres'),em=String(f.get('email')||'').trim().slice(0,120);if(f.get('website'))return;
  const bad=!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(em);CK.querySelector('.er').textContent=bad?'Enter a valid email address.':'';if(bad)return;
  if(!f.get('ok')){r.className='err';r.style.display='block';r.textContent='Please accept the privacy policy to continue.';return}
  const b=$('#cks');b.disabled=true;b.textContent='Sending…';const ctl=new AbortController(),to=setTimeout(()=>ctl.abort(),12000);
  fetch(ep,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({email:em,source:'data-readiness-checklist'}),signal:ctl.signal}).then(x=>{clearTimeout(to);if(!x.ok)throw 0;CK.hidden=true;dd.hidden=false;$('#ckthanks').hidden=false}).catch(()=>{clearTimeout(to);b.disabled=false;b.textContent='Get the checklist';r.className='err';r.style.display='block';r.textContent='We could not send that. Please try again in a moment.'})}}

})();