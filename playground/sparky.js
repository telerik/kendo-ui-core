(function() {
    sparky = {version: "0.1"};

    var lib = sparky.lib = (typeof d3 === "object")
        ? d3
        : (function() {
            var shim = {};

            // like d3.keys(), returns an array of the object's keys
            shim.keys = function(obj) {
                var keys = [];
                for (var k in obj) keys.push(k);
                return keys;
            };

            // returns the minimum value in an array, optionally derived from
            // an accessor function
            shim.min = function(values, accessor) {
                var min = Number.POSITIVE_INFINITY,
                    len = values.length;
                for (var i = 0; i < len; i++) {
                    var val = accessor ? accessor(values[i]) : values[i];
                    if (val < min) min = val;
                }
                return min;
            };

            // returns the maximum value in an array, optionally derived from
            // an accessor function
            shim.max = function(values, accessor) {
                var max = Number.NEGATIVE_INFINITY,
                    len = values.length;
                for (var i = 0; i < len; i++) {
                    var val = accessor ? accessor(values[i]) : values[i];
                    if (val > max) max = val;
                }
                return max;
            };

            shim.scale = {};

            // our linear scale is simpler in that it only uses one value
            shim.scale.linear = function() {
                var dmin = 0, dmax = 1,
                    rmin = 0, rmax = 1,
                    clamp = false,
                    scale = function(val) {
                        if (clamp) {
                            if (val < dmin) val = dmin;
                            if (val > dmax) val = dmax;
                        }
                        return rmin + (rmax - rmin) * (val - dmin) / (dmax - dmin);
                    };

                scale.clamp = function(c) {
                    if (arguments.length) {
                        clamp = c;
                        return scale;
                    } else {
                        return clamp;
                    }
                };

                scale.domain = function(domain) {
                    if (arguments.length) {
                        dmin = domain[0];
                        dmax = domain[1];
                        return scale;
                    } else {
                        return [dmin, dmax];
                    }
                };

                scale.range = function(range) {
                    if (arguments.length) {
                        rmin = range[0];
                        rmax = range[1];
                        return scale;
                    } else {
                        return [rmin, rmax];
                    }
                };

                return scale;
            };

            // the identity function returns the value provided
            shim.identity = function(v) {
                return v;
            };

            // coerce a value into the identity function if it's not a
            // function already
            shim.functor = function(v) {
                return (typeof v === "function")
                    ? v
                    : function() { return v; };
            };

            return shim;
        })();

    sparky.sparkline = function(parent, data, config, overrides) {

        // attempt to query the document for the provided selector
        if (typeof parent === "string") {
            var id = parent;
            parent = document.getElementById(id) || document.querySelector(id);
            if (!parent) {
                throw 'No element found for "' + id + '"';
            }
        }

        // merge defaults and options, or fetch presets
        var options = (typeof config === "string")
            ? sparky.prests.get(config, overrides)
            : _extend(sparky.sparkline.defaults, config || {});

        // remember the length of the data array
        var data_len = data.length;
        // get_val() is a value getter for each datum
        var get_val = lib.functor(options.value);
        // figure out the minimum and maximum values
        var dmin = isNaN(options.min) ? lib.min(data, get_val) : options.min,
            dmax = isNaN(options.max) ? lib.max(data, get_val) : options.max;

        // determine the sparkline's dimensions
        var size = _size(parent),
            // padding is the number of pixels to inset from the edges
            padding = options.padding || 0,
            width = options.width || size.width,
            height = options.height || size.height;

        // create the x and y scales
        var XX = lib.scale.linear()
                .domain([0, data_len - 1])
                .range([padding, width - padding]),
            YY = lib.scale.linear()
                .domain([dmin, dmax])
                .range([height - padding, padding]);

        // create our Raphael surface
        var paper = Raphael(parent, width, height);

        if (options.range_fill && options.range_fill != "none") {
            // FIXME: complain if range_min and range_max aren't defined?
            var ry1 = YY(options.range_max),
                ry2 = YY(options.range_min);
            // only create a rect
            if (ry1 != ry2) {
                rect = paper.rect(padding, ry1, width - padding * 2, ry2 - ry1)
                    .attr({
                        "class":    "range",
                        "stroke":   "none",
                        "fill":     options.range_fill
                    });
            }
        }

        // bars and dots are mutually exclusive;
        // if there's a bar_fill option, assume they want bars
        if (options.bar_fill && options.bar_fill != "none") {
            var baseline = isNaN(options.baseline) ? 0 : options.baseline,
                actual_min = Math.min(dmin, baseline),
                spread = dmax - dmin;

            var avail_height = (height - padding * 2),
                avail_width = (width - padding * 2);

            // define our bar fill and positioning parameters
            var bar_fill = lib.functor(options.bar_fill || "black"),
                bar_spacing = isNaN(options.bar_spacing) ? 0 : options.bar_spacing,
                bar_width = (avail_width - bar_spacing * (data_len - 1)) / data_len;

            // proportional height
            var BH = function(val) {
                return avail_height * ((val >= baseline)
                    ? (val - baseline) / spread
                    : (baseline - val) / spread);
            };
            var BY = lib.scale.linear()
                .domain([baseline, dmax])
                .range([height - padding - BH(actual_min), padding])
                .clamp(true);
            var BX = lib.scale.linear()
                .domain([0, data_len - 1])
                .range([padding, padding + avail_width - bar_width]);

            var y0 = BY(baseline);

            // create a Raphael set for the bars
            var bars = paper.set();
            // (and stash it on the paper object for later use)
            paper.bars = bars;
            var did_min = false,
                did_max = false;
            for (var i = 0; i < data_len; i++) {
                // get the screen coordinate and the value,
                var val = get_val(data[i]),
                    x = BX(i),
                    y = BY(val),
                    h = BH(val),
                    // generate some metadata:
                    meta = {
                        // true if it's first in the list
                        first: i == 0,
                        // true if it's last in the list
                        last: i == data_len - 1,
                        // true if it's >= maximum value
                        max: did_max ? false : (did_max = val >= dmax),
                        // true if it's <= minimum value
                        min: did_min ? false : (did_min = val <= dmin),
                        // true if it's above the baseline
                        above: val >= baseline,
                        // true if it's below the baseline
                        below: val <= baseline
                    };
                // create the dot
                var bar = paper.rect(x, y, bar_width, h)
                    .attr({
                        "class":    "bar",
                        "stroke":   "none",
                        "fill":     bar_fill.call(meta, data[i], i)
                    });
                bars.push(bars);
            }

        // otherwise, do the dots
        } else {

            // create an array of screen coordinates for each datum
            var points = [];
            for (var i = 0; i < data_len; i++) {
                points.push({
                    x: XX(i),
                    y: YY(data[i])
                });
            }

            // if "area_fill" was provided, push some more points onto the array
            if (options.area_fill && options.area_fill !== "none") {
                var bottom = YY.range()[0],
                    br = {x: XX(data_len - 1), y: bottom},
                    bl = {x: XX(0), y: bottom};
                points.push(br);
                points.push(bl);
                points.push(points[0]);
            }

            var path = [];
            for (var i = 0; i < points.length; i++) {
                var p = points[i];
                path.push((i === 0) ? "M" : "L", p.x, ",", p.y);
            }
            // path.push("Z");
            // generate the path, and set its fill and stroke attributes
            var line = paper.path(path.join(" "))
                .attr({
                    "class":        "line",
                    "fill":         options.area_fill || "none",
                    "stroke":       options.line_stroke || "black",
                    "stroke-width": options.line_stroke_width || 1.5
                });

            // define our radius and color getters for dots
            var dot_radius = lib.functor(options.dot_radius),
                dot_fill = lib.functor(options.dot_fill || "black"),
                dot_stroke = lib.functor(options.dot_stroke || "none"),
                dot_stroke_width = lib.functor(options.dot_stroke_width || 0);

            // create a Raphael set for the dots
            var dots = paper.set();
            // (and stash it on the paper object for later use)
            paper.dots = dots;
            var did_min = false,
                did_max = false;
            for (var i = 0; i < data_len; i++) {
                // get the screen coordinate and the value,
                var point = points[i],
                    val = get_val(data[i]),
                    // generate some metadata:
                    meta = {
                        // true if it's first in the list
                        first: i == 0,
                        // true if it's last in the list
                        last: i == data_len - 1,
                        // true if it's >= maximum value
                        max: did_max ? false : (did_max = val >= dmax),
                        // true if it's <= minimum value
                        min: did_min ? false : (did_min = val <= dmin),
                    },
                    // get the radius
                    r = dot_radius.call(meta, data[i], i);
                // only create the dot if the radius > 0
                if (r > 0 && !isNaN(r)) {
                    // create the dot
                    var dot = paper.circle(point.x, point.y)
                        .attr({
                            "r":            r,
                            "class":        "dot",
                            "stroke":       dot_stroke.call(meta, data[i], i),
                            "stroke-width": dot_stroke_width.call(meta, data[i], i),
                            "fill":         dot_fill.call(meta, data[i], i)
                        });
                    dots.push(dot);
                }
            }
        }

        return paper;
    };

    // sparkline() option defaults
    sparky.sparkline.defaults = {
        width:              0, // 0 means "use the intrinsic width"
        height:             0, // 0 means "use the intrinsic height"
        // increase the padding to avoid cutting off dots with larger radii.
        padding:            2,
        // "area_fill" enables area rendering and defines the area's fill color
        area_fill:          null,
        // TODO: document
        range_min:          0,
        range_max:          0,
        range_fill:         null,
        // the value function (or key string) tells sparkline() how to extract
        // values from the data array. _identity() returns the value provided,
        // so it acts like a passthru for array values. See also: d3.identity()
        value:              lib.identity,
        // the color of the sparkline's line
        line_stroke:        "black",
        // the stroke width of the sparkline's line
        line_stroke_width:  1,
        // the fill color of the sparkline's dots, or a function that returns a
        // color for each datum. The function receives two arguments:
        // function(datum, index) { }
        // and the "this" context is a metadata object with properties that let
        // you know if this datum is the first, last, min or max value in the
        // data array.
        dot_fill:           null,
        // the radius of the sparkline's dots, or a function that returns the
        // radius for each datum, as above with "dot_fill".
        dot_radius:         0,

        // bar fill, defined either as a color function(datum, index)
        bar_fill:           null,
        // spacing between bars, in pixels
        bar_spacing:        1,
        // baseline value below which bars will also be drawn below
        baseline:           0
    };

    // Utility parsing functions
    sparky.parse = {};
    (function() {

        var split = sparky.parse.split = function(str) {
            return str.split(/\s*,\s*/);
        };

        sparky.parse.numbers = function(str, parser) {
            var numbers = split(str),
                len = numbers.length;
            if (!parser) parser = Number;
            for (var i = 0; i < len; i++) {
                numbers[i] = parser(numbers[i]);
            }
            return numbers;
        };

    })();

    sparky.util = {};

    sparky.util.getElementOptions = function(element, defaults, keys) {
        var options = {};

        function _option(key) {
            var value = element.getAttribute("data-" + key);
            if (value) {
                var num = Number(value);
                return isNaN(num) ? value : num;
            } else {
                return null;
            }
        }

        if (!keys) keys = lib.keys(sparky.sparkline.defaults);
        var len = keys.length;
        for (var i = 0; i < len; i++) {
            var key = keys[i],
                val = _option(key);
            if (val !== null) {
                options[key] = val;
            }
        }
        return defaults ? _extend(defaults, options) : options;
    };

    // Presets!
    sparky.presets = {};

    /**
     * Register a named preset:
     * sparky.presets.set("big-blue", {
     *   line_stroke: "blue",
     *   line_stroke_width: 2
     * });
     */
    sparky.presets.set = function(id, options) {
        sparky.presets[id] = options;
    };

    /**
     * Get a named preset:
     * sparky.presets.get("big-blue");
     */
    sparky.presets.get = function(id, options) {
        return _extend(sparky.presets[id], options || {});
    };

    /**
     * Copy a named preset and override select options:
     * sparky.sparkline.presets.extend("big-blue", "big-green", {
     *   line_stroke: "green"
     * });
     */
    sparky.presets.extend = function(base, id, options) {
        return sparky.presets[id] = _extend(sparky.presets[base], options);
    };

    // defaults
    sparky.presets.set("default", sparky.sparkline.defaults);

    // a nice preset for fill
    sparky.presets.set("gray-area", {
        min:            0,
        dot_radius:     0,
        padding:        0,
        area_fill:      "#999",
        line_stroke:    "none"
    });

    /*
     * Tufte-esque presets inspired by:
     * http://www.edwardtufte.com/bboard/q-and-a-fetch-msg?msg_id=0001OR
     */

    sparky.presets.set("hilite-last", {
        line_stroke:        "#888",
        line_stroke_width:  1,
        range_fill:         "#ddd",
        dot_fill:           "#f00",
        dot_radius: function(d, i) {
            return this.last ? 2 : 0;
        }
    });

    sparky.presets.extend("hilite-last", "hilite-peaks", {
        dot_fill: function(d, i) {
            return (this.first || this.last)
                ? "#f00"
                : (this.min || this.max)
                  ? "#339ACF"
                  : null;
        },
        dot_radius: function(d, i) {
            return (this.first || this.last || this.min || this.max)
                ? 2
                : 0;
        }
    });

    sparky.presets.set("zero-bars", {
        padding:            0,
        line_stroke:        "none",
        dot_fill:           "none",
        bar_fill: function(d, i) {
            return this.above ? "black" : "red";
        }
    });

    sparky.presets.set("binary", {
        padding:        0,
        line_stroke:    "none",
        dot_fill:       "none",
        bar_fill:       "#333",
        bar_spacing:    .5,
        baseline:       .5,
        min:            0,
        max:            1
    });

    // internal utility functions:

    /**
     * Get the intrinsic size ({width, height}) of an element in round pixels.
     */
    function _size(el) {
        return {
            width: ~~el.offsetWidth,
            height: ~~el.offsetHeight
        };
    }

    /**
     * Override all of the iterable properties in the first object so that they
     * contain the values of the second, and return it as a new object.
     */
    function _extend(defaults, options) {
        var o = {};
        for (var k in defaults) {
            o[k] = defaults[k];
        }
        for (var k in options) {
            o[k] = options[k];
        }
        return o;
    }

})();
