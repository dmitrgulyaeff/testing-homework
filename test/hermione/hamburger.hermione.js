const { assert } = require('chai');
const { baseUrl } = require('./utils');

describe('Гамбургер', async function () {
  it('при стандартном значении', async function () {
    const puppeteer = await this.browser.getPuppeteer();
    const [page] = await puppeteer.pages();
    await page.goto(baseUrl);

    const toggler = await this.browser.$('.Application-Toggler');
    const displayProperty = await toggler.getCSSProperty('display');

    assert.strictEqual(displayProperty.value, 'none', 'должен быть скрыт');
  });
  it('при значении < 576px', async function () {
    const puppeteer = await this.browser.getPuppeteer();
    const [page] = await puppeteer.pages();
    await page.goto(baseUrl);

    await this.browser.setWindowSize(575, 6000);
    const toggler = await this.browser.$('.Application-Toggler');
    const displayProperty = await toggler.getCSSProperty('display');

    assert.strictEqual(displayProperty.value, 'block', 'должен быть block');
  });
  it('при выборе элемента, меню должно закрываться', async function () {
    const puppeteer = await this.browser.getPuppeteer();
    const [page] = await puppeteer.pages();
    await page.goto(baseUrl);

    await this.browser.setWindowSize(575, 1080);
    const toggler = await this.browser.$('.Application-Toggler');
    await toggler.click();

    const applicationMenuBefore = await this.browser.$('.Application-Menu');
    const displayPropertyBefore = await applicationMenuBefore.getCSSProperty('display');
    assert.strictEqual(displayPropertyBefore.value, 'block', 'должен быть block');
    const navLinks = await this.browser.$$('.nav-link');
    await navLinks[0].click();
    const applicationMenuAfter = await this.browser.$('.Application-Menu');
    const displayPropertyAfter = await applicationMenuAfter.getCSSProperty('display');
    assert.strictEqual(displayPropertyAfter.value, 'none', 'должен быть скрыт');
  });
});
