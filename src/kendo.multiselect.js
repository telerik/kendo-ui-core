kendo_module({
    id: "combobox",
    name: "ComboBox",
    category: "web",
    description: "The ComboBox widget allows the selection from pre-defined values or entering a new value.",
    depends: [ "list" ]
});

(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget;

    var MultiSelect = Widget.extend({

        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            that._wrapper();
            that._list();
            that._input();

            that.element.hide();
        },

        options: {
            name: "MultiSelect"
        },

        events: [

        ],

        destroy: function() {

        },

        _input: function() {
            this.input = $('<input class="k-input" style="width: 100%" />')
                            .appendTo(this._innerWraper);
        },

        _list: function() {
            this.list = $('<ul unselectable="on" class="k-list k-reset"/>')
                            .appendTo(this._innerWraper);
        },

        _wrapper: function() {
            var that = this,
                element = that.element,
                wrapper = element.parent("span.k-multiselect");

            if (!wrapper[0]) {
                wrapper = element.wrap('<div class="k-widget k-multiselect k-header" />').parent();
                wrapper[0].style.cssText = element[0].style.cssText;

                $('<div class="k-multiselect-wrap" />').insertBefore(element);
            }

            that.wrapper = wrapper.addClass(element[0].className)
                                  .css("display", "");

            that._innerWraper = $(wrapper[0].firstChild);
        }
    });

    ui.plugin(MultiSelect);

})(window.kendo.jQuery);
