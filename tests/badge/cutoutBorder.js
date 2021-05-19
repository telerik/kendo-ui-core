(function() {

    var test = Mocha.test;
    var Badge = kendo.ui.Badge;
    var span;
    var badge;

    describe('kendo.ui.Badge cutout border', function () {
        beforeEach(function() {
            span = $('<span />').appendTo(Mocha.fixture);
        });
        afterEach(function() {
            badge.destroy();
            span.remove();
            kendo.destroy(Mocha.fixture);
        });

        // #region badge.options.cutoutBorder
        test('badge.options.cutoutBorder false does not render cutout border around the badge', function() {
            badge = new Badge(span, { cutoutBorder: false });

            assert.equal(badge._cutoutBorder, false);
            assert.equal(badge.element.hasClass('k-badge-border-cutout'), false);
        });

        test('badge.options.cutoutBorder true renders cutout border around the badge', function() {
            badge = new Badge(span, { cutoutBorder: true });

            assert.equal(badge._cutoutBorder, true);
            assert.equal(badge.element.hasClass('k-badge-border-cutout'), true);
        });
        // #endregion


        // #region setOptions
        test('badge.setOptions(cutoutBorder true) shows cutout border around badge', function() {
            badge = new Badge(span, { cutoutBorder: false });

            badge.setOptions({ cutoutBorder: true });

            assert.equal(badge._cutoutBorder, true);
            assert.equal(badge.element.hasClass('k-badge-border-cutout'), true);
        });

        test('badge.setOptions(cutoutBorder false) hides cutout border around badge', function() {
            badge = new Badge(span, { cutoutBorder: true });

            badge.setOptions({ cutoutBorder: false });

            assert.equal(badge._cutoutBorder, false);
            assert.equal(badge.element.hasClass('k-badge-border-cutout'), false);
        });
        // #endregion

    });

})();