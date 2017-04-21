/* jshint eqnull: true */
(function (f, define) {
    define(["./kendo.draganddrop", "./kendo.data", "./kendo.selectable"], f);
})(function () {

    var __meta__ = { // jshint ignore:line
        id: "listbox",
        name: "ListBox",
        category: "web",
        depends: ["draganddrop", "data", "selectable"]
    };

(function ($, undefined) {
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
        var indices = $.map(items, function (item) {
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
            .addClass(kendo.format("{0} {1} {2}", SELECTED_STATE_CLASS, RESET, DRAG_CLUE_CLASS))
            .width(element.width());
    }

    function defaultPlaceholder() {
        return $('<li>').addClass(DROP_HINT_CLASS);
    }

    var ListBox = DataBoundWidget.extend({
        init: function (element, options) {
            Widget.fn.init.call(this, element, options);

            this._wrapper();
            this._list();
            element = this.element.attr("multiple", "multiple").hide();

            if (element[0] && !this.options.dataSource) {
                this.options.dataTextField = this.options.dataTextField || "text";
                this.options.dataValueField = this.options.dataValueField || "value";
            }
            this._templates();
            this._selectable();
            this._dataSource();
            this._createToolbar();
            this._createDraggable();
            this._createNavigatable();
        },

        destroy: function () {
            DataBoundWidget.fn.destroy.call(this);
            if (!isNaN(this._listTabIndex)) {
                this._getList().off();
                this._listTabIndex = null;
            }
            this._unbindDataSource();
            this._destroySelectable();
            this._destroyToolbar();
            this.wrapper.off(NS);
            if (this._target) {
                this._target = null;
            }
            if (this._draggable) {
                this._draggable.destroy();
                this.placeholder = null;
            }
            kendo.destroy(this.element);
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
            navigatable: false,
            toolbar: {
                position: RIGHT,
                tools: []
            },
            messages: {
                tools: {
                    remove: "Delete",
                    moveUp: "Move Up",
                    moveDown: "Move Down",
                    transferTo: "To Right",
                    transferFrom: "To Left",
                    transferAllTo: "All to Right",
                    transferAllFrom: "All to Left"
                }
            }
        },

        add: function (dataItems) {
            var items = dataItems && dataItems.length ? dataItems : [dataItems];
            var itemsLength = items.length;
            var i;

            this._unbindDataSource();
            for (i = 0; i < itemsLength; i++) {
                this._addItem(items[i]);
            }
            this._bindDataSource();
            this._syncElement();
        },

        _addItem: function (dataItem) {
            var item = this.templates.itemTemplate({ item: dataItem, r: this.templates.itemContent });

            $(item).attr(kendoAttr(UNIQUE_ID), dataItem.uid).appendTo(this._getList());
            if (typeof dataItem === typeof "") {
                this.dataSource._data.push(dataItem);
            } else {
                this.dataSource.add(dataItem);
            }
        },

        _addItemAt: function (dataItem, index) {
            var item = this.templates.itemTemplate({ item: dataItem, r: this.templates.itemContent });
            this._unbindDataSource();
            if (typeof dataItem === typeof "") {
                this._insertElementAt(item, index);
                this.dataSource._data.push(dataItem);
            } else {
                this._insertElementAt($(item).attr(kendoAttr(UNIQUE_ID), dataItem.uid), index);
                this.dataSource.add(dataItem);
            }
            this._bindDataSource();
            this._syncElement();
        },

        _insertElementAt: function (item, index) {
            var list = this._getList();

            if (index > 0) {
                $(item).insertAfter(list.children().eq(index - 1));
            } else {
                $(list).prepend(item);
            }
        },

        _createNavigatable: function () {
            var options = this.options;

            if (options.navigatable) {
                if (!this.options.selectable) {
                    throw new Error("Keyboard navigation requires selection to be enabled");
                }
                this._getList().on(CLICK, ENABLED_ITEM_SELECTOR, proxy(this._click, this))
                    .on(KEYDOWN, proxy(this._keyDown, this))
                    .on(BLUR, proxy(this._blur, this));
            }
        },

        _getTabIndex: function () {
            if (!isNaN(this._listTabIndex)) {
                return this._listTabIndex;
            }

            var tabindex = this.element.attr(TABINDEX);
            this._listTabIndex = !isNaN(tabindex) ? tabindex : 0;

            this.element.removeAttr(TABINDEX);

            return this._listTabIndex;
        },

        _blur: function () {
            if (this._target) {
                this._target.removeClass(FOCUSED_CLASS);
                this._getList().removeAttr("aria-activedescendant");
            }
            this._target = null;
        },

        _click: function (e) {
            var target = $(e.currentTarget);
            var oldTarget = this._target;

            if (oldTarget) {
                oldTarget.removeClass(FOCUSED_CLASS);
            }

            this._target = target;
            target.addClass(FOCUSED_CLASS);
            this._getList().attr("aria-activedescendant", target.attr("id"));
            if (this._getList()[0] !== kendo._activeElement()) {
                this.focus();
            }
        },

        _getNavigatableItem: function (key) {
            var current = this._target || this.items().filter(ENABLED_ITEM_SELECTOR).first();

            if (key === keys.UP && this._target) {
                current = this._target.prevAll(ENABLED_ITEM_SELECTOR).first();
            }

            if (key === keys.DOWN && this._target) {
                current = this._target.nextAll(ENABLED_ITEM_SELECTOR).first();
            }

            return current.length ? current : null;
        },

        _scroll: function (item) {
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

        _keyDown: function (e) {
            var key = e.keyCode;
            var current = this._getNavigatableItem(key);
            var index;

            if (key == keys.DELETE) {
                this.remove(this.select());
                if (this._target) {
                    this._target.removeClass(FOCUSED_CLASS);
                    this._getList().removeAttr("aria-activedescendant");
                    this._target = null;
                }
                e.preventDefault();
            } else if (key === keys.DOWN || key === keys.UP) {
                if (this._target) {
                    this._target.removeClass(FOCUSED_CLASS);
                }
                if (e.shiftKey) {
                    if (e.ctrlKey) {
                        index = this.items().index(key === keys.DOWN ? this._target.next() : this._target.prev());
                        if (!this.trigger(REORDER, { dataItem: this.dataItem(this._target), item: $(this._target) })) {
                            this.reorder(this._target, index);
                            this._target.addClass(FOCUSED_CLASS);
                            return;
                        }
                    } else {
                        this.select(this._target);
                        this.select(current);
                    }
                }
                this._target = current;
                if (this._target) {
                    this._target.addClass(FOCUSED_CLASS);
                    this._scroll(this._target);
                    this._getList().attr("aria-activedescendant", this._target.attr("id"));
                } else {
                    this._getList().removeAttr("aria-activedescendant");
                }
                e.preventDefault();
            } else if (key == keys.SPACEBAR) {
                if (e.ctrlKey && this._target) {
                    if (this._target.hasClass(SELECTED_STATE_CLASS)) {
                        this._target.removeClass(SELECTED_STATE_CLASS);
                    } else {
                        this.select(this._target);
                    }
                } else {
                    this.clearSelection();
                    this.select(this._target);
                }
                e.preventDefault();
            } else if (e.ctrlKey && key == keys.RIGHT) {
                if (e.shiftKey) {
                    this._executeCommand(TRANSFER_ALL_TO);
                } else {
                    this._executeCommand(TRANSFER_TO);
                }
                e.preventDefault();
            } else if (e.ctrlKey && key == keys.LEFT) {
                if (e.shiftKey) {
                    this._executeCommand(TRANSFER_ALL_FROM);
                } else {
                    this._executeCommand(TRANSFER_FROM);
                }
                e.preventDefault();
            }
        },

        focus: function () {
            this._getList().focus();
        },

        _createDraggable: function () {
            var draggable = this.options.draggable;

            if (draggable) {
                var hint = draggable.hint;
                if (!this.options.selectable) {
                    throw new Error("Dragging requires selection to be enabled");
                }

                if (!hint) {
                    hint = defaultHint;
                }

                this._draggable = new kendo.ui.Draggable(this.wrapper, {
                    filter: draggable.filter ? draggable.filter : DEFAULT_FILTER,
                    hint: kendo.isFunction(hint) ? hint : $(hint),
                    dragstart: proxy(this._dragstart, this),
                    dragcancel: proxy(this._clear, this),
                    drag: proxy(this._drag, this),
                    dragend: proxy(this._dragend, this)
                });
            }
        },

        _dragstart: function (e) {
            var draggedElement = this.draggedElement = e.currentTarget;
            var placeholder = this.options.draggable.placeholder;
            var dataItem = this.dataItem(draggedElement);
            var eventData = { dataItems: dataItem, items: $(draggedElement), draggableEvent: e };

            if (!placeholder) {
                placeholder = defaultPlaceholder;
            }

            this.placeholder = kendo.isFunction(placeholder) ? $(placeholder.call(this, draggedElement)) : $(placeholder);

            if (draggedElement.is(DOT + DISABLED_STATE_CLASS)) {
                e.preventDefault();
            } else {
                if (this.trigger(DRAGSTART, eventData)) {
                    e.preventDefault();
                } else {
                    this.clearSelection();
                    this.select(draggedElement);
                    draggedElement.addClass(DRAGGEDCLASS);
                }
            }
        },

        _clear: function () {
            this.draggedElement.removeClass(DRAGGEDCLASS);
            this.placeholder.remove();
        },

        _findElementUnderCursor: function (e) {
            var elementUnderCursor = kendo.elementUnderCursor(e);
            var draggable = e.sender;

            if ($.contains(draggable.hint[0], elementUnderCursor) || draggable.hint[0] === elementUnderCursor) {
                draggable.hint.hide();
                elementUnderCursor = kendo.elementUnderCursor(e);
                draggable.hint.show();
            }

            return elementUnderCursor;
        },

        _findTarget: function (e) {
            var element = this._findElementUnderCursor(e);
            var elementNode = $(element);
            var list = this._getList()[0];
            var items;
            var node;

            if ($.contains(list, element)) {
                items = this.items();
                element = elementNode.is("li") ? element : elementNode.closest("li")[0];
                node = items.filter(element)[0] || items.has(element)[0];
                if (node) {
                    node = $(node);
                    return !node.hasClass(DISABLED_STATE_CLASS) ? { element: node, listBox: this } : null;
                } else {
                    return null;
                }
            } else if (list == element && !this.items().length) {
                return { element: $(list), appendToBottom: true, listBox: this };
            } else {
                return this._searchConnectedListBox(elementNode);
            }
        },

        _getElementCenter: function (element) {
            var center = element.length ? kendo.getOffset(element) : null;
            if (center) {
                center.top += outerHeight(element) / 2;
                center.left += outerWidth(element) / 2;
            }
            return center;
        },

        _searchConnectedListBox: function (element) {
            var connectedListBox;
            var items;
            var node;

            if (element.getKendoListBox()) {
                connectedListBox = element.getKendoListBox();
            }

            if (!connectedListBox) {
                connectedListBox = element.closest(".k-list-scroller.k-selectable").next().getKendoListBox();
            }

            if (connectedListBox && $.inArray(this.element[0].id, connectedListBox.options.dropSources) !== -1) {
                items = connectedListBox.items();
                element = element.is("li") ? element[0] : element.closest("li")[0];
                node = items.filter(element)[0] || items.has(element)[0];
                if (node) {
                    node = $(node);
                    return !node.hasClass(DISABLED_STATE_CLASS) ? { element: node, listBox: connectedListBox } : null;
                } else if (!items.length) {
                    return { element: connectedListBox._getList(), listBox: connectedListBox, appendToBottom: true };
                } else {
                    return null;
                }
            }
            return null;
        },

        _drag: function (e) {
            var draggedElement = this.draggedElement;
            var target = this._findTarget(e);
            var cursorOffset = { left: e.x.location, top: e.y.location };
            var dataItem = this.dataItem(draggedElement);
            var eventData = { dataItems: [dataItem], items: $(draggedElement), draggableEvent: e };
            var targetCenter;
            var offsetDelta;
            var direction;

            if (this.trigger(DRAG, eventData)) {
                e.preventDefault();
                return;
            }

            if (target) {
                targetCenter = this._getElementCenter(target.element);

                offsetDelta = {
                    left: Math.round(cursorOffset.left - targetCenter.left),
                    top: Math.round(cursorOffset.top - targetCenter.top)
                };

                if (target.appendToBottom) {
                    this._movePlaceholder(target, null, draggedElement);
                    return;
                }

                if (offsetDelta.top < 0) {
                    direction = "prev";
                } else if (offsetDelta.top > 0) {
                    direction = "next";
                }

                if (direction) {
                    if (target.element[0] != this.placeholder[0]) {
                        this._movePlaceholder(target, direction, draggedElement);
                    }
                }
            }
            else if (this.placeholder.parent().length) {
                this.placeholder.remove();
            }
        },

        _movePlaceholder: function (target, direction, draggedElement) {
            var placeholder = this.placeholder;
            var draggableOptions = target.listBox.options.draggable;

            if (placeholder.parent().length) {
                this.placeholder.remove();
                if (draggableOptions && draggableOptions.placeholder) {
                    this.placeholder = kendo.isFunction(draggableOptions.placeholder) ? $(draggableOptions.placeholder.call(this, draggedElement)) : $(draggableOptions.placeholder);
                } else {
                    this.placeholder = $(defaultPlaceholder.call(this, draggedElement));
                }
            }

            if (!direction) {
                target.element.append(this.placeholder);
            } else if (direction === "prev") {
                target.element.before(this.placeholder);
            } else if (direction === "next") {
                target.element.after(this.placeholder);
            }
        },

        _dragend: function (e) {
            var draggedItem = this.draggedElement;
            var items = this.items();
            var placeholderIndex = items.not(this.draggedElement).index(this.placeholder);
            var draggedIndex = items.index(this.draggedElement);
            var dataItem = this.dataItem(draggedItem);
            var eventData = { dataItems: [dataItem], items: $(draggedItem) };
            var connectedListBox = this.placeholder.closest(".k-widget.k-listbox").find("select").getKendoListBox();

            if (this.trigger(DROP, extend({}, eventData, { draggableEvent: e }))) {
                e.preventDefault();
                return;
            }

            if (placeholderIndex >= 0) {
                if (placeholderIndex !== draggedIndex && !this.trigger(REORDER, extend({}, eventData, { offset: placeholderIndex }))) {
                    draggedItem.removeClass(DRAGGEDCLASS);
                    this.reorder(draggedItem, placeholderIndex);
                }
            } else if (connectedListBox) {
                if (!this.trigger(REMOVE, eventData)) {
                    this.remove($(draggedItem));
                }

                if (!connectedListBox.trigger(ADD, eventData)) {
                    connectedListBox._addItemAt(dataItem, connectedListBox.items().index(this.placeholder));
                }
            }

            this._clear();
            this._draggable.dropped = true;

            this.trigger(DRAGEND, extend({}, eventData, { draggableEvent: e }));
        },

        reorder: function (item, index) {
            var dataSource = this.dataSource;
            var dataItem = this.dataItem(item);
            var dataItemAtIndex = dataSource.at(index);
            var itemAtIndex = this.items()[index];
            var listItem = $(item);

            if (dataItem && itemAtIndex && dataItemAtIndex) {
                this._removeElement(listItem);
                this._insertElementAt(listItem, index);
                this._updateToolbar();
            }
        },

        remove: function (items) {
            var listItems = this._getItems(items);
            var itemsLength = listItems.length;
            var i;

            this._unbindDataSource();
            for (i = 0; i < itemsLength; i++) {
                this._removeItem($(listItems[i]));
            }
            this._bindDataSource();
            this._syncElement();
            this._updateAllToolbars();
        },

        _removeItem: function (item) {
            var dataSource = this.dataSource;
            var dataItem = this.dataItem(item);
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
            this._removeElement(item);
        },

        _removeElement: function (item) {
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

        items: function () {
            var list = this._getList();
            return list.children();
        },

        select: function (items) {
            var selectable = this.selectable;

            if (isUndefined(items)) {
                return selectable.value();
            }

            var enabledItems = this.items().filter(items).filter(ENABLED_ITEMS_SELECTOR);

            if (!selectable.options.multiple) {
                selectable.clear();
                enabledItems = enabledItems.first();
            }

            return selectable.value(enabledItems);
        },

        clearSelection: function () {
            if (this.selectable) {
                this.selectable.clear();
            }
        },

        enable: function (items, enable) {
            var enabled = isUndefined(enable) ? true : !!enable;
            var listItems = this._getItems(items);
            var itemsLength = listItems.length;
            var i;

            for (i = 0; i < itemsLength; i++) {
                this._enableItem($(listItems[i]), enabled);
            }
        },

        _enableItem: function (item, enable) {
            var dataItem = this.dataItem(item);

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

        setDataSource: function (dataSource) {
            this.options.dataSource = dataSource;
            this._dataSource();
        },

        _dataSource: function () {
            var options = this.options;
            var dataSource = options.dataSource || {};

            dataSource = $.isArray(dataSource) ? { data: dataSource } : dataSource;
            dataSource.select = this.element;
            dataSource.fields = [
                { field: options.dataTextField },
                { field: options.dataValueField }];

            this._unbindDataSource();
            this.dataSource = DataSource.create(dataSource);
            this._bindDataSource();

            if (this.options.autoBind) {
                this.dataSource.fetch();
            }
        },

        _bindDataSource: function () {
            if (this.dataSource) {
                this._dataChangeHandler = proxy(this.refresh, this);
                this.dataSource.bind(CHANGE, this._dataChangeHandler);
            }
        },

        _unbindDataSource: function () {
            if (this.dataSource && this._dataChangeHandler) {
                this.dataSource.unbind(CHANGE, this._dataChangeHandler);
            }
        },

        _wrapper: function () {
            var element = this.element;
            var wrapper = element.parent("div.k-listbox");

            if (!wrapper[0]) {
                wrapper = element.wrap('<div class="k-widget k-listbox" deselectable="on" />').parent();
                wrapper[0].style.cssText = element[0].style.cssText;
                wrapper[0].title = element[0].title;
                $('<div class="k-list-scroller" />').insertBefore(element);
            }

            this.wrapper = wrapper.addClass(element[0].className).css("display", "");
            this._innerWrapper = $(wrapper[0].firstChild);
        },

        _list: function () {
            $("<ul class='" + LIST_CLASS + "' role='listbox'></ul>").appendTo(this._innerWrapper);
            if (this.options.navigatable) {
                this._getList().attr(TABINDEX, this._getTabIndex());
            }
        },

        _templates: function () {
            var options = this.options;
            var template;

            if (options.template && typeof options.template == "string") {
                template = kendo.template(options.template);
            } else if (!options.template) {
                template = kendo.template('${' + kendo.expr(options.dataTextField, "data") + "}", { useWithBlock: false });
            } else {
                template = options.template;
            }

            this.templates = {
                itemTemplate: kendo.template("# var item = data.item, r = data.r; # <li class='k-item' role='option'>#=r(item)#</li>", { useWithBlock: false }),
                itemContent: template,
                toolbar: "<div class='" + TOOLBAR_CLASS + "'></div>"
            };
        },

        refresh: function () {
            var view = this.dataSource.view();
            var template = this.templates.itemTemplate;
            var html = "";

            for (var idx = 0; idx < view.length; idx++) {
                html += template({ item: view[idx], r: this.templates.itemContent });
            }
            this._getList().html(html);
            this._setItemIds();
            this._createToolbar();
            this._syncElement();
            this._updateAllToolbars();
            this.trigger(DATABOUND);
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

        _setItemIds: function () {
            var items = this.items();
            var view = this.dataSource.view();
            var viewLength = view.length;
            var i;

            for (i = 0; i < viewLength; i++) {
                items.eq(i).attr(kendoAttr(UNIQUE_ID), view[i].uid).attr("id", view[i].uid);
            }
        },

        _selectable: function () {
            var selectable = this.options.selectable;
            var selectableOptions = Selectable.parseOptions(selectable);

            this.selectable = new Selectable(this._innerWrapper, {
                aria: true,
                multiple: selectableOptions.multiple,
                filter: ENABLED_ITEM_SELECTOR,
                change: proxy(this._onSelect, this)
            });
        },

        _onSelect: function () {
            this._updateAllToolbars();
            this.trigger(CHANGE);
        },

        _updateAllToolbars: function () {
            $("select[data-role='listbox']").each(
                function () {
                    var listBox = $(this).data("kendoListBox");
                    if (listBox) {
                        listBox._updateToolbar();
                    }
                }
            );
        },

        _destroySelectable: function () {
            if (this.selectable) {
                this.selectable.destroy();
                this.selectable = null;
            }
        },

        _getList: function () {
            return this.wrapper.find(LIST_SELECTOR);
        },

        _getItems: function (items) {
            return this.items().filter(items);
        },

        _createToolbar: function () {
            var toolbarOptions = this.options.toolbar;
            var position = toolbarOptions.position || RIGHT;
            var toolbarInsertion = position === BOTTOM ? "insertAfter" : "insertBefore";
            var tools = toolbarOptions.tools || [];
            var messages = this.options.messages;

            this._destroyToolbar();
            this.wrapper.removeClass(TOOLBAR_POSITION_CLASS_NAMES.join(SPACE));

            if (tools.length && tools.length > 0) {
                var toolbarElement = $(this.templates.toolbar)[toolbarInsertion](this._innerWrapper);
                this.toolbar = new ToolBar(toolbarElement, extend({}, toolbarOptions, { listBox: this, messages: messages }));
                this.wrapper.addClass(TOOLBAR_CLASS + DASH + position);
            }
        },

        _destroyToolbar: function () {
            if (this.toolbar) {
                this.toolbar.destroy();
                this.toolbar = null;
            }
        },

        _executeCommand: function (commandName) {
            var command = CommandFactory.current.create(commandName, { listBox: this });
            if (command) {
                command.execute();
            }
        },

        _updateToolbar: function () {
            var toolbar = this.toolbar;
            if (toolbar) {
                toolbar._updateToolStates();
            }
        }
    });

    kendo.ui.plugin(ListBox);

    var CommandFactory = Class.extend({
        init: function () {
            this._commands = [];
        },

        register: function (commandName, commandType) {
            this._commands.push({
                commandName: commandName,
                commandType: commandType
            });
        },

        create: function (commandName, options) {
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
        init: function (options) {


            this.options = extend({}, this.options, options);
            this.listBox = this.options.listBox;
        },

        options: {
            listBox: null
        },

        getItems: function () {
            return $(this.listBox.select());
        },

        execute: noop,
        canExecute: noop,
        updateSelection: noop
    });

    var RemoveItemsCommand = ListBoxCommand.extend({
        execute: function () {
            var listBox = this.listBox;
            var items = this.getItems();

            if (!listBox.trigger(REMOVE, { dataItems: listBox._dataItems(items), items: items })) {
                listBox.remove(items);
                this.updateSelection();
            }
        },

        canExecute: function () {
            return this.listBox.select().length > 0;
        },

        updateSelection: function () {
            this.listBox.clearSelection();
        }
    });
    CommandFactory.current.register(REMOVE, RemoveItemsCommand);

    var MoveItemsCommand = ListBoxCommand.extend({
        execute: function () {


            if (this.canExecute()) {
                this.moveItems();
            }
        },

        canExecute: noop,

        moveItems: function () {

            var listBox = this.listBox;
            var options = this.options;
            var items = this.getItems();
            var offset = options.offset;
            var indecesInDom = getSortedDomIndices(items);
            var movedItems = $.makeArray(items.sort(this.itemComparer));
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

        itemComparer: function (item1, item2) {
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

        canExecute: function () {
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

        canExecute: function () {
            var items = this.getItems();
            var domIndices = getSortedDomIndices(items);
            return (domIndices.length > 0 && $(domIndices).last()[0] < (this.listBox.items().length - 1));
        }
    });
    CommandFactory.current.register(MOVE_DOWN, MoveDownItemsCommand);

    var TransferItemsCommand = ListBoxCommand.extend({
        options: {
            filter: ENABLED_ITEM_SELECTOR
        },

        execute: function () {
            var sourceListBox = this.getSourceListBox();
            var items = this.getItems().filter(this.options.filter);
            var dataItems = sourceListBox ? sourceListBox._dataItems(items) : [];
            var destinationListBox = this.getDestinationListBox();
            var updatedSelection = this.getUpdatedSelection(items);

            if (destinationListBox && items.length > 0) {
                if (!destinationListBox.trigger(ADD, { dataItems: dataItems, items: items })) {
                    destinationListBox.add(dataItems);
                }

                if (!sourceListBox.trigger(REMOVE, { dataItems: dataItems, items: items })) {
                    sourceListBox.remove(items);
                    this.updateSelection(updatedSelection);
                }
            }
        },

        getUpdatedSelection: function (items) {

            var sourceListBox = this.getSourceListBox();
            var nextItem = $(items).nextAll(this.options.filter)[0];

            if (nextItem) {
                return $(nextItem);
            } else {
                return sourceListBox ? sourceListBox.items().not(items).filter(this.options.filter).first() : $();
            }
        },

        updateSelection: function (items) {
            var sourceListBox = this.getSourceListBox();

            if (sourceListBox) {
                $(sourceListBox.select(items));
            }
        },

        getSourceListBox: noop,
        getDestinationListBox: noop
    });

    var TransferItemsToCommand = TransferItemsCommand.extend({
        canExecute: function () {
            var sourceListBox = this.getSourceListBox();

            return (sourceListBox ? sourceListBox.select().length > 0 : false);
        },

        getSourceListBox: function () {
            return this.listBox;
        },

        getDestinationListBox: function () {
            var sourceListBox = this.getSourceListBox();
            return sourceListBox ? $(sourceListBox.options.connectWith).data(KENDO_LISTBOX) : null;
        },

        getItems: function () {
            var sourceListBox = this.getSourceListBox();
            return sourceListBox ? $(sourceListBox.select()) : $();
        }
    });
    CommandFactory.current.register(TRANSFER_TO, TransferItemsToCommand);

    var TransferItemsFromCommand = TransferItemsCommand.extend({
        canExecute: function () {
            var sourceListBox = this.getSourceListBox();

            return (sourceListBox ? sourceListBox.select().length > 0 : false);
        },

        getSourceListBox: function () {
            var destinationListBox = this.getDestinationListBox();
            return destinationListBox ? $(destinationListBox.options.connectWith).data(KENDO_LISTBOX) : null;
        },

        getDestinationListBox: function () {
            return this.listBox;
        },

        getItems: function () {
            var sourceListBox = this.getSourceListBox();
            return sourceListBox ? $(sourceListBox.select()) : $();
        }
    });
    CommandFactory.current.register(TRANSFER_FROM, TransferItemsFromCommand);

    var TransferAllItemsToCommand = TransferItemsToCommand.extend({
        canExecute: function () {
            var sourceListBox = this.getSourceListBox();

            return (sourceListBox ? sourceListBox.items().length > 0 : false);
        },

        getItems: function () {
            var sourceListBox = this.getSourceListBox();
            return sourceListBox ? sourceListBox.items() : $();
        }
    });
    CommandFactory.current.register(TRANSFER_ALL_TO, TransferAllItemsToCommand);

    var TransferAllItemsFromCommand = TransferItemsFromCommand.extend({
        canExecute: function () {
            var sourceListBox = this.getSourceListBox();

            return (sourceListBox ? sourceListBox.items().length > 0 : false);
        },

        getItems: function () {
            var sourceListBox = this.getSourceListBox();
            return sourceListBox ? sourceListBox.items() : $();
        }
    });
    CommandFactory.current.register(TRANSFER_ALL_FROM, TransferAllItemsFromCommand);

    var ToolBar = Class.extend({
        init: function (element, options) {
            this.element = $(element).addClass(TOOLBAR_CLASS);
            this.options = extend({}, this.options, options);
            this.listBox = this.options.listBox;

            this._initTemplates();
            this._createTools();
            this._updateToolStates();
            this._attachEventHandlers();
        },

        destroy: function () {
            this._detachEventHandlers();
            kendo.destroy(this.element);
            this.element.remove();
            this.element = null;
        },

        options: {
            position: RIGHT,
            tools: []
        },

        _initTemplates: function () {
            this.templates = {
                tool: kendoTemplate(
                    "<li>" +
                    "<a href='\\\\#' class='k-button k-button-icon k-tool' data-command='#= command #' title='#= text #' aria-label='#= text #' role='button'>" +
                    "<span class='k-icon #= iconClass #'></span>" +
                    "</a>" +
                    "</li>")
            };
        },

        _createTools: function () {
            var tools = this.options.tools;
            var toolsLength = tools.length;
            var toolsMessages = this.options.messages.tools;
            var toolList = this._createToolList();
            var tool;
            var i;

            for (i = 0; i < toolsLength; i++) {
                tool = extend({}, ToolBar.defaultTools[tools[i]], { text: toolsMessages[tools[i]] });

                if (tool) {
                    toolList.append($(this.templates.tool(tool)));
                }
            }

            this.element.append(toolList);
        },

        _createToolList: function () {
            return $("<ul class='k-reset' />");
        },

        _attachEventHandlers: function () {
            this.element.on(CLICK, TOOL_SELECTOR, proxy(this._onToolClick, this));
        },

        _detachEventHandlers: function () {
            this.element.off(NS).find("*").off(NS);
        },

        _onToolClick: function (e) {
            e.preventDefault();
            this._executeToolCommand($(e.currentTarget).data(COMMAND));
        },

        _executeToolCommand: function (command) {
            var listBox = this.listBox;
            if (listBox) {
                listBox._executeCommand(command);
            }
        },

        _updateToolStates: function () {
            var tools = this.options.tools;
            var toolsLength = tools.length;
            var i;

            for (i = 0; i < toolsLength; i++) {
                this._updateToolState(tools[i]);
            }
        },

        _updateToolState: function (toolName) {
            var command = CommandFactory.current.create(toolName, { listBox: this.listBox });
            var toolElement = this.element.find("[data-command='" + toolName + "']")[0];

            if (toolElement && command && command.canExecute) {
                if (command.canExecute()) {
                    $(toolElement).removeClass(DISABLED_STATE_CLASS);
                } else {
                    $(toolElement).addClass(DISABLED_STATE_CLASS);
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

}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) { (a3 || a2)(); });
