const mapStyles=document.createElement('link');
mapStyles.rel='stylesheet';
mapStyles.href=new URL('map.css',document.currentScript.src).href;
document.head.append(mapStyles);

const routeOverlay=`<svg class="map-route-svg" viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="A sample boat route from a Blue Mesa Reservoir launch with two catches marked in the water">
  <path class="boat-route" d="M8 64 C17 61 23 63 29 66 C39 69 48 65 56 64 C63 63 67 64 72 65 C80 67 85 66 90 64"/>
  <circle class="route-start" cx="8" cy="64" r="2.2"/>
  <path class="launch-dock" d="M5.2 67.5 L8 64 L11.2 67.5 M6.4 66.2 L4.5 64.4"/>
  <text class="map-label" x="4" y="72">BOAT LAUNCH</text>
  <circle class="catch-halo" cx="29" cy="66" r="2.25"/><circle class="catch-core" cx="29" cy="66" r="1.05"/>
  <text class="map-label" x="23" y="62.2">NEAR SHORE</text>
  <circle class="catch-halo" cx="68" cy="64" r="2.25"/><circle class="catch-core" cx="68" cy="64" r="1.05"/>
  <text class="map-label" x="63" y="60">DEEP WATER</text>
</svg>`;
document.querySelectorAll('.map').forEach(map=>map.insertAdjacentHTML('beforeend',routeOverlay));

const menu=document.querySelector('.menu');
const links=document.querySelector('.nav-links');
menu?.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.fade').forEach(e=>io.observe(e));
