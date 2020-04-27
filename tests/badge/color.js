(function() {

    var test = Mocha.test;
    var Badge = kendo.ui.Badge;
    var span;
    var badge;

    describe('kendo.ui.Badge color', function () {
        beforeEach(function() {
            span = $('<span />').appendTo(Mocha.fixture);
        });
        afterEach(function() {
            badge.destroy();
            span.remove();
            kendo.destroy(Mocha.fixture);
        });

        // #region badge.options.color
        test('badge.options.color sets correct class', function() {
            badge = new Badge(span, { color: 'primary' });

            assert.equal(badge.color(), 'primary');
            assert.equal(badge.element.hasClass('k-badge-primary'), true);
        });

        test('badge.options.color does not set class if color is inherit', function() {
            badge = new Badge(span, { color: 'inherit' });

            assert.equal(badge.color(), 'inherit');
            assert.equal(badge.element.hasClass('k-badge-inherit'), false);
        });

        test('badge.options.color does not set class if color is empty string', function() {
            badge = new Badge(span, { color: '' });

            assert.equal(badge.color(), '');
            assert.equal(badge.element.hasClass('k-badge-'), false);
        });
        // #endregion


        // #region badge.color()
        test('badge.color() sets correct class', function() {
            badge = new Badge(span, { color: 'info' });

            badge.color('warning');

            assert.equal(badge.color(), 'warning');
            assert.equal(badge.element.hasClass('k-badge-warning'), true);
        });

        test('badge.color() does not set class if color is inherit', function() {
            badge = new Badge(span, { color: 'success' });

            badge.color('inherit');

            assert.equal(badge.color(), 'inherit');
            assert.equal(badge.element.hasClass('k-badge-inherit'), false);
        });

        test('badge.color() does not set class if color is empty string', function() {
            badge = new Badge(span, { color: 'warning' });

            badge.color('');

            assert.equal(badge.color(), '');
            assert.equal(badge.element.hasClass('k-badge-'), false);
        });
        // #endregion


        // #region setOptions
        test('badge.setOptions() sets correct class', function() {
            badge = new Badge(span, { color: 'info' });

            badge.setOptions({ color: 'warning' });

            assert.equal(badge.color(), 'warning');
            assert.equal(badge.element.hasClass('k-badge-warning'), true);
        });

        test('badge.setOptions() does not set class if color is inherit', function() {
            badge = new Badge(span, { color: 'success' });

            badge.setOptions({ color: 'inherit' });

            assert.equal(badge.color(), 'inherit');
            assert.equal(badge.element.hasClass('k-badge-inherit'), false);
        });

        test('badge.setOptions() does not set class if color is empty string', function() {
            badge = new Badge(span, { color: 'warning' });

            badge.setOptions({ color: ''});

            assert.equal(badge.color(), '');
            assert.equal(badge.element.hasClass('k-badge-'), false);
        });
        // #endregion

    });

}());
