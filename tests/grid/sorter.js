(function() {
    var DataSource = kendo.data.DataSource,
        Sorter = kendo.ui.Sorter,
        button,
        dataSource;

    function setup(element, options) {
        return new Sorter(element || button.attr("data-field", "foo"), options || { dataSource: dataSource });
    }

    module("kendo.ui.Sorter", {
        setup: function() {
            dataSource = DataSource.create( { data: [ { foo: 2, bar: 2 }, { foo: 1, bar: 1 } ] } );
            button = $("<button />");
        },
        teardown: function() {
            kendo.destroy(button);
        }
    });

    test("clicking an item sorts by that field in asc dir", function() {
        var sorter = setup();
        button.click();

        equal(dataSource.view()[0].foo, 1);
    });

    test("sorting the data source assigns the dir data", function() {
        var sorter = setup();
        dataSource.sort( { field: "foo", dir: "desc" });
        equal(button.attr("data-dir"), "desc");
    });

    test("sorting twice clears the dir data", function() {
        var sorter = setup();
        dataSource.sort( { field: "foo", dir: "desc" });
        dataSource.sort( { field: "bar", dir: "desc" });
        equal(button.attr("data-dir"), undefined);
    });

    test("clicking changes the sort direction", function() {
        var sorter = setup();
        button.click();
        button.click();

        equal(button.attr("data-dir"), "desc");
    });

    test("desc changes to empty", function() {
        var sorter = setup(button.attr("data-field", "foo").attr("data-dir", "desc"));

        button.click();

        equal(button.attr("data-dir"), undefined);
    });

    test("clicking unsorted element sets its direrction to ascending", function() {
        var sorter = setup();
        button.click();

        equal(button.attr("data-dir"), "asc");
    });


    test("multiple sort mode", function() {
        var sorter = setup(button.attr("data-field", "foo"), { dataSource: dataSource, mode: "multiple" } );

        dataSource.sort( { field: "bar", dir: "asc" } );

        button.click();

        var sort = dataSource.sort();

        equal(sort.length, 2);
        equal(sort[0].field, "bar");
        equal(sort[1].field, "foo");
    });

    test("multiple sort mode and unsorting", function() {
        var sorter = setup(button.attr("data-field", "foo"), { dataSource: dataSource, mode: "multiple" } );

        dataSource.sort( [{ field: "bar", dir: "asc" }, { field: "foo", dir: "desc" } ] );

        button.click();

        var sort = dataSource.sort();

        equal(sort.length, 1);
        equal(sort[0].field, "bar");
    });

    test("compare option propagates to data source", function() {
        var sorter = setup(button.attr("data-field", "foo"), { dataSource: dataSource, compare: $.noop } );

        button.click();

        var sort = dataSource.sort();

        equal(sort[0].compare, $.noop);
    });

    test("dir changes to asc when allowUnsort is false", function() {
        var sorter = setup(button.attr("data-field", "foo").data("dir", "desc"), { dataSource: dataSource, allowUnsort: false } );

        button.click();

        equal(button.attr("data-dir"), "asc");
    });

    test("asc arrow is rendered", function() {
        var sorter = setup();
        button.click();

        equal(button.find("span.k-icon.k-i-arrow-n").length, 1);
    });

    test("desc arrow is rendered", function() {
        var sorter = setup();
        button.click();
        button.click();

        equal(button.find("span.k-icon.k-i-arrow-s").length, 1);
    });

    test("sort arrow is removed", function() {
        var sorter = setup();
        button.click();
        button.click();
        button.click();

        equal(button.find("span.k-icon.k-i-arrow-s").length, 0);
        equal(button.find("span.k-icon.k-i-arrow-n").length, 0);
    });

    test("multiple sorting on same field", function() {
        var sorter = setup(button.attr("data-field", "foo"), { dataSource: dataSource, mode: "multiple", allowUnsort: true } );

        button.click().click();

        var sort = dataSource.sort();

        equal(sort.length, 1);
        equal(sort[0].field, "foo");
        equal(sort[0].dir, "desc");
    });

    test("mode:multiple unsorting field", function() {
        var sorter = setup(button.attr("data-field", "foo"), { dataSource: dataSource, mode: "multiple", allowUnsort: true } );

        button.click().click().click();

        var sort = dataSource.sort();

        equal(sort.length, 0);
    });

    test("multiple sorting on same field allowUnsort: false", function() {
        var sorter = setup(button.attr("data-field", "foo"), { dataSource: dataSource, mode: "multiple", allowUnsort: false } );

        button.click().click();

        var sort = dataSource.sort();

        equal(sort.length, 1);
        equal(sort[0].field, "foo");
        equal(sort[0].dir, "desc");
    });

    test("mode:multiple unsorting field allowUnsort: false", function() {
        var sorter = setup(button.attr("data-field", "foo"), { dataSource: dataSource, mode: "multiple", allowUnsort: false } );

        button.click().click().click();

        var sort = dataSource.sort();

        equal(sort.length, 1);
        equal(sort[0].field, "foo");
        equal(sort[0].dir, "asc");
    });

    test("aria-sort is not set when not sorted", function() {
        var sorter = setup(button.attr("data-field", "foo"), { dataSource: dataSource, aria: true } );

        button;

        ok(!button.attr("aria-sort"));
    });

    test("aria-sort ascending is set", function() {
        var sorter = setup(button.attr("data-field", "foo"), { dataSource: dataSource, aria: true } );

        button.click();

        equal(button.attr("aria-sort"), "ascending");
    });

    test("aria-sort descending is set", function() {
        var sorter = setup(button.attr("data-field", "foo"), { dataSource: dataSource, aria: true } );

        button.click().click();

        equal(button.attr("aria-sort"), "descending");
    });

    test("aria-sort is not applied when not enabled", function() {
        var sorter = setup(button.attr("data-field", "foo"), { dataSource: dataSource } );

        button.click();

        equal(button.attr("aria-sort"), "ascending");
    });

    test("clicking element which does not match the filter has no effect", function() {
        var sorter = setup(button.attr("data-field", "foo").addClass("k-column-active"), {
            dataSource: dataSource,
            filter: ":not(.k-column-active)"
        } );

        button.click();

        var sort = dataSource.sort();

        ok(!sort);
    });

})();
