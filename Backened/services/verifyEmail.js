const User = require("../models/user");

async function verifyEmail(email) {
  const user = await User.findOne({ email });
  if (!user) {
    return false ;
  }
  return true;
}

module.exports = {
    verifyEmail
}
