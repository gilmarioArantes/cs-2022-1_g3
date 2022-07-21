import * as swaggerUI from "swagger-ui-express";

export const swaggerDocument: swaggerUI.JsonObject = {
  openapi: "3.0.1",
  info: {
    version: "1.0.0",
    title: "Foorum API Documentantion",
    description: "API do melhor forum sobre programacao da UFG",
    contact: {
      name: "Grupo 3",
      url: "https://foorumufg.vercel.app",
    },
    license: {
      name: "Apache 2.0",
      url: "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
  },
  components: {
    schemas: {},
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  servers: [
    {
      url: "http://localhost:{port}",
      description: "The development API server",
      variables: {
        env: {
          default: "development",
          description: "DEV Environment",
        },
        port: {
          default: "3000",
        },
      },
    },
    {
      url: "https://foorumufg.vercel.app",
      description: "The production API server",
      variables: {
        env: {
          default: "production",
          description: "Production Environment",
        },
      },
    },
  ],
};
