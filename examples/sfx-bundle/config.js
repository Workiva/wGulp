System.config({
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});

System.config({
  "map": {
    "react": "npm:react@^0.11.2",
    "npm:react@0.11.2": {
      "envify": "npm:envify@2"
    },
    "npm:envify@2.0.1": {
      "esprima-fb": "npm:esprima-fb@^3001.1.0-dev-harmony-fb",
      "through": "npm:through@^2.3.4",
      "xtend": "npm:xtend@^2.1.2",
      "jstransform": "npm:jstransform@3.0"
    },
    "npm:esprima-fb@3001.1.0-dev-harmony-fb": {},
    "npm:through@2.3.6": {},
    "npm:xtend@2.2.0": {},
    "npm:jstransform@3.0.0": {
      "esprima-fb": "npm:esprima-fb@^3001.1.0-dev-harmony-fb",
      "source-map": "npm:source-map@0.1.31",
      "base62": "npm:base62@0.1.1"
    },
    "npm:source-map@0.1.31": {
      "amdefine": "npm:amdefine@0.0"
    },
    "github:jspm/nodelibs@0.0.3": {
      "base64-js": "npm:base64-js@0.0",
      "ieee754": "npm:ieee754@^1.1.1",
      "Base64": "npm:Base64@0.2",
      "inherits": "npm:inherits@^2.0.1",
      "json": "github:systemjs/plugin-json@master"
    },
    "npm:base64-js@0.0.7": {},
    "npm:amdefine@0.0.8": {},
    "npm:ieee754@1.1.4": {},
    "npm:Base64@0.2.1": {},
    "npm:inherits@2.0.1": {},
    "npm:base62@0.1.1": {}
  }
});

System.config({
  "versions": {
    "github:reactjs/react-bower": "0.11.2",
    "npm:react": "0.11.2",
    "npm:envify": "2.0.1",
    "npm:esprima-fb": "3001.1.0-dev-harmony-fb",
    "npm:through": "2.3.6",
    "npm:xtend": "2.2.0",
    "github:jspm/nodelibs": "0.0.3",
    "npm:jstransform": "3.0.0",
    "npm:source-map": "0.1.31",
    "npm:base64-js": "0.0.7",
    "npm:amdefine": "0.0.8",
    "npm:ieee754": "1.1.4",
    "npm:Base64": "0.2.1",
    "npm:inherits": "2.0.1",
    "github:systemjs/plugin-json": "master",
    "npm:base62": "0.1.1"
  }
});

