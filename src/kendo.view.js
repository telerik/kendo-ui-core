kendo_module({
    id: "view",
    name: "View",
    category: "framework",
    depends: [ "core" ],
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
        init: function(options) {
            Observable.fn.init.call(this);
            this.content = options.content;
            this.tagName = options.tagName || "div";
            this.model = options.model;
            this.bind([ INIT, SHOW, HIDE ], options);
        },

        render: function(container) {
            var that = this,
                element,
                content;

            container = $(container);

            if (!that.element) {
                element = $("<" + that.tagName + " />");
                content = $(document.getElementById(that.content) || that.content); // support passing id without #
                element.append(content[0].tagName === SCRIPT ? content.html() : content);
                that.element = element;
                kendo.bind(that.element, that.model);
                this.trigger(INIT);
            }

            this.trigger(SHOW);
            container.append(element);
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
        }
    });

    var Layout = View.extend({
        init: function(options) {
            View.fn.init.call(this, options);
            this.regions = {};
        },

        showIn: function(container, view) {
            var previousView = this.regions[container];

            if (previousView) {
                previousView.hide();
            }

            view.render(this.element.find(container), previousView);
            this.regions[container] = view;
        }
    });

    kendo.Layout = Layout;
    kendo.View = View;
})(window.kendo.jQuery);
