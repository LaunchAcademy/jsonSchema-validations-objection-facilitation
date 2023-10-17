const Model = require("./Model");

// const uniqueFactory = require("objection-unique")

// const unique = uniqueFactory({
//   fields: ["name"],
//   identifiers: ["id"]
// })

class Unicorn extends Model {
  static get tableName() {
    return "unicorns"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string", minLength: 1, maxLength: 255 },
        magicalAbility: { type: "string", minLength: 2, maxLength: 50 },
        age: { type: ["integer", "string"] },
        // isFlying: { type: ["boolean", "string"] }
        // age: { type: "integer" }
      }
    }
  }
}

module.exports = Unicorn