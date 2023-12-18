const mongoose = require("./mongo");
const crypto = require("crypto")
 
const accountSchema = new mongoose.Schema({
  fullName: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  salt: String,
  hash: String,
  createdBy: String,
  createdOn: {
    type: Date,
    default: Date.now,
  },
  updatedBy: String,
  updatedOn: {
    type: Date,
    default: Date.now,
  },
}, {
  strict: true // keep it true -- only then password will not not saved
});
 
accountSchema.methods.encryptPassword = function(password){
  console.log(this);
  console.log(password);

  this.hash = crypto
  .pbkdd2Sync(password, this.salt, 957245, 462, "sha512")
  .toString("hex");
console.log(this.hash);
}

accountSchema.methods.validatePassword = function(password) {
  console.log(password);
  // accessing the exiting salt from account
  console.log(this.salt);
  // accessing the existing hash from account
  console.log(this.hash);
 
  // Let's now generate new hash using the above salt and entered password
  const newHash = crypto
    .pbkdf2Sync(password, this.salt, 957245, 462, "sha512")
    .toString("hex");
 
  return this.hash === newHash;
}

// Let's make a collection Account with the accountSchema
module.exports = mongoose.model("Account", accountSchema);