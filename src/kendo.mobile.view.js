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
        HIDE = "hide",
        DESTROY = "destroy",
        Z_INDEX = "z-index",
        attrValue = kendo.attrValue,
        roleSelector = kendo.roleSelector;

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
            this._layout();
            this._overlay();
            this._scroller();
            this._model();
        },

        events: [
            INIT,
            BEFORE_SHOW,
            SHOW,
            AFTER_SHOW,
            BEFORE_HIDE,
            HIDE,
            DESTROY
        ],

        options: {
            name: "View",
            title: "",
            reload: false,
            transition: "",
            defaultTransition: "",
            useNativeScrolling: false,
            stretch: false,
            zoom: false,
            model: null,
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

            that._padIfNativeScrolling();
            that.trigger(SHOW, {view: that});
            kendo.resize(that.element);
        },

        showEnd: function() {
            this.trigger(AFTER_SHOW, {view: this});
            this._padIfNativeScrolling();
        },

        hideStart: function() {
            this.trigger(BEFORE_HIDE, {view: this});
        },

        hideEnd: function() {
            var that = this;
            that.element.hide();
            that.trigger(HIDE, {view: that});
        },

        _padIfNativeScrolling: function() {
            if (mobile.appLevelNativeScrolling()) {
                var isAndroid = kendo.support.mobileOS && kendo.support.mobileOS.android,
                    topContainer = isAndroid ? "footer" : "header",
                    bottomContainer = isAndroid ? "header" : "footer";

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
                that.content.kendoMobileScroller({ zoom: that.options.zoom, useNative: that.options.useNativeScrolling });

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
                model = kendo.getter(model)(window);
            }

            that.model = model;

            initPopOvers(element);

            that.element.css("display", "");
            if (that.options.initWidgets) {
                if (model) {
                    kendo.bind(element.children(), model, ui, kendo.ui, kendo.dataviz.ui);
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
            var that = this,
                contentSelector = roleSelector("content"),
                element = that.element;

            element.data("kendoView", that).addClass("km-view");

            that.header = element.children(roleSelector("header")).addClass("km-header");
            that.footer = element.children(roleSelector("footer")).addClass("km-footer");

            if (!element.children(contentSelector)[0]) {
              element.wrapInner("<div " + attr("role") + '="content"></div>');
            }

            that.content = element.children(roleSelector("content"))
                                .addClass("km-content");

            that.element.prepend(that.header).append(that.footer);


            if (that.layout) {
                that.layout.setup(that);
            }
        },

        _overlay: function() {
            this.overlay = $(UI_OVERLAY).appendTo(this.element);
        }
    });

    function initWidgets(collection) {
        collection.each(function() {
            kendo.initWidget($(this), {}, ui.roles);
        });
    }

    var Layout = Widget.extend({
        init: function(element, options) {
            var that = this;
            Widget.fn.init.call(that, element, options);

            element = that.element;

            that.header = element.children(roleSelector("header")).addClass("km-header");
            that.footer = element.children(roleSelector("footer")).addClass("km-footer");
            that.elements = that.header.add(that.footer);

            initPopOvers(element);

            kendo.mobile.init(that.element.children());
            that.element.detach();
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

            that.trigger(HIDE, {layout: that, view: view});
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
        AFTER = "after";

    var ViewEngine = Observable.extend({
        init: function(options) {
            var that = this,
                views,
                errorMessage,
                container;

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

            that._setupLayouts(container);

            initWidgets(container.children(roleSelector("modalview drawer")));
        },

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

            if (url === this.url) {
                this.trigger(SAME_VIEW_REQUESTED);
                return false;
            }

            this.trigger(SHOW_START);

            var that = this,
                showClosure = function(view) {
                    return that.viewContainer.show(view, transition, url);
                },
                element = that._findViewElement(url),
                view = element.data("kendoView");

            that.url = url;
            that.params = params;

            if (view && view.reload) {
                view.purge();
                element = [];
            }

            this.trigger("viewTypeDetermined", { remote: element.length === 0, url: url });

            if (element[0]) {
                if (!view) {
                    view = that._createView(element);
                }

                return showClosure(view);
            } else {
                that._loadView(url, showClosure);
                return true;
            }
        },

        append: function(html, url) {
            var that = this,
                sandbox = that.sandbox,
                urlPath = (url || "").split("?")[0],
                container = that.container,
                views,
                modalViews,
                view;

            if (bodyRegExp.test(html)) {
                html = RegExp.$1;
            }

            sandbox[0].innerHTML = html;

            container.append(sandbox.children("script, style"));

            views = that._hideViews(sandbox);
            view = views.first();

            // Generic HTML content found as remote view - no remote view markers
            if (!view.length) {
                views = view = sandbox.wrapInner("<div data-role=view />").children(); // one element
            }

            if (urlPath) {
                view.hide().attr(attr("url"), urlPath);
            }

            that._setupLayouts(sandbox);

            modalViews = sandbox.children(roleSelector("modalview drawer"));

            container.append(sandbox.children(roleSelector("layout modalview drawer")).add(views));

            // Initialize the modalviews after they have been appended to the final container
            initWidgets(modalViews);

            return that._createView(view);
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
                layout: layout,
                reload: attrValue(element, "reload")
            };

            return kendo.initWidget(element, viewOptions, ui.roles);
        },

        _loadView: function(url, callback) {
            var that = this;

            if (this.serverNavigation) {
                location.href = url;
                return;
            }

            if (that._xhr) {
                that._xhr.abort();
            }

            that.trigger(LOAD_START);

            that._xhr = $.get(kendo.absoluteURL(url, that.remoteViewURLPrefix), function(html) {
                            that.trigger(LOAD_COMPLETE);
                            callback(that.append(html, url));
                        }, 'html')
                        .fail(function(request) {
                            that.trigger(LOAD_COMPLETE);
                            if (request.status === 0 && request.responseText) {
                                callback(that.append(request.responseText, url));
                            }
                        });
        },

        _hideViews: function(container) {
            return container.children(roleSelector("view splitview")).hide();
        },

        _setupLayouts: function(element) {
            var that = this;

            element.children(roleSelector("layout")).each(function() {
                var layout = $(this),
                    platform = attrValue(layout,  "platform");

                if (platform === undefined || platform === mobile.application.os.name) {
                    that.layouts[kendo.attrValue(layout, "id")] = kendo.initWidget(layout, {}, ui.roles);
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
