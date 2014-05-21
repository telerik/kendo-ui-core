if (kendo.support.browser.webkit || kendo.support.browser.mozilla || (kendo.support.browser.msie &&  kendo.support.browser.version >= 10)) {
    (function ($, undefined) {

        var devices = [ "ios7", "ios", "android", "blackberry", "wp", "flat" ], CtrlDown = false,
            originalToggle, visibleOSes, wasActive, helpRead,
            deviceClasses = $.map(devices, function (value) { return ".km-" + value; }),
            extend = $.extend, importWindow, exportWindow,
            each = $.each,
            dragging = false,
            globalUndoBuffer = [],
            globalRedoBuffer = [],
            click = kendo.support.touch ? "touchend" : "click",
            defaultCSS = { cursor: "default", background: "", color: "", "border-color": "", font: "", "text-shadow": "" },
            browsers = [ "-webkit-", "-moz-", "-ms-" ],
            propertyTargets = {
                color: [ "background-color", "color", "border-color" ],
                gradient: [ "background-image" ],
                pattern: [ "background-image" ],
                font: [ "font" ]
            },
            packages = {
                color: [ "background-color" ],
                "background-color": [ "background-color" ],
                "border-color": [ "background-color" ],
                "background-image": [ "background-image", "background-repeat", "background-position" ],
                gradient: [ "background-image" ],
                pattern: [ "background-image", "background-repeat", "background-position" ],
                font: [ "font-family", "font-size", "font-weight", "font-style", "line-height", "text-shadow" ]
            },
            tools = {
                color: new Color(),
                gradient: new Gradient(),
                pattern: {
                    get: function () { return this.result; },
                    set: function (result) { this.result = result; return this; }
                },
                font: {
                    get: function () { return this.result; },
                    set: function (result) { this.result = result; return this; }
                }
            },
            engineTool = null,
            backgroundSplitRegExp = /\s*,\s*(?=-|url)/i,
            properties = propertyTargets.color.concat(propertyTargets.gradient, propertyTargets.pattern, propertyTargets.font),
            TRANSITION = kendo.support.transitions.css + "transition",
            fillSvg = 'url(\'data:image/svg+xml;utf-8,<svg version="1.1" xmlns="http:%2F%2Fwww.w3.org%2F2000%2Fsvg" xmlns:xlink="http:%2F%2Fwww.w3.org%2F1999%2Fxlink" width="28" height="38"><linearGradient id="shadow" gradientUnits="userSpaceOnUse" x1="14" y1="25" x2="14" y2="0"><stop offset="0" style="stop-color:rgba(0,0,0,.3)"%2F><%2FlinearGradient><path fill="url(%23shadow)" d="M26.667,15.236c0-6.996-5.671-12.667-12.667-12.667c-6.995,0-12.667,5.672-12.667,12.667c0,4.78,2.651,8.938,6.562,11.097 C10.695,31.772,14,36.95,14,36.95s3.305-5.178,6.105-10.617C24.017,24.175,26.667,20.017,26.667,15.236z"%2F><path fill="%23FFF" d="M26.667,13.819c0-6.996-5.671-12.667-12.667-12.667c-6.995,0-12.667,5.672-12.667,12.667 c0,4.78,2.651,8.938,6.562,11.097C10.695,30.355,14,35.533,14,35.533s3.305-5.178,6.105-10.617 C24.017,22.758,26.667,18.6,26.667,13.819z"%2F><linearGradient id="ID" gradientUnits="userSpaceOnUse" x1="50%" y1="0" x2="50%" y2="28"><stop offset="0"%2F><%2FlinearGradient><circle fill="url(%23sq)" cx="14" cy="14" r="11"%2F><pattern id="sq" patternUnits="userSpaceOnUse" x="0" y="0" width="14" height="14" patternTransform="rotate(45)"><rect fill="%23888" x="0" y="0" width="14" height="14"%2f><rect fill="%23666" x="0" y="0" width="7" height="7"%2f><rect fill="%23666" x="7" y="7" width="7" height="7"%2f></pattern><circle fill="url(%23ID)" cx="14" cy="14" r="11"%2F><path fill="rgba(0,0,0,.3)" d="M14,4.403c5.616,0,10.189,4.413,10.473,9.958c0.009-0.18,0.027-0.359,0.027-0.542c0-5.799-4.701-10.5-10.5-10.5 S3.5,8.021,3.5,13.82c0,0.183,0.018,0.361,0.027,0.542C3.811,8.816,8.384,4.403,14,4.403z"%2F><linearGradient id="gr1" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="100%" y2="100%"><stop offset=".25" stop-color="%23666"%2F><stop offset=".25" stop-opacity="0"%2F><%2FlinearGradient><linearGradient id="gr2" gradientUnits="userSpaceOnUse" x1="0" y1="100%" x2="0" y2="100%"><stop offset=".25" stop-color="%23666"%2F><stop offset=".25" stop-opacity="0"%2F><%2FlinearGradient><linearGradient id="gr3" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="100%" y2="100%"><stop offset=".75" stop-opacity="0"%2F><stop offset=".75" stop-color="%23666"%2F><%2FlinearGradient><linearGradient id="gr4" gradientUnits="userSpaceOnUse" x1="0" y1="100%" x2="0" y2="100%"><stop offset=".75" stop-opacity="0"%2F><stop offset=".75" stop-color="%23666"%2F><%2FlinearGradient><%2Fsvg>\')',
            ie10fillSvg = "<div class='ie10hint'>" + fillSvg.replace("url(\'data:image/svg+xml;utf-8,", "").replace(/\)$/, "").replace(/%2f/gi, "/").replace(/%23/gi, "#") + "</div>",
            cursorSvg = fillSvg + ' 14 37, crosshair',
            defaultColor = '<circle fill="url(%23ID)" cx="14" cy="14" r="11"%2F>',
            defaultIE10Color = '<circle fill="url(#ID)" cx="14" cy="14" r="11"/>',
            defaultPattern = '<circle fill="url(%23pattern)" cx="14" cy="14" r="11"%2F><pattern id="pattern" patternUnits="userSpaceOnUse" x="0" y="0" width="8" height="8"><image x="0" y="0" width="8" height="8" xlink:href="##" clip-path="url(%23clipmask)" %2F><%2Fpattern>',
            defaultFont = '<text x="14" y="17" width="28" text-anchor="middle" fill="%23fff" style="##">Aa<%2Ftext>',
            defaultStop = '<linearGradient id="ID" gradientUnits="userSpaceOnUse" x1="50%" y1="0" x2="50%" y2="28"><stop offset="0"%2F><%2FlinearGradient>',
            defaultIE10Stop = '<linearGradient id="ID" gradientUnits="userSpaceOnUse" x1="50%" y1="0" x2="50%" y2="28"><stop offset="0"/></linearGradient>',
            ui = kendo.ui,
            Widget = ui.Widget,
            applications = {},
            counter = 1,
            clones = extend([], devices),
            widgetList = {
                listitemactiveicon: {
                    name: "Active List Icon",
                    selector: ".km-state-active .km-listview-link .km-icon",
                    whitelist: [ "color", "background-image" ]
                },
                activeicon: {
                    name: "Active Icon",
                    selector: ".km-state-active span.km-icon",
                    whitelist: [ "color", "background-image" ]
                },
                icon: {
                    name: "Icon",
                    selector: ".km-icon",
                    whitelist: [ "color", "background-image", "width", "height" ]
                },
                activetext: {
                    name: "Active Text",
                    selector: ".km-active-state .km-text",
                    whitelist: [ "color" ],
                    blacklist: ".km-android .km-tabstrip .km-text, .km-blackberry .km-tabstrip .km-text, .km-meego .km-tabstrip .km-text"
                },
                text: {
                    name: "Text",
                    selector: ".km-text",
                    whitelist: [ "color" ],
                    blacklist: ".km-android .km-tabstrip .km-text, .km-blackberry .km-tabstrip .km-text, .km-meego .km-tabstrip .km-text"
                },
                grouptitleinset: {
                    name: "Group Title Inset",
                    selector: ".km-listgroupinset .km-group-title",
                    whitelist: [ "color", "background-color", "background-image" ]
                },
                grouptitle: {
                    name: "Group Title",
                    selector: ".km-listgroup .km-group-title",
                    whitelist: [ "color", "background-color", "background-image" ]
                },
                viewtitle: {
                    name: "View Title",
                    selector: ".km-view-title > *",
                    whitelist: [ "color" ]
                },
                listitemactivelink: {
                    name: "Active List Link",
                    selector: ".km-state-active .km-listview-link",
                    whitelist: [ "background-color", "background-image", "border-radius", "color", "border-color" ]
                },
                listitem: {
                    name: "List Item",
                    selector: ".km-list > li",
                    activeSelector: ".km-state-active",
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
                    selector: ".km-android .km-switch-on .km-switch-handle",
                    whitelist: [ "border-color" ]
                },
                switchhandleoff: {
                    name: "Inactive Switch Handle",
                    selector: ".km-android .km-switch-off .km-switch-handle",
                    whitelist: [ "border-color" ]
                },
                switchhandle: {
                    name: "Switch Handle",
                    selector: ".km-switch-handle",
                    whitelist: [ "width", "height", "background-color", "background-image" ]
                },
                switchon: {
                    name: "Switch On Label",
                    selector: ".km-switch-label-on",
                    whitelist: [ "left", "width", "height", "color" ]
                },
                switchoff: {
                    name: "Switch Off Label",
                    selector: ".km-switch-label-off",
                    whitelist: [ "left", "width", "height", "color" ]
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
                    whitelist: [ "background-color", "background-image", "font" ],
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
                    whitelist: [ "background-color", "color", "background-image", "font" ],
                    children: [ "button", "listview", "scrollview", "switch", "buttongroup" ]
                },
                tabstrip: {
                    name: "TabStrip",
                    selector: ".km-tabstrip",
                    whitelist: [ "background-color", "background-image", "border-color", "border-width", "border-style", "font" ],
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
                ios7: {
                    selector: ".km-ios7"
                },
                android: {
                    selector: ".km-android"
                },
                blackberry: {
                    selector: ".km-blackberry"
                },
                wp: {
                    selector: ".km-wp"
                },
                flat: {
                    selector: ".km-flat"
                },
                meego: {
                    selector: ".km-meego"
                }
            },
            pickers = {},

            defaults = {
                color: [
                    { "background-color": "#c5007c" },
                    { "background-color": "#6300a5" },
                    { "background-color": "#0010a5" },
                    { "background-color": "#0064b5" },
                    { "background-color": "#00a3c7" },
                    { "background-color": "#0fad00" },
                    { "background-color": "#8cc700" },
                    { "background-color": "#ff0" },
                    { "background-color": "#fec500" },
                    { "background-color": "#ff9400" },
                    { "background-color": "#f60" },
                    { "background-color": "#f00" },

                    { "background-color": "#fff" },
                    { "background-color": "#e5e5e5" },
                    { "background-color": "#ccc" },
                    { "background-color": "#b2b2b2" },
                    { "background-color": "#999" },
                    { "background-color": "#7f7f7f" },
                    { "background-color": "#666" },
                    { "background-color": "#4c4c4c" },
                    { "background-color": "#333" },
                    { "background-color": "#191919" },
                    { "background-color": "#000" },
                    { "background-color": "none" }
                ],

                gradient: [
                    { "background-image": "linear-gradient(top, #fff, rgba(255,255,255,.2) 50%, rgba(255,255,255,.3) 50%, rgba(255,255,255,.7))" },
                    { "background-image": "linear-gradient(top, rgba(255,255,255,.2), rgba(255,255,255,.4) 50%, rgba(255,255,255,.5) 50%, rgba(255,255,255,.8))" },
                    { "background-image": "linear-gradient(top, rgba(255,255,255,.2), rgba(255,255,255,.35) 50%, rgba(255,255,255,.45) 50%, rgba(255,255,255,.4))" },
                    { "background-image": "linear-gradient(top, rgba(255,255,255,.2), rgba(255,255,255,.4) 50%, rgba(255,255,255,.45) 50%, rgba(255,255,255,.4))" },
                    { "background-image": "linear-gradient(top, rgba(255,255,255,.6), rgba(255,255,255,.35) 50%, rgba(255,255,255,.4) 50%, rgba(255,255,255,.6))" },
                    { "background-image": "linear-gradient(top, rgba(255,255,255,.4), rgba(255,255,255,.6))" },
                    { "background-image": "linear-gradient(top, rgba(255,255,255,.2), rgba(255,255,255,.8))" },
                    { "background-image": "linear-gradient(top, rgba(255,255,255,.5), rgba(255,255,255,.2) 50%, rgba(255,255,255,.5))" },
                    { "background-image": "linear-gradient(top, rgba(255,255,255,.5), rgba(255,255,255,.2) 73%, rgba(255,255,255,.5))" },
                    { "background-image": "linear-gradient(top, rgba(255,255,255,.2), rgba(255,255,255,.5) 73%, rgba(255,255,255,.2))" },
                    { "background-image": "linear-gradient(top, rgba(255,255,255,.2), rgba(255,255,255,.35) 12%, rgba(255,255,255,.65) 40%, rgba(255,255,255,.4) 80%, rgba(255,255,255,.6))" },

                    { "background-image": "linear-gradient(top, rgba(0,0,0,.2), rgba(0,0,0,.4) 50%, rgba(0,0,0,.5) 50%, rgba(0,0,0,.8))" },
                    { "background-image": "linear-gradient(top, rgba(0,0,0,.2), rgba(0,0,0,.35) 50%, rgba(0,0,0,.45) 50%, rgba(0,0,0,.4))" },
                    { "background-image": "linear-gradient(top, rgba(0,0,0,.2), rgba(0,0,0,.4) 50%, rgba(0,0,0,.45) 50%, rgba(0,0,0,.4))" },
                    { "background-image": "linear-gradient(top, rgba(0,0,0,.6), rgba(0,0,0,.35) 50%, rgba(0,0,0,.4) 50%, rgba(0,0,0,.6))" },
                    { "background-image": "linear-gradient(top, rgba(0,0,0,.4), rgba(0,0,0,.6))" },
                    { "background-image": "linear-gradient(top, rgba(0,0,0,.2), rgba(0,0,0,.8))" },
                    { "background-image": "linear-gradient(top, rgba(0,0,0,.5), rgba(0,0,0,.2) 50%, rgba(0,0,0,.5))" },
                    { "background-image": "linear-gradient(top, rgba(0,0,0,.5), rgba(0,0,0,.2) 73%, rgba(0,0,0,.5))" },
                    { "background-image": "linear-gradient(top, rgba(0,0,0,.2), rgba(0,0,0,.5) 73%, rgba(0,0,0,.2))" },
                    { "background-image": "linear-gradient(top, rgba(0,0,0,.2), rgba(0,0,0,.35) 12%, rgba(0,0,0,.65) 40%, rgba(0,0,0,.4) 80%, rgba(0,0,0,.6))" },
                    { "background-image": "none" }
                ],

                pattern: [
                    { "background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAECAYAAACk7+45AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABhJREFUeNpiYGBg+M+ADfxn/P8fIgMQYAA+7gT90CvwKgAAAABJRU5ErkJggg==)" },
                    { "background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADCAYAAABWKLW/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAB1JREFUeNpiZGBg+A8EjECagRHIYIABJgYkABBgAM3TBv+4J7s8AAAAAElFTkSuQmCC)" },
                    { "background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAB5JREFUeNpiYGBg+M8ABf//w5nYBf6DBBjRRQECDADOlA30CxD9AQAAAABJRU5ErkJggg==)" },
                    { "background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAICAYAAADeM14FAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACBJREFUeNpiYGBg+M8ABf//w5nkCvwHCTCiixIWAAgwAP5EGepXPmrSAAAAAElFTkSuQmCC)" },
                    { "background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABxJREFUeNpiZGBg+A8EjAxQwAjkMCADwgIAAQYAGS4M+cNlSrIAAAAASUVORK5CYII=)" },
                    { "background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHVJREFUeNpiZGBgaGCAgL////9vZkADjIyMVUCKjQlJ7DEDdgAWhym8A8TrcSjcBJJnBFqHbA0fkPIGYhWo5q1A+U/IJsKAPxCrAzEzlA6CSaArlMXFZ8LmcGx8JmwOx+ZBRiCuRXc4WjiCPciEzeHYPAgQYADTTSDE4AZRlgAAAABJRU5ErkJggg==)" },
                    { "background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAKCAYAAACE2W/HAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHxJREFUeNpiZGBgaGCAgL////9vZiAAGBkZq4AUGxOS2GMG4gBYHUzjHSBeT6TGTSD1jEDnYXMOH5DyBmIVqKFbgeo+IathwmGqPxCrAzEzlA5CV4BLoywBPk6NjwnwcWrcBPUbzoBjBOJaXAGAIx7BAceELwDwBRxAgAEAdXkgxF84rxcAAAAASUVORK5CYII=)" },
                    { "background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAKCAYAAACE2W/HAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAK5JREFUeNpiZGBgaGCAgL9QzMaAAH/////fjMRnYGRkrAKpYUISewzFDGhiDNjEYBrvAPF6IN4EZSOLoQOwGkYgwQd0zic05/ABKW8gVoEasBUqBRcDaUwAalyApjEWSCkjCT2A+h8uxgLEslicI4uF/xdZgAlfAOALOJBT+YFO/YjmVH4g5Yvkx81QKV9kP9biCgCQGK6AA/mRGYjVgZgdLQBgYgvQnO0PUgMQYAB8nzZRZvZqnQAAAABJRU5ErkJggg==)" },
                    { "background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAOCAYAAAAWo42rAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAALNJREFUeNpiZGBgqALix0C8EYiLGFDBXyCeBMR+zEDCGYiFoPgDlIaB20CsAcQqTEiCKkC8GYgfQE0C0Vuh4gwsSArv/P///yOQXoBsNyMj4x2Yici6sQGwLTCFfxnwg78ghWxArAzE3jgU+YLkkd2oAnQPPygogFgWKcjAngEFjwN6UEDFUYKMCVtQYAsyRmCQIAdFDJrim0D55SAGE7agwBZkTNiCAluQMWELCmxBBhBgAMO1Mzvr3GK6AAAAAElFTkSuQmCC)" },
                    { "background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQ9JREFUeNqMkz8KwjAUxpP4B6GiuDq4CNrdsR7AGzg7OioewBO4egYXDyHSC+hSsKurVCyIS/0Cr8WG2LwHv6bkvXwvCV+kEGIryvHMsmwn/oSUco2hY84rS20kqsOaN4U+IHQIhVRXirohcgAPbL+LcQpGQP8n4AZOOLbO67o5aBZHBhva7lmLgKFZZDaDWAyxHjUbg7bE5O9F6u5L0Ko42hvssS6puqPAISIoH7gu2xe88F1CHlPIcwmlTKHUJRQxhSKXkNVsHNNqH61ys5HxnD4CMRm1MG0Nnxnogwm4U9EVNOhxasEXuIAj1ehmCzDI7SKN1281m/H6raZVHLNxTKs4ZuPkFcdsnPxXgAEAitpFKbukwF4AAAAASUVORK5CYII=)" },
                    { "background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAANtJREFUeNpiZGBgaGCAgNP////fysjIWAtkMzOQCJig9C8gPgZlf2UgAzBBDVkJdM17oGv4geyf5BjECMSCUEOUgexwIGYjQt9fIP4BxNxA/AWIb7IAiXygIZ+BNBeRYQP2ARDfBWKQD+yAWIUFKslLpA9eAfFyIH4PxCg+YCIxKDhAwQB1SShyMJBqEDeUtgYZii36iQWwpKGBKx0RC26iuYwsg/AmWiYSDMGbaFmISWxAfIRQomUhJrEBsTGhRMtCTGIjJtEyEZPYSClG8CY2Ug3CmdiIAQABBgCRyUSyesNqjgAAAABJRU5ErkJggg==)" },
                    { "background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAUCAYAAACEYr13AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAaJJREFUeNqUks1ugkAQx4FdRUUq4EeTXlqTNo16gcZ40hfoS/SNfCx7a9OTTW+aNLERCEKQb+iQ1IYa2E0n2Zgd3P/8Z+bHDofDK+YnEELsaDTSeJ6PmYoIggCv1+vXJEmy/M4VP3a7Xb7X6zGkGAwGbP6/0/2PwHQ6vW61Wpgk0Gg00Gw2u/l1LcuyOJ/PpcVicYcxlkzTDKMoSkki+RtVVaVOpxOyy+XyKQzDZL/fe7quB67rxgwlBEHA0Crf7/ebeLVafTH/jLxIfjabjYurJn04HETHcS7AHV+v1wNRFG2w7JxvCJc9NgxDsm3bh3hO09SEnAJzuY/jWFYUxYJBRpUCYK0JVS34fTnlYOc63HWorh6PR6EowJW1AALvZXlw8MGybFbMcSUT9qCKVzE8DzjxiQLnpNFI5Wik0UhF4/H4lkTadrv1SaSWbSHe7XY+WG1PJpMHTdNQgVT/nFRMI41GJYK1PAI0bVgRBxZjOCntUQ4btNIBp5cIEP2Engw4ClAn1mq1iCRyItWyrBDW/YazLEtJpNFI5Wik0Uj9FmAAlmwVK4mYI6QAAAAASUVORK5CYII=)" },

                    { "background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE8AAABPCAYAAACqNJiGAAATuUlEQVR4Xo3c64oFtRKG4b4OEVERRUVRPCEeUPHC5tI334IHXopB9o+m13TSSVXlq2PS8/z0009v33zzzdu333779vnnn7999913b99///3bnu/v/d71+++/v/3yyy9vX3311drX/9X3yy+/fPX9+eef377++uu3H3/88fXs119/ffviiy/efvjhhz3b782z58ZY256tfeO92j/++OM9X7/Nt7E33sbee/v79fuvv/5C665X+2effbbno3Vte7b7xt618dYXf2vbXHs2Xvd7Y4wez9G59rWh+TXWs0ExtY4Y28CE0hf30h9//DGGdq19bRvD++uztv2N4bW9nmPk008/xcSujbE2fSfs9R8jm2PjbX6LtnF3X/t+j/793jidt/RsYfZ+hbXn6zP6N9764gVINuZoWBvaXvdnjQgYuqwIAsYkFGB2d8SvbQSYaH0Rsmtjrg3hG2dE7/3Nu76Qumto2fX3339jbP031p7tbr7ezb07QZeu15i//fbbhEA4wLFrvwmODAia5r1kAWwb/4E0L3lh0oayPQNlKqIfFZtwdt970ER1MEYFEb42jI8wQt19yBs6xrA++9u8u482qofxzUOge4b2zWfO3StcYCha23/tALA58THkEQDEsHd7Nqagbs8QOKbWBtYblPrsvsHXF6GD/dqLDMJh9ywa4ox1Ga993HsvOwcEBEKl2eT1HXo2LxDUzHzyySe06EWX92vGqD+5PBtog+/lEQQ9I5S66GMQKrhnmMFkDTJbQoiEtGsEUmEMErSFoxEQiukKlwAIyiKOTu9DHvuMJ5rTRV2bhV9/9z3HBxA9DDiCuoJVA4whyoSEQEXYTUKk5vpQObauKMcAIhl/am8sAudUoGlCWj80Yh6i2VwI02d3zml2dc/Rs4v24YPjetaJzdgEVRUCorLUmqpr44EwDo0udoywd10Bcx5UBWrR0vk4I7RAIy8o9MIs1HN861fzQW0hcTRsbB4amGrShvBnxIHlJgNVAhmSPvjgAw4A0wiEiN0J2EVor3eEJgTEhmDeIrrWbwRCYdHKO6LFQkPp2iHQew2fRguhQXDtez04YUEsraO2Oo4pDIE0DwOVUFgV4Dg4AEYYsww9IZkcM4gnWMEqQjkbAoNkizTUvN4jbOpNeOyhqODPP/+EMheUrt187GMFT6Cv/s8YJxABMS9WgRlgdwxABG9q1ef9EEyQm0ymUUdDmM0ioK0BK48J4c0+MMj0sHHTGqhrWMRZiCu7kITcSGEyGu34x/uzVQBvq2EyKyBNA2Hei010sTuEQaC1WVSuqRrVKtGYgrD1G7KoPFqYD7aKpzX32qERn0PqzWqKKmhlZsyHD9r6aCR5g44IjHl5tg8zJebGiP5u2NLgmXpyHFKrMVVamtFMcP5uuFTHQRhMgbEJEbIgunFbbfkQu7FmgvZsAPPe5tX34aJBkXBqgJtKQZnV3dU0yoqJHRvmIK6ebhe0dQ7jQCTVQmvzYva3c9EM9nbtFrrzQi/BMgW89S70mlfE8LANXjTppM1rMeJQ0/iNULwnUIUuxNSQQwOmRwhiR8vekxZhZEgjCPaZdvCsZZCamx/N8nHv3pydCWgQDSDex8sTI85JUA2EgvgMp9WEEugjOEKoyxc482oloOEFpt/1bIRyU8VbJvv333/XNqdlvhcQCPzaaFpUb87L1izp2zvh1bMSJFthFQ0GcdABfQw6qJv4pknahTVQW+E0u+nfkDiENpmH+BdCqbhM5KOPPuJ5jYXWd0tPlYMxOj+BP2NE5USkj2l/IwSDI0RKtQmHyNrD2iD2oivGIAtWCbLMcSZNvdZ/Yw1Js6fMTePBPSO8Vlxo0dIvhdlWh4xTMyMVAxZ5M/v50OeGBQRIhcugST27No3wmv/WuBOkRevKU/GbImGudg6yRuOEqR9H1jTylsJoy/iBvr0jTdvzFkwJURRCBs9+gORelPxj5GYfPGPL3OwEQhGNQQZdBZrjEdDuYj4aWG9+wlcc1ZepIFQgAABoVgVvZgLVuzc+lRvTHMi9dnnjru3RoJNQAOFJTzybDdnzDTIb0zDFb5O3rC41wgBhri+hr/3mrcZtCantBE5loU3A7B0hT70858UzAwS15+VlL+aDvP/e/OHam5aYsIxTZUGnTKQr3FJQbaCxIB+SKpjmuPOkt+RlMRoU46faYgFaHW9Kh2YaqKpNs2rzHpNvAndEVt9JWwQ+Qk1MgBUGVbbixhxBQy5iqYwx6lzq9QnBBWF1TtDXgFffev16dO/QPqBQSSZsQKq8njF16/oEyJ50oBuM1qWLBam5Z7Vrgu4m5PYjzL0xVH0hgOAh2buEVI25VZvr9Tk3fDa7kdLVVkIg+RDmY9IWNGvYC3Mvd4BbstZf2AB9xmgWw9tR65b7MXFTNQwWQcYwfpFy81waZg6Lxa7uNzOkykSLjEsTnhrhIgzhiofiu26e1N71edObbh3eKL2r2R07SGtm0UoN+qgjROlnv8K2aYsZ+Cgw8KImCJUVFEfSzOlhjzgEREKHwWJ83zXOPDNk3JJ2y/UEpQ9U8sKCZ16uKqcvU4MpqmX+VrFvvEdFmwp2u9M45qp50G/3h8cEZZN2klZbGhAjftdNxUwIveZARBNyQsKMDIbA6y1b5Z7jwaRxbIPSJggmbEgGGm02xesI9SFcmilDebqKGKaOkLNBEX3VmWAYWdDGoH3VPe8Zkpa7BdHQe+epGtUGaq/6s7NFofcrCJUa4+h3N9YtYqMHzu4Rhe+CNOrDe17hYkTGUaYhpDW4Tl7hqM4UDdQMAzfsaJkcQszJLIynbpBLBQmmthIf1JFDo3mECgz1yA81LVGYkTe2miA9aSzkvRs4N0CGBFftCWKGGjbRDr8YkGpSeXMSSjMizFqcBsPMi/EIvqcd0EVV+w65LKB/2Kka2BFE0iMeUfLLqs+IVpreHRo5lsaCDC2U6duN8Fu6goj1J9guSnfjGg4JSWQtBC5+3QVpan4V/HWMzE3VfsgDW8TIAKr7u1owpNKKjJ41ecfUu2hrWtQVF15AVmO8ls89IxzhCTtVIdbRqAWat06EzWt9r0UTc3r34ZVc1LGu3YrVYBY9JmOANxGPqbQu+GQilOohgW3T3t22Cr0awt5CIDpuCML5QJoFEQ5B79prOhqyGFsC8OGHH749mEMw+9PgFoKoSxHQgzpWtNWSq77GgEbH2BA2z9wFrNO4QTlUXadXWlVDPCNYgm9mdD0vdSULAELr46iWBpMY6GYO3YrUzwROGBgDqkE/5R8orZGvStc0WJwi9+4TN1CGMu//p2loeeuGRuilsmhiGp56S6mRiWtn9JHGFB1WslmBVSZ0xzaoKcLFi2zv3fRuP+kaxoUpVLtFAfGelLJV7ZamCAO6K0ioVSek9lD/WJ3ugbbaypn0PErjHmpaQqCvhFJVVZn2Rzy0WCRqZx6BNuR0Qxof9bjdmpQFGYtAdtEaIVkzGiZF2b6Fi4c0ezZ59walCDHpLWNDISIQrLgoZcJc7V/tC8a7wU2INKIq3pMIzXMbwjRgdzXHBowbywp10Fenpfr0EBq1s+mMiTqNrmZTNoYaOiChUb4KMIFXLVoTLCoJsKtdh9GChrm78D2n182t0lu1rJb1jI67+c337CVpU9X1Vi2629+qc4udhG61i6oilUpgHpMNjRDclTYPxiEGs9AuA/J+HRh6PVOeugskaPa8jsrvp6vWjecm3yB7E+1WGhQO6xmFLC0oQmuF1VKW52ii6sZkezkywtbeGLFXnVkDdP05LCWx2uFGDa3qPDcQHcNgulNRRRbmGr+1Bje1FEDfvdJ7VEJAyhx0UXq2z3PE18lAkpP51Lwf4Ihjm9uipWV446GhoCHw+/nBY8AN4iWOgWpi7lZjqTwEirlu2ejutiOyZ0PUz7oFALVUs8fZKlTj7uIktHXbgMq30kLgrWe6N2HgbWnXfj+E4UE3iLVVTQlDf+37rfJsbxez9nZrO3qatDZxAenGgGiaoA/HI4xiyzBcerXdvd2qPcBUdYVUwh/CtnkFRA8DfwPae6il1VgT39X1m2AqfEjkKKhmj/oTEBRPcBOmsdhdxQiqWKa6ieQuXtSurWHJ9ezoamxHw4DtYR96TEvpCdKEMFA5VPV4Fi/Kloih6mnvPqp4slufLT0VMT1KhvF75FZZjPr22JvxaUbNiQ1zdcs9v6rfgmjV/6mk3S/0hSmMZQV+swWZxI21/vnnnwmfyjHkUFEv7O/Gl/cUQ8OhIskiVO3vrptdutcdLf2koja+1Z2GcYJkKtrNYl6vBUuhAhQivujQRl2crKqHNnY3hhBEFdnQnkg3l3fuxy9Q02/SGooUEOyonNtY95u0tcvHeWuofgkPcyYROPq7UXrdd1WQCmHmOoUKGBqZCCc5e/RMnqvfPfrKRt1Sf+0UQV3ksKcAwGlBYjeQtL2b4TxeIk22hmpw1wRJWOxHP/kUZNaZ1DtjumrUkwotYhYBBFHkcDrUDR9QfwPpW2qSYkJmtwf6Hrloa43w4TneOfbPSL/7RQ+bVCT2I7sy34/yVHK16c8EIJrjULk2B3QLIeyzNLzQ9+4xN6PpKdVWoM2Pd7U8bbto19MHpNpIX1xFwDWgvGV3/ys0BFmge4rq2iDv1FNrH8rn5T1TpelJheuJCc8Y9fqN/UozwTRhaABe7XwYXl6MXSjjPGO35exnSKLZTkJsceGqI1XR1tofporUe9xM7l0BN/euqjeWY09v3VI/yIfOG1/6bdP+0birxBRlN95pu63B7oMwqFXjBq93p9741OkK2EJ1N84XSca5e6zNsfv3NU3Ck4Y4MhfIBqJbAH7YLQzUPtQ1U23O5AaudRQQgSEn36G6i6DErw2Cqj5ouej0dw16c2p3NowW3cyHE2PnOULvNQnojt/TD3wdU/BhG4HJNU1gJYvKG4G7iqymSFYU0q+a9SBjF6hlpR5/bTgkzDEmVTVuF7+OrrFmY1SoL6B2PRhgU1Kfs4rK4PdAIOT1axv9TKp4AFXuEvTryXoOpRvMhN+g+X5VTp3+r2oQnpoUNH8l6O4va1fGehrcyg8NuqvCtSvFZrWKYkWbF9bjVZ1bi2uA3WyjJxhUcKgQ4RLENfSQKlpoCcp8FTj0OX1wS/+OnynNo/fpykEJFHTC2iN/X7Q6WNPgug6ppwO6n6rUzkhb5QqKgXcUF1qWM7OBFlJf3hntQKCtG92QLWW7m/dobdbz1P6wDQhuvmtFMF+EQp7SlTyUob0xHVS0NkYV0ANtY6ROq0E79GMYDQTCFqKdzWqshyc0QTYaSg+eCPKpau78hUAR5HsMv2pbRCEU8qRLl9AGywjleHa/hEKnNKq7/S0cmP+GVxaSYHpwfW2A0nfM505t+2UUep+owRqnBmpy1ACSDIQI25QuxDPC76pBUdPiZ8MIaFaX4z3ZJKoptbpfYDZegxjoxryTT/WkHEMD+/shYgsnTzdaXJvcAKBK6lBFnbTZvSdoz8Rwt9x9d/bXZgNJaMTjNdPo4kEyxqDHhQ9q35SxFfG2mZO2sbc8b+d5GqE7JE2t7tfbENpI3+reTWF9BJ3NnW8JnC2CytpCqFX5Iawm8BwU1Be9BO53D3P6LUBnenooqcG1gkWF16NTjX0aqN7P4nkdwTUkQNZ/eelmKoRQhLQk5hm1RIswx4JcL93+tKXhzLte2n6JRWh4huaWrx6dqt8kryzU2h4b1Ny0J0ur6sIQRrsbMCVQPwcMzW8f2bYfZLA5iplVR571fkVk7nrsPi+9NK/7GN0kkss/JEol8gEIpq+tY08gdbZqqwYxmGXreLsS9e6nnrV1ztiV2XsekJCvret7nFy9OAFDVvN7qqxmyNZpr6N7EHRVx2rI/6hLi44tmDYA7vF+i3HRzVNKA+/3tU29vCvSr0ftf96wcW/8pnporqPRxmR1N675scVCJ816sod6GWi8BOJsCfddVf/PTzX1v8a3dpZ6dJUh6543rqa0KuK9nnExTp1T928rcMfihEY9wwLRBP2Ikboa87hegiLl8AqJSlblPKtjISwGHUNX3e6J+tbSqC4BuHhKz1s2Z/PGDzOA8W084a2lMXzRmrvTh4aFZU/rYpACEdCCqR7XrwAqwBF/TyA0rxUHIqbEUR9EMh8u4+669NkmbOHzfkAoIeih7m5kNbXkFOswmAsb5U8NJL3GuLMrQoGeOaFuVV2qY9Vs793/t8whNdTAYP8FiFSwp1Gpu9rjPa2A8YUikNaroU6RXO+vKo432QoTInN6Wg3puWGIuSfG2QUq46PeXVaXYPVzdZOmJf97JAJjmIJiMRnb28oxW+puXLFec3MI6/YnsyMrwfcduybpgR7E9xuFu+PU9kK64QTh3/itld8m/Q08vatmdm1OvV6zBA6D42tBFwA8uxUh86hQA0lRfcMezvDxgkHOkbMa5P/8hNOq9litD+o4IZBv+ajmonuubOCue+SMSrGjizOpEtXHcOm9X/4Uya0k1Y73uMkN2Z6GEhCGOFuMd3LpEvsAjc0OJPgNPJXlHX1AmLkxBh2yCsgtsprNMA+ty90ct8j0EU3PLjd8sbB3O7KOz3/ovp0Q/y7K7KJbBULU3vQL/JvGGa8HaW5R4X7ZrSiKMXfje1cNkd26PLWw0UVBDztOc9DSGmL5feix+hjo0m1qJED0EZ+BFQb2rjiL+hCmO2ELh96rnPCWmwMzhOCOLvO3cgLp2n1d3kjA8wbvxtWGts4DTJ7/D4rv5AJjBKngAAAAAElFTkSuQmCC)" },
                    { "background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAVCAYAAABljp99AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWpJREFUeNo0kd9LwlAUx91VnKWhYwY2fZFJ9eCmhCAMRFgQ/cU9iS+ChpAsUcLQMRHSzKttIYNgrfM1uy8fPufcH+eeIxSLxYdGo/G42+2mo9Hoq1wun0mSVGKyLH+v12sFwQgtEM5o95PjOAWKpSN/Kw1niUSC53K5CQWMY8KAs3a7/U6nFrFY7JyCGgiPxuPxUjKZjGSz2WC5XNar1erQ87w3hrP9fv9TEIQ0bRBA+CERBIE4Ho9VwzCeQTg7PlhPpVILRVFWIByJAmOsZJqm3el0ViAciTtVVSdbWrZt+yCciaJ4QleEvV5viztBONN1/XUwGFzv9/vDYyCcaZo2C8OQU6xyLKQCZ5Zl8WazOaX6bygogXBGx1yqYkP9cShxD8IP/+h2u5zm4FKfZBAepaFc+b7/47qumc/nOZV8wTm3/n9+SdUE1NUhCEfiFDOo1Wov8/ncA+FI3GYyGQxr02q1PkD4rwADAPUIvqcPnGiJAAAAAElFTkSuQmCC)" },
                    { "background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAGJJREFUeNqUkMEJAEEIA/fAWq8DO9rG7EAU3ZdwW0DyuDwNQ3AeVX0XyN4bnZeYGSzOORhwd1hkJga6GxYzg4GIWH9CFyhQVbC49jDAbDB7wmwwe8JssN+EPcfsUYAtfAIMABlKNaG74oyiAAAAAElFTkSuQmCC)" },
                    { "background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAj1JREFUeNpkU8mqIkEQTLsU9w0Vcb0ouB0E26NfoKBeRLwKzl/6EZ4U9SSCK+77+joSynHmFRTVVRkVmZEVrWs2m386nQ51u126XC70er3oe8RiMSoUCtRut2kymXD8/X7/g1ECgQAlEgkKhUK/gslkkmq1Gp9Ho1HS6/W/MI1Gg4TP51OPxyMDTqcTT0lQrVZpPp/Tdrsls9lMJpOJdrsd3e/3D0EkEiH9+XxmGUIICofDHLTZbB8CTGAejwcZDAbyeDy8b7Va5Ha7qd/v/yXBBNBqtVI+n6f9fs8V4ByZUS2+LRYLOZ1OJhwMBly5CAaDKj6u1+sHiAYul0uWCALEkex2uzEOzR0OhywRGOH3+1VZDQCoZjab8cRAxsPhwGSyYuDW6zUnRVxohyo6jiwAgvD5fPIroAJcQkZIQwIQyB6BBGRKPB4nnU7HG2QEQHoFF9BYWACkIERcvg4G9kqxWKRsNsvNwqX/fVCv1/lFvF4vN/ubACOdTpPQKmE5kLBarXj9NhJMtlgsWBKSQKKsNJPJUKVSIaE5VoWB0CBFURgEvdJIeAVpQJhNGjKXy1GpVKLpdEp66QM01uFwkOZgSqVS/M/gf4JmOYF1uVzcu3K5TOPxmKsUWjb2CQJYQYj+bDYbrgwv8G0BSMfEOfZIznJAgA2AWHu9Hr8KfgXoBwkuIC7ljkYjlmi320loOlU0EyA5pUsxjUbjxy/SSzIGWwAvtJJVBFEeyKTZvn2CHmHFuSTEQJV4lB8BBgB2zhzgn3iZ8wAAAABJRU5ErkJggg==)" },
                    { "background-image": "url(data:image/png;base64,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)" },
                    { "background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAKBJREFUeNq81T0OgCAMhmGp3IHNS7hwGnZOxM45TTB1MCHKX9J+79SFPGkXjPf+3BaLMdoQwrX6LqVkCYnlnC9CYjwTEpsGpbApUBIbgtJYF9TAmqAW9gtqYh9QG6tABPaCKOwBkRhnSiknCuPlCInxJQmJLf0WEtg0KIVNgZLYEJTGuqAG1gS1sF9QE/uA2lgFIrAXRGHc7pw7UBh3CzAAGoDd5dFuw6wAAAAASUVORK5CYII=)" },
                    { "background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAMtJREFUeNq81b0NwyAQBeBEWMxgWcgrUKHMxBY0XgF6FvAibjwIExChKC4sWf7j8B1XXfP0de+9rbUfrfX3BTzvfeOcA+dYCKGNMTZKqQQJSikT57yZpgmUY0KIbp7nVAtdwP9TC13BWugGrIHuQGr0EKRET0Eq9BKkQG9BbDQLxESzQSwUBGKgbBiGHlrAT1A2jmNb0vqlKDPGdKVTU4Iu4JN9g6IrWAvdgDXQHUiNHoKU6ClIhV6CFOgtiI1mgZhoNoiFgkAM9CfAAO0Pfd+RDuL0AAAAAElFTkSuQmCC)" },
                    { "background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAFRJREFUeNpiKigoMGJgYDBGwgpfvnwR////vwoMM0IlYOAtUMF3bm5uXphAYWEhHwM+E5BsIagArIiQAmMGggqAhjAQUgAyhIGQApAcAyEFIAwQYAD+7HsO5fo76wAAAABJRU5ErkJggg==)" },
                    { "background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAFZJREFUeNpi/P//vwoDFHz9+vUzDw8PJ5ApDBMrKCj4DyKMQAph+MuXL+JAOQUgNkbCDMZEKIQwCChEGItHIar9WBVicyi6QgZcPkJWyIDP6zCFAAEGAPRWfgx4dcnyAAAAAElFTkSuQmCC)" },
                    { "background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAABCAYAAADeko4lAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABlJREFUeNpiZGBgUGMgAvz///8LMeoAAgwAo98EGXpqjeMAAAAASUVORK5CYII=)" },
                    { "background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAYAAADn9T9+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABhJREFUeNpiZGBgUGNAA/////+CLgYQYABOywQZlafNQAAAAABJRU5ErkJggg==)" },
                    { "background-image": "none" }
                ],

                font: [
                    { font: "0.9em/normal HelveticaNeue, Roboto, 'Myriad Pro', 'Nokia Pure', Arial, sans-serif", "text-shadow" : "none" },
                    { font: "1em/normal HelveticaNeue, Roboto, 'Myriad Pro', 'Nokia Pure', Arial, sans-serif", "text-shadow" : "none" },
                    { font: "italic 1em/1.2em HelveticaNeue, Roboto, 'Myriad Pro', 'Nokia Pure', Arial, sans-serif", "text-shadow" : "none" },
                    { font: "0.9em/normal HelveticaNeue, Roboto, 'Myriad Pro', 'Nokia Pure', Arial, sans-serif", "text-shadow" : "0 -1px #000" },
                    { font: "1em/normal HelveticaNeue, Roboto, 'Myriad Pro', 'Nokia Pure', Arial, sans-serif", "text-shadow" : "0 -1px #000" },
                    { font: "italic 1em HelveticaNeue, Roboto, 'Myriad Pro', 'Nokia Pure', Arial, sans-serif", "text-shadow" : "0 -1px #000" },
                    { font: "0.9em/normal Roboto, HelveticaNeue, sans-serif", "text-shadow" : "none" },
                    { font: "1em/normal Roboto, HelveticaNeue, sans-serif", "text-shadow" : "none" },
                    { font: "italic 1em Roboto, HelveticaNeue, sans-serif", "text-shadow" : "none" },
                    { font: "0.9em/normal Roboto, HelveticaNeue, sans-serif", "text-shadow" : "0 -1px #000" },
                    { font: "1em/normal Roboto, HelveticaNeue, sans-serif", "text-shadow" : "0 -1px #000" },
                    { font: "italic 1em Roboto, HelveticaNeue, sans-serif", "text-shadow" : "0 -1px #000" },

                    { font: "0.9em/normal 'Lucida Sans Unicode', 'Lucida Grande', sans-serif", "text-shadow" : "none" },
                    { font: "1em/normal 'Lucida Sans Unicode', 'Lucida Grande', sans-serif", "text-shadow" : "none" },
                    { font: "italic 1em 'Lucida Sans Unicode', 'Lucida Grande', sans-serif", "text-shadow" : "none" },
                    { font: "0.9em/normal 'Lucida Sans Unicode', 'Lucida Grande', sans-serif", "text-shadow" : "0 -1px #000" },
                    { font: "1em/normal 'Lucida Sans Unicode', 'Lucida Grande', sans-serif", "text-shadow" : "0 -1px #000" },
                    { font: "italic 1em 'Lucida Sans Unicode', 'Lucida Grande', sans-serif", "text-shadow" : "0 -1px #000" },
                    { font: "0.9em/normal Arial, Helvetica, sans-serif", "text-shadow" : "none" },
                    { font: "1em/normal Arial, Helvetica, sans-serif", "text-shadow" : "none" },
                    { font: "italic 1em Arial, Helvetica, sans-serif", "text-shadow" : "0 -1px #000" },
                    { "font-family": "inherit", "font-size": "inherit", "font-weight": "inherit", "font-style": "inherit", "line-height": "inherit", "text-shadow" : "inherit" }
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
                        if (kendo.support.browser.msie) {
                            return $(ie10fillSvg.replace(defaultIE10Color, '<circle fill="' + element.css("background-color") + '" cx="14" cy="14" r="11"/>'));
                        } else {
                            return kendo.support.touch ?
                                $("<div " + (kendo.support.browser.msie ? "class='iehint'" : "") + "style='width: 28px; height: 38px'/>")
                                    .css("background-image", fillSvg.replace(defaultColor, '<circle fill="' + element.css("background-color") + '" cx="14" cy="14" r="11"%2F>'))
                                : undefined;
                        }
                    },
                    dragstart: function () {
                        var element = this.element,
                            color = element.css("background-color"),
                            doc = document.documentElement;

                        dragging = true;
                        element.data("property", "color");
                        element.data("background-color", tools.color.compress(color));

                        $(doc).addClass("drop-override");
                        if (!kendo.support.touch) {
                            doc.style.cssText = "cursor: " + (kendo.support.browser.msie ? "none" : cursorSvg.replace(defaultColor, '<circle fill="' + color + '" cx="14" cy="14" r="11"%2F>'));
                        }
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
                init: function (element, options) {
                    var that = this, key;

                    Widget.fn.init.call(that, element, options);
                    element = that.element;
                    options = that.options;

                    that.object = {};
                    that.undoBuffer = [];
                    that.redoBuffer = [];

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
                    platform: ""
                },
                cleanse: function() {
                    var that = this, idx;

                    for (idx in that.object) {
                        if (!that.object[idx]) {
                            delete that.object[idx];
                        }
                    }
                },
                populate: function(styles) {
                    var that = this, style;

                    that.object = kendo.deepExtend(that.object, styles);
                    that.cleanse();

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
                        undoItem = {};

                    if (output) {
                        undoItem[output] = kendo.deepExtend({}, that.object[output]);
                        that.undoBuffer.push(undoItem);

                        if (this.object[output]) {
                            style[output] = kendo.deepExtend(this.object[output], styles);
                        } else {
                            style[output] = styles;
                        }
                        that.store(output, style[output]);

                        that.populate(style);

                        if (globalUndoBuffer) {
                            globalUndoBuffer.push(that);
                        }
                    }
                },
                undo: function() {
                    var that = this, key, redoItem = {},
                        item = that.undoBuffer.pop();

                    if (item) {
                        key = Object.keys(item)[0];

                        redoItem[key] = kendo.deepExtend({}, that.object[key]);
                        that.redoBuffer.push(redoItem);
                        if (globalRedoBuffer) {
                            globalRedoBuffer.push(that);
                        }

                        that.store(key, item[key]);

                        if (!kendo.size(item[key])) {
                            item[key] = "";
                        }

                        that.populate(item);
                    }
                },
                redo: function() {
                    var that = this, key, undoItem = {},
                        item = that.redoBuffer.pop();

                    if (item) {
                        key = Object.keys(item)[0];

                        undoItem[key] = kendo.deepExtend({}, that.object[key]);
                        that.undoBuffer.push(undoItem);
                        if (globalUndoBuffer) {
                            globalUndoBuffer.push(that);
                        }

                        that.store(key, item[key]);

                        if (!kendo.size(item[key])) {
                            item[key] = "";
                        }

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
                getFullCSS: function () {
                    var object = this.object, output = "", outputs, backgrounds, firstLetter;

                    for (var i in object) {
                        output += i + " {\n";
                        for (var j in object[i]) {
                            if (j == "background-image") {
                                backgrounds = object[i][j].split(backgroundSplitRegExp);
                                outputs = [];
                                browsers.forEach(function () {
                                    outputs.push([]);
                                });

                                backgrounds.forEach(function (value) {
                                    firstLetter = value[0].toLowerCase();

                                    if (firstLetter != "u" && firstLetter != "n") {
                                        tools.gradient.set(value).get(browsers).forEach(function (val, idx) {
                                            outputs[idx].push(val);
                                        });
                                    } else {
                                        browsers.forEach(function (val, idx) {
                                            outputs[idx].push(value);
                                        })
                                    }
                                });

                                browsers.forEach(function (val, idx) {
                                    output += "    " + j + ": " + outputs[idx].join(",") + ";\n";
                                });
                            } else {
                                output += "    " + j + ": " + object[i][j] + ";\n";
                            }
                        }
                        output += "}\n";
                    }

                    return output;
                },
                mixBackground: function (css, element, replace, forceUrl) {
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
                            if (value[0].toLowerCase() == "u" || (forceUrl && value.trim() == "none")) {
                                backSplits[0].url = [ value ];
                            } else {
                                if (!forceUrl && value.trim() == "none") {
                                    backSplits[0].gradient = [ "none" ];
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

        if (localStorage) {
            try {
                helpRead = localStorage.getItem("helpRead");

                if (!helpRead) {
                    var help = $("<div class='help'><div><div class='closeHelp'></div></div></div>").appendTo(document.body);
                    $(".closeHelp").on(click, function () {
                        try {
                            localStorage.setItem("helpRead", true);
                            help.remove();
                        } catch(err) {}
                    });
                }

                visibleOSes = JSON.parse(localStorage.getItem("visibility"));
                visibleOSes.forEach(function (value) {
                    document.getElementById(value).checked = "checked";
                });
            } catch(err) {
                visibleOSes = [ "ios7box", "androidbox", "blackberrybox", "wpbox" ];
                visibleOSes.forEach(function (value) {
                    document.getElementById(value).checked = "checked";
                });
            }
        }

        window.URL = window.webkitURL || window.mozURL || window.URL;
        window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;

        extend(events, {
            gradient: extend({}, events.color, {
                hint: function (element) {
                    if (kendo.support.browser.msie) {
                        return $(ie10fillSvg.replace(defaultIE10Stop, tools.gradient.set(element.css("background-image")).get("svg")));
                    } else {
                        return kendo.support.touch ?
                            $("<div style='width: 28px; height: 38px'/>")
                                .css("background-image", fillSvg.replace(defaultStop, tools.gradient.set(element.css("background-image")).get("svg"))) :
                            undefined;
                    }
                },
                dragstart: function () {
                    var element = this.element,
                        gradient = element.css("background-image"),
                        doc = document.documentElement;

                    dragging = true;
                    element.data("property", "gradient");
                    element.data("background-image", tools.gradient.set(gradient).get());

                    $(doc).addClass("drop-override");
                    if (!kendo.support.touch) {
                        doc.style.cssText = "cursor: " + (kendo.support.browser.msie ? "none" : cursorSvg.replace(defaultStop, tools.gradient.get("svg")));
                    }
                    addRecentItem(element, "gradient");
                }
            }),
            pattern: extend({}, events.color, {
                hint: function (element) {
                    if (kendo.support.browser.msie) {
                        return $(ie10fillSvg.replace(defaultIE10Color, defaultPattern.replace("##", element.css("background-image").replace(/^url\("?|"?\)$/ig, ""))));
                    } else {
                        return kendo.support.touch ?
                            $("<div style='width: 28px; height: 38px'/>")
                                .css("background-image", fillSvg.replace(defaultColor, defaultPattern.replace("##", element.css("background-image").replace(/^url\("?|"?\)$/ig, "").replace("/", "%2F")))) :
                            undefined;
                    }
                },
                dragstart: function () {
                    var element = this.element,
                        pattern = element.css("background-image"),
                        doc = document.documentElement;

                    dragging = true;
                    element.data("property", "pattern");
                    element.data("background-image", pattern);

                    $(doc).addClass("drop-override");
                    if (!kendo.support.touch) {
                        doc.style.cssText = "cursor: " + (kendo.support.browser.msie ? "none" : cursorSvg.replace(defaultColor, defaultPattern.replace("##", pattern.replace(/^url\("?|"?\)$/ig, ""))));
                    }
                    addRecentItem(element, "pattern");
                }
            }),
            font: extend({}, events.color, {
                hint: function (element) {
                    if (kendo.support.browser.msie) {
                        return $(ie10fillSvg.replace(defaultIE10Color, defaultFont.replace("##", JSON.stringify(kendo.getComputedStyles(element[0], [ "font-family", "font-size", "font-weight", "font-style" ])).replace(/","/g, ";").replace(/"|{|}|'/g, "")).replace(/%2f/gi, "/")));
                    } else {
                        return kendo.support.touch ?
                            $("<div style='width: 28px; height: 38px'/>")
                                .css("background-image", fillSvg.replace(defaultColor, defaultFont.replace("##", JSON.stringify(kendo.getComputedStyles(element[0], [ "font-family", "font-size", "font-weight", "font-style" ])).replace(/","/g, ";").replace(/"|{|}|'/g, "")))) :
                            undefined;
                    }
                },
                dragstart: function () {
                    var element = this.element,
                        font = JSON.stringify(kendo.getComputedStyles(element[0], [ "font-family", "font-size", "font-weight", "font-style" ])).replace(/","/g, ";").replace(/"|{|}|'/g, ""),
                        doc = document.documentElement;

                    dragging = true;
                    element.data("property", "font");
                    element.data("font", element.css("font"));

                    $(doc).addClass("drop-override");
                    if (!kendo.support.touch) {
                        doc.style.cssText = "cursor: " + (kendo.support.browser.msie ? "none" : cursorSvg.replace(defaultColor, defaultFont.replace("##", font)));
                    }
                    addRecentItem(element, "font");
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

        function matchWidget(element, properties) {
            if ($(element).hasClass("km-root")) return false;

            var widget, props;

            for(var idx in widgetList) {
                widget = widgetList[idx];

                if (kendo.support.matchesSelector.call(element, widget.selector) && !kendo.support.matchesSelector.call(element, widget.blacklist)) {
                    if (properties && widget.whitelist) {
                        props = widget.whitelist.filter(function (value) { return properties.indexOf(value) !== -1 });
                        if (props.length) {
                            return kendo.deepExtend( { widget: idx, element: element, properties: props, idx: 0 }, widget );
                        }
                    } else {
                        return kendo.deepExtend( { widget: idx, element: element }, widget );
                    }
                }
            }

            return matchWidget(element.parentNode, properties);
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

        window.globalUndo = function() {
            var lastEngine = globalUndoBuffer.pop();

            if (lastEngine) {
                lastEngine.undo();
            }
        };

        window.globalRedo = function() {
            var lastEngine = globalRedoBuffer.pop();

            if (lastEngine) {
                lastEngine.redo();
            }
        };

        // Wheel scrolling affects property chooser
        kendo.mobile.ui.Scroller.prototype._wheelScroll = function(e) {};

        // Override Kendo Pane bindToRouter to avoid URL breaks and bad refresh
        kendo.mobile.ui.Pane.prototype.bindToRouter = function(router) {
            var that = this,
                options = that.options,
                initial = options.initial,
                viewEngine = this.viewEngine;

            router.bind("init", function(e) {
                var url = e.url,
                    attrUrl = router.pushState ? url : "/";

                viewEngine.rootView.attr(kendo.attr("url"), attrUrl);

                if (url === "/" && initial) {
                    router.navigate(initial, true);
                    e.preventDefault(); // prevents from executing routeMissing, by default
                }
            });

            router.bind("routeMissing", function(e) {
                if (!that.historyCallback(e.url, e.params)) {
                    e.preventDefault();
                }
            });

            router.bind("same", function() {
                that.trigger("sameViewRequested");
            });
        };

        originalToggle = kendo.mobile.ui.ListView.prototype._toggle;

        kendo.mobile.ui.ListView.prototype._toggle = function(e) {
            if ((!dragging && "mousemove touchmove".indexOf(e.type) == -1) && "mouseleave touchcancel".indexOf(e.type) == -1) {
                if (e.type != kendo.support.mouseup) {
                    wasActive = $(e.currentTarget).closest("li").hasClass("km-state-active");
                    originalToggle(e);
                } else {
                    if (!wasActive) {
                        originalToggle(e);
                    }
                }
            }
        };

        $(".device").on("mouseenter", ".km-list > li > .km-listview-link, .km-list > li > .km-listview-label, .km-button", function(e) {
            wasActive = $(e.currentTarget).hasClass("km-state-active") || $(e.currentTarget).parent().hasClass("km-state-active");
        });

        kendo.mobile.ui.Button.prototype._deactivate = function (e) {
            if ((!dragging && e.type != kendo.support.mousemove) && e.type != kendo.support.mousecancel) {
                if (e.type !== kendo.support.mouseup) {
                    wasActive = $(e.currentTarget).closest(".km-button,.km-detail").hasClass("km-state-active");
                    $(e.target).closest(".km-button,.km-detail").addClass("km-state-active");
                } else {
                    if (!wasActive) {
                        $(e.target).closest(".km-button,.km-detail").removeClass("km-state-active");
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
        each(clones.reverse(), function () {
            $("#ios7Device")
                .clone(true)
                .find("[id]") // Make sure there are no duplicate IDs.
                .each(replaceIDs)
                .end()
                .find("[data-id]")
                .each(replaceLayouts)
                .end()
                .attr("id", this.toString() + "Device")
                .insertAfter("#ios7Device");
        });

        $("#" + clones[0] + "Device [data-role=view]").attr("data-init", "initTargets");

        each(devices, function () {
            var that = this.toString(),
                deviceId = "#" + that + "Device",
                device = $(deviceId),
                checkbox = $("#" + that + "box")[0];

            applications[that] = new kendo.mobile.Application(device, {
                skin: that,
                platform: that,
                icon: {
                  "72x72" : "../content/mobilethemebuilder/images/Icon-72.png",
                  "144x144" : "../content/mobilethemebuilder/images/Icon2x.png"
                },
                updateDocumentTitle: false
            });
            engineTool = device.kendoStyleEngine({ restoreFromStorage: true, platform: that }).data("kendoStyleEngine");

            device.toggleClass("hiddenOS", !checkbox.checked);
        });

        pickers = {
            color: $(".recent-colors").kendoHSLPicker({ filter: ".drop" }).data("kendoHSLPicker"),
            gradient: $(".recent-gradients").kendoGradientPicker({ filter: ".drop", styleEngine: engineTool }).data("kendoGradientPicker"),
            pattern: $(".recent-patterns").kendoPatternPicker({ filter: ".drop", styleEngine: engineTool }).data("kendoPatternPicker"),
            font: $(".recent-fonts").kendoFontPicker({ filter: ".drop", styleEngine: engineTool }).data("kendoFontPicker")
        };

        window.initTargets = function() {
            setTimeout(function () {
                var whitelisted = false,
                    draggedElement, css, widget = false,
                    color = "transparent";

                $(document.documentElement).off("touchmove");

                $(".color-holder .drop").kendoDraggable(events.color);
                $(".gradient-holder .drop").kendoDraggable(events.gradient);
                $(".pattern-holder .drop").kendoDraggable(events.pattern);
                $(".font-holder .drop").kendoDraggable(events.font);

                function applyHint(element, target, pkg) {
                    var engine = target.parents(".device").data("kendoStyleEngine"), color;

                    css = kendo.getComputedStyles(element, pkg);

                    if (css["background-color"]) {
                        color = css["background-color"];
                        delete css["background-color"];
                        css[whitelisted] = color;
                    }

                    if (css["background-image"]) {
                        kendo.deepExtend(css, engine.mixBackground(css, target, true, $(element).attr("data-pattern") !== undefined));
                    }

                    if (draggedElement.hasClass("k-none") && css["font-family"]) {
                        packages.font.forEach(function (value) {
                            delete css[value];
                        });

                        kendo.deepExtend(css, defaults.font[defaults.font.length - 1]);
                    }

                    target.css(css);

                    widgetTarget
                        .children("div")
                        .last()
                        .children()
                        .text(whitelisted);
                }

                $(".device").on("DOMMouseScroll mousewheel", "*", function (e) {
                    if (!dragging) { return; }

                    if (widget) {
                        e.preventDefault();
                        e.stopImmediatePropagation();

                        var properties = widget.properties,
                            target = $(widget.element),
                            maxIndex = properties.length - 1;

                        widget.idx += (e.originalEvent.wheelDelta / 120 || e.originalEvent.detail / 3);
                        widget.idx < 0 && (widget.idx = maxIndex);
                        widget.idx > maxIndex && (widget.idx = 0);

                        target.css(defaultCSS);

                        whitelisted = widget.whitelist.indexOf(properties[widget.idx]) != -1 ? properties[widget.idx] : false;

                        if (!whitelisted) {
                            return;
                        }

                        applyHint(draggedElement[0], target, packages[properties[widget.idx]]);
                    }
                });

                $(".device").kendoDropTargetArea({
                    filter: getWidgets(properties).selector,
                    dragenter: function (e) {
                        draggedElement = $(e.draggable.element);

                        var properties = propertyTargets[draggedElement.data("property")];

                        widget = matchWidget(e.dropTarget[0], properties);
                        properties = widget.properties;

                        var target = $(widget.element),
                            offset = target.offset(),
                            height = target.outerHeight(),
                            widgetChildren = widgetTarget.children("div");

                        if (widget && widget.whitelist) {
                            whitelisted = widget.whitelist.indexOf(properties[widget.idx]) != -1 ? properties[widget.idx] : false;

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
                        }
                    },
                    dragleave: function () {
                        $(widget.element).css(defaultCSS);
                        widgetTarget.hide();
                    },
                    drop: function (e) {
                        if (!whitelisted) {
                            return;
                        }

                        var target = $(widget.element),
                            engines = $("#applyall")[0].checked ?
                                $.map(visibleOSes, function (value) { return $("#" + value.replace("box", "Device")).data("kendoStyleEngine"); }) :
                                [ target.parents(".device").data("kendoStyleEngine") ],
                            targetSelector = engines[0].getElementSelector(target, true);

                        target.css(defaultCSS);
                        widgetTarget.hide();

                        engines.forEach(function (value) {
                            var currentTarget = value.element.find(targetSelector);

                            if (css["background-image"]) {
                                kendo.deepExtend(css, value.mixBackground(css, currentTarget, true, draggedElement.attr("data-pattern") !== undefined));
                            }

                            value.update(currentTarget, css, ".km-" + value.options.platform + " " + targetSelector);
                        });
                    }
                });

                $(document).on({
                    keydown: function (e) { CtrlDown = e.which == 17; },
                    keyup: function (e) {
                        var Y = e.which == 89 || e.which == 121,
                            Z = e.which == 90 || e.which == 122;

                        if (e.ctrlKey && (Y || Z)) {
                            e.stopImmediatePropagation();
                            e.preventDefault();
                            if (e.shiftKey || Y) {
                                globalRedo();
                            } else {
                                globalUndo();
                            }
                        }
                        e.which == 17 && (CtrlDown = false);
                    }
                });

                $(".device").on(click, ".utility-active", function (e) {
                    var target = $(e.currentTarget),
                        width = target.outerWidth();

                    if (width - 20 < e.offsetX && e.offsetX < width && e.offsetY > 0 && e.offsetY < 20) {
                        e.stopImmediatePropagation();
                        e.preventDefault();
                    }
                });

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
                    .trigger(click)
                    .siblings(".k-state-active")
                    .removeClass("k-state-active")
            } else {
                var recent = element.clone()
                    .prependTo(".recent-" + type + "s")
                    .addClass("k-state-active")
                    .siblings(".k-state-active")
                    .removeClass("k-state-active").end();

                recent.kendoDraggable(events[type]);
                pickers[type].popup.wrapper.addClass("k-static-shown");
                pickers[type].open(recent);

                recent.on(click, function (e) {
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

        ["color", "gradient", "pattern", "font"].forEach(function (type) {
            i = 0;
            while (defaults[type][i]) {
                var value = defaults[type][i], drop, style;

                if (value["background-image"]) {
                    value["background-image"] = tools[type].set(value["background-image"]).get();
                }

                if (value["background-color"]) {

                }

                drop = $('<div class="drop"></div>')
                        .css(value)
                        .insertBefore(".recent-" + type + "s")
                        .on(click, function () {
                            addRecentItem(this, type);
                        });

                style = JSON.stringify(kendo.getComputedStyles(drop[0], packages[type]));
                drop.attr("data-" + type, (type == "color" ? value["background-color"] : engineTool.createHash(style)));

                i++;

                if (!(i % (type != "gradient" && type != "font" ? 12 : 11))) {
                   $("<br />").insertBefore(".recent-" + type + "s");
                }
            }

            $("." + type + "-holder .drop:last").addClass("k-none");
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

        $("body").css("visibility", "visible");

        $(".optionsSheet input").on("change", function () {
            $("#" + this.id.replace("box", "Device")).toggleClass("hiddenOS", !this.checked);

            visibleOSes = $(this)
                            .parents(".optionsSheet")
                            .find("label")
                            .prev(":checked")
                            .map(function() {
                                return this.id;
                            }).toArray();

            if (localStorage && localStorage.length) {
                try {
                    localStorage.setItem("visibility", JSON.stringify(visibleOSes));
                } catch(err) {}
            }
        });

        $(".optionsSheet label, .optionsSheet input").on(click, function (e) { e.stopImmediatePropagation(); });

        $(".optionsSheet").on(click, function (e) {
            e.preventDefault();

            $(".optionsSheet .items")
                .css("z-index", "");

            $(".optionsSheet .cover")
                .one(kendo.support.transitions.event, function () {
                    if ($(this).parent().hasClass("k-state-opened")) {
                        $(".optionsSheet .items").css("z-index", 10);
                    }
                }).css("overflow");

            $(this).toggleClass("k-state-opened");
        });

        importWindow = $("#importWindow").kendoWindow({
            width: "400px",
            height: "400px",
            maxHeight: "400px",
            title: "Import Styles",
            visible: false,
            modal: true
        }).data("kendoWindow");

        exportWindow = $("#exportWindow");

        exportWindow.append('<br /><br /><a class="k-button" target="_blank" download="kendo.mobile.exported.css">Download CSS</a>');

        exportWindow = exportWindow.kendoWindow({
            width: "400px",
            height: "400px",
            maxHeight: "400px",
            title: "Export Styles",
            visible: false,
            modal: true
        }).data("kendoWindow");

        $("#resetStyles").on(click, function () {
            each(devices, function () {
                var that = this.toString();

                $("#" + that + "Device").data("kendoStyleEngine").reset();
            });
        });

        $("#importStyles").on(click, function () {
            if (sessionStorage && sessionStorage.length) {
                try {
                    $("#importWindow .k-textbox")[0].value = sessionStorage.getItem("import");
                } catch(err) {}
            }

            importWindow.center().open();
        });

        $("#exportStyles").on(click, function () {
            var output = "", blob = "", BlobBuilder,
                textarea = exportWindow.element.find("textarea"),
                anchor = exportWindow.element.find("a");

            each(devices, function () {
                var that = this.toString();
                if ($("#" + that + "box")[0].checked) {
                    output += $("#" + that + "Device").data("kendoStyleEngine").getFullCSS();
                }
            });

            textarea.text(output);
            try {
                blob = new Blob([output], {type: "text/plain"});
            } catch (e) {
                BlobBuilder = window.WebKitBlobBuilder || window.MozBlobBuilder;

                if (BlobBuilder) {
                    var bb = new BlobBuilder();
                    bb.append(output);

                    blob = bb.getBlob("text/plain");
                }
            }

            if (anchor[0].download) {
                anchor.attr("href", window.URL.createObjectURL(blob));
            } else {
                anchor.remove();
                textarea.css("height", "365px");
            }

            exportWindow.center().open();
        });

        $("#import").on(click, function () {
            var imports = $("#importWindow .k-textbox")[0].value.replace(/<\s*\/.*?>/gm, ""),
                stylesheet = $("<style scoped>" + imports + "</style>").appendTo(document.body),
                styles = {}, style;

            if (stylesheet[0].sheet) {
                each((stylesheet[0].sheet.rules || stylesheet[0].sheet.cssRules), function () {
                    deviceClasses.forEach(function (value) {
                        if (this.selectorText.indexOf(value) === 0) {

                            style = {};
                            for (var i = 0, len = this.style.length; i < len; i++) {
                                if (!style[this.selectorText]){
                                    style[this.selectorText] = {};
                                }
                                style[this.selectorText][this.style[i]] = this.style[this.style[i]] || this.style[$.camelCase(this.style[i])];
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

                for (i in styles[idx]) {
                    engine.store(i, styles[idx][i]);
                }
            }

            stylesheet.remove();

            try {
                sessionStorage.setItem("import", imports);
            } catch(err) {}

            importWindow.close();
        });

        window.tools = tools;
    })(jQuery);
} else {
    $(document.body).addClass("old-browser").show();
    $(".header, .tools, .files").hide();
    $(".box").empty().html("<span class='centered'><strong>The Kendo UI Mobile <span>ThemeBuilder</span></strong><span>is fully supported in WebKit based browsers and partially supported in Firefox.</span><br>Please use a compatible desktop browser.</span>")
}
