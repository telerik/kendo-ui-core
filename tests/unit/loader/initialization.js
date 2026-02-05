import '@progress/kendo-ui/src/kendo.loader.js';

let test = Mocha.test;
let Loader = kendo.ui.Loader;
let span;
let loader;

describe('kendo.ui.Loader initialization', function() {
    beforeEach(function() {
        span = $('<span />').appendTo(Mocha.fixture);
    });
    afterEach(function() {
        loader.destroy();
        span.remove();
        kendo.destroy(Mocha.fixture);
    });

    it('k-loader class is set to the element of the widget', function() {
        loader = new Loader(span);

        assert.equal(loader.element.hasClass('k-loader'), true);
    });

    it('size option sets internal _size', function() {
        loader = new Loader(span, { size: 'medium' });

        assert.equal(loader._size, 'medium');
    });

    it('default type is \'pulsing\'', function() {
        loader = new Loader(span);

        assert.equal(loader._type, 'pulsing');
    });

    it('themeColor option sets correct class', function() {
        loader = new Loader(span, { themeColor: 'primary' });

        assert.equal(loader.element.hasClass('k-loader-primary'), true);
    });

    it('default visibility is visible', function() {
        loader = new Loader(span);

        assert.equal(loader.element.is(':visible'), true);
        assert.equal(loader.element.hasClass('.k-hidden'), false);
    });
});
