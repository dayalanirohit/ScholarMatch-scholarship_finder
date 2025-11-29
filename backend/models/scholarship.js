const mongoose = require('mongoose');

const scholarshipSchema = new mongoose.Schema({
  title: { type: String, required: true },

  url: { type: String, required: true, unique: true },
  amount: String,
  amountValue: Number,
  deadline: String,
   gpa: Number,
  description: String,
 

  locations: [String],
  courses: [String],
  eligibilityText: String,

  lastScraped: Date
});


module.exports = mongoose.model('Scholarship', scholarshipSchema);