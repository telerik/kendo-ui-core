(function() {

    var test = Mocha.test;
    var Badge = kendo.ui.Badge;
    var span;
    var badge;

    describe('kendo.ui.Badge fillMode', function() {
        beforeEach(function() {
            span = $('<span />').appendTo(Mocha.fixture);
        });
        afterEach(function() {
            badge.destroy();
            span.remove();
            kendo.destroy(Mocha.fixture);
        });

        // #region badge.options.fillMode
        test('badge.options.fillMode sets correct classNames', function() {
            badge = new Badge(span, { fillMode: 'outline' });

            assert.equal(badge._fillMode, 'outline');
            assert.equal(badge.element.hasClass('k-badge-outline'), true);
        });
        test('badge.options.fillMode does not set classNames if fillMode is \'\'', function() {
            badge = new Badge(span, { fillMode: '' });

            assert.equal(badge._fillMode, '');
            assert.equal(badge.element.hasClass('k-badge-'), false);
        });
        // #endregion


        // #region setOptions
        test('badge.setOptions(fillMode) sets correct classNames', function() {
            badge = new Badge(span, { fillMode: 'flat' });

            badge.setOptions({ fillMode: 'outline' });

            assert.equal(badge._fillMode, 'outline');
            assert.equal(badge.element.hasClass('k-badge-flat'), false);
            assert.equal(badge.element.hasClass('k-badge-outline'), true);
        });
        test('badge.setOptions(fillMode) does not set classNames if fillMode is \'\'', function() {
            badge = new Badge(span, { fillMode: 'flat' });

            badge.setOptions({ fillMode: '' });

            assert.equal(badge._fillMode, '');
            assert.equal(badge.element.hasClass('k-badge-flat'), false);
            assert.equal(badge.element.hasClass('k-badge-'), false);
        });
        // #endregion

    });

})();
