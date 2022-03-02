var mongoose = require('mongoose')

var Schema = mongoose.Schema

var userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    company: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Company'
    }
})

module.exports = mongoose.model('User', userSchema)