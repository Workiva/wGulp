declare var require, document;

var Hat = require('./hat');
var Hello:any = require('./hello').Hello;
var React:any = require('react');

var hat = new Hat('World');
var str = hat.go();

React.renderComponent(Hello({name: str}), document.body);
