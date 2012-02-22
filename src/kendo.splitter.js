/**
 * @fileOverview Provides a Splitter implementation which can be used to display a dynamic layout of resizable and
 * collapsible panes.
 */

(function ($, undefined) {
    /**
     * @name kendo.ui.Splitter.Description
     *
     * @section
     * <p>
     *  The <strong>Splitter</strong> provides a dynamic layout of resizable and collapsible panes. It converts the
     *  children of an HTML element in to the interactive layout, adding resize and collapse handles based on
     *  configuration. A <strong>Splitter</strong> can be mixed in a vertical or horizontal orientation to build
     *  complex layouts.
     * </p>
     * <h3>Getting Started</h3>
     * <p>
     *  The layout and structure of a <strong>Splitter</strong> is defined within the DOM as a div with child elements.
     * </p>
     *
     * @exampleTitle Create a div with children that will become panes
     * @example
     * <div id="splitter">
     *     <div>Area 1</div>
     *     <div>Area 2</div>
     * </div>
     *
     * @section
     * <p>
     *  Initialization of a <strong>Splitter</strong> should occur after the DOM is fully loaded. It is recommended
     *  that initialization the <strong>Splitter</strong> occur within a handler is provided to $(document).ready().
     * </p>
     *
     * @exampleTitle Initialize the Splitter using a selector within $(document).ready()
     * @example
     * $(document).ready(function() {
     *     $("#splitter").kendoSplitter();
     * });
     *
     * @section
     * <p>
     *  When the <strong>Splitter</strong> is initialized, a vertical split bar will be placed between the two div
     *  elements. This bar can be moved by a user left and right to adjust the size on the panes.
     * </p>
     * <h3>Configuring Splitter Behaviors</h3>
     * <p>
     *  The <strong>Splitter</strong> has a default configuration specified during initialization. However, these
     *  options may be overriden to control the following properties:
     * </p>
     * <ul>
     *  <li>Maximum and/or minimum pane sizes</li>
     *  <li>Resizable and collapsible/expandable pane behaviors</li>
     *  <li>Orientation (horizontal or vertical)</li>
     * </ul>
     * <p>
     *  The properties of a pane must be set during initialization and set for each individual pane in a
     *  <strong>Splitter</strong>.
     * </p>
     *
     * @exampleTitle Initialize a Splitter and the properties of its panes
     * @example
     * $("#splitter").kendoSplitter({
     *     panes: [
     *         { collapsible: true, min: "100px", max: "300px" },
     *         { collapsible: true }
     *     ],
     *     orientation: "vertical"
     * });
     *
     * @section
     * <h3>Nested Splitter Layouts</h3>
     * <p>To achieve complex layouts, the <strong>Splitter</strong> supports nested layouts.</p>
     *
     * @exampleTitle Creating nested Splitter layout
     * @example
     * <div id="horizontalSplitter">
     *     <div><p>Left Side Pane Content</p></div>
     *     <div>
     *         <div id="verticalSplitter">
     *             <div><p>Right Side, Top Pane Content</p></div>
     *             <div><p>Right Side, Bottom Pane Content</p></div>
     *         </div>
     *     </div>
     * </div>
     *
     * @exampleTitle Initialize two Splitters with differing orientations
     * @example
     * $("horizontalSplitter").kendoSplitter();
     * $("verticalSplitter").kendoSplitter({ orientation: "vertical" });
     *
     * @section
     * <h3>Loading Content with AJAX</h3>
     * <p>
     *  While any valid technique for loading content via AJAX may be used, <strong>Splitter</strong> provides built-in
     *  support for asynchronously loading content from URLs. These URLs should return HTML fragments that can be
     *  loaded in the pane of a <strong>Splitter</strong>. If you want to load a whole page in an IFRAME, you may do so
     *  by specifying the complete URL (i.e. http://kendoui.com/).
     * </p>
     *
     * @exampleTitle Loading Splitter content asynchronously
     * @example
     * <div id="splitter">
     *     <div>Area 1 with Static Content</div>
     *     <div></div>
     *     <div></div>
     * </div>
     *
     * @exampleTitle Initialize Splitter; configure async loading for one pane; and an iframe for a third pane
     * @example
     * $(document).ready(function() {
     *     $("#splitter").kendoSplitter({
     *         panes: [
     *             {},
     *             { contentUrl: "html-content-snippet.html" },
     *             { contentUrl: "http://kendoui.com/" }
     *         ]
     *     });
     * });
     *
     * @section
     * <h3>Accessing an Existing Splitter</h3>
     * <p>
     *  You can reference an existing <strong>Splitter</strong> instance via
     *  <a href="http://api.jquery.com/jQuery.data/">jQuery.data()</a>. Once a reference has been established, you can
     *  use the API to control its behavior.
     * </p>
     *
     * @exampleTitle Accessing an existing Splitter instance
     * @example
     * var splitter = $("#splitter").data("kendoSplitter");
     *
     */
    var kendo = window.kendo,
        ui = kendo.ui,
        extend = $.extend,
        proxy = $.proxy,
        Widget = ui.Widget,
        pxUnitsRegex = /^\d+(\.\d+)?px$/i,
        percentageUnitsRegex = /^\d+(\.\d+)?%$/i,
        EXPAND = "expand",
        COLLAPSE = "collapse",
        CONTENTLOAD = "contentLoad",
        RESIZE = "resize",
        LAYOUTCHANGE = "layoutChange",
        HORIZONTAL = "horizontal",
        VERTICAL = "vertical",
        MOUSEENTER = "mouseenter",
        CLICK = "click",
        PANE = "pane",
        MOUSELEAVE = "mouseleave",
        KPANE = "k-" + PANE,
        PANECLASS = "." + KPANE;

    function isPercentageSize(size) {
        return percentageUnitsRegex.test(size);
    }

    function isPixelSize(size) {
        return pxUnitsRegex.test(size);
    }

    function isFluid(size) {
        return !isPercentageSize(size) && !isPixelSize(size);
    }

    function panePropertyAccessor(propertyName, triggersResize) {
        return function(pane, value) {
            var paneConfig = $(pane).data(PANE);

            if (arguments.length == 1) {
                return paneConfig[propertyName];
            }

            paneConfig[propertyName] = value;

            if (triggersResize) {
                var splitter = this.element.data("kendoSplitter");
                splitter.trigger(RESIZE);
            }
        };
    }

    var Splitter = Widget.extend(/** @lends kendo.ui.Splitter.prototype */ {
        /**
         * Creates a Splitter instance.
         *
         * @constructs
         * @extends kendo.ui.Widget
         *
         * @param {DomElement} element DOM element
         * @param {Object} options Configuration options.
         *
         * @option {String} [orientation] <horizontal>
         * Specifies the orientation of the <strong>Splitter</strong>.
         * <div class="details-list">
         *  <dl>
         *   <dt>"horizontal"</dt>
         *   <dd>Define horizontal orientation of the splitter.</dd>
         *   <dt>"vertical"</dt>
         *   <dd>Define vertical orientation of the splitter.</dd>
         *  </dl>
         * </div>
         *
         * @option {Array} [panes]
         * An array of pane definitions.
         *
         * _example
         * $("#splitter").kendoSplitter({
         *     panes: [
         *         { size: "200px", min: "100px", max: "300px" },
         *         { size: "20%", resizable: false },
         *         { collapsed: true, collapsible: true }
         *     ]
         * });
         *
         * @option {String} [panes.size]
         * Specifies the size of a pane defined as pixels (i.e. "200px") or as a percentage (i.e. "50%"). Note: This
         * value must not exceed <strong>panes.max</strong> or be less then <strong>panes.min</strong>.
         *
         * @option {String} [panes.min]
         * Specifies the minimum size of a pane defined as pixels (i.e. "200px") or as a percentage (i.e. "50%"). The
         * size of a resized pane cannot be less than the defined minimum size.
         *
         * @option {String} [panes.max]
         * Specifies the maximum size of a pane defined as pixels (i.e. "200px") or as a percentage (i.e. "50%"). The
         * size of a resized pane cannot exceed the defined maximum size.
         *
         * @option {Boolean} [panes.collapsed] <false>
         * Specifies whether a pane is initially collapsed (<strong>true</strong>) or expanded (<strong>true</strong>).
         *
         * @option {Boolean} [panes.collapsible] <false>
         * Specifies whether a pane is collapsible (<strong>true</strong>) or not collapsible (<strong>false</strong>).
         *
         * @option {Boolean} [panes.scrollable] <true>
         * Specifies whether a pane is scrollable (<strong>true</strong>) or not scrollable (<strong>false</strong>).
         *
         * @option {Boolean} [panes.resizable] <true>
         * Specifies whether a pane is resizable (<strong>true</strong>) or not resizable (<strong>false</strong>).
         *
         * @option {Boolean} [panes.contentUrl] <true>
         * Specifies the URL from which to load the content of a pane.
         *
         */
        init: function(element, options) {
            var that = this,
                panesConfig,
                triggerResize = function() {
                    that.trigger(RESIZE);
                };

            Widget.fn.init.call(that, element, options);

            that.orientation = that.options.orientation.toLowerCase() != VERTICAL ? HORIZONTAL : VERTICAL;
            splitbarSelector = ".k-splitbar-draggable-" + that.orientation;

            that.bind(RESIZE, proxy(that._resize, that));

            that._initPanes();

            that._attachEvents();

            $(window).resize(triggerResize);

            that.resizing = new PaneResizing(that);
        },
        events: [
            /**
            * Triggered when a pane of a Splitter is expanded.
            *
            * @name kendo.ui.Splitter#expand
            * @event
            *
            * @param {Event} e
            *
            * @param {Element} e.pane
            * The expanding pane of the Splitter.
            *
            * @exampleTitle Attach expand event handler during initialization; detach via unbind()
            * @example
            * // event handler for expand
            * var onExpand = function(e) {
            *     // access the expanded item via e.pane (HTMLElement)
            * };
            *
            * // attach expand event handler during initialization
            * var splitter = $("#splitter").kendoSplitter({
            *     expand: onExpand
            * });
            *
            * // detach expand event handler via unbind()
            * splitter.data("kendoSplitter").unbind("expand", onExpand);
            *
            * @exampleTitle Attach expand event handler via bind(); detach via unbind()
            * @example
            * // event handler for expand
            * var onExpand = function(e) {
            *     // access the expanded item via e.pane (HTMLElement)
            * };
            *
            * // attach expand event handler via bind()
            * $("#splitter").data("kendoSplitter").bind("expand", onExpand);
            *
            * // detach expand event handler via unbind()
            * $("#splitter").data("kendoSplitter").unbind("expand", onExpand);
            *
            */
            EXPAND,

            /**
            * Triggered when a pane of a Splitter is collapsed.
            *
            * @name kendo.ui.Splitter#collapse
            * @event
            *
            * @param {Event} e
            * @param {Element} e.pane
            * The collapsing pane of the Splitter.
            *
            * @exampleTitle Attach expand event handler during initialization; detach via unbind()
            * @example
            * // event handler for expand
            * var onCollapse = function(e) {
            *     // access the collapsed item via e.pane (HTMLElement)
            * };
            *
            * // attach collapse event handler during initialization
            * var splitter = $("#splitter").kendoSplitter({
            *     collapse: onCollapse
            * });
            *
            * // detach collapse event handler via unbind()
            * splitter.data("kendoSplitter").unbind("collapse", onCollapse);
            *
            * @exampleTitle Attach collapse event handler via bind(); detach via unbind()
            * @example
            * // event handler for collapse
            * var onExpand = function(e) {
            *     // access the collapsed item via e.pane (HTMLElement)
            * };
            *
            * // attach collapse event handler via bind()
            * $("#splitter").data("kendoSplitter").bind("collapse", onCollapse);
            *
            * // detach collapse event handler via unbind()
            * $("#splitter").data("kendoSplitter").unbind("collapse", onCollapse);
            *
            */
            COLLAPSE,

            /**
            * Triggered when the content for a pane has finished loading.
            *
            * @name kendo.ui.Splitter#contentLoad
            * @event
            *
            * @param {Event} e
            *
            * @param {HTMLElement} e.pane
            * The pane whose content has been loaded.
            *
            * @exampleTitle Attach contentLoad event handler during initialization; detach via unbind()
            * @example
            * // event handler for contentLoad
            * var onContentLoad = function(e) {
            *     // access the loaded pane via e.pane (HTMLElement)
            * };
            *
            * // attach contentLoad event handler during initialization
            * var splitter = $("#splitter").kendoSplitter({
            *     contentLoad: onContentLoad
            * });
            *
            * // detach contentLoad event handler via unbind()
            * splitter.data("kendoSplitter").unbind("contentLoad", onContentLoad);
            *
            * @exampleTitle Attach contentLoad event handler via bind(); detach via unbind()
            * @example
            * // event handler for contentLoad
            * var onContentLoad = function(e) {
            *     // access the loaded pane via e.pane (HTMLElement)
            * };
            *
            * // attach contentLoad event handler via bind()
            * $("#splitter").data("kendoSplitter").bind("contentLoad", onContentLoad);
            *
            * // detach contentLoad event handler via unbind()
            * $("#splitter").data("kendoSplitter").unbind("contentLoad", onContentLoad);
            *
            */
            CONTENTLOAD,

            /**
            * Triggered when a pane is resized.
            *
            * @name kendo.ui.Splitter#resize
            * @event
            * @param {Event} e
            *
            * @exampleTitle Attach resize event handler during initialization; detach via unbind()
            * @example
            * // event handler for resize
            * var onResize = function(e) {
            *     // ...
            * };
            *
            * // attach resize event handler during initialization
            * var splitter = $("#splitter").kendoSplitter({
            *     resize: onResize
            * });
            *
            * // detach resize event handler via unbind()
            * splitter.data("kendoSplitter").unbind("resize", onResize);

            * @exampleTitle Attach resize event handler via bind(); detach via unbind()
            * @example
            * // event handler for resize
            * var onResize = function(e) {
            *     // ...
            * };
            *
            * // attach resize event handler via bind()
            * $("#splitter").data("kendoSplitter").bind("resize", onResize);
            *
            * // detach resize event handler via unbind()
            * $("#splitter").data("kendoSplitter").unbind("resize", onResize);
            *
            */
            RESIZE,

            /**
            * Fires when the splitter layout has changed
            *
            * @name kendo.ui.Splitter#layoutChange
            * @event
            *
            * @exampleTitle Attach layoutChange event handler during initialization; detach via unbind()
            * @example
            * // event handler for resize
            * var onLayoutChange = function(e) {
            *     // ...
            * };
            *
            * $("#splitter").kendoSplitter({
            *     layoutChange: onLayoutChange
            * });
            *
            * @exampleTitle Attach layoutChange event handler via bind(); detach via unbind()
            * @example
            * // event handler for layoutChange
            * var onLayoutChange = function(e) {
            *     // ...
            * };
            *
            * // attach layoutChange event handler via bind()
            * $("#splitter").bind("layoutChange", onLayoutChange);
            *
            * // detach layoutChange event handler via unbind()
            * $("#splitter").unbind("layoutChange", onLayoutChange);
            *
            */
            LAYOUTCHANGE
        ],

        _attachEvents: function() {
            var that = this,
                orientation = that.options.orientation,
                splitbarSelector = ".k-splitbar-draggable-" + orientation,
                expandCollapseSelector = ".k-splitbar .k-icon:not(.k-resize-handle)",
                triggerResize = function() {
                    that.trigger(RESIZE);
                };

            that.element
                .delegate(splitbarSelector, MOUSEENTER, function() { $(this).addClass("k-splitbar-" + that.orientation + "-hover"); })
                .delegate(splitbarSelector, MOUSELEAVE, function() { $(this).removeClass("k-splitbar-" + that.orientation + "-hover"); })
                .delegate(splitbarSelector, "mousedown", function() { that._contentFrames(this).after("<div class='k-overlay' />"); })
                .delegate(splitbarSelector, "mouseup", function() { that._contentFrames(this).next(".k-overlay").remove(); })
                .delegate(expandCollapseSelector, MOUSEENTER, function() { $(this).addClass("k-state-hover")})
                .delegate(expandCollapseSelector, MOUSELEAVE, function() { $(this).removeClass('k-state-hover')})
                .delegate(".k-splitbar .k-collapse-next, .k-splitbar .k-collapse-prev", CLICK, that._arrowClick(COLLAPSE))
                .delegate(".k-splitbar .k-expand-next, .k-splitbar .k-expand-prev", CLICK, that._arrowClick(EXPAND))
                .delegate(".k-splitbar", "dblclick", proxy(that._dbclick, that))
                .parent().closest(".k-splitter").each(function() {
                    $(this).data("kendoSplitter").bind(RESIZE,  triggerResize);
                });
        },

        options: {
            name: "Splitter",
            orientation: HORIZONTAL
        },

        _initPanes: function() {
            var that = this,
                panesConfig = that.options.panes || [];

            that.element
                .addClass("k-widget").addClass("k-splitter")
                .children()
                    .addClass(KPANE)
                    .each(function (index, pane) {
                        var config = panesConfig && panesConfig[index];

                        pane = $(pane);

                        pane.data(PANE, config ? config : {})
                            .toggleClass("k-scrollable", config ? config.scrollable !== false : true);
                        that.ajaxRequest(pane);
                    })
                .end();
            that.trigger(RESIZE);
        },

        /**
         * Loads the content of a pane from a local or remote URL.
         *
         * @param {Selector | DOM Element} pane
         * The targetted pane whose content is to be loaded via a URL.
         *
         * @param {String} url
         * A local or remote URL from which the content of the pane is to be loaded.
         *
         * @param {Object | String} data
         * Any data that is necessary to be sent to the server.
         *
         * @example
         * // get a reference to the splitter
         * var splitter = $("#splitter").data("kendoSplitter");
         * // load content into the pane with ID, pane1
         * splitter.ajaxRequest("#pane1", "/customer/profile", { id: 42 });
         *
         */
        ajaxRequest: function(pane, url, data) {
            pane = $(pane);

            var that = this,
                paneConfig = pane.data(PANE);

            url = url || paneConfig.contentUrl;

            if (url) {
                pane.append("<span class='k-icon k-loading k-pane-loading' />");

                if (kendo.isLocalUrl(url)) {
                    $.ajax({
                        url: url,
                        data: data || {},
                        type: "GET",
                        dataType: "html",
                        success: function (data) {
                            pane.html(data);

                            that.trigger(CONTENTLOAD, { pane: pane[0] });
                        }
                    });
                } else {
                    pane.removeClass("k-scrollable")
                        .html("<iframe src='" + url + "' frameborder='0' class='k-content-frame'>" +
                                "This page requires frames in order to show content" +
                            + "</iframe>");
                }
            }
        },
        _triggerAction: function(type, pane) {
            if (!this.trigger(type, { pane: pane[0] })) {
                this[type](pane[0]);
            }
        },
        _dbclick: function(e) {
            var that = this,
                target = $(e.target),
                arrow;

            if (target.closest(".k-splitter")[0] != that.element[0]) {
                return;
            }

            arrow = target.children(".k-icon:not(.k-resize-handle)");

            if (arrow.length !== 1) {
                return;
            }

            if (arrow.is(".k-collapse-prev")) {
                that._triggerAction(COLLAPSE, target.prev());
            } else if (arrow.is(".k-collapse-next")) {
                that._triggerAction(COLLAPSE, target.next());
            } else if (arrow.is(".k-expand-prev")) {
                that._triggerAction(EXPAND, target.prev());
            } else if (arrow.is(".k-expand-next")) {
                that._triggerAction(EXPAND, target.next());
            }
        },
        _arrowClick: function (arrowType) {
            var that = this;

            return function(e) {
                var target = $(e.target),
                    pane;

                if (target.closest(".k-splitter")[0] != that.element[0])
                    return;

                if (target.is(".k-" + arrowType + "-prev")) {
                    pane = target.parent().prev();
                } else {
                    pane = target.parent().next();
                }
                that._triggerAction(arrowType, pane);
            };
        },
        _updateSplitBar: function(splitbar, previousPane, nextPane) {
            var catIconIf = function(iconType, condition) {
                   return condition ? "<div class='k-icon " + iconType + "' />" : "";
                },
                orientation = this.orientation,
                draggable = (previousPane.resizable !== false) && (nextPane.resizable !== false),
                prevCollapsible = previousPane.collapsible,
                prevCollapsed = previousPane.collapsed,
                nextCollapsible = nextPane.collapsible,
                nextCollapsed = nextPane.collapsed;

            splitbar.addClass("k-splitbar k-state-default k-splitbar-" + orientation)
                .removeClass("k-splitbar-" + orientation + "-hover")
                .toggleClass("k-splitbar-draggable-" + orientation,
                    draggable && !prevCollapsed && !nextCollapsed)
                .toggleClass("k-splitbar-static-" + orientation,
                    !draggable && !prevCollapsible && !nextCollapsible)
                .html(
                    catIconIf("k-collapse-prev", prevCollapsible && !prevCollapsed && !nextCollapsed) +
                    catIconIf("k-expand-prev", prevCollapsible && prevCollapsed && !nextCollapsed) +
                    catIconIf("k-resize-handle", draggable) +
                    catIconIf("k-collapse-next", nextCollapsible && !nextCollapsed && !prevCollapsed) +
                    catIconIf("k-expand-next", nextCollapsible && nextCollapsed && !prevCollapsed)
                );
        },
        _updateSplitBars: function() {
            var that = this;

            this.element.children(".k-splitbar").each(function() {
                var splitbar = $(this),
                    previousPane = splitbar.prev(PANECLASS).data(PANE),
                    nextPane = splitbar.next(PANECLASS).data(PANE);

                if (!nextPane) {
                    return;
                }

                that._updateSplitBar(splitbar, previousPane, nextPane);
            });
        },
        _contentFrames: function(splitbar) {
            return $(splitbar).siblings(PANECLASS).find("> .k-content-frame");
        },
        _resize: function() {
            var that = this,
                element = that.element,
                panes = element.children(":not(.k-splitbar)"),
                isHorizontal = that.orientation == HORIZONTAL,
                splitBars = element.children(".k-splitbar"),
                splitBarsCount = splitBars.length,
                sizingProperty = isHorizontal ? "width" : "height",
                totalSize = element[sizingProperty]();

            if (splitBarsCount === 0) {
                splitBarsCount = panes.length - 1;
                panes.slice(0, splitBarsCount).after("<div class='k-splitbar' />");
                that._updateSplitBars();
                splitBars = element.children(".k-splitbar");
            } else {
                that._updateSplitBars();
            }

            // discard splitbar sizes from total size
            splitBars.each(function() {
                totalSize -= this[isHorizontal ? "offsetWidth" : "offsetHeight"];
            });

            var sizedPanesWidth = 0,
                sizedPanesCount = 0,
                freeSizedPanes = $();

            panes.css({ position: "absolute", top: 0 })
                [sizingProperty](function() {
                    var config = $(this).data(PANE) || {}, size;

                    if (config.collapsed) {
                        size = 0;
                    } else if (isFluid(config.size)) {
                        freeSizedPanes = freeSizedPanes.add(this);
                        return;
                    } else { // sized in px/%, not collapsed
                        size = parseInt(config.size, 10);

                        if (isPercentageSize(config.size)) {
                            size = Math.floor(size * totalSize / 100);
                        }
                    }

                    sizedPanesCount++;
                    sizedPanesWidth += size;

                    return size;
                });

            totalSize -= sizedPanesWidth;

            var freeSizePanesCount = freeSizedPanes.length,
                freeSizePaneWidth = Math.floor(totalSize / freeSizePanesCount);

            freeSizedPanes
                .slice(0, freeSizePanesCount - 1)
                    .css(sizingProperty, freeSizePaneWidth)
                .end()
                .eq(freeSizePanesCount - 1)
                    .css(sizingProperty, totalSize - (freeSizePanesCount - 1) * freeSizePaneWidth);

            // arrange panes
            var sum = 0,
                alternateSizingProperty = isHorizontal ? "height" : "width",
                positioningProperty = isHorizontal ? "left" : "top",
                sizingDomProperty = isHorizontal ? "offsetWidth" : "offsetHeight";

            if (freeSizePanesCount == 0) {
                var lastNonCollapsedPane = panes.filter(function() {
                    return !(($(this).data(PANE) || {}).collapsed);
                }).last();

                lastNonCollapsedPane[sizingProperty](totalSize + lastNonCollapsedPane[0][sizingDomProperty]);
            }

            element.children()
                .css(alternateSizingProperty, element[alternateSizingProperty]())
                .each(function (i, child) {
                    child.style[positioningProperty] = Math.floor(sum) + "px";
                    sum += child[sizingDomProperty];
                });

            that.trigger(LAYOUTCHANGE);
        },

        /**
         * Toggles the state of a specified pane (i.e. collapsed or expanded). Invoking this method will force the
         * <strong>Splitter</strong> to redraw and it will trigger layoutChange and resize events. Note: Invoking the
         * method will not trigger collapse or expand events.
         *
         * @param {Selector | DOM Element} pane
         * The pane to be collapsed.
         *
         * @param {Boolean} expand (Optional)
         * Represents the desired state of the specified pane; to be expanded (<strong>true</strong>) or collapsed
         * (<strong>false</strong>). If undefined, toggle() will collapse the pane if it is expanded or will expand the
         * pane if it is collapsed.
         *
         * @example
         * // get a reference to the splitter
         * var splitter = $("#splitter").data("kendoSplitter");
         * // toggle the state of the pane with ID, pane1
         * splitter.toggle("#pane1");
         * // toggle the state of the pane with ID, pane1 to be expanded
         * splitter.toggle("#pane1", true);
         * // toggle the state of the pane with ID, pane1 to be collapsed
         * splitter.toggle("#pane1", false);
         *
         */
        toggle: function(pane, expand) {
            var pane = $(pane),
                paneConfig = pane.data(PANE);

            if (arguments.length == 1) {
                expand = paneConfig.collapsed === undefined ? false : paneConfig.collapsed;
            }

            paneConfig.collapsed = !expand;

            this.trigger(RESIZE);
        },

        /**
         * Collapses a specified pane. Invoking this method will force the <strong>Splitter</strong> to redraw and it
         * will trigger layoutChange and resize events. Note: Invoking the method will not trigger a collapse event.
         *
         * @param {Selector | DOM Element} pane
         * The pane to be collapsed.
         *
         * @example
         * // get a reference to the splitter
         * var splitter = $("#splitter").data("kendoSplitter");
         * // collapse the pane with ID, pane1
         * splitter.collapse("#pane1");
         *
         */
        collapse: function(pane) {
            this.toggle(pane, false);
        },

        /**
         * Expands a specified pane. Invoking this method will force the <strong>Splitter</strong> to redraw and it
         * will trigger layoutChange and resize events. Note: Invoking the method will not trigger an expand event.
         *
         * @param {Selector | DOM Element} pane
         * The pane to be expanded.
         *
         * @example
         * // get a reference to the splitter
         * var splitter = $("#splitter").data("kendoSplitter");
         * // expand the pane with ID, pane1
         * splitter.expand("#pane1");
         *
         */
        expand: function(pane) {
            this.toggle(pane, true);
        },

        /**
         * Set the size of the pane. Setting this value will cause the <strong>Splitter</strong> to redraw and it will
         * trigger layoutChange and resize events.
         *
         * @name kendo.ui.Splitter#size
         * @function
         *
         * @param {Selector | DOM Element} pane
         * The pane to be resized.
         *
         * @param {String} value
         * The new size of the pane defined as pixels (i.e. "200px") or as a percentage (i.e. "50%"). Note: This value
         * must not exceed <strong>panes.max</strong> or be less then <strong>panes.min</strong>.
         *
         * @example
         * // get a reference to the splitter
         * var splitter = $("#splitter").data("kendoSplitter");
         * // set the size of the pane with ID, pane1
         * splitter.size("#pane1", "200px");
         *
         */
        size: panePropertyAccessor("size", true),

        /**
         * Sets the minimum size of a pane. Setting this value will not cause the <strong>Splitter</strong> to
         * redraw, nor will it trigger any events.
         *
         * @name kendo.ui.Splitter#min
         * @function
         *
         * @param {Selector | DOM Element} pane
         * The pane being targetted for a new minimum size configuration value.
         *
         * @param {String} value
         * The minimum size value of the pane defined as pixels (i.e. "200px") or as a percentage (i.e. "50%").
         *
         * @example
         * // get a reference to the splitter
         * var splitter = $("#splitter").data("kendoSplitter");
         * // set the minimum size of the pane with ID, pane1
         * splitter.min("#pane1", "100px");
         *
         */
        min: panePropertyAccessor("min"),

        /**
         * Sets the maximum size of a pane. Setting this value will not cause the <strong>Splitter</strong> to
         * redraw, nor will it trigger any events.
         *
         * @name kendo.ui.Splitter#max
         * @function
         *
         * @param {Selector | DOM Element} pane
         * The pane being targetted for a new minimum size configuration value.
         *
         * @param {String} value
         * The maximum size value of the pane defined as pixels (i.e. "200px") or as a percentage (i.e. "50%").
         *
         * @example
         * // get a reference to the splitter
         * var splitter = $("#splitter").data("kendoSplitter");
         * // set the maximum size of the pane with ID, pane1
         * splitter.max("#pane1", "300px");
         *
         */
        max: panePropertyAccessor("max")
    });

    ui.plugin(Splitter);

    var verticalDefaults = {
            sizingProperty: "height",
            sizingDomProperty: "offsetHeight",
            alternateSizingProperty: "width",
            positioningProperty: "top",
            mousePositioningProperty: "pageY"
        };

    var horizontalDefaults = {
            sizingProperty: "width",
            sizingDomProperty: "offsetWidth",
            alternateSizingProperty: "height",
            positioningProperty: "left",
            mousePositioningProperty: "pageX"
        };

    function PaneResizing(splitter) {
        var that = this,
            orientation = splitter.orientation;

        that.owner = splitter;
        that._element = splitter.element;
        that.orientation = orientation;

        extend(that, orientation === HORIZONTAL ? horizontalDefaults : verticalDefaults);

        that._resizable = new kendo.ui.Resizable(splitter.element, {
            orientation: orientation,
            handle: ".k-splitbar-draggable-" + orientation,
            hint: proxy(that._createHint, that),
            start: proxy(that._start, that),
            max: proxy(that._max, that),
            min: proxy(that._min, that),
            invalidClass:"k-restricted-size-" + orientation,
            resizeend: proxy(that._stop, that)
        });
    }

    PaneResizing.prototype = {
        _createHint: function(handle) {
            var that = this;
            return $("<div class='k-ghost-splitbar k-ghost-splitbar-" + that.orientation + " k-state-default' />")
                        .css(that.alternateSizingProperty, handle[that.alternateSizingProperty]())
        },
        _start: function(e) {
            var that = this,
                splitbar = $(e.currentTarget),
                previousPane = splitbar.prev(),
                nextPane = splitbar.next(),
                previousPaneConfig = previousPane.data(PANE),
                nextPaneConfig = nextPane.data(PANE),
                prevBoundary = parseInt(previousPane[0].style[that.positioningProperty]),
                nextBoundary = parseInt(nextPane[0].style[that.positioningProperty]) + nextPane[0][that.sizingDomProperty] - splitbar[0][that.sizingDomProperty],
                totalSize = that._element.css(that.sizingProperty),
                toPx = function (value) {
                    var val = parseInt(value, 10);
                    return (isPixelSize(value) ? val : (totalSize * val) / 100) || 0;
                },
                prevMinSize = toPx(previousPaneConfig.min),
                prevMaxSize = toPx(previousPaneConfig.max) || nextBoundary - prevBoundary,
                nextMinSize = toPx(nextPaneConfig.min),
                nextMaxSize = toPx(nextPaneConfig.max) || nextBoundary - prevBoundary;

            that.previousPane = previousPane;
            that.nextPane = nextPane;
            that._maxPosition = Math.min(nextBoundary - nextMinSize, prevBoundary + prevMaxSize);
            that._minPosition = Math.max(prevBoundary + prevMinSize, nextBoundary - nextMaxSize);
        },
        _max: function(e) {
              return this._maxPosition;
        },
        _min: function(e) {
            return this._minPosition;
        },
        _stop: function(e) {
            var that = this,
                splitbar = $(e.currentTarget),
                owner = that.owner;

            owner._contentFrames(splitbar).next(".k-overlay").remove();

            if (e.keyCode !== kendo.keys.ESC) {
                var ghostPosition = e.position,
                    previousPane = splitbar.prev(),
                    nextPane = splitbar.next(),
                    previousPaneConfig = previousPane.data(PANE),
                    nextPaneConfig = nextPane.data(PANE),
                    previousPaneNewSize = ghostPosition - parseInt(previousPane[0].style[that.positioningProperty]),
                    nextPaneNewSize = parseInt(nextPane[0].style[that.positioningProperty]) + nextPane[0][that.sizingDomProperty] - ghostPosition - splitbar[0][that.sizingDomProperty],
                    fluidPanesCount = that._element.children(PANECLASS).filter(function() { return isFluid($(this).data(PANE).size); }).length;

                if (!isFluid(previousPaneConfig.size) || fluidPanesCount > 1) {
                    if (isFluid(previousPaneConfig.size)) {
                        fluidPanesCount--;
                    }

                    previousPaneConfig.size = previousPaneNewSize + "px";
                }

                if (!isFluid(nextPaneConfig.size) || fluidPanesCount > 1) {
                    nextPaneConfig.size = nextPaneNewSize + "px";
                }

                owner.trigger(RESIZE);
            }

            return false;
        }
    }

})(jQuery);
