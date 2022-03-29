const getSavedCartItems = () => {
  const getItemStorage = JSON.parse(localStorage.getItem('cartItems'));
  return getItemStorage;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
