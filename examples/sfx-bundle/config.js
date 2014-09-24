System.config({
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});

System.config({
  "map": {
    "react": "github:reactjs/react-bower@^0.11.2"
  }
});

System.config({
  "versions": {
    "github:reactjs/react-bower": "0.11.2"
  }
});

