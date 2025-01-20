import '@progress/kendo-ui/src/kendo.loader.js';

let Loader = kendo.ui.Loader;
let span;
let loader;

describe('kendo.ui.Loader type', function() {
    beforeEach(function() {
        span = $('<span />').appendTo(Mocha.fixture);
    });
    afterEach(function() {
        loader.destroy();
        span.remove();
        kendo.destroy(Mocha.fixture);
    });

    let types = { 'pulsing': 'pulsing-2', 'infinite-spinner': 'spinner-3', 'converging-spinner': 'spinner-4' };

    // #region loader.options.size
    Object.keys(types).forEach(function(key) {
        it(`loader({type: '${key}'}) sets correct classNames`, function() {
            loader = new Loader(span, { type: key });

            assert.equal(loader._type, key);
            assert.equal(loader.element.hasClass(`k-loader-${types[key]}`), true);
        });
    });
    // #endregion

    // #region setOptions
    Object.keys(types).forEach(function(key) {
        it(`loader.setOptions({type: '${key}'}) sets correct classNames`, function() {
            loader = new Loader(span, { key: 'infinite-spinner' });

            loader.setOptions({ type: key });

            assert.equal(loader._type, key);
            assert.equal(loader.element.hasClass(`k-loader-${types[key]}`), true);
        });
    });
    // #endregion

});
