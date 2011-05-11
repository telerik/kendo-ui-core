(function($, window) {
    var kendo = window.kendo,
        CHANGE = "change",
        DATABOUND = "dataBound"
        Component = kendo.ui.Component,
        keys = kendo.keys,
        FOCUSSELECTOR =  "> li",
        CHANGE = "change",
        FOCUSED = "t-state-focused",
        FOCUSABLE = "t-focusable",

        DataSource = kendo.data.DataSource;


    function ListView(element, options) {
        var that = this;

        options = $.isArray(options) ? { data: options } : options;

        Component.apply(that, arguments);

        that.bind([CHANGE,DATABOUND], options);

        that._dataSource();

        that.template = kendo.template(that.options.template);

        that._selection();

        that._navigation();

        that.dataSource.read();
    }

    ListView.prototype = {
        options: {
            template: ""
        },
        _dataSource: function() {
            var that = this,
                options = that.options,
                dataSource = options.dataSource;

            if ($.isPlainObject(dataSource) && options.data) {
                dataSource.data = options.data;
            }

            that.dataSource = DataSource.create(dataSource);
            that.dataSource.bind(CHANGE, $.proxy(that._render, that));
        },
        _render: function() {
            var that = this,
                data = that.dataSource.view(),
                html = kendo.render(that.template, data);

            that.element.html(html);

            that.trigger(DATABOUND);
        },
        _selection: function() {
            var that = this;
            that.selectable = new kendo.ui.Selectable(that.element, {
                change: function() {
                    that.trigger(CHANGE);
                }
            });
            that.element.keydown(function(e) {
                if (e.keyCode === kendo.keys.SPACEBAR) {

                    that.selectable.clear();

                    that.selectable.value(that.focused());
                }
            });

        },
        focused: function(element) {
            var that = this,
                focused = that._focused;

            if(element !== undefined && element[0]) {
                if (!focused || focused[0] !== element[0]) {
                    element.addClass(FOCUSED);
                    if (focused) {
                        focused.removeClass(FOCUSED);
                    }
                    that._focused = element;
                }
            } else {
                return that._focused;
            }
        },
        _navigation: function() {
            var that = this,
                element = that.element;

            element.attr("tabIndex", Math.max(element.attr("tabIndex") || 0, 0));
            element.bind({
                focus: function() {
                    that.focused(element.find(FOCUSSELECTOR).first());
                },
                blur: function() {
                    if (that._focused) {
                        that._focused.removeClass(FOCUSED);
                        that._focused = null;
                    }
                },
                keydown: function(e) {
                    var key = e.keyCode,
                        focused = that.focused();

                    if (keys.UP === key) {
                        that.focused(focused ? focused.prev() : element.find(FOCUSSELECTOR).first());
                    } else if (keys.DOWN === key) {
                        that.focused(focused ? focused.next() : element.find(FOCUSSELECTOR).first());
                    } else if (keys.PAGEUP == key) {
                        that._focused = null;
                        that.dataSource.page(that.dataSource.page() + 1);
                    } else if (keys.PAGEDOWN == key) {
                        that._focused = null;
                        that.dataSource.page(that.dataSource.page() - 1);
                    }
                }
            });

            element.addClass(FOCUSABLE)
                  .delegate("." + FOCUSABLE + FOCUSSELECTOR, "mousedown", function(e) {
                      that.focused($(e.currentTarget));
                  });
       },
       selected: function() {
           return this.selectable.value();
       }
    };

    kendo.ui.plugin("ListView", ListView, Component);
})(jQuery, window);
