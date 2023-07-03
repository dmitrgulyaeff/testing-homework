const { baseUrl, mockProducts } = require('./utils');

const height = 6000;
const widths = [1920, 1280, 768, 575];

const routes = ['', 'delivery', 'cart', 'contacts', 'catalog'];

describe('Проверка адаптивности сайта', function () {
  for (const route of routes) {
    for (const width of widths) {
      it(`маршрут /${route} корректно отображен при ширине ${width}`, async function () {
        if (route === 'cart') {
          const apiProducts = await this.browser.mock(
            `${baseUrl}api/products`,
            {
              method: 'get',
            }
          );
          apiProducts.respond(mockProducts);
        }

        await this.browser.url(`${baseUrl}${route}`);
        await this.browser.setWindowSize(width, height);

        await this.browser.assertView(
          `${route === '' ? 'root' : route}(w${width}px)`,
          'body'
        );
      });
    }
  }
});
