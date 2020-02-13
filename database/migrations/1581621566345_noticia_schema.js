"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class NoticiaSchema extends Schema {
  up() {
    this.alter("noticias", table => {
      table
        .datetime("dt_publicacao")
        .notNullable()
        .alter();
    });
  }

  down() {
    this.table("noticias", table => {
      table
        .date("dt_publicacao")
        .notNullable()
        .alter();
    });
  }
}

module.exports = NoticiaSchema;
