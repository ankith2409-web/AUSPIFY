const products = [
  {id:'lamp',name:'Ceramic Table Lamp',category:'Lighting',price:248,material:'Stoneware, linen',size:'32 × 42 cm',description:'A quietly sculptural lamp with a softly diffused glow. Its rounded ceramic silhouette brings warmth to a bedside or reading corner.'},
  {id:'table',name:'Oak Side Table',category:'Furniture',price:398,material:'Solid oak',size:'46 × 46 × 48 cm',description:'A compact, balanced form in warm oak. The generous circular top makes room for a book, a cup, and the small things you reach for daily.'},
  {id:'cushion',name:'Linen Cushion',category:'Textiles',price:78,material:'Linen, cotton fill',size:'50 × 50 cm',description:'Natural linen with a relaxed texture and a soft, supportive fill. An easy layer for a sofa, chair, or bed.'},
  {id:'kettle',name:'Pour-Over Kettle',category:'Tabletop',price:128,material:'Stainless steel, oak',size:'1 litre',description:'A precise gooseneck spout and considered handle make the morning pour feel a little more deliberate.'},
  {id:'clock',name:'Wall Clock',category:'Decor',price:168,material:'Oak, aluminium',size:'Ø 32 cm',description:'An understated clock with a light oak frame and clear, minimal face. Designed to sit comfortably in any room.'},
  {id:'vase',name:'Glass Vase',category:'Decor',price:96,material:'Recycled glass',size:'22 × 25 cm',description:'A rounded glass vessel with a soft olive tint. Equally at home with a few branches or left beautifully empty.'}
];
const categories=['All objects','Lighting','Furniture','Textiles','Tabletop','Decor'];
const main=document.querySelector('#main');
const money=n=>`$${n.toFixed(2)}`;
const art={
lamp:`<ellipse cx="300" cy="360" rx="130" ry="17" fill="#b5a99c" opacity=".3"/><path d="M285 192h30v65h-30z" fill="#9b8064"/><path d="M255 252q-8 0-10 10l-16 89q70 21 142 0l-16-89q-2-10-10-10z" fill="#c7b39d"/><path d="M171 194q18-111 129-111t129 111z" fill="#e7d7c4"/><path d="M171 194h258v13H171z" fill="#d6c4ae"/>`,
table:`<ellipse cx="300" cy="365" rx="160" ry="18" fill="#b5a99c" opacity=".3"/><path d="M244 182h37v169h-37zM325 182h37v169h-37z" fill="#9d683c"/><ellipse cx="300" cy="181" rx="154" ry="26" fill="#b78049"/><path d="M146 181v15q7 28 154 28t154-28v-15q-19 28-154 28T146 181" fill="#95643c"/><ellipse cx="300" cy="178" rx="154" ry="26" fill="#c28c53"/>`,
cushion:`<ellipse cx="300" cy="352" rx="153" ry="17" fill="#b5a99c" opacity=".3"/><path d="M180 122q48 15 119 5 71 10 121-5-12 48 3 108-15 64-3 118-55-15-121-6-69-9-119 6 14-58-3-118 13-60 3-108z" fill="#d0bba3" stroke="#b8a187" stroke-width="5"/><path d="M190 138q41 11 109 6 70 5 111-6-9 40 2 91-10 54-2 102-47-12-111-6-65-6-109 6 11-49 0-102 11-51 0-91z" fill="#dfceb9"/>`,
kettle:`<ellipse cx="301" cy="354" rx="160" ry="16" fill="#b5a99c" opacity=".3"/><path d="M230 186h144l-15 151H246z" fill="#aab0aa"/><path d="M241 194h120l-13 136h-94z" fill="#c4c9c2"/><path d="M229 184h145v14H229z" fill="#737d76"/><path d="M270 177h65v-18h-65z" fill="#9d6c43"/><path d="M369 225q76-19 79 37 4 52-85 51" fill="none" stroke="#765a42" stroke-width="17"/><path d="M230 203q-30 67-126 90" fill="none" stroke="#86918b" stroke-width="13" stroke-linecap="round"/><path d="M104 293q-15 1-18-14" fill="none" stroke="#86918b" stroke-width="9"/>`,
clock:`<ellipse cx="300" cy="224" rx="143" ry="143" fill="#9b6a41"/><circle cx="300" cy="217" r="132" fill="#e9dfd0"/><circle cx="300" cy="217" r="5" fill="#292c29"/><path d="M300 217V125M300 217l69 53" fill="none" stroke="#2e302d" stroke-width="5" stroke-linecap="round"/><g stroke="#4d5149" stroke-width="3"><path d="M300 96v13M300 326v13M178 217h13M409 217h13M239 112l7 12M354 312l7 12M194 154l12 7M394 275l12 7M361 112l-7 12M246 312l-7 12M406 154l-12 7M206 275l-12 7"/></g>`,
vase:`<ellipse cx="300" cy="354" rx="143" ry="17" fill="#b5a99c" opacity=".3"/><path d="M269 151v44q-86 41-77 96 4 63 108 65 104-2 108-65 9-55-77-96v-44z" fill="#aab49b" opacity=".65" stroke="#687b66" stroke-width="5"/><ellipse cx="300" cy="151" rx="31" ry="8" fill="#c9c9ab" stroke="#687b66" stroke-width="4"/><path d="M300 284q-8-110-60-189M300 285q38-105 83-187M301 278q-16-112 7-212" fill="none" stroke="#67774d" stroke-width="5"/><path d="M245 148q-50-15-57-49 39-2 57 49M352 154q43-22 47-58-35 5-47 58M286 115q-15-32-49-44 5 36 49 44M325 117q8-43 41-58-4 37-41 58" fill="#687749"/>`
};
const visual=p=>`<div class="product-visual" role="img" aria-label="Illustration of ${p.name}"><svg viewBox="0 0 600 420" aria-hidden="true" preserveAspectRatio="xMidYMid slice"><rect width="600" height="420" fill="#e9dfd3"/><path d="M0 345h600" stroke="#d2c4b5" stroke-width="3"/>${art[p.id]}</svg></div>`;
const CART_KEY = 'form-field-cart-v1';
const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char =>
  ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'})[char]);
let storageAvailable = true;
function readCart() {
  try {
    const value = JSON.parse(localStorage.getItem(CART_KEY));
    return value && typeof value === 'object' && !Array.isArray(value)
      ? Object.fromEntries(Object.entries(value).filter(([id, qty]) =>
          products.some(product => product.id === id) && Number.isInteger(qty) && qty > 0 && qty <= 99))
      : {};
  } catch { storageAvailable = false; return {}; }
}
let cart = readCart(), filter = 'All objects', sort = 'featured';
let checkoutDraft = {};
const lines = () => products.filter(product => cart[product.id]).map(product => ({...product, qty:cart[product.id]}));
const count = () => Object.values(cart).reduce((total, qty) => total + qty, 0);
const subtotal = () => lines().reduce((total, product) => total + product.price * product.qty, 0);
function save() {
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); }
  catch { storageAvailable = false; }
  document.querySelector('#storage-note').hidden = storageAvailable;
  document.querySelector('#bag-count').textContent = count();
  document.querySelector('#cart-button').setAttribute('aria-label', `Open bag, ${count()} ${count() === 1 ? 'item' : 'items'}`);
}
function announce(message) { document.querySelector('#live').textContent = message; }
function add(id) {
  const previous = cart[id] || 0;
  cart[id] = Math.min(99, previous + 1);
  save();
  announce(previous === 99 ? 'Maximum quantity is 99.' : `${products.find(product => product.id === id).name} added to bag.`);
}
function renderShop() {
  const shown = products.filter(product => filter === 'All objects' || product.category === filter);
  if (sort === 'price-low') shown.sort((a, b) => a.price - b.price);
  if (sort === 'price-high') shown.sort((a, b) => b.price - a.price);
  main.innerHTML = `<div class="container">
    <section class="hero"><h1>Objects for the everyday</h1><p>Considered home objects for modern living—timeless in form, useful in daily life.</p></section>
    <div class="toolbar"><div class="filters" role="group" aria-label="Filter products">${categories.map(category => `<button type="button" class="filter" data-filter="${category}" aria-pressed="${filter === category}">${category}</button>`).join('')}</div>
    <label class="sort">Sort <select id="sort"><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label></div>
    <p class="results">${shown.length} objects</p><section class="grid" aria-label="Products">${shown.map(product => `<article>
      <a class="product-image-link" href="#/product/${product.id}" aria-label="View ${product.name}">${visual(product)}</a>
      <div class="product-meta"><h2><a href="#/product/${product.id}">${product.name}</a></h2><span class="price">${money(product.price)}</span><p>${product.category}</p></div>
      <div class="product-actions"><button class="solid-button" data-add="${product.id}">Add to bag</button><a class="text-button" href="#/product/${product.id}">View details</a></div></article>`).join('')}</section></div>`;
  document.querySelector('#sort').value = sort;
}
function renderDetail(id) {
  const product = products.find(item => item.id === id);
  if (!product) return renderNotFound();
  main.innerHTML = `<div class="container"><div class="breadcrumb"><a href="#/">Shop</a><span>/</span>${product.category}</div>
    <article class="detail">${visual(product)}<div class="detail-copy"><span class="eyeline">${product.category} / Form & Field</span>
    <h1>${product.name}</h1><p class="detail-price">${money(product.price)}</p><p class="detail-description">${product.description}</p>
    <div class="specs"><div><strong>Material</strong>${product.material}</div><div><strong>Size</strong>${product.size}</div></div>
    <button class="solid-button" data-add="${product.id}">Add to bag — ${money(product.price)}</button>
    <p class="minor">Shipping: $18, complimentary on a bag of $300 or more.</p><p class="minor">Concept catalog. Product specifications and availability are illustrative.</p></div></article></div>`;
}
function summary(checkout = false) {
  const sub = subtotal(), shipping = sub >= 300 ? 0 : 18;
  return `<aside class="summary"><h2>Order summary</h2><div class="summary-row"><span>Subtotal · ${count()} ${count() === 1 ? 'item' : 'items'}</span><strong>${money(sub)}</strong></div>
    <div class="summary-row"><span>Shipping</span><span>${shipping ? money(shipping) : 'Complimentary'}</span></div>
    <p class="minor">$18 shipping; complimentary at $300.</p><div class="summary-row total"><span>Total</span><span>${money(sub + shipping)}</span></div>
    ${checkout ? '' : '<a class="solid-button" href="#/checkout">Continue to checkout</a>'}<p class="minor">Illustrative prices in USD. No payment is taken.</p></aside>`;
}
function renderCart() {
  const items = lines();
  main.innerHTML = `<div class="page"><div class="breadcrumb"><a href="#/">Shop</a><span>/</span>Bag</div>
    <h1 class="page-title">Your bag <span class="bag-total">(${count()})</span></h1>${items.length ? `<div class="cart-layout"><div>${items.map(product => `<article class="cart-item">${visual(product)}
      <div><h2><a href="#/product/${product.id}">${product.name}</a></h2><p>${product.material}</p>
      <div class="qty" role="group" aria-label="Quantity for ${product.name}"><button aria-label="Decrease ${product.name} quantity" data-qty="${product.id}" data-delta="-1">−</button><span>${product.qty}</span><button aria-label="Increase ${product.name} quantity" data-qty="${product.id}" data-delta="1" ${product.qty === 99 ? 'disabled' : ''}>+</button></div>
      <button class="remove" data-remove="${product.id}" aria-label="Remove ${product.name}">Remove</button></div><span class="price">${money(product.price * product.qty)}</span></article>`).join('')}</div>${summary()}</div>`
      : '<div class="empty"><h2>Your bag is empty.</h2><p class="page-intro">Good things take time to find. Explore the collection.</p><a class="solid-button" href="#/">Browse objects</a></div>'}</div>`;
}
function renderCheckout() {
  if (!count()) { location.hash = '#/cart'; return; }
  const input = (id, label, autocomplete, type = 'text') => `<div class="field"><label for="${id}">${label}</label><input id="${id}" name="${id}" type="${type}" autocomplete="${autocomplete}" maxlength="160" required value="${escapeHtml(checkoutDraft[id])}" ${type === 'text' ? 'pattern=".*\\S.*" title="Enter a value containing text."' : ''}></div>`;
  main.innerHTML = `<div class="page"><div class="breadcrumb"><a href="#/">Shop</a><span>/</span><a href="#/cart">Bag</a><span>/</span>Checkout</div>
    <h1 class="page-title">Checkout</h1><p class="page-intro">Use sample details to try the checkout. All fields are required.</p>
    <div class="checkout-layout"><form id="checkout-form" novalidate>
      <section class="form-section"><h2>Contact</h2>${input('email', 'Email address', 'email', 'email')}</section>
      <section class="form-section"><h2>Delivery address</h2><div class="field-grid">${input('first', 'First name', 'given-name')}${input('last', 'Last name', 'family-name')}</div>
      ${input('address', 'Street address', 'street-address')}<div class="field-grid">${input('city', 'City', 'address-level2')}${input('postal', 'Postal code', 'postal-code')}</div>
      <div class="field"><label for="country">Country</label><select id="country" name="country" required><option value="">Select country</option>${['India', 'United States', 'United Kingdom'].map(country => `<option ${checkoutDraft.country === country ? 'selected' : ''}>${country}</option>`).join('')}</select></div></section>
      <div class="notice">Prototype checkout. No payment details are requested. Submitting shows a sample confirmation; no order is placed and no address is sent to a server. Your entries stay in page memory until confirmation or refresh.</div>
      <p class="form-error" id="form-error" role="alert" hidden></p><button class="solid-button" type="submit">Review sample confirmation</button></form>${summary(true)}</div></div>`;
}
function renderSuccess() {
  main.innerHTML = `<section class="success"><span class="mark" aria-hidden="true">✳</span><h1>Thank you for exploring.</h1>
    <p>This is a sample confirmation. No order was placed, payment processed, or delivery arranged.</p><a class="solid-button" href="#/">Back to the collection</a></section>`;
}
function renderAbout() {
  main.innerHTML = `<div class="page"><div class="breadcrumb"><a href="#/">Shop</a><span>/</span>About</div><h1 class="page-title">Less, but better.</h1>
    <p class="page-intro about-copy">Form & Field is a fictional store created to explore a calm shopping journey. Its products, prices, and delivery terms are illustrative. Explore the collection, inspect an object, edit your bag, and try the checkout with sample details.</p><p class="minor"><a href="./wireframes.svg">View the wireframes</a> · <a href="https://github.com/ankith2409-web/AUSPIFY/blob/task/05-ecommerce-app/task-05-ecommerce-app/DESIGN.md" target="_blank" rel="noopener noreferrer">Design record</a> · <a href="https://github.com/ankith2409-web/AUSPIFY/blob/task/05-ecommerce-app/task-05-ecommerce-app/EVALUATION.md" target="_blank" rel="noopener noreferrer">Evaluation checklist</a></p>
    <a class="solid-button about-link" href="#/">Explore the collection</a></div>`;
}
function renderNotFound() {
  main.innerHTML = '<div class="page empty"><h1 class="page-title">Page not found.</h1><a class="solid-button" href="#/">Back to shop</a></div>';
}
function route() {
  const path = location.hash.slice(1) || '/';
  if (path === '/') renderShop();
  else if (path.startsWith('/product/')) renderDetail(path.split('/')[2]);
  else if (path === '/cart') renderCart();
  else if (path === '/checkout') renderCheckout();
  else if (path === '/complete') renderSuccess();
  else if (path === '/about') renderAbout();
  else renderNotFound();
  save();
  scrollTo({top:0, behavior:'instant'});
  main.focus({preventScroll:true});
}
function focusCartControl(id, delta) {
  const preferred = main.querySelector(`[data-qty="${id}"][data-delta="${delta}"]:not(:disabled)`);
  (preferred || main.querySelector(`[data-qty="${id}"]:not(:disabled)`) || main.querySelector('[data-qty]') || main.querySelector('h1'))?.focus();
}
document.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.id === 'cart-button') { location.hash = '#/cart'; return; }
  if (button.dataset.filter) {
    filter = button.dataset.filter; renderShop();
    main.querySelector(`[data-filter="${filter}"]`).focus();
    announce(`${main.querySelector('.results').textContent} in ${filter}.`);
  }
  if (button.dataset.add) {
    add(button.dataset.add);
    const old = button.textContent;
    button.textContent = 'Added to bag';
    setTimeout(() => { if (button.isConnected) button.textContent = old; }, 1200);
  }
  if (button.dataset.qty || button.dataset.remove) {
    const id = button.dataset.qty || button.dataset.remove;
    cart[id] = button.dataset.remove ? 0 : Math.min(99, cart[id] + Number(button.dataset.delta));
    if (cart[id] < 1) delete cart[id];
    save(); renderCart();
    const title = main.querySelector('h1'); title.tabIndex = -1;
    focusCartControl(id, button.dataset.delta);
    announce(`${products.find(product => product.id === id).name}: ${cart[id] || 0} in bag. Subtotal ${money(subtotal())}.`);
  }
});
document.addEventListener('change', event => {
  if (event.target.id === 'sort') { sort = event.target.value; renderShop(); main.querySelector('#sort').focus(); announce('Products sorted.'); }
  if (event.target.closest('#checkout-form')) checkoutDraft[event.target.name] = event.target.value;
});
document.addEventListener('input', event => {
  if (event.target.closest('#checkout-form')) {
    checkoutDraft[event.target.name] = event.target.value;
    event.target.removeAttribute('aria-invalid');
  }
});
document.addEventListener('submit', event => {
  if (event.target.id !== 'checkout-form') return;
  event.preventDefault();
  const form = event.target, error = document.querySelector('#form-error');
  const invalid = [...form.elements].filter(field => field.willValidate && !field.validity.valid);
  form.querySelectorAll('[aria-invalid]').forEach(field => field.removeAttribute('aria-invalid'));
  if (invalid.length) {
    invalid.forEach(field => field.setAttribute('aria-invalid', 'true'));
    error.hidden = false;
    error.textContent = `Check ${invalid.length} ${invalid.length === 1 ? 'field' : 'fields'}. Start with ${form.querySelector(`label[for="${invalid[0].id}"]`).textContent.toLowerCase()}.`;
    invalid[0].focus();
    return;
  }
  checkoutDraft = {}; cart = {}; save(); location.hash = '#/complete';
});
addEventListener('hashchange', route);
addEventListener('storage', event => { if (event.key === CART_KEY) { cart = readCart(); route(); } });
route();
