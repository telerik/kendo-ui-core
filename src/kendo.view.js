kendo_module({
    id: "view",
    name: "View",
    category: "framework",
    description: "The View class instantiates and handles the events of a certain screen from the application.",
    depends: [ "core", "binder" ],
    hidden: false
});


(function($, undefined) {
    var kendo = window.kendo,
        Observable = kendo.Observable,
        SCRIPT = "SCRIPT",
        INIT = "init",
        SHOW = "show",
        HIDE = "hide";

    var View = Observable.extend({
        init: function(content, options) {
            var that = this;
            options = options || {};

            Observable.fn.init.call(that);
            that.content = content;
            that.tagName = options.tagName || "div";
            that.model = options.model;
            that._wrap = options.wrap !== false;

            that.bind([ INIT, SHOW, HIDE ], options);
        },

        render: function(container) {
            var that = this,
                notInitialized = !that.element;

            // The order below matters - kendo.bind should be happen when the element is in the DOM, and SHOW should be triggered after INIT.

            if (notInitialized) {
                that.element = that._createElement();
            }

            if (container) {
                $(container).append(that.element);
            }

            if (notInitialized) {
                kendo.bind(that.element, that.model);
                this.trigger(INIT);
            }

            if (container) {
                that.trigger(SHOW);
            }

            return that.element;
        },

        hide: function() {
            this.element.detach();
            this.trigger(HIDE);
        },

        destroy: function() {
            if (this.element) {
                kendo.unbind(this.element);
                this.element.remove();
            }
        },

        _createElement: function() {
            var that = this,
                element,
                content;

            content = $(document.getElementById(that.content) || that.content); // support passing id without #
            element = $("<" + that.tagName + " />").append(content[0].tagName === SCRIPT ? content.html() : content);

            // drop the wrapper if asked - this seems like the easiest (although not very intuitive) way to avoid messing up templates with questionable content, like the one below
            // <script id="my-template">
            // foo
            // <span> Span </span>
            // </script>
            if (!that._wrap) {
               element = element.contents();
            }

            return element;
        }
    });

    var Layout = View.extend({
        init: function(content, options) {
            View.fn.init.call(this, content, options);
            this.regions = {};
        },

        showIn: function(container, view) {
            var previousView = this.regions[container];

            if (previousView) {
                previousView.hide();
            }

            view.render(this.render().find(container), previousView);
            this.regions[container] = view;
        }
    });

    kendo.Layout = Layout;
    kendo.View = View;
})(window.kendo.jQuery);
