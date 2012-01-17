(function($, undefined) {
    var kendo = window.kendo,
        CHANGE = "change",
        DATABOUND = "dataBound",
        Widget = kendo.ui.Widget,
        keys = kendo.keys,
        FOCUSSELECTOR =  ">*",
        CHANGE = "change",
        FOCUSED = "k-state-focused",
        FOCUSABLE = "k-focusable",
        SELECTED = "k-state-selected",
        STRING = "string",
        CLICK = "click",
        proxy = $.proxy,
        DataSource = kendo.data.DataSource;

    var ListView = Widget.extend( {
        init: function(element, options) {
            var that = this;

            options = $.isArray(options) ? { data: options } : options;

            Widget.fn.init.call(that, element, options);

            that.bind([CHANGE,DATABOUND], options);

            that._dataSource();

            that.template = kendo.template(options.template);
            that.altTemplate = kendo.template(options.altTemplate || options.template);

            that._navigatable();

            that._selectable();

            if(that.options.autoBind){
                that.dataSource.fetch();
            }
        },
        options: {
            name: "ListView",
            autoBind: true,
            template: ""
        },

        _dataSource: function() {
            var that = this;

            that.dataSource = DataSource.create(that.options.dataSource).bind(CHANGE, proxy(that.refresh, that));
        },

        refresh: function() {
            var that = this,
                data = that.dataSource.view(),
                html = "",
                idx,
                length,
                template = that.template,
                altTemplate = that.altTemplate;

            for (idx = 0, length = data.length; idx < length; idx++) {
                if (idx % 2) {
                    html += altTemplate(data[idx]);
                } else {
                    html += template(data[idx]);
                }
            }

            that.element.html(html);

            that.trigger(DATABOUND);
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
                    that.element.keydown(function(e) {
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
                element.bind({
                    focus: function() {
                        var current = that._current;
                        if(current && current.is(":visible")) {
                            current.addClass(FOCUSED);
                        } else {
                            currentProxy(element.find(FOCUSSELECTOR).first());
                        }
                    },
                    focusout: function() {
                        if (that._current) {
                            that._current.removeClass(FOCUSED);
                        }
                    },
                    keydown: function(e) {
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
                    }
                });

                element.addClass(FOCUSABLE).delegate("." + FOCUSABLE + FOCUSSELECTOR, "mousedown", clickCallback);
            }
       },

        /**
         * Clears currently selected items.
         */
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
       }
    });

    kendo.ui.plugin(ListView);
})(jQuery);
