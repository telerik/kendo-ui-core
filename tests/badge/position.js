(function() {

    var test = Mocha.test;
    var Badge = kendo.ui.Badge;
    var span;
    var badge;

    describe('kendo.ui.Badge position', function () {
        beforeEach(function() {
            span = $('<span />').appendTo(Mocha.fixture);
        });
        afterEach(function() {
            badge.destroy();
            span.remove();
            kendo.destroy(Mocha.fixture);
        });

        // #region badge.options.position
        test('badge.options.position \'top start\' sets correct classNames', function() {
            badge = new Badge(span, { position: 'top start' });

            assert.equal(badge._position, 'top start');
            assert.equal(badge.element.hasClass('k-badge-top-start'), true);
            assert.equal(badge.element.hasClass('k-badge-top-end'), false);
            assert.equal(badge.element.hasClass('k-badge-bottom-start'), false);
            assert.equal(badge.element.hasClass('k-badge-bottom-end'), false);
        });
        test('badge.options.position \'top end\' sets correct classNames', function() {
            badge = new Badge(span, { position: 'top end' });

            assert.equal(badge._position, 'top end');
            assert.equal(badge.element.hasClass('k-badge-top-start'), false);
            assert.equal(badge.element.hasClass('k-badge-top-end'), true);
            assert.equal(badge.element.hasClass('k-badge-bottom-start'), false);
            assert.equal(badge.element.hasClass('k-badge-bottom-end'), false);
        });
        test('badge.options.position \'bottom start\' sets correct classNames', function() {
            badge = new Badge(span, { position: 'bottom start' });

            assert.equal(badge._position, 'bottom start');
            assert.equal(badge.element.hasClass('k-badge-top-start'), false);
            assert.equal(badge.element.hasClass('k-badge-top-end'), false);
            assert.equal(badge.element.hasClass('k-badge-bottom-start'), true);
            assert.equal(badge.element.hasClass('k-badge-bottom-end'), false);
        });
        test('badge.options.position \'bottom end\' sets correct classNames', function() {
            badge = new Badge(span, { position: 'bottom end' });

            assert.equal(badge._position, 'bottom end');
            assert.equal(badge.element.hasClass('k-badge-top-start'), false);
            assert.equal(badge.element.hasClass('k-badge-top-end'), false);
            assert.equal(badge.element.hasClass('k-badge-bottom-start'), false);
            assert.equal(badge.element.hasClass('k-badge-bottom-end'), true);
        });
        test('badge.options.position \'inline\' does not set classNames', function() {
            badge = new Badge(span, { position: 'inline' });

            assert.equal(badge._position, 'inline');
            assert.equal(badge.element.hasClass('k-badge-inline'), false);
            assert.equal(badge.element.hasClass('k-badge-top-start'), false);
            assert.equal(badge.element.hasClass('k-badge-top-end'), false);
            assert.equal(badge.element.hasClass('k-badge-bottom-start'), false);
            assert.equal(badge.element.hasClass('k-badge-bottom-end'), false);
        });
        test('badge.options.position \'\' does not set classNames', function() {
            badge = new Badge(span, { position: '' });

            assert.equal(badge._position, '');
            assert.equal(badge.element.hasClass('k-badge-'), false);
            assert.equal(badge.element.hasClass('k-badge-top-start'), false);
            assert.equal(badge.element.hasClass('k-badge-top-end'), false);
            assert.equal(badge.element.hasClass('k-badge-bottom-start'), false);
            assert.equal(badge.element.hasClass('k-badge-bottom-end'), false);
        });
        // #endregion


        // #region setOptions
        test('badge.setOptions({position: \'top start\'}) sets correct classNames', function() {
            badge = new Badge(span, { position: 'inline' });

            badge.setOptions({ position: 'top start' });

            assert.equal(badge._position, 'top start');
            assert.equal(badge.element.hasClass('k-badge-top-start'), true);
            assert.equal(badge.element.hasClass('k-badge-top-end'), false);
            assert.equal(badge.element.hasClass('k-badge-bottom-start'), false);
            assert.equal(badge.element.hasClass('k-badge-bottom-end'), false);
        });
        test('badge.setOptions({position: \'top end\'}) sets correct classNames', function() {
            badge = new Badge(span, { position: 'inline' });

            badge.setOptions({ position: 'top end' });

            assert.equal(badge._position, 'top end');
            assert.equal(badge.element.hasClass('k-badge-top-start'), false);
            assert.equal(badge.element.hasClass('k-badge-top-end'), true);
            assert.equal(badge.element.hasClass('k-badge-bottom-start'), false);
            assert.equal(badge.element.hasClass('k-badge-bottom-end'), false);
        });
        test('badge.setOptions({position: \'bottom start\'}) sets correct classNames', function() {
            badge = new Badge(span, { position: 'inline' });

            badge.setOptions({ position: 'bottom start' });

            assert.equal(badge._position, 'bottom start');
            assert.equal(badge.element.hasClass('k-badge-top-start'), false);
            assert.equal(badge.element.hasClass('k-badge-top-end'), false);
            assert.equal(badge.element.hasClass('k-badge-bottom-start'), true);
            assert.equal(badge.element.hasClass('k-badge-bottom-end'), false);
        });
        test('badge.setOptions({position: \'bottom end\'}) sets correct classNames', function() {
            badge = new Badge(span, { position: 'inline' });

            badge.setOptions({ position: 'bottom end' });

            assert.equal(badge._position, 'bottom end');
            assert.equal(badge.element.hasClass('k-badge-top-start'), false);
            assert.equal(badge.element.hasClass('k-badge-top-end'), false);
            assert.equal(badge.element.hasClass('k-badge-bottom-start'), false);
            assert.equal(badge.element.hasClass('k-badge-bottom-end'), true);
        });
        test('badge.setOptions({position: \'inline\'}) does not set classNames', function() {
            badge = new Badge(span, { position: 'top left' });

            badge.setOptions({ position: 'inline' });

            assert.equal(badge._position, 'inline');
            assert.equal(badge.element.hasClass('k-badge-inline'), false);
            assert.equal(badge.element.hasClass('k-badge-top-start'), false);
            assert.equal(badge.element.hasClass('k-badge-top-end'), false);
            assert.equal(badge.element.hasClass('k-badge-bottom-start'), false);
            assert.equal(badge.element.hasClass('k-badge-bottom-end'), false);
        });
        test('badge.setOptions({position: \'\'}) does not set classNames', function() {
            badge = new Badge(span, { position: 'top left' });

            badge.setOptions({ position: '' });

            assert.equal(badge._position, '');
            assert.equal(badge.element.hasClass('k-badge-'), false);
            assert.equal(badge.element.hasClass('k-badge-top-start'), false);
            assert.equal(badge.element.hasClass('k-badge-top-end'), false);
            assert.equal(badge.element.hasClass('k-badge-bottom-start'), false);
            assert.equal(badge.element.hasClass('k-badge-bottom-end'), false);
        });
        // #endregion

    });

})();
