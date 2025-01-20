import '@progress/kendo-ui/src/kendo.virtuallist.js';
import { asyncTest } from '../../helpers/async-utils.js';

let container,
    asyncDataSource,
    virtualSettings,
    VirtualList = kendo.ui.VirtualList,
    ITEM_HEIGHT = 40,
    CONTAINER_HEIGHT = 200;

function groupedData(options) {
    let groupsDict = {};
    let groups = [];

    for (let i = options.skip, len = options.skip + options.take; i < len; i++) {
        let key = Math.floor(i / 30) * 30;
        let group;

        if (!groupsDict[key]) {
            groupsDict[key] = {
                field: "number",
                items: [],
                hasSubgroups: false,
                value: key + " - " + (key + 30)
            };

            groups.push(groupsDict[key]);
        }

        groupsDict[key].items.push({ text: " Item " + i, value: i });
    }

    return groups;
}

describe("Grouped VirtualList: ", function() {
    beforeEach(function() {
        container = $("<div id='container'></div>").appendTo(Mocha.fixture);

        asyncDataSource = new kendo.data.DataSource({
            transport: {
                read: function(options) {
                    setTimeout(function() {
                        options.success({ groups: groupedData(options.data), hasSubgroups: false, total: 300 });
                    }, 0);
                }
            },
            serverGrouping: true,
            serverPaging: true,
            pageSize: 40,
            group: { field: "text" },
            schema: {
                groups: "groups",
                total: "total"
            }
        });

        virtualSettings = {
            autoBind: false,
            height: CONTAINER_HEIGHT,
            dataSource: asyncDataSource,
            template: ({ text }) => kendo.htmlEncode(text),
            dataValueField: "value"
        };
    });

    afterEach(function() {
        if (container.data("kendoVirtualList")) {
            container.data("kendoVirtualList").destroy();
        }

        Mocha.fixture.empty();
    });

    //rendering

    it("creates list header", function() {
        let virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read();
        assert.isOk(virtualList.wrapper.prev().hasClass("k-list-group-sticky-header"));
    });

    asyncTest("does not render item level group label for the first item (offset index 0)", function(done) {
        let virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            done(() => {
                assert.equal(virtualList.items().first().find(".k-group").length, 0);
            });
        });
    });

    //dataBinding

    asyncTest("detects that the dataSource is grouped", function(done) {
        let virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            done(() => {
                assert.equal(virtualList.options.type, "group");
            });
        });
    });

    asyncTest("fixed header displays current visible group", function(done) {
        let virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            setTimeout(function() {
                done(() => {
                    assert.equal($(virtualList.header).text(), virtualList.dataSource.view()[0].value);
                });
            });
        });
    });

    //grouping

    //scrolling

    //utilities

    asyncTest("prefetches value in grouped dataSource", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            value: 89,
            valueMapper: function(operation) {
                setTimeout(function() {
                    operation.success([89]);
                }, 0);
            }
        }));

        asyncDataSource.read();
        virtualList.bind("change", function() {
            done(() => {
                assert.equal(virtualList.selectedDataItems()[0].value, 89);
            });
        });
    });

    asyncTest("prefetches values in grouped dataSource (multiple selection)", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            value: [88, 143],
            valueMapper: function(operation) {
                setTimeout(function() {
                    operation.success([88, 143]);
                }, 0);
            }
        }));

        asyncDataSource.read();
        virtualList.bind("change", function() {
            done(() => {
                assert.equal(virtualList.selectedDataItems()[0].value, 88);
                assert.equal(virtualList.selectedDataItems()[1].value, 143);
            });
        });
    });

    asyncTest("can select item when value resolves to an index equal to the length of the first group", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            height: 400,
            itemHeight: 20,
            selectable: "multiple",
            valueMapper: function(operation) {
                setTimeout(function() {
                    operation.success(30);
                }, 0);
            }
        }));

        asyncDataSource.pageSize(80);
        virtualList.value(30);
        virtualList.bind("listBound", function() {
            let that = this;
            done(() => {
                assert.isOk(that.selectedDataItems().length);
                assert.equal(that.value()[0], 30);
            });
        });
    });

});
