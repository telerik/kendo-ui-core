(function(f, define){
    define([
        "../kendo.color",
        "./shapes",
        "./text-metrics"
    ], f);
})(function(){

(function($, parseFloat, Math){

    "use strict";

    /* jshint eqnull:true */
    /* jshint -W069 */

    /* -----[ local vars ]----- */

    var drawing = kendo.drawing;
    var geo = kendo.geometry;
    var slice = Array.prototype.slice;
    var browser = kendo.support.browser;

    var IMAGE_CACHE = {};

    /* -----[ exports ]----- */

    function drawDOM(element) {
        var defer = $.Deferred();
        element = $(element)[0];

        if (typeof window.getComputedStyle != "function") {
            throw new Error("window.getComputedStyle is missing.  You are using an unsupported browser, or running in IE8 compatibility mode.  Drawing HTML is supported in Chrome, Firefox, Safari and IE9+.");
        }

        if (kendo.pdf) {
            kendo.pdf.defineFont(getFontFaces());
        }

        if (element) {
            cacheImages(element, function(){
                var group = new drawing.Group();

                // translate to start of page
                var pos = element.getBoundingClientRect();
                setTransform(group, [ 1, 0, 0, 1, -pos.left, -pos.top ]);

                nodeInfo._clipbox = false;
                nodeInfo._matrix = geo.Matrix.unit();
                nodeInfo._stackingContext = {
                    element: element,
                    group: group
                };

                $(element).addClass("k-pdf-export");
                renderElement(element, group);
                $(element).removeClass("k-pdf-export");
                defer.resolve(group);
            });
        } else {
            defer.reject("No element to export");
        }

        return defer.promise();
    }

    drawing.drawDOM = drawDOM;

    drawDOM.getFontFaces = getFontFaces;

    var nodeInfo = {};
    nodeInfo._root = nodeInfo;

    var parseGradient = (function(){
        var tok_linear_gradient  = /^((-webkit-|-moz-|-o-|-ms-)?linear-gradient\s*)\(/;
        var tok_radial_gradient  = /^((-webkit-|-moz-|-o-|-ms-)?radial-gradient\s*)\(/;
        var tok_percent          = /^([-0-9.]+%)/;
        var tok_length           = /^([-0-9.]+px)/;
        var tok_keyword          = /^(left|right|top|bottom|to|center)\W/;
        var tok_angle            = /^([-0-9.]+(deg|grad|rad|turn))/;
        var tok_whitespace       = /^(\s+)/;
        var tok_popen            = /^(\()/;
        var tok_pclose           = /^(\))/;
        var tok_comma            = /^(,)/;

        return function(input) {
            var orig = input;
            function skip_ws() {
                var m = tok_whitespace.exec(input);
                if (m) {
                    input = input.substr(m[1].length);
                }
            }
            function read(token) {
                skip_ws();
                var m = token.exec(input);
                if (m) {
                    input = input.substr(m[1].length);
                    return m[1];
                }
            }

            function read_stop() {
                // XXX: do NOT use the parseColor (defined later) here.
                // kendo.parseColor leaves the `match` data in the
                // object, that would be lost after .toRGB().
                var color = kendo.parseColor(input, true);
                var length, percent;
                if (color) {
                    input = input.substr(color.match[0].length);
                    color = color.toRGB();
                    if (!(length = read(tok_length))) {
                        percent = read(tok_percent);
                    }
                    return { color: color, length: length, percent: percent };
                }
            }

            function read_linear_gradient(propName) {
                var angle;
                var to1, to2;
                var stops = [];
                var reverse = false;

                if (read(tok_popen)) {
                    // 1. [ <angle> || to <side-or-corner>, ]?
                    angle = read(tok_angle);
                    if (angle) {
                        angle = parseAngle(angle);
                        read(tok_comma);
                    }
                    else {
                        to1 = read(tok_keyword);
                        if (to1 == "to") {
                            to1 = read(tok_keyword);
                        } else if (to1 && /^-/.test(propName)) {
                            reverse = true;
                        }
                        to2 = read(tok_keyword);
                        read(tok_comma);
                    }

                    if (/-moz-/.test(propName) && angle == null && to1 == null) {
                        var x = read(tok_percent), y = read(tok_percent);
                        reverse = true;
                        if (x == "0%") {
                            to1 = "left";
                        } else if (x == "100%") {
                            to1 = "right";
                        }
                        if (y == "0%") {
                            to2 = "top";
                        } else if (y == "100%") {
                            to2 = "bottom";
                        }
                        read(tok_comma);
                    }

                    // 2. color stops
                    while (input && !read(tok_pclose)) {
                        var stop = read_stop();
                        if (!stop) {
                            break;
                        }
                        stops.push(stop);
                        read(tok_comma);
                    }

                    return {
                        type    : "linear",
                        angle   : angle,
                        to      : to1 && to2 ? to1 + " " + to2 : to1 ? to1 : to2 ? to2 : null,
                        stops   : stops,
                        reverse : reverse,
                        orig    : orig
                    };
                }
            }

            var tok = read(tok_linear_gradient);
            if (tok) {
                return read_linear_gradient(tok);
            }
        };
    })();

    // only function definitions after this line.
    return;

    function getFontFaces() {
        var result = {};
        for (var i = 0; i < document.styleSheets.length; ++i) {
            doStylesheet(document.styleSheets[i]);
        }
        return result;
        function doStylesheet(ss) {
            if (ss) {
                addRules(ss, ss.cssRules);
            }
        }
        function getTTF(el){
            var m;
            if ((m = /url\((['"]?)(.*?)\1\)\s+format\((['"]?)truetype\3\)/.exec(el))) {
                return(m[2]);
            }
            else if ((m = /url\((['"]?)(.*?\.ttf)\1\)/.exec(el))) {
                return(m[2]);
            }
        }
        function findFonts(rule) {
            var src = getPropertyValue(rule.style, "src");
            if (src) {
                return splitProperty(src).reduce(function(a, el){
                    var font = getTTF(el);
                    if (font) {
                        a.push(font);
                    }
                    return a;
                }, []);
            } else {
                // Internet Explorer
                // XXX: this is gross.  should work though for valid CSS.
                return [ getTTF(rule.cssText) ];
            }
        }
        function addRules(styleSheet, rules) {
            for (var i = 0; i < rules.length; ++i) {
                var r = rules[i];
                switch (r.type) {
                  case 3:       // CSSImportRule
                    doStylesheet(r.styleSheet);
                    break;
                  case 5:       // CSSFontFaceRule
                    var style  = r.style;
                    var family = splitProperty(getPropertyValue(style, "font-family"));
                    var bold   = /^(400|bold)$/i.test(getPropertyValue(style, "font-weight"));
                    var italic = "italic" == getPropertyValue(style, "font-style");
                    var src    = findFonts(r);
                    if (src.length > 0) {
                        addRule(styleSheet, family, bold, italic, src[0]);
                    }
                }
            }
        }
        function addRule(styleSheet, names, bold, italic, url) {
            // We get full resolved absolute URLs in Chrome, but sadly
            // not in Firefox.
            if (!(/^https?:\/\//.test(url) || /^\//.test(url))) {
                url = String(styleSheet.href).replace(/[^\/]*$/, "") + url;
            }
            names.forEach(function(name){
                name = name.replace(/^(['"]?)(.*?)\1$/, "$2"); // it's quoted
                if (bold) {
                    name += "|bold";
                }
                if (italic) {
                    name += "|italic";
                }
                result[name] = url;
            });
        }
    }

    function hasOwnProperty(obj, key) {
        return Object.prototype.hasOwnProperty.call(obj, key);
    }

    function getCounter(name) {
        name = "_counter_" + name;
        return nodeInfo[name];
    }

    function getAllCounters(name) {
        var values = [], p = nodeInfo;
        name = "_counter_" + name;
        while (p) {
            if (hasOwnProperty(p, name)) {
                values.push(p[name]);
            }
            p = Object.getPrototypeOf(p);
        }
        return values.reverse();
    }

    function incCounter(name, inc) {
        var p = nodeInfo;
        name = "_counter_" + name;
        while (p && !hasOwnProperty(p, name)) {
            p = Object.getPrototypeOf(p);
        }
        if (!p) {
            p = nodeInfo._root;
        }
        p[name] = (p[name] || 0) + (inc == null ? 1 : inc);
    }

    function resetCounter(name, val) {
        name = "_counter_" + name;
        nodeInfo[name] = val == null ? 0 : val;
    }

    function doCounters(a, f, def) {
        for (var i = 0; i < a.length;) {
            var name = a[i++];
            var val = parseFloat(a[i]);
            if (isNaN(val)) {
                f(name, def);
            } else {
                f(name, val);
                ++i;
            }
        }
    }

    function splitProperty(input, separator) {
        var ret = [];
        var last = 0, pos = 0;
        var in_paren = 0;
        var in_string = false;
        var m;

        if (!separator) {
            separator = /^\s*,\s*/;
        }

        function looking_at(rx) {
            return (m = rx.exec(input.substr(pos)));
        }

        function trim(str) {
            return str.replace(/^\s+|\s+$/g, "");
        }

        while (pos < input.length) {
            if (!in_string && looking_at(/^[\(\[\{]/)) {
                in_paren++;
                pos++;
            }
            else if (!in_string && looking_at(/^[\)\]\}]/)) {
                in_paren--;
                pos++;
            }
            else if (!in_string && looking_at(/^[\"\']/)) {
                in_string = m[0];
                pos++;
            }
            else if (in_string == "'" && looking_at(/^\\\'/)) {
                pos += 2;
            }
            else if (in_string == '"' && looking_at(/^\\\"/)) {
                pos += 2;
            }
            else if (in_string == "'" && looking_at(/^\'/)) {
                in_string = false;
                pos++;
            }
            else if (in_string == '"' && looking_at(/^\"/)) {
                in_string = false;
                pos++;
            }
            else if (looking_at(separator)) {
                if (!in_string && !in_paren && pos > last) {
                    ret.push(trim(input.substring(last, pos)));
                    last = pos + m[0].length;
                }
                pos += m[0].length;
            }
            else {
                pos++;
            }
        }
        if (last < pos) {
            ret.push(trim(input.substring(last, pos)));
        }
        return ret;
    }

    function parseColor(str, css) {
        var color = kendo.parseColor(str);
        if (color) {
            color = color.toRGB();
            if (css) {
                color = color.toCssRgba();
            } else if (color.a === 0) {
                color = null;
            }
        }
        return color;
    }

    function cacheImages(element, callback) {
        var urls = [];
        function add(url) {
            if (!IMAGE_CACHE[url]) {
                IMAGE_CACHE[url] = true;
                urls.push(url);
            }
        }
        (function dive(element){
            var bg = backgroundImageURL(getPropertyValue(getComputedStyle(element), "background-image"));
            if (/^img$/i.test(element.tagName)) {
                add(element.src);
            }
            if (bg) {
                add(bg);
            }
            for (var i = element.firstChild; i; i = i.nextSibling) {
                if (i.nodeType == 1) {
                    dive(i);
                }
            }
        })(element);
        var count = urls.length;
        function next() {
            if (--count <= 0) {
                callback();
            }
        }
        if (count === 0) {
            next();
        }
        urls.forEach(function(url){
            var img = IMAGE_CACHE[url] = new Image();
            img.onload = next;
            img.onerror = function() {
                IMAGE_CACHE[url] = null;
                next();
            };
            img.src = url;
            // hack from https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image
            // make sure the load event fires for cached images too
            if (img.complete || img.complete === undefined) {
                img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
                img.src = url;
            }
        });
    }

    function romanNumeral(n) {
        var literals = {
            1    : "i",       10   : "x",       100  : "c",
            2    : "ii",      20   : "xx",      200  : "cc",
            3    : "iii",     30   : "xxx",     300  : "ccc",
            4    : "iv",      40   : "xl",      400  : "cd",
            5    : "v",       50   : "l",       500  : "d",
            6    : "vi",      60   : "lx",      600  : "dc",
            7    : "vii",     70   : "lxx",     700  : "dcc",
            8    : "viii",    80   : "lxxx",    800  : "dccc",
            9    : "ix",      90   : "xc",      900  : "cm",
            1000 : "m"
        };
        var values = [ 1000,
                       900 , 800, 700, 600, 500, 400, 300, 200, 100,
                       90  , 80 , 70 , 60 , 50 , 40 , 30 , 20 , 10 ,
                       9   , 8  , 7  , 6  , 5  , 4  , 3  , 2  , 1 ];
        var roman = "";
        while (n > 0) {
            if (n < values[0]) {
                values.shift();
            } else {
                roman += literals[values[0]];
                n -= values[0];
            }
        }
        return roman;
    }

    function alphaNumeral(n) {
        var result = "";
        do {
            var r = n % 26;
            result = String.fromCharCode(97 + r) + result;
            n = Math.floor(n / 26);
        } while (n > 0);
        return result;
    }

    function backgroundImageURL(backgroundImage) {
        var m = /^\s*url\((['"]?)(.*?)\1\)\s*$/i.exec(backgroundImage);
        if (m) {
            return m[2];
        }
    }

    function pushNodeInfo(element, style, group) {
        nodeInfo = Object.create(nodeInfo);
        nodeInfo[element.tagName.toLowerCase()] = {
            element: element,
            style: style
        };
        var decoration = getPropertyValue(style, "text-decoration");
        if (decoration && decoration != "none") {
            var color = getPropertyValue(style, "color");
            decoration.split(/\s+/g).forEach(function(name){
                if (!nodeInfo[name]) {
                    nodeInfo[name] = color;
                }
            });
        }

        if (createsStackingContext(element)) {
            nodeInfo._stackingContext = {
                element: element,
                group: group
            };
        }
    }

    function popNodeInfo() {
        nodeInfo = Object.getPrototypeOf(nodeInfo);
    }

    function updateClipbox(path) {
        if (nodeInfo._clipbox != null) {
            var box = path.bbox(nodeInfo._matrix);
            if (nodeInfo._clipbox) {
                nodeInfo._clipbox = geo.Rect.intersect(nodeInfo._clipbox, box);
            } else {
                nodeInfo._clipbox = box;
            }
        }
    }

    function createsStackingContext(element) {
        var style = getComputedStyle(element);
        function prop(name) { return getPropertyValue(style, name); }
        if (prop("transform") != "none" ||
            (prop("position") != "static" && prop("z-index") != "auto") ||
            (prop("opacity") < 1)) {
            return true;
        }
    }

    function getComputedStyle(element, pseudoElt) {
        return window.getComputedStyle(element, pseudoElt || null);
    }

    function getPropertyValue(style, prop) {
        return style.getPropertyValue(prop) ||
            ( browser.webkit && style.getPropertyValue("-webkit-" + prop )) ||
            ( browser.firefox && style.getPropertyValue("-moz-" + prop )) ||
            ( browser.opera && style.getPropertyValue("-o-" + prop)) ||
            ( browser.msie && style.getPropertyValue("-ms-" + prop))
        ;
    }

    function pleaseSetPropertyValue(style, prop, value, important) {
        style.setProperty(prop, value, important);
        if (browser.webkit) {
            style.setProperty("-webkit-" + prop, value, important);
        } else if (browser.firefox) {
            style.setProperty("-moz-" + prop, value, important);
        } else if (browser.opera) {
            style.setProperty("-o-" + prop, value, important);
        } else if (browser.msie) {
            style.setProperty("-ms-" + prop, value, important);
            prop = "ms" + prop.replace(/(^|-)([a-z])/g, function(s, p1, p2){
                return p1 + p2.toUpperCase();
            });
            style[prop] = value;
        }
    }

    function getBorder(style, side) {
        side = "border-" + side;
        return {
            width: parseFloat(getPropertyValue(style, side + "-width")),
            style: getPropertyValue(style, side + "-style"),
            color: parseColor(getPropertyValue(style, side + "-color"), true)
        };
    }

    function saveStyle(element, func) {
        var prev = element.style.cssText;
        var result = func();
        element.style.cssText = prev;
        return result;
    }

    function getBorderRadius(style, side) {
        var r = getPropertyValue(style, "border-" + side + "-radius").split(/\s+/g).map(parseFloat);
        if (r.length == 1) {
            r.push(r[0]);
        }
        return sanitizeRadius({ x: r[0], y: r[1] });
    }

    function getContentBox(element) {
        var box = element.getBoundingClientRect();
        box = innerBox(box, "border-*-width", element);
        box = innerBox(box, "padding-*", element);
        return box;
    }

    function innerBox(box, prop, element) {
        var style, wt, wr, wb, wl;
        if (typeof prop == "string") {
            style = getComputedStyle(element);
            wt = parseFloat(getPropertyValue(style, prop.replace("*", "top")));
            wr = parseFloat(getPropertyValue(style, prop.replace("*", "right")));
            wb = parseFloat(getPropertyValue(style, prop.replace("*", "bottom")));
            wl = parseFloat(getPropertyValue(style, prop.replace("*", "left")));
        }
        else if (typeof prop == "number") {
            wt = wr = wb = wl = prop;
        }
        return {
            top    : box.top + wt,
            right  : box.right - wr,
            bottom : box.bottom - wb,
            left   : box.left + wl,
            width  : box.right - box.left - wr - wl,
            height : box.bottom - box.top - wb - wt
        };
    }

    function getTransform(style) {
        var transform = getPropertyValue(style, "transform");
        if (transform == "none") {
            return null;
        }
        var matrix = /^\s*matrix\(\s*(.*?)\s*\)\s*$/.exec(transform);
        if (matrix) {
            var origin = getPropertyValue(style, "transform-origin");
            matrix = matrix[1].split(/\s*,\s*/g).map(parseFloat);
            origin = origin.split(/\s+/g).map(parseFloat);
            return {
                matrix: matrix,
                origin: origin
            };
        }
    }

    function radiansToDegrees(radians) {
        return ((180 * radians) / Math.PI) % 360;
    }

    function parseAngle(angle) {
        var num = parseFloat(angle);
        if (/grad$/.test(angle)) {
            return Math.PI * num / 200;
        }
        else if (/rad$/.test(angle)) {
            return num;
        }
        else if (/turn$/.test(angle)) {
            return Math.PI * num * 2;
        }
        else if (/deg$/.test(angle)) {
            return Math.PI * num / 180;
        }
    }

    function setTransform(shape, m) {
        m = new geo.Matrix(m[0], m[1], m[2], m[3], m[4], m[5]);
        shape.transform(m);
        return m;
    }

    function setClipping(shape, clipPath) {
        shape.clip(clipPath);
    }

    function addArcToPath(path, x, y, options) {
        var points = new geo.Arc([ x, y ], options).curvePoints(), i = 1;
        while (i < points.length) {
            path.curveTo(points[i++], points[i++], points[i++]);
        }
    }

    function sanitizeRadius(r) {
        if (r.x <= 0 || r.y <= 0) {
            r.x = r.y = 0;
        }
        return r;
    }

    function elementRoundBox(element, box, type) {
        var style = getComputedStyle(element);

        var rTL = getBorderRadius(style, "top-left");
        var rTR = getBorderRadius(style, "top-right");
        var rBL = getBorderRadius(style, "bottom-left");
        var rBR = getBorderRadius(style, "bottom-right");

        if (type == "padding" || type == "content") {
            var bt = getBorder(style, "top");
            var br = getBorder(style, "right");
            var bb = getBorder(style, "bottom");
            var bl = getBorder(style, "left");
            rTL.x -= bl.width; rTL.y -= bt.width;
            rTR.x -= br.width; rTR.y -= bt.width;
            rBR.x -= br.width; rBR.y -= bb.width;
            rBL.x -= bl.width; rBL.y -= bb.width;
            if (type == "content") {
                var pt = parseFloat(getPropertyValue(style, "padding-top"));
                var pr = parseFloat(getPropertyValue(style, "padding-right"));
                var pb = parseFloat(getPropertyValue(style, "padding-bottom"));
                var pl = parseFloat(getPropertyValue(style, "padding-left"));
                rTL.x -= pl; rTL.y -= pt;
                rTR.x -= pr; rTR.y -= pt;
                rBR.x -= pr; rBR.y -= pb;
                rBL.x -= pl; rBL.y -= pb;
            }
        }

        if (typeof type == "number") {
            rTL.x -= type; rTL.y -= type;
            rTR.x -= type; rTR.y -= type;
            rBR.x -= type; rBR.y -= type;
            rBL.x -= type; rBL.y -= type;
        }

        return roundBox(box, rTL, rTR, rBR, rBL);
    }

    // Create a drawing.Path for a rounded rectangle.  Receives the
    // bounding box and the border-radiuses in CSS order (top-left,
    // top-right, bottom-right, bottom-left).  The radiuses must be
    // objects containing x (horiz. radius) and y (vertical radius).
    function roundBox(box, rTL, rTR, rBR, rBL) {
        var path = new drawing.Path({ fill: null, stroke: null });
        sanitizeRadius(rTL);
        sanitizeRadius(rTR);
        sanitizeRadius(rBR);
        sanitizeRadius(rBL);
        path.moveTo(box.left, box.top + rTL.y);
        if (rTL.x) {
            addArcToPath(path, box.left + rTL.x, box.top + rTL.y, {
                startAngle: -180,
                endAngle: -90,
                radiusX: rTL.x,
                radiusY: rTL.y
            });
        }
        path.lineTo(box.right - rTR.x, box.top);
        if (rTR.x) {
            addArcToPath(path, box.right - rTR.x, box.top + rTR.y, {
                startAngle: -90,
                endAngle: 0,
                radiusX: rTR.x,
                radiusY: rTR.y
            });
        }
        path.lineTo(box.right, box.bottom - rBR.y);
        if (rBR.x) {
            addArcToPath(path, box.right - rBR.x, box.bottom - rBR.y, {
                startAngle: 0,
                endAngle: 90,
                radiusX: rBR.x,
                radiusY: rBR.y
            });
        }
        path.lineTo(box.left + rBL.x, box.bottom);
        if (rBL.x) {
            addArcToPath(path, box.left + rBL.x, box.bottom - rBL.y, {
                startAngle: 90,
                endAngle: 180,
                radiusX: rBL.x,
                radiusY: rBL.y
            });
        }
        return path.close();
    }

    function formatCounter(val, style) {
        var str = parseFloat(val) + "";
        switch (style) {
          case "decimal-leading-zero":
            if (str.length < 2) {
                str = "0" + str;
            }
            return str;
          case "lower-roman":
            return romanNumeral(val);
          case "upper-roman":
            return romanNumeral(val).toUpperCase();
          case "lower-latin":
          case "lower-alpha":
            return alphaNumeral(val - 1);
          case "upper-latin":
          case "upper-alpha":
            return alphaNumeral(val - 1).toUpperCase();
          default:
            return str;
        }
    }

    function evalPseudoElementContent(element, content) {
        function displayCounter(name, style, separator) {
            if (!separator) {
                return formatCounter(getCounter(name) || 0, style);
            }
            separator = separator.replace(/^\s*(["'])(.*)\1\s*$/, "$2");
            return getAllCounters(name).map(function(val){
                return formatCounter(val, style);
            }).join(separator);
        }
        if (/^(none|normal)$/i.test(content)) {
            return null;
        }
        var a = splitProperty(content, /^\s+/);
        var result = [], m;
        a.forEach(function(el){
            var tmp;
            if ((m = /^\s*(["'])(.*)\1\s*$/.exec(el))) {
                result.push(m[2].replace(/\\([0-9a-f]{4})/gi, function(s, p){
                    return String.fromCharCode(parseInt(p, 16));
                }));
            }
            else if ((m = /^\s*counter\((.*?)\)\s*$/.exec(el))) {
                tmp = splitProperty(m[1]);
                result.push(displayCounter(tmp[0], tmp[1]));
            }
            else if ((m = /^\s*counters\((.*?)\)\s*$/.exec(el))) {
                tmp = splitProperty(m[1]);
                result.push(displayCounter(tmp[0], tmp[2], tmp[1]));
            }
            else if ((m = /^\s*attr\((.*?)\)\s*$/.exec(el))) {
                result.push(element.getAttribute(m[1]) || "");
            }
            else {
                result.push(el);
            }
        });
        return result.join("");
    }

    function getCssText(style) {
        if (style.cssText) {
            return style.cssText;
        }
        // Status: NEW.  Report year: 2002.  Current year: 2014.
        // Nice played, Mozillians.
        // https://bugzilla.mozilla.org/show_bug.cgi?id=137687
        var result = [];
        for (var i = 0; i < style.length; ++i) {
            result.push(style[i] + ": " + getPropertyValue(style, style[i]));
        }
        return result.join(";\n");
    }

    function _renderWithPseudoElements(element, group) {
        var fake = [];
        function pseudo(kind, place) {
            var style = getComputedStyle(element, kind);
            var content = evalPseudoElementContent(element, style.content);
            if (content) {
                var psel = document.createElement("kendo-pseudo-element");
                psel.style.cssText = getCssText(style);
                psel.textContent = content;
                element.insertBefore(psel, place);
                if (kind == ":before" && !(/absolute|fixed/.test(getPropertyValue(psel.style, "position")))) {
                    // we need to shift the "pseudo element" to the left by its width, because we
                    // created it as a real node and it'll overlap the host element position.
                    psel.style.marginLeft = parseFloat(getPropertyValue(psel.style, "margin-left")) - psel.offsetWidth + "px";
                }
                fake.push(psel);
            }
        }
        pseudo(":before", element.firstChild);
        _renderElement(element, group);
        pseudo(":after", null);
        fake.forEach(function(el){ element.removeChild(el); });
    }

    function _renderElement(element, group) {
        var style = getComputedStyle(element);

        var top = getBorder(style, "top");
        var right = getBorder(style, "right");
        var bottom = getBorder(style, "bottom");
        var left = getBorder(style, "left");

        var rTL = getBorderRadius(style, "top-left");
        var rTR = getBorderRadius(style, "top-right");
        var rBL = getBorderRadius(style, "bottom-left");
        var rBR = getBorderRadius(style, "bottom-right");

        var dir = getPropertyValue(style, "direction");

        var backgroundColor = getPropertyValue(style, "background-color");
        backgroundColor = parseColor(backgroundColor);

        var backgroundImage = splitProperty( getPropertyValue(style, "background-image") );
        var backgroundRepeat = splitProperty( getPropertyValue(style, "background-repeat") );
        var backgroundPosition = splitProperty( getPropertyValue(style, "background-position") );
        var backgroundOrigin = splitProperty( getPropertyValue(style, "background-origin") );
        var backgroundSize = splitProperty( getPropertyValue(style, "background-size") );

        if (browser.msie && browser.version < 10) {
            // IE9 hacks.  getPropertyValue won't return the correct
            // value.  Sucks that we have to do it here, I'd prefer to
            // move it in getPropertyValue, but we don't have the
            // element.
            backgroundPosition = splitProperty(element.currentStyle.backgroundPosition);
        }

        var innerbox = innerBox(element.getBoundingClientRect(), "border-*-width", element);

        // CSS "clip" property - if present, replace the group with a
        // new one which is clipped.  This must happen before drawing
        // the borders and background.
        (function(){
            var clip = getPropertyValue(style, "clip");
            var m = /^\s*rect\((.*)\)\s*$/.exec(clip);
            if (m) {
                var a = m[1].split(/[ ,]+/g);
                var top = a[0] == "auto" ? innerbox.top : parseFloat(a[0]) + innerbox.top;
                var right = a[1] == "auto" ? innerbox.right : parseFloat(a[1]) + innerbox.left;
                var bottom = a[2] == "auto" ? innerbox.bottom : parseFloat(a[2]) + innerbox.top;
                var left = a[3] == "auto" ? innerbox.left : parseFloat(a[3]) + innerbox.left;
                var tmp = new drawing.Group();
                var clipPath = new drawing.Path()
                    .moveTo(left, top)
                    .lineTo(right, top)
                    .lineTo(right, bottom)
                    .lineTo(left, bottom)
                    .close();
                setClipping(tmp, clipPath);
                group.append(tmp);
                group = tmp;
                updateClipbox(clipPath);
            }
        })();

        var boxes = element.getClientRects();
        if (boxes.length == 1) {
            // Workaround the missing borders in Chrome!  getClientRects() boxes contains values
            // rounded to integer.  getBoundingClientRect() appears to work fine.  We still need
            // getClientRects() to support cases where there are more boxes (continued inline
            // elements that might have border/background).
            boxes = [ element.getBoundingClientRect() ];
        }

        // This function workarounds another Chrome bug, where boxes returned for a table with
        // border-collapse: collapse will overlap the table border.  Our rendering is not perfect in
        // such case anyway, but with this is better than without it.
        boxes = adjustBoxes(boxes);

        for (var i = 0; i < boxes.length; ++i) {
            drawOneBox(boxes[i], i === 0, i == boxes.length - 1);
        }

        if (boxes.length > 0 && getPropertyValue(style, "display") == "list-item") {
            drawBullet(boxes[0]);
        }

        // overflow: hidden/auto - if present, replace the group with
        // a new one clipped by the inner box.
        (function(){
            function clipit() {
                var clipPath = elementRoundBox(element, innerbox, "padding");
                var tmp = new drawing.Group();
                setClipping(tmp, clipPath);
                group.append(tmp);
                group = tmp;
                updateClipbox(clipPath);
            }
            if (/^(hidden|auto|scroll)/.test(getPropertyValue(style, "overflow"))) {
                clipit();
            } else if (/^(hidden|auto|scroll)/.test(getPropertyValue(style, "overflow-x"))) {
                clipit();
            } else if (/^(hidden|auto|scroll)/.test(getPropertyValue(style, "overflow-y"))) {
                clipit();
            }
        })();

        if (!maybeRenderWidget(element, group)) {
            renderContents(element, group);
        }

        return group; // only utility functions after this line.

        function adjustBoxes(boxes) {
            if (/^td$/i.test(element.tagName)) {
                var table = nodeInfo.table;
                if (table && getPropertyValue(table.style, "border-collapse") == "collapse") {
                    var tableBorderLeft = getBorder(table.style, "left").width;
                    var tableBorderTop = getBorder(table.style, "top").width;
                    // check if we need to adjust
                    if (tableBorderLeft === 0 && tableBorderTop === 0) {
                        return boxes; // nope
                    }
                    var tableBox = table.element.getBoundingClientRect();
                    var firstCell = table.element.rows[0].cells[0];
                    var firstCellBox = firstCell.getBoundingClientRect();
                    if (firstCellBox.top == tableBox.top || firstCellBox.left == tableBox.left) {
                        return slice.call(boxes).map(function(box){
                            return {
                                left   : box.left + tableBorderLeft,
                                top    : box.top + tableBorderTop,
                                right  : box.right + tableBorderLeft,
                                bottom : box.bottom + tableBorderTop,
                                height : box.height,
                                width  : box.width
                            };
                        });
                    }
                }
            }
            return boxes;
        }

        // this function will be called to draw each border.  it
        // draws starting at origin and the resulted path must be
        // translated/rotated to be placed in the proper position.
        //
        // arguments are named as if it draws the top border:
        //
        //    - `len` the length of the edge
        //    - `Wtop` the width of the edge (i.e. border-top-width)
        //    - `Wleft` the width of the left edge (border-left-width)
        //    - `Wright` the width of the right edge
        //    - `rl` and `rl` -- the border radius on the left and right
        //      (objects containing x and y, for horiz/vertical radius)
        //    - `transform` -- transformation to apply
        //
        function drawEdge(color, len, Wtop, Wleft, Wright, rl, rr, transform) {
            if (Wtop <= 0) {
                return;
            }

            var path, edge = new drawing.Group();
            setTransform(edge, transform);
            group.append(edge);

            sanitizeRadius(rl);
            sanitizeRadius(rr);

            // draw main border.  this is the area without the rounded corners
            path = new drawing.Path({
                fill: { color: color },
                stroke: null
            });
            edge.append(path);
            path.moveTo(rl.x ? Math.max(rl.x, Wleft) : 0, 0)
                .lineTo(len - (rr.x ? Math.max(rr.x, Wright) : 0), 0)
                .lineTo(len - Math.max(rr.x, Wright), Wtop)
                .lineTo(Math.max(rl.x, Wleft), Wtop)
                .close();

            if (rl.x) {
                drawRoundCorner(Wleft, rl, [ -1, 0, 0, 1, rl.x, 0 ]);
            }

            if (rr.x) {
                drawRoundCorner(Wright, rr, [ 1, 0, 0, 1, len - rr.x, 0 ]);
            }

            // draws one round corner, starting at origin (needs to be
            // translated/rotated to be placed properly).
            function drawRoundCorner(Wright, r, transform) {
                var angle = Math.PI/2 * Wright / (Wright + Wtop);

                // not sanitizing this one, because negative values
                // are useful to fill the box correctly.
                var ri = {
                    x: r.x - Wright,
                    y: r.y - Wtop
                };

                var path = new drawing.Path({
                    fill: { color: color },
                    stroke: null
                }).moveTo(0, 0);

                setTransform(path, transform);

                addArcToPath(path, 0, r.y, {
                    startAngle: -90,
                    endAngle: -radiansToDegrees(angle),
                    radiusX: r.x,
                    radiusY: r.y
                });

                if (ri.x > 0 && ri.y > 0) {
                    path.lineTo(ri.x * Math.cos(angle), r.y - ri.y * Math.sin(angle));
                    addArcToPath(path, 0, r.y, {
                        startAngle: -radiansToDegrees(angle),
                        endAngle: -90,
                        radiusX: ri.x,
                        radiusY: ri.y,
                        anticlockwise: true
                    });
                }
                else if (ri.x > 0) {
                    path.lineTo(ri.x, Wtop)
                        .lineTo(0, Wtop);
                }
                else {
                    path.lineTo(ri.x, Wtop)
                        .lineTo(ri.x, 0);
                }

                edge.append(path.close());
            }
        }

        function drawBackground(box) {
            var background = new drawing.Group();
            setClipping(background, roundBox(box, rTL, rTR, rBR, rBL));
            group.append(background);

            if (backgroundColor) {
                var path = new drawing.Path({
                    fill: { color: backgroundColor.toCssRgba() },
                    stroke: null
                });
                path.moveTo(box.left, box.top)
                    .lineTo(box.right, box.top)
                    .lineTo(box.right, box.bottom)
                    .lineTo(box.left, box.bottom)
                    .close();
                background.append(path);
            }

            var bgImage, bgRepeat, bgPosition, bgOrigin, bgSize;

            for (var i = backgroundImage.length; --i >= 0;) {
                bgImage = backgroundImage[i];
                bgRepeat = backgroundRepeat[i] || backgroundRepeat[backgroundRepeat.length - 1];
                bgPosition = backgroundPosition[i] || backgroundPosition[backgroundPosition.length - 1];
                bgOrigin = backgroundOrigin[i] || backgroundOrigin[backgroundOrigin.length - 1];
                bgSize = backgroundSize[i] || backgroundSize[backgroundSize.length - 1];
                drawOneBackground( background, box, bgImage, bgRepeat, bgPosition, bgOrigin, bgSize );
            }
        }

        function drawOneBackground(group, box, backgroundImage, backgroundRepeat, backgroundPosition, backgroundOrigin, backgroundSize) {
            if (!backgroundImage || (backgroundImage == "none")) {
                return;
            }

            // SVG taints the canvas, can't draw it.
            if (/^url\(\"data:image\/svg/i.test(backgroundImage)) {
                return;
            }

            var url = backgroundImageURL(backgroundImage);
            if (url) {
                var img = IMAGE_CACHE[url];
                if (img && img.width > 0 && img.height > 0) {
                    drawBackgroundImage(group, box, img.width, img.height, function(group, rect){
                        group.append(new drawing.Image(url, rect));
                    });
                }
            }
            else {
                var gradient = parseGradient(backgroundImage);
                if (gradient) {
                    drawBackgroundImage(group, box, box.width, box.height, gradientRenderer(gradient));
                }
            }

            function drawBackgroundImage(group, box, img_width, img_height, renderBG) {
                var aspect_ratio = img_width / img_height;

                // for background-origin: border-box the box is already appropriate
                var orgBox = box;
                if (backgroundOrigin == "content-box") {
                    orgBox = innerBox(orgBox, "border-*-width", element);
                    orgBox = innerBox(orgBox, "padding-*", element);
                } else if (backgroundOrigin == "padding-box") {
                    orgBox = innerBox(orgBox, "border-*-width", element);
                }

                if (!/^\s*auto(\s+auto)?\s*$/.test(backgroundSize)) {
                    var size = backgroundSize.split(/\s+/g);
                    // compute width
                    if (/%$/.test(size[0])) {
                        img_width = orgBox.width * parseFloat(size[0]) / 100;
                    } else {
                        img_width = parseFloat(size[0]);
                    }
                    // compute height
                    if (size.length == 1 || size[1] == "auto") {
                        img_height = img_width / aspect_ratio;
                    } else if (/%$/.test(size[1])) {
                        img_height = orgBox.height * parseFloat(size[1]) / 100;
                    } else {
                        img_height = parseFloat(size[1]);
                    }
                }

                var pos = (backgroundPosition+"").split(/\s+/);
                if (pos.length == 1) {
                    pos[1] = "50%";
                }

                if (/%$/.test(pos[0])) {
                    pos[0] = parseFloat(pos[0]) / 100 * (orgBox.width - img_width);
                } else {
                    pos[0] = parseFloat(pos[0]);
                }
                if (/%$/.test(pos[1])) {
                    pos[1] = parseFloat(pos[1]) / 100 * (orgBox.height - img_height);
                } else {
                    pos[1] = parseFloat(pos[1]);
                }

                var rect = new geo.Rect([ orgBox.left + pos[0], orgBox.top + pos[1] ], [ img_width, img_height ]);

                // XXX: background-repeat could be implemented more
                //      efficiently as a fill pattern (at least for PDF
                //      output, probably SVG too).

                function rewX() {
                    while (rect.origin.x > box.left) {
                        rect.origin.x -= img_width;
                    }
                }

                function rewY() {
                    while (rect.origin.y > box.top) {
                        rect.origin.y -= img_height;
                    }
                }

                function repeatX() {
                    while (rect.origin.x < box.right) {
                        renderBG(group, rect.clone());
                        rect.origin.x += img_width;
                    }
                }

                if (backgroundRepeat == "no-repeat") {
                    renderBG(group, rect);
                }
                else if (backgroundRepeat == "repeat-x") {
                    rewX();
                    repeatX();
                }
                else if (backgroundRepeat == "repeat-y") {
                    rewY();
                    while (rect.origin.y < box.bottom) {
                        renderBG(group, rect.clone());
                        rect.origin.y += img_height;
                    }
                }
                else if (backgroundRepeat == "repeat") {
                    rewX();
                    rewY();
                    var origin = rect.origin.clone();
                    while (rect.origin.y < box.bottom) {
                        rect.origin.x = origin.x;
                        repeatX();
                        rect.origin.y += img_height;
                    }
                }
            }
        }

        function drawBullet(box) {
            var listStyleType = getPropertyValue(style, "list-style-type");
            if (listStyleType == "none") {
                return;
            }
            var listStyleImage = getPropertyValue(style, "list-style-image");
            var listStylePosition = getPropertyValue(style, "list-style-position");

            function _drawBullet(f) {
                saveStyle(element, function(){
                    element.style.position = "relative";
                    var bullet = document.createElement("kendo-bullet");
                    bullet.style.position = "absolute";
                    bullet.style.boxSizing = "border-box";
                    if (listStylePosition == "outside") {
                        bullet.style.width = "6em";
                        bullet.style.left = "-6.8em";
                        bullet.style.textAlign = "right";
                    } else {
                        bullet.style.left = "0px";
                    }
                    f(bullet);
                    element.insertBefore(bullet, element.firstChild);
                    renderElement(bullet, group);
                    element.removeChild(bullet);
                });
            }

            function elementIndex(f) {
                var a = element.parentNode.children;
                for (var i = 0; i < a.length; ++i) {
                    if (a[i] === element) {
                        return f(i, a.length);
                    }
                }
            }

            switch (listStyleType) {
              case "circle":
              case "disc":
              case "square":
                _drawBullet(function(bullet){
                    // XXX: the science behind these values is called "trial and error".
                    //      also, ZapfDingbats works well in PDF output, but not in SVG/Canvas.
                    bullet.style.fontSize = "70%";
                    bullet.style.lineHeight = "150%";
                    bullet.style.paddingRight = "0.5em";
                    bullet.style.fontFamily = "ZapfDingbats";
                    bullet.innerHTML = {
                        "disc"   : "l",
                        "circle" : "m",
                        "square" : "n"
                    }[listStyleType];
                });
                break;

              case "decimal":
              case "decimal-leading-zero":
                _drawBullet(function(bullet){
                    elementIndex(function(idx, len){
                        ++idx;
                        if (listStyleType == "decimal-leading-zero" && (idx+"").length < 2) {
                            idx = "0" + idx;
                        }
                        bullet.innerHTML = idx + ".";
                    });
                });
                break;

              case "lower-roman":
              case "upper-roman":
                _drawBullet(function(bullet){
                    elementIndex(function(idx, len){
                        idx = romanNumeral(idx + 1);
                        if (listStyleType == "upper-roman") {
                            idx = idx.toUpperCase();
                        }
                        bullet.innerHTML = idx + ".";
                    });
                });
                break;

              case "lower-latin":
              case "lower-alpha":
              case "upper-latin":
              case "upper-alpha":
                _drawBullet(function(bullet){
                    elementIndex(function(idx, len){
                        idx = alphaNumeral(idx);
                        if (/^upper/i.test(listStyleType)) {
                            idx = idx.toUpperCase();
                        }
                        bullet.innerHTML = idx + ".";
                    });
                });
                break;
            }
        }

        // draws a single border box
        function drawOneBox(box, isFirst, isLast) {
            if (box.width === 0 || box.height === 0) {
                return;
            }

            drawBackground(box);

            var shouldDrawLeft = (left.width > 0 && ((isFirst && dir == "ltr") || (isLast && dir == "rtl")));
            var shouldDrawRight = (right.width > 0 && ((isLast && dir == "ltr") || (isFirst && dir == "rtl")));

            // The most general case is that the 4 borders have different widths and border
            // radiuses.  The way that is handled is by drawing 3 Paths for each border: the
            // straight line, and two round corners which represent half of the entire rounded
            // corner.  To simplify code those shapes are drawed at origin (by the drawEdge
            // function), then translated/rotated into the right position.
            //
            // However, this leads to poor results due to rounding in the simpler cases where
            // borders are straight lines.  Therefore we handle a few such cases separately with
            // straight lines. C^wC^wC^w -- nope, scratch that.  poor rendering was because of a bug
            // in Chrome (getClientRects() returns rounded integer values rather than exact floats.
            // web dev is still a ghetto.)

            // first, just in case there is no border...
            if (top.width === 0 && left.width === 0 && right.width === 0 && bottom.width === 0) {
                return;
            }

            if (true) { // so that it's easy to comment out..  uglifyjs will drop the spurious if.

                // if all borders have equal colors...
                if (top.color == right.color && top.color == bottom.color && top.color == left.color) {

                    // if same widths too, we can draw the whole border by stroking a single path.
                    if (top.width == right.width && top.width == bottom.width && top.width == left.width)
                    {
                        if (shouldDrawLeft && shouldDrawRight) {
                            // reduce box by half the border width, so we can draw it by stroking.
                            box = innerBox(box, top.width/2);

                            // adjust the border radiuses, again by top.width/2, and make the path element.
                            var path = elementRoundBox(element, box, top.width/2);
                            path.options.stroke = {
                                color: top.color,
                                width: top.width
                            };
                            group.append(path);
                            return;
                        }
                    }
                }

                // if border radiuses are zero and widths are at most one pixel, we can again use simple
                // paths.
                if (rTL.x === 0 && rTR.x === 0 && rBR.x === 0 && rBL.x === 0) {
                    // alright, 1.9px will do as well.  the difference in color blending should not be
                    // noticeable.
                    if (top.width < 2 && left.width < 2 && right.width < 2 && bottom.width < 2) {
                        // top border
                        if (top.width > 0) {
                            group.append(
                                new drawing.Path({
                                    stroke: { width: top.width, color: top.color }
                                })
                                    .moveTo(box.left, box.top + top.width/2)
                                    .lineTo(box.right, box.top + top.width/2)
                            );
                        }

                        // bottom border
                        if (bottom.width > 0) {
                            group.append(
                                new drawing.Path({
                                    stroke: { width: bottom.width, color: bottom.color }
                                })
                                    .moveTo(box.left, box.bottom - bottom.width/2)
                                    .lineTo(box.right, box.bottom - bottom.width/2)
                            );
                        }

                        // left border
                        if (shouldDrawLeft) {
                            group.append(
                                new drawing.Path({
                                    stroke: { width: left.width, color: left.color }
                                })
                                    .moveTo(box.left + left.width/2, box.top)
                                    .lineTo(box.left + left.width/2, box.bottom)
                            );
                        }

                        // right border
                        if (shouldDrawRight) {
                            group.append(
                                new drawing.Path({
                                    stroke: { width: right.width, color: right.color }
                                })
                                    .moveTo(box.right - right.width/2, box.top)
                                    .lineTo(box.right - right.width/2, box.bottom)
                            );
                        }

                        return;
                    }
                }

            }

            // top border
            drawEdge(top.color,
                     box.width, top.width, left.width, right.width,
                     rTL, rTR,
                     [ 1, 0, 0, 1, box.left, box.top ]);

            // bottom border
            drawEdge(bottom.color,
                     box.width, bottom.width, right.width, left.width,
                     rBR, rBL,
                     [ -1, 0, 0, -1, box.right, box.bottom ]);

            // for left/right borders we need to invert the border-radiuses
            function inv(p) {
                return { x: p.y, y: p.x };
            }

            // left border
            drawEdge(left.color,
                     box.height, left.width, bottom.width, top.width,
                     inv(rBL), inv(rTL),
                     [ 0, -1, 1, 0, box.left, box.bottom ]);

            // right border
            drawEdge(right.color,
                     box.height, right.width, top.width, bottom.width,
                     inv(rTR), inv(rBR),
                     [ 0, 1, -1, 0, box.right, box.top ]);
        }
    }

    function gradientRenderer(gradient) {
        return function(group, rect) {
            var width = rect.width(), height = rect.height(), tl = rect.topLeft();

            switch (gradient.type) {
              case "linear":

                // figure out the angle.
                var angle = gradient.angle != null ? gradient.angle : Math.PI;
                switch (gradient.to) {
                  case "top":
                    angle = 0;
                    break;
                  case "left":
                    angle = -Math.PI / 2;
                    break;
                  case "bottom":
                    angle = Math.PI;
                    break;
                  case "right":
                    angle = Math.PI / 2;
                    break;
                  case "top left": case "left top":
                    angle = -Math.atan2(height, width);
                    break;
                  case "top right": case "right top":
                    angle = Math.atan2(height, width);
                    break;
                  case "bottom left": case "left bottom":
                    angle = Math.PI + Math.atan2(height, width);
                    break;
                  case "bottom right": case "right bottom":
                    angle = Math.PI - Math.atan2(height, width);
                    break;
                }

                if (gradient.reverse) {
                    angle -= Math.PI;
                }

                // limit the angle between 0..2π
                angle %= 2 * Math.PI;
                if (angle < 0) {
                    angle += 2 * Math.PI;
                }

                // compute gradient's start/end points.  here len is the length of the gradient line
                // and x,y is the end point relative to the center of the rectangle in conventional
                // (math) axis direction.

                // this is the original (unscaled) length of the gradient line.  needed to deal with
                // absolutely positioned color stops.  formula from the CSS spec:
                // http://dev.w3.org/csswg/css-images-3/#linear-gradient-syntax
                var pxlen = Math.abs(width * Math.sin(angle)) + Math.abs(height * Math.cos(angle));

                // The math below is pretty simple, but it took a while to figure out.  We compute x
                // and y, the *end* of the gradient line.  However, we want to transform them into
                // element-based coordinates (SVG's gradientUnits="objectBoundingBox").  That means,
                // x=0 is the left edge, x=1 is the right edge, y=0 is the top edge and y=1 is the
                // bottom edge.
                //
                // A naive approach would use the original angle for these calculations.  Say we'd
                // like to draw a gradient angled at 45° in a 100x400 box.  When we use
                // objectBoundingBox, the renderer will draw it in a 1x1 *square* box, and then
                // scale that to the desired dimensions.  The 45° angle will look more like 70°
                // after scaling.  SVG (http://www.w3.org/TR/SVG/pservers.html#LinearGradients) says
                // the following:
                //
                //     When gradientUnits="objectBoundingBox" and ‘gradientTransform’ is the
                //     identity matrix, the normal of the linear gradient is perpendicular to the
                //     gradient vector in object bounding box space (i.e., the abstract coordinate
                //     system where (0,0) is at the top/left of the object bounding box and (1,1) is
                //     at the bottom/right of the object bounding box). When the object's bounding
                //     box is not square, the gradient normal which is initially perpendicular to
                //     the gradient vector within object bounding box space may render
                //     non-perpendicular relative to the gradient vector in user space. If the
                //     gradient vector is parallel to one of the axes of the bounding box, the
                //     gradient normal will remain perpendicular. This transformation is due to
                //     application of the non-uniform scaling transformation from bounding box space
                //     to user space.
                //
                // which is an extremely long and confusing way to tell what I just said above.
                //
                // For this reason we need to apply the reverse scaling to the original angle, so
                // that when it'll finally be rendered it'll actually be at the desired slope.  Now
                // I'll let you figure out the math yourself.

                var scaledAngle = Math.atan(width * Math.tan(angle) / height);
                var sin = Math.sin(scaledAngle), cos = Math.cos(scaledAngle);
                var len = Math.abs(sin) + Math.abs(cos);
                var x = len/2 * sin;
                var y = len/2 * cos;

                // Because of the arctangent, our scaledAngle ends up between -π/2..π/2, possibly
                // losing the intended direction of the gradient.  The following fixes it.
                if (angle > Math.PI/2 && angle <= 3*Math.PI/2) {
                    x = -x;
                    y = -y;
                }

                // compute the color stops.
                var implicit = [], right = 0;
                var stops = gradient.stops.map(function(s, i){
                    var offset = s.percent;
                    if (offset) {
                        offset = parseFloat(offset) / 100;
                    } else if (s.length) {
                        offset = parseFloat(s.length) / pxlen;
                    } else if (i === 0) {
                        offset = 0;
                    } else if (i == gradient.stops.length - 1) {
                        offset = 1;
                    }
                    var stop = {
                        color: s.color.toCssRgba(),
                        offset: offset
                    };
                    if (offset != null) {
                        right = offset;
                        // fix implicit offsets
                        implicit.forEach(function(s, i){
                            var stop = s.stop;
                            stop.offset = s.left + (right - s.left) * (i + 1) / (implicit.length + 1);
                        });
                        implicit = [];
                    } else {
                        implicit.push({ left: right, stop: stop });
                    }
                    return stop;
                });

                var start = [ 0.5 - x, 0.5 + y ];
                var end = [ 0.5 + x, 0.5 - y ];

                // finally, draw it.
                group.append(
                    drawing.Path.fromRect(rect)
                        .stroke(null)
                        .fill(new drawing.LinearGradient({
                            start     : start,
                            end       : end,
                            stops     : stops,
                            userSpace : false
                        }))
                );
                break;
              case "radial":
                // XXX:
                if (window.console && window.console.log) {
                    window.console.log("Radial gradients are not yet supported in HTML renderer");
                }
                break;
            }
        };
    }

    function maybeRenderWidget(element, group) {
        if (element.getAttribute(kendo.attr("role"))) {
            var widget = kendo.widgetInstance($(element));
            if (widget && (widget.exportDOMVisual || widget.exportVisual)) {
                var visual;
                if (widget.exportDOMVisual) {
                    visual = widget.exportDOMVisual();
                } else {
                    visual = widget.exportVisual();
                }

                var wrap = new drawing.Group();
                wrap.children.push(visual);

                var bbox = element.getBoundingClientRect();
                wrap.transform(geo.transform().translate(bbox.left, bbox.top));

                group.append(wrap);

                return true;
            }
        }
    }

    function renderImage(element, url, group) {
        var box = getContentBox(element);
        var rect = new geo.Rect([ box.left, box.top ], [ box.width, box.height ]);
        var image = new drawing.Image(url, rect);
        setClipping(image, elementRoundBox(element, box, "content"));
        group.append(image);
    }

    function zIndexSort(a, b) {
        var sa = getComputedStyle(a);
        var sb = getComputedStyle(b);
        var za = parseFloat(getPropertyValue(sa, "z-index"));
        var zb = parseFloat(getPropertyValue(sb, "z-index"));
        var pa = getPropertyValue(sa, "position");
        var pb = getPropertyValue(sb, "position");
        if (isNaN(za) && isNaN(zb)) {
            if ((/static|absolute/.test(pa)) && (/static|absolute/.test(pb))) {
                return 0;
            }
            if (pa == "static") {
                return -1;
            }
            if (pb == "static") {
                return 1;
            }
            return 0;
        }
        if (isNaN(za)) {
            return zb === 0 ? 0 : zb > 0 ? -1 : 1;
        }
        if (isNaN(zb)) {
            return za === 0 ? 0 : za > 0 ? 1 : -1;
        }
        return parseFloat(za) - parseFloat(zb);
    }

    function renderContents(element, group) {
        switch (element.tagName.toLowerCase()) {
          case "img":
            renderImage(element, element.src, group);
            break;

          case "canvas":
            try {
                renderImage(element, element.toDataURL("image/jpeg"), group);
            } catch(ex) {
                // tainted; can't draw it, ignore.
            }
            break;

          case "textarea":
          case "input":
            break;

          default:
            var blocks = [], floats = [], inline = [], positioned = [];
            for (var i = element.firstChild; i; i = i.nextSibling) {
                switch (i.nodeType) {
                  case 3:         // Text
                    if (/\S/.test(i.data)) {
                        renderText(element, i, group);
                    }
                    break;
                  case 1:         // Element
                    var style = getComputedStyle(i);
                    var display = getPropertyValue(style, "display");
                    var floating = getPropertyValue(style, "float");
                    var position = getPropertyValue(style, "position");
                    if (position != "static") {
                        positioned.push(i);
                    }
                    else if (display != "inline") {
                        if (floating != "none") {
                            floats.push(i);
                        } else {
                            blocks.push(i);
                        }
                    }
                    else {
                        inline.push(i);
                    }
                    break;
                }
            }

            blocks.sort(zIndexSort).forEach(function(el){ renderElement(el, group); });
            floats.sort(zIndexSort).forEach(function(el){ renderElement(el, group); });
            inline.sort(zIndexSort).forEach(function(el){ renderElement(el, group); });
            positioned.sort(zIndexSort).forEach(function(el){ renderElement(el, group); });
        }
    }

    function renderText(element, node, group) {
        var style = getComputedStyle(element);

        if (parseFloat(getPropertyValue(style, "text-indent")) < -500) {
            // assume it should not be displayed.  the slider's
            // draggable handle displays a Drag text for some reason,
            // having text-indent: -3333px.
            return;
        }

        var text = node.data;
        var range = element.ownerDocument.createRange();
        var align = getPropertyValue(style, "text-align");
        var isJustified = align == "justify";

        // skip whitespace
        var start = 0;
        var end = /\S\s*$/.exec(node.data).index + 1;

        function doChunk() {
            while (!/\S/.test(text.charAt(start))) {
                if (start >= end) {
                    return true;
                }
                start++;
            }
            range.setStart(node, start);
            var len = 0;
            while (++start <= end) {
                ++len;
                range.setEnd(node, start);

                // for justified text we must split at each space, as
                // space has variable width.  otherwise we can
                // optimize and split only at end of line (i.e. when a
                // new rectangle would be created).
                if (len > 1 && ((isJustified && /\s/.test(text.charAt(start - 1))) || range.getClientRects().length > 1)) {
                    //
                    // In IE, getClientRects for a <li> element will return an additional rectangle for the bullet, but
                    // *only* when only the first char in the LI is selected.  Checking if len > 1 above appears to be a
                    // good workaround.
                    //
                    //// DEBUG
                    // Array.prototype.slice.call(range.getClientRects()).concat([ range.getBoundingClientRect() ]).forEach(function(r){
                    //     $("<div>").css({
                    //         position  : "absolute",
                    //         left      : r.left + "px",
                    //         top       : r.top + "px",
                    //         width     : r.right - r.left + "px",
                    //         height    : r.bottom - r.top + "px",
                    //         boxSizing : "border-box",
                    //         border    : "1px solid red"
                    //     }).appendTo(document.body);
                    // });
                    range.setEnd(node, --start);
                    break;
                }
            }

            // another workaround for IE: if we rely on getBoundingClientRect() we'll overlap with the bullet for LI
            // elements.  Calling getClientRects() and using the *first* rect appears to give us the correct location.
            var box = range.getClientRects()[0];

            var str = range.toString().replace(/\s+$/, "");
            drawText(str, box);
        }

        var fontSize = getPropertyValue(style, "font-size");
        var lineHeight = getPropertyValue(style, "line-height");

        // simply getPropertyValue("font") doesn't work in Firefox :-\
        var font = [
            getPropertyValue(style, "font-style"),
            getPropertyValue(style, "font-variant"),
            getPropertyValue(style, "font-weight"),
            fontSize, // no need for line height here; it breaks layout in FF
            getPropertyValue(style, "font-family")
        ].join(" ");

        fontSize = parseFloat(fontSize);
        lineHeight = parseFloat(lineHeight);

        if (fontSize === 0) {
            return;
        }

        var color = getPropertyValue(style, "color");

        function drawText(str, box) {
            str = str.replace(/[\r\n ]+/g, " ");

            // In IE the box height will be approximately lineHeight, while in
            // other browsers it'll (correctly) be the height of the bounding
            // box for the current text/font.  Which is to say, IE sucks again.
            // The only good solution I can think of is to measure the text
            // ourselves and center the bounding box.
            if (browser.msie && !isNaN(lineHeight)) {
                var size = drawing.util.measureText(str, { font: font });
                var top = (box.top + box.bottom - size.height) / 2;
                box = {
                    top    : top,
                    right  : box.right,
                    bottom : top + size.height,
                    left   : box.left,
                    height : size.height,
                    width  : box.right - box.left
                };
            }

            // var path = new drawing.Path({ stroke: { color: "red" }});
            // path.moveTo(box.left, box.top)
            //     .lineTo(box.right, box.top)
            //     .lineTo(box.right, box.bottom)
            //     .lineTo(box.left, box.bottom)
            //     .close();
            // group.append(path);

            var text = new drawing.Text(str, new geo.Point(box.left, box.top), {
                font: font,
                fill: { color: color }
            });
            group.append(text);
            decorate(box);
        }

        function decorate(box) {
            line(nodeInfo["underline"], box.bottom);
            line(nodeInfo["line-through"], box.bottom - box.height / 2.7);
            line(nodeInfo["overline"], box.top);
            function line(color, ypos) {
                if (color) {
                    var width = fontSize / 12;
                    var path = new drawing.Path({ stroke: {
                        width: width,
                        color: color
                    }});

                    ypos -= width;
                    path.moveTo(box.left, ypos)
                        .lineTo(box.right, ypos);
                    group.append(path);
                }
            }
        }

        while (!doChunk()) {}
    }

    function groupInStackingContext(group, zIndex) {
        var main = nodeInfo._stackingContext.group;
        var a = main.children;
        for (var i = 0; i < a.length; ++i) {
            if (a[i]._dom_zIndex != null && a[i]._dom_zIndex > zIndex) {
                break;
            }
        }

        var tmp = new drawing.Group();
        main.insertAt(tmp, i);
        tmp._dom_zIndex = zIndex;

        // if (nodeInfo._matrix) {
        //     tmp.transform(nodeInfo._matrix);
        // }
        if (nodeInfo._clipbox) {
            tmp.clip(drawing.Path.fromRect(nodeInfo._clipbox));
        }

        return tmp;
    }

    function renderElement(element, container) {
        var style = getComputedStyle(element);

        var counterReset = getPropertyValue(style, "counter-reset");
        if (counterReset) {
            doCounters(splitProperty(counterReset, /^\s+/), resetCounter, 0);
        }

        var counterIncrement = getPropertyValue(style, "counter-increment");
        if (counterIncrement) {
            doCounters(splitProperty(counterIncrement, /^\s+/), incCounter, 1);
        }

        if (/^(style|script|link|meta|iframe|svg)$/i.test(element.tagName)) {
            return;
        }

        if (nodeInfo._clipbox == null) {
            return;
        }

        var opacity = parseFloat(getPropertyValue(style, "opacity"));
        var visibility = getPropertyValue(style, "visibility");
        var display = getPropertyValue(style, "display");

        if (opacity === 0 || visibility == "hidden" || display == "none") {
            return;
        }

        var tr = getTransform(style);
        var group;

        var zIndex = getPropertyValue(style, "z-index");
        if ((tr || opacity < 1) && zIndex == "auto") {
            zIndex = 0;
        }
        if (zIndex != "auto") {
            group = groupInStackingContext(container, zIndex);
        } else {
            group = new drawing.Group();
            container.append(group);
        }

        // XXX: remove at some point
        group.DEBUG = $(element).data("debug");

        if (opacity < 1) {
            group.opacity(opacity * group.opacity());
        }

        pushNodeInfo(element, style, group);

        if (!tr) {
            _renderWithPseudoElements(element, group);
        }
        else {
            saveStyle(element, function(){
                // must clear transform, so getBoundingClientRect returns correct values.
                pleaseSetPropertyValue(element.style, "transform", "none", "important");

                // must also clear transitions, so correct values are returned *immediately*
                pleaseSetPropertyValue(element.style, "transition", "none", "important");

                // the presence of any transform makes it behave like it had position: relative,
                // because why not.
                // http://meyerweb.com/eric/thoughts/2011/09/12/un-fixing-fixed-elements-with-css-transforms/
                if (getPropertyValue(style, "position") == "static") {
                    // but only if it's not already positioned. :-/
                    pleaseSetPropertyValue(element.style, "position", "relative", "important");
                }

                // must translate to origin before applying the CSS
                // transformation, then translate back.
                var bbox = element.getBoundingClientRect();
                var x = bbox.left + tr.origin[0];
                var y = bbox.top + tr.origin[1];
                var m = [ 1, 0, 0, 1, -x, -y ];
                m = mmul(m, tr.matrix);
                m = mmul(m, [ 1, 0, 0, 1, x, y ]);
                m = setTransform(group, m);

                nodeInfo._matrix = nodeInfo._matrix.multiplyCopy(m);

                _renderWithPseudoElements(element, group);
            });
        }

        popNodeInfo();

        //drawDebugBox(element, container);
    }

    function drawDebugBox(element, group) {
        var box = element.getBoundingClientRect();
        var path = drawing.Path.fromRect(new geo.Rect([ box.left, box.top ], [ box.width, box.height ]));
        group.append(path);
    }

    function mmul(a, b) {
        var a1 = a[0], b1 = a[1], c1 = a[2], d1 = a[3], e1 = a[4], f1 = a[5];
        var a2 = b[0], b2 = b[1], c2 = b[2], d2 = b[3], e2 = b[4], f2 = b[5];
        return [
            a1*a2 + b1*c2,          a1*b2 + b1*d2,
            c1*a2 + d1*c2,          c1*b2 + d1*d2,
            e1*a2 + f1*c2 + e2,     e1*b2 + f1*d2 + f2
        ];
    }

})(window.kendo.jQuery, parseFloat, Math);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
