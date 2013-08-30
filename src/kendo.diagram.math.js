kendo_module({
    id: "diagram.math",
    name: "Math",
    category: "diagram",
    depends: ["dataviz.core"]
});

(function ($, undefined) {
    var kendo = window.kendo,
        diagram = kendo.diagram = {},
        Graph = kendo.diagram.Graph,
        Node = kendo.diagram.Node,
        Link = kendo.diagram.Link,
        Dictionary = kendo.diagram.Dictionary,
        HashTable = kendo.diagram.HashTable,
        Queue = kendo.diagram.Queue,
        Class = kendo.Class,
        deepExtend = kendo.deepExtend,
        dataviz = kendo.dataviz,
        HITTESTAREA = 3,
        Point = dataviz.Point2D,
        EPSILON = 1e-06;

    deepExtend(Point.fn, {
        plus: function (p) {
            return new Point(this.x + p.x, this.y + p.y);
        },
        minus: function (p) {
            return new Point(this.x - p.x, this.y - p.y);
        },
        offset: function (value) {
            return new Point(this.x - value, this.y - value);
        },
        times: function (s) {
            return new Point(this.x * s, this.y * s);
        },
        normalize: function () {
            if (this.length() == 0) {
                return new Point();
            }
            return this.times(1 / this.length());
        },
        length: function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        },
        toString: function () {
            return "(" + this.x + "," + this.y + ")";
        },
        lengthSquared: function () {
            return (this.x * this.x + this.y * this.y);
        },
        middleOf: function MiddleOf(p, q) {
            return new Point(q.x - p.x, q.y - p.y).times(0.5).plus(p);
        },
        toPolar: function (useDegrees) {
            var factor = 1;
            if (useDegrees) {
                factor = 180 / Math.PI;
            }
            var a = Math.atan2(Math.abs(this.y), Math.abs(this.x));
            var halfpi = Math.PI / 2;
            if (this.x == 0) {
                // note that the angle goes down and not the usual mathematical convention
                var len = this.length();
                if (this.y == 0) {
                    return new Polar(0, 0);
                }
                if (this.y > 0) {
                    return new Polar(len, factor * halfpi);
                }
                if (this.y < 0) {
                    return new Polar(len, factor * 3 * halfpi);
                }
            }
            else if (this.x > 0) {
                if (this.y == 0) {
                    return new Polar(len, 0);
                }
                if (this.y > 0) {
                    return new Polar(len, factor * a);
                }
                if (this.y < 0) {
                    return new Polar(len, factor * (4 * halfpi - a));
                }
            }
            else {
                if (this.y == 0) {
                    return new Polar(len, 2 * halfpi);
                }
                if (this.y > 0) {
                    return new Polar(len, factor * (2 * halfpi - a));
                }
                if (this.y < 0) {
                    return new Polar(len, factor * (2 * halfpi + a));
                }
            }
        },
        isOnLine: function (from, to) {
            if (from.x > to.x) { // from must be the leftmost point
                var temp = to;
                to = from;
                from = temp;
            }
            var r1 = new Rect(from.x, from.y).inflate(HITTESTAREA, HITTESTAREA),
                r2 = new Rect(to.x, to.y).inflate(HITTESTAREA, HITTESTAREA);
            if (r1.union(r2).contains(this)) {
                if (from.x === to.x || from.y === to.y) {
                    return true;
                }
                else if (from.y < to.y) {
                    o1 = r1.x + (((r2.x - r1.x) * (this.y - (r1.y + r1.height))) / ((r2.y + r2.height) - (r1.y + r1.height)));
                    u1 = (r1.x + r1.width) + ((((r2.x + r2.width) - (r1.x + r1.width)) * (this.y - r1.y)) / (r2.y - r1.y));
                }
                else {
                    o1 = r1.x + (((r2.x - r1.x) * (this.y - r1.y)) / (r2.y - r1.y));
                    u1 = (r1.x + r1.width) + ((((r2.x + r2.width) - (r1.x + r1.width)) * (this.y - (r1.y + r1.height))) / ((r2.y + r2.height) - (r1.y + r1.height)));
                }
                return (this.x > o1 && this.x < u1);
            }
            return false;
        }
    });

    var Rect = Class.extend({
        init: function (x, y, width, height) {
            this.x = x || 0;
            this.y = y || 0;
            this.width = width || 0;
            this.height = height || 0;
        },
        contains: function (point) {
            return ((point.x >= this.x) && (point.x <= (this.x + this.width)) && (point.y >= this.y) && (point.y <= (this.y + this.height)));
        },
        inflate: function (dx, dy) {
            if (dy === undefined) {
                dy = dx;
            }

            this.x -= dx;
            this.y -= dy;
            this.width += 2 * dx + 1;
            this.height += 2 * dy + 1;
            return this;
        },
        offset: function (dx, dy) {
            this.x += dx;
            this.y += dy;
        },
        union: function (r) {
            var x1 = Math.min(this.x, r.x);
            var y1 = Math.min(this.y, r.y);
            var x2 = Math.max((this.x + this.width), (r.x + r.width));
            var y2 = Math.max((this.y + this.height), (r.y + r.height));
            return new Rect(x1, y1, x2 - x1, y2 - y1);
        },
        center: function () {
            return new Point(this.x + this.width / 2, this.y + this.height / 2);
        },
        top: function () {
            return new Point(this.x + this.width / 2, this.y);
        },
        right: function () {
            return new Point(this.x + this.width, this.y + this.height / 2);
        },
        bottom: function () {
            return new Point(this.x + this.width / 2, this.y + this.height);
        },
        left: function () {
            return new Point(this.x, this.y + this.height / 2);
        },
        topLeft: function () {
            return new Point(this.x, this.y);
        },
        topRight: function () {
            return new Point(this.x + this.width, this.y);
        },
        bottomLeft: function () {
            return new Point(this.x, this.y + this.height);
        },
        bottomRight: function () {
            return new Point(this.x + this.width, this.y + this.height);
        },
        clone: function () {
            return new Rect(this.x, this.y, this.width, this.height);
        },
        empty: function () {
            return new Rect(0, 0, 0, 0);
        },
        isEmpty: function () {
            return !this.width && !this.height;
        },
        fromPoints: function (p, q) {
            if (isNaN(p.x) || isNaN(p.y) || isNaN(q.x) || isNaN(q.y)) {
                throw "Some values are NaN.";
            }
            return new Rect(Math.min(p.x, q.x), Math.min(p.y, q.y), Math.abs(p.x - q.x), Math.abs(p.y - q.y));
        },
        equals: function (rect) {
            return this.x == rect.x && this.y === rect.y && this.width === rect.width && this.height === rect.height;
        },
        toString: function () {
            return this.x + " " + this.y + " " + this.width + " " + this.height;
        }
    });

    var Size = Class.extend({
        init: function (width, height) {
            this.width = width;
            this.height = height;
        }
    });

    Size.prototype.Empty = new Size(0, 0);

    Rect.toRect = function (rect) {
        if (!(rect instanceof Rect)) {
            rect = new Rect(rect.x, rect.y, rect.width, rect.height);
        }

        return rect;
    };

    function isNearZero(num) {
        return Math.abs(num) < EPSILON;
    }

    function intersectLine(start1, end1, start2, end2, isSegment) {
        var tangensdiff = ((end1.x - start1.x) * (end2.y - start2.y)) - ((end1.y - start1.y) * (end2.x - start2.x));
        if (isNearZero(tangensdiff)) {
            //parallel lines
            return;
        }

        var num1 = ((start1.y - start2.y) * (end2.x - start2.x)) - ((start1.x - start2.x) * (end2.y - start2.y));
        var num2 = ((start1.y - start2.y) * (end1.x - start1.x)) - ((start1.x - start2.x) * (end1.y - start1.y));
        var r = num1 / tangensdiff;
        var s = num2 / tangensdiff;

        if (isSegment && (r < 0 || r > 1 || s < 0 || s > 1)) {
            //r < 0 => line 1 is below line 2
            //r > 1 => line 1 is above line 2
            //s < 0 => line 2 is below line 1
            //s > 1 => line 2 is above line 1
            return;
        }

        return new Point(start1.x + (r * (end1.x - start1.x)), start1.y + (r * (end1.y - start1.y)));
    }

    var Intersect = {
        lines: function (start1, end1, start2, end2) {
            return intersectLine(start1, end1, start2, end2);
        },
        segments: function (start1, end1, start2, end2) {
            return intersectLine(start1, end1, start2, end2, true);
        },
        rectWithLine: function (rect, start, end) {
            return  Intersect.segments(start, end, rect.topLeft(), rect.topRight()) ||
                Intersect.segments(start, end, rect.topRight(), rect.bottomRight()) ||
                Intersect.segments(start, end, rect.bottomLeft(), rect.bottomRight()) ||
                Intersect.segments(start, end, rect.topLeft(), rect.bottomLeft());
        },
        rects: function (rect1, rect2, angle) {
            var tl = rect2.topLeft(),
                tr = rect2.topRight(),
                bl = rect2.bottomLeft(),
                br = rect2.bottomRight();

            if (angle) {
                var center = rect2.center();
                tl = tl.rotate(center, angle);
                tr = tr.rotate(center, angle);
                bl = bl.rotate(center, angle);
                br = br.rotate(center, angle);
            }

            var intersect = rect1.contains(tl) ||
                rect1.contains(tr) ||
                rect1.contains(bl) ||
                rect1.contains(br) ||
                Intersect.rectWithLine(rect1, tl, tr) ||
                Intersect.rectWithLine(rect1, tl, bl) ||
                Intersect.rectWithLine(rect1, tr, br) ||
                Intersect.rectWithLine(rect1, bl, br);

            if (!intersect) {//last possible case is rect1 to be completely within rect2
                tl = rect1.topLeft();
                tr = rect1.topRight();
                bl = rect1.bottomLeft();
                br = rect1.bottomRight();

                if (angle) {
                    var reverseAngle = 360 - angle;
                    tl = tl.rotate(center, reverseAngle);
                    tr = tr.rotate(center, reverseAngle);
                    bl = bl.rotate(center, reverseAngle);
                    br = br.rotate(center, reverseAngle);
                }

                intersect = rect2.contains(tl) ||
                    rect2.contains(tr) ||
                    rect2.contains(bl) ||
                    rect2.contains(br);
            }

            return intersect;
        }
    };

    /**
     * Aligns two rectangles, where one is the container and the other is content.
     */
    var RectAlign = Class.extend({
        init: function (container) {
            this.container = Rect.toRect(container);
        },

        align: function (content, alignment) {
            var alignValues = alignment.toLowerCase().split(" ");

            for (var i = 0; i < alignValues.length; i++) {
                content = this._singleAlign(content, alignValues[i]);
            }

            return content;
        },
        _singleAlign: function (content, alignment) {
            if (isFunction(this[alignment])) {
                return this[alignment](content);
            }
            else {
                return content;
            }
        },

        left: function (content) {
            return this._hAlign(content, this._left);
        },
        center: function (content) {
            return this._hAlign(content, this._center);
        },
        right: function (content) {
            return this._hAlign(content, this._right);
        },
        top: function (content) {
            return this._vAlign(content, this._top);
        },
        middle: function (content) {
            return this._vAlign(content, this._middle);
        },
        bottom: function (content) {
            return this._vAlign(content, this._bottom);
        },

        _left: function (container, content) {
            return container.x;
        },
        _center: function (container, content) {
            return ((container.width - content.width) / 2) | 0;
        },
        _right: function (container, content) {
            return container.width - content.width;
        },
        _top: function (container, content) {
            return container.y
        },
        _middle: function (container, content) {
            return ((container.height - content.height) / 2) | 0;
        },
        _bottom: function (container, content) {
            return container.height - content.height;
        },

        _hAlign: function (content, alignCalc) {
            content = Rect.toRect(content);
            content.x = alignCalc(this.container, content);

            return content;
        },
        _vAlign: function (content, alignCalc) {
            content = Rect.toRect(content);
            content.y = alignCalc(this.container, content);

            return content;
        }
    });

    var Polar = Class.extend({
        init: function (r, a) {
            this.r = r;
            this.angle = a;
        }
    });

    /**
     * SVG transformation matrix.
     */
    var Matrix = Class.extend({
        init: function (a, b, c, d, e, f) {
            this.a = a || 0;
            this.b = b || 0;
            this.c = c || 0;
            this.d = d || 0;
            this.e = e || 0;
            this.f = f || 0;
        },
        plus: function (m) {
            this.a += m.a;
            this.b += m.b;
            this.c += m.c;
            this.d += m.d;
            this.e += m.e;
            this.f += m.f;
        },
        minus: function (m) {
            this.a -= m.a;
            this.b -= m.b;
            this.c -= m.c;
            this.d -= m.d;
            this.e -= m.e;
            this.f -= m.f;
        },
        times: function (m) {
            return new Matrix(
                this.a * m.a + this.c * m.b,
                this.b * m.a + this.d * m.b,
                this.a * m.c + this.c * m.d,
                this.b * m.c + this.d * m.d,
                this.a * m.e + this.c * m.f + this.e,
                this.b * m.e + this.d * m.f + this.f
            );
        },
        apply: function (p) {
            return new Point(this.a * p.x + this.c * p.y + this.e, this.b * p.x + this.d * p.y + this.f);
        },
        toString: function () {
            return "matrix(" + this.a + " " + this.b + " " + this.c + " " + this.d + " " + this.e + " " + this.f + ")";
        }
    });

    deepExtend(Matrix, {
        fromSVGMatrix: function (vm) {
            var m = new Matrix();
            m.a = vm.a;
            m.b = vm.b;
            m.c = vm.c;
            m.d = vm.d;
            m.e = vm.e;
            m.f = vm.f;
            return m;
        },
        fromMatrixVector: function (v) {
            var m = new Matrix();
            m.a = v.a;
            m.b = v.b;
            m.c = v.c;
            m.d = v.d;
            m.e = v.e;
            m.f = v.f;
            return m;
        },
        fromList: function (v) {
            if (v.length != 6) {
                throw "The given list should consist of six elements.";
            }
            var m = new Matrix();
            m.a = v[0];
            m.b = v[1];
            m.c = v[2];
            m.d = v[3];
            m.e = v[4];
            m.f = v[5];
            return m;
        },
        translation: function (x, y) {
            var m = new Matrix();
            m.a = 1;
            m.b = 0;
            m.c = 0;
            m.d = 1;
            m.e = x;
            m.f = y;
            return m;
        },
        unit: function () {
            return new Matrix(1, 0, 0, 1, 0, 0);
        },
        rotation: function (angle, x, y) {
            var m = new Matrix();
            m.a = Math.cos(angle * Math.PI / 180);
            m.b = Math.sin(angle * Math.PI / 180);
            m.c = -m.b;
            m.d = m.a;
            m.e = (x - x * m.a + y * m.b) || 0;
            m.f = (y - y * m.a - x * m.b) || 0;
            return m;
        },
        scaling: function (scaleX, scaleY) {
            var m = new Matrix();
            m.a = scaleX;
            m.b = 0;
            m.c = 0;
            m.d = scaleY;
            m.e = 0;
            m.f = 0;
            return m;
        },
        parse: function (v) {
            var parts, nums;
            if (v) {
                v = v.trim();
                // of the form "matrix(...)"
                if (v.slice(0, 6).toLowerCase() == "matrix") {
                    nums = v.slice(7, v.length - 1).trim();
                    parts = nums.split(",");
                    if (parts.length == 6) {
                        return Matrix.fromList(parts.map(function (p) {
                            return parseFloat(p);
                        }));
                    }
                    parts = nums.split(" ");
                    if (parts.length == 6) {
                        return Matrix.fromList(parts.map(function (p) {
                            return parseFloat(p);
                        }));
                    }
                }
                // of the form "(...)"
                if (v.slice(0, 1) == "(" && v.slice(v.length - 1) == ")") {
                    v = v.substr(1, v.length - 1);
                }
                if (v.indexOf(",") > 0) {
                    parts = v.split(",");
                    if (parts.length == 6) {
                        return Matrix.fromList(parts.map(function (p) {
                            return parseFloat(p);
                        }));
                    }
                }
                if (v.indexOf(" ") > 0) {
                    parts = v.split(" ");
                    if (parts.length == 6) {
                        return Matrix.fromList(parts.map(function (p) {
                            return parseFloat(p);
                        }));
                    }
                }
            }
            return parts;
        }
    });

    /**
     * SVG transformation represented as a vector.
     */
    var MatrixVector = Class.extend({
        init: function (a, b, c, d, e, f) {
            this.a = a || 0;
            this.b = b || 0;
            this.c = c || 0;
            this.d = d || 0;
            this.e = e || 0;
            this.f = f || 0;
        },
        fromMatrix: function FromMatrix(m) {
            var v = new MatrixVector();
            v.a = m.a;
            v.b = m.b;
            v.c = m.c;
            v.d = m.d;
            v.e = m.e;
            v.f = m.f;
            return v;
        }
    });

    /**
     * The Range defines an array of equally separated numbers.
     * @param start The start-value of the Range.
     * @param stop The end-value of the Range.
     * @param step The separation between the values (default:1).
     * @returns {Array}
     */
    function Range(start, stop, step) {
        if (typeof start == 'undefined' || typeof stop == 'undefined') {
            return [];
        }
        if (step && Math.sign(stop - start) != Math.sign(step)) {
            throw "The sign of the increment should allow to reach the stop-value.";
        }
        step = step || 1;
        start = start || 0;
        stop = stop || start;
        if ((stop - start) / step === Infinity) {
            throw "Infinite range defined.";
        }
        var range = [], i = -1, j;

        function rangeIntegerScale(x) {
            var k = 1;
            while (x * k % 1) {
                k *= 10;
            }
            return k;
        }

        var k = rangeIntegerScale(Math.abs(step));
        start *= k;
        stop *= k;
        step *= k;
        if (start > stop && step > 0) {
            step = -step;
        }
        if (step < 0) {
            while ((j = start + step * ++i) >= stop) {
                range.push(j / k);
            }
        }
        else {
            while ((j = start + step * ++i) <= stop) {
                range.push(j / k);
            }
        }
        return range;
    }

    /**
     * Returns a value with Gaussian (normal) distribution.
     * @param mean The mean value of the distribution.
     * @param deviation The deviation (spreading at half-height) of the distribution.
     * @returns {number}
     */
    function normalVariable(mean, deviation) {
        var x, y, r;
        do {
            x = Math.random() * 2 - 1;
            y = Math.random() * 2 - 1;
            r = x * x + y * y;
        }
        while (!r || r > 1);
        return mean + deviation * x * Math.sqrt(-2 * Math.log(r) / r);
    };

    /**
     * Returns a random identifier which can be used as an ID of objects, eventually augmented with a prefix.
     * @returns {string}
     */
    function randomId(length) {
        if (isUndefined(length)) {
            length = 10;
        }
        // old version return Math.floor((1 + Math.random()) * 0x1000000).toString(16).substring(1);
        var result = '';
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (var i = length; i > 0; --i) {
            result += chars[Math.round(Math.random() * (chars.length - 1))];
        }
        return result;
    }

    /*---------------The HashTable structure--------------------------------*/

    /**
     * Represents a collection of key-value pairs that are organized based on the hash code of the key.
     * _buckets[hashId] = {key: key, ...}
     * Important: do not use the standard Array access method, use the get/Set methods instead.
     */
    var HashTable = kendo.Class.extend({
        init: function () {

            this._buckets = [];
            this.length = 0;
        },

        /**
         * Adds the literal object with the given key (of the form {key: key,....}).
         */
        add: function (key, value) {

            var obj = this._createGetBucket(key);
            if (isDefined(value)) {
                obj.value = value;
            }
            return obj;
        },

        /**
         * Gets the literal object with the given key.
         */
        get: function (key) {
            if (this._bucketExists(key)) {
                return this._createGetBucket(key);
            }
            return null;
        },
        /**
         * Set the key-value pair.
         * @param key The key of the entry.
         * @param value The value to set. If the key already exists the value will be overwritten.
         */
        set: function (key, value) {
            this.add(key, value);
        },
        /**
         * Determines whether the HashTable contains a specific key.
         */
        containsKey: function (key) {
            return this._bucketExists(key);
        },

        /**
         * Removes the element with the specified key from the hashtable.
         * Returns the removed bucket.
         */
        remove: function (key) {
            if (this._bucketExists(key)) {
                var hashId = this._hash(key);
                delete this._buckets[hashId];
                this.length--;
                return key;
            }
        },

        /**
         * Returns the hashes of the buckets.
         * @returns {Array}
         * @private
         */
        _hashes: function () {
            var hashes = [];
            for (var hash in this._buckets) {
                if (this._buckets.hasOwnProperty(hash)) {
                    hashes.push(hash);
                }
            }
            return hashes;
        },

        /**
         * Foreach with an iterator working on the key-value pairs.
         * @param func
         */
        forEach: function (func) {
            var hashes = this._hashes();
            for (var i = 0, len = hashes.length; i < len; i++) {
                var hash = hashes[i];
                var bucket = this._buckets[hash];
                if (isUndefined(bucket)) {
                    continue;
                }
                func(bucket);
            }

        },

        _bucketExists: function (key) {
            var hashId = this._hash(key);
            return isDefined(this._buckets[hashId]);
        },

        /**
         * Returns-adds the createGetBucket with the given key. If not present it will
         * be created and returned.
         * A createGetBucket is a literal object of the form {key: key, ...}.
         */
        _createGetBucket: function (key) {
            var hashId = this._hash(key);
            var bucket = this._buckets[hashId];
            if (isUndefined(bucket)) {
                bucket = { key: key };
                this._buckets[hashId] = bucket;
                this.length++;
            }
            return bucket;
        },

        /**
         * Hashing of the given key.
         */
        _hash: function (key) {
            if (isNumber(key)) {
                return key & key;
            }
            if (isString(key)) {
                return this._hashString(key);
            }
            if (isObject(key)) {
                return this._objectHashId(key);
            }
            throw "Unsupported key type.";
        },

        /**
         * Hashing of a string.
         */
        _hashString: function (s) {
            // see for example http://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery
            var result = 0;
            if (s.length == 0) {
                return result;
            }
            for (var i = 0; i < s.length; i++) {
                var ch = s.charCodeAt(i);
                result = ((result << 5) - result) + ch;
                result = result & result;
            }
            return result;
        },

        /**
         * Returns the unique identifier for an object. This is automatically assigned and add on the object.
         */
        _objectHashId: function (key) {
            var id = key._hashId;
            if (isUndefined(id)) {
                id = randomId();
                key._hashId = id;
            }
            return id;
        }
    });

    /*---------------The Dictionary structure--------------------------------*/

    /**
     * Represents a collection of key-value pairs.
     * Important: do not use the standard Array access method, use the get/Set methods instead.
     */
    var Dictionary = kendo.Observable.extend({
        /**
         * Initializes a new instance of the Dictionary class.
         * @param dictionary Loads the content of the given dictionary into this new one.
         */
        init: function (dictionary) {
            var that = this;
            kendo.Observable.fn.init.call(that);
            that.bind('changed', function (e) {
            });
            this._hashTable = new HashTable();
            this.length = 0;
            if (isDefined(dictionary)) {
                dictionary.forEach(function (k, v) {
                    this.add(k, v);
                }, this);
            }
        },

        /**
         * Adds a key-value to the dictionary.
         * If the key already exists this will assign the given value to the existing entry.
         */
        add: function (key, value) {
            var entry = this._hashTable.get(key);
            if (entry == null) {
                entry = this._hashTable.add(key);
                this.length++;
                this.trigger('changed');
            }
            entry.value = value;
        },

        /**
         * Set the key-value pair.
         * @param key The key of the entry.
         * @param value The value to set. If the key already exists the value will be overwritten.
         */
        set: function (key, value) {
            this.add(key, value);
        },

        /**
         * Gets the value associated with the given key in the dictionary.
         */
        get: function (key) {
            var entry = this._hashTable.get(key);
            if (entry != null) {
                return entry.value;
            }
            throw new Error("Cannot find key " + key);
        },

        /**
         * Returns whether the dictionary contains the given key.
         */
        containsKey: function (key) {
            return this._hashTable.containsKey(key);
        },

        /**
         * Removes the element with the specified key from the dictionary.
         */
        remove: function (key) {
            if (this.containsKey(key)) {
                this.trigger("changed");
                return this._hashTable.remove(key);
                this.length--;
            }
        },

        /**
         * The functional gets the key and value as parameters.
         */
        forEach: function (func, thisRef) {
            this._hashTable.forEach(function (entry) {
                func.call(thisRef, entry.key, entry.value);
            });
        },

        /**
         * Same as forEach except that only the value is passed to the functional.
         */
        forEachValue: function (func, thisRef) {
            this._hashTable.forEach(function (entry) {
                func.call(thisRef, entry.value);
            });
        },

        /**
         * Calls a defined callback function for each key in the dictionary.
         */
        forEachKey: function (func, thisRef) {
            this._hashTable.forEach(function (entry) {
                func.call(thisRef, entry.key);
            });
        },

        /**
         * Gets an array with all keys in the dictionary.
         */
        keys: function () {
            var keys = [];
            this.forEachKey(function (key) {
                keys.push(key);
            });
            return keys;
        }
    });

    /*---------------Queue structure--------------------------------*/

    var Queue = kendo.Class.extend({

        init: function () {
            this._tail = null;
            this._head = null;
            this.length = 0;
        },

        /**
         * Enqueues an object to the end of the queue.
         */
        enqueue: function (value) {
            var entry = { value: value, next: null };
            if (this._head == null) {
                this._head = entry;
                this._tail = this._head;
            }
            else {
                this._tail.next = entry;
                this._tail = this._tail.next;
            }
            this.length++;
        },

        /**
         * Removes and returns the object at top of the queue.
         */
        dequeue: function () {
            if (this.length < 1) {
                throw new Error("The queue is empty.");
            }
            var value = this._head.value;
            this._head = this._head.next;
            this.length--;
            return value;
        },

        contains: function (item) {
            var current = this._head;
            while (current != null) {
                if (current.value == item) {
                    return true;
                }
                current = current.next;
            }
            return false;
        }
    });

    /*----------------Node-------------------------------*/

    /**
     * Defines the node (vertex) of a Graph.
     */
    var Node = kendo.Class.extend({

        init: function (id, shape) {

            /**
             * Holds all the links incident with the current node.
             * Do not use this property to manage the incoming links, use the appropriate add/remove methods instead.
             */
            this.links = [];

            /**
             * Holds the links from the current one to another Node .
             * Do not use this property to manage the incoming links, use the appropriate add/remove methods instead.
             */
            this.outgoing = [];

            /**
             * Holds the links from another Node to the current one.
             * Do not use this property to manage the incoming links, use the appropriate add/remove methods instead.
             */
            this.incoming = [];

            /**
             * Holds the weight of this Node.
             */
            this.weight = 1;

            if (isDefined(id)) {
                this.id = id;
            }
            else {
                this.id = randomId();
            }
            if (isDefined(shape)) {
                this.associatedShape = shape;
                // transfer the shape's bounds to the runtime props
                var b = shape.bounds();
                this.width = b.width;
                this.height = b.height;
                this.x = b.x;
                this.y = b.y;
            }
            else {
                this.associatedShape = null;
            }
            /**
             * The payload of the node.
             * @type {null}
             */
            this.data = null;
            this.type = "Node";
            this.shortForm = "Node '" + this.id + "'";
            /**
             * Whether this is an injected node during the analysis or layout process.
             * @type {boolean}
             */
            this.isVirtual = false;
        },

        /**
         * Returns whether this node has no links attached.
         */
        isIsolated: function () {
            return this.links.isEmpty();
        },

        /**
         * Gets or sets the bounding rectangle of this node.
         * This should be considered as runtime data, the property is not hotlinked to a SVG item.
         */
        bounds: function (r) {
            if (!isDefined(r)) {
                return new diagram.Rect(this.x, this.y, this.width, this.height);
            }

            this.x = r.x;
            this.y = r.y;
            this.width = r.width;
            this.height = r.height;
        },

        /**
         * Returns whether there is at least one link with the given (complementary) node. This can be either an
         * incoming or outgoing link.
         */
        isLinkedTo: function (node) {
            var thisRef = this;
            return this.links.any(function (link) {
                return link.getComplement(thisRef) === node;
            });
        },

        /**
         * Gets the children of this node, defined as the adjacent nodes with a link from this node to the adjacent one.
         * @returns {Array}
         */
        getChildren: function () {
            if (this.outgoing.length == 0) {
                return [];
            }
            var children = [];
            for (var i = 0, len = this.outgoing.length; i < len; i++) {
                var link = this.outgoing[i];
                children.add(link.getComplement(this));
            }
            return children;
        },

        /**
         * Gets the parents of this node, defined as the adjacent nodes with a link from the adjacent node to this one.
         * @returns {Array}
         */
        getParents: function () {
            if (this.incoming.length == 0) {
                return [];
            }
            var parents = [];
            for (var i = 0, len = this.incoming.length; i < len; i++) {
                var link = this.incoming[i];
                parents.add(link.getComplement(this));
            }
            return parents;
        },

        /**
         * Returns a clone of the Node. Note that the identifier is not cloned since it's a different Node instance.
         * @returns {Node}
         */
        clone: function () {
            var copy = new Node();
            if (isDefined(this.weight)) {
                copy.weight = this.weight;
            }
            if (isDefined(this.balance)) {
                copy.balance = this.balance;
            }
            if (isDefined(this.owner)) {
                copy.owner = this.owner;
            }
            copy.associatedShape = this.associatedShape;
            copy.x = this.x;
            copy.y = this.y;
            copy.width = this.width;
            copy.height = this.height;
            return copy;
        },

        /**
         * Returns whether there is a link from the current node to the given node.
         */
        adjacentTo: function (node) {
            return this.isLinkedTo(node) !== null;
        },

        /**
         * Removes the given link from the link collection this node owns.
         * @param link
         */
        removeLink: function (link) {
            if (link.source == this) {
                this.links.remove(link);
                this.outgoing.remove(link);
                link.source = null;
            }

            if (link.target == this) {
                this.links.remove(link);
                this.incoming.remove(link);
                link.target = null;
            }
        },

        /**
         * Returns whether there is a (outgoing) link from the current node to the given one.
         */
        hasLinkTo: function (node) {
            return this.outgoing.any(function (link) {
                return link.target == node;
            });
        },

        /**
         * Returns the degree of this node, i.e. the sum of incoming and outgoing links.
         */
        degree: function () {
            return this.links.length;
        },

        /**
         * Returns whether this node is either the source or the target of the given link.
         */
        incidentWith: function (link) {
            return this.links.contains(link);
        },

        /**
         * Returns the links between this node and the given one.
         */
        getLinksWith: function (node) {
            return this.links.all(function (link) {
                return link.getComplement(this) === node;
            }, this);
        },

        /**
         * Returns the nodes (either parent or child) which are linked to the current one.
         */
        getNeighbors: function () {
            var neighbors = [];
            this.incoming.forEach(function (e) {
                neighbors.push(e.getComplement(this));
            }, this);
            this.outgoing.forEach(function (e) {
                neighbors.push(e.getComplement(this));
            }, this);
            return neighbors;
        }
    });

    /**
     * Defines a directed link (edge, connection) of a Graph.
     */
    var Link = kendo.Class.extend({

        init: function (source, target, id, connection) {
            if (isUndefined(source)) {
                throw "The source of the new link is not set.";
            }
            if (isUndefined(target)) {
                throw "The target of the new link is not set.";
            }
            var sourceFound, targetFound;
            if (isString(source)) {
                sourceFound = new Node(source);
            }
            else {
                sourceFound = source;
            }
            if (isString(target)) {
                targetFound = new Node(target);
            }
            else {
                targetFound = target;
            }

            this.source = sourceFound;
            this.target = targetFound;
            this.source.links.add(this);
            this.target.links.add(this);
            this.source.outgoing.add(this);
            this.target.incoming.add(this);
            if (isDefined(id)) {
                this.id = id;
            }
            else {
                this.id = randomId();
            }
            if (isDefined(connection)) {
                this.associatedConnection = connection;
            }
            else {
                this.associatedConnection = null;
            }
            this.type = "Link";
            this.shortForm = "Link '" + this.source.id + "->" + this.target.id + "'";
        },

        /**
         * Returns the complementary node of the given one, if any.
         */
        getComplement: function (node) {
            if (this.source != node && this.target != node) {
                throw "The given node is not incident with this link.";
            }
            return this.source == node ? this.target : this.source;
        },

        /**
         * Returns the overlap of the current link with the given one, if any.
         */
        getCommonNode: function (link) {
            if (this.source == link.source || this.source == link.target) {
                return this.source;
            }
            if (this.target == link.source || this.target == link.target) {
                return this.target;
            }
            return null;
        },

        /**
         * Returns whether the current link is bridging the given nodes.
         */
        isBridging: function (v1, v2) {
            return this.source == v1 && this.target == v2 || this.source == v2 && this.target == v1;
        },

        /**
         * Returns the source and target of this link as a tuple.
         */
        getNodes: function () {
            return [this.source, this.target];
        },

        /**
         * Returns whether the given node is either the source or the target of the current link.
         */
        incidentWith: function (node) {
            return this.source == node || this.target == node;
        },

        /**
         * Returns whether the given link is a continuation of the current one. This can be both
         * via an incoming or outgoing link.
         */
        adjacentTo: function (link) {
            return this.source.links.contains(link) || this.target.links.contains(link);
        },

        /**
         * Changes the source-node of this link.
         */
        changeSource: function (node) {
            this.source.links.remove(this);
            this.source.outgoing.remove(this);

            node.links.push(this);
            node.outgoing.push(this);

            this.source = node;
        },

        /**
         * Changes the target-node of this link.
         * @param node
         */
        changeTarget: function (node) {
            this.target.links.remove(this);
            this.target.incoming.remove(this);

            node.links.push(this);
            node.incoming.push(this);

            this.target = node;
        },

        /**
         * Changes both the source and the target nodes of this link.
         */
        changesNodes: function (v, w) {
            if (this.source == v) {
                this.changeSource(w);
            }
            else if (this.target == v) {
                this.changeTarget(w);
            }
        },

        /**
         * Reverses the direction of this link.
         */
        reverse: function () {
            var oldSource = this.source;
            var oldTarget = this.target;

            this.source = oldTarget;
            oldSource.outgoing.remove(this);
            this.source.outgoing.push(this);

            this.target = oldSource;
            oldTarget.incoming.remove(this);
            this.target.incoming.push(this);
            return this;
        },

        /**
         * Ensures that the given target defines the endpoint of this link.
         */
        directTo: function (target) {
            if (this.source != target && this.target != target) {
                throw "The given node is not incident with this link.";
            }
            if (this.target != target) {
                this.reverse();
            }
        },

        /**
         * Returns a reversed clone of this link.
         */
        createReverseEdge: function () {
            var r = this.clone();
            r.reverse();
            r.reversed = true;
            return r;
        },

        /**
         * Returns a clone of this link.
         */
        clone: function () {
            var clone = new Link(this.source, this.target);
            return clone;
        }
    });

    /*--------------Graph structure---------------------------------*/
    /**
     * Defines a directed graph structure.
     * Note that the incidence structure resides in the nodes through the incoming and outgoing links collection, rahter than
     * inside the Graph.
     */
    var Graph = kendo.Class.extend({
        init: function (idOrDiagram) {
            /**
             * The links or edge collection of this Graph.
             * @type {Array}
             */
            this.links = [];
            /**
             * The node or vertex collection of this Graph.
             * @type {Array}
             */
            this.nodes = [];
            /**
             * The optional reference to the Diagram on which this Graph is based.
             * @type {null}
             */
            this.diagram = null;

            /**
             * The root of this Graph. If not set explicitly the first Node with zero incoming links will be taken.
             * @type {null}
             * @private
             */
            this._root = null;
            if (isDefined(idOrDiagram)) {
                if (isString(idOrDiagram)) {
                    this.id = idOrDiagram;
                }
                else {
                    this.diagram = idOrDiagram;
                    this.id = idOrDiagram.id;
                }
            }
            else {
                this.id = randomId();
            }

            /**
             * The bounds of this graph if the nodes have spatial extension defined.
             * @type {Rect}
             */
            this.bounds = new Rect();
            // keeps track whether the children & parents have been created
            this._hasCachedRelationships = false;
            this.type = "Graph";
        },
        /**
         * Caches the relational information of parents and children in the 'parents' and 'children'
         * properties.
         * @param forceRebuild If set to true the relational info will be rebuild even if already present.
         */
        cacheRelationships: function (forceRebuild) {
            if (isUndefined(forceRebuild)) {
                forceRebuild = false;
            }
            if (this._hasCachedRelationships && !forceRebuild) {
                return;
            }
            for (var i = 0, len = this.nodes.length; i < len; i++) {
                var node = this.nodes[i];
                node.children = this.getChildren(node);
                node.parents = this.getParents(node);
            }
            this._hasCachedRelationships = true;
        },

        /**
         * Assigns tree-levels to the nodes assuming this is a tree graph.
         * If not connected or not a tree the process will succeed but
         * will have little meaning.
         * @param startNode The node from where the level numbering starts, usually the root of the tree.
         * @param visited The collection of visited nodes.
         * @param offset The offset or starting counter of the level info.
         */
        assignLevels: function (startNode, offset, visited) {
            if (startNode == null) {
                throw "Start node not specified.";
            }
            if (isUndefined(offset)) {
                offset = 0;
            }
            // if not done before, cache the parents and children
            this.cacheRelationships();
            if (isUndefined(visited)) {
                visited = new Dictionary();
                this.nodes.forEach(function (n) {
                    visited.add(n, false);
                });
            }
            visited.set(startNode, true);
            startNode.level = offset;
            var children = startNode.children;
            for (var i = 0, len = children.length; i < len; i++) {
                var child = children[i];
                if (child == null || visited.get(child)) {
                    continue;
                }
                this.assignLevels(child, offset + 1, visited);
            }
        },

        /**
         * Gets or set the root of this graph.
         * If not set explicitly the first Node with zero incoming links will be taken.
         * @param value
         * @returns {*}
         */
        root: function (value) {
            if (isUndefined(value)) {
                if (this._root == null) {
                    // TODO: better to use the longest path for the most probable root?
                    return this.nodes.first(function (n) {
                        return n.incoming.length == 0;
                    })
                }
                else {
                    return this._root;
                }
            }
            else {
                this._root = value;
            }
        },

        /**
         * Returns the connected components of this graph.
         * Note that the returned graphs are made up of the nodes and links of this graph, i.e. a pointer to the items of this graph.
         * If you alter the items of the components you'll alter the original graph and vice versa.
         * @returns {Array}
         */
        getConnectedComponents: function () {
            this.componentIndex = 0;
            this.setItemIndices();
            var componentId = initArray(this.nodes.length, -1);

            for (var v = 0; v < this.nodes.length; v++) {
                if (componentId[v] == -1) {
                    this._collectConnectedNodes(componentId, v);
                    this.componentIndex++;
                }
            }

            var components = [];
            for (var i = 0; i < this.componentIndex; ++i) {
                components[i] = new Graph();
            }
            for (var i = 0; i < componentId.length; ++i) {
                var graph = components[componentId[i]];
                graph.addNodeAndOutgoings(this.nodes[i]);
            }
            // sorting the components in decreasing order of node count
            components.sort(function (a, b) {
                return b.nodes.length - a.nodes.length;
            });
            return components;
        },

        _collectConnectedNodes: function (setIds, nodeIndex) {
            setIds[nodeIndex] = this.componentIndex; // part of the current component
            var node = this.nodes[nodeIndex];
            node.links.forEach(
                function (link) {
                    var next = link.getComplement(node);
                    var nextId = next.index;
                    if (setIds[nextId] == -1) {
                        this._collectConnectedNodes(setIds, nextId);
                    }
                }, this);
        },

        /**
         * Calculates the bounds of this Graph if the Nodes have spatial dimensions defined.
         * @returns {Rect}
         */
        calcBounds: function () {
            if (this.isEmpty()) {
                this.bounds = new Rect();
                return this.bounds;
            }
            var b = null;
            for (var i = 0, len = this.nodes.length; i < len; i++) {
                var node = this.nodes[i];
                if (b == null) {
                    b = node.bounds();
                }
                else {
                    b = b.union(node.bounds());
                }
            }
            this.bounds = b;
            return this.bounds;
        },

        /**
         * Creates a spanning tree for the current graph.
         * Important: this will not return a spanning forest if the graph is disconnected.
         * Prim's algorithm  finds a minimum-cost spanning tree of an edge-weighted, connected, undirected graph;
         * see http://en.wikipedia.org/wiki/Prim%27s_algorithm .
         * @param root The root of the spanning tree.
         * @returns {Graph}
         */
        getSpanningTree: function (root) {
            var tree = new Graph();
            var map = new Dictionary(), source, target;
            tree.root = root.clone();
            tree.root.level = 0;
            tree.root.id = root.id;
            map.add(root, tree.root);
            root.level = 0;

            var visited = [];
            var remaining = [];
            tree.nodes.add(tree.root);
            visited.add(root);
            remaining.add(root);

            var levelCount = 1;
            while (remaining.length > 0) {
                var next = remaining.pop();
                next.links.forEach(function (link) {
                    var cn = link.getComplement(next);
                    if (visited.contains(cn)) {
                        return;
                    }

                    cn.level = next.level + 1;
                    if (levelCount < cn.level + 1) {
                        levelCount = cn.level + 1;
                    }
                    if (!remaining.contains(cn)) {
                        remaining.add(cn);
                    }
                    if (!visited.contains(cn)) {
                        visited.add(cn);
                    }
                    if (map.containsKey(next)) {
                        source = map.get(next);
                    }
                    else {
                        source = next.clone();
                        source.level = next.level;
                        source.id = next.id;
                        map.add(next, source);
                    }
                    if (map.containsKey(cn)) {
                        target = map.get(cn);
                    }
                    else {
                        target = cn.clone();
                        target.level = cn.level;
                        target.id = cn.id;
                        map.add(cn, target);
                    }
                    var newLink = new Link(source, target);
                    tree.addLink(newLink);

                });
            }

            var treeLevels = [];
            for (var i = 0; i < levelCount; i++) {
                treeLevels.add([]);
            }

            tree.nodes.forEach(function (node) {
                treeLevels[node.level].add(node);
            });

            tree.treeLevels = treeLevels;
            tree.cacheRelationships();
            return tree;
        },

        /**
         * Returns a random node in this graph.
         * @param excludedNodes The collection of nodes which should not be considered.
         * @param incidenceLessThan The maximum degree or incidence the random node should have.
         * @returns {*}
         */
        takeRandomNode: function (excludedNodes, incidenceLessThan) {
            if (isUndefined(excludedNodes)) {
                excludedNodes = [];
            }
            if (isUndefined(incidenceLessThan)) {
                incidenceLessThan = 4;
            }
            if (this.nodes.length == 0) {
                return null;
            }
            if (this.nodes.length == 1) {
                return excludedNodes.contains(this.nodes[0]) ? null : this.nodes[0];
            }
            var pool = this.nodes.where(function (node) {
                return !excludedNodes.contains(node) && node.degree() <= incidenceLessThan
            });
            if (pool.isEmpty()) {
                return null;
            }
            return pool[randomInteger(0, pool.length)];
        },

        /**
         * Returns whether this is an empty graph.
         */
        isEmpty: function () {
            return this.nodes.isEmpty();
        },

        /**
         * Checks whether the endpoints of the links are all in the nodes collection.
         */
        isHealthy: function () {
            return this.links.all(function (link) {
                return this.nodes.contains(link.source) && this.nodes.contains(link.target);
            }, this)
        },

        /**
         * Gets the parents of this node, defined as the adjacent nodes with a link from the adjacent node to this one.
         * @returns {Array}
         */
        getParents: function (n) {
            if (!this.hasNode(n)) {
                throw "The given node is not part of this graph.";
            }
            return n.getParents();
        },

        /**
         * Gets the children of this node, defined as the adjacent nodes with a link from this node to the adjacent one.
         * @returns {Array}
         */
        getChildren: function (n) {
            if (!this.hasNode(n)) {
                throw "The given node is not part of this graph.";
            }
            return n.getChildren();
        },

        /**
         * Adds a new link to the graph between the given nodes.
         */
        addLink: function (sourceOrLink, target, owner) {

            if (isUndefined(sourceOrLink)) {
                throw "The source of the link is not defined.";
            }
            if (isUndefined(target)) {
                // can only be undefined if the first one is a Link
                if (isDefined(sourceOrLink.type) && sourceOrLink.type == "Link") {
                    this.addExistingLink(sourceOrLink);
                    return;
                }
                else {
                    throw "The target of the link is not defined.";
                }
            }

            var foundSource = this.getNode(sourceOrLink);
            if (isUndefined(foundSource)) {
                foundSource = this.addNode(sourceOrLink);
            }
            var foundTarget = this.getNode(target);
            if (isUndefined(foundTarget)) {
                foundTarget = this.addNode(target);
            }

            var newLink = new Link(foundSource, foundTarget);

            if (isDefined(owner)) {
                newLink.owner = owner;
            }

            /*newLink.source.outgoing.push(newLink);
             newLink.source.links.push(newLink);
             newLink.target.incoming.push(newLink);
             newLink.target.links.push(newLink);*/

            this.links.push(newLink);

            return newLink;
        },

        /**
         * Removes all the links in this graph.
         */
        removeAllLinks: function () {
            while (this.links.length > 0) {
                var link = this.links[0];
                this.removeLink(link);
            }
        },

        /**
         * Adds the given link to the current graph.
         */
        addExistingLink: function (link) {

            if (this.hasLink(link)) {
                return;
            }
            this.links.push(link);
            if (this.hasNode(link.source.id)) {
                // priority to the existing node with the id even if other props are different
                var s = this.getNode(link.source.id);
                link.changeSource(s);
            }
            else {
                this.addNode(link.source);
            }

            if (this.hasNode(link.target.id)) {
                var t = this.getNode(link.target.id);
                link.changeTarget(t);
            }
            else {
                this.addNode(link.target);
            }

            /*  if (!link.source.outgoing.contains(link)) {
             link.source.outgoing.push(link);
             }
             if (!link.source.links.contains(link)) {
             link.source.links.push(link);
             }
             if (!link.target.incoming.contains(link)) {
             link.target.incoming.push(link);
             }
             if (!link.target.links.contains(link)) {
             link.target.links.push(link);
             }*/
        },

        /**
         * Returns whether the given identifier or Link is part of this graph.
         * @param linkOrId An identifier or a Link object.
         * @returns {*}
         */
        hasLink: function (linkOrId) {
            if (isString(linkOrId)) {
                return this.links.any(function (link) {
                    return link.id == linkOrId;
                })
            }
            if (linkOrId.type == "Link") {
                return this.links.contains(linkOrId);
            }
            throw "The given object is neither an identifier nor a Link.";
        },
        /**
         * Gets the node with the specified Id or null if not part of this graph.
         */
        getNode: function (nodeOrId) {
            if (isUndefined(nodeOrId)) {
                throw "No identifier or Node specified.";
            }
            if (isString(nodeOrId)) {
                return this.nodes.find(function (n) {
                    return n.id == nodeOrId;
                });
            }
            else {
                if (this.hasNode(nodeOrId)) {
                    return nodeOrId;
                }
                else {
                    return null;
                }
            }
        },

        /**
         * Returns whether the given node or node Id is part of this graph.
         */
        hasNode: function (nodeOrId) {
            if (isString(nodeOrId)) {
                return this.nodes.any(function (n) {
                    return n.id == nodeOrId;
                });
            }
            if (isObject(nodeOrId)) {
                return this.nodes.any(function (n) {
                    return n == nodeOrId;
                });
            }
            throw "The identifier should be a Node or the Id (string) of a node.";
        },

        /**
         * Removes the given node from this graph.
         * The node can be specified as an object or as an identifier (string).
         */
        removeNode: function (nodeOrId) {
            var n = nodeOrId;
            if (isString(nodeOrId)) {
                n = this.getNode(nodeOrId);
            }

            if (isDefined(n)) {
                var links = n.links;
                n.links = [];
                for (var i = 0, len = links.length; i < len; i++) {
                    var link = links[i];
                    this.removeLink(link);
                }
                this.nodes.remove(n);
            }
            else {
                throw "The identifier should be a Node or the Id (string) of a node.";
            }
        },

        /**
         * Returns whether the given nodes are connected with a least one link independently of the direction.
         */
        areConnected: function (n1, n2) {
            return this.links.any(function (link) {
                return link.source == n1 && link.target == n2 || link.source == n2 && link.target == n1;
            })
        },

        /**
         * Removes the given link from this graph.
         */
        removeLink: function (link) {
            /*    if (!this.links.contains(link)) {
             throw "The given link is not part of the Graph.";
             }
             */
            this.links.remove(link);

            link.source.outgoing.remove(link);
            link.source.links.remove(link);
            link.target.incoming.remove(link);
            link.target.links.remove(link);
        },

        /**
         * Adds a new node to this graph, if not already present.
         * The node can be an existing Node or the identifier of a new node.
         * No error is thrown if the node is already there and the existing one is returned.
         */
        addNode: function (nodeOrId, layoutRect, owner) {

            var newNode = null;

            if (!isDefined(nodeOrId)) {
                throw "No Node or identifier for a new Node is given."
            }

            if (isString(nodeOrId)) {
                if (this.hasNode(nodeOrId)) {
                    return this.getNode(nodeOrId);
                }
                newNode = new Node(nodeOrId);
            }
            else {
                if (this.hasNode(nodeOrId)) {
                    return this.getNode(nodeOrId);
                }
                // todo: ensure that the param is a Node?
                newNode = nodeOrId;
            }

            if (isDefined(layoutRect)) {
                newNode.bounds(layoutRect);
            }

            if (isDefined(owner)) {
                newNode.owner = owner;
            }
            this.nodes.add(newNode);
            return newNode;
        },

        /**
         * Adds the given Node and its outgoing links.
         */
        addNodeAndOutgoings: function (node) {

            if (!this.nodes.contains(node)) {
                this.nodes.push(node);
            }

            var newLinks = node.outgoing;
            node.outgoing = [];
            newLinks.forEach(function (link) {
                this.addExistingLink(link);
            }, this);
        },

        /**
         * Sets the 'index' property on the links and nodes of this graph.
         */
        setItemIndices: function () {

            for (var i = 0; i < this.nodes.length; ++i) {
                this.nodes[i].index = i;
            }

            for (var i = 0; i < this.links.length; ++i) {
                this.links[i].index = i;
            }
        },

        /**
         * Returns a clone of this graph.
         */
        clone: function (saveMapping) {
            var copy = new Graph();
            var save = isDefined(saveMapping) && saveMapping == true;
            if (save) {
                copy.nodeMap = new Dictionary();
                copy.linkMap = new Dictionary();
            }
            // we need a map even if the saveMapping is not set
            var map = new Dictionary();
            this.nodes.forEach(function (nOriginal) {
                var nCopy = nOriginal.clone();
                map.set(nOriginal, nCopy);
                copy.nodes.push(nCopy);

                if (save) {
                    copy.nodeMap.set(nCopy, nOriginal);
                }
            });

            this.links.forEach(function (linkOriginal) {
                if (map.containsKey(linkOriginal.source) && map.containsKey(linkOriginal.target)) {
                    var linkCopy = copy.addLink(map.get(linkOriginal.source), map.get(linkOriginal.target));
                    if (save) {
                        copy.linkMap.set(linkCopy, linkOriginal);
                    }
                }
            });

            return copy;
        },

        /**
         * The parsing allows a quick way to create graphs.
         *  - ["n1->n2", "n2->n3"]: creates the three nodes and adds the links
         *  - ["n1->n2", {id: "QSDF"}, "n2->n3"]: same as previous but also performs a deep extend of the link between n1 and n2 with the given object.
         */
        linearize: function (addIds) {
            return Graph.Utils.linearize(this, addIds);
        },

        /**
         * Performs a depth-first traversal starting at the given node.
         * @param startNode a node or id of a node in this graph
         * @param action
         */
        depthFirstTraversal: function (startNode, action) {
            if (isUndefined(startNode)) {
                throw "You need to supply a starting node.";
            }
            if (isUndefined(action)) {
                throw "You need to supply an action."
            }
            if (!this.hasNode(startNode)) {
                throw "The given start-node is not part of this graph";
            }
            var foundNode = this.getNode(startNode);// case the given one is an Id
            var visited = [];
            this._dftIterator(foundNode, action, visited);
        },

        _dftIterator: function (node, action, visited) {

            action(node);
            visited.add(node);
            var children = node.getChildren();
            for (var i = 0, len = children.length; i < len; i++) {
                var child = children[i];
                if (visited.contains(child)) {
                    continue;
                }
                this._dftIterator(child, action, visited);
            }
        },

        /**
         * Performs a breadth-first traversal starting at the given node.
         * @param startNode a node or id of a node in this graph
         * @param action
         */
        breadthFirstTraversal: function (startNode, action) {

            if (isUndefined(startNode)) {
                throw "You need to supply a starting node.";
            }
            if (isUndefined(action)) {
                throw "You need to supply an action."
            }

            if (!this.hasNode(startNode)) {
                throw "The given start-node is not part of this graph";
            }
            var foundNode = this.getNode(startNode);// case the given one is an Id
            var queue = new Queue();
            var visited = [];
            queue.enqueue(foundNode);

            while (queue.length > 0) {
                var node = queue.dequeue();
                action(node);
                visited.add(node);
                var children = node.getChildren();
                for (var i = 0, len = children.length; i < len; i++) {
                    var child = children[i];
                    if (visited.contains(child) || queue.contains(child)) {
                        continue;
                    }
                    queue.enqueue(child);
                }
            }
        },

        /**
         * This is the classic Tarjan algorithm for strongly connected components.
         * See e.g. http://en.wikipedia.org/wiki/Tarjan's_strongly_connected_components_algorithm
         * @param excludeSingleItems Whether isolated nodes should be excluded from the analysis.
         * @param node The start node from which the analysis starts.
         * @param indices  Numbers the nodes consecutively in the order in which they are discovered.
         * @param lowLinks The smallest index of any node known to be reachable from the node, including the node itself
         * @param connected The current component.
         * @param stack The bookkeeping stack of things to visit.
         * @param index The counter of visited nodes used to assign the indices.
         * @private
         */
        _stronglyConnectedComponents: function (excludeSingleItems, node, indices, lowLinks, connected, stack, index) {
            indices.add(node, index);
            lowLinks.add(node, index);
            index++;

            stack.push(node);

            var children = node.getChildren();
            for (var i = 0, len = children.length; i < len; i++) {
                var next = children[i];
                if (!indices.containsKey(next)) {
                    this._stronglyConnectedComponents(excludeSingleItems, next, indices, lowLinks, connected, stack, index);
                    lowLinks.add(node, Math.min(lowLinks.get(node), lowLinks.get(next)));
                }
                else if (stack.contains(next)) {
                    lowLinks.add(node, Math.min(lowLinks.get(node), indices.get(next)));
                }
            }
            // If v is a root node, pop the stack and generate a strong component
            if (lowLinks.get(node) == indices.get(node)) {
                var next, component = [];
                do {
                    next = stack.pop();
                    component.add(next);
                }
                while (next != node)

                if (!excludeSingleItems || (component.length > 1)) {
                    connected.add(component)
                }
            }
        },

        /**
         * Returns the cycles found in this graph.
         * The returned arrays consist of the nodes which are strongly coupled.
         * @param excludeSingleItems Whether isolated nodes should be excluded.
         * @returns {Array} The array of cycles found.
         */
        findCycles: function (excludeSingleItems) {
            if (isUndefined(excludeSingleItems)) {
                excludeSingleItems = true;
            }
            var indices = new Dictionary();
            var lowLinks = new Dictionary();
            var connected = [];
            var stack = [];
            for (var i = 0, len = this.nodes.length; i < len; i++) {
                var node = this.nodes[i];
                if (indices.containsKey(node)) {
                    continue;
                }
                this._stronglyConnectedComponents(excludeSingleItems, node, indices, lowLinks, connected, stack, 0);
            }
            return connected;
        },

        /**
         * Returns whether this graph is acyclic.
         * @returns {*}
         */
        isAcyclic: function () {
            return this.findCycles().isEmpty();
        },

        /**
         * Returns whether the given graph is a subgraph of this one.
         * @param other Another graph instance.
         */
        isSubGraph: function (other) {
            var otherArray = other.linearize();
            var thisArray = this.linearize();
            return otherArray.all(function (s) {
                return thisArray.contains(s);
            });
        },

        /**
         *  Makes an acyclic graph from the current (connected) one.
         * * @returns {Array} The reversed links.
         */
        makeAcyclic: function () {
            // if empty or almost empty
            if (this.isEmpty() || this.nodes.length <= 1 || this.links.length <= 1) {
                return [];
            }
            // singular case of just two nodes
            if (this.nodes.length == 2) {
                var result = [];
                if (this.links.length > 1) {
                    var oneLink = this.links[0];
                    var oneNode = oneLink.source;
                    for (var i = 0, len = this.links.length; i < len; i++) {
                        var link = this.links[i];
                        if (link.source == oneNode) {
                            continue;
                        }
                        var rev = link.reverse();
                        result.add(rev);
                    }
                }
                return result;
            }

            var copy = this.clone(true); // copy.nodeMap tells you the mapping
            var N = this.nodes.length;

            var intensityCatalog = new Dictionary();

            /**
             * If there are both incoming and outgoing links this will return the flow intensity (out-in).
             * Otherwise the node acts as a flow source with N specifying the (equal) intensity.
             * @param node
             * @returns {number}
             */
            var flowIntensity = function (node) {
                if (node.outgoing.length == 0) {
                    return (2 - N);
                }
                else if (node.incoming.length == 0) {
                    return (N - 2);
                }
                else {
                    return node.outgoing.length - node.incoming.length;
                }
            }

            /**
             * Collects the nodes with the same intensity.
             * @param node
             * @param intensityCatalog
             */
            var catalogEqualIntensity = function (node, intensityCatalog) {
                var intensity = flowIntensity(node, N);
                if (!intensityCatalog.containsKey(intensity)) {
                    intensityCatalog.set(intensity, []);
                }
                intensityCatalog.get(intensity).push(node);
            }

            copy.nodes.forEach(function (v) {
                catalogEqualIntensity(v, intensityCatalog);
            });

            var sourceStack = [];
            var targetStack = [];

            while (copy.nodes.length > 0) {
                if (intensityCatalog.containsKey(2 - N)) {
                    var targets = intensityCatalog.get(2 - N); // nodes without outgoings
                    while (targets.length > 0) {
                        var target = targets.pop();
                        target.links.forEach(function (link) {
                            var source = link.getComplement(target);
                            var intensity = flowIntensity(source, N);
                            intensityCatalog.get(intensity).remove(source);
                            source.removeLink(link);
                            catalogEqualIntensity(source, intensityCatalog);
                        });
                        copy.nodes.remove(target);
                        targetStack.unshift(target);
                    }
                }

                // move sources to sourceStack
                if (intensityCatalog.containsKey(N - 2)) {
                    var sources = intensityCatalog.get(N - 2); // nodes without incomings
                    while (sources.length > 0) {
                        var source = sources.pop();
                        source.links.forEach(function (link) {
                            var target = link.getComplement(source);
                            var intensity = flowIntensity(target, N);
                            intensityCatalog.get(intensity).remove(target);
                            target.removeLink(link);
                            catalogEqualIntensity(target, intensityCatalog);
                        });
                        sourceStack.push(source);
                        copy.nodes.remove(source);
                    }
                }

                if (copy.nodes.length > 0) {
                    for (var i = N - 3; i > 2 - N; i--) {
                        if (intensityCatalog.containsKey(i) &&
                            intensityCatalog.get(i).length > 0) {
                            var maxdiff = intensityCatalog.get(i);
                            var v = maxdiff.pop();
                            v.links.forEach(function (e) {
                                var u = e.getComplement(v);
                                var intensity = flowIntensity(u, N);
                                intensityCatalog.get(intensity).remove(u);
                                u.removeLink(e);
                                catalogEqualIntensity(u, intensityCatalog);
                            });

                            sourceStack.push(v);
                            copy.nodes.remove(v);
                            break;
                        }
                    }
                }
            }

            sourceStack = sourceStack.concat(targetStack);

            var vertexOrder = new Dictionary();
            for (var i = 0; i < this.nodes.length; i++) {
                vertexOrder.set(copy.nodeMap.get(sourceStack[i]), i);
            }

            var reversedEdges = [];
            this.links.forEach(function (link) {
                if (vertexOrder.get(link.source) > vertexOrder.get(link.target)) {
                    link.reverse();
                    reversedEdges.push(link);
                }
            });
            return reversedEdges;
        }
    });

    /**
     * A collection of predefined graphs for demo and testing purposes.
     */
    Graph.Predefined = {
        /**
         * Eight-shapes graph all connected in a cycle.
         * @returns {*}
         * @constructor
         */
        EightGraph: function () {
            return Graph.Utils.parse([ "1->2", "2->3", "3->4", "4->1", "3->5", "5->6", "6->7", "7->3"]);
        },
        Mindmap: function () {
            return Graph.Utils.parse(["0->1", "0->2", "0->3", "0->4", , "0->5", "1->6", , "1->7", "7->8", "2->9", "9->10", "9->11", "3->12",
                "12->13", "13->14", "4->15", "4->16", "15->17", "15->18", "18->19", "18->20", "14->21", "14->22", "5->23", "23->24", "23->25", "6->26"]);
        },
        /**
         * Three nodes connected in a cycle.
         * @returns {*}
         * @constructor
         */
        ThreeGraph: function () {
            return Graph.Utils.parse([ "1->2", "2->3", "3->1"]);
        },

        /**
         * A tree with each node having two children.
         * @param levels How many levels the binary tree should have.
         * @returns {diagram.Graph}
         * @constructor
         */
        BinaryTree: function (levels) {
            if (isUndefined(levels)) {
                levels = 5;
            }
            return Graph.Utils.createBalancedTree(levels, 2);
        },

        /**
         * A linear graph (discrete line segment).
         * @param length How many segments (the node count is hence (length+1)).
         * @returns {diagram.Graph}
         * @constructor
         */
        Linear: function (length) {
            if (isUndefined(length)) {
                length = 10;
            }
            return Graph.Utils.createBalancedTree(length, 1);
        },

        /**
         * A standard tree-graph with the specified levels and children (siblings) count.
         * Note that for a balanced tree of level N and sibling count s, counting the root as level zero:
         *  - NodeCount = (1-s^(N+1))/(1-s)]
         *  - LinkCount = s.(1-s^N)/(1-s)
         * @param levels How many levels the tree should have.
         * @param siblingsCount How many siblings each level should have.
         * @returns {diagram.Graph}
         * @constructor
         */
        Tree: function (levels, siblingsCount) {
            return Graph.Utils.createBalancedTree(levels, siblingsCount);
        },

        /**
         * Creates a forest.
         * Note that for a balanced forest of level N, sibling count s and tree count t, counting the root as level zero:
         *  - NodeCount = t.(1-s^(N+1))/(1-s)]
         *  - LinkCount = t.s.(1-s^N)/(1-s)
         * @param levels How many levels the tree should have.
         * @param siblingsCount How many siblings each level should have.
         * @param trees The amount of trees the forest should have.
         * @returns {diagram.Graph}
         * @constructor
         */
        Forest: function (levels, siblingsCount, trees) {
            return Graph.Utils.createBalancedForest(levels, siblingsCount, trees);
        },

        /**
         * A workflow-like graph with cycles.
         * @returns {*}
         * @constructor
         */
        Workflow: function () {
            return Graph.Utils.parse(
                ["0->1", "1->2", "2->3", "1->4", "4->3", "3->5", "5->6", "6->3", "6->7", "5->4"]
            );
        },

        /**
         * A grid graph with the direction of the links avoiding cycles.
         * Node count: (n+1).(m+1)
         * Link count: n.(m+1) + m.(n+1)
         * @param n Horizontal count of grid cells. If zero this will result in a linear graph.
         * @param m Vertical count of grid cells. If zero this will result in a linear graph.
         * @constructor
         */
        Grid: function (n, m) {
            var g = new diagram.Graph();
            if (n <= 0 && m <= 0) {
                return g;
            }

            for (var i = 0; i < n + 1; i++) {
                var previous = null;
                for (var j = 0; j < m + 1; j++) {
                    // using x-y coordinates to name the nodes
                    var node = new Node(i.toString() + "." + j.toString());
                    g.addNode(node);
                    if (previous != null) {
                        g.addLink(previous, node);
                    }
                    if (i > 0) {
                        var left = g.getNode((i - 1).toString() + "." + j.toString());
                        g.addLink(left, node)
                    }
                    previous = node;
                }
            }
            return g;
        }

    }

    /**
     * Graph generation and other utilities.
     */
    Graph.Utils = {
        /**
         * The parsing allows a quick way to create graphs.
         *  - ["n1->n2", "n2->n3"]: creates the three nodes and adds the links
         *  - ["n1->n2", {id: "id177"}, "n2->n3"]: same as previous but also performs a deep extend of the link between n1 and n2 with the given object.
         */
        parse: function (graphString) {

            var previousLink, graph = new diagram.Graph(), parts = graphString.slice();
            for (var i = 0, len = parts.length; i < len; i++) {
                var part = parts[i];
                if (isString(part)) // link spec
                {
                    if (part.indexOf("->") < 0) {
                        throw "The link should be specified as 'a->b'.";
                    }
                    var p = part.split("->");
                    if (p.length != 2) {
                        throw "The link should be specified as 'a->b'.";
                    }
                    previousLink = new Link(p[0], p[1]);
                    graph.addLink(previousLink);
                }
                if (isObject(part)) {
                    if (previousLink == null) {
                        throw "Specification found before Link definition.";
                    }
                    kendo.deepExtend(previousLink, part);
                }
            }
            return graph;
        },

        /**
         * Returns a linearized representation of the given Graph.
         * See also the Graph.Utils.parse method for the inverse operation.
         */
        linearize: function (graph, addIds) {
            if (isUndefined(graph)) {
                throw "Expected an instance of a Graph object in slot one.";
            }
            if (isUndefined(addIds)) {
                addIds = false;
            }
            var lin = [];
            for (var i = 0, len = graph.links.length; i < len; i++) {
                var link = graph.links[i];
                lin.add(link.source.id + "->" + link.target.id);
                if (addIds) {
                    lin.add({id: link.id});
                }
            }
            return lin;
        },

        /**
         * The method used by the diagram creation to instantiate a shape.
         * @param kendoDiagram The Kendo diagram where the diagram will be created.
         * @param p The position at which to place the shape.
         * @param shapeOptions Optional Shape options.
         * @param id Optional identifier of the shape.
         * @returns {*}
         * @private
         */
        _addShape: function (kendoDiagram, p, id, shapeOptions) {
            if (isUndefined(p)) {
                p = new diagram.Point(0, 0);
            }
            if (isUndefined(id)) {
                id = randomId();
            }
            shapeOptions = kendo.deepExtend({
                width: 20,
                height: 20,
                id: id,
                center: new Point(10, 10),
                radius: 10,
                background: "#778899",
                data: "circle"
            }, shapeOptions);

            return kendoDiagram.addShape(p, shapeOptions);
        },
        /**
         * The method used by the diagram creation to instantiate a connection.
         * @param diagram he Kendo diagram where the diagram will be created.
         * @param from The source shape.
         * @param to The target shape.
         * @param options Optional Connection options.
         * @returns {*}
         * @private
         */
        _addConnection: function (diagram, from, to, options) {
            var f = from.getConnector("Top");
            var t = to.getConnector("Top");
            return diagram.connect(from, to, options);
        },
        /**
         * Creates a diagram from the given Graph.
         * @param diagram The Kendo diagram where the diagram will be created.
         * @param graph The graph structure defining the diagram.
         */
        createDiagramFromGraph: function (diagram, graph, doLayout, randomSize) {

            if (isUndefined(diagram)) {
                throw "The diagram surface is undefined.";
            }
            if (isUndefined(graph)) {
                throw "No graph specification defined."
            }
            if (isUndefined(doLayout)) {
                doLayout = true;
            }
            if (isUndefined(randomSize)) {
                randomSize = false;
            }

            var width = diagram.element.clientWidth || 200;
            var height = diagram.element.clientHeight || 200;
            var map = [];
            for (var i = 0, len = graph.nodes.length; i < len; i++) {
                var node = graph.nodes[i];
                var p = node.position;
                if (isUndefined(p)) {
                    if (isDefined(node.x) && isDefined(node.y)) {
                        p = new Point(node.x, node.y);
                    }
                    else {
                        p = new Point(randomInteger(10, width - 20), randomInteger(10, height - 20));
                    }
                }
                var opt = {};

                if (node.id == "0") {
                    kendo.deepExtend(opt,
                        {
                            background: "Orange",
                            data: 'circle',
                            width: 100,
                            height: 100,
                            center: new Point(50, 50)
                        });
                }
                else if (randomSize) {
                    kendo.deepExtend(opt, {
                        width: Math.random() * 150 + 20,
                        height: Math.random() * 80 + 50,
                        data: 'rectangle',
                        background: "#778899"
                    })
                }

                var shape = this._addShape(diagram, p, node.id, opt);
                //shape.content(node.id);

                var bounds = shape.bounds();
                if (isDefined(bounds)) {
                    node.x = bounds.x;
                    node.y = bounds.y;
                    node.width = bounds.width;
                    node.height = bounds.height;
                }
                map[node.id] = shape;
            }
            for (var i = 0, len = graph.links.length; i < len; i++) {
                var link = graph.links[i];
                var sourceShape = map[link.source.id];
                if (isUndefined(sourceShape)) {
                    continue;
                }
                var targetShape = map[link.target.id];
                if (isUndefined(targetShape)) {
                    continue;
                }
                this._addConnection(diagram, sourceShape, targetShape, {id: link.id});

            }
            if (doLayout) {
                var l = new SpringLayout(diagram);
                l.layoutGraph(graph, {limitToView: false});
                for (var i = 0, len = graph.nodes.length; i < len; i++) {
                    var node = graph.nodes[i];
                    var shape = map[node.id];
                    shape.bounds(new Rect(node.x, node.y, node.width, node.height));
                }
            }
        },

        /**
         * Creates a diagram the given short (linear) form.
         * @param diagram
         * @param shortForm
         */
        createDiagramFromShort: function (diagram, shortForm) {

        },

        /**
         * Creates a balanced tree with the specified number of levels and siblings count.
         * Note that for a balanced tree of level N and sibling count s, counting the root as level zero:
         *  - NodeCount = (1-s^(N+1))/(1-s)]
         *  - LinkCount = s.(1-s^N)/(1-s)
         * @param levels How many levels the tree should have.
         * @param siblingsCount How many siblings each level should have.
         * @returns {diagram.Graph}
         */
        createBalancedTree: function (levels, siblingsCount) {
            if (isUndefined(levels)) {
                levels = 3;
            }
            if (isUndefined(siblingsCount)) {
                siblingsCount = 3;
            }

            var g = new diagram.Graph(), counter = -1, lastAdded = [], news;
            if (levels <= 0 || siblingsCount <= 0) {
                return g;
            }
            var root = new Node((++counter).toString());
            g.addNode(root);
            g.root = root;
            lastAdded.add(root);
            for (var i = 0; i < levels; i++) {
                news = [];
                for (var j = 0; j < lastAdded.length; j++) {
                    var parent = lastAdded[j];
                    for (var k = 0; k < siblingsCount; k++) {
                        var item = new Node((++counter).toString());
                        g.addLink(parent, item);
                        news.add(item);
                    }
                }
                lastAdded = news;
            }
            return g;
        },

        /**
         * Creates a balanced tree with the specified number of levels and siblings count.
         * Note that for a balanced forest of level N, sibling count s and tree count t, counting the root as level zero:
         *  - NodeCount = t.(1-s^(N+1))/(1-s)]
         *  - LinkCount = t.s.(1-s^N)/(1-s)
         * @param levels How many levels the tree should have.
         * @param siblingsCount How many siblings each level should have.
         * @returns {diagram.Graph}
         * @param treeCount The number of trees the forest should have.
         */
        createBalancedForest: function (levels, siblingsCount, treeCount) {
            if (isUndefined(levels)) {
                levels = 3;
            }
            if (isUndefined(siblingsCount)) {
                siblingsCount = 3;
            }
            if (isUndefined(treeCount)) {
                treeCount = 5;
            }
            var g = new diagram.Graph(), counter = -1, lastAdded = [], news;
            if (levels <= 0 || siblingsCount <= 0 || treeCount <= 0) {
                return g;
            }

            for (var t = 0; t < treeCount; t++) {
                var root = new Node((++counter).toString());
                g.addNode(root);
                lastAdded = [root];
                for (var i = 0; i < levels; i++) {
                    news = [];
                    for (var j = 0; j < lastAdded.length; j++) {
                        var parent = lastAdded[j];
                        for (var k = 0; k < siblingsCount; k++) {
                            var item = new Node((++counter).toString());
                            g.addLink(parent, item);
                            news.add(item);
                        }
                    }
                    lastAdded = news;
                }
            }
            return g;
        },

        /**
         * Creates a random graph (uniform distribution) with the specified amount of nodes.
         * @param nodeCount The amount of nodes the random graph should have.
         * @param maxIncidence The maximum allowed degree of the nodes.
         * @param isTree Whether the return graph should be a tree (default: false).
         * @returns {diagram.Graph}
         */
        createRandomConnectedGraph: function (nodeCount, maxIncidence, isTree) {

            /* Swa's Mathematica export of random Bernoulli graphs
             gr[n_,p_]:=Module[{g=RandomGraph[BernoulliGraphDistribution[n,p],VertexLabels->"Name",DirectedEdges->True]},
             While[Not[ConnectedGraphQ[g]],g=RandomGraph[BernoulliGraphDistribution[n,p],VertexLabels->"Name",DirectedEdges->True]];g];
             project[a_]:=("\""<>ToString[Part[#,1]]<>"->"<>ToString[Part[#,2]]<>"\"")&     @ a;
             export[g_]:=project/@ EdgeList[g]
             g = gr[12,.1]
             export [g]
             */

            if (isUndefined(nodeCount)) {
                nodeCount = 40;
            }
            if (isUndefined(maxIncidence)) {
                maxIncidence = 4;
            }
            if (isUndefined(isTree)) {
                isTree = false;
            }

            var g = new diagram.Graph(), counter = -1;
            if (nodeCount <= 0) {
                return g;
            }

            var root = new Node((++counter).toString());
            g.addNode(root);
            if (nodeCount == 1) {
                return g;
            }
            if (nodeCount > 1) {
                // random tree
                for (var i = 1; i < nodeCount; i++) {
                    var poolNode = g.takeRandomNode([], maxIncidence);
                    if (poolNode == null) {
                        //failed to find one so the graph will have less nodes than specified
                        break;
                    }
                    var newNode = g.addNode(i.toString());
                    g.addLink(newNode, poolNode);
                }
                if (!isTree && nodeCount > 1) {
                    var randomAdditions = randomInteger(1, nodeCount);
                    for (var i = 0; i < randomAdditions; i++) {
                        var n1 = g.takeRandomNode([], maxIncidence);
                        var n2 = g.takeRandomNode([], maxIncidence);
                        if (n1 != null && n2 != null && !g.areConnected(n1, n2)) {
                            g.addLink(n1, n2);
                        }
                    }
                }
                return g;
            }
        }
    }

    /**
     * The data bucket a hypertree holds in its nodes.     *
     * @type {*}
     */
    var ContainerGraph = kendo.Class.extend({
        init: function (diagram) {
            this.diagram = diagram;
            this.graph = new Graph(diagram);
            this.container = null;
            this.containerNode = null;
        }

    });

    /**
     * Adapter between the diagram control and the graph representation. It converts shape and connections to nodes and edges taking into the containers and their collapsef state,
     * the visibility of items and more. If the layoutContainerChildren is true a hypertree is constructed which holds the hierarchy of containers and many conditions are analyzed
     * to investigate how the effective graph structure looks like and how the layout has to be performed.
     * @type {*}
     */
    var DiagramToHyperTreeAdapter = kendo.Class.extend({
        init: function (diagram) {

            /**
             * The mapping to/from the original nodes.
             * @type {Dictionary}
             */
            this.nodeMap = new Dictionary();

            /**
             * Gets the mapping of a shape to a container in case the shape sits in a collapsed container.
             * @type {Dictionary}
             */
            this.shapeMap = new Dictionary();

            /**
             * The nodes being mapped.
             * @type {Dictionary}
             */
            this.nodes = [];

            /**
             * The connections being mapped.
             * @type {Dictionary}
             */
            this.edges = [];

            // the mapping from an edge to all the connections it represents, this can be both because of multiple connections between
            // two shapes or because a container holds multiple connections to another shape or container.
            this.edgeMap = new Dictionary();

            /**
             * The resulting set of Nodes when the analysis has finished.
             * @type {Array}
             */
            this.finalNodes = [];

            /**
             * The resulting set of Links when the analysis has finished.
             * @type {Array}
             */
            this.finalLinks = [];

            /**
             * The items being omitted because of multigraph edges.
             * @type {Array}
             */
            this.ignoredConnections = [];

            /**
             * The items being omitted because of containers, visibility and other factors.
             * @type {Array}
             */
            this.ignoredShapes = [];

            /**
             * The map from a node to the partition/hypernode in which it sits. This hyperMap is null if 'options.layoutContainerChildren' is false.
             * @type {Dictionary}
             */
            this.hyperMap = new Dictionary();

            /**
             * The hypertree contains the hierarchy defined by the containers.
             * It's in essence a Graph of Graphs with a tree structure defined by the hierarchy of containers.
             * @type {HyperTree}
             */
            this.hyperTree = new Graph();

            /**
             * The resulting graph after conversion. Note that this does not supply the information contained in the
             * ignored connection and shape collections.
             * @type {null}
             */
            this.finalGraph = null;

            this.diagram = diagram;
        },

        /**
         * The hyperTree is used when the 'options.layoutContainerChildren' is true. It contains the hierarchy of containers whereby each node is a ContainerGraph.
         * This type of node has a Container reference to the container which holds the Graph items. There are three possible situations during the conversion process:
         *  - Ignore the containers: the container are non-existent and only normal shapes are mapped. If a shape has a connection to a container it will be ignored as well
         *    since there is no node mapped for the container.
         *  - Do not ignore the containers and leave the content of the containers untouched: the top-level elements are being mapped and the children within a container are not altered.
         *  - Do not ignore the containers and organize the content of the containers as well: the hypertree is constructed and there is a partitioning of all nodes and connections into the hypertree.
         *    The only reason a connection or node is not being mapped might be due to the visibility, which includes the visibility change through a collapsed parent container.
         * @param options
         */
        convert: function (options) {

            if (isUndefined(this.diagram)) {
                throw "No diagram to convert.";
            }

            this.options = kendo.deepExtend({
                    ignoreInvisible: true,
                    ignoreContainers: true,
                    layoutContainerChildren: false
                },
                options || {}
            );

            this.clear();
            // create the nodes which participate effectively in the graph analysis
            this._renormalizeShapes();

            // recreate the incoming and outgoing collections of each and every node
            this._renormalizeConnections();

            // export the resulting graph
            this.finalNodes = new Dictionary(this.nodes);
            this.finalLinks = new Dictionary(this.edges);

            this.finalGraph = new Graph();
            this.finalNodes.forEach(function (n) {
                this.finalGraph.addNode(n);
            }, this)
            this.finalLinks.forEach(function (l) {
                this.finalGraph.addExistingLink(l);
            }, this)
            return this.finalGraph;
        },

        /**
         * Maps the specified connection to an edge of the graph deduced from the given diagram.
         * @param connection
         * @returns {*}
         */
        mapConnection: function (connection) {
            return this.edgeMap.first(function (edge) {
                return this.edgeMap.get(edge).contains(connection);
            });
        },

        /**
         * Maps the specified shape to a node of the graph deduced from the given diagram.
         * @param shape
         * @returns {*}
         */
        mapShape: function (shape) {
            var keys = this.nodeMap.keys();
            for (var i = 0, len = keys.length; i < len; i++) {
                var key = keys[i];
                if (this.nodeMap.get(key).contains(shape)) {
                    return key;
                }
            }
        },

        /**
         * Gets the edge, if any, between the given nodes.
         * @param a
         * @param b
         */
        getEdge: function (a, b) {
            return a.links.first(function (link) {
                return link.getComplement(a) == b;
            })
        },

        /**
         * Clears all the collections used by the conversion process.
         */
        clear: function () {
            this.finalGraph = null;
            this.hyperTree = (!this.options.ignoreContainers && this.options.layoutContainerChildren) ? new HyperTree() : null;
            this.hyperMap = (!this.options.ignoreContainers && this.options.layoutContainerChildren) ? new Dictionary() : null;
            this.nodeMap = new Dictionary();
            this.shapeMap = new Dictionary();
            this.nodes = [];
            this.edges = [];
            this.edgeMap = new Dictionary();
            this.ignoredConnections = [];
            this.ignoredShapes = [];
            this.finalNodes = [];
            this.finalLinks = [];
        },

        /**
         * The path from a given ContainerGraph to the root (container).
         * @param containerGraph
         * @returns {Array}
         */
        listToRoot: function (containerGraph) {
            var list = [];
            var s = containerGraph.container;
            if (s == null) {
                return list;
            }
            list.add(s);
            while (s.parentContainer != null) {
                s = s.parentContainer;
                list.add(s);
            }
            list.reverse();
            return list;
        },

        firstNonIgnorableContainer: function (shape) {

            if (shape.isContainer && !this._isIgnorableItem(shape)) {
                return shape;
            }
            return shape.parentContainer == null ? null : this.firstNonIgnorableContainer(shape.parentContainer);
        },
        isContainerConnection: function (a, b) {
            if (a.isContainer && this.isDescendantOf(a, b)) {
                return true;
            }
            return b.isContainer && this.isDescendantOf(b, a);
        },

        /**
         * Returns true if the given shape is a direct child or a nested container child of the given container.
         * If the given container and shape are the same this will return false since a shape cannot be its own child.
         * @param scope
         * @param a
         * @returns {boolean}
         */
        isDescendantOf: function (scope, a) {
            if (!scope.isContainer) {
                throw "Expecting a container.";
            }
            if (scope == a) {
                return false;
            }
            if (scope.children.contains(a)) {
                return true;
            }
            var containers = [];
            for (var i = 0, len = scope.children.length; i < len; i++) {
                var c = scope.children[i];
                if (c.isContainer && this.isDescendantOf(c, a)) {
                    containers.push(c);
                }
            }

            return containers.length > 0
        },
        isIgnorableItem: function (shape) {
            if (this.options.ignoreInvisible) {
                if (shape.isCollapsed && this._isVisible(shape)) {
                    return false;
                }
                if (!shape.isCollapsed && this._isVisible(shape)) {
                    return false;
                }
                return true;
            }
            else {
                return shape.isCollapsed && !this._isTop(shape);
            }
        },

        /**
         *  Determines whether the shape is or needs to be mapped to another shape. This occurs essentially when the shape sits in
         * a collapsed container hierarchy and an external connection needs a node endpoint. This node then corresponds to the mapped shape and is
         * necessarily a container in the parent hierarchy of the shape.
         * @param shape
         */
        isShapeMapped: function (shape) {
            shape.isCollapsed && !this._isVisible(shape) && !this._isTop(shape);
        },

        leastCommonAncestor: function (a, b) {
            if (a == null) {
                throw "Parameter should not be null.";
            }
            if (b == null) {
                throw "Parameter should not be null.";
            }

            if (this.hyperTree == null) {
                throw "No hypertree available.";
            }
            var al = this.listToRoot(a);
            var bl = this.listToRoot(b);
            var found = null;
            if (al.isEmpty() || bl.isEmpty()) {
                return this.hyperTree.root.data;
            }
            var xa = al[0];
            var xb = bl[0];
            var i = 0;
            while (xa == xb) {
                found = al[i];
                i++;
                if (i >= al.length || i >= bl.length) {
                    break;
                }
                xa = al[i];
                xb = bl[i];
            }
            if (found == null) {
                return this.hyperTree.root.data
            }
            else {
                return this.hyperTree.nodes.where(function (n) {
                    n.data.container == found;
                });
            }
        },
        /**
         * Determines whether the specified item is a top-level shape or container.
         * @param item
         * @returns {boolean}
         * @private
         */
        _isTop: function (item) {
            return item.parentContainer == null;
        },

        /**
         * Determines iteratively (by walking up the container stack) whether the specified shape is visible.
         * This does NOT tell whether the item is not visible due to an explicit Visibility change or due to a collapse state.
         * @param shape
         * @returns {*}
         * @private
         */
        _isVisible: function (shape) {

            if (!shape.visible()) {
                return false;
            }
            return shape.parentContainer == null ? shape.visible() : this._isVisible(shape.parentContainer);
        },

        _isCollapsed: function (shape) {

            if (shape.isContainer && shape.isCollapsed) {
                return true;
            }
            return shape.parentContainer != null && this._isCollapsed(shape.parentContainer);
        },

        /**
         * First part of the graph creation; analyzing the shapes and containers and deciding whether they should be mapped to a Node.
         * @private
         */
        _renormalizeShapes: function () {
            // add the nodes, the adjacency structure will be reconstructed later on
            if (this.options.ignoreContainers) {
                for (var i = 0, len = this.diagram.shapes.length; i < len; i++) {
                    var shape = this.diagram.shapes[i];

                    // if not visible (and ignoring the invisible ones) or a container we skip
                    if ((this.options.ignoreInvisible && !this._isVisible(shape)) || shape.isContainer) {
                        this.ignoredShapes.add(shape);
                        continue;
                    }
                    var node = new Node(shape.id, shape);
                    node.isVirtual = false;

                    // the mapping will always contain singletons and the hyperTree will be null
                    this.nodeMap.add(node, [shape]);
                    this.nodes.add(node);
                }
            }
            else {
                throw "Containers are not supported yet, but stay tuned.";
            }
        },

        /**
         * Second part of the graph creation; analyzing the connections and deciding whether they should be mapped to an edge.
         * @private
         */
        _renormalizeConnections: function () {
            if (this.diagram.connections.length == 0) {
                return;
            }
            for (var i = 0, len = this.diagram.connections.length; i < len; i++) {
                var conn = this.diagram.connections[i];

                if (this.isIgnorableItem(conn)) {
                    this.ignoredConnections.add(conn);
                    continue;
                }

                var source = conn.sourceConnector == null ? null : conn.sourceConnector.shape;
                var sink = conn.targetConnector == null ? null : conn.targetConnector.shape;

                // no layout for floating connections
                if (source == null || sink == null) {
                    this.ignoredConnections.add(conn);
                    continue;
                }

                if (this.ignoredShapes.contains(source) && !this.shapeMap.containsKey(source)) {
                    this.ignoredConnections.add(conn);
                    continue;
                }
                if (this.ignoredShapes.contains(sink) && !this.shapeMap.containsKey(sink)) {
                    this.ignoredConnections.add(conn);
                    continue;
                }

                // if the endpoint sits in a collapsed container we need the container rather than the shape itself
                if (this.shapeMap.containsKey(source)) {
                    source = this.shapeMap[source];
                }
                if (this.shapeMap.containsKey(sink)) {
                    sink = this.shapeMap[sink];
                }

                var sourceNode = this.mapShape(source);
                var sinkNode = this.mapShape(sink);
                if ((sourceNode == sinkNode) || this.areConnectedAlready(sourceNode, sinkNode)) {
                    this.ignoredConnections.add(conn);
                    continue;
                }

                if (sourceNode == null || sinkNode == null) {
                    throw "A shape was not mapped to a node.";
                }
                if (this.options.ignoreContainers) {
                    // much like a floating connection here since at least one end is attached to a container
                    if (sourceNode.isVirtual || sinkNode.isVirtual) {
                        this.ignoredConnections.add(conn);
                        continue;
                    }
                    var newEdge = new Link(sourceNode, sinkNode);

                    this.edgeMap.add(newEdge, [conn]);
                    this.edges.add(newEdge);
                }
                else {
                    throw "Containers are not supported yet, but stay tuned.";
                }
            }
        },

        areConnectedAlready: function (n, m) {
            return this.edges.any(function (l) {
                return l.source == n && l.target == m || l.source == m && l.target == n;
            })
        },

        /**
         * Depth-first traversal of the given container.
         * @param container
         * @param action
         * @param includeStart
         * @private
         */
        _visitContainer: function (container, action, includeStart) {

            /*if (container == null) throw new ArgumentNullException("container");
             if (action == null) throw new ArgumentNullException("action");
             if (includeStart) action(container);
             if (container.children.isEmpty()) return;
             foreach(
             var item
             in
             container.children.OfType < IShape > ()
             )
             {
             var childContainer = item
             as
             IContainerShape;
             if (childContainer != null) this.VisitContainer(childContainer, action);
             else action(item);
             }*/
        }


    })

    var LayoutBase = kendo.Class.extend({
        defaultOptions: null,
        init: function () {
            this.defaultOptions = {
                /**
                 * Whether the motion of the nodes should be limited by the boundaries of the diagram surface.
                 */
                limitToView: false,
                friction: 0.9,
                margins: 10,
                requiresSimpleGraph: true,
                nodeDistance: 50,
                iterations: 300,
                keepGroupLayout: false,
                treeLayoutType: kendo.diagram.TreeLayoutType.TreeDown,
                horizontalSeparation: 90,
                verticalSeparation: 50,
                underneathVerticalTopOffset: 15,
                underneathHorizontalOffset: 15,
                underneathVerticalSeparation: 15,
                radialSeparation: 150,
                radialFirstLevelSeparation: 200,
                componentsGridWidth: 5000, // TODO: default should be 800
                totalMargin: new Size(50, 50),
                componentMargin: new Size(20, 20),
                keepComponentsInOneRadialLayout: false,
                animateTransitions: false,
                startRadialAngle: 0,
                roots: null,
                endRadialAngle: 2 * Math.PI,
                // TODO: ensure to change this to false when containers are around
                ignoreContainers: true,
                layoutContainerChildren: false,
                ignoreInvisible: true
            };
        },
        /**
         * Organizes the components in a grid.
         * @param components
         */
        gridLayoutComponents: function (components) {
            if (components == null) {
                throw "No components supplied.";
            }

            // calculate and cache the bounds of the components
            components.forEach(function (c) {
                c.calcBounds();
            })

            // order by decreasing width
            components.sort(function (a, b) {
                return b.bounds.width - a.bounds.width;
            })

            var maxWidth = this.options.componentsGridWidth,
                offsetX = this.options.componentMargin.width,
                offsetY = this.options.componentMargin.height,
                height = 0,
                startX = this.options.totalMargin.width,
                startY = this.options.totalMargin.height,
                x = startX,
                y = startY;
            while (components.length > 0) {
                if (x >= maxWidth) {
                    // start a new row
                    x = startX;
                    y += height + offsetY;
                    // reset the row height
                    height = 0;
                }
                var component = components.pop();
                this.moveToOffset(component, new Point(x, y));

                for (var j = 0; j < component.nodes.length; j++) {
                    var node = component.nodes[j];
                    var shape = node.associatedShape;
                    shape.bounds(new Rect(node.x, node.y, node.width, node.height));
                }

                var boundingRect = component.bounds;
                var currentHeight = boundingRect.height;
                if (currentHeight <= 0 || isNaN(currentHeight)) {
                    currentHeight = 0;
                }
                var currentWidth = boundingRect.width;
                if (currentWidth <= 0 || isNaN(currentWidth)) {
                    currentWidth = 0;
                }

                if (currentHeight >= height) {
                    height = currentHeight;
                }
                x += currentWidth + offsetX;
            }

        },

        moveToOffset: function (component, p) {
            var bounds = component.bounds;
            var deltax = p.x - bounds.x;
            var deltay = p.y - bounds.y;

            for (var i = 0, len = component.nodes.length; i < len; i++) {
                var node = component.nodes[i];
                var nodeBounds = node.bounds();
                if (nodeBounds == Rect.Empty) {
                    nodeBounds = new Rect(0, 0, 0, 0);
                }
                nodeBounds.x += deltax;
                nodeBounds.y += deltay;
                node.bounds(nodeBounds);
            }
            this.currentHorizontalOffset += bounds.width + this.options.totalMargin.width;
            return new Point(deltax, deltay);
        },

        transferOptions: function (options) {

            // Size options lead to stackoverflow and need special handling

            this.options = this.defaultOptions;
            if (options["totalMargin"]) {
                this.options["totalMargin"] = options["totalMargin"];
                delete options["totalMargin"];
            }
            if (options["componentMargin"]) {
                this.options["componentMargin"] = options["componentMargin"];
                delete options["componentMargin"];
            }
            this.options = kendo.deepExtend(this.options, options || {})
        }
    });

    /**
     * The classic spring-embedder (aka force-directed, Fruchterman-Rheingold, barycentric) algorithm.
     * http://en.wikipedia.org/wiki/Force-directed_graph_drawing
     *  - Chapter 12 of Tamassia et al. "Handbook of graph drawing and visualization".
     *  - Kobourov on preprint arXiv; http://arxiv.org/pdf/1201.3011.pdf
     *  - Fruchterman and Rheingold in SOFTWARE-PRACTICE AND EXPERIENCE, VOL. 21(1 1), 1129-1164 (NOVEMBER 1991)
     * @type {*}
     */
    var SpringLayout = LayoutBase.extend({
        init: function (diagram) {
            var that = this;
            LayoutBase.fn.init.call(that);
            if (isUndefined(diagram)) {
                throw "Diagram is not specified.";
            }
            this.diagram = diagram;
        },

        layout: function (options) {

            this.transferOptions(options);

            var adapter = new DiagramToHyperTreeAdapter(this.diagram);
            var graph = adapter.convert(options);
            if (graph.isEmpty()) {
                return;
            }
            // split into connected components
            var components = graph.getConnectedComponents();
            if (components.isEmpty()) {
                return;
            }
            for (var i = 0; i < components.length; i++) {
                var component = components[i];
                this.layoutGraph(component, options);
            }
            this.gridLayoutComponents(components);
            for (var i = 0, len = graph.nodes.length; i < len; i++) {
                var node = graph.nodes[i];
                var shape = node.associatedShape;
                shape.bounds(new Rect(node.x, node.y, node.width, node.height));
            }
        },

        layoutGraph: function (graph, options) {

            if (isDefined(options)) {
                this.transferOptions(options);
            }
            this.graph = graph;

            var initialTemperature = this.options.nodeDistance * 9;
            this.temperature = initialTemperature;

            var guessBounds = this._expectedBounds();
            this.width = guessBounds.width;
            this.height = guessBounds.height;

            for (var step = 0; step < this.options.iterations; step++) {
                this.refineStage = step >= this.options.iterations * 5 / 6;
                this.tick();
                // exponential cooldown
                this.temperature = this.refineStage ?
                    initialTemperature / 30 :
                    initialTemperature * (1 - step / (2 * this.options.iterations ));
            }
        },

        /**
         * Single iteration of the simulation.
         */
        tick: function () {
            // collect the repulsive forces on each node
            for (var i = 0; i < this.graph.nodes.length; i++) {
                this._repulsion(this.graph.nodes[i]);
            }

            // collect the attractive forces on each node
            for (var i = 0; i < this.graph.links.length; i++) {
                this._attraction(this.graph.links[i]);
            }
            // update the positions
            for (var i = 0, len = this.graph.nodes.length; i < len; i++) {
                var node = this.graph.nodes[i];
                var offset = Math.sqrt(node.dx * node.dx + node.dy * node.dy);
                if (offset == 0) {
                    return;
                }
                node.x += Math.min(offset, this.temperature) * node.dx / offset;
                node.y += Math.min(offset, this.temperature) * node.dy / offset;
                if (this.options.limitToView) {
                    node.x = Math.min(this.width, Math.max(node.width / 2, node.x));
                    node.y = Math.min(this.height, Math.max(node.height / 2, node.y));
                }
            }
        },

        /**
         * Shakes the node away from its current position to escape the deadlock.
         * @param node A Node.
         * @private
         */
        _shake: function (node) {
            // just a simple polar neighborhood
            var rho = Math.random() * this.options.nodeDistance / 4;
            var alpha = Math.random() * 2 * Math.PI;
            node.x += rho * Math.cos(alpha);
            node.y -= rho * Math.sin(alpha);
        },

        /**
         * The typical Coulomb-Newton force law F=k/r^2
         * @remark This only works in dimensions less than three.
         * @param d
         * @param n A Node.
         * @param m Another Node.
         * @returns {number}
         * @private
         */
        _InverseSquareForce: function (d, n, m) {
            var force;
            if (!this.refineStage) {
                force = Math.pow(d, 2) / Math.pow(this.options.nodeDistance, 2);
            }
            else {
                var deltax = n.x - m.x;
                var deltay = n.y - m.y;

                var wn = n.width / 2;
                var hn = n.height / 2;
                var wm = m.width / 2;
                var hm = m.height / 2;

                force = (Math.pow(deltax, 2) / Math.pow(wn + wm + this.options.nodeDistance, 2)) + (Math.pow(deltay, 2) / Math.pow(hn + hm + this.options.nodeDistance, 2));
            }
            return force * 4 / 3;
        },

        /**
         * The typical Hooke force law F=kr^2
         * @param d
         * @param n
         * @param m
         * @returns {number}
         * @private
         */
        _SquareForce: function (d, n, m) {
            return 1 / this._InverseSquareForce(d, n, m);
        },

        _repulsion: function (n) {
            n.dx = 0;
            n.dy = 0;
            this.graph.nodes.forEach(function (m) {
                if (m == n) {
                    return;
                }
                while (n.x == m.x && n.y == m.y) {
                    this._shake(m);
                }
                var vx = n.x - m.x;
                var vy = n.y - m.y;
                var distance = Math.sqrt(vx * vx + vy * vy);
                var r = this._SquareForce(distance, n, m) * 2;
                n.dx += (vx / distance) * r;
                n.dy += (vy / distance) * r;
            }, this);
        },
        _attraction: function (link) {
            var t = link.target;
            var s = link.source;
            if (s == t) {
                // loops induce endless shakes
                return;
            }
            while (s.x == t.x && s.y == t.y) {
                this._shake(t);
            }

            var vx = s.x - t.x;
            var vy = s.y - t.y;
            var distance = Math.sqrt(vx * vx + vy * vy);

            var a = this._InverseSquareForce(distance, s, t) * 5;
            var dx = (vx / distance) * a;
            var dy = (vy / distance) * a;
            t.dx += dx;
            t.dy += dy;
            s.dx -= dx;
            s.dy -= dy;
        },

        /**
         * Calculates the expected bounds after layout.
         * @returns {*}
         * @private
         */
        _expectedBounds: function () {

            var size, N = this.graph.nodes.length, /*golden ration optimal?*/ ratio = 1.5, multiplier = 4;
            if (N == 0) {
                return size;
            }
            size = this.graph.nodes.fold(function (s, node) {
                var area = node.width * node.height;
                if (area > 0) {
                    s += Math.sqrt(area);
                    return s;
                }
                return 0;
            }, 0, this);
            var av = size / N;
            var squareSize = av * Math.ceil(Math.sqrt(N));
            var width = squareSize * Math.sqrt(ratio);
            var height = squareSize / Math.sqrt(ratio);
            return { width: width * multiplier, height: height * multiplier };
        }

    })

    var TreeLayoutProcessor = kendo.Class.extend({

        init: function (options) {
            this.center = null;
            this.options = options;
        },
        layout: function (treeGraph, root) {
            this.graph = treeGraph;
            if (this.graph.nodes == null || this.graph.nodes.length == 0) {
                return;
            }

            if (!this.graph.nodes.contains(root)) {
                throw "The given root is not in the graph.";
            }

            this.center = root;
            this.graph.cacheRelationships();
            /* var nonull = this.graph.nodes.where(function (n) {
             return n.associatedShape != null;
             });*/

            // transfer the rects
            /*nonull.forEach(function (n) {
             n.Location = n.associatedShape.Position;
             n.NodeSize = n.associatedShape.ActualBounds.ToSize();
             }

             );*/

            // caching the children
            /* nonull.forEach(function (n) {
             n.children = n.getChildren();
             });*/

            this.layoutSwitch();

            // apply the layout to the actual visuals
            // nonull.ForEach(n => n.associatedShape.Position = n.Location);
        },

        layoutLeft: function (left) {
            this.setChildrenDirection(this.center, kendo.diagram.TreeDirection.Left, false);
            this.setChildrenLayout(this.center, kendo.diagram.ChildrenLayout.Default, false);
            var h = 0, w = 0, y;
            for (var i = 0, len = left.length; i < len; i++) {
                var node = left[i];
                node.TreeDirection = kendo.diagram.TreeDirection.Left;
                var s = this.measure(node, Size.Empty);
                w = Math.max(w, s.Width);
                h += s.height + this.options.verticalSeparation;
            }

            h -= this.options.verticalSeparation;
            var x = this.center.x - this.options.horizontalSeparation;
            y = this.center.y + ((this.center.height - h) / 2);
            for (var i = 0, len = left.length; i < len; i++) {
                var node = left[i];
                var p = new Point(x - node.Size.width, y);

                this.arrange(node, p);
                y += node.Size.height + this.options.verticalSeparation;
            }
        },

        layoutRight: function (right) {
            this.setChildrenDirection(this.center, kendo.diagram.TreeDirection.Right, false);
            this.setChildrenLayout(this.center, kendo.diagram.ChildrenLayout.Default, false);
            var h = 0, w = 0, y;
            for (var i = 0, len = right.length; i < len; i++) {
                var node = right[i];
                node.TreeDirection = kendo.diagram.TreeDirection.Right;
                var s = this.measure(node, Size.Empty);
                w = Math.max(w, s.Width);
                h += s.height + this.options.verticalSeparation;
            }

            h -= this.options.verticalSeparation;
            var x = this.center.x + this.options.horizontalSeparation + this.center.width;
            y = this.center.y + ((this.center.height - h) / 2);
            for (var i = 0, len = right.length; i < len; i++) {
                var node = right[i];
                var p = new Point(x, y);
                this.arrange(node, p);
                y += node.Size.height + this.options.verticalSeparation;
            }
        },

        layoutUp: function (up) {
            this.setChildrenDirection(this.center, kendo.diagram.TreeDirection.Up, false);
            this.setChildrenLayout(this.center, kendo.diagram.ChildrenLayout.Default, false);
            var w = 0, y;
            for (var i = 0; i < up.length; i++) {
                var node = up[i];
                node.TreeDirection = kendo.diagram.TreeDirection.Up;
                var s = this.measure(node, Size.Empty);
                w += s.width + this.options.horizontalSeparation;
            }

            w -= this.options.horizontalSeparation;
            var x = this.center.x + (this.center.width / 2) - (w / 2);

            // y = this.center.y -verticalSeparation -this.center.height/2 - h;
            for (var i = 0; i < up.length; i++) {
                var node = up[i];
                y = this.center.y - this.options.verticalSeparation - node.Size.height;
                var p = new Point(x, y);
                this.arrange(node, p);
                x += node.Size.width + this.options.horizontalSeparation;
            }
        },

        layoutDown: function (down) {
            this.setChildrenDirection(this.center, kendo.diagram.TreeDirection.Down, false);
            this.setChildrenLayout(this.center, kendo.diagram.ChildrenLayout.Default, false);
            var w = 0, y;
            for (var i = 0; i < down.length; i++) {
                var node = down[i];
                node.treeDirection = kendo.diagram.TreeDirection.Down;
                var s = this.measure(node, Size.Empty);
                w += s.width + this.options.horizontalSeparation;
            }

            w -= this.options.horizontalSeparation;
            var x = this.center.x + (this.center.width / 2) - (w / 2);
            y = this.center.y + this.options.verticalSeparation + this.center.height;
            for (var i = 0; i < down.length; i++) {
                var node = down[i];
                var p = new Point(x, y);
                this.arrange(node, p);
                x += node.Size.width + this.options.horizontalSeparation;
            }
        },

        layoutRadialTree: function () {
            // var rmax = children.Aggregate(0D, (current, node) => Math.max(node.SectorAngle, current));
            this.setChildrenDirection(this.center, kendo.diagram.TreeDirection.Radial, false);
            this.setChildrenLayout(this.center, kendo.diagram.ChildrenLayout.Default, false);
            this.previousRoot = null;
            var startAngle = this.options.startRadialAngle;
            var endAngle = this.options.endRadialAngle;
            if (endAngle <= startAngle) {
                throw "Final angle should not be less than the start angle.";
            }

            this.maxDepth = 0;
            this.origin = new Point(this.center.x, this.center.y);
            this.calculateAngularWidth(this.center, 0);

            // perform the layout
            if (this.maxDepth > 0) {
                this.radialLayout(this.center, this.options.radialFirstLevelSeparation, startAngle, endAngle);
            }

            // update properties of the root node
            this.center.Angle = endAngle - startAngle;
        },

        tipOverTree: function (down, startFromLevel) {
            if (isUndefined(startFromLevel)) {
                startFromLevel = 0;
            }
            this.setChildrenDirection(this.center, kendo.diagram.TreeDirection.Down, false);
            this.setChildrenLayout(this.center, kendo.diagram.ChildrenLayout.Default, false);
            this.setChildrenLayout(this.center, kendo.diagram.ChildrenLayout.Underneath, false, startFromLevel);
            var w = 0, y;
            for (var i = 0; i < down.length; i++) {
                var node = down[i];

                // if (node.IsSpecial) continue;
                node.TreeDirection = kendo.diagram.TreeDirection.Down;
                var s = this.measure(node, Size.Empty);
                w += s.width + this.options.horizontalSeparation;
            }

            w -= this.options.horizontalSeparation;

            // putting the root in the center with respect to the whole diagram is not a nice result, let's put it with respect to the first level only
            w -= down[down.length - 1].width;
            w += down[down.length - 1].associatedShape.bounds().width;

            var x = this.center.x + (this.center.width / 2) - (w / 2);
            y = this.center.y + this.options.verticalSeparation + this.center.height;
            for (var i = 0; i < down.length; i++) {
                var node = down[i];
                // if (node.IsSpecial) continue;
                var p = new Point(x, y);
                this.arrange(node, p);
                x += node.Size.width + this.options.horizontalSeparation;
            }

            /*//let's place the special node, assuming there is only one
             if (down.Count(n => n.IsSpecial) > 0)
             {
             var special = (from n in down where n.IsSpecial select n).First();
             if (special.Children.Count > 0)
             throw new DiagramException("The 'special' element should not have children.");
             special.Data.Location = new Point(Center.Data.Location.X + Center.AssociatedShape.BoundingRectangle.Width + this.options.HorizontalSeparation, Center.Data.Location.Y);
             }*/
        },
        calculateAngularWidth: function (n, d) {
            if (d > this.maxDepth) {
                this.maxDepth = d;
            }

            var aw = 0, w = 1000, h = 1000, diameter = d == 0 ? 0 : Math.sqrt((w * w) + (h * h)) / d;

            if (n.children.length > 0) {
                // eventually with n.IsExpanded
                for (var i = 0, len = n.children.length; i < len; i++) {
                    var child = n.children[i];
                    aw += this.calculateAngularWidth(child, d + 1);
                }
                aw = Math.max(diameter, aw);
            }
            else {
                aw = diameter;
            }

            n.sectorAngle = aw;
            return aw;
        },
        sortChildren: function (n) {
            var basevalue = 0;

            // update basevalue angle for node ordering
            if (n.parents.length > 1) {
                throw "Node is not part of a tree."
            }
            var p = n.parents[0];
            if (p != null) {
                var pl = new Point(p.x, p.y);
                var nl = new Point(n.x, n.y);
                basevalue = this.normalizeAngle(Math.atan2(pl.y - nl.y, pl.x - nl.x));
            }

            var count = n.children.length;
            if (count == 0) {
                return null;
            }

            var angle = [];
            var idx = [];

            for (var i = 0; i < count; ++i) {
                var c = n.children[i];
                var l = new Point(c.x, c.y);
                idx[i] = i;
                angle[i] = this.normalizeAngle(-basevalue + Math.atan2(l.y - l.y, l.x - l.x));
            }

            Array.prototype.bisort(angle, idx);
            var col = []; // list of nodes
            var children = n.children;
            for (var i = 0; i < count; ++i) {
                col.add(children[idx[i]]);
            }

            return col;
        },

        normalizeAngle: function (angle) {
            while (angle > Math.PI * 2) {
                angle -= 2 * Math.PI;
            }
            while (angle < 0) {
                angle += Math.PI * 2;
            }
            return angle;
        },
        radialLayout: function (node, radius, startAngle, endAngle) {
            var deltaTheta = endAngle - startAngle;
            var deltaThetaHalf = deltaTheta / 2.0;
            var parentSector = node.sectorAngle;
            var fraction = 0;
            var sorted = this.sortChildren(node);
            for (var i = 0, len = sorted.length; i < len; i++) {
                var childNode = sorted[i];
                var cp = childNode;
                var childAngleFraction = cp.sectorAngle / parentSector;
                if (childNode.children.length > 0) {
                    this.radialLayout(childNode,
                        radius + this.options.radialSeparation,
                        startAngle + (fraction * deltaTheta),
                        startAngle + ((fraction + childAngleFraction) * deltaTheta));
                }

                this.setPolarLocation(childNode, radius, startAngle + (fraction * deltaTheta) + (childAngleFraction * deltaThetaHalf));
                cp.angle = childAngleFraction * deltaTheta;
                fraction += childAngleFraction;
            }
        },
        setPolarLocation: function (node, radius, angle) {
            node.x = this.origin.x + (radius * Math.cos(angle));
            node.y = this.origin.y + (radius * Math.sin(angle));
            node.BoundingRectangle = new Rect(node.x, node.y, node.width, node.height);
        },

        /**
         * Sets the children direction recursively.
         * @param node
         * @param direction
         * @param includeStart
         */
        setChildrenDirection: function (node, direction, includeStart) {
            var rootDirection = node.treeDirection;
            this.graph.depthFirstTraversal(node, function (n) {
                n.treeDirection = direction;
            });
            if (!includeStart) {
                node.treeDirection = rootDirection;
            }
        },

        /**
         * Sets the children layout recursively.
         * @param node
         * @param layout
         * @param includeStart
         * @param startFromLevel
         */
        setChildrenLayout: function (node, layout, includeStart, startFromLevel) {
            if (isUndefined(startFromLevel)) {
                startFromLevel = 0;
            }
            var rootLayout = node.childrenLayout;
            if (startFromLevel > 0) {
                // assign levels to the Node.Level property
                this.graph.assignLevels(node);

                // assign the layout on the condition that the level is at least the 'startFromLevel'
                this.graph.depthFirstTraversal(
                    node, function (s) {
                        if (s.level >= startFromLevel + 1) {
                            s.childrenLayout = layout;
                        }
                    }
                )
            }
            else {
                this.graph.depthFirstTraversal(node, function (s) {
                    s.childrenLayout = layout;
                });

                // if the start should not be affected we put the state back
                if (!includeStart) {
                    node.childrenLayout = rootLayout;
                }
            }
        },

        /**
         * Returns the actual size of the node. The given size is the allowed space wherein the node can lay out itself.
         * @param node
         * @param givenSize
         * @returns {Size}
         */
        measure: function (node, givenSize) {
            var w = 0, h = 0, s;
            var result = new Size(0, 0);
            var b = node.associatedShape.bounds();
            var shapeWidth = b.width;
            var shapeHeight = b.height;
            if (node.parents.length != 1) {
                throw "Node not in a spanning tree.";
            }

            var parent = node.parents[0];
            if (node.treeDirection == kendo.diagram.TreeDirection.Undefined) {
                node.treeDirection = parent.treeDirection;
            }

            if (node.children.isEmpty()) {
                result = new Size(
                    Math.abs(shapeWidth) < Math.epsilon ? 50 : shapeWidth,
                    Math.abs(shapeHeight) < Math.epsilon ? 25 : shapeHeight);
            }
            else if (node.children.length == 1) {
                switch (node.treeDirection) {
                    case kendo.diagram.TreeDirection.Radial:
                        s = this.measure(node.children[0], givenSize); // child size
                        w = shapeWidth + (this.options.radialSeparation * Math.cos(node.AngleToParent)) + s.width;
                        h = shapeHeight + Math.abs(this.options.radialSeparation * Math.sin(node.AngleToParent)) + s.height;
                        break;
                    case kendo.diagram.TreeDirection.Left:
                    case kendo.diagram.TreeDirection.Right:
                        switch (node.childrenLayout) {

                            case kendo.diagram.ChildrenLayout.TopAlignedWithParent:
                                break;

                            case kendo.diagram.ChildrenLayout.BottomAlignedWithParent:
                                break;

                            case kendo.diagram.ChildrenLayout.Underneath:
                                s = this.measure(node.children[0], givenSize);
                                w = shapeWidth + s.width + this.options.underneathHorizontalOffset;
                                h = shapeHeight + +this.options.underneathVerticalTopOffset + s.height;
                                break;

                            case kendo.diagram.ChildrenLayout.Default:
                                s = this.measure(node.children[0], givenSize);
                                w = shapeWidth + this.options.horizontalSeparation + s.width;
                                h = Math.max(shapeHeight, s.height);
                                break;

                            default:
                                throw "Unhandled TreeDirection in the Radial layout measuring.";
                        }
                        break;
                    case kendo.diagram.TreeDirection.Up:
                    case kendo.diagram.TreeDirection.Down:
                        switch (node.childrenLayout) {

                            case kendo.diagram.ChildrenLayout.TopAlignedWithParent:
                                break;

                            case kendo.diagram.ChildrenLayout.BottomAlignedWithParent:
                                break;

                            case kendo.diagram.ChildrenLayout.Underneath:
                                s = this.measure(node.children[0], givenSize);
                                w = Math.max(shapeWidth, s.width + this.options.underneathHorizontalOffset);
                                h = shapeHeight + this.options.underneathVerticalTopOffset + s.height;
                                break;

                            case kendo.diagram.ChildrenLayout.Default:
                                s = this.measure(node.children[0], givenSize);
                                h = shapeHeight + this.options.verticalSeparation + s.height;
                                w = Math.max(shapeWidth, s.width);
                                break;

                            default:
                                throw "Unhandled TreeDirection in the Down layout measuring.";
                        }
                        break;
                    default:
                        throw "Unhandled TreeDirection in the layout measuring.";
                }

                result = new Size(w, h);
            }
            else {
                switch (node.treeDirection) {
                    case kendo.diagram.TreeDirection.Left:
                    case kendo.diagram.TreeDirection.Right:
                        switch (node.childrenLayout) {

                            case kendo.diagram.ChildrenLayout.TopAlignedWithParent:
                                break;

                            case kendo.diagram.ChildrenLayout.BottomAlignedWithParent:
                                break;

                            case kendo.diagram.ChildrenLayout.Underneath:
                                w = shapeWidth;
                                h = shapeHeight + +this.options.underneathVerticalTopOffset;
                                for (var i = 0, len = node.children.length; i < len; i++) {
                                    var childNode = node.children[i];
                                    s = this.measure(childNode, givenSize);
                                    w = Math.max(w, s.width + this.options.underneathHorizontalOffset);
                                    h += s.height + this.options.underneathVerticalSeparation;
                                }

                                h -= this.options.underneathVerticalSeparation;
                                break;

                            case kendo.diagram.ChildrenLayout.Default:
                                w = shapeWidth;
                                h = 0;
                                for (var i = 0, len = node.children.length; i < len; i++) {
                                    var childNode = node.children[i];
                                    s = this.measure(childNode, givenSize);
                                    w = Math.max(w, shapeWidth + this.options.horizontalSeparation + s.width);
                                    h += s.height + this.options.verticalSeparation;
                                }
                                h -= this.options.verticalSeparation;
                                break;

                            default:
                                throw "Unhandled TreeDirection in the Right layout measuring.";
                        }

                        break;
                    case kendo.diagram.TreeDirection.Up:
                    case kendo.diagram.TreeDirection.Down:

                        switch (node.childrenLayout) {

                            case kendo.diagram.ChildrenLayout.TopAlignedWithParent:
                                break;

                            case kendo.diagram.ChildrenLayout.BottomAlignedWithParent:
                                break;

                            case kendo.diagram.ChildrenLayout.Underneath:
                                w = shapeWidth;
                                h = shapeHeight + +this.options.underneathVerticalTopOffset;
                                for (var i = 0, len = node.children.length; i < len; i++) {
                                    var childNode = node.children[i];
                                    s = this.measure(childNode, givenSize);
                                    w = Math.max(w, s.width + this.options.underneathHorizontalOffset);
                                    h += s.height + this.options.underneathVerticalSeparation;
                                }

                                h -= this.options.underneathVerticalSeparation;
                                break;

                            case kendo.diagram.ChildrenLayout.Default:
                                w = 0;
                                h = 0;
                                for (var i = 0, len = node.children.length; i < len; i++) {
                                    var childNode = node.children[i];
                                    s = this.measure(childNode, givenSize);
                                    w += s.width + this.options.horizontalSeparation;
                                    h = Math.max(h, s.height + this.options.verticalSeparation + shapeHeight);
                                }

                                w -= this.options.horizontalSeparation;
                                break;

                            default:
                                throw "Unhandled TreeDirection in the Down layout measuring.";
                        }

                        break;
                    default:
                        throw "Unhandled TreeDirection in the layout measuring.";
                }

                result = new Size(w, h);
            }

            node.SectorAngle = Math.sqrt((w * w / 4) + (h * h / 4));
            node.Size = result;
            return result;
        },
        arrange: function (n, p) {
            var b = n.associatedShape.bounds();
            var shapeWidth = b.width;
            var shapeHeight = b.height;
            if (n.children.isEmpty()) {
                n.x = p.x;
                n.y = p.y;
                n.BoundingRectangle = new Rect(p.x, p.y, shapeWidth, shapeHeight);
            }
            else {
                var x, y;
                var selfLocation;
                switch (n.treeDirection) {
                    case kendo.diagram.TreeDirection.Left:
                        switch (n.childrenLayout) {
                            case kendo.diagram.ChildrenLayout.TopAlignedWithParent:
                                break;

                            case kendo.diagram.ChildrenLayout.BottomAlignedWithParent:
                                break;

                            case kendo.diagram.ChildrenLayout.Underneath:
                                selfLocation = p;
                                n.x = selfLocation.x;
                                n.y = selfLocation.y;
                                n.BoundingRectangle = new Rect(n.x, n.y, n.width, n.height);
                                y = p.y + shapeHeight + this.options.underneathVerticalTopOffset;
                                for (var i = 0, len = node.children.length; i < len; i++) {
                                    var node = node.children[i];
                                    x = selfLocation.x - node.associatedShape.width - this.options.underneathHorizontalOffset;
                                    var pp = new Point(x, y);
                                    this.arrange(node, pp);
                                    y += node.Size.height + this.options.underneathVerticalSeparation;
                                }
                                break;

                            case kendo.diagram.ChildrenLayout.Default:
                                selfLocation = new Point(p.x + n.Size.width - shapeWidth, p.y + ((n.Size.height - shapeHeight) / 2));
                                n.x = selfLocation.x;
                                n.y = selfLocation.y;
                                n.BoundingRectangle = new Rect(n.x, n.y, n.width, n.height);
                                x = selfLocation.x - this.options.horizontalSeparation; // alignment of children
                                y = p.y;
                                for (var i = 0, len = n.children.length; i < len; i++) {
                                    var node = n.children[i];
                                    var pp = new Point(x - node.Size.width, y);
                                    this.arrange(node, pp);
                                    y += node.Size.height + this.options.verticalSeparation;
                                }
                                break;

                            default:
                                throw new ArgumentOutOfRangeException("n");
                        }

                        break;
                    case kendo.diagram.TreeDirection.Right:
                        switch (n.childrenLayout) {
                            case kendo.diagram.ChildrenLayout.TopAlignedWithParent:
                                break;

                            case kendo.diagram.ChildrenLayout.BottomAlignedWithParent:
                                break;

                            case kendo.diagram.ChildrenLayout.Underneath:
                                selfLocation = p;
                                n.x = selfLocation.x;
                                n.y = selfLocation.y;
                                n.BoundingRectangle = new Rect(n.x, n.y, n.width, n.height);
                                x = p.x + shapeWidth + this.options.underneathHorizontalOffset;

                                // alignment of children left-underneath the parent
                                y = p.y + shapeHeight + this.options.underneathVerticalTopOffset;
                                for (var i = 0, len = n.children.length; i < len; i++) {
                                    var node = n.children[i];
                                    var pp = new Point(x, y);
                                    this.arrange(node, pp);
                                    y += node.Size.height + this.options.underneathVerticalSeparation;
                                }

                                break;

                            case kendo.diagram.ChildrenLayout.Default:
                                selfLocation = new Point(p.x, p.y + ((n.Size.height - shapeHeight) / 2));
                                n.x = selfLocation.x;
                                n.y = selfLocation.y;
                                n.BoundingRectangle = new Rect(n.x, n.y, n.width, n.height);
                                x = p.x + shapeWidth + this.options.horizontalSeparation; // alignment of children
                                y = p.y;
                                for (var i = 0, len = n.children.length; i < len; i++) {
                                    var node = n.children[i];
                                    var pp = new Point(x, y);
                                    this.arrange(node, pp);
                                    y += node.Size.height + this.options.verticalSeparation;
                                }
                                break;

                            default:
                                throw new ArgumentOutOfRangeException("n");
                        }

                        break;
                    case kendo.diagram.TreeDirection.Up:
                        selfLocation = new Point(p.x + ((n.Size.width - shapeWidth) / 2), p.y + n.Size.height - shapeHeight);
                        n.x = selfLocation.x;
                        n.y = selfLocation.y;
                        n.BoundingRectangle = new Rect(n.x, n.y, n.width, n.height);
                        if (Math.abs(selfLocation.x - p.x) < Math.epsilon) {
                            var childrenwidth = 0;
                            // means there is an aberration due to the oversized Element with respect to the children
                            for (var i = 0, len = n.children.length; i < len; i++) {
                                var child = n.children[i];
                                childrenwidth += child.Size.width + this.options.horizontalSeparation;
                            }
                            childrenwidth -= this.options.horizontalSeparation;
                            x = p.x + ((shapeWidth - childrenwidth) / 2);
                        }
                        else {
                            x = p.x;
                        }

                        for (var i = 0, len = n.children.length; i < len; i++) {
                            var node = n.children[i];
                            y = selfLocation.y - this.options.verticalSeparation - node.Size.height;
                            var pp = new Point(x, y);
                            this.arrange(node, pp);
                            x += node.Size.width + this.options.horizontalSeparation;
                        }
                        break;

                    case kendo.diagram.TreeDirection.Down:

                        switch (n.childrenLayout) {
                            case kendo.diagram.ChildrenLayout.TopAlignedWithParent:
                                break;
                            case kendo.diagram.ChildrenLayout.BottomAlignedWithParent:
                                break;
                            case kendo.diagram.ChildrenLayout.Underneath:
                                selfLocation = p;
                                n.x = selfLocation.x;
                                n.y = selfLocation.y;
                                n.BoundingRectangle = new Rect(n.x, n.y, n.width, n.height);
                                x = p.x + this.options.underneathHorizontalOffset; // alignment of children left-underneath the parent
                                y = p.y + shapeHeight + this.options.underneathVerticalTopOffset;
                                for (var i = 0, len = n.children.length; i < len; i++) {
                                    var node = n.children[i];
                                    var pp = new Point(x, y);
                                    this.arrange(node, pp);
                                    y += node.Size.height + this.options.underneathVerticalSeparation;
                                }
                                break;

                            case    kendo.diagram.ChildrenLayout.Default:
                                selfLocation = new Point(p.x + ((n.Size.width - shapeWidth) / 2), p.y);
                                n.x = selfLocation.x;
                                n.y = selfLocation.y;
                                n.BoundingRectangle = new Rect(n.x, n.y, n.width, n.height);
                                if (Math.abs(selfLocation.x - p.x) < Math.epsilon) {
                                    var childrenwidth = 0;
                                    // means there is an aberration due to the oversized Element with respect to the children
                                    for (var i = 0, len = n.children.length; i < len; i++) {
                                        var child = n.children[i];
                                        childrenwidth += child.Size.width + this.options.horizontalSeparation;
                                    }

                                    childrenwidth -= this.options.horizontalSeparation;
                                    x = p.x + ((shapeWidth - childrenwidth) / 2);
                                }
                                else {
                                    x = p.x;
                                }

                                for (var i = 0, len = n.children.length; i < len; i++) {
                                    var node = n.children[i];
                                    y = selfLocation.y + this.options.verticalSeparation + shapeHeight;
                                    var pp = new Point(x, y);
                                    this.arrange(node, pp);
                                    x += node.Size.width + this.options.horizontalSeparation;
                                }
                                break;

                            default:
                                throw new ArgumentOutOfRangeException("n");
                        }
                        break;

                    case kendo.diagram.TreeDirection.None:
                        break;

                    default:
                        throw new ArgumentOutOfRangeException("n");
                }
            }
        },
        layoutSwitch: function () {
            if (this.center == null) {
                return;
            }

            if (this.center.children.isEmpty()) {
                return;
            }

            var type = this.options.TreeLayoutType;
            if (isUndefined(type)) {
                type = kendo.diagram.TreeLayoutType.TreeDown;
            }
            var single, male, female, leftcount;
            var children = this.center.children;
            switch (type) {
                case kendo.diagram.TreeLayoutType.RadialTree:
                    this.layoutRadialTree();
                    break;

                case kendo.diagram.TreeLayoutType.MindmapHorizontal:
                    single = this.center.children;

                    if (this.center.children.length == 1) {
                        this.layoutRight(single);
                    }
                    else {
                        // odd number will give one more at the right
                        leftcount = children.length / 2;
                        male = this.center.children.where(function (n) {
                            return children.indexOf(n) < leftcount;
                        });
                        female = this.center.children.where(function (n) {
                            return children.indexOf(n) >= leftcount;
                        });

                        this.layoutLeft(male);
                        this.layoutRight(female);
                    }
                    break;

                case kendo.diagram.TreeLayoutType.MindmapVertical:
                    single = this.center.children;

                    if (this.center.children.length == 1) {
                        this.layoutDown(single);
                    }
                    else {
                        // odd number will give one more at the right
                        leftcount = children.length / 2;
                        male = this.center.children.where(function (n) {
                            return children.indexOf(n) < leftcount
                        });
                        female = this.center.children.where(function (n) {
                            return children.indexOf(n) >= leftcount
                        });
                        this.layoutUp(male);
                        this.layoutDown(female);
                    }
                    break;

                case kendo.diagram.TreeLayoutType.TreeRight:
                    this.layoutRight(this.center.children);
                    break;

                case kendo.diagram.TreeLayoutType.TreeLeft:
                    this.layoutLeft(this.center.children);
                    break;

                case kendo.diagram.TreeLayoutType.TreeUp:
                    this.layoutUp(this.center.children);
                    break;

                case kendo.diagram.TreeLayoutType.TreeDown:
                    this.layoutDown(this.center.children);
                    break;

                case kendo.diagram.TreeLayoutType.TipOverTree:
                    if (this.options.tipOverTreeStartLevel < 0) {
                        throw  "The tip-over level should be a positive integer.";
                    }
                    this.tipOverTree(this.center.children, this.options.tipOverTreeStartLevel);
                    break;

                case kendo.diagram.TreeLayoutType.Undefined:
                    break;
            }
        }
    });
    /**
     * The various tree layout algorithms.
     * @type {*}
     */
    var TreeLayout = LayoutBase.extend({
        init: function (diagram) {
            var that = this;
            LayoutBase.fn.init.call(that);
            if (isUndefined(diagram)) {
                throw "No diagram specified.";
            }
            this.diagram = diagram;
        },

        /**
         * Arranges the diagram in a tree-layout with the specified options and tree subtype.
         */
        layout: function (options) {

            this.transferOptions(options);

            // transform the diagram into a Graph
            var adapter = new DiagramToHyperTreeAdapter(this.diagram);

            /**
             * The Graph reduction from the given diagram.
             * @type {*}
             */
            this.graph = adapter.convert();
            var initialState = this.graph.clone(); // enabling animations
            this.layoutComponents();
            var finalState = this.graph.clone();

            //var layoutUnit = new diagram.LayoutUnit(initialState, finalState);

            // run the unit in the undo service and get some rest
        },

        layoutComponents: function () {
            if (this.graph.isEmpty()) {
                return;
            }

            // split into connected components
            var components = this.graph.getConnectedComponents();
            if (components.isEmpty()) {
                return;
            }

            var layout = new TreeLayoutProcessor(this.options);
            var trees = [];
            // find a spanning tree for each component
            for (var i = 0; i < components.length; i++) {
                var component = components[i];

                var treeGraph = this.getTree(component);
                if (treeGraph == null) {
                    throw "Failed to find a spanning tree for the component.";
                }
                var root = treeGraph.root;
                var tree = treeGraph.tree;
                layout.layout(tree, root);

                for (var j = 0; j < tree.nodes.length; j++) {
                    var node = tree.nodes[j];
                    var shape = node.associatedShape;
                    shape.bounds(new Rect(node.x, node.y, node.width, node.height));
                }
                trees.push(tree);
            }

            this.gridLayoutComponents(trees);

        },

        /**
         * Gets a spanning tree (and root) for the given graph.
         * Ensure that the given graph is connected!
         * @param graph
         * @returns {*} A literal object consisting of the found root and the spanning tree.
         */
        getTree: function (graph) {
            var root = null;
            if (this.options.roots && this.options.roots.length > 0) {
                for (var i = 0, len = graph.nodes.length; i < len; i++) {
                    var node = graph.nodes[i];
                    for (var j = 0, len = this.options.roots.length; j < len; j++) {
                        var givenRootShape = this.options.roots[j];
                        if (givenRootShape == node.associatedShape) {
                            root = node;
                            break;
                        }
                    }
                }
            }
            if (root == null) {
                // finds the most probable root on the basis of the longest path in the component
                root = graph.root();
                // should not happen really
                if (root == null) {
                    throw "Unable to find a root for the tree.";
                }
            }
            return this.getTreeForRoot(graph, root);
        },

        getTreeForRoot: function (graph, root) {

            var tree = graph.getSpanningTree(root);
            if (isUndefined(tree) || tree.isEmpty()) {
                return null;
            }
            return {
                tree: tree,
                root: tree.root
            };
        }

    });

    var ChildrenLayout = {
        /*
         * The topmost child will be aligned with the parent.
         */
        TopAlignedWithParent: 0,

        /*
         *
         */
        BottomAlignedWithParent: 1,

        /*
         * If the children are at the <see cref="TreeDirection.Right"/> or <see cref="TreeDirection.Left"/> this will furthermore
         * specify that they should be placed underneath the parent rather than at the distance from the right, respectively left of the parent.
         */
        Underneath: 2,

        /*
         * Default layout.
         */
        Default: 3
    }

    var LayoutTypes = {

        /**
         * The tree layout and its various variations.
         * See also the TreeLayoutType for subtypes of this.
         */
        TreeLayout: 0,

        //LayeredLayout: 1,
        /*
         * Spring-embedder aka force-directed layout.
         */
        ForceDirectedLayout: 2,
        /**
         * Unspecified layout.
         */
        None: 3
    }

    var TreeDirection = {
        /*
         * Children evolve to the left.
         */
        Left: 0,

        /*
         * Children evolve to the right.
         */
        Right: 1,

        /*
         * Children evolve upwards.
         */
        Up: 2,

        /*
         * Children evolve downwards.
         */
        Down: 3,

        /*
         * No direction specified:0, this usually means the root node and it's a mind mapping root.
         */
        None: 4,

        /*
         * Radial layout.
         */
        Radial: 5,

        /*
         * Undefine layout.
         */
        Undefined: 6
    }

    var TreeLayoutType = {

        /*
         * The standard mind mapping layout.
         */
        MindmapHorizontal: 0,

        /*
         * The standard mind mapping layout but with the two wings laid out vertically.
         */
        MindmapVertical: 1,

        /*
         * Standard tree layout with the children positioned at the right of the root.
         */
        TreeRight: 2,

        /*
         * Standard tree layout with the children positioned at the left of the root.
         */
        TreeLeft: 3,

        /*
         *  Standard tree layout with the children positioned on top of the root.
         */
        TreeUp: 4,

        /*
         * Standard tree layout with the children positioned below the root.
         */
        TreeDown: 5,

        /*
         * Top-down layout with the children on the second level positioned as a tree view underneath the first level.
         */
        TipOverTree: 6,

        /*
         * Experimental radial tree layout.
         */
        RadialTree: 7,

        /*
         * Unspecified layout. This is not an algorithm but just a tag for the host application to tell that the user has not specified any layout yet.
         */
        Undefined: 8
    }

    kendo.deepExtend(diagram, {
        init: function (element) {
            kendo.init(element, kendo.diagram.ui);
        },

        Point: Point,
        Intersect: Intersect,
        Rect: Rect,
        Size: Size,
        RectAlign: RectAlign,
        Matrix: Matrix,
        MatrixVector: MatrixVector,
        Range: Range,
        normalVariable: normalVariable,
        randomId: randomId,
        Dictionary: Dictionary,
        HashTable: HashTable,
        Queue: Queue,
        Node: Node,
        Link: Link,
        Graph: Graph,
        SpringLayout: SpringLayout,
        TreeLayout: TreeLayout,
        GraphAdapter: DiagramToHyperTreeAdapter,
        ChildrenLayout: ChildrenLayout,
        LayoutTypes: LayoutTypes,
        TreeLayoutType: TreeLayoutType,
        TreeDirection: TreeDirection,
        LayoutBase: LayoutBase
    });
})
    (window.kendo.jQuery);

/*-------------------Diverse math functions----------------------------*/

Math.sign = function (number) {
    return number ? number < 0 ? -1 : 1 : 0;
};
Math.epsilon = 0.000001;

//TODO: Move them to another object. Maybe some kind of Utils.
Math.findRadian = function(start, end){
    if (start == end) return 0;
    var sngXComp = end.x - start.x,
        sngYComp = start.y - end.y,
        atan =Math.atan(sngXComp / sngYComp);
    if (sngYComp >= 0) return sngXComp < 0 ? atan + (2 * Math.PI) : atan;
    return atan + Math.PI;
};
Math.findAngle = function (center, end) {
    return Math.findRadian(center, end) * 180 / Math.PI;
};
/*-------------------Diverse utilities----------------------------*/

isDefined = function (obj) {
    return !(typeof obj === 'undefined');
};

isUndefined = function (obj) {
    return (typeof obj === 'undefined') || obj == null;
};

/**
 * Returns whether the given object is an object or a value.
 */
isObject = function (obj) {
    return obj === Object(obj);
};

/**
 * Returns whether the object has a property with the given name.
 */
has = function (obj, key) {
    return hasOwnProperty.call(obj, key);
};

/**
 * Returns whether the given object is a function.
 */
isFunction = function (obj) {
    return typeof obj === 'function';
};

/**
 * Returns whether the given object is a string.
 */
isString = function (obj) {
    return Object.prototype.toString.call(obj) == '[object String]';
};

isType = function (obj, type) {
    return Object.prototype.toString.call(obj) == '[object ' + type + ']';
}
/**
 * Returns whether the given object is a number.
 */
isNumber = function (obj) {
    return !isNaN(parseFloat(obj)) && isFinite(obj);
};

/**
 * Return whether the given object (array or dictionary).
 */
isEmpty = function (obj) {
    if (obj == null) {
        return true;
    }
    if (isArray(obj) || isString(obj)) {
        return obj.length === 0;
    }
    for (var key in obj) {
        if (has(obj, key)) {
            return false;
        }
    }
    return true;
};

/**
 * Returns whether the object is an array.
 */
isArray = function (obj) {
    return Object.prototype.toString.call(obj) == '[object Array]';
};

/**
 * Returns an array of the specified size and with each entry set to the given value.
 * @param size
 * @param value
 * @returns {Array}
 */
initArray = function createIdArray(size, value) {
    var array = [];
    for (var i = 0; i < size; ++i) {
        array[i] = value;
    }
    return array;
}

/**
 * Returns an integer within the given bounds.
 * @param lower The inclusive lower bound.
 * @param upper The exclusive upper bound.
 * @returns {number}
 */
randomInteger = function (lower, upper) {
    return parseInt(Math.floor(Math.random() * upper) + lower);
}

/*-------------------Array Extensions ----------------------------*/

if (!Array.prototype.any) {
    Array.prototype.any = function (predicate, thisRef) {
        for (var i = 0; i < this.length; ++i) {
            if (predicate.call(thisRef, this[i])) {
                return this[i];
            }
        }
        return null;
    }
}

if (!Array.prototype.remove) {
    Array.prototype.remove = function () {
        var what, a = arguments, L = a.length, ax;
        while (L && this.length) {
            what = a[--L];
            while ((ax = this.indexOf(what)) !== -1) {
                this.splice(ax, 1);
            }
        }
        return this;
    }
}

if (!Array.prototype.flatten) {
    Array.prototype.flatten = function () {
        return Array.prototype.concat.apply([], this);
    };
}

if (!Array.prototype.distinct) {
    Array.prototype.distinct = function () {
        var a = this;
        var r = [];
        for (var i = 0; i < a.length; i++) {
            if (r.indexOf(a[i]) < 0) {
                r.push(a[i]);
            }
        }
        return r;
    };
}

if (!Array.prototype.contains) {
    Array.prototype.contains = function (obj) {
        var i = this.length;
        while (i--) {
            if (this[i] == obj) {
                return true;
            }
        }
        return false;
    };
}

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (element) {
        for (var i = 0; i < this.length; ++i) {
            if (this[i] === element) {
                return i;
            }
        }
        return -1;
    }
}

if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (predicate, thisRef) {
        var result = [];
        for (var i = 0; i < this.length; ++i) {
            if (predicate.call(thisRef, this[i])) {
                result.push(this[i]);
            }
        }
        return result;
    }
}

if (!Array.prototype.each) {
    Array.prototype.each = Array.prototype.forEach;
}

if (!Array.prototype.map) {
    /**
     Maps the given functional to each element of the array. See also the 'apply' method which accepts in addition some parameters.
     */
    Array.prototype.map = function (iterator, context) {
        var results = [];
        this.forEach(function (value, index, list) {
            results.push(iterator.call(context, value, index, list));
        });
        return results;
    };
}

if (!Array.prototype.reduce) {
    Array.prototype.reduce = function (iterator, acc, context) {
        var initial = arguments.length > 1;
        this.forEach(function (value, index, list) {
            if (!initial) {
                acc = value;
                initial = true;
            }
            else {
                acc = iterator.call(context, acc, value, index, list);
            }
        });
        if (!initial) {
            throw 'Reduce of empty array with no initial value';
        }
        return acc;
    }
}
if (!Array.prototype.fold) {
    Array.prototype.fold = Array.prototype.reduce;
}
if (!Array.prototype.foldl) {
    Array.prototype.foldl = Array.prototype.reduce;
} // aka fold left

if (!Array.prototype.sameAs) {
    Array.prototype.sameAs = function (array) {
        if (!array) {
            return false;
        }
        if (this.length != array.length) {
            return false;
        }
        for (var i = 0; i < this.length; i++) {
            if (this[i] instanceof Array && array[i] instanceof Array) {
                if (!this[i].compare(array[i])) {
                    return false;
                }
            }
            else if (this[i] != array[i]) {
                // Warning - two different object instances will never be equal: {x:20} != {x:20}
                return false;
            }
        }
        return true;
    }
}

if (!Array.prototype.find) {
    Array.prototype.find = function (iterator, context) {
        var result;
        this.any(function (value, index, list) {
            if (iterator.call(context, value, index, list)) {
                result = value;
                return true;
            }
            return false;
        });
        return result;
    };
}
if (!Array.prototype.first) {
    Array.prototype.first = Array.prototype.find;
}

if (!Array.prototype.insert) {

    /**
     * Inserts the given element at the specified position and returns the result.
     */
    Array.prototype.insert = function (element, position) {
        this.splice(position, 0, element);
        return this;
    };
}

if (!Array.prototype.prepend) {
    /**
     * Inserts the given item at begin of array.
     */
    Array.prototype.prepend = function () {
        this.unshift.apply(this, arguments); // tricky way to prepend any number of arguments. by Niko :)
        // this.splice(0, 0, x);
        return this;
    };
}

if (!Array.prototype.append) {
    Array.prototype.append = function (x) {
        this.splice(this.length, 0, x);
        return this;
    };
}

if (!Array.prototype.apply) {
    Array.prototype.apply = function (method) {
        var args = Array.prototype.slice.call(arguments, 1).prepend(0);  // dummy holder at first position to replace in apply below
        var isFunc = isFunction(method);
        return this.map(function (value) {
            args.splice(0, 1, value);
            return (isFunc ? method : value[method]).apply(method, args);
        });
    }
}

if (!Array.prototype.filter) {
    Array.prototype.filter = function (iterator, context) {
        var results = [];
        this.forEach(function (value, index, list) {
            if (iterator.call(context, value, index, list)) {
                results.push(value);
            }
        });
        return results;
    };
}

if (!Array.prototype.select) {
    Array.prototype.select = Array.prototype.filter;
}

if (!Array.prototype.where) {
    Array.prototype.where = function (constraint, first) {
        if (isUndefined(constraint)) {
            return first ? void 0 : [];
        }
        return first ? this.first(constraint) : this.filter(constraint);
    };
}

if (!Array.prototype.add) {
    Array.prototype.add = Array.prototype.push;
}

if (!Array.prototype.isEmpty) {
    Array.prototype.isEmpty = function () {
        return this.length == 0;
    }
}

if (!Array.prototype.all) {
    Array.prototype.all = function (iterator, context) {
        var result = true;
        this.forEach(function (value, index, list) {
            if (!(result = result && iterator.call(context, value, index, list))) {
                return {};
            }
        });
        return !!result;
    }
}

if (!Array.prototype.every) {
    Array.prototype.every = Array.prototype.all;
}

if (!Array.prototype.shuffle) {
    /**
     * Shuffles the elements of this array in a random order.
     */
    Array.prototype.shuffle = function () {
        this.sort(function () {
            return 0.5 - Math.random();
        })
    }
}

if (!Array.prototype.clear) {

    //why not just setting the variable to []? It causes problems if used as byref argument; it will be another object than the one passed.
    Array.prototype.clear = function () {
        while (this.length > 0) {
            this.pop();
        }
    }
}

if (!Array.prototype.bisort) {

    /**
     * Sort the arrays on the basis of the first one (considered as keys and the other array as values).
     * @param a
     * @param b
     * @param sortfunc (optiona) sorting function for the values in the first array
     */
    Array.prototype.bisort = function (a, b, sortfunc) {
        if (isUndefined(a)) {
            throw "First array is not specified.";
        }
        if (isUndefined(b)) {
            throw "Second array is not specified.";
        }
        if (a.length != b.length) {
            throw "The two arrays should have equal length";
        }

        var all = [];

        var sort_by = function (field, reverse, primer) {

            var key = function (x) {
                return primer ? primer(x[field]) : x[field]
            };

            return function (a, b) {
                var A = key(a), B = key(b);
                return ((A < B) ? -1 : (A > B) ? +1 : 0) * [-1, 1][+!!reverse];
            }
        }

        for (var i = 0; i < a.length; i++) {
            all.push({ 'x': a[i], 'y': b[i] });
        }
        if (isUndefined(sortfunc)) {
            all.sort(function (m, n) {
                return m.x - n.x;
            });
        }
        else {
            all.sort(function (m, n) {
                return sortfunc(m.x, n.x);
            });
        }

        a.clear(); // do not set to [], the ref will be gone
        b.clear();

        for (var i = 0; i < all.length; i++) {
            a.push(all[i].x);
            b.push(all[i].y);
        }
    }
}
