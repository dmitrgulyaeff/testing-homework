import { commerce } from 'faker';
import { Product } from '../../src/common/types';

// /src/server/data.ts
const generateProducts = () => {
  const products: Product[] = [];

  for (let id = 0; id < 5; id++) {
    products.push({
      id,
      name: `${commerce.productAdjective()} ${commerce.product()}`,
      description: commerce.productDescription(),
      price: Number(commerce.price()),
      color: commerce.color(),
      material: commerce.productMaterial(),
    });
  }

  return products;
};

export default generateProducts;
