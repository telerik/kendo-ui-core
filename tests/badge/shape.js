(function() {

    var test = Mocha.test;

    var Badge = kendo.ui.Badge;
    var span;
    var badge;

    describe('kendo.ui.Badge shape', function () {
        beforeEach(function() {
            span = $('<span />').appendTo(Mocha.fixture);
        });
        afterEach(function() {
            badge.destroy();
            span.remove();
            kendo.destroy(Mocha.fixture);
        });

        var shapes = [ 'rounded', 'pill', 'circle', 'dot', 'custom' ]

        // #region badge.options.shape
        shapes.forEach(function(shape) {
            test(`badge.options.shape '${shape}' sets correct classNames`, function() {
                badge = new Badge(span, { shape: shape });

                assert.equal(badge._shape, shape);
                assert.equal(badge.shape(), shape);
                assert.equal(badge.element.hasClass(`k-badge-${shape}`), true);
            });
        });

        test(`badge.options.shape '' does not set classNames`, function() {
            badge = new Badge(span, { shape: '' });

            assert.equal(badge._shape, '');
            assert.equal(badge.shape(), '');
            assert.equal(badge.element.hasClass(`k-badge-`), false);
        });
        // #endregion


        // #region badge.shape()
        shapes.forEach(function(shape) {
            test(`badge.shape('${shape}') sets correct classNames`, function() {
                badge = new Badge(span, { shape: 'shape' });

                badge.shape(shape);

                assert.equal(badge._shape, shape);
                assert.equal(badge.shape(), shape);
                assert.equal(badge.element.hasClass(`k-badge-shape`), false);
                assert.equal(badge.element.hasClass(`k-badge-${shape}`), true);
            });
        });
        test(`badge.shape('') does not sets classNames`, function() {
            badge = new Badge(span, { shape: 'shape' });

            badge.shape('');

            assert.equal(badge._shape, '');
            assert.equal(badge.shape(), '');
            assert.equal(badge.element.hasClass(`k-badge-shape`), false);
            assert.equal(badge.element.hasClass(`k-badge-`), false);
        });
        // #endregion


        // #region setOptions
        shapes.forEach(function(shape) {
            test(`badge.setOptions({shape: '${shape}'}) sets correct classNames`, function() {
                badge = new Badge(span, { shape: 'shape' });

                badge.setOptions({shape: shape});

                assert.equal(badge._shape, shape);
                assert.equal(badge.shape(), shape);
                assert.equal(badge.element.hasClass(`k-badge-shape`), false);
                assert.equal(badge.element.hasClass(`k-badge-${shape}`), true);
            });
        });
        test(`badge.setOptions({shape: ''}) does not sets classNames`, function() {
            badge = new Badge(span, { shape: 'shape' });

            badge.setOptions({shape: ''});

            assert.equal(badge._shape, '');
            assert.equal(badge.shape(), '');
            assert.equal(badge.element.hasClass(`k-badge-shape`), false);
            assert.equal(badge.element.hasClass(`k-badge-`), false);
        });
        // #endregion

    });

})();