(function(f, define){
    define([ "./image" ], f);
})(function(){

(function($, undefined) {

var kendo = window.kendo,
    DropDownList = kendo.ui.DropDownList,
    dom = kendo.ui.editor.Dom;

var SelectBox = DropDownList.extend({
    init: function(element, options) {
        var that = this;

        DropDownList.fn.init.call(that, element, options);

        // overlay drop-down with popout for snappier interaction
        if (kendo.support.mobileOS.ios) {
            this._initSelectOverlay();
            this.bind("dataBound", $.proxy(this._initSelectOverlay, this));
        }

        that.value(that.options.title);

        that.bind("open", function() {
            if (that.options.autoSize) {
                var list = that.list,
                    listWidth;

                list.css({
                        whiteSpace: "nowrap",
                        width: "auto"
                    });

                listWidth = list.width();

                if (listWidth) {
                    listWidth += 20;
                } else {
                    listWidth = that._listWidth;
                }

                list.css("width", listWidth + kendo.support.scrollbar());

                that._listWidth = listWidth;
            }
        });
    },
    options: {
        name: "SelectBox"
    },

    _initSelectOverlay: function() {
        var selectBox = this;
        var value = selectBox.value();
        var view = this.dataSource.view();
        var item;
        var html = "";
        var encode = kendo.htmlEncode;

        for (var i = 0; i < view.length; i++) {
            item = view[i];

            html += "<option value='" + encode(item.value) + "'";

            if (item.value == value) {
                html += " selected";
            }

            html += ">" + encode(item.text) + "</option>";
        }

        var select = $("<select class='k-select-overlay'>" + html + "</select>");
        var wrapper = $(this.element).closest(".k-widget");

        wrapper.next(".k-select-overlay").remove();

        select.insertAfter(wrapper);

        select.on("change", function() {
            selectBox.value(this.value);
            selectBox.trigger("change");
        });
    },

    value: function(value) {
        var that = this,
            result = DropDownList.fn.value.call(that, value);

        if (value === undefined) {
            return result;
        }

        if (value !== DropDownList.fn.value.call(that)) {
           that.text(that.options.title);

           if (that._current) {
               that._current.removeClass("k-state-selected");
           }

           that.current(null);
           that._oldIndex = that.selectedIndex = -1;
        }
    },

    decorate: function(body) {
        var that = this,
            dataSource = that.dataSource,
            items = dataSource.data(),
            i, tag, className, style;

        if (body) {
            that.list.css("background-color", dom.getEffectiveBackground($(body)));
        }

        for (i = 0; i < items.length; i++) {
            tag = items[i].tag || "span";
            className = items[i].className;

            style = dom.inlineStyle(body, tag, { className : className });

            style = style.replace(/"/g, "'");

            items[i].style = style + ";display:inline-block";
        }

        dataSource.trigger("change");
    }
});


kendo.ui.plugin(SelectBox);
kendo.ui.editor.SelectBox = SelectBox;

})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
