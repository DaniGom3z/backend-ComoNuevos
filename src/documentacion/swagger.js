const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

// Metadata
const options = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: 'ComoNuevos API',
            version: '1.0.0'
        },
        components: {
            securitySchemes: {
                bearerAuth: {  
                    type: "apiKey",
                    name: "Authorization",
                    in: "header",
                    description: "Enter the token with the `Bearer: ` prefix, e.g., 'Bearer abcde12345'.",
                },
            },
        },
    },
    apis: [
        path.resolve(__dirname, "../routes/administrador.route.js"),
        path.resolve(__dirname, "../routes/usuarios.route.js")
    ]
}
  

// Docs in JSON
const swaggerSpec = swaggerJSDoc(options);

// Function to setup
const swaggerDocs = (app, port) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  console.log(`Version 1 docs are available at http://localhost:${port}/docs`);
};

module.exports = { swaggerDocs };
