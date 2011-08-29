(function($, undefined) {
    var kendo = window.kendo,
        CHANGE = "change",
        DATABOUND = "dataBound"
        Component = kendo.ui.Component,
        keys = kendo.keys,
        FOCUSSELECTOR =  "> li",
        CHANGE = "change",
        FOCUSED = "k-state-focused",
        FOCUSABLE = "k-focusable",
        DataSource = kendo.data.DataSource;

    var ListView = Component.extend( {
        init: function(element, options) {
            var that = this;

            options = $.isArray(options) ? { data: options } : options;

            Component.fn.init.call(that, element, options);

            that.bind([CHANGE,DATABOUND], options);

            that._dataSource();

            that.template = kendo.template(that.options.template);

            that._selection();

            that._navigation();

            if(that.options.autoBind){
                that.dataSource.query();
            }
        },
        options: {
            autoBind: true,
            template: ""
        },

        _dataSource: function() {
            var that = this;

            that.dataSource = DataSource.create(that.options.dataSource).bind(CHANGE, $.proxy(that.refresh, that));
        },

        refresh: function() {
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

                    that.selectable.value(that.current());
                }
            });

        },

        current: function(element) {
            var that = this,
                current = that._current;

            if(element !== undefined && element[0]) {
                if (!current || current[0] !== element[0]) {
                    element.addClass(FOCUSED);
                    if (current) {
                        current.removeClass(FOCUSED);
                    }
                    that._current = element;
                }
            } else {
                return that._current;
            }
        },

        _navigation: function() {
            var that = this,
                element = that.element;

            element.attr("tabIndex", Math.max(element.attr("tabIndex") || 0, 0));
            element.bind({
                focus: function() {
                    that.current(element.find(FOCUSSELECTOR).first());
                },
                blur: function() {
                    if (that._current) {
                        that._current.removeClass(FOCUSED);
                        that._current = null;
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
                        that.dataSource.page(that.dataSource.page() + 1);
                    } else if (keys.PAGEDOWN == key) {
                        that._current = null;
                        that.dataSource.page(that.dataSource.page() - 1);
                    }
                }
            });

            element.addClass(FOCUSABLE)
                  .delegate("." + FOCUSABLE + FOCUSSELECTOR, "mousedown", function(e) {
                      that.current($(e.currentTarget));
                  });
       },
       selected: function() {
           return this.selectable.value();
       }
    });

    kendo.ui.plugin("ListView", ListView);
})(jQuery);
