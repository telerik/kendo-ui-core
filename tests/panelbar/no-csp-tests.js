(function() {
    var dom;

    describe('panelbar MVVM', function() {
        beforeEach(function() {
            Mocha.fixture.html('<script type="text/x-kendo-template" id="template"><li>${text}</li></script>');
            Mocha.fixture.html('<script type="text/x-kendo-template" id="textTemplate">${data.text}</script>');
        });
        afterEach(function() {
            kendo.destroy(dom);
        });

        it.skip("source binding is skipped if set to target element", function() {
            dom = $('<ul id="container" data-template="textTemplate" data-bind="source:items"></ul>');

            var observable = kendo.observable({ items: [{ text: "foo" }, { text: "bar" }] });

            kendo.bind(dom, observable);
            dom.kendoPanelBar();
            assert.equal(dom.children().length, 2);
        });
    });
}());
