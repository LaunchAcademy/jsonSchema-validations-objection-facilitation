import _ from 'lodash'

const translateServerErrors = (errors) => {
  let serializedErrors = {}

  Object.keys(errors).forEach((key) => {
    const messages = errors[key].map((error) => {
      const field = _.startCase(key)
      serializedErrors = {
        ...serializedErrors,
        [field]: error.message
      }
    })
  });
  return serializedErrors
};

//   {
//   name: [
//     {
//       message: 'is a required property',
//       keyword: 'required',
//       params: [Object]
//     }
//   ]
// }

        // const errors = {
        //   name: "is a required property"
        // }

export default translateServerErrors;
