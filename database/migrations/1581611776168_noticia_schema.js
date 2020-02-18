"use strict";

const Schema = use("Schema");

class NoticiaSchema extends Schema {
  up() {
    this.create("noticias", table => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("titulo").notNullable();
      table.string("imagem").notNullable();
      table.text("conteudo").notNullable();
      table.date("dt_publicacao").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("noticias");
  }
}

module.exports = NoticiaSchema;
