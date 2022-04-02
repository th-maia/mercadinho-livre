const fetchItem = async (ItemID) => {
  const endpoint = `https://api.mercadolibre.com/items/${ItemID}`;
  try {
  const fetchPromisse = await fetch(endpoint);
  const fetchItemJson = await fetchPromisse.json();
  return fetchItemJson;
} catch (error) {
  return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
