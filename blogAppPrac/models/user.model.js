const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blogs'  // 'blogs' refers to the Blog model
    }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
