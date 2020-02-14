"use strict";

const Noticia = use("App/Models/Noticia");
const { resolve } = require("path");

/**
 * Resourceful controller for interacting with noticias
 */
class NoticiaController {
  /**
   * Show a list of all noticias.
   * GET noticias
   *
   * @param {object} ctx
   */
  async index({}) {
    return await Noticia.all();
  }

  /**
   * Create/save a new noticia.
   * POST noticias/nova
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only([
      "titulo",
      "imagem",
      "conteudo",
      "dt_publicacao"
    ]);

    try {
      const image = request.file("imagem", {
        types: ["image"],
        size: "2mb"
      });

      const name = `${Date.now()}-${image.clientName}`;
      await image.move(resolve("./public/uploads"), {
        name: name
      });

      if (!image.moved()) {
        return image.errors();
      }

      const newData = {
        ...data,
        imagem: image.fileName
      };

      const noticia = await Noticia.create(newData);
      return noticia;
    } catch {
      response.internalServerError("Deu algum erro doido ai");
    }
  }

  /**
   * Display a single noticia.
   * GET noticias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({ params }) {
    const { id } = params;
    const noticia = await Noticia.find(id);

    return noticia;
  }

  /**
   * Update noticia details.
   * PUT or PATCH noticias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a noticia with id.
   * DELETE noticias/:id
   *
   * @param {object} ctx
   */
  async destroy({ params, response }) {
    const { id } = params;
    const noticia = await Noticia.find(id);

    await noticia.delete();

    response.send("Noticia excluida com sucesso");
  }
}

module.exports = NoticiaController;
