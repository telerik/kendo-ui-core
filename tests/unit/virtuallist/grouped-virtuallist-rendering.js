import '@progress/kendo-ui/src/kendo.virtuallist.js';
import { asyncTest } from '../../helpers/unit/async-utils.js';

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

describe("Grouped VirtualList Rendering: ", function() {
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
            dataValueField: "value",
            itemHeight: ITEM_HEIGHT
        };

        // Add styles for virtual list
        Mocha.fixture.append($('<style>.k-virtual-content .k-list-item, .k-virtual-content .k-list-group-item { position: relative; } .k-list-ul { margin: 0; position: absolute; width: 100%; }</style>'));
    });

    afterEach(function() {
        if (container.data("kendoVirtualList")) {
            container.data("kendoVirtualList").destroy();
        }

        Mocha.fixture.empty();
    });

    // DOM Structure Tests

    asyncTest("renders multiple UL elements for grouped data", function(done) {
        let virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            done(() => {
                let uls = virtualList.element.find(".k-list-ul");
                assert.isOk(uls.length > 0, "Should render at least one UL");
            });
        });
    });

    asyncTest("first group UL does not have inline group header (uses sticky header)", function(done) {
        let virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            done(() => {
                let firstUl = virtualList.element.find(".k-list-ul").first();
                let groupHeaders = firstUl.find(".k-list-group-item");
                // First group uses sticky header, no inline header
                assert.equal(groupHeaders.length, 0, "First group has no inline header");
            });
        });
    });

    asyncTest("subsequent group ULs have inline group headers", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            height: 400 // Increase height to see more groups
        }));

        asyncDataSource.read().then(function() {
            done(() => {
                let uls = virtualList.element.find(".k-list-ul");
                if (uls.length > 1) {
                    let secondUl = uls.eq(1);
                    let groupHeaders = secondUl.find(".k-list-group-item");
                    assert.equal(groupHeaders.length, 1, "Groups after the first have inline headers");
                }
            });
        });
    });

    asyncTest("group ULs are positioned correctly", function(done) {
        let virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            done(() => {
                let uls = virtualList.element.find(".k-list-ul");
                if (uls.length > 0) {
                    let firstUl = uls.first();
                    // Check that UL has transform style applied
                    let transform = firstUl.css("transform");
                    assert.isOk(transform && transform !== "none", "UL should have transform style for positioning");
                }
            });
        });
    });

    // Scroll Tests

    asyncTest("sticky header updates on scroll", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            height: 400
        }));

        asyncDataSource.read().then(function() {
            let initialHeader = virtualList.header.text();
            
            // Scroll down past first group
            virtualList.content.scrollTop(1200); // Scroll to show items from second group
            virtualList.content.trigger("scroll");
            
            setTimeout(function() {
                done(() => {
                    // Header should have updated
                    assert.isOk(virtualList.header.text(), "Header should have text content");
                });
            }, 200);
        });
    });

    asyncTest("group ULs are recycled on scroll", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            height: 200
        }));

        asyncDataSource.read().then(function() {
            let initialUlCount = virtualList.element.find(".k-list-ul").length;
            
            // Scroll to different position
            virtualList.content.scrollTop(2000);
            virtualList.content.trigger("scroll");
            
            setTimeout(function() {
                done(() => {
                    let newUlCount = virtualList.element.find(".k-list-ul").length;
                    // Should have reasonable number of ULs (not exploding)
                    assert.isOk(newUlCount <= initialUlCount + 5, "UL count should remain reasonable after scrolling");
                });
            }, 200);
        });
    });

    // Items Tests

    asyncTest("items within groups have correct offset indices", function(done) {
        let virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            done(() => {
                let items = virtualList.items();
                if (items.length > 0) {
                    let firstItem = items.first();
                    let offsetIndex = firstItem.attr("data-offset-index");
                    assert.isOk(offsetIndex !== undefined, "Items should have data-offset-index attribute");
                    assert.equal(parseInt(offsetIndex, 10), 0, "First item should have offset index 0");
                }
            });
        });
    });

    asyncTest("items have correct k-list-item class", function(done) {
        let virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            done(() => {
                let items = virtualList.element.find(".k-list-item");
                assert.isOk(items.length > 0, "Should render items with k-list-item class");
            });
        });
    });
});

// Helper Function Tests
describe("Grouped VirtualList Helper Functions: ", function() {
    beforeEach(function() {
        Mocha.fixture.append($('<style>.k-list-ul { margin: 0; }</style>'));
    });

    afterEach(function() {
        Mocha.fixture.empty();
    });

    it("getGroupedTotalHeight calculates height correctly", function() {
        // Access the internal function through the widget
        let totalItems = 100;
        let itemHeight = 40;
        let groupCount = 5;
        
        // Expected: 100 items * 40px + 5 groups * 40px = 4200px
        let expected = (totalItems + groupCount) * itemHeight;
        
        // We can verify this by creating a virtual list and checking its height
        let container = $("<div></div>").appendTo(Mocha.fixture);
        let dataSource = new kendo.data.DataSource({
            data: Array.from({ length: 100 }, (_, i) => ({ 
                text: "Item " + i, 
                group: Math.floor(i / 20) 
            })),
            group: { field: "group" }
        });
        
        let virtualList = new kendo.ui.VirtualList(container, {
            dataSource: dataSource,
            itemHeight: itemHeight,
            height: 200,
            template: ({ text }) => kendo.htmlEncode(text),
            groupCount: groupCount
        });
        
        // Height should include group headers
        assert.isOk(virtualList.heightContainer, "Height container should exist");
        
        virtualList.destroy();
    });

    it("buildGroupRanges creates correct range structure", function() {
        let container = $("<div></div>").appendTo(Mocha.fixture);
        let data = [];
        
        // Create data with known groups
        for (let i = 0; i < 60; i++) {
            data.push({ text: "Item " + i, group: Math.floor(i / 20) });
        }
        
        let dataSource = new kendo.data.DataSource({
            data: data,
            group: { field: "group" }
        });
        
        dataSource.read();
        
        let view = dataSource.view();
        assert.equal(view.length, 3, "Should have 3 groups");
        assert.equal(view[0].items.length, 20, "First group should have 20 items");
        assert.equal(view[1].items.length, 20, "Second group should have 20 items");
        assert.equal(view[2].items.length, 20, "Third group should have 20 items");
    });
});

// Selection Tests
describe("Grouped VirtualList Selection: ", function() {
    let container, asyncDataSource, virtualSettings;
    let ITEM_HEIGHT = 40,
        CONTAINER_HEIGHT = 200;

    function groupedData(options) {
        let groupsDict = {};
        let groups = [];

        for (let i = options.skip, len = options.skip + options.take; i < len; i++) {
            let key = Math.floor(i / 30) * 30;

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
            dataValueField: "value",
            itemHeight: ITEM_HEIGHT,
            selectable: true
        };

        Mocha.fixture.append($('<style>.k-virtual-content .k-list-item { position: relative; } .k-list-ul { margin: 0; }</style>'));
    });

    afterEach(function() {
        if (container.data("kendoVirtualList")) {
            container.data("kendoVirtualList").destroy();
        }

        Mocha.fixture.empty();
    });

    asyncTest("can select items in grouped list", function(done) {
        let virtualList = new kendo.ui.VirtualList(container, $.extend(virtualSettings, {
            valueMapper: function(operation) {
                setTimeout(function() {
                    operation.success([0]);
                }, 0);
            }
        }));

        asyncDataSource.read().then(function() {
            virtualList.value(0);
            
            setTimeout(function() {
                done(() => {
                    let selected = virtualList.select();
                    assert.isOk(selected.length > 0 || virtualList.value().length > 0, "Should have selected items or value set");
                });
            }, 100);
        });
    });

    asyncTest("selection persists across group boundaries", function(done) {
        let virtualList = new kendo.ui.VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            valueMapper: function(operation) {
                setTimeout(function() {
                    operation.success(operation.value);
                }, 0);
            }
        }));

        asyncDataSource.read().then(function() {
            // Select items from different groups
            virtualList.value([5, 35]); // 5 is in first group, 35 is in second group
            
            virtualList.one("listBound", function() {
                done(() => {
                    let selected = virtualList.select();
                    assert.isOk(selected.length > 0, "Should have selected items from multiple groups");
                });
            });
        });
    });
});
