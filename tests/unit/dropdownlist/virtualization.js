import '@progress/kendo-ui/src/kendo.dropdownlist.js';
import { asyncTest } from '../../helpers/unit/async-utils.js';

let DropDownList = kendo.ui.DropDownList,
    select;

let CONTAINER_HEIGHT = 200;

function scroll(element, height) {
    element.scrollTop(height);
    element.trigger("scroll");
}

function generateData(parameters) {
    let items = [];
    for (let i = parameters.skip, len = parameters.skip + parameters.take; i < len; i++) {
        items.push({
            id: i,
            value: i,
            text: "Item " + i
        });
    }

    return items;
}

function createAsyncDataSource() {
    return new kendo.data.DataSource({
        transport: {
            read: function(options) {
                setTimeout(function() {
                    options.success({ data: generateData(options.data), total: 300 });
                }, 0);
            }
        },
        serverPaging: true,
        pageSize: 40,
        schema: {
            data: "data",
            total: "total"
        }
    });
}

describe("kendo.ui.DropDownList Virtualization", function() {
    beforeEach(function() {
        kendo.ns = "";
        select = $("<select multiple />").appendTo(Mocha.fixture);
    });
    afterEach(function() {
        if (select.data("kendoDropDownList")) {
            select.data("kendoDropDownList").destroy();
        }
    });

    asyncTest("DropDownList does not revert scroll position on dataBound", function(done) {
        let dropdownlist = new DropDownList(select, {
            close: function(e) { e.preventDefault(); },
            height: CONTAINER_HEIGHT,
            autoBind: false,
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: createAsyncDataSource(),
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 40
            }
        });

        dropdownlist.one("dataBound", function() {
            dropdownlist.open();
            scroll(dropdownlist.listView.content, 4 * CONTAINER_HEIGHT);

            setTimeout(function() {
                done(() => assert.notEqual(dropdownlist.listView.content.scrollTop(), 0));
            }, 100);

        });

        dropdownlist.value("0");
    });

    asyncTest("renders floating label when value is set and", function(done) {
        let dropdownlist = new DropDownList(select, {
            autoBind: true,
            value: "1",
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: createAsyncDataSource(),
            label: {
                content: "some label",
                floating: true
            }
        });

        dropdownlist.one("dataBound", function() {
            setTimeout(function() {
                let classes = dropdownlist.label.floatingLabel.element.attr("class");
                done(() => assert.isNotOk(classes.includes("k-empty")));
            }, 100);

        });
    });

    asyncTest("DropDownList selects correct item when optionLabel is defined", function(done) {
        let dropdownlist = new DropDownList(select, {
            optionLabel: "test",
            height: CONTAINER_HEIGHT,
            autoBind: false,
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: createAsyncDataSource(),
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 40
            }
        });

        dropdownlist.one("dataBound", function() {
            done(() => assert.equal(dropdownlist.value(), 100));
        });

        dropdownlist.value("100");
    });

    asyncTest("dataItem returns correct object based on LI element", function(done) {
        let dropdownlist = new DropDownList(select, {
            close: function(e) { e.preventDefault(); },
            height: CONTAINER_HEIGHT,
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: new kendo.data.DataSource({
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            options.success({ data: generateData(options.data), total: 53 });
                        }, 0);
                    }
                },
                serverFiltering: true,
                serverPaging: true,
                pageSize: 40,
                schema: {
                    data: "data",
                    total: "total"
                }
            }),
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 20
            }
        });

        dropdownlist.open();
        dropdownlist.one("dataBound", function() {
            dropdownlist.one("dataBound", function() {
                let item49 = dropdownlist.listView.content.find("li")
                    .filter(function(_, li) { return $(li).data("offsetIndex") == 49; });

                let dataItem = dropdownlist.dataItem(item49);

                done(() => {
                    assert.equal(dataItem.value, 49);
                    assert.equal(dataItem.text, item49.text());
                });
            });

            scroll(dropdownlist.listView.content, 5 * CONTAINER_HEIGHT);
        });
    });

    asyncTest("keep selected value when list is scrolled", function(done) {
        let dropdownlist = new DropDownList(select, {
            close: function(e) { e.preventDefault(); },
            height: CONTAINER_HEIGHT,
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: createAsyncDataSource(),
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 20
            }
        });

        dropdownlist.one("dataBound", function() {
            dropdownlist.open();
            dropdownlist.one("dataBound", function() {
                let selectedOption = select[0].children[select[0].selectedIndex];

                done(() => {
                    assert.equal(select.val(), 10);
                    assert.isOk(selectedOption.selected);
                    assert.isOk(!selectedOption.getAttribute("selected"));
                });
            });

            scroll(dropdownlist.listView.content, 5 * CONTAINER_HEIGHT);
        });

        dropdownlist.value(10);
    });

    asyncTest("clear filter when set new value", function(done) {
        let dropdownlist = new DropDownList(select, {
            close: function(e) { e.preventDefault(); },
            height: CONTAINER_HEIGHT,
            animation: false,
            filter: "contains",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: createAsyncDataSource(),
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 20
            }
        });

        dropdownlist.one("dataBound", function() {
            dropdownlist.open();

            dropdownlist.dataSource.filter({
                field: "text",
                operator: "contains",
                value: "Item 30"
            });

            dropdownlist.one("dataBound", function() {

                dropdownlist.value("");

                done(() => assert.equal(dropdownlist.dataSource.filter().filters.length, 0));
            });
        });

        dropdownlist.value(10);
    });

    asyncTest("clear filter when set new value", function(done) {
        let mappedDataItem = { value: 300, text: "Item300" };
        let dropdownlist = new DropDownList(select, {
            height: CONTAINER_HEIGHT,
            animation: false,
            filter: "contains",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: createAsyncDataSource(),
            virtual: {
                mapValueTo: "dataItem",
                valueMapper: function(o) { setTimeout(function() { o.success(mappedDataItem); }, 0); },
                itemHeight: 20
            },
            value: mappedDataItem.value
        });

        dropdownlist.one("dataBound", function() {
            done(() => {
                assert.equal(dropdownlist.value(), mappedDataItem.value);
                assert.equal(dropdownlist.text(), mappedDataItem.text);
            });
        });
    });


    asyncTest("value is changed on Enter", function(done) {
        let dropdownlist = new DropDownList(select, {
            close: function(e) { e.preventDefault(); },
            height: CONTAINER_HEIGHT,
            animation: false,
            filter: "startswith",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: createAsyncDataSource(),
            change: function(e) {
                done(() => assert.equal(e.sender.value(), "5"));
            },
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 20
            }
        });

        dropdownlist.one("dataBound", function() {
            dropdownlist.filterInput.focus().val("Item 5");
            dropdownlist.filterInput.trigger({ type: "keydown" });

            dropdownlist.one("dataBound", function() {
                dropdownlist.filterInput.trigger({ type: "keydown", keyCode: kendo.keys.ENTER });
            });
        });
        dropdownlist.open();
    });

    asyncTest("item is selected on DOWN", function(done) {
        let dropdownlist = new DropDownList(select, {
            close: function(e) { e.preventDefault(); },
            height: CONTAINER_HEIGHT,
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: createAsyncDataSource(),
            select: function(e) {
                done(() => assert.equal(e.dataItem.value, "1"));
            },
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 20
            },
            value: 0
        });

        dropdownlist.one("dataBound", function() {
            dropdownlist.wrapper.trigger({ type: "keydown", keyCode: kendo.keys.DOWN });
        });

        dropdownlist.open();
    });

    asyncTest("item is selected on DOWN after going to next page", function(done) {
        let dropdownlist = new DropDownList(select, {
            height: CONTAINER_HEIGHT,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: new kendo.data.DataSource({
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            options.success({ data: generateData(options.data), total: 300 });
                        }, 0);
                    }
                },
                serverPaging: true,
                pageSize: 4,
                schema: {
                    data: "data",
                    total: "total"
                }
            }),
            select: function(e) {
                done(() => assert.isOk(e.dataItem.value, "4"));
            },
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 200
            },
            value: 3
        });

        dropdownlist.one("dataBound", function() {
            setTimeout(function() {
                dropdownlist.wrapper.trigger({ type: "keydown", keyCode: kendo.keys.DOWN });
            });
        });
    });

    asyncTest("label is selected on UP", function(done) {
        let dropdownlist = new DropDownList(select, {
            height: CONTAINER_HEIGHT,
            dataTextField: "text",
            dataValueField: "value",
            optionLabel: "Please Select",
            dataSource: new kendo.data.DataSource({
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            options.success({ data: generateData(options.data), total: 300 });
                        }, 0);
                    }
                },
                serverPaging: true,
                pageSize: 4,
                schema: {
                    data: "data",
                    total: "total"
                }
            }),
            select: function(e) {
                done(() => {
                    assert.isOk(e.item.hasClass("k-list-optionlabel"));
                    assert.equal(e.item.text(), "Please Select");
                });
            },
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 200
            },
            value: 0
        });

        dropdownlist.one("dataBound", function() {
            dropdownlist.wrapper.trigger({ type: "keydown", keyCode: kendo.keys.UP });
        });
    });
});
