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
        init: function(content, options) {
            var that = this;
            options = options || {};

            Observable.fn.init.call(that);
            that.content = content;
            that.tagName = options.tagName || "div";
            that.model = options.model;

            that.bind([ INIT, SHOW, HIDE ], options);
        },

        render: function(container) {
            var that = this,
                element,
                content;

            if (!that.element) {
                element = $("<" + that.tagName + " />");
                content = $(document.getElementById(that.content) || that.content); // support passing id without #
                element.append(content[0].tagName === SCRIPT ? content.html() : content);
                that.element = element;
                kendo.bind(that.element, that.model);
                this.trigger(INIT);
            }

            if (container) {
                this.trigger(SHOW);
                $(container).append(that.element);
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
