// const fetch = require('node-fetch');

const fetchProducts = async (produto) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${produto}`;
  
  const fetchJson = await fetch(url)
  .then((resposta) => resposta.json())
  .then((json) => json.results)
  .catch((error) => console.log(`Algo deu errado :( \n${error}`));
  const ArrayObjSkuNameImage = fetchJson.map((elemento) => (
    {
    sku: elemento.id,
    name: elemento.title,
    image: elemento.thumbnail,
    }));
  console.log(ArrayObjSkuNameImage);
  return ArrayObjSkuNameImage;
};

// fetchProducts('computador');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
