require("dotenv").config();

const Hapi = require("@hapi/hapi");
const songs = require("./api/songs");
const SongsService = require("./services/SongsService");
const SongsValidator = require("./validator/songs");
const albums = require("./api/albums");
const AlbumsService = require("./services/AlbumsService");
const AlbumsValidator = require("./validator/albums");

const init = async () => {
  const songsService = new SongsService();
  const albumsService = new AlbumsService();

  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: process.env.HOST || "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  await server.register([
    {
      plugin: albums,
      options: {
        service: albumsService,
        validator: AlbumsValidator,
      },
    },
    {
      plugin: songs,
      options: {
        service: songsService,
        validator: SongsValidator,
      },
    },
  ]);

  server.ext("onPreResponse", (request, h) => {
    const { response } = request;
    if (response.isBoom) {
      const newResponse = h.response({
        status: "fail",
        message: response.message,
      });
      newResponse.code(400);
      return newResponse;
    }

    return response.continue;
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
