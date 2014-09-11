var React = require('react');

var Button = React.createClass({
    render: function() {
        return <button type="button">Click me, {this.props.name}!</button>;
    }
});

exports.Button = Button;
