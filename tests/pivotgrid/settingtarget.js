(function() {
    var PivotSettingTarget = kendo.ui.PivotSettingTarget,
        div;

    module("PivotSettingTarget", {
        setup: function() {
            kendo.ns = "kendo-";
            div = document.createElement("div");
            QUnit.fixture[0].appendChild(div);
        },
        teardown: function() {
            var component = $(div).data("kendoPivotSettingTarget");
            if (component) {
                component.destroy();
            }
            kendo.destroy(QUnit.fixture);
            kendo.ns = "";
        }
    });

    test("pivotsettingtarget object is attached", function() {
        new PivotSettingTarget($(div), {});

        ok($(div).data("kendoPivotSettingTarget") instanceof PivotSettingTarget);
    });

    test("renders the setting", function() {
        var dataSource = new kendo.data.PivotDataSource({
            columns: ["foo", "bar"]
        });

        var setting = new PivotSettingTarget($(div), {
            dataSource: dataSource,
            setting: "columns"
        });

        dataSource.fetch();

        var children = $(div).children();

        equal(children.length, 2);
        ok(children.eq(0).is("div"));
        ok(children.eq(0).text(), "foo");
        ok(children.eq(1).is("div"));
        ok(children.eq(1).text(), "bar");
    });

    test("renders setting name as data attribute", function() {
        var dataSource = new kendo.data.PivotDataSource({
            columns: ["foo", "bar"]
        });

        var setting = new PivotSettingTarget($(div), {
            dataSource: dataSource,
            setting: "columns"
        });

        dataSource.fetch();

        var children = $(div).children();

        equal(children.length, 2);
        ok(children.eq(0).attr(kendo.attr("name")), "foo");
        ok(children.eq(1).attr(kendo.attr("name")), "bar");
    });

    test("renders the datasource settings using the template", function() {
        var dataSource = new kendo.data.PivotDataSource({
            columns: ["foo", "bar"]
        });

        var setting = new PivotSettingTarget($(div), {
            dataSource: dataSource,
            setting: "columns",
            template: "<span>${name}</span>"
        });

        dataSource.fetch();

        var children = $(div).children();

        equal(children.length, 2);
        ok(children.eq(0).is("span"));
        ok(children.eq(0).text(), "foo");
        ok(children.eq(1).is("span"));
        ok(children.eq(1).text(), "bar");
    });

    test("renders the columns by default", function() {
        var dataSource = new kendo.data.PivotDataSource({
            columns: ["foo", "bar"]
        });

        var setting = new PivotSettingTarget($(div), {
            dataSource: dataSource
        });

        dataSource.fetch();

        var children = $(div).children();

        equal(children.length, 2);
        ok(children.eq(0).is("div"));
        ok(children.eq(0).text(), "foo");
        ok(children.eq(1).is("div"));
        ok(children.eq(1).text(), "bar");
    });

    test("renders the measures by default", function() {
        var dataSource = new kendo.data.PivotDataSource({
            measures: ["foo", "bar"]
        });

        var setting = new PivotSettingTarget($(div), {
            dataSource: dataSource,
            setting: "measures"
        });

        dataSource.fetch();

        var children = $(div).children();

        equal(children.length, 2);
        ok(children.eq(0).is("div"));
        ok(children.eq(0).text(), "foo");
        ok(children.eq(1).is("div"));
        ok(children.eq(1).text(), "bar");
    });

    test("renders without binding the datasource", function() {
        var dataSource = new kendo.data.PivotDataSource({
            columns: ["foo", "bar"]
        });

        var setting = new PivotSettingTarget($(div), {
            dataSource: dataSource
        });

        var children = $(div).children();

        equal(children.length, 2);
        ok(children.eq(0).is("div"));
        ok(children.eq(0).text(), "foo");
        ok(children.eq(1).is("div"));
        ok(children.eq(1).text(), "bar");
    });

    test("changing the datasource setting updates the ui", function() {
        var dataSource = new kendo.data.PivotDataSource({
            columns: ["foo", "bar"]
        });

        var setting = new PivotSettingTarget($(div), {
            dataSource: dataSource
        });

        dataSource.columns("baz");

        var children = $(div).children();

        equal(children.length, 1);
        ok(children.eq(0).is("div"));
        ok(children.eq(0).text(), "baz");
    });

    test("add updates the datasource setting", function() {
        var dataSource = new kendo.data.PivotDataSource({
            columns: ["foo", "bar"]
        });

        var setting = new PivotSettingTarget($(div), {
            dataSource: dataSource,
            setting: "columns"
        });

        setting.add("baz");

        var columns = dataSource.columns();

        equal(columns.length, 3);
        equal(columns[0].name, "foo");
        equal(columns[1].name, "bar");
        equal(columns[2].name, "baz");
    });

    test("add does not add duplicate values", function() {
        var dataSource = new kendo.data.PivotDataSource({
            columns: ["foo", "bar"]
        });

        var setting = new PivotSettingTarget($(div), {
            dataSource: dataSource,
            setting: "columns"
        });

        setting.add("bar");

        var columns = dataSource.columns();

        equal(columns.length, 2);
        equal(columns[0].name, "foo");
        equal(columns[1].name, "bar");
    });

    test("add does not change datasource for duplicate values", 0, function() {
        var dataSource = new kendo.data.PivotDataSource({
            columns: ["foo", "bar"]
        });

        var setting = new PivotSettingTarget($(div), {
            dataSource: dataSource,
            setting: "columns"
        });

        dataSource.bind("change", function() {
            ok(false);
        });

        setting.add("bar");
    });

    test("add supports adding measures", function() {
        var dataSource = new kendo.data.PivotDataSource({
            measures: ["foo", "bar"]
        });

        var setting = new PivotSettingTarget($(div), {
            dataSource: dataSource,
            setting: "measures"
        });

        setting.add("baz");

        var measures = dataSource.measures();

        equal(measures.length, 3);
        equal(measures[0], "foo");
        equal(measures[1], "bar");
        equal(measures[2], "baz");
    });

    test("add skips duplicate measures", function() {
        var dataSource = new kendo.data.PivotDataSource({
            measures: ["foo", "bar"]
        });

        var setting = new PivotSettingTarget($(div), {
            dataSource: dataSource,
            setting: "measures"
        });

        setting.add("bar");

        var measures = dataSource.measures();

        equal(measures.length, 2);
        equal(measures[0], "foo");
        equal(measures[1], "bar");
    });

    test("remove updates the datasource", function() {
        var dataSource = new kendo.data.PivotDataSource({
            columns: ["foo", "bar"]
        });

        var setting = new PivotSettingTarget($(div), {
            dataSource: dataSource
        });

        setting.remove("bar");

        var columns = dataSource.columns();

        equal(columns.length, 1);
        equal(columns[0].name, "foo");
    });

    test("remove measure updates the datasource", function() {
        var dataSource = new kendo.data.PivotDataSource({
            measures: ["foo", "bar"]
        });

        var setting = new PivotSettingTarget($(div), {
            dataSource: dataSource,
            setting: "measures"
        });

        setting.remove("bar");

        var measures = dataSource.measures();

        equal(measures.length, 1);
        equal(measures[0], "foo");
    });

    test("remove does not change datasource for non existing values", 0, function() {
        var dataSource = new kendo.data.PivotDataSource({
            columns: ["foo", "bar"]
        });

        var setting = new PivotSettingTarget($(div), {
            dataSource: dataSource,
            setting: "columns"
        });

        dataSource.bind("change", function() {
            ok(false);
        });

        setting.remove("moo");
    });

    test("attach sortable to the element",  function() {
        var setting = new PivotSettingTarget($(div), {});
        ok($(div).data("kendoSortable"));
    });

    test("enabled false does not attach sortable",  function() {
        var setting = new PivotSettingTarget($(div), {
            enabled: false
        });

        ok(!$(div).data("kendoSortable"));
    });

    test("connectWith is set to the sortable",  function() {
        var setting = new PivotSettingTarget($(div), {
            connectWith: "foo"
        });

        equal(setting.sortable.options.connectWith, "foo");
    });

    test("adding item via sortable calls the add method",  function() {
        var setting = new PivotSettingTarget($(div), {});

        var method = stub(setting, "add");

        setting.sortable.trigger("change", {
           item: $("<span data-kendo-name='foo'></span"),
           action: "receive"
        });

        equal(method.calls("add"), 1);
        equal(method.args("add", 0)[0], "foo");
    });

    test("removing item via sortable calls the remove method",  function() {
        var setting = new PivotSettingTarget($(div), {});

        var method = stub(setting, "remove");

        setting.sortable.trigger("change", {
           item: $("<span data-kendo-name='foo'></span"),
           action: "remove"
        });

        equal(method.calls("remove"), 1);
        equal(method.args("remove", 0)[0], "foo");
    });

    test("move updates the dataSource", function() {
        var dataSource = new kendo.data.PivotDataSource({
            columns: ["foo", "bar"]
        });

        var setting = new PivotSettingTarget($(div), {
            dataSource: dataSource
        });

        setting.move("bar", 0);

        var columns = dataSource.columns();

        equal(columns.length, 2);
        equal(columns[0].name, "bar");
        equal(columns[1].name, "foo");
    });

    test("sorting item via sortable calls the move method",  function() {
        var dataSource = new kendo.data.PivotDataSource({
            columns: ["foo", "bar"]
        });

        var setting = new PivotSettingTarget($(div), {});

        var method = stub(setting, "move");

        setting.sortable.trigger("change", {
           item: $("<span data-kendo-name='bar'></span"),
           action: "sort",
           newIndex: 0
        });

        equal(method.calls("move"), 1);
        equal(method.args("move", 0)[0], "bar");
        equal(method.args("move", 0)[1], 0);
    });

    test("renders empty template if not settings", function() {
        var dataSource = new kendo.data.PivotDataSource({ });

        var setting = new PivotSettingTarget($(div), {
            dataSource: dataSource
        });

        var children = $(div).children();

        equal(children.length, 1);
        equal(children.first().text(), "Drop Fields Here");
        ok(children.first().hasClass("k-empty"));
    });

    test("empty template uses the empty message", function() {
        var dataSource = new kendo.data.PivotDataSource({ });

        var setting = new PivotSettingTarget($(div), {
            dataSource: dataSource,
            messages: {
                empty: "foo"
            }
        });

        var children = $(div).children();

        equal(children.length, 1);
        equal(children.first().text(), "foo");
    });

    test("clicking delete button on the item removes it", function() {
        var dataSource = new kendo.data.PivotDataSource({
            columns: ["foo", "bar"]
        });

        var setting = new PivotSettingTarget($(div), {
            dataSource: dataSource
        });

        var children = $(div).children().find(".k-group-delete:first").click();

        equal(dataSource.columns().length, 1);
        equal(dataSource.columns()[0].name, "bar");
    });

    test("validate returns true for measures setting and measure(dimension)", function() {
        var setting = new PivotSettingTarget($(div), {
            setting: "measures"
        });

        ok(setting.validate({ type: 2 }));
    });

    test("validate returns true for columns setting and non measure", function() {
        var setting = new PivotSettingTarget($(div), {
            setting: "columns"
        });

        ok(setting.validate({ name: "foo" }));
    });

    test("validate returns false for columns setting and measure", function() {
        var setting = new PivotSettingTarget($(div), {
            setting: "columns"
        });

        ok(!setting.validate({ type: 2 }));
        ok(!setting.validate({ aggregator: 2 }));
    });

    test("validate returns false for rows setting and measure", function() {
        var setting = new PivotSettingTarget($(div), {
            setting: "rows"
        });

        ok(!setting.validate({ type: 2 }));
        ok(!setting.validate({ aggregator: 2 }));
    });

    test("validate returns true for measures setting and measure", function() {
        var setting = new PivotSettingTarget($(div), {
            setting: "measures"
        });

        ok(setting.validate({ aggregator: 2 }));
    });

    test("validate returns false for measures setting and non measure", function() {
        var setting = new PivotSettingTarget($(div), {
            setting: "measures"
        });

        ok(!setting.validate({ name: "foo" }));
    });

    test("validate returns false if setting is already added", function() {
        var dataSource = new kendo.data.PivotDataSource({
            columns: ["foo", "bar"]
        });

        var setting = new PivotSettingTarget($(div), {
            dataSource: dataSource
        });

        ok(!setting.validate({ uniqueName: "foo" }));
        ok(!setting.validate({ defaultHierarchy: "bar" }));
    });

    test("validate returns false if setting is already added as another type", function() {
        var dataSource = new kendo.data.PivotDataSource({
            columns: ["foo", "bar"]
        });

        var setting = new PivotSettingTarget($(div), {
            dataSource: dataSource,
            setting: "rows"
        });

        ok(!setting.validate({ uniqueName: "foo" }));
        ok(!setting.validate({ defaultHierarchy: "bar" }));
    });

})();
