(function(f, define){
    define([ "./kendo.core", "./kendo.binder", "./kendo.fx" ], f);
})(function(){

var __meta__ = {
    id: "view",
    name: "View",
    category: "framework",
    description: "The View class instantiates and handles the events of a certain screen from the application.",
    depends: [ "core", "binder", "fx" ],
    hidden: false
};

(function($, undefined) {
    var kendo = window.kendo,
        Observable = kendo.Observable,
        SCRIPT = "SCRIPT",
        INIT = "init",
        SHOW = "show",
        HIDE = "hide",

        ATTACH = "attach",
        DETACH = "detach",
        sizzleErrorRegExp = /unrecognized expression/;

    var View = Observable.extend({
        init: function(content, options) {
            var that = this;
            options = options || {};

            Observable.fn.init.call(that);
            that.content = content;
            that.id = kendo.guid();
            that.tagName = options.tagName || "div";
            that.model = options.model;
            that._wrap = options.wrap !== false;
            that._fragments = {};

            that.bind([ INIT, SHOW, HIDE ], options);
        },

        render: function(container) {
            var that = this,
                notInitialized = !that.element;

            // The order below matters - kendo.bind should happen when the element is in the DOM, and show should be triggered after init.

            if (notInitialized) {
                that.element = that._createElement();
            }

            if (container) {
                $(container).append(that.element);
            }

            if (notInitialized) {
                kendo.bind(that.element, that.model);
                that.trigger(INIT);
            }

            if (container) {
                that._eachFragment(ATTACH);
                that.trigger(SHOW);
            }

            return that.element;
        },

        clone: function(back) {
            return new ViewClone(this);
        },

        triggerBeforeShow: function() {
            return true;
        },

        showStart: function() {
            this.element.css("display", "");
        },

        showEnd: function() {
        },

        hideStart: function() {
        },

        hideEnd: function() {
            this.hide();
        },

        hide: function() {
            this._eachFragment(DETACH);
            this.element.detach();
            this.trigger(HIDE);
        },

        destroy: function() {
            var element = this.element;

            if (element) {
                kendo.unbind(element);
                kendo.destroy(element);
                element.remove();
            }
        },

        fragments: function(fragments) {
            $.extend(this._fragments, fragments);
        },

        _eachFragment: function(methodName) {
            for (var placeholder in this._fragments) {
                this._fragments[placeholder][methodName](this, placeholder);
            }
        },

        _createElement: function() {
            var that = this,
                wrap = that._wrap,
                wrapper = "<" + that.tagName + " />",
                element,
                content;

            try {
                content = $(document.getElementById(that.content) || that.content); // support passing id without #

                if (content[0].tagName === SCRIPT) {
                    content = content.html();
                }
            } catch(e) {
                if (sizzleErrorRegExp.test(e.message)) {
                    content = that.content;
                }
            }

            if (typeof content === "string") {
                element = $(wrapper).append(content);
                kendo.stripWhitespace(element[0]);
                // drop the wrapper if asked - this seems like the easiest (although not very intuitive) way to avoid messing up templates with questionable content, like the one below
                // <script id="my-template">
                // foo
                // <span> Span </span>
                // </script>
                if (!wrap) {
                   element = element.contents();
                }
            } else {
                element = content;
                if (wrap) {
                    element = element.wrapAll(wrapper).parent();
                }
            }

            return element;
        }
    });

    var ViewClone = kendo.Class.extend({
        init: function(view) {
            $.extend(this, {
                element: view.element.clone(true),
                transition: view.transition,
                id: view.id
            });

            view.element.parent().append(this.element);
        },

        hideStart: $.noop,

        hideEnd: function() {
            this.element.remove();
        }
    });

    var Layout = View.extend({
        init: function(content, options) {
            View.fn.init.call(this, content, options);
            this.containers = {};
        },

        container: function(selector) {
            var container = this.containers[selector];

            if (!container) {
                container = this._createContainer(selector);
                this.containers[selector] = container;
            }

            return container;
        },

        showIn: function(selector, view, transition) {
            this.container(selector).show(view, transition);
        },

        _createContainer: function(selector) {
            var root = this.render(),
                element = root.find(selector),
                container;

            if (!element.length && root.is(selector)) {
                if (root.is(selector)) {
                    element = root;
                } else {

                    throw new Error("can't find a container with the specified " + selector + " selector");
                }
            }

            container = new ViewContainer(element);

            container.bind("accepted", function(e) {
                e.view.render(element);
            });

            return container;
        }
    });

    var Fragment = View.extend({
        attach: function(view, placeholder) {
            view.element.find(placeholder).replaceWith(this.render());
        },

        detach: function() {
            console.log('detach', arguments);
        }
    });

    var transitionRegExp = /^(\w+)(:(\w+))?( (\w+))?$/;

    function parseTransition(transition) {
        if (!transition){
            return {};
        }

        var matches = transition.match(transitionRegExp) || [];

        return {
            type: matches[1],
            direction: matches[3],
            reverse: matches[5] === "reverse"
        };
    }

    var ViewContainer = Observable.extend({
        init: function(container) {
            Observable.fn.init.call(this);
            this.container = container;
            this.history = [];
            this.view = null;
            this.running = false;
        },

        after: function() {
            this.running = false;
            this.trigger("complete", {view: this.view});
            this.trigger("after");
        },

        end: function() {
            this.view.showEnd();
            this.previous.hideEnd();
            this.after();
        },

        show: function(view, transition, locationID) {
            if (!view.triggerBeforeShow()) {
                this.trigger("after");
                return false;
            }

            locationID = locationID || view.id;

            var that = this,
                current = (view === that.view) ? view.clone() : that.view,
                history = that.history,
                previousEntry = history[history.length - 2] || {},
                back = previousEntry.id === locationID,
                // If explicit transition is set, it will be with highest priority
                // Next we will try using the history record transition or the view transition configuration
                theTransition = transition || ( back ? history[history.length - 1].transition : view.transition ),
                transitionData = parseTransition(theTransition);

            if (that.running) {
                that.effect.stop();
            }

            if (theTransition === "none") {
                theTransition = null;
            }

            that.trigger("accepted", { view: view });
            that.view = view;
            that.previous = current;
            that.running = true;

            if (!back) {
                history.push({ id: locationID, transition: theTransition });
            } else {
                history.pop();
            }

            if (!current) {
                view.showStart();
                view.showEnd();
                that.after();
                return true;
            }

            current.hideStart();
            view.showStart();

            if (!theTransition || !kendo.effects.enabled) {
                that.end();
            } else {
                // do not reverse the explicit transition
                if (back && !transition) {
                    transitionData.reverse = !transitionData.reverse;
                }

                that.effect = kendo.fx(view.element).replace(current.element, transitionData.type)
                    .direction(transitionData.direction)
                    .setReverse(transitionData.reverse);

                that.effect.run().then(function() { that.end(); });
            }

            return true;
        }
    });

    kendo.ViewContainer = ViewContainer;
    kendo.Fragment = Fragment;
    kendo.Layout = Layout;
    kendo.View = View;
    kendo.ViewClone = ViewClone;

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
