import express from "express"
import objection from "objection"
const { ValidationError } = objection

import { Unicorn } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"

const unicornsRouter = new express.Router()

unicornsRouter.post("/", async (req, res) => {
  const { body } = req

  const cleanedUnicorn = cleanUserInput(body)

  try {

    const newUnicorn = await Unicorn.query().insertAndFetch(cleanedUnicorn) // attempt to persist the unicorn

    return res.status(201).json({ newUnicorn }) // if persisting is successful, send the newly persisted unicorn back to the frontend for display!
  } catch (error) {
    console.log(error)
    if (error instanceof ValidationError){
      return res.status(422).json({ errors: error.data })
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

unicornsRouter.get("/:id", async (req, res) => {
  try {
    const unicorn = await Unicorn.query().findById(req.params.id)
    return res.status(201).json({ unicorn }) 
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default unicornsRouter
