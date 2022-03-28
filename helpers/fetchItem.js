const fetchItem = async (ItemID) => {
  const endpoint = `https://api.mercadolibre.com/items/${ItemID}`;
  try {
  const fetchPromisse = await fetch(endpoint);
  const fetchItemJson = await fetchPromisse.json();
  const ObjSkuNameSalePrice = {
    sku: fetchItemJson.id,
    name: fetchItemJson.title,
    salePrice: fetchItemJson.price,
    };
  console.log(ObjSkuNameSalePrice);
  return ObjSkuNameSalePrice;
  } catch (error) {
    console.log(error);
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
