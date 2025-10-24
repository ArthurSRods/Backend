const request = require("supertest");
const app = require("../app"); // caminho ao app (ajuste se necessário)

describe("Suite de testes para /produtos", () => {
  let createdId;

  // POST válido -> cria produto
  test('POST /produtos com { nome: "Laranja", preco: 10.0 } retorna 201 e corpo JSON com _id, nome, preco', async () => {
    const res = await request(app)
      .post("/produtos")
      .send({ nome: "Laranja", preco: 10.0 })
      .set("Accept", "application/json");

    expect(res.status).toBe(201);
    expect(res.type).toMatch(/json/);
    expect(res.body).toHaveProperty("_id");
    expect(res.body).toHaveProperty("nome", "Laranja");
    // use toBeCloseTo caso float -> aqui com igualdade simples
    expect(Number(res.body.preco)).toBeCloseTo(10.0);

    createdId = res.body._id; // salva id para próximos testes
  });

  // POST inválido (sem JSON)
  test("POST /produtos sem corpo retorna 422 com msg apropriada", async () => {
    const res = await request(app)
      .post("/produtos")
      .send({}) // ou .send() sem nada
      .set("Accept", "application/json");

    expect(res.status).toBe(422);
    expect(res.type).toMatch(/json/);
    expect(res.body).toHaveProperty(
      "msg",
      "Nome e preço do produto são obrigatórios"
    );
  });

  // GET /produtos -> lista
  test("GET /produtos retorna 200 e array de objetos", async () => {
    const res = await request(app)
      .get("/produtos")
      .set("Accept", "application/json");

    expect(res.status).toBe(200);
    expect(res.type).toMatch(/json/);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // GET /produtos/:id válido
  test("GET /produtos/:id retorna 200 e o produto correto", async () => {
    const res = await request(app)
      .get(`/produtos/${createdId}`)
      .set("Accept", "application/json");

    expect(res.status).toBe(200);
    expect(res.type).toMatch(/json/);
    expect(res.body).toHaveProperty("_id", createdId);
    expect(res.body).toHaveProperty("nome", "Laranja");
    expect(Number(res.body.preco)).toBeCloseTo(10.0);
  });

  // GET /produtos/0 -> parâmetro inválido
  test('GET /produtos/0 retorna 400 com msg "Parâmetro inválido"', async () => {
    const res = await request(app)
      .get("/produtos/0")
      .set("Accept", "application/json");

    expect(res.status).toBe(400);
    expect(res.type).toMatch(/json/);
    expect(res.body).toHaveProperty("msg", "Parâmetro inválido");
  });

  // GET id inexistente -> 404 Produto não encontrado
  test('GET /produtos/000000000000000000000000 retorna 404 com msg "Produto não encontrado"', async () => {
    const res = await request(app)
      .get("/produtos/000000000000000000000000")
      .set("Accept", "application/json");

    expect(res.status).toBe(404);
    expect(res.type).toMatch(/json/);
    expect(res.body).toHaveProperty("msg", "Produto não encontrado");
  });

  // PUT válido
  test('PUT /produtos/:id com {nome:"Laranja Pera", preco:18.00} retorna 200 e dados atualizados', async () => {
    const res = await request(app)
      .put(`/produtos/${createdId}`)
      .send({ nome: "Laranja Pera", preco: 18.0 })
      .set("Accept", "application/json");

    expect(res.status).toBe(200);
    expect(res.type).toMatch(/json/);
    expect(res.body).toHaveProperty("_id", createdId);
    expect(res.body).toHaveProperty("nome", "Laranja Pera");
    expect(Number(res.body.preco)).toBeCloseTo(18.0);
  });

  // PUT sem corpo -> 422
  test("PUT /produtos/:id sem corpo retorna 422 com msg obrigatória", async () => {
    const res = await request(app)
      .put(`/produtos/${createdId}`)
      .send({})
      .set("Accept", "application/json");

    expect(res.status).toBe(422);
    expect(res.type).toMatch(/json/);
    expect(res.body).toHaveProperty(
      "msg",
      "Nome e preço do produto são obrigatórios"
    );
  });

  // PUT /produtos/0 -> 400
  test('PUT /produtos/0 retorna 400 com msg "Parâmetro inválido"', async () => {
    const res = await request(app)
      .put("/produtos/0")
      .send({ nome: "x", preco: 1 })
      .set("Accept", "application/json");

    expect(res.status).toBe(400);
    expect(res.type).toMatch(/json/);
    expect(res.body).toHaveProperty("msg", "Parâmetro inválido");
  });

  // PUT id inexistente -> 404
  test('PUT /produtos/000000000000000000000000 retorna 404 com msg "Produto não encontrado"', async () => {
    const res = await request(app)
      .put("/produtos/000000000000000000000000")
      .send({ nome: "x", preco: 1 })
      .set("Accept", "application/json");

    expect(res.status).toBe(404);
    expect(res.type).toMatch(/json/);
    expect(res.body).toHaveProperty("msg", "Produto não encontrado");
  });

  // DELETE válido -> 204
  test("DELETE /produtos/:id retorna 204 sem conteúdo", async () => {
    const res = await request(app)
      .delete(`/produtos/${createdId}`)
      .set("Accept", "application/json");

    expect(res.status).toBe(204);
    // sem conteúdo — normalmente res.body vazio
    expect(res.text).toBe("");
  });

  // DELETE /produtos/0 -> 400
  test('DELETE /produtos/0 retorna 400 com msg "Parâmetro inválido"', async () => {
    const res = await request(app)
      .delete("/produtos/0")
      .set("Accept", "application/json");

    expect(res.status).toBe(400);
    expect(res.type).toMatch(/json/);
    expect(res.body).toHaveProperty("msg", "Parâmetro inválido");
  });

  // DELETE id inexistente -> 404
  test('DELETE /produtos/000000000000000000000000 retorna 404 com msg "Produto não encontrado"', async () => {
    const res = await request(app)
      .delete("/produtos/000000000000000000000000")
      .set("Accept", "application/json");

    expect(res.status).toBe(404);
    expect(res.type).toMatch(/json/);
    expect(res.body).toHaveProperty("msg", "Produto não encontrado");
  });
});
