import "./kendo.data.js";
import "./kendo.editable.js";
import "./kendo.selectable.js";
import "./kendo.pager.js";

var __meta__ = {
    id: "listview",
    name: "ListView",
    category: "web",
    description: "The ListView widget offers rich support for interacting with data.",
    depends: [ "data" ],
    features: [ {
        id: "listview-editing",
        name: "Editing",
        description: "Support for record editing",
        depends: [ "editable" ]
    }, {
        id: "listview-selection",
        name: "Selection",
        description: "Support for selection",
        depends: [ "selectable" ]
    }, {
        id: "listview-paging",
        name: "Paging",
        description: "Support for paging",
        depends: [ "pager" ]
    } ]
};

(function($, undefined) {
    var kendo = window.kendo,
        CHANGE = "change",
        KENDO_KEYDOWN = "kendoKeydown",
        CANCEL = "cancel",
        DATABOUND = "dataBound",
        DATABINDING = "dataBinding",
        Widget = kendo.ui.Widget,
        keys = kendo.keys,
        EMPTY_STRING = "",
        EMPTY_STRING_TEMPLATE = () => EMPTY_STRING,
        DOT = ".",
        FOCUSSELECTOR = "> *:not(.k-loading-mask)",
        PROGRESS = "progress",
        ERROR = "error",
        FOCUSED = "k-focus",
        SELECTED = "k-selected",
        KEDITITEM = "k-edit-item",
        PAGER_CLASS = "k-listview-pager",
        ITEM_CLASS = "k-listview-item",
        ARIA_SETSIZE = "aria-setsize",
        ARIA_POSINSET = "aria-posinset",
        ARIA_ROLE = "role",
        ARIA_LABEL = "aria-label",
        ARIA_MULTISELECTABLE = "aria-multiselectable",
        ARIA_ACTIVEDESCENDANT = "aria-activedescendant",
        EDIT = "edit",
        REMOVE = "remove",
        SAVE = "save",
        MOUSEDOWN = "mousedown",
        CLICK = "click",
        TOUCHSTART = "touchstart",
        NS = ".kendoListView",
        activeElement = kendo._activeElement,
        progress = kendo.ui.progress,
        DataSource = kendo.data.DataSource;

    var ListView = kendo.ui.DataBoundWidget.extend( {
        init: function(element, options) {
            var that = this;

            options = Array.isArray(options) ? { dataSource: options } : options;

            Widget.fn.init.call(that, element, options);

            options = that.options;

            that.wrapper = element = that.element;

            if (element[0].id) {
                that._itemId = element[0].id + "_lv_active";
            } else {
                that._itemId = kendo.guid() + "_lv_active";
            }

            that._element();

            that._layout();

            that._dataSource();

            that._setContentHeight();

            that._templates();

            that._navigatable();

            that._selectable();

            that._pageable();

            that._crudHandlers();

            that._scrollable();

            if (that.options.autoBind) {
                that.dataSource.fetch();
            }

            kendo.notify(that);
        },

        events: [
            CHANGE,
            CANCEL,
            DATABINDING,
            DATABOUND,
            EDIT,
            REMOVE,
            SAVE,
            KENDO_KEYDOWN
        ],

        options: {
            name: "ListView",
            ariaLabel: null,
            autoBind: true,
            selectable: false,
            navigatable: false,
            pageable: false,
            height: null,
            template: EMPTY_STRING_TEMPLATE,
            altTemplate: null,
            editTemplate: null,
            contentTemplate: () => "<div data-content='true' />",
            contentElement: "div",
            bordered: true,
            borders: "",
            layout: "",
            flex: {
                direction: "row",
                wrap: "nowrap"
            },
            grid: {},
            scrollable: false
        },

        setOptions: function(options) {
            Widget.fn.setOptions.call(this, options);

            this._layout();

            this._templates();

            if (this.selectable) {
                this.selectable.destroy();
                this.selectable = null;
            }

            this._selectable();
        },

        _templates: function() {
            var options = this.options;

            this.template = kendo.template(options.template || EMPTY_STRING_TEMPLATE);
            this.altTemplate = kendo.template(options.altTemplate || options.template || EMPTY_STRING_TEMPLATE);
            this.editTemplate = kendo.template(options.editTemplate || EMPTY_STRING_TEMPLATE);
        },

        _item: function(action) {
            return this.content.children()[action]();
        },

        items: function() {
            return this.content.children(":not(.k-loading-mask)");
        },

        dataItem: function(element) {
            var attr = kendo.attr("uid");
            var uid = $(element).closest("[" + attr + "]").attr(attr);

            return this.dataSource.getByUid(uid);
        },

        setDataSource: function(dataSource) {
            this.options.dataSource = dataSource;
            this._dataSource();

            if (this.options.autoBind) {
                dataSource.fetch();
            }

            if (this.options.scrollable === "endless") {
                this._bindScrollable();
            }
        },

        _unbindDataSource: function() {
            var that = this;

            that.dataSource.unbind(CHANGE, that._refreshHandler)
                            .unbind(PROGRESS, that._progressHandler)
                            .unbind(ERROR, that._errorHandler);
        },

        _dataSource: function() {
            var that = this,
                pageable = that.options.pageable,
                dataSource = that.options.dataSource;

            if ($.isPlainObject(pageable) && pageable.pageSize !== undefined) {
                dataSource.pageSize = pageable.pageSize;
            }

            if (that.dataSource && that._refreshHandler) {
                that._unbindDataSource();
            } else {
                that._refreshHandler = that.refresh.bind(that);
                that._progressHandler = that._progress.bind(that);
                that._errorHandler = that._error.bind(that);
            }

            that.dataSource = DataSource.create(dataSource)
                                .bind(CHANGE, that._refreshHandler)
                                .bind(PROGRESS, that._progressHandler)
                                .bind(ERROR, that._errorHandler);
        },

        _progress: function(toggle) {
            var element = this.wrapper;
            if (toggle && this.content.height()) {
                element = this.content;
            }
            progress(element, toggle, { opacity: true });
        },

        _error: function() {
            progress(this.content, false);
        },

        _element: function() {
            var options = this.options;
            var height = options.height;

            this.element.addClass("k-listview");


            if (options.contentElement) {
                this.content = $(document.createElement(options.contentElement)).appendTo(this.element);
            } else {
                this.content = this.element;
            }

            if (height) {
                this.element.css("height", height);
            }
        },

        _layout: function() {
            var that = this;
            var options = that.options;
            var flex = options.flex;
            var grid = options.grid;
            var element = that.element;
            var elementClassNames = ["k-listview"];
            var content = that.content;
            var contentClassNames = ["k-listview-content"];

            element.add(content).removeClass(function(index, className) {
                if (className.indexOf("k-") >= 0) {
                    return true;
                }
            });

            // Element class names
            if (options.bordered === true) {
                elementClassNames.push("k-listview-bordered");
            }

            if (typeof options.borders === "string" && options.borders !== EMPTY_STRING) {
                elementClassNames.push("k-listview-borders-" + options.borders);
            }


            // Content class names
            if (typeof options.contentPadding === "string" && options.contentPadding !== EMPTY_STRING) {
                contentClassNames.push("k-listview-content-padding-" + options.contentPadding);
            }

            if (typeof options.layout === "string" && options.layout !== EMPTY_STRING) {
                contentClassNames.push("k-d-" + options.layout);
            }

            if (options.layout === "flex" && typeof flex === "object") {
                if (typeof flex.direction === "string" && flex.direction !== "") {
                    contentClassNames.push("k-flex-" + flex.direction);
                }

                if (typeof flex.wrap === "string" && flex.wrap !== "") {
                    contentClassNames.push("k-flex-" + flex.wrap);
                }
            }

            if (options.layout === "grid" && typeof grid === "object") {
                if (typeof grid.cols === "number") {
                    content.css("grid-template-columns", "repeat(" + grid.cols + ", 1fr)");
                } else if (typeof grid.cols === "string") {
                    content.css("grid-template-columns", grid.cols);
                }

                if (typeof grid.rows === "number") {
                    content.css("grid-template-rows", "repeat(" + grid.rows + ", " + (grid.rowHeight !== undefined ? grid.rowHeight : "1fr") + ")");
                } else if (typeof grid.rows === "string") {
                    content.css("grid-template-rows", grid.rows);
                }

                if (typeof grid.gutter === "number") {
                    content.css("grid-gap", grid.gutter);
                } else if (typeof grid.gutter === "string") {
                    content.css("grid-gap", grid.gutter);
                }
            }

            that.element.addClass(elementClassNames.join(" "));
            that.content.addClass(contentClassNames.join(" "));

        },

        _setContentHeight: function() {
            var that = this,
                options = that.options,
                height;

            if (options.scrollable && that.wrapper.is(":visible")) {

                height = that.wrapper.innerHeight();
                that.content.height(height);
            }
        },

        refresh: function(e) {
            var that = this,
                view = that.dataSource.view(),
                data,
                items,
                item,
                html = "",
                idx,
                length,
                template = that.template,
                altTemplate = that.altTemplate,
                options = that.options,
                role = options.selectable ? "option" : "listitem",
                active = activeElement(),
                endlessAppend = that._endlessFetchInProgress,
                index = endlessAppend ? that._skipRerenderItemsCount : 0,
                scrollable = that.options.scrollable;

            e = e || {};

            if (e.action === "itemchange") {
                if (!that._hasBindingTarget() && !that.editable) {
                    data = e.items[0];
                    item = that.items().filter("[" + kendo.attr("uid") + "=" + data.uid + "]");

                    if (item.length > 0) {
                        idx = item.index();

                        that.angular("cleanup", function() {
                            return { elements: [ item ] };
                        });

                        item.replaceWith(template(data));
                        item = that.items().eq(idx);
                        item.attr(kendo.attr("uid"), data.uid);

                        that.angular("compile", function() {
                            return { elements: [ item ], data: [ { dataItem: data } ] };
                        });

                        that.trigger("itemChange", {
                            item: item,
                            data: data
                        });
                    }
                }

                return;
            }

            if (that.trigger(DATABINDING, { action: e.action || "rebind", items: e.items, index: e.index })) {
                return;
            }

            that._angularItems("cleanup");

            if (!endlessAppend) {
                that._destroyEditable();
            }

            for (idx = index, length = view.length; idx < length; idx++) {
                if (idx % 2) {
                    html += altTemplate(view[idx]);
                } else {
                    html += template(view[idx]);
                }
            }

            if (endlessAppend) {
                that.content.append(html);
            } else {
                that.content.html(html);
            }

            items = that.items().not(".k-loading-mask");

            that._ariaAttributes(view.length);

            for (idx = index, length = view.length; idx < length; idx++) {
                item = items.eq(idx);

                item.addClass(ITEM_CLASS);

                item.attr(kendo.attr("uid"), view[idx].uid)
                    .attr(ARIA_ROLE, role);

                if (that.options.selectable) {
                    item.attr("aria-selected", "false");
                }

                if (that.options.pageable) {
                    item.attr(ARIA_SETSIZE, that.dataSource.total());
                    item.attr(ARIA_POSINSET, that.dataSource.indexOf(that.dataItem(item)) + 1);
                }
            }

            if (that.content[0] === active && that.options.navigatable) {
                if (that._focusNext) {
                    that.current(that.current().next());
                } else {
                    if (!scrollable) {
                        that.current(items.eq(0));
                    }
                }
            }

            if (that.element.attr(ARIA_ACTIVEDESCENDANT) &&
                that.element.find("#" + that.element.attr(ARIA_ACTIVEDESCENDANT)).length === 0) {
                    that.element.removeAttr(ARIA_ACTIVEDESCENDANT);
            }

            that._setContentHeight();
            that._angularItems("compile");

            that._progress(false);
            that._endlessFetchInProgress = null;

            that.trigger(DATABOUND, { action: e.action || "rebind", items: e.items, index: e.index });
        },

        _ariaAttributes: function(length) {
            var content = this.content,
                options = this.options,
                selectable = options.selectable;

            this._ariaLabelValue = this._ariaLabelValue || this.options.ariaLabel;

            if (length === 0) {
                content.removeAttr(ARIA_ROLE);
                content.removeAttr(ARIA_MULTISELECTABLE);

                if (content.attr(ARIA_LABEL)) {
                    this._ariaLabelValue = content.attr(ARIA_LABEL);
                    content.removeAttr(ARIA_LABEL);
                }
            } else {
                content.attr(ARIA_ROLE, selectable ? "listbox" : "list");

                if (selectable && kendo.ui.Selectable.parseOptions(selectable).multiple) {
                    content.attr(ARIA_MULTISELECTABLE, true);
                }

                if (this._ariaLabelValue) {
                    content.attr(ARIA_LABEL, this._ariaLabelValue);
                }
            }
        },

        _pageable: function() {
            var that = this,
                pageable = that.options.pageable,
                navigatable = that.options.navigatable,
                pagerWrap,
                settings;

            if (!pageable) {
                return;
            }

            pagerWrap = that.wrapper.find(DOT + PAGER_CLASS);

            if (!pagerWrap.length) {
                pagerWrap = $('<div />').addClass(PAGER_CLASS);
            }

            if (pageable.position === "top") {
                pagerWrap
                    .addClass(kendo.format("{0}-{1}", PAGER_CLASS, pageable.position))
                    .prependTo(that.wrapper);
            } else {
                pagerWrap.appendTo(that.wrapper);
            }

            if (that.pager) {
                that.pager.destroy();
            }

            if (typeof pageable === "object" && pageable instanceof kendo.ui.Pager) {
                that.pager = pageable;
            } else {
                pagerWrap = pageable.pagerId ? $("#" + pageable.pagerId) : pagerWrap;

                settings = $.extend({}, pageable, {
                    dataSource: that.dataSource,
                    navigatable: navigatable,
                    pagerId: null
                });

                that.pager = new kendo.ui.Pager(pagerWrap, settings);
            }
        },

        _selectable: function() {
            var that = this,
                multi,
                current,
                selectable = that.options.selectable,
                navigatable = that.options.navigatable;

            if (selectable) {
                multi = kendo.ui.Selectable.parseOptions(selectable).multiple;

                that.selectable = new kendo.ui.Selectable(that.element, {
                    aria: true,
                    multiple: multi,
                    filter: that.options.contentElement ? ".k-listview-content " + FOCUSSELECTOR : FOCUSSELECTOR,
                    change: function() {
                        that.trigger(CHANGE);
                    }
                });

                if (navigatable) {
                    that.element.on("keydown" + NS, function(e) {

                        if (!$(e.target).is(that.element)) { return; }

                        if (e.keyCode === keys.SPACEBAR) {
                            current = that.current();

                            if (e.target == e.currentTarget) {
                                e.preventDefault();
                            }

                            if (multi) {
                                if (!e.ctrlKey) {
                                    that.selectable.clear();
                                } else {
                                    if (current && current.hasClass(SELECTED)) {
                                        current.removeClass(SELECTED);
                                        that.trigger(CHANGE);
                                        return;
                                    }
                                }
                            } else {
                                that.selectable.clear();
                            }

                            that.selectable.value(current);
                            that.trigger(CHANGE);
                        }
                    });
                }
            }
        },

        _scrollable: function() {
            var that = this;
            var scrollable = that.options.scrollable;

            if (scrollable) {

                that.content.css({
                    "overflow-y": "scroll",
                    "position": "relative",
                    "-webkit-overflow-scrolling": "touch"
                });

                if (scrollable === "endless") {
                    that._bindScrollable();
                }
            }
        },

        _bindScrollable: function() {
            var that = this;
            var originalPageSize = that._endlessPageSize = that.dataSource.options.pageSize;

            that.content
                .off("scroll" + NS)
                .on("scroll" + NS, function() {
                    if (this.scrollTop + this.clientHeight - this.scrollHeight >= -15 &&
                    !that._endlessFetchInProgress &&
                    that._endlessPageSize < that.dataSource.total()) {
                        that._skipRerenderItemsCount = that._endlessPageSize;
                        that._endlessPageSize = that._skipRerenderItemsCount + originalPageSize;
                        that.dataSource.options.endless = true;
                        that._endlessFetchInProgress = true;
                        that.dataSource.pageSize(that._endlessPageSize);
                    }
                });
        },

        current: function(candidate) {
            var that = this,
                element = that.element,
                current = that._current,
                id = that._itemId;

            if (candidate === undefined) {
                return current;
            }

            if (current && current[0]) {
                if (current[0].id === id) {
                    current.removeAttr("id");
                }

                current.removeClass(FOCUSED);
                element.removeAttr(ARIA_ACTIVEDESCENDANT);
            }

            if (candidate && candidate[0]) {
                id = candidate[0].id || id;

                that._scrollTo(candidate[0]);

                element.attr(ARIA_ACTIVEDESCENDANT, id);
                candidate.addClass(FOCUSED).attr("id", id);
            }

            that._current = candidate;
        },

        _scrollTo: function(element) {
            var that = this,
                content = that.content,
                container,
                UseJQueryoffset = false,
                SCROLL = "scroll";

            if (content.css("overflow") === "auto" || content.css("overflow") === SCROLL || content.css("overflow-y") === SCROLL) {
                container = content[0];
            } else {
                container = window;
                UseJQueryoffset = true;
            }

            var scrollDirectionFunc = function(direction, dimension) {

                var elementOffset = UseJQueryoffset ? $(element).offset()[direction.toLowerCase()] : element["offset" + direction],
                    elementDimension = element["client" + dimension],
                    containerScrollAmount = $(container)[SCROLL + direction](),
                    containerDimension = $(container)[dimension.toLowerCase()]();

                if (elementOffset + elementDimension > containerScrollAmount + containerDimension) {
                    $(container)[SCROLL + direction](elementOffset + elementDimension - containerDimension);
                } else if (elementOffset < containerScrollAmount) {
                    $(container)[SCROLL + direction](elementOffset);
                }
            };

            scrollDirectionFunc("Top", "Height");
            scrollDirectionFunc("Left", "Width");
        },

        _navigatable: function() {
            var that = this,
                navigatable = that.options.navigatable,
                element = that.element,
                content = that.content,
                clickCallback = function(e) {
                    that.current($(e.currentTarget));
                    if (!$(e.target).is(":button, a, :input, a > .k-icon, a > k-svg-icon, textarea")) {
                        kendo.focusElement(element);
                    }
                };

            if (navigatable) {
                that._tabindex();

                element
                    .on("focus" + NS, function() {
                        var current = that._current;

                        if (!current || !current.is(":visible")) {
                            current = that._item("first");
                        }

                        that.current(current);
                    })
                    .on("focusout" + NS, function() {
                        if (that._current) {
                            that._current.removeClass(FOCUSED);
                        }
                    })
                    .on("keydown" + NS, that, function(e) {
                        var key = e.keyCode,
                            current = that.current(),
                            target = $(e.target),
                            canHandle = !target.is(":button, textarea, a, a > .t-icon, input"),
                            isTextBox = target.is(":text, :password"),
                            preventDefault = kendo.preventDefault,
                            editItem = content.find("." + KEDITITEM),
                            active = activeElement(), idx,
                            scrollable = that.options.scrollable;

                        if (target.hasClass(PAGER_CLASS) || (!canHandle && !isTextBox && key !== keys.ESC) || (isTextBox && key !== keys.ESC && key !== keys.ENTER)) {
                            return;
                        }

                        if (key === keys.UP || key === keys.LEFT) {
                            if (current && current[0]) {
                                current = current.prev();
                            }

                            if (current && current[0]) {
                                that.current(current);
                            }
                            else if (!scrollable) {
                                that.current(that._item("last"));
                            }
                            preventDefault(e);
                        }

                        if (key === keys.DOWN || key === keys.RIGHT) {
                            if (scrollable) {
                                if (that.options.scrollable === "endless" && !current.next().length) {
                                    that.content[0].scrollTop = that.content[0].scrollHeight;
                                    that._focusNext = true;
                                } else {
                                    current = current.next();

                                    if (current && current[0]) {
                                        that.current(current);
                                    }
                                }
                            }
                            else {
                                current = current.next();
                                that.current(!current || !current[0] ? that._item("first") : current);
                            }
                            preventDefault(e);
                        }

                        if (key === keys.PAGEUP) {
                            that.current(null);
                            that.dataSource.page(that.dataSource.page() - 1);
                            preventDefault(e);
                        }

                        if (key === keys.PAGEDOWN) {
                            that.current(null);
                            that.dataSource.page(that.dataSource.page() + 1);
                            preventDefault(e);
                        }

                        if (key === keys.HOME) {
                            that.current(that._item("first"));
                            preventDefault(e);
                        }

                        if (key === keys.END) {
                            that.current(that._item("last"));
                            preventDefault(e);
                        }

                        if (key === keys.ENTER) {
                            if (editItem.length !== 0 && (canHandle || isTextBox)) {
                                idx = that.items().index(editItem);

                                if (active) {
                                    active.blur();
                                }

                                that.save();

                                var focusAgain = function() {
                                    that.element.trigger("focus");
                                    that.current(that.items().eq(idx));
                                };

                                that.one("dataBound", focusAgain);
                            } else if (that.options.editTemplate) {
                                that.edit(current);
                            }
                        }

                        if (key === keys.ESC) {
                            editItem = content.find("." + KEDITITEM);

                            if (editItem.length === 0) {
                                return;
                            }

                            idx = that.items().index(editItem);
                            that.cancel();
                            that.element.trigger("focus");
                            that.current(that.items().eq(idx));
                        }
                    });

                element.on(MOUSEDOWN + NS + " " + TOUCHSTART + NS, that.options.contentElement ? ".k-listview-content " + FOCUSSELECTOR : FOCUSSELECTOR, clickCallback.bind(that));
            }
        },

        clearSelection: function() {
            var that = this;
            that.selectable.clear();
        },

        select: function(items) {
            var that = this,
                selectable = that.selectable;

            items = $(items);

            if (items.length) {
                if (!selectable.options.multiple) {
                    selectable.clear();
                    items = items.first();
                }
                selectable.value(items);
                return;
            }

            return selectable.value();
        },

        _destroyEditable: function() {
            var that = this;
            if (that.editable) {
                that.editable.destroy();
                delete that.editable;
            }
        },

        _modelFromElement: function(element) {
            var uid = element.attr(kendo.attr("uid"));

            return this.dataSource.getByUid(uid);
        },

        _closeEditable: function() {
            var that = this,
                editable = that.editable,
                options = that.options,
                role = options.selectable ? "option" : "listitem",
                data,
                item,
                index,
                template = that.template;

            if (editable) {
                if (editable.element.index() % 2) {
                    template = that.altTemplate;
                }

                that.angular("cleanup", function() {
                    return { elements: [ editable.element ] };
                });

                data = that._modelFromElement(editable.element);
                that._destroyEditable();

                index = editable.element.index();
                editable.element.replaceWith(template(data));
                item = that.items().eq(index);
                item.addClass(ITEM_CLASS);
                item.attr(kendo.attr("uid"), data.uid);
                item.attr(ARIA_ROLE, role);

                if (that._hasBindingTarget()) {
                    kendo.bind(item, data);
                }

                that.angular("compile", function() {
                    return { elements: [ item ], data: [ { dataItem: data } ] };
                });
            }
            return true;
        },

        edit: function(item) {
            var that = this,
                data = that._modelFromElement(item),
                container,
                uid = data.uid,
                index;

            that.cancel();

            item = that.items().filter("[" + kendo.attr("uid") + "=" + uid + "]");
            index = item.index();
            item.replaceWith(that.editTemplate(data));
            container = that.items().eq(index).addClass(KEDITITEM).attr(kendo.attr("uid"), data.uid);
            that.editable = container.kendoEditable({
                model: data,
                clearContainer: false,
                errorTemplate: false,
                target: that
            }).data("kendoEditable");

            that.trigger(EDIT, { model: data, item: container });
        },

        save: function() {
            var that = this,
                editable = that.editable,
                model;

            if (!editable) {
                return;
            }

            var container = editable.element;
            model = that._modelFromElement(container);

            if (editable.end() && !that.trigger(SAVE, { model: model, item: container })) {
                that._closeEditable();
                that.dataSource.sync();
            }
        },

        remove: function(item) {
            var that = this,
                dataSource = that.dataSource,
                data = that._modelFromElement(item);

            if (that.editable) {
                dataSource.cancelChanges(that._modelFromElement(that.editable.element));
                that._closeEditable();
            }

            if (!that.trigger(REMOVE, { model: data, item: item })) {
                if (item.attr("id") === that.element.attr(ARIA_ACTIVEDESCENDANT)) {
                    that.element.removeAttr(ARIA_ACTIVEDESCENDANT);
                }

                item.hide();
                dataSource.remove(data);
                dataSource.sync();
            }
        },

        add: function() {
            var that = this,
                dataItem,
                dataSource = that.dataSource,
                index = dataSource.indexOf((dataSource.view() || [])[0]);

            if (index < 0) {
                index = 0;
            }

            that.cancel();
            dataItem = dataSource.insert(index, {});
            that.edit(that.element.find("[data-uid='" + dataItem.uid + "']"));
        },

        cancel: function() {
            var that = this,
                dataSource = that.dataSource;

            if (that.editable) {
                var container = that.editable.element;
                var model = that._modelFromElement(container);

                if (!that.trigger(CANCEL, { model: model, container: container })) {
                    dataSource.cancelChanges(model);
                    that._closeEditable();
                }
            }
        },

        _crudHandlers: function() {
            var that = this,
                touchstartNs = TOUCHSTART + NS,
                clickNs = CLICK + NS;

            that.content.on(touchstartNs + " " + clickNs, ".k-edit-button", function(e) {
                e.preventDefault();
                var item = $(this).closest("[" + kendo.attr("uid") + "]");
                setTimeout(function() {
                    that.edit(item);
                });
            });


            that.content.on(touchstartNs + " " + clickNs, ".k-delete-button", function(e) {
                e.preventDefault();
                var item = $(this).closest("[" + kendo.attr("uid") + "]");
                 setTimeout(function() {
                    that.remove(item);
                 });
            });

            that.content.on(clickNs, ".k-update-button", function(e) {
                that.save();
                e.preventDefault();
            });

            that.content.on(clickNs, ".k-cancel-button", function(e) {
                that.cancel();
                e.preventDefault();
            });
        },

        destroy: function() {
            var that = this;

            Widget.fn.destroy.call(that);

            that._unbindDataSource();

            that._destroyEditable();

            that.element.off(NS);
            that.content.off(NS);

            that._endlessFetchInProgress = that._endlessPageSize = that._skipRerenderItemsCount = that._focusNext = null;

            if (that.pager) {
                that.pager.destroy();
            }

            kendo.destroy(that.element);
        }
    });

    kendo.ui.plugin(ListView);
})(window.kendo.jQuery);

