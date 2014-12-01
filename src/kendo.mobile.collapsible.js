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
        CONTENT_WRAPPER = "<div data-role='collapsible-content' class='" + CONTENT + "'></div>",

        //events
        EXAPND = "expand",
        COLLAPSE = "collapse";

    var Collapsible = Widget.extend({
        init: function(element, options) {
            var that = this,
                element = $(element);

            Widget.fn.init.call(that, element, options);

            element.addClass(COLLAPSIBLE);

            that._buildHeader();
            that.content = element.children().not(that.header).wrapAll(CONTENT_WRAPPER).parent();

            that._userEvents = new kendo.UserEvents(that.header, {
                press: function() { that.toggle(); }
            });

            if (that.options.collapsed) {
                that.content.hide();
            }
        },

        events: [
            EXAPND,
            COLLAPSE
        ],

        options: {
            name: "Collapsible",
            collapsed: true,
            collapseIcon: "minus",
            expandIcon: "plus"
        },

        destroy: function() {
            Widget.fn.destroy.call(this);
            this._userEvents.destroy();
        },

        expand: function() {
            var icon = this.options.collapseIcon;

            if (!this.trigger(EXAPND)) {
                if (icon) {
                    this.header.find(".km-icon").removeClass().addClass("km-icon km-" + icon);
                }
                this.content.show();
            }
        },

        collapse: function() {
            var icon = this.options.expandIcon;

            if (!this.trigger(COLLAPSE)) {
                if (icon) {
                    this.header.find(".km-icon").removeClass().addClass("km-icon km-" + icon);
                }
                this.content.hide();
            }
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
        },

        _buildHeader: function() {
            var header = this.element.children(":header").wrapAll(HEADER_WRAPPER),
                iconSpan = $('<span class="km-icon"/>'),
                icon = this.options.collapsed ? this.options.expandIcon : this.options.collapseIcon;

            if (icon) {
                header.prepend(iconSpan);
                iconSpan.addClass("km-" + icon);
            }

            this.header = header.parent();
        }
    });

    ui.plugin(Collapsible);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
