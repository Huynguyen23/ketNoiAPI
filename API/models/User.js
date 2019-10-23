const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
      },
      password : {
        type : String,
        required : true 
      }
})
userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);
    this.password = hash;
    next()
})

userSchema.methods.isValidPassword = async function(password){
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
  }

userSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ email} )
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}
userSchema.statics.findUserById = async(email, password)=>{
    const user = User.findOne({'email': email} )
    return user 
}

const User = mongoose.model('user', userSchema)
module.exports = User;