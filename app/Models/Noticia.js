"use strict";

const Model = use("Model");

class Noticia extends Model {
  user() {
    return this.belongsTo("App/Models/User");
  }
}

module.exports = Noticia;
