(function($, undefined) {
    var mobile = kendo.mobile,
        ui = mobile.ui,
        proxy = $.proxy,
        Class = kendo.Class,
        Transition = mobile.Transition,
        Widget = ui.Widget;

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
        * @option {Number} [velocityThreshold] <1> The velocity threshold after which a swipe will navigate to the next page (as opposed to snapping back to the current view).
        * The swipe velocity equal the pixels per millisecond change for a swipe.
        * @option {Number} [bounceVelocityThreshold] <2.5> The velocity threshold after which a swipe will result in a bounce effect.
        */
        init: function(element, options) {
            var that = this,
                containerBoundary;

            Widget.fn.init.call(that, element, options);

            element = that.element;

            element
                .wrapInner("<div/>")
                .addClass("km-scrollview")
                .append('<ol class="km-pages"/>');

            that.inner = element.children().first();
            that.pager = element.children().last();
            that.page = 0;

            that.move = new mobile.Move(that.inner);

            that.transition = new Transition({
                axis: "x",
                move: that.move,
                onEnd: function() {
                    that.page = -that.move.x / that.boundary.size;
                    that._updatePage();
                }
            });

            that.swipe = new mobile.Swipe(element, {
                start: function() {
                    console.log("canceling");
                    that.transition.cancel();
                },
                end: $.proxy(that._swipeEnd, that)
            });

            that.containerBoundary = new mobile.ContainerBoundary({
                element: that.inner,
                container: that.element,
                move: that.move
            });

            that.boundary = that.containerBoundary.x;
            that.boundary.bind("change", proxy(that.calculateDimensions, that));

            that.draggable = new mobile.Draggable({
                boundary: that.containerBoundary,
                swipe: that.swipe,
                elastic: true,
                move: that.move
            });

            that.containerBoundary.refresh();
        },

        options: {
            name: "ScrollView",
            duration: 300,
            velocityThreshold: 1,
            bounceVelocityThreshold: 2.5
        },

        viewShow: function(view) {
            this.calculateDimensions();
        },

        calculateDimensions: function() {
            var that = this,
                pageHTML = "",
                boundary = that.boundary,
                width = boundary.size,
                pages;

            that.page = -that.move.x / width;

            pages = that.pages = Math.ceil(boundary.total / width);

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
                approx = Math.round,
                ease = Transition.easeOutExpo;

            if (velocity > velocityThreshold) {
                approx = Math.ceil;
            } else if(velocity < -velocityThreshold) {
                approx = Math.floor;
            }

            if (Math.abs(velocity) > options.bounceVelocityThreshold) {
                ease = Transition.easeOutBack;
            }

            snap = Math.max(that.minSnap, Math.min(approx(that.move.x / width) * width, that.maxSnap));

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
