(function() {
    var DropDownList = kendo.ui.DropDownList,
        parent, child, third,
        datasource;

    function mockedDataSource() {
        return {
            transport: {
                read: function(options) {
                    setTimeout(function() {
                        options.success([
                            { text: "item1", id: 1 },
                            { text: "item2", id: 1 },
                            { text: "item3", id: 2 },
                            { text: "item4", id: 2 }
                        ]);
                    }, 1);
                }
            }
        };
    }

    module("kendo.ui.DropDownLists Cascading DropDownLists", {
        setup: function() {
            kendo.ns = "kendo-";
            parent = $("<input id='parent' />").appendTo(QUnit.fixture);
            child = $("<input id='child' />").appendTo(QUnit.fixture);
            third = $("<input />").appendTo(QUnit.fixture);
            datasource = mockedDataSource();
        },

        teardown: function() {
            kendo.ns = "";
            if (parent.data("kendoDropDownList")) {
                parent.data("kendoDropDownList").destroy();
            }
            if (child.data("kendoDropDownList")) {
                child.data("kendoDropDownList").destroy();
            }

            if (third.data("kendoDropDownList")) {
                third.data("kendoDropDownList").destroy();
            }

            parent.closest(".k-widget").remove();
            child.closest(".k-widget").remove();
            third.closest(".k-widget").remove();
       }
    });

    test("Clear child ddl if no data after filtration", function() {
        parent.kendoDropDownList({
            dataTextField: "parentID",
            dataValueField: "parentID",
            dataSource: [
                { parentID: 1 },
                { parentID: 2 }
            ]
        });

        child.kendoDropDownList({
            cascadeFrom: "parent", //id of the parent
            dataTextField: "childID",
            dataValueField: "id",
            optionLabel: "Select",
            dataSource:  [
                { parentID: 1, childID: "1", id: 1 },
                { parentID: 1, childID: "3", id: 2 }
            ]
        });

        var parentCB = parent.data("kendoDropDownList");
        var childCB = child.data("kendoDropDownList");

        //select first item
        parentCB.select(0);

        //select first item
        childCB.select(0);

        //select second item
        parentCB.select(1);

        equal(childCB.value(), "");
        equal(childCB.text(), "Select");
    });

    test("Select optionLabel if no data", function() {
        parent.kendoDropDownList({
            dataTextField: "parentID",
            dataValueField: "parentID",
            autoBind: false,
            dataSource: [
                { parentID: 1 },
                { parentID: 2 },
                { parentID: 3 }
            ]
        });

        child.kendoDropDownList({
            cascadeFrom: "parent", //id of the parent
            dataTextField: "childID",
            dataValueField: "id",
            optionLabel: "Select",
            autoBind: false,
            dataSource:  [
                { parentID: 1, childID: "1", id: 1 },
                { parentID: 1, childID: "3", id: 2 }
            ]
        });

        var parentCB = parent.data("kendoDropDownList"),
            childCB = child.data("kendoDropDownList");


        //select first item
        parentCB.select(2);
        parentCB.trigger("change");

        equal(childCB.value(), "");
        equal(childCB.text(), "Select");
    });

    test("Child widget selects first option after it was empty", 2, function() {
        parent.kendoDropDownList({
            dataTextField: "parentID",
            dataValueField: "parentID",
            dataSource: [
                { parentID: 1 },
                { parentID: 2 }
            ]
        });

        child.kendoDropDownList({
            cascadeFrom: "parent", //id of the parent
            dataTextField: "childID",
            dataValueField: "id",
            dataSource:  [
                { parentID: 1, childID: "1", id: 1 },
                { parentID: 1, childID: "3", id: 2 }
            ]
        });

        var parentCB = parent.data("kendoDropDownList"),
            childCB = child.data("kendoDropDownList");

        //select first item
        parentCB.select(0);
        parentCB.trigger("change");

        //select second item
        parentCB.select(1);
        parentCB.trigger("change");

        //select second item
        parentCB.ul.children().first().click();

        equal(childCB.value(), "1");
        equal(childCB.text(), "1");
    });

    asyncTest("Cascading DDLs with initial values", 2, function() {
        var ddl = new DropDownList(parent, {
            optionLabel: "Select",
            dataValueField: "id",
            dataTextField: "id",
            dataSource: datasource,
            value: "2"
        });

        var ddl2 = new DropDownList(child, {
            optionLabel: "Select",
            dataValueField: "text",
            dataTextField: "text",
            dataSource: datasource,
            cascadeFrom: "parent",
            autoBind: false,
            cascade: function() {
                start();

                equal(ddl.value(), "2");
                equal(ddl2.value(), "item4");
            },
            value: "item4"
        });
    });

    asyncTest("Cascading DDLs handles consecutive calls of value method", 2, function() {
        var ddl = new DropDownList(parent, {
            optionLabel: "Select",
            dataValueField: "id",
            dataTextField: "id",
            dataSource: datasource,
            autoBind: false
        });

        var ddl2 = new DropDownList(child, {
            optionLabel: "Select",
            dataValueField: "text",
            dataTextField: "text",
            dataSource: datasource,
            cascadeFrom: "parent",
            cascade: function() {
                start();

                equal(ddl.value(), "2");
                equal(ddl2.value(), "item4");
                ddl.destroy();
                ddl2.destroy();
            }
        });

        ddl.value("2");
        ddl2.value("item4");

    });

    asyncTest("DropDownList does not clear value if parent has value", function() {
        var ddl = new DropDownList(parent, {
            optionLabel: "Select",
            dataValueField: "id",
            dataTextField: "id",
            dataSource: datasource,
            autoBind: false
        });

        var ddl2 = new DropDownList(child.attr("id", "child"), {
            optionLabel: "Select",
            dataValueField: "text",
            dataTextField: "text",
            dataSource: datasource,
            cascadeFrom: "parent",
            autoBind: false
        });

        var ddl3 = new DropDownList($("<input />"), {
            optionLabel: "Select",
            dataValueField: "text",
            dataTextField: "text",
            dataSource: datasource,
            cascadeFrom: "child",
            autoBind: false,
            cascade: function() {
                start();

                equal(ddl.value(), "2");
                equal(ddl2.value(), "item4");
                equal(ddl3.value(), "item4");

                ddl.destroy();
                ddl2.destroy();
                ddl3.destroy();
            }
        });

        ddl.value("2");
        ddl2.value("item4");
        ddl3.value("item4");
    });

    test("DropDownList clears value if parent has no value", function() {
        var ddl = new DropDownList(parent, {
            optionLabel: "Select",
            dataValueField: "id",
            dataTextField: "text2",
            dataSource: [
                {text: "item1", id: "1", text2: "i"},
                {text: "item3", id: "2", text2: "i"}
            ],
            autoBind: false
        });

        var ddl2 = new DropDownList(child.attr("id", "child"), {
            optionLabel: "Select",
            dataValueField: "text",
            dataTextField: "text",
            dataSource: [
                {text: "item1", id: "1"},
                {text: "item2", id: "1"},
                {text: "item3", id: "2"},
                {text: "item4", id: "2"}
            ],
            cascadeFrom: "parent",
            autoBind: false
        });

        var ddl3 = new DropDownList(third, {
            optionLabel: "Select",
            dataValueField: "text",
            dataTextField: "text",
            dataSource: [
                {text: "item1", id: "1"},
                {text: "item2", id: "1"},
                {text: "item3", id: "2"},
                {text: "item4", id: "2"}
            ],
            cascadeFrom: "child",
            autoBind: false
        });

        ddl.value("2");
        ddl2.value("item4");
        ddl3.value("item4");

        ddl.value("");

        equal(ddl2.text(), "Select");
        equal(ddl2.value(), "");

        equal(ddl3.text(), "Select");
        equal(ddl3.value(), "");

        ddl.destroy();
        ddl2.destroy();
        ddl3.destroy();
    });

    test("DropDownList clears value if parent has no value and child has no data", function() {
        var ddl = new DropDownList(parent, {
            optionLabel: "Select",
            dataValueField: "id",
            dataTextField: "text2",
            dataSource: [
                {text: "item1", id: "1", text2: "i"},
                {text: "item2", id: "2", text2: "i"},
                {text: "item3", id: "3", text2: "i"}
            ],
            autoBind: false
        });

        var ddl2 = new DropDownList(child.attr("id", "child"), {
            dataValueField: "text",
            dataTextField: "text",
            dataSource: [
                {text: "item1", id: "1"},
                {text: "item2", id: "1"},
                {text: "item3", id: "2"},
                {text: "item4", id: "2"}
            ],
            cascadeFrom: "parent",
            autoBind: false
        });

        ddl.value("3");

        equal(ddl2.value(), "");
        equal(ddl2.dataItem(), null);
    });

    test("Child cascade when parents value is 0", function() {
        parent.kendoDropDownList({
            dataTextField: "parentID",
            dataValueField: "parentID",
            dataSource: [
                { parentID: 0 },
                { parentID: 1 }
            ]
        });

        child.kendoDropDownList({
            cascadeFrom: "parent", //id of the parent
            dataTextField: "childID",
            dataValueField: "id",
            optionLabel: "Select",
            dataSource:  [
                { parentID: 0, childID: "1", id: 1 },
                { parentID: 1, childID: "3", id: 2 }
            ],
            value: 1
        });

        var parentCB = parent.data("kendoDropDownList"),
            childCB = child.data("kendoDropDownList");

        equal(childCB.dataSource.view().length, 1);
        equal(childCB.value(), 1);
    });

    test("child widget selects correct item when instantly bound", function() {
        // array of all brands
        var brands = [
            { brandId: 1, name: "Ford" },
            { brandId: 2, name: "BMW" },
            { brandId: 3, name: "Chevrolet" }
        ];

        // array of all models
        var models = [
            { modelId: 1, name: "Explorer", brandId: 1},
            { modelId: 2, name: "Focus", brandId: 1},
            { modelId: 3, name: "X3", brandId: 2},
            { modelId: 4, name: "X5", brandId: 2},
            { modelId: 5, name: "Impala", brandId: 3},
            { modelId: 6, name: "Cruze", brandId: 3}
        ];

        parent.kendoDropDownList({
            dataTextField: "name",
            dataValueField: "brandId",
            dataSource: brands // bind it to the brands array
        });

        child.val("2").kendoDropDownList({
            dataTextField: "name",
            dataValueField: "modelId",
            optionLabel: { name: "", modelId: ""},
            cascadeFrom: "parent", // cascade from the brands dropdownlist
            dataSource: models // bind it to the models array
        });

        equal(child.data("kendoDropDownList").text(), "Focus");
    });

    test("Support for cascadeFromField option", function() {
        // array of all brands
        var brands = [
            { id: 1, name: "Ford" },
            { id: 2, name: "BMW" },
            { id: 3, name: "Chevrolet" }
        ];

        // array of all models
        var models = [
            { modelId: 1, name: "Explorer", brandId: 1},
            { modelId: 2, name: "Focus", brandId: 1},
            { modelId: 3, name: "X3", brandId: 2},
            { modelId: 4, name: "X5", brandId: 2},
            { modelId: 5, name: "Impala", brandId: 3},
            { modelId: 6, name: "Cruze", brandId: 3}
        ];

        parent.kendoDropDownList({
            dataTextField: "name",
            dataValueField: "id",
            dataSource: brands // bind it to the brands array
        });

        child.val("2").kendoDropDownList({
            dataTextField: "name",
            dataValueField: "modelId",
            optionLabel: { name: "", modelId: ""},
            cascadeFrom: "parent", // cascade from the brands dropdownlist
            cascadeFromField: "brandId",
            dataSource: models // bind it to the models array
        });

        equal(child.data("kendoDropDownList").text(), "Focus");
    });

    test("Clear selected values of the child widgets on user selection", function() {
        // array of all brands
        var brands = [
            { id: 1, name: "Ford" },
            { id: 2, name: "BMW" },
            { id: 3, name: "Chevrolet" }
        ];

        // array of all models
        var models = [
            { modelId: 1, name: "Explorer", brandId: 1},
            { modelId: 2, name: "Focus", brandId: 1},
            { modelId: 3, name: "X3", brandId: 1},
            { modelId: 1, name: "X5", brandId: 2},
            { modelId: 2, name: "Impala", brandId: 2},
            { modelId: 3, name: "Cruze", brandId: 2}
        ];

        parent.kendoDropDownList({
            dataTextField: "name",
            dataValueField: "id",
            dataSource: brands // bind it to the brands array
        });

        child.val("2").kendoDropDownList({
            dataTextField: "name",
            dataValueField: "modelId",
            optionLabel: { name: "", modelId: ""},
            cascadeFrom: "parent", // cascade from the brands dropdownlist
            cascadeFromField: "brandId",
            dataSource: models // bind it to the models array
        });

        parent.data("kendoDropDownList").ul.children().eq(1).click();

        equal(child.data("kendoDropDownList").value(), "");
    });

    test("third combo is bound when only local data is used", function() {
        var categories = new DropDownList(parent, {
            dataTextField: "CategoryName",
            dataValueField: "CategoryID",
            dataSource: { data: [{"CategoryName": "Condiments", "CategoryID": 2}] },
            value: 2
        });

        var products = new DropDownList(child, {
            cascadeFrom: "parent",
            dataTextField: "ProductName",
            dataValueField: "ProductID",
            dataSource: { data: [{"ProductName": "Chef Anton's Gumbo Mix", "ProductID": 5, "CategoryID": 2}, {"ProductName": "Aniseed Syrup", "ProductID": 3, "CategoryID": 2}] },
            value: 5
        });

        var orders = new DropDownList(third, {
            cascadeFrom: "child",
            dataTextField: "ShipCity",
            dataValueField: "OrderID",
            dataSource: { data: [{"ShipCity": "Graz", "OrderID": 10382, "ProductID": 5}, {"ShipCity": "London", "OrderID": 10289, "ProductID": 5}] },
            value: 10382
        });

        equal(orders.value(), "10382");
        ok(!orders.element.is("[disabled]"));
    });

    asyncTest("do not raise cascade if filtered with no items", 0, function() {
        var categories = new DropDownList(parent, {
            delay: 0,
            filter: "startswith",
            dataTextField: "CategoryName",
            dataValueField: "CategoryID",
            dataSource: { data: [{"CategoryName": "Condiments", "CategoryID": 2}] },
        });

        categories.bind("dataBound", function() {
            start();
            categories.filterInput.focusout();
        });

        categories.bind("cascade", function() {
            ok(false);
        });

        categories.open();
        categories.filterInput.focus().val("not found").keydown();
    });

    test("DropDownList selects first item on cascade when optionLable is missing", function() {
        var ddl = new DropDownList(parent, {
            optionLabel: "Select",
            dataValueField: "id",
            dataTextField: "text2",
            dataSource: [
                {text: "item1", id: "1", text2: "i"},
                {text: "item3", id: "2", text2: "i"}
            ]
        });

        var ddl2 = new DropDownList(child.attr("id", "child"), {
            dataValueField: "text",
            dataTextField: "text",
            dataSource: [
                {text: "item1", id: "1"},
                {text: "item2", id: "1"},
                {text: "item3", id: "2"},
                {text: "item4", id: "2"}
            ],
            cascadeFrom: "parent",
            autoBind: false
        });

        var ddl3 = new DropDownList(third, {
            dataValueField: "text",
            dataTextField: "text",
            dataSource: [
                {text: "item1", id: "1"},
                {text: "item2", id: "1"},
                {text: "item3", id: "2"},
                {text: "item4", id: "2"}
            ],
            cascadeFrom: "child",
            autoBind: false
        });

        ddl.ul.children(":last").click();
        ddl.ul.children(":first").click();

        equal(ddl2.value(), "item1");
        equal(ddl3.value(), "item1");

        ddl.destroy();
        ddl2.destroy();
        ddl3.destroy();
    });

    test("DropDownList clears selected value when parent has no value", function() {
        var ddl = new DropDownList(parent, {
            optionLabel: "Select",
            dataValueField: "id",
            dataTextField: "text2",
            dataSource: [
                {text: "item1", id: "1", text2: "i"},
                {text: "item3", id: "2", text2: "i"}
            ]
        });

        var ddl2 = new DropDownList(child.attr("id", "child"), {
            dataValueField: "text",
            dataTextField: "text",
            dataSource: [
                {text: "item1", id: "1"},
                {text: "item2", id: "1"},
                {text: "item3", id: "2"},
                {text: "item4", id: "2"}
            ],
            cascadeFrom: "parent",
            autoBind: false
        });

        var ddl3 = new DropDownList(third, {
            dataValueField: "text",
            dataTextField: "text",
            dataSource: [
                {text: "item1", id: "1"},
                {text: "item2", id: "1"},
                {text: "item3", id: "2"},
                {text: "item4", id: "2"}
            ],
            cascadeFrom: "child",
            autoBind: false
        });

        ddl.ul.children(":last").click();
        ddl.value("");

        equal(ddl2.value(), "");
        equal(ddl3.value(), "");

        ddl.destroy();
        ddl2.destroy();
        ddl3.destroy();
    });
})();
