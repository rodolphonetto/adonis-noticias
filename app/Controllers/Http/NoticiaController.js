"use strict";

const Noticia = use("App/Models/Noticia");
const { resolve } = require("path");

class NoticiaController {
  async index({}) {
    return await Noticia.all();
  }

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
      response.internalServerError("Erro ao executar operação");
    }
  }

  async show({ params }) {
    const { id } = params;
    const noticia = await Noticia.find(id);

    return noticia;
  }

  async update({ params, request }) {
    const excludeNullFields = fields => {
      Object.keys(fields).forEach(key => {
        fields[key] === null && delete fields[key];
      });
      return fields;
    };

    const data = request.only([
      "titulo",
      "imagem",
      "conteudo",
      "dt_publicacao"
    ]);

    const { id } = params;
    try {
      const newData = excludeNullFields(data);
      const noticia = await Noticia.find(id);

      noticia.merge(newData);

      await noticia.save();

      return noticia;
    } catch (err) {
      return err;
    }
  }

  async destroy({ params, response }) {
    const { id } = params;
    const noticia = await Noticia.find(id);

    await noticia.delete();

    response.send("Noticia excluida com sucesso");
  }
}

module.exports = NoticiaController;
