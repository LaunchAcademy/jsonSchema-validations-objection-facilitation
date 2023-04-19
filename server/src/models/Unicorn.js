const Model = require("./Model");

const uniqueFactory = require("objection-unique")

const unique = uniqueFactory({
  fields: ["name"],
  identifiers: ["id"]
})

class Unicorn extends unique(Model) {
  static get tableName() {
    return "unicorns"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string" },
        age: { type: ["integer", "string"] },
        magicalAbility: { type: "string", minLength: 3}
      }
    }
  }
}

module.exports = Unicorn