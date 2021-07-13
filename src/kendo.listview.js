(function(f, define){
    define([ "./kendo.data", "./kendo.editable", "./kendo.selectable" ], f);
})(function(){

var __meta__ = { // jshint ignore:line
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
        FOCUSSELECTOR = "> *:not(.k-loading-mask)",
        PROGRESS = "progress",
        ERROR = "error",
        FOCUSED = "k-state-focused",
        SELECTED = "k-state-selected",
        KEDITITEM = "k-edit-item",
        EDIT = "edit",
        REMOVE = "remove",
        SAVE = "save",
        MOUSEDOWN = "mousedown",
        CLICK = "click",
        TOUCHSTART = "touchstart",
        NS = ".kendoListView",
        proxy = $.proxy,
        activeElement = kendo._activeElement,
        progress = kendo.ui.progress,
        DataSource = kendo.data.DataSource;

    var ListView = kendo.ui.DataBoundWidget.extend( {
        init: function(element, options) {
            var that = this;

            options = $.isArray(options) ? { dataSource: options } : options;

            Widget.fn.init.call(that, element, options);

            options = that.options;

            that.wrapper = element = that.element;

            if (element[0].id) {
                that._itemId = element[0].id + "_lv_active";
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

            if (that.options.autoBind){
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
            autoBind: true,
            selectable: false,
            navigatable: false,
            height: null,
            template: EMPTY_STRING,
            altTemplate: EMPTY_STRING,
            editTemplate: EMPTY_STRING,
            contentTemplate: "<div data-content='true' />",
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

            this.template = kendo.template(options.template || EMPTY_STRING);
            this.altTemplate = kendo.template(options.altTemplate || options.template);
            this.editTemplate = kendo.template(options.editTemplate || EMPTY_STRING);
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
            var that = this;

            if (that.dataSource && that._refreshHandler) {
                that._unbindDataSource();
            } else {
                that._refreshHandler = proxy(that.refresh, that);
                that._progressHandler = proxy(that._progress, that);
                that._errorHandler = proxy(that._error, that);
            }

            that.dataSource = DataSource.create(that.options.dataSource)
                                .bind(CHANGE, that._refreshHandler)
                                .bind(PROGRESS, that._progressHandler)
                                .bind(ERROR, that._errorHandler);
        },

        _progress: function(toggle) {
            var element = this.content;
            progress(element, toggle, { opacity: true});
        },

        _error: function() {
            progress(this.content, false);
        },

        _element: function() {
            var options = this.options;
            var height = options.height;

            this.element.addClass("k-widget k-listview");

            if (options.navigatable || options.selectable) {
                this.element.attr("role", "listbox");
            } else {
                this.element.attr("role", "list");
            }

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
            var elementClassNames = ["k-widget", "k-listview"];
            var content = that.content;
            var contentClassNames = ["k-listview-content"];

            element.add(content).removeClass(function (index, className) {
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
                role = (options.selectable || options.navigatable) ? "option" : "listitem",
                active = activeElement(),
                endlessAppend =  that._endlessFetchInProgress,
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
                            return { elements: [ item ]};
                        });

                        item.replaceWith(template(data));
                        item = that.items().eq(idx);
                        item.attr(kendo.attr("uid"), data.uid);

                        that.angular("compile", function() {
                            return { elements: [ item ], data: [ { dataItem: data } ]};
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

            for (idx = index, length = view.length; idx < length; idx++) {
                item = items.eq(idx);
                item.attr(kendo.attr("uid"), view[idx].uid)
                    .attr("role", role);

                if (that.options.selectable) {
                    item.attr("aria-selected", "false");
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

            that._setContentHeight();
            that._angularItems("compile");

            that._progress(false);
            that._endlessFetchInProgress = null;

            that.trigger(DATABOUND, { action: e.action || "rebind", items: e.items, index: e.index });
        },

        _pageable: function() {
            var that = this,
                pageable = that.options.pageable,
                settings,
                pagerId;

            if ($.isPlainObject(pageable)) {
                pagerId = pageable.pagerId;
                settings = $.extend({}, pageable, {
                    dataSource: that.dataSource,
                    pagerId: null
                });

                that.pager = new kendo.ui.Pager($("#" + pagerId), settings);
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
                                        return;
                                    }
                                }
                            } else {
                                that.selectable.clear();
                            }

                            that.selectable.value(current);
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

        _bindScrollable: function (){
            var that = this;
            var originalPageSize = that._endlessPageSize = that.dataSource.options.pageSize;

            that.content
                .off("scroll" + NS)
                .on("scroll" + NS, function () {
                    if (this.scrollTop + this.clientHeight - this.scrollHeight >= -15 &&
                    !that._endlessFetchInProgress &&
                    that._endlessPageSize < that.dataSource.total()) {
                        that._skipRerenderItemsCount =  that._endlessPageSize;
                        that._endlessPageSize = that._skipRerenderItemsCount  + originalPageSize;
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
                element.removeAttr("aria-activedescendant");
            }

            if (candidate && candidate[0]) {
                id = candidate[0].id || id;

                that._scrollTo(candidate[0]);

                element.attr("aria-activedescendant", id);
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
                    if (!$(e.target).is(":button, a, :input, a > .k-icon, textarea")) {
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

                        if ((!canHandle && !isTextBox && key !== keys.ESC) || (isTextBox && key !== keys.ESC && key !== keys.ENTER)) {
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

                                var focusAgain = function(){
                                    that.element.trigger("focus");
                                    that.current(that.items().eq(idx));
                                };

                                that.one("dataBound", focusAgain);
                            } else if (that.options.editTemplate !== "") {
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

                element.on(MOUSEDOWN + NS + " " + TOUCHSTART + NS, that.options.contentElement ? ".k-listview-content " + FOCUSSELECTOR : FOCUSSELECTOR, proxy(clickCallback, that));
            }
        },

        clearSelection: function() {
            var that = this;
            that.selectable.clear();
            that.trigger(CHANGE);
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
                role = (options.selectable || options.navigatable) ? "option" : "listitem",
                data,
                item,
                index,
                template = that.template;

            if (editable) {
                if (editable.element.index() % 2) {
                    template = that.altTemplate;
                }

                that.angular("cleanup", function() {
                    return { elements: [ editable.element ]};
                });

                data = that._modelFromElement(editable.element);
                that._destroyEditable();

                index = editable.element.index();
                editable.element.replaceWith(template(data));
                item = that.items().eq(index);
                item.attr(kendo.attr("uid"), data.uid);
                item.attr("role", role);

                if (that._hasBindingTarget()) {
                    kendo.bind(item, data);
                }

                that.angular("compile", function() {
                    return { elements: [ item ], data: [ { dataItem: data } ]};
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

            if (editable.end() && !that.trigger(SAVE, { model: model, item: container }))  {
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

                if (!that.trigger(CANCEL, { model: model, container: container})) {
                    dataSource.cancelChanges(model);
                    that._closeEditable();
                }
            }
        },

        _crudHandlers: function() {
            var that = this,
                mousedownNs = MOUSEDOWN + NS,
                touchstartNs = TOUCHSTART + NS,
                clickNs = CLICK + NS;

            that.content.on(mousedownNs + " " + touchstartNs, ".k-edit-button", function(e) {
                e.preventDefault();
                var item = $(this).closest("[" + kendo.attr("uid") + "]");
                setTimeout(function() {
                    that.edit(item);
                });
            });


            that.content.on(mousedownNs + " " + touchstartNs, ".k-delete-button", function(e) {
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

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
