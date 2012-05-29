(function($, undefined) {
    var kendo = window.kendo,
        mobile = kendo.mobile,
        fx = kendo.fx,
        ui = mobile.ui,
        proxy = $.proxy,
        extend = $.extend,
        Widget = ui.Widget,
        Class = kendo.Class,
        Movable = kendo.ui.Movable,
        Pane = kendo.ui.Pane,
        PaneDimensions = kendo.ui.PaneDimensions,
        Transition = fx.Transition,
        Animation = fx.Animation,
        SNAPBACK_DURATION = 500,
        SCROLLBAR_OPACITY = 0.7,
        FRICTION = 0.93,
        OUT_OF_BOUNDS_FRICTION = 0.5,
        RELEASECLASS = "km-scroller-release",
        REFRESHCLASS = "km-scroller-refresh",
        PULL = "pull",
        CHANGE = "change",
        RESIZE = "resize",
        SCROLL = "scroll";

    var DragInertia = Animation.extend({
        init: function(options) {
            var that = this;

            Animation.fn.init.call(that);

            extend(that, options, {
                transition: new Transition({
                    axis: options.axis,
                    movable: options.movable,
                    onEnd: function() { that._end(); }
                })
            });

            that.tap.bind("press", function() { that.cancel(); });
            that.drag.bind("end", proxy(that.start, that));
            that.drag.bind("tap", proxy(that.onEnd, that));
        },

        onCancel: function() {
            this.transition.cancel();
        },

        freeze: function(location) {
            var that = this;
            that.cancel();
            that._moveTo(location);
        },

        onEnd: function() {
            var that = this;
            if (that._outOfBounds()) {
                that._snapBack();
            } else {
                that._end();
            }
        },

        done: function() {
            return Math.abs(this.velocity) < 1;
        },

        start: function() {
            var that = this;

            if (!that.dimension.present()) { return; }

            if (that._outOfBounds()) {
                that._snapBack();
            } else {
                that.velocity = that.drag[that.axis].velocity * 16;
                if (that.velocity) {
                    that.tap.captureNext();
                    Animation.fn.start.call(that);
                }
            }
        },

        tick: function() {
            var that = this,
                dimension = that.dimension,
                friction = that._outOfBounds() ? OUT_OF_BOUNDS_FRICTION : FRICTION,
                delta = (that.velocity *= friction),
                location = that.movable[that.axis] + delta;

                if (!that.elastic && dimension.outOfBounds(location)) {
                    location = Math.max(Math.min(location, dimension.max), dimension.min);
                    that.velocity = 0;
                }

            that.movable.moveAxis(that.axis, location);
        },

        _end: function() {
            this.tap.cancelCapture();
            this.end();
        },

        _outOfBounds: function() {
            return this.dimension.outOfBounds(this.movable[this.axis]);
        },

        _snapBack: function() {
            var that = this,
                dimension = that.dimension,
                snapBack = that.movable[that.axis] > dimension.max ? dimension.max : dimension.min;
            that._moveTo(snapBack);
        },

        _moveTo: function(location) {
            this.transition.moveTo({ location: location, duration: SNAPBACK_DURATION, ease: Transition.easeOutExpo });
        }
    });

    var ScrollBar = Class.extend({
        init: function(options) {
            var that = this,
                horizontal = options.axis === "x",
                element = $('<div class="km-touch-scrollbar km-' + (horizontal ? "horizontal" : "vertical") + '-scrollbar" />');

            extend(that, options, {
                element: element,
                elementSize: 0,
                movable: new Movable(element),
                scrollMovable: options.movable,
                size: horizontal ? "width" : "height"
            });

            that.scrollMovable.bind(CHANGE, proxy(that._move, that));
            that.container.append(element);
        },

        _move: function() {
            var that = this,
                axis = that.axis,
                dimension = that.dimension,
                paneSize = dimension.size,
                scrollMovable = that.scrollMovable,
                sizeRatio = paneSize / dimension.total,
                position = Math.round(-scrollMovable[axis] * sizeRatio),
                size = Math.round(paneSize * sizeRatio);

                if (position + size > paneSize) {
                    size = paneSize - position;
                } else if (position < 0) {
                    size += position;
                    position = 0;
                }

            if (that.elementSize != size) {
                that.element.css(that.size, size + "px");
                that.elementSize = size;
            }

            that.movable.moveAxis(axis, position);
        },

        show: function() {
            this.element.css({opacity: SCROLLBAR_OPACITY, visibility: "visible"});
        },

        hide: function() {
            this.element.css({opacity: 0});
        }
    });

    /**
     * @name kendo.mobile.ui.Scroller.Description
     * @section
     * <p>The Kendo Mobile Scroller widget enables touch friendly kinetic scrolling for the contents of a given DOM element.  </p>
     *
     * <h3>Getting Started</h3>
     * <p>Each mobile View initializes a scroller for its content element. In addition to that, a scroller will be initialized for every element with a
     * <code>role</code> data attribute set to <code>scroller</code>.
     * Alternatively, it can be initialized using jQuery plugin syntax in the containing mobile View <strong>init event handler</strong>.
     * </p>
     * <p>For the scroller to work, its element should have fixed dimensions (width and/or height) set.</p>
     *
     * @exampleTitle Initialize mobile Scroller using a role data attribute.
     * @example
     * <div data-role="scroller">
     *   Foo
     * </div>
     *
     * @exampleTitle Initialize mobile Scroller using jQuery plugin syntax
     * @example
     * <div id="scroller"></div>
     * <script>
     * var scroller = $("#scroller").kendoMobileScroller();
     * </script>
     *
     * @exampleTitle Obtain the current mobile view scroller
     * @example
     * <div data-role="view" data-init="getScroller">
     *   Foo
     * </div>
     * <script>
     *  function getScroller(e) {
     *     var scroller = e.view.scroller;
     *  }
     * </script>
     *
     * @section
     * <p>The mobile Scroller widget exposes the following fields:</p>
     * <ul>
     * <li><strong>scrollTop</strong> - the number of pixels that are hidden from view above the scrollable area.</li>
     * <li><strong>scrollLeft</strong> - the number of pixels that are hidden from view to the left of the scrollable area.</li>
     * </ul>
     *
     */
    var Scroller = Widget.extend(/** @lends kendo.mobile.ui.Scroller.prototype */{
        /**
         * @constructs
         * @extends kendo.mobile.ui.Widget
         * @param {DomElement} element DOM element
         * @param {Object} options
         * @option {Boolean} [elastic] <true> Weather or not to allow out of bounds dragging and easing.
         * @option {Number} [pullOffset] <140> The threshold below which a releasing the scroller will trigger the pull event.
         * Has effect only when the pullToRefresh option is set to true.
         * @option {String} [pullTemplate] <Pull to refresh> The message template displayed when the user pulls the scroller.
         * Has effect only when the pullToRefresh option is set to true.
         * @option {Boolean} [pullToRefresh] <false> If set to true, the scroller will display a hint when the user pulls the container beyond its top limit.
         * If a pull beyond the specified pullOffset occurs, a pull event will be triggered.
         * @option {String} [releaseTemplate] <Release to refresh> The message template displayed when the user pulls the scroller below the
         * pullOffset, indicating that pullToRefresh will occur.
         * Has effect only when the pullToRefresh option is set to true.
         * @option {String} [refreshTemplate] <Refreshing> The message template displayed during the refresh.
         * Has effect only when the pullToRefresh option is set to true.
         */
        init: function(element, options) {
            var that = this;
            Widget.fn.init.call(that, element, options);

            element = that.element;

            element
                .css("overflow", "hidden")
                .addClass("km-scroll-wrapper")
                .wrapInner('<div class="km-scroll-container"/>')
                .prepend('<div class="fixed-header">Foo</div>');

            var inner = element.children().eq(1),

                tap = new kendo.Tap(element),

                movable = new Movable(inner),

                dimensions = new PaneDimensions({
                    element: inner,
                    container: element,
                    change: function() {
                        that.trigger(RESIZE);
                    }
                }),

                drag = new kendo.Drag(element, {
                    allowSelection: true,
                    start: function(e) {
                        dimensions.refresh();

                        if (dimensions.present()) {
                            drag.capture();
                        } else {
                            drag.cancel();
                        }
                    }
                }),

                pane = new Pane({
                    movable: movable,
                    dimensions: dimensions,
                    drag: drag,
                    elastic: that.options.elastic
                });

            movable.bind(CHANGE, function() {
                that.scrollTop = - movable.y;
                that.scrollLeft = - movable.x;

                that.trigger(SCROLL, {
                    scrollTop: that.scrollTop,
                    scrollLeft: that.scrollLeft
                });
            });

            extend(that, {
                movable: movable,
                dimensions: dimensions,
                drag: drag,
                pane: pane,
                tap: tap,
                pulled: false,
                scrollElement: inner,
                fixedContainer: element.children().first()
            });

            that._initAxis("x");
            that._initAxis("y");

            dimensions.refresh();

            if (that.options.pullToRefresh) {
                that._initPullToRefresh();
            }

            kendo.onResize($.proxy(that.reset, that));
        },

        /**
         * Returns the height in pixels of the scroller content.
         */
        scrollHeight: function() {
            return this.scrollElement[0].scrollHeight;
        },

        /**
         * Returns the width in pixels of the scroller content.
         */
        scrollWidth: function() {
            return this.scrollElement[0].scrollWidth;
        },

        options: {
            name: "Scroller",
            pullOffset: 140,
            elastic: true,
            pullTemplate: "Pull to refresh",
            releaseTemplate: "Release to refresh",
            refreshTemplate: "Refreshing"
        },

        events: [
            /**
             * Fires when the pull option is set to true, and the user pulls the scrolling container beyond the specified pullThreshold.
             * @name kendo.mobile.ui.Scroller#pull
             * @event
             * @param {Event} e
             */
            PULL,
            /**
             * Fires when the user scrolls through the content.
             * @name kendo.mobile.ui.Scroller#scroll
             * @event
             * @param {Event} e
             * @param {Number} e.scrollTop The number of pixels that are hidden from view above the scrollable area.
             * @param {Number} e.scrollLeft The number of pixels that are hidden from view to the left of the scrollable area.
             * @exampleTitle Bind to scroller scroll event in view init
             * @example
             * <div data-role="view" data-init="attachToScroller"> ... </div>
             *  <script>
             *     function attachToScroller(e) {
             *       var scroller = e.view.scroller;
             *       scroller.bind("scroll", function(e) {
             *          console.log(e.scrollTop);
             *          console.log(e.scrollLeft);
             *       });
             *     }
             *  </script>
             */
            SCROLL,
            /**
             * Fires when the scroller dimensions change (e.g. orientation change or resize)
             * @name kendo.mobile.ui.Scroller#resize
             * @event
             * @param {Event} e
             */
            RESIZE
        ],

        setOptions: function(options) {
            var that = this;
            Widget.fn.setOptions.call(that, options);
            if (options.pullToRefresh) {
                that._initPullToRefresh();
            }
        },

        /**
         * Scrolls the container to the top.
         */
        reset: function() {
            this.movable.moveTo({x: 0, y: 0});
        },

        /**
         * Scrolls the container to the specified location
         * @param {Number} x The horizontal offset in pixels to scroll to.
         * @param {Number} y The vertical offset in pixels to scroll to.
         */
        scrollTo: function(x, y) {
            this.movable.moveTo({x: x, y: y});
        },

        /**
         * Indicate that the pull event is handled (i.e. data from the server has been retrieved).
         * @exampleTitle Custom pull to refresh view scroll handling
         * @example
         *  <div data-role="view" data-init="initPullToRefreshScroller">
         *      <h2 id="pull-to-refresh-clock"></h2>
         *  </div>
         * <script>
         *
         *  function updateClock() {
         *      pullTime = kendo.toString(new Date(), "hh:mm:ss tt" );
         *      $("#pull-to-refresh-clock").html("Last update at " + pullTime + ". <br /> Pull to refresh.");
         *  }
         *
         *  function initPullToRefreshScroller(e) {
         *      var scroller = e.view.scroller;
         *
         *      scroller.setOptions({
         *          pullToRefresh: true,
         *          pull: function() {
         *              updateClock();
         *              setTimeout(function() { scroller.pullHandled(); }, 400);
         *          }
         *      })
         *  }
         * </script>
         */
        pullHandled: function() {
            var that = this;
            that.refreshHint.removeClass(REFRESHCLASS);
            that.hintContainer.html(that.pullTemplate({}));
            that.yinertia.onEnd();
            that.xinertia.onEnd();
        },

        _initPullToRefresh: function() {
            var that = this;

            that.pullTemplate = kendo.template(that.options.pullTemplate);
            that.releaseTemplate = kendo.template(that.options.releaseTemplate);
            that.refreshTemplate = kendo.template(that.options.refreshTemplate);

            that.scrollElement.prepend('<span class="km-scroller-pull"><span class="km-icon"></span><span class="km-template">' + that.pullTemplate({}) + '</span></span>');
            that.refreshHint = that.scrollElement.children().first();
            that.hintContainer = that.refreshHint.children(".km-template");

            that.pane.y.bind("change", proxy(that._paneChange, that));
            that.drag.bind("end", proxy(that._dragEnd, that));
        },

        _dragEnd: function() {
            var that = this;

            if(!that.pulled) {
                return;
            }

            that.pulled = false;
            that.refreshHint.removeClass(RELEASECLASS).addClass(REFRESHCLASS);
            that.hintContainer.html(that.refreshTemplate({}));
            that.trigger("pull");
            that.yinertia.freeze(that.options.pullOffset / 2);
        },

        _paneChange: function() {
            var that = this;

            if (that.movable.y / OUT_OF_BOUNDS_FRICTION > that.options.pullOffset) {
                if (!that.pulled) {
                    that.pulled = true;
                    that.refreshHint.removeClass(REFRESHCLASS).addClass(RELEASECLASS);
                    that.hintContainer.html(that.releaseTemplate({}));
                }
            } else if (that.pulled) {
                that.pulled = false;
                that.refreshHint.removeClass(RELEASECLASS);
                that.hintContainer.html(that.pullTemplate({}));
            }
        },

        _initAxis: function(axis) {
            var that = this,
            movable = that.movable,
            dimension = that.dimensions[axis],
            tap = that.tap,

            scrollBar = new ScrollBar({
                axis: axis,
                movable: movable,
                dimension: dimension,
                container: that.element
            }),

            inertia = new DragInertia({
                axis: axis,
                movable: movable,
                tap: tap,
                drag: that.drag,
                dimension: dimension,
                elastic: that.options.elastic,
                end: function() { scrollBar.hide(); }
            });

            that[axis + "inertia"] = inertia;

            that.pane[axis].bind(CHANGE, function() {
                scrollBar.show();
            });
        }
    });

    ui.plugin(Scroller);
})(jQuery);
