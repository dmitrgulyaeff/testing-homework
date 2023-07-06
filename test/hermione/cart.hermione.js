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
  it('валидация формы должна работать корректно со стороны фронта', async function () {
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
    const btnFormSubmit = await this.browser.$('.Form-Submit');
    await btnFormSubmit.click();

    const invalidFields = await this.browser.$$('.invalid-feedback');
    assert.equal(invalidFields.length, 3, 'количество невалидных полей');

    for (const element of invalidFields) {
      const display = await element.getCSSProperty('display');
      assert.equal(display.value, 'block', 'неверный display у поля ошибки');
    }

    const cartName = await this.browser.$('#f-name');
    await cartName.setValue('name');

    const cartPhone = await this.browser.$('#f-phone');
    await cartPhone.setValue('+79998887766');

    const cartAddress = await this.browser.$('#f-address');
    await cartAddress.setValue('address');

    await btnFormSubmit.click();

    // количество невалидных полей после оформления заказа
    assert.equal(
      await this.browser.$$('.invalid-feedback').length,
      0,
      'невозможно оформить заказ, из-за неверной валидации на фронте'
    );

    const cartSuccessMessage = await this.browser.$('.Cart-SuccessMessage');
    const classList = await cartSuccessMessage.getAttribute('class');
    assert.include(
      classList,
      'alert-success',
      'класс сообщения указан неверно'
    );
  });
});
