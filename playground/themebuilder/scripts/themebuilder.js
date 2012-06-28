var oldColor, devices = [ "ios", "android", "blackberry", "meego" ],
    cursorSvg = 'url(\'data:image/svg+xml;utf-8,<svg xmlns="http:%2F%2Fwww.w3.org%2F2000%2Fsvg" width="32" height="32"><path d="M 0.89285714%2C31.196429 C 10.357143%2C5.080357 17.406299%2C-5.6022602 27.946429%2C3.8749999 43.883929%2C18.205357 0.89285714%2C31.196429 0.89285714%2C31.196429 z" style="fill:%23f984ef;stroke:%23000000;stroke-width:1px;" %2F><%2Fsvg>\') 0 32, auto';

(function ($, undefined) {

    var ui = kendo.ui,
        Widget = ui.Widget,
        applications = {},
        counter = 1,
        clones = $.extend([], devices),
        widgetList = {
            icon: {
                name: "Icon",
                selector: ".km-icon",
                whitelist: [ "background-color", "background-image", "width", "height" ]
            },
            text: {
                name: "Text",
                selector: ".km-text",
                whitelist: [ "color", "font-family", "font-style", "font-weight", "font-size" ]
            },
            grouptitle: {
                name: "Group Title",
                selector: ".km-group-title",
                whitelist: [ "color", "font-family", "font-style", "font-weight", "font-size" ]
            },
            viewtitle: {
                name: "View Title",
                selector: ".km-view-title",
                whitelist: [ "color", "font-family", "font-style", "font-weight", "font-size" ]
            },
            listitem: {
                name: "List Item",
                selector: "> li",
                whitelist: [ "background-color", "background-image", "border-radius" ]
            },
            scrollitem: {
                name: "ScrollView Item",
                selector: "> *",
                whitelist: [ "width", "height" ]
            },
            switchback: {
                name: "Switch Background",
                selector: ".km-switch-background",
                whitelist: [ "background-color", "background-image" ]
            },
            switchhandle: {
                name: "Switch Handle",
                selector: ".km-switch-handle",
                whitelist: [ "width", "height" ]
            },
            switchon: {
                name: "Switch On Label",
                selector: ".km-switch-label-on",
                whitelist: [ "left", "width", "height", "color", "text-shadow", "font-family", "font-style", "font-weight", "font-size" ]
            },
            switchoff: {
                name: "Switch Off Label",
                selector: ".km-switch-label-off",
                whitelist: [ "left", "width", "height", "color", "text-shadow", "font-family", "font-style", "font-weight", "font-size" ]
            },
            switch: {
                name: "Switch",
                selector: ".km-switch",
                whitelist: [ "width", "height" ],
                children: [ "switchback", "switchhandle", "switchon", "switchoff" ]
            },
            buttongroup: {
                selector: ".km-button-group",
                whitelist: [ "box-shadow", "border-radius" ],
                children: [ "button" ]
            },
            scrollview: {
                name: "ScrollView",
                selector: ".km-scrollview",
                whitelist: [ "background-color", "background-image", "box-shadow" ],
                children: [ "scrollitem" ]
            },
            button: {
                name: "Button",
                selector: ".km-button",
                whitelist: [ "background-color", "border-color", "border-width" ],
                children: [ "icon", "text" ]
            },
            navbar: {
                name: "NavBar",
                selector: ".km-navbar",
                whitelist: [ "background-color", "background-image" ],
                children: [ "button", "viewtitle" ]
            },
            listview: {
                name: "ListView",
                selector: ".km-list",
                whitelist: [ "background-color" ],
                children: [ "icon", "button", "switch", "listitem", "grouptitle" ]
            },
            content: {
                name: "View Content",
                selector: ".km-content",
                whitelist: [ "background-color", "background-image" ],
                children: [ "button", "listview", "scrollview", "switch", "buttongroup" ]
            },
            tabstrip: {
                name: "TabStrip",
                selector: ".km-tabstrip",
                whitelist: [ "background-color", "border-color", "border-width", "border-style" ],
                children: [ "button" ]
            },
            view: {
                name: "View",
                selector: ".km-view",
                whitelist: [ "background-color" ],
                children: [ "navbar", "content", "tabstrip", "loader" ]
            },
            ios: {
                selector: ".km-ios"
            },
            android: {
                selector: ".km-android"
            },
            blackberry: {
                selector: ".km-blackberry"
            },
            meego: {
                selector: ".km-meego"
            }
        },
        ColorPicker = ui.ComboBox.extend({
            init: function(element, options) {
                var that = this;

                if (options && options.change) {
                    options.colorPickerChange = options.change;
                    delete options.change;
                }

                ui.ComboBox.fn.init.call(that, element, options);

                that.list.width(210);
                that.popup.options.origin = "bottom right";
                that.popup.options.position = "top right";

                that._updateColorPreview();

                that.bind("change", $.proxy(that._colorChange, that));

                that.colorValue = new Color();

                that.wrapper.addClass("k-colorpicker")
                    .find(".k-colorpicker").removeClass(".k-colorpicker");
            },

            options: {
                name: "ColorPicker",
                autoBind: false,
                dataTextField: "text",
                dataValueField: "value",
                template: "<span style='background-color: ${ data.value }' "+
                                "class='k-icon k-color-preview' " +
                                "title='${ data.text }'></span> ",
                dataSource: new kendo.data.DataSource({
                    data: $.map("#c00000,#ff0000,#ffc000,#ffff00,#92d050,#00b050,#00b0f0,#0070c0,#002060,#7030a0,#ffffff,#e3e3e3,#c4c4c4,#a8a8a8,#8a8a8a,#6e6e6e,#525252,#363636,#1a1a1a,#000000".split(","), function(x) {
                        return { text: x, value: x };
                    })
                })
            },

            _colorChange: function(e) {
                var that = this,
                    changeHandler = that.options.colorPickerChange,
                    value = that._updateColorPreview();

                that.colorValue.set(value);
                that.value(that.colorValue.get());

                if (changeHandler) {
                    changeHandler.call(that, {
                        name: that.element.attr("id"),
                        value: that.element.val()
                    });
                }
            },

            value: function(value) {

                var result = ui.ComboBox.fn.value.call(this, value);

                if (value) {
                    this._updateColorPreview(value);
                }

                return result;
            },

            _updateColorPreview: function(value) {
                return $(this.wrapper).find(".k-i-arrow-s").css("backgroundColor", value || this.value()).css("backgroundColor");
            }
        });

    kendo.ui.plugin(ColorPicker);

    $(".ktb-colorpicker").kendoColorPicker({
//        change: changeHandler
    });

    for (var idx in widgetList) {
        var children = widgetList[idx].children;
        if (children) {
            children.forEach(function (name) {
                var item = widgetList[name];
                if (item) { item.parents = [ idx ].concat(item.parents || []); }
            });
        }
    }

    var StyleEngine = Widget.extend({
        init: function (element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);
            element = that.element;

            that.object = {};

            that.styleElement = $("<style scoped></style>").insertBefore(element);
        },
        options: {
            name: "StyleEngine"
        },
        populate: function() {

        },
        update: function(element, styles) {
            element = $(element);
            var that = this, style,
                output = "", widget;

            $(element.parentsUntil(".km-root").add(element).get()).each(function (idx, value) {
                widget = that._findWidgetClass(value.className);
                if (widget) {
                    output += widget.selector + " ";
                }
            });
            output = output.substr(0, output.length-1);

            this.object[output] = styles;

            style = $("<style scoped>\n" + that.getCSS() + "</style>").insertAfter(that.styleElement);
            that.styleElement.remove();
            that.styleElement = style;
        },
        getCSS: function () {
            var object = this.object, output = "";

            for (var i in object) {
                output += i + " {\n";
                for (var j in object[i]) {
                    output += "    " + j + ": " + object[i][j] + ";\n";
                }
                output += "}\n";
            }

            return output;
        },
        _findWidgetClass: function(className) {
            for(var idx in widgetList) {
                if (new RegExp(widgetList[idx].selector.substr(1).replace("*", "\\*")+"(\\s|$)").test(className)) {
                    return $.extend( { widget: idx },  widgetList[idx] );
                }
            }

            return false;
        }
    });

    kendo.ui.plugin(StyleEngine);

    window.getPropertySelector = function (property) {
        var output = "", widget;

        for(var idx in widgetList) {
            widget = widgetList[idx];
            if (widget.whitelist && widget.whitelist.indexOf(property) != -1 && widget.selector[0] != ">") {
                output += widget.selector + ":visible,";
            }
        }
        return output.substring(0, output.length-1);
    };

    // Override Kendo History to avoid URL breaks and bad refresh
    kendo.history.navigate = function(to, silent) {
        var that = this;

        if (to === '#:back') {
            return;
        }

        to = to.replace(/^#*/, '');

        if (that.current === to || that.current === decodeURIComponent(to)) {
            return;
        }

        if (that._pushState) {
            history.pushState({}, document.title, that._makePushStateUrl(to));
            that.current = to;
        }

        if (!silent) {
            that.trigger("change", {url: that.current});
        }
    };

    function replaceIDs() {
        var id = this.id;
        this.id += counter;
        $(this).closest(".device").find("[href^=#" + id + "]").attr("href", "#" + this.id);
    }

    function replaceLayouts() {
        var that = $(this),
            newId = that.attr("data-id") + counter++;

        that.attr("data-id", newId);
        that.closest(".device").find("[data-layout]").attr("data-layout", newId);
    }

    clones.shift();
    $.each(clones.reverse(), function () {
        $("#iosDevice")
            .clone(true)
            .find("[id]") // Make sure there are no duplicate IDs.
            .each(replaceIDs)
            .end()
            .find("[data-id]")
            .each(replaceLayouts)
            .end()
            .attr("id", this.toString() + "Device")
            .insertAfter("#iosDevice");
    });

    $.each(devices, function () {
        var that = this.toString(),
            deviceId = "#" + that + "Device";
        applications[that] = new kendo.mobile.Application(deviceId, { platform: that });
        $(deviceId).kendoStyleEngine();
    });

    $(".drop").kendoDraggable({
        dragstart: function (e) {
            $(document.documentElement).css("cursor", cursorSvg.replace("%23f984ef", this.element.css("background-color")));
        },
        dragend: function () {
            $(document.documentElement).css("cursor", 'default');
        }
    });

})(jQuery);

function initTargets() {
    var property = "background-color",
        color = "transparent",
        defaultCSS = { cursor: "default" };

    defaultCSS[property] = "";

    $(getPropertySelector(property)).kendoDropTarget({
        dragenter: function (e) {
            color = new Color(e.draggable.element.css(property)).get();

            var css = { cursor: cursorSvg.replace("%23f984ef", color) };

            css[property] = color;
            this.element.css(css);
        },
        dragleave: function () {
            this.element.css(defaultCSS);
        },
        drop: function (e) {
            this.element.css(defaultCSS);
            this.element.parents(".device").data("kendoStyleEngine").update(this.element, { "background-color": color });
        }
    });
}

$("#getStyles").click(function () {
    var output = "";

    $.each(devices, function () {
        var that = this.toString();
        if ($("#" + that + "box")[0].checked) {
            output += $("#" + that + "Device").data("kendoStyleEngine").getCSS();
        }
    });

    alert(output);
});
