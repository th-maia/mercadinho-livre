const saveCartItems = (savedItem) => {
  // const cartPlace = document.querySelector('.cart__items');
  // const position = cartPlace.childElementCount - 1;
  localStorage.setItem('cartItems', JSON.stringify(savedItem)); // (position.savedItem)
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
