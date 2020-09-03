(function() {

    var test = Mocha.test;
    var Loader = kendo.ui.Loader;
    var span;
    var loader;

    describe('kendo.ui.Loader visibility', function () {
        beforeEach(function() {
            span = $('<span />').appendTo(Mocha.fixture);
        });
        afterEach(function() {
            loader.destroy();
            span.remove();
            kendo.destroy(Mocha.fixture);
        });

        // #region loader.options.visible
        test('loader.options.visible false hides the loader initially', function() {
            loader = new Loader(span, {visible: false});

            assert.equal(loader.element.is(':hidden'), true);
            assert.equal(loader.element.hasClass('k-hidden'), true);
        });

        test('loader.options.visible true shows the loader initially', function() {
            loader = new Loader(span, { visible: true });

            assert.equal(loader.element.is(':visible'), true);
            assert.equal(loader.element.hasClass('k-hidden'), false);
        });
        // #endregion


        // #region loader.show()
        test('loader.show() shows the loader after loader.options.visible false', function() {
            loader = new Loader(span, { visible: false });

            loader.show();

            assert.equal(loader.element.is(':visible'), true);
            assert.equal(loader.element.hasClass('k-hidden'), false);
        });

        test('loader.show() shows the loader after loader.hide()', function() {
            loader = new Loader(span);

            loader.hide();
            loader.show();

            assert.equal(loader.element.is(':visible'), true);
            assert.equal(loader.element.hasClass('k-hidden'), false);
        });
        // #endregion


        // #region loader.hide()
        test('loader.hide() hides the loader after loader.options.visible true', function() {
            loader = new Loader(span);

            loader.hide();

            assert.equal(loader.element.is(':hidden'), true);
            assert.equal(loader.element.hasClass('k-hidden'), true);
        });

        test('loader.hide() hides the loader after loader.show()', function() {
            loader = new Loader(span, { visible: false });

            loader.show();
            loader.hide();

            assert.equal(loader.element.is(':hidden'), true);
            assert.equal(loader.element.hasClass('k-hidden'), true);
        });
        // #endregion


        // #region setOptions
        test('loader.setOptions(visible true) shows hidden loader', function() {
            loader = new Loader(span, { visible: false });

            loader.setOptions({ visible: true });

            assert.equal(loader.element.is(':visible'), true);
            assert.equal(loader.element.hasClass('k-hidden'), false);
        });

        test('loader.setOptions(visible false) hides visible loader', function() {
            loader = new Loader(span, { visible: true });

            loader.setOptions({ visible: false });

            assert.equal(loader.element.is(':hidden'), true);
            assert.equal(loader.element.hasClass('k-hidden'), true);
        });
        // #endregion

    });

})();