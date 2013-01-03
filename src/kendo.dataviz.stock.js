(function ($, undefined) {
    // Imports ================================================================
    var kendo = window.kendo,
        Class = kendo.Class,
        deepExtend = kendo.deepExtend,
        math = Math,
        proxy = $.proxy,

        dataviz = kendo.dataviz,
        Chart = dataviz.ui.Chart,
        Selection = dataviz.Selection,
        duration = dataviz.duration,
        lteDateIndex = dataviz.lteDateIndex,
        renderTemplate = dataviz.renderTemplate,
        toDate = dataviz.toDate,
        toTime = dataviz.toTime;

    // Constants =============================================================
    var AUTO_CATEGORY_WIDTH = 28,
        CSS_PREFIX = "k-",
        DRAG = "drag",
        DRAG_END = "dragEnd",
        NAVIGATOR_PANE = "_navigator",
        NAVIGATOR_AXIS = NAVIGATOR_PANE,
        ZOOM_ACCELERATION = 3,
        ZOOM = "zoom",
        ZOOM_END = "zoomEnd";

    // Stock chart ===========================================================
    var StockChart = Chart.extend({
        init: function(element, options) {
            var chart = this;

            Chart.fn.init.call(chart, element, options);
        },

        _applyDefaults: function(options, themeOptions) {
            var chart = this,
                width = chart.element.width() || dataviz.DEFAULT_WIDTH;

            var stockDefaults = {
                axisDefaults: {
                    categoryAxis: {
                        name: "default",
                        field: options.dateField,
                        majorGridLines: {
                            visible: false
                        },
                        labels: {
                            step: 2
                        },
                        majorTicks: {
                            visible: false
                        },
                        maxDateGroups: Math.floor(width / AUTO_CATEGORY_WIDTH)
                    }
                }
            };

            if (themeOptions) {
                themeOptions = deepExtend({}, themeOptions, stockDefaults);
            }

            if (!chart._navigator) {
                Navigator.setup(options, themeOptions);
            }

            Chart.fn._applyDefaults.call(chart, options, themeOptions);
        },

        options: {
            name: "StockChart",
            dateField: "date",
            axisDefaults: {
                categoryAxis: {
                    type: "date",
                    baseUnit: "fit",
                    justified: true
                },
                valueAxis: {
                    narrowRange: true,
                    labels: {
                        format: "C"
                    }
                }
            },
            navigator: {
                select: {},
                seriesDefaults: {
                    markers: {
                        visible: false
                    },
                    tooltip: {
                        visible: true,
                        template: "#= kendo.toString(category, 'd') #"
                    },
                    line: {
                        width: 2
                    }
                }
            },
            tooltip: {
                visible: true
            },
            legend: {
                visible: false
            }
        },

        _redraw: function() {
            var chart = this,
                navigator = chart._navigator;

            if (!navigator) {
                navigator = chart._navigator = new Navigator(chart);
            }

            navigator.applySelection();
            Chart.fn._redraw.call(chart);
            navigator.redraw();
        }
    });

    var Navigator = Class.extend({
        init: function(chart) {
            var navi = this;

            navi.chart = chart;
            navi.options = chart.options.navigator;

            chart.bind(DRAG, proxy(navi._drag, navi));
            chart.bind(DRAG_END, proxy(navi._dragEnd, navi));
            chart.bind(ZOOM, proxy(navi._zoom, navi));
            chart.bind(ZOOM_END, proxy(navi._zoomEnd, navi));
        },

        redraw: function() {
            var navi = this,
                chart = navi.chart,
                axis = navi.mainAxis(),
                groups = axis.options.categories,
                select = navi.options.select || {},
                min = 0,
                max = groups.length - 1,
                from = min,
                to = max;

            if (groups.length > 0) {
                if (select.from) {
                    from = lteDateIndex(groups, toDate(select.from));
                }

                if (select.to) {
                    to = lteDateIndex(groups, toDate(select.to));
                }

                chart._selection = new Selection(chart, axis, {
                    from: from,
                    to: to,
                    min: min,
                    max: max,
                    select: $.proxy(navi._select, navi),
                    selectEnd: $.proxy(navi._selectEnd, navi)
                });

                navi.hint = new NavigatorHint(chart.element, { min: groups[0], max: dataviz.last(groups) });
            }
        },

        _drag: function(e) {
            var navi = this,
                chart = navi.chart,
                coords = chart._eventCoordinates(e.originalEvent),
                navigatorAxis = navi.mainAxis(),
                inNavigator = navigatorAxis.pane.box.containsPoint(coords),
                groups = navigatorAxis.options.categories,
                axis = chart._plotArea.categoryAxis,
                baseUnit = axis.options.baseUnit,
                range = e.axisRanges[axis.options.name],
                selection = chart._selection,
                selectionDuration = duration(
                    axis.options.min, axis.options.max, axis.options.baseUnit
                ),
                from,
                to;

            if (!range || inNavigator) {
                return;
            }

            from = toDate(math.min(
                math.max(groups[0], range.min),
                dataviz.addDuration(
                    dataviz.last(groups), -selectionDuration, baseUnit
                )
            ));

            to = toDate(math.min(
                dataviz.addDuration(from, selectionDuration, baseUnit),
                dataviz.last(navigatorAxis.options.categories)
            ));

            navi.options.select = { from: from, to: to };

            if (navi._realtimeDrag()) {
                navi.applySelection();
                navi.redrawSlaves();
            }

            selection.set(
                lteDateIndex(
                    navigatorAxis.options.categories,
                    from
                ),
                lteDateIndex(
                    navigatorAxis.options.categories,
                    to
            ));

            navi.showHint(from, to);
        },

        _dragEnd: function() {
            var navi = this;

            navi.applySelection();
            navi.redrawSlaves();
            navi.hint.hide();
        },

        _realtimeDrag: function() {
            var support = kendo.support,
                isTouch = support.touch,
                browser = support.browser,
                isFirefox = browser.mozilla,
                isOldIE = browser.msie && browser.version < 9;

            return !isTouch && !isFirefox && !isOldIE;
        },

        readSelection: function() {
            var navi = this,
                axis = navi.mainAxis(),
                groups = axis.options.categories,
                chart = navi.chart,
                selection = chart._selection,
                src = selection.options,
                dst = navi.options.select;

            dst.from = groups[src.from];
            dst.to = groups[src.to];
        },

        indexToDate: function(index) {
            var navi = this,
                axis = navi.mainAxis(),
                groups = axis.options.categories;

            return groups[index];
        },

        applySelection: function() {
            var navi = this,
                select = navi.options.select || {},
                chart = navi.chart,
                slaveAxes = chart.options.categoryAxis,
                i,
                axis;

            for (i = 0; i < slaveAxes.length; i++) {
                axis = slaveAxes[i];
                if (axis.pane !== NAVIGATOR_PANE) {
                    axis.min = select.from;
                    axis.max = select.to;
                }
            }
        },

        redrawSlaves: function() {
            var navi = this,
                chart = navi.chart,
                plotArea = chart._plotArea,
                slavePanes = plotArea.panes.slice(0, -1);

            chart._plotArea.redraw(slavePanes);
        },

        _zoom: function(e) {
            var navi =  this,
                delta = e.delta;

            e.originalEvent.preventDefault();

            if (math.abs(delta) > 1) {
                delta *= ZOOM_ACCELERATION;
            }

            navi._applyZoom(delta);
        },

        _applyZoom: function(delta) {
            var navi = this,
                chart = navi.chart,
                navigatorAxis = navi.mainAxis(),
                axis = chart._plotArea.categoryAxis,
                select = navi.options.select,
                selection = chart._selection,
                selectionLength = selection.options.to - selection.options.from;

            if (selectionLength > 1) {
                selection.expandLeft(delta);
                navi.readSelection();
            } else {
                axis.options.min = select.from;
                select.from = axis.scaleRange(-delta).min;
            }

            if (!kendo.support.touch) {
                navi.applySelection();
                navi.redrawSlaves();
            }
            navi.showHint(navi.options.select.from, navi.options.select.to);

            selection.set(
                lteDateIndex(
                    navigatorAxis.options.categories,
                    navi.options.select.from
                ),
                lteDateIndex(
                    navigatorAxis.options.categories,
                    navi.options.select.to
            ));
        },

        _zoomEnd: function(e) {
            this._dragEnd(e);
        },

        showHint: function(from, to) {
            var navi = this,
                chart = navi.chart,
                plotArea = chart._plotArea;

            navi.hint.show(
                from,
                to,
                plotArea.backgroundBox()
            );
        },

        _select: function(e) {
            var navi = this;

            navi.showHint(
                navi.indexToDate(e.from),
                navi.indexToDate(e.to)
            );
        },

        _selectEnd: function(e) {
            var navi = this;

            navi.hint.hide();
            navi.readSelection();
            navi.applySelection();
            navi.redrawSlaves();
        },

        mainAxis: function() {
            return this.chart._plotArea.namedCategoryAxes[NAVIGATOR_AXIS];
        }
    });

    Navigator.setup = function(options, themeOptions) {
        options = options || {};
        themeOptions = themeOptions || {};

        var naviOptions = deepExtend({}, themeOptions.navigator, options.navigator),
            panes = options.panes = [].concat(options.panes);

        panes.push(deepExtend(
            {}, naviOptions.pane, { name: NAVIGATOR_PANE })
        );

        Navigator.attachAxes(options);
        Navigator.attachSeries(options, naviOptions, themeOptions);
    };

    Navigator.attachAxes = function(options) {
        var categoryAxes,
            valueAxes;

        categoryAxes = options.categoryAxis = [].concat(options.categoryAxis);
        valueAxes = options.valueAxis = [].concat(options.valueAxis);

        var base = {
            type: "date",
            pane: NAVIGATOR_PANE,
            roundToBaseUnit: false,
            justified: true,
            tooltip: { visible: false },
            labels: { step: 1 }
        };

        categoryAxes.push(
            deepExtend({}, base, {
                name: NAVIGATOR_AXIS,
                baseUnit: "fit",
                // TODO: Width based
                maxDateGroups: 200,
                baseUnitStep: "auto",
                labels: { visible: false },
                majorTicks: { visible: false }
            }), deepExtend({}, base, {
                name: NAVIGATOR_AXIS + "_labels",
                // TODO: Width based
                maxDateGroups: 20,
                baseUnitStep: "auto",
                autoBaseUnitSteps: {
                    minutes: [],
                    hours: [1],
                    days: [1],
                    weeks: [],
                    months: [1],
                    years: [1]
                },
                majorTicks: { visible: true }
            }), deepExtend({}, base, {
                name: NAVIGATOR_AXIS + "_ticks",
                // TODO: Width based
                maxDateGroups: 200,
                autoBaseUnitSteps: {
                    minutes: [1],
                    hours: [1],
                    days: [1],
                    weeks: [],
                    months: [1],
                    years: [1]
                },
                majorTicks: {
                    visible: true,
                    width: 0.5
                },
                labels: { visible: false, mirror: true }
            })
        );

        valueAxes.push({
            // TODO: Extend navigaor.valueAxis
            name: NAVIGATOR_AXIS,
            pane: NAVIGATOR_PANE,
            majorGridLines: {
                visible: false
            },
            visible: false
        });
    };

    Navigator.attachSeries = function(options, naviOptions, themeOptions) {
        var series = options.series = options.series || [],
            navigatorSeries = [].concat(naviOptions.series),
            seriesColors = themeOptions.seriesColors,
            defaults = naviOptions.seriesDefaults,
            i;

        for (i = 0; i < navigatorSeries.length; i++) {
            series.push(
                deepExtend({
                    color: seriesColors[i % seriesColors.length],
                    visibleInLegend: false,
                    tooltip: {
                        visible: false
                    }
                }, defaults, navigatorSeries[i], {
                    axis: NAVIGATOR_AXIS,
                    categoryAxis: NAVIGATOR_AXIS
                })
            );
        }
    };

    var NavigatorHint = Class.extend({
        init: function(container, options) {
            var hint = this;

            hint.options = deepExtend({}, hint.options, options);

            hint.container = container;
            hint.chartPadding = {
                top: parseInt(container.css("paddingTop"), 10),
                left: parseInt(container.css("paddingLeft"), 10)
            };

            hint.template = hint.template;
            if (!hint.template) {
                hint.template = hint.template = renderTemplate(
                    "<div class='" + CSS_PREFIX + "navigator-hint' " +
                    "style='display: none; position: absolute; top: 1px; left: 1px;'>" +
                        "<div class='" + CSS_PREFIX + "tooltip'>&nbsp;</div>" +
                        "<div class='" + CSS_PREFIX + "scroll' />" +
                    "</div>"
                );
            }

            hint.element = $(hint.template()).appendTo(container);
        },

        options: {
            format: "{0:d} - {1:d}",
            hideDelay: 500
        },

        show: function(from, to, bbox) {
            var hint = this,
                middle = toDate(toTime(from) + toTime(to - from) / 2),
                options = hint.options,
                text = kendo.format(hint.options.format, from, to),
                tooltip = hint.element.find("." + CSS_PREFIX + "tooltip"),
                scroll = hint.element.find("." + CSS_PREFIX + "scroll"),
                scrollWidth = bbox.width() * 0.4,
                minPos = bbox.center().x - scrollWidth,
                maxPos = bbox.center().x,
                posRange = maxPos - minPos,
                range = options.max - options.min,
                scale = posRange / range,
                offset = middle - options.min;

            if (hint._hideTimeout) {
                clearTimeout(hint._hideTimeout);
            }

            if (!hint._visible) {
                hint.element
                    .stop(false, true)
                    .css("visibility", "hidden")
                    .show();
                hint._visible = true;
            }


            tooltip
                .text(text)
                .css({
                    left: bbox.center().x - tooltip.outerWidth() / 2,
                    top: bbox.y1
                });

            scroll
                .css({
                    width: scrollWidth,
                    left: minPos + offset * scale,
                    top: bbox.y1 +
                         parseInt(tooltip.css("margin-top"), 10) +
                         parseInt(tooltip.css("border-top-width"), 10) +
                         tooltip.height() / 2
                });

            hint.element.css("visibility", "visible");
        },

        hide: function() {
            var hint = this;

            if (hint._hideTimeout) {
                clearTimeout(hint._hideTimeout);
            }

            hint._hideTimeout = setTimeout(function() {
                hint._visible = false;
                hint.element.fadeOut("slow");
            }, hint.options.hideDelay);
        }
    });

    // Exports ================================================================

    dataviz.ui.plugin(StockChart);

    deepExtend(dataviz, {
    });

})(window.kendo.jQuery);
