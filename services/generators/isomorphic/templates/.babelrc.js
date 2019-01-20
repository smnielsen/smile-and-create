module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "entry"
      }
    ],
    "@babel/preset-react"
  ],
  "plugins": [
    "css-modules-transform", {
    },
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-transform-runtime",
    "@babel/plugin-transform-async-to-generator",
    "@babel/plugin-proposal-class-properties"
  ]
}