/**
 * @fileOverview Provides a TabStrip implementation which can be used to display a collection of tabs with associated
 * content
 */

(function ($, undefined) {
    /**
     *
     * @name kendo.ui.TabStrip.Description
     *
     * @section
     * <p>
     *  A <strong>TabStrip</strong> displays a collection of tabs with associated content. It is composed of an
     *  unordered list of items - representing tabs - and a collection of div elements, which contain the content for
     *  each tab.
     * </p>
     * <h3>Getting Started</h3>
     *
     * @exampleTitle Create an unordered list for tabs with associated div elements for content
     * @example
     * <div id="tabStrip">
     *     <ul>
     *         <li>First tab</li>
     *         <li>Second tab</li>
     *     </ul>
     *     <div>First tab content</div>
     *     <div>Second tab content</div>
     * </div>
     *
     * @section
     * <p>
     *  Initialization of a <strong>TabStrip</strong> should occur after the DOM is fully loaded. It is recommended
     *  that initialization the <strong>TabStrip</strong> occur within a handler is provided to $(document).ready().
     * </p>
     *
     * @exampleTitle Initialize a TabStrip using a selector within $(document).ready()
     * @example
     * $(document).ready(function() {
     *     $("#tabStrip").kendoTabStrip();
     * });
     *
     * @exampleTitle Initialize the TabStrip using JSON data object
     * @example
     * $(document).ready(function() {
     *     $("#tabstrip").kendoTabStrip({
     *         dataTextField: "text",
     *         dataContentField: "content",
     *         dataSource:
     *         [
     *             { text: "Tab 1", content: "Tab 1 content" },
     *             { text: "Tab 2", content: "Tab 2 content" }
     *         ]
     *     });
     * });
     *
     * @section
     * <p>
     *  The tabs of a <strong>TabStrip</strong> are not required to have content. Should a tab have no content, it is
     *  safe to omit its associated div.
     * </p>
     * <h3>Loading TabStrip content with AJAX</h3>
     * <p>
     *  While any valid technique for loading AJAX content can be used, a <strong>TabStrip</strong> supports loading
     *  content from URLs in an asynchronous manner. These URLs should return HTML fragments that can be loaded in a
     *  TabStrip content area.
     * </p>
     *
     * @exampleTitle Loading Tab content asynchronously
     * @example
     * <div id="tabstrip">
     *     <ul>
     *         <li>First Tab</li>
     *         <li>Second Tab</li>
     *     </ul>
     *     <div></div>
     *     <div></div>
     *  </div>
     *
     * @exampleTitle Initialize TabStrip and configure one tab with async content loading
     * @example
     * $(document).ready(function(){
     *     $("#tabstrip").kendoTabStrip({
     *         contentUrls: [null, "html-content-snippet.html"]
     *     });
     *  });
     *
     * @section
     * <h3>Dynamically Configure TabStrip Tabs</h3>
     * <p>
     *  The <strong>TabStrip</strong> API provides several methods for dynamically adding or removing tabs. To add
     *  tabs, provide the new item as a JSON object along with a reference item that will be used to determine the
     *  placement in the <strong>TabStrip</strong>. Note: append() does not require a reference item.
     * <p>
     * <p>
     *  A reference item is simply a target DOM element of a tab that already exists in the TabStrip. Any valid
     *  selector may be used to obtain a reference to the target item.
     * </p>
     * <p>Removing an item requires a reference to the target element.</p>
     *
     * @exampleTitle Dynamically add a new tab
     * @example
     * var tabStrip = $("#tabStrip").data("kendoTabStrip");
     * tabStrip.insertAfter(
     *     { text: "New Tab" },
     *     tabstrip.tabGroup.children("li:last")
     * );
     *
     * @section
     * <h3>Selecting a Tab on Initial Load</h3>
     * <p>
     *  It is possible to select a tab and display its associated content upon its initial load. There are two (2) ways
     *  to accomplish this task:
     * </p>
     * <ol>
     *  <li>Add a "k-state-active" class to the DOM element of the tab</li>
     *  <li>Use select() to target and select a tab either by selector or index</li>
     * </ol>
     * <p>Both approaches produce the same result.</p>
     *
     * @exampleTitle Selecting a default tab manually using HTML
     * @example
     * <div id="tabstrip">
     *     <ul>
     *         <li class="k-state-active">First Tab</li>
     *         <li>Second Tab</li>
     *     </ul>
     *     <div></div>
     *     <div></div>
     * </div>
     *
     * @exampleTitle Initialize a TabStrip and select first tab via select(element)
     * @example
     * $(document).ready(function(){
     *     var tabstrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
     *     tabstrip.select(tabstrip.tabGroup.children("li:first"));
     * });
     *
     * @exampleTitle Initialize a TabStrip and select first tab via select(index)
     * @example
     * $(document).ready(function(){
     *     var tabstrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
     *     tabstrip.select(1);
     * });
     *
     * @section
     * <h3>Accessing an Existing TabStrip</h3>
     * <p>
     *  You can reference an existing <b>TabStrip</b> instance via
     *  <a href="http://api.jquery.com/jQuery.data/">jQuery.data()</a>. Once a reference has been established, you can
     *  use the API to control its behavior.
     * </p>
     *
     * @exampleTitle Accessing an existing TabStrip instance
     * @example
     * var tabStrip = $("#tabStrip").data("kendoTabStrip");
     *
     */
    var kendo = window.kendo,
        ui = kendo.ui,
        map = $.map,
        each = $.each,
        trim = $.trim,
        extend = $.extend,
        template = kendo.template,
        Widget = ui.Widget,
        excludedNodesRegExp = /^(a|div)$/i,
        IMG = "img",
        HREF = "href",
        LINK = "k-link",
        LAST = "k-last",
        CLICK = "click",
        ERROR = "error",
        EMPTY = ":empty",
        IMAGE = "k-image",
        FIRST = "k-first",
        SELECT = "select",
        ACTIVATE = "activate",
        CONTENT = "k-content",
        CONTENTURL = "contentUrl",
        MOUSEENTER = "mouseenter",
        MOUSELEAVE = "mouseleave",
        CONTENTLOAD = "contentLoad",
        CLICKABLEITEMS = ".k-tabstrip-items > .k-item:not(.k-state-disabled)",
        HOVERABLEITEMS = ".k-tabstrip-items > .k-item:not(.k-state-disabled):not(.k-state-active)",
        DISABLEDLINKS = ".k-tabstrip-items > .k-state-disabled .k-link",
        DISABLEDSTATE = "k-state-disabled",
        DEFAULTSTATE = "k-state-default",
        ACTIVESTATE = "k-state-active",
        HOVERSTATE = "k-state-hover",
        TABONTOP = "k-tab-on-top",

        templates = {
            content: template(
                "<div class='k-content'#= contentAttributes(data) #>#= content(item) #</div>"
            ),
            itemWrapper: template(
                "<#= tag(item) # class='k-link'#= contentUrl(item) ##= textAttributes(item) #>" +
                    "#= image(item) ##= sprite(item) ##= text(item) #" +
                "</#= tag(item) #>"
            ),
            item: template(
                "<li class='#= wrapperCssClass(group, item) #'>" +
                    "#= itemWrapper(data) #" +
                "</li>"
            ),
            image: template("<img class='k-image' alt='' src='#= imageUrl #' />"),
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
            textAttributes: function(item) {
                return item.url ? " href='" + item.url + "'" : "";
            },
            text: function(item) {
                return item.encoded === false ? item.text : kendo.htmlEncode(item.text);
            },
            tag: function(item) {
                return item.url ? "a" : "span";
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

    function updateTabClasses (tabs) {
        tabs.children(IMG)
            .addClass(IMAGE);

        tabs.children("a")
            .addClass(LINK)
            .children(IMG)
            .addClass(IMAGE);

        tabs.filter(":not([disabled]):not([class*=k-state-disabled])")
            .addClass(DEFAULTSTATE);

        tabs.filter("li[disabled]")
            .addClass(DISABLEDSTATE)
            .removeAttr("disabled");

        tabs.filter(":not([class*=k-state])")
            .children("a:focus")
            .parent()
            .addClass(ACTIVESTATE + " " + TABONTOP);

        tabs.each(function() {
            var item = $(this);

            if (!item.children("." + LINK).length) {
                item
                    .contents()      // exclude groups, real links, templates and empty text nodes
                    .filter(function() { return (!this.nodeName.match(excludedNodesRegExp) && !(this.nodeType == 3 && !trim(this.nodeValue))); })
                    .wrapAll("<a class='" + LINK + "'/>");
            }
        });

    }

    function updateFirstLast (tabGroup) {
        var tabs = tabGroup.children(".k-item");

        tabs.filter(".k-first:not(:first-child)").removeClass(FIRST);
        tabs.filter(".k-last:not(:last-child)").removeClass(LAST);
        tabs.filter(":first-child").addClass(FIRST);
        tabs.filter(":last-child").addClass(LAST);
    }

    var TabStrip = Widget.extend({/** @lends kendo.ui.TabStrip.prototype */
        /**
         *
         * Creates a TabStrip instance.
         *
         * @constructs
         * @extends kendo.ui.Widget
         * @class TabStrip UI widget
         *
         * @param {Selector} element DOM element
         * @param {Object} options Configuration options.
         *
         * @option {Object} [animation]
         * A collection of <strong>Animation</strong> objects, used to change default animations. A value of
         * <strong>false</strong> will disable all animations.
         *
         * @option {Animation} [animation.open]
         * The animation that will be used when opening content.
         *
         * @option {Animation} [animation.close]
         * The animation that will be used when closing content.
         *
         */
        init: function(element, options) {
            var that = this;

            that._animations(options);

            Widget.fn.init.call(that, element, options);

            if (that.element.is("ul")) {
                that.wrapper = that.element.wrapAll("<div />").parent();
            } else {
                that.wrapper = that.element;
            }

            options = that.options;

            that.wrapper
                .delegate(CLICKABLEITEMS, CLICK, $.proxy(that._click, that))
                .delegate(HOVERABLEITEMS, MOUSEENTER + " " + MOUSELEAVE, that._toggleHover)
                .delegate(DISABLEDLINKS, CLICK, false);

            that._updateClasses();

            that.dataSource = kendo.data.DataSource.create(options.dataSource);
            that.dataSource.bind("change", $.proxy(that.refresh, that));

            if (options.dataSource) {
                that.dataSource.fetch();
            }

            if (that.options.contentUrls) {
                that.wrapper.find(".k-tabstrip-items > .k-item")
                    .each(function(index, item) {
                        $(item).find(">." + LINK).data(CONTENTURL, that.options.contentUrls[index]);
                    });
            }

            var selectedItems = that.wrapper.find("li." + ACTIVESTATE),
                content = $(that.contentElement(selectedItems.parent().children().index(selectedItems)));

            if (content.length > 0 && content[0].childNodes.length == 0) {
                that.activateTab(selectedItems.eq(0));
            }

            kendo.notify(that);
        },

        _animations: function(options) {
            if (options && ("animation" in options) && !options.animation) {
                options.animation = { open: { effects: {}, show: true }, close: { effects: {} } }; // No animation
            }
        },

        refresh: function(e) {
            var that = this,
                html = "",
                options = that.options,
                text = kendo.getter(options.dataTextField),
                content = kendo.getter(options.dataContentField),
                contentUrl = kendo.getter(options.dataContentUrlField),
                image = kendo.getter(options.dataImageUrlField),
                url = kendo.getter(options.dataUrlField),
                sprite = kendo.getter(options.dataSpriteCssClass),
                idx,
                tabs = [],
                tab,
                action,
                view = that.dataSource.view(),
                length;


            e = e || {};
            action = e.action;

            if (action) {
               view = e.items;
            }

            for (idx = 0, length = view.length; idx < length; idx ++) {
                tab = {
                    text: text(view[idx])
                };

                if (options.dataContentField) {
                    tab.content = content(view[idx]);
                }

                if (options.dataContentUrlField) {
                    tab.contentUrl = contentUrl(view[idx]);
                }

                if (options.dataUrlField) {
                    tab.url = url(view[idx]);
                }

                if (options.dataImageUrlField) {
                    tab.imageUrl = image(view[idx]);
                }

                if (options.dataSpriteCssClass) {
                    tab.spriteCssClass = sprite(view[idx]);
                }

                tabs[idx] = tab;
            }

            if (e.action == "add") {
                if (e.index < that.tabGroup.children().length) {
                    that.insertBefore(tabs, that.tabGroup.children().eq(e.index));
                } else {
                    that.append(tabs);
                }
            } else if (e.action == "remove") {
                for (idx = 0; idx < view.length; idx++) {
                   that.remove(e.index);
                }
            } else if (e.action == "itemchange") {
                idx = that.dataSource.view().indexOf(view[0]);
                if (e.field === options.dataTextField) {
                    that.tabGroup.children().eq(idx).find(".k-link").text(view[0].get(e.field));
                }
            } else {
                that.trigger("dataBinding");
                that.append(tabs);
                that.trigger("dataBound");
            }
        },

        value: function(value) {
            var that = this;

            if (value !== undefined) {
                if (value != that.value()) {
                   that.tabGroup.children().each(function() {
                        if ($.trim($(this).text()) == value) {
                            that.select(this);
                        }
                   });
                }
            } else {
                return that.select().text();
            }
        },

        items: function() {
            return this.tabGroup[0].children;
        },

        setOptions: function(options) {
            var animation = this.options.animation;

            this._animations(options);

            options.animation = extend(true, animation, options.animation);

            Widget.fn.setOptions.call(this, options);
        },

        events: [
            /**
             *
             * Triggered before a tab is selected.
             *
             * @name kendo.ui.TabStrip#select
             * @event
             *
             * @param {Event} e
             *
             * @param {HTMLElement} e.item
             * The selected item chosen by a user.
             *
             * @param {Element} e.contentElement
             * The content element of the tab going to be selected.
             *
             * @exampleTitle Attach select event handler during initialization; detach via unbind()
             * @example
             * // event handler for select
             * var onSelect = function(e) {
             *     // access the selected item via e.item (HTMLElement)
             * };
             *
             * // attach select event handler during initialization
             * var tabStrip = $("#tabStrip").kendoTabStrip({
             *     select: onSelect
             * });
             *
             * // detach select event handler via unbind()
             * tabStrip.data("kendoTabStrip").unbind("select", onSelect);
             *
             * @exampleTitle Attach select event handler via bind(); detach via unbind()
             * @example
             * // event handler for select
             * var onSelect = function(e) {
             *     // access the selected item via e.item (HTMLElement)
             * };
             *
             * // attach select event handler via bind()
             * $("#tabStrip").data("kendoTabStrip").bind("select", onSelect);
             *
             * // detach select event handler via unbind()
             * $("#tabStrip").data("kendoTabStrip").unbind("select", onSelect);
             *
             */
            SELECT,
            /**
             * Triggered just after a tab is being made visible, but before the end of the animation
             *
             * @name kendo.ui.TabStrip#activate
             * @event
             *
             * @param {Event} e
             *
             * @param {HTMLElement} e.item
             * The activated tab.
             *
             * @param {Element} e.contentElement
             * The content element of the activated tab.
             *
             * @exampleTitle Attach activate event handler during initialization; detach via unbind()
             * @example
             * // event handler for activate
             * var onActivate = function(e) {
             *     // access the activated item via e.item (HTMLElement)
             * };
             *
             * // attach activate event handler during initialization
             * var tabStrip = $("#tabStrip").kendoTabStrip({
             *     activate: onActivate
             * });
             *
             * // detach activate event handler via unbind()
             * tabStrip.data("kendoTabStrip").unbind("activate", onActivate);
             *
             * @exampleTitle Attach activate event handler via bind(); detach via unbind()
             * @example
             * // event handler for activate
             * var onActivate = function(e) {
             *     // access the activated item via e.item (HTMLElement)
             * };
             *
             * // attach activate event handler via bind()
             * $("#tabStrip").data("kendoTabStrip").bind("activate", onActivate);
             *
             * // detach activate event handler via unbind()
             * $("#tabStrip").data("kendoTabStrip").unbind("activate", onActivate);
             *
             */
            ACTIVATE,
            /**
             *
             * Triggered when an AJAX request results in an error.
             *
             * @name kendo.ui.TabStrip#error
             * @event
             *
             * @param {Event} e
             *
             * @param {jqXHR} e.xhr
             * The jqXHR object used to load the content
             *
             * @param {String} e.status
             * The returned status.
             *
             */
            ERROR,
            /**
             *
             * Triggered when content is fetched from an AJAX request.
             *
             * @name kendo.ui.TabStrip#contentLoad
             * @event
             *
             * @param {Event} e
             *
             * @param {Element} e.item
             * The selected item
             *
             * @param {Element} e.contentElement
             * The loaded content element that is retrieved via AJAX.
             *
             */
            CONTENTLOAD,
            "change",
            "dataBinding",
            "dataBound"
        ],

        options: {
            name: "TabStrip",
            dataTextField: "",
            dataContentField: "",
            dataImageUrlField: "",
            dataUrlField: "",
            dataSpriteCssClass: "",
            dataContentUrlField: "",
            animation: {
                open: {
                    effects: "expand:vertical fadeIn",
                    duration: 200,
                    show: true
                },
                close: { // if close animation effects are defined, they will be used instead of open.reverse
                    duration: 200
                }
            },
            collapsible: false
        },

        /**
         *
         * Selects the specified tab(s) within a <strong>TabStrip</strong>. If called without arguments, it returns the
         * currently selected tab.
         *
         * @param {Selector/Index} element or index
         * The target tab(s), specified as a selector or index in the tab group.
         *
         * @example
         * tabStrip.select("#tab1");
         *
         * @example
         * tabStrip.select(1);
         *
         * @returns {TabStrip}
         * Returns the TabStrip object to support chaining.
         *
         */
        select: function (element) {
            var that = this;
            element = that.element.find(element);

            if (arguments.length == 0) {
                return that.wrapper.find("li." + ACTIVESTATE);
            }

            if (!isNaN(element)) {
                element = that.tabGroup.children().get(element);
            }

            $(element).each(function (index, item) {
                item = $(item);
                if (!item.hasClass(ACTIVESTATE) && !that.trigger(SELECT, { item: item[0], contentElement: that.contentElement(item.index()) })) {
                    that.activateTab(item);
                }
            });

            return that;
        },

        /**
         *
         * Disables (<strong>false</strong>) or enables (<strong>true</strong>) a tab(s) of a <strong>TabStrip</strong>.
         *
         * @param {Selector} element
         * The target tab(s), specified as a selector, to be enabled (<strong>true</strong>) or disabled
         * (<strong>false</strong>).
         *
         * @param {Boolean} enable
         * Desired state of the tab(s) specified by the selector; enabled (<strong>true</strong>) or disabled
         * (<strong>false</strong>).
         *
         * @returns {TabStrip}
         * Returns the TabStrip object to support chaining.
         *
         */
        enable: function (element, state) {
            this._toggleDisabled(element, state !== false);

            return this;
        },

        /**
         *
         * Disables a tab(s) of a <strong>TabStrip</strong>.
         *
         * @param {Selector} element
         * The target tab(s), specified as a selector, to be disabled.
         *
         * @returns {TabStrip}
         * Returns the TabStrip object to support chaining.
         *
         */
        disable: function (element) {
            this._toggleDisabled(element, false);

            return this;
        },

        /**
         *
         * Reloads TabStrip tab(s) via AJAX.
         *
         * @param {Selector} element
         * The target tab(s), specified as a selector, to be reloaded via AJAX.
         *
         * @returns {TabStrip}
         * Returns the TabStrip object to support chaining.
         *
         */
        reload: function (element) {
            element = this.tabGroup.find(element);
            var that = this;

            element.each(function () {
                var item = $(this),
                    contentUrl = item.find("." + LINK).data(CONTENTURL);

                if (contentUrl) {
                    that.ajaxRequest(item, $(that.contentElement(item.index())), null, contentUrl);
                }
            });

            return that;
        },

        /**
         *
         * Appends a tab to the collection of tabs in a <strong>TabStrip</strong>.
         *
         * @param {Selector} tab
         * Target tab, specified as a JSON object. You can pass tab text, content or contentUrl here. Can handle an
         * HTML string or array of such strings or JSON.
         *
         * @returns {TabStrip}
         * Returns the TabStrip object to support chaining.
         *
         * @example
         * tabStrip.append(
         *     [{
         *         text: "Item 1",
         *         url: "http://www.kendoui.com"               // Link URL if navigation is needed, optional.
         *     },
         *     {
         *         text: "Item 2",
         *         content: "text"                             // Content for the content element
         *     },
         *     {
         *         text: "Item 3",
         *         contentUrl: "partialContent.html"           // From where to load the item content
         *     },
         *     {
         *         text: "Item 4",
         *         imageUrl: "http://www.kendoui.com/test.jpg" // Item image URL, optional.
         *     },
         *     {
         *         text: "Item 5",
         *         spriteCssClass: "imageClass3"               // Item image sprite CSS class, optional.
         *     }]
         * );
         *
         */
        append: function (tab) {
            var that = this,
                inserted = that._create(tab);

            each(inserted.tabs, function (idx) {
                that.tabGroup.append(this);
                that.wrapper.append(inserted.contents[idx]);
            });

            updateFirstLast(that.tabGroup);
            that._updateContentElements();

            return that;
        },

        /**
         *
         * Inserts a newly-created tab before a specified tab.
         *
         * @param {Selector} item
         * Target tab, specified as a JSON object. You can pass tab text, content or contentUrl here. Can handle an
         * HTML string or array of such strings or JSON.
         *
         * @param {Item} referenceTab
         * A reference tab to insert the new item before
         *
         * @returns {TabStrip}
         * Returns the TabStrip object to support chaining.
         *
         * @example
         * tabStrip.insertBefore(
         *     [{
         *         text: "Item 1",
         *         url: "http://www.kendoui.com"               // Link URL if navigation is needed, optional.
         *     },
         *     {
         *         text: "Item 2",
         *         content: "text"                             // Content for the content element
         *     },
         *     {
         *         text: "Item 3",
         *         contentUrl: "partialContent.html"           // From where to load the item content
         *     },
         *     {
         *         text: "Item 4",
         *         imageUrl: "http://www.kendoui.com/test.jpg" // Item image URL, optional.
         *     },
         *     {
         *         text: "Item 5",
         *         spriteCssClass: "imageClass3"               // Item image sprite CSS class, optional.
         *     }],
         *     referenceItem
         * );
         */
        insertBefore: function (tab, referenceTab) {
            var that = this,
                inserted = that._create(tab),
                referenceContent = $(that.contentElement(referenceTab.index()));

            each(inserted.tabs, function (idx) {
                referenceTab.before(this);
                referenceContent.before(inserted.contents[idx]);
            });

            updateFirstLast(that.tabGroup);
            that._updateContentElements();

            return that;
        },

        /**
         *
         * Inserts a newly-created tab after a specified tab.
         *
         * @param {Selector} item
         * Target tab, specified as a JSON object. You can pass tab text, content or contentUrl here. Can handle an
         * HTML string or array of such strings or JSON.
         *
         * @param {Item} referenceTab
         * A reference tab to insert the new item after.
         *
         * @returns {TabStrip}
         * Returns the TabStrip object to support chaining.
         *
         * @example
         * tabStrip.insertAfter(
         *     [{
         *         text: "Item 1",
         *         url: "http://www.kendoui.com"               // Link URL if navigation is needed, optional.
         *     },
         *     {
         *         text: "Item 2",
         *         content: "text"                             // Content for the content element
         *     },
         *     {
         *         text: "Item 3",
         *         contentUrl: "partialContent.html"           // From where to load the item content
         *     },
         *     {
         *         text: "Item 4",
         *         imageUrl: "http://www.kendoui.com/test.jpg" // Item image URL, optional.
         *     },
         *     {
         *         text: "Item 5",
         *         spriteCssClass: "imageClass3"               // Item image sprite CSS class, optional.
         *     }],
         *     referenceItem
         * );
         *
         */
        insertAfter: function (tab, referenceTab) {
            var that = this,
                inserted = that._create(tab),
                referenceContent = $(that.contentElement(referenceTab.index()));

            each(inserted.tabs, function (idx) {
                referenceTab.after(this);
                referenceContent.after(inserted.contents[idx]);
            });

            updateFirstLast(that.tabGroup);
            that._updateContentElements();

            return that;
        },

        /**
         *
         * Removes a specified tab from a TabStrip.
         *
         * @param {Selector} element
         * The target tab(s), specified as a selector, to be removed.
         *
         * @returns {TabStrip}
         * Returns the TabStrip object to support chaining.
         *
         * @exampleTitle Remove a tab with ID, tab1 from a TabStrip
         * @example
         * tabStrip.remove("#tab1");
         *
         */
        remove: function (element) {
            var that = this,
                type = typeof element,
                content;

            if (type === "string") {
                element = that.tabGroup.find(element);
            } else if (type === "number") {
                element = that.tabGroup.children().eq(element);
            }

            content = $(that.contentElement(element.index()));

            content.remove();
            element.remove();

            that._updateContentElements();

            return that;
        },

        _create: function (tab) {
            var plain = $.isPlainObject(tab),
                that = this, tabs, contents;

            if (plain || $.isArray(tab)) {
                tab = $.isArray(tab) ? tab : [tab];

                tabs = map(tab, function (value, idx) {
                            return $(TabStrip.renderItem({
                                group: that.tabGroup,
                                item: extend(value, { index: idx })
                            }));
                        });

                contents = map( tab, function (value, idx) {
                            if (value.content || value.contentUrl) {
                                return $(TabStrip.renderContent({
                                    item: extend(value, { index: idx })
                                }));
                            }
                        });
            } else {
                tabs = $(tab);
                contents = $("<div class='" + CONTENT + "'/>");

                updateTabClasses(tabs);
            }

            return { tabs: tabs, contents: contents };
        },

        _toggleDisabled: function(element, enable) {
            element = this.tabGroup.find(element);
            element.each(function () {
                $(this)
                    .toggleClass(DEFAULTSTATE, enable)
                    .toggleClass(DISABLEDSTATE, !enable);
            });
        },

        _updateClasses: function() {
            var that = this,
                tabs, activeItem, activeTab;

            that.wrapper.addClass("k-widget k-header k-tabstrip");

            that.tabGroup = that.wrapper.children("ul").addClass("k-tabstrip-items k-reset");

            if (!that.tabGroup[0]) {
                that.tabGroup = $("<ul class='k-tabstrip-items k-reset'/>").appendTo(that.wrapper);
            }

            tabs = that.tabGroup.find("li").addClass("k-item");

            if (tabs.length) {
                activeItem = tabs.filter("." + ACTIVESTATE).index();
                activeTab = activeItem >= 0 ? activeItem : undefined;

                that.tabGroup // Remove empty text nodes
                    .contents()
                    .filter(function () { return (this.nodeType == 3 && !trim(this.nodeValue)); })
                    .remove();
            }

            tabs.eq(activeItem).addClass(TABONTOP);

            that.contentElements = that.wrapper.children("div");

            that.contentElements
                .addClass(CONTENT)
                .eq(activeTab)
                .addClass(ACTIVESTATE)
                .css({ display: "block" });

            if (tabs.length) {
                updateTabClasses(tabs);

                updateFirstLast(that.tabGroup);
                that._updateContentElements();
            }
        },

        _updateContentElements: function() {
            var that = this,
                contentUrls = that.options.contentUrls || [],
                tabStripID = that.element.attr("id");

            that.contentElements = that.wrapper.children("div");

            that.tabGroup.find(".k-item").each(function(idx) {
                var currentContent = that.contentElements.eq(idx),
                    id = tabStripID + "-" + (idx+1),
                    href = $(this).children("." + LINK).attr(HREF);

                if (!currentContent.length && contentUrls[idx]) {
                    $("<div id='"+ id +"' class='" + CONTENT + "'/>").appendTo(that.wrapper);
                } else {
                    currentContent.attr("id", id);
                }
            });

            that.contentElements = that.wrapper.children("div"); // refresh the contents
        },

        _toggleHover: function(e) {
            $(e.currentTarget).toggleClass(HOVERSTATE, e.type == MOUSEENTER);
        },

        _click: function (e) {
            var that = this,
                item = $(e.currentTarget),
                link = item.find("." + LINK),
                href = link.attr(HREF),
                collapse = that.options.collapsible,
                content = $(that.contentElement(item.index()));

            if (item.closest(".k-widget")[0] != that.wrapper[0]) {
                return;
            }

            if (item.is("." + DISABLEDSTATE + (!collapse ? ",." + ACTIVESTATE : ""))) {
                e.preventDefault();
                return;
            }

            if ($("." + CONTENT, that.wrapper).filter(function() { return $(this).data("animating"); }).length) {
                return;
            }

            if (that.trigger(SELECT, { item: item[0], contentElement: content[0] })) {
                e.preventDefault();
            } else {
                var isAnchor = link.data(CONTENTURL) || (href && (href.charAt(href.length - 1) == "#" || href.indexOf("#" + that.element[0].id + "-") != -1));

                if (!href || isAnchor) {
                    e.preventDefault();
                } else {
                    return;
                }

                if (collapse && item.is("." + ACTIVESTATE)) {
                    that.deactivateTab(item);
                    e.preventDefault();

                    return;
                }

                if (that.activateTab(item)) {
                    e.preventDefault();
                }
            }
        },

        /**
         *
         * Deactivates a tab specified as a selector. Note: Invoking this method will not trigger any events.
         *
         * @param {Selector} item
         * The target tab, specified as a selector, to be deactivated.
         *
         * @example
         * var tabToDeactivate = $("#tab1");
         * $("#tabStrip").data("kendoTabStrip").deactivateTab(tabToActivate);
         *
         */
        deactivateTab: function (item) {
            var that = this,
                animationSettings = that.options.animation,
                animation = animationSettings.open,
                close = extend({}, animationSettings.close),
                hasCloseAnimation = close && "effects" in close;
            item = that.tabGroup.find(item);

            close = extend( hasCloseAnimation ? close : extend({ reverse: true }, animation), { show: false, hide: true });


            if (kendo.size(animation.effects)) {
                item.kendoAddClass(DEFAULTSTATE, { duration: animation.duration });
                item.kendoRemoveClass(ACTIVESTATE, { duration: animation.duration });
            } else {
                item.addClass(DEFAULTSTATE);
                item.removeClass(ACTIVESTATE);
            }

            that.contentElements
                    .filter("." + ACTIVESTATE)
                    .kendoStop(true, true)
                    .kendoAnimate( close )
                    .removeClass(ACTIVESTATE);
        },

        /**
         *
         * Activates a tab specified as a selector. Note: Invoking this method will not trigger any events.
         *
         * @param {Selector} item
         * The target tab, specified as a selector, to be activated.
         *
         * @returns {Boolean}
         * Returns <strong>true</strong> if successful; otherwise, <strong>false</strong>.
         *
         * @exampleTitle Activate a tab with ID, tab1 in a TabStrip
         * @example
         * var tabToActivate = $("#tab1");
         * $("#tabStrip").data("kendoTabStrip").activateTab(tabToActivate);
         *
         */
        activateTab: function (item) {
            item = this.tabGroup.find(item);

            var that = this,
                animationSettings = that.options.animation,
                animation = animationSettings.open,
                close = extend({}, animationSettings.close),
                hasCloseAnimation = close && "effects" in close,
                neighbours = item.parent().children(),
                oldTab = neighbours.filter("." + ACTIVESTATE),
                itemIndex = neighbours.index(item);

            close = extend( hasCloseAnimation ? close : extend({ reverse: true }, animation), { show: false, hide: true });
            // deactivate previously active tab
            if (kendo.size(animation.effects)) {
                oldTab.kendoRemoveClass(ACTIVESTATE, { duration: close.duration });
                item.kendoRemoveClass(HOVERSTATE, { duration: close.duration });
            } else {
                oldTab.removeClass(ACTIVESTATE);
                item.removeClass(HOVERSTATE);
            }

            // handle content elements
            var contentElements = that.contentElements;

            if (contentElements.length == 0) {
                oldTab.removeClass(TABONTOP);
                item.addClass(TABONTOP) // change these directly to bring the tab on top.
                    .css("z-index");

                item.addClass(ACTIVESTATE);

                that.trigger("change");

                return false;
            }

            var visibleContentElements = contentElements.filter("." + ACTIVESTATE);

            // find associated content element
            var content = $(that.contentElement(itemIndex));

            if (content.length == 0) {
                visibleContentElements
                    .removeClass( ACTIVESTATE )
                    .kendoStop(true, true)
                    .kendoAnimate( close );
                return false;
            }

            var isAjaxContent = (item.children("." + LINK).data(CONTENTURL) || false) && content.is(EMPTY),
                showContentElement = function () {
                    oldTab.removeClass(TABONTOP);
                    item.addClass(TABONTOP) // change these directly to bring the tab on top.
                        .css("z-index");

                    if (kendo.size(animation.effects)) {
                        oldTab.kendoAddClass(DEFAULTSTATE, { duration: animation.duration });
                        item.kendoAddClass(ACTIVESTATE, { duration: animation.duration });
                    } else {
                        oldTab.addClass(DEFAULTSTATE);
                        item.addClass(ACTIVESTATE);
                    }

                    content
                        .addClass(ACTIVESTATE)
                        .kendoStop(true, true)
                        .kendoAnimate( extend({ init: function () {
                            that.trigger(ACTIVATE, { item: item[0], contentElement: content[0] });
                        } }, animation) );
                },
                showContent = function() {
                    if (!isAjaxContent) {
                        showContentElement();
                        that.trigger("change");
                    } else
                        that.ajaxRequest(item, content, function () {
                            showContentElement();
                            that.trigger("change");
                        });
                };

            visibleContentElements
                    .removeClass(ACTIVESTATE);

            if (visibleContentElements.length) {
                visibleContentElements
                    .kendoStop(true, true)
                    .kendoAnimate(extend( {
                        complete: showContent
                   }, close ));
            } else {
                showContent();
            }

            return true;
        },

        /**
         *
         * Obtains the DOM element representing a tab by its index in the <strong>TabStrip</strong>.
         *
         * @param {int} itemIndex
         * The index of the tab in the TabStrip.
         *
         * @returns {HTMLElement}
         * The DOM element representing a tab by its index in the <strong>TabStrip</strong>.
         *
         * @exampleTitle Obtain the DOM element representing the first tab in a TabStrip
         * @example
         * var tabContent = $("#tabStrip").data("kendoTabStrip").contentElement(0);
         *
         */
        contentElement: function (itemIndex) {
            if (isNaN(itemIndex - 0)) return;

            var contentElements = this.contentElements,
                idTest = new RegExp("-" + (itemIndex + 1) + "$");

            for (var i = 0, len = contentElements.length; i < len; i++) {
                if (idTest.test(contentElements[i].id)) {
                    return contentElements[i];
                }
            }
        },

        ajaxRequest: function (element, content, complete, url) {
            element = this.tabGroup.find(element);
            if (element.find(".k-loading").length)
                return;

            var that = this,
                link = element.find("." + LINK),
                data = {},
                statusIcon = null,
                loadingIconTimeout = setTimeout(function () {
                    statusIcon = $("<span class='k-icon k-loading'/>").prependTo(link)
                }, 100);

            $.ajax({
                type: "GET",
                cache: false,
                url: url || link.data(CONTENTURL) || link.attr(HREF),
                dataType: "html",
                data: data,

                error: function (xhr, status) {
                    if (that.trigger("error", { xhr: xhr, status: status })) {
                        this.complete();
                    }
                },

                complete: function () {
                    clearTimeout(loadingIconTimeout);
                    if (statusIcon !== null) {
                        statusIcon.remove();
                    }
                },

                success: function (data, textStatus) {
                    content.html(data);

                    if (complete) {
                        complete.call(that, content);
                    }

                    that.trigger(CONTENTLOAD, { item: element[0], contentElement: content[0] });
                }
            });
        }
    });

    // client-side rendering
    extend(TabStrip, {
        renderItem: function (options) {
            options = extend({ tabStrip: {}, group: {} }, options);

            var empty = templates.empty,
                item = options.item,
                tabStrip = options.tabStrip;

            return templates.item(extend(options, {
                image: item.imageUrl ? templates.image : empty,
                sprite: item.spriteCssClass ? templates.sprite : empty,
                itemWrapper: templates.itemWrapper
            }, rendering));
        },

        renderContent: function (options) {
            return templates.content(extend(options, rendering));
        }
    });

    kendo.ui.plugin(TabStrip);

})(jQuery);
