var counter = 1, oldColor, applications = {},
    cursorSvg = 'url(\'data:image/svg+xml;utf-8,<svg xmlns="http:%2F%2Fwww.w3.org%2F2000%2Fsvg" width="32" height="32"><path d="M 0.89285714%2C31.196429 C 10.357143%2C5.080357 17.406299%2C-5.6022602 27.946429%2C3.8749999 43.883929%2C18.205357 0.89285714%2C31.196429 0.89285714%2C31.196429 z" style="fill:%23f984ef;stroke:%23000000;stroke-width:1px;" %2F><%2Fsvg>\') 0 32, auto',
    selector = ".km-navbar:visible, .km-tabstrip:visible, .km-button:visible, .km-content:visible, .km-switch-background:visible, .km-icon:visible",
    devices = [ "ios", "android", "blackberry", "meego" ], clones = $.extend([], devices),
    iOSStyleGrid = {
        view: {
            selector: ".km-view",
            whitelist: [],
            children: {
                tabstrip: {
                    selector: ".km-tabstrip",
                    whitelist: [ "background-color", "border-color", "border-width", "border-style" ],
                    children: {
                        button: {
                            selector: ".km-button",
                            whitelist: [ "background-color", "border-color", "border-width", "border-style" ],
                            children: {
                                icon: {
                                    selector: ".km-icon",
                                    whitelist: [ "background-color", "background-image" ]
                                },
                                text: {
                                    selector: ".km-icon",
                                    whitelist: [ "background-color", "background-image" ]
                                }
                            }
                        }
                    }
                }
            }
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

console.log(devices);
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

function initTargets() {
    $(selector).kendoDropTarget({
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
