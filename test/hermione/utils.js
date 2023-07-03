const baseUrl = 'http://localhost:3000/hw/store/';

const mockProducts = [
  {
    id: 0,
    name: 'Small Salad',
    price: 593,
  },
  {
    id: 1,
    name: 'Incredible Cheese',
    price: 557,
  },
  {
    id: 2,
    name: 'Rustic Cheese',
    price: 646,
  },
  {
    id: 3,
    name: 'Generic Pants',
    price: 494,
  },
  {
    id: 4,
    name: 'Handcrafted Hat',
    price: 574,
  },
  {
    id: 5,
    name: 'Licensed Fish',
    price: 781,
  },
];

const cartItemsMock = {key: 'example-store-cart', data: {"1":{"name":"Awesome Sausages","count":1,"price":565}}};

module.exports = {
  baseUrl, mockProducts, cartItemsMock
};
