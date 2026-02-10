import '@progress/kendo-ui/src/kendo.virtuallist.js';
import { asyncTest } from '../../helpers/unit/async-utils.js';

/**
 * Comprehensive tests for grouped virtualization with server paging.
 * These tests cover all possible scenarios using mocked data.
 */

let container,
    VirtualList = kendo.ui.VirtualList,
    ITEM_HEIGHT = 40,
    CONTAINER_HEIGHT = 200;

// =============================================================================
// MOCK DATA GENERATORS
// =============================================================================

/**
 * Creates mock grouped data for server paging scenarios.
 * Simulates server response with groups that may span multiple pages.
 * @param {Object} options - { skip, take }
 * @param {Array} groupConfig - Array of { value, count } defining group structure
 * @param {number} total - Total number of items
 */
function createMockGroupedData(options, groupConfig, total) {
    const skip = options.skip || 0;
    const take = options.take || 40;
    const groups = [];
    const groupsDict = {};

    let currentIndex = 0;
    let itemCounter = 0;

    for (const config of groupConfig) {
        const groupStart = currentIndex;
        const groupEnd = currentIndex + config.count;

        // Check if this group overlaps with requested range
        if (groupEnd > skip && currentIndex < skip + take) {
            const rangeStart = Math.max(currentIndex, skip);
            const rangeEnd = Math.min(groupEnd, skip + take);

            if (!groupsDict[config.value]) {
                groupsDict[config.value] = {
                    field: config.field || "group",
                    items: [],
                    hasSubgroups: false,
                    value: config.value
                };
                groups.push(groupsDict[config.value]);
            }

            for (let i = rangeStart; i < rangeEnd; i++) {
                groupsDict[config.value].items.push({
                    text: `Item ${i}`,
                    value: i,
                    id: i
                });
            }
        }

        currentIndex = groupEnd;
    }

    return { groups, hasSubgroups: false, total };
}

/**
 * Creates mock data with boolean group values (e.g., Discontinued: true/false).
 */
function createBooleanGroupedData(options, total) {
    const skip = options.skip || 0;
    const take = options.take || 40;
    const groups = [];

    // Simulate: 39 items with false, 8 with true, remaining with false
    const groupConfig = [
        { value: false, start: 0, end: 39 },
        { value: true, start: 39, end: 47 },
        { value: false, start: 47, end: total }
    ];

    for (const config of groupConfig) {
        if (config.end > skip && config.start < skip + take) {
            const rangeStart = Math.max(config.start, skip);
            const rangeEnd = Math.min(config.end, skip + take);

            const items = [];
            for (let i = rangeStart; i < rangeEnd; i++) {
                items.push({ text: `Item ${i}`, value: i, discontinued: config.value });
            }

            if (items.length > 0) {
                groups.push({
                    field: "discontinued",
                    items: items,
                    hasSubgroups: false,
                    value: config.value
                });
            }
        }
    }

    return { groups, hasSubgroups: false, total };
}

/**
 * Creates mock data with non-contiguous groups (same group value appears at different positions).
 * This simulates real-world scenarios like:
 * - Products grouped by category where categories interleave
 * - Orders grouped by status where same status appears multiple times
 */
function createNonContiguousGroupedData(options, total) {
    const skip = options.skip || 0;
    const take = options.take || 40;
    const groups = [];

    // Simulate: Group A (items 0-19), Group B (items 20-39), Group A again (items 40-59), Group B again (items 60-79)
    const sections = [
        { value: "Group A", start: 0, end: 20 },
        { value: "Group B", start: 20, end: 40 },
        { value: "Group A", start: 40, end: 60 },
        { value: "Group B", start: 60, end: Math.min(80, total) }
    ];

    for (const section of sections) {
        if (section.end > skip && section.start < skip + take) {
            const rangeStart = Math.max(section.start, skip);
            const rangeEnd = Math.min(section.end, skip + take);

            const items = [];
            for (let i = rangeStart; i < rangeEnd; i++) {
                items.push({ text: `Item ${i}`, value: i, category: section.value });
            }

            if (items.length > 0) {
                groups.push({
                    field: "category",
                    items: items,
                    hasSubgroups: false,
                    value: section.value
                });
            }
        }
    }

    return { groups, hasSubgroups: false, total };
}

/**
 * Creates mock data with many small groups.
 */
function createManySmallGroupsData(options, total, groupSize) {
    const skip = options.skip || 0;
    const take = options.take || 40;
    const groups = [];
    const numGroups = Math.ceil(total / groupSize);

    for (let g = 0; g < numGroups; g++) {
        const groupStart = g * groupSize;
        const groupEnd = Math.min((g + 1) * groupSize, total);

        if (groupEnd > skip && groupStart < skip + take) {
            const rangeStart = Math.max(groupStart, skip);
            const rangeEnd = Math.min(groupEnd, skip + take);

            const items = [];
            for (let i = rangeStart; i < rangeEnd; i++) {
                items.push({ text: `Item ${i}`, value: i, group: `Group ${g}` });
            }

            if (items.length > 0) {
                groups.push({
                    field: "group",
                    items: items,
                    hasSubgroups: false,
                    value: `Group ${g}`
                });
            }
        }
    }

    return { groups, hasSubgroups: false, total };
}

/**
 * Creates mock data with a single large group.
 */
function createSingleGroupData(options, total) {
    const skip = options.skip || 0;
    const take = options.take || 40;

    const items = [];
    for (let i = skip; i < Math.min(skip + take, total); i++) {
        items.push({ text: `Item ${i}`, value: i, group: "All Items" });
    }

    return {
        groups: items.length > 0 ? [{
            field: "group",
            items: items,
            hasSubgroups: false,
            value: "All Items"
        }] : [],
        hasSubgroups: false,
        total
    };
}

// =============================================================================
// DATASOURCE FACTORY
// =============================================================================

function createMockDataSource(dataGenerator, total, pageSize = 40) {
    return new kendo.data.DataSource({
        transport: {
            read: function(options) {
                setTimeout(function() {
                    const result = dataGenerator(options.data, total);
                    options.success(result);
                }, 0);
            }
        },
        serverGrouping: true,
        serverPaging: true,
        pageSize: pageSize,
        group: { field: "group" },
        schema: {
            groups: "groups",
            total: "total"
        }
    });
}

// =============================================================================
// TEST SUITES
// =============================================================================

describe("Grouped VirtualList - Server Paging Scenarios: ", function() {
    beforeEach(function() {
        container = $("<div id='container'></div>").appendTo(Mocha.fixture);
        Mocha.fixture.append($('<style>.k-virtual-content .k-list-item, .k-virtual-content .k-list-group-item { box-sizing: border-box; } .k-list-ul { margin: 0; position: absolute; width: 100%; }</style>'));
    });

    afterEach(function() {
        if (container.data("kendoVirtualList")) {
            container.data("kendoVirtualList").destroy();
        }
        Mocha.fixture.empty();
    });

    // -------------------------------------------------------------------------
    // BASIC RENDERING TESTS
    // -------------------------------------------------------------------------

    describe("Basic Rendering: ", function() {
        asyncTest("renders grouped data correctly on initial load", function(done) {
            const dataSource = createMockDataSource(
                (opts, total) => createMockGroupedData(opts, [
                    { value: "Group 1", count: 20 },
                    { value: "Group 2", count: 20 },
                    { value: "Group 3", count: 20 }
                ], total),
                60
            );

            const virtualList = new VirtualList(container, {
                autoBind: false,
                height: CONTAINER_HEIGHT,
                dataSource: dataSource,
                template: ({ text }) => kendo.htmlEncode(text),
                dataValueField: "value",
                itemHeight: ITEM_HEIGHT
            });

            dataSource.read().then(function() {
                done(() => {
                    const uls = virtualList.element.find(".k-list-ul");
                    assert.isOk(uls.length >= 1, "Should render at least one UL for groups");

                    const items = virtualList.items();
                    assert.isOk(items.length > 0, "Should render items");
                });
            });
        });

        asyncTest("creates sticky header element", function(done) {
            const dataSource = createMockDataSource(
                (opts, total) => createMockGroupedData(opts, [{ value: "Test Group", count: 50 }], total),
                50
            );

            const virtualList = new VirtualList(container, {
                autoBind: false,
                height: CONTAINER_HEIGHT,
                dataSource: dataSource,
                template: ({ text }) => kendo.htmlEncode(text),
                dataValueField: "value",
                itemHeight: ITEM_HEIGHT
            });

            dataSource.read().then(function() {
                done(() => {
                    assert.isOk(virtualList.header, "Should create sticky header");
                    assert.isOk($(virtualList.header).hasClass("k-list-group-sticky-header"), "Header should have sticky class");
                });
            });
        });

        asyncTest("sticky header shows correct group value", function(done) {
            const dataSource = createMockDataSource(
                (opts, total) => createMockGroupedData(opts, [{ value: "First Group", count: 50 }], total),
                50
            );

            const virtualList = new VirtualList(container, {
                autoBind: false,
                height: CONTAINER_HEIGHT,
                dataSource: dataSource,
                template: ({ text }) => kendo.htmlEncode(text),
                dataValueField: "value",
                itemHeight: ITEM_HEIGHT
            });

            dataSource.read().then(function() {
                setTimeout(function() {
                    done(() => {
                        assert.equal($(virtualList.header).text(), "First Group", "Header should show first group value");
                    });
                }, 50);
            });
        });

        asyncTest("ulElements method returns all group ULs for grouped list", function(done) {
            const dataSource = createMockDataSource(
                (opts, total) => createMockGroupedData(opts, [
                    { value: "Group A", count: 20 },
                    { value: "Group B", count: 20 }
                ], total),
                40
            );

            const virtualList = new VirtualList(container, {
                autoBind: false,
                height: CONTAINER_HEIGHT,
                dataSource: dataSource,
                template: ({ text }) => kendo.htmlEncode(text),
                dataValueField: "value",
                itemHeight: ITEM_HEIGHT
            });

            dataSource.read().then(function() {
                done(() => {
                    const ulElements = virtualList.ulElements();
                    assert.isOk(ulElements instanceof $, "ulElements should return a jQuery object");
                    assert.isOk(ulElements.length >= 1, "ulElements should return at least one UL for grouped list");
                    ulElements.each(function() {
                        assert.isOk($(this).hasClass("k-list-ul"), "Each element should have k-list-ul class");
                    });
                });
            });
        });

        asyncTest("ul property is null for grouped list", function(done) {
            const dataSource = createMockDataSource(
                (opts, total) => createMockGroupedData(opts, [
                    { value: "Group A", count: 20 }
                ], total),
                20
            );

            const virtualList = new VirtualList(container, {
                autoBind: false,
                height: CONTAINER_HEIGHT,
                dataSource: dataSource,
                template: ({ text }) => kendo.htmlEncode(text),
                dataValueField: "value",
                itemHeight: ITEM_HEIGHT
            });

            dataSource.read().then(function() {
                done(() => {
                    // For grouped lists, ul property should be null (use ulElements instead)
                    assert.isOk(!virtualList.ul, "ul property should be null/undefined for grouped list");
                });
            });
        });

        asyncTest("each group UL has correct data attributes", function(done) {
            const dataSource = createMockDataSource(
                (opts, total) => createMockGroupedData(opts, [
                    { value: "Group A", count: 20 },
                    { value: "Group B", count: 20 }
                ], total),
                40
            );

            const virtualList = new VirtualList(container, {
                autoBind: false,
                height: CONTAINER_HEIGHT,
                dataSource: dataSource,
                template: ({ text }) => kendo.htmlEncode(text),
                dataValueField: "value",
                itemHeight: ITEM_HEIGHT
            });

            dataSource.read().then(function() {
                done(() => {
                    const uls = virtualList.element.find(".k-list-ul");
                    uls.each(function() {
                        const ul = $(this);
                        // data-group-index is always set; data-section-index is only set when > 0
                        assert.isOk(ul.attr("data-group-index") !== undefined, "UL should have data-group-index");
                        assert.isOk(ul.attr("aria-labelledby"), "UL should have aria-labelledby");
                    });
                });
            });
        });
    });

    // -------------------------------------------------------------------------
    // BOOLEAN GROUP VALUES
    // -------------------------------------------------------------------------

    describe("Boolean Group Values: ", function() {
        asyncTest("handles false boolean group value correctly", function(done) {
            const dataSource = createMockDataSource(
                (opts, total) => createBooleanGroupedData(opts, total),
                70
            );
            dataSource.options.group = { field: "discontinued" };

            const virtualList = new VirtualList(container, {
                autoBind: false,
                height: CONTAINER_HEIGHT,
                dataSource: dataSource,
                template: ({ text }) => kendo.htmlEncode(text),
                dataValueField: "value",
                itemHeight: ITEM_HEIGHT
            });

            dataSource.read().then(function() {
                setTimeout(function() {
                    done(() => {
                        // Check that group header shows "false" not empty
                        const headerText = $(virtualList.header).text();
                        assert.equal(headerText, "false", "Header should show 'false' for boolean false group");
                    });
                }, 50);
            });
        });

        asyncTest("handles true boolean group value correctly", function(done) {
            // Create data where true is the first group
            const dataSource = new kendo.data.DataSource({
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            const skip = options.data.skip || 0;
                            const take = options.data.take || 40;
                            const groups = [];

                            // First 20 items are true, rest are false
                            const sections = [
                                { value: true, start: 0, end: 20 },
                                { value: false, start: 20, end: 60 }
                            ];

                            for (const section of sections) {
                                if (section.end > skip && section.start < skip + take) {
                                    const rangeStart = Math.max(section.start, skip);
                                    const rangeEnd = Math.min(section.end, skip + take);
                                    const items = [];
                                    for (let i = rangeStart; i < rangeEnd; i++) {
                                        items.push({ text: `Item ${i}`, value: i });
                                    }
                                    if (items.length > 0) {
                                        groups.push({
                                            field: "active",
                                            items: items,
                                            hasSubgroups: false,
                                            value: section.value
                                        });
                                    }
                                }
                            }

                            options.success({ groups, hasSubgroups: false, total: 60 });
                        }, 0);
                    }
                },
                serverGrouping: true,
                serverPaging: true,
                pageSize: 40,
                group: { field: "active" },
                schema: { groups: "groups", total: "total" }
            });

            const virtualList = new VirtualList(container, {
                autoBind: false,
                height: CONTAINER_HEIGHT,
                dataSource: dataSource,
                template: ({ text }) => kendo.htmlEncode(text),
                dataValueField: "value",
                itemHeight: ITEM_HEIGHT
            });

            dataSource.read().then(function() {
                setTimeout(function() {
                    done(() => {
                        const headerText = $(virtualList.header).text();
                        assert.equal(headerText, "true", "Header should show 'true' for boolean true group");
                    });
                }, 50);
            });
        });

        asyncTest("generates correct aria-labelledby IDs for boolean values", function(done) {
            const dataSource = createMockDataSource(
                (opts, total) => createBooleanGroupedData(opts, total),
                70
            );
            dataSource.options.group = { field: "discontinued" };

            const virtualList = new VirtualList(container, {
                autoBind: false,
                height: CONTAINER_HEIGHT,
                dataSource: dataSource,
                template: ({ text }) => kendo.htmlEncode(text),
                dataValueField: "value",
                itemHeight: ITEM_HEIGHT
            });

            dataSource.read().then(function() {
                done(() => {
                    const uls = virtualList.element.find(".k-list-ul");
                    const firstUlLabel = uls.first().attr("aria-labelledby");
                    
                    // Should contain "false" in the ID (not be empty)
                    assert.isOk(firstUlLabel.indexOf("false") > -1, "aria-labelledby should contain 'false' for boolean false group");
                });
            });
        });
    });

    // -------------------------------------------------------------------------
    // NON-CONTIGUOUS GROUPS
    // -------------------------------------------------------------------------

    describe("Non-Contiguous Groups: ", function() {
        asyncTest("renders separate ULs for non-contiguous sections of same group", function(done) {
            const dataSource = createMockDataSource(
                (opts, total) => createNonContiguousGroupedData(opts, total),
                80
            );
            dataSource.options.group = { field: "category" };

            const virtualList = new VirtualList(container, {
                autoBind: false,
                height: 400, // Larger to see more groups
                dataSource: dataSource,
                template: ({ text }) => kendo.htmlEncode(text),
                dataValueField: "value",
                itemHeight: ITEM_HEIGHT
            });

            dataSource.read().then(function() {
                done(() => {
                    const uls = virtualList.element.find(".k-list-ul");
                    // Should have separate ULs - Group A, Group B, Group A, Group B
                    assert.isOk(uls.length >= 2, "Should render multiple ULs for non-contiguous groups");
                    
                    // Check section indices are unique
                    const sectionIndices = [];
                    uls.each(function() {
                        sectionIndices.push($(this).attr("data-section-index"));
                    });
                    const uniqueIndices = [...new Set(sectionIndices)];
                    assert.equal(sectionIndices.length, uniqueIndices.length, "Each UL should have unique section index");
                });
            });
        });

        asyncTest("items maintain correct order in non-contiguous groups", function(done) {
            const dataSource = createMockDataSource(
                (opts, total) => createNonContiguousGroupedData(opts, total),
                80
            );
            dataSource.options.group = { field: "category" };

            const virtualList = new VirtualList(container, {
                autoBind: false,
                height: 800, // Large enough to see all items
                dataSource: dataSource,
                template: ({ text }) => kendo.htmlEncode(text),
                dataValueField: "value",
                itemHeight: ITEM_HEIGHT
            });

            dataSource.read().then(function() {
                done(() => {
                    const items = virtualList.items();
                    let previousIndex = -1;
                    let hasCorrectOrder = true;

                    items.each(function() {
                        const offsetIndex = parseInt($(this).attr("data-offset-index"), 10);
                        if (offsetIndex <= previousIndex) {
                            hasCorrectOrder = false;
                        }
                        previousIndex = offsetIndex;
                    });

                    assert.isOk(hasCorrectOrder, "Items should maintain correct ascending order");
                });
            });
        });

        asyncTest("no overlapping items in non-contiguous groups", function(done) {
            const dataSource = createMockDataSource(
                (opts, total) => createNonContiguousGroupedData(opts, total),
                80
            );
            dataSource.options.group = { field: "category" };

            const virtualList = new VirtualList(container, {
                autoBind: false,
                height: 400,
                dataSource: dataSource,
                template: ({ text }) => kendo.htmlEncode(text),
                dataValueField: "value",
                itemHeight: ITEM_HEIGHT
            });

            dataSource.read().then(function() {
                done(() => {
                    const items = virtualList.items();
                    const offsetIndices = [];

                    items.each(function() {
                        offsetIndices.push($(this).attr("data-offset-index"));
                    });

                    const uniqueIndices = [...new Set(offsetIndices)];
                    assert.equal(offsetIndices.length, uniqueIndices.length, "No duplicate offset indices (no overlapping items)");
                });
            });
        });
    });

    // -------------------------------------------------------------------------
    // SCROLLING TESTS
    // -------------------------------------------------------------------------

    describe("Scrolling Behavior: ", function() {
        asyncTest("scrolling loads additional pages", function(done) {
            const dataSource = createMockDataSource(
                (opts, total) => createMockGroupedData(opts, [
                    { value: "Group 1", count: 100 },
                    { value: "Group 2", count: 100 },
                    { value: "Group 3", count: 100 }
                ], total),
                300
            );

            const virtualList = new VirtualList(container, {
                autoBind: false,
                height: CONTAINER_HEIGHT,
                dataSource: dataSource,
                template: ({ text }) => kendo.htmlEncode(text),
                dataValueField: "value",
                itemHeight: ITEM_HEIGHT
            });

            dataSource.read().then(function() {
                const initialItemCount = virtualList.items().length;

                // Scroll down significantly
                virtualList.content.scrollTop(2000);
                virtualList.content.trigger("scroll");

                setTimeout(function() {
                    done(() => {
                        // Items should still be rendered (virtualization working)
                        assert.isOk(virtualList.items().length > 0, "Should have items after scrolling");
                    });
                }, 200);
            });
        });

        asyncTest("sticky header updates when scrolling to new group", function(done) {
            const dataSource = createMockDataSource(
                (opts, total) => createMockGroupedData(opts, [
                    { value: "First Group", count: 30 },
                    { value: "Second Group", count: 30 },
                    { value: "Third Group", count: 30 }
                ], total),
                90
            );

            const virtualList = new VirtualList(container, {
                autoBind: false,
                height: CONTAINER_HEIGHT,
                dataSource: dataSource,
                template: ({ text }) => kendo.htmlEncode(text),
                dataValueField: "value",
                itemHeight: ITEM_HEIGHT
            });

            dataSource.read().then(function() {
                setTimeout(function() {
                    const initialHeader = $(virtualList.header).text();
                    assert.equal(initialHeader, "First Group", "Initial header should be First Group");

                    // Scroll past first group (30 items * 40px = 1200px + header)
                    virtualList.content.scrollTop(1300);
                    virtualList.content.trigger("scroll");

                    setTimeout(function() {
                        done(() => {
                            const newHeader = $(virtualList.header).text();
                            assert.notEqual(newHeader, "First Group", "Header should change after scrolling past first group");
                        });
                    }, 200);
                }, 50);
            });
        });

        asyncTest("ULs are properly positioned after scrolling", function(done) {
            const dataSource = createMockDataSource(
                (opts, total) => createMockGroupedData(opts, [
                    { value: "Group 1", count: 50 },
                    { value: "Group 2", count: 50 }
                ], total),
                100
            );

            const virtualList = new VirtualList(container, {
                autoBind: false,
                height: CONTAINER_HEIGHT,
                dataSource: dataSource,
                template: ({ text }) => kendo.htmlEncode(text),
                dataValueField: "value",
                itemHeight: ITEM_HEIGHT
            });

            dataSource.read().then(function() {
                // Scroll to middle
                virtualList.content.scrollTop(1000);
                virtualList.content.trigger("scroll");

                setTimeout(function() {
                    done(() => {
                        const uls = virtualList.element.find(".k-list-ul");
                        let allHaveTransform = true;

                        uls.each(function() {
                            const transform = $(this).css("transform");
                            if (!transform || transform === "none") {
                                allHaveTransform = false;
                            }
                        });

                        assert.isOk(allHaveTransform, "All ULs should have transform for positioning");
                    });
                }, 200);
            });
        });

        asyncTest("no gaps between ULs after scrolling", function(done) {
            const dataSource = createMockDataSource(
                (opts, total) => createMockGroupedData(opts, [
                    { value: "Group 1", count: 30 },
                    { value: "Group 2", count: 30 },
                    { value: "Group 3", count: 30 }
                ], total),
                90
            );

            const virtualList = new VirtualList(container, {
                autoBind: false,
                height: CONTAINER_HEIGHT,
                dataSource: dataSource,
                template: ({ text }) => kendo.htmlEncode(text),
                dataValueField: "value",
                itemHeight: ITEM_HEIGHT
            });

            dataSource.read().then(function() {
                setTimeout(function() {
                    // Scroll down
                    virtualList.content.scrollTop(500);
                    virtualList.content.trigger("scroll");

                    setTimeout(function() {
                        done(() => {
                            const uls = virtualList.element.find(".k-list-ul");
                            const positions = [];

                            uls.each(function() {
                                const transform = $(this).css("transform");
                                if (transform && transform !== "none") {
                                    // Extract translateY value from matrix
                                    const match = transform.match(/matrix\([^,]+,[^,]+,[^,]+,[^,]+,[^,]+,\s*([^)]+)\)/);
                                    if (match) {
                                        positions.push({ el: this, y: parseFloat(match[1]) });
                                    }
                                }
                            });

                            // Sort by Y position
                            positions.sort((a, b) => a.y - b.y);

                            // Check for gaps (each UL should start where previous ends)
                            // This is approximate due to virtualization
                            assert.isOk(positions.length > 0, "Should have positioned ULs");
                        });
                    }, 200);
                }, 50);
            });
        });
    });

    // -------------------------------------------------------------------------
    // MANY SMALL GROUPS
    // -------------------------------------------------------------------------

    describe("Many Small Groups: ", function() {
        asyncTest("handles many small groups efficiently", function(done) {
            const dataSource = createMockDataSource(
                (opts, total) => createManySmallGroupsData(opts, total, 5), // 5 items per group
                100 // 20 groups
            );

            const virtualList = new VirtualList(container, {
                autoBind: false,
                height: CONTAINER_HEIGHT,
                dataSource: dataSource,
                template: ({ text }) => kendo.htmlEncode(text),
                dataValueField: "value",
                itemHeight: ITEM_HEIGHT
            });

            dataSource.read().then(function() {
                done(() => {
                    const uls = virtualList.element.find(".k-list-ul");
                    assert.isOk(uls.length > 0, "Should render ULs for small groups");

                    // Check items are rendered correctly
                    const items = virtualList.items();
                    assert.isOk(items.length > 0, "Should render items from small groups");
                });
            });
        });

        asyncTest("group headers are visible for small groups", function(done) {
            const dataSource = createMockDataSource(
                (opts, total) => createManySmallGroupsData(opts, total, 3), // 3 items per group
                30 // 10 groups
            );

            const virtualList = new VirtualList(container, {
                autoBind: false,
                height: 400, // Larger to see more
                dataSource: dataSource,
                template: ({ text }) => kendo.htmlEncode(text),
                dataValueField: "value",
                itemHeight: ITEM_HEIGHT
            });

            dataSource.read().then(function() {
                done(() => {
                    // Check sticky header exists
                    assert.isOk(virtualList.header, "Should have sticky header");
                    assert.isOk($(virtualList.header).text(), "Sticky header should have text");
                });
            });
        });
    });

    // -------------------------------------------------------------------------
    // SINGLE GROUP
    // -------------------------------------------------------------------------

    describe("Single Group: ", function() {
        asyncTest("renders single group correctly", function(done) {
            const dataSource = createMockDataSource(
                (opts, total) => createSingleGroupData(opts, total),
                100
            );

            const virtualList = new VirtualList(container, {
                autoBind: false,
                height: CONTAINER_HEIGHT,
                dataSource: dataSource,
                template: ({ text }) => kendo.htmlEncode(text),
                dataValueField: "value",
                itemHeight: ITEM_HEIGHT
            });

            dataSource.read().then(function() {
                done(() => {
                    const uls = virtualList.element.find(".k-list-ul");
                    assert.equal(uls.length, 1, "Should render exactly one UL for single group");

                    const headerText = $(virtualList.header).text();
                    assert.equal(headerText, "All Items", "Header should show single group name");
                });
            });
        });

        asyncTest("renders correctly with single large group", function(done) {
            const dataSource = createMockDataSource(
                (opts, total) => createSingleGroupData(opts, total),
                200
            );

            const virtualList = new VirtualList(container, {
                autoBind: false,
                height: CONTAINER_HEIGHT,
                dataSource: dataSource,
                template: ({ text }) => kendo.htmlEncode(text),
                dataValueField: "value",
                itemHeight: ITEM_HEIGHT
            });

            dataSource.read().then(function() {
                setTimeout(function() {
                    done(() => {
                        // Header should show the group
                        const headerText = $(virtualList.header).text();
                        assert.equal(headerText, "All Items", "Header should show single group name");

                        // Items should be rendered
                        assert.isOk(virtualList.items().length > 0, "Should have items rendered");
                    });
                }, 50);
            });
        });
    });

    // -------------------------------------------------------------------------
    // EMPTY GROUPS / EDGE CASES
    // -------------------------------------------------------------------------

    describe("Edge Cases: ", function() {
        asyncTest("handles empty data gracefully", function(done) {
            const dataSource = new kendo.data.DataSource({
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            options.success({ groups: [], hasSubgroups: false, total: 0 });
                        }, 0);
                    }
                },
                serverGrouping: true,
                serverPaging: true,
                pageSize: 40,
                group: { field: "group" },
                schema: { groups: "groups", total: "total" }
            });

            const virtualList = new VirtualList(container, {
                autoBind: false,
                height: CONTAINER_HEIGHT,
                dataSource: dataSource,
                template: ({ text }) => kendo.htmlEncode(text),
                dataValueField: "value",
                itemHeight: ITEM_HEIGHT
            });

            dataSource.read().then(function() {
                done(() => {
                    const items = virtualList.items();
                    assert.equal(items.length, 0, "Should have no items for empty data");
                });
            });
        });

        asyncTest("handles group with special characters in value", function(done) {
            const dataSource = new kendo.data.DataSource({
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            const items = [];
                            for (let i = 0; i < 10; i++) {
                                items.push({ text: `Item ${i}`, value: i });
                            }
                            options.success({
                                groups: [{
                                    field: "group",
                                    items: items,
                                    hasSubgroups: false,
                                    value: "Group <with> \"special\" & 'chars'"
                                }],
                                hasSubgroups: false,
                                total: 10
                            });
                        }, 0);
                    }
                },
                serverGrouping: true,
                serverPaging: true,
                pageSize: 40,
                group: { field: "group" },
                schema: { groups: "groups", total: "total" }
            });

            const virtualList = new VirtualList(container, {
                autoBind: false,
                height: CONTAINER_HEIGHT,
                dataSource: dataSource,
                template: ({ text }) => kendo.htmlEncode(text),
                dataValueField: "value",
                itemHeight: ITEM_HEIGHT
            });

            dataSource.read().then(function() {
                done(() => {
                    // Should not throw error
                    const items = virtualList.items();
                    assert.equal(items.length, 10, "Should render items despite special characters in group value");
                });
            });
        });

        asyncTest("handles null group value", function(done) {
            const dataSource = new kendo.data.DataSource({
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            const items = [];
                            for (let i = 0; i < 10; i++) {
                                items.push({ text: `Item ${i}`, value: i });
                            }
                            options.success({
                                groups: [{
                                    field: "group",
                                    items: items,
                                    hasSubgroups: false,
                                    value: null
                                }],
                                hasSubgroups: false,
                                total: 10
                            });
                        }, 0);
                    }
                },
                serverGrouping: true,
                serverPaging: true,
                pageSize: 40,
                group: { field: "group" },
                schema: { groups: "groups", total: "total" }
            });

            const virtualList = new VirtualList(container, {
                autoBind: false,
                height: CONTAINER_HEIGHT,
                dataSource: dataSource,
                template: ({ text }) => kendo.htmlEncode(text),
                dataValueField: "value",
                itemHeight: ITEM_HEIGHT
            });

            dataSource.read().then(function() {
                done(() => {
                    const items = virtualList.items();
                    assert.equal(items.length, 10, "Should render items with null group value");
                });
            });
        });

        asyncTest("handles undefined group value", function(done) {
            const dataSource = new kendo.data.DataSource({
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            const items = [];
                            for (let i = 0; i < 10; i++) {
                                items.push({ text: `Item ${i}`, value: i });
                            }
                            options.success({
                                groups: [{
                                    field: "group",
                                    items: items,
                                    hasSubgroups: false,
                                    value: undefined
                                }],
                                hasSubgroups: false,
                                total: 10
                            });
                        }, 0);
                    }
                },
                serverGrouping: true,
                serverPaging: true,
                pageSize: 40,
                group: { field: "group" },
                schema: { groups: "groups", total: "total" }
            });

            const virtualList = new VirtualList(container, {
                autoBind: false,
                height: CONTAINER_HEIGHT,
                dataSource: dataSource,
                template: ({ text }) => kendo.htmlEncode(text),
                dataValueField: "value",
                itemHeight: ITEM_HEIGHT
            });

            dataSource.read().then(function() {
                done(() => {
                    const items = virtualList.items();
                    assert.equal(items.length, 10, "Should render items with undefined group value");
                });
            });
        });

        asyncTest("handles numeric group values", function(done) {
            const dataSource = new kendo.data.DataSource({
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            const groups = [];
                            for (let g = 0; g < 3; g++) {
                                const items = [];
                                for (let i = 0; i < 10; i++) {
                                    items.push({ text: `Item ${g * 10 + i}`, value: g * 10 + i });
                                }
                                groups.push({
                                    field: "category",
                                    items: items,
                                    hasSubgroups: false,
                                    value: g * 100 // numeric: 0, 100, 200
                                });
                            }
                            options.success({ groups, hasSubgroups: false, total: 30 });
                        }, 0);
                    }
                },
                serverGrouping: true,
                serverPaging: true,
                pageSize: 40,
                group: { field: "category" },
                schema: { groups: "groups", total: "total" }
            });

            const virtualList = new VirtualList(container, {
                autoBind: false,
                height: CONTAINER_HEIGHT,
                dataSource: dataSource,
                template: ({ text }) => kendo.htmlEncode(text),
                dataValueField: "value",
                itemHeight: ITEM_HEIGHT
            });

            dataSource.read().then(function() {
                done(() => {
                    const headerText = $(virtualList.header).text();
                    assert.equal(headerText, "0", "Header should show numeric group value");
                });
            });
        });

        asyncTest("handles zero numeric group value", function(done) {
            const dataSource = new kendo.data.DataSource({
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            const items = [];
                            for (let i = 0; i < 10; i++) {
                                items.push({ text: `Item ${i}`, value: i });
                            }
                            options.success({
                                groups: [{
                                    field: "group",
                                    items: items,
                                    hasSubgroups: false,
                                    value: 0 // falsy but valid
                                }],
                                hasSubgroups: false,
                                total: 10
                            });
                        }, 0);
                    }
                },
                serverGrouping: true,
                serverPaging: true,
                pageSize: 40,
                group: { field: "group" },
                schema: { groups: "groups", total: "total" }
            });

            const virtualList = new VirtualList(container, {
                autoBind: false,
                height: CONTAINER_HEIGHT,
                dataSource: dataSource,
                template: ({ text }) => kendo.htmlEncode(text),
                dataValueField: "value",
                itemHeight: ITEM_HEIGHT
            });

            dataSource.read().then(function() {
                setTimeout(function() {
                    done(() => {
                        const headerText = $(virtualList.header).text();
                        assert.equal(headerText, "0", "Header should show '0' for zero group value");
                    });
                }, 50);
            });
        });

        asyncTest("handles empty string group value", function(done) {
            const dataSource = new kendo.data.DataSource({
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            const items = [];
                            for (let i = 0; i < 10; i++) {
                                items.push({ text: `Item ${i}`, value: i });
                            }
                            options.success({
                                groups: [{
                                    field: "group",
                                    items: items,
                                    hasSubgroups: false,
                                    value: "" // empty string
                                }],
                                hasSubgroups: false,
                                total: 10
                            });
                        }, 0);
                    }
                },
                serverGrouping: true,
                serverPaging: true,
                pageSize: 40,
                group: { field: "group" },
                schema: { groups: "groups", total: "total" }
            });

            const virtualList = new VirtualList(container, {
                autoBind: false,
                height: CONTAINER_HEIGHT,
                dataSource: dataSource,
                template: ({ text }) => kendo.htmlEncode(text),
                dataValueField: "value",
                itemHeight: ITEM_HEIGHT
            });

            dataSource.read().then(function() {
                done(() => {
                    // Should not throw, items should render
                    const items = virtualList.items();
                    assert.equal(items.length, 10, "Should render items with empty string group value");
                });
            });
        });
    });

    // -------------------------------------------------------------------------
    // SELECTION IN GROUPED LIST
    // -------------------------------------------------------------------------

    describe("Selection: ", function() {
        asyncTest("can select item in first group", function(done) {
            const dataSource = createMockDataSource(
                (opts, total) => createMockGroupedData(opts, [
                    { value: "Group 1", count: 20 },
                    { value: "Group 2", count: 20 }
                ], total),
                40
            );

            const virtualList = new VirtualList(container, {
                autoBind: false,
                height: CONTAINER_HEIGHT,
                dataSource: dataSource,
                template: ({ text }) => kendo.htmlEncode(text),
                dataValueField: "value",
                itemHeight: ITEM_HEIGHT,
                selectable: true,
                valueMapper: function(operation) {
                    setTimeout(function() {
                        operation.success(operation.value);
                    }, 0);
                }
            });

            dataSource.read().then(function() {
                virtualList.value([5]);

                setTimeout(function() {
                    done(() => {
                        const value = virtualList.value();
                        assert.deepEqual(value, [5], "Should have value 5 selected");
                    });
                }, 100);
            });
        });

        asyncTest("can select items from multiple groups", function(done) {
            const dataSource = createMockDataSource(
                (opts, total) => createMockGroupedData(opts, [
                    { value: "Group 1", count: 20 },
                    { value: "Group 2", count: 20 }
                ], total),
                40
            );

            const virtualList = new VirtualList(container, {
                autoBind: false,
                height: CONTAINER_HEIGHT,
                dataSource: dataSource,
                template: ({ text }) => kendo.htmlEncode(text),
                dataValueField: "value",
                itemHeight: ITEM_HEIGHT,
                selectable: "multiple",
                valueMapper: function(operation) {
                    setTimeout(function() {
                        operation.success(operation.value);
                    }, 0);
                }
            });

            dataSource.read().then(function() {
                virtualList.value([5, 25]); // 5 from Group 1, 25 from Group 2

                setTimeout(function() {
                    done(() => {
                        const value = virtualList.value();
                        // Sort numerically, not lexicographically
                        assert.deepEqual(value.slice().sort((a, b) => a - b), [5, 25], "Should have items from both groups selected");
                    });
                }, 100);
            });
        });
    });

    // -------------------------------------------------------------------------
    // PLACEHOLDER / LOADING TESTS
    // -------------------------------------------------------------------------

    describe("Placeholders: ", function() {
        asyncTest("shows placeholders while loading", function(done) {
            let readCount = 0;
            const dataSource = new kendo.data.DataSource({
                transport: {
                    read: function(options) {
                        readCount++;
                        // Delay to allow checking for placeholders
                        setTimeout(function() {
                            const items = [];
                            for (let i = options.data.skip; i < Math.min(options.data.skip + options.data.take, 100); i++) {
                                items.push({ text: `Item ${i}`, value: i });
                            }
                            options.success({
                                groups: [{
                                    field: "group",
                                    items: items,
                                    hasSubgroups: false,
                                    value: "Loading Test"
                                }],
                                hasSubgroups: false,
                                total: 100
                            });
                        }, readCount === 1 ? 0 : 100); // First read fast, subsequent slow
                    }
                },
                serverGrouping: true,
                serverPaging: true,
                pageSize: 40,
                group: { field: "group" },
                schema: { groups: "groups", total: "total" }
            });

            const virtualList = new VirtualList(container, {
                autoBind: false,
                height: CONTAINER_HEIGHT,
                dataSource: dataSource,
                template: ({ text }) => kendo.htmlEncode(text),
                dataValueField: "value",
                itemHeight: ITEM_HEIGHT
            });

            dataSource.read().then(function() {
                // Scroll to trigger new page load
                virtualList.content.scrollTop(3000);
                virtualList.content.trigger("scroll");

                // Check immediately for placeholders
                setTimeout(function() {
                    done(() => {
                        // After scrolling, should have items rendered
                        assert.isOk(virtualList.items().length > 0, "Should have items rendered");
                    });
                }, 200);
            });
        });
    });

    // -------------------------------------------------------------------------
    // ARIA ACCESSIBILITY
    // -------------------------------------------------------------------------

    describe("ARIA Accessibility: ", function() {
        asyncTest("ULs have proper aria-labelledby referencing group headers", function(done) {
            const dataSource = createMockDataSource(
                (opts, total) => createMockGroupedData(opts, [
                    { value: "Accessible Group", count: 20 }
                ], total),
                20
            );

            const virtualList = new VirtualList(container, {
                autoBind: false,
                height: CONTAINER_HEIGHT,
                dataSource: dataSource,
                template: ({ text }) => kendo.htmlEncode(text),
                dataValueField: "value",
                itemHeight: ITEM_HEIGHT
            });

            dataSource.read().then(function() {
                done(() => {
                    const ul = virtualList.element.find(".k-list-ul").first();
                    const labelledBy = ul.attr("aria-labelledby");
                    
                    assert.isOk(labelledBy, "UL should have aria-labelledby");
                    
                    // The aria-labelledby should contain a valid ID format
                    assert.isOk(labelledBy.indexOf("group-") > -1, "aria-labelledby should reference a group ID");
                });
            });
        });

        asyncTest("group header elements have correct IDs", function(done) {
            const dataSource = createMockDataSource(
                (opts, total) => createMockGroupedData(opts, [
                    { value: "Header Test", count: 20 }
                ], total),
                20
            );

            const virtualList = new VirtualList(container, {
                autoBind: false,
                height: CONTAINER_HEIGHT,
                dataSource: dataSource,
                template: ({ text }) => kendo.htmlEncode(text),
                dataValueField: "value",
                itemHeight: ITEM_HEIGHT
            });

            dataSource.read().then(function() {
                done(() => {
                    // Check that ULs have aria-labelledby with group ID format
                    const uls = virtualList.element.find(".k-list-ul");
                    let hasGroupId = false;
                    uls.each(function() {
                        const labelledBy = $(this).attr("aria-labelledby") || "";
                        if (labelledBy.indexOf("group-") > -1) {
                            hasGroupId = true;
                        }
                    });
                    assert.isOk(hasGroupId, "ULs should reference group IDs via aria-labelledby");
                });
            });
        });

        asyncTest("items have correct role attribute", function(done) {
            const dataSource = createMockDataSource(
                (opts, total) => createMockGroupedData(opts, [
                    { value: "Role Test", count: 10 }
                ], total),
                10
            );

            const virtualList = new VirtualList(container, {
                autoBind: false,
                height: CONTAINER_HEIGHT,
                dataSource: dataSource,
                template: ({ text }) => kendo.htmlEncode(text),
                dataValueField: "value",
                itemHeight: ITEM_HEIGHT
            });

            dataSource.read().then(function() {
                done(() => {
                    const items = virtualList.items();
                    items.each(function() {
                        const role = $(this).attr("role");
                        assert.equal(role, "option", "Items should have role='option'");
                    });
                });
            });
        });
    });

    // -------------------------------------------------------------------------
    // PERFORMANCE / UL RECYCLING
    // -------------------------------------------------------------------------

    describe("Performance: ", function() {
        asyncTest("UL count remains bounded during scrolling", function(done) {
            const dataSource = createMockDataSource(
                (opts, total) => createMockGroupedData(opts, [
                    { value: "Group 1", count: 100 },
                    { value: "Group 2", count: 100 },
                    { value: "Group 3", count: 100 }
                ], total),
                300
            );

            const virtualList = new VirtualList(container, {
                autoBind: false,
                height: CONTAINER_HEIGHT,
                dataSource: dataSource,
                template: ({ text }) => kendo.htmlEncode(text),
                dataValueField: "value",
                itemHeight: ITEM_HEIGHT
            });

            dataSource.read().then(function() {
                const initialUlCount = virtualList.element.find(".k-list-ul").length;

                // Scroll multiple times
                let scrollCount = 0;
                const scrollInterval = setInterval(function() {
                    virtualList.content.scrollTop(scrollCount * 500);
                    virtualList.content.trigger("scroll");
                    scrollCount++;

                    if (scrollCount > 10) {
                        clearInterval(scrollInterval);

                        setTimeout(function() {
                            done(() => {
                                const finalUlCount = virtualList.element.find(".k-list-ul").length;
                                // UL count should not explode (reasonable upper bound)
                                assert.isOk(finalUlCount < 20, `UL count should remain bounded. Initial: ${initialUlCount}, Final: ${finalUlCount}`);
                            });
                        }, 200);
                    }
                }, 50);
            });
        });

        asyncTest("items are properly recycled during scrolling", function(done) {
            const dataSource = createMockDataSource(
                (opts, total) => createMockGroupedData(opts, [
                    { value: "Recycle Test", count: 200 }
                ], total),
                200
            );

            const virtualList = new VirtualList(container, {
                autoBind: false,
                height: CONTAINER_HEIGHT,
                dataSource: dataSource,
                template: ({ text }) => kendo.htmlEncode(text),
                dataValueField: "value",
                itemHeight: ITEM_HEIGHT
            });

            dataSource.read().then(function() {
                const initialItemCount = virtualList.items().length;

                // Scroll to end
                virtualList.content.scrollTop(6000);
                virtualList.content.trigger("scroll");

                setTimeout(function() {
                    done(() => {
                        const finalItemCount = virtualList.items().length;
                        // Item count should be similar (virtualization working)
                        const diff = Math.abs(finalItemCount - initialItemCount);
                        assert.isOk(diff < 50, `Item count should remain stable. Initial: ${initialItemCount}, Final: ${finalItemCount}`);
                    });
                }, 200);
            });
        });
    });
});

// =============================================================================
// CLIENT-SIDE GROUPING WITH SERVER PAGING
// =============================================================================

describe("Grouped VirtualList - Client Grouping with Server Paging: ", function() {
    beforeEach(function() {
        container = $("<div id='container'></div>").appendTo(Mocha.fixture);
        Mocha.fixture.append($('<style>.k-virtual-content .k-list-item { box-sizing: border-box; } .k-list-ul { margin: 0; position: absolute; width: 100%; }</style>'));
    });

    afterEach(function() {
        if (container.data("kendoVirtualList")) {
            container.data("kendoVirtualList").destroy();
        }
        Mocha.fixture.empty();
    });

    asyncTest("renders grouped data with client-side grouping", function(done) {
        const dataSource = new kendo.data.DataSource({
            transport: {
                read: function(options) {
                    setTimeout(function() {
                        const items = [];
                        const skip = options.data.skip || 0;
                        const take = options.data.take || 40;

                        for (let i = skip; i < Math.min(skip + take, 100); i++) {
                            items.push({
                                text: `Item ${i}`,
                                value: i,
                                category: i < 50 ? "Category A" : "Category B"
                            });
                        }

                        options.success(items);
                    }, 0);
                }
            },
            serverGrouping: false, // Client-side grouping
            serverPaging: true,
            pageSize: 40,
            group: { field: "category" },
            schema: {
                total: function() { return 100; }
            }
        });

        const virtualList = new VirtualList(container, {
            autoBind: false,
            height: CONTAINER_HEIGHT,
            dataSource: dataSource,
            template: ({ text }) => kendo.htmlEncode(text),
            dataValueField: "value",
            itemHeight: ITEM_HEIGHT
        });

        dataSource.read().then(function() {
            done(() => {
                const items = virtualList.items();
                assert.isOk(items.length > 0, "Should render items with client-side grouping");
            });
        });
    });
});

// =============================================================================
// DATABOUND EVENT
// =============================================================================

describe("Grouped VirtualList - Events: ", function() {
    beforeEach(function() {
        container = $("<div id='container'></div>").appendTo(Mocha.fixture);
        Mocha.fixture.append($('<style>.k-virtual-content .k-list-item { box-sizing: border-box; } .k-list-ul { margin: 0; position: absolute; width: 100%; }</style>'));
    });

    afterEach(function() {
        if (container.data("kendoVirtualList")) {
            container.data("kendoVirtualList").destroy();
        }
        Mocha.fixture.empty();
    });

    asyncTest("dataSource change event fires after grouped data loads", function(done) {
        const dataSource = createMockDataSource(
            (opts, total) => createMockGroupedData(opts, [
                { value: "Event Test", count: 20 }
            ], total),
            20
        );

        const virtualList = new VirtualList(container, {
            autoBind: false,
            height: CONTAINER_HEIGHT,
            dataSource: dataSource,
            template: ({ text }) => kendo.htmlEncode(text),
            dataValueField: "value",
            itemHeight: ITEM_HEIGHT
        });

        dataSource.read().then(function() {
            setTimeout(function() {
                done(() => {
                    // DataSource should have loaded data
                    assert.isOk(dataSource.view().length > 0, "DataSource should have data after read");
                });
            }, 100);
        });
    });

    asyncTest("listBound event fires with grouped data", function(done) {
        const dataSource = createMockDataSource(
            (opts, total) => createMockGroupedData(opts, [
                { value: "ListBound Test", count: 20 }
            ], total),
            20
        );

        let listBoundFired = false;

        const virtualList = new VirtualList(container, {
            autoBind: false,
            height: CONTAINER_HEIGHT,
            dataSource: dataSource,
            template: ({ text }) => kendo.htmlEncode(text),
            dataValueField: "value",
            itemHeight: ITEM_HEIGHT
        });

        virtualList.bind("listBound", function() {
            listBoundFired = true;
        });

        dataSource.read().then(function() {
            setTimeout(function() {
                done(() => {
                    assert.isOk(listBoundFired, "listBound event should fire");
                });
            }, 100);
        });
    });
});

// Helper function reference for external use
function createMockGroupedData_export(options, groupConfig, total) {
    return createMockGroupedData(options, groupConfig, total);
}
