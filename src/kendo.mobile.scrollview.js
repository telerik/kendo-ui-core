(function($, undefined) {
    var kendo = window.kendo,
        mobile = kendo.mobile,
        ui = mobile.ui,
        proxy = $.proxy,
        Transition = kendo.fx.Transition,
        Pane = kendo.ui.Pane,
        PaneDimensions = kendo.ui.PaneDimensions,
        Widget = ui.Widget,

        // Math
        math = Math,
        abs  = math.abs,
        ceil = math.ceil,
        round = math.round,
        max = math.max,
        min = math.min,
        floor = math.floor,
        CHANGE = "change",
        CURRENT_PAGE_CLASS = "km-current-page";

    /**
    * @name kendo.mobile.ui.ScrollView.Description
    * @section
    * <p>The Kendo Mobile ScrollView widget is used to scroll content wider than the device screen.</p>
    *
    * <h3>Getting Started</h3>
    * <p>The Kendo Mobile Application automatically initializes the Mobile ScrollView for every element with <code>role</code> data attribute set to <code>scrollview</code> present in the views' markup.
    * Alternatively, it can be initialized using jQuery plugin syntax in the containing mobile View <strong>init event handler</strong>.
    *
    * @exampleTitle Initialize mobile ScrollView using a role data attribute.
    * @example
    * <div data-role="scrollview">
    *   Foo
    * </div>
    *
    * @exampleTitle Initialize mobile ScrollView using jQuery plugin syntax.
    * @example
    * <div data-role="view" data-init="initScrollView">
    *   <div id="scrollView">
    *     <div data-role="page">Foo</div>
    *     <div data-role="page">Bar</div>
    *   </div>
    * </div>
    * <script>
    * function initScrollView(e) {
    *   e.view.element.find("#scrollView").kendoMobileScrollView();
    * }
    * </script>
    *
    * @section
    * <h3>Pages</h3>
    * Content pages may be defined in order to display exactly one item per page. Pages are automatically resized
    * when the device is rotated. To define a page, wrap the content in a div with <code>data-role="page"</code> attribute set.
    *
    * @exampleTitle ScrollView with pages
    * @example
    * <div data-role="scrollView">
    *    <div data-role="page">Foo</div>
    *    <div data-role="page">Bar</div>
    * </div>
    */
    var ScrollView = Widget.extend(/** @lends kendo.mobile.ui.ScrollView.prototype */{
        /**
        * @constructs
        * @extends kendo.mobile.ui.Widget
        * @param {DomElement} element DOM element
        * @param {Object} options
        * @option {Number} [page] <0> The initial page to display.
        * @option {Number} [duration] <300> The milliseconds that take the ScrollView to snap to the current page after released.
        * @option {Number} [velocityThreshold] <0.8> The velocity threshold after which a swipe will navigate to the next page (as opposed to snapping back to the current page).
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

            var movable,
                transition,
                drag,
                dimensions,
                dimension,
                pane;

            movable = new kendo.ui.Movable(that.inner);

            transition = new Transition({
                axis: "x",
                movable: movable,
                onEnd: proxy(that._transitionEnd, that)
            });

            drag = new kendo.Drag(element, {
                start: function() {
                    if (abs(drag.x.velocity) * 2 >= abs(drag.y.velocity)) {
                        drag.capture();
                    } else {
                        drag.cancel();
                    }

                    transition.cancel();
                },
                end: proxy(that._dragEnd, that)
            });

            dimensions = new PaneDimensions({
                element: that.inner,
                container: that.element
            });

            dimension = dimensions.x;
            dimension.bind("change", proxy(that.refresh, that));

            pane = new Pane({
                dimensions: dimensions,
                drag: drag,
                movable: movable,
                elastic: true
            });

            $.extend(that, {
                movable: movable,
                transition: transition,
                drag: drag,
                dimensions: dimensions,
                dimension: dimension,
                pane: pane
            });

            that.page = that.options.page;
        },

        options: {
            name: "ScrollView",
            page: 0,
            duration: 300,
            velocityThreshold: 0.8,
            bounceVelocityThreshold: 1.6
        },

        events: [
            /**
             * Fires when the widget page is changed.
             * @name kendo.mobile.ui.ScrollView#change
             * @event
             * @param {Event} e
             * @param {jQueryObject} e.page The current page (zero based index)
             */
            CHANGE
        ],

        viewShow: function(view) {
            this.dimensions.refresh();
        },

        /**
         * Redraw the mobile ScrollView pager. Called automatically on device orientation change event.
         *
         * @example
         * <div data-role="scrollview" id="scrollview"></div>
         *
         * <script>
         *    $("#scrollview").data("kendoMobileScrollView").refresh();
         * </script>
         */
        refresh: function() {
            var that = this,
                pageHTML = "",
                dimension = that.dimension,
                width = dimension.getSize(),
                pages;

            that.element.find("[data-role=page]").width(width);
            dimension.update(true);

            that.scrollTo(that.page);

            pages = that.pages = ceil(dimension.getTotal() / width);

            that.minSnap = - (pages - 1) * width;
            that.maxSnap = 0;

            for (var idx = 0; idx < pages; idx ++) {
                pageHTML += "<li/>";
            }

            that.pager.html(pageHTML);
            that._updatePager();
        },

        /**
         * Update the scrollview HTML content
         * @param {String | jQueryObject} content the new scrollView content.
         *
         * @example
         * <div data-role="scrollview" id="scrollview"></div>
         *
         * <script>
         *    $("#scrollview").data("kendoMobileScrollView").content("<span>Foo</span>");
         * </script>
         */
        content: function(html) {
           this.element.children().first().html(html);
           this.dimensions.refresh();
        },

        /**
         * Scroll to the given page. Pages are zero-based indexed.
         * @param {Number} page The page to scroll to.
         * @example
         * <div data-role="scrollview" id="scrollview"></div>
         *
         * <script>
         *    // Scroll to the second page of the scrollView
         *    $("#scrollview").data("kendoMobileScrollView").scrollTo(1);
         * </script>
         */
        scrollTo: function(page) {
            this.page = page;
            this._moveTo(- page * this.dimension.getSize(), Transition.easeOutExpo);
        },

        _moveTo: function(location, ease) {
            this.transition.moveTo({ location: location, duration: this.options.duration, ease: ease });
        },

        _dragEnd: function(e) {
            var that = this,
                velocity = e.x.velocity,
                width = that.dimension.size,
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

            snap = max(that.minSnap, min(approx(that.movable.x / width) * width, that.maxSnap));

            this._moveTo(snap, ease);
        },

        _transitionEnd:  function() {
            var that = this,
                page = Math.round(- that.movable.x / that.dimension.size);

            if (page != that.page) {
                that.page = page;
                that.trigger(CHANGE, {page: page});
                that._updatePager();
            }
        },

        _updatePager: function() {
            this.pager.children().removeClass(CURRENT_PAGE_CLASS).eq(this.page).addClass(CURRENT_PAGE_CLASS);
        }
    });

    ui.plugin(ScrollView);
})(jQuery);
