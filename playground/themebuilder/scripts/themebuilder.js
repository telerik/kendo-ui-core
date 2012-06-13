var counter = 1, oldColor, applications = {},
    cursorSvg = 'url(\'data:image/svg+xml;utf-8,<svg xmlns="http:%2F%2Fwww.w3.org%2F2000%2Fsvg" width="32" height="32"><path d="M 0.89285714%2C31.196429 C 10.357143%2C5.080357 17.406299%2C-5.6022602 27.946429%2C3.8749999 43.883929%2C18.205357 0.89285714%2C31.196429 0.89285714%2C31.196429 z" style="fill:%23f984ef;stroke:%23000000;stroke-width:1px;" %2F><%2Fsvg>\') 0 32, auto',
    selector = ".km-navbar:visible, .km-tabstrip:visible, .km-button:visible, .km-content:visible, .km-switch-background:visible, .km-icon:visible",
    devices = [ "ios", "android", "blackberry", "meego" ], clones = $.extend([], devices),
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
        }
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
    var that = this.toString();
    applications[that] = new kendo.mobile.Application("#" + that + "Device", { platform: that });
});

$(".drop").kendoDraggable({
    dragstart: function (e) {
        $(document.documentElement).css("cursor", cursorSvg.replace("%23f984ef", this.element.css("background-color")));
    },
    dragend: function () {
        $(document.documentElement).css("cursor", 'default');
    }
});

function updateStyleObject(styles) {

}

function getPropertySelector(property) {
    var output = "";

    for(var idx in widgetList) {
        if (widgetList[idx].whitelist.indexOf(property) != -1 && widgetList[idx].selector[0] != ">") {
            output += widgetList[idx].selector + ":visible,";
        }
    }
    return output.substring(0, output.length-1);
}

function initTargets() {
    $(getPropertySelector("background-color")).kendoDropTarget({
        dragenter: function (e) {
            oldColor = this.element.css("background-color");
            var color = e.draggable.element.css("background-color");

            this.element.css({
                cursor: cursorSvg.replace("%23f984ef", color),
                backgroundColor: color
            });
        },
        dragleave: function (e) {
            this.element.css({
                cursor: "default",
                backgroundColor: oldColor
            });
        },
        drop: function (e) {
            this.element.css({ cursor: "default" });
            this.element.css("background-color", e.draggable.element.css("background-color"));
        }
    });
}
