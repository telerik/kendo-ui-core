(function ($, window) {
    /**
     * @name kendo.ui.PanelBar.Description
     *
     * @section The PanelBar component initializes hierarchical
     * data as a multiple level expandable panel bar.
     *
     * @exampleTitle Creating a PanelBar from existing HTML
     * @example
     * <ul id="panelBar">
     *     <li>Item 1
     *         <ul>
     *             <li>Item 1.1</li>
     *             <li>Item 1.2</li>
     *         </ul>
     *     </li>
     *     <li>Item 2</li>
     * </ul>
     *
     * @exampleTitle PanelBar initialization
     * @example
     * var panelBar = $("#panelBar").kendoPanelBar();
     */
    var kendo = window.kendo,
        ui = kendo.ui,
        extend = $.extend,
        template = kendo.template,
        Component = ui.Component,
        EXPAND = "expand",
        COLLAPSE = "collapse",
        SELECT = "select",
        ERROR = "error",
        CONTENTLOAD = "contentLoad",
        MOUSEENTER = "mouseenter",
        MOUSELEAVE = "mouseleave",
        CLICK = "click",
        ITEM = ".t-item",
        clickableItems = ITEM + ":not(.t-state-disabled) .t-link",
        disabledItems = ITEM + ".t-state-disabled .t-link",
        activeClass = ".t-state-active",
        selectedClass = ".t-state-selected",
        disabledClass = ".t-state-disabled",
        highlightedClass = ".t-state-highlighted",
        defaultState = "t-state-default",
        VISIBLE = ":visible",
        EMPTY = ":empty",
        animating = false,
        SINGLE = "single";

    var PanelBar = Component.extend({/** @lends kendo.ui.PanelBar.prototype */
        /**
         * Creates a PanelBar instance.
         * @constructs
         * @extends kendo.ui.Component
         * @class PanelBar UI component
         * @param {Selector} element DOM element
         * @param {Object} options Configuration options.
         * @option {Object} [animation] A collection of Animation objects, used to change default animations. A value of false will disable all animations in the component.
         * @option {Animation} [animation.open] The animation that will be used when expanding items.
         * @option {Animation} [animation.close] The animation that will be used when collapsing items.
         * @option {String} [expandMode] <multiple> Specifies if PanelBar should collapse the already expanded item when expanding next item
         */
        init: function(element, options) {
            element = $(element);
            var that = this,
                content = element.find("li" + activeClass + " > .t-content");

            Component.fn.init.call(that, element, options);

            options = that.options;

            if (that.element.is(EMPTY)) {
                that.element.append($(PanelBar.renderGroup({
                    items: options.dataSource,
                    group: {
                        firstLevel: true,
                        expanded: true
                    },
                    panelBar: {}
                })).children());
            }

            that._updateClasses();

            if (options.animation === false) {
                options.animation = { open: { show: true, effects: {} }, close: { hide:true, effects: {} } };
            }

            element
                .delegate(clickableItems, CLICK, $.proxy(that._click, that))
                .delegate(clickableItems, MOUSEENTER + " " + MOUSELEAVE, that._toggleHover)
                .delegate(disabledItems, CLICK, false);

            that.bind([
                /**
                 * Fires before an item is expanded.
                 * @name kendo.ui.PanelBar#expand
                 * @event
                 * @param {Event} e
                 * @param {Element} e.item The expanding item
                 */
                EXPAND,
                /**
                 * Fires before an item is collapsed.
                 * @name kendo.ui.PanelBar#collapse
                 * @event
                 * @param {Event} e
                 * @param {Element} e.item The collapsing item
                 */
                COLLAPSE,
                /**
                 * Fires before an item is selected.
                 * @name kendo.ui.PanelBar#select
                 * @event
                 * @param {Event} e
                 * @param {Element} e.item The selected item
                 */
                SELECT,
                /**
                 * Fires when ajax request results in an error.
                 * @name kendo.ui.PanelBar#error
                 * @event
                 * @param {Event} e
                 * @param {jqXHR} e.xhr The jqXHR object used to load the content
                 * @param {String} e.status The returned status.
                 */
                ERROR,
                /**
                 * Fires when content is fetched from an ajax request.
                 * @name kendo.ui.PanelBar#contentLoad
                 * @event
                 * @param {Event} e
                 * @param {Element} e.item The selected item
                 * @param {Element} e.item The loaded content element
                 */
                CONTENTLOAD
            ], that.options);

            if (that.options.contentUrls)
                element.find("> .t-item")
                    .each(function(index, item) {
                        $(item).find(".t-link").data("ContentUrl", that.options.contentUrls[index]);
                    });

            if (content.length > 0 && content.is(EMPTY))
                that.expand(content.parent());
        },
        options: {
            animation: {
                open: {
                    effects: "expandVertical",
                    duration: 200,
                    show: true
                },
                close: { // if close animation effects are defined, they will be used instead of open.reverse
                    duration: 200,
                    show: false,
                    hide: true
                }
            },
            expandMode: "multiple"
        },

        /**
         * Expands the specified PanelBar item/s
         * @param {Selector} element Target item selector.
         * @param {Boolean} useAnimation Use this parameter to temporary disable the animation.
         * @example
         * panelBar.expand("#Item1");
         */
        expand: function (element, useAnimation) {
            var that = this,
                animBackup = {};
            useAnimation = useAnimation !== false;

            $(element).each(function (index, item) {
                item = $(item);
                if (!item.hasClass(disabledClass) && item.find("> .t-group, > .t-content").length > 0) {

                    if (that.options.expandMode == SINGLE && that._collapseAllExpanded(item))
                        return;

                    element.find(highlightedClass).removeClass(highlightedClass.substr(1));
                    item.addClass(highlightedClass.substr(1));

                    if (!useAnimation) {
                        animBackup = that.options.animation;
                        that.options.animation = { open: { show: true, effects: {} }, close: { hide:true, effects: {} } };
                    }

                    that._toggleItem(item, false, null);

                    if (!useAnimation)
                        that.options.animation = animBackup;
                }
            });
        },

        /**
         * Collapses the specified PanelBar item/s
         * @param {Selector} element Target item selector.
         * @param {Boolean} useAnimation Use this parameter to temporary disable the animation.
         * @example
         * panelBar.collapse("#Item1");
         */
        collapse: function (element, useAnimation) {
            var that = this,
                animBackup = {};
            useAnimation = useAnimation !== false;

            $(element).each(function (index, item) {
                item = $(item);

                if (!item.hasClass(disabledClass) && item.find("> .t-group, > .t-content").is(VISIBLE)) {
                    item.removeClass(highlightedClass.substr(1));

                    if (!useAnimation) {
                        animBackup = that.options.animation;
                        that.options.animation = { open: { show: true, effects: {} }, close: { hide:true, effects: {} } };
                    }

                    that._toggleItem(item, true, null);

                    if (!useAnimation)
                        that.options.animation = animBackup;
                }

            });
        },

        toggle: function (element, enable) {
            $(element)
                .toggleClass(defaultState, enable)
                .toggleClass(disabledClass.substr(1), !enable);
        },

        /**
         * Selects the specified PanelBar item/s. If called without arguments - returns the selected item.
         * @param {Selector} element Target item selector.
         * @example
         * panelBar.select("#Item1");
         */
        select: function (element) {
            var that = this;

            if (arguments.length === 0) {
                return that.element.find(".t-item > " + selectedClass).parent();
            }

            $(element).each(function (index, item) {
                item = $(item);
                var link = item.children(".t-link");

                if (item.is(disabledClass)) {
                    return;
                }

                $(selectedClass, that.element).removeClass(selectedClass.substr(1));
                $(highlightedClass, that.element).removeClass(highlightedClass.substr(1));

                link.addClass(selectedClass.substr(1));
                link.parentsUntil(that.element, ITEM).filter(":has(.t-header)").addClass(highlightedClass.substr(1));
            });
        },

        /**
         * Enables/disables a PanelBar item
         * @param {Selector} element Target element
         * @param {Boolean} enable Desired state
         */
        enable: function (element, state) {
            if (state !== false)
                state = true;

            this.toggle(element, state);
        },

        /**
         * Disables a PanelBar item
         * @param {Selector} element Target element
         */
        disable: function (element) {
            this.toggle(element, false);
        },

        /**
         * Appends a PanelBar item in the specified referenceItem
         * @param {Selector} item Target item, specified as a JSON object. Can also handle an array of such objects.
         * @param {Item} referenceItem A reference item to append the new item in
         * @example
         * panelBar.append(
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
                creatures = that._insert(item, referenceItem, referenceItem.find("> .t-group"));

            $.each (creatures.items, function () {
                creatures.group.append(this);
                that._updateFirstLast(this);
            });

            that._updateArrow(referenceItem);
            that._updateFirstLast(referenceItem.find(".t-first, .t-last"));
            creatures.group.height("auto");
        },

        /**
         * Inserts a PanelBar item before the specified referenceItem
         * @param {Selector} item Target item, specified as a JSON object. Can also handle an array of such objects.
         * @param {Item} referenceItem A reference item to insert the new item before
         * @example
         * panelBar.insertBefore(
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
            creatures.group.height("auto");
        },

        /**
         * Inserts a PanelBar item after the specified referenceItem
         * @param {Selector} item Target item, specified as a JSON object. Can also handle an array of such objects.
         * @param {Item} referenceItem A reference item to insert the new item after
         * @example
         * panelBar.insertAfter(
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
            creatures.group.height("auto");
        },

        /**
         * Removes the specified PanelBar item/s
         * @param {Selector} element Target item selector.
         * @example
         * panelBar.remove("#Item1");
         */
        remove: function (element) {
            element = $(element);

            var that = this,
                parent = element.parentsUntil(that.element, ITEM),
                group = element.parent("ul");

            element.remove();

            if (group && !group.children(ITEM).length) {
                group.remove();
            }

            if (parent.length) {
                parent = parent.eq(0);

                that._updateArrow(parent);
                that._updateFirstLast(parent);
            }
        },

        _insert: function (item, referenceItem, parent) {
            var plain = $.isPlainObject(item),
                items,
                groupData = {
                    firstLevel: parent.hasClass("t-panelbar"),
                    expanded: parent.parent().hasClass("t-state-active"),
                    length: parent.children().length
                };

            if (!parent.length) {
                parent = $(PanelBar.renderGroup({ group: groupData })).appendTo(referenceItem);
            }

            if (plain || $.isArray(item)) { // is JSON
                items = $.map(plain ? [ item ] : item, function (value, idx) {
                            return $(PanelBar.renderItem({
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

        _toggleHover: function(e) {
            var target = $(e.currentTarget);

            if (!target.parents("li" + disabledClass).length) {
                target.toggleClass("t-state-hover", e.type == MOUSEENTER);
            }
        },

        _updateClasses: function() {
            var that = this;

            that.element.addClass("t-widget t-reset t-header t-panelbar");

            var items = that.element
                            .find("ul")
                            .addClass("t-group")
                            .end()
                            .find("li:not(" + activeClass + ") > ul")
                            .css({ display: "none" })
                            .end()
                            .find("li")
                            .addClass("t-item");

            items.each(function () {
                that._updateItemClasses(this);
            });

            that._updateArrow(items);
            that._updateFirstLast(items);
        },

        _updateItemClasses: function(item) {
            var that = this;
            item = $(item);

            item
                .children("img")
                .addClass("t-image");
            item
                .children("a")
                .addClass("t-link")
                .children("img")
                .addClass("t-image");
            item
                .filter(":not([disabled]):not([class*=t-state])")
                .addClass("t-state-default");
            item
                .filter("li[disabled]")
                .addClass("t-state-disabled")
                .removeAttr("disabled");
            item
                .filter(":not([class*=t-state])")
                .children("a:focus")
                .parent()
                .addClass(activeClass.substr(1));
            item
                .find(">div")
                .addClass("t-content")
                .css({ display: "none" });

            item.each(function() {
                var item = $(this);

                if (!item.children(".t-link").length)
                    item
                        .contents()      // exclude groups, real links, templates and empty text nodes
                        .filter(function() { return (!(this.nodeName.toLowerCase() in { ul: {}, a: {}, div: {} }) && !(this.nodeType == 3 && !$.trim(this.nodeValue))); })
                        .wrapAll("<span class='t-link'/>");
            });

            that.element
                .find(" > li > .t-link")
                .addClass("t-header");
        },

        _updateArrow: function (items) {
            items = $(items);

            items.find(".t-icon").remove();

            items
                .filter(":has(.t-group),:has(.t-content)")
                .children(".t-link:not(:has([class*=t-arrow]))")
                .each(function () {
                    var item = $(this),
                        parent = item.parent();

                    item.append("<span class='t-icon " + (parent.hasClass(activeClass.substr(1)) ? "t-arrow-up t-panelbar-collapse" : "t-arrow-down t-panelbar-expand") + "'></span>");
                });
        },

        _updateFirstLast: function (items) {
            items = $(items);

            items.filter(".t-first:not(:first-child)").removeClass("t-first");
            items.filter(".t-last:not(:last-child)").removeClass("t-last");
            items.filter(":first-child").addClass("t-first");
            items.filter(":last-child").addClass("t-last");
        },

        _click: function (e) {
            var that = this,
                target = $(e.currentTarget),
                element = that.element;

            if (target.parents("li" + disabledClass).length)
                return;

            if (target.closest(".t-widget")[0] != element[0])
                return;

            var link = target.closest(".t-link"),
                item = link.closest(ITEM);

            $(selectedClass, element).removeClass(selectedClass.substr(1));
            $(highlightedClass, element).removeClass(highlightedClass.substr(1));

            link.addClass(selectedClass.substr(1));
            link.parentsUntil(that.element, ITEM).filter(":has(.t-header)").addClass(highlightedClass.substr(1));

            var contents = item.find("> .t-content, > .t-group"),
                href = link.attr("href"),
                isAnchor = link.data("ContentUrl") || (href && (href.charAt(href.length - 1) == "#" || href.indexOf("#" + that.element[0].id + "-") != -1));

            if (contents.data("animating"))
                return;

            if (that._triggerEvent(SELECT, item)) {
                e.preventDefault();
            }

            if (isAnchor || contents.length)
                e.preventDefault();
            else
                return;

            if (that.options.expandMode == SINGLE)
                if (that._collapseAllExpanded(item))
                    return;

            if (contents.length) {
                var visibility = contents.is(VISIBLE);

                if (!that._triggerEvent(!visibility ? EXPAND : COLLAPSE, item))
                    that._toggleItem(item, visibility, e);
            }
        },

        _toggleItem: function (element, isVisible, e) {
            var that = this,
                childGroup = element.find("> .t-group");

            if (childGroup.length) {

                this._toggleGroup(childGroup, isVisible);

                if (e)
                    e.preventDefault();
            } else {

                var itemIndex = element.parent().children().index(element),
                    content = element.find("> .t-content");

                if (content.length) {
                    if (e)
                        e.preventDefault();

                    if (!content.is(EMPTY))
                        that._toggleGroup(content, isVisible);
                    else
                        that._ajaxRequest(element, content, isVisible);
                }
            }
        },

        _toggleGroup: function (element, visibility) {
            var that = this,
                hasCloseAnimation = "effects" in that.options.animation.close,
                closeAnimation = extend({}, that.options.animation.open);

            if (element.is(VISIBLE) != visibility)
                return;

            visibility && element.css("height", element.height()); // Set initial height on visible items (due to a Chrome bug/feature).
            element.css("height");

            element
                .parent()
                .toggleClass(defaultState, visibility)
                .toggleClass(activeClass.substr(1), !visibility)
                .find("> .t-link > .t-icon")
                    .toggleClass("t-arrow-up", !visibility)
                    .toggleClass("t-panelbar-collapse", !visibility)
                    .toggleClass("t-arrow-down", visibility)
                    .toggleClass("t-panelbar-expand", visibility);

            element
                .kendoStop(true, true)
                .kendoAnimate(extend( hasCloseAnimation && visibility ?
                                          that.options.animation.close :
                                          !hasCloseAnimation && visibility ?
                                               extend(closeAnimation, { show: false, hide: true }) :
                                               that.options.animation.open, {
                                                   reverse: !hasCloseAnimation && visibility
                                               }));
        },

        _collapseAllExpanded: function (item) {
            var that = this;

            if (item.find("> .t-link").hasClass("t-header")) {
                if (item.find("> .t-content, > .t-group").is(VISIBLE) || item.find("> .t-content, > .t-group").length == 0) {
                    return true;
                } else {
                    $(that.element).children().find("> .t-content, > .t-group")
                            .filter(function () { return $(this).is(VISIBLE) })
                            .each(function (index, content) {
                                that._toggleGroup($(content), true);
                            });
                }
            }
        },

        _ajaxRequest: function (element, contentElement, isVisible) {

            var that = this,
                statusIcon = element.find(".t-panelbar-collapse, .t-panelbar-expand"),
                link = element.find(".t-link"),
                loadingIconTimeout = setTimeout(function () {
                    statusIcon.addClass("t-loading");
                }, 100),
                data = {};

            $.ajax({
                type: "GET",
                cache: false,
                url: link.data("ContentUrl") || link.attr("href"),
                dataType: "html",
                data: data,

                error: function (xhr, status) {
                    if (that.trigger(ERROR, { xhr: xhr, status: status }))
                        this.complete();
                },

                complete: function () {
                    clearTimeout(loadingIconTimeout);
                    statusIcon.removeClass("t-loading");
                },

                success: function (data, textStatus) {
                    contentElement.html(data);
                    that._toggleGroup(contentElement, isVisible);

                    that.trigger(CONTENTLOAD, { item: element[0], contentElement: contentElement[0] });
                }
            });
        },

        _triggerEvent: function (eventName, element) {
            var that = this;

            that.trigger(eventName, { item: element[0] });
        }
    });

    // client-side rendering
    extend(PanelBar, {
        renderItem: function (options) {
            options = extend({ panelBar: {}, group: {} }, options);

            var templates = PanelBar.templates,
                empty = templates.empty,
                item = options.item,
                panelBar = options.panelBar;

            return templates.item(extend(options, {
                image: item.imageUrl ? templates.image : empty,
                sprite: item.spriteCssClass ? templates.sprite : empty,
                itemWrapper: templates.itemWrapper,
                arrow: item.items ? templates.arrow : empty,
                subGroup: PanelBar.renderGroup
            }, PanelBar.rendering));
        },

        renderGroup: function (options) {
            return PanelBar.templates.group(extend({
                renderItems: function(options) {
                    var html = "",
                        i = 0,
                        items = options.items,
                        len = items ? items.length : 0,
                        group = extend({ length: len }, options.group);

                    for (; i < len; i++) {
                        html += PanelBar.renderItem(extend(options, {
                            group: group,
                            item: extend({ index: i }, items[i])
                        }));
                    }

                    return html;
                }
            }, options, PanelBar.rendering));
        }
    });

    PanelBar.rendering = {
        wrapperCssClass: function (group, item) {
            var result = "t-item",
                index = item.index;

            if (item.enabled === false) {
                result += " t-state-disabled";
            } else {
                result += " t-state-default";
            }

            if (index == 0) {
                result += " t-first"
            }

            if (index == group.length-1) {
                result += " t-last";
            }

            return result;
        },
        textClass: function(item, group) {
            var result = "t-link";

            if (group.firstLevel)
                result += " t-header";

            return result;
        },
        textAttributes: function(item) {
            return item.url ? " href='" + item.url + "'" : "";
        },
        arrowClass: function(item, group) {
            var result = "t-icon";

            if (group.horizontal) {
                result += " t-arrow-down";
            } else {
                result += " t-arrow-right";
            }

            return result;
        },
        text: function(item) {
            return item.encoded === false ? item.text : kendo.htmlEncode(item.text);
        },
        tag: function(item) {
            return item.url ? "a" : "span";
        },
        groupAttributes: function(group) {
            return group.expanded !== true ? " style='display:none'" : "";
        },
        groupCssClass: function(group) {
            return "t-group";
        }
    };

    PanelBar.templates = {
        group: template(
            "<ul class='<#= groupCssClass(group) #>'<#= groupAttributes(group) #>>" +
                "<#= renderItems(data); #>" +
            "</ul>"
        ),
        itemWrapper: template(
            "<<#= tag(item) #> class='<#= textClass(item, group) #>'<#= textAttributes(item) #>>" +
                "<#= image(item) #><#= sprite(item) #><#= text(item) #>" +
                "<#= arrow(data) #>" +
            "</<#= tag(item) #>>"
        ),
        item: template(
            "<li class='<#= wrapperCssClass(group, item) #>'>" +
                "<#= itemWrapper(data) #>" +
                "<# if (item.items) { #>" +
                "<#= subGroup({ items: item.items, panelBar: panelBar, group: { expanded: item.expanded } }) #>" +
                "<# } #>" +
            "</li>"
        ),
        image: template("<img class='t-image' alt='' src='<#= imageUrl #>' />"),
        arrow: template("<span class='<#= arrowClass(item, group) #>'></span>"),
        sprite: template("<span class='t-sprite <#= spriteCssClass #>'></span>"),
        empty: template("")
    };

    kendo.ui.plugin("PanelBar", PanelBar, Component);

})(jQuery, window);
