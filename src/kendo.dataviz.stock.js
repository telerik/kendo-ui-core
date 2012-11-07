(function ($, undefined) {
    // Imports ================================================================
    var kendo = window.kendo,
        Class = kendo.Class,
        Widget = kendo.ui.Widget,
        deepExtend = kendo.deepExtend,
        math = Math,

        dataviz = kendo.dataviz,
        Chart = dataviz.ui.Chart,
        DateCategoryAxis = dataviz.DateCategoryAxis,
        Selection = dataviz.Selection,
        duration = dataviz.duration,
        lteDateIndex = dataviz.lteDateIndex,
        renderTemplate = dataviz.renderTemplate,
        toDate = dataviz.toDate,
        toTime = dataviz.toTime;

    // Constants =============================================================
    var AUTO_CATEGORY_WIDTH = 28,
        CSS_PREFIX = "k-",
        NAVIGATOR_PANE = "_navigator",
        NAVIGATOR_AXIS = NAVIGATOR_PANE,
        MOUSEWHEEL_DELAY = 150,
        HINT_DELAY = 1000;

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

            // Add panning support to Axis

            if (kendo.ui.Draggable) {
                if (chart._draggable) {
                    chart._draggable.destroy();
                }

                $(chart._viewElement).kendoDraggable({
                    drag: $.proxy(chart._onDrag, chart),
                    dragstart: $.proxy(chart._onDragStart, chart),
                    dragend: $.proxy(chart._onDragEnd, chart)
                });

                chart._draggable = $(chart._viewElement).data("kendoDraggable");
            }

            // TODO: Cleanup draggable in destroy
        },

        _onDragStart: function(e) {
            var chart = this;
            var primaryAxis = chart._plotArea.categoryAxis;
            var options = primaryAxis.options;
            var coords = chart._eventCoordinates(e);
            var baseUnit = primaryAxis.options.baseUnit;
            var panes = chart._plotArea.panes;
            var inPane = false;

            /*
            for (var i = 0; i < panes.length - 1; i++) {
                if (panes[i].box.containsPoint(coords)) {
                    inPane = true;
                }
            }
           */
          inPane = true

            if (!inPane) {
                e.preventDefault();
                return;
            }

            var range = duration(options.categories[0],
                                dataviz.last(options.categories),
                                baseUnit);

            // TODO: Duplicate from mouseMove
                delete chart._activePoint;
                chart._tooltip.hide();
                chart._highlight.hide();
                chart._suppressHover = true;

            chart._dragState = {
                min: options.min,
                max: options.max,
                range: range,
                scale: primaryAxis.box.width() / range,
                baseUnit: baseUnit
            };
        },

        _onDrag: function(e) {
            var chart = this,
                delta = e.x.startLocation - e.x.location,
                slavePanes = chart._plotArea.panes.slice(0, -1),
                primaryAxis = chart._plotArea.categoryAxis,
                navigatorAxis = chart._plotArea.namedCategoryAxes[NAVIGATOR_AXIS];

                var dragState = chart._dragState,
                baseUnit = dragState.baseUnit;

                var offset = math.round(delta / dragState.scale);

            var rangeStart = toDate(math.min(
                math.max(navigatorAxis.options.categories[0],
                    dataviz.addDuration(dragState.min, offset, baseUnit)
                ),
                dataviz.addDuration(
                    dataviz.last(navigatorAxis.options.categories), -dragState.range, baseUnit
                )
            ));
            var rangeEnd = toDate(math.min(
                dataviz.addDuration(rangeStart, dragState.range, baseUnit),
                dataviz.last(navigatorAxis.options.categories)
            ));

            this._navigator.options.select = {
                from: rangeStart,
                to: rangeEnd
            };

            if (!kendo.support.touch) {
                this._navigator.applySelection();
                this._navigator.redrawSlaves();
            }

            var selection = chart._selection;
            selection.set(
                lteDateIndex(
                    navigatorAxis.options.categories,
                    rangeStart
                ),
                lteDateIndex(
                    navigatorAxis.options.categories,
                    rangeEnd
            ));

            this._navigator.showHint(
                rangeStart,
                rangeEnd
            );
        },

        _onDragEnd: function(e) {
            this._navigator.applySelection();
            this._navigator.redrawSlaves();
            this._navigator.hideHint();
            this._suppressHover = false;
        }
    });

    var Navigator = Class.extend({
        init: function(chart) {
            var navi = this;

            navi.chart = chart;
            navi.options = chart.options.navigator;
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

                var selection = chart._selection = new Selection(chart.element, axis, {
                    from: from,
                    to: to,
                    min: min,
                    max: max,
                    select: $.proxy(navi._select, navi),
                    selectEnd: $.proxy(navi._selectEnd, navi),
                });

                navi.hint = new NavigatorHint(chart.element, { min: groups[0], max: dataviz.last(groups) });
            }

            $(chart.element).bind("DOMMouseScroll mousewheel", $.proxy(navi.onMousewheel, navi));
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
                groups = axis.options.categories,
                chart = navi.chart,
                selection = chart._selection,
                src = selection.options,
                dst = navi.options.select;

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

        onMousewheel: function(e) {
            var navi = this,
                chart = navi.chart,
                selection = chart._selection,
                orgEvent = e.originalEvent,
                delta = 0;

            if (orgEvent.wheelDelta) {
              delta = orgEvent.wheelDelta / 120;
            }

            if (orgEvent.detail) {
              delta = -orgEvent.detail / 3;
            }

            if (selection) {
                selection.expand(delta);
            }

            navi.readSelection();

            if (navi._mwTimeout) {
                clearTimeout(navi._mwTimeout);
            }

            navi._mwTimeout = setTimeout(function() {
                navi.applySelection();
                navi.redrawSlaves();
            }, MOUSEWHEEL_DELAY);

            e.preventDefault();
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

        hideHint: function() {
            this.hint.hide();
        },

        _select: function(e) {
            var navi = this,
                chart = navi.chart,
                plotArea = chart._plotArea;

            this.showHint(
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

        var naviOptions = deepExtend({}, options.navigator, themeOptions.navigator),
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
                    visibleInLegend: false
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
                })

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

})(jQuery);
