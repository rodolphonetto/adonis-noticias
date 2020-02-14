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
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {}

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
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing noticia.
   * GET noticias/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

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
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = NoticiaController;
