// bootstrapper file for Kendo ThemeBuilder
(function() {
    var doc = document,
        kendo = window.kendo,
        UNDEFINED = "undefined",
        applicationRoot = (function() {
            var scripts = document.getElementsByTagName("script"),
                path = scripts[scripts.length-1].src.split('?')[0];

            return path.split("/").slice(0,-1).join("/") + "/";
        })(),
        FAST = "fast",
        // caution: variables below are generated during builds. update build/theme_builder.rb if you change them!
        KENDO_LOCATION = "http://cdn.kendostatic.com/2013.1.226/",
        JQUERY_LOCATION = "/kendo-demos/src/js/jquery.js",
        requiredJs = ["scripts/less.js", "scripts/themebuilder.js", "scripts/colorengine.js", "scripts/template.js"],
        requiredCss = ["styles/kendo.black.css", "styles/styles.css"],
        bootstrapCss = "styles/bootstrap.css",
        // </generated variables>
        KENDO_COMMON_CSS_LOCATION = KENDO_LOCATION + "styles/kendo.common.min.css",
        KENDO_ALL_LOCATION = KENDO_LOCATION + "js/kendo.all.min.js";

    function ThemeBuilderInterface() {
        var that = this,
            bootStyles = that.bootStyles;

        bootStyles = doc.createElement("link");
        bootStyles.setAttribute("rel", "stylesheet");
        bootStyles.setAttribute("href", applicationRoot + bootstrapCss);

        doc.getElementsByTagName("head")[0].appendChild(bootStyles);

        if (typeof jQuery == UNDEFINED || typeof kendo == UNDEFINED) {
            that._initError();
            return;
        }

        that.container = that._createWindow();

        that.container.fadeIn(FAST);

        that._createInterfaceFrame();

        if (that.iframe.themeBuilder) {
            that.open();
        }
    }

    ThemeBuilderInterface.prototype = {
        open: function() {
            if (typeof jQuery == UNDEFINED || typeof kendo == UNDEFINED) {
                this._initError();
                return;
            }

            jQuery(this.container).fadeIn(FAST).animate({ height: 480 }, FAST);
        },

        close: function() {
            jQuery(this.container).animate({ height: 0 }, FAST).fadeOut(FAST);
        },

        _createWindow: function () {
            var that = this,
                dialog = jQuery("<div id='ktb-wrap'><div id='ktb-close' /></div>"),
                start;

            dialog
                .css({ display: "none", height: 0 })
                .on("click", "#ktb-close", jQuery.proxy(that.close, that))
                .appendTo(doc.body);

            if (kendo.ui && kendo.ui.Draggable) {
                that.draggable = dialog.kendoDraggable({
                    dragstart: function(e) {
                        var initialPosition = dialog.position(),
                            scrollContainer = jQuery(window);

                        start = {
                            left: e.pageX - initialPosition.left + scrollContainer.scrollLeft(),
                            top: e.pageY - initialPosition.top + scrollContainer.scrollTop()
                        };

                        dialog.append("<div id='ktb-overlay'></div>");
                    },
                    drag: function(e) {
                        dialog.css({
                            left: e.pageX - start.left,
                            top: e.pageY - start.top
                        });
                    },
                    dragend: function() {
                        dialog.find("#ktb-overlay").remove();
                    }
                });
            }

            return dialog;
        },

        _createInterfaceFrame: function () {
            var iframe = jQuery('<iframe />', {
                    id: "ktb-interface",
                    src: 'javascript:"<html></html>"',
                    frameBorder: '0'
                }).appendTo(this.container || document.body)[0],
                wnd = iframe.contentWindow || iframe,
                doc = wnd.document || iframe.contentDocument,
                map = jQuery.map;

            function stylesheet(url) {
                return "<link rel='stylesheet' href='" + url + "' />";
            }

            function script(url) {
                 return "<script src='" + url + "'></script>";
            }

            doc.open();
            doc.write([
                "<!DOCTYPE html><html><head><meta charset='utf-8' />",
                 stylesheet(KENDO_COMMON_CSS_LOCATION),
                 map(requiredCss, function(styleSheetName) {
                     return stylesheet(applicationRoot + styleSheetName);
                 }).join(""),
                 "</head><body>",
                 script(JQUERY_LOCATION),
                 script(KENDO_ALL_LOCATION),
                 map(requiredJs, function(scriptName) {
                     return script(applicationRoot + scriptName);
                 }).join(""),
                 "</body></html>"
            ].join(""));

            doc.close();

            this.iframe = wnd;
        },

        // Shows error message on pages that we can not work with
        _initError: function() {
            var messageId = "ktb-message",
                messageWrap;

            if (!doc.getElementById(messageId)) {
                messageWrap = doc.createElement("div");
                messageWrap.id = messageId;
                messageWrap.innerHTML =
                    "<p>It seems there are no Kendo widgets on this page, so the Kendo themebuilder will be of no use. Please try running it elsewhere.</p>" +
                    "<p><button type='button' onclick='" +
                        "var msg = document.getElementById(\"" + messageId + "\");" +
                        "msg.parentNode.removeChild(msg);" +
                        "return false;'>Close</button>" +
                    "</p>";

                doc.body.appendChild(messageWrap);
            }
        }
    };

    window.kendoThemeBuilder = new ThemeBuilderInterface();
})();

