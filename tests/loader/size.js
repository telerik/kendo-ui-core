(function() {

    var test = Mocha.test;

    var Loader = kendo.ui.Loader;
    var span;
    var loader;

    describe('kendo.ui.Loader size', function () {
        beforeEach(function() {
            span = $('<span />').appendTo(Mocha.fixture);
        });
        afterEach(function() {
            loader.destroy();
            span.remove();
            kendo.destroy(Mocha.fixture);
        });


        var sizes = [ 'small', 'medium', 'large', 'custom' ];

        // #region loader.options.size
        sizes.forEach(function(size) {
            test(`loader({size: '${size}'}) sets correct classNames`, function() {
                loader = new Loader(span, { size: size });
                var sizeAbbr = loader.options.sizes[size] === undefined ? size : loader.options.sizes[size];

                assert.equal(loader._size, size);
                assert.equal(loader.element.hasClass(`k-loader-${sizeAbbr}`), true);
            });
        });
        // #endregion

        // #region setOptions
        sizes.forEach(function(size) {
            test(`loader.setOptions({size: '${size}'}) sets correct classNames`, function() {
                loader = new Loader(span, { size: 'size' });
                var sizeAbbr = loader.options.sizes[size] === undefined ? size : loader.options.sizes[size];

                loader.setOptions({size: size});

                assert.equal(loader._size, size);
                assert.equal(loader.element.hasClass(`k-loader-${sizeAbbr}`), true);
            });
        });
        // #endregion

    });

})();