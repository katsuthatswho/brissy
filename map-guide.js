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
    <h2>Brisbane, in Sydney terms.</h2>
    <p>Not exact matches. Just a quick read on where you’ll probably want to spend time.</p>
  </div>
  <details class="area-card" open>
    <summary><span><b>West End</b><small>Closest to Newtown / Enmore</small></span><span>⌄</span></summary>
    <div class="area-body">
      <p>Independent, casual and easy to wander. Good food, pubs, small bars and groceries all mixed together. Less intense than Newtown at midnight, but the same idea of a neighbourhood you can stay in for hours.</p>
      <div class="area-row"><b>Start</b><span>Boundary St → West Village → Davies Park</span></div>
      <div class="area-row"><b>Groceries</b><span>Woolworths + Harris Farm at West Village; Coles on Boundary St; ALDI and Sunlit Asian Supermarket nearby.</span></div>
      <a target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=Boundary+Street+West+End+Brisbane">Open Boundary St ↗</a>
    </div>
  </details>
  <details class="area-card">
    <summary><span><b>Fortitude Valley</b><small>Newtown after dark + a bit of old Kings Cross</small></span><span>⌄</span></summary>
    <div class="area-body">
      <p>This is where Brisbane gets louder. Clubs, live music, late bars and the best chance of finding food after 10pm. If the plan is “keep going”, come here rather than West End.</p>
      <div class="area-row"><b>Start</b><span>Brunswick St Mall, then Ann St and the side streets.</span></div>
      <div class="area-row"><b>Go for</b><span>Late night, gigs, bars, post-dinner wandering.</span></div>
      <a target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=Brunswick+Street+Mall+Fortitude+Valley">Open the Valley ↗</a>
    </div>
  </details>
  <details class="area-card">
    <summary><span><b>New Farm</b><small>Paddington / Elizabeth Bay-ish</small></span><span>⌄</span></summary>
    <div class="area-body">
      <p>Leafier and more polished. Cafés, restaurants, nice streets and the river. Better for a long lunch, dinner or an easy afternoon than a messy late night.</p>
      <div class="area-row"><b>Start</b><span>Brunswick St → New Farm Park → riverwalk.</span></div>
      <div class="area-row"><b>Go for</b><span>Coffee, a nicer dinner, park + river.</span></div>
      <a target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=New+Farm+Park+Brisbane">Open New Farm ↗</a>
    </div>
  </details>
  <details class="area-card">
    <summary><span><b>Teneriffe</b><small>Walsh Bay with better brunch</small></span><span>⌄</span></summary>
    <div class="area-body">
      <p>Old wool stores, apartments and the river. Quieter and more put-together than the Valley. Easy to pair with New Farm rather than make it a whole separate mission.</p>
      <div class="area-row"><b>Go for</b><span>River walk, coffee, lunch, a slower afternoon.</span></div>
      <a target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=Teneriffe+Brisbane+riverwalk">Open Teneriffe ↗</a>
    </div>
  </details>
  <details class="area-card">
    <summary><span><b>South Brisbane + Fish Lane</b><small>Chippendale-ish</small></span><span>⌄</span></summary>
    <div class="area-body">
      <p>Food, bars and galleries packed into a small area beside the CBD. This is the easy option from your place when you want something good without making a night of the commute.</p>
      <div class="area-row"><b>Start</b><span>Fish Lane, then walk through South Bank if you feel like it.</span></div>
      <a target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=Fish+Lane+South+Brisbane">Open Fish Lane ↗</a>
    </div>
  </details>
  <details class="area-card">
    <summary><span><b>CBD</b><small>Sydney CBD, just smaller</small></span><span>⌄</span></summary>
    <div class="area-body">
      <p>Useful for late food, laneway bars and anything tied to the city centre. Worth dipping into, but I wouldn’t spend a whole day here over West End, New Farm or the Valley.</p>
      <div class="area-row"><b>Go for</b><span>Late dinner backup, Burnett Lane, city bars.</span></div>
      <a target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=Burnett+Lane+Brisbane">Open Burnett Lane ↗</a>
    </div>
  </details>`;
(links||mapScreen.lastElementChild).insertAdjacentElement('afterend',wrap);
})();