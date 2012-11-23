kendo_module({
    id: "mobile.view",
    name: "View",
    category: "mobile",
    description: "Mobile View",
    depends: [ "core", "fx", "history", "mobile.scroller" ],
    hidden: true
});

(function($, undefined) {
    var kendo = window.kendo,
        mobile = kendo.mobile,
        ui = mobile.ui,
        attr = kendo.attr,
        Class = kendo.Class,
        Widget = ui.Widget,
        INIT = "init",
        SHOW = "show",
        BEFORE_SHOW = "beforeShow",
        HIDE = "hide",
        Z_INDEX = "z-index",
        attrValue = kendo.attrValue,
        roleSelector = kendo.roleSelector;

    var View = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            element = that.element;

            that.params = {};
            that.lastParams = {};

            $.extend(that, options);

            that._layout();
            that._scroller();
            that._model();
        },

        events: [
            INIT,
            BEFORE_SHOW,
            SHOW,
            HIDE
        ],

        options: {
            name: "View",
            title: "",
            defaultTransition: "",
            stretch: false,
            zoom: false,
            model: null
        },

        destroy: function() {
            Widget.fn.destroy.call(this);

            if (this.scroller) {
                this.scroller.destroy();
            }

            kendo.destroy(this.element);
        },

        showStart: function() {
            var that = this;
            that.element.css("display", "");

            if (!that.inited) {
                that.inited = true;
                that.trigger(INIT, {view: that});
            }

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

        updateParams: function(params) {
            var that = this;

            if (that.trigger(BEFORE_SHOW, {view: that})) {
                return;
            }

            that.lastParams = that.params;
            that.params = params;

            that.trigger(SHOW, {view: that});
        },

        switchWith: function(view, transition, params, callback) {
            var that = this;

            if (that.trigger(BEFORE_SHOW, {view: that})) {
                return;
            }

            that.lastParams = that.params;
            that.params = params;

            if (view) {
                // layout needs to be detached first, then reattached
                view.hideStart();
                that.showStart();

                new ViewTransition({
                    current: view,
                    next: that,
                    transition: transition,
                    defaultTransition: view.options.defaultTransition,
                    complete: callback
                });
            } else {
                that.showStart();
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

        _scroller: function() {
            var that = this;

            if (that.options.stretch) {
                that.content.addClass("km-stretched-view");
            } else {
                that.content.kendoMobileScroller({zoom: that.options.zoom});

                that.scroller = that.content.data("kendoMobileScroller");
                that.scrollerContent = that.scroller.scrollElement;
            }
        },

        _model: function() {
            var that = this,
                element = that.element,
                model = that.options.model;

            if (typeof model === "string") {
                model = kendo.getter(model)(window);
            }

            that.model = model;

            // PopOver widgets have to be initialized first, as they move their element out of the DOM.
            element.find(roleSelector("popover")).each(function(){
                kendo.initWidget(this, {}, ui.roles);
            });

            if (model) {
                kendo.bind(element.children(), model, ui, kendo.ui, kendo.dataviz.ui);
            } else {
                mobile.init(element.children());
            }
        },

        _layout: function() {
            var that = this,
                contentSelector = roleSelector("content"),
                element = that.element;

            element.data("kendoView", that).addClass("km-view");
            that.transition = attrValue(element, "transition");

            that.header = element.children(roleSelector("header")).addClass("km-header");
            that.footer = element.children(roleSelector("footer")).addClass("km-footer");

            if (!element.children(contentSelector)[0]) {
              element.wrapInner("<div " + attr("role") + '="content"></div>');
            }

            that.content = element.children(roleSelector("content"))
                                .addClass("km-content");

            that.element.prepend(that.header).append(that.footer);

            that.id = attrValue(element, "url") || "#" + element.attr("id");

            if (that.layout) {
                that.layout.setup(that);
            }
        },

        _eachWidget: function(callback) {
            var widget;
            this.element.find("[data-" + kendo.ns + "role]").each(function() {
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

    function initWidgets(collection) {
        collection.each(function() {
            kendo.initWidget($(this), {}, ui.roles);
        });
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
                parallax = /^slide/.test(animationType),
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

            return next.nextView === current && JSON.stringify(next.params) === JSON.stringify(next.lastParams);
        }
    });

    var Layout = Widget.extend({
        init: function(element, options) {
            var that = this;
            Widget.fn.init.call(that, element, options);

            element = that.element;

            that.element = element.detach();
            that.header = element.children(roleSelector("header")).addClass("km-header");
            that.footer = element.children(roleSelector("footer")).addClass("km-footer");
            that.elements = that.header.add(that.footer);
            kendo.mobile.init(that.element.children());
            that.trigger(INIT, {layout: that});
        },

        options: {
            name: "Layout"
        },

        events: [
            INIT,
            SHOW,
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
                view.element.children(roleSelector("header")).remove();
                view.element.prepend(that.header);
            }

            if (view.footer === that.footer) {
                that.footer.detach();
                view.element.children(roleSelector("footer")).remove();
                view.element.append(that.footer);
            }

            that.trigger(SHOW, {layout: that, view: view});
        }
    });

    var Observable = kendo.Observable,
        BODY_REGEX = /<body[^>]*>(([\u000a\u000d\u2028\u2029]|.)*)<\/body>/i,
        LOAD_START = "loadStart",
        LOAD_COMPLETE = "loadComplete",
        SHOW_START = "showStart",
        VIEW_SHOW = "viewShow";

    function urlParams(url) {
        var queryString = url.split('?')[1] || "",
            params = {},
            paramParts = queryString.split(/&|=/),
            length = paramParts.length,
            idx = 0;

        for (; idx < length; idx += 2) {
            params[paramParts[idx]] = paramParts[idx + 1];
        }

        return params;
    }

    var ViewEngine = Observable.extend({
        init: function(options) {
            var that = this,
                views,
                container;

            Observable.fn.init.call(that);

            $.extend(that, options);
            that.sandbox = $("<div />");
            container = that.container;

            views = that._hideViews(container);
            that.rootView = views.first();

            if (!that.rootView[0]) {
                throw new Error('Your kendo mobile application element does not contain any direct child elements with data-role="view" attribute set. Make sure that you instantiate the mobile application using the correct container.');
            }
            that._view = null;

            that.layouts = {};

            that._setupLayouts(container);
            initWidgets(container.children(roleSelector("modalview")));

            if (that.loader) {
                that.bind(SHOW_START, function() { that.loader.transition(); });
                that.bind(LOAD_START, function() { that.loader.show(); });
                that.bind(LOAD_COMPLETE, function() { that.loader.hide(); });
                that.bind(VIEW_SHOW, function() { that.loader.transitionDone(); });
            }
        },

        view: function() {
            return this._view;
        },

        showView: function(url, transition) {
            var that = this,
                container = that.container,
                params = urlParams(url),
                local = url.charAt(0) === "#",
                remote = !local && !url.match(/^([\w\-\?=]+)$/),
                view,
                element,
                urlPath = url.split("?")[0];

            if (url === that.url) {
                return;
            }

            that.url = url;
            that.trigger(SHOW_START);

            if (!url) {
                element = that.rootView;
            } else {
                element = container.children("[" + attr("url") + "='" + url + "']");

                if (!element[0] && !remote) {
                    element = container.children(local ? urlPath : "#" + urlPath);
                }
            }

            view = element.data("kendoView");

            if (element[0]) {
                if (!view) {
                    view = that._createView(element);
                }

                that._show(view, transition, params);
            } else {
                that._loadView(url, function(view) { that._show(view, transition, params); });
            }
        },

        _createView: function(element) {
            var that = this,
                viewOptions,
                layout = attrValue(element, "layout");

            if (typeof layout === "undefined") {
                layout = that.layout;
            }

            if (layout) {
                layout = that.layouts[layout];
            }

            viewOptions = {
                defaultTransition: that.transition,
                loader: that.loader,
                container: that.container,
                layout: layout
            };

            return kendo.initWidget(element, viewOptions, ui.roles);
        },

        _loadView: function(url, callback) {
            var that = this;

            if (that._xhr) {
                that._xhr.abort();
            }

            that.trigger(LOAD_START);

            that._xhr = $.get(url, function(html) {
                            that.trigger(LOAD_COMPLETE);
                            callback(that._createRemoteView(url, html));
                        }, 'html')
                        .fail(function(request) {
                            that.trigger(LOAD_COMPLETE);
                            if (request.status === 0 && request.responseText) {
                                callback(that._createRemoteView(url, request.responseText));
                            }
                        });
        },

        _createRemoteView: function(url, html) {
            var that = this,
                sandbox = that.sandbox,
                container = that.container,
                views,
                modalViews,
                view;

            if (BODY_REGEX.test(html)) {
                html = RegExp.$1;
            }

            sandbox[0].innerHTML = html;

            container.append(sandbox.children("script, style"));

            views = that._hideViews(sandbox);
            view = views.first();
            view.hide().attr(attr("url"), url);

            that._setupLayouts(sandbox);

            modalViews = sandbox.children(roleSelector("modalview"));

            container.append(sandbox.children(roleSelector("layout modalview")).add(views));

            // Initialize the modalviews after they have been appended to the final container
            initWidgets(modalViews);

            return that._createView(view);
        },

        _show: function(view, transition, params) {
            var that = this;
            if (that._view !== view) {
                view.switchWith(that._view, transition, params, function() {
                    that._view = view;
                    that.trigger(VIEW_SHOW, {view: view});
                });
            } else {
                that._view.updateParams(params);
                that.trigger(VIEW_SHOW, {view: view});
            }
        },

        _hideViews: function(container) {
            return container.children(roleSelector("view splitview")).hide();
        },

        _setupLayouts: function(element) {
            var that = this;

            element.children(roleSelector("layout")).each(function() {
                var layout = $(this),
                    platform = attrValue(layout,  "platform");

                if (platform === undefined || platform === mobile.application.os) {
                    that.layouts[layout.data("id")] = kendo.initWidget(layout, {}, ui.roles);
                }
            });
        }
    });

    kendo.mobile.ViewEngine = ViewEngine;

    ui.plugin(View);
    ui.plugin(Layout);
})(window.kendo.jQuery);
