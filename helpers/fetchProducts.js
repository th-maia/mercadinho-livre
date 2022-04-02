// const fetch = require('node-fetch');

const fetchProducts = async (produto) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${produto}`;
  
  const fetchJson = await fetch(url)
  .then((resposta) => resposta.json())
  .catch((error) => error);
  return fetchJson;
};

// fetchProducts('computador');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
