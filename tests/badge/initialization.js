(function() {

    var test = Mocha.test;
    var Badge = kendo.ui.Badge;
    var span;
    var badge;

    describe('kendo.ui.Badge initialization', function () {
        beforeEach(function() {
            span = $('<span />').appendTo(Mocha.fixture);
        });
        afterEach(function() {
            badge.destroy();
            span.remove();
            kendo.destroy(Mocha.fixture);
        });

        test('k-badge class is set to the element of the widget', function() {
            badge = new Badge(span);

            assert.equal(badge.element.hasClass('k-badge'), true);
        });

        test('default text is empty string', function () {
            badge = new Badge(span);

            assert.equal(badge._text, '');
            assert.equal(badge.text(), '');
        });

        test('default shape is \'rounded\'', function() {
            badge = new Badge(span);

            assert.equal(badge._shape, 'rounded');
            assert.equal(badge.shape(), 'rounded');
            assert.equal(badge.element.hasClass('k-badge-rounded'), true);
        });

        test('default size is \'medium\'', function() {
            badge = new Badge(span);

            assert.equal(badge._size, 'medium');
            assert.equal(badge.element.hasClass('k-badge-md'), true);
        });

        test('default theme color is \'secondary\'', function() {
            badge = new Badge(span);

            assert.equal(badge._themeColor, 'secondary');
            assert.equal(badge.element.hasClass('k-badge-secondary'), true);
        });

        test('default fill is \'solid\'', function() {
            badge = new Badge(span);

            assert.equal(badge._fill, 'solid');
            assert.equal(badge.element.hasClass('k-badge-solid'), true);
        });

        test('default visibility is visible', function() {
            badge = new Badge(span);

            assert.equal(badge.element.is(':visible'), true);
            assert.equal(badge.element.hasClass('.k-hidden'), false);
        });

        test('default icon is undefined', function() {
            badge = new Badge(span);

            assert.equal(badge.icon(), undefined);
        });

        test('default cutout border is false', function() {
            badge = new Badge(span);

            assert.equal(badge._cutoutBorder, false);
        });

        test('default position is inline', function() {
            badge = new Badge(span);

            assert.equal(badge._position, 'inline');
        });

        test('default align is empty string', function() {
            badge = new Badge(span);

            assert.equal(badge._align, '');
        });

    });

}());
