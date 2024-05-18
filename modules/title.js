let mongoose = require(`mongoose`);

let Schema = mongoose.Schema;

let Title = new Schema({
  src: {
    type: Object,
  },
  name: {
    type: String
  }
})

module.exports = mongoose.model(`Title`, Title);