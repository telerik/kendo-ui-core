import '@progress/kendo-ui/src/kendo.loader.js';

let Loader = kendo.ui.Loader;
let span;
let loader;

describe('kendo.ui.Loader visibility', function() {
    beforeEach(function() {
        span = $('<span />').appendTo(Mocha.fixture);
    });
    afterEach(function() {
        loader.destroy();
        span.remove();
        kendo.destroy(Mocha.fixture);
    });

    // #region loader.options.visible
    it('loader.options.visible false hides the loader initially', function() {
        loader = new Loader(span, { visible: false });

        assert.equal(loader.element.is(':hidden'), true);
        assert.equal(loader.element.hasClass('k-hidden'), true);
    });

    it('loader.options.visible true shows the loader initially', function() {
        loader = new Loader(span, { visible: true });

        assert.equal(loader.element.is(':visible'), true);
        assert.equal(loader.element.hasClass('k-hidden'), false);
    });
    // #endregion


    // #region loader.show()
    it('loader.show() shows the loader after loader.options.visible false', function() {
        loader = new Loader(span, { visible: false });

        loader.show();

        assert.equal(loader.element.is(':visible'), true);
        assert.equal(loader.element.hasClass('k-hidden'), false);
    });

    it('loader.show() shows the loader after loader.hide()', function() {
        loader = new Loader(span);

        loader.hide();
        loader.show();

        assert.equal(loader.element.is(':visible'), true);
        assert.equal(loader.element.hasClass('k-hidden'), false);
    });
    // #endregion


    // #region loader.hide()
    it('loader.hide() hides the loader after loader.options.visible true', function() {
        loader = new Loader(span);

        loader.hide();

        assert.equal(loader.element.is(':hidden'), true);
        assert.equal(loader.element.hasClass('k-hidden'), true);
    });

    it('loader.hide() hides the loader after loader.show()', function() {
        loader = new Loader(span, { visible: false });

        loader.show();
        loader.hide();

        assert.equal(loader.element.is(':hidden'), true);
        assert.equal(loader.element.hasClass('k-hidden'), true);
    });
    // #endregion


    // #region setOptions
    it('loader.setOptions(visible true) shows hidden loader', function() {
        loader = new Loader(span, { visible: false });

        loader.setOptions({ visible: true });

        assert.equal(loader.element.is(':visible'), true);
        assert.equal(loader.element.hasClass('k-hidden'), false);
    });

    it('loader.setOptions(visible false) hides visible loader', function() {
        loader = new Loader(span, { visible: true });

        loader.setOptions({ visible: false });

        assert.equal(loader.element.is(':hidden'), true);
        assert.equal(loader.element.hasClass('k-hidden'), true);
    });
    // #endregion

});
