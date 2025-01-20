import '@progress/kendo-ui/src/kendo.badge.js';

let Badge = kendo.ui.Badge;
let span;
let badge;

describe('kendo.ui.Badge size', function() {
    beforeEach(function() {
        span = $('<span />').appendTo(Mocha.fixture);
    });
    afterEach(function() {
        badge.destroy();
        span.remove();
        kendo.destroy(Mocha.fixture);
    });

    let sizes = ['medium', 'small', 'large', 'custom'];

    // #region badge.options.size
    sizes.forEach(function(size) {
        it(`badge.option.size '${size}' sets correct classNames`, function() {
            badge = new Badge(span, { size: size });
            let sizeAbbr = badge.options.sizes[size] === undefined ? size : badge.options.sizes[size];

            assert.equal(badge._size, size);
            assert.equal(badge.element.hasClass(`k-badge-${sizeAbbr}`), true);
        });
    });

    it(`badge.options.size '' does not set classNames`, function() {
        badge = new Badge(span, { size: '' });

        assert.equal(badge._size, '');
        assert.equal(badge.element.hasClass(`k-badge-`), false);
    });
    // #endregion


    // #region setOptions
    sizes.forEach(function(size) {
        it(`badge.setOptions({size: '${size}'}) sets correct classNames`, function() {
            badge = new Badge(span, { size: 'size' });
            let sizeAbbr = badge.options.sizes[size] === undefined ? size : badge.options.sizes[size];

            badge.setOptions({ size: size });

            assert.equal(badge._size, size);
            assert.equal(badge.element.hasClass(`k-badge-${sizeAbbr}`), true);
        });
    });

    it(`badge.setOptions({size: ''}) does not set classNames`, function() {
        badge = new Badge(span, { size: 'size' });

        badge.setOptions({ size: '' });

        assert.equal(badge._size, '');
        assert.equal(badge.element.hasClass(`k-badge-size`), false);
        assert.equal(badge.element.hasClass(`k-badge-`), false);
    });
    // #endregion

});
