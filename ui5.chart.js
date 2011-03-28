(function($) {
    $.ui5 = $.ui5 || {};
    var defaultPrecision = 6,
        zeroThreshold = 0.2;

    function Chart(element, options) {
        this.options = $.extend(Chart.prototype.defaults, options);
        this.element = element;
    }

    Chart.prototype = {
        defaults: {

        },

        types: { }
    };

    $.ui5.Chart = Chart;
    $.fn.ui5chart = function(options) {
        $(this).each(function() {
            $(this).data("ui5chart", new $.ui5.Chart(this, options));
        });

        return this;
    };

    $.ui5.Chart.util = {
        getMajorUnit: function (min, max) {
            var diff = max - min;
            if (diff == 0) {
                if (max == 0) {
                    return 0.1;
                }

                diff = Math.abs(max);
            }

            var scale = Math.pow(10, Math.floor(Math.log(diff) / Math.log(10))),
                relativeValue = round((diff / scale), defaultPrecision),
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

            return round(scale * scaleMultiplier, defaultPrecision);
        },

        getAxisMax: function(min, max) {
            if (min == 0 && max == 0) {
                return 1;
            }

            var axisMax;
            if (min <= 0 && max <= 0) {
                max = min == max ? 0 : max;

                var diff = Math.abs((max - min) / max);
                if(diff > zeroThreshold) {
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
                if(diff > zeroThreshold) {
                    return 0;
                }

                axisMin = min - ((max - min) / 2);
            } else {
                max = min == max ? 0 : max;
                axisMin = min + 0.05 * (min - max);
            }

            var mu = this.getMajorUnit(min, max);
            return floor(axisMin, mu);
        },
    };

    function supportsSVG() {
        return document.implementation.hasFeature(
            "http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1");
    }

    function ceil(value, step) {
        return round(Math.ceil(value / step) * step, defaultPrecision);
    }

    function floor(value, step) {
        return round(Math.floor(value / step) * step, defaultPrecision);
    }

    function round(value, precision) {
        var power = Math.pow(10, precision || 0);
        return Math.round(value * power) / power;
    }

})(jQuery);

// ui5.chart.bar.js
(function($) {
    function BarChart() {
    }

    $.ui5.Chart.prototype.types["bar"] = function(chart, configuration) {
        return new BarChart(chart, configuration);
    };
})(jQuery);
