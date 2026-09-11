const mapStyles=document.createElement('link');
mapStyles.rel='stylesheet';
mapStyles.href=new URL('map.css',document.currentScript.src).href;
document.head.append(mapStyles);

const routeOverlay=`<svg class="map-route-svg" viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="A sample boat route from a Blue Mesa Reservoir launch with two catches marked in the water">
  <path class="boat-route" d="M8 36 C17 34 22 31 30 30 C40 28 48 23 57 21 C68 18 78 22 90 26"/>
  <circle class="route-start" cx="8" cy="36" r="2.2"/>
  <path class="launch-dock" d="M5.2 39.5 L8 36 L11.2 39.5 M6.4 38.2 L4.5 36.4"/>
  <text class="map-label" x="4" y="44">BOAT LAUNCH</text>
  <circle class="catch-halo" cx="30" cy="30" r="2.25"/><circle class="catch-core" cx="30" cy="30" r="1.05"/>
  <text class="map-label" x="24" y="26.2">NEAR SHORE</text>
  <circle class="catch-halo" cx="68" cy="20" r="2.25"/><circle class="catch-core" cx="68" cy="20" r="1.05"/>
  <text class="map-label" x="63" y="16">DEEP WATER</text>
</svg>`;
document.querySelectorAll('.map').forEach(map=>map.insertAdjacentHTML('beforeend',routeOverlay));

document.querySelectorAll('a').forEach(link=>{
  const label=link.textContent.trim();
  if(label==='View on the App Store ↗'||label==='App Store') link.textContent='Coming soon';
});

const menu=document.querySelector('.menu');
const links=document.querySelector('.nav-links');
menu?.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.fade').forEach(e=>io.observe(e));
