(function ($) {
    var kendo = window.kendo,
        ui = kendo.ui = kendo.ui || {},
        DEFAULT_PRECISION = 6,
        ZERO_THRESHOLD = 0.2;

    function Chart(element, options) {
        this.options = $.extend(Chart.prototype.defaults, options);
        this.element = element;
    }

    Chart.prototype = {
        defaults: {

        },

        types: { }
    };

    ui.Chart = Chart;
    $.fn.kendoChart = function(options) {
        $(this).each(function() {
            $(this).data("kendoChart", new kendo.ui.Chart(this, options));
        });

        return this;
    };


    // Numeric Axis
    function NumericAxis() {

    }

    NumericAxis.prototype = {
        getMajorUnit: function (min, max) {
            var diff = max - min;
            if (diff == 0) {
                if (max == 0) {
                    return 0.1;
                }

                diff = Math.abs(max);
            }

            var scale = Math.pow(10, Math.floor(Math.log(diff) / Math.log(10))),
                relativeValue = round((diff / scale), DEFAULT_PRECISION),
                scaleMultiplier = 1;

            if (relativeValue < 1.904762) {
                scaleMultiplier = 0.2;
            } else if (relativeValue < 4.761904) {
                scaleMultiplier = 0.5;
            } else if (relativeValue < 9.523809) {
                scaleMultiplier = 1;
            } else {
                scaleMultiplier = 2;
            }

            return round(scale * scaleMultiplier, DEFAULT_PRECISION);
        },

        getAxisMax: function(min, max) {
            if (min == 0 && max == 0) {
                return 1;
            }

            var axisMax;
            if (min <= 0 && max <= 0) {
                max = min == max ? 0 : max;

                var diff = Math.abs((max - min) / max);
                if(diff > ZERO_THRESHOLD) {
                    return 0;
                }

                axisMax = max - ((min - max) / 2);
            } else {
                min = min == max ? 0 : min;
                axisMax = max + 0.05 * (max - min);
            }

            var mu = this.getMajorUnit(min, max);
            return ceil(axisMax, mu);
        },

        getAxisMin: function(min, max) {
            if (min == 0 && max == 0) {
                return 0;
            }

            var axisMin;
            if (min >= 0 && max >= 0) {
                min = min == max ? 0 : min;

                var diff = (max - min) / max;
                if(diff > ZERO_THRESHOLD) {
                    return 0;
                }

                axisMin = min - ((max - min) / 2);
            } else {
                max = min == max ? 0 : max;
                axisMin = min + 0.05 * (min - max);
            }

            var mu = this.getMajorUnit(min, max);
            return floor(axisMin, mu);
        }
    };

    function Box(x1, y1, x2, y2) {
        var box = this;
        box.x1 = x1 || 0;
        box.x2 = x2 || 0;
        box.y1 = y1 || 0;
        box.y2 = y2 || 0;
    }

    Box.prototype = {
        width: function() {
            return this.x2 - this.x1;
        },

        height: function() {
            return this.y2 - this.y1;
        }
    }

    var defaultBox = new Box(0, 0, 0, 0);

    function ChartElement() {
        var element = this;
        element.attributes = {};
        element.children = [];
    }

    $.extend(ChartElement.prototype, {
        options: {
        }
    });

    function TextElement(text) {
        var element = this;
        ChartElement.call(element);

        element.type = "text";
        element.text = text;

        element.updateLayout(defaultBox);
    }

    TextElement.prototype = new ChartElement();

    $.extend(TextElement.prototype, {
        options: {
            fontSize: "12pt",
            fontFamily: "Verdana"
        },

        updateLayout: function(targetBox) {
            var element = this,
                size = element.measure();

            element.box = new Box(targetBox.x1, targetBox.y1, targetBox.x1 + size.width, targetBox.y1 + size.height);
        },

        measure: function() {
            var sample = $("<span />").css(this.options).appendTo(document.body).text(this.text),
                size = {
                    width: sample.width(),
                    height: sample.height()
                };

            sample.remove();
            return size;
        }
    });

    function ChartTitle(options) {
        var title = this;
        ChartElement.call(title);

        title.options = $.extend({}, title.options, options);
    }

    ChartTitle.prototype = new ChartElement();

    $.extend(ChartTitle.prototype, {
        options: {
            text: "Title",
            position: "top",
            textAlign: "center"
        },

        updateLayout: function(targetBox) {
            var title = this,
                options = title.options,
                text = new TextElement(options.text),
                textBox = new Box();

            if (options.position == "top") {
                textBox.y1 = targetBox.y1;
            } else if (options.position == "bottom") {
                textBox.y1 = targetBox.y2 - text.box.height();
            }

            if (title.options.textAlign == "center") {
                textBox.x1 = (targetBox.width() - text.box.width()) / 2;
                textBox.x2 = textBox.x1 + text.box.width();
            }
            text.updateLayout(textBox);
            title.children.push(text);

            title.box = new Box(targetBox.x1, targetBox.y1, targetBox.x2, text.box.y2);
      }
    });

    // Helper functions
    function supportsSVG() {
        return document.implementation.hasFeature(
            "http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1");
    }

    function ceil(value, step) {
        return round(Math.ceil(value / step) * step, DEFAULT_PRECISION);
    }

    function floor(value, step) {
        return round(Math.floor(value / step) * step, DEFAULT_PRECISION);
    }

    function round(value, precision) {
        var power = Math.pow(10, precision || 0);
        return Math.round(value * power) / power;
    }

    // #ifdef DEBUG
    // Make the internal functions public for unit testing

    Chart.NumericAxis = NumericAxis;
    Chart.ChartTitle = ChartTitle;
    Chart.Box = Box;

    // #endif

})(jQuery);

// kendo.chart.bar.js
(function($) {
    function BarChart() {
    }

    kendo.ui.Chart.prototype.types["bar"] = function(chart, configuration) {
        return new BarChart(chart, configuration);
    };
})(jQuery);
