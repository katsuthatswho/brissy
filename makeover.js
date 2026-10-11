(()=>{
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const setText=(s,v)=>{const e=$(s);if(e)e.textContent=v};
const metaTheme=document.querySelector('meta[name="theme-color"]');if(metaTheme)metaTheme.setAttribute('content','#f2ecdf');

setText('header span','11–18 OCT · BRISBANE');
const hb=$('#headerHome');if(hb)hb.textContent='Home + PPA';
[
 ['#explore .eyebrow','FOOD'],['#explore h1','Where to eat.'],['#explore .sub','Coffee, Japanese, Vietnamese, Italian and a few places worth going out of your way for.'],
 ['#mapScreen .eyebrow','MAP'],['#mapScreen h1','Home, PPA, neighbourhoods.'],['#mapScreen .sub','Food markers show areas, not exact venues. Use the Map button on a venue card for the exact pin.'],
 ['#plan .eyebrow','11–18 OCTOBER'],['#plan h1','Your week.'],['#plan .sub','Start here. Food, pickleball and the bits of Brisbane you actually have time for.'],
 ['#ppa .eyebrow','PPA BRISBANE · 13–18 OCT'],['#ppa h1','Pickleball.'],['#ppa .sub','What is on each day, roughly when to keep free, and the live tournament links.'],
 ['#essentials .eyebrow','LOCAL NOTES'],['#essentials h1','Good to know.'],['#essentials .sub','Transport, neighbourhoods, coffee hours and a few Brisbane things that are handy to know.']
].forEach(([s,v])=>setText(s,v));

const nav=$('.bottom');
if(nav){
 const order=['plan','explore','ppa','mapScreen','essentials'];
 const labels={plan:'Week',explore:'Food',ppa:'PPA',mapScreen:'Map',essentials:'Local'};
 order.forEach(id=>{const b=nav.querySelector(`[data-tab="${id}"]`);if(b){const glyph=b.querySelector('.glyph');b.innerHTML='';if(glyph)b.appendChild(glyph);b.append(document.createTextNode(labels[id]));nav.appendChild(b)}});
}

const home=$('#explore .home'), today=$('#todayCard');
if(home&&today){const small=home.querySelector('small');if(small)small.textContent='YOUR BASE';home.classList.add('trip-base');today.insertAdjacentElement('afterend',home)}

const planSub=$('#plan .sub');
if(planSub&&!$('#tripQuick')){const q=document.createElement('div');q.id='tripQuick';q.className='trip-quick';q.innerHTML='<button data-screen="ppa"><b>PPA</b><span>Schedule + times</span></button><button data-screen="explore"><b>Food</b><span>Pick the next meal</span></button><a href="https://www.google.com/maps/dir/?api=1&origin=1+Cordelia+Street+South+Brisbane+QLD+4101&destination=190+King+Arthur+Terrace+Tennyson+QLD+4105" target="_blank" rel="noopener"><b>Route</b><span>Home → PPA</span></a>';planSub.insertAdjacentElement('afterend',q)}

function brisbaneNow(){return new Date(new Date().toLocaleString('en-US',{timeZone:'Australia/Brisbane'}))}
function tidyToday(){
 const now=brisbaneNow(),d=now.getDate(),m=now.getMonth()+1,card=$('#todayCard .today-card');if(!card)return;
 const matching=$$('#days .day').find(x=>{const t=x.querySelector('.tag')?.textContent||'';return m===10&&new RegExp(`\\b${d}\\b`).test(t)});
 const label=card.querySelector('.day-label');if(label)label.textContent=(m===10&&d>=11&&d<=18)?`TODAY · ${now.toLocaleDateString('en-AU',{weekday:'short',day:'numeric',month:'short'})}`:'YOUR BRISBANE WEEK';
 if(matching){const h=card.querySelector('h2');if(h)h.textContent=matching.querySelector('h2')?.textContent||'Today';const p=card.querySelector('p');const bits=[...matching.querySelectorAll('p')].slice(0,2).map(x=>x.textContent.replace(/\s+/g,' ').trim());if(p&&bits.length)p.textContent=bits.join(' · ');matching.classList.add('is-today')}
 const btn=card.querySelector('#viewToday');if(btn){btn.textContent='Jump to today';btn.onclick=()=>matching?.scrollIntoView({behavior:'smooth',block:'start'})}
 const link=card.querySelector('a');if(link)link.textContent='Route to PPA ↗';
}
tidyToday();

function polishVenues(){
 $$('.venue').forEach(v=>{
   if(v.dataset.polished)return;v.dataset.polished='1';
   [...v.querySelectorAll('.actions a')].forEach(a=>{const t=a.textContent.toLowerCase();if(t.includes('menu'))a.textContent='Menu ↗';else if(t.includes('instagram'))a.textContent='Instagram ↗';else if(t.includes('google maps'))a.textContent='Map ↗'});
   const note=v.querySelector('.note');if(note)note.textContent=note.textContent.replace(/worth a detour/gi,'worth the trip').replace(/great option/gi,'good option').replace(/perfect for/gi,'good for').replace(/food playground/gi,'food area').replace(/hidden gem/gi,'small local spot');
 });
}
polishVenues();new MutationObserver(polishVenues).observe($('#venues')||document.body,{childList:true,subtree:true});

function polishPpa(){
 $$('.ppa-day').forEach(row=>{if(row.querySelector('.time-state'))return;const p=row.querySelector('p');if(!p)return;const confirmed=/published|8am|10am|10:30am|12pm|6pm/i.test(p.textContent);const tag=document.createElement('span');tag.className='time-state '+(confirmed?'confirmed':'estimate');tag.textContent=confirmed?'PUBLISHED':'ROUGH WINDOW';row.querySelector('div')?.insertBefore(tag,p)});
}
polishPpa();new MutationObserver(polishPpa).observe($('#ppaDays')||document.body,{childList:true,subtree:true});
if($('.ppa-banner')){setText('.ppa-banner small','AUSTRALIAN PICKLEBALL CUP · PPA1500');setText('.ppa-banner h2','Plan around the draw.');setText('.ppa-banner p','Queensland Tennis Centre · Tennyson')}

$$('.guide-item').forEach(d=>d.removeAttribute('open'));
const headingMap={'Your Sydney clock is wrong':'Brisbane is an hour behind Sydney','The commute can be a river cruise':'Take the ferry when you can','Almost every trip is 50c':'Public transport is 50c','Meet the brown snake':'The river changes how you get around','Yes, that’s a city beach':'There’s a beach at South Bank','Get your coffee early':'Coffee shuts early','West End is your local':'West End is the easy default','Do Inala before dinner':'Go to Inala for lunch','October turns purple':'Jacarandas are out','Going out? Head to the Valley':'For late nights: the Valley','PPA is further out than it looks':'Leave time for Tennyson','Need groceries?':'Groceries nearby','Arriving late?':'Late arrival backup'};
$$('.guide-item summary span:first-child').forEach(e=>{if(headingMap[e.textContent])e.textContent=headingMap[e.textContent]});

const toast=document.createElement('div');toast.id='toast';toast.setAttribute('role','status');document.body.appendChild(toast);
function say(msg){toast.textContent=msg;toast.classList.add('show');clearTimeout(say.t);say.t=setTimeout(()=>toast.classList.remove('show'),1600)}
window.copyPlace=async which=>{const a=['1 Cordelia Street, South Brisbane, QLD 4101','Queensland Tennis Centre, 190 King Arthur Terrace, Tennyson, QLD 4105'];try{await navigator.clipboard.writeText(a[which]);say(which?'PPA address copied':'Airbnb address copied')}catch{say('Press and hold to copy the address')}};

if(!location.hash&&typeof openTab==='function')openTab('plan');
})();