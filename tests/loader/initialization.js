(function() {

    var test = Mocha.test;
    var Loader = kendo.ui.Loader;
    var span;
    var loader;

    describe('kendo.ui.Loader initialization', function () {
        beforeEach(function() {
            span = $('<span />').appendTo(Mocha.fixture);
        });
        afterEach(function() {
            loader.destroy();
            span.remove();
            kendo.destroy(Mocha.fixture);
        });

        test('k-loader class is set to the element of the widget', function() {
            loader = new Loader(span);

            assert.equal(loader.element.hasClass('k-loader'), true);
        });

        test('default size is \'medium\'', function() {
            loader = new Loader(span);

            assert.equal(loader._size, 'medium');
        });

        test('default type is \'pulsing\'', function() {
            loader = new Loader(span);

            assert.equal(loader._type, 'pulsing');
        });

        test('default themeColor is \'primary\'', function() {
            loader = new Loader(span);

            assert.equal(loader.element.hasClass('k-loader-primary'), true);
        });

        test('default visibility is visible', function() {
            loader = new Loader(span);

            assert.equal(loader.element.is(':visible'), true);
            assert.equal(loader.element.hasClass('.k-hidden'), false);
        });

        test('default messages.loading text is \'Loading\'', function() {
            loader = new Loader(span);

            assert.equal(loader.element.attr('aria-label'), 'Loading');
        });
    });

}());
