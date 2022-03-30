// const { fetchProducts } = require('./helpers/fetchProducts');
// const getSavedCartItems = require("./helpers/getSavedCartItems");
// const saveCartItems = require("./helpers/saveCartItems");
let arraySavedItems = [];
const cartPlace = document.querySelector('.cart__items');

function calculateSubTotal() {
  const subTotal = arraySavedItems.reduce((acc, cur) => {
    const curInt = (cur.salePrice * 100);
    const accInt = (acc * 100);
    return (curInt + accInt) / 100;
  }, 0);
  const subTotalPlace = document.getElementsByClassName('total-price')[0];
  subTotalPlace.innerText = subTotal;
}

function clickButtonEsvaziarCarrinho() {
  arraySavedItems.forEach(() => document.querySelector('.cart__items').firstChild.remove());
  arraySavedItems = [];
  saveCartItems(arraySavedItems);
  calculateSubTotal();
}

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
  console.log(event.target);
  
  const indexOfClickedElement = Array.prototype.indexOf.call(cartPlace.children, event.target); // entender o que faz certinho explicar https://www.geeksforgeeks.org/how-to-get-the-child-node-index-in-javascript/
  console.log(indexOfClickedElement);

  arraySavedItems.splice(indexOfClickedElement, 1);
  console.log(arraySavedItems);
  event.target.remove();
  saveCartItems(arraySavedItems);
  calculateSubTotal();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  
  cartPlace.appendChild(li);

  const itemToBeSaved = { sku, name, salePrice };
  arraySavedItems.push(itemToBeSaved);
  console.log(arraySavedItems);
  saveCartItems(arraySavedItems);
  calculateSubTotal();
  return li;
}

async function clickAddItemToCartList() {
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
  document.getElementsByClassName('loading')[0].remove();
  await ArrayObjSkuNameImage.forEach((element) => {
    htmlClassItems.appendChild(createProductItemElement(element));
  });

  clickAddItemToCartList();
  if (localStorage.cartItems !== undefined && localStorage.cartItems.length > 0) {
  getSavedCartItems().forEach((element) => createCartItemElement(element));
  }
  const buttonEsvaziarCarrinho = document.querySelector('.empty-cart');
  buttonEsvaziarCarrinho.addEventListener('click', clickButtonEsvaziarCarrinho);
};
