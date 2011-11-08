(function($, undefined) {

    var kendo = window.kendo,
        history = kendo.history,
        div = $("<div/>"),
        os = kendo.support.mobileOS,
        meta = '<meta name="apple-mobile-web-app-capable" content="yes" /> \
                <meta name="apple-mobile-web-app-status-bar-style" content="black" /> \
                <meta content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width" name="viewport" />',
        iconMeta = kendo.template('<link rel="apple-touch-icon" href="${icon}" />'),
        roleSelector = kendo.roleSelector;

    $(document.documentElement).addClass("km-" + (!os || (os && os.ios) ? "ios" : os.name));

    function extractView(html) {
        if (/<body[^>]*>(([\u000a\u000d\u2028\u2029]|.)*)<\/body>/i.test(html)) {
            html = RegExp.$1;
        }

        div[0].innerHTML = html;
        return div.find(roleSelector("view")).first();
    }

    function hideAddressBar(element) {
        var android = os.name == "android",
            lastWidth = 0;

        if (android) {
            $(window).scroll(function() {
                element.height(window.innerHeight);
            });
        }

        function hideBar() {
            if (os.ios) {
                var height = document.documentElement.clientHeight;
                if (os.name == "iphone" || os.name == "ipod" && !window.navigator.standalone) height += 60;
                element.height(height);
            } else if (android) {
                element.height(window.innerHeight + 56);
            }

            setTimeout(window.scrollTo, 500, 0, 1);
        }

        function onResize() {
            var pageWidth = element[0].offsetWidth;
            if (lastWidth == pageWidth) return;
            lastWidth = pageWidth;
            hideBar();
        }

        hideBar();
        onResize();

        $(window).resize(onResize);
    }

    var View = kendo.Class.extend({
        init: function(element) {
            var that = this,
                contentSelector = roleSelector("content");

            that.element = element.data("kendoView", that).addClass("km-view");

            that.header = element.find(roleSelector("header")).addClass("km-header");
            that.footer = element.find(roleSelector("footer")).addClass("km-footer");

            if (!element.has(contentSelector)[0]) {
              element.wrapInner("<div " + kendo.dataRole + '="content"></div>');
            }

            that.content = element.find(roleSelector("content"))
                                .addClass("km-content")
                                .kendoScroller({useOnDesktop: true});

            that.element.prepend(that.header).append(that.footer);
        },

        replace: function(view) {
            var that = this,
                back = that.nextView === view,
                animationType = (back ? view : that).element.data("kendoTransition"),
                slidingSource = view.content,
                slidingDestination = that.content,
                callback = function() {
                    view.element.hide();
                },
                myHeader = that.header,
                myFooter = that.footer,
                myElement = that.element,
                viewElement = view.element,
                viewHeader = view.header,
                viewFooter = view.footer;

            myElement.css("display", "");

            if (back) {
              myElement.css("z-index", 0);
              viewElement.css("z-index", 1);
            } else {
              myElement.css("z-index", 1);
              viewElement.css("z-index", 0);
            }

            if (animationType === "slide") {
                if (!myHeader[0]) {
                    slidingSource = slidingSource.add(viewHeader);
                }

                if (!myFooter[0]) {
                    slidingSource = slidingSource.add(viewFooter);
                }

                if (!viewHeader[0]) {
                    slidingDestination = slidingDestination.add(myHeader);
                }

                if (!viewFooter[0]) {
                    slidingDestination = slidingDestination.add(myFooter);
                }

                if (myHeader[0] && viewHeader[0]) {
                    viewHeader.kendoAnimateTo(myHeader, {effects: "fade", reverse: back});
                }

                if (myFooter[0] && viewFooter[0]) {
                    viewFooter.kendoAnimateTo(myFooter, {effects: "fade", reverse: back});
                }

                slidingSource.kendoAnimateTo(slidingDestination, {effects: "slide", reverse: back, complete: callback});
            } else {
                viewElement.kendoAnimateTo(myElement, {effects: animationType, reverse: back, complete: callback});
            }

            if (!back) {
                view.nextView = that;
            }
        }
    });

    var Application = kendo.Observable.extend({
        init: function(element, options) {
            kendo.Observable.fn.init.call(this, options);
            this.element = element;
        },

        start: function(options) {
            var that = this, views;

            that.options = options || {};

            that._attachMeta();

            that.element = that.element ? $(that.element) : $(document.body);

            hideAddressBar(that.element);

            views = that.element.find(roleSelector("view"));

            views.not(":first").hide();

            that.view = that._createView(views.first());

            history.start($.extend(options, {silent: true}));

            history.change(function(e) {
                that.navigate(e.location);
            });
        },

        navigate: function(url) {
            var that = this;

            that._findView(url, function(view) {
                history.navigate(url, true);

                that.trigger("viewHide", { view: that.view });

                view.replace(that.view);

                that.view = view;

                that.trigger("viewShow", { view: view });
            });
        },

        scroller: function() {
            return this.view.content.data("kendoScroller");
        },

        _createView: function(element) {
            var view = new View(element);

            this.trigger("viewInit", { view: view });

            if (kendo.mobile) {
                kendo.mobile.enhance(view.element);
            }

            return view;
        },

        _createRemoteView: function(url, html) {
            var that = this, element;

            element = extractView(html);

            element.hide().attr("data-kendo-url", url);

            that.element.append(element);

            return that._createView(element);
        },

        _findView: function(url, callback) {
            var that = this,
                view,
                local = url.charAt(0) === "#",
                element;

            element = that.element.find("[data-kendo-url='" + url + "']");

            if (!element[0] && local) {
                element = that.element.find(url);
            }

            view = element.data("kendoView");

            if (view) {
                callback(view);
            } else if (local) {
                callback(that._createView(element));
            } else {
                $.get(url, function(html) {
                    callback(that._createRemoteView(url, html));
                });
            }
        },

        _attachMeta: function() {
            var icon = this.options.icon;

            $("head").prepend(meta);

            if (icon) {
                $("head").prepend(iconMeta({icon: icon}));
            }
        }
    });

    kendo.application = new Application;
    kendo.Application = Application;

    $(function() {
        kendo.application.start({});
    });
})(jQuery);
