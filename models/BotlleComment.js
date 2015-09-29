var mongoose = require('mongoose');

var BotlleCommentSchema = new mongoose.Schema({
  created: Date,
  body: String,
  botlle: {type: mongoose.Schema.Types.ObjectId, ref: 'Botlle'},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  name: String,
  userimg: String,
  deleted: {type: Boolean, default: false}
});

mongoose.model('BotlleComment', BotlleCommentSchema);
