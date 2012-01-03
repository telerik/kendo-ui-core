/**
 * @fileOverview Provides a PanelBar implementation which can be used to
 * display a hierarchical data as a multi-level, expandable panel bar.
 */

(function ($, undefined) {
    /**
     * @name kendo.ui.PanelBar.Description
     *
     * @section
     * <p>
     *  The <b>PanelBar</b> displays hierarchical data as a multi-level,
     *  expandable widget that's useful for constained areas of a page. Its
     *  structure may be defined in HTML or configured dynamically through
     *  its API. The content for items can also be loaded via AJAX by
     *  specifying a content URL.
     * </p>
     * <h3>Getting Started</h3>
     * <p>
     *  A <b>PanelBar</b> will utilize an HTML list to define its structure
     *  and content.
     * </p>
     * 
     * @exampleTitle Create a list of items
     * @example
     * <ul id="panelBar">
     *  <li>
     *   Item 1
     *   <ul>
     *    <li>Sub Item 1</li>
     *    <li>Sub Item 2</li>
     *   </ul>
     *  <li>
     *  <li>Item 2</li>
     * </ul>
     *
     * @section
     * <p>
     *  A <b>PanelBar</b> can be created by targeting the root element of a
     *  HTML list.
     * </p>
     * 
     * @exampleTitle Initialize the PanelBar via a jQuery ID selector
     * @example
     * $(document).ready(function() {
     *  $("#panelBar").kendoPanelBar();
     * });
     *
     * @section
     * <p>
     *  <b>PanelBar</b> items may contain nested content (including markup)
     *  within a <b>div</b> element. Text content located outside nested
     *  content will be used as the title of the item.
     * </p>
     *
     * @exampleTitle Create a list of items in HTML with nested content
     * @example
     * <ul id="panelBar">
     *  <li>Item with no content</li>
     *  <li>Item with content
     *   <div>This is nested content of a PanelBar item.</div>
     *  </li>
     * </ul>
     *
     * @section
     * <p>
     *  A <b>PanelBar</b> will preserve the content defined within an item.
     * </p>
     *
     * @exampleTitle Initialize the PanelBar via a jQuery ID selector
     * @example
     * var panelBar = $("#panelbar").kendoPanelBar();
     *
     * @exampleTitle Initialize Kendo PanelBar using JSON data object
     * @example
     * $("#panelbar").kendoPanelBar({
     *     dataSource: [
     *         {
     *             text: "Item 1",
     *             items: [
     *                 { text: "Sub Item 1" },
     *                 { text: "Sub Item 2" }
     *             ]
     *         },
     *         {
     *             text: "Item 2"
     *         }
     *     ]
     * });
     *
     * @exampleTitle Initialize Kendo PanelBar using JSON data object
     * @example
     * $("#panelbar").kendoPanelBar({
     *     dataSource: [
     *         {
     *             text: "Item 1",
     *             items: [
     *                 { text: "Sub Item 1" },
     *                 { text: "Sub Item 2" }
     *             ]
     *         },
     *         {
     *             text: "Item 2"
     *         }
     *     ]
     * });
     * 
     * @section
     * <h3>Loading Content with AJAX</h3>
     * <p>
     *  While any valid technique for loading AJAX content can be used,
     *  the <b>PanelBar</b> provides built-in support for asynchronously
     *  loading content from URLs. These URLs should return HTML fragments
     *  that can be loaded in the <b>PanelBar</b> item content area.
     * </p>
     *
     * @exampleTitle Create a list of items with a target for dynamic content
     * @example
     * <ul id="panelBar">
     *  <li>Item 1
     *   <ul>
     *    <li>Sub Item 1</li>
     *   </ul>
     *  </li>
     *  <li>Item 2</li>
     *  <li>
     *   Item with Dynamic Content
     *   <div></div>
     *  </li>
     * </ul>
     *
     * @exampleTitle Load PanelBar item content asynchronously via AJAX
     * @example
     * // initialization and configuration
     * $("#panelBar").kendoPanelBar({
     *  contentUrls:[
     *   null,
     *   null,
     *   "html-content-snippet.html"
     *  ]
     * });
     *
     * @section
     * <p>
     *  When the <b>PanelBar</b> loads remote content via AJAX, the server
     *  response is cached in-memory so that subsequent expand/collapse
     *  actions do not trigger subsequent AJAX requests.
     * </p>
     * <h3>Customizing PanelBar Animations</h3>
     * <p>
     *  By default, a <b>PanelBar</b> uses animations to expand and reveal
     *  sub-items when an item header is clicked. These animations can be
     *  modified using configuration properties, changing the open and close
     *  animation style. A <b>PanelBar</b> can also be configured to only
     *  allow one panel to remain open at a time.
     * </p>
     *
     * @exampleTitle Changing PanelBar animation and expandMode behavior
     * @example
     * $("#panelBar").kendoPanelBar({
     *  animation: {
     *   open : { effects: "fadeIn" }
     *  },
     *  expandMode: "single"
     * });
     *
     * @section
     * <h3>Dynamically Configuring PanelBar Items</h3>
     * <p>
     *  The <b>PanelBar</b> API provides several methods for dynamically
     *  adding or removing Items. To add items, provide the new item as a
     *  JSON object along with a reference item that will be used to
     *  determine its placement in the items hierarchy. The reference item is
     *  optional when appending.
     * </p>
     * <p>
     *  A reference item is a target <b>PanelBar</b> item HTML element that
     *  already exists in the PanelBar. Any valid jQuery selector can be used
     *  to obtain a reference to the target item.
     * </p>
     * <p>
     *  Removing an item only requires a reference to the target element that
     *  should be removed.
     * </p>
     *
     * @exampleTitle Dynamically add a new root PanelBar item
     * @example
     * var panelBar = $("#panelBar").kendoPanelBar().data("kendoPanelBar");
     *
     * panelBar.insertAfter(
     *  { text: "New PanelBar Item" },
     *  panelBar.element.children("li:last")
     * );
     *
     * @section
     * <h3>Accessing an Existing PanelBar</h3>
     * <p>
     *  You can reference an existing <b>PanelBar</b> instance via
     *  <a href="http://api.jquery.com/jQuery.data/">jQuery.data()</a>.
     *  Once a reference has been established, you can use the API to control
     *  its behavior.
     * </p>
     *
     * @exampleTitle Accessing an existing PanelBar instance
     * @example
     * var panelBar = $("#panelBar").data("kendoPanelBar");
     *
     */
    var kendo = window.kendo,
        ui = kendo.ui,
        extend = $.extend,
        each = $.each,
        template = kendo.template,
        Widget = ui.Widget,
        excludedNodesRegExp = /^(ul|a|div)$/i,
        IMG = "img",
        HREF = "href",
        LAST = "k-last",
        LINK = "k-link",
        ERROR = "error",
        CLICK = "click",
        ITEM = ".k-item",
        IMAGE = "k-image",
        FIRST = "k-first",
        EXPAND = "expand",
        SELECT = "select",
        CONTENT = "k-content",
        COLLAPSE = "collapse",
        CONTENTURL = "contentUrl",
        MOUSEENTER = "mouseenter",
        MOUSELEAVE = "mouseleave",
        CONTENTLOAD = "contentLoad",
        ACTIVECLASS = ".k-state-active",
        GROUPS = "> .k-group",
        CONTENTS = "> .k-content",
        SELECTEDCLASS = ".k-state-selected",
        DISABLEDCLASS = ".k-state-disabled",
        HIGHLIGHTEDCLASS = ".k-state-highlighted",
        clickableItems = ITEM + ":not(.k-state-disabled) .k-link",
        disabledItems = ITEM + ".k-state-disabled .k-link",
        defaultState = "k-state-default",
        VISIBLE = ":visible",
        EMPTY = ":empty",
        SINGLE = "single",
        animating = false,

        templates = {
            content: template(
                "<div class='k-content'#= contentAttributes(data) #>#= content(item) #</div>"
            ),
            group: template(
                "<ul class='#= groupCssClass(group) #'#= groupAttributes(group) #>" +
                    "#= renderItems(data) #" +
                "</ul>"
            ),
            itemWrapper: template(
                "<#= tag(item) # class='#= textClass(item, group) #'#= contentUrl(item) ##= textAttributes(item) #>" +
                    "#= image(item) ##= sprite(item) ##= text(item) #" +
                    "#= arrow(data) #" +
                "</#= tag(item) #>"
            ),
            item: template(
                "<li class='#= wrapperCssClass(group, item) #'>" +
                    "#= itemWrapper(data) #" +
                    "# if (item.items) { #" +
                    "#= subGroup({ items: item.items, panelBar: panelBar, group: { expanded: item.expanded } }) #" +
                    "# } #" +
                "</li>"
            ),
            image: template("<img class='k-image' alt='' src='#= imageUrl #' />"),
            arrow: template("<span class='#= arrowClass(item, group) #'></span>"),
            sprite: template("<span class='k-sprite #= spriteCssClass #'></span>"),
            empty: template("")
        },

        rendering = {
            wrapperCssClass: function (group, item) {
                var result = "k-item",
                    index = item.index;

                if (item.enabled === false) {
                    result += " k-state-disabled";
                } else {
                    result += " k-state-default";
                }

                if (index == 0) {
                    result += " k-first"
                }

                if (index == group.length-1) {
                    result += " k-last";
                }

                return result;
            },
            textClass: function(item, group) {
                var result = LINK;

                if (group.firstLevel) {
                    result += " k-header";
                }

                return result;
            },
            textAttributes: function(item) {
                return item.url ? " href='" + item.url + "'" : "";
            },
            arrowClass: function(item, group) {
                var result = "k-icon";

                if (group.horizontal) {
                    result += " k-arrow-down";
                } else {
                    result += " k-arrow-right";
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
                return "k-group";
            },
            contentAttributes: function(content) {
                return content.active !== true ? " style='display:none'" : "";
            },
            content: function(item) {
                return item.content ? item.content : item.contentUrl ? "" : "&nbsp;";
            },
            contentUrl: function(item) {
                return item.contentUrl ? kendo.attr("content-url") + '="' + item.contentUrl + '"' : "";
            }
        };

    function updateItemClasses (item, menuElement) {
        item = $(item).addClass("k-item");

        item
            .children(IMG)
            .addClass(IMAGE);
        item
            .children("a")
            .addClass(LINK)
            .children(IMG)
            .addClass(IMAGE);
        item
            .filter(":not([disabled]):not([class*=k-state])")
            .addClass("k-state-default");
        item
            .filter("li[disabled]")
            .addClass("k-state-disabled")
            .removeAttr("disabled");
        item
            .filter(":not([class*=k-state])")
            .children("a:focus")
            .parent()
            .addClass(ACTIVECLASS.substr(1));
        item
            .find(">div")
            .addClass(CONTENT)
            .css({ display: "none" });

        item.each(function() {
            var item = $(this);

            if (!item.children("." + LINK).length) {
                item
                    .contents()      // exclude groups, real links, templates and empty text nodes
                    .filter(function() { return (!this.nodeName.match(excludedNodesRegExp) && !(this.nodeType == 3 && !$.trim(this.nodeValue))); })
                    .wrapAll("<span class='" + LINK + "'/>");
            }
        });

        menuElement
            .find(" > li > ." + LINK)
            .addClass("k-header");
    }

    function updateArrow (items) {
        items = $(items);

        items.children(".k-link").children(".k-icon").remove();

        items
            .filter(":has(.k-group),:has(.k-content)")
            .children(".k-link:not(:has([class*=k-arrow]))")
            .each(function () {
                var item = $(this),
                    parent = item.parent();

                item.append("<span class='k-icon " + (parent.hasClass(ACTIVECLASS.substr(1)) ? "k-arrow-up k-panelbar-collapse" : "k-arrow-down k-panelbar-expand") + "'/>");
            });
    }

    function updateFirstLast (items) {
        items = $(items);

        items.filter(".k-first:not(:first-child)").removeClass(FIRST);
        items.filter(".k-last:not(:last-child)").removeClass(LAST);
        items.filter(":first-child").addClass(FIRST);
        items.filter(":last-child").addClass(LAST);
    }

    var PanelBar = Widget.extend({/** @lends kendo.ui.PanelBar.prototype */
        /**
         * Creates a PanelBar instance.
         * @constructs
         * @extends kendo.ui.Widget
         * @class PanelBar UI widget
         * @param {Selector} element DOM element
         * @param {Object} options Configuration options.
         * @option {Object} [animation] A collection of visual animations
         * used when items are expanded or collapsed through user
         * interaction. Setting this option to <b>false</b> will disable all
         * animations.
           * _example
           * $("#panelBar").kendoPanelBar({
           *  animation: {
           *   close: {
           *    duration: 200,
           *    hide: true,
           *    show: false
           *   }
           *   open: {
           *    duration: 200,
           *    effects: "expandVertical",
           *    show: true
           *   }
           *  }
           * });
         * @option {Object} [animation.open] The animation that will be
         * used when expanding items.
           * _example
           * $("#panelBar").kendoPanelBar({
           *  animation: {
           *   open: {
           *    duration: 200,
           *    effects: "expandVertical",
           *    show: true
           *   }
           *  }
           * });
         * @option {Number} [animation.open.duration] <200> The number of
         * milliseconds used for the animation when an item is expanded.
           * _example
           * $("#panelBar").kendoPanelBar({
           *  animation: {
           *   open: {
           *    duration: 1000
           *   }
           *  }
           * });
         * @option {String} [animation.open.effects] <"expandVertical"> A
         * whitespace-delimited string of animation effects that are utilized
         * when an item is expanded. Options include "expandVertical" and
         * "fadeIn".
         * @option {Boolean} [animation.open.hide]
         * @option {Boolean} [animation.open.show] <true>
         * @option {Object} [animation.close] The animation that will be
         * used when collapsing items.
           * _example
           * $("#panelBar").kendoPanelBar({
           *  animation: {
           *   close: {
           *    duration: 200,
           *    hide: true,
           *    show: false
           *   }
           *  }
           * });
         * @option {Number} [animation.close.duration] <200> The number of
         * milliseconds used for the animation when an item is collapsed.
           * _example
           * $("#panelBar").kendoPanelBar({
           *  animation: {
           *   close: {
           *    duration: 1000
           *   }
           *  }
           * });
         * @option {String} [animation.close.effects] A
         * whitespace-delimited string of animation effects that are utilized
         * when an item is expanded. Options include "fadeOut".
         * @option {Boolean} [animation.close.hide] <true>
         * @option {Boolean} [animation.close.show] <false>
         * @option {String} [expandMode] <"multiple"> Specifies how the
         * <b>PanelBar</b> will display items when expanded. When a value of
         * "single" is specified, only one item will be expanded at a time.
         * That is, when an item is expanded, the <b>PanelBar</b> will
         * collapse the most recently expanded item. When a value of
         * "multiple" is specified, the expansion of one item will not
         * collapse any other iterms.
           * _example
           * $("#panelBar").kendoPanelBar({
           *  expandMode: "single"
           * });
         */
        init: function(element, options) {
            element = $(element);

            var that = this,
                content;

            Widget.fn.init.call(that, element, options);

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
                options.animation = { expand: { show: true, effects: {} }, collapse: { hide:true, effects: {} } };
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
                 * Fires when AJAX request results in an error.
                 * @name kendo.ui.PanelBar#error
                 * @event
                 * @param {Event} e
                 * @param {jqXHR} e.xhr The jqXHR object used to load the content
                 * @param {String} e.status The returned status.
                 */
                ERROR,
                /**
                 * Fires when content is fetched from an AJAX request.
                 * @name kendo.ui.PanelBar#contentLoad
                 * @event
                 * @param {Event} e
                 * @param {Element} e.item The selected item
                 * @param {Element} e.contentElement The loaded content element
                 */
                CONTENTLOAD
            ], that.options);

            if (that.options.contentUrls) {
                element.find("> .k-item")
                    .each(function(index, item) {
                        $(item).find("." + LINK).data(CONTENTURL, that.options.contentUrls[index]);
                    });
            }

            content = element.find("li" + ACTIVECLASS + " > ." + CONTENT);

            if (content.length > 0) {
                that.expand(content.parent(), false);
            }
        },
        options: {
            name: "PanelBar",
            animation: {
                expand: {
                    effects: "expand:vertical",
                    duration: 200,
                    show: true
                },
                collapse: { // if collapse animation effects are defined, they will be used instead of expand.reverse
                    duration: 200
                }
            },
            expandMode: "multiple"
        },

        /**
         * Expands the specified PanelBar item/s
         * @param {Selector} element Target item selector.
         * @param {Boolean} useAnimation Use this parameter to temporary disable the animation. Optional.
         * @example
         * panelBar.expand("#Item1");
         */
        expand: function (element, useAnimation) {
            element = $(element);
            var that = this,
                animBackup = {};
            useAnimation = useAnimation !== false;

            element.each(function (index, item) {
                item = $(item);
                var groups = item.find(GROUPS).add(item.find(CONTENTS));

                if (!item.hasClass(DISABLEDCLASS) && groups.length > 0) {

                    if (that.options.expandMode == SINGLE && that._collapseAllExpanded(item)) {
                        return that;
                    }

                    element.find(HIGHLIGHTEDCLASS).removeClass(HIGHLIGHTEDCLASS.substr(1));
                    item.addClass(HIGHLIGHTEDCLASS.substr(1));

                    if (!useAnimation) {
                        animBackup = that.options.animation;
                        that.options.animation = { expand: { show: true, effects: {} }, collapse: { hide:true, effects: {} } };
                    }

                    that._toggleItem(item, false, null);

                    if (!useAnimation) {
                        that.options.animation = animBackup;
                    }
                }
            });

            return that;
        },

        /**
         * Collapses the specified PanelBar item/s
         * @param {Selector} element Target item selector.
         * @param {Boolean} useAnimation Use this parameter to temporary disable the animation. Optional.
         * @example
         * panelBar.collapse("#Item1");
         */
        collapse: function (element, useAnimation) {
            var that = this,
                animBackup = {};
            useAnimation = useAnimation !== false;

            $(element).each(function (index, item) {
                item = $(item);
                var groups = item.find(GROUPS).add(item.find(CONTENTS));

                if (!item.hasClass(DISABLEDCLASS) && groups.is(VISIBLE)) {
                    item.removeClass(HIGHLIGHTEDCLASS.substr(1));

                    if (!useAnimation) {
                        animBackup = that.options.animation;
                        that.options.animation = { expand: { show: true, effects: {} }, collapse: { hide:true, effects: {} } };
                    }

                    that._toggleItem(item, true, null);

                    if (!useAnimation) {
                        that.options.animation = animBackup;
                    }
                }

            });

            return that;
        },

        _toggleDisabled: function (element, enable) {
            $(element)
                .toggleClass(defaultState, enable)
                .toggleClass(DISABLEDCLASS.substr(1), !enable);
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
                return that.element.find(".k-item > " + SELECTEDCLASS).parent();
            }

            $(element).each(function (index, item) {
                item = $(item);
                var link = item.children("." + LINK);

                if (item.is(DISABLEDCLASS)) {
                    return that;
                }

                $(SELECTEDCLASS, that.element).removeClass(SELECTEDCLASS.substr(1));
                $(HIGHLIGHTEDCLASS, that.element).removeClass(HIGHLIGHTEDCLASS.substr(1));

                link.addClass(SELECTEDCLASS.substr(1));
                link.parentsUntil(that.element, ITEM).filter(":has(.k-header)").addClass(HIGHLIGHTEDCLASS.substr(1));
            });

            return that;
        },

        /**
         * Enables (true) or disables (false) an item(s) of the PanelBar.
         * @param {Selector} element The target element(s) to be enabled (true) or disabled (false).
         * @param {Boolean} enable The desired state - enabled (true) or disabled (false) - of the target element(s).
         * @example
         * var panelBar = $("#panelBar").kendoPanelBar().data("kendoPanelBar");
         * var item = panelBar.select();
         * panelBar.enable(item, false);
         */
        enable: function (element, state) {
            this._toggleDisabled(element, state !== false);

            return this;
        },

        /**
         * Disables an item(s) of the PanelBar.
         * @param {Selector} element The target element(s) to be disabled.
         * @example
         * var panelBar = $("#panelBar").kendoPanelBar().data("kendoPanelBar");
         * var item = panelBar.select();
         * panelBar.disable(item);
         */
        disable: function (element) {
            this._toggleDisabled(element, false);

            return this;
        },

        /**
         * Appends a PanelBar item in the specified referenceItem
         * @param {Selector} item Target item, specified as the JSON representation of an object. You can pass item text, content or contentUrl here. Can handle an HTML string or array of such strings or JSON.
         * @param {Item} referenceItem A reference item to append the new item in
         * @example
         * panelBar.append(
         *  [{
         *   text: "Item 1",
         *   url: "http://www.kendoui.com/"                // Link URL if navigation is needed, optional.
         *   },
         *   {
         *    text: "Item 2",
         *    content: "text"                              // Content for the content element
         *   },
         *   {
         *    text: "Item 3",
         *    contentUrl: "partialContent.html"            // From where to load the item content
         *   },
         *   {
         *    text: "Item 4",
         *    imageUrl: "http://www.kendoui.com/test.jpg", // Item image URL, optional.
         *    items: [{                                    // Sub item collection.
         *              text: "Sub Item 1"
         *         },
         *         {
         *              text: "Sub Item 2"
         *         }]
         *     },
         *     {
         *         text: "Item 5",
         *         spriteCssClass: "imageClass3"                // Item image sprite CSS class, optional.
         *     }],
         *     referenceItem
         * );
         */
        append: function (item, referenceItem) {
            referenceItem = $(referenceItem);

            var inserted = this._insert(item, referenceItem, referenceItem.length ? referenceItem.find("> .k-group") : null);

            each(inserted.items, function (idx) {
                inserted.group.append(this);

                var contents = inserted.contents[idx];
                if (contents)
                    $(this).append(contents);

                updateFirstLast(this);
            });

            updateArrow(referenceItem);
            updateFirstLast(inserted.group.find(".k-first, .k-last"));
            inserted.group.height("auto");

            return this;
        },

        /**
         * Inserts a PanelBar item before the specified referenceItem
         * @param {Selector} item Target item, specified as a JSON object. You can pass item text, content or contentUrl here. Can handle an HTML string or array of such strings or JSON.
         * @param {Item} referenceItem A reference item to insert the new item before
         * @example
         * panelBar.insertBefore(
         *     [{
         *         text: "Item 1",
         *         url: "http://www.kendoui.com"                // Link URL if navigation is needed, optional.
         *     },
         *     {
         *         text: "Item 2",
         *         content: "text"                              // Content for the content element
         *     },
         *     {
         *         text: "Item 3",
         *         contentUrl: "partialContent.html"            // From where to load the item content
         *     },
         *     {
         *         text: "Item 4",
         *         imageUrl: "http://www.kendoui.com/test.jpg", // Item image URL, optional.
         *         items: [{                                    // Sub item collection.
         *              text: "Sub Item 1"
         *         },
         *         {
         *              text: "Sub Item 2"
         *         }]
         *     },
         *     {
         *         text: "Item 5",
         *         spriteCssClass: "imageClass3"                // Item image sprite CSS class, optional.
         *     }],
         *     referenceItem
         * );
         */
        insertBefore: function (item, referenceItem) {
            referenceItem = $(referenceItem);

            var inserted = this._insert(item, referenceItem, referenceItem.parent());

            each(inserted.items, function (idx) {
                referenceItem.before(this);

                var contents = inserted.contents[idx];
                if (contents)
                    $(this).append(contents);

                updateFirstLast(this);
            });

            updateFirstLast(referenceItem);
            inserted.group.height("auto");

            return this;
        },

        /**
         * Inserts a PanelBar item after the specified referenceItem
         * @param {Selector} item Target item, specified as a JSON object. You can pass item text, content or contentUrl here. Can handle an HTML string or array of such strings or JSON.
         * @param {Item} referenceItem A reference item to insert the new item after
         * @example
         * panelBar.insertAfter(
         *     [{
         *         text: "Item 1",
         *         url: "http://www.kendoui.com"                // Link URL if navigation is needed, optional.
         *     },
         *     {
         *         text: "Item 2",
         *         content: "text"                              // Content for the content element
         *     },
         *     {
         *         text: "Item 3",
         *         contentUrl: "partialContent.html"            // From where to load the item content
         *     },
         *     {
         *         text: "Item 4",
         *         imageUrl: "http://www.kendoui.com/test.jpg", // Item image URL, optional.
         *         items: [{                                    // Sub item collection.
         *              text: "Sub Item 1"
         *         },
         *         {
         *              text: "Sub Item 2"
         *         }]
         *     },
         *     {
         *         text: "Item 5",
         *         spriteCssClass: "imageClass3"                // Item image sprite CSS class, optional.
         *     }],
         *     referenceItem
         * );
         */
        insertAfter: function (item, referenceItem) {
            referenceItem = $(referenceItem);

            var inserted = this._insert(item, referenceItem, referenceItem.parent());

            each(inserted.items, function (idx) {
                referenceItem.after(this);

                var contents = inserted.contents[idx];
                if (contents)
                    $(this).append(contents);

                updateFirstLast(this);
            });

            updateFirstLast(referenceItem);
            inserted.group.height("auto");

            return this;
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

                updateArrow(parent);
                updateFirstLast(parent);
            }

            return that;
        },

        /**
         * Reloads a PanelBar content from ajax request
         * @param {Selector} element Target element
         */
        reload: function (element) {
            var that = this;

            $(element).each(function () {
                var item = $(this);

                that._ajaxRequest(item, item.children("." + CONTENT), !item.is(VISIBLE));
            });

            return that;
        },

        _insert: function (item, referenceItem, parent) {
            var that = this, contents = [];

            if (!referenceItem || !referenceItem.length) {
                parent = that.element;
            }

            var plain = $.isPlainObject(item),
                items,
                groupData = {
                    firstLevel: parent.hasClass("k-panelbar"),
                    expanded: parent.parent().hasClass("k-state-active"),
                    length: parent.children().length
                };

            if (referenceItem && !parent.length) {
                parent = $(PanelBar.renderGroup({ group: groupData })).appendTo(referenceItem);
            }

            if (plain || $.isArray(item)) { // is JSON
                items = $.map(plain ? [ item ] : item, function (value, idx) {
                            if (typeof value === "string") {
                                return $(value);
                            } else {
                                return $(PanelBar.renderItem({
                                    group: groupData,
                                    item: extend(value, { index: idx })
                                }));
                            }
                        });
                contents = $.map(plain ? [ item ] : item, function (value, idx) {
                            if (value.content || value.contentUrl) {
                                return $(PanelBar.renderContent({
                                    item: extend(value, { index: idx })
                                }));
                            } else {
                                return false;
                            }
                        });
            } else {
                items = $(item);

                updateItemClasses(items, that.element);
            }

            return { items: items, group: parent, contents: contents };
        },

        _toggleHover: function(e) {
            var target = $(e.currentTarget);

            if (!target.parents("li" + DISABLEDCLASS).length) {
                target.toggleClass("k-state-hover", e.type == MOUSEENTER);
            }
        },

        _updateClasses: function() {
            var that = this;

            that.element.addClass("k-widget k-reset k-header k-panelbar");

            var items = that.element
                            .find("li > ul")
                            .addClass("k-group")
                            .end()
                            .find("li:not(" + ACTIVECLASS + ") > ul")
                            .css({ display: "none" })
                            .end()
                            .find("> li,.k-group > li");

            items.each(function () {
                updateItemClasses(this, that.element);
            });

            updateArrow(items);
            updateFirstLast(items);
        },

        _click: function (e) {
            var that = this,
                target = $(e.currentTarget),
                element = that.element;

            if (target.parents("li" + DISABLEDCLASS).length) {
                return;
            }

            if (target.closest(".k-widget")[0] != element[0]) {
                return;
            }

            var link = target.closest("." + LINK),
                item = link.closest(ITEM);

            $(SELECTEDCLASS, element).removeClass(SELECTEDCLASS.substr(1));
            $(HIGHLIGHTEDCLASS, element).removeClass(HIGHLIGHTEDCLASS.substr(1));

            link.addClass(SELECTEDCLASS.substr(1));
            link.parentsUntil(that.element, ITEM).filter(":has(.k-header)").addClass(HIGHLIGHTEDCLASS.substr(1));

            var contents = item.find(GROUPS).add(item.find(CONTENTS)),
                href = link.attr(HREF),
                isAnchor = link.data(CONTENTURL) || (href && (href.charAt(href.length - 1) == "#" || href.indexOf("#" + that.element[0].id + "-") != -1));

            if (contents.data("animating")) {
                return;
            }

            if (that._triggerEvent(SELECT, item)) {
                e.preventDefault();
            }

            if (isAnchor || contents.length) {
                e.preventDefault();
            } else {
                return;
            }

            if (that.options.expandMode == SINGLE) {
                if (that._collapseAllExpanded(item)) {
                    return;
                }
            }

            if (contents.length) {
                var visibility = contents.is(VISIBLE);

                if (!that._triggerEvent(!visibility ? EXPAND : COLLAPSE, item)) {
                    that._toggleItem(item, visibility, e);
                }
            }
        },

        _toggleItem: function (element, isVisible, e) {
            var that = this,
                childGroup = element.find("> .k-group");

            if (childGroup.length) {

                this._toggleGroup(childGroup, isVisible);

                if (e) {
                    e.preventDefault();
                }
            } else {

                var content = element.find("> ."  + CONTENT);

                if (content.length) {
                    if (e) {
                        e.preventDefault();
                    }

                    if (!content.is(EMPTY)) {
                        that._toggleGroup(content, isVisible);
                    } else {
                        that._ajaxRequest(element, content, isVisible);
                    }
                }
            }
        },

        _toggleGroup: function (element, visibility) {
            var that = this,
                animationSettings = that.options.animation,
                animation = animationSettings.expand,
                collapse = extend({}, animationSettings.collapse),
                hasCollapseAnimation = collapse && "effects" in collapse;

            if (element.is(VISIBLE) != visibility) {
                return;
            }

            visibility && element.css("height", element.height()); // Set initial height on visible items (due to a Chrome bug/feature).
            element.css("height");

            element
                .parent()
                .toggleClass(defaultState, visibility)
                .toggleClass(ACTIVECLASS.substr(1), !visibility)
                .find("> .k-link > .k-icon")
                    .toggleClass("k-arrow-up", !visibility)
                    .toggleClass("k-panelbar-collapse", !visibility)
                    .toggleClass("k-arrow-down", visibility)
                    .toggleClass("k-panelbar-expand", visibility);

            if (visibility) {
                animation = extend( hasCollapseAnimation ? collapse
                                    : extend({ reverse: true }, animation), { show: false, hide: true });
            }

            element
                .kendoStop(true, true)
                .kendoAnimate( animation );
        },

        _collapseAllExpanded: function (item) {
            var that = this;

            if (item.find("> ." + LINK).hasClass("k-header")) {
                var groups = item.find(GROUPS).add(item.find(CONTENTS));
                if (groups.is(VISIBLE) || groups.length == 0) {
                    return true;
                } else {
                    var children = $(that.element).children();
                    children.find(GROUPS).add(children.find(CONTENTS))
                            .filter(function () { return $(this).is(VISIBLE) })
                            .each(function (index, content) {
                                that._toggleGroup($(content), true);
                            });
                }
            }
        },

        _ajaxRequest: function (element, contentElement, isVisible) {

            var that = this,
                statusIcon = element.find(".k-panelbar-collapse, .k-panelbar-expand"),
                link = element.find("." + LINK),
                loadingIconTimeout = setTimeout(function () {
                    statusIcon.addClass("k-loading");
                }, 100),
                data = {};

            $.ajax({
                type: "GET",
                cache: false,
                url: link.data(CONTENTURL) || link.attr(HREF),
                dataType: "html",
                data: data,

                error: function (xhr, status) {
                    if (that.trigger(ERROR, { xhr: xhr, status: status })) {
                        this.complete();
                    }
                },

                complete: function () {
                    clearTimeout(loadingIconTimeout);
                    statusIcon.removeClass("k-loading");
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

            var empty = templates.empty,
                item = options.item,
                panelBar = options.panelBar;

            return templates.item(extend(options, {
                image: item.imageUrl ? templates.image : empty,
                sprite: item.spriteCssClass ? templates.sprite : empty,
                itemWrapper: templates.itemWrapper,
                arrow: item.items ? templates.arrow : empty,
                subGroup: PanelBar.renderGroup
            }, rendering));
        },

        renderGroup: function (options) {
            return templates.group(extend({
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
            }, options, rendering));
        },

        renderContent: function (options) {
            return templates.content(extend(options, rendering));
        }
    });

    kendo.ui.plugin(PanelBar);

})(jQuery);
