///<reference path="../api/node/node.d.ts" />

var Hat:any = require('./hat');
var Hello:any = require('./hello').Hello;
var React:any = require('react');

var hat:any = new Hat('World');
var str:any = hat.go();

React.renderComponent(Hello({name: str}), document.getElementById('app'));
