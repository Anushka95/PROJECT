const mongoose = require('mongoose');

var User = mongoose.model('User', {
  name: { type: String },
  regNo: { type: String},
  email: {type: String},
  dues: {type: String}
});

module.exports = { User };
