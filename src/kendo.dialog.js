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
            templates;

        var Dialog = Widget.extend({
            init: function(element, options) {
                var that = this,
                    wrapper;

                Widget.fn.init.call(that, element, options);
                options = that.options;
                element = that.element;

                that._createDialog();

                wrapper = that.wrapper = element.closest(KDIALOG);
                kendo.notify(that);
            },

            _createDialog: function() {
                var that = this,
                    contentHtml = this.element,
                    options = that.options,
                    titlebar = $(templates.titlebar(options)),
                    actionbar = $(templates.actionbar(options)),
                    wrapper = $(templates.wrapper(options));

                contentHtml.addClass(KCONTENT);

                wrapper
                    .appendTo("body")
                    .append(titlebar)
                    .append(contentHtml)
                    .append(actionbar);

                wrapper = contentHtml = null;
            },

            _destroy: function() {
                Widget.fn.destroy.call(this);
            },

            destroy: function() {
                this._destroy();
                this.wrapper.remove();
                this.wrapper = this.element = $();
            },

            events: [
            ],

            options: {
                name: "Dialog"
            }
        });

        templates = {
            wrapper: template("<div class='k-widget k-dialog k-window' />"),
            action: template("<li class='k-button'>Button 1</li>"),
            titlebar: template(
                "<div class='k-window-titlebar k-header'>" +
                  "<span class='k-dialog-title'>Dialog Title</span>" +
                "</div>"
            ),
            actionbar: template("<ul class='k-dialog-buttongroup' />"),
            overlay: "<div class='k-overlay' />"
        };

        kendo.ui.plugin(Dialog);

    })(window.kendo.jQuery);

    return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f) { f(); });