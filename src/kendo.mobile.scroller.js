(function($, undefined) {
    var mobile = kendo.mobile,
        ui = mobile.ui,
        proxy = $.proxy,
        extend = $.extend,
        Widget = ui.Widget,
        Class = kendo.Class,
        Move = mobile.Move,
        Transition = mobile.Transition,
        Animation = mobile.Animation,
        SNAPBACK_DURATION = 500,
        SCROLLBAR_OPACITY = 0.7,
        FRICTION = 0.93,
        OUT_OF_BOUNDS_FRICTION = 0.5,
        RELEASECLASS = "km-scroller-release",
        REFRESHCLASS = "km-scroller-refresh",
        CHANGE = "change";

    var DragInertia = Animation.extend({
        init: function(options) {
            var that = this;

            Animation.fn.init.call(that);

            extend(that, options, {
                transition: new Transition({
                    axis: options.axis,
                    move: options.move,
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

            if (!that.boundary.present()) { return; }

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
                friction = that._outOfBounds() ? OUT_OF_BOUNDS_FRICTION : FRICTION;

            that.move.translateAxis(that.axis, that.velocity *= friction);
        },

        _end: function() {
            this.tap.cancelCapture();
            this.end();
        },

        _outOfBounds: function() {
            return this.boundary.outOfBounds(this.move[this.axis]);
        },

        _snapBack: function() {
            var that = this,
                boundary = that.boundary,
                snapBack = that.move[that.axis] > boundary.max ? boundary.max : boundary.min;
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
                move: new Move(element),
                scrollMove: options.move,
                size: horizontal ? "width" : "height"
            });

            that.scrollMove.bind(CHANGE, proxy(that._move, that));
            that.container.append(element);
        },

        _move: function() {
            var that = this,
                axis = that.axis,
                boundary = that.boundary,
                boundarySize = boundary.size,
                scrollMove = that.scrollMove,
                sizeRatio = boundarySize / boundary.total,
                position = Math.round(-scrollMove[axis] * sizeRatio),
                size = Math.round(boundarySize * sizeRatio);

                if (position + size > boundarySize) {
                    size = boundarySize - position;
                } else if (position < 0) {
                    size += position;
                    position = 0;
                }

            if (that.elementSize != size) {
                that.element.css(that.size, size + "px");
                that.elementSize = size;
            }

            that.move.moveAxis(axis, position);
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
                .wrapInner('<div class="km-scroll-container"/>');

            var inner = element.children().first(),

                tap = new kendo.Tap(element),

                move = new Move(inner),

                boundary = new mobile.ContainerBoundary({
                    element: inner,
                    container: element
                }),

                drag = new kendo.Drag(element, {
                    start: function(e) {
                        boundary.refresh();
                        drag.capture();
                    }
                }),

                draggable = new mobile.Draggable({
                    move: move,
                    boundary: boundary,
                    drag: drag,
                    elastic: true
                });

            extend(that, {
                move: move,
                boundary: boundary,
                drag: drag,
                draggable: draggable,
                tap: tap,
                pulled: false,
                scrollElement: inner
            });

            that._initAxis("x");
            that._initAxis("y");

            boundary.refresh();
        },

        options: {
            name: "Scroller",
            pullOffset: 140,
            pullTemplate: "Pull to refresh",
            releaseTemplate: "Release to refresh",
            refreshTemplate: "Refreshing"
        },

        reset: function() {
            this.move.moveTo({x: 0, y: 0});
        },

        handlePull: function(options) {
            var that = this;

            that.pullTemplate = kendo.template(options.pullTemplate || that.options.pullTemplate);
            that.releaseTemplate = kendo.template(options.releaseTemplate || that.options.releaseTemplate);
            that.refreshTemplate = kendo.template(options.refreshTemplate || that.options.refreshTemplate);

            that.pullOffset = options.pullOffset || that.options.pullOffset;
            that.pullCallback = options.pull;

            that.scrollElement.prepend('<span class="km-scroller-pull"><span class="km-icon"></span><span class="km-template">' + that.pullTemplate({}) + '</span></span>');
            that.refreshHint = that.scrollElement.children().first();
            that.hintContainer = that.refreshHint.children(".km-template");

            that.draggable.y.bind("change", proxy(that._draggableChange, that));
            that.drag.bind("end", proxy(that._dragEnd, that));
        },

        /**
         * Indicate that the pull event is handled (i.e. Data from the server has been retrieved).
         */
        pullHandled: function() {
            var that = this;
            that.refreshHint.removeClass(REFRESHCLASS);
            that.hintContainer.html(that.pullTemplate({}));
            that.yinertia.onEnd();
            that.xinertia.onEnd();
        },

        _dragEnd: function() {
            var that = this;

            if(!that.pulled) {
                return;
            }

            that.pulled = false;
            that.refreshHint.removeClass(RELEASECLASS).addClass(REFRESHCLASS);
            that.hintContainer.html(that.refreshTemplate({}));
            that.pullCallback();
            that.yinertia.freeze(that.pullOffset / 2);
        },

        _draggableChange: function() {
            var that = this;

            if (that.move.y / OUT_OF_BOUNDS_FRICTION > that.pullOffset) {
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
            move = that.move,
            boundary = that.boundary[axis],
            draggable = that.draggable[axis],
            tap = that.tap,

            scrollBar = new ScrollBar({
                axis: axis,
                move: move,
                boundary: boundary,
                container: that.element
            }),

            inertia = new DragInertia({
                axis: axis,
                move: move,
                tap: tap,
                drag: that.drag,
                boundary: boundary,
                end: function() { scrollBar.hide(); }
            });

            that[axis + "inertia"] = inertia;

            draggable.bind(CHANGE, function() {
                scrollBar.show();
            });
        }
    });

    ui.plugin(Scroller);
})(jQuery);
