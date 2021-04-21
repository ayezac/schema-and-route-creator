const fs = require("fs");
const path = require("path");

const createSchema = (payload) => {
  const schemaDef = JSON.stringify(payload.schemaDef);
  const timeStamps = JSON.stringify({ timestamps: true });

  const fileContent = `
    const mongoose = require("mongoose");
    const Schema = mongoose.Schema;
    const ${payload.schemaName.toLowerCase()}Schema = new Schema(${schemaDef}, ${timeStamps});

    module.exports = mongoose.model('${payload.schemaName.toLowerCase()}', ${payload.schemaName.toLowerCase()}Schema )
    `;
  try {
    fs.writeFileSync(
      `src/models/${payload.schemaName.toLowerCase()}.model.js`,
      fileContent
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = createSchema;
