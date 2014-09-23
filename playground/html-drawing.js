(function(parseFloat){

    "use strict";

    var drawing = kendo.dataviz.drawing;
    var geo = kendo.dataviz.geometry;
    var pdf = kendo.dataviz.drawing.pdf; // XXX: should not really depend on this.  needed for parseColor

    function getComputedStyle(element) {
        return window.getComputedStyle(element);
    }

    function getBorder(style, side) {
        side = "border-" + side;
        return {
            width: parseFloat(style.getPropertyValue(side + "-width")),
            style: style.getPropertyValue(side + "-style"),
            color: style.getPropertyValue(side + "-color")
        };
    }

    function getBorderRadius(style, side) {
        var r = style.getPropertyValue("border-" + side + "-radius").split(/\s+/g).map(parseFloat);
        if (r.length == 1) {
            r.push(r[0]);
        }
        return { x: r[0], y: r[1] };
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

        // var tmp = matrix[1];
        // matrix[1] = matrix[2];
        // matrix[2] = tmp;

        return {
            matrix: matrix,
            origin: origin
        };
    }

    function setTransform(shape, m) {
        shape.transform(new geo.Matrix(m[0], m[1], m[2], m[3], m[4], m[5]));
    }

    function toDegrees(radians) {
        return ((180 * radians) / Math.PI) % 360;
    }

    function addArcToPath(arc, path) {
        var points = arc.curvePoints();
        for (var i = 1; i < points.length; i += 3) {
            path.curveTo(points[i], points[i + 1], points[i + 2]);
        }
    }

    function pow(x, y) {
        return Math.pow(x, y);
    }

    function sqrt(x) {
        return Math.sqrt(x);
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
        //
        function drawRounded(len, Wtop, Wleft, Wright, rl, rr) {
            var path = new drawing.Path({
                stroke: null
            });

            if (rl.x == 0 || rl.y == 0) {
                rl.x = rl.y = 0;
            }
            if (rr.x == 0 || rr.y == 0) {
                rr.x = rr.y = 0;
            }

            path.moveTo(0, rl.y);

            if (rl.x > 0 && rl.y > 0) {
                addArcToPath(new geo.Arc([ rl.x, rl.y ], {
                    startAngle: -180,
                    endAngle: -90,
                    radiusX: rl.x,
                    radiusY: rl.y
                }), path);
            }
            path.lineTo(len - rr.x, 0);

            if (rr.x > 0 && rr.y > 0) {
                addArcToPath(new geo.Arc([ len - rr.x, rr.y ], {
                    startAngle : -90,
                    endAngle   : 0,
                    radiusX    : rr.x,
                    radiusY    : rr.y
                }), path);
                path.lineTo(len - Wright, rr.y);
            } else {
                path.lineTo(len - Wright, Wtop);
            }

            if (rr.x - Wright > 0 && rr.y - Wtop > 0) {
                addArcToPath(new geo.Arc([ len - rr.x, rr.y ], {
                    startAngle    : -0,
                    endAngle      : -90,
                    radiusX       : rr.x - Wright,
                    radiusY       : rr.y - Wtop,
                    anticlockwise : true
                }), path);
            }
            path.lineTo(Math.max(rl.x, Wleft), Wtop);

            if (rl.x - Wleft > 0 && rl.y - Wtop > 0) {
                addArcToPath(new geo.Arc([ rl.x, rl.y ], {
                    startAngle    : -90,
                    endAngle      : -180,
                    radiusX       : rl.x - Wleft,
                    radiusY       : rl.y - Wtop,
                    anticlockwise : true
                }), path);
            }

            path.close();
            return path;
        }

        function inv(p) {
            return { x: p.y, y: p.x };
        }

        function drawOne(box, isFirst, isLast) {
            if (bgColor) {
                // paint background.
                // XXX: background image-s TODO.
                drawEdge(
                    { x: box.left  , y: box.top },
                    { x: box.right , y: box.top },
                    { x: box.right , y: box.bottom },
                    { x: box.left  , y: box.bottom },
                    bgColor.toCssRgba()
                );
            }

            // top border
            if (top.width > 0) {
                // drawEdge(
                //     { x: box.left                , y: box.top },
                //     { x: box.right               , y: box.top },
                //     { x: box.right - right.width , y: box.top + top.width },
                //     { x: box.left + left.width   , y: box.top + top.width },
                //     top.color
                // );

                var path = drawRounded(box.width, top.width, left.width, right.width, TLr, TRr);
                setTransform(path, [ 1, 0, 0, 1, box.left, box.top ]);
                group.append(path);
                path.fill(top.color);
            }

            // bottom border
            if (bottom.width > 0) {
                // drawEdge(
                //     { x: box.left                , y: box.bottom },
                //     { x: box.right               , y: box.bottom },
                //     { x: box.right - right.width , y: box.bottom - bottom.width },
                //     { x: box.left + left.width   , y: box.bottom - bottom.width },
                //     bottom.color
                // );

                var path = drawRounded(box.width, bottom.width, left.width, right.width, BLr, BRr);
                setTransform(path, [ 1, 0, 0, -1, box.left, box.bottom ]);
                group.append(path);
                path.fill(bottom.color);
            }

            // left border
            if (((isFirst && dir == "ltr") || (isLast && dir == "rtl")) && left.width > 0) {
                // drawEdge(
                //     { x: box.left                , y: box.top },
                //     { x: box.left                , y: box.bottom },
                //     { x: box.left + left.width   , y: box.bottom - bottom.width },
                //     { x: box.left + left.width   , y: box.top + top.width },
                //     left.color
                // );

                var path = drawRounded(box.height, left.width, bottom.width, top.width, inv(BLr), inv(TLr));
                setTransform(path, [ 0, -1, 1, 0, box.left, box.bottom ]);
                group.append(path);
                path.fill(left.color);
            }
            // right border
            if (((isLast && dir == "ltr") || (isFirst && dir == "rtl")) && right.width > 0) {
                // drawEdge(
                //     { x: box.right               , y: box.top },
                //     { x: box.right               , y: box.bottom },
                //     { x: box.right - right.width , y: box.bottom - bottom.width },
                //     { x: box.right - right.width , y: box.top + top.width },
                //     right.color
                // );

                var path = drawRounded(box.height, right.width, top.width, bottom.width, inv(TRr), inv(BRr));
                setTransform(path, [ 0, 1, -1, 0, box.right, box.top ]);
                group.append(path);
                path.fill(right.color);
            }
        }

        var style = getComputedStyle(element);
        var top = getBorder(style, "top");
        var right = getBorder(style, "right");
        var bottom = getBorder(style, "bottom");
        var left = getBorder(style, "left");

        var TLr = getBorderRadius(style, "top-left");
        var TRr = getBorderRadius(style, "top-right");
        var BLr = getBorderRadius(style, "bottom-left");
        var BRr = getBorderRadius(style, "bottom-right");

        var dir = style.getPropertyValue("direction");

        var bgColor = style.getPropertyValue("background-color");
        bgColor = pdf.parseColor(bgColor);
        if (bgColor && bgColor.a == 0) {
            bgColor = null;     // opacity zero
        }

        var boxes = element.getClientRects();
        for (var i = 0; i < boxes.length; ++i) {
            drawOne(boxes[i], i == 0, i == boxes.length - 1);
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
                var pos = getComputedStyle(i).getPropertyValue("position");
                if (pos == "static") {
                    renderElement(i, group);
                } else {
                    children.push(i);
                }
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
        var range = element.ownerDocument.createRange();
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
        var opacity = parseFloat(style.getPropertyValue("opacity"));
        if (opacity == 0) return;
        // XXX: how  to handle opacity?

        var group = new drawing.Group();
        container.append(group);
        var t = getTransform(style);
        if (t) {
            var prevTransform = element.style.transform;
            //element.style.setProperty("transform", "none", "important");
            element.style.transform = "none";

            // must translate to origin before applying the CSS
            // transformation, then translate back.
            var bbox = element.getBoundingClientRect();
            var x = bbox.left + t.origin[0];
            var y = bbox.top + t.origin[1];
            var m = [ 1, 0, 0, 1, -x, -y ];
            m = mmul(m, t.matrix);
            m = mmul(m, [ 1, 0, 0, 1, x, y ]);
            setTransform(group, m);
        }

        renderBorderAndBackground(element, group);
        renderContents(element, group);
        if (t) {
            element.style.transform = prevTransform;
        }
    }

    drawing.drawDOM = function(element, cont) {
        var group = new drawing.Group();

        // translate to start of page
        var pos = $(element).offset();
        setTransform(group, [ 1, 0, 0, 1, -pos.left, -pos.top ]);

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
