import '@progress/kendo-ui/src/kendo.badge.js';

let Badge = kendo.ui.Badge;
let span;
let badge;

describe('kendo.ui.Badge visibility', function() {
    beforeEach(function() {
        span = $('<span />').appendTo(Mocha.fixture);
    });
    afterEach(function() {
        badge.destroy();
        span.remove();
        kendo.destroy(Mocha.fixture);
    });

    // #region badge.options.visible
    it('badge.options.visible false hides the badge initially', function() {
        badge = new Badge(span, { visible: false });

        assert.equal(badge.element.is(':hidden'), true);
        assert.equal(badge.element.hasClass('k-hidden'), true);
    });

    it('badge.options.visible true shows the badge initially', function() {
        badge = new Badge(span, { visible: true });

        assert.equal(badge.element.is(':visible'), true);
        assert.equal(badge.element.hasClass('k-hidden'), false);
    });
    // #endregion


    // #region badge.show()
    it('badge.show() shows the badge after badge.options.visible false', function() {
        badge = new Badge(span, { visible: false });

        badge.show();

        assert.equal(badge.element.is(':visible'), true);
        assert.equal(badge.element.hasClass('k-hidden'), false);
    });

    it('badge.show() shows the badge after badge.hide()', function() {
        badge = new Badge(span);

        badge.hide();
        badge.show();

        assert.equal(badge.element.is(':visible'), true);
        assert.equal(badge.element.hasClass('k-hidden'), false);
    });
    // #endregion


    // #region badge.hide()
    it('badge.hide() hides the badge after badge.options.visible true', function() {
        badge = new Badge(span);

        badge.hide();

        assert.equal(badge.element.is(':hidden'), true);
        assert.equal(badge.element.hasClass('k-hidden'), true);
    });

    it('badge.hide() hides the badge after badge.show()', function() {
        badge = new Badge(span, { visible: false });

        badge.show();
        badge.hide();

        assert.equal(badge.element.is(':hidden'), true);
        assert.equal(badge.element.hasClass('k-hidden'), true);
    });
    // #endregion


    // #region setOptions
    it('badge.setOptions(visible true) shows hidden badge', function() {
        badge = new Badge(span, { visible: false });

        badge.setOptions({ visible: true });

        assert.equal(badge.element.is(':visible'), true);
        assert.equal(badge.element.hasClass('k-hidden'), false);
    });

    it('badge.setOptions(visible false) hides visible badge', function() {
        badge = new Badge(span, { visible: true });

        badge.setOptions({ visible: false });

        assert.equal(badge.element.is(':hidden'), true);
        assert.equal(badge.element.hasClass('k-hidden'), true);
    });
    // #endregion

});
