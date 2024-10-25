(function() {

    describe("View - no CSP", function() {
        beforeEach(function() {
            var contentElement = $('<script id="content" type="text/x-kendo-template">Foo</script>');
            $(Mocha.fixture).append(contentElement);
        });

        afterEach(function() {
            $('#content').remove();
        });

        it("evaluates template expressions against the passed view model", function() {
            var view = new kendo.View("#: foo #", { model: { foo: "foo" }, evalTemplate: true });

            assert.equal(view.render().html(), "foo");
        });

        it("evaluates template expressions against the passed view model in elements", function() {
            var view = new kendo.View("<span>#: foo #</span>", { model: { foo: "foo" }, evalTemplate: true });

            assert.equal(view.render().html(), "<span>foo</span>");
        });

        it("evaluates template with a multiple elements in the string", function() {
            var view = new kendo.View("<div>Foo</div><div>Bar</div>", { evalTemplate: true });

            assert.equal(view.render().html(), "<div>Foo</div><div>Bar</div>");
        });

        it("evaluates template with an element in the dom", function() {
            Mocha.fixture.append("<div id=foo>#: foo #</div>");
            var view = new kendo.View("#foo", { model: { foo: "foo" }, evalTemplate: true });
            view.render();
            assert.equal(Mocha.fixture.find("#foo").html(), "foo");
        });

        it("evaluates template without with block when useWithBlock is false", function() {
            var view = new kendo.View("<div>#: data.foo.bar #</div>", { model: { foo: { bar: "bar" } }, evalTemplate: true, useWithBlock: false });
            assert.equal(view.render().html(), "<div>bar</div>");
        });

        it("evaluates template with an element in the dom without with block when useWithBlock is false", function() {
            Mocha.fixture.append("<div id=fooSuccess>#: data.foo.bar #</div>");
            var view = new kendo.View("#fooSuccess", { model: { foo: { bar: "bar" } }, evalTemplate: true, useWithBlock: false });
            view.render();
            assert.equal(Mocha.fixture.find("#fooSuccess").html(), "bar");
        });

    });

}());
