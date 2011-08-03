(function($, window, undefined) {
    /**
    * @name kendo.ui.Splitter.Description
    *
    * @section The splitter component provides a easy way to separate the content.
    * The component converts the children of an HTML element to resizable and/or collapsible
    * panes.
    *
    * @exampleTitle Creating a basic splitter
    * @example
    * <div id="splitter">
    *    <div>
    *        Area 1
    *    </div>
    *    <div>
    *        Area 2
    *    </div>
    * </div>
    *
    * <script>
    *     $("#splitter").kendoSplitter();
    * </script>
    */
    var kendo = window.kendo,
        ui = kendo.ui,
        extend = $.extend,
        Component = ui.Component,
        splitBarSize = 7,
        pxUnitsRegex = /^\d+px$/i,
        percentageUnitsRegex = /^\d+(\.\d+)?%$/i,
        EXPAND = "expand",
        COLLAPSE = "collapse",
        CONTENTLOAD = "contentLoad",
        RESIZE = "resize",
        HORIZONTAL = "horizontal",
        VERTICAL = "vertical",
        MOUSEENTER = "mouseenter",
        CLICK = "click",
        MOUSELEAVE = "mouseleave";

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
            var paneConfig = $(pane).data("pane");

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

    var Splitter = Component.extend(/** @lends kendo.ui.Splitter.prototype */ {
        /**
         * Creates a Splitter instance.
         * @constructs
         * @extends kendo.ui.Component
         * @param {DomElement} element DOM element
         * @param {Object} options Configuration options.
         * @option {String} [orientation] <horizontal> Specifies the orientation of the splitter.
         *    <dl>
         *         <dt>
         *              "horizontal"
         *         </dt>
         *         <dd>
         *              Define horizontal orientation of the splitter.
         *         </dd>
         *         <dt>
         *              "vertical"
         *         </dt>
         *         <dd>
         *              Define vertical orientation of the splitter.
         *         </dd>
         *    </dl>
         * @option {Array} [panes] Array of pane definitions.
         * _example
         *  $("#splitter").kendoSplitter({
         *      //definitions for the first three panes
         *      panes: [
         *          {
         *              size: "200px",
         *              min: "100px",
         *              max: "300px"
         *          },
         *          {
         *              size: "20%",
         *              resizable: false
         *         },
         *         {
         *              collapsed: true,
         *              collapsible: true
         *         }
         *      ]
         *   });
         * @option {String} [panes.size] Specifies the size of the pane.
         * <p>
         * The size can be defined in pixes or in percents.
         * </p>
         * <p>
         * The size cannot be more than panes.max and less then panes.min.
         * </p>
         * @option {String} [panes.min] Specifies the minimum size of the pane.
         * <p>
         * Resized pane cannot be smaller then the defined minimum size.
         * </p>
         * @option {String} [panes.max] Specifies the maximum size of the pane.
         * <p>
         * Resized pane cannot be bigger then the defined maximum size.
         * </p>
         * @option {Boolean} [panes.collapsed] <false> Specifies whether the pane is initially collapsed.
         * @option {Boolean} [panes.collapsible] <false> Specifies whether the pane can be collapsed by the user.
         * @option {Boolean} [panes.scrollable] <true> Specifies whether the pane shows a scrollbar when its content overflows.
         * @option {Boolean} [panes.resizable] <true> Specifies whether the pane can be resized by the user.
         * @option {Boolean} [panes.contentUrl] <true> Specifies URL from which to load the pane content.
         */
        init: function(element, options) {
            var that = this,
                panesConfig,
                splitbarSelector,
                expandCollapseSelector = ".t-splitbar .t-icon:not(.t-resize-handle)";

            Component.fn.init.call(that, element, options);

            that.orientation = that.options.orientation.toLowerCase() != VERTICAL ? HORIZONTAL : VERTICAL;
            splitbarSelector = ".t-splitbar-draggable-" + that.orientation;
            that.ajaxOptions = that.options.ajaxOptions || that.ajaxOptions;

            that.bind([
                /**
                 * Fires before a pane is expanded.
                 * @name kendo.ui.Splitter#expand
                 * @event
                 * @param {Event} e
                 * @param {Element} e.pane The expanding pane
                 */
                EXPAND,
                /**
                 * Fires before a pane is collapsed.
                 * @name kendo.ui.Splitter#collapse
                 * @event
                 * @param {Event} e
                 * @param {Element} e.pane The collapsing pane
                 */
                COLLAPSE,
                /**
                 * Fires when a request for the pane contents has finished
                 * @name kendo.ui.Splitter#contentLoad
                 * @event
                 * @param {Event} e
                 * @param {Element} e.pane The pane whose content has been loaded.
                 */
                CONTENTLOAD,
                /**
                 * Fires when a pane is resized
                 * @name kendo.ui.Splitter#resize
                 * @event
                 * @param {Event} e
                 * @param {Element} e.pane The pane which is resized
                 */
                RESIZE
            ], that.options);
            that.bind(RESIZE, $.proxy(that._resize, that));

            that._initPanes();

            that.element
                .delegate(splitbarSelector, MOUSEENTER, function() { $(this).addClass("t-splitbar-" + that.orientation + "-hover"); })
                .delegate(splitbarSelector, MOUSELEAVE, function() { $(this).removeClass("t-splitbar-" + that.orientation + "-hover"); })
                .delegate(expandCollapseSelector, MOUSEENTER, function() { $(this).addClass("t-state-hover")})
                .delegate(expandCollapseSelector, MOUSELEAVE, function() { $(this).removeClass('t-state-hover')})
                .delegate(".t-splitbar .t-collapse-next, .t-splitbar .t-collapse-prev", CLICK, that._arrowClick(COLLAPSE))
                .delegate(".t-splitbar .t-expand-next, .t-splitbar .t-expand-prev", CLICK, that._arrowClick(EXPAND))
                .delegate(".t-splitbar", "dblclick", $.proxy(that._dbclick, that))
                .parent().closest(".t-splitter").each(function() {
                    $(this).data("kendoSplitter").bind(RESIZE, function() {
                        that.trigger(RESIZE);
                    })
                });

            that.resizing = new PaneResizing(that);
        },

        options: {
            orientation: HORIZONTAL
        },
        _initPanes: function() {
            var that = this,
                panesConfig = that.options.panes || [];

            that.element
                .addClass("t-widget").addClass("t-splitter")
                .children()
                    .addClass("t-pane")
                    .each(function (index, pane) {
                        var $pane = $(pane),
                            config = panesConfig && panesConfig[index];

                        $pane.data("pane", config ? config : {})
                            .toggleClass("t-scrollable", config ? config.scrollable !== false : true);
                        that.ajaxRequest($pane);
                    })
                .end();
            that.trigger(RESIZE);
        },
        ajaxOptions: function($pane, options) {
            var that = this;

            return $.extend({
                type: "GET",
                dataType: "html",
                success: function (data) {
                    $pane.html(data);

                    that.trigger(CONTENTLOAD, { pane: $pane[0] });
                }
            }, options);
        },

        /**
        * Loads the pane content from the specified URL.
        * @param {Selector|DomElement|jQueryObject} pane The pane whose content
        * @param {String} url The URL which returns the pane content.
        * @example
        * splitter.ajaxRequest("#Pane1", "/Home/Pane1Content.html");
        */
        ajaxRequest: function(pane, url) {
            var $pane = $(pane),
                paneConfig = $pane.data("pane");

            if (url || paneConfig.contentUrl) {
                $pane.append("<span class='t-icon t-loading t-pane-loading' />");

                $.ajax(this.ajaxOptions($pane, {
                    url: url || paneConfig.contentUrl
                }));
            }
        },
        _triggerAction: function(type, pane) {
            if (!this.trigger(type, { pane: pane[0] })) {
                this[type](pane[0]);
            }
        },
        _dbclick: function(e) {
            var that = this,
                $target = $(e.target),
                arrow;

            if ($target.closest(".t-splitter")[0] != that.element[0]) {
                return;
            }

            arrow = $target.children(".t-icon:not(.t-resize-handle)");

            if (arrow.length !== 1) {
                return;
            }

            if (arrow.is(".t-collapse-prev")) {
                that._triggerAction(COLLAPSE, $target.prev());
            } else if (arrow.is(".t-collapse-next")) {
                that._triggerAction(COLLAPSE, $target.next());
            } else if (arrow.is(".t-expand-prev")) {
                that._triggerAction(EXPAND, $target.prev());
            } else if (arrow.is(".t-expand-next")) {
                that._triggerAction(EXPAND, $target.next());
            }
        },
        _arrowClick: function (arrowType) {
            var that = this;

            return function(e) {
                var $target = $(e.target),
                    pane;

                if ($target.closest(".t-splitter")[0] != that.element[0])
                    return;

                if ($target.is(".t-" + arrowType + "-prev")) {
                    pane = $target.parent().prev();
                } else {
                    pane = $target.parent().next();
                }
                that._triggerAction(arrowType, pane);
            };
        },
        _appendSplitBars: function(panes) {
            var splitBarsCount = panes.length - 1,
                pane,
                previousPane,
                nextPane,
                idx,
                isSplitBarDraggable,
                catIconIf = function(iconType, condition) {
                   return condition ? "<div class='t-icon " + iconType + "' />" : "";
                };

            for (idx = 0; idx < splitBarsCount; idx++) {
                pane = panes.eq(idx);
                previousPane = pane.data("pane");
                nextPane = pane.next().data("pane");

                if (!nextPane) {
                    continue;
                }

                isSplitBarDraggable = (previousPane.resizable !== false) && (nextPane.resizable !== false);

                pane.after("<div class='t-splitbar t-state-default t-splitbar-" + this.orientation +
                        (isSplitBarDraggable && !previousPane.collapsed && !nextPane.collapsed ?  " t-splitbar-draggable-" + this.orientation : "") +
                    "'>" + catIconIf("t-collapse-prev", previousPane.collapsible && !previousPane.collapsed) +
                    catIconIf("t-expand-prev", previousPane.collapsible && previousPane.collapsed) +
                    catIconIf("t-resize-handle", isSplitBarDraggable) +
                    catIconIf("t-collapse-next", nextPane.collapsible && !nextPane.collapsed) +
                    catIconIf("t-expand-next", nextPane.collapsible && nextPane.collapsed) + "</div>");
            }
        },
        _resize: function() {
            var that = this,
                element = that.element,
                panes = element.children(":not(.t-splitbar)"),
                isHorizontal = that.orientation == HORIZONTAL,
                splitBarsCount = element.children(".t-splitbar").length,
                sizingProperty = isHorizontal ? "width" : "height",
                totalSize = element[sizingProperty]();

            if (splitBarsCount === 0) {
                splitBarsCount = panes.length - 1;
                that._appendSplitBars(panes);
            }

            // discard splitbar sizes from total size
            totalSize -= splitBarSize * splitBarsCount;

            var sizedPanesWidth = 0,
                sizedPanesCount = 0,
                freeSizedPanes = $();

            panes.css({ position: "absolute", top: 0 })
                [sizingProperty](function() {
                    var config = $(this).data("pane"), size;

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
                .slice(0, freeSizePanesCount - 1).css(sizingProperty, freeSizePaneWidth).end()
                .eq(freeSizePanesCount - 1).css(sizingProperty, totalSize - (freeSizePanesCount - 1) * freeSizePaneWidth);

            // arrange panes
            var sum = 0,
                alternateSizingProperty = isHorizontal ? "height" : "width",
                positioningProperty = isHorizontal ? "left" : "top",
                sizingDomProperty = isHorizontal ? "offsetWidth" : "offsetHeight";

            element.children()
                .css(alternateSizingProperty, element[alternateSizingProperty]())
                .each(function (i, child) {
                    child.style[positioningProperty] = Math.floor(sum) + "px";
                    sum += child[sizingDomProperty];
                });
        },
        toggle: function(pane, expand) {
            var pane = $(pane),
                previousSplitBar = pane.prev(".t-splitbar"),
                nextSplitBar = pane.next(".t-splitbar"),
                splitbars = previousSplitBar.add(nextSplitBar),
                paneConfig = pane.data("pane");

            if (arguments.length == 1) {
                expand = paneConfig.collapsed === undefined ? false : paneConfig.collapsed;
            }

            splitbars
                .toggleClass("t-splitbar-draggable-" + this.orientation, expand)
                .removeClass("t-splitbar-" + this.orientation + "-hover");

            previousSplitBar
                .find(expand ? ".t-expand-next" : ".t-collapse-next")
                    .toggleClass("t-expand-next", !expand)
                    .toggleClass("t-collapse-next", expand);

            nextSplitBar
                .find(expand ? ".t-expand-prev" : ".t-collapse-prev")
                    .toggleClass("t-expand-prev", !expand)
                    .toggleClass("t-collapse-prev", expand);

            paneConfig.collapsed = !expand;

            this.trigger(RESIZE);
        },
        /**
        * Collapses the specified Pane item
        * @param {Selector|DomElement|jQueryObject} pane The pane, which will be collapsed.
        * @example
        * splitter.collapse("#Item1"); //id of the first pane
        */
        collapse: function(pane) {
            this.toggle(pane, false);
        },
        /**
        * Expands the specified Pane item
        * @param {Selector|DomElement|jQueryObject} pane The pane, which will be expanded.
        * @example
        * splitter.expand("#Item1"); //id of the first pane
        */
        expand: function(pane) {
            this.toggle(pane, true);
        },
        /**
        * Set the size of the pane.
        * @name kendo.ui.Splitter#size
        * @function
        * @param {Selector|DomElement|jQueryObject} pane The pane
        * @param {String} value The new size of the pane.
        * @example
        * splitter.size("#Item1", "200px");
        */
        size: panePropertyAccessor("size", true),
        /**
        * Set the minimum size of the pane.
        * @name kendo.ui.Splitter#min
        * @function
        * @param {Selector|DomElement|jQueryObject} pane The pane
        * @param {String} value The minimum size value.
        * @example
        * splitter.min("#Item1", "100px");
        */
        min: panePropertyAccessor("min"),
        /**
        * Set the maximum size of the pane.
        * @name kendo.ui.Splitter#max
        * @function
        * @param {Selector|DomElement|jQueryObject} pane The pane
        * @param {String} value The maximum size value.
        * @example
        * splitter.max("#Item1", "300px");
        */
        max: panePropertyAccessor("max")
    });

    ui.plugin("Splitter", Splitter);

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
        var that = this;

        that.owner = splitter;
        that._element = that.owner.element;
        that.orientation = that.owner.orientation;

        $.extend(that, that.orientation === HORIZONTAL ? horizontalDefaults : verticalDefaults);

        that._resizable = new kendo.ui.Resizable(splitter.element, {
            orientation: that.orientation,
            handle: that.orientation == HORIZONTAL ? ".t-splitbar-draggable-horizontal" : ".t-splitbar-draggable-vertical",
            hint: $.proxy(that._createHint, that),
            start: $.proxy(that._start, that),
            max: $.proxy(that._max, that),
            min: $.proxy(that._min, that),
            invalidClass:"t-restricted-size-" + that.orientation,
            resizeend: $.proxy(that._stop, that)
        });
    }

    PaneResizing.prototype = {
        _createHint: function(handle) {
            var that = this;
            return $("<div class='t-ghost-splitbar t-ghost-splitbar-" + that.orientation + " t-state-default' />")
                        .css(that.alternateSizingProperty, handle[that.alternateSizingProperty]())
        },
        _start: function(e) {
            var that = this,
                splitBar = $(e.currentTarget),
                previousPane = splitBar.prev(),
                nextPane = splitBar.next(),
                previousPaneConfig = previousPane.data("pane"),
                nextPaneConfig = nextPane.data("pane"),
                prevBoundary = parseInt(previousPane[0].style[that.positioningProperty]),
                nextBoundary = parseInt(nextPane[0].style[that.positioningProperty]) + nextPane[0][that.sizingDomProperty] - splitBarSize,
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
            var that = this;

            if (e.keyCode !== 27) {
                var ghostPosition = e.position,
                    splitBar = $(e.currentTarget),
                    previousPane = splitBar.prev(),
                    nextPane = splitBar.next(),

                    previousPaneConfig = previousPane.data("pane"),
                    nextPaneConfig = nextPane.data("pane"),
                    previousPaneNewSize = ghostPosition - parseInt(previousPane[0].style[that.positioningProperty]),
                    nextPaneNewSize = parseInt(nextPane[0].style[that.positioningProperty]) + nextPane[0][that.sizingDomProperty] - ghostPosition - splitBarSize,
                    totalSize = that._element[that.sizingProperty]();

                totalSize -= splitBarSize * (that._element.children('.t-splitbar').length + 1);

                var fluidPanesCount = that._element.children(".t-pane").filter(function() { return isFluid($(this).data("pane").size); }).length;

                if (!isFluid(previousPaneConfig.size) || fluidPanesCount > 1) {
                    if (isFluid(previousPaneConfig.size)) {
                        fluidPanesCount--;
                    }

                    previousPaneConfig.size = previousPaneNewSize + "px";
                }

                if (!isFluid(nextPaneConfig.size) || fluidPanesCount > 1) {
                    nextPaneConfig.size = nextPaneNewSize + "px";
                }
            }

            if (e.keyCode !== 27) {
                that.owner.trigger(RESIZE);
            }

            return false;
        }
    }

})(jQuery, window);
