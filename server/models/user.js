const mongoose = require('mongoose')

const User = mongoose.model('Users', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength:4
    }
})

module.exports = {User}