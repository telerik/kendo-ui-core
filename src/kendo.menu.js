(function ($, window) {
    /**
     * @name kendo.ui.Menu.Description
     *
     * @section The menu component initializes hierarchical
     * data as a multiple level drop down menu.
     *
     * @exampleTitle Creating a menu from existing HTML
     * @example
     * <ul id="menu">
     *     <li>Item 1
     *         <ul>
     *             <li>Item 1.1</li>
     *             <li>Item 1.2</li>
     *         </ul>
     *     </li>
     *     <li>Item 2</li>
     * </ul>
     *
     * @exampleTitle Menu initialization
     * @example
     * var menu = $("#menu").kendoMenu();
     */
    var kendo = window.kendo,
        ui = kendo.ui,
        extend = $.extend,
        proxy = $.proxy,
        template = kendo.template,
        Component = ui.Component,
        OPEN = "open",
        CLOSE = "close",
        SELECT = "select",
        MOUSEENTER = "mouseenter",
        MOUSELEAVE = "mouseleave",
        CLICK = "click",
        TIMER = "timer",
        EMPTY = ":empty",
        IMG = "img",
        KENDOPOPUP = "kendoPopup",
        DEFAULTSTATE = "t-state-default",
        DISABLEDSTATE = "t-state-disabled",
        disabledSelector = ".t-item.t-state-disabled",
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

    var Menu = Component.extend({/** @lends kendo.ui.Menu.prototype */
        /**
         * Creates a Menu instance.
         * @constructs
         * @extends kendo.ui.Component
         * @class Menu UI component
         * @param {Selector} element DOM element
         * @param {Object} options Configuration options.
         * @option {Object} [animation] A collection of <b>Animation</b> objects, used to change default animations. A value of false will disable all animations in the component.
         * @option {Animation} [animation.open] The animation that will be used when opening sub menus.
         * @option {Animation} [animation.close] The animation that will be used when closing sub menus.
         * @option {String} [orientation] <"horizontal"> Root menu orientation.
         * @option {Boolean} [openOnClick] <false> Specifies that the root sub menus will be opened on item click.
         * @option {Number} [hoverDelay] <100> Specifies the delay in ms before the menu is opened/closed - used to avoid accidental closure on leaving.
         */
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

            element.delegate(disabledSelector, CLICK, false);

            element.delegate(itemSelector, MOUSEENTER, proxy(that._mouseenter, that))
                   .delegate(itemSelector, MOUSELEAVE, proxy(that._mouseleave, that))
                   .delegate(itemSelector, CLICK, proxy(that._click , that));

            element.delegate(linkSelector, MOUSEENTER + " " + MOUSELEAVE, that._toggleHover);

            $(document).click($.proxy( that._documentClick, that ));

            that.bind([
                /**
                 * Fires before a sub menu gets opened.
                 * @name kendo.ui.Menu#open
                 * @event
                 * @param {Event} e
                 * @param {Element} e.item The opened item
                 */
                OPEN,
                /**
                 * Fires after a sub menu gets closed.
                 * @name kendo.ui.Menu#close
                 * @event
                 * @param {Event} e
                 * @param {Element} e.item The closed item
                 */
                CLOSE,
                /**
                 * Fires when a menu item gets selected.
                 * @name kendo.ui.Menu#select
                 * @event
                 * @param {Event} e
                 * @param {Element} e.item The selected item
                 */
                SELECT
            ], that.options);
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

        /**
         * Enables/disables a Menu item
         * @param {Selector} element Target element
         * @param {Boolean} enable Desired state
         */
        enable: function (element, enable) {
            if (enable !== false)
                enable = true;

            this._toggleDisabled(element, enable);
        },

        /**
         * Disables a Menu item
         * @param {Selector} element Target element
         */
        disable: function (element) {
            this._toggleDisabled(element, false);
        },

        /**
         * Appends a Menu item in the specified referenceItem's sub menu
         * @param {Selector} item Target item, specified as a JSON object. Can also handle an array of such objects.
         * @param {Item} referenceItem A reference item to append the new item in
         * @example
         * menu.append(
         *     [{
         *         text: "Item 1"
         *     },
         *     {
         *         text: "Item 2"
         *     }],
         *     referenceItem
         * );
         */
        append: function (item, referenceItem) {
            var that = this,
                creatures = that._insert(item, referenceItem, referenceItem.find("> .t-group, .t-animation-container > .t-group"));

            $.each (creatures.items, function () {
                creatures.group.append(this);
                that._updateFirstLast(this);
            });

            that._updateArrow(referenceItem);
            that._updateFirstLast(referenceItem.find(".t-first, .t-last"));
        },

        /**
         * Inserts a Menu item before the specified referenceItem
         * @param {Selector} item Target item, specified as a JSON object. Can also handle an array of such objects.
         * @param {Item} referenceItem A reference item to insert the new item before
         * @example
         * menu.insertBefore(
         *     [{
         *         text: "Item 1"
         *     },
         *     {
         *         text: "Item 2"
         *     }],
         *     referenceItem
         * );
         */
        insertBefore: function (item, referenceItem) {
            var that = this,
                creatures = this._insert(item, referenceItem, referenceItem.parent());

            $.each (creatures.items, function () {
                referenceItem.before(this);
                that._updateFirstLast(this);
            });

            that._updateFirstLast(referenceItem);
        },

        /**
         * Inserts a Menu item after the specified referenceItem
         * @param {Selector} item Target item, specified as a JSON object. Can also handle an array of such objects.
         * @param {Item} referenceItem A reference item to insert the new item after
         * @example
         * menu.insertAfter(
         *     [{
         *         text: "Item 1"
         *     },
         *     {
         *         text: "Item 2"
         *     }],
         *     referenceItem
         * );
         */
        insertAfter: function (item, referenceItem) {
            var that = this,
                creatures = this._insert(item, referenceItem, referenceItem.parent());

            $.each (creatures.items, function () {
                referenceItem.after(this);
                that._updateFirstLast(this);
            });

            that._updateFirstLast(referenceItem);
        },

        _insert: function (item, referenceItem, parent) {
            var plain = $.isPlainObject(item),
                items,
                groupData = {
                                firstLevel: parent.parent().hasClass("t-menu"),
                                horizontal: parent.hasClass("t-menu-horizontal"),
                                expanded: true,
                                length: parent.children().length
                            };

            if (!parent.length) {
                parent = $(Menu.renderGroup({ group: groupData })).appendTo(referenceItem);
            }

            if (plain || $.isArray(item)) { // is JSON
                items = $.map(plain ? [ item ] : item, function (value, idx) {
                            return $(Menu.renderItem({
                                group: groupData,
                                item: extend(value, { index: idx })
                            }));
                        });
            } else {
                items = $(item);

                this._updateItemClasses(item);
            }

            return { items: items, group: parent };
        },

        /**
         * Removes the specified Menu item/s from the Menu
         * @param {Selector} element Target item selector.
         * @example
         * menu.remove("#Item1");
         */
        remove: function (element) {
            element = $(element);

            var that = this,
                parent = element.parentsUntil(that.element, ".t-item"),
                group = element.parent("ul");

            element.remove();

            if (group && !group.children(".t-item").length) {
                var container = group.parent(".t-animation-container");
                container.length ? container.remove() : group.remove();
            }

            if (parent.length) {
                parent = parent.eq(0);

                that._updateArrow(parent);
                that._updateFirstLast(parent);
            }
        },

        /**
         * Opens the sub menu of the specified Menu item/s
         * @param {Selector} element Target item selector.
         * @example
         * menu.open("#Item1");
         */
        open: function (element) {
            var that = this;

            $(element).each(function () {
                var li = $(this);

                clearTimeout(li.data(TIMER));

                li.data(TIMER, setTimeout(function () {
                    var ul = li.find(".t-group:first:hidden"), popup;

                    if (ul[0]) {
                        li.data("zIndex", li.css("z-index"));
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

        /**
         * Closes the sub menu of the specified Menu item/s
         * @param {Selector} element Target item selector.
         * @example
         * menu.close("#Item1");
         */
        close: function (element) {
            var that = this;

            $(element).each(function () {
                var li = $(this);

                clearTimeout(li.data(TIMER));

                li.data(TIMER, setTimeout(function () {
                    var ul = li.find(".t-group:first:visible"), popup;
                    if (ul[0]) {
                        li.css("z-index", li.data("z-index"));
                        li.removeData("z-index");

                        popup = ul.data(KENDOPOPUP);
                        popup.close();
                    }
                }, that.options.hoverDelay));
            });
        },

        _toggleDisabled: function (element, enable) {
            $(element).each(function () {
                $(this)
                    .toggleClass(DEFAULTSTATE, enable)
                    .toggleClass(DISABLEDSTATE, !enable);
            });
        },

        _toggleHover: function(e) {
            var target = $(e.currentTarget);

            if (!target.parents("li." + DISABLEDSTATE).length)
                target.toggleClass("t-state-hover", e.type == MOUSEENTER);
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

            items.each(function () {
                that._updateItemClasses(this);
            });
        },

        _updateItemClasses: function(item) {
            var that = this;
            item = $(item);

            item
                .children(IMG)
                .addClass("t-image");
            item
                .children("a")
                .addClass("t-link")
                .children(IMG)
                .addClass("t-image");
            item
                .filter(":not([disabled])")
                .addClass(DEFAULTSTATE);
            item
                .filter("li[disabled]")
                .addClass(DISABLEDSTATE)
                .removeAttr("disabled");
            item
                .children("a:focus")
                .parent()
                .addClass("t-state-active");

            if (!item.children(".t-link").length)
                item
                    .contents()      // exclude groups, real links, templates and empty text nodes
                    .filter(function() { return (!(this.nodeName.toLowerCase() in { ul: {}, a: {}, div: {} }) && !(this.nodeType == 3 && !$.trim(this.nodeValue))); })
                    .wrapAll("<span class='t-link'/>");

            that._updateArrow(item);
            that._updateFirstLast(item);
        },

        _updateArrow: function (item) {
            item = $(item);

            item.find(".t-icon").remove();

            item.filter(":has(.t-group)")
                .children(".t-link:not(:has([class*=t-arrow]))")
                .each(function () {
                    var item = $(this),
                        parent = item.parent().parent();

                    item.append("<span class='t-icon " + (parent.hasClass("t-menu-horizontal") ? "t-arrow-down" : "t-arrow-next") + "'></span>");
                });
        },

        _updateFirstLast: function (item) {
            item = $(item);

            item.filter(".t-first:not(:first-child)").removeClass("t-first");
            item.filter(".t-last:not(:last-child)").removeClass("t-last");
            item.filter(":first-child").addClass("t-first");
            item.filter(":last-child").addClass("t-last");
        },

        _mouseenter: function (e) {
            var that = this,
                element = $(e.currentTarget),
                hasChildren = (element.children(".t-animation-container").length || element.children(".t-group").length);

            if (!that.options.openOnClick || that.clicked) {
                if (!contains(e.currentTarget, e.relatedTarget) && hasChildren) {
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
            var that = this,
                element = $(e.currentTarget),
                hasChildren = (element.children(".t-animation-container").length || element.children(".t-group").length);

            if (!that.options.openOnClick && !contains(e.currentTarget, e.relatedTarget) && hasChildren) {
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

            that.trigger(SELECT, { item: element[0] });

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
        renderItem: function (options) {
            options = extend({ menu: {}, group: {} }, options);

            var templates = Menu.templates,
                empty = templates.empty,
                item = options.item,
                menu = options.menu;

            return templates.item(extend(options, {
                image: item.imageUrl ? templates.image : empty,
                sprite: item.spriteCssClass ? templates.sprite : empty,
                itemWrapper: templates.itemWrapper,
                arrow: item.items ? templates.arrow : empty,
                subGroup: Menu.renderGroup
            }, Menu.rendering));
        },

        renderGroup: function (options) {
            return Menu.templates.group(extend({
                renderItems: function(options) {
                    var html = "",
                        i = 0,
                        items = options.items,
                        len = items ? items.length : 0,
                        group = extend({ length: len }, options.group);

                    for (; i < len; i++) {
                        html += Menu.renderItem(extend(options, {
                            group: group,
                            item: extend({ index: i }, items[i])
                        }));
                    }

                    return html;
                }
            }, options, Menu.rendering));
        }
    });

    Menu.rendering = {
        /** @ignore */
        wrapperCssClass: function (group, item) {
            var result = "t-item",
                index = item.index;

            if (item.enabled === false) {
                result += " t-state-disabled";
            } else {
                result += " t-state-default";
            }

            if (group.firstLevel && index == 0) {
                result += " t-first"
            }

            if (index == group.length-1) {
                result += " t-last";
            }

            return result;
        },
        /** @ignore */
        textClass: function(item) {
            return "t-link";
        },
        /** @ignore */
        textAttributes: function(item) {
            return item.url ? " href='" + item.url + "'" : "";
        },
        /** @ignore */
        arrowClass: function(item, group) {
            var result = "t-icon";

            if (group.horizontal) {
                result += " t-arrow-down";
            } else {
                result += " t-arrow-right";
            }

            return result;
        },
        /** @ignore */
        text: function(item) {
            return item.encoded === false ? item.text : kendo.htmlEncode(item.text);
        },
        /** @ignore */
        tag: function(item) {
            return item.url ? "a" : "span";
        },
        /** @ignore */
        groupAttributes: function(group) {
            return group.expanded !== true ? " style='display:none'" : "";
        },
        /** @ignore */
        groupCssClass: function(group) {
            return "t-group";
        }
    };

    Menu.templates = {
        group: template(
            "<ul class='<#= groupCssClass(group) #>'<#= groupAttributes(group) #>>" +
                "<#= renderItems(data); #>" +
            "</ul>"
        ),
        itemWrapper: template(
            "<<#= tag(item) #> class='<#= textClass(item) #>'<#= textAttributes(item) #>>" +
                "<#= image(item) #><#= sprite(item) #><#= text(item) #>" +
                "<#= arrow(data) #>" +
            "</<#= tag(item) #>>"
        ),
        item: template(
            "<li class='<#= wrapperCssClass(group, item) #>'>" +
                "<#= itemWrapper(data) #>" +
                "<# if (item.items) { #>" +
                "<#= subGroup({ items: item.items, menu: menu, group: { expanded: item.expanded } }) #>" +
                "<# } #>" +
            "</li>"
        ),
        image: template("<img class='t-image' alt='' src='<#= imageUrl #>' />"),
        arrow: template("<span class='<#= arrowClass(item, group) #>'></span>"),
        sprite: template("<span class='t-sprite <#= spriteCssClass #>'></span>"),
        empty: template("")
    };

    kendo.ui.plugin("Menu", Menu, Component);

})(jQuery, window);
