require("dotenv").config();
const { model } = require("mongoose");
const dbConnector = process.env.DB_CONNECTOR;
const clientUrl = process.env.CLIENT_URL;
module.exports = { dbConnector, clientUrl };
