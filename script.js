// const { fetchProducts } = require('./helpers/fetchProducts');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}
// function createProductItemElement({ sku, name, image }) {
function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  
  const cartItem = document.querySelector('.cart__items');
  cartItem.appendChild(li);

  return li;
}

async function addItemList() {
  const [...buttonAdicionarAoCarrinho] = document.getElementsByClassName('item__add');
  const elementID = document.getElementsByClassName('item__sku');

  buttonAdicionarAoCarrinho.forEach((elemt, index) => {
    elemt.addEventListener('click', async () => {
      createCartItemElement(await fetchItem(elementID[index].innerText));
    });
  });
}

window.onload = async () => { 
  const htmlClassItems = document.querySelector('.items'); // local pedido no requisito 1 "o que será avaliado"
  const ArrayObjSkuNameImage = await fetchProducts('computador');
  await ArrayObjSkuNameImage.forEach((element) => {
    htmlClassItems.appendChild(createProductItemElement(element));
  });

  addItemList();

};
