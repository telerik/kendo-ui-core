kendo_module({
    id: "mobile.scroller",
    name: "Scroller",
    category: "mobile",
    description: "The Kendo Mobile Scroller widget enables touch friendly kinetic scrolling for the contents of a given DOM element.",
    depends: [ "core", "fx", "draganddrop" ]
});

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
        abs = Math.abs,
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

    var ZoomSnapBack = Animation.extend({
        init: function(options) {
            var that = this;
            Animation.fn.init.call(that);
            extend(that, options);

            that.userEvents.bind("gestureend", proxy(that.start, that));
            that.tapCapture.bind("press", proxy(that.cancel, that));
        },

        done: function() {
            return this.dimensions.minScale - this.movable.scale < 0.01;
        },

        tick: function() {
            var movable = this.movable;
            movable.scaleWith(1.1);
            this.dimensions.rescale(movable.scale);
        },

        onEnd: function() {
            var movable = this.movable;
            movable.scaleTo(this.dimensions.minScale);
            this.dimensions.rescale(movable.scale);
        }
    });

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

            that.tapCapture.bind("press", function() { that.cancel(); });
            that.userEvents.bind("end", proxy(that.start, that));
            that.userEvents.bind("gestureend", proxy(that.start, that));
            that.userEvents.bind("tap", proxy(that.onEnd, that));
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
            return abs(this.velocity) < 1;
        },

        start: function(e) {
            var that = this;

            if (!that.dimension.enabled) { return; }

            if (that._outOfBounds()) {
                that._snapBack();
            } else {
                that.velocity = e.touch[that.axis].velocity * 16;
                if (that.velocity) {
                    that.tapCapture.captureNext();
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
            this.tapCapture.cancelCapture();
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

    var Scroller = Widget.extend({
        init: function(element, options) {
            var that = this;
            Widget.fn.init.call(that, element, options);

            element = that.element;

            element
                .css("overflow", "hidden")
                .addClass("km-scroll-wrapper")
                .wrapInner('<div class="km-scroll-container"/>')
                .prepend('<div class="km-scroll-header"/>');

            var inner = element.children().eq(1),

                tapCapture = new kendo.TapCapture(element),

                movable = new Movable(inner),

                dimensions = new PaneDimensions({
                    element: inner,
                    container: element,
                    forcedEnabled: that.options.zoom,
                    change: function() {
                        that.trigger(RESIZE);
                    }
                }),

                userEvents = new kendo.UserEvents(element, {
                    allowSelection: true,
                    preventDragEvent: true,
                    multiTouch: that.options.zoom,
                    start: function(e) {
                        dimensions.refresh();

                        var velocityX = abs(e.x.velocity),
                            velocityY = abs(e.y.velocity);

                        if (dimensions.x.enabled && velocityX * 2 >= velocityY ||
                            dimensions.y.enabled && velocityY * 2 >= velocityX) {
                            userEvents.capture();
                        } else {
                            userEvents.cancel();
                        }
                    }
                }),

                pane = new Pane({
                    movable: movable,
                    dimensions: dimensions,
                    userEvents: userEvents,
                    elastic: that.options.elastic
                }),

                zoomSnapBack = new ZoomSnapBack({
                    movable: movable,
                    dimensions: dimensions,
                    userEvents: userEvents,
                    tapCapture: tapCapture
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
                zoomSnapBack: zoomSnapBack,
                userEvents: userEvents,
                pane: pane,
                tapCapture: tapCapture,
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

        scrollHeight: function() {
            return this.scrollElement[0].scrollHeight;
        },

        scrollWidth: function() {
            return this.scrollElement[0].scrollWidth;
        },

        options: {
            name: "Scroller",
            zoom: false,
            pullOffset: 140,
            elastic: true,
            pullTemplate: "Pull to refresh",
            releaseTemplate: "Release to refresh",
            refreshTemplate: "Refreshing"
        },

        events: [
            PULL,
            SCROLL,
            RESIZE
        ],

        setOptions: function(options) {
            var that = this;
            Widget.fn.setOptions.call(that, options);
            if (options.pullToRefresh) {
                that._initPullToRefresh();
            }
        },

        reset: function() {
            this.movable.moveTo({x: 0, y: 0});
        },

        scrollTo: function(x, y) {
            this.movable.moveTo({x: x, y: y});
        },

        pullHandled: function() {
            var that = this;
            that.refreshHint.removeClass(REFRESHCLASS);
            that.hintContainer.html(that.pullTemplate({}));
            that.yinertia.onEnd();
            that.xinertia.onEnd();
        },

        destroy: function() {
            Widget.fn.destroy.call(this);
            this.userEvents.destroy();
        },

        _initPullToRefresh: function() {
            var that = this;

            that.dimensions.y.forceEnabled();
            that.pullTemplate = kendo.template(that.options.pullTemplate);
            that.releaseTemplate = kendo.template(that.options.releaseTemplate);
            that.refreshTemplate = kendo.template(that.options.refreshTemplate);

            that.scrollElement.prepend('<span class="km-scroller-pull"><span class="km-icon"></span><span class="km-template">' + that.pullTemplate({}) + '</span></span>');
            that.refreshHint = that.scrollElement.children().first();
            that.hintContainer = that.refreshHint.children(".km-template");

            that.pane.y.bind("change", proxy(that._paneChange, that));
            that.userEvents.bind("end", proxy(that._dragEnd, that));
        },

        _dragEnd: function() {
            var that = this;

            if(!that.pulled) {
                return;
            }

            that.pulled = false;
            that.refreshHint.removeClass(RELEASECLASS).addClass(REFRESHCLASS);
            that.hintContainer.html(that.refreshTemplate({}));
            that.yinertia.freeze(that.options.pullOffset / 2);
            that.trigger("pull");
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
            tapCapture = that.tapCapture,

            scrollBar = new ScrollBar({
                axis: axis,
                movable: movable,
                dimension: dimension,
                container: that.element
            }),

            inertia = new DragInertia({
                axis: axis,
                movable: movable,
                tapCapture: tapCapture,
                userEvents: that.userEvents,
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
})(window.kendo.jQuery);
