/* jshint eqnull: true */
(function(f, define){
    define([ "./kendo.draganddrop", "./kendo.data", "./kendo.selectable" ], f);
})(function(){

var __meta__ = { // jshint ignore:line
    id: "listbox",
    name: "ListBox",
    category: "web",
    depends: ["draganddrop", "data", "selectable"]
};

(function($, undefined) {
    var kendo = window.kendo;
    var kendoAttr = kendo.attr;
    var data = kendo.data;
    var keys = kendo.keys;
    var kendoTemplate = kendo.template;
    var Widget = kendo.ui.Widget;
    var DataSource = data.DataSource;
    var Selectable = kendo.ui.Selectable;
    var DataBoundWidget = kendo.ui.DataBoundWidget;
    var Class = kendo.Class;

    var extend = $.extend;
    var noop = $.noop;
    var proxy = $.proxy;

    var DASH = "-";
    var DOT = ".";
    var SPACE = " ";
    var HASH = "#";

    var KENDO_LISTBOX = "kendoListBox";
    var NS = DOT + KENDO_LISTBOX;
    var DISABLED_STATE_CLASS = "k-state-disabled";
    var SELECTED_STATE_CLASS = "k-state-selected";
    var ENABLED_ITEM_SELECTOR = ".k-item:not(.k-state-disabled)";
    var ENABLED_ITEMS_SELECTOR = ".k-list:not(.k-state-disabled) >" + ENABLED_ITEM_SELECTOR;
    var TOOLBAR_CLASS = "k-listbox-toolbar";
    var TOOL_SELECTOR = "li > a.k-button:not(.k-state-disabled)";
    var FOCUSED_CLASS = "k-state-focused";
    var DRAG_CLUE_CLASS = "k-drag-clue";
    var DROP_HINT_CLASS = "k-drop-hint";
    var LIST_CLASS = "k-reset k-list";
    var LIST_SELECTOR = ".k-reset.k-list";
    var RESET = "k-reset";

    var CLICK = "click" + NS;
    var KEYDOWN = "keydown" + NS;
    var BLUR = "blur" + NS;
    var outerWidth = kendo._outerWidth;
    var outerHeight = kendo._outerHeight;
    var CHANGE = "change";
    var DATABOUND = "dataBound";
    var ADD = "add";
    var REMOVE = "remove";
    var REORDER = "reorder";
    var MOVE_UP = "moveUp";
    var MOVE_DOWN = "moveDown";
    var TRANSFER_TO = "transferTo";
    var TRANSFER_FROM = "transferFrom";
    var TRANSFER_ALL_TO = "transferAllTo";
    var TRANSFER_ALL_FROM = "transferAllFrom";
    var DRAGGEDCLASS = "k-ghost";
    var UNIQUE_ID = "uid";
    var TABINDEX = "tabindex";
    var COMMAND = "command";

    var MOVE_UP_OFFSET = -1;
    var MOVE_DOWN_OFFSET = 1;
    var DRAGSTART = "dragstart";
    var DRAG = "drag";
    var DROP = "drop";
    var DRAGEND = "dragend";
    var DEFAULT_FILTER = "ul.k-reset.k-list>li.k-item";

    var RIGHT = "right";
    var BOTTOM = "bottom";

    var TOOLBAR_POSITION_CLASS_NAMES = [
        TOOLBAR_CLASS + DASH + "left",
        TOOLBAR_CLASS + DASH + RIGHT,
        TOOLBAR_CLASS + DASH + "top",
        TOOLBAR_CLASS + DASH + BOTTOM
    ];

    function getSortedDomIndices(items) {
        var indices = $.map(items, function(item) {
            return $(item).index();
        });

        return indices;
    }

    function isUndefined(value) {
        return (typeof value === "undefined");
    }

    function defaultHint(element) {
        return element.clone()
            .removeClass(DRAGGEDCLASS)
            .removeClass(FOCUSED_CLASS)
            .addClass(kendo.format("{0} {1} {2}", SELECTED_STATE_CLASS, RESET, DRAG_CLUE_CLASS))
            .width(element.width());
    }

    function defaultPlaceholder() {
        return $('<li>').addClass(DROP_HINT_CLASS);
    }

    var ListBox = DataBoundWidget.extend({
        init: function(element, options) {
            var that = this;
            Widget.fn.init.call(that, element, options);

            that._wrapper();
            that._list();
            element = that.element.attr("multiple", "multiple").hide();

            if (element[0] && !that.options.dataSource) {
                that.options.dataTextField = that.options.dataTextField || "text";
                that.options.dataValueField = that.options.dataValueField || "value";
            }
            that._templates();
            that._selectable();
            that._dataSource();
            that._createToolbar();
            that._createDraggable();
            that._createNavigatable();
        },

        destroy: function() {
            var that = this;

            DataBoundWidget.fn.destroy.call(that);
            if(!isNaN(that._listTabIndex)) {
                that._getList().off();
                that._listTabIndex = null;
            }
            that._unbindDataSource();
            that._destroySelectable();
            that._destroyToolbar();
            that.wrapper.off(NS);
            if(that._target){
                that._target = null;
            }
            if(that._draggable) {
                that._draggable.destroy();
                that.placeholder = null;
            }

            kendo.destroy(that.element);
        },

        setOptions: function(options) {
            Widget.fn.setOptions.call(this, options);
            this._templates();
            this._dataSource();
        },

        events: [
            CHANGE,
            DATABOUND,
            ADD,
            REMOVE,
            REORDER,
            DRAGSTART,
            DRAG,
            DROP,
            DRAGEND
        ],

        options: {
            name: "ListBox",
            autoBind: true,
            template: "",
            dataTextField: "",
            dataValueField: "",
            selectable: "single",
            draggable: null,
            dropSources: [],
            connectWith: "",
            navigatable: true,
            toolbar: {
                position: RIGHT,
                tools: []
            },
            messages: {
                tools: {
                    remove: "Delete",
                    moveUp: "Move Up",
                    moveDown: "Move Down",
                    transferTo: "Transfer To",
                    transferFrom: "Transfer From",
                    transferAllTo: "Transfer All To",
                    transferAllFrom: "Transfer All From"
                }
            }
        },

        add: function(dataItems) {
            var that = this;
            var items = dataItems && dataItems.length ? dataItems : [dataItems];
            var itemsLength = items.length;
            var i;

            that._unbindDataSource();
            for (i = 0; i < itemsLength; i++) {
                that._addItem(items[i]);
            }
            that._bindDataSource();
            that._syncElement();
        },

        _addItem: function (dataItem) {
            var that = this;
            var item = that.templates.itemTemplate({ item: dataItem, r: that.templates.itemContent });

            $(item).attr(kendoAttr(UNIQUE_ID), dataItem.uid).appendTo(that._getList());
            if (typeof dataItem === typeof "") {
                that.dataSource._data.push(dataItem);
            } else {
                that.dataSource.add(dataItem);
            }
        },

        _addItemAt: function(dataItem, index) {
            var that = this;
            var item = that.templates.itemTemplate({ item: dataItem, r: that.templates.itemContent });
            that._unbindDataSource();
            if (typeof dataItem === typeof "") {
                that._insertElementAt(item, index);
                that.dataSource._data.push(dataItem);
            } else {
                that._insertElementAt($(item).attr(kendoAttr(UNIQUE_ID), dataItem.uid), index);
                that.dataSource.add(dataItem);
            }
            that._bindDataSource();
            that._syncElement();
        },

        _insertElementAt: function(item, index) {
            var that = this;
            var list = that._getList();

            if (index > 0) {
                $(item).insertAfter(list.children().eq(index - 1));
            } else {
                $(list).prepend(item);
            }
        },

        _createNavigatable: function() {
            var that = this;
            var options = that.options;

            if(options.navigatable) {
                that._getList().on(CLICK, ENABLED_ITEM_SELECTOR, proxy(that._click, that))
                            .on(KEYDOWN, proxy(that._keyDown, that))
                            .on(BLUR, proxy(that._blur, that));
            }
        },

        _getTabIndex: function() {
            var that = this;
            var tabindex;

            if(!isNaN(that._listTabIndex))
            {
                return that._listTabIndex;
            }

            tabindex = that.element.attr(TABINDEX);
            that._listTabIndex = !isNaN(tabindex) ? tabindex : 0;

            that.element.removeAttr(TABINDEX);

            return that._listTabIndex;
        },

        _blur: function() {
            if(this._target) {
                this._target.removeClass(FOCUSED_CLASS);
                this._getList().removeAttr("aria-activedescendant");
            }
            this._target = null;
        },

        _click: function(e) {
            var that = this;
            var target = $(e.currentTarget);
            var oldTarget = that._target;

            if (oldTarget) {
                oldTarget.removeClass(FOCUSED_CLASS);
            }

            that._target = target;
            target.addClass(FOCUSED_CLASS);
            that._getList().attr("aria-activedescendant", target.attr("id"));

            if (that._getList()[0] !== kendo._activeElement()) {
                that.focus();
            }
        },

        _getNavigatableItem: function(key) {
            var that = this;
            var current;

            if (!that._target) {
                current = that.items().filter(ENABLED_ITEM_SELECTOR).first();
            }  else {
                current = that._target;
            }

            if (key === keys.UP && that._target) {
                current = that._target.prevAll(ENABLED_ITEM_SELECTOR).first();
            }

            if (key === keys.DOWN && that._target) {
                current = that._target.nextAll(ENABLED_ITEM_SELECTOR).first();
            }

            return current.length ? current : null;
        },

        _scrollIntoView: function(item) {
            if (!item) {
                return;
            }

            if (item[0]) {
                item = item[0];
            }

            var list = this._getList().parent()[0];
            var itemOffsetTop = item.offsetTop;
            var contentScrollTop = list.scrollTop;
            var contentOffsetHeight = list.clientHeight;
            var bottomDistance = itemOffsetTop + item.offsetHeight;

            if (contentScrollTop > itemOffsetTop) {
                contentScrollTop = itemOffsetTop;
            } else if (bottomDistance > (contentScrollTop + contentOffsetHeight)) {
                contentScrollTop = (bottomDistance - contentOffsetHeight);
            }

            list.scrollTop = contentScrollTop;
        },

        _keyDown: function(e) {
            var that = this;
            var key = e.keyCode;
            var current = that._getNavigatableItem(key);
            var shouldPreventDefault;

            if(that._target) {
                that._target.removeClass(FOCUSED_CLASS);
            }

            if(!(e.shiftKey && !e.ctrlKey && (key === keys.DOWN || key === keys.UP))) {
                that._shiftSelecting = false;
            }

            if(key == keys.DELETE) {
                that._executeCommand(REMOVE);
                if(that._target) {
                    that._target.removeClass(FOCUSED_CLASS);
                    that._getList().removeAttr("aria-activedescendant");
                    that._target = null;
                }
                shouldPreventDefault = true;
            } else if(key === keys.DOWN || key === keys.UP) {
                if(!current) {
                    e.preventDefault();
                    return;
                }
                if (e.shiftKey && !e.ctrlKey) {
                    if (!that._shiftSelecting) {
                        that.clearSelection();
                        that._shiftSelecting = true;
                    }
                    if (that._target && current.hasClass("k-state-selected")) {
                        that._target.removeClass(SELECTED_STATE_CLASS);
                        that.trigger(CHANGE);
                    } else if(that.options.selectable == "single") {
                       that.select(current);
                    } else {
                       that.select(current.add(that._target));
                    }
                } else if (e.shiftKey && e.ctrlKey) {
                    that._executeCommand(key === keys.DOWN ? MOVE_DOWN : MOVE_UP);
                    that._scrollIntoView(that._target);
                    e.preventDefault();
                    return;
                } else if (!e.shiftKey && !e.ctrlKey) {
                    if(that.options.selectable === "multiple"){
                        that.clearSelection();
                    }
                    that.select(current);
                }

                that._target = current;
                if(that._target) {
                    that._target.addClass(FOCUSED_CLASS);
                    that._scrollIntoView(that._target);
                    that._getList().attr("aria-activedescendant", that._target.attr("id"));
                } else {
                    that._getList().removeAttr("aria-activedescendant");
                }
                shouldPreventDefault = true;
            } else if(key == keys.SPACEBAR) {
                if(e.ctrlKey && that._target) {
                   if(that._target.hasClass(SELECTED_STATE_CLASS)) {
                       that._target.removeClass(SELECTED_STATE_CLASS);
                       that.trigger(CHANGE);
                   } else {
                       that.select(that._target);
                   }
                } else {
                   that.clearSelection();
                   that.select(that._target);
                }
                shouldPreventDefault = true;
            } else if(e.ctrlKey && key == keys.RIGHT) {
                if(e.shiftKey) {
                   that._executeCommand(TRANSFER_ALL_TO);
                } else {
                   that._executeCommand(TRANSFER_TO);
                }
                that._target = that.select().length ? that.select(): null;
                shouldPreventDefault = true;
            } else if(e.ctrlKey && key == keys.LEFT) {
                if(e.shiftKey) {
                   that._executeCommand(TRANSFER_ALL_FROM);
                } else {
                   that._executeCommand(TRANSFER_FROM);
                }
                shouldPreventDefault = true;
            }

            if(shouldPreventDefault) {
                e.preventDefault();
            }
        },

        focus: function() {
            kendo.focusElement(this._getList());
        },

        _createDraggable: function() {
            var that = this;
            var draggable = that.options.draggable;
            var hint;

            if(draggable) {
                hint = draggable.hint;
                if(!that.options.selectable) {
                    throw new Error("Dragging requires selection to be enabled");
                }

                if(!hint) {
                    hint = defaultHint;
                }

                that._draggable = new kendo.ui.Draggable(that.wrapper, {
                    filter: draggable.filter ? draggable.filter : DEFAULT_FILTER,
                    hint: kendo.isFunction(hint) ? hint : $(hint),
                    dragstart: proxy(that._dragstart, that),
                    dragcancel: proxy(that._clear, that),
                    drag: proxy(that._drag, that),
                    dragend: proxy(that._dragend, that)
                });
            }
        },

        _dragstart: function(e) {
            var that = this;
            var draggedElement = that.draggedElement = e.currentTarget;
            var placeholder = that.options.draggable.placeholder;
            var dataItem = that.dataItem(draggedElement);
            var eventData = { dataItems: dataItem, items: $(draggedElement), draggableEvent: e };

            if(that.options.draggable.enabled === false) {
                e.preventDefault();
                return;
            }

            if(!placeholder) {
                placeholder = defaultPlaceholder;
            }

            that.placeholder = kendo.isFunction(placeholder) ? $(placeholder.call(that, draggedElement)) : $(placeholder);

            if(draggedElement.is(DOT + DISABLED_STATE_CLASS)) {
                e.preventDefault();
            } else {
                if(that.trigger(DRAGSTART, eventData)) {
                    e.preventDefault();
                } else {
                    that.clearSelection();
                    that.select(draggedElement);
                    draggedElement.addClass(DRAGGEDCLASS);
                }
            }
        },

        _clear: function() {
            this.draggedElement.removeClass(DRAGGEDCLASS);
            this.placeholder.remove();
        },

        _findElementUnderCursor: function(e) {
            var elementUnderCursor = kendo.elementUnderCursor(e);
            var draggable = e.sender;

            if($.contains(draggable.hint[0], elementUnderCursor) || draggable.hint[0] === elementUnderCursor) {
                draggable.hint.hide();
                elementUnderCursor = kendo.elementUnderCursor(e);
                draggable.hint.show();
            }

            return elementUnderCursor;
        },

        _findTarget: function(e) {
            var that = this;
            var element = that._findElementUnderCursor(e);
            var elementNode = $(element);
            var list = that._getList();
            var items;
            var node;

            if($.contains(list[0], element)) {
                items = that.items();
                element = elementNode.is("li") ? element: elementNode.closest("li")[0];
                node = items.filter(element)[0] || items.has(element)[0];
                if(node) {
                    node = $(node);
                    return !node.hasClass(DISABLED_STATE_CLASS) ? { element: node, listBox: that } : null;
                } else {
                    return null;
                }
            } else if (list[0] == element || list.parent()[0] == element) {
                return { element: $(list), appendToBottom: true, listBox: that };
            } else {
                return that._searchConnectedListBox(elementNode);
            }
        },

        _getElementCenter: function(element) {
            var center = element.length ? kendo.getOffset(element) : null;
            if(center) {
                center.top += outerHeight(element) / 2;
                center.left += outerWidth(element) / 2;
            }

            return center;
        },

        _searchConnectedListBox: function(element) {
            var connectedListBox;
            var items;
            var node;
            var originalElement = element;
            var closestContainer;

            if(element.hasClass("k-list-scroller k-selectable")) {
                closestContainer = element;
            } else {
                closestContainer = element.closest(".k-list-scroller.k-selectable");
            }

            if(closestContainer.length) {
                connectedListBox = closestContainer.parent().find("[data-role='listbox']").getKendoListBox();
            } else {
                return null;
            }

            if(connectedListBox && $.inArray(this.element[0].id, connectedListBox.options.dropSources) !== -1) {
                items = connectedListBox.items();
                element = element.is("li") ? element[0] : element.closest("li")[0];
                node = items.filter(element)[0] || items.has(element)[0];
                if(node) {
                    node = $(node);
                    return !node.hasClass(DISABLED_STATE_CLASS) ? { element: node, listBox: connectedListBox } : null;
                } else if(!items.length ||
                            originalElement.hasClass("k-list-scroller k-selectable") ||
                            originalElement.hasClass("k-reset k-list")) {
                    return { element: connectedListBox._getList(), listBox: connectedListBox, appendToBottom: true };
                } else {
                    return null;
                }
            }
            return null;
        },

        _drag: function(e) {
            var that = this;
            var draggedElement = that.draggedElement;
            var target = that._findTarget(e);
            var cursorOffset = { left: e.x.location, top: e.y.location };
            var dataItem = that.dataItem(draggedElement);
            var eventData = { dataItems: [dataItem], items: $(draggedElement), draggableEvent: e };
            var targetCenter;
            var offsetDelta;
            var direction;

            if(that.trigger(DRAG, eventData)) {
                e.preventDefault();
                return;
            }

            if(target) {
                targetCenter = this._getElementCenter(target.element);

                offsetDelta = {
                    left: Math.round(cursorOffset.left - targetCenter.left),
                    top: Math.round(cursorOffset.top - targetCenter.top)
                };

                if(target.appendToBottom) {
                    that._movePlaceholder(target, null , draggedElement);
                    return;
                }

                if(offsetDelta.top < 0) {
                    direction = "prev";
                } else if(offsetDelta.top > 0) {
                    direction = "next";
                }

                if(direction) {
                    if(target.element[0] != that.placeholder[0]) {
                        that._movePlaceholder(target, direction, draggedElement);
                    }
                }
             }
             else if(that.placeholder.parent().length){
                that.placeholder.remove();
             }
        },

        _movePlaceholder: function(target, direction, draggedElement) {
            var that = this;
            var placeholder = that.placeholder;
            var draggableOptions = target.listBox.options.draggable;

            if(placeholder.parent().length) {
                that.placeholder.remove();
                if(draggableOptions && draggableOptions.placeholder){
                    that.placeholder = kendo.isFunction(draggableOptions.placeholder) ? $(draggableOptions.placeholder.call(that, draggedElement)) : $(draggableOptions.placeholder);
                } else {
                    that.placeholder = $(defaultPlaceholder.call(that, draggedElement));
                }
            }

            if (!direction) {
                target.element.append(that.placeholder);
            } else if (direction === "prev") {
                target.element.before(that.placeholder);
            } else if (direction === "next") {
                target.element.after(that.placeholder);
            }
        },

        _dragend: function(e) {
            var that = this;
            var draggedItem = that.draggedElement;
            var items = that.items();
            var placeholderIndex = items.not(that.draggedElement).index(that.placeholder);
            var draggedIndex = items.not(that.placeholder).index(that.draggedElement);
            var dataItem = that.dataItem(draggedItem);
            var eventData = { dataItems: [dataItem], items: $(draggedItem) };
            var connectedListBox = that.placeholder.closest(".k-widget.k-listbox").find("[data-role='listbox']").getKendoListBox();

            if(that.trigger(DROP, extend({}, eventData, { draggableEvent: e }))) {
                e.preventDefault();
                this._clear();
                return;
            }

            if(placeholderIndex >= 0) {
                if(placeholderIndex !== draggedIndex && !that.trigger(REORDER, extend({}, eventData, { offset: placeholderIndex - draggedIndex }))) {
                    draggedItem.removeClass(DRAGGEDCLASS);
                    that.reorder(draggedItem, placeholderIndex);
                }
            } else if(connectedListBox) {
                if(!that.trigger(REMOVE, eventData)) {
                    that.remove($(draggedItem));
                }

                if(!connectedListBox.trigger(ADD, eventData)) {
                    connectedListBox._addItemAt(dataItem, connectedListBox.items().index(that.placeholder));
                }
            }

            that._clear();
            that._draggable.dropped = true;

            that.trigger(DRAGEND, extend({}, eventData, { draggableEvent: e }));

            that._updateToolbar();
            that._updateAllToolbars();
        },

        reorder: function(item, index) {
            var that = this;
            var dataSource = that.dataSource;
            var dataItem = that.dataItem(item);
            var dataItemAtIndex = dataSource.at(index);
            var itemAtIndex = that.items()[index];
            var listItem = $(item);

            if (dataItem && itemAtIndex && dataItemAtIndex) {
                that._removeElement(listItem);
                that._insertElementAt(listItem, index);
                that._updateToolbar();
            }
        },

        remove: function (items) {
            var that = this;
            var listItems = that._getItems(items);
            var itemsLength = listItems.length;
            var i;

            that._unbindDataSource();
            for (i = 0; i < itemsLength; i++) {
                that._removeItem($(listItems[i]));
            }
            that._bindDataSource();
            that._syncElement();
            that._updateToolbar();
            that._updateAllToolbars();
        },

        _removeItem: function (item) {
            var that = this;
            var dataSource = that.dataSource;
            var dataItem = that.dataItem(item);
            if (!dataItem || !dataSource) {
                return;
            }
            if (typeof dataItem === typeof "") {
                var data = dataSource._data;
                for (var i = 0; i < data.length; i++) {
                    if (dataItem === data[i]) {
                        data[i] = data[data.length - 1];
                        data.pop();
                        break;
                    }
                }
            } else {
                dataSource.remove(dataItem);
            }
            that._removeElement(item);
        },

        _removeElement: function(item) {
            kendo.destroy(item);
            $(item).off().remove();
        },

        dataItem: function (element) {
            var uniqueIdAttr = kendoAttr(UNIQUE_ID);
            var uid = $(element).attr(uniqueIdAttr) || $(element).closest("[" + uniqueIdAttr + "]").attr(uniqueIdAttr);
            if (uid) {
                return this.dataSource.getByUid(uid);
            }
            else {
                return $(element).html();
            }
        },

        _dataItems: function (items) {
            var dataItems = [];
            var listItems = $(items);
            var itemsLength = listItems.length;
            var i;

            for (i = 0; i < itemsLength; i++) {
                dataItems.push(this.dataItem(listItems.eq(i)));
            }

            return dataItems;
        },

        items: function() {
            var list = this._getList();
            return list.children();
        },

        select: function(items) {
            var that = this;
            var selectable = that.selectable;
            var enabledItems;

            if (isUndefined(items)) {
                return selectable.value();
            }

            enabledItems = that.items().filter(items).filter(ENABLED_ITEMS_SELECTOR);

            if (!selectable.options.multiple) {
                selectable.clear();
                enabledItems = enabledItems.first();
            }

            return selectable.value(enabledItems);
        },

        clearSelection: function() {
            var that = this;
            var selectable = that.selectable;

            if (selectable) {
                selectable.clear();
            }
        },

        enable: function(items, enable) {
            var that = this;
            var enabled = isUndefined(enable) ? true : !!enable;
            var listItems = that._getItems(items);
            var itemsLength = listItems.length;
            var i;

            for (i = 0; i < itemsLength; i++) {
                that._enableItem($(listItems[i]), enabled);
            }

            that._updateAllToolbars();
        },

        _enableItem: function(item, enable) {
            var that = this;
            var dataItem = that.dataItem(item);

            if (dataItem) {
                if (enable) {
                    $(item).removeClass(DISABLED_STATE_CLASS);
                } else {
                    $(item)
                        .addClass(DISABLED_STATE_CLASS)
                        .removeClass(SELECTED_STATE_CLASS);
                }
            }
        },

        setDataSource: function(dataSource) {
            var that = this;

            that.options.dataSource = dataSource;

            that._dataSource();
        },

        _dataSource: function() {
            var that = this;
            var options = that.options;
            var dataSource = options.dataSource || {};

            dataSource = $.isArray(dataSource) ? { data: dataSource } : dataSource;
            dataSource.select = that.element;
            dataSource.fields = [
                { field: options.dataTextField },
                { field: options.dataValueField }];

            that._unbindDataSource();
            that.dataSource = DataSource.create(dataSource);
            that._bindDataSource();

            if (that.options.autoBind) {
                that.dataSource.fetch();
            }
        },

        _bindDataSource: function() {
            var that = this;
            var dataSource = that.dataSource;

            that._dataChangeHandler = proxy(that.refresh, that);

            if (dataSource) {
                dataSource.bind(CHANGE, that._dataChangeHandler);
            }
        },

        _unbindDataSource: function() {
            var that = this;
            var dataSource = that.dataSource;

            if (dataSource) {
                dataSource.unbind(CHANGE, that._dataChangeHandler);
            }
        },

        _wrapper: function () {
            var that = this,
                element = that.element,
                wrapper = element.parent("div.k-listbox");

            if (!wrapper[0]) {
                wrapper = element.wrap('<div class="k-widget k-listbox" deselectable="on" />').parent();
                wrapper[0].style.cssText = element[0].style.cssText;
                wrapper[0].title = element[0].title;
                $('<div class="k-list-scroller" />').insertBefore(element);
            }

            that.wrapper = wrapper.addClass(element[0].className).css("display", "");
            that._innerWrapper = $(wrapper[0].firstChild);
        },

        _list: function () {
            var that = this;
            $("<ul class='" + LIST_CLASS + "' role='listbox'></ul>").appendTo(that._innerWrapper);
            if(that.options.navigatable) {
                that._getList().attr(TABINDEX, that._getTabIndex());
            }
        },

        _templates: function () {
            var that = this;
            var options = this.options;
            var template;

            if (options.template && typeof options.template == "string") {
                template = kendo.template(options.template);
            } else if (!options.template) {
                template = kendo.template('${' + kendo.expr(options.dataTextField, "data") + "}", { useWithBlock: false });
            } else {
                template = options.template;
            }

            that.templates = {
                itemTemplate: kendo.template("# var item = data.item, r = data.r; # <li class='k-item' role='option' aria-selected='false'>#=r(item)#</li>", { useWithBlock: false }),
                itemContent: template,
                toolbar: "<div class='" + TOOLBAR_CLASS + "'></div>"
            };
        },

        refresh: function() {
            var that = this;
            var view = that.dataSource.view();
            var template = that.templates.itemTemplate;
            var html = "";

            for (var idx = 0; idx < view.length; idx++) {
                html += template({ item: view[idx], r: that.templates.itemContent });
            }
            that._getList().html(html);
            that._setItemIds();
            that._createToolbar();
            that._syncElement();
            that._updateToolbar();
            that._updateAllToolbars();
            that.trigger(DATABOUND);
        },

        _syncElement: function () {
            var options = "";
            var view = this.dataSource.view();
            for (var idx = 0; idx < view.length; idx++) {
                options += this._option(view[idx][this.options.dataValueField] || view[idx], view[idx][this.options.dataTextField] || view[idx], true);
            }
            this.element.html(options);
        },

        _option: function (dataValue, dataText) {
            var option = "<option";

            if (dataValue !== undefined) {
                dataValue += "";

                if (dataValue.indexOf('"') !== -1) {
                    dataValue = dataValue.replace(/"/g, "&quot;");
                }

                option += ' value="' + dataValue + '"';
            }
            option += " selected>";

            if (dataText !== undefined) {
                option += kendo.htmlEncode(dataText);
            }

            return option += "</option>";
        },

        _setItemIds: function() {
            var that = this;
            var items = that.items();
            var view = that.dataSource.view();
            var viewLength = view.length;
            var i;

            for (i = 0; i < viewLength; i++) {
                items.eq(i).attr(kendoAttr(UNIQUE_ID), view[i].uid).attr("id", view[i].uid);
            }
        },

        _selectable: function() {
            var that = this;
            var selectable = that.options.selectable;
            var selectableOptions = Selectable.parseOptions(selectable);

            if (selectableOptions.multiple) {
                that.element.attr("aria-multiselectable", "true");
            }

            that.selectable = new Selectable(that._innerWrapper, {
                aria: true,
                multiple: selectableOptions.multiple,
                filter: ENABLED_ITEM_SELECTOR,
                change: proxy(that._onSelect, that)
            });
        },

        _onSelect: function() {
            var that = this;

            that._updateToolbar();
            that._updateAllToolbars();
            that.trigger(CHANGE);
        },

        _destroySelectable: function() {
            var that = this;

            if (that.selectable && that.selectable.element) {
                that.selectable.destroy();
                that.selectable = null;
            }
        },

        _getList: function() {
            return this.wrapper.find(LIST_SELECTOR);
        },

        _getItems: function(items) {
            return this.items().filter(items);
        },

        _createToolbar: function () {
            var that = this;
            var toolbarOptions = that.options.toolbar;
            var position = toolbarOptions.position || RIGHT;
            var toolbarInsertion = position === BOTTOM ? "insertAfter" : "insertBefore";
            var tools = toolbarOptions.tools || [];
            var messages = that.options.messages;

            that._destroyToolbar();
            that.wrapper.removeClass(TOOLBAR_POSITION_CLASS_NAMES.join(SPACE));

            if (tools.length && tools.length > 0) {
                var toolbarElement = $(that.templates.toolbar)[toolbarInsertion](that._innerWrapper);
                that.toolbar = new ToolBar(toolbarElement, extend({}, toolbarOptions, { listBox: that, messages: messages }));
                that.wrapper.addClass(TOOLBAR_CLASS + DASH + position);
            }
        },

        _destroyToolbar: function() {
            var that = this;

            if (that.toolbar) {
                that.toolbar.destroy();
                that.toolbar = null;
            }
        },

        _executeCommand: function(commandName) {
            var that = this;
            var command = CommandFactory.current.create(commandName, { listBox: that });

            if (command) {
                command.execute();
                that._updateToolbar();
                that._updateAllToolbars();
            }
        },

        _updateToolbar: function() {
            var toolbar = this.toolbar;

            if (toolbar) {
                toolbar._updateToolStates();
            }
        },

        _updateAllToolbars: function() {
            var listBoxElements = $("select[data-role='listbox']");
            var elementsLength = listBoxElements.length;
            var listBox;
            var i;

            for (i = 0; i < elementsLength; i++) {
                listBox = $(listBoxElements[i]).data(KENDO_LISTBOX);

                if (listBox) {
                    listBox._updateToolbar();
                }
            }
        }
    });

    kendo.ui.plugin(ListBox);

    var CommandFactory = Class.extend({
        init: function() {
            this._commands = [];
        },

        register: function(commandName, commandType) {
            this._commands.push({
                commandName: commandName,
                commandType: commandType
            });
        },

        create: function(commandName, options) {
            var commands = this._commands;
            var itemsLength = commands.length;
            var name = commandName ? commandName.toLowerCase() : "";
            var match;
            var command;
            var i;

            for (i = 0; i < itemsLength; i++) {
                command = commands[i];

                if (command.commandName.toLowerCase() === name) {
                    match = command;
                    break;
                }
            }

            if (match) {
                return new match.commandType(options);
            }
        }
    });
    CommandFactory.current = new CommandFactory();

    var ListBoxCommand = Class.extend({
        init: function(options) {
            var that = this;

            that.options = extend({}, that.options, options);
            that.listBox = that.options.listBox;
        },

        options: {
            listBox: null
        },

        getItems: function() {
            return $(this.listBox.select());
        },

        execute: noop,
        canExecute: noop
    });

    var RemoveItemsCommand = ListBoxCommand.extend({
        execute: function() {
            var that = this;
            var listBox = that.listBox;
            var items = that.getItems();

            if (!listBox.trigger(REMOVE, { dataItems: listBox._dataItems(items), items: items })) {
                listBox.remove(items);
            }
        },

        canExecute: function() {
            return this.listBox.select().length > 0;
        }
    });
    CommandFactory.current.register(REMOVE, RemoveItemsCommand);

    var MoveItemsCommand = ListBoxCommand.extend({
        execute: function() {
            var that = this;

            if (that.canExecute()) {
                that.moveItems();
            }
        },

        canExecute: noop,

        moveItems: function() {
            var that = this;
            var listBox = that.listBox;
            var options = that.options;
            var items = that.getItems();
            var offset = options.offset;
            var indecesInDom = getSortedDomIndices(items);
            var movedItems = $.makeArray(items.sort(that.itemComparer));
            var moveAction = options.moveAction;
            var movedItem;

            if (!listBox.trigger(REORDER, { dataItems: listBox._dataItems(movedItems), items: $(movedItems), offset: offset })) {
                while (movedItems.length > 0 && indecesInDom.length > 0) {
                    movedItem = movedItems[moveAction]();

                    listBox.reorder(movedItem, indecesInDom[moveAction]() + offset);
                }
            }
        },

        options: {
            offset: 0,
            moveAction: "pop"
        },

        itemComparer: function(item1, item2) {
            var indexItem1 = $(item1).index();
            var indexItem2 = $(item2).index();

            if (indexItem1 === indexItem2) {
                return 0;
            } else {
                return (indexItem1 > indexItem2 ? 1 : (-1));
            }
        }
    });

    var MoveUpItemsCommand = MoveItemsCommand.extend({
        options: {
            offset: MOVE_UP_OFFSET,
            moveAction: "shift"
        },

        canExecute: function() {
            var items = this.getItems();
            var domIndices = getSortedDomIndices(items);

            return (domIndices.length > 0 && domIndices[0] > 0);
        }
    });
    CommandFactory.current.register(MOVE_UP, MoveUpItemsCommand);

    var MoveDownItemsCommand = MoveItemsCommand.extend({
        options: {
            offset: MOVE_DOWN_OFFSET,
            moveAction: "pop"
        },

        canExecute: function() {
            var that = this;
            var items = that.getItems();
            var domIndices = getSortedDomIndices(items);

            return (domIndices.length > 0 && $(domIndices).last()[0] < (that.listBox.items().length - 1));
        }
    });
    CommandFactory.current.register(MOVE_DOWN, MoveDownItemsCommand);

    var TransferItemsCommand = ListBoxCommand.extend({
        options: {
            filter: ENABLED_ITEM_SELECTOR
        },

        execute: function() {
            var that = this;
            var sourceListBox = that.getSourceListBox();
            var items = that.getItems().filter(that.options.filter);
            var dataItems = sourceListBox ? sourceListBox._dataItems(items) : [];
            var destinationListBox = that.getDestinationListBox();
            var updatedSelection = that.getUpdatedSelection(items);

            if (destinationListBox && items.length > 0) {
                if (!destinationListBox.trigger(ADD, { dataItems: dataItems, items: items })) {
                    destinationListBox.add(dataItems);
                }

                if (!sourceListBox.trigger(REMOVE, { dataItems: dataItems, items: items })) {
                    sourceListBox.remove(items);
                    that.updateSelection(updatedSelection);
                }
            }
        },

        getUpdatedSelection: function(items) {
            var that = this;
            var itemFilter = that.options.filter;
            var sourceListBox = that.getSourceListBox();
            var lastEnabledItem = sourceListBox ? sourceListBox.items().filter(itemFilter).last() : null;
            var containsLastItem = $(items).filter(lastEnabledItem).length > 0;
            var itemToSelect = containsLastItem ? $(items).prevAll(itemFilter)[0] : $(items).nextAll(itemFilter)[0];

            if ($(items).length === 1 && itemToSelect) {
                return itemToSelect;
            } else {
                return null;
            }
        },

        updateSelection: function(item) {
            var sourceListBox = this.getSourceListBox();

            if (sourceListBox && item) {
                $(sourceListBox.select($(item)));
                sourceListBox._scrollIntoView(item);
            }
        },

        getSourceListBox: noop,
        getDestinationListBox: noop
    });

    var TransferItemsToCommand = TransferItemsCommand.extend({
        canExecute: function() {
            var sourceListBox = this.getSourceListBox();

            return (sourceListBox ? sourceListBox.select().length > 0 : false);
        },

        getSourceListBox: function() {
            return this.listBox;
        },

        getDestinationListBox: function() {
            var sourceListBox = this.getSourceListBox();
            return sourceListBox && sourceListBox.options.connectWith ? $(HASH + sourceListBox.options.connectWith).data(KENDO_LISTBOX) : null;
        },

        getItems: function() {
            var sourceListBox = this.getSourceListBox();
            return sourceListBox ? $(sourceListBox.select()) : $();
        }
    });
    CommandFactory.current.register(TRANSFER_TO, TransferItemsToCommand);

    var TransferItemsFromCommand = TransferItemsCommand.extend({
        canExecute: function() {
            var sourceListBox = this.getSourceListBox();

            return (sourceListBox ? sourceListBox.select().length > 0 : false);
        },

        getSourceListBox: function() {
            var destinationListBox = this.getDestinationListBox();
            return (destinationListBox && destinationListBox.options.connectWith) ? $(HASH + destinationListBox.options.connectWith).data(KENDO_LISTBOX) : null;
        },

        getDestinationListBox: function() {
            return this.listBox;
        },

        getItems: function() {
            var sourceListBox = this.getSourceListBox();
            return sourceListBox ? $(sourceListBox.select()) : $();
        }
    });
    CommandFactory.current.register(TRANSFER_FROM, TransferItemsFromCommand);

    var TransferAllItemsToCommand = TransferItemsToCommand.extend({
        canExecute: function() {
            var sourceListBox = this.getSourceListBox();

            return (sourceListBox ? sourceListBox.items().filter(ENABLED_ITEM_SELECTOR).length > 0 : false);
        },

        getItems: function() {
            var sourceListBox = this.getSourceListBox();
            return sourceListBox ? sourceListBox.items() : $();
        },

        getUpdatedSelection: noop,
        updateSelection: noop
    });
    CommandFactory.current.register(TRANSFER_ALL_TO, TransferAllItemsToCommand);

    var TransferAllItemsFromCommand = TransferItemsFromCommand.extend({
        canExecute: function() {
            var sourceListBox = this.getSourceListBox();

            return (sourceListBox ? sourceListBox.items().filter(ENABLED_ITEM_SELECTOR).length > 0 : false);
        },

        getItems: function() {
            var sourceListBox = this.getSourceListBox();
            return sourceListBox ? sourceListBox.items() : $();
        },

        getUpdatedSelection: noop,
        updateSelection: noop
    });
    CommandFactory.current.register(TRANSFER_ALL_FROM, TransferAllItemsFromCommand);

    var ToolBar = Class.extend({
        init: function(element, options) {
            var that = this;

            that.element = $(element).addClass(TOOLBAR_CLASS);
            that.options = extend({}, that.options, options);
            that.listBox = that.options.listBox;

            that._initTemplates();
            that._createTools();
            that._updateToolStates();
            that._attachEventHandlers();
        },

        destroy: function() {
            var that = this;

            that._detachEventHandlers();
            kendo.destroy(that.element);
            that.element.remove();
            that.element = null;
        },

        options: {
            position: RIGHT,
            tools: []
        },

        _initTemplates: function() {
            this.templates = {
                tool: kendoTemplate(
                    "<li>" +
                        "<a href='\\\\#' class='k-button k-button-icon' data-command='#= command #' title='#= text #' aria-label='#= text #' role='button'>" +
                            "<span class='k-icon #= iconClass #'></span>" +
                        "</a>" +
                    "</li>")
            };
        },

        _createTools: function() {
            var that = this;
            var tools = that.options.tools;
            var toolsLength = tools.length;
            var toolsMessages = that.options.messages.tools;
            var toolList = that._createToolList();
            var tool;
            var i;

            for (i = 0; i < toolsLength; i++) {
                tool = extend({}, ToolBar.defaultTools[tools[i]], { text: toolsMessages[tools[i]] });

                if (tool) {
                    toolList.append($(that.templates.tool(tool)));
                }
            }

            that.element.append(toolList);
        },

        _createToolList: function() {
            return $("<ul class='k-reset' />");
        },

        _attachEventHandlers: function() {
            var that = this;

            that.element.on(CLICK, TOOL_SELECTOR, proxy(that._onToolClick, that));
        },

        _detachEventHandlers: function() {
            this.element.off(NS).find("*").off(NS);
        },

        _onToolClick: function(e) {
            e.preventDefault();

            this._executeToolCommand($(e.currentTarget).data(COMMAND));
        },

        _executeToolCommand: function(command) {
            var that = this;
            var listBox = that.listBox;

            if (listBox) {
                listBox._executeCommand(command);
            }
        },

        _updateToolStates: function() {
            var that = this;
            var tools = that.options.tools;
            var toolsLength = tools.length;
            var i;

            for (i = 0; i < toolsLength; i++) {
                that._updateToolState(tools[i]);
            }
        },

        _updateToolState: function(toolName) {
            var that = this;
            var command = CommandFactory.current.create(toolName, { listBox: that.listBox });
            var toolElement = that.element.find("[data-command='" + toolName + "']")[0];

            if (toolElement && command && command.canExecute) {
                if (command.canExecute()) {
                    $(toolElement).removeClass(DISABLED_STATE_CLASS).removeAttr(TABINDEX);
                } else {
                    $(toolElement).addClass(DISABLED_STATE_CLASS).attr(TABINDEX, "-1");
                }
            }
        }
    });

    ToolBar.defaultTools = {
        remove: {
            command: REMOVE,
            iconClass: "k-i-x"
        },
        moveUp: {
            command: MOVE_UP,
            iconClass: "k-i-arrow-60-up"
        },
        moveDown: {
            command: MOVE_DOWN,
            iconClass: "k-i-arrow-60-down"
        },
        transferTo: {
            command: TRANSFER_TO,
            iconClass: "k-i-arrow-60-right"
        },
        transferFrom: {
            command: TRANSFER_FROM,
            iconClass: "k-i-arrow-60-left"
        },
        transferAllTo: {
            command: TRANSFER_ALL_TO,
            iconClass: "k-i-arrow-double-60-right"
        },
        transferAllFrom: {
            command: TRANSFER_ALL_FROM,
            iconClass: "k-i-arrow-double-60-left"
        }
    };

    extend(ListBox, {
        ToolBar: ToolBar
    });

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
