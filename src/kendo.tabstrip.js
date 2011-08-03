(function ($, window) {
    /**
     * @name kendo.ui.TabStrip.Description
     *
     * @section
     *  <p>
     *      The TabStrip widget displays a collection of tabs with associated tab content. 
     *      TabStrips are composed of an HTML unordered list of items, which represent the tabs, 
     *      and a collection of HTML divs, which define the tab content.
     *  </p>
     *  <h3>Getting Started</h3>
     *
     * @exampleTitle In a HTML div, create an HTML unordered list for tabs, HTML divs for content
     * @example
     *  <div id="tabstrip">
     *      <ul>
	 *          <li>First Tab</li>
	 *          <li>Second Tab</li>
     *      </ul>
     *      <div>First Tab Content</div>
     *      <div>Second Tab Content</div>
     *  </div>
     *
     * @exampleTitle Initialize the TabStrip using a jQuery selector to target the outer div
     * @example
     * var tabStrip = $("#tabStrip").kendoTabStrip();
     * @section
     *  <p>
     *      Tabs do not have to have content. If a tab should have no content, it is safe to omit the HTML div.
     *  </p>
     *  <h3>Loading TabStrip content with Ajax</h3>
     *  <p>
     *      While any valid technique for loading Ajax content can be used, TabStrip provides 
     *      built-in support for asynchronously loading content from URLs. These URLs should 
     *      return HTML fragments that can be loaded in a TabStrip content area.
     *  </p>
     * @exampleTitle Loading Tab content asynchronously
     * @example
     *  <!-- Define the TabStrip HTML -->
     *  <div id="tabstrip">
     *      <ul>
	 *          <li>First Tab</li>
	 *          <li>Second Tab</li>
     *      </ul>
     *      <div> </div>
     *      <div> </div>
     *  </div>
     * @exampleTitle 
     * @example
     *  //Initialize TabStrip and configure one tab with async content loading
     *  $(document).ready(function(){
	 *      $("#tabstrip").kendoTabStrip({
	 *        contentUrls: [null, "html-content-snippet.html"]
	 *      });
     *  });
     *
     * @section
     *  <h3>Dynamically configure TabStrip tabs</h3>
     *  <p>
     *      The TabStrip API provides several methods for dynamically adding or removing Tabs. To add tabs, 
     *      provide the new item as a JSON object along with a reference item that will be used to determine 
     *      the placement in the TabStrip.
     *  <p>
     *  <br/>
     *  <p>
     *      A reference item is simply a target Tab HTML element that already exists in the TabStrip. Any valid 
     *      jQuery selector can be used to obtain a reference to the target item. For examples, see the <a href="../tabstrip/api.html" title="TabStrip  API demos">TabStrip  API demos</a>.
     *  </p>
     *  <br/>
     *  <p>
     *      Removing an item only requires a reference to the target element that should be removed.
     *  </p>
     * @exampleTitle Dynamically add a new Tab
     * @example
     *  var tabstrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
     *
     *  tabstrip.insertAfter(
	 *      { text: "New Tab" },
	 *      tabstrip.tabGroup.children("li:last")
     *  );
     * @section
     *  <h3>Selecting a Tab on Initial Load</h3>
     *  <p>
     *      A common desire with TabStrips is to select a tab and display its associated content on initial load. There are two ways to accomplish this with TabStrip:
     *  </p>
     *  <ol>                
     *      <li>Manually add the "t-state-active" class to the Tab that should be selected</li>
     *      <li>Use the TabStrip API to target and select a Tab</li>                
     *  </ol>
     *  <p>
     *      Both approaches produce the same end result. The first approach requires no additional JavaScript, but does require a small amount of HTML configuration.
     *  </p>
     *
     * @exampleTitle Selecting a default tab manually using HTML
     * @example
     *  <div id="tabstrip">
     *      <ul>
	 *          <li class="t-state-active">First Tab</li>
	 *          <li>Second Tab</li>
     *      </ul>
     *      <div> </div>
     *      <div> </div>
     *  </div>
     * @exampleTitle
     * @example
     *  //Initialize the TabStrip
     *  $(document).ready(function(){
	 *      $("#tabstrip").kendoTabStrip();
     *  });
     * @exampleTitle Selecting a default tab using the TabStrip API
     * @example
     *  <div id="tabstrip">
     *      <ul>
	 *          <li>First Tab</li>
	 *          <li>Second Tab</li>
     *      </ul>
     *      <div> </div>
     *      <div> </div>
     *  </div>
     *
     * @exampleTitle
     * @example
     *  //Initialize the TabStrip and select first tab
     *  $(document).ready(function(){
	 *      var tabstrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
	 *      tabstrip.select(tabstrip.tabGroup.children("li:first"));
     *  });
     */
    var kendo = window.kendo,
        ui = kendo.ui,
        extend = $.extend,
        template = kendo.template,
        Component = ui.Component,
        ERROR = "error",
        SELECT = "select",
        CONTENTLOAD = "contentLoad",
        MOUSEENTER = "mouseenter",
        MOUSELEAVE = "mouseleave",
        CLICK = "click",
        CLICKABLEITEMS = ".t-tabstrip-items > .t-item:not(.t-state-disabled)",
        HOVERABLEITEMS = ".t-tabstrip-items > .t-item:not(.t-state-disabled):not(.t-state-active)",
        DISABLEDLINKS = ".t-tabstrip-items > .t-state-disabled .t-link",
        DISABLEDSTATE = "t-state-disabled",
        DEFAULTSTATE = "t-state-default",
        ACTIVESTATE = "t-state-active",
        HOVERSTATE = "t-state-hover",
        TABONTOP = "t-tab-on-top",
        EMPTY = ":empty";

    var TabStrip = Component.extend({/** @lends kendo.ui.TabStrip.prototype */
        /**
         * Creates a TabStrip instance.
         * @constructs
         * @extends kendo.ui.Component
         * @class TabStrip UI component
         * @param {Selector} element DOM element
         * @param {Object} options Configuration options.
         * @option {Object} [animation] A collection of <b>Animation</b> objects, used to change default animations. A value of false will disable all animations in the component.
         * @option {Animation} [animation.open] The animation that will be used when opening content.
         * @option {Animation} [animation.close] The animation that will be used when closing content.
         */

        init: function(element, options) {
            element = $(element);
            var that = this;

            if (options && ("animation" in options) && !options.animation)
                options.animation = { open: { effects: {} }, close: { effects: {} } }; // No animation

            Component.fn.init.call(that, element, options);

            options = that.options;

            element
                .delegate(CLICKABLEITEMS, CLICK, $.proxy(that._click, that))
                .delegate(HOVERABLEITEMS, MOUSEENTER + " " + MOUSELEAVE, that._toggleHover)
                .delegate(DISABLEDLINKS, CLICK, false);

            that.bind([
                /**
                 * Fires before a tab is selected.
                 * @name kendo.ui.TabStrip#select
                 * @event
                 * @param {Event} e
                 * @param {Element} e.item The selected item
                 */
                SELECT,
                /**
                 * Fires when ajax request results in an error.
                 * @name kendo.ui.TabStrip#error
                 * @event
                 * @param {Event} e
                 * @param {jqXHR} e.xhr The jqXHR object used to load the content
                 * @param {String} e.status The returned status.
                 */
                ERROR,
                /**
                 * Fires when content is fetched from an ajax request.
                 * @name kendo.ui.TabStrip#contentLoad
                 * @event
                 * @param {Event} e
                 * @param {Element} e.item The selected item
                 * @param {Element} e.item The loaded content element
                 */
                CONTENTLOAD
            ], that.options);

            that._updateClasses();

            if (that.options.contentUrls)
                element.find(".t-tabstrip-items > .t-item")
                    .each(function(index, item) {
                        $(item).find(">.t-link").data("ContentUrl", that.options.contentUrls[index]);
                    });

            var selectedItems = element.find("li." + ACTIVESTATE),
                content = $(that.getContentElement(selectedItems.parent().children().index(selectedItems)));

            if (content.length > 0 && content[0].childNodes.length == 0)
                that.activateTab(selectedItems.eq(0));
        },
        options: {
            animation: {
                open: {
                    effects: "expandVertical fadeIn",
                    duration: 200,
                    show: true
                },
                close: { // if close animation effects are defined, they will be used instead of open.reverse
                    duration: 200,
                    show: false,
                    hide: true
                }
            }
        },

        /**
         * Selects the specified TabStrip tab/s. If called without arguments - returns the selected tab.
         * @param {Selector} element Target item selector.
         * @example
         * tabStrip.select("#Item1");
         */
        select: function (element) {
            var that = this;

            if (arguments.length == 0) {
                return that.element.find("li." + ACTIVESTATE);
            }

            $(element).each(function (index, item) {
                item = $(item);
                if (!item.hasClass(ACTIVESTATE)) {
                    that.activateTab(item);
                }
            });
        },

        /**
         * Enables/disables a TabStrip tab
         * @param {Selector} element Target element
         * @param {Boolean} enable Desired state
         */
        enable: function (element, state) {
            if (state !== false) {
                state = true;
            }

            this._toggleDisabled(element, state);
        },

        /**
         * Disables a TabStrip tab
         * @param {Selector} element Target element
         */
        disable: function (element) {
            this._toggleDisabled(element, false);
        },


        /**
         * Reloads a TabStrip tab from ajax request
         * @param {Selector} element Target element
         */
        reload: function (element) {
            var that = this;

            $(element).each(function () {
                var item = $(this),
                    contentUrl = item.find(".t-link").data("ContentUrl");

                if (contentUrl) {
                    that.ajaxRequest(item, $(that.getContentElement(item.index())), null, contentUrl);
                }
            });
        },

        /**
         * Appends a TabStrip item to the end of the tab list.
         * @param {Selector} tab Target tab, specified as a JSON object. Can also handle an array of such objects.
         * @example
         * tabStrip.append(
         *     [{
         *         text: "Item 1"
         *     },
         *     {
         *         text: "Item 2"
         *     }]
         * );
         */
        append: function (tab) {
            var that = this,
                creatures = that._create(tab);

            $.each (creatures.tabs, function (idx) {
                that.tabGroup.append(this);
                that.element.append(creatures.contents[idx]);
            });

            that._updateFirstLast();
            that._updateContentElements();
        },

        /**
         * Inserts a TabStrip item before the specified referenceItem
         * @param {Selector} item Target tab, specified as a JSON object. Can also handle an array of such objects.
         * @param {Item} referenceTab A reference tab to insert the new item before
         * @example
         * tabStrip.insertBefore(
         *     [{
         *         text: "Item 1"
         *     },
         *     {
         *         text: "Item 2"
         *     }],
         *     referenceItem
         * );
         */
        insertBefore: function (tab, referenceTab) {
            var that = this,
                creatures = this._create(tab),
                referenceContent = $(that.getContentElement(referenceTab.index()));

            $.each (creatures.tabs, function (idx) {
                referenceTab.before(this);
                referenceContent.before(creatures.contents[idx]);
            });

            that._updateFirstLast();
            that._updateContentElements();
        },

        /**
         * Inserts a TabStrip tab after the specified referenceTab
         * @param {Selector} item Target tab, specified as a JSON object. Can also handle an array of such objects.
         * @param {Item} referenceTab A reference tab to insert the new item after
         * @example
         * tabStrip.insertAfter(
         *     [{
         *         text: "Item 1"
         *     },
         *     {
         *         text: "Item 2"
         *     }],
         *     referenceItem
         * );
         */
        insertAfter: function (tab, referenceTab) {
            var that = this,
                creatures = this._create(tab),
                referenceContent = $(that.getContentElement(referenceTab.index()));

            $.each (creatures.tabs, function (idx) {
                referenceTab.after(this);
                referenceContent.after(creatures.contents[idx]);
            });

            that._updateFirstLast();
            that._updateContentElements();
        },

        /**
         * Removes the specified TabStrip item/s
         * @param {Selector} element Target item selector.
         * @example
         * tabStrip.remove("#Item1");
         */
        remove: function (element) {
            element = $(element);

            var that = this,
                content = $(that.getContentElement(element.index()));

            content.remove();
            element.remove();

            that._updateContentElements();
        },

        _create: function (tab) {
            var plain = $.isPlainObject(tab),
                that = this, tabs, contents;

            if (plain || $.isArray(tab)) { // is JSON
                tabs = $.map(plain ? [ tab ] : tab, function (value, idx) {
                            return $(TabStrip.renderItem({
                                group: that.tabGroup,
                                item: extend(value, { index: idx })
                            }));
                        });
                contents = $.map(plain ? [ tab ] : tab, function (value, idx) {
                            return $(TabStrip.renderContent({
                                item: extend(value, { index: idx })
                            }));
                        });
            } else {
                tabs = $(tab);
                contents = $("<div class='t-content'></div>");

                this._updateTabClasses(tab);
            }

            return { tabs: tabs, contents: contents };
        },

        _toggleDisabled: function(element, enable) {
            $(element).each(function () {
                $(this)
                    .toggleClass(DEFAULTSTATE, enable)
                    .toggleClass(DISABLEDSTATE, !enable);
            });
        },

        _updateClasses: function() {
            var that = this,
                tabs, activeItem, activeTab;

            that.element.addClass("t-widget t-header t-tabstrip");

            that.tabGroup = that.element.children("ul").addClass("t-tabstrip-items t-reset");

            tabs = that.tabGroup.find("li").addClass("t-item");
            activeItem = tabs.filter("." + ACTIVESTATE).index();
            activeTab = activeItem >= 0 ? activeItem : undefined;

            that.tabGroup // Remove empty text nodes
                .contents()
                .filter(function () { return (this.nodeType == 3 && !$.trim(this.nodeValue)); })
                .remove();

            that.contentElements = that.element.children("div");

            that.contentElements
                .addClass("t-content")
                .eq(activeTab)
                .addClass(ACTIVESTATE)
                .css({ display: "block" });

            that._updateTabClasses(tabs);

            that._updateContentElements();
            that._updateFirstLast();
        },

        _updateTabClasses: function(tabs) {
            tabs.children("img")
                .addClass("t-image");

            tabs.children("a")
                .addClass("t-link")
                .children("img")
                .addClass("t-image");

            tabs.filter(":not([disabled]):not([class*=t-state-disabled])")
                .addClass(DEFAULTSTATE);

            tabs.filter("li[disabled]")
                .addClass(DISABLEDSTATE)
                .removeAttr("disabled");

            tabs.filter(":not([class*=t-state])")
                .children("a:focus")
                .parent()
                .addClass(ACTIVESTATE);

            tabs.each(function() {
                var item = $(this);

                if (!item.children(".t-link").length)
                    item
                        .contents()      // exclude groups, real links, templates and empty text nodes
                        .filter(function() { return (!(this.nodeName.toLowerCase() in { a: {}, div: {} }) && !(this.nodeType == 3 && !$.trim(this.nodeValue))); })
                        .wrapAll("<a class='t-link'/>");
            });

        },

        _updateContentElements: function() {
            var that = this,
                tabStripID = that.element.attr("id");

            that.contentElements = that.element.children("div");

            that.tabGroup.find(".t-item").each(function(idx) {
                var currentContent = that.contentElements.eq(idx),
                    id = tabStripID + "-" + (idx+1),
                    href = $(this).children(".t-link").attr("href");

                if (!currentContent.length)
                    $("<div id='"+ id +"' class='t-content'></div>").appendTo(that.element);
                else
                    currentContent.attr("id", id);
            });

            that.contentElements = that.element.children("div"); // refresh the contents
        },

        _updateFirstLast: function () {
            var tabs = this.tabGroup.children(".t-item");

            tabs.filter(".t-first:not(:first-child)").removeClass("t-first");
            tabs.filter(".t-last:not(:last-child)").removeClass("t-last");
            tabs.filter(":first-child").addClass("t-first");
            tabs.filter(":last-child").addClass("t-last");
        },

        _toggleHover: function(e) {
            $(e.currentTarget).toggleClass(HOVERSTATE, e.type == MOUSEENTER);
        },

        _click: function (e) {
            var that = this,
                item = $(e.currentTarget),
                link = item.find(".t-link"),
                href = link.attr("href"),
                content = $(that.getContentElement(item.index()));

            if (item.is("." + DISABLEDSTATE + ",." + ACTIVESTATE)) {
                e.preventDefault();
                return;
            }

            if ($(".t-content", this.element).filter(function() { return $(this).data("animating"); }).length)
                return;

            if (that.trigger(SELECT, { item: item[0], contentElement: content[0] })) {
                e.preventDefault();
            } else {
                var isAnchor = link.data("ContentUrl") || (href && (href.charAt(href.length - 1) == "#" || href.indexOf("#" + that.element[0].id + "-") != -1));

                if (!href || isAnchor) {
                    e.preventDefault();
                } else {
                    return;
                }

                if (that.activateTab(item)) {
                    e.preventDefault();
                }
            }
        },

        activateTab: function (item) {
            var that = this,
                hasCloseAnimation = that.options.animation.close && "effects" in that.options.animation.close,
                closeAnimation = hasCloseAnimation ?
                                       that.options.animation.close :
                                       extend( extend({ reverse: true }, that.options.animation.open), { show: false, hide: true }),
                openAnimation = that.options.animation.open,
                neighbours = item.parent().children(),
                oldTab = neighbours.filter("." + ACTIVESTATE),
                itemIndex = neighbours.index(item);

            // deactivate previously active tab
            if (kendo.size(openAnimation.effects)) {
                oldTab.kendoRemoveClass(ACTIVESTATE, { duration: closeAnimation.duration });
                item.kendoRemoveClass(HOVERSTATE, { duration: closeAnimation.duration });
            } else {
                oldTab.removeClass(ACTIVESTATE);
                item.removeClass(HOVERSTATE);
            }

            // handle content elements
            var contentElements = that.contentElements;

            if (contentElements.length == 0)
                return false;

            var visibleContentElements = contentElements.filter("." + ACTIVESTATE);

            // find associated content element
            var content = $(that.getContentElement(itemIndex));

            if (content.length == 0) {
                visibleContentElements
                    .removeClass( ACTIVESTATE )
                    .kendoStop(true, true)
                    .kendoAnimate( closeAnimation );
                return false;
            }

            var isAjaxContent = (item.children(".t-link").data("ContentUrl") || false) && content.is(EMPTY),
                showContentElement = function () {
                    oldTab.removeClass(TABONTOP);
                    item.addClass(TABONTOP) // change these directly to bring the tab on top.
                        .css("z-index");

                    if (kendo.size(openAnimation.effects)) {
                        oldTab.kendoAddClass(DEFAULTSTATE, { duration: openAnimation.duration });
                        item.kendoAddClass(ACTIVESTATE, { duration: openAnimation.duration });
                    } else {
                        oldTab.addClass(DEFAULTSTATE);
                        item.addClass(ACTIVESTATE);
                    }

                    content
                        .addClass(ACTIVESTATE)
                        .kendoStop(true, true)
                        .kendoAnimate( openAnimation );
                },
                showContent = function() {
                    if (!isAjaxContent)
                        showContentElement();
                    else
                        that.ajaxRequest(item, content, function () {
                            showContentElement();
                        });
                };

            visibleContentElements
                    .removeClass(ACTIVESTATE);

            if (visibleContentElements.length) {
                visibleContentElements
                    .kendoStop(true, true)
                    .kendoAnimate(extend( {
                        complete: showContent
                   }, closeAnimation ));
            } else {
                showContent();
            }

            return true;
        },

        getContentElement: function (itemIndex) {
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
            if (element.find(".t-loading").length)
                return;

            var that = this,
                link = element.find(".t-link"),
                data = {},
                statusIcon = null,
                loadingIconTimeout = setTimeout(function () {
                    statusIcon = $("<span class='t-icon t-loading'></span>").prependTo(link)
                }, 100);

            $.ajax({
                type: "GET",
                cache: false,
                url: url || link.data("ContentUrl") || link.attr("href"),
                dataType: "html",
                data: data,

                error: function (xhr, status) {
                    if (that.trigger("error", { xhr: xhr, status: status }))
                        this.complete();
                },

                complete: function () {
                    clearTimeout(loadingIconTimeout);
                    if (statusIcon !== null)
                        statusIcon.remove();
                },

                success: function (data, textStatus) {
                    content.html(data);

                    if (complete)
                        complete.call(that, content);

                    that.trigger(CONTENTLOAD, { item: element[0], contentElement: content[0] });
                }
            });
        }
    });

    // client-side rendering
    extend(TabStrip, {
        renderItem: function (options) {
            options = extend({ tabStrip: {}, group: {} }, options);

            var templates = TabStrip.templates,
                empty = templates.empty,
                item = options.item,
                tabStrip = options.tabStrip;

            return templates.item(extend(options, {
                image: item.imageUrl ? templates.image : empty,
                sprite: item.spriteCssClass ? templates.sprite : empty,
                itemWrapper: templates.itemWrapper
            }, TabStrip.rendering));
        },

        renderContent: function (options) {
            return TabStrip.templates.content(extend(options, TabStrip.rendering));
        }
    });

    TabStrip.rendering = {
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
        }
    };

    TabStrip.templates = {
        content: template(
            "<div class='t-content'<#= contentAttributes(data) #>>&nbsp;</div>"
        ),
        itemWrapper: template(
            "<<#= tag(item) #> class='t-link'<#= textAttributes(item) #>>" +
                "<#= image(item) #><#= sprite(item) #><#= text(item) #>" +
            "</<#= tag(item) #>>"
        ),
        item: template(
            "<li class='<#= wrapperCssClass(group, item) #>'>" +
                "<#= itemWrapper(data) #>" +
            "</li>"
        ),
        image: template("<img class='t-image' alt='' src='<#= imageUrl #>' />"),
        sprite: template("<span class='t-sprite <#= spriteCssClass #>'></span>"),
        empty: template("")
    };

    kendo.ui.plugin("TabStrip", TabStrip, Component);

})(jQuery, window);
