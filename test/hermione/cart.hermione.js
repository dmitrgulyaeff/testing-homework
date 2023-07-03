const { assert } = require('chai');
const { baseUrl, cartItemsMock } = require('./utils');
describe('Корзина', async function () {
  it("должна быть кнопка 'очистить корзину', по нажатию на которую все товары должны удаляться", async function () {
    const puppeteer = await this.browser.getPuppeteer();
    const [page] = await puppeteer.pages();
    await page.goto(baseUrl);

    await page.evaluate((cartItemsMock) => {
      window.localStorage.setItem(
        cartItemsMock.key,
        JSON.stringify(cartItemsMock.data)
      );
    }, cartItemsMock);

    await page.goto(`${baseUrl}cart`);

    const btnCartClear = await this.browser.$('.Cart-Clear');
    assert.isTrue(
      await this.browser.$('.Cart-Table').isExisting(),
      'таблица есть'
    );
    await btnCartClear.click();
    assert.isFalse(
      await this.browser.$('.Cart-Table').isExisting(),
      'таблицы нет'
    );
  });
  it('содержимое корзины должно сохраняться между перезагрузками страницы', async function () {
    const puppeteer = await this.browser.getPuppeteer();
    const [page] = await puppeteer.pages();
    await page.goto(baseUrl);

    await page.evaluate((cartItemsMock) => {
      window.localStorage.setItem(
        cartItemsMock.key,
        JSON.stringify(cartItemsMock.data)
      );
    }, cartItemsMock);

    await page.goto(`${baseUrl}cart`);
    
    // Сохраняем состояние страницы до обновления
    const stateBeforeReload = await page.evaluate(() => {
      return document.documentElement.innerHTML;
    });

    // Перезагружаем страницу
    await page.reload();

    // Сохраняем состояние страницы после обновления
    const stateAfterReload = await page.evaluate(() => {
      return document.documentElement.innerHTML;
    });

    // Сравниваем два состояния страницы на эквивалентность
    assert.equal(stateBeforeReload, stateAfterReload);
  });
});
