const products = [
  {id:'lamp',imageAlt:'Rounded ivory ceramic lamp with an unbleached linen shade',name:'Ceramic Table Lamp',category:'Lighting',price:248,material:'Stoneware, linen',size:'32 × 42 cm',description:'A quietly sculptural lamp with a softly diffused glow. Its rounded ceramic silhouette brings warmth to a bedside or reading corner.'},
  {id:'table',imageAlt:'Round light oak side table with a visible wood grain',name:'Oak Side Table',category:'Furniture',price:398,material:'Solid oak',size:'46 × 46 × 48 cm',description:'A compact, balanced form in warm oak. The generous circular top makes room for a book, a cup, and the small things you reach for daily.'},
  {id:'cushion',imageAlt:'Sand colored linen cushion with a soft woven texture',name:'Linen Cushion',category:'Textiles',price:78,material:'Linen, cotton fill',size:'50 × 50 cm',description:'Natural linen with a relaxed texture and a soft, supportive fill. An easy layer for a sofa, chair, or bed.'},
  {id:'kettle',imageAlt:'Brushed stainless steel gooseneck kettle with an oak handle',name:'Pour-Over Kettle',category:'Tabletop',price:128,material:'Stainless steel, oak',size:'1 litre',description:'A precise gooseneck spout and considered handle make the morning pour feel a little more deliberate.'},
  {id:'clock',imageAlt:'Round light oak wall clock with a warm white dial',name:'Wall Clock',category:'Decor',price:168,material:'Oak, aluminium',size:'Ø 32 cm',description:'An understated clock with a light oak frame and clear, minimal face. Designed to sit comfortably in any room.'},
  {id:'vase',imageAlt:'Rounded translucent olive green glass vase with a narrow neck',name:'Glass Vase',category:'Decor',price:96,material:'Recycled glass',size:'22 × 25 cm',description:'A rounded glass vessel with a soft olive tint. Equally at home with a few branches or left beautifully empty.'}
];
const categories=['All objects','Lighting','Furniture','Textiles','Tabletop','Decor'];
const main=document.querySelector('#main');
const money=n=>`$${n.toFixed(2)}`;
const visual = (product, context) => {
  const image = `images/${product.id}`;
  const size = {
    catalog: '(max-width: 900px) 45vw, 30vw',
    detail: '(max-width: 600px) 92vw, 52vw',
    bag: '(max-width: 600px) 78px, 112px',
  }[context];
  return `<div class="product-visual"><img src="${image}.webp" srcset="${image}-small.webp 240w, ${image}.webp 480w" sizes="${size}" width="480" height="480" alt="${product.imageAlt}"${context === 'catalog' ? ' loading="lazy"' : ''} decoding="async"></div>`;
};
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
const sampleDetails = {
  email: 'shopper@example.test', first: 'Sample', last: 'Shopper',
  address: '12 Example Road', city: 'Bengaluru', postal: '560000', country: 'India'
};
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
      <a class="product-image-link" href="#/product/${product.id}" aria-label="View ${product.name}">${visual(product, 'catalog')}</a>
      <div class="product-meta"><h2><a href="#/product/${product.id}">${product.name}</a></h2><span class="price">${money(product.price)}</span><p>${product.category}</p></div>
      <div class="product-actions"><button class="solid-button" data-add="${product.id}">Add to bag</button><a class="text-button" href="#/product/${product.id}">View details</a></div></article>`).join('')}</section></div>`;
  document.querySelector('#sort').value = sort;
}
function renderDetail(id) {
  const product = products.find(item => item.id === id);
  if (!product) return renderNotFound();
  main.innerHTML = `<div class="container"><div class="breadcrumb"><a href="#/">Shop</a><span>/</span>${product.category}</div>
    <article class="detail">${visual(product, 'detail')}<div class="detail-copy"><span class="eyeline">${product.category} / Form & Field</span>
    <h1>${product.name}</h1><p class="detail-price">${money(product.price)}</p><p class="detail-description">${product.description}</p>
    <div class="specs"><div><strong>Material</strong>${product.material}</div><div><strong>Size</strong>${product.size}</div></div>
    <button class="solid-button" data-add="${product.id}">Add to bag — ${money(product.price)}</button>
    <p class="minor">Shipping: $18, complimentary on a bag of $300 or more.</p><p class="minor">Concept catalog. Product specifications and availability are illustrative.</p></div></article></div>`;
}
function summary(checkout = false) {
  const sub = subtotal(), shipping = sub >= 300 ? 0 : 18;
  return `<aside class="summary"><h2>Order summary</h2><div class="summary-row"><span>Subtotal · ${count()} ${count() === 1 ? 'item' : 'items'}</span><strong>${money(sub)}</strong></div>
    <div class="summary-row"><span>Shipping</span><span>${shipping ? money(shipping) : 'Complimentary'}</span></div>
    <p class="minor">$18 shipping; complimentary at $300.</p><div class="summary-row total"><span>Total including shipping</span><span>${money(sub + shipping)}</span></div>
    ${checkout ? '' : '<a class="solid-button" href="#/checkout">Continue to checkout</a>'}<p class="minor">Illustrative prices in USD. No payment is taken.</p></aside>`;
}
function renderCart() {
  const items = lines();
  main.innerHTML = `<div class="page"><div class="breadcrumb"><a href="#/">Shop</a><span>/</span>Bag</div>
    <h1 class="page-title">Your bag <span class="bag-total">(${count()})</span></h1>${items.length ? `<div class="cart-layout"><div>${items.map(product => `<article class="cart-item">${visual(product, 'bag')}
      <div><h2><a href="#/product/${product.id}">${product.name}</a></h2><p>${product.material}</p>
      <div class="qty" role="group" aria-label="Quantity for ${product.name}"><button aria-label="Decrease ${product.name} quantity" data-qty="${product.id}" data-delta="-1">−</button><span>${product.qty}</span><button aria-label="Increase ${product.name} quantity" data-qty="${product.id}" data-delta="1" ${product.qty === 99 ? 'disabled' : ''}>+</button></div>
      <button class="remove" data-remove="${product.id}" aria-label="Remove ${product.name}">Remove</button></div><span class="price">${money(product.price * product.qty)}</span></article>`).join('')}</div>${summary()}</div>`
      : '<div class="empty"><h2>Your bag is empty.</h2><p class="page-intro">Good things take time to find. Explore the collection.</p><a class="solid-button" href="#/">Browse objects</a></div>'}</div>`;
}
function renderCheckout() {
  if (!count()) { location.hash = '#/cart'; return; }
  const input = (id, label, type = 'text') => `<div class="field"><label for="${id}">${label}</label><input id="${id}" name="${id}" type="${type}" autocomplete="off" maxlength="160" required value="${escapeHtml(checkoutDraft[id])}" ${type === 'text' ? 'pattern=".*\\S.*" title="Enter a value containing text."' : ''}></div>`;
  main.innerHTML = `<div class="page"><div class="breadcrumb"><a href="#/">Shop</a><span>/</span><a href="#/cart">Bag</a><span>/</span>Checkout</div>
    <h1 class="page-title">Checkout</h1><p class="page-intro">Use sample details to try the checkout. All fields are required.</p>
    <div class="checkout-layout"><form id="checkout-form" autocomplete="off" novalidate>
      <button class="solid-button" id="fill-sample" type="button" aria-describedby="sample-fill-hint">Fill sample details</button>
      <p id="sample-fill-hint" class="minor">Fills empty fields with fictional details. Keeps what you have entered.</p>
      <section class="form-section"><h2>Contact</h2>${input('email', 'Email address', 'email')}</section>
      <section class="form-section"><h2>Delivery address</h2><div class="field-grid">${input('first', 'First name')}${input('last', 'Last name')}</div>
      ${input('address', 'Street address')}<div class="field-grid">${input('city', 'City')}${input('postal', 'Postal code')}</div>
      <div class="field"><label for="country">Country</label><select id="country" name="country" required><option value="">Select country</option>${['India', 'United States', 'United Kingdom'].map(country => `<option ${checkoutDraft.country === country ? 'selected' : ''}>${country}</option>`).join('')}</select></div></section>
      <div class="notice">Prototype checkout. No payment details are requested. Finishing clears your bag and shows a sample confirmation. Your entries stay in page memory until confirmation or refresh.</div>
      <p class="form-error" id="form-error" role="alert" hidden></p><button class="solid-button" type="submit">Finish sample checkout</button></form>${summary(true)}</div></div>`;
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
  if (button.id === 'fill-sample') {
    const form = button.form;
    let filled = 0;
    for (const [name, sample] of Object.entries(sampleDetails)) {
      const field = form.elements.namedItem(name);
      if (field.value.trim()) continue;
      field.value = checkoutDraft[name] = sample;
      field.removeAttribute('aria-invalid');
      filled++;
    }
    form.querySelector('#form-error').hidden = true;
    announce(filled ? 'Empty fields filled with fictional details.' : 'There are no empty fields to fill.');
    return;
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
