(function() {

    describe("View", function () {
        beforeEach(function() {
            var contentElement = $('<script id="content" type="text/x-kendo-template">Foo</script>');
            $(Mocha.fixture).append(contentElement);
        });

        afterEach(function() {
            $('#content').remove();
        });

        it("reads contents from a passed string", function() {
            var view = new kendo.View("<span>Foo</span>");

            assert.equal(view.render().html(), "<span>Foo</span>");
        });

        it("wraps passed tags in a single element", function() {
            var view = new kendo.View("<span>Foo</span><span>Bar</span>");
            assert.equal(view.render().length, 1);
        });

        it("keeps DOM element when rendered by default", function() {
            $('#content').remove();
            $(document.body).append('<div id="content">Foo</div>');
            var view = new kendo.View("content", { wrap: false });
            view.render();
            assert.equal($('#content').length, 1);
        });

        it("supports tag hoch-poch", function() {
            var html = 'foo<br><textarea id="html_editor" cols="50" rows="10"></textarea><br>bar',
                view = new kendo.View(html);

            assert.equal(view.render().html(), html);
        });

        it("reads contents from a given script tag", function() {
            var view = new kendo.View("#content");

            assert.isOk(view.render() instanceof jQuery);

            assert.equal(view.render().html(), "Foo");
        });

        it("accepts id without #", function() {
            var view = new kendo.View("content");

            assert.isOk(view.render() instanceof jQuery);

            assert.equal(view.render().html(), "Foo");
        });

        it("reuses element", function() {
            var view = new kendo.View("#content");

            assert.equal(view.render(), view.render());
        });

        it("renders a div", function() {
            var view = new kendo.View("#content");

            assert.isOk(view.render().is("div"));
        });

        it("can render as any tag", function() {
            var view = new kendo.View( "#content", { tagName: "span" });

            assert.isOk(view.render().is("span"));
        });

        it("skips template expressions unless flag is enabled", function() {
            var view = new kendo.View("#: foo #", {model: { foo: "foo" }});

            assert.equal(view.render().html(), "#: foo #");
        });

        it("evaluates template expressions against the passed view model", function() {
            var view = new kendo.View("#: foo #", {model: { foo: "foo" }, evalTemplate: true });

            assert.equal(view.render().html(), "foo");
        });

        it("evaluates template expressions against the passed view model in elements", function() {
            var view = new kendo.View("<span>#: foo #</span>", {model: { foo: "foo" }, evalTemplate: true });

            assert.equal(view.render().html(), "<span>foo</span>");
        });

        it("evaluates template with a multiple elements in the string", function() {
            var view = new kendo.View("<div>Foo</div><div>Bar</div>", { evalTemplate: true });

            assert.equal(view.render().html(), "<div>Foo</div><div>Bar</div>");
        });

        it("evaluates template with an element in the dom", function() {
            Mocha.fixture.append("<div id=foo>#: foo #</div>")
            var view = new kendo.View("#foo", { model: { foo: "foo" }, evalTemplate: true });
            view.render();
            assert.equal(Mocha.fixture.find("#foo").html(), "foo");
        });

        it("can skip wrapping", function() {
            var view = new kendo.View("<span id='foo'>Foo</span>", { wrap: false });

            assert.isOk(view.render().is("span"));
            assert.equal(view.render().attr("id"), 'foo');
        });

        it("binds to a given model", function() {
            var view = new kendo.View( "<i><a data-bind='click: foo'>Foo</a></i>", { model: kendo.observable({ foo: function() { assert.isOk(true); } }) });

            view.render().find("a").trigger("click");
        });

        it("unbinds handlers on destroy", function() {
            var view = new kendo.View( "<i><a data-role='touch' data-bind='events: {tap: foo}'>Foo</a></i>", { model: kendo.observable({ foo: function() { assert.isOk(true); } }) });

            var el = view.render();

            clickAt(el.find("a"));

            view.destroy();

            clickAt(el.find("a"));
            assert.equal(el.find("a").data("kendoTouch"), null);
        });

        it("destroys widgets on destroy", function() {
            var view = new kendo.View( "<i><a data-bind='click: foo'>Foo</a></i>", { model: kendo.observable({ foo: function() { assert.isOk(true); } }) });

            var el = view.render();

            el.find("a").trigger("click");

            view.destroy();

            el.find("a").trigger("click");
        });

        it("triggers init when rendered initially", function() {
            var view = new kendo.View( "<i />", { init: function() { assert.isOk(true); } });

            view.render();
            view.render();
        });

        it("triggers show when rendered", function() {
            var view = new kendo.View( "<i />", { show: function() { assert.isOk(true); } });

            view.render("#foo");
            view.render("#bar");
        });
    });

    describe("View", function () {
        var view;

        afterEach(function() {
            if (view) {
                view.destroy();
            }
        });

        it("is rendered on init", function() {
            view = new kendo.View('<span id="viewContent">content</span>', { renderOnInit: true });

            assert.equal(view.element.html(),'content');
        });
    });

    describe("Layout", function () {
        it("renders view in a given region", function() {
            var layout = new kendo.Layout("<div><span id='container' /></div>" ),
                view = new kendo.View('<span id="baz">Baz</span>');

            layout.render();

            layout.showIn('#container', view);

            assert.equal(layout.element.find("#container").html(), '<div>' + view.element.html() + '</div>');
        });

        it("triggers init when the view is available in the DOM", function() {
            var layout = new kendo.Layout("<div><span id='container' /></div>" ),
                foo = new kendo.View('<span id="foo">Foo</span>', { init: function() { assert.equal(layout.element.find("#foo").length, 1); } });

            layout.render();

            layout.showIn('#container', foo);
        });

        it("triggers view show when replacing views", function() {
            var layout = new kendo.Layout("<div><span id='container' /></div>" ),
                foo = new kendo.View('<span>Foo</span>', { show: function() { assert.isOk(true); } });

            layout.render();

            layout.showIn('#container', foo);
        });

        it("triggers view hide when replacing views", function() {
            var layout = new kendo.Layout("<div><span id='container' /></div>" ),
                foo = new kendo.View('<span>Foo</span>', { hide: function() { assert.isOk(true); } }),
                bar = new kendo.View('<span>Foo</span>');

            layout.render();

            layout.showIn('#container', foo);
            layout.showIn('#container', bar);
        });

        it("renders view in the root region", function() {
            var layout = new kendo.Layout("<div id='root'></div>", { wrap: false }),
                view = new kendo.View('<span id="baz">Baz</span>');

            layout.render();

            layout.showIn('#root', view);

            assert.equal(layout.element.html(), '<div>' + view.element.html() + '</div>');
        });
    });
}());
