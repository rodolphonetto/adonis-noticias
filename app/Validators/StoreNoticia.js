"use strict";

class StoreNoticia {
  get rules() {
    return {
      titulo: "required|min:5|max:60",
      imagem: "required",
      conteudo: "required|min:10",
      dt_publicacao: "required"
    };
  }

  get messages() {
    return {
      "titulo.required": "Você precisa preencher um titulo",
      "titulo.min": "O Titulo precisa ter ao menos 5 caracteres",
      "titulo.max": "O Titulo precisa ter no máximo 5 caracteres",
      "imagem.required": "Você precisa enviar uma imagem.",
      "conteudo.required": "Você precisa preencher o conteudo.",
      "conteudo.min": "O conteúdo precisa ter ao menos 10 caracteres",
      "dt_publicacao.required": "Você precisa preencher data de publicação"
    };
  }
}

module.exports = StoreNoticia;
