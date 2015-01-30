(function(f, define){
    define([ "./kendo.core", "./kendo.fx", "./kendo.mobile.scroller", "./kendo.view" ], f);
})(function(){

var __meta__ = {
    id: "mobile.view",
    name: "View",
    category: "mobile",
    description: "Mobile View",
    depends: [ "core", "fx", "mobile.scroller", "view" ],
    hidden: true
};

(function($, undefined) {
    var kendo = window.kendo,
        angular = window.angular,
        mobile = kendo.mobile,
        ui = mobile.ui,
        attr = kendo.attr,
        Class = kendo.Class,
        Widget = ui.Widget,
        ViewClone = kendo.ViewClone,
        INIT = "init",
        UI_OVERLAY = '<div style="height: 100%; width: 100%; position: absolute; top: 0; left: 0; z-index: 20000; display: none" />',
        BEFORE_SHOW = "beforeShow",
        SHOW = "show",
        AFTER_SHOW = "afterShow",
        BEFORE_HIDE = "beforeHide",
        TRANSITION_END = "transitionEnd",
        TRANSITION_START = "transitionStart",
        HIDE = "hide",
        DESTROY = "destroy",
        Z_INDEX = "z-index",
        attrValue = kendo.attrValue,
        roleSelector = kendo.roleSelector,
        directiveSelector = kendo.directiveSelector,
        compileMobileDirective = kendo.compileMobileDirective;

    function initPopOvers(element) {
        var popovers = element.find(roleSelector("popover")),
            idx, length,
            roles = ui.roles;

        for (idx = 0, length = popovers.length; idx < length; idx ++) {
            kendo.initWidget(popovers[idx], {}, roles);
        }
    }

    function preventScrollIfNotInput(e) {
        if (!kendo.triggeredByInput(e)) {
            e.preventDefault();
        }
    }

    var View = Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);
            this.params = {};

            $.extend(this, options);

            this.transition = this.transition || this.defaultTransition;

            this._id();

            if (!this.options.$angular) {
                this._layout();
                this._overlay();
                this._scroller();
                this._model();
            } else {
                this._overlay();
            }
        },

        events: [
            INIT,
            BEFORE_SHOW,
            SHOW,
            AFTER_SHOW,
            BEFORE_HIDE,
            HIDE,
            DESTROY,
            TRANSITION_START,
            TRANSITION_END
        ],

        options: {
            name: "View",
            title: "",
            layout: null,
            getLayout: $.noop,
            reload: false,
            transition: "",
            defaultTransition: "",
            useNativeScrolling: false,
            stretch: false,
            zoom: false,
            model: null,
            modelScope: window,
            scroller: {},
            initWidgets: true
        },

        enable: function(enable) {
            if(typeof enable == "undefined") {
                enable = true;
            }

            if(enable) {
                this.overlay.hide();
            } else {
                this.overlay.show();
            }
        },

        destroy: function() {
            if (this.layout) {
                this.layout.detach(this);
            }

            this.trigger(DESTROY);


            Widget.fn.destroy.call(this);

            if (this.scroller) {
                this.scroller.destroy();
            }

            if (this.options.$angular) {
                this.element.scope().$destroy();
            }

            kendo.destroy(this.element);
        },

        purge: function() {
            this.destroy();
            this.element.remove();
        },

        triggerBeforeShow: function() {
            if (this.trigger(BEFORE_SHOW, { view: this })) {
                return false;
            }
            return true;
        },

        triggerBeforeHide: function() {
            if (this.trigger(BEFORE_HIDE, { view: this })) {
                return false;
            }
            return true;
        },

        showStart: function() {
            var element = this.element;

            element.css("display", "");

            if (!this.inited) {
                this.inited = true;
                this.trigger(INIT, {view: this});
            } else { // skip the initial controller update
                this._invokeNgController();
            }

            if (this.layout) {
                this.layout.attach(this);
            }

            this._padIfNativeScrolling();
            this.trigger(SHOW, {view: this});
            kendo.resize(element);
        },

        showEnd: function() {
            this.trigger(AFTER_SHOW, {view: this});
            this._padIfNativeScrolling();
        },

        hideEnd: function() {
            var that = this;
            that.element.hide();
            that.trigger(HIDE, {view: that});

            if (that.layout) {
                that.layout.trigger(HIDE, { view : that, layout: that.layout });
            }
        },

        beforeTransition: function(type){
            this.trigger(TRANSITION_START, { type: type });
        },

        afterTransition: function(type){
            this.trigger(TRANSITION_END, { type: type });
        },

        _padIfNativeScrolling: function() {
            if (mobile.appLevelNativeScrolling()) {
                var isAndroid = kendo.support.mobileOS && kendo.support.mobileOS.android,
                    skin = mobile.application.skin() || "",
                    isAndroidForced = mobile.application.os.android || (skin.indexOf("android") > -1),
                    hasPlatformIndependentSkin = skin === "flat" || (skin.indexOf("material") > -1),
                    topContainer = (isAndroid || isAndroidForced) && (!hasPlatformIndependentSkin) ? "footer" : "header",
                    bottomContainer = (isAndroid || isAndroidForced) && (!hasPlatformIndependentSkin) ? "header" : "footer";

                this.content.css({
                    paddingTop: this[topContainer].height(),
                    paddingBottom: this[bottomContainer].height()
                });
            }
        },

        contentElement: function() {
            var that = this;

            return that.options.stretch ? that.content : that.scrollerContent;
        },

        clone: function(back) {
            return new ViewClone(this);
        },

        _scroller: function() {
            var that = this;

            if (mobile.appLevelNativeScrolling()) {
                return;
            }
            if (that.options.stretch) {
                that.content.addClass("km-stretched-view");
            } else {
                that.content.kendoMobileScroller($.extend(that.options.scroller, { zoom: that.options.zoom, useNative: that.options.useNativeScrolling }));

                that.scroller = that.content.data("kendoMobileScroller");
                that.scrollerContent = that.scroller.scrollElement;
            }

            // prevent accidental address bar display when pulling the header
            if (kendo.support.kineticScrollNeeded) {
                $(that.element).on("touchmove", ".km-header", preventScrollIfNotInput);
                if (!that.options.useNativeScrolling) {
                    $(that.element).on("touchmove", ".km-content", preventScrollIfNotInput);
                }
            }
        },

        _model: function() {
            var that = this,
                element = that.element,
                model = that.options.model;

            if (typeof model === "string") {
                model = kendo.getter(model)(that.options.modelScope);
            }

            that.model = model;

            initPopOvers(element);

            that.element.css("display", "");
            if (that.options.initWidgets) {
                if (model) {
                    kendo.bind(element, model, ui, kendo.ui, kendo.dataviz.ui);
                } else {
                    mobile.init(element.children());
                }
            }
            that.element.css("display", "none");
        },

        _id: function() {
            var element = this.element,
                idAttrValue = element.attr("id") || "";

            this.id = attrValue(element, "url") || "#" + idAttrValue;

            if (this.id == "#") {
                this.id = kendo.guid();
                element.attr("id", this.id);
            }
        },

        _layout: function() {
            var contentSelector = roleSelector("content"),
                element = this.element;

            element.addClass("km-view");

            this.header = element.children(roleSelector("header")).addClass("km-header");
            this.footer = element.children(roleSelector("footer")).addClass("km-footer");

            if (!element.children(contentSelector)[0]) {
              element.wrapInner("<div " + attr("role") + '="content"></div>');
            }

            this.content = element.children(roleSelector("content"))
                                .addClass("km-content");

            this.element.prepend(this.header).append(this.footer);


            this.layout = this.options.getLayout(this.layout);

            if (this.layout) {
                this.layout.setup(this);
            }
        },

        _overlay: function() {
            this.overlay = $(UI_OVERLAY).appendTo(this.element);
        },

        _invokeNgController: function() {
            var controller,
                scope;

            if (this.options.$angular) {
                controller = this.element.controller();
                scope = this.element.scope();

                if (controller) {
                    var callback = $.proxy(this, '_callController', controller, scope);

                    if (/^\$(digest|apply)$/.test(scope.$$phase)) {
                        callback();
                    } else {
                        scope.$apply(callback);
                    }
                }
            }
        },

        _callController: function(controller, scope) {
            this.element.injector().invoke(controller.constructor, controller, { $scope: scope });
        }
    });

    function initWidgets(collection) {
        collection.each(function() {
            kendo.initWidget($(this), {}, ui.roles);
        });
    }

    var Layout = Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);

            element = this.element;

            this.header = element.children(this._locate("header")).addClass("km-header");
            this.footer = element.children(this._locate("footer")).addClass("km-footer");
            this.elements = this.header.add(this.footer);

            initPopOvers(element);

            if (!this.options.$angular) {
                kendo.mobile.init(this.element.children());
            }
            this.element.detach();
            this.trigger(INIT, {layout: this});
        },

        _locate: function(selectors) {
            return this.options.$angular ? directiveSelector(selectors) : roleSelector(selectors);
        },

        options: {
            name: "Layout",
            id: null,
            platform: null
        },

        events: [
            INIT,
            SHOW,
            HIDE
        ],

        setup: function(view) {
            if (!view.header[0]) { view.header = this.header; }
            if (!view.footer[0]) { view.footer = this.footer; }
        },

        detach: function(view) {
            var that = this;
            if (view.header === that.header && that.header[0]) {
                view.element.prepend(that.header.detach()[0].cloneNode(true));
            }

            if (view.footer === that.footer && that.footer.length) {
                view.element.append(that.footer.detach()[0].cloneNode(true));
            }
        },

        attach: function(view) {
            var that = this,
                previousView = that.currentView;

            if (previousView) {
                that.detach(previousView);
            }

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
            that.currentView = view;
        }
    });

    var Observable = kendo.Observable,
        bodyRegExp = /<body[^>]*>(([\u000a\u000d\u2028\u2029]|.)*)<\/body>/i,
        LOAD_START = "loadStart",
        LOAD_COMPLETE = "loadComplete",
        SHOW_START = "showStart",
        SAME_VIEW_REQUESTED = "sameViewRequested",
        VIEW_SHOW = "viewShow",
        VIEW_TYPE_DETERMINED = "viewTypeDetermined",
        AFTER = "after";

    var ViewEngine = Observable.extend({
        init: function(options) {
            var that = this,
                views,
                errorMessage,
                container,
                collection;

            Observable.fn.init.call(that);

            $.extend(that, options);
            that.sandbox = $("<div />");
            container = that.container;

            views = that._hideViews(container);
            that.rootView = views.first();

            if (!that.rootView[0] && options.rootNeeded) {
                if (container[0] == kendo.mobile.application.element[0]) {
                    errorMessage = 'Your kendo mobile application element does not contain any direct child elements with data-role="view" attribute set. Make sure that you instantiate the mobile application using the correct container.';
                } else {
                    errorMessage = 'Your pane element does not contain any direct child elements with data-role="view" attribute set.';
                }
                throw new Error(errorMessage);
            }

            that.layouts = {};

            that.viewContainer = new kendo.ViewContainer(that.container);

            that.viewContainer.bind("accepted", function(e) {
                e.view.params = that.params;
            });

            that.viewContainer.bind("complete", function(e) {
                that.trigger(VIEW_SHOW, { view: e.view });
            });

            that.viewContainer.bind(AFTER, function(e) {
                that.trigger(AFTER);
            });

            this.getLayoutProxy = $.proxy(this, "_getLayout");
            that._setupLayouts(container);

            collection = container.children(that._locate("modalview drawer"));
            if (that.$angular) {
                collection.each(function(idx, element) {
                    compileMobileDirective($(element), function(scope) {
                        //pass the options?
                    });
                });
            } else {
                initWidgets(collection);
            }

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
            kendo.destroy(this.container);

            for (var id in this.layouts) {
                this.layouts[id].destroy();
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
                showClosure = function(view) {
                    return that.viewContainer.show(view, transition, url);
                },
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

                return showClosure(view);
            } else {
                if (this.serverNavigation) {
                    location.href = url;
                } else {
                    that._loadView(url, showClosure);
                }
                return true;
            }
        },

        append: function(html, url) {
            var sandbox = this.sandbox,
                urlPath = (url || "").split("?")[0],
                container = this.container,
                views,
                modalViews,
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

            this._setupLayouts(sandbox);

            modalViews = sandbox.children(this._locate("modalview drawer"));

            container.append(sandbox.children(this._locate("layout modalview drawer")).add(views));

            // Initialize the modalviews after they have been appended to the final container
            initWidgets(modalViews);

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

            return element;
        },

        _createView: function(element) {
            if (this.$angular) {
                var that = this;

                return compileMobileDirective(element, function(scope) {
                    scope.viewOptions = {
                        defaultTransition: that.transition,
                        loader: that.loader,
                        container: that.container,
                        getLayout: that.getLayoutProxy
                    };
                });
            } else {
                return kendo.initWidget(element, {
                    defaultTransition: this.transition,
                    loader: this.loader,
                    container: this.container,
                    getLayout: this.getLayoutProxy,
                    modelScope: this.modelScope,
                    reload: attrValue(element, "reload")
                }, ui.roles);
            }
        },

        _getLayout: function(name) {
            if (name === "") {
                return null;
            }

            return name ? this.layouts[name] : this.layouts[this.layout];
        },

        _loadView: function(url, callback) {
            if (this._xhr) {
                this._xhr.abort();
            }

            this.trigger(LOAD_START);

            this._xhr = $.get(kendo.absoluteURL(url, this.remoteViewURLPrefix), "html")
                .always($.proxy(this, "_xhrComplete", callback, url));
        },

        _xhrComplete: function(callback, url, response, status, err) {
            var success = true;

            if (typeof response === "object") {
                if (response.status === 0) {
                    if (response.responseText && response.responseText.length > 0) {
                        success = true;
                        response = response.responseText;
                    } else { // request has been aborted for real
                        return;
                    }
                }
            }

            this.trigger(LOAD_COMPLETE);

            if (success) {
                callback(this.append(response, url));
            }
        },

        _hideViews: function(container) {
            return container.children(this._locate("view splitview")).hide();
        },

        _setupLayouts: function(element) {
            var that = this,
                layout;

            element.children(that._locate("layout")).each(function() {
                if (that.$angular) {
                    layout = compileMobileDirective($(this));
                } else {
                    layout = kendo.initWidget($(this), {}, ui.roles);
                }

                var platform = layout.options.platform;

                if (!platform || platform === mobile.application.os.name) {
                    that.layouts[layout.options.id] = layout;
                } else {
                    layout.destroy();
                }
            });

        }
    });

    kendo.mobile.ViewEngine = ViewEngine;

    ui.plugin(View);
    ui.plugin(Layout);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
