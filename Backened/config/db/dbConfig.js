const mongoose = require("mongoose");

async function dbConfig(connectionUrl) {
  try {
    return await mongoose
      .connect(connectionUrl)
      .then(() => {
        console.log("connected to database successfully....");
      })
      .catch((error) => {
        throw new Error(error);
      });
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
    dbConfig
}