(function() {
    var MultiSelect = kendo.ui.MultiSelect,
        select;

    function popuplateSelect() {
        var options = [];
        for (var i=0; i < 5; i++) {
            options.push("<option value='" + i + "'>Option" + i + "</option>");
        }

        select.html(options);
    }

    module("kendo.ui.MultiSelect Initialization", {
        setup: function() {
            kendo.ns = "";
            select = $("<select multiple />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            if (select.data("kendoMultiSelect")) {
                select.data("kendoMultiSelect").destroy();
            }

            select.parents(".k-widget").remove();
        }
    });

    test("MultiSelect wraps input element", function() {
        var multiselect = new MultiSelect(select),
            wrapper = multiselect.wrapper;

        equal(wrapper[0].nodeName, "DIV");
        ok(wrapper.hasClass("k-widget"));
        ok(wrapper.hasClass("k-header"));
        ok(wrapper.hasClass("k-multiselect"));
    });

    test("MultiSelect copies className of the element to the wrapper", function() {
        var multiselect = new MultiSelect(select.addClass("test")),
            wrapper = multiselect.wrapper;

        ok(wrapper.hasClass("test"));
    });

    test("MultiSelect shows wrapper even if element is hidden", function() {
        var multiselect = new MultiSelect(select.hide()),
            wrapper = multiselect.wrapper;

        ok(wrapper.is(":visible"));
    });

    test("MultiSelect creates ul", function() {
        var multiselect = new MultiSelect(select);

        ok(multiselect.tagList);
    });

    test("MultiSelect wraps tagList and clears float", function() {
        var multiselect = new MultiSelect(select);

        ok(multiselect.tagList.parent().hasClass("k-multiselect-wrap"));
        ok(multiselect.tagList.parent().hasClass("k-floatwrap"));
    });

    test("MultiSelect appends ul to the wrapper", function() {
        var multiselect = new MultiSelect(select);

        equal(multiselect._innerWrapper.children().first()[0], multiselect.tagList[0]);
    });

    test("MultiSelect creates input element", function() {
        var multiselect = new MultiSelect(select);

        ok(multiselect.input);
        ok(multiselect.input.attr("autocomplete"), "off");
    });

    test("MultiSelect appends input to the wrapper", function() {
        var multiselect = new MultiSelect(select);

        equal(multiselect._innerWrapper.children().eq(1)[0], multiselect.input[0]);
    });

    test("MultiSelect builds templates", function() {
        var multiselect = new MultiSelect(select);

        ok(multiselect.itemTemplate);
        ok(multiselect.tagTemplate);
    });

    test("MultiSelect renders header template", function() {
        var multiselect = new MultiSelect(select, {
            template: "#= data.toUpperCase() #",
            headerTemplate: "<div>Header</div>"
        });

        var list = multiselect.list;

        equal(list.children()[0].outerHTML, "<div>Header</div>");
    });

    test("MultiSelect creates DataSource", function() {
        var multiselect = new MultiSelect(select);

        ok(multiselect.dataSource);
    });

    test("MultiSelect binds DataSource if autoBind: true", function() {
        popuplateSelect();
        var multiselect = new MultiSelect(select);

        equal(multiselect.ul.children().length, select.children().length);
    });

    test("MultiSelect creates popup", function() {
        var multiselect = new MultiSelect(select);

        ok(multiselect.popup);
        ok(multiselect.popup instanceof kendo.ui.Popup);
        equal(multiselect.popup.options.anchor[0], multiselect.wrapper[0]);
        equal(multiselect.popup.element[0], multiselect.list[0]);
    });

    test("MultiSelect initializes an UL for its items", function() {
        select.attr("id", "multiselect");
        var multiselect = new MultiSelect(select);

        ok(multiselect.ul);
        ok(multiselect.ul.is("ul"));
        ok(multiselect.list.attr("id"), select.attr("id") + "-list");
        equal(multiselect.ul.css("overflow"), "auto");
    });

    test("MultiSelect calls value method on init", function() {
        popuplateSelect();
        var multiselect = new MultiSelect(select, {
            value: "0"
        });

        equal(multiselect.tagList.children().length, 1);
    });

    test("MultiSelect creates _searchText", function() {
        popuplateSelect();
        var multiselect = new MultiSelect(select),
            searchText = multiselect._span,
            input = multiselect.input;

        equal(searchText.css("position"), "absolute");
        equal(searchText.css("visibility"), "hidden");
        equal(searchText.css("top"), "-3333px");
        equal(searchText.css("left"), "-3333px");
        equal(searchText.css("font-size"), input.css("font-size"));
        equal(searchText.css("font-style"), input.css("font-style"));
        equal(searchText.css("font-weight"), input.css("font-weight"));
        equal(searchText.css("font-family"), input.css("font-family"));
        equal(searchText.css("line-heigth"), input.css("line-heigth"));
        equal(searchText.css("text-transform"), input.css("text-transform"));
        equal(searchText.css("letter-spacing"), input.css("letter-spacing"));
    });


    /*test("multiselect can be initialized in hidden container", function() {
        popuplateSelect();

        var div = $("<div style='display: none'></div>").appendTo(QUnit.fixture),
            multiselect = select.appendTo(div).kendoMultiSelect().data("kendoMultiSelect");

        div.show();
        multiselect.popup.open();

        equal(multiselect.popup.element.parent().width(), multiselect.wrapper.width());
    });*/

    test("multiselect does not set width if list has style.width", function() {
        popuplateSelect();
        var multiselect = select.kendoMultiSelect().data("kendoMultiSelect");

        multiselect.list.width(400);

        multiselect.open();

        equal(multiselect.list.width(), 400);
    });

    test("MultiSelect sets static height to the list", function() {
        var dataSource = new kendo.data.DataSource.create([1, 2, 3, 4, 5]);
        dataSource.read();

        var multiselect = select.kendoMultiSelect({
            autoBind: false,
            dataSource: dataSource,
            template: "<div style='height:30px'><%= data %> </div>",
            height: 50
        }).data("kendoMultiSelect");

        multiselect.refresh();

        equal(multiselect.list.height(), 50);
    });

    test("MultiSelect shrinks ul if the height of the items is more then options.height", function() {
        popuplateSelect();
        var multiselect = select.kendoMultiSelect().data("kendoMultiSelect");
        multiselect.options.height = 50;

        multiselect.refresh();

        equal(multiselect.list.css("height"), "50px");
    });

    test("MultiSelect uses select.value on init", function() {
        popuplateSelect();
        select.val("0");

        var multiselect = new MultiSelect(select);

        equal(multiselect.tagList.children().length, 1);
    });

    test("MultiSelect creates loading element", function() {
        popuplateSelect();
        var multiselect = new MultiSelect(select);

        ok(multiselect._loading);
    });

    test("MultiSelect creates loading element", function() {
        popuplateSelect();
        var multiselect = new MultiSelect(select);

        ok(multiselect._loading);
    });

    test("MultiSelect disables widget on init", function() {
        popuplateSelect();
        var multiselect = new MultiSelect(select.attr("disabled", "disabled"));

        ok(multiselect.input.attr("disabled"));
    });

    test("MultiSelect  disables on init", function() {
       select.kendoMultiSelect({
            enabled: false
       });

       ok(select.data("kendoMultiSelect").input.attr("disabled"));
   });

    asyncTest("MultiSelect shows loading icon on progress", function() {
        popuplateSelect();
        var multiselect = new MultiSelect(select);

        multiselect.dataSource.trigger("progress");

        setTimeout(function() {
            ok(!multiselect._loading.hasClass("k-loading-hidden"));
            start();
        }, 200);
    });

    asyncTest("MultiSelect hides loading icon on dataSource change", function() {
        popuplateSelect();
        var multiselect = new MultiSelect(select);

        multiselect._showBusy();

        setTimeout(function() {
            multiselect.refresh();
            ok(multiselect._loading.hasClass("k-loading-hidden"));
            start();
        }, 200);
    });

    asyncTest("form reset support", 2, function() {
        popuplateSelect();

        select[0].children[1].setAttribute("selected", "selected");
        select[0].children[2].setAttribute("selected", "selected");

        var form = $("<form/>").appendTo(document.documentElement).append(select),
            multiselect = new MultiSelect(select);

        multiselect.value(["3","4"]);
        form[0].reset();

        setTimeout(function() {
            ok(select[0].children[1].selected);
            ok(select[0].children[2].selected);
            start();
        }, 150);
    });

    asyncTest("reset support for form defined by attribute", 2, function() {
        popuplateSelect();

        select[0].children[1].setAttribute("selected", "selected");
        select[0].children[2].setAttribute("selected", "selected");

        select.attr("form", "form1");
        var form = $('<form id="form1"/>').appendTo(document.documentElement),
            multiselect = new MultiSelect(select);

        multiselect.value(["3","4"]);
        form[0].reset();

        setTimeout(function() {
            ok(select[0].children[1].selected);
            ok(select[0].children[2].selected);
            start();
        }, 150);
    });

    asyncTest("form reset support does not remove place2older", 1, function() {
        popuplateSelect();

        var form = $("<form/>").appendTo(document.documentElement).append(select);
        var multiselect = new MultiSelect(select, {
            placeholder: "Select..."
        });

        form[0].reset();

        setTimeout(function() {
            equal(multiselect.input.val(), "Select...");
            start();
        }, 150);
    });

    test("persist tabIndex of the original element", function() {
        var multiselect = new MultiSelect($("<select tabindex='5'/>").appendTo(QUnit.fixture));

        var input = multiselect.input;

        equal(input.attr("tabIndex"), 5);
        multiselect.destroy();
    });

    test("do not highlight first on open", function() {
        popuplateSelect();
        var multiselect = new MultiSelect(select, { highlightFirst: false });

        multiselect.open();

        equal(multiselect.current(), null);
    });

    test("do not highlight first item on refresh", function() {
        popuplateSelect();
        var multiselect = new MultiSelect(select, { highlightFirst: false });

        multiselect.open();
        multiselect.refresh();

        equal(multiselect.current(), null);
    });

    test("Copy accesskey to the visible input", function() {
        popuplateSelect();
        var multiselect = new MultiSelect(select.attr("accesskey", "w"), { highlightFirst: false });

        ok(!multiselect.element.attr("accesskey"));
        equal(multiselect.input.attr("accesskey"), "w");
    });

    test("Scales correctly input element when init in hidden element", function() {
        var div = $("<div style='display:none'/>").appendTo(document.documentElement);
        div.append(select);
        var multiselect = new MultiSelect(select, { placeholder: "Select something..." });

        ok(multiselect.input.width() > 50);
    });

    test("MultiSelect honors readonly attribute", function() {
        var multiselect = new MultiSelect(select.attr("readonly", true));

        equal(multiselect.element.attr("readonly"), "readonly");
        equal(multiselect.element.attr("disabled"), undefined);
    });

    test("MultiSelect uses disabled attr over the readonly", function() {
        var multiselect = new MultiSelect(select.attr("readonly", true).attr("disabled", true));

        equal(select.attr("readonly"), undefined);
    });

    test("MultiSelect binds to simple data passed to value option if autoBind is false", function() {
        var multiselect = new MultiSelect(select, {
            autoBind: false,
            value: [
                "Item1",
                "Item3"
            ]
        });

        equal(multiselect.element.children().length, 2);
        equal(multiselect.dataItems().length, 2);
    });

    test("MultiSelect selects an item which value field is an empty string", function() {
        var multiselect = new MultiSelect(select, {
            dataTextField: "text",
            dataValueField: "id",
            dataSource: [
                { id: "", text: "text" },
                { id: "1", text: "text1" }
            ],
            value: [""]
        });

        ok(multiselect.element.children().first()[0].selected);
        equal(multiselect.value(), "");
    });

    test("MultiSelect binds to complex data passed to value option if autoBind is false", function() {
        var multiselect = new MultiSelect(select, {
            autoBind: false,
            dataValueField: "optionID",
            dataTextField: "optionText",
            value: [
                { optionID: "1", optionText: "Item1" },
                { optionID: "2", optionText: "Item2" }
            ]
        });

        equal(multiselect.element.children().length, 2);
        equal(multiselect.dataItems().length, 2);
        equal(multiselect.value()[0], "1");
        equal(multiselect.value()[1], "2");
    });

    test("MultiSelect binds to complex object passed to value option if autoBind is false", function() {
        var multiselect = new MultiSelect(select, {
            autoBind: false,
            dataValueField: "optionID",
            dataTextField: "optionText",
            value: { optionID: "2", optionText: "Item2" }
        });

        equal(multiselect.element.children().length, 1);
        equal(multiselect.dataItems().length, 1);
        equal(multiselect.value()[0], "2");
    });

    test("MultiSelect selects value even when values contains complex objects", function() {
        var multiselect = new MultiSelect(select, {
            dataSource: [
                { optionID: "1", optionText: "Item1" },
                { optionID: "2", optionText: "Item2" }
            ],
            dataValueField: "optionID",
            dataTextField: "optionText",
            value: [
                { optionID: "1", optionText: "Item1" },
                { optionID: "2", optionText: "Item2" }
            ]
        });

        equal(multiselect.element.children().length, 2);
        equal(multiselect.dataItems().length, 2);
        equal(multiselect.value()[0], "1");
        equal(multiselect.value()[1], "2");
    });

    test("MultiSelect does nothing if autoBind:false and simple strings is set as value", function() {
        var multiselect = new MultiSelect(select, {
            autoBind: false,
            dataValueField: "optionID",
            dataTextField: "optionText",
            value: ["1", "2"]
        });

        equal(multiselect.element.children().length, 0);
        equal(multiselect.dataItems().length, 0);
    });

    test("MultiSelect fetches data source on first search when autoBind: false and serverFiltering: false", 1, function() {
        var multiselect = new MultiSelect(select, {
            autoBind: false,
            minLength: 3,
            dataSource: {
                serverFiltering: false,
                transport: {
                    read: function() {
                        ok(true);
                    }
                }
            },
            dataValueField: "optionID",
            dataTextField: "optionText",
            value: [
                { optionID: "1", optionText: "Item1" },
                { optionID: "2", optionText: "Item2" }
            ]
        });

        multiselect.search("test");
    });
})();
