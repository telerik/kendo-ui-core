import '@progress/kendo-ui/src/kendo.badge.js';


let Badge = kendo.ui.Badge;
let span;
let badge;

describe('kendo.ui.Badge theme color', function() {
    beforeEach(function() {
        span = $('<span />').appendTo(Mocha.fixture);
    });
    afterEach(function() {
        badge.destroy();
        span.remove();
        kendo.destroy(Mocha.fixture);
    });

    // #region badge.options.themeColor
    it('badge.options.themeColor sets correct class', function() {
        badge = new Badge(span, { themeColor: 'primary' });

        assert.equal(badge.themeColor(), 'primary');
        assert.equal(badge.element.hasClass('k-badge-solid-primary'), true);
    });

    it('badge.options.themeColor does not set class if themeColor is empty string', function() {
        badge = new Badge(span, { themeColor: '' });

        assert.equal(badge.themeColor(), '');
        assert.equal(badge.element.hasClass('k-badge-'), false);
    });
    // #endregion


    // #region badge.themeColor()
    it('badge.themeColor() sets correct class', function() {
        badge = new Badge(span, { themeColor: 'info' });

        badge.themeColor('warning');

        assert.equal(badge.themeColor(), 'warning');
        assert.equal(badge.element.hasClass('k-badge-solid-warning'), true);
    });

    it('badge.themeColor() does not set class if themeColor is empty string', function() {
        badge = new Badge(span, { themeColor: 'warning' });

        badge.themeColor('');

        assert.equal(badge.themeColor(), '');
        assert.equal(badge.element.hasClass('k-badge-'), false);
    });
    // #endregion


    // #region setOptions
    it('badge.setOptions() sets correct class', function() {
        badge = new Badge(span, { themeColor: 'info' });

        badge.setOptions({ themeColor: 'warning' });

        assert.equal(badge.themeColor(), 'warning');
        assert.equal(badge.element.hasClass('k-badge-solid-warning'), true);
    });

    it('badge.setOptions() does not set class if themeColor is empty string', function() {
        badge = new Badge(span, { themeColor: 'warning' });

        badge.setOptions({ themeColor: '' });

        assert.equal(badge.themeColor(), '');
        assert.equal(badge.element.hasClass('k-badge-'), false);
    });
    // #endregion

});
