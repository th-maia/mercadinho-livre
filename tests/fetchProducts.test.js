require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('Teste se fetchProducts é uma função', () => {
    expect( typeof fetchProducts).toBe('function')
  }) 

  it('função fetchProducts com o argumento "computador" e teste se fetch foi chamado', async() => {
    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalled()
  })

  it('testa a função fetchProducts("computador"), e olha se fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  })

  it('fetchProducts("computador") seja uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const fetchjson = await fetchProducts('computador')
    expect(fetchjson).toEqual(computadorSearch)
  })

  it('ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const fetchjson = await fetchProducts();
    expect(fetchjson).toEqual(new Error('You must provide an url'));
  })
});
