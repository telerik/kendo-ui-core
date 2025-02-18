import '@progress/kendo-ui/src/kendo.loader.js';

let Loader = kendo.ui.Loader;
let span;
let loader;

describe('kendo.ui.Loader size', function() {
    beforeEach(function() {
        span = $('<span />').appendTo(Mocha.fixture);
    });
    afterEach(function() {
        loader.destroy();
        span.remove();
        kendo.destroy(Mocha.fixture);
    });


    let sizes = ['small', 'medium', 'large', 'custom'];

    // #region loader.options.size
    sizes.forEach(function(size) {
        it(`loader({size: '${size}'}) sets correct classNames`, function() {
            loader = new Loader(span, { size: size });
            let sizeAbbr = loader.options.sizes[size] === undefined ? size : loader.options.sizes[size];

            assert.equal(loader._size, size);
            assert.equal(loader.element.hasClass(`k-loader-${sizeAbbr}`), true);
        });
    });
    // #endregion

    // #region setOptions
    sizes.forEach(function(size) {
        it(`loader.setOptions({size: '${size}'}) sets correct classNames`, function() {
            loader = new Loader(span, { size: 'size' });
            let sizeAbbr = loader.options.sizes[size] === undefined ? size : loader.options.sizes[size];

            loader.setOptions({ size: size });

            assert.equal(loader._size, size);
            assert.equal(loader.element.hasClass(`k-loader-${sizeAbbr}`), true);
        });
    });
    // #endregion

});
