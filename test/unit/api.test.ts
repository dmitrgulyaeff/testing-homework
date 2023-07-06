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
          price: expect.any(Number)
        })
      ])
    );
  });
});