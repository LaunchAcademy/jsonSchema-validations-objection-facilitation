const cleanUserInput = formInput => {

  // { name: "Nader", age: 47, magicalAbility: "blarp"}

  Object.keys(formInput).forEach(field => {
    if(formInput[field].trim() == "") {
      delete formInput[field]
    }
  })

  // if (formInput.age instanceof String) {
  //   formInput.age = parseInt(formInput.age)
  // }

  return formInput
}

export default cleanUserInput