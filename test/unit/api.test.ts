const request = require('supertest');

describe('Проверка эндпоинта', () => {
  it('/hw/store/api/checkout', async () => {
    const response = await request('http://localhost:3000')
      .post('/hw/store/api/checkout')
      .send({  });

      console.log(response.body);
    // некорректный ответ сервера
      expect(response.body).toEqual(expect.objectContaining({ id: expect.any(Number)  }));

    // слишком большой номер заказа
    expect(response.body.id).toBeLessThan(10000000);
  })
});
