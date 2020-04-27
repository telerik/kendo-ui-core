(function() {

    var test = Mocha.test;

    var Badge = kendo.ui.Badge;
    var span;
    var badge;

    describe('kendo.ui.Badge size', function () {
        beforeEach(function() {
            span = $('<span />').appendTo(Mocha.fixture);
        });
        afterEach(function() {
            badge.destroy();
            span.remove();
            kendo.destroy(Mocha.fixture);
        });

        var shapes = [ 'rounded', 'pill', 'circle', 'dot', 'custom' ]
        var defaultShapes = [ 'rectangle', '' ];
        var sizes = [ 'small', 'large', 'custom' ];
        var defaultSizes = [ 'medium', '' ];

        // #region badge.options.size
        sizes.forEach(function(size) {
            test(`badge({size: '${size}'}) sets correct classNames`, function() {
                badge = new Badge(span, { size: size });
                var sizeAbbr = badge.options.sizes[size] === undefined ? size : badge.options.sizes[size];

                assert.equal(badge._size, size);
                assert.equal(badge.element.hasClass(`k-badge-${sizeAbbr}`), true);
            });
        });

        defaultSizes.forEach(function(size) {
            test(`badge({size: '${size}'}) sets correct classNames`, function() {
                badge = new Badge(span, { size: size });
                var sizeAbbr = badge.options.sizes[size] === undefined ? size : badge.options.sizes[size];

                assert.equal(badge._size, size);
                assert.equal(badge.element.hasClass(`k-badge-${sizeAbbr}`), false);
            });
        });
        // #endregion


        // #region badge.options.shape and size variations
        shapes.forEach(function(shape) {
            sizes.forEach(function(size) {
                test(`badge({shape: '${shape}', size: '${size}'}) sets correct classNames`, function() {
                    badge = new Badge(span, { shape: shape, size: size });
                    var sizeAbbr = badge.options.sizes[size] === undefined ? size : badge.options.sizes[size];

                    assert.equal(badge.element.hasClass(`k-badge-${shape}-${sizeAbbr}`), true);
                });
            });

            defaultSizes.forEach(function(size) {
                test(`badge({shape: '${shape}', size: '${size}'}) sets correct classNames`, function() {
                    badge = new Badge(span, { shape: shape, size: size });
                    var sizeAbbr = badge.options.sizes[size] === undefined ? size : badge.options.sizes[size];

                    assert.equal(badge.element.hasClass(`k-badge-${sizeAbbr}`), false);
                    assert.equal(badge.element.hasClass(`k-badge-${shape}-${sizeAbbr}`), false);
                });
            });
        });

        defaultShapes.forEach(function(shape) {
            sizes.forEach(function(size) {
                test(`badge({shape: '${shape}', size: '${size}'}) sets correct classNames`, function() {
                    badge = new Badge(span, { shape: shape, size: size });
                    var sizeAbbr = badge.options.sizes[size] === undefined ? size : badge.options.sizes[size];

                    assert.equal(badge.element.hasClass(`k-badge-${sizeAbbr}`), true);
                    assert.equal(badge.element.hasClass(`k-badge-${shape}-${sizeAbbr}`), false);
                });
            });

            defaultSizes.forEach(function(size) {
                test(`badge({shape: '${shape}', size: '${size}'}) sets correct classNames`, function() {
                    badge = new Badge(span, { shape: shape, size: size });
                    var sizeAbbr = badge.options.sizes[size] === undefined ? size : badge.options.sizes[size];

                    assert.equal(badge.element.hasClass(`k-badge-${sizeAbbr}`), false);
                    assert.equal(badge.element.hasClass(`k-badge-${shape}-${sizeAbbr}`), false);
                });
            });
        });
        // #endregion


        // #region setOptions
        sizes.forEach(function(size) {
            test(`badge.setOptions({size: '${size}'}) sets correct classNames`, function() {
                badge = new Badge(span, { size: 'size' });
                var sizeAbbr = badge.options.sizes[size] === undefined ? size : badge.options.sizes[size];

                badge.setOptions({size: size});

                assert.equal(badge._size, size);
                assert.equal(badge.element.hasClass(`k-badge-${sizeAbbr}`), true);
            });
        });

        defaultSizes.forEach(function(size) {
            test(`badge.setOptions({size: '${size}'}) does not set classNames`, function() {
                badge = new Badge(span, { size: size });
                var sizeAbbr = badge.options.sizes[size] === undefined ? size : badge.options.sizes[size];

                badge.setOptions({size: size});

                assert.equal(badge._size, size);
                assert.equal(badge.element.hasClass(`k-badge-${sizeAbbr}`), false);
            });
        });

        shapes.forEach(function(shape) {
            sizes.forEach(function(size) {
                test(`badge.setOptions({shape: '${shape}', size: '${size}'}) sets correct classNames`, function() {
                    badge = new Badge(span, { shape: 'shape', size: 'size' });
                    var sizeAbbr = badge.options.sizes[size] === undefined ? size : badge.options.sizes[size];

                    badge.setOptions({shape: shape, size: size});

                    assert.equal(badge.element.hasClass(`k-badge-${shape}-${sizeAbbr}`), true);
                });
            });

            defaultSizes.forEach(function(size) {
                test(`badge.setOptions({shape: '${shape}', size: '${size}'}) sets correct classNames`, function() {
                    badge = new Badge(span, { shape: 'shape', size: 'size' });
                    var sizeAbbr = badge.options.sizes[size] === undefined ? size : badge.options.sizes[size];

                    badge.setOptions({shape: shape, size: size});

                    assert.equal(badge.element.hasClass(`k-badge-${sizeAbbr}`), false);
                    assert.equal(badge.element.hasClass(`k-badge-${shape}-${sizeAbbr}`), false);
                });
            });
        });

        defaultShapes.forEach(function(shape) {
            sizes.forEach(function(size) {
                test(`badge.setOptions({shape: '${shape}', size: '${size}'}) sets correct classNames`, function() {
                    badge = new Badge(span, { shape: shape, size: size });
                    var sizeAbbr = badge.options.sizes[size] === undefined ? size : badge.options.sizes[size];

                    assert.equal(badge.element.hasClass(`k-badge-${shape}-${sizeAbbr}`), false);
                });
            });

            defaultSizes.forEach(function(size) {
                test(`badge.setOptions({shape: '${shape}', size: '${size}'}) sets correct classNames`, function() {
                    badge = new Badge(span, { shape: shape, size: size });
                    var sizeAbbr = badge.options.sizes[size] === undefined ? size : badge.options.sizes[size];

                    assert.equal(badge.element.hasClass(`k-badge-${sizeAbbr}`), false);
                    assert.equal(badge.element.hasClass(`k-badge-${shape}-${sizeAbbr}`), false);
                });
            });
        });
        // #endregion

    });

})();