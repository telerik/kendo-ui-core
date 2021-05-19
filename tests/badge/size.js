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

        var sizes = [ 'medium', 'small', 'large', 'custom' ];

        // #region badge.options.size
        sizes.forEach(function(size) {
            test(`badge.option.size '${size}' sets correct classNames`, function() {
                badge = new Badge(span, { size: size });
                var sizeAbbr = badge.options.sizes[size] === undefined ? size : badge.options.sizes[size];

                assert.equal(badge._size, size);
                assert.equal(badge.element.hasClass(`k-badge-${sizeAbbr}`), true);
            });
        });

        test(`badge.options.size '' does not set classNames`, function() {
            badge = new Badge(span, { size: '' });

            assert.equal(badge._size, '');
            assert.equal(badge.element.hasClass(`k-badge-`), false);
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

        test(`badge.setOptions({size: ''}) does not set classNames`, function() {
            badge = new Badge(span, { size: 'size' });

            badge.setOptions({size: ''});

            assert.equal(badge._size, '');
            assert.equal(badge.element.hasClass(`k-badge-size`), false);
            assert.equal(badge.element.hasClass(`k-badge-`), false);
        });
        // #endregion

    });

})();