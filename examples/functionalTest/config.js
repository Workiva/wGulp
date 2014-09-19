System.config({
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});

System.config({
  "map": {
    "paw": "github:workiva/paw@master/src"
  }
});

System.config({
  "versions": {
    "github:workiva/paw": "master"
  }
});

