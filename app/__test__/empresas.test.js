const app = require("express")();
const db = require('../persistence/dbConnection');
const { genBusinessData } = require('../scripts/seedDB');

app.use(require('body-parser').json());
app.use(require("../routes/empresa"));
const supertest = require("supertest");
const request = supertest(app);

describe("Rutas de empresas", () => {

  beforeAll(done => {
    db.initPool().catch(err=>console.log(err)).finally(done());
  });

  afterAll(done => {
    db.teardown().catch(err=>console.log(err)).finally(done());
  });

  test("GET /empresa - success", async done => {
    const { body } = await request.get("/empresa");
    expect(body.length).toBe(5);
  });

  test("POST /empresa - success", async done => {
    const data = genBusinessData();
    const response = await request.post("/empresa").send(data);
    expect(response.status).toBe(200);
  });

  test("PUT /empresa - success", async done => {
    const data = genBusinessData();
    const response = await request.put("/empresa/11").send(data);
    expect(response.status).toBe(200);
  });

  test("DELETE /empresa - success", async done => {
    const response = await request.delete("/empresa/11");
    expect(response.status).toBe(200);
  });
});