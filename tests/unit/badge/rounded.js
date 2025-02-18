import '@progress/kendo-ui/src/kendo.badge.js';

let Badge = kendo.ui.Badge;
let span;
let badge;

describe('kendo.ui.Badge rounded', function() {
    beforeEach(function() {
        span = $('<span />').appendTo(Mocha.fixture);
    });
    afterEach(function() {
        badge.destroy();
        span.remove();
        kendo.destroy(Mocha.fixture);
    });

    let roundings = ['small', 'large', 'medium', 'full'];
    let roundingsAbbr = {
        'small': 'sm',
        'medium': 'md',
        'large': 'lg',
        'full': 'full'
    };

    // #region badge.options.shape
    roundings.forEach(function(rounded) {
        it(`badge.options.rounded '${rounded}' sets correct classNames`, function() {
            badge = new Badge(span, { rounded: rounded });

            assert.equal(badge._rounded, rounded);
            assert.equal(badge.rounded(), rounded);
            assert.equal(badge.element.hasClass(`k-rounded-${roundingsAbbr[rounded]}`), true);
        });
    });

    it(`badge.options.rounded '' does not set classNames`, function() {
        badge = new Badge(span, { rounded: '' });

        assert.equal(badge._rounded, '');
        assert.equal(badge.rounded(), '');
        assert.equal(badge.element.hasClass(`k-rounded-`), false);
    });
    // #endregion


    // #region badge.rounded()
    roundings.forEach(function(rounded) {
        it(`badge.rounded('${rounded}') sets correct classNames`, function() {
            badge = new Badge(span, { rounded: 'shape' });

            badge.rounded(rounded);

            assert.equal(badge._rounded, rounded);
            assert.equal(badge.rounded(), rounded);
            assert.equal(badge.element.hasClass(`k-rounded-shape`), false);
            assert.equal(badge.element.hasClass(`k-rounded-${roundingsAbbr[rounded]}`), true);
        });
    });
    it(`badge.rounded('') does not sets classNames`, function() {
        badge = new Badge(span, { rounded: 'shape' });

        badge.rounded('');

        assert.equal(badge._rounded, '');
        assert.equal(badge.rounded(), '');
        assert.equal(badge.element.hasClass(`k-rounded-shape`), false);
        assert.equal(badge.element.hasClass(`k-rounded-`), false);
    });
    // #endregion


    // #region setOptions
    roundings.forEach(function(rounded) {
        it(`badge.setOptions({rounded: '${rounded}'}) sets correct classNames`, function() {
            badge = new Badge(span, { rounded: 'shape' });

            badge.setOptions({ rounded: rounded });

            assert.equal(badge._rounded, rounded);
            assert.equal(badge.rounded(), rounded);
            assert.equal(badge.element.hasClass(`k-rounded-shape`), false);
            assert.equal(badge.element.hasClass(`k-rounded-${roundingsAbbr[rounded]}`), true);
        });
    });
    it(`badge.setOptions({rounded: ''}) does not sets classNames`, function() {
        badge = new Badge(span, { rounded: 'shape' });

        badge.setOptions({ rounded: '' });

        assert.equal(badge._rounded, '');
        assert.equal(badge.rounded(), '');
        assert.equal(badge.element.hasClass(`k-rounded-shape`), false);
        assert.equal(badge.element.hasClass(`k-rounded-`), false);
    });
    // #endregion

});
