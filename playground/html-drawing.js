(function(parseFloat){

    "use strict";

    var drawing = kendo.dataviz.drawing;
    var geo = kendo.dataviz.geometry;
    var pdf = kendo.dataviz.drawing.pdf; // XXX: should not really depend on this.  needed for parseColor

    function getComputedStyle(element) {
        return window.getComputedStyle(element);
    }

    function getBounds(element) {
        return element.getClientRects();
    }

    function getBorder(style, side) {
        side = "border-" + side;
        return {
            width: parseFloat(style.getPropertyValue(side + "-width")),
            style: style.getPropertyValue(side + "-style"),
            color: style.getPropertyValue(side + "-color")
        };
    }

    function getContentBox(element) {
        var box = element.getBoundingClientRect();
        box = innerBox(box, element, "border-*-width");
        box = innerBox(box, element, "padding-*");
        return box;
    }

    function innerBox(box, element, prop) {
        var style = getComputedStyle(element);
        var wt = parseFloat(style.getPropertyValue(prop.replace("*", "top")));
        var wr = parseFloat(style.getPropertyValue(prop.replace("*", "right")));
        var wb = parseFloat(style.getPropertyValue(prop.replace("*", "bottom")));
        var wl = parseFloat(style.getPropertyValue(prop.replace("*", "left")));
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
        var transform = style.getPropertyValue("transform");
        if (transform == "none") return null;
        var origin = style.getPropertyValue("transform-origin");
        var matrix = /^\s*matrix\(\s*(.*?)\s*\)\s*$/.exec(transform)[1]
            .split(/\s*,\s*/g).map(parseFloat);
        origin = origin.split(/\s+/g).map(parseFloat);
        return {
            matrix: matrix,
            origin: origin
        };
    }

    function transform(shape, m) {
        shape.transform(new geo.Matrix(m[0], m[1], m[2], m[3], m[4], m[5]));
    }

    function translate(shape, x, y) {
        transform(shape, [ 1, 0, 0, 1, x, y ]);
    }

    function renderBorderAndBackground(element, group) {
        function drawEdge(tl, tr, br, bl, color) {
            var path = new drawing.Path({
                fill: { color: color },
                stroke: null
            });
            group.append(path);
            path.moveTo(tl.x, tl.y);
            path.lineTo(tr.x, tr.y);
            path.lineTo(br.x, br.y);
            path.lineTo(bl.x, bl.y);
            path.close();
        }

        function drawOne(box) {
            if (bgColor) {
                // paint background.
                // XXX: background image-s TODO.
                drawEdge(
                    { x: box.left  , y: box.top },
                    { x: box.right , y: box.top },
                    { x: box.right , y: box.bottom },
                    { x: box.left  , y: box.bottom },
                    bgColor.toCssRgba()
                )
            }

            // top border
            if (top.width > 0) {
                drawEdge(
                    { x: box.left                , y: box.top },
                    { x: box.right               , y: box.top },
                    { x: box.right - right.width , y: box.top + top.width },
                    { x: box.left + left.width   , y: box.top + top.width },
                    top.color
                );
            }

            // right border
            if (right.width > 0) {
                drawEdge(
                    { x: box.right               , y: box.top },
                    { x: box.right               , y: box.bottom },
                    { x: box.right - right.width , y: box.bottom - bottom.width },
                    { x: box.right - right.width , y: box.top + top.width },
                    right.color
                );
            }

            // bottom border
            if (bottom.width > 0) {
                drawEdge(
                    { x: box.left                , y: box.bottom },
                    { x: box.right               , y: box.bottom },
                    { x: box.right - right.width , y: box.bottom - bottom.width },
                    { x: box.left + left.width   , y: box.bottom - bottom.width },
                    bottom.color
                );
            }

            // left border
            if (left.width > 0) {
                drawEdge(
                    { x: box.left                , y: box.top },
                    { x: box.left                , y: box.bottom },
                    { x: box.left + left.width   , y: box.bottom - bottom.width },
                    { x: box.left + left.width   , y: box.top + top.width },
                    left.color
                );
            }
        }

        var style = getComputedStyle(element);
        var top = getBorder(style, "top");
        var right = getBorder(style, "right");
        var bottom = getBorder(style, "bottom");
        var left = getBorder(style, "left");

        var bgColor = style.getPropertyValue("background-color");
        bgColor = pdf.parseColor(bgColor);
        if (bgColor && bgColor.a == 0) {
            bgColor = null;     // opacity zero
        }

        var boxes = getBounds(element);

        // var offset = $(element).offset(), width = $(element).width(), height = $(element).height();
        // var boxes = [{
        //     left   : offset.left,
        //     top    : offset.top,
        //     width  : width,
        //     height : height,
        //     right  : offset.left + width,
        //     bottom : offset.top + height
        // }];

        // var boxes = [
        //     element.getBoundingClientRect()
        // ];

        for (var i = 0; i < boxes.length; ++i) {
            drawOne(boxes[i]);
        }
    }

    function renderImage(element, group) {
        var box = getContentBox(element);
        var rect = new geo.Rect([ box.left, box.top ], [ box.width, box.height ]);
        var image = new drawing.Image(element.src, rect);
        group.append(image);
    }

    function zIndexSort(a, b) {
        var sa = getComputedStyle(a);
        var sb = getComputedStyle(b);
        var za = parseFloat(sa.getPropertyValue("z-index"));
        var zb = parseFloat(sb.getPropertyValue("z-index"));
        var pa = sa.getPropertyValue("position");
        var pb = sb.getPropertyValue("position");
        if (isNaN(za) && isNaN(zb)) {
            if (pa == "static" && pb == "static") {
                return 0;
            }
            if (pa == "static") return -1;
            if (pb == "static") return 1;
            return 0;
        }
        if (isNaN(za)) {
            return zb >= 0 ? -1 : 1;
        }
        if (isNaN(zb)) {
            return za >= 0 ? 1 : -1;
        }
        return parseFloat(za) - parseFloat(zb);
    }

    function renderContents(element, group) {
        switch (element.tagName.toLowerCase()) {
          case "img":
            renderImage(element, group);
            return;
        }
        var children = [];
        for (var i = element.firstChild; i; i = i.nextSibling) {
            switch (i.nodeType) {
              case 1:         // Element
                children.push(i);
                break;
              case 3:         // Text
                if (/\S/.test(i.data)) {
                    renderText(element, i, group);
                }
                break;
            }
        }
        children = children.sort(zIndexSort);
        children.forEach(function(el){
            renderElement(el, group);
        });
    }

    function renderText(element, node, group) {
        var text = node.data;
        var range = document.createRange();
        var style = getComputedStyle(element);
        var align = style.getPropertyValue("text-align");
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
            while (++start <= end) {
                range.setEnd(node, start);

                // for justified text we must split at each space, as
                // space has variable width.  otherwise we can
                // optimize and split only at end of line (i.e. when a
                // new rectangle would be created).
                if ((isJustified && /\s/.test(text.charAt(start - 1)))
                    || range.getClientRects().length > 1) {
                    range.setEnd(node, --start);
                    break;
                }
            }
            var box = range.getBoundingClientRect();
            var str = range.toString().replace(/\s+$/, "");
            drawText(str, box);
        }

        // simply getPropertyValue("font") doesn't work in Firefox :-\
        var font = [
            style.getPropertyValue("font-style"),
            style.getPropertyValue("font-variant"),
            style.getPropertyValue("font-weight"),
            style.getPropertyValue("font-size") + "/" + style.getPropertyValue("line-height"),
            style.getPropertyValue("font-family")
        ].join(" ");

        var color = style.getPropertyValue("color");

        function drawText(str, box) {
            var text = new drawing.Text(str, new geo.Point(box.left, box.top), {
                font: font,
                fill: { color: color }
            });
            group.append(text);
        }

        while (!doChunk());
        // range.detach(); // seems this is deprecated
    }

    function renderElement(element, container) {
        if (/^(style|script|link|meta|iframe|svg)$/i.test(element.tagName)) {
            return;
        }
        var style = getComputedStyle(element);
        //console.log(element.tagName, style.getPropertyValue("z-index"), element);

        var opacity = parseFloat(style.getPropertyValue("opacity"));
        if (opacity == 0) return;
        // XXX: how  to handle opacity?

        var group = new drawing.Group();
        var t = getTransform(style);
        if (t) {
            var prevTransform = element.style.transform;
            //element.style.setProperty("transform", "none", "important");
            element.style.transform = "none";

            // XXX: not quite correct, must take origin into account
            var m = [ 1, 0, 0, 1, 0, 0 ];
            m = mmul(m, [ 1, 0, 0, 1, -t.origin[0], -t.origin[1] ]);
            m = mmul(m, t.matrix);
            m = mmul(m, [ 1, 0, 0, 1, t.origin[0], t.origin[1] ]);
            transform(group, m);
        }
        renderBorderAndBackground(element, group);
        renderContents(element, group);
        if (t) {
            console.log(prevTransform);
            element.style.transform = prevTransform;
        }
        container.append(group);
    }

    drawing.drawDOM = function(element, cont) {
        var group = new drawing.Group();

        // translate to start of page
        var pos = $(element).offset();
        transform(group, [ 1, 0, 0, 1, -pos.left, -pos.top ]);

        renderElement(element, group);
        cont(group);
    };

    function mmul(a, b) {
        var a1 = a[0], b1 = a[1], c1 = a[2], d1 = a[3], e1 = a[4], f1 = a[5];
        var a2 = b[0], b2 = b[1], c2 = b[2], d2 = b[3], e2 = b[4], f2 = b[5];
        return [
            a1*a2 + b1*c2,          a1*b2 + b1*d2,
            c1*a2 + d1*c2,          c1*b2 + d1*d2,
            e1*a2 + f1*c2 + e2,     e1*b2 + f1*d2 + f2
        ];
    }

})(parseFloat);
