const Model = require("./Model")

class Unicorn extends Model {
  static get tableName() {
    return "unicorns"
  }

  static get jsonSchema() {
     return {
       type: "object",
       required: ["name"],
       properties: {
         name: { type: "string", minLength: 1, maxLength: 20 },
       }
     }
   }
}

module.exports = Unicorn
