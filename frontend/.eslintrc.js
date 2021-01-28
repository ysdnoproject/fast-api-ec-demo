module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/essential",
    "@vue/airbnb",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint"
  ],
  parserOptions: {
    parser: "@typescript-eslint/parser"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "class-methods-use-this": [
      "error",
      {
        exceptMethods: [
          // vue class component hooks
          "data",
          "render",
          // vue lifecycle methods
          "beforeCreate",
          "created",
          "beforeMount",
          "mounted",
          "beforeUpdate",
          "updated",
          "activated",
          "deactivated",
          "beforeDestroy",
          "destroyed",
          "errorCaptured"
        ]
      }
    ]
  }
};
