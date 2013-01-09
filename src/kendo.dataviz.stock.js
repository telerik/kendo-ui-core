kendo_module({
    id: "stock-chart",
    name: "StockChart",
    category: "dataviz",
    description: "StockChart widget and associated financial series.",
    depends: [ "chart" ]
});

(function ($, undefined) {
    // Imports ================================================================
    var kendo = window.kendo,
        Class = kendo.Class,
        Observable = kendo.Observable,
        deepExtend = kendo.deepExtend,
        math = Math,
        proxy = $.proxy,

        dataviz = kendo.dataviz,
        template = kendo.template,
        defined = dataviz.defined,
        Chart = dataviz.ui.Chart,
        Selection = dataviz.Selection,
        addDuration = dataviz.addDuration,
        defined = dataviz.defined,
        duration = dataviz.duration,
        last = dataviz.last,
        lteDateIndex = dataviz.lteDateIndex,
        renderTemplate = dataviz.renderTemplate,
        toDate = dataviz.toDate,
        toTime = dataviz.toTime;

    // Constants =============================================================
    var AUTO_CATEGORY_WIDTH = 28,
        CHANGE = "change",
        CSS_PREFIX = "k-",
        DRAG = "drag",
        DRAG_END = "dragEnd",
        NAVIGATOR_PANE = "_navigator",
        NAVIGATOR_AXIS = NAVIGATOR_PANE,
        SELECT_START = "selectStart",
        SELECT = "select",
        SELECT_END = "selectEnd",
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
                        maxDateGroups: math.floor(width / AUTO_CATEGORY_WIDTH)
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

        _initDataSource: function(userOptions) {
            var options = userOptions || {},
                dataSource = options.dataSource,
                hasServerFiltering = dataSource && dataSource.serverFiltering,
                mainAxis = [].concat(options.categoryAxis)[0],
                naviOptions = options.navigator || {},
                select = naviOptions.select,
                hasSelect = select && select.from && select.to,
                filter,
                dummyAxis;

            if (hasServerFiltering && hasSelect) {
                filter = [].concat(dataSource.filter || []);

                dummyAxis = new dataviz.DateCategoryAxis(deepExtend({
                    baseUnit: "fit"
                }, mainAxis, {
                    categories: [select.from, select.to]
                }));

                dataSource.filter =
                    Navigator.buildFilter(dummyAxis.options.min, select.to)
                    .concat(filter);
            }

            Chart.fn._initDataSource.call(this, userOptions);
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
                },
                hint: {},
                visible: true
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
                navigator.filterAxes();
                Chart.fn._redraw.call(chart);
                navigator.redraw();
            } else {
                navigator.redrawSlaves();
            }
        },

        _onDataChanged: function() {
            var chart = this;

            Chart.fn._onDataChanged.call(chart);
            chart._dataBound = true;
        },

        destroy: function() {
            var chart = this;

            chart._navigator.destroy();

            Chart.fn.destroy.call(chart);
        }
    });

    var Navigator = Observable.extend({
        init: function(chart) {
            var navi = this;

            navi.chart = chart;
            navi.options = deepExtend(navi.options, chart.options.navigator);

            navi._initDataSource();

            if (!defined(navi.options.hint.visible)) {
                navi.options.hint.visible = navi.options.visible;
            }

            chart.bind(DRAG, proxy(navi._drag, navi));
            chart.bind(DRAG_END, proxy(navi._dragEnd, navi));
            chart.bind(ZOOM, proxy(navi._zoom, navi));
            chart.bind(ZOOM_END, proxy(navi._zoomEnd, navi));
        },

        options: { },

        _initDataSource: function() {
            var navi = this,
                options = navi.options,
                autoBind = options.autoBind,
                dsOptions = options.dataSource;

            if(!defined(autoBind)) {
               autoBind = navi.chart.options.autoBind;
            }

            navi._dataChangedHandler = proxy(navi._onDataChanged, navi);

            if (dsOptions) {
                navi.dataSource = kendo.data.DataSource
                    .create(dsOptions)
                    .bind(CHANGE, navi._dataChangedHandler);

                if (autoBind) {
                    navi.dataSource.fetch();
                }
            }
        },

        _onDataChanged: function() {
            var navi = this,
                chart = navi.chart,
                series = chart.options.series,
                seriesIx,
                seriesLength = series.length,
                categoryAxes = chart.options.categoryAxis,
                axisIx,
                axesLength = categoryAxes.length,
                data = navi.dataSource.view(),
                currentSeries,
                currentAxis;

            for (seriesIx = 0; seriesIx < seriesLength; seriesIx++) {
                currentSeries = series[seriesIx];

                if (currentSeries.axis == NAVIGATOR_AXIS && chart.isBindable(currentSeries)) {
                    currentSeries.data = data;
                }
            }

            for (axisIx = 0; axisIx < axesLength; axisIx++) {
                currentAxis = categoryAxes[axisIx];

                if (currentAxis.pane == NAVIGATOR_PANE) {
                    chart._bindCategoryAxis(currentAxis, data);
                }
            }

            if (chart._model) {
               navi._redrawSelf();
               navi.filterAxes();
               navi.redraw();

               if (!chart.options.dataSource || (chart.options.dataSource && chart._dataBound)) {
                   navi.redrawSlaves();
               }
            }
        },

        destroy: function() {
            var navi = this,
                dataSource = navi.dataSource;

            if (dataSource) {
                dataSource.unbind(CHANGE, navi._dataChangeHandler);
            }
        },

        redraw: function() {
            var navi = this,
                chart = navi.chart,
                options = navi.options,
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
                    selectStart: $.proxy(navi._selectStart, navi),
                    select: $.proxy(navi._select, navi),
                    selectEnd: $.proxy(navi._selectEnd, navi),
                    visible: options.visible
                });

                if (options.hint.visible) {
                    navi.hint = new NavigatorHint(chart.element, {
                        min: groups[0],
                        max: dataviz.last(groups),
                        template: options.hint.template,
                        format: options.hint.format
                    });
                }
            }
        },

        _redrawSelf: function(silent) {
            var plotArea = this.chart._plotArea;

            if (plotArea) {
                plotArea.redraw(last(plotArea.panes), silent);
            }
        },

        redrawSlaves: function() {
            var navi = this,
                chart = navi.chart,
                plotArea = chart._plotArea,
                slavePanes = plotArea.panes.slice(0, -1);

            chart._plotArea.redraw(slavePanes);
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
                addDuration(
                    dataviz.last(groups), -selectionDuration, baseUnit
                )
            ));

            to = toDate(math.min(
                addDuration(from, selectionDuration, baseUnit),
                dataviz.last(navigatorAxis.options.categories)
            ));

            navi.options.select = { from: from, to: to };

            if (navi._liveDrag()) {
                navi.filterAxes();
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

            navi.filterAxes();
            navi.filterDataSource();
            navi.redrawSlaves();

            if (navi.hint) {
                navi.hint.hide();
            }
        },

        _liveDrag: function() {
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

        filterAxes: function() {
            var navi = this,
                mainAxis = navi.mainAxis(),
                categories,
                select = navi.options.select || {},
                chart = navi.chart,
                slaveAxes = chart.options.categoryAxis,
                from = select.from,
                to = select.to,
                i,
                axis;

            if (mainAxis) {
                categories = mainAxis.options.categories;
                if (categories.length > 0) {
                    var min = toTime(categories[0]),
                        max = toTime(last(categories));

                    from = toTime(from);
                    if (from < min || from > max) {
                        from = toDate(min);
                    }

                    to = toTime(to);
                    if (to < min || to > max) {
                        to = toDate(max);
                    }
                }
            }

            for (i = 0; i < slaveAxes.length; i++) {
                axis = slaveAxes[i];
                if (axis.pane !== NAVIGATOR_PANE) {
                    axis.min = from;
                    axis.max = to;
                }
            }
        },

        filterDataSource: function() {
            var navi = this,
                select = navi.options.select || {},
                chart = navi.chart,
                chartDataSource = chart.dataSource,
                hasServerFiltering = chartDataSource && chartDataSource.options.serverFiltering,
                transport = chartDataSource.options.transport,
                axisOptions,
                baseUnit;

            if (navi.dataSource && hasServerFiltering && transport) {
                axisOptions = new dataviz.DateCategoryAxis(deepExtend({
                    baseUnit: "fit"
                }, chart.options.categoryAxis[0], {
                    categories: [select.from, select.to]
                })).options;

                baseUnit = transport.read.data.baseUnit = axisOptions.baseUnit;
                chartDataSource.filter(
                    Navigator.buildFilter(
                        addDuration(axisOptions.min, -axisOptions.baseUnitStep, baseUnit),
                        addDuration(axisOptions.max, axisOptions.baseUnitStep, baseUnit)
                    )
                );
            }
        },

        _zoom: function(e) {
            var navi = this,
                chart = navi.chart,
                delta = e.delta,
                navigatorAxis = navi.mainAxis(),
                axis = chart._plotArea.categoryAxis,
                select = navi.options.select,
                selection = chart._selection;

            e.originalEvent.preventDefault();

            if (math.abs(delta) > 1) {
                delta *= ZOOM_ACCELERATION;
            }

            if (selection.options.to - selection.options.from > 1) {
                selection.expandLeft(delta);
                navi.readSelection();
            } else {
                axis.options.min = select.from;
                select.from = axis.scaleRange(-e.delta).min;
            }

            if (!kendo.support.touch) {
                navi.filterAxes();
                navi.redrawSlaves();
            }

            selection.set(
                lteDateIndex(
                    navigatorAxis.options.categories,
                    navi.options.select.from
                ),
                lteDateIndex(
                    navigatorAxis.options.categories,
                    navi.options.select.to
            ));

            navi.showHint(navi.options.select.from, navi.options.select.to);
        },

        _zoomEnd: function(e) {
            this._dragEnd(e);
        },

        showHint: function(from, to) {
            var navi = this,
                chart = navi.chart,
                plotArea = chart._plotArea;

            if (navi.hint) {
                navi.hint.show(
                    from,
                    to,
                    plotArea.backgroundBox()
                );
            }
        },

        _selectStart: function(e) {
            if (this.chart.trigger(SELECT_START, { from: e.from, to: e.to })) {
                e.preventDefault();
            }
        },

        _select: function(e) {
            var navi = this;

            navi.showHint(
                navi.indexToDate(e.from),
                navi.indexToDate(e.to)
            );

            navi.chart.trigger(SELECT, {
                from: e.from,
                to: e.to
            });
        },

        _selectEnd: function(e) {
            var navi = this;

            if (navi.hint) {
                navi.hint.hide();
            }
            navi.readSelection();
            navi.filterAxes();
            navi.filterDataSource();
            navi.redrawSlaves();

            navi.chart.trigger(SELECT_END, {
                from: e.from,
                to: e.to
            });
        },

        mainAxis: function() {
            var plotArea = this.chart._plotArea;

            if (plotArea) {
                return plotArea.namedCategoryAxes[NAVIGATOR_AXIS];
            }
        }
    });

    Navigator.setup = function(options, themeOptions) {
        options = options || {};
        themeOptions = themeOptions || {};

        var naviOptions = deepExtend({}, themeOptions.navigator, options.navigator),
            panes = options.panes = [].concat(options.panes),
            paneOptions = deepExtend({}, naviOptions.pane, { name: NAVIGATOR_PANE });

        if (!naviOptions.visible) {
            paneOptions.visible = false;
            paneOptions.height = 0.1;
        }

        panes.push(paneOptions);

        Navigator.attachAxes(options, naviOptions);
        Navigator.attachSeries(options, naviOptions, themeOptions);
    };

    Navigator.attachAxes = function(options, naviOptions) {
        var categoryAxes,
            valueAxes;

        categoryAxes = options.categoryAxis = [].concat(options.categoryAxis);
        valueAxes = options.valueAxis = [].concat(options.valueAxis);

        var base = {
            type: "date",
            pane: NAVIGATOR_PANE,
            field: naviOptions.dateField,
            roundToBaseUnit: false,
            justified: true,
            tooltip: { visible: false },
            labels: { step: 1 },
            autoBind: !naviOptions.dataSource,
            autoBaseUnitSteps: {
                minutes: [1],
                hours: [1],
                days: [1],
                weeks: [],
                months: [1],
                years: [1]
            },
            _overlap: false
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
                    minutes: []
                },
                majorTicks: { visible: true }
            }), deepExtend({}, base, {
                name: NAVIGATOR_AXIS + "_ticks",
                // TODO: Width based
                maxDateGroups: 200,
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
                    categoryAxis: NAVIGATOR_AXIS,
                    autoBind: !naviOptions.dataSource
                })
            );
        }
    };

    Navigator.buildFilter = function(from, to) {
        return [{
            field: "Date", operator: "gte", value: toDate(from)
        }, {
            field: "Date", operator: "lt", value: toDate(to)
        }];
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
                offset = middle - options.min,
                hintTemplate;

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

            if (options.template) {
                hintTemplate = template(options.template);
                text = hintTemplate({
                    from: from,
                    to: to
                });
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
        Navigator: Navigator
    });

})(window.kendo.jQuery);
