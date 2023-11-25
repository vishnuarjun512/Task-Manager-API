import request from "supertest";
import app from "../api/index";

describe("Just testing ...", () => {
  test("should return a message on successful request", async () => {
    const response = await request(app)
      .post("/test")
      .send({ data: { someKey: "someValue" } });

    expect(response.statusCode).toBe(200);
  });
});

//Authentication
describe("Authentication Testing", () => {
  test("Login request", async () => {
    const response = await request(app)
      .post("/api/user/login")
      .send({ email: "acer@gmail.com", password: "acer" });

    expect(response.statusCode).toBe(200);
    expect(response.headers["set-cookie"]).toBeDefined();
    const cookieValue = response.headers["set-cookie"][0];
    expect(cookieValue).toContain("authToken");
  });

  //New Registration
  test("Register request", async () => {
    const newUser = {
      username: Math.random().toString(36).substring(2, 6),
      email: Math.random().toString(36).substring(2, 6) + "@gmail.com",
      password: Math.random().toString(36).substring(2, 6),
    };
    const response = await request(app)
      .post("/api/user/register")
      .send(newUser);
    // .send({ username: "new", email: "new@gmail.com", password: "new" });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Register Successful");
  });

  //Already Registered User
  test("Register request", async () => {
    const response = await request(app)
      .post("/api/user/register")
      .send({ username: "acer", email: "acer@gmail.com", password: "acer" });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("User Already Registered");
  });
});

//For Tasks Testing
describe("Task testing", () => {
  test("Get All Task", async () => {
    const response = await request(app).get("/api/tasks/get");

    expect(response.statusCode).toBe(200);
    expect(response.body.allTask.length).toBeGreaterThan(0);
  });
  test("Create New Task also sending Cookies", async () => {
    const response = await request(app)
      .post("/api/tasks/create")
      .set("Cookie", "authToken=656037cdd8b1608334cecd32")
      .send({
        taskName: "Test Task Creation",
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Created Task Successfully");
  });
});
