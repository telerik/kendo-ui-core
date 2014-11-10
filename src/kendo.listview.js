(function(f, define){
    define([ "./kendo.data", "./kendo.editable", "./kendo.selectable" ], f);
})(function(){

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
    } ]
};

(function($, undefined) {
    var kendo = window.kendo,
        CHANGE = "change",
        CANCEL = "cancel",
        DATABOUND = "dataBound",
        DATABINDING = "dataBinding",
        Widget = kendo.ui.Widget,
        keys = kendo.keys,
        FOCUSSELECTOR =  ">*",
        PROGRESS = "progress",
        ERROR = "error",
        FOCUSED = "k-state-focused",
        SELECTED = "k-state-selected",
        KEDITITEM = "k-edit-item",
        STRING = "string",
        EDIT = "edit",
        REMOVE = "remove",
        SAVE = "save",
        CLICK = "click",
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

            that._dataSource();

            that._templates();

            that._navigatable();

            that._selectable();

            that._pageable();

            that._crudHandlers();

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
            SAVE
        ],

        options: {
            name: "ListView",
            autoBind: true,
            selectable: false,
            navigatable: false,
            template: "",
            altTemplate: "",
            editTemplate: ""
        },

        setOptions: function(options) {
            Widget.fn.setOptions.call(this, options);

            this._templates();
        },

        _templates: function() {
            var options = this.options;

            this.template = kendo.template(options.template || "");
            this.altTemplate = kendo.template(options.altTemplate || options.template);
            this.editTemplate = kendo.template(options.editTemplate || "");
        },

        _item: function(action) {
            return this.element.children()[action]();
        },

        items: function() {
            return this.element.children();
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

        _progress: function() {
            progress(this.element, true);
        },

        _error: function() {
            progress(this.element, false);
        },

        _element: function() {
            this.element.addClass("k-widget k-listview").attr("role", "listbox");
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
                active = activeElement();

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

            that._destroyEditable();

            for (idx = 0, length = view.length; idx < length; idx++) {
                if (idx % 2) {
                    html += altTemplate(view[idx]);
                } else {
                    html += template(view[idx]);
                }
            }

            that.element.html(html);

            items = that.items();
            for (idx = 0, length = view.length; idx < length; idx++) {
                items.eq(idx).attr(kendo.attr("uid"), view[idx].uid)
                             .attr("role", "option")
                             .attr("aria-selected", "false");
            }

            if (that.element[0] === active && that.options.navigatable) {
                that.current(items.eq(0));
            }

            that._angularItems("compile");

            that.trigger(DATABOUND);
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
                    filter: FOCUSSELECTOR,
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
                            if(multi) {
                                if(!e.ctrlKey) {
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
                container,
                UseJQueryoffset = false,
                SCROLL = "scroll";

            if (that.wrapper.css("overflow") == "auto" || that.wrapper.css("overflow") == SCROLL) {
                container = that.wrapper[0];
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
                clickCallback = function(e) {
                    that.current($(e.currentTarget));
                    if(!$(e.target).is(":button,a,:input,a>.k-icon,textarea")) {
                        element.focus();
                    }
                };

            if (navigatable) {
                that._tabindex();
                element.on("focus" + NS, function() {
                        var current = that._current;
                        if(!current || !current.is(":visible")) {
                            current = that._item("first");
                        }

                        that.current(current);
                    })
                    .on("focusout" + NS, function() {
                        if (that._current) {
                            that._current.removeClass(FOCUSED);
                        }
                    })
                    .on("keydown" + NS, function(e) {
                        var key = e.keyCode,
                            current = that.current(),
                            target = $(e.target),
                            canHandle = !target.is(":button,textarea,a,a>.t-icon,input"),
                            isTextBox = target.is(":text"),
                            preventDefault = kendo.preventDefault,
                            editItem = element.find("." + KEDITITEM),
                            active = activeElement(), idx;

                        if ((!canHandle && !isTextBox && keys.ESC != key) || (isTextBox && keys.ESC != key && keys.ENTER != key)) {
                            return;
                        }

                        if (keys.UP === key || keys.LEFT === key) {
                            if (current) {
                                current = current.prev();
                            }

                            that.current(!current || !current[0] ? that._item("last") : current);
                            preventDefault(e);
                        } else if (keys.DOWN === key || keys.RIGHT === key) {
                            if (current) {
                                current = current.next();
                            }
                            that.current(!current || !current[0] ? that._item("first") : current);
                            preventDefault(e);
                        } else if (keys.PAGEUP === key) {
                            that.current(null);
                            that.dataSource.page(that.dataSource.page() - 1);
                            preventDefault(e);
                        } else if (keys.PAGEDOWN === key) {
                            that.current(null);
                            that.dataSource.page(that.dataSource.page() + 1);
                            preventDefault(e);
                        } else if (keys.HOME === key) {
                            that.current(that._item("first"));
                            preventDefault(e);
                        } else if (keys.END === key) {
                            that.current(that._item("last"));
                            preventDefault(e);
                        } else if (keys.ENTER === key) {
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
                        } else if (keys.ESC === key) {
                            editItem = element.find("." + KEDITITEM);
                            if (editItem.length === 0) {
                                return;
                            }
                            idx = that.items().index(editItem);
                            that.cancel();
                            that.element.trigger("focus");
                            that.current(that.items().eq(idx));
                        }
                    });

                element.on("mousedown" + NS + " touchstart" + NS, FOCUSSELECTOR, proxy(clickCallback, that));
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
            if(items.length) {
                if(!selectable.options.multiple) {
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

       _closeEditable: function(validate) {
           var that = this,
               editable = that.editable,
               data,
               item,
               index,
               template = that.template,
               valid = true;

           if (editable) {
               if (validate) {
                   valid = editable.end();
               }

               if (valid) {
                   if (editable.element.index() % 2) {
                       template = that.altTemplate;
                   }

                   data = that._modelFromElement(editable.element);
                   that._destroyEditable();

                   index = editable.element.index();
                   editable.element.replaceWith(template(data));
                   item = that.items().eq(index);
                   item.attr(kendo.attr("uid"), data.uid);

                   if (that._hasBindingTarget()) {
                        kendo.bind(item, data);
                   }
               }
           }

           return valid;
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

           editable = editable.element;
           model = that._modelFromElement(editable);

           if (!that.trigger(SAVE, { model: model, item: editable }) && that._closeEditable(true)) {
               that.dataSource.sync();
           }
       },

       remove: function(item) {
           var that = this,
               dataSource = that.dataSource,
               data = that._modelFromElement(item);

           if (!that.trigger(REMOVE, { model: data, item: item })) {
               item.hide();
               dataSource.remove(data);
               dataSource.sync();
           }
       },

       add: function() {
           var that = this,
               dataSource = that.dataSource,
               index = dataSource.indexOf((dataSource.view() || [])[0]);

           if (index < 0) {
               index = 0;
           }

           that.cancel();
           dataSource.insert(index, {});
           that.edit(that.element.children().first());
       },

       cancel: function() {
           var that = this,
               dataSource = that.dataSource;

           if (that.editable) {
               var container = that.editable.element;
               var model = that._modelFromElement(container);

               if (!that.trigger(CANCEL, { model: model, container: container})) {
                   dataSource.cancelChanges(model);
                   that._closeEditable(false);
               }
           }
       },

       _crudHandlers: function() {
           var that = this,
               clickNS = CLICK + NS;

           that.element.on(clickNS, ".k-edit-button", function(e) {
               var item = $(this).closest("[" + kendo.attr("uid") + "]");
               that.edit(item);
               e.preventDefault();
           });

           that.element.on(clickNS, ".k-delete-button", function(e) {
               var item = $(this).closest("[" + kendo.attr("uid") + "]");
               that.remove(item);
               e.preventDefault();
           });

           that.element.on(clickNS, ".k-update-button", function(e) {
               that.save();
               e.preventDefault();
           });

           that.element.on(clickNS, ".k-cancel-button", function(e) {
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

           if (that.pager) {
               that.pager.destroy();
           }

           kendo.destroy(that.element);
       }
    });

    kendo.ui.plugin(ListView);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
