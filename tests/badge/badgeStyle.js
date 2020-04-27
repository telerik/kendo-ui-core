(function() {

    var test = Mocha.test;
    var Badge = kendo.ui.Badge;
    var span;
    var badge;

    describe('kendo.ui.Badge badgeStyle', function () {
        beforeEach(function() {
            span = $('<span />').appendTo(Mocha.fixture);
        });
        afterEach(function() {
            badge.destroy();
            span.remove();
            kendo.destroy(Mocha.fixture);
        });

        // #region badge.options.badgeStyle
        test('badge.options.badgeStyle sets correct classNames', function() {
            badge = new Badge(span, { badgeStyle: 'outline' });

            assert.equal(badge.element.hasClass('k-badge-outline'), true);
        });
        test('badge.options.badgeStyle does not set classNames if badgeStyle is \'solid\'', function() {
            badge = new Badge(span, { badgeStyle: 'solid' });

            assert.equal(badge.element.hasClass('k-badge-solid'), false);
        });
        test('badge.options.badgeStyle does not set classNames if badgeStyle is \'\'', function() {
            badge = new Badge(span, { badgeStyle: '' });

            assert.equal(badge.element.hasClass('k-badge-'), false);
        });
        // #endregion


        // #region setOptions
        test('badge.setOptions(badgeStyle) sets correct classNames', function() {
            badge = new Badge(span, { badgeStyle: 'flat' });

            badge.setOptions({ badgeStyle: 'outline' });

            assert.equal(badge.element.hasClass('k-badge-outline'), true);
        });
        test('badge.setOptions(badgeStyle) does not set classNames if badgeStyle is \'solid\'', function() {
            badge = new Badge(span, { badgeStyle: 'flat' });

            badge.setOptions({ badgeStyle: 'solid' });

            assert.equal(badge.element.hasClass('k-badge-solid'), false);
        });
        test('badge.setOptions(badgeStyle) does not set classNames if badgeStyle is \'\'', function() {
            badge = new Badge(span, { badgeStyle: 'flat' });

            badge.setOptions({ badgeStyle: '' });

            assert.equal(badge.element.hasClass('k-badge-'), false);
        });
        // #endregion

    });

    describe('kendo.ui.Badge badgeStyle and color variations', function () {
        beforeEach(function() {
            span = $('<span />').appendTo(Mocha.fixture);
        });
        afterEach(function() {
            badge.destroy();
            span.remove();
            kendo.destroy(Mocha.fixture);
        });

        // #region badge.options.badgeStyle badge.options.color
        test('badge.options badgeStyle and color variations sets correct classNames', function() {
            badge = new Badge(span, { color: 'red', badgeStyle: 'flat' });

            assert.equal(badge.element.hasClass('k-badge-red'), false);
            assert.equal(badge.element.hasClass('k-badge-flat'), true);
            assert.equal(badge.element.hasClass('k-badge-flat-red'), true);
        });
        test('badge.options badgeStyle and color variations does not set classNames if badgeStyle is \'solid\'', function() {
            badge = new Badge(span, { color: 'red', badgeStyle: 'solid' });

            assert.equal(badge.element.hasClass('k-badge-red'), true);
            assert.equal(badge.element.hasClass('k-badge-solid'), false);
            assert.equal(badge.element.hasClass('k-badge-solid-red'), false);
        });
        test('badge.options badgeStyle and color variations does not set classNames if badgeStyle is \'\'', function() {
            badge = new Badge(span, { color: 'red', badgeStyle: '' });

            assert.equal(badge.element.hasClass('k-badge-red'), true);
            assert.equal(badge.element.hasClass('k-badge-'), false);
        });
        // #endregion

    });

})();
