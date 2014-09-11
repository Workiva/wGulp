/** @jsx React.DOM */

var React = require('react');


/**
 * @module components/fileIcon
 * @description
 * Renders a fileIcon given an appropriate mimetype
 *
 * @property {string} mimetype - The mimetype of the file needing an icon
 * @property {boolean} [loading=false] - Whether or not to show a loading indicator
 * @property {boolean} [error=false] - Whether or not to show an error indicator
 *
 * @since 1.0.0
 */
var FileIcon = React.createClass({displayName: 'FileIcon',

    /**
     * Supported properties for the FileIcon component. (See above)
     */
    propTypes: {
        mimetype: React.PropTypes.string,
        loading: React.PropTypes.bool,
        error: React.PropTypes.bool
    },

    /**
     * The default properties for the FileIcon component.
     */
    getDefaultProps: function () {
        return {
            mimetype: null,
            loading: false,
            error: false
        };
    },

    /**
     * Renders FileIcon.
     */
    render: function () {
        var iconClass = '';

        // Loading and error states
        if (this.props.loading) {
            iconClass = 'progress-spinner progress-spinner-sm';
        } else if (this.props.error) {
            iconClass = 'icon icon-warning-sign icon-md';
        } else {
            iconClass = 'icon icon-md icon-two-color';
        }

        // Find appropriate icon for mimetype
        if (!this.props.mimetype) {
            iconClass += ' icon-file';
        } else {
            iconClass += getIconClassFromMimetype(this.props.mimetype);
        }

        return (
            React.DOM.i( {className:iconClass} )
        );
    }
});


/**
 * Given a mimetype return a generalized filetype icon
 * @param  {string} mimetype the mimetype of the file
 * @return {string}          fileIcon class
 */
var getIconClassFromMimetype = function (mimetype) {
    var typeMap = {

        // Images
        'image/jpeg': 'image',
        'image/pjpeg': 'image',
        'image/png': 'image',
        'image/x-png': 'image',
        'image/gif': 'image',
        'image/bmp': 'image',
        'image/x-ms-bmp': 'image',

        // MS Office,
        'application/msword': 'msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'msword',
        'application/vnd.ms-excel': 'msexcel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'msexcel',
        'application/vnd.ms-powerpoint': 'mspowerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'mspowerpoint',

        // Other,
        'application/pdf': 'pdf',
        'text/html': '',
        'text/plain': '',
        'text/csv': 'msexcel',
        'application/rtf': '',
        'text/rtf': ''

    };

    var iconClass = 'icon-file';
    var type = typeMap[mimetype];
    if (type) {
        iconClass += '-' + type;
    }
    return iconClass;
};

module.exports = FileIcon;

