(function($, undefined) {
    var mobile = kendo.mobile,
        ui = mobile.ui,
        proxy = $.proxy,
        Class = kendo.Class,
        Transition = mobile.Transition,
        Widget = ui.Widget,

        // Math
        math = Math,
        abs  = math.abs,
        ceil = math.ceil,
        round = math.round,
        max = math.max,
        min = math.min,
        floor = math.floor;

    var CURRENT_PAGE_CLASS = "km-current-page";

    /**
    * @name kendo.mobile.ui.ScrollView.Description
    * @section The Kendo Mobile ScrollView widget is used to scroll content wider than the device screen.
    *
    * <h3>Getting Started</h3>
    * <p>The Kendo Mobile Application automatically initializes the Mobile ScrollView for every element with <code>role</code> data attribute set to <code>scrollview</code> present in the views' markup.
    * Alternatively, it can be initialized using a jQuery selector. </p>
    * @exampleTitle Initialize mobile ScrollView using a role data attribute.
    * @example
    * <div data-role="scrollview">
    *   Foo
    * </div>
    *
    * @exampleTitle Initialize mobile ScrollView using a jQuery selector.
    * @example
    * <div id="scrollView"></div>
    * <script>
    * var listView = $("#scrollView").kendoMobileScrollView();
    * </script>
    *
    */
    var ScrollView = Widget.extend(/** @lends kendo.mobile.ui.ScrollView.prototype */{
        /**
        * @constructs
        * @extends kendo.mobile.ui.Widget
        * @param {DomElement} element DOM element
        * @param {Object} options
        * @option {Number} [duration] <300> The milliseconds that take the ScrollView to snap to the current page after released.
        * @option {Number} [velocityThreshold] <0.8> The velocity threshold after which a swipe will navigate to the next page (as opposed to snapping back to the current view).
        * The swipe velocity equal the pixels per millisecond change for a swipe.
        * @option {Number} [bounceVelocityThreshold] <1.6> The velocity threshold after which a swipe will result in a bounce effect.
        */
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            element = that.element;

            element
                .wrapInner("<div/>")
                .addClass("km-scrollview")
                .append('<ol class="km-pages"/>');

            that.inner = element.children().first();
            that.pager = element.children().last();
            that.page = 0;

            var move,
                transition,
                swipe,
                container,
                bounary,
                draggable;

            move = new mobile.Move(that.inner);

            transition = new Transition({
                axis: "x",
                move: move,
                onEnd: function() {
                    that.page = Math.round(- move.x / boundary.size);
                    that._updatePage();
                }
            });

            swipe = new mobile.Swipe(element, {
                start: function() {
                    if (abs(swipe.x.velocity)*2 >= abs(swipe.y.velocity)) {
                        swipe.capture();
                    } else {
                        swipe.cancel();
                    }

                    transition.cancel();
                },
                end: $.proxy(that._swipeEnd, that)
            });

            container = new mobile.ContainerBoundary({
                element: that.inner,
                container: that.element
            });

            boundary = container.x;
            boundary.bind("change", proxy(that.calculateDimensions, that));

            draggable = new mobile.Draggable({
                boundary: container,
                swipe: swipe,
                move: move,
                elastic: true
            });

            $.extend(that, {
                move: move,
                transition: transition,
                swipe: swipe,
                container: container,
                boundary: boundary,
                draggable: draggable
            });

            container.refresh();
        },

        options: {
            name: "ScrollView",
            duration: 300,
            velocityThreshold: 0.8,
            bounceVelocityThreshold: 1.6
        },

        viewShow: function(view) {
            this.container.refresh();
        },

        calculateDimensions: function() {
            var that = this,
                pageHTML = "",
                boundary = that.boundary,
                width = boundary.size,
                pages;

            that.page = Math.round(-that.move.x / width);

            pages = that.pages = ceil(boundary.total / width);

            that.minSnap = - (pages - 1) * width;
            that.maxSnap = 0;

            for (var idx = 0; idx < pages; idx ++) {
                pageHTML += "<li/>";
            }

            that.pager.html(pageHTML);
            that._updatePage();
        },

        _swipeEnd: function(e) {
            var that = this,
                velocity = e.x.velocity,
                width = that.boundary.size,
                options = that.options,
                velocityThreshold = options.velocityThreshold,
                snap,
                approx = round,
                ease = Transition.easeOutExpo;

            if (velocity > velocityThreshold) {
                approx = ceil;
            } else if(velocity < -velocityThreshold) {
                approx = floor;
            }

            if (abs(velocity) > options.bounceVelocityThreshold) {
                ease = Transition.easeOutBack;
            }

            snap = max(that.minSnap, min(approx(that.move.x / width) * width, that.maxSnap));

            that.transition.moveTo({ location: snap, duration: options.duration, ease: ease });
        },

        _updatePage: function() {
            var that = this,
                pager = that.pager;

            pager.children().removeClass(CURRENT_PAGE_CLASS);
            pager.find(":nth-child(" + (that.page + 1) +")").addClass(CURRENT_PAGE_CLASS);
        }
    });

    ui.plugin(ScrollView);
})(jQuery);
