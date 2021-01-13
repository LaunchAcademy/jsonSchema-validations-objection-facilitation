import express from "express"
import objection from "objection"
const { ValidationError } = objection

import Unicorn from "../../../models/Unicorn.js"
import cleanUserInput from "../../../services/cleanUserInput.js"

const unicornsRouter = new express.Router()

unicornsRouter.post("/", async (req, res) => {
  const { body } = req
  const formInput = cleanUserInput(body) // remove empty strings from submitted data

  try {
    // const newUnicorn = await Unicorn.query().insertAndFetch(formInput) // attempt to persist the unicorn
      const newUnicorn = await Unicorn.query().insert({age: true, magicalAbility: "Tis the chosen one"})

    return res.status(201).json({ newUnicorn }) // if persisting is successful, send the newly persisted unicorn back to the frontend for display!
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data }) // if a jsonSchema validation error is thrown, return the validation error back to the frontend for display
    }
    return res.status(500).json({ errors: error }) // if there was any other error, send to the frontend for potential display
  }
})

unicornsRouter.get("/", async (req, res) => {
  try {
    const unicorns = await Unicorn.query()
    return res.status(201).json({ unicorns }) 
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default unicornsRouter
