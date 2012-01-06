(function($, undefined) {
    var kendo = window.kendo,
        mobile = kendo.mobile,
        os = kendo.support.mobileOS,
        attr = kendo.attr,
        Class = kendo.Class,
        roleSelector = kendo.roleSelector;

    // TODO: refactor this to a singleton
    function hideAddressBarOnBack() {
        if (os.android) {
            window.scrollBy(0,56);
        }
    }

    var View = Class.extend({
        init: function(element, options) {
            var that = this,
                contentSelector = roleSelector("content");

            that.layout = options.layout;
            that.element = element.data("kendoView", that).addClass("km-view");

            that.header = element.find(roleSelector("header")).addClass("km-header");
            that.footer = element.find(roleSelector("footer")).addClass("km-footer");
            if (!element.has(contentSelector)[0]) {
              element.wrapInner("<div " + attr("role") + '="content"></div>');
            }

            that.content = element.find(roleSelector("content"))
                                .addClass("km-content")
                                .kendoMobileScroller({useOnDesktop: true});

            that.title = element.data(kendo.ns + "title");

            if (that.layout) {
                that.layout.setup(that);
            } else {
                that.element.prepend(that.header).append(that.footer);
            }
        },

        onHideStart: function() {
            var that = this;
            if (that.layout) {
                that.layout.detach(that);
            }
        },

        onShowStart: function () {
            var that = this;
            that.element.css("display", "");

            if (that.layout) {
                that.layout.attach(that);
            }
        }
    });

    ViewSwitcher = Class.extend({
        init: function (application) {
            this.application = application;
        },

        replace: function(previous, view) {
            var that = this,
                callback = function() { previous.element.hide(); },
                animationType;

            that.back = view.nextView === previous && JSON.stringify(view.params) === JSON.stringify(kendo.history.url().params);

            animationType = that.application.dataOrDefault((that.back ? previous : view).element, "transition");

            that.parallax = animationType === "slide";

            previous.onHideStart();
            view.onShowStart();

            if (that.back && !that.parallax) {
                view.element.css("z-index", 0);
                previous.element.css("z-index", 1);
            } else {
                view.element.css("z-index", 1);
                previous.element.css("z-index", 0);
            }

            if (that.back) {
                hideAddressBarOnBack();
            }

            that.switchWith(previous.footer, view.footer);
            that.switchWith(previous.header, view.header);
            that.contents(previous, view).kendoAnimateTo(that.contents(view, previous), {effects: animationType, reverse: that.back, complete: callback});

            if (!that.back) {
                previous.nextView = view;
            }
        },

        contents: function(source, destination) {
            var contents;

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
            if (source[0] && destination[0] && source[0] != destination[0] && this.parallax) {
                source.kendoAnimateTo(destination, {effects: "fade"});
            }
        }
    });

    Layout = Class.extend({
        init: function(element) {
            var that = this;
            that.header = element.find(roleSelector("header")).addClass("km-header");
            that.footer = element.find(roleSelector("footer")).addClass("km-footer");
            that.elements = that.header.add(that.footer);
            kendo.mobile.enhance(element);
            element.detach();
        },

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
        },

        attach: function(view) {
            var that = this;
            if (view.header === that.header) {
                that.header.detach();
                view.element.find(roleSelector("header")).remove();
                view.element.prepend(that.header);
            }

            if (view.footer === that.footer) {
                that.footer.detach();
                view.element.find(roleSelector("footer")).remove();
                view.element.append(that.footer);
            }
        }
    });

    mobile.Layout = Layout;
    mobile.View = View;
    mobile.ViewSwitcher = ViewSwitcher;
})(jQuery);
