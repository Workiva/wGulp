///<reference path="../api/node/node.d.ts" />

var Button:any = require('./button').Button;
var React:any = require('react');

React.renderComponent(Button({name: 'Evan'}), document.getElementById('button'));
