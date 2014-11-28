(function(f, define){
    define([ "./kendo.core" ], f);
})(function(){

var __meta__ = {
    id: "mobile.collapsible",
    name: "Collapsible",
    category: "mobile",
    description: "The Kendo mobile Collapsible widget provides ability for creating collapsible blocks of content.",
    depends: [ "core", "userevents" ]
};

(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.mobile.ui,
        Widget = ui.Widget,
        COLLAPSIBLE = "km-collapsible",
        HEADER = "km-collapsible-header",
        CONTENT = "km-collapsible-content",
        HEADER_WRAPPER = "<div data-role='collapsible-header' class='" + HEADER + "'></div>",
        CONTENT_WRAPPER = "<div data-role='collapsible-content' class='" + CONTENT + "'></div>";

    var Collapsible = Widget.extend({
        init: function(element, options) {
            var that = this,
                element = $(element);

            Widget.fn.init.call(that, element, options);

            element.addClass(COLLAPSIBLE);

            that.header = element.children(":first:header").wrap(HEADER_WRAPPER).parent();
            that.content = element.children().not(that.header).wrapAll(CONTENT_WRAPPER).parent();

            that._userEvents = new kendo.UserEvents(that.header, {
                press: function() { that.toggle(); }
            });

            if (that.options.collapsed) {
                that.content.hide();
            }
        },

        events: [

        ],

        options: {
            name: "Collapsible",
            collapsed: true
        },

        destroy: function() {
            Widget.fn.destroy.call(this);
            this._userEvents.destroy();
        },

        expand: function() {
            this.content.show();
        },

        collapse: function() {
            this.content.hide();
        },

        toggle: function() {
            if (this.isCollapsed()) {
                this.expand();
            } else {
                this.collapse();
            }
        },

        isCollapsed: function() {
            return this.content.is(":hidden");
        }
    });

    ui.plugin(Collapsible);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
