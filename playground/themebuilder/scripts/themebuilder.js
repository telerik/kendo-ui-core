(function ($, undefined) {

    var devices = [ "ios", "android", "blackberry", "meego" ], CtrlDown = false, contextMenu,
        deviceClasses = $.map(devices, function (value) { return ".km-" + value; }),
        extend = $.extend,
        each = $.each,
        dragging = false,
        globalUndoBuffer = [],
        globalRedoBuffer = [],
        propertyTargets = {
            color: [ "color", "background-color", "border-color" ],
            gradient: [ "background-image" ],
            pattern: [ "background-image" ]
        },
        packages = {
            color: [ "background-color" ],
            "background-color": [ "background-color" ],
            "border-color": [ "background-color" ],
            "background-image": [ "background-image", "background-repeat", "background-position" ]
        },
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
        properties = propertyTargets.color.concat(propertyTargets.gradient, propertyTargets.pattern),
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
        pickers = {},

        defaults = {
            color: [ "#c5007c", "#6300a5", "#0010a5", "#0064b5", "#00a3c7", "#0fad00", "#8cc700", "#ff0", "#fec500", "#ff9400", "#f60", "#f00",
                              "transparent", "#fff", "#e5e5e5", "#ccc", "#b2b2b2", "#999", "#7f7f7f", "#666", "#4c4c4c", "#333", "#191919", "#000" ],

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
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABZJREFUeNpiYGBg+A8EDIwgAgQAAgwARtQG+wvLaVMAAAAASUVORK5CYII=)",
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAECAYAAACk7+45AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABhJREFUeNpiYGBg+M+ADfxn/P8fIgMQYAA+7gT90CvwKgAAAABJRU5ErkJggg==)",
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAB1JREFUeNpiZGBg+A8EjECagRHIYIABJgYkABBgAM3TBv+4J7s8AAAAAElFTkSuQmCC)",
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAB5JREFUeNpiYGBg+M8ABf//w5nYBf6DBBjRRQECDADOlA30CxD9AQAAAABJRU5ErkJggg==)",
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAICAYAAADeM14FAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACBJREFUeNpiYGBg+M8ABf//w5nkCvwHCTCiixIWAAgwAP5EGepXPmrSAAAAAElFTkSuQmCC)",
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABxJREFUeNpiZGBg+A8EjAxQwAjkMCADwgIAAQYAGS4M+cNlSrIAAAAASUVORK5CYII=)",
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHVJREFUeNpiZGBgaGCAgL////9vZkADjIyMVUCKjQlJ7DEDdgAWhym8A8TrcSjcBJJnBFqHbA0fkPIGYhWo5q1A+U/IJsKAPxCrAzEzlA6CSaArlMXFZ8LmcGx8JmwOx+ZBRiCuRXc4WjiCPciEzeHYPAgQYADTTSDE4AZRlgAAAABJRU5ErkJggg==)",
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAKCAYAAACE2W/HAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHxJREFUeNpiZGBgaGCAgL////9vZiAAGBkZq4AUGxOS2GMG4gBYHUzjHSBeT6TGTSD1jEDnYXMOH5DyBmIVqKFbgeo+IathwmGqPxCrAzEzlA5CV4BLoywBPk6NjwnwcWrcBPUbzoBjBOJaXAGAIx7BAceELwDwBRxAgAEAdXkgxF84rxcAAAAASUVORK5CYII=)",
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAKCAYAAACE2W/HAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAK5JREFUeNpiZGBgaGCAgL9QzMaAAH/////fjMRnYGRkrAKpYUISewzFDGhiDNjEYBrvAPF6IN4EZSOLoQOwGkYgwQd0zic05/ABKW8gVoEasBUqBRcDaUwAalyApjEWSCkjCT2A+h8uxgLEslicI4uF/xdZgAlfAOALOJBT+YFO/YjmVH4g5Yvkx81QKV9kP9biCgCQGK6AA/mRGYjVgZgdLQBgYgvQnO0PUgMQYAB8nzZRZvZqnQAAAABJRU5ErkJggg==)",
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAOCAYAAAAWo42rAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAALNJREFUeNpiZGBgqALix0C8EYiLGFDBXyCeBMR+zEDCGYiFoPgDlIaB20CsAcQqTEiCKkC8GYgfQE0C0Vuh4gwsSArv/P///yOQXoBsNyMj4x2Yici6sQGwLTCFfxnwg78ghWxArAzE3jgU+YLkkd2oAnQPPygogFgWKcjAngEFjwN6UEDFUYKMCVtQYAsyRmCQIAdFDJrim0D55SAGE7agwBZkTNiCAluQMWELCmxBBhBgAMO1Mzvr3GK6AAAAAElFTkSuQmCC)",
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQ9JREFUeNqMkz8KwjAUxpP4B6GiuDq4CNrdsR7AGzg7OioewBO4egYXDyHSC+hSsKurVCyIS/0Cr8WG2LwHv6bkvXwvCV+kEGIryvHMsmwn/oSUco2hY84rS20kqsOaN4U+IHQIhVRXirohcgAPbL+LcQpGQP8n4AZOOLbO67o5aBZHBhva7lmLgKFZZDaDWAyxHjUbg7bE5O9F6u5L0Ko42hvssS6puqPAISIoH7gu2xe88F1CHlPIcwmlTKHUJRQxhSKXkNVsHNNqH61ys5HxnD4CMRm1MG0Nnxnogwm4U9EVNOhxasEXuIAj1ehmCzDI7SKN1281m/H6raZVHLNxTKs4ZuPkFcdsnPxXgAEAitpFKbukwF4AAAAASUVORK5CYII=)",
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAANtJREFUeNpiZGBgaGCAgNP////fysjIWAtkMzOQCJig9C8gPgZlf2UgAzBBDVkJdM17oGv4geyf5BjECMSCUEOUgexwIGYjQt9fIP4BxNxA/AWIb7IAiXygIZ+BNBeRYQP2ARDfBWKQD+yAWIUFKslLpA9eAfFyIH4PxCg+YCIxKDhAwQB1SShyMJBqEDeUtgYZii36iQWwpKGBKx0RC26iuYwsg/AmWiYSDMGbaFmISWxAfIRQomUhJrEBsTGhRMtCTGIjJtEyEZPYSClG8CY2Ug3CmdiIAQABBgCRyUSyesNqjgAAAABJRU5ErkJggg==)",

                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE8AAABPCAMAAACd6mi0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTMyNzg5QjlFQjYwMTFFMUJEN0M5NDRCOUFFNTM2ODgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTMyNzg5QkFFQjYwMTFFMUJEN0M5NDRCOUFFNTM2ODgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxMzI3ODlCN0VCNjAxMUUxQkQ3Qzk0NEI5QUU1MzY4OCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxMzI3ODlCOEVCNjAxMUUxQkQ3Qzk0NEI5QUU1MzY4OCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pi1CUn8AAACQUExURScnJyUlJSMj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)",
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE8AAABPCAMAAACd6mi0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzVCQkU0RTJFQjYwMTFFMTkyOTY5QzExRUI1QjZEMjQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzVCQkU0RTNFQjYwMTFFMTkyOTY5QzExRUI1QjZEMjQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNUJCRTRFMEVCNjAxMUUxOTI5NjlDMTFFQjVCNkQyNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNUJCRTRFMUVCNjAxMUUxOTI5NjlDMTFFQjVCNkQyNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtlrK+MAAAClUExURVMmAjsUAFcq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)",
                "url(data:image/png;base64,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)",
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAUCAYAAACEYr13AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAaJJREFUeNqUks1ugkAQx4FdRUUq4EeTXlqTNo16gcZ40hfoS/SNfCx7a9OTTW+aNLERCEKQb+iQ1IYa2E0n2Zgd3P/8Z+bHDofDK+YnEELsaDTSeJ6PmYoIggCv1+vXJEmy/M4VP3a7Xb7X6zGkGAwGbP6/0/2PwHQ6vW61Wpgk0Gg00Gw2u/l1LcuyOJ/PpcVicYcxlkzTDKMoSkki+RtVVaVOpxOyy+XyKQzDZL/fe7quB67rxgwlBEHA0Crf7/ebeLVafTH/jLxIfjabjYurJn04HETHcS7AHV+v1wNRFG2w7JxvCJc9NgxDsm3bh3hO09SEnAJzuY/jWFYUxYJBRpUCYK0JVS34fTnlYOc63HWorh6PR6EowJW1AALvZXlw8MGybFbMcSUT9qCKVzE8DzjxiQLnpNFI5Wik0UhF4/H4lkTadrv1SaSWbSHe7XY+WG1PJpMHTdNQgVT/nFRMI41GJYK1PAI0bVgRBxZjOCntUQ4btNIBp5cIEP2Engw4ClAn1mq1iCRyItWyrBDW/YazLEtJpNFI5Wik0Uj9FmAAlmwVK4mYI6QAAAAASUVORK5CYII=)",
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAVCAYAAABljp99AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWpJREFUeNo0kd9LwlAUx91VnKWhYwY2fZFJ9eCmhCAMRFgQ/cU9iS+ChpAsUcLQMRHSzKttIYNgrfM1uy8fPufcH+eeIxSLxYdGo/G42+2mo9Hoq1wun0mSVGKyLH+v12sFwQgtEM5o95PjOAWKpSN/Kw1niUSC53K5CQWMY8KAs3a7/U6nFrFY7JyCGgiPxuPxUjKZjGSz2WC5XNar1erQ87w3hrP9fv9TEIQ0bRBA+CERBIE4Ho9VwzCeQTg7PlhPpVILRVFWIByJAmOsZJqm3el0ViAciTtVVSdbWrZt+yCciaJ4QleEvV5viztBONN1/XUwGFzv9/vDYyCcaZo2C8OQU6xyLKQCZ5Zl8WazOaX6bygogXBGx1yqYkP9cShxD8IP/+h2u5zm4FKfZBAepaFc+b7/47qumc/nOZV8wTm3/n9+SdUE1NUhCEfiFDOo1Wov8/ncA+FI3GYyGQxr02q1PkD4rwADAPUIvqcPnGiJAAAAAElFTkSuQmCC)",
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAGJJREFUeNqUkMEJAEEIA/fAWq8DO9rG7EAU3ZdwW0DyuDwNQ3AeVX0XyN4bnZeYGSzOORhwd1hkJga6GxYzg4GIWH9CFyhQVbC49jDAbDB7wmwwe8JssN+EPcfsUYAtfAIMABlKNaG74oyiAAAAAElFTkSuQmCC)",
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAKBJREFUeNq81T0OgCAMhmGp3IHNS7hwGnZOxM45TTB1MCHKX9J+79SFPGkXjPf+3BaLMdoQwrX6LqVkCYnlnC9CYjwTEpsGpbApUBIbgtJYF9TAmqAW9gtqYh9QG6tABPaCKOwBkRhnSiknCuPlCInxJQmJLf0WEtg0KIVNgZLYEJTGuqAG1gS1sF9QE/uA2lgFIrAXRGHc7pw7UBh3CzAAGoDd5dFuw6wAAAAASUVORK5CYII=)",
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAMtJREFUeNq81b0NwyAQBeBEWMxgWcgrUKHMxBY0XgF6FvAibjwIExChKC4sWf7j8B1XXfP0de+9rbUfrfX3BTzvfeOcA+dYCKGNMTZKqQQJSikT57yZpgmUY0KIbp7nVAtdwP9TC13BWugGrIHuQGr0EKRET0Eq9BKkQG9BbDQLxESzQSwUBGKgbBiGHlrAT1A2jmNb0vqlKDPGdKVTU4Iu4JN9g6IrWAvdgDXQHUiNHoKU6ClIhV6CFOgtiI1mgZhoNoiFgkAM9CfAAO0Pfd+RDuL0AAAAAElFTkSuQmCC)",
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAFRJREFUeNpiKigoMGJgYDBGwgpfvnwR////vwoMM0IlYOAtUMF3bm5uXphAYWEhHwM+E5BsIagArIiQAmMGggqAhjAQUgAyhIGQApAcAyEFIAwQYAD+7HsO5fo76wAAAABJRU5ErkJggg==)",
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAFZJREFUeNpi/P//vwoDFHz9+vUzDw8PJ5ApDBMrKCj4DyKMQAph+MuXL+JAOQUgNkbCDMZEKIQwCChEGItHIar9WBVicyi6QgZcPkJWyIDP6zCFAAEGAPRWfgx4dcnyAAAAAElFTkSuQmCC)",
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAABCAYAAADeko4lAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABlJREFUeNpiZGBgUGMgAvz///8LMeoAAgwAo98EGXpqjeMAAAAASUVORK5CYII=)",
                "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAYAAADn9T9+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABhJREFUeNpiZGBgUGNAA/////+CLgYQYABOywQZlafNQAAAAABJRU5ErkJggg==)"
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

                    dragging = true;
                    element.data("property", "background-color");
                    element.data("background-color", tools.color.compress(color));

                    $(doc).addClass("drop-override");
                    doc.style.cssText = "cursor: " + cursorSvg.replace("%23f984ef", color);
                    addRecentItem(element, "color");
                },
                dragend: function () {
                    var doc = document.documentElement;

                    dragging = false;
                    widgetTarget.hide();

                    $(doc).removeClass("drop-override");
                    doc.style.cssText = "";
                }
            }
        },
        widgetTarget = $("<div class='widgetTarget'><div><div /><div /></div><span /><div><span /></div></div>").appendTo(document.body),

        StyleEngine = Widget.extend({
            undoBuffer: [],
            redoBuffer: [],
            init: function (element, options) {
                var that = this, key;

                Widget.fn.init.call(that, element, options);
                element = that.element;
                options = that.options;

                that.object = {};

                if (options.restoreFromStorage) {
                    if (localStorage && localStorage.length) {
                        try {
                            for (var i = 0; i < localStorage.length; i++){
                                key = localStorage.key(i);
                                if (key.indexOf(".km-" + options.platform) === 0) {
                                    that.object[key] = JSON.parse(localStorage.getItem(key));
                                }
                            }
                        } catch(err) {}
                    }
                }

                that.styleElement = $("<style scoped>\n" + that.getCSS() + "</style>").insertBefore(element);
            },
            options: {
                name: "StyleEngine",
                restoreFromStorage: false,
                platform: "",
                globalUndoBuffer: null,
                globalRedoBuffer: null
            },
            populate: function(styles) {
                this.object = extend(true, this.object, styles);

                var that = this,
                    style = $("<style scoped>\n" + that.getCSS() + "</style>").insertAfter(that.styleElement);

                that.styleElement.remove();
                that.styleElement = style;
            },
            getElementSelector: function (element, agnostic) {
                var output = "", widget,
                    parents = element.parentsUntil(agnostic ? ".km-pane" : ".km-root");

                $(parents.add(element).get().reverse()).each(function (idx, value) {
                    widget = matchWidget(value);
                    if (widget && !(new RegExp(widget.selector + "\\s" + (widget.activeSelector ? "|" + widget.activeSelector + "\\s" : "")).test(output))) {
                        output = widget.selector + " " + output;
                    }
                });

                return output.substr(0, output.length-1);
            },
            update: function(element, styles, selector) {
                element = $(element);
                var that = this, style = {},
                    output = selector || that.getElementSelector(element),
                    undoItem = this.undoBuffer.push({});

                undoItem[output] = this.object[output];
                style[output] = extend(this.object[output], styles);
                that.store(output, style[output]);

                that.populate(style);

                if (that.options.globalUndoBuffer) {
                    that.options.globalUndoBuffer.push(that);
                }
            },
            undo: function() {
                var that = this,
                    item = that.undoBuffer.pop();

                if (item) {
                    that.redoBuffer.push(item);
                    if (that.options.globalRedoBuffer) {
                        that.options.globalRedoBuffer.push(that);
                    }

                    that.store(item.keys()[0], item.values()[0]);

                    that.populate(item);
                }
            },
            redo: function() {
                var that = this,
                    item = that.redoBuffer.pop();

                if (item) {
                    that.undoBuffer.push(item);
                    if (that.options.globalUndoBuffer) {
                        that.options.globalUndoBuffer.push(that);
                    }

                    that.store(item.keys()[0], item.values()[0]);

                    that.populate(item);
                }
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
            mixBackground: function (css, element, replace) {
                var that = this, idx, imageHash, repeats, url, comma, grPosition, grRepeat,
                    color = element.css("background-color"),
                    backgrounds = [ element.css("background-image").split(backgroundSplitRegExp), css["background-image"].split(backgroundSplitRegExp) ],
                    backSplits = [ { gradient: [], url: [] }, { gradient: [] }],
                    position = css["background-position"],
                    repeat = css["background-repeat"];

                position = position ? position.substring(position.indexOf(",") + 1) : "";
                repeat = repeat ? repeat.substring(repeat.indexOf(",") + 1) : "";

                backgrounds.forEach(function (val, idx) {
                    val.forEach(function (value) {
                        if (value[0].toLowerCase() != "none") {
                            if ((value[0].toLowerCase() == "u")) {
                                backSplits[0].url = [ value ];
                            } else {
                                backSplits[idx].gradient.push( value );
                            }
                        }
                    });
                });

                idx = -1;
                if (backSplits[1].gradient[0]) {
                    imageHash = that.createHash(backSplits[1].gradient[0]);
                    backSplits[0].gradient.forEach(function (value, i) {
                        if (that.createHash(value) == imageHash) {
                            idx = i;
                        }
                    });
                }

                if (replace && backSplits[1].gradient[0]) { idx = 0; }

                if (idx > -1) {
                    backSplits[0].gradient[idx] = backSplits[1].gradient[0];
                } else if (backSplits[0].gradient.length < 4 && backSplits[1].gradient[0]) {
                    backSplits[0].gradient.splice(0, 0, backSplits[1].gradient[0]);
                }

                repeats = new Array(backSplits[0].gradient.length+1);
                grPosition = repeats.join("0 0,");
                grRepeat = repeats.join("repeat,");
                url = backSplits[0].url[0];
                comma = (url ? "," :"");

                return {
                    "background-color": color,
                    "background-image": (backSplits[0].gradient.length ? backSplits[0].gradient.join(",") + comma : "") + (url ? url : ""),
                    "background-position": grPosition.substr(0, grPosition.length - 1) + comma  + (url ? position : ""),
                    "background-repeat": grRepeat.substr(0, grRepeat.length - 1) + comma + (url ? repeat : "")
                }
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
            },
            store: function(property, obj) {
                if (localStorage) {
                    try {
                        localStorage.setItem(property, JSON.stringify(obj));
                    } catch(err) {}
                }
            },
            retrieve: function (property) {
                if (localStorage && localStorage.length) {
                    try {
                        return JSON.parse(localStorage.getItem(property));
                    } catch(err) {}
                }
                return {};
            },
            reset: function () {
                var that = this, key, style;

                that.object = {};

                style = $("<style scoped>\n" + that.getCSS() + "</style>").insertAfter(that.styleElement);

                that.styleElement.remove();
                that.styleElement = style;

                if (that.options.restoreFromStorage) {
                    if (localStorage && localStorage.length) {
                        for (var i = 0; i < localStorage.length; i++){
                            key = localStorage.key(i);
                            if (key.indexOf(".km-" + that.options.platform) !== -1) {
                                localStorage.removeItem(key);
                                i--;
                            }
                        }
                    }
                }
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

                dragging = true;
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

                dragging = true;
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
        var widgets = getWidgets(propertyTargets.color), menuStructure = [];

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

    function globalUndo() {
        var lastEngine = globalUndoBuffer.pop();

        if (lastEngine) {
            lastEngine.undo();
            globalRedoBuffer.push(lastEngine);
        }
    }

    function globalRedo() {
        var lastEngine = globalRedoBuffer.pop();

        if (lastEngine) {
            lastEngine.redo();
            globalUndoBuffer.push(lastEngine);
        }
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
    each(clones.reverse(), function () {
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

    each(devices, function () {
        var that = this.toString(),
            deviceId = "#" + that + "Device";
        applications[that] = new kendo.mobile.Application(deviceId, { platform: that });
        engineTool = $(deviceId).kendoStyleEngine({ restoreFromStorage: true, platform: that, globalUndoBuffer: globalUndoBuffer, globalRedoBuffer: globalRedoBuffer }).data("kendoStyleEngine");
    });

    pickers = {
        color: $(".recent-colors").kendoHSLPicker({ filter: ".drop", styleEngine: engineTool }).data("kendoHSLPicker"),
        gradient: $(".recent-gradients").kendoGradientPicker({ filter: ".drop", styleEngine: engineTool }).data("kendoGradientPicker"),
        pattern: $(".recent-patterns").kendoPatternPicker({ filter: ".drop", styleEngine: engineTool }).data("kendoPatternPicker")
    };

    window.initTargets = function() {
        setTimeout(function () {
            var property = "", whitelisted = false,
                draggedElement,
                color = "transparent",
                css, defaultCSS;

            $(".color-holder .drop").kendoDraggable(events.color);
            $(".gradient-holder .drop").kendoDraggable(events.gradient);
            $(".pattern-holder .drop").kendoDraggable(events.pattern);

            function applyHint(element, target, pkg) {
                var engine = target.parents(".device").data("kendoStyleEngine"), color;

                css = kendo.getComputedStyles(element, pkg);

                if (css["background-color"]) {
                    color = css["background-color"];
                    delete css["background-color"];
                    css[whitelisted] = color;
                }

                defaultCSS = { cursor: "default" };
                each(css, function (idx) { defaultCSS[idx] = ""; });

                if (css["background-image"]) {
                    extend(css, engine.mixBackground(css, target, true));
                }

                target.css(css);

                widgetTarget
                    .children("div")
                    .last()
                    .children()
                    .text(whitelisted);
            }

            $(document.body).on("DOMMouseScroll mousewheel", "*", function (e) {
                if (!dragging) { return; }

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

                        applyHint(draggedElement[0], target, packages[widget.whitelist[newIndex]]);
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

                    whitelisted = widget.whitelist.indexOf(property) != -1 ? property : propertyTargets.color.indexOf(property) != -1 ? widget.whitelist[0] : false;

                    if (!whitelisted) {
                        return;
                    }

                    applyHint(draggedElement[0], target, packages[whitelisted]);

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

                    var target = $(e.dropTarget),
                        engines = $("#applyall")[0].checked ?
                            $.map(devices, function (value) { return $("#" + value + "Device").data("kendoStyleEngine"); }) :
                            [ target.parents(".device").data("kendoStyleEngine") ],
                        targetSelector = engines[0].getElementSelector(target, true);

                    target.css(defaultCSS);
                    widgetTarget.hide();

                    engines.forEach(function (value) {
                        var currentTarget = value.element.find(targetSelector);

                        if (css["background-image"]) {
                            extend(css, value.mixBackground(css, currentTarget, true));
                        }

                        value.update(currentTarget, css, ".km-" + value.options.platform + " " + targetSelector);
                    });
                }
            });

            contextMenu = $("<ul />").appendTo(document.body).kendoContextMenu().data("kendoContextMenu");

            $(document).on({
                keydown: function (e) { CtrlDown = e.which == 17; },
                keyup: function (e) {
                    if (e.ctrlKey && (e.which == 90 || e.which == 122)) {
                        if (e.shiftKey) {
                            globalRedo();
                        } else {
                            globalUndo();
                        }
                    }
                    e.which == 17 && (CtrlDown = false);
                }
            });

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

        var existing = $('.recent-' + type + 's [data-' + type + '="' + element.attr("data-" + type) + '"]');

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
           if (value == "rgba(0,0,0,0)") { value = "none" }
           $('<div class="drop" style="background-' + (type != "color" ? "image" : "color") + ':' + value + '" data-' + type + '="' + (type != "color" ? engineTool.createHash(value) : value) + '" />')
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

    $(".optionsSheet").click(function () {
        $(".optionsSheet .items")
            .css("z-index", "");

        $(".optionsSheet .cover")
            .one(kendo.support.transitions.event, function () {
                if ($(this).parent().hasClass("k-state-opened")) {
                    $(".optionsSheet .items").css("z-index", 1);
                }
            }).css("overflow");

        $(this).toggleClass("k-state-opened");
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

    $("#resetStyles").click(function () {
        each(devices, function () {
            var that = this.toString();

            $("#" + that + "Device").data("kendoStyleEngine").reset();
        });
    });

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

        each(devices, function () {
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
            each(stylesheet[0].sheet.rules, function () {
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
