const app = require("express")();
const request = require("supertest");
const db = require('../persistence/dbConnection');
const { genUserData } = require('../scripts/seedDB');

app.use(require('body-parser').json());
app.use(require("../routes/usuario"));
const supertest = require("supertest");
const request = supertest(app);

describe("Rutas de usuarios", () => {

  afterAll(done => {
    db.teardown().catch(err=>console.log(err)).finally(done());
  });

  it("GET /usuario - success", async done => {
    const { body } = await request.get("/usuario");
    expect(body.length).toBe(10);
  });

  it("POST /usuario - success", async done => {
    const data = genUserData();
    request.post("/usuario").send(data).expect(200);
  });

  it("PUT /usuario - success", async done => {
    const data = genUserData();
    const response = await request.put("/usuario/11").send(data);
    expect(response.status).toBe(200);
  });

  it("DELETE /usuario - success", async done => {
    const response = await request.delete("/usuario/11");
    expect(response.status).toBe(200);
  });
  
});