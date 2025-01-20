import '@progress/kendo-ui/src/kendo.loader.js';

let Loader = kendo.ui.Loader;
let span;
let loader;

describe('kendo.ui.Loader accessibility', function() {
    beforeEach(function() {
        span = $('<span />').appendTo(Mocha.fixture);
    });
    afterEach(function() {
        loader.destroy();
        span.remove();
        kendo.destroy(Mocha.fixture);
    });

    it('loader is accessible', async function() {
        loader = new Loader(span);

        await axeRunFixture();
    });

    it('adds proper role', function() {
        loader = new Loader(span);

        assert.equal(loader.element.attr('role'), 'alert');
    });

    it('default messages.loading text is \'Loading\'', function() {
        loader = new Loader(span);

        assert.equal(loader.element.attr('aria-label'), 'Loading');
    });

    it('adds aria-live with value polite', function() {
        loader = new Loader(span);

        assert.equal(loader.element.attr('aria-live'), 'polite');
    });
});
