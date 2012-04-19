(function($, undefined) {
    var kendo = window.kendo,
        mobile = kendo.mobile,
        ui = mobile.ui,
        history = kendo.history,
        attr = kendo.attr,
        Class = kendo.Class,
        Widget = ui.Widget,
        INIT = "init",
        SHOW = "show",
        HIDE = "hide",
        Z_INDEX = "z-index",
        roleSelector = kendo.roleSelector;

    /**
     * @name kendo.mobile.ui.View.Description
     *
     * @section <p>The Kendo mobile View widget represents a screen in the kendo mobile Application. The
     * Application automatically instantiates a mobile View for each element with a <code>role</code> data attribute set
     * to <b>view</b>.</p>
     *
     * @exampleTitle Hello World mobile View
     * @example
     * <div data-role="view">Hello world!</div>
     *
     * @section
     * <h3>Headers and Footers</h3>
     * <p>By default, the mobile <strong>View</strong> contents stretch to fit the application element.
     * The mobile <strong>View</strong> can also have a header and a footer.
     * In order to mark header and footer elements, add elements with attribute <code>data-role="header"</code> and
     * <code>data-role="footer"</code>. </p>
     *
     * @exampleTitle Mobile View with Header and Footer
     * @example
     * <div data-role="view">
     *   <div data-role="header">Header</div>
     *   Hello world!
     *   <div data-role="footer">Footer</div>
     * </div>
     *
     * @section
     * <strong>Important:</strong>
     * <p>Because of the OS UI design conventions, the header and the footer switch positions when an Android device is detected.
     * Usually the footer hosts a MobileTabstrip widget, which is located at the bottom of the screen on iOS,
     * and at the top of the screen in Android applications.  </p>
     *
     * @section
     *
     * <h3>View Parameters</h3>
     *
     * <p>Navigational widgets can pass additional URL parameters when navigating to <strong>Views</strong>. The parameters will be available in the <code>show</code> <strong>View</strong> event.</p>
     *
     * @exampleTitle Button with additional URL parameters
     * @example
     * <a data-role="button" href="#foo?bar=baz">Link to FOO <strong>View</strong> with bar parameter set to baz</a>
     * <div data-role="view" id="foo" data-show="fooShow">
     * </div>
     *
     * <script>
     * function fooShow(e) {
     *      e.view.params // {bar: "baz"}
     * }
     * </script>
     *
     * @section
     * <h3>View DOM elements</h3>
     * <p>Each mobile View instance exposes the following fields:</p>
     * <ul>
     *  <li><b>header</b> - the view (or the applied mobile layout) header DOM element;</li>
     *  <li><b>footer</b> - the view (or the applied mobile layout) footer DOM element;</li>
     *  <li><b>content</b> - the view content DOM element;</li>
     *  <li><b>scrollerContent</b> - the view mobile scroller container DOM element. Recommended if the mobile View
     *  contents need to be manipulated or <b>replaced</b>.</li>
     * </ul>
     */
    var View = Widget.extend(/** @lends kendo.mobile.ui.View.prototype */{
        /**
         * @constructs
         * @extends kendo.mobile.ui.Widget
         * @param {DomElement} element DOM element.
         * @param {Object} options Configuration options.
         * @option {String} [title] <> The text to display in the navbar title (if present) and the browser title.
         * @option {String | ObservableObject} [model] <null> The MVVM model to bind to. If a string is passed, The view
         * will try to resolve a reference to the view model variable in the global scope.
         * _exampleTitle Bind a Mobile View
         * _example
         * <script>
         *  var foo = { bar: "baz" }
         * </script>
         *
         * <div data-role="view" data-model="foo">
         *    <span data-bind="text:bar"></span>
         * </div>
         */
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            element = that.element;

            $.extend(that, options);

            that._layout();
            that._model();
            that._scroller();
            that._init();
        },

        events: [
            /**
             * Fires after a mobile View and its child widgets is initialized.
             * @name kendo.mobile.ui.View#init
             * @event
             * @param {Event} e
             * @param {jQueryObject} e.view The mobile view instance
             */
            INIT,
            /**
             * Fires when a mobile View becomes visible.
             * @name kendo.mobile.ui.View#show
             * @event
             * @param {Event} e
             * @param {jQueryObject} e.view The mobile view instance
             */
            SHOW,
            /**
             * Fires when a mobile View becomes hidden.
             * @name kendo.mobile.ui.View#hide
             * @event
             * @param {Event} e
             * @param {jQueryObject} e.view The mobile view instance
             */
            HIDE
        ],

        options: {
            name: "View",
            title: "",
            model: null
        },

        showStart: function () {
            var that = this;
            that.element.css("display", "");
            that.params = history.url().params;

            if (that.layout) {
                that.layout.attach(that);
            }

            that._eachWidget(function(widget) {
                widget.viewShow(that);
            });

            that.trigger(SHOW, {view: that});
        },

        hideStart: function() {
            var that = this;
            if (that.layout) {
                that.layout.detach(that);
            }
        },

        hideComplete: function() {
            var that = this;
            that.element.hide();
            that.trigger(HIDE, {view: that});
        },

        switchWith: function(view, transition, callback) {
            this.showStart();

            if (view) {
                view.hideStart();
                new ViewTransition({
                    current: view,
                    next: this,
                    transition: transition,
                    defaultTransition: view.defaultTransition,
                    complete: callback
                });
            } else {
                callback();
            }
        },

        parallaxContents: function(other) {
            var that = this,
                contents = that.content;

            if (!other.header[0]) {
                contents = contents.add(that.header);
            }

            if (!other.footer[0]) {
                contents = contents.add(that.footer);
            }

            return contents;
        },

        _init: function() {
            var that = this;

            that.trigger(INIT, {view: that});

            that._eachWidget(function(widget) {
                widget.viewInit(that);
            });
        },

        _scroller: function() {
            var that = this;

            that.content.kendoMobileScroller();

            that.scroller = that.content.data("kendoMobileScroller");
            that.scrollerContent = that.scroller.scrollElement;
        },

        _model: function() {
            var that = this,
                element = that.element,
                model = that.options.model;

            if (typeof model === "string") {
                model = kendo.getter(model)(window);
            }

            that.model = model;

            if (model) {
                kendo.bind(element.children(), model, ui);
            } else {
                kendo.mobile.init(element.children());
            }
        },

        _layout: function() {
            var that = this,
                contentSelector = roleSelector("content"),
                element = that.element;

            element.data("kendoView", that).addClass("km-view");
            that.transition = element.data(kendo.ns + "transition");

            that.header = element.find(roleSelector("header")).addClass("km-header");
            that.footer = element.find(roleSelector("footer")).addClass("km-footer");

            if (!element.has(contentSelector)[0]) {
              element.wrapInner("<div " + attr("role") + '="content"></div>');
            }

            that.content = element.find(roleSelector("content"))
                                .addClass("km-content");

            that.element.prepend(that.header).append(that.footer);

            that.id = element.data(kendo.ns + "url") || "#" + element.attr("id");

            if (that.layout) {
                that.layout.setup(that);
            }
        },

        _eachWidget: function(callback) {
            var widget;
            this.element.find("[data-" + kendo.ns + "role]").each(function(){
                widget = kendo.widgetInstance($(this), ui);
                if (widget) {
                    callback(widget);
                }
            });
        }
    });

    function fade(source, destination) {
        if (source[0] && destination[0] && source[0] != destination[0]) {
            source.kendoAnimateTo(destination, {effects: "fade"});
        }
    }

    var ViewTransition = Class.extend({
        init: function (options) {
            $.extend(this, options);

            var that = this,
                current = that.current,
                next = that.next,
                currentContent = current.element,
                nextContent = next.element,
                upper = next,
                lower = current,
                transition = that._transition();

            if (transition.reverse && !transition.parallax) {
                upper = current;
                lower = next;
            }

            upper.element.css(Z_INDEX, 1);
            lower.element.css(Z_INDEX, 0);

            if (transition.parallax) {
                fade(current.footer, next.footer);
                fade(current.header, next.header);
                currentContent = current.parallaxContents(next);
                nextContent = next.parallaxContents(current);
            }

            currentContent.kendoAnimateTo(nextContent, transition);

            if (!that.back()) {
                current.nextView = next;
                current.backTransition = transition.transition;
            }
        },

        _transition: function() {
            var that = this,
                current = that.current,
                next = that.next,
                back = that.back(),
                complete = function() {
                    current.hideComplete();
                    that.complete();
                },
                viewTransition = back ? next.backTransition : next.transition,
                transition = that.transition || viewTransition || that.defaultTransition,
                animationData = transition.split(' '),
                animationType = animationData[0],
                parallax = animationType === "slide",
                reverse = animationData[1] === "reverse";

            if (that.back() && !that.transition) {
                reverse = !reverse;
            }

            return {
                effects: animationType,
                reverse: reverse,
                parallax: parallax,
                complete: complete,
                transition: transition
            };
        },

        back: function() {
            var next = this.next,
                current = this.current;

            return next.nextView === current && JSON.stringify(next.params) === JSON.stringify(history.url().params);
        }
    });

    /**
     * @name kendo.mobile.ui.Layout.Description
     *
     * @section
     *
     * <p>A mobile <strong>Layout</strong> is used to share headers and footers between multiple <strong>Views</strong>.
     * The header and/or footer element of the <strong>Layout</strong> are applied to any <strong>View</strong> that uses it.</p>
     *
     * <p>To define a <strong>Layout</strong> set <code>data-role="layout"</code> to an element.
     * To associate a <strong>View</strong> to a <strong>Layout</strong> set <code>data-layout</code> attribute. Once
     * instantiated, the layout detaches its element from the DOM. When a view with the given layout is displayed,
     * the layout attaches its header and footer to it.</p>
     *
     * <p>A <strong>View</strong> is associated with a <strong>Layout</strong> by setting its <code>data-layout</code> attribute value
     * to the value of the layout's <code>data-id</code> attribute:</p>
     *
     * @exampleTitle Views with Layout
     * @example
     * <div data-role="view" data-layout="foo">Foo</div>
     * <div data-role="view" data-layout="foo">Bar</div>
     *
     * <div data-role="layout" data-id="foo">
     *   <div data-role="header">Header</div>
     *   <div data-role="footer">Footer</div>
     * </div>
     *
     * @section
     * <p>A default <strong>Application</strong> layout can be set by passing the layout id in the <code>options</code> parameter of the <strong>Application</strong>'s constructor.
     * A mobile <strong>View</strong> can remove the default application <strong>Layout</strong> by setting <code>data-layout=""</code>.</p>
     *
     * @exampleTitle Default Application Layout
     * @example
     * <div data-role="view">Bar</div>
     *
     * <div data-role="layout" data-id="foo">
     *   <div data-role="header">Header</div>
     * </div>
     *
     * <script>
     *    new kendo.mobile.Application($(document.body), { layout: "foo" });
     * </script>
     *
     * @section
     * <p>Layouts can be platform specific, allowing for different layout and behavior per platform.
     * A layout platform can be specified using <code>data-platform=""</code></p>
     *
     * @exampleTitle iOS and Android Application Layout
     * @example
     * <div data-role="view">Bar</div>
     *
     * <div data-role="layout" data-id="foo" data-platform="ios">
     *   <div data-role="header">Header</div>
     * </div>
     *
     * <div data-role="layout" data-id="foo" data-platform="android">
     *   <div data-role="header">Header</div>
     * </div>
     *
     * @section
     * <h3>Layout DOM elements</h3>
     * <p>Each mobile Layout instance exposes the following fields:</p>
     * <ul>
     *  <li><b>header</b> - the header DOM element;</li>
     *  <li><b>footer</b> - the footer DOM element;</li>
     * </ul>
     */
    var Layout = Widget.extend(/** @lends kendo.mobile.ui.Layout.prototype */{
        /**
         * @constructs
         * @extends kendo.mobile.ui.Widget
         * @param {DomElement} element DOM element.
         * @param {Object} options Configuration options.
         * @option {String} [id] <null> The id of the layout. Required.
         * @option {String} [platform] <> The specific platform this layout targets. By default, layouts are displayed
         * on all platforms.
         */
        init: function(element, options) {
            var that = this;
            Widget.fn.init.call(that, element, options);

            element = that.element;

            that.element = element.detach();
            that.header = element.find(roleSelector("header")).addClass("km-header");
            that.footer = element.find(roleSelector("footer")).addClass("km-footer");
            that.elements = that.header.add(that.footer);
            kendo.mobile.init(that.element.children());
            that.trigger(INIT, {layout: that});
        },

        options: {
            name: "Layout"
        },

        events: [
            /**
             * Fires after a mobile Layout and its child widgets is initialized.
             * @name kendo.mobile.ui.Layout#init
             * @event
             * @param {Event} e
             * @param {jQueryObject} e.layout The mobile layout instance
             */
            INIT,
            /**
             * Fires when a mobile View using the layout becomes visible.
             * @name kendo.mobile.ui.Layout#show
             * @event
             * @param {Event} e
             * @param {jQueryObject} e.layout The mobile layout instance
             */
            SHOW,
            /**
             * Fires when a mobile View using the layout becomes hidden.
             * @name kendo.mobile.ui.Layout#hide
             * @event
             * @param {Event} e
             * @param {jQueryObject} e.layout The mobile layout instance
             */
            HIDE
        ],

        setup: function (view) {
            if (!view.header[0]) { view.header = this.header; }
            if (!view.footer[0]) { view.footer = this.footer; }
        },

        detach: function (view) {
            var that = this;
            if (view.header === that.header) {
                view.element.prepend(that.header.detach().clone(true));
            }

            if (view.footer === that.footer) {
                view.element.append(that.footer.detach().clone(true));
            }

            that.trigger(HIDE, {layout: that, view: view});
        },

        attach: function(view) {
            var that = this;
            if (view.header === that.header) {
                that.header.detach();
                view.element.find(roleSelector("header")).remove();
                view.element.prepend(that.header);
            }

            if (view.footer === that.footer) {
                that.footer.detach();
                view.element.find(roleSelector("footer")).remove();
                view.element.append(that.footer);
            }

            that.trigger(SHOW, {layout: that, view: view});
        }
    });

    ui.plugin(View);
    ui.plugin(Layout);
})(jQuery);
