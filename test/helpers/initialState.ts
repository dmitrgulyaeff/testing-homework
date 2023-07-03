import generateProducts from './generateProducts';
import { ApplicationState } from '../../src/client/store';

function getInitialState() {
  const products = generateProducts();
  const initState: ApplicationState = {
    details: {},
    cart: {},
    products,
  };
  for (let id = 1; id < 3; id++) {
    const product = products[id];
    initState['cart'][id] = { ...product, count: 1 };
  }
  for (const product of products) {
    initState['details'][product.id] = product
  }
  return initState
}

const initialState = getInitialState();

export default initialState;
