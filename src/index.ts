/**
 * TODO:
 *
 * === PART I:
 *
 * 1. Create POST endpoint that accepts file .
 * 2. Save a file that is being sent to `uploads/` directory. Save it using uuid v4 as a name.
 * 3. When uploading file, compress it using gzip algorithm before you save it to the disk.
 *    Try using NodeJS streaming API.
 *    It should be saved as {uuid}.{extension}.gz
 * 4. Create GET endpoint that will responds with a file download - search file using it's file name ({uuid}.{extension}.gz).
 *    Example: Create a route /files/:fileName -> perform request: GET /files/1234-5678.jpg
 * 5. When responding with a file, decompress it and stream it directly to the response. Try using streaming API.
 * 6. Try using app.param() or router.param() methods to read the file and pass ReadStream to the route handler.
 *
 * === PART 2
 *
 * 7. Create simple user register route (email + password). When storing user, encrypt password using bcrypt
 * 8. Create LocalStrategy that validates user email and password.
 * 9. Create JWTStrategy that validates provided token
 * 10. Create login route that uses JWT token
 * 11. Apply JWTStrategy authentication to both POST file and GET file routes
 *
 * === Helpful links:
 *
 * -
 * - Adding middleware in express: https://expressjs.com/en/4x/api.html#app.use
 * - Creating param parser in express: https://expressjs.com/en/4x/api.html#app.param
 * - Creating sub-router in express: https://expressjs.com/en/4x/api.html#router (scroll to the bottom for nice example)
 * - Package for storing files with express: https://www.npmjs.com/package/multer
 * - Creating gzip stream: https://nodejs.org/dist/latest-v18.x/docs/api/zlib.html#zlib
 * - Piping readable stream to writable stream: https://nodejs.org/dist/latest-v18.x/docs/api/stream.html#readablepipedestination-options
 * - Passport LocalStrategy: https://www.passportjs.org/packages/passport-local/
 * - Passport JWTStrategy: https://www.passportjs.org/packages/passport-jwt/
 * - Hashing passwowrd - bcrypt: https://www.npmjs.com/package/bcrypt
 */
import "reflect-metadata";
import express from "express";
import datasource from "./datasource";

(async () => {
  await datasource.initialize();
  const port = process.env.PORT ?? 8080;
  const app = express();

  app.get("/", (req, res) => {
    res.json({
      hello: "world",
    });
  });

  const server = app.listen(+port, () => {
    console.log("server started");
  });

  process.on("SIGTERM", () => {
    server.close(() => {
      console.log("Killing server");
    });
  });
})();
