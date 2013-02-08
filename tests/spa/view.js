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

    equal(view.render().html(), "Foo");
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
