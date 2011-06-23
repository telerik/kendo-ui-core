(function ($, window) {
    var kendo = window.kendo,
        ui = kendo.ui,
        extend = $.extend,
        proxy = $.proxy,
        Component = ui.Component,
        OPEN = "open",
        CLOSE = "close",
        events = [ OPEN, CLOSE, "select", "init" ],
        MOUSEENTER = "mouseenter",
        MOUSELEAVE = "mouseleave",
        CLICK = "click",
        TIMER = "timer",
        IMG = "img",
        KENDOPOPUP = "kendoPopup",
        DEFAULTSTATE = "t-state-default",
        DISABLEDSTATE = "t-state-disabled",
        itemSelector = ".t-item:not(.t-state-disabled)",
        linkSelector = ".t-item:not(.t-state-disabled) > .t-link";

    function getEffectOptions(item) {
        var parent = item.parent();
        return {
            effects: parent.hasClass("t-menu") ? parent.hasClass("t-menu-vertical") ? "slideIn:right" : "slideIn:down" : "slideIn:right"
        };
    }

    function contains(parent, child) {
        try {
            return $.contains(parent, child);
        } catch (e) {
            return false;
        }
    }

    var Menu = Component.extend({
        init: function(element, options) {
            element = $(element);
            var that = this;

            Component.fn.init.call(that, element, options);

            options = that.options;

            that._updateClasses();

            if (options.animation === false) {
                options.animation = { open: { show: true, effects: {} }, close: { hide:true, effects: {} } };
            }

            that.nextItemZIndex = 100;

            element.delegate(itemSelector, MOUSEENTER, proxy(that._mouseenter, that))
                   .delegate(itemSelector, MOUSELEAVE, proxy(that._mouseleave, that))
                   .delegate(itemSelector, CLICK, proxy(that._click , that));

            element.delegate(linkSelector, MOUSEENTER + " " + MOUSELEAVE, that._toggleHover);

            $(document).click($.proxy( that._documentClick, that ));

            that.bind(events, that.options);
        },
        options: {
            animation: {
                open: {
                    duration: 200,
                    show: true
                },
                close: { // if close animation effects are defined, they will be used instead of open.reverse
                    duration: 100,
                    show: false,
                    hide: true
                }
            },
            orientation: "horizontal",
            openOnClick: false,
            hoverDelay: 100
        },

        toggle: function (element, enable) {
            $(element).each(function () {
                $(this)
                    .toggleClass(DEFAULTSTATE, enable)
                    .toggleClass(DISABLEDSTATE, !enable);
            });
        },

        enable: function (element) {
            this.toggle(element, true);
        },

        disable: function (element) {
            this.toggle(element, false);
        },

        open: function (element) {
            var that = this;

            $(element).each(function () {
                var li = $(this);

                clearTimeout(li.data(TIMER));

                li.data(TIMER, setTimeout(function () {
                    var ul = li.find(".t-group:first:hidden"), popup;

                    if (ul[0]) {
                        li.css("z-index", that.nextItemZIndex ++);

                        popup = ul.data(KENDOPOPUP);
                        var parentHorizontal = li.parent().hasClass("t-menu-horizontal");

                        if (!popup) {
                            popup = ul.kendoPopup({
                                origin: parentHorizontal ? "bottom left" : "top right",
                                position: "top left",
                                collision: parentHorizontal ? "fit" : "fit flip",
                                anchor: li,
                                appendTo: li,
                                animation: {
                                    open: extend( getEffectOptions(li), that.options.animation.open),
                                    close: that.options.animation.close
                                }
                            }).data(KENDOPOPUP);
                        }

                        popup.open();
                    }

                }, that.options.hoverDelay));
            });
        },

        close: function (element) {
            var that = this;

            $(element).each(function () {
                var li = $(this);

                clearTimeout(li.data(TIMER));

                li.data(TIMER, setTimeout(function () {
                    var ul = li.find(".t-group:first:visible"), popup;
                    if (ul[0]) {
                        popup = ul.data(KENDOPOPUP);
                        popup.close();
                    }
                }, that.options.hoverDelay));
            });
        },

        _toggleHover: function(e) {
            $(e.currentTarget).toggleClass("t-state-hover", e.type == MOUSEENTER);
        },

        _updateClasses: function() {
            var that = this;

            that.element.addClass("t-widget t-reset t-header t-menu").addClass("t-menu-" + that.options.orientation);

            var items = that.element
                            .find("ul")
                            .addClass("t-group")
                            .end()
                            .find("li")
                            .addClass("t-item");

            items
                .children(IMG)
                .addClass("t-image");
            items
                .children("a")
                .addClass("t-link")
                .children(IMG)
                .addClass("t-image");
            items
                .filter(":not([disabled])")
                .addClass(DEFAULTSTATE);
            items
                .filter("li[disabled]")
                .addClass(DISABLEDSTATE)
                .removeAttr("disabled");
            items
                .children("a:focus")
                .parent()
                .addClass("t-state-active");

            items.each(function() {
                var item = $(this);

                if (!item.children(".t-link").length)
                    item
                        .contents()      // exclude groups, real links, templates and empty text nodes
                        .filter(function() { return (!(this.nodeName.toLowerCase() in { ul: {}, a: {}, div: {} }) && !(this.nodeType == 3 && !$.trim(this.nodeValue))); })
                        .wrapAll('<span class="t-link"/>');
            });

            items
                .filter(":has(.t-group)")
                .children(".t-link:not(:has([class*=t-arrow]))")
                .each(function () {
                    var item = $(this),
                        parent = item.parent().parent();

                    item.append('<span class="t-icon ' + (parent.hasClass("t-menu-horizontal") ? "t-arrow-down" : "t-arrow-next") + '"></span>');
                });

        },

        _mouseenter: function (e) {
            var that = this;

            var element = $(e.currentTarget);
            if (!that.options.openOnClick || that.clicked) {
                if (!contains(e.currentTarget, e.relatedTarget)) {
                    if (that.trigger(OPEN, { item: element[0] }) === false)
                        that.open(element);
                }
            }

            if (that.options.openOnClick && that.clicked) {
                that.trigger(CLOSE, { item: element[0] });

                element.siblings().each($.proxy(function (_, sibling) {
                    that.close(sibling);
                }, that));
            }
        },

        _mouseleave: function (e) {
            var that = this;

            if (!that.options.openOnClick && !contains(e.currentTarget, e.relatedTarget)) {
                var element = $(e.currentTarget);
                if (that.trigger(CLOSE, { item: element[0] }) === false)
                    that.close(element);
            }
        },

        _click: function (e) {
            var that = this;
            e.stopPropagation();

            var element = $(e.currentTarget);

            if (element.hasClass(DISABLEDSTATE)) {
                e.preventDefault();
                return;
            }

            that.trigger("select", { item: element[0] });

            if (!element.parent().hasClass("t-menu") || !that.options.openOnClick)
                return;

            e.preventDefault();

            that.clicked = true;
            that.trigger(OPEN, { item: element[0] });
            that.open(element);
        },

        _documentClick: function (e) {
            var that = this;

            if (contains(that.element[0], e.target))
                return;

            if (that.clicked) {
                that.clicked = false;
                that.close(that.element.find(".t-item>.t-animation-container:visible").parent());
            }
        }
    });

    // client-side rendering
    extend(Menu, {
        create: function () {
        }
    });

    kendo.ui.plugin("Menu", Menu, Component);

})(jQuery, window);
