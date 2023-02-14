import "./kendo.html.base.js";

var __meta__ = {
    id: "html.chiplist",
    name: "Html.ChipList",
    category: "web",
    description: "HTML rendering utility for Kendo UI for jQuery.",
    depends: [ "html.base" ],
    features: []
};

(function($, undefined) {
    var kendo = window.kendo,
        HTMLBase = kendo.html.HTMLBase;

    var renderChipList = function(element, options) {
        if (arguments[0] === undefined || $.isPlainObject(arguments[0])) {
            options = element;
            element = $("<div></div>");
        }

        return (new HTMLChipList(element, options)).html();
    };

    var HTMLChipList = HTMLBase.extend({
        init: function(element, options) {
            var that = this;
            HTMLBase.fn.init.call(that, element, options);
            that.wrapper = that.element.addClass("k-chip-list");
            that._addClasses();
        },
        options: {
            name: "HTMLChipList",
            size: "medium",
            stylingOptions: [ "size" ]
        }
    });

    $.extend(kendo.html, {
        renderChipList: renderChipList,
        HTMLChipList: HTMLChipList
    });

    kendo.cssProperties.registerPrefix("HTMLChipList", "k-chip-list-");

})(window.kendo.jQuery);

