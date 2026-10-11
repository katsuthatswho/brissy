(()=>{
const mapScreen=document.querySelector('#mapScreen');
if(!mapScreen||document.querySelector('#areaGuide'))return;
const links=mapScreen.querySelector('.map-links');
const wrap=document.createElement('section');
wrap.id='areaGuide';
wrap.className='area-guide';
wrap.innerHTML=`
  <div class="area-guide-head">
    <span class="eyebrow">AREAS</span>
    <h2>Where to go in Brisbane.</h2>
    <p>A quick guide to each area, with Sydney comparisons where they help.</p>
  </div>
  <details class="area-card" open>
    <summary><span><b>West End</b><small>Like Newtown / Enmore</small></span><span>⌄</span></summary>
    <div class="area-body">
      <p>Independent cafés, pubs, restaurants and shops around Boundary Street. Easy to spend an afternoon here. Quieter than Newtown late at night.</p>
      <div class="area-row"><b>Start</b><span>Boundary St → West Village → Davies Park</span></div>
      <div class="area-row"><b>Groceries</b><span>Woolworths + Harris Farm at West Village; Coles on Boundary St; ALDI and Sunlit Asian Supermarket nearby.</span></div>
      <a target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=Boundary+Street+West+End+Brisbane">Open Boundary St ↗</a>
    </div>
  </details>
  <details class="area-card">
    <summary><span><b>Fortitude Valley</b><small>Late-night bars and live music</small></span><span>⌄</span></summary>
    <div class="area-body">
      <p>Clubs, gigs and late bars. More places to eat after 10pm than West End, though kitchens still close earlier than venues.</p>
      <div class="area-row"><b>Start</b><span>Brunswick St Mall, then Ann St and the side streets.</span></div>
      <div class="area-row"><b>Go for</b><span>Late night, gigs, bars, post-dinner wandering.</span></div>
      <a target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=Brunswick+Street+Mall+Fortitude+Valley">Open the Valley ↗</a>
    </div>
  </details>
  <details class="area-card">
    <summary><span><b>New Farm</b><small>Like Paddington / Elizabeth Bay</small></span><span>⌄</span></summary>
    <div class="area-body">
      <p>Leafy streets, cafés, restaurants and the river. Go for lunch, dinner or a walk through New Farm Park.</p>
      <div class="area-row"><b>Start</b><span>Brunswick St → New Farm Park → riverwalk.</span></div>
      <div class="area-row"><b>Go for</b><span>Coffee, a nicer dinner, park + river.</span></div>
      <a target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=New+Farm+Park+Brisbane">Open New Farm ↗</a>
    </div>
  </details>
  <details class="area-card">
    <summary><span><b>Teneriffe</b><small>Like Walsh Bay</small></span><span>⌄</span></summary>
    <div class="area-body">
      <p>Converted wool stores, cafés and river walks. Quiet compared with the Valley. Easy to visit alongside New Farm.</p>
      <div class="area-row"><b>Go for</b><span>River walk, coffee, lunch, a slower afternoon.</span></div>
      <a target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=Teneriffe+Brisbane+riverwalk">Open Teneriffe ↗</a>
    </div>
  </details>
  <details class="area-card">
    <summary><span><b>South Brisbane + Fish Lane</b><small>Like Chippendale</small></span><span>⌄</span></summary>
    <div class="area-body">
      <p>Restaurants, bars and galleries near your Airbnb. Fish Lane is an easy choice for dinner without travelling far.</p>
      <div class="area-row"><b>Start</b><span>Fish Lane, then walk through South Bank if you feel like it.</span></div>
      <a target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=Fish+Lane+South+Brisbane">Open Fish Lane ↗</a>
    </div>
  </details>
  <details class="area-card">
    <summary><span><b>Inala</b><small>Vietnamese food and groceries</small></span><span>⌄</span></summary>
    <div class="area-body">
      <p>Head to Inala Plaza for Vietnamese restaurants, bakeries, produce stalls and Asian groceries. This is a food trip, not a nightlife stop.</p>
      <div class="area-row"><b>Start</b><span>Inala Plaza and the shops around the civic centre.</span></div>
      <div class="area-row"><b>Go for</b><span>Phở, bánh mì, Vietnamese groceries and fresh produce.</span></div>
      <div class="area-row"><b>Getting there</b><span>Southwest of the city. Check the route before leaving; it is not a quick walk from South Brisbane.</span></div>
      <a target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=Inala+Plaza+Brisbane">Open Inala Plaza in Google Maps ↗</a>
    </div>
  </details>
  <details class="area-card">
    <summary><span><b>CBD</b><small>Like Sydney CBD, on a smaller scale</small></span><span>⌄</span></summary>
    <div class="area-body">
      <p>City shops, laneway bars and some later food options. Burnett Lane is a good starting point.</p>
      <div class="area-row"><b>Go for</b><span>Late dinner backup, Burnett Lane, city bars.</span></div>
      <a target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=Burnett+Lane+Brisbane">Open Burnett Lane ↗</a>
    </div>
  </details>`;
(links||mapScreen.lastElementChild).insertAdjacentElement('afterend',wrap);
})();