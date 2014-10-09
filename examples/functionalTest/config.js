System.config({
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});

System.config({
  "map": {
    "Q": "npm:q",
    "paw": "github:workiva/paw@HY-1378_jspm_configuration",
    "github:workiva/paw@HY-1378_jspm_configuration": {
      "q": "npm:q@^2.0.2"
    },
    "npm:q@2.0.2": {
      "asap": "npm:asap@1",
      "collections": "npm:collections@^2.0.1"
    },
    "npm:asap@1.0.0": {},
    "npm:collections@2.0.1": {
      "weak-map": "npm:weak-map@^1.0.4"
    },
    "npm:weak-map@1.0.5": {},
    "github:jspm/nodelibs@0.0.3": {
      "inherits": "npm:inherits@^2.0.1",
      "Base64": "npm:Base64@0.2",
      "ieee754": "npm:ieee754@^1.1.1",
      "base64-js": "npm:base64-js@0.0",
      "json": "github:systemjs/plugin-json@master"
    },
    "npm:inherits@2.0.1": {},
    "npm:Base64@0.2.1": {},
    "npm:ieee754@1.1.4": {},
    "npm:base64-js@0.0.7": {}
  }
});

System.config({
  "versions": {
    "github:workiva/paw": "HY-1378_jspm_configuration",
    "npm:q": "2.0.2",
    "npm:asap": "1.0.0",
    "github:jspm/nodelibs": "0.0.3",
    "npm:collections": "2.0.1",
    "npm:weak-map": "1.0.5",
    "npm:inherits": "2.0.1",
    "npm:Base64": "0.2.1",
    "npm:ieee754": "1.1.4",
    "npm:base64-js": "0.0.7",
    "github:systemjs/plugin-json": "master"
  }
});

