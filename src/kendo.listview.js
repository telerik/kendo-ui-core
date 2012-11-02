(function($, undefined) {
    var kendo = window.kendo,
        CHANGE = "change",
        DATABOUND = "dataBound",
        DATABINDING = "dataBinding",
        Widget = kendo.ui.Widget,
        keys = kendo.keys,
        FOCUSSELECTOR =  ">*",
        REQUESTSTART = "requestStart",
        ERROR = "error",
        FOCUSED = "k-state-focused",
        FOCUSABLE = "k-focusable",
        SELECTED = "k-state-selected",
        KEDITITEM = "k-edit-item",
        STRING = "string",
        EDIT = "edit",
        REMOVE = "remove",
        SAVE = "save",
        CLICK = "click",
        NS = ".kendoListView",
        proxy = $.proxy,
        progress = kendo.ui.progress,
        DataSource = kendo.data.DataSource;

    var ListView = Widget.extend( {
        init: function(element, options) {
            var that = this;

            options = $.isArray(options) ? { dataSource: options } : options;

            Widget.fn.init.call(that, element, options);

            options = that.options;

            that.wrapper = that.element;

            that._element();

            that._dataSource();

            that.template = kendo.template(options.template || "");
            that.altTemplate = kendo.template(options.altTemplate || options.template);
            that.editTemplate = kendo.template(options.editTemplate || "");

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

        items: function() {
            return this.element.find(FOCUSSELECTOR);
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
                            .unbind(REQUESTSTART, that._requestStartHandler)
                            .unbind(ERROR, that._errorHandler);
        },

        _dataSource: function() {
            var that = this;

            if (that.dataSource && that._refreshHandler) {
                that._unbindDataSource();
            } else {
                that._refreshHandler = proxy(that.refresh, that);
                that._requestStartHandler = proxy(that._requestStart, that);
                that._errorHandler = proxy(that._error, that);
            }

            that.dataSource = DataSource.create(that.options.dataSource)
                                .bind(CHANGE, that._refreshHandler)
                                .bind(REQUESTSTART, that._requestStartHandler)
                                .bind(ERROR, that._errorHandler);
        },

        _requestStart: function() {
            progress(this.element, true);
        },

        _error: function() {
            progress(this.element, false);
        },

        _element: function() {
            this.element.addClass("k-widget k-listview");
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
                altTemplate = that.altTemplate;

            if (e && e.action === "itemchange") {
                if (!that.editable) {
                    data = e.items[0];
                    idx = $.inArray(data, view);

                    if (idx >= 0) {
                        item = $(template(data)).attr(kendo.attr("uid"), data.uid);
                        that.items().eq(idx).replaceWith(item);

                        that.trigger("itemChange", {
                            item: item,
                            data: data
                        });
                    }
                }

                return;
            }

            e = e || {};

            if (that.trigger(DATABINDING, { action: e.action || "rebind", items: e.items, index: e.index })) {
                return;
            }

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
                items.eq(idx).attr(kendo.attr("uid"), view[idx].uid);
            }

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
                multi = typeof selectable === STRING && selectable.toLowerCase().indexOf("multiple") > -1;

                that.selectable = new kendo.ui.Selectable(that.element, {
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
                            e.preventDefault();
                            if(multi) {
                                if(!e.ctrlKey) {
                                    that.selectable.clear();
                                } else {
                                    if(current.hasClass(SELECTED)) {
                                        current.removeClass(SELECTED);
                                        current = null;
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

        current: function(element) {
            var that = this,
                current = that._current;

            if (element !== undefined && element.length) {
                if (!current || current[0] !== element[0]) {
                    element.addClass(FOCUSED);
                    if (current) {
                        current.removeClass(FOCUSED);
                    }
                    that._current = element;
                }
            }

            return that._current;
        },

        _navigatable: function() {
            var that = this,
                navigatable = that.options.navigatable,
                element = that.element,
                currentProxy = proxy(that.current, that),
                clickCallback = function(e) {
                    currentProxy($(e.currentTarget));
                    if(!$(e.target).is(":button,a,:input,a>.k-icon,textarea")) {
                        element.focus();
                    }
                };

            if (navigatable) {
                element.attr("tabIndex", Math.max(element.attr("tabIndex") || 0, 0));
                element.on("focus" + NS, function() {
                        var current = that._current;
                        if(current && current.is(":visible")) {
                            current.addClass(FOCUSED);
                        } else {
                            currentProxy(element.find(FOCUSSELECTOR).first());
                        }
                    })
                    .on("focusout" + NS, function() {
                        if (that._current) {
                            that._current.removeClass(FOCUSED);
                        }
                    })
                    .on("keydown" + NS, function(e) {
                        var key = e.keyCode,
                            current = that.current();

                        if (keys.UP === key) {
                            that.current(current ? current.prev() : element.find(FOCUSSELECTOR).first());
                        } else if (keys.DOWN === key) {
                            that.current(current ? current.next() : element.find(FOCUSSELECTOR).first());
                        } else if (keys.PAGEUP == key) {
                            that._current = null;
                            that.dataSource.page(that.dataSource.page() - 1);
                        } else if (keys.PAGEDOWN == key) {
                            that._current = null;
                            that.dataSource.page(that.dataSource.page() + 1);
                        }
                    });

                element.addClass(FOCUSABLE).on("mousedown" + NS, "." + FOCUSABLE + FOCUSSELECTOR, clickCallback);
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
               container,
               valid = true;

           if (editable) {
               if (validate) {
                   valid = editable.end();
               }

               if (valid) {
                   data = that._modelFromElement(editable.element);
                   container = $(that.template(data)).attr(kendo.attr("uid"), data.uid);
                   that._destroyEditable();
                   editable.element.replaceWith(container);
               }
           }

           return valid;
       },

       edit: function(item) {
           var that = this,
               data = that._modelFromElement(item),
               container = $(that.editTemplate(data)).addClass(KEDITITEM);

            that.cancel();
            container.attr(kendo.attr("uid"), data.uid);
            item.replaceWith(container);
            that.editable = container.kendoEditable({ model: data, clearContainer: false, errorTemplate: false }).data("kendoEditable");

            that.trigger(EDIT, { model: data, item: container });
       },

       save: function() {
           var that = this,
               editable = that.editable.element,
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
               dataSource.cancelChanges(that._modelFromElement(that.editable.element));
               that._closeEditable(false);
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

           if (that.selectable) {
               that.selectable.destroy();
           }

           kendo.destroy(that.element);
       }
    });

    kendo.ui.plugin(ListView);
})(jQuery);
