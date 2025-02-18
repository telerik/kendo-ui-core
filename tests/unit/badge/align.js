import '@progress/kendo-ui/src/kendo.badge.js';

let Badge = kendo.ui.Badge,
    span,
    badge;

describe('kendo.ui.Badge align', function() {
    beforeEach(function() {
        span = $('<span />').appendTo(Mocha.fixture);
    });
    afterEach(function() {
        badge.destroy();
        span.remove();
        kendo.destroy(Mocha.fixture);
    });

    // #region badge.options.align
    it('badge.options.align \'top start\' sets correct classNames', function() {
        badge = new Badge(span, { position: 'edge', align: 'top start' });

        assert.equal(badge._align, 'top start');
        assert.equal(badge.element.hasClass('k-top-start'), true);
        assert.equal(badge.element.hasClass('k-top-end'), false);
        assert.equal(badge.element.hasClass('k-bottom-start'), false);
        assert.equal(badge.element.hasClass('k-bottom-end'), false);
    });
    it('badge.options.align \'top end\' sets correct classNames', function() {
        badge = new Badge(span, { position: 'edge', align: 'top end' });

        assert.equal(badge._align, 'top end');
        assert.equal(badge.element.hasClass('k-top-start'), false);
        assert.equal(badge.element.hasClass('k-top-end'), true);
        assert.equal(badge.element.hasClass('k-bottom-start'), false);
        assert.equal(badge.element.hasClass('k-bottom-end'), false);
    });
    it('badge.options.align \'bottom start\' sets correct classNames', function() {
        badge = new Badge(span, { position: 'edge', align: 'bottom start' });

        assert.equal(badge._align, 'bottom start');
        assert.equal(badge.element.hasClass('k-top-start'), false);
        assert.equal(badge.element.hasClass('k-top-end'), false);
        assert.equal(badge.element.hasClass('k-bottom-start'), true);
        assert.equal(badge.element.hasClass('k-bottom-end'), false);
    });
    it('badge.options.align \'bottom end\' sets correct classNames', function() {
        badge = new Badge(span, { position: 'edge', align: 'bottom end' });

        assert.equal(badge._align, 'bottom end');
        assert.equal(badge.element.hasClass('k-top-start'), false);
        assert.equal(badge.element.hasClass('k-top-end'), false);
        assert.equal(badge.element.hasClass('k-bottom-start'), false);
        assert.equal(badge.element.hasClass('k-bottom-end'), true);
    });
    it('badge.options.align \'\' does not set classNames', function() {
        badge = new Badge(span, { position: 'edge', align: '' });

        assert.equal(badge._align, '');
        assert.equal(badge.element.hasClass('k-badge-'), false);
        assert.equal(badge.element.hasClass('k-badge-top-start'), false);
        assert.equal(badge.element.hasClass('k-badge-top-end'), false);
        assert.equal(badge.element.hasClass('k-badge-bottom-start'), false);
        assert.equal(badge.element.hasClass('k-badge-bottom-end'), false);
    });
    // #endregion


    // #region setOptions
    it('badge.setOptions({align: \'top start\'}) sets correct classNames', function() {
        badge = new Badge(span, { position: 'edge', align: 'align' });

        badge.setOptions({ align: 'top start' });

        assert.equal(badge._align, 'top start');
        assert.equal(badge.element.hasClass('k-top-start'), true);
        assert.equal(badge.element.hasClass('k-top-end'), false);
        assert.equal(badge.element.hasClass('k-bottom-start'), false);
        assert.equal(badge.element.hasClass('k-bottom-end'), false);
    });
    it('badge.setOptions({align: \'top end\'}) sets correct classNames', function() {
        badge = new Badge(span, { position: 'edge', align: 'align' });

        badge.setOptions({ align: 'top end' });

        assert.equal(badge._align, 'top end');
        assert.equal(badge.element.hasClass('k-top-start'), false);
        assert.equal(badge.element.hasClass('k-top-end'), true);
        assert.equal(badge.element.hasClass('k-bottom-start'), false);
        assert.equal(badge.element.hasClass('k-bottom-end'), false);
    });
    it('badge.setOptions({align: \'bottom start\'}) sets correct classNames', function() {
        badge = new Badge(span, { position: 'edge', align: 'align' });

        badge.setOptions({ align: 'bottom start' });

        assert.equal(badge._align, 'bottom start');
        assert.equal(badge.element.hasClass('k-top-start'), false);
        assert.equal(badge.element.hasClass('k-top-end'), false);
        assert.equal(badge.element.hasClass('k-bottom-start'), true);
        assert.equal(badge.element.hasClass('k-bottom-end'), false);
    });
    it('badge.setOptions({align: \'bottom end\'}) sets correct classNames', function() {
        badge = new Badge(span, { position: 'edge', align: 'align' });

        badge.setOptions({ align: 'bottom end' });

        assert.equal(badge._align, 'bottom end');
        assert.equal(badge.element.hasClass('k-top-start'), false);
        assert.equal(badge.element.hasClass('k-top-end'), false);
        assert.equal(badge.element.hasClass('k-bottom-start'), false);
        assert.equal(badge.element.hasClass('k-bottom-end'), true);
    });
    it('badge.setOptions({align: \'\'}) does not set classNames', function() {
        badge = new Badge(span, { position: 'edge', align: 'top left' });

        badge.setOptions({ align: '' });

        assert.equal(badge._align, '');
        assert.equal(badge.element.hasClass('k-badge-'), false);
        assert.equal(badge.element.hasClass('k-badge-top-start'), false);
        assert.equal(badge.element.hasClass('k-badge-top-end'), false);
        assert.equal(badge.element.hasClass('k-badge-bottom-start'), false);
        assert.equal(badge.element.hasClass('k-badge-bottom-end'), false);
    });
    // #endregion

});
