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
            KCONTENT = "k-dialog-content",
            KTITLELESS = "k-dialog-titleless",
            KDIALOGTITLE = ".k-dialog-title",
            KDIALOGTITLEBAR = ".k-window-titlebar",
            templates;

        function defined(x) {
            return (typeof x != "undefined");
        }

        var Dialog = Widget.extend({
            init: function(element, options) {
                var that = this,
                    wrapper;

                Widget.fn.init.call(that, element, options);

                element = that.element;
                that._createDialog();
                wrapper = that.wrapper = element.closest(KDIALOG);
                kendo.notify(that);
            },

            _createDialog: function() {
                var that = this,
                    content = that.element,
                    options = that.options,
                    titlebar = $(templates.titlebar(options)),
                    wrapper = $(templates.wrapper(options));

                content.addClass(KCONTENT);

                wrapper.appendTo("body");

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