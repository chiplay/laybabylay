
const path = require('path');

module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "plugins": [
    "react", "flowtype", "import"
  ],
  "rules": {
    "arrow-body-style": 0,
    "arrow-parens": 0,
    "camelcase": 0,
    "comma-dangle": 0,
    "eol-last": 0,
    "import/first": 1,
    "import/newline-after-import": 1,
    "import/no-named-as-default": 1,
    "import/prefer-default-export": 1,
    "jsx-a11y/accessible-emoji": 1, // Chandler's rule!
    "jsx-a11y/anchor-is-valid": [ "error", {
      "components": [ "Link" ],
      "specialLink": [ "to" ]
    }],
    "no-extra-boolean-cast": 1,
    "no-mixed-operators": 1,
    "no-plusplus": 1,
    "no-prototype-builtins": 1,
    "no-restricted-syntax": 1,
    "no-underscore-dangle": 1,
    "no-use-before-define": 0,
    "no-useless-escape": 1,
    "object-property-newline": 1,
    "one-var": 0,
    "operator-assignment": 1,
    "react/jsx-filename-extension": 0,
    "react/require-default-props": 0,
    "react/forbid-prop-types": 0,
    "react/prefer-stateless-function": 0,
    "space-infix-ops": 0,
    "spaced-comment": 1,
    "quotes": [
      2,
      "single",
      {
        "allowTemplateLiterals": true
      }
    ],
    "indent": [
      "error",
      2,
      {
        "VariableDeclarator": {
          "var": 2,
          "let": 2,
          "const": 3
        }
      }
    ],
    "one-var-declaration-per-line": [
      "error",
      "initializations"
    ],
    "padded-blocks": 0,
    "import/no-unresolved": [2, {
      "ignore": ["react-native-activity-view"]
    }]
  },
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": path.join(__dirname, 'webpack.config.dev.js')
      }
    }
  },
  "env": {
    "browser": true,
    "es6": true
  },
  "globals": {
    "_LTracker": false
  }
}
