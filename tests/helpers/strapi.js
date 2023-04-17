const fs = require("fs");
const strapi = require("@strapi/strapi");

let instance;

async function setupStrapi() {
  if (!instance) {
    const appContext = await strapi.compile(); // { appDir: string; distDir: string; }
    const app = await strapi(appContext).load();

    instance = app;

    await instance.server.mount();
  }
  return instance;
}

async function cleanupStrapi() {
  const dbSettings = instance.config.get("db.connection");
  //close server to release the db-file
  await instance.server.httpServer.close();
  // close the connection to the database before deletion
  await instance.db.connection.destroy();
  //delete test database after all tests have completed
  if (dbSettings && dbSettings.connection && dbSettings.connection.filename) {
    const tmpDbFile = dbSettings.connection.filename;
    if (fs.existsSync(tmpDbFile)) {
      fs.unlinkSync(tmpDbFile);
    }
  }
}

module.exports = { setupStrapi, cleanupStrapi };
