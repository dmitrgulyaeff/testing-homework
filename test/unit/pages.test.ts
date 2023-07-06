import renderPage from '../helpers/renderPage';

describe('Страницы должны существовать', () => {
  function testRoute(routeName: string, route: string) {
    it(`В магазине должна быть страница: ${route}`, () => {
      const { render } = renderPage(route);
      const { container } = render;

      expect(container.querySelector('div > div > div > div > *')).not.toBe(
        null
      );
    });
  }

  const routes: { [key: string]: string } = {
    главная: '/',
    каталог: '/catalog',
    'условия доставки': '/delivery',
    контакты: '/contacts',
    корзина: '/cart',
  };

  for (const routeName of Object.keys(routes)) {
    testRoute(routeName, routes[routeName]);
  }

  it(`В магазине НЕ должна быть страница: руина`, () => {
    const { render } = renderPage('/abobababab');
    const { container } = render;

    expect(container.querySelector('div > div > div > div > *')).toBe(null);
  });
});
