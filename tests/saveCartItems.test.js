const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
  it('ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado', async() => {
    await saveCartItems('<ol><li>Item</li></ol>')
    expect(localStorage.setItem).toHaveBeenCalled()
  })
  it('saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado com dois parâmetros, primeiro cartItems e o segundo argumento para saveCartItems', async () =>{
    await saveCartItems('<ol><li>Item</li></ol>')
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', JSON.stringify('<ol><li>Item</li></ol>'))
  })
});
