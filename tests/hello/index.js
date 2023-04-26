const request = require("supertest");

it("should return hello world", async () => {
  // test for demo use, it should be failed due to 404 error.
  // {"data":null,"error":{"status":404,"name":"NotFoundError","message":"Not Found","details":{}}}
  await request(strapi.server.httpServer)
    .get("/api/hello")
    .expect(200) // Expect response http code 200
    .then((data) => {
      expect(data.text).toBe("Hello World!"); // expect the response text
    });
});
