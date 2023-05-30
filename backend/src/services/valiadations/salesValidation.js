// const { salesSchema } = require('./schemas');

// const salesInsertValidation = async (req, res, next) => {
//       const { body } = req;
//       // console.log(body);
//       body.forEach((eachValidation) => {
//          const { error } = salesSchema.validate(eachValidation);

//          if (error) {
//             const newStatus = error.details[0].type === 'any.required' ? 400 : 422;
//           return res.status(newStatus).json({ message: error.message });
//         }
//       }); // precisa do forEach pq a função salesSchema tem 2 validações dentro dela
  
//       next();
//   };

// module.exports = salesInsertValidation;