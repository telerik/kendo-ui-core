(function ($, undefined) {

    var devices = [ "ios", "android", "blackberry", "meego" ], CtrlDown = false, contextMenu,
        deviceClasses = $.map(devices, function (value) { return ".km-" + value; }),
        extend = $.extend,
        colors = [ "color", "background-color", "border-color" ],
        gradients = [ "background-image" ],
        patterns = [ "background-image" ],
        tools = {
            color: new Color(),
            gradient: new Gradient(),
            pattern: {
                get: function () { return this.result; },
                set: function (result) { this.result = result; return this; }
            }
        },
        engineTool = null,
        backgroundSplitRegExp = /\s*,\s*(?=-|url)/i,
        properties = colors.concat(gradients, patterns),
        TRANSITION = kendo.support.transitions.css + "transition",
        fillSvg = 'url(\'data:image/svg+xml;utf-8,<svg xmlns="http:%2F%2Fwww.w3.org%2F2000%2Fsvg" width="28" height="38"><linearGradient id="shadow" gradientUnits="userSpaceOnUse" x1="14" y1="25" x2="14" y2="0"><stop offset="0" style="stop-color:rgba(0,0,0,.3)"%2F><%2FlinearGradient><path fill="url(%23shadow)" d="M26.667,15.236c0-6.996-5.671-12.667-12.667-12.667c-6.995,0-12.667,5.672-12.667,12.667c0,4.78,2.651,8.938,6.562,11.097 C10.695,31.772,14,36.95,14,36.95s3.305-5.178,6.105-10.617C24.017,24.175,26.667,20.017,26.667,15.236z"%2F><path fill="%23FFF" d="M26.667,13.819c0-6.996-5.671-12.667-12.667-12.667c-6.995,0-12.667,5.672-12.667,12.667 c0,4.78,2.651,8.938,6.562,11.097C10.695,30.355,14,35.533,14,35.533s3.305-5.178,6.105-10.617 C24.017,22.758,26.667,18.6,26.667,13.819z"%2F><linearGradient id="ID" gradientUnits="userSpaceOnUse" x1="50%" y1="0" x2="50%" y2="28"><stop offset="0" style="stop-color:%23f984ef"%2F><%2FlinearGradient><circle fill="url(%23sq)" cx="14" cy="14" r="11"%2F><pattern id="sq" patternUnits="userSpaceOnUse" x="0" y="0" width="14" height="14" patternTransform="rotate(45)"><rect fill="%23888" x="0" y="0" width="14" height="14"%2f><rect fill="%23666" x="0" y="0" width="7" height="7"%2f><rect fill="%23666" x="7" y="7" width="7" height="7"%2f></pattern><circle fill="url(%23ID)" cx="14" cy="14" r="11"%2F><path fill="rgba(0,0,0,.3)" d="M14,4.403c5.616,0,10.189,4.413,10.473,9.958c0.009-0.18,0.027-0.359,0.027-0.542c0-5.799-4.701-10.5-10.5-10.5 S3.5,8.021,3.5,13.82c0,0.183,0.018,0.361,0.027,0.542C3.811,8.816,8.384,4.403,14,4.403z"%2F><linearGradient id="gr1" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="100%" y2="100%"><stop offset=".25" stop-color="%23666"%2F><stop offset=".25" stop-opacity="0"%2F><%2FlinearGradient><linearGradient id="gr2" gradientUnits="userSpaceOnUse" x1="0" y1="100%" x2="0" y2="100%"><stop offset=".25" stop-color="%23666"%2F><stop offset=".25" stop-opacity="0"%2F><%2FlinearGradient><linearGradient id="gr3" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="100%" y2="100%"><stop offset=".75" stop-opacity="0"%2F><stop offset=".75" stop-color="%23666"%2F><%2FlinearGradient><linearGradient id="gr4" gradientUnits="userSpaceOnUse" x1="0" y1="100%" x2="0" y2="100%"><stop offset=".75" stop-opacity="0"%2F><stop offset=".75" stop-color="%23666"%2F><%2FlinearGradient><%2Fsvg>\')',
        cursorSvg = fillSvg + ' 14 38, crosshair',
        defaultStop = '<linearGradient id="ID" gradientUnits="userSpaceOnUse" x1="50%" y1="0" x2="50%" y2="28"><stop offset="0" style="stop-color:%23f984ef"%2F><%2FlinearGradient>',
        ui = kendo.ui,
        Widget = ui.Widget,
        applications = {},
        counter = 1,
        clones = extend([], devices),
        widgetList = {
            activeicon: {
                name: "Active Icon",
                selector: ".km-state-active span.km-icon",
                whitelist: [ "background-color", "background-image" ]
            },
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
            grouptitleinset: {
                name: "Group Title Inset",
                selector: ".km-listgroupinset .km-group-title",
                whitelist: [ "color", "background-color", "background-image", "font-family", "font-style", "font-weight", "font-size" ]
            },
            grouptitle: {
                name: "Group Title",
                selector: ".km-listgroup .km-group-title",
                whitelist: [ "color", "background-color", "background-image", "font-family", "font-style", "font-weight", "font-size" ]
            },
            viewtitle: {
                name: "View Title",
                selector: ".km-view-title",
                whitelist: [ "color", "font-family", "font-style", "font-weight", "font-size" ]
            },
            listitem: {
                name: "List Item",
                selector: ".km-list > li",
                whitelist: [ "background-color", "background-image", "border-radius", "color", "border-color" ]
            },
            scrollitem: {
                name: "ScrollView Item",
                selector: ".km-scrollview > div > *",
                whitelist: [ "width", "height" ]
            },
            switchback: {
                name: "Switch Background",
                selector: ".km-switch-background",
                whitelist: [ "background-color", "background-image" ]
            },
            switchcontainer: {
                name: "Switch Container",
                selector: ".km-switch-container",
                whitelist: [ "background-color", "background-image" ]
            },
            switchhandleon: {
                name: "Active Switch Handle",
                selector: ".km-switch-on .km-switch-handle",
                whitelist: [ "border-color" ]
            },
            switchhandle: {
                name: "Switch Handle",
                selector: ".km-switch-handle",
                whitelist: [ "width", "height","border-color" ]
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
            switcher: {
                name: "Switch",
                selector: ".km-switch",
                activeSelector: ".km-switch-on",
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
            activebutton: {
                name: "Active Button",
                selector: ".km-button.km-state-active",
                activeSelector: ".km-state-active",
                whitelist: [ "background-color", "background-image", "border-color" ]
            },
            button: {
                name: "Button",
                selector: ".km-button",
                activeSelector: ".km-state-active",
                whitelist: [ "background-color", "background-image", "border-color" ],
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
                whitelist: [ "border-color" ],
                children: [ "icon", "button", "switch", "listitem", "grouptitle" ]
            },
            content: {
                name: "View Content",
                selector: ".km-content",
                whitelist: [ "color", "background-color", "background-image" ],
                children: [ "button", "listview", "scrollview", "switch", "buttongroup" ]
            },
            tabstrip: {
                name: "TabStrip",
                selector: ".km-tabstrip",
                whitelist: [ "background-color", "background-image", "border-color", "border-width", "border-style" ],
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
        pickers = {
            color: $(".recent-colors").kendoHSLPicker({ filter: ".drop" }).data("kendoHSLPicker"),
            gradient: $(".recent-gradients").kendoGradientPicker({ filter: ".drop" }).data("kendoGradientPicker"),
            pattern: $(".recent-patterns").kendoPatternPicker({ filter: ".drop" }).data("kendoPatternPicker")
        },

        defaults = {
            color: [ "#c5007c", "#6300a5", "#0010a5", "#0064b5", "#00a3c7", "#0fad00", "#8cc700", "#ff0", "#fec500", "#ff9400", "#f60", "#f00",
                              "none", "#fff", "#e5e5e5", "#ccc", "#b2b2b2", "#999", "#7f7f7f", "#666", "#4c4c4c", "#333", "#191919", "#000" ],

            gradient: [
                "linear-gradient(top, #fff, rgba(255,255,255,.2) 50%, rgba(255,255,255,.3) 50%, rgba(255,255,255,.7))",
                "linear-gradient(top, rgba(255,255,255,.2), rgba(255,255,255,.4) 50%, rgba(255,255,255,.5) 50%, rgba(255,255,255,.8))",
                "linear-gradient(top, rgba(255,255,255,.2), rgba(255,255,255,.35) 50%, rgba(255,255,255,.45) 50%, rgba(255,255,255,.4))",
                "linear-gradient(top, rgba(255,255,255,.2), rgba(255,255,255,.4) 50%, rgba(255,255,255,.45) 50%, rgba(255,255,255,.4))",
                "linear-gradient(top, rgba(255,255,255,.6), rgba(255,255,255,.35) 50%, rgba(255,255,255,.4) 50%, rgba(255,255,255,.6))",
                "linear-gradient(top, rgba(255,255,255,.4), rgba(255,255,255,.6))",
                "linear-gradient(top, rgba(255,255,255,.2), rgba(255,255,255,.8))",
                "linear-gradient(top, rgba(255,255,255,.35), rgba(255,255,255,.65) 50%, rgba(255,255,255,.35))",
                "linear-gradient(top, rgba(255,255,255,.5), rgba(255,255,255,.2) 50%, rgba(255,255,255,.5))",
                "linear-gradient(top, rgba(255,255,255,.5), rgba(255,255,255,.2) 73%, rgba(255,255,255,.5))",
                "linear-gradient(top, rgba(255,255,255,.2), rgba(255,255,255,.5) 73%, rgba(255,255,255,.2))",
                "linear-gradient(top, rgba(255,255,255,.2), rgba(255,255,255,.35) 12%, rgba(255,255,255,.65) 40%, rgba(255,255,255,.4) 80%, rgba(255,255,255,.6))",

                "linear-gradient(top, #000, rgba(0,0,0,.2) 50%, rgba(0,0,0,.3) 50%, rgba(0,0,0,.7))",
                "linear-gradient(top, rgba(0,0,0,.2), rgba(0,0,0,.4) 50%, rgba(0,0,0,.5) 50%, rgba(0,0,0,.8))",
                "linear-gradient(top, rgba(0,0,0,.2), rgba(0,0,0,.35) 50%, rgba(0,0,0,.45) 50%, rgba(0,0,0,.4))",
                "linear-gradient(top, rgba(0,0,0,.2), rgba(0,0,0,.4) 50%, rgba(0,0,0,.45) 50%, rgba(0,0,0,.4))",
                "linear-gradient(top, rgba(0,0,0,.6), rgba(0,0,0,.35) 50%, rgba(0,0,0,.4) 50%, rgba(0,0,0,.6))",
                "linear-gradient(top, rgba(0,0,0,.4), rgba(0,0,0,.6))",
                "linear-gradient(top, rgba(0,0,0,.2), rgba(0,0,0,.8))",
                "linear-gradient(top, rgba(0,0,0,.35), rgba(0,0,0,.65) 50%, rgba(0,0,0,.35))",
                "linear-gradient(top, rgba(0,0,0,.5), rgba(0,0,0,.2) 50%, rgba(0,0,0,.5))",
                "linear-gradient(top, rgba(0,0,0,.5), rgba(0,0,0,.2) 73%, rgba(0,0,0,.5))",
                "linear-gradient(top, rgba(0,0,0,.2), rgba(0,0,0,.5) 73%, rgba(0,0,0,.2))",
                "linear-gradient(top, rgba(0,0,0,.2), rgba(0,0,0,.35) 12%, rgba(0,0,0,.65) 40%, rgba(0,0,0,.4) 80%, rgba(0,0,0,.6))"
            ],

            pattern: [
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAUCAMAAACK2/weAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjAzNTgyREJFQjYxMTFFMUJENzREQ0I1ODI3Mzg5ODIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjAzNTgyRENFQjYxMTFFMUJENzREQ0I1ODI3Mzg5ODIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MDM1ODJEOUVCNjExMUUxQkQ3NERDQjU4MjczODk4MiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2MDM1ODJEQUVCNjExMUUxQkQ3NERDQjU4MjczODk4MiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpzA0eIAAABvUExURS0tLTIyMikpKSoqKjExMSQkJDAwMCYmJicnJyEhITY2NgQEBDQ0NCwsLAAAADk5OQICAh8fHzg4OGFhYTs7OxwcHBoaGiIiIkNDQzMzM0RERBMTE0FBQRsbGx4eHiMjIz4+PgMDAz09PQUFBRQUFJVANLQAAADMSURBVHjaFI5XYsNAEEKZul2yulviFN//jF59AjMPcBBJDhYDqlXC7VX+d+HMCZQUdBmGS9av1ujhDC7DUJiUg7II4r2Ue5I4qhMD8W9ZfuSGwHULERRlDtS5YW3S5ThtLjPDPGCEUVwBsfH0Ypc8AXqYaGVCDnBW4R1jDf1MNhBN3+X37XVF9d5v+dwGAqxXmWznNkfsTE8z67WUa+IM1VTd6LksT7S9s9goZelP3oCUOgDKisRNwNqqILs/qPUgBzYcmXWdMtJHgAEAtEwJP3KsJroAAAAASUVORK5CYII=)",
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE8AAABPCAMAAACd6mi0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6REJFQzNFRUJFQjVGMTFFMTg3RjE4ODgwMkI1RDIxOTMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6REJFQzNFRUNFQjVGMTFFMTg3RjE4ODgwMkI1RDIxOTMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEQkVDM0VFOUVCNUYxMUUxODdGMTg4ODAyQjVEMjE5MyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEQkVDM0VFQUVCNUYxMUUxODdGMTg4ODAyQjVEMjE5MyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsvLy5gAAABLUExURQBcmg9koQdh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)",
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE8AAABPCAMAAACd6mi0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzVCQkU0RTJFQjYwMTFFMTkyOTY5QzExRUI1QjZEMjQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzVCQkU0RTNFQjYwMTFFMTkyOTY5QzExRUI1QjZEMjQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNUJCRTRFMEVCNjAxMUUxOTI5NjlDMTFFQjVCNkQyNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNUJCRTRFMUVCNjAxMUUxOTI5NjlDMTFFQjVCNkQyNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtlrK+MAAAClUExURVMmAjsUAFcq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)",
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE8AAABPCAMAAACd6mi0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTMyNzg5QjlFQjYwMTFFMUJEN0M5NDRCOUFFNTM2ODgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTMyNzg5QkFFQjYwMTFFMUJEN0M5NDRCOUFFNTM2ODgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxMzI3ODlCN0VCNjAxMUUxQkQ3Qzk0NEI5QUU1MzY4OCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxMzI3ODlCOEVCNjAxMUUxQkQ3Qzk0NEI5QUU1MzY4OCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pi1CUn8AAACQUExURScnJyUlJSMj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)",
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE8AAABPCAMAAACd6mi0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MURCMTg3NUJFQjVGMTFFMTgzNEM4QjdCMDQ4OUE0RUIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MURCMTg3NUNFQjVGMTFFMTgzNEM4QjdCMDQ4OUE0RUIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxREIxODc1OUVCNUYxMUUxODM0QzhCN0IwNDg5QTRFQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxREIxODc1QUVCNUYxMUUxODM0QzhCN0IwNDg5QTRFQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PiTUBIIAAABaUExURTExMTU1NS4u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)",
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE8AAABPCAMAAACd6mi0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0JDODBFQzVFQjVGMTFFMUJBMUNCQ0FDNzRDQUZBNjkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0JDODBFQzZFQjVGMTFFMUJBMUNCQ0FDNzRDQUZBNjkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDQkM4MEVDM0VCNUYxMUUxQkExQ0JDQUM3NENBRkE2OSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDQkM4MEVDNEVCNUYxMUUxQkExQ0JDQUM3NENBRkE2OSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnclD6QAAAD5UExURePGkubKmOXJ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)",
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAUCAMAAACK2/weAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjAzNTgyREJFQjYxMTFFMUJENzREQ0I1ODI3Mzg5ODIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjAzNTgyRENFQjYxMTFFMUJENzREQ0I1ODI3Mzg5ODIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MDM1ODJEOUVCNjExMUUxQkQ3NERDQjU4MjczODk4MiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2MDM1ODJEQUVCNjExMUUxQkQ3NERDQjU4MjczODk4MiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpzA0eIAAABvUExURS0tLTIyMikpKSoqKjExMSQkJDAwMCYmJicnJyEhITY2NgQEBDQ0NCwsLAAAADk5OQICAh8fHzg4OGFhYTs7OxwcHBoaGiIiIkNDQzMzM0RERBMTE0FBQRsbGx4eHiMjIz4+PgMDAz09PQUFBRQUFJVANLQAAADMSURBVHjaFI5XYsNAEEKZul2yulviFN//jF59AjMPcBBJDhYDqlXC7VX+d+HMCZQUdBmGS9av1ujhDC7DUJiUg7II4r2Ue5I4qhMD8W9ZfuSGwHULERRlDtS5YW3S5ThtLjPDPGCEUVwBsfH0Ypc8AXqYaGVCDnBW4R1jDf1MNhBN3+X37XVF9d5v+dwGAqxXmWznNkfsTE8z67WUa+IM1VTd6LksT7S9s9goZelP3oCUOgDKisRNwNqqILs/qPUgBzYcmXWdMtJHgAEAtEwJP3KsJroAAAAASUVORK5CYII=)",
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE8AAABPCAMAAACd6mi0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6REJFQzNFRUJFQjVGMTFFMTg3RjE4ODgwMkI1RDIxOTMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6REJFQzNFRUNFQjVGMTFFMTg3RjE4ODgwMkI1RDIxOTMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEQkVDM0VFOUVCNUYxMUUxODdGMTg4ODAyQjVEMjE5MyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEQkVDM0VFQUVCNUYxMUUxODdGMTg4ODAyQjVEMjE5MyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsvLy5gAAABLUExURQBcmg9koQdh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)",
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE8AAABPCAMAAACd6mi0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzVCQkU0RTJFQjYwMTFFMTkyOTY5QzExRUI1QjZEMjQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzVCQkU0RTNFQjYwMTFFMTkyOTY5QzExRUI1QjZEMjQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNUJCRTRFMEVCNjAxMUUxOTI5NjlDMTFFQjVCNkQyNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNUJCRTRFMUVCNjAxMUUxOTI5NjlDMTFFQjVCNkQyNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtlrK+MAAAClUExURVMmAjsUAFcq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)",
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE8AAABPCAMAAACd6mi0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTMyNzg5QjlFQjYwMTFFMUJEN0M5NDRCOUFFNTM2ODgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTMyNzg5QkFFQjYwMTFFMUJEN0M5NDRCOUFFNTM2ODgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxMzI3ODlCN0VCNjAxMUUxQkQ3Qzk0NEI5QUU1MzY4OCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxMzI3ODlCOEVCNjAxMUUxQkQ3Qzk0NEI5QUU1MzY4OCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pi1CUn8AAACQUExURScnJyUlJSMj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)",
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE8AAABPCAMAAACd6mi0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MURCMTg3NUJFQjVGMTFFMTgzNEM4QjdCMDQ4OUE0RUIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MURCMTg3NUNFQjVGMTFFMTgzNEM4QjdCMDQ4OUE0RUIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxREIxODc1OUVCNUYxMUUxODM0QzhCN0IwNDg5QTRFQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxREIxODc1QUVCNUYxMUUxODM0QzhCN0IwNDg5QTRFQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PiTUBIIAAABaUExURTExMTU1NS4u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)",
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE8AAABPCAMAAACd6mi0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0JDODBFQzVFQjVGMTFFMUJBMUNCQ0FDNzRDQUZBNjkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0JDODBFQzZFQjVGMTFFMUJBMUNCQ0FDNzRDQUZBNjkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDQkM4MEVDM0VCNUYxMUUxQkExQ0JDQUM3NENBRkE2OSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDQkM4MEVDNEVCNUYxMUUxQkExQ0JDQUM3NENBRkE2OSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnclD6QAAAD5UExURePGkubKmOXJ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)",

                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAUCAMAAACK2/weAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjAzNTgyREJFQjYxMTFFMUJENzREQ0I1ODI3Mzg5ODIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjAzNTgyRENFQjYxMTFFMUJENzREQ0I1ODI3Mzg5ODIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MDM1ODJEOUVCNjExMUUxQkQ3NERDQjU4MjczODk4MiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2MDM1ODJEQUVCNjExMUUxQkQ3NERDQjU4MjczODk4MiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpzA0eIAAABvUExURS0tLTIyMikpKSoqKjExMSQkJDAwMCYmJicnJyEhITY2NgQEBDQ0NCwsLAAAADk5OQICAh8fHzg4OGFhYTs7OxwcHBoaGiIiIkNDQzMzM0RERBMTE0FBQRsbGx4eHiMjIz4+PgMDAz09PQUFBRQUFJVANLQAAADMSURBVHjaFI5XYsNAEEKZul2yulviFN//jF59AjMPcBBJDhYDqlXC7VX+d+HMCZQUdBmGS9av1ujhDC7DUJiUg7II4r2Ue5I4qhMD8W9ZfuSGwHULERRlDtS5YW3S5ThtLjPDPGCEUVwBsfH0Ypc8AXqYaGVCDnBW4R1jDf1MNhBN3+X37XVF9d5v+dwGAqxXmWznNkfsTE8z67WUa+IM1VTd6LksT7S9s9goZelP3oCUOgDKisRNwNqqILs/qPUgBzYcmXWdMtJHgAEAtEwJP3KsJroAAAAASUVORK5CYII=)",
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE8AAABPCAMAAACd6mi0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6REJFQzNFRUJFQjVGMTFFMTg3RjE4ODgwMkI1RDIxOTMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6REJFQzNFRUNFQjVGMTFFMTg3RjE4ODgwMkI1RDIxOTMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEQkVDM0VFOUVCNUYxMUUxODdGMTg4ODAyQjVEMjE5MyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEQkVDM0VFQUVCNUYxMUUxODdGMTg4ODAyQjVEMjE5MyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsvLy5gAAABLUExURQBcmg9koQdh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)",
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE8AAABPCAMAAACd6mi0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzVCQkU0RTJFQjYwMTFFMTkyOTY5QzExRUI1QjZEMjQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzVCQkU0RTNFQjYwMTFFMTkyOTY5QzExRUI1QjZEMjQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNUJCRTRFMEVCNjAxMUUxOTI5NjlDMTFFQjVCNkQyNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNUJCRTRFMUVCNjAxMUUxOTI5NjlDMTFFQjVCNkQyNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtlrK+MAAAClUExURVMmAjsUAFcq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)",
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE8AAABPCAMAAACd6mi0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTMyNzg5QjlFQjYwMTFFMUJEN0M5NDRCOUFFNTM2ODgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTMyNzg5QkFFQjYwMTFFMUJEN0M5NDRCOUFFNTM2ODgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxMzI3ODlCN0VCNjAxMUUxQkQ3Qzk0NEI5QUU1MzY4OCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxMzI3ODlCOEVCNjAxMUUxQkQ3Qzk0NEI5QUU1MzY4OCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pi1CUn8AAACQUExURScnJyUlJSMj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)",
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE8AAABPCAMAAACd6mi0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MURCMTg3NUJFQjVGMTFFMTgzNEM4QjdCMDQ4OUE0RUIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MURCMTg3NUNFQjVGMTFFMTgzNEM4QjdCMDQ4OUE0RUIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxREIxODc1OUVCNUYxMUUxODM0QzhCN0IwNDg5QTRFQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxREIxODc1QUVCNUYxMUUxODM0QzhCN0IwNDg5QTRFQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PiTUBIIAAABaUExURTExMTU1NS4u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)",
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE8AAABPCAMAAACd6mi0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0JDODBFQzVFQjVGMTFFMUJBMUNCQ0FDNzRDQUZBNjkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0JDODBFQzZFQjVGMTFFMUJBMUNCQ0FDNzRDQUZBNjkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDQkM4MEVDM0VCNUYxMUUxQkExQ0JDQUM3NENBRkE2OSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDQkM4MEVDNEVCNUYxMUUxQkExQ0JDQUM3NENBRkE2OSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnclD6QAAAD5UExURePGkubKmOXJ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)",
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAUCAMAAACK2/weAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjAzNTgyREJFQjYxMTFFMUJENzREQ0I1ODI3Mzg5ODIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjAzNTgyRENFQjYxMTFFMUJENzREQ0I1ODI3Mzg5ODIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MDM1ODJEOUVCNjExMUUxQkQ3NERDQjU4MjczODk4MiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2MDM1ODJEQUVCNjExMUUxQkQ3NERDQjU4MjczODk4MiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpzA0eIAAABvUExURS0tLTIyMikpKSoqKjExMSQkJDAwMCYmJicnJyEhITY2NgQEBDQ0NCwsLAAAADk5OQICAh8fHzg4OGFhYTs7OxwcHBoaGiIiIkNDQzMzM0RERBMTE0FBQRsbGx4eHiMjIz4+PgMDAz09PQUFBRQUFJVANLQAAADMSURBVHjaFI5XYsNAEEKZul2yulviFN//jF59AjMPcBBJDhYDqlXC7VX+d+HMCZQUdBmGS9av1ujhDC7DUJiUg7II4r2Ue5I4qhMD8W9ZfuSGwHULERRlDtS5YW3S5ThtLjPDPGCEUVwBsfH0Ypc8AXqYaGVCDnBW4R1jDf1MNhBN3+X37XVF9d5v+dwGAqxXmWznNkfsTE8z67WUa+IM1VTd6LksT7S9s9goZelP3oCUOgDKisRNwNqqILs/qPUgBzYcmXWdMtJHgAEAtEwJP3KsJroAAAAASUVORK5CYII=)",
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE8AAABPCAMAAACd6mi0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6REJFQzNFRUJFQjVGMTFFMTg3RjE4ODgwMkI1RDIxOTMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6REJFQzNFRUNFQjVGMTFFMTg3RjE4ODgwMkI1RDIxOTMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEQkVDM0VFOUVCNUYxMUUxODdGMTg4ODAyQjVEMjE5MyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEQkVDM0VFQUVCNUYxMUUxODdGMTg4ODAyQjVEMjE5MyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsvLy5gAAABLUExURQBcmg9koQdh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)",
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE8AAABPCAMAAACd6mi0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzVCQkU0RTJFQjYwMTFFMTkyOTY5QzExRUI1QjZEMjQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzVCQkU0RTNFQjYwMTFFMTkyOTY5QzExRUI1QjZEMjQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNUJCRTRFMEVCNjAxMUUxOTI5NjlDMTFFQjVCNkQyNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNUJCRTRFMUVCNjAxMUUxOTI5NjlDMTFFQjVCNkQyNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtlrK+MAAAClUExURVMmAjsUAFcq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)",
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE8AAABPCAMAAACd6mi0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTMyNzg5QjlFQjYwMTFFMUJEN0M5NDRCOUFFNTM2ODgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTMyNzg5QkFFQjYwMTFFMUJEN0M5NDRCOUFFNTM2ODgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxMzI3ODlCN0VCNjAxMUUxQkQ3Qzk0NEI5QUU1MzY4OCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxMzI3ODlCOEVCNjAxMUUxQkQ3Qzk0NEI5QUU1MzY4OCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pi1CUn8AAACQUExURScnJyUlJSMj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)",
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE8AAABPCAMAAACd6mi0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MURCMTg3NUJFQjVGMTFFMTgzNEM4QjdCMDQ4OUE0RUIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MURCMTg3NUNFQjVGMTFFMTgzNEM4QjdCMDQ4OUE0RUIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxREIxODc1OUVCNUYxMUUxODM0QzhCN0IwNDg5QTRFQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxREIxODc1QUVCNUYxMUUxODM0QzhCN0IwNDg5QTRFQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PiTUBIIAAABaUExURTExMTU1NS4u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)",
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE8AAABPCAMAAACd6mi0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0JDODBFQzVFQjVGMTFFMUJBMUNCQ0FDNzRDQUZBNjkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0JDODBFQzZFQjVGMTFFMUJBMUNCQ0FDNzRDQUZBNjkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDQkM4MEVDM0VCNUYxMUUxQkExQ0JDQUM3NENBRkE2OSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDQkM4MEVDNEVCNUYxMUUxQkExQ0JDQUM3NENBRkE2OSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnclD6QAAAD5UExURePGkubKmOXJ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)"
            ]
        },

        i = 0,
        events = {
            color: {
                cursorOffset: {
                    left: -50,
                    top: -38
                },
                hint: function (element) {
                    return kendo.support.touch ?
                        $("<div style='width: 28px; height: 38px'/>")
                            .css("background-image", fillSvg.replace("%23f984ef", element.css("background-color")))
                        : undefined;
                },
                dragstart: function () {
                    var element = this.element,
                        color = element.css("background-color"),
                        doc = document.documentElement;

                    element.data("property", "background-color");
                    element.data("background-color", tools.color.compress(color));

                    $(doc).addClass("drop-override");
                    doc.style.cssText = "cursor: " + cursorSvg.replace("%23f984ef", color);
                    addRecentItem(element, "color");
                },
                dragend: function () {
                    var doc = document.documentElement;
                    widgetTarget.hide();

                    $(doc).removeClass("drop-override");
                    doc.style.cssText = "";
                }
            }
        },
        widgetTarget = $("<div class='widgetTarget'><div><div /><div /></div><span /><div><span /></div></div>").appendTo(document.body),

        StyleEngine = Widget.extend({
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
            populate: function(styles) {
                this.object = extend(true, this.object, styles);

                var that = this,
                    style = $("<style scoped>\n" + that.getCSS() + "</style>").insertAfter(that.styleElement);

                that.styleElement.remove();
                that.styleElement = style;
            },
            update: function(element, styles) {
                element = $(element);
                var that = this, style = {},
                    output = "", widget;

                $(element.parentsUntil(".km-root").add(element).get().reverse()).each(function (idx, value) {
                    widget = matchWidget(value);
                    if (widget && !(new RegExp(widget.selector + "\\s" + (widget.activeSelector ? "|" + widget.activeSelector + "\\s" : "")).test(output))) {
                        output = widget.selector + " " + output;
                    }
                });
                output = output.substr(0, output.length-1);

                style[output] = extend(this.object[output], styles);

                that.populate(style);
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
            mixBackground: function (cssValue, element) {
                var that = this,
                    backgrounds = element.css("background-image").split(backgroundSplitRegExp),
                    imageHash = that.createHash(cssValue),
                    isUrl = cssValue[0].toLowerCase() == "u";

                idx = -1;
                $.each(backgrounds, function (index, value) {
                    if ((value[0].toLowerCase() == "u" && isUrl) || that.createHash(value) == imageHash) {
                        idx = index;
                        return false;
                    }
                });

                if (backgrounds[idx]) {
                    backgrounds[idx] = cssValue;
                } else if (backgrounds.length < 4) {
                    if (isUrl) {
                        backgrounds.push(cssValue);
                    } else {
                        backgrounds.splice(0, 0, cssValue);
                    }
                }

                return backgrounds.join(",");
            },
            createHash: function(str) {
                var hash = 0, i, len = str.length;

                if (!len) {
                    return hash;
                }

                for (i = 0; i < len; i++) {
                    hash = ((hash << 5) - hash) + str.charCodeAt(i);
                    hash = hash & hash;
                }

                return hash;
            }
        });

    kendo.ui.plugin(StyleEngine);

    extend(events, {
        gradient: extend({}, events.color, {
            hint: function (element) {
                return kendo.support.touch ?
                    $("<div style='width: 28px; height: 38px'/>")
                        .css("background-image", fillSvg.replace(defaultStop, tools.gradient.set(element.css("background-image")).get("svg"))) :
                    undefined;
            },
            dragstart: function () {
                var element = this.element,
                    gradient = element.css("background-image"),
                    doc = document.documentElement;

                element.data("property", "background-image");
                element.data("background-image", tools.gradient.set(gradient).get());

                $(doc).addClass("drop-override");
                if (!kendo.support.touch) {
                    doc.style.cssText = "cursor: " + cursorSvg.replace(defaultStop, tools.gradient.get("svg"));
                }
                addRecentItem(element, "gradient");
            }
        }),
        pattern: extend({}, events.color, {
            hint: function (element) {
                return kendo.support.touch ?
                    $("<div style='width: 28px; height: 38px'/>")
                        .css("background-image", fillSvg.replace(defaultStop, tools.pattern.set(element.css("background-image")).get())) :
                    undefined;
            },
            dragstart: function () {
                var element = this.element,
                    pattern = element.css("background-image"),
                    doc = document.documentElement;

                element.data("property", "background-image");
                element.data("background-image", pattern);

                $(doc).addClass("drop-override");
                if (!kendo.support.touch) {
                    doc.style.cssText = "cursor: " + cursorSvg.replace(defaultStop, tools.pattern.get());
                }
                addRecentItem(element, "pattern");
            }
        })
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

    function matchWidget(element) {
        for(var idx in widgetList) {
            if (kendo.support.matchesSelector.call(element, widgetList[idx].selector)) {
                return extend( { widget: idx },  widgetList[idx] );
            }
        }

        return false;
    }

    function getPropertySelector(property) {
        var output = "", widget;

        for(var idx in widgetList) {
            widget = widgetList[idx];
            if (((widget.whitelist && widget.whitelist.indexOf(property) != -1) || !property) && widget.selector[0] != ">") {
                output += widget.selector + ",";
            }
        }
        return output.substring(0, output.length-1);
    }

    function getWidgets(property) {
        var widget, qualifiedWhiteList, widgets = { selector: "" };

        if (typeof property == "string")
            property = [ property ];

        for(var idx in widgetList) {
            widget = widgetList[idx];
            qualifiedWhiteList = widget.whitelist ? widget.whitelist.filter(function (value) { return property.indexOf(value) != -1; }) : [];

            if (((widget.whitelist && qualifiedWhiteList.length) || !property.length) && widget.selector[0] != ">") {
                widgets[idx] = widget;
                widgets[idx].whitelist = qualifiedWhiteList;
                widgets.selector += widget.selector + ",";
            }
        }

        widgets.selector = widgets.selector.substring(0, widgets.selector.length-1);

        return widgets;
    }

    function getMenuDataItem(item, source) {
        item = $(item);
        var menuElement = item.closest(".k-menu"),
            dataItem = source,
            index = item.parentsUntil(menuElement, ".k-item").map(function () {
                return $(this).index();
            }).get().reverse();

        index.push(item.index());

        for (var i = -1, len = index.length; ++i < len;) {
            dataItem = dataItem[index[i]];
            dataItem = i < len-1 ? dataItem.items : dataItem;
        }

        return dataItem;
    }

    function buildMenu(element) {
        var widgets = getWidgets(colors), menuStructure = [];

        for (var i in widgets ) {
            if (i != "selector") {
                if (element.closest(widgets[i].selector)[0]) {
                    var item = { text: widgets[i].name, items: [] };

                    for (var j in widgets[i].whitelist) {
                        item.items.push({ text: widgets[i].whitelist[j], value: widgets[i].selector });
                    }

                    menuStructure.push(item);
                }
            }
        }

        return menuStructure;
    }

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

    $("#" + clones[0] + "Device [data-role=view]").attr("data-init", "initTargets");

    $.each(devices, function () {
        var that = this.toString(),
            deviceId = "#" + that + "Device";
        applications[that] = new kendo.mobile.Application(deviceId, { platform: that });
        engineTool = $(deviceId).kendoStyleEngine().data("kendoStyleEngine");
    });

    window.initTargets = function() {
        setTimeout(function () {
            var property = "", whitelisted = false,
                draggedElement,
                color = "transparent",
                css, defaultCSS;

            $(".color-holder .drop").kendoDraggable(events.color);
            $(".gradient-holder .drop").kendoDraggable(events.gradient);
            $(".pattern-holder .drop").kendoDraggable(events.pattern);

            function applyHint(target, property, value) {
                var engine = target.parents(".device").data("kendoStyleEngine");

                defaultCSS = { cursor: "default" };
                defaultCSS[property] = "";

                css = {};
                css[property] = value;

                if (css["background-image"]) {
                    css["background-image"] = engine.mixBackground(css["background-image"], target);
                }

                target.css(css);

                widgetTarget
                    .children("div")
                    .last()
                    .children()
                    .text(property);

                return property;
            }

            $(document.body).on("DOMMouseScroll mousewheel", "*", function (e) {
                var widget = matchWidget(e.currentTarget);

                if (widget) {
                    e.preventDefault();
                    e.stopImmediatePropagation();

                    var property = $(draggedElement).data("property"),
                        index = widget.whitelist.indexOf(property),
                        target = $(e.currentTarget),
                        newIndex = 0, maxIndex = widget.whitelist.length - 1;

                    if (index != -1) {
                        newIndex = index + (e.originalEvent.wheelDelta / 120 || e.originalEvent.detail / 3);
                        newIndex < 0 && (newIndex = maxIndex);
                        newIndex > maxIndex && (newIndex = 0);

                        target.css(defaultCSS);
                        color = css[property];

                        property = applyHint(target, widget.whitelist[newIndex], color);
                    }
                }
            });

            $(".device").kendoDropTargetArea({
                filter: getWidgets(properties).selector,
                dragenter: function (e) {
                    draggedElement = $(e.draggable.element);

                    var target = e.dropTarget,
                        offset = target.offset(),
                        height = target.outerHeight(),
                        widgetChildren = widgetTarget.children("div"),
                        widget = matchWidget(target[0]),
                        property = draggedElement.data("property");

                    whitelisted = widget.whitelist.indexOf(property) != -1 ? property : colors.indexOf(property) != -1 ? widget.whitelist[0] : false;

                    if (!whitelisted) {
                        return;
                    }

                    property = applyHint(target, whitelisted, $(e.draggable.element).data(property));

                    widgetTarget
                        .show()
                        .css(TRANSITION, "all 100ms")
                        .css("display");

                    widgetTarget
                        .css({
                            top: offset.top,
                            left: offset.left
                        })
                        .children("span")
                        .text(widget.name);

                    widgetChildren
                        .width(target.outerWidth())
                        .css(TRANSITION, "all 100ms")
                        .last()
                        .css("top", height)
                        .end()
                        .css("display");

                    widgetChildren
                        .children("div")
                        .height(height)
                        .css(TRANSITION, "all 100ms")
                        .css("display");
                },
                dragleave: function (e) {
                    $(e.dropTarget).css(defaultCSS);
                    widgetTarget.hide();
                },
                drop: function (e) {
                    if (!whitelisted) {
                        return;
                    }

                    var color = $(e.draggable.element).css($(e.draggable.element).data("property")),
                        target = $(e.dropTarget),
                        engine = target.parents(".device").data("kendoStyleEngine");

                    target.css(defaultCSS);
                    widgetTarget.hide();

                    if (CtrlDown) {
                        var offset = target.offset(),
                            structure = buildMenu(target);

                        contextMenu.element.empty();
                        contextMenu.append(structure);
                        contextMenu.one("select", function (e) {
                            var style = {}, dataItem = getMenuDataItem(e.item, structure);
                            style[dataItem.text] = color;

                            engine.update(target.closest(dataItem.value), style);
                        });
                        contextMenu.show(offset.left + e.offsetX, offset.top + e.offsetY);
                    } else {
                        if (css["background-image"]) {
                            css["background-image"] = engine.mixBackground(css["background-image"], target);
                        }

                        engine.update(target, css);
                    }
                }
            });

            contextMenu = $("<ul />").appendTo(document.body).kendoContextMenu().data("kendoContextMenu");

            $(document).on({
                keydown: function (e) { CtrlDown = e.which == 17; },
                keyup: function (e) { e.which == 17 && (CtrlDown = false); }
            });

    //        var allProps = getPropertySelector();
    //        $(document.body).on({
    //            mouseover: function (e) {
    //                $(".utility-active").removeClass("utility-active");
    //                $(e.currentTarget).addClass("utility-active");
    //                e.stopImmediatePropagation();
    //            },
    //            mouseout: function (e) {
    //                $(".utility-active").removeClass("utility-active");
    //                e.stopImmediatePropagation();
    //            }
    //        }, allProps);

            $(".device").on({
                click: function (e) {
                    var target = $(e.currentTarget),
                        width = target.outerWidth();

                    if (width - 20 < e.offsetX && e.offsetX < width && e.offsetY > 0 && e.offsetY < 20) {
                        e.stopImmediatePropagation();
                        e.preventDefault();
                    }
                }
            }, ".utility-active");

//            $(".km-tabstrip").kendoHSLPicker({
//                change: function (e) {
//                    this.element.parents(".device").data("kendoStyleEngine").update(this.element, { "background-color": e.color.get() });
//                }
//            });
//            $(".gradient").kendoGradientPicker();
//            $(".km-navbar").kendoGradientPicker();
        }, 200);
    };

    window.mobileAccountViewInit = function () {
        var listviews = this.element.find("ul.km-listview");

        this.element.find("[id^=settings-view]").kendoMobileButtonGroup({
            select: function() {
                listviews.hide()
                         .eq(this.selectedIndex)
                         .show();
            },
            index: 0
        });
    };

    function addRecentItem(element, type) {
        element = $(element);

        var existing = $('.recent-' + type + 's [data-' + type + '="' + tools[type].set(element.attr("data-" + type)).get() + '"]');

        if (existing[0]) {
            existing
                .addClass("k-state-active")
                .siblings(".k-state-active")
                .removeClass("k-state-active");
        } else {
            var recent = element.clone()
                .prependTo(".recent-" + type + "s")
                .addClass("k-state-active")
                .siblings(".k-state-active")
                .removeClass("k-state-active").end();

            recent.kendoDraggable(events[type]);
            pickers[type].popup.wrapper.addClass("k-static-shown");
            pickers[type].open(recent);

            recent.click(function (e) {
                var that = $(this), item;

                if (e.button == 0) {
                    that.addClass("k-state-active")
                        .siblings(".k-state-active")
                        .removeClass("k-state-active");
                } else if (e.button == 1) {
                    if (this == pickers[type].target[0]) {
                        item = that.next();
                        !item[0] && (item = that.prev());

                        if (!item[0]) {
                            pickers[type].popup.wrapper.removeClass("k-static-shown");
                            pickers[type].close();
                        } else {
                            pickers[type].open(item);
                        }
                    }
                    that.remove();
                }
            });
        }
    }

    ["color", "gradient", "pattern"].forEach(function (type) {
        i = 0;
        while (defaults[type][i]) {
           var value = tools[type].set(defaults[type][i]).get();
           $('<div class="drop" style="background-' + (type != "color" ? "image" : type) + ':' + value + '" data-' + type + '="' + (type != "color" ? engineTool.createHash(value) : value) + '" />')
                    .insertBefore(".recent-" + type + "s")
                    .click(function () {
                        addRecentItem(this, type);
                    });

           i++;

           if (!(i % 12)) {
               $("<br />").insertBefore(".recent-" + type + "s");
           }
        }
        kendo.wrap(pickers[type].popup.element).addClass("k-static-picker k-static-" + type);
    });

    $(".tools").kendoTabStrip({
        animation: {
            open: {
                effects: "fade:in"
            }
        },
        select: function (e) {

        }
    });

    var importWindow = $("#importWindow").kendoWindow({
        width: "400px",
        height: "400px",
        maxHeight: "400px",
        title: "Import Styles",
        visible: false,
        modal: true
    }).data("kendoWindow");

    var exportWindow = $("#exportWindow").kendoWindow({
        width: "400px",
        height: "400px",
        maxHeight: "400px",
        title: "Export Styles",
        visible: false,
        modal: true
    }).data("kendoWindow");

    $("#importStyles").click(function () {
        if (sessionStorage && sessionStorage.length) {
            try {
                $("#importWindow .k-textbox")[0].value = sessionStorage.getItem("import");
            } catch(err) {}
        }

        importWindow.center().open();
    });

    $("#exportStyles").click(function () {
        var output = "";

        $.each(devices, function () {
            var that = this.toString();
            if ($("#" + that + "box")[0].checked) {
                output += $("#" + that + "Device").data("kendoStyleEngine").getCSS();
            }
        });

        exportWindow.element.find("textarea").text(output);

        exportWindow.center().open();
    });

    $("#import").click(function () {
        var imports = $("#importWindow .k-textbox")[0].value.replace(/<\s*\/.*?>/gm, ""),
            stylesheet = $("<style scoped>" + imports + "</style>").appendTo(document.body),
            styles = {}, style;

        if (stylesheet[0].sheet) {
            $.each(stylesheet[0].sheet.rules, function () {
                deviceClasses.forEach(function (value) {
                    if (this.selectorText.indexOf(value) === 0) {

                        style = {};
                        for (var i = 0, len = this.style.length; i < len; i++) {
                            if (!style[this.selectorText]){
                                style[this.selectorText] = {};
                            }
                            style[this.selectorText][this.style[i]] = this.style[this.style[i]];
                        }

                        styles[value] = extend(styles[value], style);
                    }
                }, this);
            });
        }

        for (var idx in styles) {
            var engine = $(idx).data("kendoStyleEngine");

            if (!$("#mixStyles")[0].checked) {
                engine.object = {};
            }

            engine.populate(styles[idx]);
        }

        stylesheet.remove();

        try {
            sessionStorage.setItem("import", imports);
        } catch(err) {}

        importWindow.close();
    });
})(jQuery);
