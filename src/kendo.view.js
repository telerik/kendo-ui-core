(function(f, define){
    define([
        "./kendo.core",
        "./kendo.binder",
        "./kendo.fx"
    ], f);
})(function(){

var __meta__ = { // jshint ignore:line
    id: "view",
    name: "View",
    category: "framework",
    description: "The View class instantiates and handles the events of a certain screen from the application.",
    depends: [ "core", "binder", "fx" ],
    hidden: false
};

(function($, undefined) {
    var kendo = window.kendo,
        attr =  kendo.attr,
        ui = kendo.ui,
        attrValue = kendo.attrValue,
        directiveSelector = kendo.directiveSelector,
        Observable = kendo.Observable,
        Widget = kendo.ui.Widget,
        roleSelector = kendo.roleSelector,

        SCRIPT = "SCRIPT",
        INIT = "init",
        TRANSITION_START = "transitionStart",
        TRANSITION_END = "transitionEnd",
        SHOW = "show",
        HIDE = "hide",
        ATTACH = "attach",
        DETACH = "detach",
        sizzleErrorRegExp = /unrecognized expression/;

    var bodyRegExp = /<body[^>]*>(([\u000a\u000d\u2028\u2029]|.)*)<\/body>/i;
    var LOAD_START = "loadStart";
    var LOAD_COMPLETE = "loadComplete";
    var SHOW_START = "showStart";
    var SAME_VIEW_REQUESTED = "sameViewRequested";
    var VIEW_SHOW = "viewShow";
    var VIEW_TYPE_DETERMINED = "viewTypeDetermined";
    var AFTER = "after";
    var classNames = {
        content: "k-content",
        view: "k-view",
        stretchedView: "k-stretched-view",
        widget: "k-widget",
        header: "k-header",
        footer: "k-footer"
    };

    var View = kendo.ui.Widget.extend({
        init: function(content, options) {
            var that = this;
            options = options || {};
            that.id = kendo.guid();

            Observable.fn.init.call(that);
            this.options = $.extend({}, this.options, options);

            that.content = content;

            if (that.options.renderOnInit) {
                Widget.fn.init.call(that, that._createElement(), options);
            }

            if (that.options.wrapInSections) {
                that._renderSections();
            }

            that.tagName = options.tagName || "div";
            that.model = options.model;
            that._wrap = options.wrap !== false;
            this._evalTemplate = options.evalTemplate || false;
            that._fragments = {};

            that.bind([ INIT, SHOW, HIDE, TRANSITION_START, TRANSITION_END ], options);
        },

        options: {
            name: "View",
            renderOnInit: false,
            wrapInSections: false,
            detachOnHide: true,
            detachOnDestroy: true
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

        clone: function() {
            return new ViewClone(this);
        },

        triggerBeforeShow: function() {
            return true;
        },

        triggerBeforeHide: function() {
            return true;
        },

        showStart: function() {
            var that = this;
            var element = that.render();

            if (element) {
                element.css("display", "");
            }

            this.trigger(SHOW_START, { view: this });
        },

        showEnd: function() {
        },

        hideEnd: function() {
            this.hide();
        },

        beforeTransition: function(type){
            this.trigger(TRANSITION_START, { type: type });
        },

        afterTransition: function(type){
            this.trigger(TRANSITION_END, { type: type });
        },

        hide: function() {
            if (this.options.detachOnHide) {
                this._eachFragment(DETACH);
                $(this.element).detach();
            }

            this.trigger(HIDE);
        },

        destroy: function() {
            var that = this;
            var element = that.element;

            if (element) {
                Widget.fn.destroy.call(that);

                kendo.unbind(element);
                kendo.destroy(element);

                if (that.options.detachOnDestroy) {
                    element.remove();
                }
            }
        },

        // ported from mobile view
        purge: function() {
            var that = this;

            that.destroy();
            $(that.element).add(that.content).add(that.wrapper).off().remove();
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
                wrapper = "<" + that.tagName + ">",
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
                content = content.replace(/^\s+|\s+$/g, '');
                if (that._evalTemplate) {
                    content = kendo.template(content)(that.model || {});
                }

                element = $(wrapper).append(content);
                // drop the wrapper if asked - this seems like the easiest (although not very intuitive) way to avoid messing up templates with questionable content, like this one for instance:
                // <script id="my-template">
                // foo
                // <span> Span </span>
                // </script>
                if (!that._wrap) {
                   element = element.contents();
                }
            } else {
                element = content;
                if (that._evalTemplate) {
                    var result = $(kendo.template($("<div />").append(element.clone(true)).html())(that.model || {}));

                    // template uses DOM
                    if ($.contains(document, element[0])) {
                        element.replaceWith(result);
                    }

                    element = result;
                }
                if (that._wrap) {
                    element = element.wrapAll(wrapper).parent();
                }
            }

            return element;
        },

        _renderSections: function() {
            var that = this;

            if (that.options.wrapInSections) {
                that._wrapper();
                that._createContent();
                that._createHeader();
                that._createFooter();
            }
        },

        _wrapper: function() {
            var that = this;
            var content = that.content;

            if (content.is(roleSelector("view"))) {
                that.wrapper = that.content;
            } else {
                that.wrapper = content
                    .wrap('<div data-' + kendo.ns + 'stretch="true" data-' + kendo.ns + 'role="view" data-' + kendo.ns + 'init-widgets="false"></div>')
                    .parent();
            }

            var wrapper = that.wrapper;

            wrapper.attr("id", that.id);

            wrapper.addClass(classNames.view);
            wrapper.addClass(classNames.widget);
            wrapper.attr("role", "view");
        },

        _createContent: function() {
            var that = this;
            var wrapper = $(that.wrapper);
            var contentSelector = roleSelector("content");

            if (!wrapper.children(contentSelector)[0]) {
                var ccontentElements = wrapper.children().filter(function() {
                    var child = $(this);
                    if (!child.is(roleSelector("header")) && !child.is(roleSelector("footer"))) {
                        return child;
                    }
                });

                ccontentElements.wrap("<div " + attr("role") + '="content"></div>');
            }

            // use contentElement instead of content as view.content can be a string
            this.contentElement = wrapper.children(roleSelector("content"));

            this.contentElement
                .addClass(classNames.stretchedView)
                .addClass(classNames.content);
        },

        _createHeader: function() {
            var that = this;
            var wrapper = that.wrapper;

            this.header = wrapper.children(roleSelector("header")).addClass(classNames.header);
        },

        _createFooter: function() {
            var that = this;
            var wrapper = that.wrapper;

            this.footer = wrapper.children(roleSelector("footer")).addClass(classNames.footer);
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

        hideEnd: function() {
            this.element.remove();
        },

        beforeTransition: $.noop,
        afterTransition: $.noop
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
            if (!view.triggerBeforeShow() || (this.view && !this.view.triggerBeforeHide())) {
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

            if (!theTransition || !kendo.effects.enabled) {
                view.showStart();
                that.end();
            } else {
                // hide the view element before init/show - prevents blinks on iPad
                // the replace effect will remove this class
                view.element.addClass("k-fx-hidden");
                view.showStart();
                // do not reverse the explicit transition
                if (back && !transition) {
                    transitionData.reverse = !transitionData.reverse;
                }

                that.effect = kendo.fx(view.element).replace(current.element, transitionData.type)
                    .beforeTransition(function() {
                        view.beforeTransition("show");
                        current.beforeTransition("hide");
                    })
                    .afterTransition(function() {
                        view.afterTransition("show");
                        current.afterTransition("hide");
                    })
                    .direction(transitionData.direction)
                    .setReverse(transitionData.reverse);

                that.effect.run().then(function() { that.end(); });
            }

            return true;
        },

        destroy: function() {
            var that = this;
            var view = that.view;

            if (view && view.destroy) {
                view.destroy();
            }
        }
    });

    var ViewEngine = Observable.extend({
        init: function(options) {
            var that = this,
                views,
                container;

            Observable.fn.init.call(that);
            that.options = options;

            $.extend(that, options);
            that.sandbox = $("<div />");
            container = that.container;

            views = that._hideViews(container);
            that.rootView = views.first();
            that.layouts = {};

            that.viewContainer = new kendo.ViewContainer(that.container);

            that.viewContainer.bind("accepted", function(e) {
                e.view.params = that.params;
            });

            that.viewContainer.bind("complete", function(e) {
                that.trigger(VIEW_SHOW, { view: e.view });
            });

            that.viewContainer.bind(AFTER, function() {
                that.trigger(AFTER);
            });

            this.bind(this.events, options);
        },

        events: [
            SHOW_START,
            AFTER,
            VIEW_SHOW,
            LOAD_START,
            LOAD_COMPLETE,
            SAME_VIEW_REQUESTED,
            VIEW_TYPE_DETERMINED
        ],

        destroy: function() {
            var that = this;
            var viewContainer = that.viewContainer;

            kendo.destroy(that.container);

            for (var id in that.layouts) {
                this.layouts[id].destroy();
            }

            if (viewContainer) {
                viewContainer.destroy();
            }
        },

        view: function() {
            return this.viewContainer.view;
        },

        showView: function(url, transition, params) {
            url = url.replace(new RegExp("^" + this.remoteViewURLPrefix), "");
            if (url === "" && this.remoteViewURLPrefix) {
                url = "/";
            }

            if (url.replace(/^#/, "") === this.url) {
                this.trigger(SAME_VIEW_REQUESTED);
                return false;
            }

            this.trigger(SHOW_START);

            var that = this,
                element = that._findViewElement(url),
                view = kendo.widgetInstance(element);

            that.url = url.replace(/^#/, "");

            that.params = params;

            if (view && view.reload) {
                view.purge();
                element = [];
            }

            this.trigger(VIEW_TYPE_DETERMINED, { remote: element.length === 0, url: url });

            if (element[0]) {
                if (!view) {
                    view = that._createView(element);
                }

                return that.viewContainer.show(view, transition, url);
            } else {
                return true;
            }
        },

        append: function(html, url) {
            var sandbox = this.sandbox,
                urlPath = (url || "").split("?")[0],
                container = this.container,
                views,
                view;

            if (bodyRegExp.test(html)) {
                html = RegExp.$1;
            }

            sandbox[0].innerHTML = html;

            container.append(sandbox.children("script, style"));

            views = this._hideViews(sandbox);
            view = views.first();

            // Generic HTML content found as remote view - no remote view markers
            if (!view.length) {
                views = view = sandbox.wrapInner("<div data-role=view />").children(); // one element
            }

            if (urlPath) {
                view.hide().attr(attr("url"), urlPath);
            }

            container.append(views);

            return this._createView(view);
        },

        _locate: function(selectors) {
            return this.$angular ? directiveSelector(selectors) : roleSelector(selectors);
        },

        _findViewElement: function(url) {
            var element,
                urlPath = url.split("?")[0];

            if (!urlPath) {
                return this.rootView;
            }

            element = this.container.children("[" + attr("url") + "='" + urlPath + "']");

            // do not try to search for "#/foo/bar" id, jQuery throws error
            if (!element[0] && urlPath.indexOf("/") === -1) {
                element = this.container.children(urlPath.charAt(0) === "#" ? urlPath : "#" + urlPath);
            }

            if (!element[0]) {
                element = this._findViewElementById(url);
            }

            return element;
        },

        _findViewElementById: function(id) {
            var element = this.container.children("[id='" + id + "']");
            return element;
        },

        _createView: function(element) {
            //return this._createMobileView(element);
            return this._createSpaView(element);
        },

        _createMobileView: function(element) {
            return kendo.initWidget(element, {
                defaultTransition: this.transition,
                loader: this.loader,
                container: this.container,
                getLayout: this.getLayoutProxy,
                modelScope: this.modelScope,
                reload: attrValue(element, "reload")
            }, ui.roles);
        },

        _createSpaView: function(element) {
            var viewOptions = (this.options || {}).viewOptions || {};
            return new kendo.View(element, {
                renderOnInit: viewOptions.renderOnInit,
                wrap: viewOptions.wrap || false,
                wrapInSections: viewOptions.wrapInSections,
                detachOnHide: viewOptions.detachOnHide,
                detachOnDestroy: viewOptions.detachOnDestroy
            });
        },

        _hideViews: function(container) {
            return container.children(this._locate("view")).hide();
        }
    });

    kendo.ViewEngine = ViewEngine;

    kendo.ViewContainer = ViewContainer;
    kendo.Fragment = Fragment;
    kendo.Layout = Layout;
    kendo.View = View;
    kendo.ViewClone = ViewClone;

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
