import renderPage from '../helpers/renderPage';
import { Product } from '../../src/common/types';
import { ApplicationState } from '../../src/client/store';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Каталог[id]', () => {
  const { initialState } = renderPage('/catalog');
  const { products, details } = initialState;
  if (products) {
    for (const product of products) {
      testProductDescription(details[product.id], initialState);
      testProductButton(details[product.id], initialState);
    }
  }
  
  function testProductButton(product: Product, state: ApplicationState) {
    it('Ожидаемый размер кнопки: btn-lg', () => {
      const { render } = renderPage(`/catalog/${product.id}`, state);
      const { container } = render;
      const btnAddToCart = container.querySelector('.ProductDetails-AddToCart');
      const classList = btnAddToCart?.getAttribute('class')?.split(' ');
      expect(classList).toContain('btn-lg');
    });
  }

  function testProductDescription(product: Product, state: ApplicationState) {
    it(`На странице с подробной информацией продукта ${product.id} отображаются: название товара, его описание, цена, цвет, материал и кнопка "добавить в корзину".`, () => {
      const { render } = renderPage(`/catalog/${product.id}`, state);
      const { container } = render;

      const productDetailsContainer = container.querySelector('.Product');
      expect(productDetailsContainer).toBeInTheDocument();

      const testField = (fieldName: string, expectedValue: string) => {
        const field = productDetailsContainer?.querySelector(
          `.ProductDetails-${fieldName}`
        );
        expect(field).toHaveTextContent(expectedValue);
      };

      const fieldsToTest = [
        'Name',
        'Description',
        'Price',
        'Color',
        'Material',
      ];

      fieldsToTest.forEach((field) => {
        testField(
          field,
          product[field.toLowerCase() as keyof Product].toString()
        );
      });

      testField('AddToCart', 'Add to Cart');
    });
  }
});
