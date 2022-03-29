const saveCartItems = (savedItem) => {
  localStorage.setItem('cartItems', JSON.stringify(savedItem)); // (position.savedItem)
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
