(function(f, define){
    define([ "./kendo.core" ], f);
})(function(){

var __meta__ = {
    id: "maskinput",
    name: "MaskInput",
    category: "web",
    description: "The MaskInput widget allows to specify a mask type on an input field.",
    depends: [ "core" ]
};

(function($, undefined) {
    var kendo = window.kendo;
    var ui = kendo.ui;
    var Widget = ui.Widget;

    var MaskInput = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            that._wrapper();
        },

        options: {
            name: "MaskInput"
        },

        events: [],

        _wrapper: function() {
            var element = this.element;
            var DOMelement = element[0];
            var wrapper = element.parent("span.k-widget");

            if (!wrapper[0]) {
                wrapper = element.wrap("<span />").parent();
            }

            wrapper[0].style.cssText = DOMelement.style.cssText;
            wrapper.attr({
                tabindex: -1,
                role: "presentation"
            });

            element.css({
                width: "100%",
                height: DOMelement.style.height
            });

            this.wrapper = wrapper
                            .addClass("k-widget k-maskinput k-header")
                            .addClass(DOMelement.className);
        }
    });

    ui.plugin(MaskInput);

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
