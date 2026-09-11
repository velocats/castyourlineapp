const mapStyles=document.createElement('link');
mapStyles.rel='stylesheet';
mapStyles.href=new URL('map.css',document.currentScript.src).href;
document.head.append(mapStyles);

const routeOverlay=`<svg class="map-route-svg" viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="A sample boat route from a Blue Mesa Reservoir launch with two catches marked in the water">
  <path class="boat-route" d="M8 69 C16 67 22 68 29 71 S42 74 49 70 S58 63 68 64 S80 68 90 65"/>
  <circle class="route-start" cx="8" cy="69" r="2.2"/>
  <path class="launch-dock" d="M5.2 72.5 L8 69 L11.2 72.5 M6.4 71.2 L4.5 69.4"/>
  <text class="map-label" x="4" y="77">BOAT LAUNCH</text>
  <circle class="catch-halo" cx="30" cy="71" r="2.25"/><circle class="catch-core" cx="30" cy="71" r="1.05"/>
  <text class="map-label" x="24" y="67.2">NEAR SHORE</text>
  <circle class="catch-halo" cx="68" cy="64" r="2.25"/><circle class="catch-core" cx="68" cy="64" r="1.05"/>
  <text class="map-label" x="63" y="60">DEEP WATER</text>
</svg>`;
document.querySelectorAll('.map').forEach(map=>map.insertAdjacentHTML('beforeend',routeOverlay));

const menu=document.querySelector('.menu');
const links=document.querySelector('.nav-links');
menu?.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.fade').forEach(e=>io.observe(e));
