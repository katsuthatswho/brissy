(()=>{
const origin='1 Cordelia Street, South Brisbane QLD 4101';
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const walkingUrl=name=>'https://www.google.com/maps/dir/?api=1&origin='+encodeURIComponent(origin)+'&destination='+encodeURIComponent(name+', Brisbane QLD')+'&travelmode=walking';
const coffee=places.filter(p=>p.cuisine==='Coffee');
const venueByName=new Map(places.map(p=>[p.name.toLowerCase(),p]));
const storeKey='brissy-week-custom-v1';
let edits={};try{edits=JSON.parse(localStorage.getItem(storeKey)||'{}')}catch{}
const save=()=>{try{localStorage.setItem(storeKey,JSON.stringify(edits))}catch{}};
const optionsFor=(kind)=>places.filter(p=>kind==='Coffee'?p.cuisine==='Coffee':kind==='Lunch'||kind==='Dinner'?p.cuisine!=='Coffee':true).sort((a,b)=>a.name.localeCompare(b.name));
const slotNames={Coffee:2,Lunch:3,Dinner:4};
const mapLink=name=>{const p=venueByName.get(name.toLowerCase());return p?.maps||'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(name+' Brisbane')};
function renderWeek(){
 const root=document.querySelector('#days');if(!root)return;
 root.innerHTML='<article class="day"><span class="tag">Sunday 11 · Arrival</span><h2>Land, check in, eat if hungry.</h2><p>8:30pm landing. Rideshare to South Brisbane; see Local for late food and groceries.</p></article>'+days.map((d,i)=>{
 const row=(kind)=>{const original=d[slotNames[kind]],name=edits[i+'-'+kind]??original;return '<div class="week-choice"><div><span class="week-kind">'+kind+'</span><a href="'+escape(mapLink(name))+'" target="_blank" rel="noopener">'+escape(name)+' ↗</a></div><button type="button" class="week-change" data-day="'+i+'" data-kind="'+kind+'">Change</button></div>'};
 return '<article class="day"><span class="tag">'+escape(d[0])+'</span><h2>'+escape(d[1])+'</h2>'+row('Coffee')+row('Lunch')+'<div class="week-choice"><div><span class="week-kind">Afternoon</span><span>'+escape(d[5])+'</span></div></div>'+row('Dinner')+'</article>';
 }).join('');
 root.querySelectorAll('.week-change').forEach(btn=>btn.addEventListener('click',()=>editSlot(Number(btn.dataset.day),btn.dataset.kind,btn)));
 const now=new Intl.DateTimeFormat('en-AU',{timeZone:'Australia/Brisbane',weekday:'short',day:'numeric'}).format(new Date());
 const i=days.findIndex(d=>d[0]===now);
 const card=document.querySelector('#todayCard .today-card p');
 if(card&&i>=0)card.textContent='Coffee: '+(edits[i+'-Coffee']??days[i][2])+' · Dinner: '+(edits[i+'-Dinner']??days[i][4]);
}
function editSlot(i,kind,button){
 const key=i+'-'+kind,current=edits[key]??days[i][slotNames[kind]];
 const holder=button.closest('.week-choice');
 if(holder.querySelector('select'))return;
 const select=document.createElement('select');select.className='week-select';select.setAttribute('aria-label','Choose '+kind.toLowerCase()+' for '+days[i][0]);
 const all=[...optionsFor(kind)];
 if(!all.some(p=>p.name===current))all.unshift({name:current});
 all.forEach(p=>{const o=document.createElement('option');o.value=p.name;o.textContent=p.name+(p.area?' · '+p.area:'');o.selected=p.name===current;select.appendChild(o)});
 const custom=document.createElement('option');custom.value='__custom';custom.textContent='Enter another place…';select.appendChild(custom);
 select.addEventListener('change',()=>{let value=select.value;if(value==='__custom'){value=prompt('Where would you like to go?',current)?.trim();if(!value){renderWeek();return}}edits[key]=value;save();renderWeek()});
 const reset=document.createElement('button');reset.type='button';reset.className='week-reset';reset.textContent='Reset';reset.onclick=()=>{delete edits[key];save();renderWeek()};
 holder.append(select,reset);button.remove();
 select.focus();
}
const style=document.createElement('style');style.textContent='.week-choice{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;padding:11px 0;border-top:1px solid #e7e1d8;font-size:13px;flex-wrap:wrap}.week-choice>div:first-child{display:flex;flex-direction:column;gap:5px;min-width:0;flex:1}.week-kind{font-size:11px;color:#5d6763;font-weight:750}.week-choice a{color:#20534e;font-weight:650;line-height:1.45}.week-change,.week-reset{border:1px solid #d3dbd4;background:#f0f5f0;border-radius:9px;padding:8px 11px;color:#20534e;font-size:12px;font-weight:700}.week-select{width:100%;padding:11px;border:1px solid #bac9c0;border-radius:10px;background:white;color:#1e403d;font-size:14px}.coffee-walk{font-size:12px;margin:9px 0;color:#365c52;line-height:1.5}.coffee-walk a{color:#20534e;text-decoration:underline}.coffee-walk small{display:block;color:#6d7771;font-size:10px;margin-top:2px}';document.head.appendChild(style);
renderWeek();
// Distances are deliberately labelled as approximate: geocoded points and a straight-line
// distance uplift, not a pedestrian routing service. Google Maps provides actual walking routes.
let geocache={};try{geocache=JSON.parse(localStorage.getItem('brissy-geocodes-v1')||'{}')}catch{}
const base=[-27.474,153.019]; // South Brisbane approximate fallback is NOT used for displayed estimates
async function geocode(query){
 if(geocache[query])return geocache[query];
 const u='https://photon.komoot.io/api/?limit=5&q='+encodeURIComponent(query);
 const res=await fetch(u);if(!res.ok)throw Error('geocode unavailable');const data=await res.json();
 const hits=(data.features||[]).filter(x=>{const p=x.properties||{};return /Brisbane|Queensland|South Brisbane|West End|Fortitude Valley|Newstead|Milton|Teneriffe|New Farm/i.test([p.city,p.state,p.district,p.county].join(' '))});
 const hit=hits[0];if(!hit)throw Error('not found');const coord=hit.geometry.coordinates;geocache[query]=coord;try{localStorage.setItem('brissy-geocodes-v1',JSON.stringify(geocache))}catch{}return coord;
}
function metres(a,b){const rad=Math.PI/180;const dlat=(b[1]-a[1])*rad,dlon=(b[0]-a[0])*rad;const v=Math.sin(dlat/2)**2+Math.cos(a[1]*rad)*Math.cos(b[1]*rad)*Math.sin(dlon/2)**2;return 12742000*Math.atan2(Math.sqrt(v),Math.sqrt(1-v))}
const queue=coffee.map(p=>p.name);let busy=false;const distances={};
async function processQueue(){
 if(busy)return;busy=true;
 let start;
 try{start=await geocode(origin)}catch{busy=false;return}
 for(const name of queue){
  try{
   const p=venueByName.get(name.toLowerCase());
   const coord=await geocode((p?.address?name+' '+p.address:name+' '+p.area)+' Brisbane Queensland');
   const straight=metres(start,coord);
   if(straight<25000){const approx=Math.round(straight*1.25/50)*50;distances[name]=approx;applyDistances()}
  }catch{}
  await new Promise(resolve=>setTimeout(resolve,1100));
 }
 busy=false;
}
function applyDistances(){
 document.querySelectorAll('#venues .venue').forEach(card=>{
  const name=card.querySelector('h2')?.textContent;
  if(!name||!coffee.some(p=>p.name===name))return;
  let line=card.querySelector('.coffee-walk');
  if(!line){line=document.createElement('div');line.className='coffee-walk';card.querySelector('.rating')?.insertAdjacentElement('afterend',line)}
  const d=distances[name];
  line.innerHTML=d!=null?'From Tower One: ~'+d.toLocaleString('en-AU')+' m · ~'+Math.max(1,Math.round(d/80))+' min walk <a href="'+walkingUrl(name)+'" target="_blank" rel="noopener">Route ↗</a><small>Approximate, not a mapped walking route</small>':'<a href="'+walkingUrl(name)+'" target="_blank" rel="noopener">Walking directions from Tower One ↗</a>';
 });
}
let queued=false;new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;applyDistances()})}).observe(document.querySelector('#venues'),{childList:true});
applyDistances();processQueue();
})();