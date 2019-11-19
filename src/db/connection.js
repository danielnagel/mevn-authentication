const connectionString = process.env.MONGODB_URI || "localhost/mevnStack";
const db = require("monk")(connectionString);

module.exports = db;
