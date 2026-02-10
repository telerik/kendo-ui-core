import "./kendo.data.js";
import { valueMapperOptions } from "./utils/valueMapper.js";

export const __meta__ = {
    id: "virtuallist",
    name: "VirtualList",
    category: "framework",
    depends: [ "data" ],
    hidden: true
};

(function($, undefined) {
    const kendo = window.kendo,
        ui = kendo.ui,
        encode = kendo.htmlEncode,
        Widget = ui.Widget,
        DataBoundWidget = ui.DataBoundWidget,
        percentageUnitsRegex = /^\d+(\.\d+)?%$/i,
        LIST_CONTENT = "k-list-content",
        TABLE_CONTENT = "k-table-body k-table-scroller",
        HEADER = "k-list-group-sticky-header",
        LIST_ITEM = "k-list-item",
        TABLE_ITEM = "k-table-row",
        HEIGHTCONTAINER = "k-height-container",
        GROUPITEM = "k-list-item-group-label",
        GROUP_HEADER_ITEM = "k-list-group-item",
        LIST_UL = "k-list-ul",
        TABLE_LIST = "k-table-list",

        SELECTED = "k-selected",
        FOCUSED = "k-focus",
        HOVER = "k-hover",
        CHANGE = "change",
        CLICK = "click",
        LISTBOUND = "listBound",
        ITEMCHANGE = "itemChange",
        ACTION = "action",

        ACTIVATE = "activate",
        DEACTIVATE = "deactivate",

        GROUP_ROW_SEL = ".k-table-group-row",

        VIRTUAL_LIST_NS = ".VirtualList";

    function lastFrom(array) {
        return array[array.length - 1];
    }

    function toArray(value) {
        return value instanceof Array ? value : [value];
    }

    function isPrimitive(dataItem) {
        return typeof dataItem === "string" || typeof dataItem === "number" || typeof dataItem === "boolean";
    }

    function getItemCount(screenHeight, listScreens, itemHeight) {
        return Math.ceil(screenHeight * listScreens / itemHeight);
    }

    function appendChild(parent, className, tagName) {
        const element = document.createElement(tagName || "div");
        if (className) {
            element.className = className;
        }
        parent.appendChild(element);

        return element;
    }

    function getDefaultItemHeight(listSize) {
        const mockList = $('<div class="k-list ' + listSize + ' k-virtual-list">' +
                '<div class="k-list-content">' +
                    '<ul class="k-list-ul">' +
                        '<li class="k-list-item">' +
                            '<span class="k-list-item-text">test</span>' +
                        '</li>' +
                    '</ul>' +
                '</div>' +
            '</div>');

        mockList.css({
            position: "absolute",
            left: "-200000px",
            visibility: "hidden"
        });
        mockList.appendTo(document.body);

        const itemHeight = parseFloat(kendo.getComputedStyles(mockList.find(".k-list-item")[0], ["height"]).height);

        mockList.remove();

        return itemHeight;
    }

    /**
     * Gets the CSS gap value from an existing UL element in the DOM,
     * or creates a temporary one to measure if no UL exists.
     * @param {jQuery|HTMLElement} containerElement - The container element in the DOM (for creating temp UL)
     * @param {jQuery} existingUl - An existing UL element in the DOM (optional)
     * @returns {number} - The gap value in pixels (0 if not found)
     */
    function getCssGap(containerElement, existingUl) {
        // If we have an existing UL, measure directly from it
        if (existingUl && existingUl.length) {
            let computedStyle = window.getComputedStyle(existingUl[0]);
            let gap = computedStyle.gap || computedStyle.rowGap || "0";
            return parseFloat(gap) || 0;
        }

        // Create a temporary UL in the container to measure the gap
        const container = containerElement instanceof $ ? containerElement[0] : containerElement;
        if (!container || !container.parentNode) {
            return 0;
        }

        const tempUl = document.createElement("ul");
        tempUl.className = LIST_UL;
        tempUl.style.cssText = "position:absolute;visibility:hidden;left:-9999px;";
        container.appendChild(tempUl);

        const computedStyle = window.getComputedStyle(tempUl);
        const gap = computedStyle.gap || computedStyle.rowGap || "0";
        const gapValue = parseFloat(gap) || 0;

        container.removeChild(tempUl);

        return gapValue;
    }

    function bufferSizes(screenHeight, listScreens, opposite) { //in pixels
        return {
            down: screenHeight * opposite,
            up: screenHeight * (listScreens - 1 - opposite)
        };
    }

    function listValidator(options, screenHeight) {
        const downThreshold = (options.listScreens - 1 - options.threshold) * screenHeight;
        const upThreshold = options.threshold * screenHeight;

        return function(list, scrollTop, lastScrollTop) {
            if (scrollTop > lastScrollTop) {
                return scrollTop - list.top < downThreshold;
            } else {
                return list.top === 0 || scrollTop - list.top > upThreshold;
            }
        };
    }

    function scrollCallback(element, callback) {
        return function(force) {
            return callback(element.scrollTop, force);
        };
    }

    function syncList(reorder) {
        return function(list, force) {
            reorder(list.items, list.index, force);
            return list;
        };
    }

    function position(element, y) {
        element.style.webkitTransform = 'translateY(' + y + "px)";
        element.style.transform = 'translateY(' + y + "px)";
    }

    // ============ Grouped Virtual List Helpers ============

    /**
     * Calculates the absolute position (in pixels) of a flat index in a grouped list.
     * Takes into account group headers that appear before each group and CSS gap.
     * @param {number} flatIndex - The flat index of an item (0-based, counting only data items)
     * @param {number} itemHeight - Height of each item in pixels
     * @param {Array} groupRanges - Array of group range objects with startIndex and itemCount
     * @param {number} cssGap - CSS gap between items in pixels (default 0)
     * @returns {number} - The absolute pixel position
     */
    function getGroupedItemPosition(flatIndex, itemHeight, groupRanges, cssGap) {
        let position = 0;
        cssGap = cssGap || 0;
        const effectiveItemHeight = itemHeight + cssGap;

        for (let i = 0; i < groupRanges.length; i++) {
            const group = groupRanges[i];
            const { startIndex, itemCount } = group;

            if (flatIndex < startIndex + itemCount) {
                // Item is in this group - add header height (except first group)
                if (i > 0) {
                    position += effectiveItemHeight;
                }
                // Add position within group (including gap for each item)
                position += (flatIndex - startIndex) * effectiveItemHeight;
                break;
            } else {
                // Item is in a later group - add this group's total height
                if (i > 0) {
                    position += effectiveItemHeight; // group header
                }
                position += itemCount * effectiveItemHeight;
            }
        }

        return position;
    }

    /**
     * Calculates the total height of the grouped list including all group headers and CSS gaps.
     * First group uses the sticky header (not inline), so we subtract one header height.
     * @param {number} totalItems - Total number of data items
     * @param {number} itemHeight - Height of each item
     * @param {number} groupCount - Number of groups
     * @param {number} cssGap - CSS gap between items in pixels (default 0)
     * @returns {number} - Total height in pixels
     */
    function getGroupedTotalHeight(totalItems, itemHeight, groupCount, cssGap) {
        cssGap = cssGap || 0;
        // Each group is a separate UL with flex layout and gap between children
        // First group uses sticky header, subsequent groups have inline headers
        // Total elements = totalItems + (groupCount - 1) inline headers
        const inlineHeaders = Math.max(0, groupCount - 1);
        const totalElements = totalItems + inlineHeaders;

        // Within each group, there are (elements - 1) gaps between children
        // Total gaps across all groups = totalElements - groupCount
        // (each group has one fewer gap than its element count)
        const totalGaps = Math.max(0, totalElements - groupCount);

        return (totalElements * itemHeight) + (totalGaps * cssGap);
    }

    /**
     * Builds the group ranges array from the dataSource's group info.
     * For paged/server-side grouping, this builds ranges relative to the current range.
     * @param {Object} dataSource - The Kendo DataSource
     * @param {number} rangeStart - The start index of the current data range (for offset calculation)
     * @param {number} firstGroupIndex - The global index of the first group in this view (0-based, used as fallback)
     * @param {Map} groupValueMap - Optional map of groupValue -> globalGroupIndex for consistent indexing
     * @returns {Array} - Array of { value, startIndex, itemCount, globalGroupIndex }
     */
    function buildGroupRanges(dataSource, rangeStart, firstGroupIndex, groupValueMap) {
        const groups = dataSource.group() || [];
        if (!groups.length) {
            return [];
        }

        const view = dataSource.view() || [];
        if (!view.length) {
            return [];
        }

        const ranges = [];
        // Start index is relative to the current range
        let currentIndex = rangeStart || 0;

        // For new groups, find the next available index after all existing map entries
        // This ensures consistent numbering regardless of which page we're on
        let nextNewGroupIndex = 0;
        if (groupValueMap && groupValueMap.size > 0) {
            for (const idx of groupValueMap.values()) {
                if (idx >= nextNewGroupIndex) {
                    nextNewGroupIndex = idx + 1;
                }
            }
        }

        for (const group of view) {
            // Skip groups without items array
            const groupItems = group.items || [];
            if (!groupItems.length) {
                continue;
            }

            let groupIndex;

            // Use the group value map if provided to get consistent indices
            if (groupValueMap) {
                if (groupValueMap.has(group.value)) {
                    groupIndex = groupValueMap.get(group.value);
                } else {
                    // New group value - assign the next available index
                    groupIndex = nextNewGroupIndex++;
                    groupValueMap.set(group.value, groupIndex);
                }
            } else {
                // No map - use sequential numbering from firstGroupIndex
                groupIndex = (firstGroupIndex || 0) + ranges.length;
            }

            ranges.push({
                value: group.value,
                startIndex: currentIndex,
                itemCount: groupItems.length,
                globalGroupIndex: groupIndex
            });
            currentIndex += groupItems.length;
        }

        return ranges;
    }

    // ============ End Grouped Virtual List Helpers ============

    function map2(callback, templates) {
        return function(arr1, arr2) {
            for (let i = 0, len = arr1.length; i < len; i++) {
                callback(arr1[i], arr2[i], templates);
                if (arr2[i].item) {
                    this.trigger(ITEMCHANGE, { item: $(arr1[i]), data: arr2[i].item, ns: kendo.ui });
                }
            }
        };
    }

    function reshift(items, diff) {
        let range;

        if (diff > 0) { // down
            range = items.splice(0, diff);
            items.push(...range);
        } else { // up
            range = items.splice(diff, -diff);
            items.unshift(...range);
        }

        return range;
    }

    function render(element, data, templates) {
        const that = this;
        const options = that.options;
        const itemTemplate = data.item ? templates.template : templates.placeholderTemplate;
        const hasColumns = options.columns?.length;
        const altRow = data.index % 2 === 1 ? "k-table-alt-row" : "";

        // Rich item options
        const iconField = options.iconField;
        const descriptionField = options.descriptionField;
        const actionField = options.actionField;
        const dataItem = data.item;
        const hasIcon = iconField && dataItem && dataItem[iconField];
        const hasDescription = descriptionField && dataItem && dataItem[descriptionField];
        const hasAction = actionField && dataItem && dataItem[actionField];

        element = $(element);

        if (data.index === 0 && this.header && data.group) {
            this.header.html(templates.fixedGroupTemplate(data.group));
        }

        element
            .attr("data-uid", dataItem ? dataItem.uid : "")
            .attr("data-offset-index", data.index);

        if (hasAction) {
            element.attr("data-action", dataItem[actionField]);
            element.addClass("k-list-item-action");
        } else {
            element.removeAttr("data-action");
            element.removeClass("k-list-item-action");
        }

        if (hasColumns && dataItem) {
            if (altRow.length > 0) {
                element.addClass(altRow);
            } else {
                element.removeClass("k-table-alt-row");
            }

            const renderedColumns = $(renderColumns(options, dataItem, templates));
            kendo.applyStylesFromKendoAttributes(renderedColumns, ["width", "max-width"]);
            element.empty().append(renderedColumns);
        } else {
            element.find("." + GROUPITEM).remove();

            const textContainer = element.find(".k-list-item-text");
            textContainer.html(itemTemplate(dataItem || {}));

            let iconWrapper = element.find(".k-list-item-icon-wrapper");
            if (hasIcon) {
                const iconHtml = kendo.ui.icon({ icon: dataItem[iconField], iconClass: "k-list-item-icon", attr: { "aria-hidden": "true" } });
                if (iconWrapper.length === 0) {
                    textContainer.before(`<span class="k-list-item-icon-wrapper" role="presentation">${iconHtml}</span>`);
                } else {
                    iconWrapper.attr("role", "presentation").html(iconHtml);
                }
            } else {
                iconWrapper.remove();
            }

            let descElement = element.find(".k-list-item-description");
            if (hasDescription) {
                if (descElement.length === 0) {
                    textContainer.after(`<span class="k-list-item-description">${encode(dataItem[descriptionField])}</span>`);
                } else {
                    descElement.html(encode(dataItem[descriptionField]));
                }
            } else {
                descElement.remove();
            }
        }

        element.toggleClass(FOCUSED, data.current);
        element.toggleClass(SELECTED, data.selected);
        element.toggleClass("k-first", data.newGroup);
        element.toggleClass("k-last", data.isLastGroupedItem);
        element.toggleClass("k-loading-item", !dataItem);

        if (data.index !== 0 && data.newGroup) {
            if (hasColumns) {
                $(`<span class="k-table-td k-table-group-td"><span>${templates.groupTemplate(data.group)}</span></span>`)
                    .appendTo(element);
            } else {
                $(`<div class="${GROUPITEM}"></div>`)
                    .appendTo(element)
                    .html(templates.groupTemplate(data.group));
            }
        } else if (data.group && hasColumns) {
            element.append($('<span class="k-table-td k-table-spacer-td"></span>'));
        }

        if (data.top !== undefined) {
            element.css("top", data.top + "px");
        }
    }

    function renderColumns(options, dataItem, templates) {
        let item = "";

        for (let i = 0; i < options.columns.length; i++) {
            const currentWidth = options.columns[i].width;
            const currentWidthInt = parseInt(currentWidth, 10);
            let widthStyle = '';

            if (currentWidth) {
                const widthValue = `${currentWidthInt}${percentageUnitsRegex.test(currentWidth) ? "%" : "px"}`;
                widthStyle = `${kendo.attr("style-width")}="${widthValue}" ${kendo.attr("style-max-width")}="${widthValue}"`;
            }

            item += `<span class='k-table-td' ${widthStyle}>`;
            item += templates["column" + i](dataItem);
            item += "</span>";
        }

        return item;
    }

    function mapChangedItems(selected, itemsToMatch) {
        const itemsLength = itemsToMatch.length;
        const selectedLength = selected.length;
        const changed = [];
        const unchanged = [];

        if (selectedLength) {
            for (let i = 0; i < selectedLength; i++) {
                const dataItem = selected[i];
                let found = false;

                for (let j = 0; j < itemsLength; j++) {
                    if (dataItem === itemsToMatch[j]) {
                        found = true;
                        changed.push({ index: i, item: dataItem });
                        break;
                    }
                }

                if (!found) {
                    unchanged.push(dataItem);
                }
            }
        }

        return { changed, unchanged };
    }

    function isActivePromise(promise) {
        return promise && promise.state() !== "resolved";
    }

    const VirtualList = DataBoundWidget.extend({
        init: function(element, options) {
            const that = this;
            const contentClasses = options.columns?.length ? TABLE_CONTENT : LIST_CONTENT;

            that.bound(false);
            that._fetching = false;

            Widget.fn.init.call(that, element, options);

            if (!that.options.itemHeight) {
                that.options.itemHeight = getDefaultItemHeight(options.listSize);
            }

            that._cssGap = 0;
            options = that.options;

            that.element.attr("role", "listbox");

            if (that.options.columns?.length) {
                const thead = that.element.closest(".k-data-table").find('.k-table-thead');
                const row = $(`<tr class="k-table-group-row">
                    <th class="k-table-th" colspan="${that.options.columns.length}"></th>
                </tr>`);

                thead.append(row);

                that.header = row.find(".k-table-th");

                const contentSelector = "." + contentClasses.split(' ').join('.');
                that.content = that.wrapper = that.element.find(contentSelector);
                if (!that.content.length) {
                    that.content = that.wrapper = $(`<div unselectable='on' class='${contentClasses}'></div>`).appendTo(that.element);
                }
            } else {
                that.header = $(`<div class='${HEADER}'></div>`).appendTo(that.element);
                that.content = that.wrapper = $(`<div unselectable='on' class='${contentClasses}'></div>`).appendTo(that.element);
            }

            that.element.children(".k-list-footer").appendTo(that.element);

            if (options.ariaLabel) {
                this.element.attr("aria-label", options.ariaLabel);
            } else if (options.ariaLabelledBy) {
                this.element.attr("aria-labelledby", options.ariaLabelledBy);
            }

            that.element.on("mouseenter" + VIRTUAL_LIST_NS, "li:not(.k-loading-item)", function() { $(this).addClass(HOVER); })
                        .on("mouseleave" + VIRTUAL_LIST_NS, "li", function() { $(this).removeClass(HOVER); });

            that._values = toArray(that.options.value);
            that._selectedDataItems = [];
            that._selectedIndexes = [];
            that._rangesList = {};
            that._promisesList = [];
            that._optionID = kendo.guid();

            that._templates();

            that.setDataSource(options.dataSource);

            that.content.on("scroll" + VIRTUAL_LIST_NS, kendo.throttle(function() {
                that._renderItems();
                that._triggerListBound();
            }, options.delay));

            that._selectable();
        },

        options: {
            name: "VirtualList",
            autoBind: true,
            delay: 100,
            height: null,
            listScreens: 4,
            threshold: 0.5,
            itemHeight: null,
            oppositeBuffer: 1,
            type: "flat",
            selectable: false,
            value: [],
            dataValueField: null,
            template: (data) => encode(data),
            placeholderTemplate: () => "loading...",
            groupTemplate: (data) => encode(data),
            fixedGroupTemplate: (data) => encode(data),
            fixedGroupHeader: true,
            mapValueTo: "index",
            valueMapper: null,
            ariaLabel: null,
            ariaLabelledBy: null,
            id: null,
            iconField: null,
            descriptionField: null,
            groupIconField: null,
            actionField: null
        },

        events: [
            CHANGE,
            CLICK,
            LISTBOUND,
            ITEMCHANGE,
            ACTIVATE,
            DEACTIVATE,
            ACTION
        ],

        _isTableVariant: function() {
            return !!this.options.columns?.length;
        },

        _getItemClass: function() {
            return this._isTableVariant() ? TABLE_ITEM : LIST_ITEM;
        },

        _getItemHeightStyle: function() {
            return this.options.itemHeight + "px";
        },

        _getHeaderHeight: function() {
            return this.header?.is(":visible") ? this.header.outerHeight() : 0;
        },

        _toggleHeaderVisibility: function(show) {
            const target = this.header.closest(GROUP_ROW_SEL).length
                ? this.header.closest(GROUP_ROW_SEL)
                : this.header;
            target[show ? "show" : "hide"]();
        },

        _getHeaderTextSelector: function() {
            return this._isTableVariant() ? ".k-table-th" : ".k-list-item-text";
        },

        _getGroupHeaderClass: function() {
            return this._isTableVariant() ? "k-table-group-row" : GROUP_HEADER_ITEM;
        },

        setOptions: function(options) {
            Widget.fn.setOptions.call(this, options);

            if (this._selectProxy && this.options.selectable === false) {
                this.element.off(CLICK, "." + this._getItemClass(), this._selectProxy);
            } else if (!this._selectProxy && this.options.selectable) {
                this._selectable();
            }

            this._templates();
            this.refresh();
        },

        items: function() {
            return $(this._items);
        },

        /**
         * Returns the UL elements in the virtual list.
         * For flat (non-grouped) lists, returns the single UL element.
         * For grouped lists, returns all currently rendered group UL elements.
         * @returns {jQuery} - jQuery collection of UL elements
         */
        ulElements: function() {
            const that = this;

            if (that.options.type === "flat") {
                // For flat lists, return the single UL
                return that.ul || $();
            } else {
                // For grouped lists, return all group ULs
                return that.content.find("." + LIST_UL);
            }
        },

        destroy: function() {
            this.wrapper.off(VIRTUAL_LIST_NS);
            this.dataSource.unbind(CHANGE, this._refreshHandler);
            Widget.fn.destroy.call(this);
        },

        setDataSource: function(source) {
            const that = this;
            let dataSource = source || {};

            dataSource = Array.isArray(dataSource) ? { data: dataSource } : dataSource;
            dataSource = kendo.data.DataSource.create(dataSource);

            if (that.dataSource) {
                that.dataSource.unbind(CHANGE, that._refreshHandler);

                that._clean();
                that.bound(false);

                that._deferValueSet = true;
                const value = that.value();

                that.value([]);
                that.mute(function() {
                    that.value(value);
                });
            } else {
                that._refreshHandler = that.refresh.bind(that);
            }

            that.dataSource = dataSource.bind(CHANGE, that._refreshHandler);

            that.setDSFilter(dataSource.filter());

            if (dataSource.view().length !== 0) {
                that.refresh();
            } else if (that.options.autoBind) {
                dataSource.fetch();
            }
        },

        skip: function() {
            return this.dataSource.currentRangeStart();
        },

        _triggerListBound: function() {
            const that = this;
            const skip = that.skip();

            if (that.bound() && !that._selectingValue && that._skip !== skip) {
                that._skip = skip;
                that.trigger(LISTBOUND);
            }
        },

        _getValues: function(dataItems) {
            const getter = this._valueGetter;

            return $.map(dataItems, (dataItem) => getter(dataItem));
        },

        _highlightSelectedItems: function() {
            for (let i = 0; i < this._selectedDataItems.length; i++) {
                const item = this._getElementByDataItem(this._selectedDataItems[i]);
                if (item.length) {
                    item.addClass(SELECTED);
                }
            }
        },

        _focusSelectedInFilteredData: function() {
            const that = this;
            const selectedDataItems = that._selectedDataItems;
            const valueGetter = that._valueGetter;
            let focusIndex = 0;

            if (selectedDataItems.length) {
                const data = that.dataSource.flatView();
                const selectedValue = valueGetter(selectedDataItems[0]);

                for (let i = 0; i < data.length; i++) {
                    const item = that.options.type === "group" ? data[i].item : data[i];
                    if (item && valueGetter(item) === selectedValue) {
                        focusIndex = i;
                        break;
                    }
                }
            }

            that.focus(focusIndex);
        },

        refresh: function(e) {
            const that = this;
            const action = e?.action;
            const isItemChange = action === "itemchange";
            const filtered = this.isFiltered();

            if (that._mute) { return; }

            that._deferValueSet = false;

            if (!that._fetching) {
                if (filtered) {
                    that._focusSelectedInFilteredData();
                }

                that._createList();
                if (!action && that._values.length && !filtered &&
                     !that.options.skipUpdateOnBind && !that._emptySearch) {
                    that._selectingValue = true;

                    that.bound(true);
                    that.value(that._values, true).done(function() {
                        that._selectingValue = false;
                        that._triggerListBound();
                    });
                } else {
                    that.bound(true);
                    that._highlightSelectedItems();
                    that._triggerListBound();
                }
            } else {
                if (that._renderItems) {
                    that._renderItems(true);
                }

                that._triggerListBound();
            }

            if (isItemChange || action === "remove") {
                const result = mapChangedItems(that._selectedDataItems, e.items);
                if (result.changed.length) {
                    if (isItemChange) {
                        that.trigger("selectedItemChange", {
                            items: result.changed
                        });
                    } else {
                        that.value(that._getValues(result.unchanged));
                    }
                }
            }

            that._fetching = false;
        },

        removeAt: function(position) {
            const value = this._values.splice(position, 1)[0];

            return {
                position,
                dataItem: this._removeSelectedDataItem(value)
            };
        },

        _removeSelectedDataItem: function(value) {
            const that = this;
            const valueGetter = that._valueGetter;

            for (const idx in that._selectedDataItems) {
                if (valueGetter(that._selectedDataItems[idx]) === value) {
                    that._selectedIndexes.splice(idx, 1);
                    return that._selectedDataItems.splice(idx, 1)[0];
                }
            }
        },

        setValue: function(value) {
            this._values = toArray(value);
        },

        value: function(value, _forcePrefetch) {
            const that = this;

            if (value === undefined) {
                return that._values.slice();
            }

            if (value === null) {
                value = [];
            }

            value = toArray(value);

            if (!that._valueDeferred || that._valueDeferred.state() === "resolved") {
                that._valueDeferred = $.Deferred();
            }

            const shouldClear = that.options.selectable === "multiple" && that.select().length && value.length;

            if (shouldClear || !value.length) {
                that.select(-1);
            }

            that._values = value;

            if ((that.bound() && !that._mute && !that._deferValueSet) || _forcePrefetch) {
                that._prefetchByValue(value);
            }

            return that._valueDeferred;
        },

        _checkValuesOrder: function(value) {
            if (this._removedAddedIndexes?.length === value.length) {
                const newValue = this._removedAddedIndexes.slice();
                this._removedAddedIndexes = null;
                return newValue;
            }

            return value;
        },

        _prefetchByValue: function(value) {
            const that = this;
            const dataView = that._dataView;
            const valueGetter = that._valueGetter;
            const mapValueTo = that.options.mapValueTo;
            const forSelection = [];

            //try to find the items in the loaded data
            for (let i = 0; i < value.length; i++) {
                for (let idx = 0; idx < dataView.length; idx++) {
                    const item = dataView[idx].item;
                    if (item) {
                        const match = isPrimitive(item) ? value[i] === item : value[i] === valueGetter(item);

                        if (match) {
                            forSelection.push(dataView[idx].index);
                        }
                    }
                }
            }

            if (forSelection.length === value.length) {
                that._values = [];
                that.select(forSelection);
                return;
            }

            //prefetch the items
            if (typeof that.options.valueMapper === "function") {
                const callback = mapValueTo === 'index' ? that.mapValueToIndex : that.mapValueToDataItem;
                that.options.valueMapper(valueMapperOptions(this.options, value, callback.bind(that)));
            } else {
                 if (!that.value()[0]) {
                     that.select([-1]);
                 } else {
                    that._selectingValue = false;
                    that._triggerListBound();
                 }
            }
        },

        mapValueToIndex: function(indexes) {
            if (indexes === undefined || indexes === -1 || indexes === null) {
                indexes = [];
            } else {
                indexes = toArray(indexes);
            }

            if (!indexes.length) {
                indexes = [-1];
            } else {
                const removed = this._deselect([]).removed;
                if (removed.length) {
                    this._triggerChange(removed, []);
                }
            }

            this.select(indexes);
        },

        mapValueToDataItem: function(dataItems) {
            if (dataItems === undefined || dataItems === null) {
                dataItems = [];
            } else {
                dataItems = toArray(dataItems);
            }

            if (!dataItems.length) {
                this.select([-1]);
            } else {
                const removed = $.map(this._selectedDataItems, (item, index) => ({ index, dataItem: item }));
                const added = $.map(dataItems, (item, index) => ({ index, dataItem: item }));

                this._selectedDataItems = dataItems;
                this._selectedIndexes = [];

                for (let i = 0; i < this._selectedDataItems.length; i++) {
                    const item = this._getElementByDataItem(this._selectedDataItems[i]);
                    this._selectedIndexes.push(this._getIndecies(item)[0]);
                    item.addClass(SELECTED);
                }

                this._triggerChange(removed, added);

                if (this._valueDeferred) {
                    this._valueDeferred.resolve();
                }
            }
        },

        deferredRange: function(index) {
            const dataSource = this.dataSource;
            const take = this.itemCount;
            const ranges = this._rangesList;
            const result = $.Deferred();
            const defs = [];

            const low = Math.floor(index / take) * take;
            const high = Math.ceil(index / take) * take;

            const pages = high === low ? [high] : [low, high];

            $.each(pages, (_, skip) => {
                const end = skip + take;
                const existingRange = ranges[skip];
                let deferred;

                if (!existingRange || (existingRange.end !== end)) {
                    deferred = $.Deferred();
                    ranges[skip] = { end, deferred };

                    dataSource._multiplePrefetch(skip, take, () => {
                        deferred.resolve();
                    });
                } else {
                    deferred = existingRange.deferred;
                }

                defs.push(deferred);
            });

            $.when(...defs).done(() => {
                result.resolve();
            });

            return result;
        },

        prefetch: function(indexes) {
            const that = this;
            const take = this.itemCount;
            const isEmptyList = !that._promisesList.length;

            if (!isActivePromise(that._activeDeferred)) {
                that._activeDeferred = $.Deferred();
                that._promisesList = [];
            }

            $.each(indexes, (_, index) => {
                that._promisesList.push(that.deferredRange(that._getSkip(index, take)));
            });

            if (isEmptyList) {
                $.when(...that._promisesList).done(() => {
                    that._promisesList = [];
                    that._activeDeferred.resolve();
                });
            }

            return that._activeDeferred;
        },

        _findDataItem: function(view, index) {
            //find in grouped view
            if (this.options.type === "group") {
                for (let i = 0; i < view.length; i++) {
                    const group = view[i].items;
                    if (group.length <= index) {
                        index = index - group.length;
                    } else {
                        return group[index];
                    }
                }
            }

            //find in flat view
            return view[index];
        },

        _getRange: function(skip, take) {
            return this.dataSource._findRange(skip, Math.min(skip + take, this.dataSource.total()));
        },

        dataItemByIndex: function(index) {
            const that = this;
            const take = that.itemCount;
            const skip = that._getSkip(index, take);
            let view = this._getRange(skip, take);

            //should not return item if data is not loaded
            if (!that._getRange(skip, take).length) {
                return null;
            }

            if (that.options.type === "group") {
                kendo.ui.progress($(that.wrapper), true);
                that.mute(function() {
                    that.dataSource.range(skip, take, () => {
                        kendo.ui.progress($(that.wrapper), false);
                    });
                    view = that.dataSource.view();
                });
            }

            return that._findDataItem(view, [index - skip]);
        },

        selectedDataItems: function() {
            return this._selectedDataItems.slice();
        },

        scrollWith: function(value) {
            this.content.scrollTop(this.content.scrollTop() + value);
        },

        scrollTo: function(y) {
            this.content.scrollTop(y); //works only if the element is visible
        },

        scrollToIndex: function(index) {
            // Use _getElementPosition to account for group headers
            const position = this._getElementPosition ? this._getElementPosition(index) : index * (this.options.itemHeight + this._cssGap);
            this.scrollTo(position);
        },

        focus: function(candidate) {
            const that = this;
            const itemHeight = that.options.itemHeight;
            const id = that._optionID;
            let element;
            let index;
            let current;
            let triggerEvent = true;

            if (candidate === undefined) {
                current = that.content.find("." + FOCUSED);
                return current.length ? current : null;
            }

            if (typeof candidate === "function") {
                const data = that.dataSource.flatView();
                for (let idx = 0; idx < data.length; idx++) {
                    if (candidate(data[idx])) {
                        candidate = idx;
                        break;
                    }
                }
            }

            if (candidate instanceof Array) {
                candidate = lastFrom(candidate);
            }

            if (isNaN(candidate)) {
                element = $(candidate);
                index = parseInt($(element).attr("data-offset-index"), 10);
            } else {
                index = candidate;
                element = that._getElementByIndex(index);
            }

            if (index === -1) {
                that.content.find("." + FOCUSED).removeClass(FOCUSED);
                that._focusedIndex = undefined;
                return;
            }

            if (element.length) { /*focus rendered item*/
                if (element.hasClass(FOCUSED)) {
                    triggerEvent = false;
                }

                const previousIndex = that._focusedIndex;
                if (previousIndex !== undefined) {
                    current = that._getElementByIndex(previousIndex);
                    current
                        .removeClass(FOCUSED)
                        .removeAttr("id");

                    if (triggerEvent) {
                        that.trigger(DEACTIVATE);
                    }
                }

                that._focusedIndex = index;

                element
                    .addClass(FOCUSED)
                    .attr("id", id);

                // Use actual DOM position for rendered elements - more accurate than calculated position
                // especially at page boundaries where virtual positioning may have slight offsets
                // Fall back to calculated position if DOM position is invalid (e.g., container is hidden)
                let elementPosition = that._getRenderedElementPosition(element);
                if (elementPosition === 0 && index > 0) {
                    elementPosition = that._getElementPosition(index);
                }
                const headerHeight = that._getHeaderHeight();
                const goingUp = previousIndex !== undefined && index < previousIndex;
                const goingDown = previousIndex !== undefined && index > previousIndex;

                // Determine element's location relative to visible viewport
                const scrollTop = this.content.scrollTop();
                const visibleTop = scrollTop + headerHeight;
                const screenEnd = scrollTop + this._screenHeight;
                const elementBottom = elementPosition + itemHeight;

                let position;
                if (elementPosition < visibleTop && elementBottom > scrollTop) {
                    position = "top";
                } else if (elementPosition === screenEnd || (elementPosition < screenEnd && screenEnd < elementBottom)) {
                    position = "bottom";
                } else if (elementPosition >= visibleTop && elementBottom <= screenEnd) {
                    position = "inScreen";
                } else {
                    position = "outScreen";
                }

                if (position === "top") {
                    // Item is under sticky header or above viewport - scroll to show at top (just below header)
                    that.scrollTo(Math.max(0, elementPosition - headerHeight));
                } else if (position === "bottom") {
                    // Item is at the bottom edge - scroll to show at bottom (last visible)
                    that.scrollTo((elementPosition + itemHeight) - that._screenHeight);
                } else if (position === "outScreen") {
                    // Item is completely outside viewport
                    if (goingUp) {
                        // Going up via keyboard - scroll to show item at top (just below header)
                        that.scrollTo(Math.max(0, elementPosition - headerHeight));
                    } else if (goingDown) {
                        // Going down via keyboard - scroll to show item at bottom (last visible)
                        that.scrollTo((elementPosition + itemHeight) - that._screenHeight);
                    } else {
                        // Programmatic focus - show at top
                        that.scrollTo(Math.max(0, elementPosition - headerHeight));
                    }
                }

                if (triggerEvent) {
                    that.trigger(ACTIVATE);
                }
            } else { /*focus non rendered item*/
                // Remove focus from any currently focused item
                const previousIndex = that._focusedIndex;
                if (previousIndex !== undefined) {
                    current = that._getElementByIndex(previousIndex);
                    current
                        .removeClass(FOCUSED)
                        .removeAttr("id");
                }

                that._focusedIndex = index;
                that.items().removeClass(FOCUSED);

                const elementPosition = that._getElementPosition(index);
                const headerHeight = that._getHeaderHeight();
                const goingUp = previousIndex !== undefined && index < previousIndex;
                const goingDown = previousIndex !== undefined && index > previousIndex;

                if (goingUp) {
                    that.scrollTo(Math.max(0, elementPosition - headerHeight));
                } else if (goingDown) {
                    that.scrollTo((elementPosition + itemHeight) - that._screenHeight);
                } else {
                    that.scrollTo(Math.max(0, elementPosition - headerHeight));
                }
            }
        },

        focusIndex: function() {
            return this._focusedIndex;
        },

        focusFirst: function() {
            this.scrollTo(0);
            this.focus(0);
        },

        focusLast: function() {
            const lastIndex = this.dataSource.total();
            this.scrollTo(this.heightContainer.offsetHeight);
            this.focus(lastIndex - 1);
        },

        focusPrev: function() {
            let index = this._focusedIndex;

            if (!isNaN(index) && index > 0) {
                index -= 1;
                this.focus(index);

                const current = this.focus();
                if (current?.hasClass("k-loading-item")) {
                    index += 1;
                    this.focus(index);
                }

                return index;
            } else {
                index = this.dataSource.total() - 1;
                this.focus(index);
                return index;
            }
        },

        focusNext: function() {
            let index = this._focusedIndex;
            const lastIndex = this.dataSource.total() - 1;

            if (!isNaN(index) && index < lastIndex) {
                index += 1;
                this.focus(index);

                const current = this.focus();
                if (current?.hasClass("k-loading-item")) {
                    index -= 1;
                    this.focus(index);
                }

                return index;
            } else {
                index = 0;
                this.focus(index);
                return index;
            }
        },

        _triggerChange: function(removed = [], added = []) {
            if (removed.length || added.length) {
                 this.trigger(CHANGE, { removed, added });
            }
        },

        select: function(candidate) {
            const that = this;
            const singleSelection = that.options.selectable !== "multiple";
            let prefetchStarted = isActivePromise(that._activeDeferred);
            const filtered = this.isFiltered();

            if (candidate === undefined) {
                return that._selectedIndexes.slice();
            }

            if (!that._selectDeferred || that._selectDeferred.state() === "resolved") {
                that._selectDeferred = $.Deferred();
            }

            let indices = that._getIndecies(candidate);
            const isAlreadySelected = singleSelection && !filtered && lastFrom(indices) === lastFrom(this._selectedIndexes);
            let removed = that._deselectCurrentValues(indices);

            if (removed.length || !indices.length || isAlreadySelected) {
                that._triggerChange(removed);

                if (that._valueDeferred) {
                    that._valueDeferred.resolve().promise();
                }

                return that._selectDeferred.resolve().promise();
            }

            if (indices.length === 1 && indices[0] === -1) {
                indices = [];
            }

            const initialIndices = indices;
            const result = that._deselect(indices);
            removed = result.removed;
            indices = result.indices;

            if (singleSelection) {
                prefetchStarted = false;
                if (indices.length) {
                    indices = [lastFrom(indices)];
                }
            }

            const done = function() {
                const added = that._select(indices);

                if (initialIndices.length === indices.length || singleSelection) {
                    that.focus(indices);
                }

                that._triggerChange(removed, added);

                if (that._valueDeferred) {
                    that._valueDeferred.resolve();
                }

                that._selectDeferred.resolve();
            };

            const deferred = that.prefetch(indices);

            if (!prefetchStarted) {
                if (deferred) {
                    deferred.done(done);
                } else {
                    done();
                }
            }

            return that._selectDeferred.promise();
        },

        bound: function(bound) {
            if (bound === undefined) {
                return this._listCreated;
            }

            this._listCreated = bound;
        },

        mute: function(callback) {
            this._mute = true;
            callback();
            this._mute = false;
        },

        setDSFilter: function(filter) {
            this._lastDSFilter = $.extend({}, filter);
        },

        isFiltered: function() {
            if (!this._lastDSFilter) {
                this.setDSFilter(this.dataSource.filter());
            }

            return !kendo.data.Query.compareFilters(this.dataSource.filter(), this._lastDSFilter);
        },

        skipUpdate: $.noop,

        _getElementByIndex: function(index) {
            return this.items().filter((idx, element) =>
                index === parseInt($(element).attr("data-offset-index"), 10)
            );
        },

        _getElementByDataItem: function(dataItem) {
            const dataView = this._dataView;
            const valueGetter = this._valueGetter;
            let element;

            for (let i = 0; i < dataView.length; i++) {
                const match = dataView[i].item && isPrimitive(dataView[i].item)
                    ? dataView[i].item === dataItem
                    : dataView[i].item && dataItem && valueGetter(dataView[i].item) == valueGetter(dataItem);
                if (match) {
                    element = dataView[i];
                    break;
                }
            }

            return element ? this._getElementByIndex(element.index) : $();
        },

        _clean: function() {
            this.result = undefined;
            this._lastScrollTop = undefined;
            this._skip = undefined;
            $(this.heightContainer).remove();
            this.heightContainer = undefined;

            // Clean content children
            if (this.content) {
                this.content.empty();
            }

            // Clean flat UL reference
            this._flatUl = null;
            this.ul = null;

            // Clean grouped resources
            if (this._groupUlCache) {
                for (const key in this._groupUlCache) {
                    const cached = this._groupUlCache[key];
                    if (cached?.ul?.parentNode) {
                        cached.ul.parentNode.removeChild(cached.ul);
                    }
                }
            }
            this._groupContainers = [];
            this._groupUlCache = {};
            this._groupRanges = null;
            this._items = [];

            // Reset group value map (shared across buildGroupRanges and _buildGroupedPageData)
            this._groupValueMap = null;
        },

        _height: function() {
            const hasData = !!this.dataSource.view().length;
            let height = this.options.height;
            const itemHeight = this.options.itemHeight;
            const cssGap = this._cssGap || 0;
            const effectiveItemHeight = itemHeight + cssGap;
            const total = this.dataSource.total();

            if (!hasData) {
                height = 0;
            } else if (height / effectiveItemHeight > total) {
                height = total * effectiveItemHeight;
            }

            return height;
        },

        setScreenHeight: function() {
            const height = this._height();

            this.content.height(height);
            this._screenHeight = height;
        },

        screenHeight: function() {
            return this._screenHeight;
        },

        /**
         * Gets the actual DOM position of a rendered element relative to the scroll container.
         * This is more accurate than _getElementPosition for rendered items because it uses
         * the actual DOM layout rather than calculated positions.
         * @param {jQuery} element - The rendered element
         * @returns {number} - The pixel position relative to the scroll container's content
         */
        _getRenderedElementPosition: function(element) {
            if (!element || !element.length) {
                return 0;
            }

            const el = element[0];
            const parentUl = element.closest("ul")[0];

            if (!parentUl) {
                return el.offsetTop;
            }

            // Get the UL's translateY transform value
            const transform = parentUl.style.transform || parentUl.style.webkitTransform || "";
            const match = transform.match(/translateY\((-?\d+(?:\.\d+)?)px\)/);
            const ulTranslateY = match ? parseFloat(match[1]) : 0;

            // Element's position = UL's transform position + element's offset within UL
            return ulTranslateY + el.offsetTop;
        },

        _getElementLocation: function(index) {
            const scrollTop = this.content.scrollTop();
            const screenHeight = this._screenHeight;
            const itemHeight = this.options.itemHeight;
            const yPosition = this._getElementPosition(index);
            const yDownPostion = yPosition + itemHeight;
            const screenEnd = scrollTop + screenHeight;
            const headerHeight = this._getHeaderHeight();
            const visibleTop = scrollTop + headerHeight;

            if (yPosition < visibleTop && yDownPostion > scrollTop) {
                return "top";
            } else if (yPosition === screenEnd || (yPosition < screenEnd && screenEnd < yDownPostion)) {
                return "bottom";
            } else if ((yPosition >= visibleTop) && (yDownPostion <= screenEnd)) {
                return "inScreen";
            } else {
                return "outScreen";
            }
        },

        _getElementPosition: function(index) {
            const itemHeight = this.options.itemHeight;
            const groupRanges = this._groupRanges;
            const cssGap = this._cssGap || 0;

            // For grouped lists with known ranges, calculate accounting for headers
            if (groupRanges && groupRanges.length) {
                // Check if the index is within the known group ranges
                const lastRange = groupRanges[groupRanges.length - 1];
                const lastKnownIndex = lastRange.startIndex + lastRange.itemCount - 1;

                if (index <= lastKnownIndex) {
                    return getGroupedItemPosition(index, itemHeight, groupRanges, cssGap);
                }

                // Index is beyond known ranges - estimate position
                // Use the position after all known groups plus estimated additional space
                const knownPosition = getGroupedItemPosition(lastKnownIndex, itemHeight, groupRanges, cssGap);
                const itemsBeyond = index - lastKnownIndex;

                // Estimate: assume average group density continues
                // Add a small factor for potential group headers
                const avgItemsPerGroup = lastKnownIndex / groupRanges.length;
                const estimatedNewHeaders = Math.floor(itemsBeyond / avgItemsPerGroup);

                return knownPosition + (itemsBeyond * (itemHeight + cssGap)) + (estimatedNewHeaders * itemHeight);
            }

            // Non-grouped list: simple calculation including CSS gap
            return index * (itemHeight + cssGap);
        },

        _templates: function() {
            const options = this.options;
            const templates = {
                template: options.template,
                placeholderTemplate: options.placeholderTemplate,
                groupTemplate: options.groupTemplate,
                fixedGroupTemplate: options.fixedGroupTemplate
            };

            if (options.columns) {
                options.columns.forEach((column, i) => {
                    const templateText = column.field ? column.field.toString() : "text";
                    const templateFunc = data => encode(kendo.getter(templateText)(data));

                    templates["column" + i] = column.template || templateFunc;
                });
            }

            for (const key in templates) {
                if (typeof templates[key] !== "function") {
                    templates[key] = kendo.template(templates[key] || "");
                }
            }

            this.templates = templates;
        },

        _generateItems: function(element, count) {
            const items = [];
            const itemHeight = this._getItemHeightStyle();
            const itemClass = this._getItemClass();

            while (count-- > 0) {
                const text = document.createElement("span");
                text.className = "k-list-item-text";

                const item = document.createElement("li");
                item.tabIndex = -1;
                item.className = itemClass;
                item.setAttribute("role", "option");
                item.style.height = itemHeight;
                item.style.minHeight = itemHeight;
                item.style.position = "absolute";
                item.style.width = "100%";
                item.appendChild(text);

                element.appendChild(item);

                items.push(item);
            }

            return items;
        },

        // ============ Grouped List Generation Methods ============

        /**
         * Generates a unique ID for a group header element.
         * @param {number} groupIndex - The global group index
         * @param {string} groupValue - The group value
         * @returns {string} - A unique ID for the group header
         */
        _generateGroupId: function(groupIndex, groupValue) {
            // Use explicit null/undefined check to handle boolean false and 0 correctly
            const stringValue = (groupValue === null || groupValue === undefined) ? "" : String(groupValue);
            const safeValue = stringValue.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-_]/g, "");
            return this._optionID + "-group-" + groupIndex + "-" + safeValue;
        },

        /**
         * Creates a group UL container with group header (except first group)
         * Following Angular implementation pattern with role="group" and aria-labelledby
         * @param {boolean} hasHeader - Whether to include a group header li
         * @param {string} groupValue - The group value for the header
         * @param {number} groupIndex - The global group index (for generating unique IDs)
         * @returns {Object} - { ul, header, items: [], groupId }
         */
        _createGroupUl: function(hasHeader, groupValue, groupIndex, firstDataItem) {
            const that = this;
            const options = that.options;
            const itemHeight = that._getItemHeightStyle();
            const ul = document.createElement("ul");
            const groupId = that._generateGroupId(groupIndex, groupValue);
            const groupIconField = options.groupIconField;

            ul.className = LIST_UL;
            ul.style.position = "absolute";
            ul.style.width = "100%";
            ul.style.top = "0";
            ul.style.left = "0";

            // Set the ID for accessibility (aria-controls) - use base id + group index
            if (options.id) {
                ul.id = `${options.id}-group-${groupIndex}`;
            }

            // Add role="group" and aria-labelledby for accessibility (Angular pattern)
            ul.setAttribute("role", "group");
            ul.setAttribute("aria-labelledby", groupId);

            if (options.ariaLive) {
                ul.setAttribute("aria-live", options.ariaLive);
            }

            const groupContainer = {
                ul,
                header: null,
                items: [],
                groupValue,
                hasHeader,
                groupId
            };

            // Add group header for non-first groups
            if (hasHeader) {
                const header = document.createElement("li");
                header.className = that._getGroupHeaderClass();
                header.setAttribute("role", "presentation");
                header.setAttribute("id", groupId);
                header.style.height = itemHeight;
                header.style.minHeight = itemHeight;
                header.style.position = "relative";
                header.style.transform = "none";
                // Prevent the k-table-th border from bleeding outside the fixed height container
                header.style.overflow = "hidden";

                // Add group icon if groupIconField is set and first data item has the icon
                if (groupIconField && firstDataItem && firstDataItem[groupIconField]) {
                    const iconWrapper = document.createElement("span");
                    iconWrapper.className = "k-list-item-icon-wrapper";
                    iconWrapper.setAttribute("role", "presentation");
                    const iconHtml = kendo.ui.icon({ icon: firstDataItem[groupIconField], iconClass: "k-list-group-icon", attr: { "aria-hidden": "true" } });
                    $(iconWrapper).append(iconHtml);
                    $(header).append(iconWrapper);
                }

                const headerText = document.createElement("span");
                headerText.className = that._isTableVariant() ? "k-table-th" : "k-list-item-text";
                header.appendChild(headerText);

                ul.appendChild(header);
                groupContainer.header = header;
            }

            return groupContainer;
        },

        /**
         * Adds items to a group UL
         * @param {Object} groupContainer - The group container object
         * @param {number} count - Number of items to add
         */
        _addGroupItems: function(groupContainer, count) {
            const that = this;
            const itemHeight = that._getItemHeightStyle();
            const hasColumns = that._isTableVariant();
            const itemClass = that._getItemClass();

            for (let i = 0; i < count; i++) {
                const item = document.createElement("li");
                item.tabIndex = -1;
                item.className = itemClass;
                item.setAttribute("role", "option");
                item.style.height = itemHeight;
                item.style.minHeight = itemHeight;
                // Items inside grouped ULs should NOT be absolutely positioned
                // They flow naturally within the UL which is itself positioned
                item.style.position = "relative";
                item.style.transform = "none";

                // For table variant (columns), we don't add k-list-item-text here
                // The column cells will be rendered by _renderGroupItem
                if (!hasColumns) {
                    const text = document.createElement("span");
                    text.className = "k-list-item-text";
                    item.appendChild(text);
                }

                groupContainer.ul.appendChild(item);
                groupContainer.items.push(item);
            }
        },

        /**
         * Generates grouped UL structure based on visible groups
         * @param {HTMLElement} container - The container element
         * @param {Array} visibleGroups - Array of visible group info
         * @param {number} itemsPerGroup - Max items to render per group
         * @returns {Object} - { groupContainers: [...], allItems: [...] }
         */
        _generateGroupedItems: function(container, visibleGroups, itemsPerGroup) {
            const that = this;
            const groupContainers = [];
            const allItems = [];

            // Clear existing content
            container.innerHTML = "";

            for (const groupInfo of visibleGroups) {
                const groupContainer = that._createGroupUl(groupInfo.hasHeader, groupInfo.groupValue, groupInfo.groupIndex);

                // Calculate how many items to render for this group
                const itemCount = Math.min(groupInfo.itemCount, itemsPerGroup);
                that._addGroupItems(groupContainer, itemCount);

                // Position the UL
                position(groupContainer.ul, groupInfo.top);

                // Store group info on the UL for later reference
                groupContainer.ul.setAttribute("data-group-index", groupInfo.groupIndex);
                groupContainer.ul.setAttribute("data-start-index", groupInfo.startIndex);
                groupContainer.startIndex = groupInfo.startIndex;
                groupContainer.itemCount = itemCount;
                groupContainer.top = groupInfo.top;
                groupContainer.groupIndex = groupInfo.groupIndex;

                container.appendChild(groupContainer.ul);
                groupContainers.push(groupContainer);
                allItems.push(...groupContainer.items);
            }

            return { groupContainers, allItems };
        },

        // ============ End Grouped List Generation Methods ============

        _saveInitialRanges: function() {
            const ranges = this.dataSource._ranges;
            const deferred = $.Deferred();
            deferred.resolve();

            this._rangesList = {};
            for (let i = 0; i < ranges.length; i++) {
                this._rangesList[ranges[i].start] = { end: ranges[i].end, deferred };
            }
        },

        _createList: function() {
            const that = this;
            const content = that.content.get(0);
            const options = that.options;
            const dataSource = that.dataSource;

            if (that.bound()) {
                that._clean();
            }

            that._saveInitialRanges();
            that._buildValueGetter();
            that.setScreenHeight();
            that.itemCount = getItemCount(that._screenHeight, options.listScreens, options.itemHeight);

            if (that.itemCount > dataSource.total()) {
                that.itemCount = dataSource.total();
            }

            that.options.type = (dataSource.group() || []).length ? "group" : "flat";

            if (that.options.type === "flat") {
                const ul = document.createElement("ul");
                const isTableVariant = that._isTableVariant();
                ul.className = isTableVariant ? LIST_UL + " " + TABLE_LIST : LIST_UL;
                ul.style.position = "relative";
                that.content.get(0).appendChild(ul);
                that._flatUl = ul;

                // Set the ID for accessibility (aria-controls)
                if (options.id) {
                    ul.id = options.id;
                }

                if (options.ariaLive) {
                    ul.setAttribute("aria-live", options.ariaLive);
                }

                // Expose ul reference for flat (non-grouped) lists
                that.ul = $(ul);

                // Measure CSS gap from the UL for positioning calculations (only for non-table variants)
                that._cssGap = isTableVariant ? 0 : getCssGap(that.content, that.ul);

                that._items = that._generateItems(ul, that.itemCount);

                // Calculate total height including CSS gap between items
                const totalItems = dataSource.total();
                const effectiveItemHeight = options.itemHeight + that._cssGap;
                const totalHeight = totalItems * effectiveItemHeight;
                that._setHeight(totalHeight);

                that._toggleHeaderVisibility(false);

                that.getter = that._getter(() => {
                    that._renderItems(true);
                });

                that._onScroll = (scrollTop, force) => {
                    const getList = that._listItems(that.getter);
                    return that._fixedHeader(scrollTop, getList(scrollTop, force));
                };

                that._renderItems = that._whenChanged(
                    scrollCallback(content, that._onScroll),
                    syncList(that._reorderList(that._items, render.bind(that)))
                );
            } else {
                // Grouped list rendering (new behavior with multiple ULs)
                that._toggleHeaderVisibility(options.fixedGroupHeader !== false);

                // Initialize group value map for consistent group indices across pages
                that._groupValueMap = new Map();

                that._cssGap = getCssGap(that.content, null);

                // Build group ranges from dataSource (initial load, firstGroupIndex = 0)
                that._groupRanges = buildGroupRanges(dataSource, 0, 0, that._groupValueMap);

                // Determine total group count:
                let estimatedTotalGroups = options.groupCount;
                const isServerOperations = dataSource.options.serverGrouping === true;

                if (!estimatedTotalGroups && that._groupRanges.length > 0) {
                    if (isServerOperations) {
                        estimatedTotalGroups = that._groupRanges.length;
                    } else {
                        const groupDescriptor = dataSource.group();
                        const allData = dataSource.data();
                        if (allData?.length && groupDescriptor?.length) {
                            const fullGrouped = new kendo.data.Query(allData).group(groupDescriptor).data;
                            estimatedTotalGroups = fullGrouped.length;
                        } else {
                            estimatedTotalGroups = that._groupRanges.length;
                        }
                    }
                }
                that._totalGroupCount = estimatedTotalGroups || that._groupRanges.length;
                that._initialGroupRanges = that._groupRanges.slice(); // Keep a copy

                // Calculate total height including CSS gap
                // Include space for group headers (all groups except the first have inline headers)
                const groupCount = that._totalGroupCount;

                // Item count for height calculation:
                // - Server grouping: use dataSource.total() (server knows the total)
                // - Client grouping: use dataSource.data().length (all data loaded locally)
                const isServerGrouping = dataSource.options.serverGrouping === true;
                const itemCount = isServerGrouping ? dataSource.total() : (dataSource.data().length || dataSource.total());

                const totalHeight = getGroupedTotalHeight(itemCount, options.itemHeight, groupCount, that._cssGap);
                that._setHeight(totalHeight);

                // Initialize grouped rendering
                that._initGroupedRendering();
            }

            that._renderItems();
            that._calculateGroupPadding(that._screenHeight);
            that._calculateColumnsHeaderPadding();
        },

        _initGroupedRendering: function() {
            const that = this;
            const content = that.content.get(0);

            // State tracking
            that._currentPageStart = 0;
            that._renderedPageStart = null;
            that._groupUls = []; // Array of rendered UL elements
            that._items = [];

            // Create the grouped getter (handles data fetching)
            that.getter = that._groupedGetter(() => {
                that._renderItems(true);
            });

            // Scroll handler - determines which page to show
            that._onScroll = (scrollTop, force) => that._handleGroupedScroll(scrollTop, force);

            // Render function with smart change detection
            that._renderItems = that._whenChangedGrouped(
                scrollCallback(content, that._onScroll),
                (list, force) => {
                    that._renderGroupedPage(list, force);
                    return list;
                }
            );
        },

        /**
         * Handles scroll events for grouped list.
         * Determines which page of data should be displayed based on scroll position.
         */
        _handleGroupedScroll: function(scrollTop, force) {
            const that = this;
            const itemHeight = that.options.itemHeight;
            const dataSource = that.dataSource;
            const pageSize = that.itemCount;
            const total = dataSource.total();
            const screenHeight = that._screenHeight || 300;
            const totalGroupCount = that._totalGroupCount || 1;
            const isServerOperations = dataSource.options.serverGrouping === true;

            // For client-side operations, all data is loaded - no paging logic needed
            if (!isServerOperations) {
                return that._buildGroupedPageData(0, scrollTop);
            }

            // Server-side operations: calculate total content height including group headers
            const totalHeight = (total * itemHeight) + (Math.max(0, totalGroupCount - 1) * itemHeight);

            // Calculate which page we should be on based on scroll position
            const pageInfo = that._scrollPositionToPageInfo(scrollTop);
            let pageStart = pageInfo.pageStart;

            // Constrain to valid range
            const maxPageStart = Math.max(0, total - pageSize);

            // IMPORTANT: If scroll is near the end of the list (within 2x screen height of bottom),
            // use maxPageStart to ensure we have all the final items loaded
            const scrollBottom = scrollTop + screenHeight;
            const nearEnd = scrollBottom >= totalHeight - (screenHeight * 2);
            if (nearEnd && pageStart < maxPageStart) {
                pageStart = maxPageStart;
            }

            let constrainedPageStart = Math.min(Math.max(0, pageStart), maxPageStart);

            // Check if page changed
            const pageChanged = that._currentPageStart !== constrainedPageStart;

            if (pageChanged || force) {
                // Need to load new page data
                if (!dataSource.inRange(constrainedPageStart, pageSize)) {
                    // Data not available - fetch it
                    if (that._pageDeferred) {
                        that._pageDeferred.reject();
                    }

                    that._pageDeferred = that.deferredRange(constrainedPageStart);
                    that._pageDeferred.then(() => {
                        that._pageDeferred = null;
                        that.mute(() => {
                            dataSource.range(constrainedPageStart, pageSize);
                        });
                        const firstGroupIdx = that._estimateFirstGroupIndex(constrainedPageStart);
                        that._groupRanges = buildGroupRanges(dataSource, constrainedPageStart, firstGroupIdx, that._groupValueMap);
                        that._updateGroupCountAndHeight();
                        that._currentPageStart = constrainedPageStart;
                        that._renderItems(true);
                    });

                    // Return placeholder data while loading to fill the visible area
                    return that._buildPlaceholderPageData(constrainedPageStart, scrollTop);
                }

                // Data is available - switch to it
                if (dataSource.currentRangeStart() !== constrainedPageStart) {
                    that.mute(() => {
                        dataSource.range(constrainedPageStart, pageSize);
                    });
                    const firstGroupIdx = that._estimateFirstGroupIndex(constrainedPageStart);
                    that._groupRanges = buildGroupRanges(dataSource, constrainedPageStart, firstGroupIdx, that._groupValueMap);
                    that._updateGroupCountAndHeight();
                    that._currentPageStart = constrainedPageStart;

                    // Force re-render since data range changed
                    const list = that._buildGroupedPageData(constrainedPageStart, scrollTop);
                    that._renderGroupedPage(list, true, scrollTop);
                    return list;
                }

                that._currentPageStart = constrainedPageStart;
            }

            return that._buildGroupedPageData(constrainedPageStart, scrollTop);
        },

        /**
         * Calculates aggregate info about the known initial ranges.
         * @returns {Object} - { knownPosition, lastKnownIndex, lastKnownGroupIndex, avgGroupHeight, avgItemsPerGroup }
         */
        _getKnownRangeInfo: function(initialRanges, itemHeight) {
            let knownPosition = 0;
            for (let i = 0; i < initialRanges.length; i++) {
                const range = initialRanges[i];
                const headerSlots = (i > 0) ? 1 : 0;
                knownPosition += (headerSlots + range.itemCount) * itemHeight;
            }

            const lastRange = initialRanges[initialRanges.length - 1];
            const lastKnownIndex = lastRange.startIndex + lastRange.itemCount - 1;
            const lastKnownGroupIndex = initialRanges.length - 1;
            const avgGroupHeight = knownPosition / initialRanges.length;
            const avgItemsPerGroup = (lastKnownIndex + 1) / initialRanges.length;

            return { knownPosition, lastKnownIndex, lastKnownGroupIndex, avgGroupHeight, avgItemsPerGroup };
        },

        /**
         * Estimates viewport indices when scroll position is beyond known ranges.
         */
        _estimateViewportIndicesBeyondKnown: function(scrollTop, viewportEnd, rangeInfo, total) {
            const { knownPosition, lastKnownGroupIndex, avgGroupHeight, avgItemsPerGroup } = rangeInfo;

            const positionBeyondKnown = scrollTop - knownPosition;
            const groupsBeyondKnown = Math.floor(positionBeyondKnown / avgGroupHeight);
            const targetGroupIndex = lastKnownGroupIndex + 1 + groupsBeyondKnown;

            let viewportStartIndex = Math.floor(targetGroupIndex * avgItemsPerGroup);
            viewportStartIndex = Math.min(viewportStartIndex, total - 1);

            const endPositionBeyondKnown = viewportEnd - knownPosition;
            const endGroupsBeyondKnown = Math.ceil(endPositionBeyondKnown / avgGroupHeight);
            const endGroupIndex = lastKnownGroupIndex + 1 + endGroupsBeyondKnown;

            let viewportEndIndex = Math.floor(endGroupIndex * avgItemsPerGroup);
            viewportEndIndex = Math.min(viewportEndIndex, total - 1);

            return { viewportStartIndex, viewportEndIndex, targetGroupIndex };
        },

        /**
         * Finds viewport indices within known ranges using precise calculation.
         */
        _findViewportIndicesInKnownRanges: function(scrollTop, viewportEnd, initialRanges, itemHeight, rangeInfo, total) {
            const { knownPosition, lastKnownGroupIndex, avgGroupHeight, avgItemsPerGroup } = rangeInfo;

            let viewportStartIndex = 0;
            let viewportEndIndex = 0;
            let targetGroupIndex = 0;
            let position = 0;

            for (let i = 0; i < initialRanges.length; i++) {
                const range = initialRanges[i];
                const headerSlots = (i > 0) ? 1 : 0;
                const groupHeight = (headerSlots + range.itemCount) * itemHeight;
                const groupEnd = position + groupHeight;

                if (scrollTop >= position && scrollTop < groupEnd) {
                    const posInGroup = scrollTop - position;
                    const slotsIntoGroup = Math.floor(posInGroup / itemHeight);
                    const itemsIntoGroup = Math.max(0, slotsIntoGroup - headerSlots);
                    viewportStartIndex = range.startIndex + Math.min(itemsIntoGroup, range.itemCount - 1);
                    targetGroupIndex = i;
                }

                if (viewportEnd >= position && viewportEnd < groupEnd) {
                    const posInGroup = viewportEnd - position;
                    const slotsIntoGroup = Math.ceil(posInGroup / itemHeight);
                    const itemsIntoGroup = Math.max(0, slotsIntoGroup - headerSlots);
                    viewportEndIndex = range.startIndex + Math.min(itemsIntoGroup, range.itemCount - 1);
                }

                position += groupHeight;
            }

            if (viewportEnd >= knownPosition && viewportEndIndex === 0) {
                const endPositionBeyondKnown = viewportEnd - knownPosition;
                const endGroupsBeyondKnown = Math.ceil(endPositionBeyondKnown / avgGroupHeight);
                const endGroupIndex = lastKnownGroupIndex + 1 + endGroupsBeyondKnown;
                viewportEndIndex = Math.floor(endGroupIndex * avgItemsPerGroup);
                viewportEndIndex = Math.min(viewportEndIndex, total - 1);
            }

            return { viewportStartIndex, viewportEndIndex, targetGroupIndex };
        },

        /**
         * Calculates page start that centers the page around the viewport.
         */
        _calculateCenteredPageStart: function(viewportStartIndex, viewportEndIndex, pageSize, total) {
            const viewportItemCount = viewportEndIndex - viewportStartIndex + 1;
            const bufferItems = Math.floor((pageSize - viewportItemCount) / 2);
            const maxPageStart = Math.max(0, total - pageSize);

            let pageStart = Math.max(0, viewportStartIndex - bufferItems);
            pageStart = Math.min(pageStart, maxPageStart);

            const pageEnd = pageStart + pageSize - 1;
            if (viewportEndIndex > pageEnd) {
                pageStart = Math.min(maxPageStart, viewportEndIndex - pageSize + 1);
                pageStart = Math.max(0, pageStart);
            }

            return pageStart;
        },

        /**
         * Converts a scroll position to the required data page start.
         * Returns a pageStart that ensures the visible groups have data loaded.
         */
        _scrollPositionToPageInfo: function(scrollTop) {
            const that = this;
            const itemHeight = that.options.itemHeight;
            const pageSize = that.itemCount;
            const initialRanges = that._initialGroupRanges;
            const screenHeight = that._screenHeight || 300;
            const total = that.dataSource.total();

            if (!initialRanges || !initialRanges.length) {
                const itemIndex = Math.floor(scrollTop / itemHeight);
                const maxPageStart = Math.max(0, total - pageSize);
                let pageStart = Math.max(0, itemIndex - Math.floor(pageSize / 2));
                pageStart = Math.min(pageStart, maxPageStart);
                return { pageStart, groupIndex: 0 };
            }

            const rangeInfo = that._getKnownRangeInfo(initialRanges, itemHeight);
            const viewportEnd = scrollTop + screenHeight;

            let result;
            if (scrollTop >= rangeInfo.knownPosition) {
                result = that._estimateViewportIndicesBeyondKnown(scrollTop, viewportEnd, rangeInfo, total);
            } else {
                result = that._findViewportIndicesInKnownRanges(scrollTop, viewportEnd, initialRanges, itemHeight, rangeInfo, total);
            }

            let { viewportStartIndex, viewportEndIndex, targetGroupIndex } = result;

            if (viewportEndIndex === 0 || viewportEndIndex < viewportStartIndex) {
                viewportEndIndex = Math.min(viewportStartIndex + Math.ceil(screenHeight / itemHeight), total - 1);
            }

            const pageStart = that._calculateCenteredPageStart(viewportStartIndex, viewportEndIndex, pageSize, total);

            return { pageStart, groupIndex: targetGroupIndex };
        },

        /**
         * Updates the total group count and height container based on discovered groups.
         * Call this after buildGroupRanges to update height if new groups were discovered
         * or if we've reached the end of data and can determine the exact group count.
         */
        _updateGroupCountAndHeight: function() {
            const that = this;
            const options = that.options;
            const dataSource = that.dataSource;

            if (!that._groupValueMap || options.type !== "group") {
                return;
            }

            const discoveredGroupCount = that._groupValueMap.size;
            const previousGroupCount = that._totalGroupCount || 0;
            const total = dataSource.total();
            const pageSize = that.itemCount;
            const currentRangeStart = dataSource.currentRangeStart() || 0;
            const isAtEnd = (currentRangeStart + pageSize) >= total;
            const itemHeight = that.options.itemHeight;

            // Update height if:
            // 1. We've discovered more groups than we knew about, OR
            // 2. We're at the end of data and the discovered count differs from estimated
            if (discoveredGroupCount > previousGroupCount ||
                (isAtEnd && discoveredGroupCount !== previousGroupCount)) {
                that._totalGroupCount = discoveredGroupCount;
                const totalHeight = getGroupedTotalHeight(total, itemHeight, discoveredGroupCount, that._cssGap);
                that._setHeight(totalHeight);
            }
        },

        /**
         * Estimates which group index corresponds to a given data startIndex.
         */
        _estimateFirstGroupIndex: function(startIndex) {
            const initialRanges = this._initialGroupRanges;
            const totalGroups = this._totalGroupCount || 1;
            const total = this.dataSource.total();
            const avgGroupSize = total / totalGroups;

            // First check if startIndex falls within the known initial ranges
            if (initialRanges && initialRanges.length) {
                const lastRange = initialRanges[initialRanges.length - 1];
                const lastRangeEnd = lastRange.startIndex + lastRange.itemCount;

                // Only use initial ranges if startIndex is within their bounds
                if (startIndex < lastRangeEnd) {
                    for (let i = 0; i < initialRanges.length; i++) {
                        const range = initialRanges[i];
                        const rangeEnd = range.startIndex + range.itemCount;
                        if (startIndex < rangeEnd) {
                            return i;
                        }
                    }
                }
            }

            // Fallback: estimate based on average group size
            // This handles cases where startIndex is beyond the initial ranges
            return Math.floor(startIndex / avgGroupSize);
        },

        /**
         * Builds placeholder data for the loading area.
         * Creates placeholder items to fill the visible viewport while data is loading.
         */
        _buildPlaceholderPageData: function(pageStart, scrollTop) {
            const that = this;
            const itemHeight = that.options.itemHeight;
            const screenHeight = that._screenHeight || 400;

            // Calculate how many placeholder items we need to fill the visible area
            const visibleItemCount = Math.ceil(screenHeight / itemHeight) + 2; // +2 for buffer

            // Position placeholders starting at the scroll position
            const startIndex = Math.floor(scrollTop / itemHeight);
            const placeholderTop = startIndex * itemHeight;

            // Create a single placeholder "group" with loading items
            const items = [];
            for (let i = 0; i < visibleItemCount; i++) {
                const itemIndex = startIndex + i;
                items.push({
                    item: null, // null indicates placeholder/loading
                    group: "Loading...",
                    newGroup: i === 0,
                    selected: false,
                    current: false,
                    index: itemIndex,
                    top: itemIndex * itemHeight,
                    trueGlobalIndex: itemIndex,
                    globalGroupIndex: -1, // Special index for placeholder group
                    localIndex: i,
                    viewIndex: 0,
                    isPlaceholder: true
                });
            }

            // Use fixed key values for placeholders to prevent constant re-renders
            // The placeholder itself will update its position dynamically
            const pageGroups = [{
                viewIndex: 0,
                groupValue: "Loading...",
                startIndex: 0, // Use fixed startIndex for caching key
                actualGlobalStartIndex: startIndex, // Actual position for rendering
                globalGroupIndex: -1, // Special index for placeholder
                itemCount: visibleItemCount,
                fullGroupItemCount: visibleItemCount,
                hasHeader: false,
                isPartialGroup: false,
                top: placeholderTop,
                height: visibleItemCount * itemHeight,
                itemsBeforeLoad: 0,
                isPlaceholder: true
            }];

            return {
                pageStart,
                pageGroups,
                items,
                isPlaceholder: true
            };
        },

        /**
         * Builds group info objects for all groups in client-side grouping.
         */
        _buildAllClientGroupInfos: function(view, itemHeight, cssGap) {
            const that = this;
            const allGroupInfos = [];
            let globalItemIndex = 0;
            let cumulativeHeight = 0;

            for (let groupIdx = 0; groupIdx < view.length; groupIdx++) {
                const viewGroup = view[groupIdx];
                const groupValue = viewGroup.value;
                const groupItems = viewGroup.items || [];
                const groupItemCount = groupItems.length;

                if (groupItemCount === 0) { continue; }

                const hasHeader = groupIdx > 0 || that.options.fixedGroupHeader === false;
                const groupTop = cumulativeHeight;
                const elementCount = groupItemCount + (hasHeader ? 1 : 0);
                const gapsInGroup = Math.max(0, elementCount - 1) * cssGap;
                const visualHeight = (elementCount * itemHeight) + gapsInGroup;
                const groupBottom = groupTop + visualHeight;

                allGroupInfos.push({
                    viewIndex: groupIdx,
                    groupValue: groupValue,
                    startIndex: globalItemIndex,
                    actualGlobalStartIndex: globalItemIndex,
                    globalGroupIndex: groupIdx,
                    itemCount: groupItemCount,
                    fullGroupItemCount: groupItemCount,
                    hasHeader: hasHeader,
                    isPartialGroup: false,
                    top: groupTop,
                    bottom: groupBottom,
                    height: visualHeight,
                    itemsBeforeLoad: 0,
                    groupItems: groupItems
                });

                cumulativeHeight += visualHeight;
                globalItemIndex += groupItemCount;
            }

            return allGroupInfos;
        },

        /**
         * Filters visible groups and builds mapped items for client-side grouping.
         */
        _filterVisibleGroupsAndBuildItems: function(allGroupInfos, scrollTop, screenHeight, bufferSize) {
            const that = this;
            const visibleTop = Math.max(0, scrollTop - bufferSize);
            const visibleBottom = scrollTop + screenHeight + bufferSize;
            const pageGroups = [];
            const items = [];

            for (const groupInfo of allGroupInfos) {
                if (groupInfo.bottom >= visibleTop && groupInfo.top <= visibleBottom) {
                    pageGroups.push(groupInfo);

                    const groupItems = groupInfo.groupItems || [];
                    for (let j = 0; j < groupInfo.itemCount; j++) {
                        const dataItem = groupItems[j];
                        if (!dataItem) { continue; }

                        const itemIndex = groupInfo.startIndex + j;
                        const mappedItem = that._itemMapper(
                            { item: dataItem, group: groupInfo.groupValue },
                            itemIndex,
                            that._values.slice()
                        );
                        mappedItem.trueGlobalIndex = itemIndex;
                        mappedItem.globalGroupIndex = groupInfo.globalGroupIndex;
                        mappedItem.localIndex = j;
                        mappedItem.viewIndex = groupInfo.viewIndex;
                        items.push(mappedItem);
                    }
                }

                delete groupInfo.groupItems;
            }

            return { pageGroups, items };
        },

        /**
         * Builds page data for client-side grouping.
         */
        _buildClientGroupedPageData: function(pageStart, scrollTop) {
            const that = this;
            const dataSource = that.dataSource;
            const itemHeight = that.options.itemHeight;
            const cssGap = that._cssGap || 0;

            const groupDescriptor = dataSource.group();
            const allData = dataSource.data();

            if (!allData || !allData.length || !groupDescriptor || !groupDescriptor.length) {
                return { pageStart, pageGroups: [], items: [] };
            }

            const view = new kendo.data.Query(allData).group(groupDescriptor).data;

            if (!view || !view.length) {
                return { pageStart, pageGroups: [], items: [] };
            }

            const screenHeight = that._screenHeight || 400;
            const bufferSize = screenHeight;

            const allGroupInfos = that._buildAllClientGroupInfos(view, itemHeight, cssGap);
            const { pageGroups, items } = that._filterVisibleGroupsAndBuildItems(allGroupInfos, scrollTop, screenHeight, bufferSize);

            that._updateFixedHeaderClientGrouped(scrollTop, pageGroups, itemHeight);

            return { pageStart, pageGroups, items };
        },

        /**
         * Calculates the header offset for a section based on previous sections.
         */
        _calculateSectionHeaderOffset: function(viewIdx, groupRanges, view, pageStart, itemHeight) {
            const that = this;
            let headerOffset = 0;

            for (let i = 0; i < viewIdx; i++) {
                const prevRange = groupRanges[i];
                const prevViewGroup = view[i];

                if (prevRange && prevViewGroup) {
                    const prevFirstItemInPage = Math.max(prevRange.startIndex, pageStart);
                    const prevItemsBeforeLoad = prevFirstItemInPage - prevRange.startIndex;
                    const prevHasHeader = (i > 0 || that.options.fixedGroupHeader === false) && prevItemsBeforeLoad === 0;

                    if (prevHasHeader) {
                        headerOffset += itemHeight;
                    }
                }
            }

            return headerOffset;
        },

        /**
         * Builds a single server group section info and its items.
         */
        _buildServerGroupSection: function(viewIdx, viewGroup, groupRange, pageStart, pageEnd, itemHeight, headerOffset) {
            const that = this;
            const groupStartIndex = groupRange.startIndex;
            const groupEndIndex = groupRange.startIndex + groupRange.itemCount;

            if (groupEndIndex <= pageStart || groupStartIndex >= pageEnd) {
                return null;
            }

            const firstItemInPage = Math.max(groupStartIndex, pageStart);
            const lastItemInPage = Math.min(groupEndIndex, pageEnd);
            const itemsInPage = lastItemInPage - firstItemInPage;

            const itemOffset = firstItemInPage - groupStartIndex;
            const viewGroupItems = viewGroup.items || [];
            const groupItems = viewGroupItems.slice(itemOffset, itemOffset + itemsInPage);
            const groupItemCount = groupItems.length;

            if (groupItemCount === 0) {
                return null;
            }

            const globalStartIndex = firstItemInPage;
            const globalGroupIndex = groupRange.globalGroupIndex;
            const sectionTop = globalStartIndex * itemHeight;
            const itemsBeforeLoad = globalStartIndex - groupRange.startIndex;
            const isPartialGroup = itemsBeforeLoad > 0;
            const hasHeader = (viewIdx > 0 || that.options.fixedGroupHeader === false) && !isPartialGroup;

            const groupTop = sectionTop + headerOffset;
            const groupHeight = (hasHeader ? itemHeight : 0) + (groupItemCount * itemHeight);

            const sectionItems = [];
            for (let j = 0; j < groupItemCount; j++) {
                const dataItem = groupItems[j];
                if (!dataItem) { continue; }

                const globalIndex = globalStartIndex + j;
                const mappedItem = that._itemMapper(
                    { item: dataItem, group: viewGroup.value },
                    globalIndex,
                    that._values.slice()
                );
                mappedItem.viewIndex = viewIdx;
                mappedItem.globalGroupIndex = globalGroupIndex;
                mappedItem.localIndex = j;
                sectionItems.push(mappedItem);
            }

            const groupInfo = {
                viewIndex: viewIdx,
                groupValue: viewGroup.value,
                startIndex: globalStartIndex,
                actualGlobalStartIndex: groupRange.startIndex,
                globalGroupIndex: globalGroupIndex,
                sectionIndex: viewIdx,
                itemCount: groupItemCount,
                fullGroupItemCount: groupRange.itemCount,
                hasHeader: hasHeader,
                isPartialGroup: isPartialGroup,
                top: groupTop,
                height: groupHeight,
                itemsBeforeLoad: itemsBeforeLoad
            };

            return { groupInfo, sectionItems };
        },

        /**
         * Builds page data for server-side grouping.
         */
        _buildServerGroupedPageData: function(pageStart, scrollTop) {
            const that = this;
            const dataSource = that.dataSource;
            const view = dataSource.view();
            const groupRanges = that._groupRanges || [];
            const itemHeight = that.options.itemHeight;
            const pageSize = that.itemCount;
            const pageEnd = pageStart + pageSize;

            const pageGroups = [];
            const items = [];

            for (let viewIdx = 0; viewIdx < view.length; viewIdx++) {
                const viewGroup = view[viewIdx];
                const groupRange = groupRanges[viewIdx];

                if (!groupRange) { continue; }

                const headerOffset = that._calculateSectionHeaderOffset(viewIdx, groupRanges, view, pageStart, itemHeight);
                const result = that._buildServerGroupSection(viewIdx, viewGroup, groupRange, pageStart, pageEnd, itemHeight, headerOffset);

                if (result) {
                    pageGroups.push(result.groupInfo);
                    items.push(...result.sectionItems);
                }
            }

            that._updateFixedHeader(scrollTop, pageGroups);

            return { pageStart, pageGroups, items };
        },

        /**
         * Builds the data structure for the current page.
         * Delegates to client or server grouping handlers.
         */
        _buildGroupedPageData: function(pageStart, scrollTop) {
            const that = this;
            const isServerGrouping = that.dataSource.options.serverGrouping;

            if (!isServerGrouping) {
                return that._buildClientGroupedPageData(pageStart, scrollTop);
            }

            return that._buildServerGroupedPageData(pageStart, scrollTop);
        },

        /**
         * Calculates the absolute pixel position for a group's UL.
         * Position = (items before * itemHeight) + (headers before * itemHeight)
         */
        _calculateGroupTopPosition: function(startIndex, globalGroupIndex, itemHeight) {
            // Items before this group = startIndex
            // Headers before this group = max(0, globalGroupIndex - 1)
            // (First group has no header, so groups 1,2,3... each add one header before the next)
            const headersBefore = Math.max(0, globalGroupIndex - 1);
            return (startIndex * itemHeight) + (headersBefore * itemHeight);
        },

        /**
         * Updates the sticky header based on current scroll position.
         */
        _updateFixedHeader: function(scrollTop, pageGroups) {
            const that = this;

            if (!pageGroups.length) {return;}

            // Find which group is at the scroll position
            let currentGroup = null;
            for (let i = pageGroups.length - 1; i >= 0; i--) {
                const group = pageGroups[i];
                if (scrollTop >= group.top) {
                    currentGroup = group;
                    break;
                }
            }

            if (!currentGroup) {
                currentGroup = pageGroups[0];
            }

            if (that.currentVisibleGroup !== currentGroup.groupValue) {
                that.header.html(that.templates.fixedGroupTemplate(currentGroup.groupValue));
                that.currentVisibleGroup = currentGroup.groupValue;
                that._currentVisibleGroupIndex = currentGroup.globalGroupIndex;
            }
        },

        /**
         * Updates the sticky header for client-side grouped lists based on scroll position.
         * Uses the pageGroups array to find which group is currently visible.
         * Also hides inline group headers that match the sticky header to avoid duplication.
         */
        _updateFixedHeaderClientGrouped: function(scrollTop, pageGroups, itemHeight) {
            const that = this;

            if (!pageGroups.length) {return;}

            // Find which group is at the scroll position
            let currentGroup = null;
            for (let i = pageGroups.length - 1; i >= 0; i--) {
                const group = pageGroups[i];
                if (scrollTop >= group.top) {
                    currentGroup = group;
                    break;
                }
            }

            if (!currentGroup) {
                currentGroup = pageGroups[0];
            }

            // Update sticky header if group changed
            if (that.currentVisibleGroup !== currentGroup.groupValue) {
                that.header.html(that.templates.fixedGroupTemplate(currentGroup.groupValue));
                that.currentVisibleGroup = currentGroup.groupValue;
                that._currentVisibleGroupIndex = currentGroup.globalGroupIndex;
            }
        },

        _removeOrphanUls: function(content) {
            const that = this;
            const trackedUlSet = new Set(that._groupUls);
            const domUls = content.querySelectorAll("ul[data-group-index]");

            for (const domUl of domUls) {
                const groupIndex = parseInt(domUl.getAttribute("data-group-index"), 10);
                if (groupIndex === -1 || trackedUlSet.has(domUl)) {continue;}

                if (domUl.parentNode) {
                    domUl.parentNode.removeChild(domUl);
                }
            }
        },

        _buildExistingUlMap: function() {
            const that = this;
            const existingMap = new Map();
            const cleanedGroupUls = [];

            for (const ul of that._groupUls) {
                const groupIndex = parseInt(ul.getAttribute("data-group-index"), 10);
                const sectionIndex = parseInt(ul.getAttribute("data-section-index") || "0", 10);
                const groupKey = groupIndex + "_" + sectionIndex;

                if (!isNaN(groupIndex)) {
                    if (existingMap.has(groupKey)) {
                        if (ul.parentNode) {
                            ul.parentNode.removeChild(ul);
                        }
                    } else {
                        existingMap.set(groupKey, ul);
                        cleanedGroupUls.push(ul);
                    }
                }
            }

            that._groupUls = cleanedGroupUls;
            return existingMap;
        },

        _processExistingUl: function(existingUl, groupInfo, listItems, force, keptUls, newUls, existingMap) {
            const that = this;
            const groupIndex = groupInfo.globalGroupIndex;
            const sectionIndex = groupInfo.sectionIndex !== undefined ? groupInfo.sectionIndex : 0;
            const groupKey = groupIndex + "_" + sectionIndex;

            const headerSelector = that._isTableVariant() ? ".k-table-group-row" : ".k-list-group-item";
            const existingHasHeader = !!existingUl.querySelector(headerSelector);
            const headerStatusChanged = existingHasHeader !== groupInfo.hasHeader;

            if (headerStatusChanged) {
                if (existingUl.parentNode) {
                    existingUl.parentNode.removeChild(existingUl);
                }
                existingMap.delete(groupKey);
                const newUl = that._createGroupUlElement(groupInfo, listItems);
                if (sectionIndex > 0) {
                    newUl.setAttribute("data-section-index", sectionIndex);
                }
                newUls.push({ ul: newUl, groupIndex: groupIndex, sectionIndex: sectionIndex, groupKey: groupKey });
                return;
            }

            const cachedStartIndex = parseInt(existingUl.getAttribute("data-start-index"), 10);
            const cachedItemCount = existingUl.querySelectorAll("li[data-offset-index]").length;
            const startIndexChanged = cachedStartIndex !== groupInfo.startIndex;
            const itemCountChanged = cachedItemCount !== groupInfo.itemCount;

            if (startIndexChanged || itemCountChanged || force) {
                that._updateGroupUl(existingUl, groupInfo, listItems);
                if (startIndexChanged) {
                    existingUl.setAttribute("data-start-index", groupInfo.startIndex);
                }
            }

            const currentTop = existingUl._cachedTop;
            if (currentTop !== groupInfo.top) {
                position(existingUl, groupInfo.top);
                existingUl._cachedTop = groupInfo.top;
            }

            keptUls.push(existingUl);
            existingMap.delete(groupKey);

            const items = existingUl.querySelectorAll("li[data-offset-index]");
            that._items.push(...Array.from(items));
        },

        _insertNewUlsInOrder: function(content, newUls) {
            for (const { ul: newUl, sectionIndex: newSectionIndex } of newUls) {
                let insertBefore = null;
                const existingUls = content.querySelectorAll("ul[data-group-index]");

                for (const existingUl of existingUls) {
                    const existingSectionIndex = parseInt(existingUl.getAttribute("data-section-index") || "0", 10);
                    if (existingSectionIndex > newSectionIndex) {
                        insertBefore = existingUl;
                        break;
                    }
                }

                if (insertBefore) {
                    content.insertBefore(newUl, insertBefore);
                } else {
                    content.appendChild(newUl);
                }
            }
        },

        _renderGroupedPage: function(list, force, targetScrollTop) {
            const that = this;
            const content = that.content.get(0);
            const pageGroups = list.pageGroups || [];
            const pageStart = list.pageStart;
            const scrollTop = typeof targetScrollTop === 'number' ? targetScrollTop : content.scrollTop;

            if (list.isPlaceholder) {
                that._renderPlaceholderPage(list, scrollTop);
                return;
            }

            if (that._placeholderUl && that._placeholderUl.parentNode) {
                that._placeholderUl.parentNode.removeChild(that._placeholderUl);
                that._placeholderUl = null;
            }

            that._lastRenderScrollTop = scrollTop;
            that._removeOrphanUls(content);

            const existingMap = that._buildExistingUlMap();
            const keptUls = [];
            const newUls = [];
            that._items = [];

            for (const groupInfo of pageGroups) {
                const groupIndex = groupInfo.globalGroupIndex;
                const sectionIndex = groupInfo.sectionIndex !== undefined ? groupInfo.sectionIndex : 0;
                const groupKey = groupIndex + "_" + sectionIndex;
                const existingUl = existingMap.get(groupKey);

                if (existingUl) {
                    that._processExistingUl(existingUl, groupInfo, list.items, force, keptUls, newUls, existingMap);
                } else {
                    const newUl = that._createGroupUlElement(groupInfo, list.items);
                    if (sectionIndex > 0) {
                        newUl.setAttribute("data-section-index", sectionIndex);
                    }
                    newUls.push({ ul: newUl, groupIndex: groupIndex, sectionIndex: sectionIndex, groupKey: groupKey });
                }
            }

            for (const ul of existingMap.values()) {
                if (ul.parentNode) {
                    ul.parentNode.removeChild(ul);
                }
            }

            that._insertNewUlsInOrder(content, newUls);
            that._groupUls = keptUls.concat(newUls.map(n => n.ul));
            that._renderedPageStart = pageStart;
            content.scrollTop = scrollTop;
            that._dataView = list.items;
        },

        _calculateCoveredRange: function(visibleTop, visibleBottom, screenHeight) {
            const that = this;
            let coveredTop = Infinity;
            let coveredBottom = 0;

            for (const ul of that._groupUls) {
                if (!ul || !ul.parentNode) {continue;}

                const transform = ul.style.transform;
                const yMatch = transform.match(/translateY\((\d+)px\)/);
                const ulTop = yMatch ? parseFloat(yMatch[1]) : 0;
                const ulBottom = ulTop + ul.offsetHeight;

                if (ulBottom >= visibleTop - screenHeight && ulTop <= visibleBottom + screenHeight) {
                    coveredTop = Math.min(coveredTop, ulTop);
                    coveredBottom = Math.max(coveredBottom, ulBottom);
                }
            }

            return { coveredTop, coveredBottom };
        },

        _calculatePlaceholderPosition: function(visibleTop, visibleBottom, coveredTop, coveredBottom, screenHeight, totalContentHeight) {
            let placeholderTop = 0;
            let placeholderHeight = 0;

            if (coveredTop === Infinity) {
                placeholderTop = Math.max(0, visibleTop);
                placeholderHeight = screenHeight;
            } else if (visibleTop < coveredTop) {
                placeholderTop = Math.max(0, visibleTop);
                placeholderHeight = coveredTop - placeholderTop;
            } else if (visibleBottom > coveredBottom && coveredBottom < totalContentHeight) {
                placeholderTop = coveredBottom;
                placeholderHeight = Math.min(visibleBottom, totalContentHeight) - coveredBottom;
            }

            return { placeholderTop, placeholderHeight };
        },

        _ensurePlaceholderUl: function(content) {
            const that = this;

            if (!that._placeholderUl) {
                const ul = document.createElement("ul");
                ul.className = LIST_UL + " k-loading-placeholder";
                ul.style.position = "absolute";
                ul.style.width = "100%";
                ul.style.top = "0";
                ul.style.left = "0";
                ul.setAttribute("role", "group");
                ul.setAttribute("data-group-index", "-1");

                if (that.options.ariaLive) {
                    ul.setAttribute("aria-live", that.options.ariaLive);
                }

                that._placeholderUl = ul;
                content.appendChild(ul);
            }

            return that._placeholderUl;
        },

        _updatePlaceholderItems: function(ul, placeholderItemCount) {
            const that = this;
            const templates = that.templates;
            let currentCount = ul.querySelectorAll("li.k-list-item").length;

            while (currentCount < placeholderItemCount) {
                const li = that._createItemLi();
                li.classList.add("k-loading-item");
                const textSpan = li.querySelector(".k-list-item-text");
                if (textSpan) {
                    textSpan.innerHTML = templates.placeholderTemplate({});
                }
                ul.appendChild(li);
                currentCount++;
            }

            while (ul.children.length > placeholderItemCount) {
                ul.removeChild(ul.lastChild);
            }
        },

        _renderPlaceholderPage: function(list, scrollTop) {
            const that = this;
            const content = that.content.get(0);
            const itemHeight = that.options.itemHeight;
            const screenHeight = that._screenHeight || 400;
            const total = that.dataSource.total();

            const groupCount = that._totalGroupCount || 1;
            const totalContentHeight = getGroupedTotalHeight(total, itemHeight, groupCount, that._cssGap);

            const visibleTop = scrollTop;
            const visibleBottom = Math.min(scrollTop + screenHeight, totalContentHeight);

            const { coveredTop, coveredBottom } = that._calculateCoveredRange(visibleTop, visibleBottom, screenHeight);
            const { placeholderTop, placeholderHeight } = that._calculatePlaceholderPosition(
                visibleTop, visibleBottom, coveredTop, coveredBottom, screenHeight, totalContentHeight
            );

            if (placeholderHeight <= 0) {
                if (that._placeholderUl && that._placeholderUl.parentNode) {
                    that._placeholderUl.style.display = "none";
                }
                return;
            }

            const placeholderItemCount = Math.ceil(placeholderHeight / itemHeight) + 1;
            const ul = that._ensurePlaceholderUl(content);

            ul.style.display = "";
            position(ul, placeholderTop);

            that._updatePlaceholderItems(ul, placeholderItemCount);
            that.header.html(that.templates.fixedGroupTemplate("Loading..."));
        },

        /**
         * Creates a group UL element with all its items (does not add to DOM).
         */
        _createGroupUlElement: function(groupInfo, allItems) {
            const that = this;
            const templates = that.templates;

            // Get items for this group/section
            // For server paging, we may have multiple sections with the same globalGroupIndex
            // Use viewIndex if available (set by _buildGroupedPageData for server grouping)
            let groupItems;
            if (groupInfo.sectionIndex !== undefined) {
                // Server paging: filter by viewIndex (which equals sectionIndex)
                groupItems = allItems.filter(item => item.viewIndex === groupInfo.sectionIndex);
            } else {
                // Client-side grouping: filter by globalGroupIndex
                groupItems = allItems.filter(item => item.globalGroupIndex === groupInfo.globalGroupIndex);
            }

            // Get first data item for group icon
            const firstDataItem = groupItems.length > 0 ? groupItems[0].item : null;

            // Create the group UL container
            const groupContainer = that._createGroupUl(groupInfo.hasHeader, groupInfo.groupValue, groupInfo.globalGroupIndex, firstDataItem);

            // Update header content if present
            if (groupContainer.header) {
                const headerText = groupContainer.header.querySelector(that._getHeaderTextSelector());
                if (headerText) {
                    headerText.innerHTML = templates.groupTemplate(groupInfo.groupValue);
                }
            }

            // Add and render items
            that._addGroupItems(groupContainer, groupItems.length);

            for (let i = 0; i < groupItems.length; i++) {
                that._renderGroupItem(groupContainer.items[i], groupItems[i], templates);
            }

            // Position the UL
            position(groupContainer.ul, groupInfo.top);
            groupContainer.ul.setAttribute("data-group-index", groupInfo.globalGroupIndex);
            groupContainer.ul.setAttribute("data-start-index", groupInfo.startIndex);
            groupContainer.ul._cachedTop = groupInfo.top;

            // Track items
            that._items.push(...groupContainer.items);

            return groupContainer.ul;
        },

        /**
         * Updates an existing group UL with new items.
         */
        _updateGroupUl: function(ul, groupInfo, allItems) {
            const that = this;
            const templates = that.templates;
            const globalGroupIndex = groupInfo.globalGroupIndex;

            // Get items for this group/section
            // For server paging, we may have multiple sections with the same globalGroupIndex
            let groupItems;
            if (groupInfo.sectionIndex !== undefined) {
                // Server paging: filter by viewIndex (which equals sectionIndex)
                groupItems = allItems.filter(item => item.viewIndex === groupInfo.sectionIndex);
            } else {
                // Client-side grouping: filter by globalGroupIndex
                groupItems = allItems.filter(item => item.globalGroupIndex === globalGroupIndex);
            }

            // Get existing item LIs (exclude header)
            const existingItems = Array.from(ul.querySelectorAll("li[data-offset-index]"));

            // First, remove extra LIs if we have fewer items now
            while (existingItems.length > groupItems.length) {
                const li = existingItems.pop();
                if (li && li.parentNode) {
                    li.parentNode.removeChild(li);
                }
            }

            // Update existing items or add new ones as needed
            for (let i = 0; i < groupItems.length; i++) {
                const itemData = groupItems[i];
                let li = existingItems[i];

                if (!li) {
                    // Need to add a new LI
                    li = that._createItemLi();
                    ul.appendChild(li);
                }

                that._renderGroupItem(li, itemData, templates);
            }
        },

        /**
         * Creates a single item LI element.
         */
        _createItemLi: function() {
            const that = this;
            const itemHeight = that._getItemHeightStyle();
            const hasColumns = that._isTableVariant();
            const itemClass = that._getItemClass();

            const li = document.createElement("li");
            li.setAttribute("tabindex", "-1");
            li.setAttribute("role", "option");
            li.className = itemClass;
            li.style.height = itemHeight;
            li.style.minHeight = itemHeight;
            li.style.position = "relative";
            li.style.transform = "none";

            if (!hasColumns) {
                const textSpan = document.createElement("span");
                textSpan.className = "k-list-item-text";
                li.appendChild(textSpan);
            }

            return li;
        },

        /**
         * Removes all group ULs from the DOM.
         */
        _clearAllGroupUls: function() {
            const that = this;

            for (const ul of that._groupUls) {
                if (ul && ul.parentNode) {
                    ul.parentNode.removeChild(ul);
                }
            }

            that._groupUls = [];
            that._items = [];
        },

        /**
         * Creates and renders a single group UL with all its items.
         */
        _createAndRenderGroupUl: function(groupInfo, allItems) {
            const that = this;
            const content = that.content.get(0);
            const templates = that.templates;

            // Get items for this group
            const groupItems = allItems.filter(item => item.globalGroupIndex === groupInfo.globalGroupIndex);

            // Create the group UL container
            const groupContainer = that._createGroupUl(groupInfo.hasHeader, groupInfo.groupValue, groupInfo.globalGroupIndex);

            // Update header content if present
            if (groupContainer.header) {
                const headerText = groupContainer.header.querySelector(that._getHeaderTextSelector());
                if (headerText) {
                    headerText.innerHTML = templates.groupTemplate(groupInfo.groupValue);
                }
            }

            // Add and render items
            that._addGroupItems(groupContainer, groupItems.length);

            for (let i = 0; i < groupItems.length; i++) {
                that._renderGroupItem(groupContainer.items[i], groupItems[i], templates);
            }

            // Position the UL
            position(groupContainer.ul, groupInfo.top);
            groupContainer.ul.setAttribute("data-group-index", groupInfo.globalGroupIndex);
            groupContainer.ul.setAttribute("data-start-index", groupInfo.startIndex);
            groupContainer.ul._cachedTop = groupInfo.top;

            // Add to DOM and track
            content.appendChild(groupContainer.ul);
            that._groupUls.push(groupContainer.ul);
            that._items.push(...groupContainer.items);
        },

        /**
         * PAGE-BASED: Renders or updates a single group UL.
         * Creates new UL if not cached, or updates existing one.
         */
        _renderGroupUlPaged: function(groupInfo, allItems) {
            const that = this;
            const content = that.content.get(0);
            const templates = that.templates;
            const viewIndex = groupInfo.viewIndex;

            // Get items for this group from allItems
            const groupItems = allItems.filter(item => item.viewIndex === viewIndex);
            const cached = that._groupUlCache[viewIndex];

            if (!cached) {
                // Create new group UL
                const groupContainer = that._createGroupUl(groupInfo.hasHeader, groupInfo.groupValue, groupInfo.viewIndex);

                // Update header content if present
                if (groupContainer.header) {
                    const headerText = groupContainer.header.querySelector(that._getHeaderTextSelector());
                    if (headerText) {
                        headerText.innerHTML = templates.groupTemplate(groupInfo.groupValue);
                    }
                }

                // Add item elements for visible items in this group
                that._addGroupItems(groupContainer, groupItems.length);

                // Render item content
                for (let i = 0; i < groupItems.length; i++) {
                    that._renderGroupItem(groupContainer.items[i], groupItems[i], templates);
                }

                // Position the UL
                position(groupContainer.ul, groupInfo.top);
                groupContainer.ul.setAttribute("data-view-index", viewIndex);
                groupContainer.ul.setAttribute("data-start-index", groupInfo.startIndex);
                groupContainer.startIndex = groupInfo.startIndex;
                groupContainer.itemCount = groupItems.length;
                groupContainer.top = groupInfo.top;
                groupContainer.viewIndex = viewIndex;

                content.appendChild(groupContainer.ul);
                that._groupUlCache[viewIndex] = groupContainer;

                // Track items
                that._items.push(...groupContainer.items);
            } else {
                // Update existing UL - only update position and item content
                const newTop = groupInfo.top;
                position(cached.ul, newTop);
                cached.top = newTop;

                // Update item content
                for (let k = 0; k < groupItems.length; k++) {
                    const li = cached.items[k];
                    if (li) {
                        const itemData = groupItems[k];
                        that._renderGroupItem(li, itemData, templates);
                        li.style.display = "";
                    }
                }
            }
        },

        /**
         * Reorders group ULs in the DOM to match the expected order.
         */
        _reorderGroupUls: function(content, pageGroups) {
            // Get current UL order
            const currentUls = Array.from(content.querySelectorAll("." + LIST_UL));

            // Check if reordering is needed
            let needsReorder = false;
            let lastIndex = -1;
            for (const ul of currentUls) {
                const idx = parseInt(ul.getAttribute("data-view-index"), 10);
                if (idx < lastIndex) {
                    needsReorder = true;
                    break;
                }
                lastIndex = idx;
            }

            if (needsReorder) {
                // Sort ULs by view index
                const sortedUls = currentUls.sort((a, b) =>
                    parseInt(a.getAttribute("data-view-index"), 10) - parseInt(b.getAttribute("data-view-index"), 10)
                );

                // Reinsert in correct order
                for (const ul of sortedUls) {
                    content.appendChild(ul);
                }
            }
        },

        /**
         * Finds the first visible item based on scroll position
         */
        _findFirstVisibleItem: function(items, scrollTop, pageGroups) {
            const itemHeight = this.options.itemHeight;

            // Find which group is visible at scrollTop
            if (pageGroups) {
                for (let i = 0; i < pageGroups.length; i++) {
                    const group = pageGroups[i];
                    const groupBottom = group.top + (group.hasHeader ? itemHeight : 0) + (group.itemCount * itemHeight);
                    if (scrollTop < groupBottom) {
                        // This group is visible, find item in this group
                        const groupItems = items.filter(item => item.viewIndex === group.viewIndex);
                        return groupItems[0] || items[0];
                    }
                }
            }

            return items[0];
        },

        /**
         * Renders a single item in a group
         */
        _renderGroupItem: function(element, data, templates) {
            const that = this;
            const options = that.options;
            const $element = $(element);
            const itemTemplate = data.item ? templates.template : templates.placeholderTemplate;
            const hasColumns = options.columns?.length;
            const dataItem = data.item;

            $element
                .attr("data-uid", dataItem ? dataItem.uid : "")
                .attr("data-offset-index", data.index);

            // Handle table variant with columns
            if (hasColumns && dataItem) {
                // Render column cells
                const renderedColumns = $(renderColumns(options, dataItem, templates));
                kendo.applyStylesFromKendoAttributes(renderedColumns, ["width", "max-width"]);
                $element.empty().append(renderedColumns);

                // Handle alternating rows
                const altRow = data.index % 2 === 1;
                $element.toggleClass("k-table-alt-row", altRow);
            } else if (hasColumns && !dataItem) {
                // Placeholder for table variant - show empty cells
                let placeholderHtml = '';
                for (let i = 0; i < options.columns.length; i++) {
                    const currentWidth = options.columns[i].width;
                    const currentWidthInt = parseInt(currentWidth, 10);
                    let widthStyle = '';
                    if (currentWidth) {
                        const widthValue = currentWidthInt + 'px';
                        widthStyle = `${kendo.attr("style-width")}="${widthValue}" ${kendo.attr("style-max-width")}="${widthValue}"`;
                    }
                    placeholderHtml += `<span class='k-table-td' ${widthStyle}></span>`;
                }
                const renderedPlaceholder = $(placeholderHtml);
                kendo.applyStylesFromKendoAttributes(renderedPlaceholder, ["width", "max-width"]);
                $element.empty().append(renderedPlaceholder);
            } else {
                // Non-table variant - use k-list-item-text
                const textSpan = $element.find(".k-list-item-text");
                textSpan.html(itemTemplate(dataItem || {}));
            }

            $element.toggleClass(FOCUSED, data.current);
            $element.toggleClass(SELECTED, data.selected);
            $element.toggleClass("k-loading-item", !dataItem);

            element.style.display = "";
        },

        /**
         * Creates a grouped data getter
         */
        _groupedGetter: function(callback) {
            const that = this;
            const dataSource = that.dataSource;
            const pageSize = that.itemCount;
            let lastRequestedRange = null;
            let lastRangeStart = dataSource.skip();

            if (dataSource.pageSize() < pageSize) {
                that.mute(() => {
                    dataSource.pageSize(pageSize);
                });
            }

            return function(index, rangeStart) {
                if (!dataSource.inRange(rangeStart, pageSize)) {
                    if (lastRequestedRange !== rangeStart) {
                        lastRequestedRange = rangeStart;
                        lastRangeStart = rangeStart;

                        if (that._getterDeferred) {
                            that._getterDeferred.reject();
                        }

                        that._getterDeferred = that.deferredRange(rangeStart);
                        that._getterDeferred.then(() => {
                            that._getterDeferred = null;
                            const firstGroupIdx = that._estimateFirstGroupIndex(rangeStart);
                            that._groupRanges = buildGroupRanges(dataSource, rangeStart, firstGroupIdx, that._groupValueMap);
                            that._updateGroupCountAndHeight();
                            callback();
                        });
                    }

                    return null;
                } else {
                    if (lastRangeStart !== rangeStart) {
                        that.mute(() => {
                            dataSource.range(rangeStart, pageSize);
                            lastRangeStart = rangeStart;
                        });
                        const firstGroupIdx = that._estimateFirstGroupIndex(rangeStart);
                        that._groupRanges = buildGroupRanges(dataSource, rangeStart, firstGroupIdx, that._groupValueMap);
                        that._updateGroupCountAndHeight();
                    }

                    const view = dataSource.view();
                    const flatIndex = index - rangeStart;
                    let currentIndex = 0;

                    for (const group of view) {
                        const groupItems = group.items || [];
                        if (flatIndex < currentIndex + groupItems.length) {
                            return {
                                item: groupItems[flatIndex - currentIndex],
                                group: group.value
                            };
                        }
                        currentIndex += groupItems.length;
                    }

                    return null;
                }
            };
        },

        _setHeight: function(height) {
            let heightContainer = this.heightContainer;
            let currentHeight;

            if (!heightContainer) {
                heightContainer = this.heightContainer = appendChild(this.content[0], HEIGHTCONTAINER);
            } else {
                currentHeight = heightContainer.offsetHeight;
            }

            if (height !== currentHeight) {
                heightContainer.innerHTML = "";

                while (height > 0) {
                    const padHeight = Math.min(height, 250000); //IE workaround, should not create elements with height larger than 250000px
                    appendChild(heightContainer).style.height = padHeight + "px";
                    height -= padHeight;
                }
            }
        },

        _getter: function() {
            const dataSource = this.dataSource;
            const type = this.options.type;
            const pageSize = this.itemCount;
            const flatGroups = {};
            let lastRequestedRange = null;
            let lastRangeStart = dataSource.skip();

            if (dataSource.pageSize() < pageSize) {
                this.mute(function() {
                    dataSource.pageSize(pageSize);
                });
            }

            return function(index, rangeStart) {
                const that = this;
                if (!dataSource.inRange(rangeStart, pageSize)) {
                    if (lastRequestedRange !== rangeStart) {
                        lastRequestedRange = rangeStart;
                        lastRangeStart = rangeStart;

                        if (that._getterDeferred) {
                            that._getterDeferred.reject();
                        }

                        that._getterDeferred = that.deferredRange(rangeStart);
                        that._getterDeferred.then(() => {
                            const firstItemIndex = that._indexConstraint(that.content[0].scrollTop);

                            that._getterDeferred = null;

                            if (rangeStart <= firstItemIndex && firstItemIndex <= (rangeStart + pageSize)) {
                                that._fetching = true;
                                dataSource.range(rangeStart, pageSize);
                            }
                        });
                    }

                    return null;
                } else {
                    if (lastRangeStart !== rangeStart) {
                        this.mute(() => {
                            dataSource.range(rangeStart, pageSize);
                            lastRangeStart = rangeStart;
                        });
                    }

                    let result;
                    if (type === "group") { //grouped list
                        if (!flatGroups[rangeStart]) {
                            const flatGroup = flatGroups[rangeStart] = [];
                            const groups = dataSource.view();
                            for (const group of groups) {
                                for (const item of group.items) {
                                    flatGroup.push({ item, group: group.value });
                                }
                            }
                        }

                        result = flatGroups[rangeStart][index - rangeStart];
                    } else { //flat list
                        result = dataSource.view()[index - rangeStart];
                    }

                    return result;
                }
            };
        },

        _fixedHeader: function(scrollTop, list) {
            const group = this.currentVisibleGroup;
            const itemHeight = this.options.itemHeight;
            const listItems = list.items || [];
            const firstVisibleDataItemIndex = Math.floor((scrollTop - list.top) / itemHeight);
            const firstVisibleDataItem = listItems[firstVisibleDataItemIndex];

            if (firstVisibleDataItem?.item) {
                const firstVisibleGroup = firstVisibleDataItem.group;

                if (firstVisibleGroup !== group) {
                    const fixedGroupText = firstVisibleGroup || "";
                    this.header.html(this.templates.fixedGroupTemplate(fixedGroupText));
                    this.currentVisibleGroup = firstVisibleGroup;
                }
            }

            return list;
        },

        _itemMapper: function(item, index, value) {
            const listType = this.options.type;
            const itemHeight = this.options.itemHeight;
            const cssGap = this._cssGap || 0;
            const currentIndex = this._focusedIndex;
            const valueGetter = this._valueGetter;
            let selected = false;
            let current = false;
            let newGroup = false;
            let group = null;

            if (listType === "group") {
                if (item) {
                    newGroup = index === 0 || (this._currentGroup !== false && this._currentGroup !== item.group);
                    this._currentGroup = item.group;
                }

                group = item ? item.group : null;
                item = item ? item.item : null;
            }

            if (this.options.mapValueTo === "dataItem" && this._selectedDataItems.length && item) {
                for (let i = 0; i < this._selectedDataItems.length; i++) {
                    if (valueGetter(this._selectedDataItems[i]) === valueGetter(item)) {
                        selected = true;
                        break;
                    }
                }
            } else if (!this.isFiltered() && value.length && item) {
                for (let j = 0; j < value.length; j++) {
                    const match = isPrimitive(item) ? value[j] === item : value[j] === valueGetter(item);
                    if (match) {
                        value.splice(j , 1);
                        selected = true;
                        break;
                    }
                }
            }

            if (currentIndex === index) {
                current = true;
            }

            return {
                item: item ? item : null,
                group,
                newGroup,
                selected,
                current,
                index,
                top: index * (itemHeight + cssGap)
            };
        },

        _range: function(index) {
            const itemCount = this.itemCount;
            const value = this._values.slice();
            const items = [];

            this._view = {};
            this._currentGroup = false;

            for (let i = index, length = index + itemCount; i < length; i++) {
                const item = this._itemMapper(this.getter(i, index), i, value);
                if (items[items.length - 1]) {
                    items[items.length - 1].isLastGroupedItem = item.newGroup;
                }
                items.push(item);
                this._view[item.index] = item;
            }

            this._dataView = items;
            return items;
        },

        _getDataItemsCollection: function(scrollTop, lastScrollTop) {
            const items = this._range(this._listIndex(scrollTop, lastScrollTop));
            return {
                index: items.length ? items[0].index : 0,
                top: items.length ? items[0].top : 0,
                items
            };
        },

        _listItems: function() {
            const screenHeight = this._screenHeight;
            const options = this.options;
            const theValidator = listValidator(options, screenHeight);

            return function(value, force) {
                let result = this.result;
                const lastScrollTop = this._lastScrollTop;

                if (force || !result || !theValidator(result, value, lastScrollTop)) {
                    result = this._getDataItemsCollection(value, lastScrollTop);
                }

                this._lastScrollTop = value;
                this.result = result;

                return result;
            }.bind(this);
        },

        _whenChanged: function(getter, callback) {
            let current;

            return (force) => {
                const theNew = getter(force);

                if (theNew !== current) {
                    current = theNew;
                    callback(theNew, force);
                }
            };
        },

        /**
         * Smart change detection for grouped mode.
         * Only triggers callback when the page content actually changes.
         */
        _whenChangedGrouped: function(getter, callback) {
            let currentPageStart = null;
            let currentGroupKeys = null;

            return (force) => {
                const theNew = getter(force);

                if (!theNew) {return;}

                // Check if page content has changed by comparing:
                // 1. pageStart
                // 2. The set of group globalGroupIndices and their startIndices
                const newPageStart = theNew.pageStart;
                const newGroups = theNew.pageGroups || [];

                // Build a key that represents the current page content
                const newGroupKeys = newGroups.map(g =>
                    `${g.globalGroupIndex}:${g.startIndex}:${g.itemCount}`
                ).join(',');

                const pageChanged = currentPageStart !== newPageStart;
                const groupsChanged = currentGroupKeys !== newGroupKeys;

                if (force || pageChanged || groupsChanged) {
                    currentPageStart = newPageStart;
                    currentGroupKeys = newGroupKeys;
                    callback(theNew, force);
                }
            };
        },

        _reorderList: function(list, reorder) {
            const that = this;
            const length = list.length;
            let currentOffset = -Infinity;
            reorder = map2(reorder, this.templates).bind(this);

            return function(list2, offset, force) {
                const diff = offset - currentOffset;
                let range, range2;

                if (force || Math.abs(diff) >= length) { // full reorder
                    range = list;
                    range2 = list2;
                } else { // partial reorder
                    range = reshift(list, diff);
                    range2 = diff > 0 ? list2.slice(-diff) : list2.slice(0, -diff);
                }

                reorder(range, range2, that.bound());

                currentOffset = offset;
            };
        },

        _bufferSizes: function() {
            const options = this.options;

            return bufferSizes(this._screenHeight, options.listScreens, options.oppositeBuffer);
        },

        _indexConstraint: function(position) {
            const itemCount = this.itemCount;
            const itemHeight = this.options.itemHeight;
            const cssGap = this._cssGap || 0;
            const effectiveItemHeight = itemHeight + cssGap;
            const total = this.dataSource.total();

            return Math.min(Math.max(total - itemCount, 0), Math.max(0, Math.floor(position / effectiveItemHeight)));
        },

        _listIndex: function(scrollTop, lastScrollTop) {
            const buffers = this._bufferSizes();
            const position = scrollTop - ((scrollTop > lastScrollTop) ? buffers.down : buffers.up);

            return this._indexConstraint(position);
        },

        _selectable: function() {
            if (this.options.selectable) {
                this._selectProxy = this._clickHandler.bind(this);
                this.element.on(CLICK + VIRTUAL_LIST_NS, "." + this._getItemClass(), this._selectProxy);
            }
        },

        getElementIndex: function(element) {
            if (!(element instanceof jQuery)) {
                return undefined;
            }

            return parseInt(element.attr("data-offset-index"), 10);
        },

        _getIndecies: function(candidate) {
            let result = [];

            if (typeof candidate === "function") {
                const data = this.dataSource.flatView();
                for (let idx = 0; idx < data.length; idx++) {
                    if (candidate(data[idx])) {
                        result.push(idx);
                        break;
                    }
                }
            }

            if (typeof candidate === "number") {
                result.push(candidate);
            }

            const elementIndex = this.getElementIndex(candidate);
            if (!isNaN(elementIndex)) {
                result.push(elementIndex);
            }

            if (candidate instanceof Array) {
                result = candidate;
            }

            return result;
        },

        _deselect: function(indices) {
            const selectedIndexes = this._selectedIndexes;
            const selectedDataItems = this._selectedDataItems;
            const selectable = this.options.selectable;
            const valueGetter = this._valueGetter;
            const removed = [];
            let position = 0;
            let removedindexesCounter = 0;

            indices = indices.slice();

            if (selectable === true || !indices.length) { //deselect everything
                for (let idx = 0; idx < selectedIndexes.length; idx++) {
                    if (selectedIndexes[idx] !== undefined) {
                        this._getElementByIndex(selectedIndexes[idx]).removeClass(SELECTED);
                    } else if (selectedDataItems[idx]) {
                        this._getElementByDataItem(selectedDataItems[idx]).removeClass(SELECTED);
                    }

                    removed.push({
                        index: selectedIndexes[idx],
                        position: idx,
                        dataItem: selectedDataItems[idx]
                    });
                }

                this._values = [];
                this._selectedDataItems = [];
                this._selectedIndexes = [];
            } else if (selectable === "multiple") {
                let i = 0;
                while (i < indices.length) {
                    let result = null;
                    position = $.inArray(indices[i], selectedIndexes);
                    const dataItem = this.dataItemByIndex(indices[i]);

                    if (position === -1 && dataItem) {
                        for (let j = 0; j < selectedDataItems.length; j++) {
                            const match = isPrimitive(dataItem) ? selectedDataItems[j] === dataItem : valueGetter(selectedDataItems[j]) === valueGetter(dataItem);
                            if (match) {
                                const item = this._getElementByIndex(indices[i]);
                                result = this._deselectSingleItem(item, j, indices[i], removedindexesCounter);
                            }
                        }
                    } else {
                        const selectedIndex = selectedIndexes[position];

                        if (selectedIndex !== undefined) {
                            const item = this._getElementByIndex(selectedIndex);
                            result = this._deselectSingleItem(item, position, selectedIndex, removedindexesCounter);
                        }
                    }

                    if (result) {
                        indices.splice(i, 1);
                        removed.push(result);

                        removedindexesCounter++;
                        i--;
                    }
                    i++;
                }
            }

            return { indices, removed };
        },

        _deselectSingleItem: function(item, position, selectedIndex, removedindexesCounter) {
            if (!item.hasClass(SELECTED)) {
                return;
            }

            item.removeClass(SELECTED);
            this._values.splice(position, 1);
            this._selectedIndexes.splice(position, 1);
            const dataItem = this._selectedDataItems.splice(position, 1)[0];

            return {
                index: selectedIndex,
                position: position + removedindexesCounter,
                dataItem
            };
        },

        _deselectCurrentValues: function(indices) {
            const items = this._items || [];
            const values = this._values;
            const removed = [];

            if (this.options.selectable !== "multiple" || !this.isFiltered()) {
                return [];
            }

            if (indices[0] === -1) {
                $(items).removeClass(SELECTED);
                const removedItems = $.map(this._selectedDataItems.slice(0), (dataItem, idx) => ({
                    dataItem,
                    position: idx
                }));
                this._selectedIndexes = [];
                this._selectedDataItems = [];
                this._values = [];
                return removedItems;
            }

            for (let idx = 0; idx < indices.length; idx++) {
                let position = -1;
                const index = indices[idx];
                let value;
                if (this.dataItemByIndex(index)) {
                    value = this._valueGetter(this.dataItemByIndex(index));
                }

                for (let j = 0; j < values.length; j++) {
                    if (value == values[j]) {
                        position = j;
                        break;
                    }
                }

                if (position > -1) {
                    removed.push(this.removeAt(position));
                    $(items[index]).removeClass(SELECTED);
                }
            }

            return removed;
        },

        _getSkip: function(index, take) {
            const page = index < take ? 1 : Math.floor(index / take) + 1;

            return (page - 1) * take;
        },

        _select: function(indexes) {
            const that = this;
            const singleSelection = this.options.selectable !== "multiple";
            const dataSource = this.dataSource;
            const take = this.itemCount;
            const valueGetter = this._valueGetter;
            const added = [];

            if (singleSelection) {
                that._selectedIndexes = [];
                that._selectedDataItems = [];
                that._values = [];
            }

            const oldSkip = dataSource.skip();

            $.each(indexes, (_, index) => {
                const skip = that._getSkip(index, take);

                that.mute(() => {
                    dataSource.range(skip, take); //switch the range to get the dataItem

                    const dataItem = that._findDataItem(dataSource.view(), [index - skip]);
                    that._selectedIndexes.push(index);
                    that._selectedDataItems.push(dataItem);
                    that._values.push(isPrimitive(dataItem) ? dataItem : valueGetter(dataItem));

                    added.push({ index, dataItem });

                    that._getElementByIndex(index).addClass(SELECTED);

                    dataSource.range(oldSkip, take); //switch back the range
                });
            });

            that._values = that._checkValuesOrder(that._values);

            return added;
        },

        _clickHandler: function(e) {
            const that = this;
            const item = $(e.currentTarget);
            const options = that.options;
            const actionField = options.actionField;

            if (!e.isDefaultPrevented() && item.attr("data-uid")) {
                if (actionField) {
                    const dataItem = that.dataItemByIndex(that.getElementIndex(item));
                    if (dataItem && dataItem[actionField]) {
                        if (!that.trigger("action", {
                            item: item,
                            dataItem: dataItem,
                            action: dataItem[actionField]
                        })) {
                            return;
                        }
                    }
                }

                this.trigger(CLICK, { item });
            }
        },

        _buildValueGetter: function() {
            this._valueGetter = kendo.getter(this.options.dataValueField);
        },

        _calculateGroupPadding: function(height) {
            const firstItem = this.items().first();
            const groupHeader = this.header;
            let padding = 0;

            if (groupHeader[0] && groupHeader[0].style.display !== "none") {
                if (height !== "auto") {
                    padding = kendo.support.scrollbar();
                }

                padding += parseFloat(firstItem.css("border-right-width"), 10) + parseFloat(firstItem.children(".k-group").css("right"), 10);

                groupHeader.css("padding-right", padding);
            }
        },

        _calculateColumnsHeaderPadding: function() {
            if (this._isTableVariant()) {
                const isRtl = kendo.support.isRtl(this.wrapper);
                const scrollbar = kendo.support.scrollbar();
                const columnsHeader = this.content.parent().parent().find(".k-table-header");
                const total = this.dataSource.total();

                columnsHeader.css((isRtl ? "padding-left" : "padding-right"), total ? scrollbar : 0);
            }
        }

    });

    kendo.ui.VirtualList = VirtualList;
    kendo.ui.plugin(VirtualList);

})(window.kendo.jQuery);
export default kendo;