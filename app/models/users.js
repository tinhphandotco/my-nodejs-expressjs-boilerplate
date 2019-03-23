const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema
const ROLES = ['ADMIN', 'MOD', 'USER']
const STATUS = ['blocked', 'actived', 'pending']

const UserSchema = new Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: String },
    address: { type: String },
    birthday: { type: Date },
    avatar: { type: String },
    role: { type: String, enum: ROLES, default: 'USER' },
    status: { type: String, enum: STATUS, default: 'pending' }
}, {
    timestamps: true
})

/**
 * virtual
 */

// UserSchema.virtual('created_at').get(function () {
//     return moment(this.createdAt).format('DD-MM-YYYY hh:mm:ss')
// })

/**
 * Method
 */
UserSchema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password || '', this.password)
}

module.exports = mongoose.model('User', UserSchema)
