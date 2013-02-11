module("View", {
    setup: function() {
        var templateElement = $('<script id="template" type="text/x-kendo-template">Foo</script>');
        $(document.body).append(templateElement);
    }
});

test("reads contents from a passed string", 1, function() {
    var view = new kendo.View({
        template: "<span>Foo</span>"
    });

    equal(view.render().html(), "<span>Foo</span>");
});

test("reads contents from a given script tag", 2, function() {
    var view = new kendo.View({
        template: "#template"
    });

    ok(view.render() instanceof jQuery);

    equal(view.render().html(), "Foo");
});

test("reuses element", 1, function() {
    var view = new kendo.View({
        template: "#template"
    });

    equal(view.render(), view.render());
});

test("renders a div", 1, function() {
    var view = new kendo.View({
        template: "#template"
    });

    ok(view.render().is("div"));
});

test("can render as any tag", 1, function() {
    var view = new kendo.View({
        template: "#template",
        tagName: "span"
    });

    ok(view.render().is("span"));
});

test("binds to a given model", 1, function() {
    var view = new kendo.View({
        template: "<i><a data-bind='click: foo'>Foo</a></i>",
        model: kendo.observable({ foo: function() { ok(true); } })
    });

    view.render().find("a").trigger("click");
});

test("unbinds handlers on destroy", 1, function() {
    var view = new kendo.View({
        template: "<i><a data-bind='click: foo'>Foo</a></i>",
        model: kendo.observable({ foo: function() { ok(true); } })
    });

    var el = view.render();

    el.find("a").trigger("click");

    view.destroy();

    el.find("a").trigger("click");
});

test("layout renders view in a given region", 1, function() {
    var layout = new kendo.Layout({ template: "<div><span id='foo' /><span id='bar' /></div>" }),
        view = new kendo.View({ template: '<span id="baz">Baz</span>' });

    layout.render();
    layout.showIn('#bar', view);

    equal(layout.element.find("#bar").html(), '<div>' + view.element.html() + '</div>');
});
