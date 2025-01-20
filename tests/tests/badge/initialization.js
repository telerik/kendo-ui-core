import '@progress/kendo-ui/src/kendo.badge.js';

let Badge = kendo.ui.Badge;
let span;
let badge;

describe('kendo.ui.Badge initialization', function() {
    beforeEach(function() {
        span = $('<span />').appendTo(Mocha.fixture);
    });
    afterEach(function() {
        badge.destroy();
        span.remove();
        kendo.destroy(Mocha.fixture);
    });

    it('k-badge class is set to the element of the widget', function() {
        badge = new Badge(span);

        assert.equal(badge.element.hasClass('k-badge'), true);
    });

    it('default text is empty string', function() {
        badge = new Badge(span);

        assert.equal(badge._text, '');
        assert.equal(badge.text(), '');
    });

    it('default rounded is \'medium\'', function() {
        badge = new Badge(span);

        assert.equal(badge._rounded, 'medium');
        assert.equal(badge.rounded(), 'medium');
        assert.equal(badge.element.hasClass('k-rounded-md'), true);
    });

    it('default size is \'medium\'', function() {
        badge = new Badge(span);

        assert.equal(badge._size, 'medium');
        assert.equal(badge.element.hasClass('k-badge-md'), true);
    });

    it('default theme color is \'secondary\'', function() {
        badge = new Badge(span);

        assert.equal(badge._themeColor, 'secondary');
        assert.equal(badge.element.hasClass('k-badge-solid-secondary'), true);
    });

    it('default fillMode is \'solid\'', function() {
        badge = new Badge(span);

        assert.equal(badge._fillMode, 'solid');
        assert.equal(badge.element.hasClass('k-badge-solid'), true);
    });

    it('default visibility is visible', function() {
        badge = new Badge(span);

        assert.equal(badge.element.is(':visible'), true);
        assert.equal(badge.element.hasClass('.k-hidden'), false);
    });

    it('default icon is undefined', function() {
        badge = new Badge(span);

        assert.equal(badge.icon(), undefined);
    });

    it('default cutout border is false', function() {
        badge = new Badge(span);

        assert.equal(badge._cutoutBorder, false);
    });

    it('default position is inline', function() {
        badge = new Badge(span);

        assert.equal(badge._position, 'inline');
    });

    it('default align is empty string', function() {
        badge = new Badge(span);

        assert.equal(badge._align, '');
    });

});
