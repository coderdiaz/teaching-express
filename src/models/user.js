const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  lastname: {
    type: String,
  },
  type: {
    type: String, // reader, author, admin
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
}, {
  timestamps: true,
});

UserSchema.pre('save', function (next) {
  let user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      // override the cleartext password with hashed one
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
}

const User = mongoose.model('User', UserSchema);
module.exports = { User, UserSchema };
