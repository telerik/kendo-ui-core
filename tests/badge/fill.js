(function() {

    var test = Mocha.test;
    var Badge = kendo.ui.Badge;
    var span;
    var badge;

    describe('kendo.ui.Badge fill', function () {
        beforeEach(function() {
            span = $('<span />').appendTo(Mocha.fixture);
        });
        afterEach(function() {
            badge.destroy();
            span.remove();
            kendo.destroy(Mocha.fixture);
        });

        // #region badge.options.fill
        test('badge.options.fill sets correct classNames', function() {
            badge = new Badge(span, { fill: 'outline' });

            assert.equal(badge._fill, 'outline');
            assert.equal(badge.element.hasClass('k-badge-outline'), true);
        });
        test('badge.options.fill does not set classNames if fill is \'\'', function() {
            badge = new Badge(span, { fill: '' });

            assert.equal(badge._fill, '');
            assert.equal(badge.element.hasClass('k-badge-'), false);
        });
        // #endregion


        // #region setOptions
        test('badge.setOptions(fill) sets correct classNames', function() {
            badge = new Badge(span, { fill: 'flat' });

            badge.setOptions({ fill: 'outline' });

            assert.equal(badge._fill, 'outline');
            assert.equal(badge.element.hasClass('k-badge-flat'), false);
            assert.equal(badge.element.hasClass('k-badge-outline'), true);
        });
        test('badge.setOptions(fill) does not set classNames if fill is \'\'', function() {
            badge = new Badge(span, { fill: 'flat' });

            badge.setOptions({ fill: '' });

            assert.equal(badge._fill, '');
            assert.equal(badge.element.hasClass('k-badge-flat'), false);
            assert.equal(badge.element.hasClass('k-badge-'), false);
        });
        // #endregion

    });

})();
