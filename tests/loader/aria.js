(function() {

    var test = Mocha.test;
    var Loader = kendo.ui.Loader;
    var span;
    var loader;

    describe('kendo.ui.Loader accessibility', function () {
        beforeEach(function() {
            span = $('<span />').appendTo(Mocha.fixture);
        });
        afterEach(function() {
            loader.destroy();
            span.remove();
            kendo.destroy(Mocha.fixture);
        });

        test('loader is accessible', function(done) {
            loader = new Loader(span);

            axeRunFixture(done);
        });

        test('adds proper role', function() {
            loader = new Loader(span);

            assert.equal(loader.element.attr('role'), 'alert');
        });

        test('default messages.loading text is \'Loading\'', function() {
            loader = new Loader(span);

            assert.equal(loader.element.attr('aria-label'), 'Loading');
        });

        test('adds aria-live with value polite', function() {
            loader = new Loader(span);

            assert.equal(loader.element.attr('aria-live'), 'polite');
        });
    });
}());