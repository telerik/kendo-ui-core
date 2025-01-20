import '@progress/kendo-ui/src/kendo.badge.js';

let Badge = kendo.ui.Badge;
let span;
let badge;

describe('kendo.ui.Badge position', function() {
    beforeEach(function() {
        span = $('<span />').appendTo(Mocha.fixture);
    });
    afterEach(function() {
        badge.destroy();
        span.remove();
        kendo.destroy(Mocha.fixture);
    });

    let positions = ['inline', 'edge', 'outside', 'inside'];

    // #region badge.options.position
    positions.forEach(function(position) {
        it(`badge.options.position '${position}' sets correct classNames`, function() {
            badge = new Badge(span, { position: position });

            assert.equal(badge._position, position);
            assert.equal(badge.element.hasClass(`k-badge-${position}`), true);
        });
    });

    it('badge.options.position \'\' does not set classNames', function() {
        badge = new Badge(span, { position: '' });

        assert.equal(badge._position, '');
        assert.equal(badge.element.hasClass('k-badge-'), false);
        assert.equal(badge.element.hasClass('k-badge-inline'), false);
        assert.equal(badge.element.hasClass('k-badge-edge'), false);
        assert.equal(badge.element.hasClass('k-badge-outside'), false);
        assert.equal(badge.element.hasClass('k-badge-inside'), false);
    });
    // #endregion


    // #region badge.setOptions
    positions.forEach(function(position) {
        it(`badge.setOptions({position: '${position}'}) sets correct classNames`, function() {
            badge = new Badge(span, { position: 'position' });

            badge.setOptions({ position: position });

            assert.equal(badge._position, position);
            assert.equal(badge.element.hasClass(`k-badge-${position}`), true);
        });
    });

    it('badge.setOptions({position: \'\'}) does not set classNames', function() {
        badge = new Badge(span, { position: 'position' });

        badge.setOptions({ position: '' });

        assert.equal(badge._position, '');
        assert.equal(badge.element.hasClass('k-badge-'), false);
        assert.equal(badge.element.hasClass('k-badge-inline'), false);
        assert.equal(badge.element.hasClass('k-badge-edge'), false);
        assert.equal(badge.element.hasClass('k-badge-outside'), false);
        assert.equal(badge.element.hasClass('k-badge-inside'), false);
    });
    // #endregion

});
