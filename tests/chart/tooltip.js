(function() {
    var dataviz = kendo.dataviz;
    var chartElement;
    var plotArea;
    var tooltip;
    var pointMock;
    var TOLERANCE = 1,
        RED = "rgb(255,0,0)",
        GREEN = "rgb(0,255,0)",
        BLUE = "rgb(0,0,255)";


    function destroyTooltip() {
        if (tooltip) {
            tooltip.destroy();
        }

        if (chartElement) {
            chartElement.remove();
        }
    }

    function createPoint(options) {
        pointMock = {
            value: 1,
            box: new dataviz.Box2D(0, 0, 10, 10),
            options: {
                aboveAxis: true,
                color: RED
            },
            series: {
                name: "series",
                labels: {
                    color: GREEN
                }
            },
            category: "category",
            dataItem: {
                field: "value"
            },
            tooltipAnchor: function() {
                return new dataviz.Point2D();
            },
            owner: {
                formatPointValue: function(value, tooltipFormat) {
                    return kendo.dataviz.autoFormat(tooltipFormat, value);
                }
            },
            formatValue: function(format) {
                var point = this;

                return point.owner.formatPointValue(point.value, format);
            }
        };

        kendo.deepExtend(pointMock, options);
    }

    function createPlotArea() {
        plotArea = {
            categoryAxis: {
                pointCategoryIndex: function() {
                },

                getCategory: function() {
                },

                getSlot: function() {
                    return new dataviz.Box2D();
                },

                options: {
                    vertical: false
                }
            }
        };
    }

    (function() {
        var element;

        function createTooltip(options) {
            destroyTooltip();

            chartElement = $("<div id='chart' style='height: 50px;'></div>").appendTo(QUnit.fixture);
            tooltip = new dataviz.Tooltip(chartElement, options);
            element = tooltip.element;
        }

        function showTooltip() {
            tooltip.show(pointMock);
            tooltip.move();
        }

        // ------------------------------------------------------------
        module("Tooltip", {
            setup: function() {
                createTooltip();
                createPoint();
            },
            teardown: destroyTooltip
        });

        test("does not render element initially", function() {
            equal($(".k-chart-tooltip").length, 0);
        });

        test("attaches to body on show", function() {
            showTooltip();

            equal(tooltip.element.parent("body").length, 1);
        });

        test("tooltip is not hidden when moving over the chart", 0, function() {
            showTooltip();

            tooltip.hide = function() {
                ok(false);
            }

            element.trigger($.Event("mouseout", { relatedTarget: chartElement[0] }));
        });

        test("tooltip is not hidden when moving over chart child element", 0, function() {
            showTooltip();

            tooltip.hide = function() {
                ok(false);
            }

            element.trigger($.Event("mouseout", { relatedTarget: $("<div>").appendTo(chartElement)[0] }));
        });

        test("tooltip is hidden when moving out of the chart", function() {
            showTooltip();

            tooltip.hide = function() {
                ok(true);
            }

            element.trigger($.Event("mouseout", { relatedTarget: document.body }));
        });

        test("detaches from body on destroy", function() {
            tooltip.destroy();

            equal($(".k-chart-tooltip").length, 0);
        });

        test("sets k-tooltip class", function(){
            ok(element.hasClass("k-tooltip"));
        });

        test("sets k-chart-tooltip class", function(){
            ok(element.hasClass("k-chart-tooltip"));
        });

        test("renders div with display none attribute", function() {
            ok(element.css("display"), "none");
        });

        test("sets font", function() {
            createTooltip({ font: "16px Tahoma" });
            equal(element.css("fontSize"), "16px");
            equal(element.css("fontFamily"), "Tahoma");
        });

        test("sets series tooltip font", function() {
            createPoint({
                options: {
                    tooltip: {
                        font: "16px Tahoma"
                    }
                }
            });
            showTooltip();
            equal(element.css("fontSize"), "16px");
            equal(element.css("fontFamily"), "Tahoma");
        });

        test("sets border width", function() {
            createTooltip({ border: { width: 1 } });
            equal(element.css("border-top-width"), "1px");
        });

        test("sets opacity", function() {
            createTooltip({ opacity: 0.5 });
            equal(element.css("opacity"), 0.5);
        });

        asyncTest("show displays tooltip for last point with a delay", function() {
            tooltip.show(pointMock);

            setTimeout(function() {
                equal(element.text(), "1");
                start();
            }, 120);
        });

        test("can override border color", function() {
            createTooltip({ border: { color: GREEN } });
            showTooltip();
            equal(element.css("border-top-color").replace(/\s/g, ''), GREEN);
        });

        test("sets border color to current point color", function() {
            showTooltip();
            equal(element.css("border-top-color").replace(/\s/g, ''), RED);
        });

        test("sets border color to current point color even if background is defined", function() {
            createTooltip({ background: GREEN });
            showTooltip();
            equal(element.css("border-top-color").replace(/\s/g, ''), RED);
        });

        test("sets div background", function() {
            tooltip.options.background = BLUE;
            showTooltip();
            equal(element.css("backgroundColor").replace(/\s/g, ''), BLUE);
        });

        test("sets div background from the current point color", function() {
            pointMock.color = BLUE;
            showTooltip();
            equal(element.css("backgroundColor").replace(/\s/g, ''), BLUE);
        });

        test("sets text color", function() {
            createTooltip({ color: GREEN });
            showTooltip();
            equal(element.css("color").replace(/\s/g, ''), GREEN);
        });

        test("applies full label format", function() {
            createTooltip({ format: "{0}%" });
            showTooltip();
            equal(element.text(), "1%");
        });

        test("applies simple label format", function() {
            createTooltip({ format: "p0" });
            showTooltip();
            equal(element.text(), "100 %");
        });

        test("renders template", function() {
            createTooltip({ template: "${value}%" });
            showTooltip();
            equal(element.text(), "1%");
        });

        test("renders compiled template", function() {
            createTooltip({ template: kendo.template("${value}%") });
            showTooltip();
            equal(element.text(), "1%");
        });

        test("renders template when format is set", function() {
            createTooltip({ format: "{0} percent", template: "${value}%" });
            showTooltip();
            equal(element.text(), "1%");
        });

        test("template context has category", function() {
            createTooltip({ template: "${category}" });
            showTooltip();
            equal(element.text(), "category");
        });

        test("template context has series", function() {
            createTooltip({ template: "${series.name}" });
            showTooltip();
            equal(element.text(), "series");
        });

        test("template context has dataItem", function() {
            createTooltip({ template: "${dataItem.field}" });
            showTooltip();
            equal(element.text(), "value");
        });

        test("positions tooltip on anchor", function() {
            tooltip.anchor = new dataviz.Point2D(10, 20);
            tooltip.options.animation.duration = 0;
            tooltip.options.offsetX = 0;
            tooltip.options.offsetY = 0;
            tooltip.move();

            var chartOffset = chartElement.offset();
            var tooltipOffset = tooltip.element.offset();

            equal(tooltipOffset.left, chartOffset.left + tooltip.anchor.x);
            equal(tooltipOffset.top, chartOffset.top + tooltip.anchor.y);
        });

        test("tooltipAnchor receives correct tooltip size", function() {
            createPoint({
                tooltipAnchor: function(width, height) {
                    ok(width > 100);
                    ok(height > 20);
                }
            });

            createTooltip({ template: "<div style='width: 100px; height: 20px;' />"});
            showTooltip();
        });

        test("positions accounts for chart padding", function() {
            createTooltip();
            createPoint();

            chartElement.css({
                "padding-left": "10px",
                "padding-top": "20px"
            });

            tooltip.anchor = new dataviz.Point2D(10, 20);
            tooltip.options.animation.duration = 0;
            tooltip.move();

            var chartOffset = chartElement.offset();
            var tooltipOffset = tooltip.element.offset();

            equal(tooltipOffset.left, chartOffset.left + tooltip.anchor.x + 10);
            equal(tooltipOffset.top, chartOffset.top + tooltip.anchor.y + 20);
        });

        test("applies format from the series", function() {
            createPoint({ options: { tooltip: { format: "{0:C}" } }});
            showTooltip();
            equal(element.text(), "$1.00");
        });

        // ------------------------------------------------------------
        module("Tooltip / currentPosition", {
            setup: function() {
                createTooltip();
                createPoint();
            },
            teardown: destroyTooltip
        });

        test("returns 0 if the tooltip fit in the window", function() {
            var result = tooltip._fit(200, 100, 400);

            equal(result, 0);
        });

        test("if element does not fit right should be position left", function() {
            var result = tooltip._fit(82, 42, 100);

            equal(result, -24);
        });

        test("if element does not fit right and does not fit left should be position right", function() {
            var result = tooltip._fit(42, 42, 100);

            equal(result, 0);
        });

        // ------------------------------------------------------------
        module("Tooltip / Inverse background", {
            setup: function() {
                createTooltip();
                createPoint();
            },
            teardown: destroyTooltip
        });

        test("removes inverse css class if backgorund is bright", function() {
            tooltip.options.background = "#000";
            showTooltip();

            ok(!tooltip.element.hasClass("k-chart-tooltip-inverse"));
        });

        test("sets inverse css class if backgorund is dark", function() {
            tooltip.options.background = "#fff";
            showTooltip();

            ok(tooltip.element.hasClass("k-chart-tooltip-inverse"));
        });

        // ------------------------------------------------------------
        module("Tooltip / Series", {
            setup: function() {
                createTooltip();
            },
            teardown: destroyTooltip
        });

        test("sets border width", function() {
            createPoint({
                options: {
                    tooltip: {
                        border: {
                            width: 2
                        }
                    }
                }
            });
            showTooltip();

            equal(element.css("border-top-width"), "2px");
        });

        test("sets opacity", function() {
            createPoint({
                options: {
                    tooltip: {
                        opacity: 0.5
                    }
                }
            });
            showTooltip();

            equal(element.css("opacity"), 0.5);
        });
    })();

    (function() {

        function createTooltip(options) {
            createPlotArea();
            createPoint({ options: { tooltip: { template: "foo" } } });

            destroyTooltip();

            chartElement = $("<div id='chart'></div>").appendTo(QUnit.fixture);
            tooltip = new dataviz.SharedTooltip(chartElement, plotArea, options);
        }

        function showTooltip() {
            tooltip.showAt([pointMock], new dataviz.Point2D(0, 0));
        }

        // ------------------------------------------------------------
        module("Shared Tooltip", {
            setup: function() {
                createTooltip();
            },
            teardown: destroyTooltip
        });

        test("shows shared tooltip", function() {
            showTooltip();
            ok(tooltip.element.html().indexOf("foo") !== -1);
        });

        test("shows series name in default template", function() {
            showTooltip();
            equal(tooltip.element.find("td").length, 2);
            ok(tooltip.element.html().indexOf("series") !== -1);
        });

        test("shows shared tooltip for series w/o name", function() {
            pointMock.series.name = null;
            showTooltip();
            ok(tooltip.element.html().indexOf("foo") !== -1);
        });

        test("doesn't show empty series name in default template", function() {
            pointMock.series.name = null;
            showTooltip();
            equal(tooltip.element.find("td").length, 1);
        });

        test("tooltip anchor accounts for tooltip height", function() {
            createTooltip({ template: "<div style='width: 100px; height: 20px;' />"});
            showTooltip();
            ok(tooltip.anchor.y < -10);
        });

    })();

    (function() {
        var element;

        function createTooltip(options) {
            createPlotArea();
            createPoint();

            destroyTooltip();

            chartElement = $("<div id='chart'></div>").appendTo(QUnit.fixture);
            tooltip = new dataviz.SparklineSharedTooltip(chartElement, plotArea, options);
        }

        function showTooltip() {
            tooltip.showAt([pointMock], new dataviz.Point2D(0, 0));
            tooltip.move();
        }

        // ------------------------------------------------------------
        module("Sparkline Shared Tooltip", {
            setup: function() {
                createTooltip();
            },
            teardown: destroyTooltip
        });

        test("does not render element initially", function() {
            equal($(".k-chart-tooltip").length, 0);
        });

        test("attaches to body on show", function() {
            showTooltip();

            equal(tooltip.element.parent("body").length, 1);
        });

        test("hides element on hide", function() {
            showTooltip();
            tooltip.hide();

            equal(tooltip.element.css("display"), "none");
        });

        test("detaches from body on destroy", function() {
            tooltip.destroy();

            equal($(".k-chart-tooltip").length, 0);
        });
    })();

})();
