const request = require('supertest');
const domainApi = 'http://localhost:3000';

describe('Проверка эндпоинта', () => {
  it('/hw/store/api/checkout', async () => {
    const response = await request(domainApi)
      .post('/hw/store/api/checkout')
      .send({})
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({ id: expect.any(Number) })
    );

    expect(response.body.id).toBeLessThan(10000000);
  });

  it('/hw/store/api/products должен возвращать массив объектов с правильными свойствами', async () => {
    const response = await request(domainApi)
      .get('/hw/store/api/products')
      .expect(200);

    const products = response.body;
    expect(Array.isArray(products)).toBe(true);
    expect(products).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          price: expect.any(Number),
        }),
      ])
    );
  });

   const checkProductInfo = (id: number) => {
    it(`/hw/store/api/products/${id} должен возвращать объект с {id: ${id}, name, description, price, color, material}`, async () => {
      const response = await request(domainApi)
        .get(`/hw/store/api/products/${id}`)
        .expect(200);
      const productsInfo = response.body;
      expect(productsInfo).toEqual(
        expect.objectContaining({
          id: id,
          name: expect.any(String),
          description: expect.any(String),
          price: expect.any(Number),
          color: expect.any(String),
          material: expect.any(String),
        })
      );
    });
  }

  for (let i = 0; i < 5; i++) {
    checkProductInfo(i);
  }
});
