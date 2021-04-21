const fs = require("fs");
const path = require("path");

const createRoute = (payload) => {
  const routeName = payload.routeName;
  const schemaName = payload.schemaName;

  const fileContent = `
    const express = require("express");
    const router = express.Router();
    const ${schemaName} = require("../models/${schemaName.toLowerCase()}.model.js");
    const validateKey = require("../middleware/apikeys");
    
    router.post("/${routeName}", validateKey, async (req, res) => {
        try{
        const response = new ${schemaName}(req.body)
        response.save();
        res.status(200).send("Success")
        }
        catch(err){
            throw new Error()
        }
    });
    
    module.exports = router;
    `;
  if (
    !fs.existsSync(
      path.join(
        __dirname,
        `../src/routes/${payload.routeName.toLowerCase()}.js`
      )
    )
  ) {
    fs.writeFileSync(
      `src/routes/${payload.routeName.toLowerCase()}.js`,
      fileContent
    );
    let routes = [];
    fs.readdirSync(path.join(__dirname, "../routes")).forEach((file) => {
      const routeName = file.split(".")[0];
      routes.push(routeName);
    });
    const filteredRoutes = routes.filter((r) => r !== "index");
    const indexFileContent = `
    ${filteredRoutes
      .map((route) => `const ${route} = require("./${route}"); \n`)
      .join("")}
    
    const routes = [${filteredRoutes}];
    module.exports = routes;
    `;
    fs.writeFileSync(`src/routes/index.js`, indexFileContent);
  } else {
    throw new Error();
  }
};

module.exports = createRoute;
