module.exports = {
  client: {
    name: "SHBTest",
    clientOnlyDirectives: ["connection", "type"],
    clientSchemaDirectives: ["client", "rest"],
    service: {
      name: "SHB-Service",
      url: "http://localhost:4000/graphql",
      includes: ["**/*.tsx"],
      excludes: ["node_modules/*", "./src/config/*"],
      target: "typescript",
      tagName: "gql",
      passthroughCustomScalars: true,
      customScalarsPrefeix: "MY"
    }
  }
};
