(function ($, undefined) {
    /**
     * @name kendo.ui.PanelBar.Description
     *
     * @section 
     *  <p>
     *      The PanelBar widget displays hierarchical data as a multi-level expandable panel 
     *      bar. PanelBar structure can be defined statically in HTML or configured dynamically 
     *      with the PanelBar API. Content for PanelBar items can also be easily loaded with 
     *      Ajax simply by specifying the content URL.
     *  </p>
     *  <h3>Getting Started</h3>
     *
     *
     * @exampleTitle Create a simple HTML hierarchical list of items
     * @example
     *  <ul id="panelbar">
     *      <li>Item 1
     *          <ul>
     *              <li>Sub Item 1</li>
     *              <li>Sub Item 2</li>
     *          </ul>
     *      <li>
     *      <li>Item 2</li>
     *      <li>Item with Content
     *          <div>This is some PanelBar Item content</div>
     *      </li>
     *  </ul>
     *
     *
     * @exampleTitle Initialize Kendo PanelBar using jQuery selector
     * @example
     * var panelBar = $("#panelBar").kendoPanelBar();
     *
     * @section
     *  <p>
     *      Items in a PanelBar can optionally define in-line HTML content. To add content, 
     *      simply place the HTML inside of a div. Text content outside of the div will be used as 
     *      the Item's PanelBar text.
     *  </p>
     *  <h3>Loading Content with Ajax</h3>
     *  <p>
     *      While any valid technique for loading Ajax content can be used, PanelBar provides 
     *      built-in support for asynchronously loading content from URLs. These URLs should return 
     *      HTML fragments that can be loaded in the PanelBar item content area.
     *  </p>
     *  <br/>
     *  <p>
     *      When PanelBar loads content with Ajax, it is cached so that subsequent 
     *      expand/collapse actions do not re-trigger the Ajax request.
     *  </p>
     *
     * @exampleTitle Loading PanelBar content asynchronously
     * @example
     *  <!-- HTML structure -->
     *  <ul id="panelbar">
     *      <li>Item 1
     *          <ul>
     *              <li>Sub Item 1</li>
     *          </ul>
     *      </li>
     *      <li>Item 2</li>
     *      <li>
     *          Item with Dynamic Content
     *          <div></div>
     *      </li>
     *  </ul>
     *
     * @exampleTitle
     * @example
     *  //JavaScript initialization and configuration 
     *  $(document).ready(function(){
     *      $("#panelbar").kendoPanelBar({
     *          contentUrls:[
     *            null,
     *            null,
     *            "html-content-snippet.html"
     *          ]
     *      });
     *  });
     *
     * @section
     *  <h3>Customizing PanelBar Animations</h3>
     *  <p>
     *      By default, the PanelBar uses a slide animation to expand and reveal sub-items as 
     *      the mouse hovers. Animations can be easily customized using configuration properties, 
     *      changing the open and close animation style. A PanelBar can also be configured to 
     *      only allow one panel to remain open at a time.
     *  </p>
     * @exampleTitle Changing PanelBar animation and expandMode behavior
     * @example
     *  $("#panelbar").kendoPanelBar({
     *      animation: {
     *          open : {effects: fadeIn}
     *      },
     *      expandMode: "single"
     *  });
     * @section
     *  <h3>Dynamically configuring PanelBar items</h3>
     *  <p>
     *      The PanelBar API provides several methods for dynamically adding or removing 
     *      Items. To add items, provide the new item as a JSON object along with a reference 
     *      item that will be used to determine the placement in the hierarchy.
     *  </p>
     *  <br/>
     *  <p>
     *      A reference item is simply a target PanelBar Item HTML element that already exists 
     *      in the PanelBar. Any valid jQuery selector can be used to obtain a reference to the 
     *      target item. For examples, see the PanelBar API demos.
     *  </p>
     *  </br>
     *  <p>
     *      Removing an item only requires a reference to the target element that should be removed.
     *  </p>
     *
     * @exampleTitle Dynamically add a new root PanelBar item
     * @example
     *  var pb = $("#panelbar").kendoPanelBar().data("kendoPanelBar");
     *
     *  pb.insertAfter(
     *      { text: "New PanelBar Item" },
     *      pb.element.children("li:last")
     *  );
     *
     */
    var kendo = window.kendo,
        ui = kendo.ui,
        extend = $.extend,
        each = $.each,
        template = kendo.template,
        Component = ui.Component,
        excludedNodesRegExp = /^(ul|a|div)$/i,
        IMG = "img",
        HREF = "href",
        LAST = "t-last",
        LINK = "t-link",
        ERROR = "error",
        CLICK = "click",
        ITEM = ".t-item",
        IMAGE = "t-image",
        FIRST = "t-first",
        EXPAND = "expand",
        SELECT = "select",
        CONTENT = "t-content",
        COLLAPSE = "collapse",
        CONTENTURL = "contentUrl",
        MOUSEENTER = "mouseenter",
        MOUSELEAVE = "mouseleave",
        CONTENTLOAD = "contentLoad",
        ACTIVECLASS = ".t-state-active",
        GROUPS = "> .t-content, > .t-group",
        SELECTEDCLASS = ".t-state-selected",
        DISABLEDCLASS = ".t-state-disabled",
        HIGHLIGHTEDCLASS = ".t-state-highlighted",
        clickableItems = ITEM + ":not(.t-state-disabled) .t-link",
        disabledItems = ITEM + ".t-state-disabled .t-link",
        defaultState = "t-state-default",
        VISIBLE = ":visible",
        EMPTY = ":empty",
        SINGLE = "single",
        animating = false,

        templates = {
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
        },

        rendering = {
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
                var result = LINK;

                if (group.firstLevel) {
                    result += " t-header";
                }

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

    function updateItemClasses (item, menuElement) {
        item = $(item);

        item
            .children(IMG)
            .addClass(IMAGE);
        item
            .children("a")
            .addClass(LINK)
            .children(IMG)
            .addClass(IMAGE);
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
            .addClass("t-header");
    }

    function updateArrow (items) {
        items = $(items);

        items.find(".t-icon").remove();

        items
            .filter(":has(.t-group),:has(.t-content)")
            .children(".t-link:not(:has([class*=t-arrow]))")
            .each(function () {
                var item = $(this),
                    parent = item.parent();

                item.append("<span class='t-icon " + (parent.hasClass(ACTIVECLASS.substr(1)) ? "t-arrow-up t-panelbar-collapse" : "t-arrow-down t-panelbar-expand") + "'/>");
            });
    }

    function updateFirstLast (items) {
        items = $(items);

        items.filter(".t-first:not(:first-child)").removeClass(FIRST);
        items.filter(".t-last:not(:last-child)").removeClass(LAST);
        items.filter(":first-child").addClass(FIRST);
        items.filter(":last-child").addClass(LAST);
    }

    var PanelBar = Component.extend({/** @lends kendo.ui.PanelBar.prototype */
        /**
         * Creates a PanelBar instance.
         * @constructs
         * @extends kendo.ui.Component
         * @class PanelBar UI component
         * @param {Selector} element DOM element
         * @param {Object} options Configuration options.
         * @option {Object} [animation] A collection of <b>Animation</b> objects, used to change default animations. A value of false will disable all animations in the component.
         * @option {Animation} [animation.open] The animation that will be used when expanding items.
         * @option {Animation} [animation.close] The animation that will be used when collapsing items.
         * @option {String} [expandMode] <multiple> Specifies if PanelBar should collapse the already expanded item when expanding next item
         */
        init: function(element, options) {
            element = $(element);

            var that = this,
                content;

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

            if (that.options.contentUrls) {
                element.find("> .t-item")
                    .each(function(index, item) {
                        $(item).find("." + LINK).data(CONTENTURL, that.options.contentUrls[index]);
                    });
            }

            content = element.find("li" + ACTIVECLASS + " > ." + CONTENT);

            if (content.length > 0 && content.is(EMPTY)) {
                that.expand(content.parent());
            }
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
                if (!item.hasClass(DISABLEDCLASS) && item.find(GROUPS).length > 0) {

                    if (that.options.expandMode == SINGLE && that._collapseAllExpanded(item)) {
                        return;
                    }

                    element.find(HIGHLIGHTEDCLASS).removeClass(HIGHLIGHTEDCLASS.substr(1));
                    item.addClass(HIGHLIGHTEDCLASS.substr(1));

                    if (!useAnimation) {
                        animBackup = that.options.animation;
                        that.options.animation = { open: { show: true, effects: {} }, close: { hide:true, effects: {} } };
                    }

                    that._toggleItem(item, false, null);

                    if (!useAnimation) {
                        that.options.animation = animBackup;
                    }
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

                if (!item.hasClass(DISABLEDCLASS) && item.find(GROUPS).is(VISIBLE)) {
                    item.removeClass(HIGHLIGHTEDCLASS.substr(1));

                    if (!useAnimation) {
                        animBackup = that.options.animation;
                        that.options.animation = { open: { show: true, effects: {} }, close: { hide:true, effects: {} } };
                    }

                    that._toggleItem(item, true, null);

                    if (!useAnimation) {
                        that.options.animation = animBackup;
                    }
                }

            });
        },

        toggle: function (element, enable) {
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
                return that.element.find(".t-item > " + SELECTEDCLASS).parent();
            }

            $(element).each(function (index, item) {
                item = $(item);
                var link = item.children("." + LINK);

                if (item.is(DISABLEDCLASS)) {
                    return;
                }

                $(SELECTEDCLASS, that.element).removeClass(SELECTEDCLASS.substr(1));
                $(HIGHLIGHTEDCLASS, that.element).removeClass(HIGHLIGHTEDCLASS.substr(1));

                link.addClass(SELECTEDCLASS.substr(1));
                link.parentsUntil(that.element, ITEM).filter(":has(.t-header)").addClass(HIGHLIGHTEDCLASS.substr(1));
            });
        },

        /**
         * Enables/disables a PanelBar item
         * @param {Selector} element Target element
         * @param {Boolean} enable Desired state
         */
        enable: function (element, state) {
            this.toggle(element, state !== false);
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
            referenceItem = $(referenceItem);
            
            var inserted = this._insert(item, referenceItem, referenceItem.length ? referenceItem.find("> .t-group") : null);

            each(inserted.items, function () {
                inserted.group.append(this);
                updateFirstLast(this);
            });

            updateArrow(referenceItem);
            updateFirstLast(inserted.group.find(".t-first, .t-last"));
            inserted.group.height("auto");
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
            referenceItem = $(referenceItem);

            var inserted = this._insert(item, referenceItem, referenceItem.parent());

            each(inserted.items, function () {
                referenceItem.before(this);
                updateFirstLast(this);
            });

            updateFirstLast(referenceItem);
            inserted.group.height("auto");
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
            referenceItem = $(referenceItem);

            var inserted = this._insert(item, referenceItem, referenceItem.parent());

            each(inserted.items, function () {
                referenceItem.after(this);
                updateFirstLast(this);
            });

            updateFirstLast(referenceItem);
            inserted.group.height("auto");
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
        },

        _insert: function (item, referenceItem, parent) {
            var that = this;

            if (!referenceItem || !referenceItem.length) {
                parent = that.element;
            }

            var plain = $.isPlainObject(item),
                items,
                groupData = {
                    firstLevel: parent.hasClass("t-panelbar"),
                    expanded: parent.parent().hasClass("t-state-active"),
                    length: parent.children().length
                };

            if (referenceItem && !parent.length) {
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

                updateItemClasses(item, that.element);
            }

            return { items: items, group: parent };
        },

        _toggleHover: function(e) {
            var target = $(e.currentTarget);

            if (!target.parents("li" + DISABLEDCLASS).length) {
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
                            .find("li:not(" + ACTIVECLASS + ") > ul")
                            .css({ display: "none" })
                            .end()
                            .find("li")
                            .addClass("t-item");

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

            if (target.closest(".t-widget")[0] != element[0]) {
                return;
            }

            var link = target.closest("." + LINK),
                item = link.closest(ITEM);

            $(SELECTEDCLASS, element).removeClass(SELECTEDCLASS.substr(1));
            $(HIGHLIGHTEDCLASS, element).removeClass(HIGHLIGHTEDCLASS.substr(1));

            link.addClass(SELECTEDCLASS.substr(1));
            link.parentsUntil(that.element, ITEM).filter(":has(.t-header)").addClass(HIGHLIGHTEDCLASS.substr(1));

            var contents = item.find(GROUPS),
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
                childGroup = element.find("> .t-group");

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
                hasCloseAnimation = "effects" in that.options.animation.close,
                closeAnimation = extend({}, that.options.animation.open);

            if (element.is(VISIBLE) != visibility) {
                return;
            }

            visibility && element.css("height", element.height()); // Set initial height on visible items (due to a Chrome bug/feature).
            element.css("height");

            element
                .parent()
                .toggleClass(defaultState, visibility)
                .toggleClass(ACTIVECLASS.substr(1), !visibility)
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

            if (item.find("> ." + LINK).hasClass("t-header")) {
                if (item.find(GROUPS).is(VISIBLE) || item.find(GROUPS).length == 0) {
                    return true;
                } else {
                    $(that.element).children().find(GROUPS)
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
                link = element.find("." + LINK),
                loadingIconTimeout = setTimeout(function () {
                    statusIcon.addClass("t-loading");
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
        }
    });

    kendo.ui.plugin("PanelBar", PanelBar, Component);

})(jQuery);
