(function() {

    var test = Mocha.test;
    var Badge = kendo.ui.Badge;
    var span;
    var badge;

    describe('kendo.ui.Badge deprecated', function() {
        beforeEach(function() {
            span = $('<span />').appendTo(Mocha.fixture);
        });
        afterEach(function() {
            badge.destroy();
            span.remove();
            kendo.destroy(Mocha.fixture);
        });

        // #region value
        test('badge.options.value maps to badge.options.text', function() {
            badge = new Badge(span, { value: 100 });

            assert.equal(badge.text(), 100);
        });

        test('badge.value() maps to badge.text()', function() {
            badge = new Badge(span, { text: 100 });

            assert.equal(badge.text(), badge.value());
            assert.equal(badge.text(), 100);
            assert.equal(badge.value(), 100);

            badge.value(200);

            assert.equal(badge.text(), badge.value());
            assert.equal(badge.text(), 200);
            assert.equal(badge.value(), 200);
        });
        // #endregion


        // #region shape
        test('badge.options.appearance maps to badge.options.shape', function() {
            badge = new Badge(span, { appearance: 'square' });

            assert.equal(badge.shape(), 'square');
        });
        // #endregion


        // #region color
        test('badge.options.type maps to badge.options.color', function() {
            badge = new Badge(span, { type: 'primary' });

            assert.equal(badge.element.hasClass('k-badge-primary'), true);
        });
        // #region


        // #region badgeStyle
        test('badge.options.look maps to badge.options.badgeStyle', function() {
            badge = new Badge(span, { look: 'outline' });

            assert.equal(badge.element.hasClass('k-badge-outline'), true);
        });
        // #region


        // #region overlay
        test('badge.options.overlay maps to badge.options.position', function() {
            badge = new Badge(span, { overlay: true });

            assert.equal(badge.element.hasClass('k-badge-top-end'), true);
        });
        // #region

    });

})();