(function(){

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
            width: parseInt(style.getPropertyValue(side + "-width"), 10),
            style: style.getPropertyValue(side + "-style"),
            color: style.getPropertyValue(side + "-color")
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

        if (bgColor) {
            console.log(bgColor.toCssRgba(), boxes[0]);
        }

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

    function renderContents(element, group) {
        for (var i = element.firstChild; i; i = i.nextSibling) {
            switch (i.nodeType) {
              case 1:         // Element
                if (/\S/.test(i.data)) {
                    renderElement(i, group)
                }
                break;
              case 3:         // Text
                renderText(element, i, group)
                break;
            }
        }
    }

    function renderText(element, node, group) {
        var text = node.data;
        var range = document.createRange();
        var style = getComputedStyle(element);
        var align = style.getPropertyValue("text-align");
        var isJustified = align == "justify";

        // skip whitespace
        var start = 0;
        var end = /\S\s*$/.exec(node.data);
        if (!end) {
            // only whitespace?
            return null;
        }
        end = end.index + 1;

        function doChunk() {
            while (!/\S/.test(text.charAt(start))) {
                if (start >= end) {
                    return true;
                }
                start++;
            }
            range.setStart(node, start);
            for (var i = start + 1; i <= end; ++i) {
                range.setEnd(node, i);
                if (range.getClientRects().length > 1 || (isJustified && /\s/.test(text.charAt(i - 1)))) {
                    range.setEnd(node, --i);
                    break;
                }
            }
            var box = range.getBoundingClientRect();
            var str = range.toString().replace(/\s+$/, "");
            drawText(str, box);
            start = i;
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
        var style = getComputedStyle(element);

        var opacity = parseFloat(style.getPropertyValue(opacity));
        if (opacity == 0) return;
        // XXX: how  to handle opacity?

        var group = new drawing.Group();
        var t = getTransform(style);
        if (t) {
            var prevTransform = element.style.transform;
            element.style.setProperty("transform", "none", "important");
            // XXX: not quite correct
            transform(group, mmul(t.matrix, [ 1, 0, 0, 1, t.origin[0], t.origin[1] ]));
        }
        renderBorderAndBackground(element, group);
        renderContents(element, group);
        if (t) {
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

})();
