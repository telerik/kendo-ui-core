(function(f, define) {
    define(["./kendo.core", "./kendo.popup"], f);
})(function() {

    var __meta__ = { // jshint ignore:line
        id: "dialog",
        name: "Dialog",
        category: "web", // suite
        description: "The dialog widget is a modal popup that brings information to the user.",
        depends: ["core", "popup"] // dependencies
    };

    // START WIDGET DEFINITION - only if it will have a single script file

    (function($, undefined) {
        var kendo = window.kendo,
            Widget = kendo.ui.Widget,
            template = kendo.template,
            KDIALOG = ".k-dialog",
            KCONTENT = "k-content",
            KTITLELESS = "k-dialog-titleless",
            KDIALOGTITLE = ".k-dialog-title",
            KDIALOGTITLEBAR = ".k-window-titlebar",
            KBUTTONGRUOP = ".k-dialog-buttongroup",
            KOVERLAY = ".k-overlay",
            VISIBLE = ":visible",
            ZINDEX = "zIndex",
            BODY = "body",
            templates;

        function defined(x) {
            return (typeof x != "undefined");
        }

        function constrain(value, low, high) {
            return Math.max(Math.min(parseInt(value, 10), high === Infinity ? high : parseInt(high, 10)), parseInt(low, 10));
        }

        var Dialog = Widget.extend({
            init: function(element, options) {
                var that = this,
                    wrapper;

                Widget.fn.init.call(that, element, options);
                options = that.options;
                element = that.element;
                that.appendTo = $(BODY);

                if (!defined(options.visible) || options.visible === null) {
                    options.visible = element.is(VISIBLE);
                }

                that._createDialog();

                wrapper = that.wrapper = element.closest(KDIALOG);

                that._dimensions();

                if (!that.options.visible) {
                    that.wrapper.hide();
                } else if (options.modal) {
                    that._overlay(wrapper.is(VISIBLE)).css({ opacity: 0.5 });
                }

                kendo.notify(that);
            },

            _dimensions: function() {
                var wrapper = this.wrapper,
                    options = this.options,
                    width = options.width,
                    height = options.height,
                    dimensions = ["minWidth", "minHeight", "maxWidth", "maxHeight"];

                for (var i = 0; i < dimensions.length; i++) {
                    var value = options[dimensions[i]];
                    if (value && value != Infinity) {
                        wrapper.css(dimensions[i], value);
                    }
                }

                this._elementMaxHeight();

                if (width) {
                    if (width.toString().indexOf("%") > 0) {
                        wrapper.width(width);
                    } else {
                        wrapper.width(constrain(width, options.minWidth, options.maxWidth));
                    }
                }

                if (height) {
                    if (height.toString().indexOf("%") > 0) {
                        wrapper.height(height);
                    } else {
                        wrapper.height(constrain(height, options.minHeight, options.maxHeight));
                    }
                }
            },

            _elementMaxHeight: function() {
                var that = this,
                    wrapper = that.wrapper,
                    options = that.options,
                    element = that.element,
                    maxHeight = options.maxHeight,
                    elementMaxHeight, actionbar, actionbarHeight;

                if (maxHeight != Infinity) {
                    actionbar = wrapper.children(KBUTTONGRUOP);
                    actionbarHeight = actionbar[0] && actionbar[0].offsetHeight || 0;
                    elementMaxHeight = parseInt(maxHeight, 10) - actionbarHeight -
                        parseInt(element.css("margin-top"), 10) -
                        parseInt(element.css("padding-top"), 10) -
                        parseInt(element.css("padding-bottom"), 10);

                    element.css({
                        maxHeight: elementMaxHeight,
                        overflow: "hidden"
                    });
                }

            },

            _overlay: function(visible) {
                var overlay = this.appendTo.children(KOVERLAY),
                    wrapper = this.wrapper;


                if (!overlay.length) {
                    overlay = $("<div class='k-overlay' />");
                }

                overlay
                    .insertBefore(wrapper[0])
                    .toggle(visible)
                    .css(ZINDEX, parseInt(wrapper.css(ZINDEX), 10) - 1);

                return overlay;
            },

            _createDialog: function() {
                var that = this,
                    content = that.element,
                    options = that.options,
                    titlebar = $(templates.titlebar(options)),
                    wrapper = $(templates.wrapper(options));

                content.addClass(KCONTENT);
                that.appendTo.append(wrapper);

                if (options.closable !== false) {
                    wrapper.append(templates.close);
                }

                if (options.title !== false) {
                    wrapper.append(titlebar);
                } else {
                    wrapper.addClass(KTITLELESS);
                }

                wrapper.append(content);

                if (options.content) {
                    kendo.destroy(content.children());
                    content.html(options.content);
                }

                if (options.actions.length) {
                    that._createActionbar(wrapper);
                }

                wrapper = content = null;
            },

            _createActionbar: function(wrapper) {
                var actionbar = $(templates.actionbar);
                this._addButtons(actionbar);
                wrapper.append(actionbar);
            },

            _addButtons: function(actionbar) {
                var actions = this.options.actions,
                    actionHtml;

                for (var i = 0; i < actions.length; i++) {
                    actionHtml = templates.action(actions[i]);
                    $(actionHtml).appendTo(actionbar);
                }
            },

            _destroy: function() {
                Widget.fn.destroy.call(this);
            },

            destroy: function() {
                this._destroy();
                this.wrapper.remove();
                this.wrapper = this.element = $();
            },

            title: function(html) {
                var that = this,
                    wrapper = that.wrapper,
                    options = that.options,
                    titlebar = wrapper.children(KDIALOGTITLEBAR),
                    title = titlebar.children(KDIALOGTITLE);

                if (!arguments.length) {
                    return title.html();
                }

                if (html === false) {
                    titlebar.remove();
                    wrapper.addClass(KTITLELESS);
                } else {
                    if (!titlebar.length) {
                        titlebar = $(templates.titlebar(options)).prependTo(wrapper);
                        title = titlebar.children(KDIALOGTITLE);
                        wrapper.removeClass(KTITLELESS);
                    }
                    title.html(html);
                }

                that.options.title = html;

                return that;
            },

            content: function(html) {
                var that = this,
                    content = that.wrapper.children("." + KCONTENT);

                if (!defined(html)) {
                    return content.html();
                }

                kendo.destroy(content.children());
                content.html(html);

                that.options.content = html;

                return that;
            },

            events: [
            ],

            options: {
                name: "Dialog",
                title: "",
                actions: [],
                modal: true,
                minWidth: 90,
                minHeight: 150,
                maxWidth: Infinity,
                maxHeight: Infinity,
                closable: true
            }
        });

        templates = {
            wrapper: template("<div class='k-widget k-dialog k-window' />"),
            action: template("<li class='k-button# if (data.primary) { # k-primary# } #'>#= text #</li>"),
            titlebar: template(
                "<div class='k-window-titlebar k-header'>" +
                  "<span class='k-dialog-title'>#= title #</span>" +
                "</div>"
            ),
            actionbar: "<ul class='k-dialog-buttongroup' />",
            close: "<span class='k-i-close'>Close</span>",
            overlay: "<div class='k-overlay' />"
        };

        kendo.ui.plugin(Dialog);

    })(window.kendo.jQuery);

    return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f) { f(); });
