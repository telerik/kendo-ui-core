(function() {

    var test = Mocha.test;
    var Loader = kendo.ui.Loader;
    var span;
    var loader;

    describe('kendo.ui.Loader color', function () {
        beforeEach(function() {
            span = $('<span />').appendTo(Mocha.fixture);
        });
        afterEach(function() {
            loader.destroy();
            span.remove();
            kendo.destroy(Mocha.fixture);
        });

        // #region loader.options.color
        test('loader.options.themeColor sets correct class', function() {
            loader = new Loader(span, { themeColor: 'secondary' });

            assert.equal(loader.themeColor(), 'secondary');
            assert.equal(loader.element.hasClass('k-loader-secondary'), true);
        });

        test('loader.options.themeColor does not set class if color is inherit', function() {
            loader = new Loader(span, { themeColor: 'inherit' });

            assert.equal(loader.themeColor(), 'inherit');
            assert.equal(loader.element.hasClass('k-loader-inherit'), false);
        });

        test('loader.options.themeColor does not set class if themeColor is empty string', function() {
            loader = new Loader(span, { themeColor: '' });

            assert.equal(loader.themeColor(), '');
            assert.equal(loader.element.hasClass('k-loader-'), false);
        });
        // #endregion


        // #region loader.themeColor()
        test('loader.themeColor() sets correct class', function() {
            loader = new Loader(span, { themeColor: 'info' });

            loader.themeColor('warning');

            assert.equal(loader.themeColor(), 'warning');
            assert.equal(loader.element.hasClass('k-loader-warning'), true);
        });

        test('loader.themeColor() does not set class if color is inherit', function() {
            loader = new Loader(span, { themeColor: 'success' });

            loader.themeColor('inherit');

            assert.equal(loader.themeColor(), 'inherit');
            assert.equal(loader.element.hasClass('k-loader-inherit'), false);
        });

        test('loader.themeColor() does not set class if color is empty string', function() {
            loader = new Loader(span, { themeColor: 'warning' });

            loader.themeColor('');

            assert.equal(loader.themeColor(), '');
            assert.equal(loader.element.hasClass('k-loader-'), false);
        });
        // #endregion


        // #region setOptions
        test('loader.setOptions() sets correct class', function() {
            loader = new Loader(span, { themeColor: 'info' });

            loader.setOptions({ themeColor: 'warning' });

            assert.equal(loader.themeColor(), 'warning');
            assert.equal(loader.element.hasClass('k-loader-warning'), true);
        });

        test('loader.setOptions() does not set class if themeColor is inherit', function() {
            loader = new Loader(span, { themeColor: 'success' });

            loader.setOptions({ themeColor: 'inherit' });

            assert.equal(loader.themeColor(), 'inherit');
            assert.equal(loader.element.hasClass('k-loader-inherit'), false);
        });

        test('loader.setOptions() does not set class if color is empty string', function() {
            loader = new Loader(span, { themeColor: 'warning' });

            loader.setOptions({ themeColor: ''});

            assert.equal(loader.themeColor(), '');
            assert.equal(loader.element.hasClass('k-loader-'), false);
        });
        // #endregion

    });

}());
