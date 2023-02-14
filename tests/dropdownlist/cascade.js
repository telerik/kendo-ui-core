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

    describe("kendo.ui.DropDownLists Cascading DropDownLists", function() {
        beforeEach(function() {
            kendo.ns = "kendo-";
            parent = $("<input id='parent' />").appendTo(Mocha.fixture);
            child = $("<input id='child' />").appendTo(Mocha.fixture);
            third = $("<input />").appendTo(Mocha.fixture);
            datasource = mockedDataSource();
        });

        afterEach(function() {
            kendo.ns = "";

            if (parent.data("kendoDropDownList")) {
                parent.data("kendoDropDownList").destroy();
            } else if (parent.data("kendoComboBox")) {
                parent.data("kendoComboBox").destroy();
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
        });

        it("Clear child ddl if no data after filtration", function() {
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
                dataSource: [
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

            assert.equal(childCB.value(), "");
            assert.equal(childCB.text(), "Select");
        });

        it("Select optionLabel if no data", function() {
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
                dataSource: [
                    { parentID: 1, childID: "1", id: 1 },
                    { parentID: 1, childID: "3", id: 2 }
                ]
            });

            var parentCB = parent.data("kendoDropDownList"),
                childCB = child.data("kendoDropDownList");


            //select first item
            parentCB.select(2);
            parentCB.trigger("change");

            assert.equal(childCB.value(), "");
            assert.equal(childCB.text(), "Select");
        });

        it("Child widget selects first option after it was empty", function() {
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
                dataSource: [
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

            assert.equal(childCB.value(), "1");
            assert.equal(childCB.text(), "1");
        });

        it("Cascading DDLs with initial values", function(done) {
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

                    assert.equal(ddl.value(), "2");
                    assert.equal(ddl2.value(), "item4");
                    done();
                },
                value: "item4"
            });
        });

        it("Cascading DDLs handles consecutive calls of value method", function(done) {
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

                    assert.equal(ddl.value(), "2");
                    assert.equal(ddl2.value(), "item4");
                    ddl.destroy();
                    ddl2.destroy();
                    done();
                }
            });

            ddl.value("2");
            ddl2.value("item4");

        });

        it("DropDownList does not clear value if parent has value", function(done) {
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

                    assert.equal(ddl.value(), "2");
                    assert.equal(ddl2.value(), "item4");
                    assert.equal(ddl3.value(), "item4");

                    ddl.destroy();
                    ddl2.destroy();
                    ddl3.destroy();
                    done();
                }
            });

            ddl.value("2");
            ddl2.value("item4");
            ddl3.value("item4");
        });

        it("DropDownList clears value if parent has no value", function() {
            var ddl = new DropDownList(parent, {
                optionLabel: "Select",
                dataValueField: "id",
                dataTextField: "text2",
                dataSource: [
                    { text: "item1", id: "1", text2: "i" },
                    { text: "item3", id: "2", text2: "i" }
                ],
                autoBind: false
            });

            var ddl2 = new DropDownList(child.attr("id", "child"), {
                optionLabel: "Select",
                dataValueField: "text",
                dataTextField: "text",
                dataSource: [
                    { text: "item1", id: "1" },
                    { text: "item2", id: "1" },
                    { text: "item3", id: "2" },
                    { text: "item4", id: "2" }
                ],
                cascadeFrom: "parent",
                autoBind: false
            });

            var ddl3 = new DropDownList(third, {
                optionLabel: "Select",
                dataValueField: "text",
                dataTextField: "text",
                dataSource: [
                    { text: "item1", id: "1" },
                    { text: "item2", id: "1" },
                    { text: "item3", id: "2" },
                    { text: "item4", id: "2" }
                ],
                cascadeFrom: "child",
                autoBind: false
            });

            ddl.value("2");
            ddl2.value("item4");
            ddl3.value("item4");

            ddl.value("");

            assert.equal(ddl2.text(), "Select");
            assert.equal(ddl2.value(), "");

            assert.equal(ddl3.text(), "Select");
            assert.equal(ddl3.value(), "");

            ddl.destroy();
            ddl2.destroy();
            ddl3.destroy();
        });

        it("DropDownList clears value if parent has no value and child has no data", function() {
            var ddl = new DropDownList(parent, {
                optionLabel: "Select",
                dataValueField: "id",
                dataTextField: "text2",
                dataSource: [
                    { text: "item1", id: "1", text2: "i" },
                    { text: "item2", id: "2", text2: "i" },
                    { text: "item3", id: "3", text2: "i" }
                ],
                autoBind: false
            });

            var ddl2 = new DropDownList(child.attr("id", "child"), {
                dataValueField: "text",
                dataTextField: "text",
                dataSource: [
                    { text: "item1", id: "1" },
                    { text: "item2", id: "1" },
                    { text: "item3", id: "2" },
                    { text: "item4", id: "2" }
                ],
                cascadeFrom: "parent",
                autoBind: false
            });

            ddl.value("3");

            assert.equal(ddl2.value(), "");
            assert.equal(ddl2.dataItem(), null);
        });

        it("Child cascade when parents value is 0", function() {
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
                dataSource: [
                    { parentID: 0, childID: "1", id: 1 },
                    { parentID: 1, childID: "3", id: 2 }
                ],
                value: 1
            });

            var parentCB = parent.data("kendoDropDownList"),
                childCB = child.data("kendoDropDownList");

            assert.equal(childCB.dataSource.view().length, 1);
            assert.equal(childCB.value(), 1);
        });

        it("child widget selects correct item when instantly bound", function() {
            // array of all brands
            var brands = [
                { brandId: 1, name: "Ford" },
                { brandId: 2, name: "BMW" },
                { brandId: 3, name: "Chevrolet" }
            ];

            // array of all models
            var models = [
                { modelId: 1, name: "Explorer", brandId: 1 },
                { modelId: 2, name: "Focus", brandId: 1 },
                { modelId: 3, name: "X3", brandId: 2 },
                { modelId: 4, name: "X5", brandId: 2 },
                { modelId: 5, name: "Impala", brandId: 3 },
                { modelId: 6, name: "Cruze", brandId: 3 }
            ];

            parent.kendoDropDownList({
                dataTextField: "name",
                dataValueField: "brandId",
                dataSource: brands // bind it to the brands array
            });

            child.val("2").kendoDropDownList({
                dataTextField: "name",
                dataValueField: "modelId",
                optionLabel: { name: "", modelId: "" },
                cascadeFrom: "parent", // cascade from the brands dropdownlist
                dataSource: models // bind it to the models array
            });

            assert.equal(child.data("kendoDropDownList").text(), "Focus");
        });

        it("Support for cascadeFromField option", function() {
            // array of all brands
            var brands = [
                { id: 1, name: "Ford" },
                { id: 2, name: "BMW" },
                { id: 3, name: "Chevrolet" }
            ];

            // array of all models
            var models = [
                { modelId: 1, name: "Explorer", brandId: 1 },
                { modelId: 2, name: "Focus", brandId: 1 },
                { modelId: 3, name: "X3", brandId: 2 },
                { modelId: 4, name: "X5", brandId: 2 },
                { modelId: 5, name: "Impala", brandId: 3 },
                { modelId: 6, name: "Cruze", brandId: 3 }
            ];

            parent.kendoDropDownList({
                dataTextField: "name",
                dataValueField: "id",
                dataSource: brands // bind it to the brands array
            });

            child.val("2").kendoDropDownList({
                dataTextField: "name",
                dataValueField: "modelId",
                optionLabel: { name: "", modelId: "" },
                cascadeFrom: "parent", // cascade from the brands dropdownlist
                cascadeFromField: "brandId",
                dataSource: models // bind it to the models array
            });

            assert.equal(child.data("kendoDropDownList").text(), "Focus");
        });

        it("Clear selected values of the child widgets on user selection", function() {
            // array of all brands
            var brands = [
                { id: 1, name: "Ford" },
                { id: 2, name: "BMW" },
                { id: 3, name: "Chevrolet" }
            ];

            // array of all models
            var models = [
                { modelId: 1, name: "Explorer", brandId: 1 },
                { modelId: 2, name: "Focus", brandId: 1 },
                { modelId: 3, name: "X3", brandId: 1 },
                { modelId: 1, name: "X5", brandId: 2 },
                { modelId: 2, name: "Impala", brandId: 2 },
                { modelId: 3, name: "Cruze", brandId: 2 }
            ];

            parent.kendoDropDownList({
                dataTextField: "name",
                dataValueField: "id",
                dataSource: brands // bind it to the brands array
            });

            child.val("2").kendoDropDownList({
                dataTextField: "name",
                dataValueField: "modelId",
                optionLabel: { name: "", modelId: "" },
                cascadeFrom: "parent", // cascade from the brands dropdownlist
                cascadeFromField: "brandId",
                dataSource: models // bind it to the models array
            });

            parent.data("kendoDropDownList").ul.children().eq(1).click();

            assert.equal(child.data("kendoDropDownList").value(), "");
        });

        it("third combo is bound when only local data is used", function() {
            var categories = new DropDownList(parent, {
                dataTextField: "CategoryName",
                dataValueField: "CategoryID",
                dataSource: { data: [{ "CategoryName": "Condiments", "CategoryID": 2 }] },
                value: 2
            });

            var products = new DropDownList(child, {
                cascadeFrom: "parent",
                dataTextField: "ProductName",
                dataValueField: "ProductID",
                dataSource: { data: [{ "ProductName": "Chef Anton's Gumbo Mix", "ProductID": 5, "CategoryID": 2 }, { "ProductName": "Aniseed Syrup", "ProductID": 3, "CategoryID": 2 }] },
                value: 5
            });

            var orders = new DropDownList(third, {
                cascadeFrom: "child",
                dataTextField: "ShipCity",
                dataValueField: "OrderID",
                dataSource: { data: [{ "ShipCity": "Graz", "OrderID": 10382, "ProductID": 5 }, { "ShipCity": "London", "OrderID": 10289, "ProductID": 5 }] },
                value: 10382
            });

            assert.equal(orders.value(), "10382");
            assert.isOk(!orders.element.is("[disabled]"));
        });

        it("do not raise cascade if filtered with no items", function(done) {
            var categories = new DropDownList(parent, {
                delay: 0,
                filter: "startswith",
                dataTextField: "CategoryName",
                dataValueField: "CategoryID",
                dataSource: { data: [{ "CategoryName": "Condiments", "CategoryID": 2 }] },
            });

            categories.bind("dataBound", function() {
                categories.filterInput.focusout();
                done();
            });

            categories.bind("cascade", function() {
                assert.isOk(false);
            });

            categories.open();
            categories.filterInput.focus().val("not found").keydown();
        });

        it("DropDownList selects first item on cascade when optionLable is missing", function() {
            var ddl = new DropDownList(parent, {
                optionLabel: "Select",
                dataValueField: "id",
                dataTextField: "text2",
                dataSource: [
                    { text: "item1", id: "1", text2: "i" },
                    { text: "item3", id: "2", text2: "i" }
                ]
            });

            var ddl2 = new DropDownList(child.attr("id", "child"), {
                dataValueField: "text",
                dataTextField: "text",
                dataSource: [
                    { text: "item1", id: "1" },
                    { text: "item2", id: "1" },
                    { text: "item3", id: "2" },
                    { text: "item4", id: "2" }
                ],
                cascadeFrom: "parent",
                autoBind: false
            });

            var ddl3 = new DropDownList(third, {
                dataValueField: "text",
                dataTextField: "text",
                dataSource: [
                    { text: "item1", id: "1" },
                    { text: "item2", id: "1" },
                    { text: "item3", id: "2" },
                    { text: "item4", id: "2" }
                ],
                cascadeFrom: "child",
                autoBind: false
            });

            ddl.ul.children(":last").click();
            ddl.ul.children(":first").click();

            assert.equal(ddl2.value(), "item1");
            assert.equal(ddl3.value(), "item1");

            ddl.destroy();
            ddl2.destroy();
            ddl3.destroy();
        });

        it("DropDownList clears selected value when parent has no value", function() {
            var ddl = new DropDownList(parent, {
                optionLabel: "Select",
                dataValueField: "id",
                dataTextField: "text2",
                dataSource: [
                    { text: "item1", id: "1", text2: "i" },
                    { text: "item3", id: "2", text2: "i" }
                ]
            });

            var ddl2 = new DropDownList(child.attr("id", "child"), {
                dataValueField: "text",
                dataTextField: "text",
                dataSource: [
                    { text: "item1", id: "1" },
                    { text: "item2", id: "1" },
                    { text: "item3", id: "2" },
                    { text: "item4", id: "2" }
                ],
                cascadeFrom: "parent",
                autoBind: false
            });

            var ddl3 = new DropDownList(third, {
                dataValueField: "text",
                dataTextField: "text",
                dataSource: [
                    { text: "item1", id: "1" },
                    { text: "item2", id: "1" },
                    { text: "item3", id: "2" },
                    { text: "item4", id: "2" }
                ],
                cascadeFrom: "child",
                autoBind: false
            });

            ddl.ul.children(":last").click();
            ddl.value("");

            assert.equal(ddl2.value(), "");
            assert.equal(ddl3.value(), "");

            ddl.destroy();
            ddl2.destroy();
            ddl3.destroy();
        });

        it("child widget selects its value after parents starts cascading", function(done) {
            var deferred = $.Deferred();

            var ddl = new DropDownList(parent, {
                optionLabel: "Select",
                dataTextField: "CategoryName",
                dataValueField: "CategoryID",
                dataSource: [
                    { CategoryID: 1, CategoryName: "Cat1" },
                    { CategoryID: 2, CategoryName: "Cat2" }
                ]
            });

            var ddl2 = new DropDownList(child, {
                optionLabel: "Select",
                dataTextField: "ProductName",
                dataValueField: "ProductID",
                dataSource: {
                    serverFiltering: true,
                    transport: {
                        read: function(options) {
                            setTimeout(function() {
                                switch (ddl.value()) {
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

            ddl.value(1);
            ddl2.value(1);

            deferred.then(function() {
                ddl.value(2);
                ddl2.value(3);

                setTimeout(function() {
                    assert.equal(ddl2.value(), "3");
                    assert.equal(ddl2.text(), "Prod3");
                    done();
                }, 100);
            });
        });

        it("setDataSource re-filters the source based on parent value", function() {
            var ddl = new DropDownList(parent, {
                optionLabel: "Select",
                dataValueField: "id",
                dataTextField: "text2",
                dataSource: [
                    { text: "item1", id: "1", text2: "i" },
                    { text: "item3", id: "2", text2: "i" }
                ],
                value: "2"
            });

            var ddl2 = new DropDownList(child.attr("id", "child"), {
                dataValueField: "text",
                dataTextField: "text",
                cascadeFrom: "parent"
            });

            var source = new kendo.data.DataSource({
                data: [
                    { text: "item1", id: "1" },
                    { text: "item2", id: "1" },
                    { text: "item3", id: "2" },
                    { text: "item4", id: "2" }
                ]
            });

            stub(source, {
                filter: source.filter
            });

            ddl2.setDataSource(source);

            assert.isOk(source.calls("filter") !== 0);
        });

        it("active widget does not filter child if popup is opened", function() {
            var ddl = new DropDownList(parent, {
                animation: false,
                optionLabel: "Select",
                dataValueField: "id",
                dataTextField: "text2",
                dataSource: [
                    { text: "item1", id: "1", text2: "i" },
                    { text: "item3", id: "2", text2: "i" }
                ],
                value: "2"
            });

            var ddl2 = new DropDownList(child.attr("id", "child"), {
                dataValueField: "text",
                dataTextField: "text",
                cascadeFrom: "parent",
                dataSource: {
                    data: [
                        { text: "item1", id: "1" },
                        { text: "item2", id: "1" },
                        { text: "item3", id: "2" },
                        { text: "item4", id: "2" }
                    ]
                }
            });

            ddl.wrapper.focus();
            ddl.open();
            ddl.select(1);

            var childSource = ddl2.dataSource.view();

            assert.equal(childSource.length, 2);
            assert.equal(childSource[0].id, "2");
            assert.equal(childSource[1].id, "2");
        });

        it("active widget filters child on change", function() {
            var ddl = new DropDownList(parent, {
                animation: false,
                optionLabel: "Select",
                dataValueField: "id",
                dataTextField: "text2",
                dataSource: [
                    { text: "item1", id: "1", text2: "i" },
                    { text: "item3", id: "2", text2: "i" }
                ],
                value: "2"
            });

            var ddl2 = new DropDownList(child.attr("id", "child"), {
                dataValueField: "text",
                dataTextField: "text",
                cascadeFrom: "parent",
                dataSource: {
                    data: [
                        { text: "item1", id: "1" },
                        { text: "item2", id: "1" },
                        { text: "item3", id: "2" },
                        { text: "item4", id: "2" }
                    ]
                }
            });

            ddl.wrapper.focus();
            ddl.open();
            ddl.wrapper.trigger({ type: "keydown", keyCode: kendo.keys.UP });
            ddl.wrapper.blur();

            var childSource = ddl2.dataSource.view();

            assert.equal(childSource.length, 2);
            assert.equal(childSource[0].id, "1");
            assert.equal(childSource[1].id, "1");
        });

        it("child widget triggers change if selected value is cleared", function() {
            var ddl = new DropDownList(parent, {
                animation: false,
                optionLabel: "Select",
                dataValueField: "id",
                dataTextField: "text",
                dataSource: [
                    { text: "item1", id: "1", text2: "i" },
                    { text: "item3", id: "2", text2: "i" }
                ]
            });

            var ddl2 = new DropDownList(child.attr("id", "child"), {
                optionLabel: "Select",
                dataValueField: "text",
                dataTextField: "text",
                cascadeFrom: "parent",
                dataSource: {
                    data: [
                        { text: "item1", id: "1" },
                        { text: "item2", id: "1" },
                        { text: "item3", id: "2" },
                        { text: "item4", id: "2" }
                    ]
                }
            });

            ddl2.bind("change", function() {
                assert.equal(ddl2.value(), "");
            });

            ddl.select(1);
            ddl2.select(1);

            //clear value
            ddl.select(-1);
        });

        it("child widget triggers change if its value is set after cascade", function() {
            var ddl = new DropDownList(parent, {
                animation: false,
                dataValueField: "id",
                dataTextField: "text",
                dataSource: [
                    { text: "item1", id: "1", text2: "i" },
                    { text: "item3", id: "2", text2: "i" }
                ]
            });

            var ddl2 = new DropDownList(child.attr("id", "child"), {
                dataValueField: "text",
                dataTextField: "text",
                cascadeFrom: "parent",
                dataSource: {
                    data: [
                        { text: "item1", id: "1" },
                        { text: "item2", id: "1" },
                        { text: "item3", id: "2" },
                        { text: "item4", id: "2" }
                    ]
                },
                change: function() {
                    assert.equal(this.value(), "item1");
                }
            });
        });

        it("child widget triggers change if its value is set after parent is updated", function() {
            var ddl = new DropDownList(parent, {
                animation: false,
                optionLabel: "Select",
                dataValueField: "id",
                dataTextField: "text",
                dataSource: [
                    { text: "item1", id: "1", text2: "i" },
                    { text: "item3", id: "2", text2: "i" }
                ]
            });

            var ddl2 = new DropDownList(child.attr("id", "child"), {
                dataValueField: "text",
                dataTextField: "text",
                cascadeFrom: "parent",
                dataSource: {
                    data: [
                        { text: "item1", id: "1" },
                        { text: "item2", id: "1" },
                        { text: "item3", id: "2" },
                        { text: "item4", id: "2" }
                    ]
                },
                change: function() {
                    assert.equal(this.value(), "item1");
                }
            });

            ddl.select(1);
        });

        it("child widget does not trigger change if its value hasn't change during cascade", function() {
            var ddl = new DropDownList(parent, {
                animation: false,
                optionLabel: "Select",
                dataValueField: "id",
                dataTextField: "text",
                dataSource: [
                    { text: "item1", id: "1", text2: "i" },
                    { text: "item3", id: "2", text2: "i" }
                ]
            });

            var ddl2 = new DropDownList(child.attr("id", "child"), {
                optionLabel: "Select",
                dataValueField: "text",
                dataTextField: "text",
                cascadeFrom: "parent",
                dataSource: {
                    data: [
                        { text: "item1", id: "1" },
                        { text: "item2", id: "1" },
                        { text: "item3", id: "2" },
                        { text: "item4", id: "2" }
                    ]
                },
                change: function() {
                    assert.isOk(false);
                }
            });

            ddl.select(1);
        });

        it("child widget does not trigger change during initialization", function() {
            var ddl = new DropDownList(parent, {
                animation: false,
                optionLabel: "Select",
                dataValueField: "id",
                dataTextField: "text",
                dataSource: [
                    { text: "item1", id: "1", text2: "i" },
                    { text: "item3", id: "2", text2: "i" }
                ]
            });

            var ddl2 = new DropDownList(child.attr("id", "child"), {
                optionLabel: "Select",
                dataValueField: "text",
                dataTextField: "text",
                cascadeFrom: "parent",
                dataSource: {
                    data: [
                        { text: "item1", id: "1" },
                        { text: "item2", id: "1" },
                        { text: "item3", id: "2" },
                        { text: "item4", id: "2" }
                    ]
                },
                change: function() {
                    assert.isOk(false);
                }
            });
        });

        it("child widget triggers change when has pre-selected value on initialization", function() {
            var ddl = new DropDownList(parent, {
                index: 1,
                animation: false,
                optionLabel: "Select",
                dataValueField: "id",
                dataTextField: "text",
                dataSource: [
                    { text: "item1", id: "1", text2: "i" },
                    { text: "item3", id: "2", text2: "i" }
                ]
            });

            var ddl2 = new DropDownList(child.attr("id", "child"), {
                index: 1,
                optionLabel: "Select",
                dataValueField: "text",
                dataTextField: "text",
                cascadeFrom: "parent",
                dataSource: {
                    data: [
                        { text: "item1", id: "1" },
                        { text: "item2", id: "1" },
                        { text: "item3", id: "2" },
                        { text: "item4", id: "2" }
                    ]
                },
                change: function() {
                    assert.isOk(true);
                }
            });
        });

        it("trigger change event on 2nd and 3rd level on parent reset", function() {
            var ddl = new DropDownList(parent, {
                optionLabel: "Select",
                dataValueField: "id",
                dataTextField: "text2",
                dataSource: [
                    { text: "item1", id: "1", text2: "i" },
                    { text: "item3", id: "2", text2: "i" }
                ],
                autoBind: false
            });

            var ddl2 = new DropDownList(child.attr("id", "child"), {
                optionLabel: "Select",
                dataValueField: "text",
                dataTextField: "text",
                dataSource: [
                    { text: "item1", id: "1" },
                    { text: "item2", id: "1" },
                    { text: "item3", id: "2" },
                    { text: "item4", id: "2" }
                ],
                cascadeFrom: "parent",
                autoBind: false
            });

            var ddl3 = new DropDownList(third, {
                optionLabel: "Select",
                dataValueField: "text",
                dataTextField: "text",
                dataSource: [
                    { text: "item1", id: "1" },
                    { text: "item2", id: "1" },
                    { text: "item3", id: "2" },
                    { text: "item4", id: "2" }
                ],
                cascadeFrom: "child",
                autoBind: false
            });

            ddl.value("2");
            ddl2.value("item4");
            ddl3.value("item4");

            ddl2.bind("change", function() {
                assert.isOk(true);
            });

            ddl3.bind("change", function() {
                assert.isOk(true);
            });

            ddl.value("");
        });

        it("select the value of 3rd widget when it is bound and still not cascaded", function(done) {
            var ddl = new DropDownList(parent, {
                optionLabel: "Select",
                dataValueField: "id",
                dataTextField: "text2",
                dataSource: {
                    transport: {
                        read: function(options) {
                            setTimeout(function() {
                                options.success([
                                    { text: "item1", id: "1", text2: "i" },
                                    { text: "item3", id: "2", text2: "i" }
                                ]);
                            });
                        }
                    }
                },
                autoBind: false
            });

            var ddl2 = new DropDownList(child.attr("id", "child"), {
                optionLabel: "Select",
                dataValueField: "text",
                dataTextField: "text",
                dataSource: {
                    serverFiltering: true,
                    transport: {
                        read: function(options) {
                            setTimeout(function() {
                                options.success([
                                    { text: "item1", id: "1" },
                                    { text: "item2", id: "1" },
                                    { text: "item3", id: "2" },
                                    { text: "item4", id: "2" }
                                ]);
                            });
                        }
                    }
                },
                cascadeFrom: "parent",
                autoBind: false
            });

            var ddl3 = new DropDownList(third, {
                optionLabel: "Select",
                dataValueField: "text",
                dataTextField: "text",
                dataSource: {
                    serverFiltering: true,
                    transport: {
                        read: function(options) {
                            setTimeout(function() {
                                options.success([
                                    { text: "item1", id: "1" },
                                    { text: "item2", id: "1" },
                                    { text: "item3", id: "2" },
                                    { text: "item4", id: "2" }
                                ]);
                            });
                        }
                    }
                },
                cascadeFrom: "child",
                autoBind: false
            });

            ddl3.one("dataBound", function() {
                ddl.value("1");
                ddl2.value("item2");
                ddl3.value("item2");

                ddl3.one("dataBound", function() {
                    assert.equal(ddl3.value(), "item2");
                    done();
                });
            });

            ddl.value("2");
            ddl2.value("item4");
            ddl3.value("item4");
        });

        it("child widget strips filter expression on subsequent parent selection", function(done) {
            var ddl = new DropDownList(parent, {
                optionLabel: "Select",
                dataValueField: "id",
                dataTextField: "text2",
                dataSource: {
                    transport: {
                        read: function(options) {
                            options.success([
                                { text: "item1", id: "1", text2: "i" },
                                { text: "item3", id: "2", text2: "i" }
                            ]);
                        }
                    }
                },
                autoBind: false
            });

            var ddl2 = new DropDownList(child.attr("id", "child"), {
                optionLabel: "Select",
                dataValueField: "text",
                dataTextField: "text",
                dataSource: {
                    serverFiltering: true,
                    transport: {
                        read: function(options) {
                            setTimeout(function() {
                                options.success([
                                    { text: "item1", id: "1" },
                                    { text: "item2", id: "1" },
                                    { text: "item3", id: "2" },
                                    { text: "item4", id: "2" }
                                ]);
                            });
                        }
                    }
                },
                cascadeFrom: "parent",
                autoBind: false
            });

            ddl.value("2");
            ddl2.one("dataBound", function() {
                ddl.value("1");
                ddl2.one("dataBound", function() {

                    var filters = ddl2.dataSource.filter().filters;

                    assert.equal(filters.length, 1);
                    done();
                });
            });
        });

        it("children cascades when parent is focused", function(done) {
            var ddl = new DropDownList(parent, {
                optionLabel: "Select",
                dataValueField: "id",
                dataTextField: "text2",
                dataSource: {
                    transport: {
                        read: function(options) {
                            setTimeout(function() {
                                options.success([
                                    { text: "item1", id: "1", text2: "i" },
                                    { text: "item3", id: "2", text2: "i" }
                                ]);
                            });
                        }
                    }
                },
                value: "0"
            });

            var ddl2 = new DropDownList(child.attr("id", "child"), {
                optionLabel: "Select",
                dataValueField: "text",
                dataTextField: "text",
                dataSource: {
                    serverFiltering: true,
                    transport: {
                        read: function(options) {
                            setTimeout(function() {
                                options.success([
                                    { text: "item1", id: "1" },
                                    { text: "item2", id: "1" },
                                    { text: "item3", id: "2" },
                                    { text: "item4", id: "2" }
                                ]);
                            });
                        }
                    }
                },
                cascadeFrom: "parent",
                autoBind: false,
                value: "0"
            });

            ddl.value(2);
            ddl2.value("item4");

            ddl.wrapper.focus();

            ddl2.one("dataBound", function() {

                assert.equal(ddl2.value(), "item4");
                done();
            });
        });

        it("widget with filter input filters child only once", function() {
            var ddl = new DropDownList(parent, {
                animation: false,
                optionLabel: "Select",
                dataValueField: "id",
                dataTextField: "text",
                dataSource: [
                    { text: "item1", id: "1" },
                    { text: "item3", id: "2" }
                ],
                value: "1",
                filter: "contains"
            });

            var ddl2 = new DropDownList(child.attr("id", "child"), {
                dataValueField: "text",
                dataTextField: "text",
                cascadeFrom: "parent",
                dataSource: {
                    serverFiltering: true,
                    transport: {
                        read: function(options) {
                            assert.isOk(true);
                            options.success([]);
                        }
                    }
                },
            });

            ddl.wrapper.focus();
            ddl.open();

            ddl.ul.children().last().click();
        });

        it("child selects correct item when multiple requests are started", function(done) {
            var productResults = [
                [{ ProductID: 1, ProductName: "Chai" }],
                [{ ProductID: 3, ProductName: "Aniseed Syrup" }]
            ];

            var ddl = new DropDownList(parent, {
                optionLabel: "Select category...",
                dataTextField: "CategoryName",
                dataValueField: "CategoryID",
                dataSource: {
                    serverFiltering: true,
                    transport: {
                        read: function(options) {
                            setTimeout(function() {
                                options.success([
                                    { CategoryID: 1, CategoryName: "Beverages" },
                                    { CategoryID: 2, CategoryName: "Condiments" }
                                ]);
                            });
                        }
                    }
                }
            });

            var ddl2 = new DropDownList(child, {
                cascadeFrom: "parent",
                optionLabel: "Select product...",
                dataTextField: "ProductName",
                dataValueField: "ProductID",
                dataSource: {
                    serverFiltering: true,
                    transport: {
                        read: function(options) {
                            setTimeout(function() {
                                options.success(productResults.shift());
                            });
                        }
                    }
                }
            });

            ddl.value("1");
            ddl2.value("1");

            ddl.one("dataBound", function() {
                ddl.value("2");
                ddl2.value("3");
            });

            setTimeout(function() {
                assert.equal(ddl.value(), "2");
                assert.equal(ddl2.value(), "3");
                done();
            }, 100);
        });

        it("cascades from ComboBox widget", function() {
            // array of all brands
            var brands = [
                { id: 1, name: "Ford" },
                { id: 2, name: "BMW" },
                { id: 3, name: "Chevrolet" }
            ];

            // array of all models
            var models = [
                { modelId: 1, name: "Explorer", brandId: 1 },
                { modelId: 2, name: "Focus", brandId: 1 },
                { modelId: 3, name: "X3", brandId: 2 },
                { modelId: 4, name: "X5", brandId: 2 },
                { modelId: 5, name: "Impala", brandId: 3 },
                { modelId: 6, name: "Cruze", brandId: 3 }
            ];

            parent.kendoComboBox({
                dataTextField: "name",
                dataValueField: "id",
                dataSource: brands
            });

            child.kendoDropDownList({
                dataTextField: "name",
                dataValueField: "modelId",
                cascadeFrom: "parent",
                cascadeFromField: "brandId",
                dataSource: models
            });

            child.data("kendoDropDownList").one("dataBound", function(ev) {
                ev.sender.select(1);
            });
            parent.data("kendoComboBox").select(1);

            assert.equal(child.data("kendoDropDownList").text(), "X5");
        });
    });
}());
