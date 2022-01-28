(function() {

    var test = Mocha.test;
    var Badge = kendo.ui.Badge;
    var span;
    var badge;

    describe('kendo.ui.Badge visibility', function () {
        beforeEach(function() {
            span = $('<span />').appendTo(Mocha.fixture);
        });
        afterEach(function() {
            badge.destroy();
            span.remove();
            kendo.destroy(Mocha.fixture);
        });

        // #region badge.options.visible
        test('badge.options.visible false hides the badge initially', function() {
            badge = new Badge(span, {visible: false});

            assert.equal(badge.element.is(':hidden'), true);
            assert.equal(badge.element.hasClass('k-hidden'), true);
        });

        test('badge.options.visible true shows the badge initially', function() {
            badge = new Badge(span, { visible: true });

            assert.equal(badge.element.is(':visible'), true);
            assert.equal(badge.element.hasClass('k-hidden'), false);
        });
        // #endregion


        // #region badge.show()
        test('badge.show() shows the badge after badge.options.visible false', function() {
            badge = new Badge(span, { visible: false });

            badge.show();

            assert.equal(badge.element.is(':visible'), true);
            assert.equal(badge.element.hasClass('k-hidden'), false);
        });

        test('badge.show() shows the badge after badge.hide()', function() {
            badge = new Badge(span);

            badge.hide();
            badge.show();

            assert.equal(badge.element.is(':visible'), true);
            assert.equal(badge.element.hasClass('k-hidden'), false);
        });
        // #endregion


        // #region badge.hide()
        test('badge.hide() hides the badge after badge.options.visible true', function() {
            badge = new Badge(span);

            badge.hide();

            assert.equal(badge.element.is(':hidden'), true);
            assert.equal(badge.element.hasClass('k-hidden'), true);
        });

        test('badge.hide() hides the badge after badge.show()', function() {
            badge = new Badge(span, { visible: false });

            badge.show();
            badge.hide();

            assert.equal(badge.element.is(':hidden'), true);
            assert.equal(badge.element.hasClass('k-hidden'), true);
        });
        // #endregion


        // #region setOptions
        test('badge.setOptions(visible true) shows hidden badge', function() {
            badge = new Badge(span, { visible: false });

            badge.setOptions({ visible: true });

            assert.equal(badge.element.is(':visible'), true);
            assert.equal(badge.element.hasClass('k-hidden'), false);
        });

        test('badge.setOptions(visible false) hides visible badge', function() {
            badge = new Badge(span, { visible: true });

            badge.setOptions({ visible: false });

            assert.equal(badge.element.is(':hidden'), true);
            assert.equal(badge.element.hasClass('k-hidden'), true);
        });
        // #endregion

    });

})();