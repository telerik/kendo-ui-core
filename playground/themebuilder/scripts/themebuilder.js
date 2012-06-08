var application = new kendo.mobile.Application("#device"), oldColor,
    cursorSvg = 'url(\'data:image/svg+xml;utf-8,<svg xmlns="http:%2F%2Fwww.w3.org%2F2000%2Fsvg" width="32" height="32"><path d="M 0.89285714%2C31.196429 C 10.357143%2C5.080357 17.406299%2C-5.6022602 27.946429%2C3.8749999 43.883929%2C18.205357 0.89285714%2C31.196429 0.89285714%2C31.196429 z" style="fill:%23f984ef;stroke:%23000000;stroke-width:1px;" %2F><%2Fsvg>\') 0 32, auto';

$(".drop").kendoDraggable({
    dragstart: function (e) {
        $(document.documentElement).css("cursor", cursorSvg.replace("%23f984ef", this.element.css("background-color")));
    },
    dragend: function () {
        $(document.documentElement).css("cursor", 'default');
    }
});

function initTargets() {
    $(".km-navbar:visible, .km-tabstrip:visible, .km-button:visible, .km-content:visible, .km-switch-background:visible").kendoDropTarget({
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
