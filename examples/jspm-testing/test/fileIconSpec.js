var React = require('react/addons'),
    TestUtils = React.addons.TestUtils,
    FileIcon = require('../src/fileIcon');


describe('FileIcon component', function () {

    it('should render a general file icon given no mimetype', function () {
        var icon = FileIcon();
        var rendered = TestUtils.renderIntoDocument(icon);

        expect(rendered.getDOMNode().tagName.toLowerCase()).toEqual('i');
        expect(rendered.getDOMNode().className).toContain('icon-file');
    });

    it('should handle image file mimetypes', function () {
        var icon = FileIcon({'mimetype': 'image/jpeg'});
        var rendered = TestUtils.renderIntoDocument(icon);
        expect(rendered.getDOMNode().className).toContain('icon-file-image');
    });

    it('should handle the ms office file mimetypes', function () {
        var icon = FileIcon({'mimetype': 'application/msword'});
        var rendered = TestUtils.renderIntoDocument(icon);
        expect(rendered.getDOMNode().className).toContain('icon-file-msword');
    });

    it('should handle pdf file mimetypes', function () {
        var icon = FileIcon({'mimetype': 'application/pdf'});
        var rendered = TestUtils.renderIntoDocument(icon);
        expect(rendered.getDOMNode().className).toContain('icon-file-pdf');
    });

});

