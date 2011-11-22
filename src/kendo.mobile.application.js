(function($, undefined) {

    var kendo = window.kendo,
        history = kendo.history,
        support = kendo.support,
        os = support.mobileOS,
        div = $("<div/>"),
        meta = '<meta name="apple-mobile-web-app-capable" content="yes" /> \
                <meta name="apple-mobile-web-app-status-bar-style" content="black" /> \
                <meta content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width" name="viewport" />',
        iconMeta = kendo.template('<link rel="apple-touch-icon" href="${icon}" />'),
        buttonRolesSelector = toRoleSelector("button listview-link"),
        linkRolesSelector = toRoleSelector("tab"),
        roleSelector = kendo.roleSelector;

    function toRoleSelector(string) {
        return string.replace(/(\S+)/g, "[data-kendo-role=$1],")
    }

    function extractView(html) {
        if (/<body[^>]*>(([\u000a\u000d\u2028\u2029]|.)*)<\/body>/i.test(html)) {
            html = RegExp.$1;
        }

        div[0].innerHTML = html;
        return div.find(roleSelector("view")).first();
    }

    function hideAddressBar(element) {
        if (os.appMode) {
            return;
        }

        var lastWidth = 0;

        if (os.android) {
            $(window).scroll(function() {
                element.height(window.innerHeight);
            });
        }

        function hideBar() {
            var pageWidth = element[0].offsetWidth,
                compensation;

            if (lastWidth === pageWidth) {
                return;
            }
            lastWidth = pageWidth;

            if (os.device == "iphone" || os.device == "ipod" || os.android) {
                if (os.android) {
                    compensation = 56;
                } else {
                    compensation = 60;
                }

                element.height(window.innerHeight + compensation);
                setTimeout(window.scrollTo, 0, 0, 1);
            }
        }

        $(window).load(hideBar);
        $(window).resize(hideBar);
    }

    function appLinkMouseUp(e) {
        var link = $(e.currentTarget),
            href = link.attr("href");

        if (!e.isDefaultPrevented()) {
            // Prevent iOS address bar progress display for in app navigation
            link.attr("href", "#!");
            setTimeout(function() { link.attr("href", href) });

            kendo.application.navigate(href);
            e.preventDefault();
        }
    }

    function appLinkClick(e) {
        e.preventDefault();
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
        }
    });

    function ViewSwitcher(previous, view) {
        var that = this,
            callback = function() { previous.element.hide(); },
            animationType;

        that.back = view.nextView === previous;

        animationType = (that.back ? previous : view).element.data("kendoTransition");

        that.parallax = animationType === "slide";

        view.element.css("display", "");

        if (that.back && !that.parallax) {
            view.element.css("z-index", 0);
            previous.element.css("z-index", 1);
        } else {
            view.element.css("z-index", 1);
            previous.element.css("z-index", 0);
        }

        that.contents(previous, view).kendoAnimateTo(that.contents(view, previous), {effects: animationType, reverse: that.back, complete: callback});
        that.switchWith(previous.footer, view.footer);
        that.switchWith(previous.header, view.header);

        if (!that.back) {
            previous.nextView = view;
        }
    }

    ViewSwitcher.replace = function(previous, view) {
        new ViewSwitcher(previous, view);
    }

    ViewSwitcher.prototype = {
        contents: function(source, destination) {
            if (this.parallax) {
                contents = source.content;
                if (!destination.header[0]) {
                    contents = contents.add(source.header);
                }

                if (!destination.footer[0]) {
                    contents = contents.add(source.footer);
                }
            } else {
                contents = source.element;
            }

            return contents;
        },

        switchWith: function(source, destination) {
            if (source[0] && destination[0]) {
                if (source.data("id") && source.data("id") === destination.data("id")) {
                    // cloning (instead of appending) Resolves iPad iOS 4 specific footer flicker
                    destination.html("").append(source.contents().clone(true));
                } else if(this.parallax) {
                    source.kendoAnimateTo(destination, {effects: "fade", reverse: this.back});
                }
            }
        }
    }

    var Application = kendo.Observable.extend({
        init: function(element, options) {
            kendo.Observable.fn.init.call(this, options);
            this.element = element;

            $(document.documentElement).addClass("km-" + (!os ? "ios" : os.name));
        },

        start: function(options) {
            var that = this, views, rootView, historyEvents;

            that.options = options || {};

            that._attachMeta();

            that.element = that.element ? $(that.element) : $(document.body);

            hideAddressBar(that.element);

            that.setupAppLinks();

            views = that.element.find(roleSelector("view"));
            views.first().attr("data-kendo-url", "/");

            historyEvents = {
                change: function(e) {
                    that.navigate(e.string);
                },

                ready: function(e) {
                    that._findView(e.string, function(view) {
                        views.not(view.element).hide();
                        that._setCurrentView(view);
                    });
                }
            }

            history.start($.extend(options, historyEvents));
        },

        navigate: function(url) {
            var that = this;

            that._findView(url, function(view) {
                history.navigate(url, true);

                that.trigger("viewHide", { view: that.view });

                ViewSwitcher.replace(that.view, view);
                that._setCurrentView(view);
            });
        },

        setupAppLinks: function(element) {
            this.element
                .delegate(linkRolesSelector, support.mousedown, appLinkMouseUp)
                .delegate(buttonRolesSelector, support.mouseup, appLinkMouseUp)
                .delegate(linkRolesSelector + buttonRolesSelector, "click", appLinkClick);
        },

        scroller: function() {
            return this.view.content.data("kendoScroller");
        },

        _setCurrentView: function(view) {
            var that = this, params = history.url().params;
            that.view = view;
            view.params = params;
            that.trigger("viewShow", {view: view, params: params});
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
                firstChar = url.charAt(0),
                local = firstChar === "#",
                remote = firstChar === "/",
                element;

            element = that.element.find("[data-kendo-url='" + url + "']");

            if (!element[0] && !remote) {
                element = that.element.find(local ? url : "#" + url);
            }

            view = element.data("kendoView");

            if (view) {
                callback(view);
            } else if (element[0]) {
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
