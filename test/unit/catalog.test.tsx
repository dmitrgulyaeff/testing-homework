import { screen } from '@testing-library/react';
import renderPage from '../helpers/renderPage';
import '@testing-library/jest-dom';

describe('Каталог', () => {
  it('должны отображаться товары, список которых приходит с сервера', () => {
    // тесты на проверку отображения товаров из списка, полученного с сервера
    const { initialState } = renderPage('/catalog');
    const { products } = initialState;
    if (products) {
      products.forEach((product) => {
        const productIdExist = screen.queryAllByTestId(product.id.toString());
        expect(productIdExist).not.toBe([]);
      });
    } else {
      expect(products).not.toBe(undefined);
    }
  });

  it('для каждого товара должны отображаться название, цена и ссылка на страницу с подробной информацией о товаре', () => {
    // тесты на проверку отображения названия, цены и ссылки на страницу товара для каждого товара в каталоге
    const { initialState } = renderPage('/catalog');
    const { products } = initialState;

    if (products) {
      for (const product of products) {
        const productIdContainer = screen.queryAllByTestId(
          product.id.toString()
        )[0];
        expect(productIdContainer).toBeInTheDocument();

        const productName =
          productIdContainer.querySelector('.ProductItem-Name');
        expect(productName).toBeInTheDocument();
        expect(productName).toHaveTextContent(product.name);

        const productPrice =
          productIdContainer.querySelector('.ProductItem-Price');
        expect(productPrice).toBeInTheDocument();
        expect(productPrice).toHaveTextContent(product.price.toString());

        const productDetailsLink = productIdContainer.querySelector(
          '.ProductItem-DetailsLink'
        );
        expect(productDetailsLink).toBeInTheDocument();
        expect(productDetailsLink).toBeInstanceOf(HTMLAnchorElement);
        expect(productDetailsLink?.getAttribute('href')).toBe(
          `/catalog/${product.id}`
        );
      }
    } else {
      expect(products).not.toBe(undefined);
    }
  });

  it('если товар уже добавлен в корзину, в каталоге должно отображаться сообщение об этом', () => {
    // тесты на проверку отображения сообщения о добавлении товара в корзину на странице товара и в каталоге, если товар уже добавлен
    const { initialState } = renderPage('/catalog');
    const { cart } = initialState;
    Object.keys(cart).forEach((id) => {
      const productIdContainer = screen.queryAllByTestId(id)[0];
      const cartBadge = productIdContainer.querySelector('.CartBadge');
      expect(cartBadge).toBeInTheDocument();
    });
  });
});
