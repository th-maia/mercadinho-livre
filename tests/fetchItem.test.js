require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('Testa se fetchItem é uma função', async () => {
    expect( typeof fetchItem).toBe('function')
  })

  it('chama fetchItem com o argumento do item "MLB1615760527" e testa se fetch foi chamada', async () =>{
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalled()
  })

  it('função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', async () => {
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  })

  it('Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item', async () => {
    const fetchJson = await fetchItem('MLB1615760527')
    expect(fetchJson).toEqual(item)
  })

  it('Verifique se ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    const fetchJson = await fetchItem();
    expect(fetchJson).toEqual(new Error('You must provide an url'));
  })
})
