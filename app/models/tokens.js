const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CategorySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    refreshToken: { type: String, required: true },
    expires: { type: Date },
    grantType: { type: String, default: 'refresh_token' }
}, {
    timestamps: true
})

module.exports = mongoose.model('Token', CategorySchema)
