const { assert } = require('chai');
const { baseUrl, cartItemsMock } = require('./utils');

describe('Каталог', async function () {
  it("если товар уже добавлен в корзину, повторное нажатие кнопки 'добавить в корзину' должно увеличивать его количество", async function () {
    const puppeteer = await this.browser.getPuppeteer();
    const [page] = await puppeteer.pages();
    await page.goto(`${baseUrl}catalog/0`);

    const btnAddToCart = await this.browser.$('.ProductDetails-AddToCart');
    await btnAddToCart.click();

    const localValueBefore = await page.evaluate((cartItemsMock) => {
      return JSON.parse(localStorage.getItem(cartItemsMock.key));
    }, cartItemsMock);

    assert.isNotNull(localValueBefore, 'не добавляется в корзину')
    assert.isNotEmpty(localValueBefore, 'добавляется пустой объект')

    const cartBefore = await localValueBefore['0']['count'];

    await btnAddToCart.click();
    await btnAddToCart.click();

    const cartAfter = await page.evaluate((cartItemsMock) => {
      return JSON.parse(localStorage.getItem(cartItemsMock.key))['0']['count'];
    }, cartItemsMock);

    assert.strictEqual(cartBefore, cartAfter - 2, 'количество товара в корзине не увеличилось');
  });
});