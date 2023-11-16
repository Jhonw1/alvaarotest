import request from "supertest";
import app from "../src/app";

describe("GET/taks", () => {
  test("should respond with a 200 status code", async () => {
    const response = await request(app).get("/taks").send();
    expect(response.statusCode).toBe(200);
  });

  test("should respond with an array", async () => {
    const response = await request(app).get("/taks").send();
    expect(Array.isArray(response.body)).toBe(true);
  });
});

//pruebas para POST /tasks
describe("POST /tasks", () => {
  describe("given a title and description", () => {
    const newTask = {
      title: "Test task",
      description: "Test description",
    };
    // Pruebas para asegurar la creación exitosa de una tarea con título y descripción
    // Verificación del código de estado 200, el tipo de contenido y si se recibe un ID

    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/tasks").send(newTask);
      expect(response.statusCode).toBe(200);
    });

    // Realiza una solicitud POST a /tasks con los datos de una nueva tarea
    // Verifica que el encabezado tenga el tipo de contenido esperado

    test("should have a content-type: application/json in header", async () => {
      const response = await request(app).post("/tasks").send(newTask);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    // Realiza una solicitud POST a /tasks con los datos de una nueva tarea
    // Verifica si se recibe un ID en la respuesta
    test("should respond with an tasks ID", async () => {
      const response = await request(app).post("/tasks").send(newTask);
      expect(response.body.id).toBeDefined();
    });
  });

  describe("when title and descriptin is missing", () => {
    test("should respond with a 400 status code", async () => {
      // Crea diferentes casos con cuerpos faltantes y verifica el código de estado 400 en cada caso
      const fields = [{}, { title: "" }, { description: "" }];
      for (const body of fields) {
        const response = await request(app).post("/tasks").send(body);
        expect(response.statusCode).toBe(400);
      }
    });
  });
});
