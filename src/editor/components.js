(function($, undefined) {

var kendo = window.kendo,
    DropDownList = kendo.ui.DropDownList,
    dom = kendo.ui.editor.Dom;

var SelectBox = DropDownList.extend({
    init: function(element, options) {
        var that = this;

        DropDownList.fn.init.call(that, element, options);

        that.value(that.options.title);

        // overlay drop-down with popout for snappier interaction
        if (kendo.support.mobileOS.ios) {
            that._initSelectOverlay(element);
        }

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

    _initSelectOverlay: function(element) {
        element = $(element);

        var select = $("<select class='k-select-overlay' />");
        var wrapper = element.closest(".k-widget");
        var selectBox = element.data(this.type).kendoSelectBox;

        select.on("change", function() {
            selectBox.value(this.value);
            selectBox.trigger("change");
        });

        this.bind("dataBound", function() {
            var value = selectBox.value();
            var view = this.dataSource.view();
            var item;
            var html = "";

            for (var i = 0; i < view.length; i++) {
                item = view[i];

                html += "<option value='" + item.value + "'";

                if (item.value == value) {
                    html += " selected";
                }

                html += ">" + item.text + "</option>";
            }

            select.html(html);
        });

        select.insertAfter(wrapper);
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

    decorate: function(doc) {
        var items = this.dataSource.data(),
            i, tag, className;

        for (i = 0; i < items.length; i++) {
            tag = items[i].tag || "span";
            className = items[i].className;

            items[i].style = dom.inlineStyle(doc, tag, { className : className }) + ";display:inline-block";
        }

        this.dataSource.trigger("change");
    }
});


kendo.ui.plugin(SelectBox);
kendo.ui.editor.SelectBox = SelectBox;

})(window.kendo.jQuery);
