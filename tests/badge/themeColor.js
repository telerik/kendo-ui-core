(function() {

    var test = Mocha.test;
    var Badge = kendo.ui.Badge;
    var span;
    var badge;

    describe('kendo.ui.Badge theme color', function () {
        beforeEach(function() {
            span = $('<span />').appendTo(Mocha.fixture);
        });
        afterEach(function() {
            badge.destroy();
            span.remove();
            kendo.destroy(Mocha.fixture);
        });

        // #region badge.options.themeColor
        test('badge.options.themeColor sets correct class', function() {
            badge = new Badge(span, { themeColor: 'primary' });

            assert.equal(badge.themeColor(), 'primary');
            assert.equal(badge.element.hasClass('k-badge-primary'), true);
        });

        test('badge.options.themeColor does not set class if themeColor is empty string', function() {
            badge = new Badge(span, { themeColor: '' });

            assert.equal(badge.themeColor(), '');
            assert.equal(badge.element.hasClass('k-badge-'), false);
        });
        // #endregion


        // #region badge.themeColor()
        test('badge.themeColor() sets correct class', function() {
            badge = new Badge(span, { themeColor: 'info' });

            badge.themeColor('warning');

            assert.equal(badge.themeColor(), 'warning');
            assert.equal(badge.element.hasClass('k-badge-warning'), true);
        });

        test('badge.themeColor() does not set class if themeColor is empty string', function() {
            badge = new Badge(span, { themeColor: 'warning' });

            badge.themeColor('');

            assert.equal(badge.themeColor(), '');
            assert.equal(badge.element.hasClass('k-badge-'), false);
        });
        // #endregion


        // #region setOptions
        test('badge.setOptions() sets correct class', function() {
            badge = new Badge(span, { themeColor: 'info' });

            badge.setOptions({ themeColor: 'warning' });

            assert.equal(badge.themeColor(), 'warning');
            assert.equal(badge.element.hasClass('k-badge-warning'), true);
        });

        test('badge.setOptions() does not set class if themeColor is empty string', function() {
            badge = new Badge(span, { themeColor: 'warning' });

            badge.setOptions({ themeColor: ''});

            assert.equal(badge.themeColor(), '');
            assert.equal(badge.element.hasClass('k-badge-'), false);
        });
        // #endregion

    });

}());
