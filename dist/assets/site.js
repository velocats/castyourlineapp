/* Everything on the page works without this file. It adds the mobile menu toggle and a screenshot viewer. */
const menu=document.querySelector('.menu');
const links=document.querySelector('.nav-links');
menu?.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});

/* Tap a screenshot to see it full size. Without JS the link opens the image itself. */
const shotLinks=document.querySelectorAll('a.shot-zoom');
if(shotLinks.length&&window.HTMLDialogElement){
  const box=document.createElement('dialog');
  box.className='lightbox';
  box.setAttribute('aria-label','Screenshot');
  box.innerHTML='<button type="button" class="lightbox-close">Close</button><img alt="">';
  document.body.append(box);
  const big=box.querySelector('img');
  let opener=null;
  shotLinks.forEach(a=>a.addEventListener('click',e=>{e.preventDefault();opener=a;const img=a.querySelector('img');big.src=a.href;big.alt=img?img.alt:'';box.showModal();box.scrollTo(0,0)}));
  /* On a phone the capture is wider than the screen: start at the content, past the app's sidebar. */
  big.addEventListener('load',()=>{if(box.scrollWidth>box.clientWidth)box.scrollLeft=big.offsetLeft+big.offsetWidth*0.235-10});
  box.addEventListener('click',()=>box.close());
  box.addEventListener('close',()=>{big.removeAttribute('src');opener?.focus()});
}
