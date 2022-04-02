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
  const indexOfClickedElement = Array.prototype.indexOf.call(cartPlace.children, event.target); // entender o que faz certinho explicar https://www.geeksforgeeks.org/how-to-get-the-child-node-index-in-javascript/
  arraySavedItems.splice(indexOfClickedElement, 1);
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

async function fetchItemToSkuNameSaleP(ID) {
  const fetchItemJson = await fetchItem(ID);
  const ObjSkuNameSalePrice = {
    sku: fetchItemJson.id,
    name: fetchItemJson.title,
    salePrice: fetchItemJson.price,
    };
  return ObjSkuNameSalePrice;
}

async function clickAddItemToCartList() {
  const [...buttonAdicionarAoCarrinho] = document.getElementsByClassName('item__add'); // pega todos elementos da classe item__add e faz um array na ordem
  const elementID = document.getElementsByClassName('item__sku'); // esse é um elemento html que tem o ID

  buttonAdicionarAoCarrinho.forEach((elemt, index) => {
    elemt.addEventListener('click', async () => {
      createCartItemElement(await fetchItemToSkuNameSaleP(elementID[index].innerText)); // pega então o fetchItem( com argumento o elemento HTML com o ID que tem a mesma ordem(index) do elemento clicado) 
    });
  });
}

function fetchObjresultsToSkuNameImage(obj) {
  const fetchObjResults = obj.results;
  const ArrayObjSkuNameImage = fetchObjResults.map((elemento) => (
    {
    sku: elemento.id,
    name: elemento.title,
    image: elemento.thumbnail,
    }));
return ArrayObjSkuNameImage;
}

window.onload = async () => { 
  const fetchJson = await fetchProducts('computador'); // pega o fetch computador em Json
  const ArrayObjSkuNameImage = fetchObjresultsToSkuNameImage(fetchJson); // pega o cada objetoJson e transforma em um array de objetos com as chaves Sku,Name,Image
  document.getElementsByClassName('loading')[0].remove(); // remove o elemento carregando

  await ArrayObjSkuNameImage.forEach((element) => {          
    const htmlClassItems = document.querySelector('.items'); // local pedido no requisito 1 "o que será avaliado" para ser colocado os elementos
    htmlClassItems.appendChild(createProductItemElement(element));
  });

  clickAddItemToCartList(); // quando clicar o item aparece no carrinho
  
  // se precisa ou não carregar os itens do local Storage
  if (localStorage.cartItems !== undefined && localStorage.cartItems.length > 0) {
  getSavedCartItems().forEach((element) => createCartItemElement(element));
  }

  const buttonEsvaziarCarrinho = document.querySelector('.empty-cart');
  buttonEsvaziarCarrinho.addEventListener('click', clickButtonEsvaziarCarrinho); // ativa o click no botão de esvaziar carrinho
};
