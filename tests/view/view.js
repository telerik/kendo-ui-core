(function() {
    module("View", {
        setup: function() {
            var contentElement = $('<script id="content" type="text/x-kendo-template">Foo</script>');
            $(QUnit.fixture).append(contentElement);
        },

        teardown: function() {
            $('#content').remove();
        }
    });

    test("reads contents from a passed string", 1, function() {
        var view = new kendo.View("<span>Foo</span>");

        equal(view.render().html(), "<span>Foo</span>");
    });

    test("wraps passed tags in a single element", 1, function() {
        var view = new kendo.View("<span>Foo</span><span>Bar</span>");
        equal(view.render().length, 1);
    });

    test("keeps DOM element when rendered by default", 1, function() {
        $('#content').remove();
        $(document.body).append('<div id="content">Foo</div>');
        var view = new kendo.View("content", { wrap: false });
        view.render();
        equal($('#content').length, 1);
    });

    test("supports tag hoch-poch", 1, function() {
        var html = 'foo<br><textarea id="html_editor" cols="50" rows="10"></textarea><br>bar',
            view = new kendo.View(html);

        equal(view.render().html(), html);
    });

    test("reads contents from a given script tag", 2, function() {
        var view = new kendo.View("#content");

        ok(view.render() instanceof jQuery);

        equal(view.render().html(), "Foo");
    });

    test("accepts id without #", 2, function() {
        var view = new kendo.View("content");

        ok(view.render() instanceof jQuery);

        equal(view.render().html(), "Foo");
    });

    test("reuses element", 1, function() {
        var view = new kendo.View("#content");

        equal(view.render(), view.render());
    });

    test("renders a div", 1, function() {
        var view = new kendo.View("#content");

        ok(view.render().is("div"));
    });

    test("can render as any tag", 1, function() {
        var view = new kendo.View( "#content", { tagName: "span" });

        ok(view.render().is("span"));
    });

    test("skips template expressions unless flag is enabled", 1, function() {
        var view = new kendo.View("#: foo #", {model: { foo: "foo" }});

        equal(view.render().html(), "#: foo #");
    });

    test("evaluates template expressions against the passed view model", 1, function() {
        var view = new kendo.View("#: foo #", {model: { foo: "foo" }, evalTemplate: true });

        equal(view.render().html(), "foo");
    });

    test("evaluates template expressions against the passed view model in elements", 1, function() {
        var view = new kendo.View("<span>#: foo #</span>", {model: { foo: "foo" }, evalTemplate: true });

        equal(view.render().html(), "<span>foo</span>");
    });

    test("can skip wrapping", 2, function() {
        var view = new kendo.View("<span id='foo'>Foo</span>", { wrap: false });

        ok(view.render().is("span"));
        equal(view.render().attr("id"), 'foo');
    });

    test("binds to a given model", 1, function() {
        var view = new kendo.View( "<i><a data-bind='click: foo'>Foo</a></i>", { model: kendo.observable({ foo: function() { ok(true); } }) });

        view.render().find("a").trigger("click");
    });

    test("unbinds handlers on destroy", 2, function() {
        var view = new kendo.View( "<i><a data-role='touch' data-bind='events: {tap: foo}'>Foo</a></i>", { model: kendo.observable({ foo: function() { ok(true); } }) });

        var el = view.render();

        el.find("a").trigger("mousedown");
        el.find("a").trigger("mouseup");

        view.destroy();

        el.find("a").trigger("mousedown");
        el.find("a").trigger("mouseup");
        equal(el.find("a").data("kendoTouch"), null);
    });

    test("destroys widgets on destroy", 1, function() {
        var view = new kendo.View( "<i><a data-bind='click: foo'>Foo</a></i>", { model: kendo.observable({ foo: function() { ok(true); } }) });

        var el = view.render();

        el.find("a").trigger("click");

        view.destroy();

        el.find("a").trigger("click");
    });

    test("triggers init when rendered initially", 1, function() {
        var view = new kendo.View( "<i />", { init: function() { ok(true); } });

        view.render();
        view.render();
    });

    test("triggers show when rendered", 2, function() {
        var view = new kendo.View( "<i />", { show: function() { ok(true); } });

        view.render("#foo");
        view.render("#bar");
    });

    module("Layout", { });

    test("renders view in a given region", 1, function() {
        var layout = new kendo.Layout("<div><span id='container' /></div>" ),
            view = new kendo.View('<span id="baz">Baz</span>');

        layout.render();

        layout.showIn('#container', view);

        equal(layout.element.find("#container").html(), '<div>' + view.element.html() + '</div>');
    });

    test("triggers init when the view is available in the DOM", 1, function() {
        var layout = new kendo.Layout("<div><span id='container' /></div>" ),
            foo = new kendo.View('<span id="foo">Foo</span>', { init: function() { equal(layout.element.find("#foo").length, 1); } });

        layout.render();

        layout.showIn('#container', foo);
    });

    test("triggers view show when replacing views", 1, function() {
        var layout = new kendo.Layout("<div><span id='container' /></div>" ),
            foo = new kendo.View('<span>Foo</span>', { show: function() { ok(true); } });

        layout.render();

        layout.showIn('#container', foo);
    });

    test("triggers view hide when replacing views", 1, function() {
        var layout = new kendo.Layout("<div><span id='container' /></div>" ),
            foo = new kendo.View('<span>Foo</span>', { hide: function() { ok(true); } }),
            bar = new kendo.View('<span>Foo</span>');

        layout.render();

        layout.showIn('#container', foo);
        layout.showIn('#container', bar);
    });

    test("renders view in the root region", 1, function() {
        var layout = new kendo.Layout("<div id='root'></div>", { wrap: false }),
            view = new kendo.View('<span id="baz">Baz</span>');

        layout.render();

        layout.showIn('#root', view);

        equal(layout.element.html(), '<div>' + view.element.html() + '</div>');
    });
})();
