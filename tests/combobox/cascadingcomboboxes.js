(function() {
var ComboBox = kendo.ui.ComboBox,
    parent, child, third;

function destroy(input) {
    if (!input) {
        return;
    }

    var cb = input.data("kendoComboBox");

    if (cb) {
        cb.destroy();
    }
}

module("kendo.ui.ComboBox Cascading ComboBoxes", {
    setup: function() {
        kendo.effects.disable();
        parent = $("<input id='parent' />").appendTo(QUnit.fixture);
        child = $("<input id='child' />").appendTo(QUnit.fixture);
        third = $("<input />").appendTo(QUnit.fixture);
    },
    teardown: function() {
        kendo.effects.enable();

        destroy(parent);
        destroy(child);
        destroy(third);

        kendo.destroy(QUnit.fixture);
   }
});

test("Set autoBind option to false", function() {
    parent.kendoComboBox({
        dataTextField: "parentID",
        dataValueField: "parentID",
        dataSource: [
            { parentID: 1 },
            { parentID: 2 }
        ]
    });

    child.kendoComboBox({
        cascadeFrom: "parent", //id of the parent
        dataTextField: "childID",
        dataValueField: "childID",
        dataSource: [
            { parentID: 1, childID: "1" },
            { parentID: 2, childID: "2" },
            { parentID: 1, childID: "3" },
            { parentID: 2, childID: "4" }
        ]
    });

    var childCB = child.data("kendoComboBox");

    ok(!childCB.options.autoBind);
});

test("Parent filter child on change", function() {
    parent.kendoComboBox({
        dataTextField: "parentID",
        dataValueField: "parentID",
        dataSource: [
            { parentID: 1 },
            { parentID: 2 }
        ]
    });

    child.kendoComboBox({
        cascadeFrom: "parent", //id of the parent
        dataTextField: "childID",
        dataValueField: "childID",
        dataSource: [
            { parentID: 1, childID: "1" },
            { parentID: 2, childID: "2" },
            { parentID: 1, childID: "3" },
            { parentID: 2, childID: "4" }
        ]
    });

    var parentCB = parent.data("kendoComboBox"),
        childCB = child.data("kendoComboBox"),
        ds = childCB.dataSource;

    parentCB.select(0);

    equal(ds.view().length, 2);
    equal(ds.view()[0].parentID, 1);
    equal(ds.view()[1].parentID, 1);
});

test("Parent with empty value deactivates child", function() {
    parent.kendoComboBox({
        dataTextField: "parentID",
        dataValueField: "parentID",
        dataSource: [
            { parentID: 1 },
            { parentID: 2 }
        ]
    });

    child.kendoComboBox({
        cascadeFrom: "parent", //id of the parent
        dataTextField: "childID",
        dataValueField: "childID",
        dataSource: [
            { parentID: 1, childID: "1" },
            { parentID: 2, childID: "2" },
            { parentID: 1, childID: "3" },
            { parentID: 2, childID: "4" }
        ]
    });

    var parentCB = parent.data("kendoComboBox"),
        childCB = child.data("kendoComboBox"),
        ds = childCB.dataSource;

    parentCB.select(0);
    childCB.select(0);

    //clear parent
    parentCB.value("");

    equal(childCB.selectedIndex, -1);
    equal(childCB.element.attr("disabled"), "disabled");
});

test("Parent with custom value deactivates child", function() {
    parent.kendoComboBox({
        dataTextField: "parentID",
        dataValueField: "parentID",
        dataSource: [
            { parentID: 1 },
            { parentID: 2 }
        ]
    });

    child.kendoComboBox({
        cascadeFrom: "parent", //id of the parent
        dataTextField: "childID",
        dataValueField: "childID",
        dataSource: [
            { parentID: 1, childID: "1" },
            { parentID: 2, childID: "2" },
            { parentID: 1, childID: "3" },
            { parentID: 2, childID: "4" }
        ]
    });

    var parentCB = parent.data("kendoComboBox"),
        childCB = child.data("kendoComboBox"),
        ds = childCB.dataSource;

    parentCB.select(0);
    childCB.select(0);

    parentCB.value("custom");

    equal(childCB.selectedIndex, -1);
    equal(childCB.element.attr("disabled"), "disabled");
});

test("Child clear selection if not items left after filtering", function() {
    parent.kendoComboBox({
        dataTextField: "parentID",
        dataValueField: "parentID",
        dataSource: [
            { parentID: 1 },
            { parentID: 2 },
            { parentID: 3 }
        ]
    });

    child.kendoComboBox({
        cascadeFrom: "parent", //id of the parent
        dataTextField: "childID",
        dataValueField: "childID",
        dataSource: [
            { parentID: 1, childID: "1" },
            { parentID: 2, childID: "2" },
            { parentID: 1, childID: "3" },
            { parentID: 2, childID: "4" }
        ]
    });

    var parentCB = parent.data("kendoComboBox"),
        childCB = child.data("kendoComboBox"),
        ds = childCB.dataSource;

    parentCB.value(3);
    parentCB.trigger("change");

    equal(childCB.selectedIndex, -1);
    equal(childCB.value(), "");
    notEqual(childCB.element.attr("disabled"), "disabled");
});

test("Use index if no value", function() {
    parent.kendoComboBox({
        autoBind: false,
        index: 0,
        dataTextField: "parentID",
        dataValueField: "parentID",
        dataSource: [
            { parentID: 1 },
            { parentID: 2 },
            { parentID: 3 }
        ]
    });

    child.kendoComboBox({
        cascadeFrom: "parent", //id of the parent
        index: 0,
        dataTextField: "childID",
        dataValueField: "childID",
        dataSource: [
            { parentID: 1, childID: "1" },
            { parentID: 2, childID: "2" },
            { parentID: 1, childID: "3" },
            { parentID: 2, childID: "4" }
        ]
    });

    var parentCB = parent.data("kendoComboBox"),
        childCB = child.data("kendoComboBox"),
        ds = childCB.dataSource;

    parentCB.dataSource.read();

    equal(childCB.selectedIndex, 0);
});

test("Parent selects element in child on load", function() {
    parent.kendoComboBox({
        dataTextField: "parentID",
        dataValueField: "parentID",
        dataSource: [
            { parentID: 1 },
            { parentID: 2 },
            { parentID: 3 }
        ],
        index: 0
    });

    child.kendoComboBox({
        cascadeFrom: "parent", //id of the parent
        dataTextField: "childID",
        dataValueField: "childID",
        dataSource: [
            { parentID: 1, childID: "1" },
            { parentID: 2, childID: "2" },
            { parentID: 1, childID: "3" },
            { parentID: 2, childID: "4" }
        ]
    });

    var parentCB = parent.data("kendoComboBox"),
        childCB = child.data("kendoComboBox"),
        ds = childCB.dataSource;

    equal(ds.view().length, 2);
    equal(ds.view()[0].parentID, 1);
    equal(ds.view()[1].parentID, 1);
});

test("When the parent is not bound do not clear value of child", function() {
    parent.val("1").kendoComboBox({
        dataTextField: "parentID",
        dataValueField: "parentID",
        autoBind: false
    });

    child.val("3").kendoComboBox({
        cascadeFrom: "parent", //id of the parent
        dataTextField: "childID",
        dataValueField: "childID",
        dataSource: [
            { parentID: 1, childID: "1" },
            { parentID: 2, childID: "2" },
            { parentID: 1, childID: "3" },
            { parentID: 2, childID: "4" }
        ]
    });

    var parentCB = parent.data("kendoComboBox"),
        childCB = child.data("kendoComboBox"),
        ds = childCB.dataSource;

    equal(childCB.value(), "3");
    equal(child.attr("disabled"), undefined);
});

test("Parent with autoBind:false selects element in the child combo", function() {
    parent.kendoComboBox({
        dataTextField: "parentID",
        dataValueField: "parentID",
        dataSource: [
            { parentID: 1 },
            { parentID: 2 },
            { parentID: 3 }
        ],
        autoBind: false,
        index: 0
    });

    child.kendoComboBox({
        cascadeFrom: "parent", //id of the parent
        dataTextField: "childID",
        dataValueField: "childID",
        dataSource: [
            { parentID: 1, childID: "1" },
            { parentID: 2, childID: "2" },
            { parentID: 1, childID: "3" },
            { parentID: 2, childID: "4" }
        ]
    });

    var parentCB = parent.data("kendoComboBox"),
        childCB = child.data("kendoComboBox"),
        ds = childCB.dataSource;

    parentCB.open();

    equal(ds.view().length, 2);
    equal(ds.view()[0].parentID, 1);
    equal(ds.view()[1].parentID, 1);
});

test("Child on third level is disabled", function() {
    parent.kendoComboBox({
        dataTextField: "parentID",
        dataValueField: "parentID",
        dataSource: [
            { parentID: 1 },
            { parentID: 2 },
            { parentID: 3 }
        ]
    });

    child.kendoComboBox({
        cascadeFrom: "parent", //id of the parent
        dataTextField: "childID",
        dataValueField: "childID",
        dataSource: [
            { parentID: 1, childID: "1" },
            { parentID: 2, childID: "2" },
            { parentID: 1, childID: "3" },
            { parentID: 2, childID: "4" }
        ]
    });

    var thirdCB = third.kendoComboBox({
        cascadeFrom: "child", //id of the child
        dataTextField: "childID",
        dataValueField: "childID",
        dataSource: [
            { parentID: 1, childID: "1" },
            { parentID: 2, childID: "2" },
            { parentID: 1, childID: "3" },
            { parentID: 2, childID: "4" }
        ]
    }).data("kendoComboBox");

    var parentCB = parent.data("kendoComboBox"),
        childCB = child.data("kendoComboBox");

    equal(thirdCB.value(), "");
    equal(thirdCB.element.attr("disabled"), "disabled");
});

test("Preserve filter expressions of the child combo", function() {
    parent.kendoComboBox({
        dataTextField: "parentID",
        dataValueField: "parentID",
        dataSource: [
            { parentID: 1 },
            { parentID: 2 },
            { parentID: 3 }
        ]
    });

    child.kendoComboBox({
        cascadeFrom: "parent", //id of the parent
        dataTextField: "childID",
        dataValueField: "childID",
        dataSource: {
            data: [
                { parentID: 1, childID: "1", id: 1 },
                { parentID: 2, childID: "2", id: 1 },
                { parentID: 1, childID: "3", id: 3 },
                { parentID: 2, childID: "4", id: 1 }
            ],
            filter: {
                field: "id",
                operator: "eq",
                value: 1
            }
        }
    });

    var parentCB = parent.data("kendoComboBox"),
        childCB = child.data("kendoComboBox"),
        ds = childCB.dataSource;

    parentCB.select(0);
    parentCB.trigger("change");

    equal(ds.view().length, 1);
    equal(ds.view()[0].parentID, 1);
    equal(ds.view()[0].childID, "1");
    equal(ds.view()[0].id, 1);
});

test("Clear child combo if no data after filtration", function() {
    parent.kendoComboBox({
        dataTextField: "parentID",
        dataValueField: "parentID",
        dataSource: [
            { parentID: 1 },
            { parentID: 2 }
        ]
    });

    child.kendoComboBox({
        cascadeFrom: "parent", //id of the parent
        dataTextField: "childID",
        dataValueField: "id",
        dataSource:  [
            { parentID: 1, childID: "1", id: 1 },
            { parentID: 1, childID: "3", id: 2 }
        ]
    });

    var parentCB = parent.data("kendoComboBox");
    var childCB = child.data("kendoComboBox");

    parentCB.select(0);
    childCB.select(0);

    //select second item
    parentCB.select(1);

    equal(childCB.value(), "");
    equal(childCB.text(), "");
});

test("Parent trigger cascade when enter value with text method", 1, function() {
    parent.kendoComboBox({
        dataTextField: "parentID",
        dataValueField: "parentID",
        dataSource: [
            { parentID: 1 },
            { parentID: 2 }
        ],
        cascade: function() {
            ok(true);
        }
    });

    parent.data("kendoComboBox").text("1");
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

    parent.kendoComboBox({
        dataTextField: "name",
        dataValueField: "id",
        dataSource: brands, // bind it to the brands array
        value: "1"
    });

    child.val("2").kendoComboBox({
        dataTextField: "name",
        dataValueField: "modelId",
        cascadeFrom: "parent", // cascade from the brands dropdownlist
        cascadeFromField: "brandId",
        dataSource: models // bind it to the models array
    });

    equal(child.data("kendoComboBox").text(), "Focus");
});

test("dataBound event of child is raised after cascading is finished", 2, function() {
    parent.kendoComboBox({
        dataTextField: "parentID",
        dataValueField: "parentID",
        dataSource: [
            { parentID: 1 },
            { parentID: 2 }
        ]
    });

    child.kendoComboBox({
        cascadeFrom: "parent", //id of the parent
        dataTextField: "childID",
        dataValueField: "childID",
        dataSource: [
            { parentID: 1, childID: "1" },
            { parentID: 2, childID: "2" },
            { parentID: 1, childID: "3" },
            { parentID: 2, childID: "4" }
        ],
        dataBound: function() {
            this.value("2");
        }
    });

    var parentCB = parent.data("kendoComboBox");
    var childCB = child.data("kendoComboBox");

    parentCB.select(0);

    equal(childCB.text(), "2");
    equal(childCB.value(), "2");
});

asyncTest("filtering child combo does not re-input the selected value", 1, function() {
    parent.kendoComboBox({
        dataTextField: "parentID",
        dataValueField: "parentID",
        dataSource: [
            { parentID: 1 },
            { parentID: 2 }
        ],
        value: 1
    });

    child.kendoComboBox({
        cascadeFrom: "parent", //id of the parent
        dataTextField: "childID",
        dataValueField: "childID",
        filter: "contains",
        dataSource: [
            { parentID: 1, childID: "1" },
            { parentID: 2, childID: "2" },
            { parentID: 1, childID: "3" },
            { parentID: 2, childID: "4" }
        ],
        value: 1
    });

    var parentCB = parent.data("kendoComboBox"),
        childCB = child.data("kendoComboBox");

    childCB.bind("dataBound", function() {
        start();
        equal(childCB.input.val(), "");
    });

    childCB.input
           .val("")
           .trigger({
                type: "keydown",
                keyCode: kendo.keys.BACKSPACE
           });
});

test("third combo is bound when only local data is used", function() {
    var categories = new ComboBox(parent, {
        filter: "contains",
        placeholder: "Select category...",
        dataTextField: "CategoryName",
        dataValueField: "CategoryID",
        dataSource: { data: [{"CategoryName": "Condiments", "CategoryID": 2}] },
        value: 2
    });

    var products = new ComboBox(child, {
        cascadeFrom: "parent",
        filter: "contains",
        placeholder: "Select product...",
        dataTextField: "ProductName",
        dataValueField: "ProductID",
        dataSource: { data: [{"ProductName": "Chef Anton's Gumbo Mix", "ProductID": 5, "CategoryID": 2}, {"ProductName": "Aniseed Syrup", "ProductID": 3, "CategoryID": 2}] },
        value: 5
    });

    var orders = new ComboBox(third, {
        cascadeFrom: "child",
        filter: "contains",
        placeholder: "Select order...",
        dataTextField: "ShipCity",
        dataValueField: "OrderID",
        dataSource: { data: [{"ShipCity": "Graz", "OrderID": 10382, "ProductID": 5}, {"ShipCity": "London", "OrderID": 10289, "ProductID": 5}] },
        value: 10382
    });

    equal(orders.value(), "10382");
    ok(!orders.element.is("[disabled]"));
});

    asyncTest("child widget selects its value after parents starts cascade", 2, function() {
        var deferred = $.Deferred();

        var combo1 = new ComboBox(parent, {
            dataTextField: "CategoryName",
            dataValueField: "CategoryID",
            dataSource: [
                { CategoryID: 1, CategoryName: "Cat1" },
                { CategoryID: 2, CategoryName: "Cat2" }
            ]
        });

        var combo2 = new ComboBox(child, {
            dataTextField: "ProductName",
            dataValueField: "ProductID",
            dataSource: {
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            switch (combo1.value()) {
                                case "1": options.success([
                                            { ProductID: 1, ProductName: "Prod1", CategoryID: 1 },
                                            { ProductID: 2, ProductName: "Prod2", CategoryID: 1 }
                                        ]);
                                        break;

                                case "2": options.success([
                                            { ProductID: 3, ProductName: "Prod3", CategoryID: 2 },
                                            { ProductID: 4, ProductName: "Prod4", CategoryID: 2 }
                                        ]);
                                        break;
                            }

                        });

                        deferred.resolve();
                    }
                }
            },
            cascadeFrom: "parent",
            autoBind: false
        });

        combo1.value(1);
        combo2.value(1);

        deferred.then(function() {
            combo1.value(2);
            combo2.value(3);

            setTimeout(function() {
                start();
                equal(combo2.value(), "3");
                equal(combo2.text(), "Prod3");
            }, 100);
        });
    });

    asyncTest("widget clears child value on cascade", 1, function() {
        parent.kendoComboBox({
            dataTextField: "parentID",
            dataValueField: "parentID",
            dataSource: [
                { parentID: 1 },
                { parentID: 2 }
            ],
            value: 1
        });

        child.kendoComboBox({
            cascadeFrom: "parent", //id of the parent
            dataTextField: "childID",
            dataValueField: "childID",
            filter: "contains",
            dataSource: {
                serverFiltering: true,
                transport: {
                    read: function(options) {
                        var data = [
                            { parentID: 1, childID: "1" },
                            { parentID: 2, childID: "2" },
                            { parentID: 1, childID: "3" },
                            { parentID: 2, childID: "4" }
                        ];

                        options.success(data);
                    }
                }
            },
            value: 1
        });

        var parentCB = parent.data("kendoComboBox");
        var childCB = child.data("kendoComboBox");

        var requestStart = function() {
            start();
            equal(childCB.value(), "");
            childCB.dataSource.unbind("requestStart", requestStart);
        };

        childCB.dataSource.bind("requestStart", requestStart);

        parentCB.value(2);
    });

    test("widget does not filter child if popup is opened", 3, function() {
        var parentCB = new ComboBox(parent, {
            animation: false,
            dataValueField: "id",
            dataTextField: "text2",
            dataSource: [
                {text: "item1", id: "1", text2: "i"},
                {text: "item3", id: "2", text2: "i"}
            ],
            value: "2"
        });

        var parentCB2 = new ComboBox(child, {
            dataValueField: "text",
            dataTextField: "text",
            cascadeFrom: "parent",
            dataSource: {
                data: [
                    {text: "item1", id: "1"},
                    {text: "item2", id: "1"},
                    {text: "item3", id: "2"},
                    {text: "item4", id: "2"}
                ]
            }
        });


        parentCB.input.focus();
        parentCB.open();
        parentCB.select(0);

        var childSource = parentCB2.dataSource.view();

        equal(childSource.length, 2);
        equal(childSource[0].id, "2");
        equal(childSource[1].id, "2");
    });

    test("widget filters child on popup close", 3, function() {
        var parentCB = new ComboBox(parent, {
            animation: false,
            optionLabel: "Select",
            dataValueField: "id",
            dataTextField: "text2",
            dataSource: [
                {text: "item1", id: "1", text2: "i"},
                {text: "item3", id: "2", text2: "i"}
            ],
            value: "2"
        });

        var parentCB2 = new ComboBox(child.attr("id", "child"), {
            dataValueField: "text",
            dataTextField: "text",
            cascadeFrom: "parent",
            dataSource: {
                data: [
                    {text: "item1", id: "1"},
                    {text: "item2", id: "1"},
                    {text: "item3", id: "2"},
                    {text: "item4", id: "2"}
                ]
            }
        });

        parentCB.open();
        parentCB.select(0);
        parentCB.close();

        var childSource = parentCB2.dataSource.view();

        equal(childSource.length, 2);
        equal(childSource[0].id, "1");
        equal(childSource[1].id, "1");
    });

    test("child widget triggers change if selected value is cleared", 1, function() {
        var combo = new ComboBox(parent, {
            animation: false,
            optionLabel: "Select",
            dataValueField: "id",
            dataTextField: "text",
            dataSource: [
                {text: "item1", id: "1", text2: "i"},
                {text: "item3", id: "2", text2: "i"}
            ]
        });

        var combo2 = new ComboBox(child.attr("id", "child"), {
            optionLabel: "Select",
            dataValueField: "text",
            dataTextField: "text",
            cascadeFrom: "parent",
            dataSource: {
                data: [
                    {text: "item1", id: "1"},
                    {text: "item2", id: "1"},
                    {text: "item3", id: "2"},
                    {text: "item4", id: "2"}
                ]
            }
        });

        combo2.bind("change", function() {
            equal(combo2.value(), "");
        });

        combo.select(0);
        combo2.select(0);

        //clear value
        combo.select(-1);
    });

    test("child widget with selected value triggers change if parent has custom value", 1, function() {
        var combo = new ComboBox(parent, {
            animation: false,
            optionLabel: "Select",
            dataValueField: "id",
            dataTextField: "text",
            dataSource: [
                {text: "item1", id: "1", text2: "i"},
                {text: "item3", id: "2", text2: "i"}
            ]
        });

        var combo2 = new ComboBox(child.attr("id", "child"), {
            optionLabel: "Select",
            dataValueField: "text",
            dataTextField: "text",
            cascadeFrom: "parent",
            dataSource: {
                data: [
                    {text: "item1", id: "1"},
                    {text: "item2", id: "1"},
                    {text: "item3", id: "2"},
                    {text: "item4", id: "2"}
                ]
            }
        });

        combo2.bind("change", function() {
            equal(combo2.value(), "");
        });

        combo.select(0);
        combo2.select(0);

        //clear value
        combo.value("custom");
    });

    test("child widget does not trigger change event if cascade value hasn't changed", 0, function() {
        var combo = new ComboBox(parent, {
            animation: false,
            optionLabel: "Select",
            dataValueField: "id",
            dataTextField: "text",
            dataSource: [
                {text: "item1", id: "1", text2: "i"},
                {text: "item3", id: "2", text2: "i"}
            ]
        });

        var combo2 = new ComboBox(child.attr("id", "child"), {
            optionLabel: "Select",
            dataValueField: "text",
            dataTextField: "text",
            cascadeFrom: "parent",
            dataSource: {
                data: [
                    {text: "item1", id: "1"},
                    {text: "item2", id: "1"},
                    {text: "item3", id: "2"},
                    {text: "item4", id: "2"}
                ]
            }
        });

        combo2.bind("change", function() {
            ok(false);
        });

        combo.select(0);
        combo2.select(0);
    });

    test("child widget triggers change when has pre-selected value on initialization", 1, function() {
        var combo = new ComboBox(parent, {
            index: 1,
            animation: false,
            dataValueField: "id",
            dataTextField: "text",
            dataSource: [
                {text: "item1", id: "1", text2: "i"},
                {text: "item3", id: "2", text2: "i"}
            ]
        });

        var combo2 = new ComboBox(child.attr("id", "child"), {
            index: 1,
            dataValueField: "text",
            dataTextField: "text",
            cascadeFrom: "parent",
            dataSource: {
                data: [
                    {text: "item1", id: "1"},
                    {text: "item2", id: "1"},
                    {text: "item3", id: "2"},
                    {text: "item4", id: "2"}
                ]
            },
            change: function() {
                ok(true);
            }
        });
    });

    test("child widget does not trigger change during initialization", 0, function() {
        var combo = new ComboBox(parent, {
            animation: false,
            dataValueField: "id",
            dataTextField: "text",
            dataSource: [
                {text: "item1", id: "1", text2: "i"},
                {text: "item3", id: "2", text2: "i"}
            ]
        });

        var combo2 = new ComboBox(child.attr("id", "child"), {
            dataValueField: "text",
            dataTextField: "text",
            cascadeFrom: "parent",
            dataSource: {
                data: [
                    {text: "item1", id: "1"},
                    {text: "item2", id: "1"},
                    {text: "item3", id: "2"},
                    {text: "item4", id: "2"}
                ]
            },
            change: function() {
                ok(false);
            }
        });
    });

    test("trigger change event on 2nd and 3rd level on parent reset", 2, function() {
        var combo = new ComboBox(parent, {
            dataValueField: "id",
            dataTextField: "text2",
            dataSource: [
                {text: "item1", id: "1", text2: "i"},
                {text: "item3", id: "2", text2: "i"}
            ],
            autoBind: false
        });

        var combo2 = new ComboBox(child.attr("id", "child"), {
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

        var combo3 = new ComboBox(third, {
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

        combo.value("2");
        combo2.value("item4");
        combo3.value("item4");

        combo2.bind("change", function() {
            ok(true);
        });

        combo3.bind("change", function() {
            ok(true);
        });

        combo.value("");
    });

    asyncTest("keep custom value of the widget it is custom", 3, function() {
        var deferred = $.Deferred();
        var combo = new ComboBox(parent, {
            dataValueField: "combo1Id",
            dataTextField: "text",
            dataSource: {
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            options.success([
                                {text: "item1", combo1Id: "1"},
                                {text: "item3", combo1Id: "2"}
                            ]);
                        });
                    }
                }
            }
        });

        var combo2 = new ComboBox(child.attr("id", "child"), {
            dataValueField: "combo2Id",
            dataTextField: "text",
            dataSource: {
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            options.success([
                                {text: "item4", combo2Id: "4", combo1Id: "2" }
                            ]);
                        });
                    }
                }
            },
            cascadeFrom: "parent",
            autoBind: false
        });

        var combo3 = new ComboBox(third, {
            dataValueField: "combo3Id",
            dataTextField: "text",
            dataSource: {
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            options.success([]);
                            deferred.resolve();
                        });
                    }
                }
            },
            cascadeFrom: "child",
            autoBind: false
        });

        combo.value("2");
        combo2.value("4");
        combo3.value("custom");

        deferred.done(function() {
            start();
            combo.open();
            combo.close();

            equal(combo.value(), "2");
            equal(combo2.value(), "4");
            equal(combo3.value(), "custom");
        });
    });

    asyncTest("persist ", 1, function() {
        var deferred = $.Deferred();
        var combo = new ComboBox(parent, {
            dataValueField: "combo1Id",
            dataTextField: "text",
            dataSource: {
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            options.success([
                                {text: "item1", combo1Id: "1"},
                                {text: "item3", combo1Id: "2"}
                            ]);
                        });
                    }
                }
            }
        });

        var combo2 = new ComboBox(child.attr("id", "child"), {
            dataValueField: "combo2Id",
            dataTextField: "text",
            dataSource: {
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            options.success([
                                {text: "item4", combo2Id: "4", combo1Id: "2" }
                            ]);
                        });
                    }
                }
            },
            cascadeFrom: "parent",
            autoBind: false
        });

        var combo3 = new ComboBox(third, {
            dataValueField: "combo3Id",
            dataTextField: "text",
            dataSource: {
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            options.success([]);
                            deferred.resolve();
                        });
                    }
                }
            },
            cascadeFrom: "child",
            autoBind: false
        });

        combo.value("2");
        combo2.value("4");
        combo3.value("custom");

        deferred.done(function() {
            start();
            equal(combo3.value(), "custom");
        });
    });

    asyncTest("select the value of 3rd widget when it is bound and still not cascaded", 1, function() {
        var combo = new ComboBox(parent, {
            optionLabel: "Select",
            dataValueField: "id",
            dataTextField: "text2",
            dataSource: {
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            options.success([
                                {text: "item1", id: "1", text2: "i"},
                                {text: "item3", id: "2", text2: "i"}
                            ]);
                        });
                    }
                }
            },
            autoBind: false
        });

        var combo2 = new ComboBox(child.attr("id", "child"), {
            optionLabel: "Select",
            dataValueField: "text",
            dataTextField: "text",
            dataSource: {
                serverFiltering: true,
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            options.success([
                                {text: "item1", id: "1"},
                                {text: "item2", id: "1"},
                                {text: "item3", id: "2"},
                                {text: "item4", id: "2"}
                            ]);
                        });
                    }
                }
            },
            cascadeFrom: "parent",
            autoBind: false
        });

        var combo3 = new ComboBox(third, {
            optionLabel: "Select",
            dataValueField: "text",
            dataTextField: "text",
            dataSource: {
                serverFiltering: true,
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            options.success([
                                {text: "item1", id: "1"},
                                {text: "item2", id: "1"},
                                {text: "item3", id: "2"},
                                {text: "item4", id: "2"}
                            ]);
                        });
                    }
                }
            },
            cascadeFrom: "child",
            autoBind: false
        });

        combo3.one("dataBound", function() {
            combo.value("1");
            combo2.value("item2");
            combo3.value("item2");

            combo3.one("dataBound", function() {
                start();
                equal(combo3.value(), "item2");
            });
        });

        combo.value("2");
        combo2.value("item4");
        combo3.value("item4");
    });

})();
