"use strict";

const Route = use("Route");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});

Route.post("/register", "UserController.create");

Route.post("/sessions", "SessionController.create");

// Noticias
Route.get("/noticias", "NoticiaController.index");

Route.get("/noticias/noticia", "NoticiaController.show");

Route.post("/noticias/nova", "NoticiaController.store").validator(
  "StoreNoticia"
);

Route.delete("/noticias/delete/:id", "NoticiaController.destroy");
