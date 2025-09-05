---
title: StockChart
page_title: Configuration, methods and events of Kendo UI DataViz StockChart
previous_url: /api/javascript/dataviz/stockchart, /api/dataviz/stockchart
res_type: api
---

# kendo.dataviz.ui.StockChart

## Configuration

### dateField `String`*(default: "date")*

The field containing the point date.
It is used as a default `categoryField` for all series.

The data item field value must be either:

* Date instance

* String parsable by `new Date([field value])`

* String in ASP.NET JSON format, i.e. "\/Date(1320825600000-0800)\/"

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dateField: "date",
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), value: 100 },
                { date: new Date("2023/1/2"), value: 105 },
                { date: new Date("2023/1/3"), value: 102 }
            ]
        },
        series: [{
            field: "value",
            type: "line"
        }]
    });
    </script>

### navigator `Object`

The data navigator configuration options.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), value: 100 },
                { date: new Date("2023/1/2"), value: 105 },
                { date: new Date("2023/1/3"), value: 102 }
            ]
        },
        navigator: {
            series: {
                type: "line",
                field: "value"
            }
        },
        series: [{
            field: "value",
            type: "line"
        }]
    });
    </script>

### navigator.categoryAxis `Object`

The category axis configuration options.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), value: 100 },
                { date: new Date("2023/1/2"), value: 105 },
                { date: new Date("2023/1/3"), value: 102 }
            ]
        },
        navigator: {
            categoryAxis: {
                labels: {
                    color: "red"
                },
                background: "#f0f0f0"
            },
            series: {
                type: "line",
                field: "value"
            }
        },
        series: [{
            field: "value",
            type: "line"
        }]
    });
    </script>

### navigator.categoryAxis.autoBaseUnitSteps `Object`

The discrete [navigator.categoryAxis.baseUnitStep](/api/javascript/dataviz/ui/stock-chart#configuration-navigator-categoryAxis.baseUnitStep) values when
either [navigator.categoryAxis.baseUnit](/api/javascript/dataviz/ui/stock-chart#configuration-navigator-categoryAxis.baseUnit) is set to "fit" or
[navigator.categoryAxis.baseUnitStep](/api/javascript/dataviz/ui/stock-chart#configuration-navigator-categoryAxis.baseUnitStep) is set to "auto".

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1 10:30:00"), value: 100 },
                { date: new Date("2023/1/1 10:30:15"), value: 105 },
                { date: new Date("2023/1/1 10:30:30"), value: 102 }
            ]
        },
        navigator: {
            categoryAxis: {
                baseUnit: "auto",
                autoBaseUnitSteps: {
                    seconds: [5, 10, 15, 30, 60],
                    minutes: [1, 2, 5, 15, 30],
                    hours: [1, 2, 4, 6, 12]
                }
            },
            series: {
                type: "line",
                field: "value"
            }
        },
        series: [{
            field: "value",
            type: "line"
        }]
    });
    </script>

### navigator.categoryAxis.autoBaseUnitSteps.seconds `Array` *(default: [1, 2, 5, 15, 30])*

The seconds unit steps.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1 10:30:00"), value: 100 },
                { date: new Date("2023/1/1 10:30:15"), value: 105 },
                { date: new Date("2023/1/1 10:30:30"), value: 102 }
            ]
        },
        navigator: {
            categoryAxis: {
                baseUnit: "auto",
                autoBaseUnitSteps: {
                    seconds: [1, 5, 10, 15, 30, 60]
                }
            },
            series: {
                type: "line",
                field: "value"
            }
        },
        series: [{
            field: "value",
            type: "line"
        }]
    });
    </script>

### navigator.categoryAxis.autoBaseUnitSteps.minutes `Array` *(default: [1, 2, 5, 15, 30])*

The minutes unit steps.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1 10:30:00"), value: 100 },
                { date: new Date("2023/1/1 11:00:00"), value: 105 },
                { date: new Date("2023/1/1 11:30:00"), value: 102 }
            ]
        },
        navigator: {
            categoryAxis: {
                baseUnit: "auto",
                autoBaseUnitSteps: {
                    minutes: [1, 2, 5, 15, 30, 60]
                }
            },
            series: {
                type: "line",
                field: "value"
            }
        },
        series: [{
            field: "value",
            type: "line"
        }]
    });
    </script>

### navigator.categoryAxis.autoBaseUnitSteps.hours `Array` *(default: [1, 2, 3])*

The hours unit steps.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1 10:00:00"), value: 100 },
                { date: new Date("2023/1/1 14:00:00"), value: 105 },
                { date: new Date("2023/1/1 18:00:00"), value: 102 }
            ]
        },
        navigator: {
            categoryAxis: {
                baseUnit: "auto",
                autoBaseUnitSteps: {
                    hours: [1, 2, 4, 6, 8, 12]
                }
            },
            series: {
                type: "line",
                field: "value"
            }
        },
        series: [{
            field: "value",
            type: "line"
        }]
    });
    </script>

### navigator.categoryAxis.autoBaseUnitSteps.days `Array` *(default: [1, 2, 3])*

The days unit steps.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), value: 100 },
                { date: new Date("2023/1/3"), value: 105 },
                { date: new Date("2023/1/5"), value: 102 }
            ]
        },
        navigator: {
            categoryAxis: {
                baseUnit: "auto",
                autoBaseUnitSteps: {
                    days: [1, 2, 3, 5, 7]
                }
            },
            series: {
                type: "line",
                field: "value"
            }
        },
        series: [{
            field: "value",
            type: "line"
        }]
    });
    </script>

### navigator.categoryAxis.autoBaseUnitSteps.weeks `Array` *(default: [1, 2])*

The weeks unit steps.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), value: 100 },
                { date: new Date("2023/1/8"), value: 105 },
                { date: new Date("2023/1/15"), value: 102 }
            ]
        },
        navigator: {
            categoryAxis: {
                baseUnit: "auto",
                autoBaseUnitSteps: {
                    weeks: [1, 2, 4]
                }
            },
            series: {
                type: "line",
                field: "value"
            }
        },
        series: [{
            field: "value",
            type: "line"
        }]
    });
    </script>

### navigator.categoryAxis.autoBaseUnitSteps.months `Array` *(default: [1, 2, 3, 6])*

The months unit steps.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), value: 100 },
                { date: new Date("2023/4/1"), value: 105 },
                { date: new Date("2023/7/1"), value: 102 }
            ]
        },
        navigator: {
            categoryAxis: {
                baseUnit: "auto",
                autoBaseUnitSteps: {
                    months: [1, 2, 3, 6, 12]
                }
            },
            series: {
                type: "line",
                field: "value"
            }
        },
        series: [{
            field: "value",
            type: "line"
        }]
    });
    </script>

### navigator.categoryAxis.autoBaseUnitSteps.years `Array` *(default: [1, 2, 3, 5, 10, 25, 50])*

The years unit steps.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2020/1/1"), value: 100 },
                { date: new Date("2022/1/1"), value: 105 },
                { date: new Date("2024/1/1"), value: 102 }
            ]
        },
        navigator: {
            categoryAxis: {
                baseUnit: "auto",
                autoBaseUnitSteps: {
                    years: [1, 2, 5, 10]
                }
            },
            series: {
                type: "line",
                field: "value"
            }
        },
        series: [{
            field: "value",
            type: "line"
        }]
    });
    </script>

### navigator.categoryAxis.axisCrossingValue `Object|Date|Array`

Category index at which the first value axis crosses this axis (when set as an object).

Category indices at which the value axes cross the category axis (when set as an array).

> set an index greater than or equal to the number of categories to denote the far end of the axis.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), value: 100 },
                { date: new Date("2023/1/2"), value: 105 },
                { date: new Date("2023/1/3"), value: 102 }
            ]
        },
        navigator: {
            categoryAxis: {
                axisCrossingValue: 1
            },
            series: {
                type: "line",
                field: "value"
            }
        },
        series: [{
            field: "value",
            type: "line"
        }]
    });
    </script>

### navigator.categoryAxis.background `String`

The background color of the axis.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), value: 100 },
                { date: new Date("2023/1/2"), value: 105 },
                { date: new Date("2023/1/3"), value: 102 }
            ]
        },
        navigator: {
            categoryAxis: {
                background: "#f0f0f0"
            },
            series: {
                type: "line",
                field: "value"
            }
        },
        series: [{
            field: "value",
            type: "line"
        }]
    });
    </script>

### navigator.categoryAxis.baseUnit `String`

The base time interval for the date axis. The default base unit is determined automatically from the minimum difference
between subsequent categories.

The supported values are:

* "fit"
* "seconds"
* "minutes"
* "hours"
* "days"
* "weeks"
* "months"
* "years"

Setting `baseUnit` to "fit" will set such base unit and [categoryAxis.baseUnitStep](/api/javascript/dataviz/ui/stock-chart#configuration-categoryAxis.baseUnitStep)
that the total number of categories does not exceed [categoryAxis.maxDateGroups](/api/javascript/dataviz/ui/stock-chart#configuration-categoryAxis.maxDateGroups).

Series data is aggregated for the specified base unit using the [series.aggregate](/api/javascript/dataviz/ui/stock-chart#configuration-series.aggregate) function.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1 10:30:00"), value: 100 },
                { date: new Date("2023/1/1 10:31:00"), value: 105 },
                { date: new Date("2023/1/1 10:32:00"), value: 102 }
            ]
        },
        navigator: {
            categoryAxis: {
                baseUnit: "minutes"
            },
            series: {
                type: "line",
                field: "value"
            }
        },
        series: [{
            field: "value",
            type: "line"
        }]
    });
    </script>

### navigator.categoryAxis.baseUnitStep `Object` *(default: 1)*

The step (interval) between categories in base units. Setting it to "auto" will set the step to such value
that the total number of categories does not exceed [categoryAxis.maxDateGroups](/api/javascript/dataviz/ui/stock-chart#configuration-categoryAxis.maxDateGroups).

This option is ignored if [categoryAxis.baseUnit](/api/javascript/dataviz/ui/stock-chart#configuration-categoryAxis.baseUnit) is set to "fit".

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), value: 100 },
                { date: new Date("2023/1/2"), value: 105 },
                { date: new Date("2023/1/3"), value: 102 }
            ]
        },
        navigator: {
            categoryAxis: {
                baseUnit: "days",
                baseUnitStep: 2
            },
            series: {
                type: "line",
                field: "value"
            }
        },
        series: [{
            field: "value",
            type: "line"
        }]
    });
    </script>

### navigator.categoryAxis.color `String`

The color to apply to all axis elements. Accepts a valid CSS color string, including hex and rgb. Can be overridden by [categoryAxis.labels.color](/api/javascript/dataviz/ui/stock-chart#configuration-categoryAxis.labels.color) and
[categoryAxis.line.color](/api/javascript/dataviz/ui/stock-chart#configuration-categoryAxis.line.color).

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), value: 100 },
                { date: new Date("2023/1/2"), value: 105 },
                { date: new Date("2023/1/3"), value: 102 }
            ]
        },
        navigator: {
            categoryAxis: {
                color: "red"
            },
            series: {
                type: "line",
                field: "value"
            }
        },
        series: [{
            field: "value",
            type: "line"
        }]
    });
    </script>

### navigator.categoryAxis.crosshair `Object`

The crosshair configuration options.

> The crosshair is displayed when the [categoryAxis.crosshair.visible](/api/javascript/dataviz/ui/stock-chart#configuration-categoryAxis.crosshair.visible) option is set to `true`.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), value: 100 },
                { date: new Date("2023/1/2"), value: 105 },
                { date: new Date("2023/1/3"), value: 102 }
            ]
        },
        navigator: {
            categoryAxis: {
                crosshair: {
                    visible: true,
                    color: "red",
                    width: 2
                }
            },
            series: {
                type: "line",
                field: "value"
            }
        },
        series: [{
            field: "value",
            type: "line"
        }]
    });
    </script>

### navigator.categoryAxis.crosshair.color `String`

The color of the crosshair. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), value: 100 },
                { date: new Date("2023/1/2"), value: 105 },
                { date: new Date("2023/1/3"), value: 102 }
            ]
        },
        navigator: {
            categoryAxis: {
                crosshair: {
                    visible: true,
                    color: "blue"
                }
            },
            series: {
                type: "line",
                field: "value"
            }
        },
        series: [{
            field: "value",
            type: "line"
        }]
    });
    </script>

### navigator.categoryAxis.crosshair.dashType `string` *(default: "solid")*

The dash type of the crosshair.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), value: 100 },
                { date: new Date("2023/1/2"), value: 105 },
                { date: new Date("2023/1/3"), value: 102 }
            ]
        },
        navigator: {
            categoryAxis: {
                crosshair: {
                    visible: true,
                    dashType: "dash"
                }
            },
            series: {
                type: "line",
                field: "value"
            }
        },
        series: [{
            field: "value",
            type: "line"
        }]
    });
    </script>

### navigator.categoryAxis.crosshair.opacity `Number` *(default: 1)*

The opacity of the crosshair. By default the crosshair is opaque.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), value: 100 },
                { date: new Date("2023/1/2"), value: 105 },
                { date: new Date("2023/1/3"), value: 102 }
            ]
        },
        navigator: {
            categoryAxis: {
                crosshair: {
                    visible: true,
                    opacity: 0.5
                }
            },
            series: {
                type: "line",
                field: "value"
            }
        },
        series: [{
            field: "value",
            type: "line"
        }]
    });
    </script>

### navigator.categoryAxis.crosshair.tooltip `Object`

The crosshair tooltip options.

> The crosshair tooltip is displayed when the [categoryAxis.crosshair.tooltip.visible](/api/javascript/dataviz/ui/stock-chart#configuration-categoryAxis.crosshair.tooltip.visible) option is set to `true`.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), value: 100 },
                { date: new Date("2023/1/2"), value: 105 },
                { date: new Date("2023/1/3"), value: 102 }
            ]
        },
        navigator: {
            categoryAxis: {
                crosshair: {
                    visible: true,
                    tooltip: {
                        visible: true,
                        background: "yellow",
                        color: "black"
                    }
                }
            },
            series: {
                type: "line",
                field: "value"
            }
        },
        series: [{
            field: "value",
            type: "line"
        }]
    });
    </script>

### navigator.categoryAxis.crosshair.tooltip.background `String`

The background color of the tooltip. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), value: 100 },
                { date: new Date("2023/1/2"), value: 105 },
                { date: new Date("2023/1/3"), value: 102 }
            ]
        },
        navigator: {
            categoryAxis: {
                crosshair: {
                    visible: true,
                    tooltip: {
                        visible: true,
                        background: "lightblue"
                    }
                }
            },
            series: {
                type: "line",
                field: "value"
            }
        },
        series: [{
            field: "value",
            type: "line"
        }]
    });
    </script>

### navigator.categoryAxis.crosshair.tooltip.border `Object`

The border options.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), value: 100 },
                { date: new Date("2023/1/2"), value: 105 },
                { date: new Date("2023/1/3"), value: 102 }
            ]
        },
        navigator: {
            categoryAxis: {
                crosshair: {
                    visible: true,
                    tooltip: {
                        visible: true,
                        border: {
                            color: "red",
                            width: 2
                        }
                    }
                }
            },
            series: {
                type: "line",
                field: "value"
            }
        },
        series: [{
            field: "value",
            type: "line"
        }]
    });
    </script>

### navigator.categoryAxis.crosshair.tooltip.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), value: 100 },
                { date: new Date("2023/1/2"), value: 105 },
                { date: new Date("2023/1/3"), value: 102 }
            ]
        },
        navigator: {
            categoryAxis: {
                crosshair: {
                    visible: true,
                    tooltip: {
                        visible: true,
                        border: {
                            color: "green"
                        }
                    }
                }
            },
            series: {
                type: "line",
                field: "value"
            }
        },
        series: [{
            field: "value",
            type: "line"
        }]
    });
    </script>

### navigator.categoryAxis.crosshair.tooltip.border.dashType `String` *(default: "solid")*

This option is ignored and deprecated.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), value: 100 },
                { date: new Date("2023/1/2"), value: 105 },
                { date: new Date("2023/1/3"), value: 102 }
            ]
        },
        navigator: {
            categoryAxis: {
                crosshair: {
                    visible: true,
                    tooltip: {
                        visible: true,
                        border: {
                            dashType: "dash"
                        }
                    }
                }
            },
            series: {
                type: "line",
                field: "value"
            }
        },
        series: [{
            field: "value",
            type: "line"
        }]
    });
    </script>

### navigator.categoryAxis.crosshair.tooltip.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), value: 100 },
                { date: new Date("2023/1/2"), value: 105 },
                { date: new Date("2023/1/3"), value: 102 }
            ]
        },
        navigator: {
            categoryAxis: {
                crosshair: {
                    visible: true,
                    tooltip: {
                        visible: true,
                        border: {
                            width: 3
                        }
                    }
                }
            },
            series: {
                type: "line",
                field: "value"
            }
        },
        series: [{
            field: "value",
            type: "line"
        }]
    });
    </script>

### navigator.categoryAxis.crosshair.tooltip.color `String`

The text color of the tooltip. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date("2016/01/01"),
                open: 41.62,
                high: 41.69,
                low: 39.81,
                close: 40.12,
                volume: 2632000
            }]
        },
        navigator: {
            categoryAxis: {
                crosshair: {
                    visible: true,
                    tooltip: {
                        visible: true,
                        color: "red"
                    }
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.crosshair.tooltip.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The tooltip font.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date("2016/01/01"),
                open: 41.62,
                high: 41.69,
                low: 39.81,
                close: 40.12,
                volume: 2632000
            }]
        },
        navigator: {
            categoryAxis: {
                crosshair: {
                    visible: true,
                    tooltip: {
                        visible: true,
                        font: "14px Arial"
                    }
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.crosshair.tooltip.format `String` *(default: "{0}")*

The format used to display the tooltip. Uses [kendo.format](/api/framework/kendo#methods-format). Contains one placeholder ("{0}") which represents the category value.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date("2016/01/01"),
                open: 41.62,
                high: 41.69,
                low: 39.81,
                close: 40.12,
                volume: 2632000
            }]
        },
        navigator: {
            categoryAxis: {
                crosshair: {
                    visible: true,
                    tooltip: {
                        visible: true,
                        format: "Date: {0:yyyy/MM/dd}"
                    }
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.crosshair.tooltip.padding `Number|Object` *(default: 0)*

The padding of the crosshair tooltip. A numeric value will set all paddings.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date("2016/01/01"),
                open: 41.62,
                high: 41.69,
                low: 39.81,
                close: 40.12,
                volume: 2632000
            }]
        },
        navigator: {
            categoryAxis: {
                crosshair: {
                    visible: true,
                    tooltip: {
                        visible: true,
                        padding: 10
                    }
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.crosshair.tooltip.padding.bottom `Number` *(default: 0)*

The bottom padding of the crosshair tooltip.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date("2016/01/01"),
                open: 41.62,
                high: 41.69,
                low: 39.81,
                close: 40.12,
                volume: 2632000
            }]
        },
        navigator: {
            categoryAxis: {
                crosshair: {
                    visible: true,
                    tooltip: {
                        visible: true,
                        padding: {
                            bottom: 10
                        }
                    }
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.crosshair.tooltip.padding.left `Number` *(default: 0)*

The left padding of the crosshair tooltip.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date("2016/01/01"),
                open: 41.62,
                high: 41.69,
                low: 39.81,
                close: 40.12,
                volume: 2632000
            }]
        },
        navigator: {
            categoryAxis: {
                crosshair: {
                    visible: true,
                    tooltip: {
                        visible: true,
                        padding: {
                            left: 10
                        }
                    }
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.crosshair.tooltip.padding.right `Number` *(default: 0)*

The right padding of the crosshair tooltip.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date("2016/01/01"),
                open: 41.62,
                high: 41.69,
                low: 39.81,
                close: 40.12,
                volume: 2632000
            }]
        },
        navigator: {
            categoryAxis: {
                crosshair: {
                    visible: true,
                    tooltip: {
                        visible: true,
                        padding: {
                            right: 10
                        }
                    }
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.crosshair.tooltip.padding.top `Number` *(default: 0)*

The top padding of the crosshair tooltip.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date("2016/01/01"),
                open: 41.62,
                high: 41.69,
                low: 39.81,
                close: 40.12,
                volume: 2632000
            }]
        },
        navigator: {
            categoryAxis: {
                crosshair: {
                    visible: true,
                    tooltip: {
                        visible: true,
                        padding: {
                            top: 10
                        }
                    }
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.crosshair.tooltip.template `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the tooltip.

The fields which can be used in the template are:

* value - the category value

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date("2016/01/01"),
                open: 41.62,
                high: 41.69,
                low: 39.81,
                close: 40.12,
                volume: 2632000
            }]
        },
        navigator: {
            categoryAxis: {
                crosshair: {
                    visible: true,
                    tooltip: {
                        visible: true,
                        template: (data) => `Value: ${data.value}`
                    }
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.crosshair.tooltip.visible `Boolean` *(default: false)*

If set to `true` the chart will display the category axis crosshair tooltip. By default the category axis crosshair tooltip is not visible.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date("2016/01/01"),
                open: 41.62,
                high: 41.69,
                low: 39.81,
                close: 40.12,
                volume: 2632000
            }]
        },
        navigator: {
            categoryAxis: {
                crosshair: {
                    visible: true,
                    tooltip: {
                        visible: true
                    }
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.crosshair.visible `Boolean` *(default: false)*

If set to `true` the chart will display the category axis crosshair. By default the category axis crosshair is not visible.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date("2016/01/01"),
                open: 41.62,
                high: 41.69,
                low: 39.81,
                close: 40.12,
                volume: 2632000
            }]
        },
        navigator: {
            categoryAxis: {
                crosshair: {
                    visible: true
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.crosshair.width `Number` *(default: 1)*

The width of the crosshair in pixels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date("2016/01/01"),
                open: 41.62,
                high: 41.69,
                low: 39.81,
                close: 40.12,
                volume: 2632000
            }]
        },
        navigator: {
            categoryAxis: {
                crosshair: {
                    visible: true,
                    width: 3
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.field `String`

The data item field which contains the category name. Requires the [dataSource](/api/javascript/dataviz/ui/stock-chart#configuration-dataSource) option to be set.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date("2016/01/01"),
                open: 41.62,
                high: 41.69,
                low: 39.81,
                close: 40.12,
                volume: 2632000
            }]
        },
        navigator: {
            categoryAxis: {
                field: "date"
            }
        }
    });
    </script>

### navigator.categoryAxis.justified `Boolean`

If set to `true` the chart will position categories and series points on major ticks. This removes the empty space before and after the series.

The default value is `false` except for "area" and "verticalArea".

> This option is ignored if the [series.type](/api/javascript/dataviz/ui/stock-chart#configuration-series.type) option is set to "bar", "column", "ohlc" or "candlestick".

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date("2016/01/01"),
                open: 41.62,
                high: 41.69,
                low: 39.81,
                close: 40.12,
                volume: 2632000
            }]
        },
        navigator: {
            categoryAxis: {
                justified: true
            }
        }
    });
    </script>

### navigator.categoryAxis.labels `Object`

The axis labels configuration.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date("2016/01/01"),
                open: 41.62,
                high: 41.69,
                low: 39.81,
                close: 40.12,
                volume: 2632000
            }]
        },
        navigator: {
            categoryAxis: {
                labels: {
                    color: "red",
                    font: "12px Arial"
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.labels.background `String`

The background color of the labels. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date("2016/01/01"),
                open: 41.62,
                high: 41.69,
                low: 39.81,
                close: 40.12,
                volume: 2632000
            }]
        },
        navigator: {
            categoryAxis: {
                labels: {
                    background: "yellow"
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.labels.border `Object`

The border of the labels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date("2016/01/01"),
                open: 41.62,
                high: 41.69,
                low: 39.81,
                close: 40.12,
                volume: 2632000
            }]
        },
        navigator: {
            categoryAxis: {
                labels: {
                    border: {
                        color: "red",
                        width: 1
                    }
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.labels.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date("2016/01/01"),
                open: 41.62,
                high: 41.69,
                low: 39.81,
                close: 40.12,
                volume: 2632000
            }]
        },
        navigator: {
            categoryAxis: {
                labels: {
                    border: {
                        color: "red",
                        width: 1
                    }
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.labels.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date("2016/01/01"),
                open: 41.62,
                high: 41.69,
                low: 39.81,
                close: 40.12,
                volume: 2632000
            }]
        },
        navigator: {
            categoryAxis: {
                labels: {
                    border: {
                        dashType: "dash",
                        width: 1
                    }
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.labels.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date("2016/01/01"),
                open: 41.62,
                high: 41.69,
                low: 39.81,
                close: 40.12,
                volume: 2632000
            }]
        },
        navigator: {
            categoryAxis: {
                labels: {
                    border: {
                        width: 2,
                        color: "red"
                    }
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.labels.color `String`

The text color of the labels. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date("2016/01/01"),
                open: 41.62,
                high: 41.69,
                low: 39.81,
                close: 40.12,
                volume: 2632000
            }]
        },
        navigator: {
            categoryAxis: {
                labels: {
                    color: "blue"
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.labels.culture `String`

The culture to use when formatting date values. See the [globalization overview](/framework/globalization/overview) for more information.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date("2016/01/01"),
                open: 41.62,
                high: 41.69,
                low: 39.81,
                close: 40.12,
                volume: 2632000
            }]
        },
        navigator: {
            categoryAxis: {
                labels: {
                    culture: "en-US"
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.labels.dateFormats `Object`

The format used to display the labels when the categories are dates. Uses [kendo.format](/api/framework/kendo#methods-format). Contains one placeholder ("{0}") which represents the category value.

> The chart will choose the appropriate format for the current [categoryAxis.baseUnit](/api/javascript/dataviz/ui/stock-chart#configuration-categoryAxis.baseUnit). Setting the [categoryAxis.labels.format](/api/javascript/dataviz/ui/stock-chart#configuration-categoryAxis.labels.format) option will override the date formats.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date("2016/01/01"),
                open: 41.62,
                high: 41.69,
                low: 39.81,
                close: 40.12,
                volume: 2632000
            }]
        },
        navigator: {
            categoryAxis: {
                labels: {
                    dateFormats: {
                        days: "dd/MM/yyyy",
                        months: "MMM yyyy"
                    }
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.labels.dateFormats.days `String` *(default: "M/d")*

The format used when [categoryAxis.baseUnit](/api/javascript/dataviz/ui/stock-chart#configuration-categoryAxis.baseUnit) is set to "days".

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date("2016/01/01"),
                open: 41.62,
                high: 41.69,
                low: 39.81,
                close: 40.12,
                volume: 2632000
            }]
        },
        navigator: {
            categoryAxis: {
                baseUnit: "days",
                labels: {
                    dateFormats: {
                        days: "dd/MM/yyyy"
                    }
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.labels.dateFormats.hours `String` *(default: "HH:mm")*

The format used when [categoryAxis.baseUnit](/api/javascript/dataviz/ui/stock-chart#configuration-categoryAxis.baseUnit) is set to "hours".

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date("2016/01/01"),
                open: 41.62,
                high: 41.69,
                low: 39.81,
                close: 40.12,
                volume: 2632000
            }]
        },
        navigator: {
            categoryAxis: {
                baseUnit: "hours",
                labels: {
                    dateFormats: {
                        hours: "HH:mm:ss"
                    }
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.labels.dateFormats.months `String` *(default: "MMM 'yy")*

The format used when [categoryAxis.baseUnit](/api/javascript/dataviz/ui/stock-chart#configuration-categoryAxis.baseUnit) is set to "months".

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date("2016/01/01"),
                open: 41.62,
                high: 41.69,
                low: 39.81,
                close: 40.12,
                volume: 2632000
            }]
        },
        navigator: {
            categoryAxis: {
                baseUnit: "months",
                labels: {
                    dateFormats: {
                        months: "MMMM yyyy"
                    }
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.labels.dateFormats.weeks `String` *(default: "M/d")*

The format used when [categoryAxis.baseUnit](/api/javascript/dataviz/ui/stock-chart#configuration-categoryAxis.baseUnit) is set to "weeks".

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date("2016/01/01"),
                open: 41.62,
                high: 41.69,
                low: 39.81,
                close: 40.12,
                volume: 2632000
            }]
        },
        navigator: {
            categoryAxis: {
                baseUnit: "weeks",
                labels: {
                    dateFormats: {
                        weeks: "dd/MM"
                    }
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.labels.dateFormats.years `String` *(default: "yyyy")*

The format used when [categoryAxis.baseUnit](/api/javascript/dataviz/ui/stock-chart#configuration-categoryAxis.baseUnit) is set to "years".

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date("2016/01/01"),
                open: 41.62,
                high: 41.69,
                low: 39.81,
                close: 40.12,
                volume: 2632000
            }]
        },
        navigator: {
            categoryAxis: {
                baseUnit: "years",
                labels: {
                    dateFormats: {
                        years: "yyyy"
                    }
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.labels.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date("2016/01/01"),
                open: 41.62,
                high: 41.69,
                low: 39.81,
                close: 40.12,
                volume: 2632000
            }]
        },
        navigator: {
            categoryAxis: {
                labels: {
                    font: "14px Arial"
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.labels.format `String` *(default: "{0}")*

The format used to display the labels. Uses [kendo.format](/api/framework/kendo#methods-format). Contains one placeholder ("{0}") which represents the category value.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date("2016/01/01"),
                open: 41.62,
                high: 41.69,
                low: 39.81,
                close: 40.12,
                volume: 2632000
            }]
        },
        navigator: {
            categoryAxis: {
                labels: {
                    format: "MMM yyyy"
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.labels.margin `Number|Object` *(default: 0)*

The margin of the labels. A numeric value will set all margins.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                labels: {
                    margin: 10
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.labels.margin.bottom `Number` *(default: 0)*

The bottom margin of the labels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                labels: {
                    margin: {
                        bottom: 15
                    }
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.labels.margin.left `Number` *(default: 0)*

The left margin of the labels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                labels: {
                    margin: {
                        left: 15
                    }
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.labels.margin.right `Number` *(default: 0)*

The right margin of the labels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                labels: {
                    margin: {
                        right: 15
                    }
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.labels.margin.top `Number` *(default: 0)*

The top margin of the labels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                labels: {
                    margin: {
                        top: 15
                    }
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.labels.mirror `Boolean` *(default: false)*

If set to `true` the chart will mirror the axis labels and ticks. If the labels are normally on the left side of the axis, mirroring the axis will render them to the right.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                labels: {
                    mirror: true
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.labels.padding `Object|Number` *(default: 0)*

The padding of the labels. A numeric value will set all paddings.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                labels: {
                    padding: 10
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.labels.padding.bottom `Number` *(default: 0)*

The bottom padding of the labels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                labels: {
                    padding: {
                        bottom: 8
                    }
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.labels.padding.left `Number` *(default: 0)*

The left padding of the labels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                labels: {
                    padding: {
                        left: 8
                    }
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.labels.padding.right `Number` *(default: 0)*

The right padding of the labels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                labels: {
                    padding: {
                        right: 8
                    }
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.labels.padding.top `Number` *(default: 0)*

The top padding of the labels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                labels: {
                    padding: {
                        top: 8
                    }
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.labels.rotation `Number` *(default: 0)*

The rotation angle of the labels. By default the labels are not rotated.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                labels: {
                    rotation: 45
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.labels.skip `Number` *(default: 0)*

The number of labels to skip. By default no labels are skipped.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                labels: {
                    skip: 2
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) },
                { value: 3, date: new Date(2012, 1, 3) },
                { value: 4, date: new Date(2012, 1, 4) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.labels.step `Number` *(default: 1)*

The label rendering step - render every n-th label. By default every label is rendered.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                labels: {
                    step: 2
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) },
                { value: 3, date: new Date(2012, 1, 3) },
                { value: 4, date: new Date(2012, 1, 4) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.labels.template `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* value - the category value
* dataItem - the data item for the category
* format - the default format of the label
* culture - the default culture (if set) on the label
* index - the 0-based index of the current label
* count - the total number of labels on the axis

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                labels: {
                    template: (data) => `Label: ${data.value}`
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.labels.visible `Boolean` *(default: true)*

If set to `true` the chart will display the category axis labels. By default the category axis labels are visible.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                labels: {
                    visible: false
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.line `Object`

The configuration of the axis lines. Also affects the major and minor ticks, but not the grid lines.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                line: {
                    color: "blue",
                    width: 2
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.line.color `String` *(default: "black")*

The color of the lines. Accepts a valid CSS color string, including hex and rgb.

> Setting the `color` option affects the major and minor ticks, but not the grid lines.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                line: {
                    color: "red"
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.line.dashType `String` *(default: "solid")*

The dash type of the line.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                line: {
                    dashType: "dash"
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) }
            ]
        }]
    });
    </script>
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

### navigator.categoryAxis.line.visible `Boolean` *(default: true)*

If set to `true` the chart will display the category axis lines. By default the category axis lines are visible.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                line: {
                    visible: false
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.line.width `Number` *(default: 1)*

The width of the line in pixels. Also affects the major and minor ticks, but not the grid lines.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                line: {
                    width: 3
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.majorGridLines `Object`

The configuration of the major grid lines. These are the lines that are an extension of the major ticks through the
body of the chart.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                majorGridLines: {
                    color: "blue",
                    visible: true,
                    width: 2
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.majorGridLines.color `String` *(default: "black")*

The color of the major grid lines. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                majorGridLines: {
                    color: "green",
                    visible: true
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.majorGridLines.dashType `String` *(default: "solid")*

The dash type of the major grid lines.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                majorGridLines: {
                    dashType: "dot",
                    visible: true
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.majorGridLines.visible `Boolean` *(default: false)*

If set to `true` the chart will display the major grid lines. By default the major grid lines are visible.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                majorGridLines: {
                    visible: true
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.majorGridLines.width `Number` *(default: 1)*

The width of the category axis major grid lines in pixels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                majorGridLines: {
                    width: 3,
                    visible: true
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.majorGridLines.step `Number` *(default: 1)*

The step of the category axis major grid lines.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                majorGridLines: {
                    step: 2,
                    visible: true
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) },
                { value: 3, date: new Date(2012, 1, 3) },
                { value: 4, date: new Date(2012, 1, 4) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.majorGridLines.skip `Number` *(default: 0)*

The skip of the category axis major grid lines.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                majorGridLines: {
                    skip: 1,
                    visible: true
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) },
                { value: 3, date: new Date(2012, 1, 3) },
                { value: 4, date: new Date(2012, 1, 4) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.majorTicks `Object`

The configuration of the category axis major ticks.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                majorTicks: {
                    color: "blue",
                    size: 10
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.majorTicks.color `String` *(default: "black")*

The color of the category axis major ticks lines. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                majorTicks: {
                    color: "red"
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.majorTicks.size `Number` *(default: 4)*

The length of the tick line in pixels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                majorTicks: {
                    size: 10
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.majorTicks.visible `Boolean` *(default: true)*

If set to `true` the chart will display the category axis major ticks. By default the category axis major ticks are visible.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                majorTicks: {
                    visible: false
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.majorTicks.width `Number` *(default: 1)*

The width of the major ticks in pixels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                majorTicks: {
                    width: 3
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.majorTicks.step `Number` *(default: 1)*

The step of the category axis major ticks.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                majorTicks: {
                    step: 2
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) },
                { value: 3, date: new Date(2012, 1, 3) },
                { value: 4, date: new Date(2012, 1, 4) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.majorTicks.skip `Number` *(default: 0)*

The skip of the category axis major ticks.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                majorTicks: {
                    skip: 1
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) },
                { value: 3, date: new Date(2012, 1, 3) },
                { value: 4, date: new Date(2012, 1, 4) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.max `Object`

The last date displayed on the category date axis. By default, the minimum date is the same as the last category.
This is often used in combination with the [categoryAxis.min](/api/javascript/dataviz/ui/stock-chart#configuration-categoryAxis.min) and [categoryAxis.roundToBaseUnit](/api/javascript/dataviz/ui/stock-chart#configuration-categoryAxis.roundToBaseUnit) options to
set up a fixed date range.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                max: new Date(2012, 1, 10)
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 5) },
                { value: 3, date: new Date(2012, 1, 15) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.maxDateGroups `Number` *(default: 10)*

The maximum number of groups (categories) to display when
[categoryAxis.baseUnit](/api/javascript/dataviz/ui/stock-chart#configuration-categoryAxis.baseUnit) is set to "fit" or
[categoryAxis.baseUnitStep](/api/javascript/dataviz/ui/stock-chart#configuration-categoryAxis.baseUnitStep) is set to "auto".

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                maxDateGroups: 5
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) },
                { value: 3, date: new Date(2012, 1, 3) },
                { value: 4, date: new Date(2012, 1, 4) },
                { value: 5, date: new Date(2012, 1, 5) },
                { value: 6, date: new Date(2012, 1, 6) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.maxDivisions `Number`

The maximum number of ticks and labels to display.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                maxDivisions: 5
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) },
                { value: 3, date: new Date(2012, 1, 3) },
                { value: 4, date: new Date(2012, 1, 4) },
                { value: 5, date: new Date(2012, 1, 5) },
                { value: 6, date: new Date(2012, 1, 6) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.min `Object`

The first date displayed on the category date axis. By default, the minimum date is the same as the first category.
This is often used in combination with the [categoryAxis.min](/api/javascript/dataviz/ui/stock-chart#configuration-categoryAxis.min) and [categoryAxis.roundToBaseUnit](/api/javascript/dataviz/ui/stock-chart#configuration-categoryAxis.roundToBaseUnit) options to
set up a fixed date range.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                min: new Date(2012, 1, 5)
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 5) },
                { value: 3, date: new Date(2012, 1, 15) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.minorGridLines `Object`

The configuration of the minor grid lines. These are the lines that are an extension of the minor ticks through the
body of the chart.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                minorGridLines: {
                    color: "lightgray",
                    visible: true
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.minorGridLines.color `String` *(default: "black")*

The color of the minor grid lines. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                minorGridLines: {
                    color: "gray",
                    visible: true
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.minorGridLines.dashType `String` *(default: "solid")*

The dash type of the minor grid lines.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                minorGridLines: {
                    dashType: "dot",
                    visible: true
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.minorGridLines.visible `Boolean` *(default: false)*

If set to `true` the chart will display the minor grid lines. By default the minor grid lines are visible.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                minorGridLines: {
                    visible: true
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.minorGridLines.width `Number` *(default: 1)*

The width of the category axis minor grid lines in pixels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                minorGridLines: {
                    width: 2,
                    visible: true
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.minorGridLines.step `Number` *(default: 1)*

The step of the category axis minor grid lines.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                minorGridLines: {
                    step: 2,
                    visible: true
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) },
                { value: 3, date: new Date(2012, 1, 3) },
                { value: 4, date: new Date(2012, 1, 4) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.minorGridLines.skip `Number` *(default: 0)*

The skip of the category axis minor grid lines.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                minorGridLines: {
                    skip: 1,
                    visible: true
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) },
                { value: 3, date: new Date(2012, 1, 3) },
                { value: 4, date: new Date(2012, 1, 4) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.minorTicks `Object`

The configuration of the category axis minor ticks.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                minorTicks: {
                    color: "blue",
                    size: 6
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.minorTicks.color `String` *(default: "black")*

The color of the category axis minor ticks lines. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                minorTicks: {
                    color: "green"
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.minorTicks.size `Number` *(default: 4)*

The length of the tick line in pixels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                minorTicks: {
                    size: 8
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.minorTicks.visible `Boolean` *(default: true)*

If set to `true` the chart will display the category axis minor ticks. By default the category axis minor ticks are visible.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                minorTicks: {
                    visible: false
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.minorTicks.width `Number` *(default: 1)*

The width of the minor ticks in pixels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                minorTicks: {
                    width: 2
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.minorTicks.step `Number` *(default: 1)*

The step of the category axis minor ticks.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                minorTicks: {
                    step: 2
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) },
                { value: 3, date: new Date(2012, 1, 3) },
                { value: 4, date: new Date(2012, 1, 4) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.minorTicks.skip `Number` *(default: 0)*

The skip of the category axis minor ticks.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                minorTicks: {
                    skip: 1
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) },
                { value: 3, date: new Date(2012, 1, 3) },
                { value: 4, date: new Date(2012, 1, 4) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.plotBands `Array`

The plot bands of the category axis.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                plotBands: [{
                    from: new Date(2012, 1, 2),
                    to: new Date(2012, 1, 4),
                    color: "lightblue",
                    opacity: 0.5
                }]
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) },
                { value: 3, date: new Date(2012, 1, 3) },
                { value: 4, date: new Date(2012, 1, 4) },
                { value: 5, date: new Date(2012, 1, 5) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.plotBands.color `String`

The color of the plot band.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                plotBands: [{
                    from: new Date(2012, 1, 2),
                    to: new Date(2012, 1, 4),
                    color: "yellow"
                }]
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) },
                { value: 3, date: new Date(2012, 1, 3) },
                { value: 4, date: new Date(2012, 1, 4) },
                { value: 5, date: new Date(2012, 1, 5) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.plotBands.from `Number`

The start position of the plot band in axis units.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                plotBands: [{
                    from: new Date(2012, 1, 2),
                    to: new Date(2012, 1, 4),
                    color: "lightgray"
                }]
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) },
                { value: 3, date: new Date(2012, 1, 3) },
                { value: 4, date: new Date(2012, 1, 4) },
                { value: 5, date: new Date(2012, 1, 5) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.plotBands.opacity `Number`

The opacity of the plot band.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                plotBands: [{
                    from: new Date(2012, 1, 2),
                    to: new Date(2012, 1, 4),
                    color: "blue",
                    opacity: 0.3
                }]
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) },
                { value: 3, date: new Date(2012, 1, 3) },
                { value: 4, date: new Date(2012, 1, 4) },
                { value: 5, date: new Date(2012, 1, 5) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.plotBands.to `Number`

The end position of the plot band in axis units.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                plotBands: [{
                    from: new Date(2012, 1, 2),
                    to: new Date(2012, 1, 4),
                    color: "orange"
                }]
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) },
                { value: 3, date: new Date(2012, 1, 3) },
                { value: 4, date: new Date(2012, 1, 4) },
                { value: 5, date: new Date(2012, 1, 5) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.reverse `Boolean` *(default: false)*

If set to `true` the category axis direction will be reversed. By default categories are listed from left to right and from bottom to top.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                reverse: true
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
                { value: 1, date: new Date(2012, 1, 1) },
                { value: 2, date: new Date(2012, 1, 2) },
                { value: 3, date: new Date(2012, 1, 3) },
                { value: 4, date: new Date(2012, 1, 4) }
            ]
        }]
    });
    </script>

### navigator.categoryAxis.roundToBaseUnit `Boolean` *(default: true)*

If set to `true` the chart will round the first and last date to the nearest base unit.

The `roundToBaseUnit` option will be ignored if [series.type](/api/javascript/dataviz/ui/stock-chart#configuration-series.type) is set to "bar", "column", "ohlc" or "candlestick".

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                roundToBaseUnit: false
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.title `Object`

The title configuration of the category axis.

> The [categoryAxis.title.text](/api/javascript/dataviz/ui/stock-chart#configuration-categoryAxis.title.text) option must be set in order to display the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                title: {
                    text: "Time Period",
                    color: "blue",
                    font: "16px Arial"
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>


### navigator.categoryAxis.title.background `String`

The background color of the title. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                title: {
                    text: "Time Period",
                    background: "lightblue"
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.title.border `Object`

The border of the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                title: {
                    text: "Time Period",
                    border: {
                        color: "red",
                        width: 2
                    }
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.title.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                title: {
                    text: "Time Period",
                    border: {
                        color: "green",
                        width: 1
                    }
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.title.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                title: {
                    text: "Time Period",
                    border: {
                        color: "blue",
                        width: 2,
                        dashType: "dash"
                    }
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.title.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                title: {
                    text: "Time Period",
                    border: {
                        color: "black",
                        width: 3
                    }
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.title.color `String`

The text color of the title. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                title: {
                    text: "Time Period",
                    color: "red"
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.title.font `String` *(default: "16px Arial,Helvetica,sans-serif")*

The font style of the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                title: {
                    text: "Time Period",
                    font: "18px bold Verdana"
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.title.margin `Number|Object` *(default: 5)*

The margin of the title. A numeric value will set all margins.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                title: {
                    text: "Time Period",
                    margin: {
                        top: 10,
                        bottom: 10,
                        left: 5,
                        right: 5
                    }
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.title.margin.bottom `Number` *(default: 0)*

The bottom margin of the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                title: {
                    text: "Time Period",
                    margin: {
                        bottom: 15
                    }
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.title.margin.left `Number` *(default: 0)*

The left margin of the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                title: {
                    text: "Time Period",
                    margin: {
                        left: 20
                    }
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.title.margin.right `Number` *(default: 0)*

The right margin of the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                title: {
                    text: "Time Period",
                    margin: {
                        right: 25
                    }
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.title.margin.top `Number` *(default: 0)*

The top margin of the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                title: {
                    text: "Time Period",
                    margin: {
                        top: 30
                    }
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.title.padding `Number|Object` *(default: 0)*

The padding of the title. A numeric value will set all paddings.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                title: {
                    text: "Time Period",
                    padding: {
                        top: 8,
                        bottom: 8,
                        left: 12,
                        right: 12
                    }
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.title.padding.bottom `Number` *(default: 0)*

The bottom padding of the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                title: {
                    text: "Time Period",
                    padding: {
                        bottom: 10
                    }
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.title.padding.left `Number` *(default: 0)*

The left padding of the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                title: {
                    text: "Time Period",
                    padding: {
                        left: 15
                    }
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.title.padding.right `Number` *(default: 0)*

The right padding of the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                title: {
                    text: "Time Period",
                    padding: {
                        right: 20
                    }
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.title.padding.top `Number` *(default: 0)*

The top padding of the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                title: {
                    text: "Time Period",
                    padding: {
                        top: 12
                    }
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.title.position `String` *(default: "center")*

The position of the title.

The supported values are:

* "top" - the axis title is positioned on the top (applicable to vertical axis)
* "bottom" - the axis title is positioned on the bottom (applicable to vertical axis)
* "left" - the axis title is positioned on the left (applicable to horizontal axis)
* "right" - the axis title is positioned on the right (applicable to horizontal axis)
* "center" - the axis title is positioned in the center

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                title: {
                    text: "Time Period",
                    position: "center"
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.title.rotation `Number` *(default: 0)*

The rotation angle of the title. By default the title is not rotated.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                title: {
                    text: "Time Period",
                    rotation: 45
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.title.text `String`

The text of the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                title: {
                    text: "Date Range"
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.title.visible `Boolean` *(default: true)*

If set to `true` the chart will display the category axis title. By default the category axis title is visible.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                title: {
                    text: "Time Period",
                    visible: false
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.visible `Boolean` *(default: true)*

If set to `true` the chart will display the category axis. By default the category axis is visible.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                visible: false
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

If set to `true` the chart will display the category axis. By default the category axis is visible.

### navigator.categoryAxis.weekStartDay `Number` *(default: kendo.days.Sunday)*

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                baseUnit: "weeks",
                weekStartDay: kendo.days.Monday
            }
        }
    });
    </script>

### navigator.categoryAxis.weekStartDay `Number` *(default: kendo.days.Sunday)*

The week start day when [categoryAxis.baseUnit](/api/javascript/dataviz/ui/stock-chart#configuration-categoryAxis.baseUnit) is set to "weeks".

The supported values are:

* kendo.days.Sunday - equal to 0
* kendo.days.Monday - equal to 1
* kendo.days.Tuesday - equal to 2
* kendo.days.Wednesday - equal to 3
* kendo.days.Thursday - equal to 4
* kendo.days.Friday - equal to 5
* kendo.days.Saturday - equal to 6

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                baseUnit: "weeks",
                weekStartDay: kendo.days.Monday
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.notes `Object`

The category axis notes configuration.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    position: "top",
                    icon: {
                        background: "red",
                        size: 10
                    },
                    label: {
                        text: "Important Date"
                    },
                    data: [{
                        value: new Date("2012/01/15"),
                        text: "Event"
                    }]
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.notes.icon `Object`

The icon of the notes.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    icon: {
                        background: "red",
                        size: 10,
                        type: "circle",
                        border: {
                            color: "blue",
                            width: 2
                        }
                    },
                    data: [{
                        value: new Date("2012/01/15"),
                        text: "Note"
                    }]
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.notes.position `String`

The position of the category axis note.

* "top" - The note is positioned on the top.
* "bottom" - The note is positioned on the bottom.
* "left" - The note is positioned on the left.
* "right" - The note is positioned on the right.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    position: "top",
                    data: [{
                        value: new Date("2012/01/15"),
                        text: "Top positioned note"
                    }]
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.notes.icon.background `String`

The background color of the notes icon.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    icon: {
                        background: "red"
                    },
                    data: [{
                        value: new Date("2012/01/15"),
                        text: "Note"
                    }]
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.notes.icon.border `Object`

The border of the icon.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    icon: {
                        border: {
                            color: "blue",
                            width: 2
                        }
                    },
                    data: [{
                        value: new Date("2012/01/15"),
                        text: "Note"
                    }]
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.notes.icon.border.color `String`

The border color of the icon.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    icon: {
                        border: {
                            color: "blue"
                        }
                    },
                    data: [{
                        value: new Date("2012/01/15"),
                        text: "Note"
                    }]
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.notes.icon.border.width `Number`

The border width of the icon.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    icon: {
                        border: {
                            width: 2
                        }
                    },
                    data: [{
                        value: new Date("2012/01/15"),
                        text: "Note"
                    }]
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.notes.icon.size `Number`

The size of the icon.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    icon: {
                        size: 15
                    },
                    data: [{
                        value: new Date("2012/01/15"),
                        text: "Note"
                    }]
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.notes.icon.type `String` *(default: "circle")*

The icon shape.

The supported values are:
* "circle" - the marker shape is circle.
* "square" - the marker shape is square.
* "triangle" - the marker shape is triangle.
* "cross" - the marker shape is cross.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    icon: {
                        type: "square"
                    },
                    data: [{
                        value: new Date("2012/01/15"),
                        text: "Note"
                    }]
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.notes.icon.visible `Boolean` *(default: "true")*

The icon visibility.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    icon: {
                        visible: false
                    },
                    data: [{
                        value: new Date("2012/01/15"),
                        text: "Note"
                    }]
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.notes.label `Object`

The label of the notes.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    label: {
                        background: "red",
                        color: "white",
                        font: "12px Arial",
                        format: "{0:d}",
                        visible: true
                    },
                    data: [{
                        value: new Date("2012/01/15"),
                        text: "Note"
                    }]
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.notes.label.background `String`

The background color of the label. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    label: {
                        background: "yellow"
                    },
                    data: [{
                        value: new Date("2012/01/15"),
                        text: "Note"
                    }]
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.notes.label.border `Object`

The border of the label.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    label: {
                        border: {
                            color: "blue",
                            dashType: "dash",
                            width: 2
                        }
                    },
                    data: [{
                        value: new Date("2012/01/15"),
                        text: "Note"
                    }]
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.notes.label.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    label: {
                        border: {
                            color: "red"
                        }
                    },
                    data: [{
                        value: new Date("2012/01/15"),
                        text: "Note"
                    }]
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.notes.label.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    label: {
                        border: {
                            dashType: "dash"
                        }
                    },
                    data: [{
                        value: new Date("2012/01/15"),
                        text: "Note"
                    }]
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.notes.label.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    label: {
                        border: {
                            width: 2
                        }
                    },
                    data: [{
                        value: new Date("2012/01/15"),
                        text: "Note"
                    }]
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.notes.label.color `String`

The text color of the label. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    label: {
                        color: "red"
                    },
                    data: [{
                        value: new Date("2012/01/15"),
                        text: "Note"
                    }]
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.notes.label.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the label.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    label: {
                        font: "14px Arial"
                    },
                    data: [{
                        value: new Date("2012/01/15"),
                        text: "Note"
                    }]
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.notes.label.template `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* value - the category value

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    label: {
                        template: (data) => `Date: ${kendo.toString(data.value, "dd/MM/yyyy")}`
                    },
                    data: [{
                        value: new Date("2012/01/15"),
                        text: "Note"
                    }]
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.notes.label.visible `Boolean` *(default: true)*

If set to `true` the chart will display the category notes label. By default the category notes label are visible.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    label: {
                        visible: false
                    },
                    data: [{
                        value: new Date("2012/01/15"),
                        text: "Note"
                    }]
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.notes.label.rotation `Number` *(default: 0)*

The rotation angle of the label. By default the label are not rotated.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    label: {
                        rotation: 45
                    },
                    data: [{
                        value: new Date("2012/01/15"),
                        text: "Note"
                    }]
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.notes.label.format `String` *(default: "{0}")*

The format used to display the notes label. Uses [kendo.format](/api/framework/kendo#methods-format). Contains one placeholder ("{0}") which represents the category value.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    label: {
                        format: "Date: {0:d}"
                    },
                    data: [{
                        value: new Date("2012/01/15"),
                        text: "Note"
                    }]
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.notes.label.position `String` *(default: "inside")*

The position of the labels.

* "inside" - the label is positioned inside of the icon.
* "outside" - the label is positioned outside of the icon.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    label: {
                        position: "outside"
                    },
                    data: [{
                        value: new Date("2012/01/15"),
                        text: "Note"
                    }]
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.notes.line `Object`

The line of the notes.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    line: {
                        width: 3,
                        color: "red",
                        length: 20
                    },
                    data: [{
                        value: new Date("2012/01/15"),
                        text: "Note"
                    }]
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.notes.line.width `Number`

The line width of the notes.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    line: {
                        width: 3
                    },
                    data: [{
                        value: new Date("2012/01/15"),
                        text: "Note"
                    }]
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.notes.line.color `String`

The line color of the notes.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    line: {
                        color: "red"
                    },
                    data: [{
                        value: new Date("2012/01/15"),
                        text: "Note"
                    }]
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.notes.line.length `Number`

The length of the connecting lines in pixels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    line: {
                        length: 30
                    },
                    data: [{
                        value: new Date("2012/01/15"),
                        text: "Note"
                    }]
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.notes.data `Array`

The items of the notes.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    data: [{
                        value: new Date("2012/01/15"),
                        text: "Important event"
                    }, {
                        value: new Date("2012/01/25"),
                        text: "Another event"
                    }]
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.notes.data.value `Object`

The value of the note.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    data: [{
                        value: new Date("2012/01/15"),
                        text: "Event at this date"
                    }]
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.notes.data.position `String` *(default: "inside")*

The position of the category axis note.

* "top" - The note is positioned on the top.
* "bottom" - The note is positioned on the bottom.
* "left" - The note is positioned on the left.
* "right" - The note is positioned on the right.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    data: [{
                        value: new Date("2012/01/15"),
                        position: "top",
                        text: "Top positioned note"
                    }]
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.notes.data.icon `Object`

The icon of the note.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    data: [{
                        value: new Date("2012/01/15"),
                        icon: {
                            background: "red",
                            size: 15,
                            type: "circle"
                        },
                        text: "Note"
                    }]
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.notes.data.icon.background `String`

The background color of the note icon.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    data: [{
                        value: new Date("2012/01/15"),
                        icon: {
                            background: "blue"
                        },
                        text: "Note"
                    }]
                }
            }
        },
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), value: 1 },
                { date: new Date("2012/01/15"), value: 2 },
                { date: new Date("2012/02/01"), value: 3 }
            ]
        },
        dateField: "date",
        valueField: "value"
    });
    </script>

### navigator.categoryAxis.notes.data.icon.border `Object`

The border of the icon.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    data: [{
                        value: new Date("2012/01/01"),
                        icon: {
                            border: {
                                width: 2,
                                color: "red"
                            }
                        }
                    }]
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.notes.data.icon.border.color `String`

The border color of the icon.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    data: [{
                        value: new Date("2012/01/01"),
                        icon: {
                            border: {
                                color: "blue"
                            }
                        }
                    }]
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.notes.data.icon.border.width `Number`

The border width of the icon.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    data: [{
                        value: new Date("2012/01/01"),
                        icon: {
                            border: {
                                width: 3
                            }
                        }
                    }]
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.notes.data.icon.size `Number`

The size of the icon.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    data: [{
                        value: new Date("2012/01/01"),
                        icon: {
                            size: 20
                        }
                    }]
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.notes.data.icon.type `String` *(default: "circle")*

The icon shape.

The supported values are:
* "circle" - the marker shape is circle.
* "square" - the marker shape is square.
* "triangle" - the marker shape is triangle.
* "cross" - the marker shape is cross.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    data: [{
                        value: new Date("2012/01/01"),
                        icon: {
                            type: "square"
                        }
                    }]
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.notes.data.icon.visible `Boolean` *(default: "true")*

The icon visibility.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    data: [{
                        value: new Date("2012/01/01"),
                        icon: {
                            visible: false
                        }
                    }]
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.notes.data.label `Object`

The label of the note.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    data: [{
                        value: new Date("2012/01/01"),
                        label: {
                            text: "Important Date"
                        }
                    }]
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.notes.data.label.background `String`

The background color of the label. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    data: [{
                        value: new Date("2012/01/01"),
                        label: {
                            background: "yellow"
                        }
                    }]
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.notes.data.label.border `Object`

The border of the label.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    data: [{
                        value: new Date("2012/01/01"),
                        label: {
                            border: {
                                width: 2,
                                color: "red"
                            }
                        }
                    }]
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.notes.data.label.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    data: [{
                        value: new Date("2012/01/01"),
                        label: {
                            border: {
                                color: "green"
                            }
                        }
                    }]
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.notes.data.label.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    data: [{
                        value: new Date("2012/01/01"),
                        label: {
                            border: {
                                dashType: "dash"
                            }
                        }
                    }]
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.notes.data.label.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    data: [{
                        value: new Date("2012/01/01"),
                        label: {
                            border: {
                                width: 2
                            }
                        }
                    }]
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.notes.data.label.color `String`

The text color of the note label. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    data: [{
                        value: new Date("2012/01/01"),
                        label: {
                            color: "red"
                        }
                    }]
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.notes.data.label.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the note label.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    data: [{
                        value: new Date("2012/01/01"),
                        label: {
                            font: "16px Verdana"
                        }
                    }]
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.notes.data.label.template `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* value - the category value

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    data: [{
                        value: new Date("2012/01/01"),
                        label: {
                            template: (data) => `Note: ${kendo.toString(data.value, "yyyy-MM-dd")}`
                        }
                    }]
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.notes.data.label.visible `Boolean` *(default: true)*

If set to `true` the chart will display the category notes label. By default the category notes label are visible.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    data: [{
                        value: new Date("2012/01/01"),
                        label: {
                            visible: false
                        }
                    }]
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.notes.data.label.rotation `Number` *(default: 0)*

The rotation angle of the label. By default the label are not rotated.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    data: [{
                        value: new Date("2012/01/01"),
                        label: {
                            rotation: 45
                        }
                    }]
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.notes.data.label.format `String` *(default: "{0}")*

The format used to display the note label. Uses [kendo.format](/api/framework/kendo#methods-format). Contains one placeholder ("{0}") which represents the category value.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    data: [{
                        value: new Date("2012/01/01"),
                        label: {
                            format: "Date: {0:yyyy-MM-dd}"
                        }
                    }]
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.notes.data.label.text `String`

The label note text.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    data: [{
                        value: new Date("2012/01/01"),
                        label: {
                            text: "Important milestone"
                        }
                    }]
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.notes.data.label.position `String` *(default: "inside")*

The position of the category axis note label.

* "inside" - the label is positioned inside of the icon.
* "outside" - the label is positioned outside of the icon.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    data: [{
                        value: new Date("2012/01/01"),
                        label: {
                            position: "outside"
                        }
                    }]
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.notes.data.line `Object`

The line of the note.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    data: [{
                        value: new Date("2012/01/01"),
                        line: {
                            width: 2,
                            color: "red",
                            length: 20
                        }
                    }]
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.notes.data.line.width `Number`

The line width of the note.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    data: [{
                        value: new Date("2012/01/01"),
                        line: {
                            width: 3
                        }
                    }]
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.notes.data.line.color `String`

The line color of the note.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    data: [{
                        value: new Date("2012/01/01"),
                        line: {
                            color: "blue"
                        }
                    }]
                }
            }
        }
    });
    </script>

### navigator.categoryAxis.notes.data.line.length `Number`

The length of the connecting lines in pixels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            categoryAxis: {
                notes: {
                    data: [{
                        value: new Date("2012/01/01"),
                        line: {
                            length: 25
                        }
                    }]
                }
            }
        }
    });
    </script>

### navigator.dataSource `Object`

Navigator DataSource configuration or instance.

When the navigator is bound via its own data source,
it will automatically set "from" and "to" filters on the main data source.

This, in conjunction with server filtering, allows you to visualize large data sets
without loading them at once.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), price: 10 },
                { date: new Date("2012/01/02"), price: 15 }
            ]
        },
        navigator: {
            dataSource: {
                data: [
                    { date: new Date("2012/01/01"), volume: 1000 },
                    { date: new Date("2012/01/02"), volume: 1500 }
                ]
            }
        }
    });
    </script>

```pseudo
    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            transport: {
                 read: "/stock/detail"
            },
            serverFiltering: true
        },
        navigator: {
            dataSource: {
                transport: {
                    //read: "/stock/volume" 
                }
            }
        }
    });
    </script>
```

### navigator.autoBind `Boolean`*(default: true)*

Indicates whether the navigator will call read on the data source initially.
Applicable only when using a dedicated navigator data source.

#### Example

    <div id="stock-chart"></div>
    <script>
    var navigatorDataSource = new kendo.data.DataSource({
        data: [
            { date: new Date("2012/01/01"), volume: 1000 },
            { date: new Date("2012/01/02"), volume: 1500 }
        ]
    });
    
    $("#stock-chart").kendoStockChart({
        navigator: {
            dataSource: navigatorDataSource,
            autoBind: false
        }
    });
    
    // Manual read call when autoBind is false
    navigatorDataSource.read();
    </script>

```pseudo
    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            dataSource: naviDataSource,
            autoBind: false
        }
    });

    //Call the navigator dataSource's read method
    //naviDataSource.read();
    </script>
```

### navigator.dateField `String`

The field containing the point date.
It is used as a default `field` for the navigator axis.

The data item field value must be either:

####* Date instance

####* String parsable by `new Date([field value])`

####* String in ASP.NET JSON format, i.e. "\/Date(1320825600000-0800)\/"

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            dateField: "tradeDate"
        },
        dataSource: {
            data: [
                { tradeDate: new Date("2012/01/01"), price: 10 },
                { tradeDate: new Date("2012/01/02"), price: 15 }
            ]
        }
    });
    </script>

### navigator.pane `Object`

The navigator pane configuration.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            pane: {
                background: "lightblue",
                border: {
                    color: "navy",
                    width: 2
                }
            }
        }
    });
    </script>

### navigator.pane.background `String`

The background color of the pane. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            pane: {
                background: "lightgray"
            }
        }
    });
    </script>

### navigator.pane.border `Object`

The border of the navigator pane.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            pane: {
                border: {
                    color: "red",
                    width: 2,
                    dashType: "dash"
                }
            }
        }
    });
    </script>

### navigator.pane.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            pane: {
                border: {
                    color: "green"
                }
            }
        }
    });
    </script>

### navigator.pane.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            pane: {
                border: {
                    dashType: "dot"
                }
            }
        }
    });
    </script>

### navigator.pane.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            pane: {
                border: {
                    width: 3
                }
            }
        }
    });
    </script>

### navigator.pane.height `Number`

The navigator pane height in pixels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            pane: {
                height: 150
            }
        }
    });
    </script>

### navigator.pane.margin `Number|Object` *(default: 0)*

The margin of the pane. A numeric value will set all margins.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            pane: {
                margin: {
                    top: 10,
                    bottom: 15,
                    left: 5,
                    right: 5
                }
            }
        }
    });
    </script>

### navigator.pane.margin.bottom `Number` *(default: 0)*

The bottom margin of the navigator pane.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            pane: {
                margin: {
                    bottom: 20
                }
            }
        }
    });
    </script>

### navigator.pane.margin.left `Number` *(default: 0)*

The left margin of the navigator pane.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            pane: {
                margin: {
                    left: 15
                }
            }
        }
    });
    </script>

### navigator.pane.margin.right `Number` *(default: 0)*

The right margin of the navigator pane.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            pane: {
                margin: {
                    right: 10
                }
            }
        }
    });
    </script>

### navigator.pane.margin.top `Number` *(default: 0)*

The top margin of the navigator pane.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            pane: {
                margin: {
                    top: 25
                }
            }
        }
    });
    </script>

### navigator.pane.name `String`

The unique name of the navigator pane.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            pane: {
                name: "navigatorPane"
            },
            series: [{
                type: "line",
                field: "value",
                categoryField: "date"
            }]
        },
        dataSource: {
            data: [
                { date: new Date("2016/01/01"), value: 1 },
                { date: new Date("2016/01/02"), value: 2 }
            ]
        }
    });
    </script>

### navigator.pane.padding `Number|Object` *(default: 0)*

The padding of the pane. A numeric value will set all paddings.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            pane: {
                padding: 10
            },
            series: [{
                type: "line",
                field: "value",
                categoryField: "date"
            }]
        },
        dataSource: {
            data: [
                { date: new Date("2016/01/01"), value: 1 },
                { date: new Date("2016/01/02"), value: 2 }
            ]
        }
    });
    </script>

### navigator.pane.padding.bottom `Number` *(default: 0)*

The bottom padding of the navigator pane.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            pane: {
                padding: {
                    bottom: 10
                }
            },
            series: [{
                type: "line",
                field: "value",
                categoryField: "date"
            }]
        },
        dataSource: {
            data: [
                { date: new Date("2016/01/01"), value: 1 },
                { date: new Date("2016/01/02"), value: 2 }
            ]
        }
    });
    </script>

### navigator.pane.padding.left `Number` *(default: 0)*

The left padding of the navigator pane.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            pane: {
                padding: {
                    left: 10
                }
            },
            series: [{
                type: "line",
                field: "value",
                categoryField: "date"
            }]
        },
        dataSource: {
            data: [
                { date: new Date("2016/01/01"), value: 1 },
                { date: new Date("2016/01/02"), value: 2 }
            ]
        }
    });
    </script>

### navigator.pane.padding.right `Number` *(default: 0)*

The right padding of the navigator pane.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            pane: {
                padding: {
                    right: 10
                }
            },
            series: [{
                type: "line",
                field: "value",
                categoryField: "date"
            }]
        },
        dataSource: {
            data: [
                { date: new Date("2016/01/01"), value: 1 },
                { date: new Date("2016/01/02"), value: 2 }
            ]
        }
    });
    </script>

### navigator.pane.padding.top `Number` *(default: 0)*

The top padding of the navigator pane.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            pane: {
                padding: {
                    top: 10
                }
            },
            series: [{
                type: "line",
                field: "value",
                categoryField: "date"
            }]
        },
        dataSource: {
            data: [
                { date: new Date("2016/01/01"), value: 1 },
                { date: new Date("2016/01/02"), value: 2 }
            ]
        }
    });
    </script>

### navigator.pane.title `String|Object`

The title configuration of the navigator pane.

> The [panes.title.text](/api/javascript/dataviz/ui/stock-chart#configuration-panes.title.text) option must be set in order to display the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            pane: {
                title: {
                    text: "Navigator Pane Title"
                }
            },
            series: [{
                type: "line",
                field: "value",
                categoryField: "date"
            }]
        },
        dataSource: {
            data: [
                { date: new Date("2016/01/01"), value: 1 },
                { date: new Date("2016/01/02"), value: 2 }
            ]
        }
    });
    </script>

### navigator.pane.title.background `String`

The background color of the title. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            pane: {
                title: {
                    text: "Navigator Pane Title",
                    background: "lightblue"
                }
            },
            series: [{
                type: "line",
                field: "value",
                categoryField: "date"
            }]
        },
        dataSource: {
            data: [
                { date: new Date("2016/01/01"), value: 1 },
                { date: new Date("2016/01/02"), value: 2 }
            ]
        }
    });
    </script>

### navigator.pane.title.border `Object`

The border of the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            pane: {
                title: {
                    text: "Navigator Pane Title",
                    border: {
                        color: "red",
                        width: 2
                    }
                }
            },
            series: [{
                type: "line",
                field: "value",
                categoryField: "date"
            }]
        },
        dataSource: {
            data: [
                { date: new Date("2016/01/01"), value: 1 },
                { date: new Date("2016/01/02"), value: 2 }
            ]
        }
    });
    </script>

### navigator.pane.title.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            pane: {
                title: {
                    text: "Navigator Pane Title",
                    border: {
                        color: "red",
                        width: 2
                    }
                }
            },
            series: [{
                type: "line",
                field: "value",
                categoryField: "date"
            }]
        },
        dataSource: {
            data: [
                { date: new Date("2016/01/01"), value: 1 },
                { date: new Date("2016/01/02"), value: 2 }
            ]
        }
    });
    </script>

### navigator.pane.title.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            pane: {
                title: {
                    text: "Navigator Pane Title",
                    border: {
                        color: "red",
                        dashType: "dash",
                        width: 2
                    }
                }
            },
            series: [{
                type: "line",
                field: "value",
                categoryField: "date"
            }]
        },
        dataSource: {
            data: [
                { date: new Date("2016/01/01"), value: 1 },
                { date: new Date("2016/01/02"), value: 2 }
            ]
        }
    });
    </script>

### navigator.pane.title.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            pane: {
                title: {
                    text: "Navigator Pane Title",
                    border: {
                        color: "red",
                        width: 3
                    }
                }
            },
            series: [{
                type: "line",
                field: "value",
                categoryField: "date"
            }]
        },
        dataSource: {
            data: [
                { date: new Date("2016/01/01"), value: 1 },
                { date: new Date("2016/01/02"), value: 2 }
            ]
        }
    });
    </script>

### navigator.pane.title.color `String`

The text color of the title. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            pane: {
                title: {
                    text: "Navigator Pane Title",
                    color: "red"
                }
            },
            series: [{
                type: "line",
                field: "value",
                categoryField: "date"
            }]
        },
        dataSource: {
            data: [
                { date: new Date("2016/01/01"), value: 1 },
                { date: new Date("2016/01/02"), value: 2 }
            ]
        }
    });
    </script>

### navigator.pane.title.font `String` *(default: "16px Arial,Helvetica,sans-serif")*

The font style of the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            pane: {
                title: {
                    text: "Navigator Pane Title",
                    font: "bold 18px Arial"
                }
            },
            series: [{
                type: "line",
                field: "value",
                categoryField: "date"
            }]
        },
        dataSource: {
            data: [
                { date: new Date("2016/01/01"), value: 1 },
                { date: new Date("2016/01/02"), value: 2 }
            ]
        }
    });
    </script>

### navigator.pane.title.margin `Number|Object` *(default: 5)*

The margin of the title. A numeric value will set all margins.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            pane: {
                title: {
                    text: "Navigator Pane Title",
                    margin: 10
                }
            },
            series: [{
                type: "line",
                field: "value",
                categoryField: "date"
            }]
        },
        dataSource: {
            data: [
                { date: new Date("2016/01/01"), value: 1 },
                { date: new Date("2016/01/02"), value: 2 }
            ]
        }
    });
    </script>

### navigator.pane.title.margin.bottom `Number` *(default: 0)*

The bottom margin of the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            pane: {
                title: {
                    text: "Navigator Pane Title",
                    margin: {
                        bottom: 10
                    }
                }
            },
            series: [{
                type: "line",
                field: "value",
                categoryField: "date"
            }]
        },
        dataSource: {
            data: [
                { date: new Date("2016/01/01"), value: 1 },
                { date: new Date("2016/01/02"), value: 2 }
            ]
        }
    });
    </script>

### navigator.pane.title.margin.left `Number` *(default: 0)*

The left margin of the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            pane: {
                title: {
                    text: "Navigator Pane Title",
                    margin: {
                        left: 15
                    }
                }
            },
            series: [{
                type: "line",
                field: "value",
                categoryField: "date"
            }]
        },
        dataSource: {
            data: [
                { date: new Date("2016/01/01"), value: 1 },
                { date: new Date("2016/01/02"), value: 2 }
            ]
        }
    });
    </script>

### navigator.pane.title.margin.right `Number` *(default: 0)*

The right margin of the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            pane: {
                title: {
                    text: "Navigator Pane Title",
                    margin: {
                        right: 15
                    }
                }
            },
            series: [{
                type: "line",
                field: "value",
                categoryField: "date"
            }]
        },
        dataSource: {
            data: [
                { date: new Date("2016/01/01"), value: 1 },
                { date: new Date("2016/01/02"), value: 2 }
            ]
        }
    });
    </script>

### navigator.pane.title.margin.top `Number` *(default: 0)*

The top margin of the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            pane: {
                title: {
                    text: "Navigator Pane Title",
                    margin: {
                        top: 15
                    }
                }
            },
            series: [{
                type: "line",
                field: "value",
                categoryField: "date"
            }]
        },
        dataSource: {
            data: [
                { date: new Date("2016/01/01"), value: 1 },
                { date: new Date("2016/01/02"), value: 2 }
            ]
        }
    });
    </script>

### navigator.pane.title.position `String` *(default: "center")*

The position of the title.

The supported values are:

* "left" - the axis title is positioned on the left (applicable to horizontal axis)
* "right" - the axis title is positioned on the right (applicable to horizontal axis)
* "center" - the axis title is positioned in the center

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            pane: {
                title: {
                    text: "Navigator Pane Title",
                    position: "left"
                }
            },
            series: [{
                type: "line",
                field: "value",
                categoryField: "date"
            }]
        },
        dataSource: {
            data: [
                { date: new Date("2016/01/01"), value: 1 },
                { date: new Date("2016/01/02"), value: 2 }
            ]
        }
    });
    </script>

### navigator.pane.title.text `String`

The text of the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            pane: {
                title: {
                    text: "Navigator Pane Title"
                }
            },
            series: [{
                type: "line",
                field: "value",
                categoryField: "date"
            }]
        },
        dataSource: {
            data: [
                { date: new Date("2016/01/01"), value: 1 },
                { date: new Date("2016/01/02"), value: 2 }
            ]
        }
    });
    </script>

### navigator.pane.title.visible `Boolean` *(default: true)*

If set to `true` the chart will display the pane title. By default the pane title is visible.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            pane: {
                title: {
                    text: "Navigator Pane Title",
                    visible: false
                }
            },
            series: [{
                type: "line",
                field: "value",
                categoryField: "date"
            }]
        },
        dataSource: {
            data: [
                { date: new Date("2016/01/01"), value: 1 },
                { date: new Date("2016/01/02"), value: 2 }
            ]
        }
    });
    </script>

### navigator.position `String` *(default: "bottom")*

The position of the navigator.

The supported values are:

* "top" - the navigator is positioned on the top
* "bottom" - the navigator is positioned on the bottom (default)

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            position: "top",
            series: [{
                type: "line",
                field: "value",
                categoryField: "date"
            }]
        },
        dataSource: {
            data: [
                { date: new Date("2016/01/01"), value: 1 },
                { date: new Date("2016/01/02"), value: 2 }
            ]
        }
    });
    </script>

### navigator.series `Array`

Array of series definitions.

Accepts the same options as the root `series` collection.

Omitting the array and specifying a single series is also acceptable.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
         navigator: {
            series: {
                type: "line",
                field: "volume"
            }
         } 
    });
    </script>

### navigator.series.type `String`

The type of the series. Available types:

* candlestick, ohlc
* column
* bullet
* area
* line

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            series: [{
                type: "line",
                field: "value",
                categoryField: "date"
            }]
        },
        dataSource: {
            data: [
                { date: new Date("2016/01/01"), value: 1 },
                { date: new Date("2016/01/02"), value: 2 }
            ]
        }
    });
    </script>

### navigator.series.dashType `String`*(default: "solid")*

The dash type of line chart.

> The `dashType` option is taken into consideration only if the [series.type](/api/javascript/dataviz/ui/stock-chart#configuration-series.type) option is set to "line".

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the chart legend border dash type

    <div id="stock-chart"></div>
    <script>
      $("#stock-chart").kendoStockChart({
        series: [
          {
            dashType: "dashDot",
            type: "line",
            type: "candlestick",
            openField: "Open",
            highField: "High",
            lowField: "Low",
            closeField: "Close",
            data:[{
              "Date": "2016/01/01",
              "Open": 41.62,
              "High": 41.69,
              "Low": 39.81,
              "Close": 40.12,
              "Volume": 2632000
            }, {
              "Date": "2016/03/01",
              "Open": 40.62,
              "High": 39.69,
              "Low": 40.81,
              "Close": 39.12,
              "Volume": 2631986
            }
                  ]
          }
        ],
        dateField: "Date"
      });
    </script>


### navigator.series.data `Array`

Array of data items. The data item type can be either a:

* Array of objects. Each point is bound to the specified series fields.
* Array of numbers. Available for area, column and line series.
* Array of arrays of numbers. Available for:
    * OHLC and candlestick series (open, high, low, close)

Set the chart series data as array of objects

```pseudo
  <div id="stock-chart"></div>
  <script>
  $("#stock-chart").kendoStockChart({
    series: [
      {
        type: "candlestick",
        data: [{
          open: 2,
          high: 4,
          low: 1,
          close: 3
        }]
      }
    ],
    categoryAxis: {
      categories: [
        new Date(2012, 1, 1)
      ]
    }
  });
  </script>
```

#### Set the chart series data as array of arrays

```pseudo
    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
      series: [
          {
            type: "candlestick",
            openField: "Open",
            highField: "High",
            lowField: "Low",
            closeField: "Close",
            data:[{
              "Date": "2016/01/01",
              "Open": 41.62,
              "High": 41.69,
              "Low": 39.81,
              "Close": 40.12,
              "Volume": 2632000
            }, {
              "Date": "2016/03/01",
              "Open": 40.62,
              "High": 39.69,
              "Low": 40.81,
              "Close": 39.12,
              "Volume": 2631986
            }
          ]
        }
      ],
      categoryAxis: {
        categories: [
          new Date(2012, 1, 1)
        ]
      }
    });
    </script>
```

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
          series: [
            {
              type: "candlestick",
              data: [
                {
                  date: new Date(2024, 0, 1),
                  open: 150.25,
                  high: 152.8,
                  low: 149.5,
                  close: 152.3,
                },
                {
                  date: new Date(2024, 0, 2),
                  open: 152.5,
                  high: 154.2,
                  low: 151.8,
                  close: 153.75,
                },
                {
                  date: new Date(2024, 0, 3),
                  open: 153.8,
                  high: 155.4,
                  low: 152.9,
                  close: 154.2,
                },
                
              ],
              openField: "open",
              highField: "high",
              lowField: "low",
              closeField: "close",
              dateField: "date",
              name: "Stock Price",
              color: "#03a9f4",
              downColor: "#f44336",
            },
          ],
          navigator: {
            series: {
              type: "line",
              data: [
                {
                  date: new Date(2024, 0, 1),
                  open: 150.25,
                  high: 152.8,
                  low: 149.5,
                  close: 152.3,
                },
                {
                  date: new Date(2024, 0, 2),
                  open: 152.5,
                  high: 154.2,
                  low: 151.8,
                  close: 153.75,
                },
                {
                  date: new Date(2024, 0, 3),
                  open: 153.8,
                  high: 155.4,
                  low: 152.9,
                  close: 154.2,
                },
                
              ],
              field: "close",
              dateField: "date",
              color: "#ff9800",
            },
          },
        });
    </script>

### navigator.series.highField `String`

The data field containing the high value.

** Available for candlestick and ohlc series only **

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            series: [{
                type: "candlestick",
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                categoryField: "date"
            }]
        },
        dataSource: {
            data: [
                { date: new Date("2016/01/01"), open: 1, high: 3, low: 0.5, close: 2 },
                { date: new Date("2016/01/02"), open: 2, high: 4, low: 1.5, close: 3 }
            ]
        }
    });
    </script>

### navigator.series.field `String`

The data field containing the series value.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            series: [{
                type: "line",
                field: "value",
                categoryField: "date"
            }]
        },
        dataSource: {
            data: [
                { date: new Date("2016/01/01"), value: 1 },
                { date: new Date("2016/01/02"), value: 2 }
            ]
        }
    });
    </script>

### navigator.series.categoryField `String` *(default: "category")*

The data item field which contains the category name or date.

> The points will be rendered in chronological order if the category is a date.

> If specified, the [dateField](/api/javascript/dataviz/ui/stock-chart#configuration-dateField) option is used as a default.

#### Example - set series date category field

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        series: [{
          type: "line",
          field: "value",
          categoryField: "date",
          data: [
            { value: 1, date: new Date(2012, 1, 1) },
            { value: 2, date: new Date(2012, 1, 2) }
          ]
        }]
    });
    </script>

### navigator.series.name `String`

The navigator series name.

#### Example - set the navigator series name

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
      dataSource: {
        data: [
          { value: 1, category: "One", date: new Date(2012, 1, 1)},
          { value: 2, category: "Two", date: new Date(2012, 1, 2)}
        ]
      },
      dateField: "date",
      navigator: {
          series: [
            {
              field: "value",
              name: "Value",
              visibleInLegend: true
            }
          ]
      },
      legend: {
        visible: true,
        position: "bottom"
      }
    });
    </script>

The name can also be a [template](/api/framework/kendo#methods-template) which sets the name of the series when bound to grouped data source.

The fields which can be used in the template are:

*   series - the series options
*   group - the data group
*   group.field - the name of the field used for grouping
*   group.value - the field value for this group.

#### Example - set the chart series group name template

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
      dataSource: {
        data: [
          { value: 1, category: "One", date: new Date(2012, 1, 1)},
          { value: 2, category: "Two", date: new Date(2012, 1, 2)}
        ],
        group: { field: "category" }
      },
      dateField: "date",
      navigator: {
          series: [
            {
              field: "value",
              name: "Value: #: group.value #",
              visibleInLegend: true
            }
          ]
      },
      legend: {
        visible: true,
        position: "bottom"
      }
    });
    </script>

### navigator.series.highlight `Object`

Configures the appearance of highlighted points.

** Applicable to candlestick and ohlc series. **

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            series: [{
                type: "candlestick",
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                categoryField: "date",
                highlight: {
                    color: "red",
                    opacity: 0.5
                }
            }]
        },
        dataSource: {
            data: [
                { date: new Date("2016/01/01"), open: 1, high: 3, low: 0.5, close: 2 },
                { date: new Date("2016/01/02"), open: 2, high: 4, low: 1.5, close: 3 }
            ]
        }
    });
    </script>

### navigator.series.highlight.border `Object`

The border of highlighted points. The color is computed automatically from the base point color.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            series: [{
                type: "candlestick",
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                categoryField: "date",
                highlight: {
                    border: {
                        width: 2,
                        color: "red"
                    }
                }
            }]
        },
        dataSource: {
            data: [
                { date: new Date("2016/01/01"), open: 1, high: 3, low: 0.5, close: 2 },
                { date: new Date("2016/01/02"), open: 2, high: 4, low: 1.5, close: 3 }
            ]
        }
    });
    </script>

### navigator.series.highlight.border.width `Number`

The width of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            series: [{
                type: "candlestick",
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                categoryField: "date",
                highlight: {
                    border: {
                        width: 3
                    }
                }
            }]
        },
        dataSource: {
            data: [
                { date: new Date("2016/01/01"), open: 1, high: 3, low: 0.5, close: 2 },
                { date: new Date("2016/01/02"), open: 2, high: 4, low: 1.5, close: 3 }
            ]
        }
    });
    </script>

### navigator.series.highlight.border.color `String`

The border color.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            series: [{
                type: "candlestick",
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                categoryField: "date",
                highlight: {
                    border: {
                        color: "red",
                        width: 2
                    }
                }
            }]
        },
        dataSource: {
            data: [
                { date: new Date("2016/01/01"), open: 1, high: 3, low: 0.5, close: 2 },
                { date: new Date("2016/01/02"), open: 2, high: 4, low: 1.5, close: 3 }
            ]
        }
    });
    </script>

### navigator.series.highlight.border.opacity `Number`

The border opacity.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            series: [{
                type: "candlestick",
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                categoryField: "date",
                highlight: {
                    border: {
                        opacity: 0.5,
                        width: 2
                    }
                }
            }]
        },
        dataSource: {
            data: [
                { date: new Date("2016/01/01"), open: 1, high: 3, low: 0.5, close: 2 },
                { date: new Date("2016/01/02"), open: 2, high: 4, low: 1.5, close: 3 }
            ]
        }
    });
    </script>

### navigator.series.highlight.color `String`

The highlight color.

** Available only for pie series **

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            series: [{
                type: "line",
                field: "value",
                categoryField: "date",
                highlight: {
                    color: "red"
                }
            }]
        },
        dataSource: {
            data: [
                { date: new Date("2016/01/01"), value: 1 },
                { date: new Date("2016/01/02"), value: 2 }
            ]
        }
    });
    </script>

### navigator.series.highlight.line `Object`

Line options for highlighted points. The color is computed automatically from the base point color.

** Available only for candlestick series **

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            series: [{
                type: "candlestick",
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                categoryField: "date",
                highlight: {
                    line: {
                        width: 3,
                        color: "red"
                    }
                }
            }]
        },
        dataSource: {
            data: [
                { date: new Date("2016/01/01"), open: 1, high: 3, low: 0.5, close: 2 },
                { date: new Date("2016/01/02"), open: 2, high: 4, low: 1.5, close: 3 }
            ]
        }
    });
    </script>

### navigator.series.highlight.line.width `Number`

The width of the line.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            series: [{
                type: "candlestick",
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                categoryField: "date",
                highlight: {
                    line: {
                        width: 3
                    }
                }
            }]
        },
        dataSource: {
            data: [
                { date: new Date("2016/01/01"), open: 1, high: 3, low: 0.5, close: 2 },
                { date: new Date("2016/01/02"), open: 2, high: 4, low: 1.5, close: 3 }
            ]
        }
    });
    </script>

### navigator.series.highlight.line.color `String`

The line color.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            series: [{
                type: "candlestick",
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                categoryField: "date",
                highlight: {
                    line: {
                        color: "red",
                        width: 2
                    }
                }
            }]
        },
        dataSource: {
            data: [
                { date: new Date("2016/01/01"), open: 1, high: 3, low: 0.5, close: 2 },
                { date: new Date("2016/01/02"), open: 2, high: 4, low: 1.5, close: 3 }
            ]
        }
    });
    </script>

### navigator.series.highlight.line.opacity `Number`

The opacity of the line.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
          series: [
            {
              type: "candlestick",
              data: [
                {
                  date: new Date(2024, 0, 1),
                  open: 150.25,
                  high: 152.8,
                  low: 149.5,
                  close: 152.3,
                },
                {
                  date: new Date(2024, 0, 2),
                  open: 152.5,
                  high: 154.2,
                  low: 151.8,
                  close: 153.75,
                },
                {
                  date: new Date(2024, 0, 3),
                  open: 153.8,
                  high: 155.4,
                  low: 152.9,
                  close: 154.2,
                },
                
              ],
              openField: "open",
              highField: "high",
              lowField: "low",
              closeField: "close",
              dateField: "date",
              name: "Stock Price",
              color: "#03a9f4",
              downColor: "#f44336",
            },
          ],
          navigator: {
            series: {
              type: "line",
              highlight: {
                    line: {
                        opacity: 0.5
                    }
                },
              data: [
                {
                  date: new Date(2024, 0, 1),
                  open: 150.25,
                  high: 152.8,
                  low: 149.5,
                  close: 152.3,
                },
                {
                  date: new Date(2024, 0, 2),
                  open: 152.5,
                  high: 154.2,
                  low: 151.8,
                  close: 153.75,
                },
                {
                  date: new Date(2024, 0, 3),
                  open: 153.8,
                  high: 155.4,
                  low: 152.9,
                  close: 154.2,
                },
                
              ],
              field: "close",
              dateField: "date",
              color: "#ff9800",
            },
          },
        });
    </script>

### navigator.series.highlight.opacity `Number`

The opacity of the highlighted points.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
          series: [
            {
              type: "candlestick",
              data: [
                {
                  date: new Date(2024, 0, 1),
                  open: 150.25,
                  high: 152.8,
                  low: 149.5,
                  close: 152.3,
                },
                {
                  date: new Date(2024, 0, 2),
                  open: 152.5,
                  high: 154.2,
                  low: 151.8,
                  close: 153.75,
                },
                {
                  date: new Date(2024, 0, 3),
                  open: 153.8,
                  high: 155.4,
                  low: 152.9,
                  close: 154.2,
                },
                
              ],
              openField: "open",
              highField: "high",
              lowField: "low",
              closeField: "close",
              dateField: "date",
              name: "Stock Price",
              color: "#03a9f4",
              downColor: "#f44336",
            },
          ],
          navigator: {
            series: {
              type: "line",
              highlight: {
                opacity: 0.5   
                },
              data: [
                {
                  date: new Date(2024, 0, 1),
                  open: 150.25,
                  high: 152.8,
                  low: 149.5,
                  close: 152.3,
                },
                {
                  date: new Date(2024, 0, 2),
                  open: 152.5,
                  high: 154.2,
                  low: 151.8,
                  close: 153.75,
                },
                {
                  date: new Date(2024, 0, 3),
                  open: 153.8,
                  high: 155.4,
                  low: 152.9,
                  close: 154.2,
                },
                
              ],
              field: "close",
              dateField: "date",
              color: "#ff9800",
            },
          },
        });
    </script>

### navigator.series.highlight.visible `Boolean`*(default: true)*

A value indicating if the series points should be highlighted.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
          series: [
            {
              type: "candlestick",
              data: [
                {
                  date: new Date(2024, 0, 1),
                  open: 150.25,
                  high: 152.8,
                  low: 149.5,
                  close: 152.3,
                },
                {
                  date: new Date(2024, 0, 2),
                  open: 152.5,
                  high: 154.2,
                  low: 151.8,
                  close: 153.75,
                },
                {
                  date: new Date(2024, 0, 3),
                  open: 153.8,
                  high: 155.4,
                  low: 152.9,
                  close: 154.2,
                },
                
              ],
              openField: "open",
              highField: "high",
              lowField: "low",
              closeField: "close",
              dateField: "date",
              name: "Stock Price",
              color: "#03a9f4",
              downColor: "#f44336",
            },
          ],
          navigator: {
            series: {
              type: "line",
              highlight: {
                visible: false,   
                },
              data: [
                {
                  date: new Date(2024, 0, 1),
                  open: 150.25,
                  high: 152.8,
                  low: 149.5,
                  close: 152.3,
                },
                {
                  date: new Date(2024, 0, 2),
                  open: 152.5,
                  high: 154.2,
                  low: 151.8,
                  close: 153.75,
                },
                {
                  date: new Date(2024, 0, 3),
                  open: 153.8,
                  high: 155.4,
                  low: 152.9,
                  close: 154.2,
                },
                
              ],
              field: "close",
              dateField: "date",
              color: "#ff9800",
            },
          },
        });
    </script>

### navigator.series.aggregate `String|Function` *(default: "max")*

The aggregate function to apply for date series.

This function is used when a category (an year, month, etc.) contains two or more points.
The function return value is displayed instead of the individual points.

The supported values are:

* "avg" - the average of all values for the date period.
* "count" - the number of values for the date period.
* "max" - the highest value for the date period.
* "min" - the lowest value for the date period.
* "sum" - the sum of all values for the date period. Defaults to 0 if no data points are defined.
* "sumOrNull" - the sum of all values for the date period. Defaults to `null` if no data points are defined.
* "first" - the first value
* function(values, series, dataItems, category) - user-defined aggregate function. Returns single value or data item.
* object  - (compound aggregate) **Applicable to "candlestick" and ohlc "series"**. Specifies the aggregate for each data item field.

```pseudo
    aggregate: {
        open: "max",
        high: "max",
        close: "min",
        low: "max"
    }
```
#### Example
 
    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
          series: [
            {
              type: "candlestick",
              data: [
                {
                  date: new Date(2024, 0, 1),
                  open: 150.25,
                  high: 152.8,
                  low: 149.5,
                  close: 152.3,
                },
                {
                  date: new Date(2024, 0, 2),
                  open: 152.5,
                  high: 154.2,
                  low: 151.8,
                  close: 153.75,
                },
                {
                  date: new Date(2024, 0, 3),
                  open: 153.8,
                  high: 155.4,
                  low: 152.9,
                  close: 154.2,
                },
                
              ],
              openField: "open",
              highField: "high",
              lowField: "low",
              closeField: "close",
              dateField: "date",
              name: "Stock Price",
              color: "#03a9f4",
              downColor: "#f44336",
            },
          ],
          navigator: {
            series: {
              type: "line",
              aggregate: "avg",
              data: [
                {
                  date: new Date(2024, 0, 1),
                  open: 150.25,
                  high: 152.8,
                  low: 149.5,
                  close: 152.3,
                },
                {
                  date: new Date(2024, 0, 2),
                  open: 152.5,
                  high: 154.2,
                  low: 151.8,
                  close: 153.75,
                },
                {
                  date: new Date(2024, 0, 3),
                  open: 153.8,
                  high: 155.4,
                  low: 152.9,
                  close: 154.2,
                },
                
              ],
              field: "close",
              dateField: "date",
              color: "#ff9800",
            },
          },
        });
    </script>

### navigator.series.axis `String`*(default: "primary")*

The name of the value axis to use.

** Applicable to area, column, line, ohlc and candlestick series **

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
          series: [
            {
              type: "candlestick",
              data: [
                {
                  date: new Date(2024, 0, 1),
                  open: 150.25,
                  high: 152.8,
                  low: 149.5,
                  close: 152.3,
                },
                {
                  date: new Date(2024, 0, 2),
                  open: 152.5,
                  high: 154.2,
                  low: 151.8,
                  close: 153.75,
                },
                {
                  date: new Date(2024, 0, 3),
                  open: 153.8,
                  high: 155.4,
                  low: 152.9,
                  close: 154.2,
                },
                
              ],
              openField: "open",
              highField: "high",
              lowField: "low",
              closeField: "close",
              dateField: "date",
              name: "Stock Price",
              color: "#03a9f4",
              downColor: "#f44336",
            },
          ],
          navigator: {
            series: {
              type: "line",
              axis: "primary",
              data: [
                {
                  date: new Date(2024, 0, 1),
                  open: 150.25,
                  high: 152.8,
                  low: 149.5,
                  close: 152.3,
                },
                {
                  date: new Date(2024, 0, 2),
                  open: 152.5,
                  high: 154.2,
                  low: 151.8,
                  close: 153.75,
                },
                {
                  date: new Date(2024, 0, 3),
                  open: 153.8,
                  high: 155.4,
                  low: 152.9,
                  close: 154.2,
                },
                
              ],
              field: "close",
              dateField: "date",
              color: "#ff9800",
            },
          },
        });
    </script>

### navigator.series.border `Object`

The border of the points.

** Applicable to column, ohlc and candlestick series **

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            series: [{
                type: "candlestick",
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                border: {
                    color: "black",
                    width: 2
                }
            }]
        },
        dataSource: {
            data: [
                { date: new Date("2016/01/01"), open: 1, high: 3, low: 0.5, close: 2 },
                { date: new Date("2016/01/02"), open: 2, high: 4, low: 1.5, close: 3 }
            ]
        }
    });
    </script>

### navigator.series.border.color `String`

The color of the border.  It defaults to the color of the current series.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            series: [{
                type: "candlestick",
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                border: {
                    color: "red"
                }
            }]
        },
        dataSource: {
            data: [
                { date: new Date("2016/01/01"), open: 1, high: 3, low: 0.5, close: 2 },
                { date: new Date("2016/01/02"), open: 2, high: 4, low: 1.5, close: 3 }
            ]
        }
    });
    </script>

### navigator.series.border.dashType `String`*(default: "solid")*

The dash type of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            series: [{
                type: "candlestick",
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                border: {
                    dashType: "dash"
                }
            }]
        },
        dataSource: {
            data: [
                { date: new Date("2016/01/01"), open: 1, high: 3, low: 0.5, close: 2 },
                { date: new Date("2016/01/02"), open: 2, high: 4, low: 1.5, close: 3 }
            ]
        }
    });
    </script>

#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### navigator.series.border.width `Number`*(default: 1)*

The width of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            series: [{
                type: "candlestick",
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                border: {
                    width: 3
                }
            }]
        },
        dataSource: {
            data: [
                { date: new Date("2016/01/01"), open: 1, high: 3, low: 0.5, close: 2 },
                { date: new Date("2016/01/02"), open: 2, high: 4, low: 1.5, close: 3 }
            ]
        }
    });
    </script>

### navigator.series.closeField `String`

The data field containing the close value.

** Available for candlestick and ohlc series only **

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            series: [{
                type: "candlestick",
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close"
            }]
        },
        dataSource: {
            data: [
                { date: new Date("2016/01/01"), open: 1, high: 3, low: 0.5, close: 2 },
                { date: new Date("2016/01/02"), open: 2, high: 4, low: 1.5, close: 3 }
            ]
        }
    });
    </script>

### navigator.series.color `String`

The series base color. The supported values are:

* CSS color string, including hex and rgb
* function(point) - user-defined function that will be evaluated for each point. Returning `undefined` will assume the default series color.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
          series: [
            {
              type: "candlestick",
              data: [
                {
                  date: new Date(2024, 0, 1),
                  open: 150.25,
                  high: 152.8,
                  low: 149.5,
                  close: 152.3,
                },
                {
                  date: new Date(2024, 0, 2),
                  open: 152.5,
                  high: 154.2,
                  low: 151.8,
                  close: 153.75,
                },
                {
                  date: new Date(2024, 0, 3),
                  open: 153.8,
                  high: 155.4,
                  low: 152.9,
                  close: 154.2,
                },
                
              ],
              openField: "open",
              highField: "high",
              lowField: "low",
              closeField: "close",
              dateField: "date",
              name: "Stock Price",
              color: "#03a9f4",
              downColor: "#f44336",
            },
          ],
          navigator: {
            series: {
              color: "red",
              type: "line",
              data: [
                {
                  date: new Date(2024, 0, 1),
                  open: 150.25,
                  high: 152.8,
                  low: 149.5,
                  close: 152.3,
                },
                {
                  date: new Date(2024, 0, 2),
                  open: 152.5,
                  high: 154.2,
                  low: 151.8,
                  close: 153.75,
                },
                {
                  date: new Date(2024, 0, 3),
                  open: 153.8,
                  high: 155.4,
                  low: 152.9,
                  close: 154.2,
                },
                
              ],
              field: "close",
              dateField: "date",
              color: "#ff9800",
            },
          },
        });
    </script>

### navigator.series.colorField `String`

The data field containing the point color.

** Applicable for column, candlestick and ohlc series. **

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
          series: [
            {
              type: "candlestick",
              data: [
                {
                  date: new Date(2024, 0, 1),
                  open: 150.25,
                  high: 152.8,
                  low: 149.5,
                  close: 152.3,
                },
                {
                  date: new Date(2024, 0, 2),
                  open: 152.5,
                  high: 154.2,
                  low: 151.8,
                  close: 153.75,
                },
                {
                  date: new Date(2024, 0, 3),
                  open: 153.8,
                  high: 155.4,
                  low: 152.9,
                  close: 154.2,
                },
                
              ],
              openField: "open",
              highField: "high",
              lowField: "low",
              closeField: "close",
              dateField: "date",
              name: "Stock Price",
              color: "#03a9f4",
              downColor: "#f44336",
            },
          ],
          navigator: {
            series: {
              color: "red",
              type: "line",
              colorField: "color",
              data: [
                {
                  date: new Date(2024, 0, 1),
                  open: 150.25,
                  high: 152.8,
                  low: 149.5,
                  close: 152.3,
                  color: 'red'
                },
                {
                  date: new Date(2024, 0, 2),
                  open: 152.5,
                  high: 154.2,
                  low: 151.8,
                  close: 153.75,
                  color: 'blue'
                },
                {
                  date: new Date(2024, 0, 3),
                  open: 153.8,
                  high: 155.4,
                  low: 152.9,
                  close: 154.2,
                  color: 'yellow'
                },
                
              ],
              field: "close",
              dateField: "date",
              color: "#ff9800",
            },
          },
        });
    </script>

### navigator.series.downColor `String`

The series color when the open value is greater than the close value.

** Available for candlestick series only **

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            series: [{
                type: "candlestick",
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                downColor: "red"
            }]
        },
        dataSource: {
            data: [
                { date: new Date("2016/01/01"), open: 3, high: 4, low: 1, close: 2 },
                { date: new Date("2016/01/02"), open: 2, high: 3, low: 1, close: 1.5 }
            ]
        }
    });
    </script>

### navigator.series.downColorField `String`

The data field containing the color applied when the open value is greater than the close value.

** Available for candlestick series only **

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            series: [{
                type: "candlestick",
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                downColorField: "downColor"
            }]
        },
        dataSource: {
            data: [
                { date: new Date("2016/01/01"), open: 3, high: 4, low: 1, close: 2, downColor: "red" },
                { date: new Date("2016/01/02"), open: 2, high: 3, low: 1, close: 1.5, downColor: "orange" }
            ]
        }
    });
    </script>

### navigator.series.gap `Number`*(default: 1.5)*

The distance between category clusters.

** Applicable for column, candlestick and ohlc series. **

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
            series: [
              {
                type: "candlestick",
                colorField: "color",
                data: [
                  {
                    date: new Date(2024, 0, 1),
                    open: 150.25,
                    high: 152.8,
                    low: 149.5,
                    close: 152.3,
                    color: "#f44336",
                  },
                  {
                    date: new Date(2024, 0, 2),
                    open: 152.5,
                    high: 154.2,
                    low: 151.8,
                    close: 153.75,
                    color: "#4caf50",
                  },
                  {
                    date: new Date(2024, 0, 3),
                    open: 153.8,
                    high: 155.4,
                    low: 152.9,
                    close: 154.2,
                    color: "#2196f3",
                  },
                  
                ],
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date",
                name: "Stock Price",
                color: "#03a9f4",
                downColor: "#f44336",
              },
            ],
            navigator: {
              series: {
                gap: 2,
                type: "line",
                data: [
                  {
                    date: new Date(2024, 0, 1),
                    open: 150.25,
                    high: 152.8,
                    low: 149.5,
                    close: 152.3,
                  },
                  {
                    date: new Date(2024, 0, 2),
                    open: 152.5,
                    high: 154.2,
                    low: 151.8,
                    close: 153.75,
                  },
                  {
                    date: new Date(2024, 0, 3),
                    open: 153.8,
                    high: 155.4,
                    low: 152.9,
                    close: 154.2,
                  },
                  
                ],
                field: "close",
                dateField: "date",
                color: "#ff9800",
              },
            },
          });
    </script>

### navigator.series.labels `Object`

Configures the series data labels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
          series: [
            {
              type: "candlestick",
              data: [
                {
                  date: new Date(2024, 0, 1),
                  open: 150.25,
                  high: 152.8,
                  low: 149.5,
                  close: 152.3,
                },
                {
                  date: new Date(2024, 0, 2),
                  open: 152.5,
                  high: 154.2,
                  low: 151.8,
                  close: 153.75,
                },
                {
                  date: new Date(2024, 0, 3),
                  open: 153.8,
                  high: 155.4,
                  low: 152.9,
                  close: 154.2,
                },
                
              ],
              openField: "open",
              highField: "high",
              lowField: "low",
              closeField: "close",
              dateField: "date",
              name: "Stock Price",
              color: "#03a9f4",
              downColor: "#f44336",
            },
          ],
          navigator: {
            series: {
              type: "line",
              labels: {
                    visible: true,
                    format: "{0}"
                },
              data: [
                {
                  date: new Date(2024, 0, 1),
                  open: 150.25,
                  high: 152.8,
                  low: 149.5,
                  close: 152.3,
                },
                {
                  date: new Date(2024, 0, 2),
                  open: 152.5,
                  high: 154.2,
                  low: 151.8,
                  close: 153.75,
                },
                {
                  date: new Date(2024, 0, 3),
                  open: 153.8,
                  high: 155.4,
                  low: 152.9,
                  close: 154.2,
                },
                
              ],
              field: "close",
              dateField: "date",
              color: "#ff9800",
            },
          },
        });
    </script>

### navigator.series.labels.ariaTemplate `String | Function`

The [template](/api/framework/kendo#methods-template) which renders the ARIA label for the series labels.

The fields which can be used in the template are:

*   category - the category name. Available for area, bar, column, bubble, donut, line and pie series.
*   dataItem - the original data item used to construct the point. Will be null if binding to array.
*   percentage - the point value represented as a percentage value. Available only for 100% stacked charts.
*   series - the data series
*   value - the point value. Can be a number or object containing each bound field.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
      dataSource: {
        data: [
          { value: 1, category: "One", date: new Date(2012, 1, 1)},
          { value: 2, category: "Two", date: new Date(2012, 1, 2)}
        ],
        group: { field: "category" }
      },
      dateField: "date",
      navigator: {
        series: [
          {
            field: "value",
            name: "Value: #: group.value #",
            visibleInLegend: true,
            labels: {
              ariaTemplate: "The value for #= series.name # in #= category # is #= value #",
              visible: true
            }
          }
        ]
      },
      legend: {
        visible: true,
        position: "bottom"
      }
    });
    </script>

### navigator.series.labels.background `String`

The background color of the labels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
            series: [
              {
                type: "candlestick",
                colorField: "color",
                data: [
                  {
                    date: new Date(2024, 0, 1),
                    open: 150.25,
                    high: 152.8,
                    low: 149.5,
                    close: 152.3,
                    color: "#f44336",
                  },
                  {
                    date: new Date(2024, 0, 2),
                    open: 152.5,
                    high: 154.2,
                    low: 151.8,
                    close: 153.75,
                    color: "#4caf50",
                  },
                  {
                    date: new Date(2024, 0, 3),
                    open: 153.8,
                    high: 155.4,
                    low: 152.9,
                    close: 154.2,
                    color: "#2196f3",
                  },
                  
                ],
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date",
                name: "Stock Price",
                color: "#03a9f4",
                downColor: "#f44336",
              },
            ],
            navigator: {
              series: {
                type: "line",
                labels: {
                    visible: true,
                    background: "yellow"
                },
                data: [
                  {
                    date: new Date(2024, 0, 1),
                    open: 150.25,
                    high: 152.8,
                    low: 149.5,
                    close: 152.3,
                  },
                  {
                    date: new Date(2024, 0, 2),
                    open: 152.5,
                    high: 154.2,
                    low: 151.8,
                    close: 153.75,
                  },
                  {
                    date: new Date(2024, 0, 3),
                    open: 153.8,
                    high: 155.4,
                    low: 152.9,
                    close: 154.2,
                  },
                  
                ],
                field: "close",
                dateField: "date",
                color: "#ff9800",
              },
            },
          });
    </script>

### navigator.series.labels.border `Object`

The border of the labels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
            series: [
              {
                type: "candlestick",
                colorField: "color",
                data: [
                  {
                    date: new Date(2024, 0, 1),
                    open: 150.25,
                    high: 152.8,
                    low: 149.5,
                    close: 152.3,
                    color: "#f44336",
                  },
                  {
                    date: new Date(2024, 0, 2),
                    open: 152.5,
                    high: 154.2,
                    low: 151.8,
                    close: 153.75,
                    color: "#4caf50",
                  },
                  {
                    date: new Date(2024, 0, 3),
                    open: 153.8,
                    high: 155.4,
                    low: 152.9,
                    close: 154.2,
                    color: "#2196f3",
                  },
                  
                ],
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date",
                name: "Stock Price",
                color: "#03a9f4",
                downColor: "#f44336",
              },
            ],
            navigator: {
              series: {
                type: "line",
                labels: {
                    visible: true,
                    border: {
                        color: "red",
                        width: 2
                    }
                },
                data: [
                  {
                    date: new Date(2024, 0, 1),
                    open: 150.25,
                    high: 152.8,
                    low: 149.5,
                    close: 152.3,
                  },
                  {
                    date: new Date(2024, 0, 2),
                    open: 152.5,
                    high: 154.2,
                    low: 151.8,
                    close: 153.75,
                  },
                  {
                    date: new Date(2024, 0, 3),
                    open: 153.8,
                    high: 155.4,
                    low: 152.9,
                    close: 154.2,
                  },
                  
                ],
                field: "close",
                dateField: "date",
                color: "#ff9800",
              },
            },
          });
    </script>

### navigator.series.labels.border.color `String`*(default: "black")*

 The color of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
            series: [
              {
                type: "candlestick",
                colorField: "color",
                data: [
                  {
                    date: new Date(2024, 0, 1),
                    open: 150.25,
                    high: 152.8,
                    low: 149.5,
                    close: 152.3,
                    color: "#f44336",
                  },
                  {
                    date: new Date(2024, 0, 2),
                    open: 152.5,
                    high: 154.2,
                    low: 151.8,
                    close: 153.75,
                    color: "#4caf50",
                  },
                  {
                    date: new Date(2024, 0, 3),
                    open: 153.8,
                    high: 155.4,
                    low: 152.9,
                    close: 154.2,
                    color: "#2196f3",
                  },
                  
                ],
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date",
                name: "Stock Price",
                color: "#03a9f4",
                downColor: "#f44336",
              },
            ],
            navigator: {
              series: {
                type: "line",
                labels: {
                    visible: true,
                    border: {
                        color: "blue"
                    }
                },
                data: [
                  {
                    date: new Date(2024, 0, 1),
                    open: 150.25,
                    high: 152.8,
                    low: 149.5,
                    close: 152.3,
                  },
                  {
                    date: new Date(2024, 0, 2),
                    open: 152.5,
                    high: 154.2,
                    low: 151.8,
                    close: 153.75,
                  },
                  {
                    date: new Date(2024, 0, 3),
                    open: 153.8,
                    high: 155.4,
                    low: 152.9,
                    close: 154.2,
                  },
                  
                ],
                field: "close",
                dateField: "date",
                color: "#ff9800",
              },
            },
          });
    </script>

### navigator.series.labels.border.dashType `String`*(default: "solid")*

 The dash type of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
            series: [
              {
                type: "candlestick",
                colorField: "color",
                data: [
                  {
                    date: new Date(2024, 0, 1),
                    open: 150.25,
                    high: 152.8,
                    low: 149.5,
                    close: 152.3,
                    color: "#f44336",
                  },
                  {
                    date: new Date(2024, 0, 2),
                    open: 152.5,
                    high: 154.2,
                    low: 151.8,
                    close: 153.75,
                    color: "#4caf50",
                  },
                  {
                    date: new Date(2024, 0, 3),
                    open: 153.8,
                    high: 155.4,
                    low: 152.9,
                    close: 154.2,
                    color: "#2196f3",
                  },
                  
                ],
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date",
                name: "Stock Price",
                color: "#03a9f4",
                downColor: "#f44336",
              },
            ],
            navigator: {
              series: {
                type: "line",
                labels: {
                    visible: true,
                    border: {
                        dashType: "dash"
                    }
                },
                data: [
                  {
                    date: new Date(2024, 0, 1),
                    open: 150.25,
                    high: 152.8,
                    low: 149.5,
                    close: 152.3,
                  },
                  {
                    date: new Date(2024, 0, 2),
                    open: 152.5,
                    high: 154.2,
                    low: 151.8,
                    close: 153.75,
                  },
                  {
                    date: new Date(2024, 0, 3),
                    open: 153.8,
                    high: 155.4,
                    low: 152.9,
                    close: 154.2,
                  },
                  
                ],
                field: "close",
                dateField: "date",
                color: "#ff9800",
              },
            },
          });
    </script>

#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### navigator.series.labels.border.width `Number`*(default: 0)*

 The width of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
            series: [
              {
                type: "candlestick",
                colorField: "color",
                data: [
                  {
                    date: new Date(2024, 0, 1),
                    open: 150.25,
                    high: 152.8,
                    low: 149.5,
                    close: 152.3,
                    color: "#f44336",
                  },
                  {
                    date: new Date(2024, 0, 2),
                    open: 152.5,
                    high: 154.2,
                    low: 151.8,
                    close: 153.75,
                    color: "#4caf50",
                  },
                  {
                    date: new Date(2024, 0, 3),
                    open: 153.8,
                    high: 155.4,
                    low: 152.9,
                    close: 154.2,
                    color: "#2196f3",
                  },
                  
                ],
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date",
                name: "Stock Price",
                color: "#03a9f4",
                downColor: "#f44336",
              },
            ],
            navigator: {
              series: {
                type: "line",
                labels: {
                    visible: true,
                    border: {
                        width: 3
                    }
                },
                data: [
                  {
                    date: new Date(2024, 0, 1),
                    open: 150.25,
                    high: 152.8,
                    low: 149.5,
                    close: 152.3,
                  },
                  {
                    date: new Date(2024, 0, 2),
                    open: 152.5,
                    high: 154.2,
                    low: 151.8,
                    close: 153.75,
                  },
                  {
                    date: new Date(2024, 0, 3),
                    open: 153.8,
                    high: 155.4,
                    low: 152.9,
                    close: 154.2,
                  },
                  
                ],
                field: "close",
                dateField: "date",
                color: "#ff9800",
              },
            },
          });
    </script>

### navigator.series.labels.color `String`

The text color of the labels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
            series: [
              {
                type: "candlestick",
                colorField: "color",
                data: [
                  {
                    date: new Date(2024, 0, 1),
                    open: 150.25,
                    high: 152.8,
                    low: 149.5,
                    close: 152.3,
                    color: "#f44336",
                  },
                  {
                    date: new Date(2024, 0, 2),
                    open: 152.5,
                    high: 154.2,
                    low: 151.8,
                    close: 153.75,
                    color: "#4caf50",
                  },
                  {
                    date: new Date(2024, 0, 3),
                    open: 153.8,
                    high: 155.4,
                    low: 152.9,
                    close: 154.2,
                    color: "#2196f3",
                  },
                  
                ],
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date",
                name: "Stock Price",
                color: "#03a9f4",
                downColor: "#f44336",
              },
            ],
            navigator: {
              series: {
                type: "line",
                labels: {
                    visible: true,
                    color: "red"
                },
                data: [
                  {
                    date: new Date(2024, 0, 1),
                    open: 150.25,
                    high: 152.8,
                    low: 149.5,
                    close: 152.3,
                  },
                  {
                    date: new Date(2024, 0, 2),
                    open: 152.5,
                    high: 154.2,
                    low: 151.8,
                    close: 153.75,
                  },
                  {
                    date: new Date(2024, 0, 3),
                    open: 153.8,
                    high: 155.4,
                    low: 152.9,
                    close: 154.2,
                  },
                  
                ],
                field: "close",
                dateField: "date",
                color: "#ff9800",
              },
            },
          });
    </script>

### navigator.series.labels.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
            series: [
              {
                type: "candlestick",
                colorField: "color",
                data: [
                  {
                    date: new Date(2024, 0, 1),
                    open: 150.25,
                    high: 152.8,
                    low: 149.5,
                    close: 152.3,
                    color: "#f44336",
                  },
                  {
                    date: new Date(2024, 0, 2),
                    open: 152.5,
                    high: 154.2,
                    low: 151.8,
                    close: 153.75,
                    color: "#4caf50",
                  },
                  {
                    date: new Date(2024, 0, 3),
                    open: 153.8,
                    high: 155.4,
                    low: 152.9,
                    close: 154.2,
                    color: "#2196f3",
                  },
                  
                ],
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date",
                name: "Stock Price",
                color: "#03a9f4",
                downColor: "#f44336",
              },
            ],
            navigator: {
              series: {
                type: "line",
                labels: {
                    visible: true,
                    font: "16px Arial"
                },
                data: [
                  {
                    date: new Date(2024, 0, 1),
                    open: 150.25,
                    high: 152.8,
                    low: 149.5,
                    close: 152.3,
                  },
                  {
                    date: new Date(2024, 0, 2),
                    open: 152.5,
                    high: 154.2,
                    low: 151.8,
                    close: 153.75,
                  },
                  {
                    date: new Date(2024, 0, 3),
                    open: 153.8,
                    high: 155.4,
                    low: 152.9,
                    close: 154.2,
                  },
                  
                ],
                field: "close",
                dateField: "date",
                color: "#ff9800",
              },
            },
          });
    </script>

### navigator.series.labels.format `String`

The format of the labels.

#### Example

```pseudo
    //sets format of the labels
    format: "C"
```

### navigator.series.labels.margin `Number|Object`*(default: { left: 5, right: 5})*

The margin of the labels.

#### Example

```pseudo
    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and bottom margin to 1px
    // margin left and right are with 5px (by default)
    margin: { top: 1, bottom: 1 }
```

### navigator.series.labels.padding `Number|Object`*(default: 0)*

 The padding of the labels.

#### Example

```pseudo
    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // padding right and bottom are with 0px (by default)
    padding: { top: 1, left: 1 }
```

### navigator.series.labels.position `String`*(default: "above")*

Defines the position of the labels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
            series: [
              {
                type: "candlestick",
                colorField: "color",
                data: [
                  {
                    date: new Date(2024, 0, 1),
                    open: 150.25,
                    high: 152.8,
                    low: 149.5,
                    close: 152.3,
                    color: "#f44336",
                  },
                  {
                    date: new Date(2024, 0, 2),
                    open: 152.5,
                    high: 154.2,
                    low: 151.8,
                    close: 153.75,
                    color: "#4caf50",
                  },
                  {
                    date: new Date(2024, 0, 3),
                    open: 153.8,
                    high: 155.4,
                    low: 152.9,
                    close: 154.2,
                    color: "#2196f3",
                  },
                  
                ],
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date",
                name: "Stock Price",
                color: "#03a9f4",
                downColor: "#f44336",
              },
            ],
            navigator: {
              series: {
                type: "line",
                labels: {
                    visible: true,
                    position: "below"
                },
                data: [
                  {
                    date: new Date(2024, 0, 1),
                    open: 150.25,
                    high: 152.8,
                    low: 149.5,
                    close: 152.3,
                  },
                  {
                    date: new Date(2024, 0, 2),
                    open: 152.5,
                    high: 154.2,
                    low: 151.8,
                    close: 153.75,
                  },
                  {
                    date: new Date(2024, 0, 3),
                    open: 153.8,
                    high: 155.4,
                    low: 152.9,
                    close: 154.2,
                  },
                  
                ],
                field: "close",
                dateField: "date",
                color: "#ff9800",
              },
            },
          });
    </script>

#### *"above"*

The label is positioned at the top of the marker.

** Applicable for area and line series. **

#### *"center"*

The label is positioned at the point center.

** Applicable for column series only. **

#### *"insideEnd"*

The label is positioned inside, near the end of the point.

** Applicable for column series only. **

#### *"insideBase"*

The label is positioned inside, near the base of the bar.

** Applicable for column series. **

#### *"outsideEnd"*

The label is positioned outside, near the end of the bar.

** Applicable for column series only.  Not applicable for stacked series. **

#### *"right"*

The label is positioned to the right of the marker.

** Applicable for area and line series. **

#### *"below"*

The label is positioned at the bottom of the marker.

** Applicable for area and line series. **

#### *"left"*

The label is positioned to the left of the marker.

** Applicable for area and line series. **

### navigator.series.labels.template `String | Function`

The [template](/api/framework/kendo#methods-template) which renders the chart series label.

The fields which can be used in the template are:

*   category - the category name. Available for area, bar, column, bubble, donut, line and pie series.
*   dataItem - the original data item used to construct the point. Will be null if binding to array.
*   percentage - the point value represented as a percentage value. Available only for 100% stacked charts.
*   series - the data series
*   value - the point value. Can be a number or object containing each bound field.

#### Example

```pseudo
    $("#chart").kendoChart({
         title: {
             text: "My Chart Title"
         },
         series: [
             {
                 type: "area",
                 name: "Series 1",
                 data: [200, 450, 300, 125],
                 labels: {
                     // label template
                     template: "#= value #%",
                     visible: true
                 }
             }
         ],
         categoryAxis: {
             categories: [2000, 2001, 2002, 2003]
         }
    });
```

### navigator.series.labels.visible `Boolean`*(default: false)*

 The visibility of the labels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
            series: [
              {
                type: "candlestick",
                colorField: "color",
                data: [
                  {
                    date: new Date(2024, 0, 1),
                    open: 150.25,
                    high: 152.8,
                    low: 149.5,
                    close: 152.3,
                    color: "#f44336",
                  },
                  {
                    date: new Date(2024, 0, 2),
                    open: 152.5,
                    high: 154.2,
                    low: 151.8,
                    close: 153.75,
                    color: "#4caf50",
                  },
                  {
                    date: new Date(2024, 0, 3),
                    open: 153.8,
                    high: 155.4,
                    low: 152.9,
                    close: 154.2,
                    color: "#2196f3",
                  },
                  
                ],
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date",
                name: "Stock Price",
                color: "#03a9f4",
                downColor: "#f44336",
              },
            ],
            navigator: {
              series: {
                type: "line",
                labels: {
                    visible: true,
                },
                data: [
                  {
                    date: new Date(2024, 0, 1),
                    open: 150.25,
                    high: 152.8,
                    low: 149.5,
                    close: 152.3,
                  },
                  {
                    date: new Date(2024, 0, 2),
                    open: 152.5,
                    high: 154.2,
                    low: 151.8,
                    close: 153.75,
                  },
                  {
                    date: new Date(2024, 0, 3),
                    open: 153.8,
                    high: 155.4,
                    low: 152.9,
                    close: 154.2,
                  },
                  
                ],
                field: "close",
                dateField: "date",
                color: "#ff9800",
              },
            },
          });
    </script>

### navigator.series.line `String | Object`

Line options.

** Applicable to area, candlestick and ohlc series. **

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
            series: [
              {
                type: "candlestick",
                colorField: "color",
                data: [
                  {
                    date: new Date(2024, 0, 1),
                    open: 150.25,
                    high: 152.8,
                    low: 149.5,
                    close: 152.3,
                    color: "#f44336",
                  },
                  {
                    date: new Date(2024, 0, 2),
                    open: 152.5,
                    high: 154.2,
                    low: 151.8,
                    close: 153.75,
                    color: "#4caf50",
                  },
                  {
                    date: new Date(2024, 0, 3),
                    open: 153.8,
                    high: 155.4,
                    low: 152.9,
                    close: 154.2,
                    color: "#2196f3",
                  },
                  
                ],
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date",
                name: "Stock Price",
                color: "#03a9f4",
                downColor: "#f44336",
              },
            ],
            navigator: {
              series: {
                type: "line",
                line: {
                    color: "red",
                    width: 2
                },
                data: [
                  {
                    date: new Date(2024, 0, 1),
                    open: 150.25,
                    high: 152.8,
                    low: 149.5,
                    close: 152.3,
                  },
                  {
                    date: new Date(2024, 0, 2),
                    open: 152.5,
                    high: 154.2,
                    low: 151.8,
                    close: 153.75,
                  },
                  {
                    date: new Date(2024, 0, 3),
                    open: 153.8,
                    high: 155.4,
                    low: 152.9,
                    close: 154.2,
                  },
                ],
                field: "close",
                dateField: "date",
                color: "#ff9800",
              },
            },
          });
    </script>

### navigator.series.line.color `String`

The line color.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
            series: [
              {
                type: "candlestick",
                colorField: "color",
                data: [
                  {
                    date: new Date(2024, 0, 1),
                    open: 150.25,
                    high: 152.8,
                    low: 149.5,
                    close: 152.3,
                    color: "#f44336",
                  },
                  {
                    date: new Date(2024, 0, 2),
                    open: 152.5,
                    high: 154.2,
                    low: 151.8,
                    close: 153.75,
                    color: "#4caf50",
                  },
                  {
                    date: new Date(2024, 0, 3),
                    open: 153.8,
                    high: 155.4,
                    low: 152.9,
                    close: 154.2,
                    color: "#2196f3",
                  },
                  
                ],
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date",
                name: "Stock Price",
                color: "#03a9f4",
                downColor: "#f44336",
              },
            ],
            navigator: {
              series: {
                type: "line",
                line: {
                    color: "green",
                },
                data: [
                  {
                    date: new Date(2024, 0, 1),
                    open: 150.25,
                    high: 152.8,
                    low: 149.5,
                    close: 152.3,
                  },
                  {
                    date: new Date(2024, 0, 2),
                    open: 152.5,
                    high: 154.2,
                    low: 151.8,
                    close: 153.75,
                  },
                  {
                    date: new Date(2024, 0, 3),
                    open: 153.8,
                    high: 155.4,
                    low: 152.9,
                    close: 154.2,
                  },
                  
                ],
                field: "close",
                dateField: "date",
                color: "#ff9800",
              },
            },
          });
    </script>

### navigator.series.line.opacity `Number`*(default: 1)*

The line opacity.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
            series: [
              {
                type: "candlestick",
                colorField: "color",
                data: [
                  {
                    date: new Date(2024, 0, 1),
                    open: 150.25,
                    high: 152.8,
                    low: 149.5,
                    close: 152.3,
                    color: "#f44336",
                  },
                  {
                    date: new Date(2024, 0, 2),
                    open: 152.5,
                    high: 154.2,
                    low: 151.8,
                    close: 153.75,
                    color: "#4caf50",
                  },
                  {
                    date: new Date(2024, 0, 3),
                    open: 153.8,
                    high: 155.4,
                    low: 152.9,
                    close: 154.2,
                    color: "#2196f3",
                  },
                  
                ],
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date",
                name: "Stock Price",
                color: "#03a9f4",
                downColor: "#f44336",
              },
            ],
            navigator: {
              series: {
                type: "line",
                line: {
                    opacity: 0.5,
                },
                data: [
                  {
                    date: new Date(2024, 0, 1),
                    open: 150.25,
                    high: 152.8,
                    low: 149.5,
                    close: 152.3,
                  },
                  {
                    date: new Date(2024, 0, 2),
                    open: 152.5,
                    high: 154.2,
                    low: 151.8,
                    close: 153.75,
                  },
                  {
                    date: new Date(2024, 0, 3),
                    open: 153.8,
                    high: 155.4,
                    low: 152.9,
                    close: 154.2,
                  },
                  
                ],
                field: "close",
                dateField: "date",
                color: "#ff9800",
              },
            },
          });
    </script>

### navigator.series.line.width `String`*(default: 4)*

The line width.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
            series: [
              {
                type: "candlestick",
                colorField: "color",
                data: [
                  {
                    date: new Date(2024, 0, 1),
                    open: 150.25,
                    high: 152.8,
                    low: 149.5,
                    close: 152.3,
                    color: "#f44336",
                  },
                  {
                    date: new Date(2024, 0, 2),
                    open: 152.5,
                    high: 154.2,
                    low: 151.8,
                    close: 153.75,
                    color: "#4caf50",
                  },
                  {
                    date: new Date(2024, 0, 3),
                    open: 153.8,
                    high: 155.4,
                    low: 152.9,
                    close: 154.2,
                    color: "#2196f3",
                  },
                  
                ],
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date",
                name: "Stock Price",
                color: "#03a9f4",
                downColor: "#f44336",
              },
            ],
            navigator: {
              series: {
                type: "line",
                line: {
                    width: 6,
                },
                data: [
                  {
                    date: new Date(2024, 0, 1),
                    open: 150.25,
                    high: 152.8,
                    low: 149.5,
                    close: 152.3,
                  },
                  {
                    date: new Date(2024, 0, 2),
                    open: 152.5,
                    high: 154.2,
                    low: 151.8,
                    close: 153.75,
                  },
                  {
                    date: new Date(2024, 0, 3),
                    open: 153.8,
                    high: 155.4,
                    low: 152.9,
                    close: 154.2,
                  },
                  
                ],
                field: "close",
                dateField: "date",
                color: "#ff9800",
              },
            },
          });
    </script>

### navigator.series.lowField `String`

The data field containing the low value.

** Available for candlestick and ohlc series **

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            series: [{
                type: "candlestick",
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close"
            }]
        },
        dataSource: {
            data: [
                { date: new Date("2016/01/01"), open: 1, high: 3, low: 0.5, close: 2 },
                { date: new Date("2016/01/02"), open: 2, high: 4, low: 1.5, close: 3 }
            ]
        }
    });
    </script>

### navigator.series.markers `Object`

Marker options.

** Applicable for area and line series. **

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
            series: [
              {
                type: "candlestick",
                colorField: "color",
                data: [
                  {
                    date: new Date(2024, 0, 1),
                    open: 150.25,
                    high: 152.8,
                    low: 149.5,
                    close: 152.3,
                    color: "#f44336",
                  },
                  {
                    date: new Date(2024, 0, 2),
                    open: 152.5,
                    high: 154.2,
                    low: 151.8,
                    close: 153.75,
                    color: "#4caf50",
                  },
                  {
                    date: new Date(2024, 0, 3),
                    open: 153.8,
                    high: 155.4,
                    low: 152.9,
                    close: 154.2,
                    color: "#2196f3",
                  },
                  
                ],
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date",
                name: "Stock Price",
                color: "#03a9f4",
                downColor: "#f44336",
              },
            ],
            navigator: {
              series: {
                type: "line",
                markers: {
                    visible: true,
                    size: 8
                },
                data: [
                  {
                    date: new Date(2024, 0, 1),
                    open: 150.25,
                    high: 152.8,
                    low: 149.5,
                    close: 152.3,
                  },
                  {
                    date: new Date(2024, 0, 2),
                    open: 152.5,
                    high: 154.2,
                    low: 151.8,
                    close: 153.75,
                  },
                  {
                    date: new Date(2024, 0, 3),
                    open: 153.8,
                    high: 155.4,
                    low: 152.9,
                    close: 154.2,
                  },
                  
                ],
                field: "close",
                dateField: "date",
                color: "#ff9800",
              },
            },
          });
    </script>

### navigator.series.markers.background `String`

The background color of the current series markers.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
            series: [
              {
                type: "candlestick",
                colorField: "color",
                data: [
                  {
                    date: new Date(2024, 0, 1),
                    open: 150.25,
                    high: 152.8,
                    low: 149.5,
                    close: 152.3,
                    color: "#f44336",
                  },
                  {
                    date: new Date(2024, 0, 2),
                    open: 152.5,
                    high: 154.2,
                    low: 151.8,
                    close: 153.75,
                    color: "#4caf50",
                  },
                  {
                    date: new Date(2024, 0, 3),
                    open: 153.8,
                    high: 155.4,
                    low: 152.9,
                    close: 154.2,
                    color: "#2196f3",
                  },
                  
                ],
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date",
                name: "Stock Price",
                color: "#03a9f4",
                downColor: "#f44336",
              },
            ],
            navigator: {
              series: {
                type: "line",
                markers: {
                    visible: true,
                    background: "red"
                },
                data: [
                  {
                    date: new Date(2024, 0, 1),
                    open: 150.25,
                    high: 152.8,
                    low: 149.5,
                    close: 152.3,
                  },
                  {
                    date: new Date(2024, 0, 2),
                    open: 152.5,
                    high: 154.2,
                    low: 151.8,
                    close: 153.75,
                  },
                  {
                    date: new Date(2024, 0, 3),
                    open: 153.8,
                    high: 155.4,
                    low: 152.9,
                    close: 154.2,
                  },
                  
                ],
                field: "close",
                dateField: "date",
                color: "#ff9800",
              },
            },
          });
    </script>

### navigator.series.markers.border `Object`

The border of the markers.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
            series: [
              {
                type: "candlestick",
                colorField: "color",
                data: [
                  {
                    date: new Date(2024, 0, 1),
                    open: 150.25,
                    high: 152.8,
                    low: 149.5,
                    close: 152.3,
                    color: "#f44336",
                  },
                  {
                    date: new Date(2024, 0, 2),
                    open: 152.5,
                    high: 154.2,
                    low: 151.8,
                    close: 153.75,
                    color: "#4caf50",
                  },
                  {
                    date: new Date(2024, 0, 3),
                    open: 153.8,
                    high: 155.4,
                    low: 152.9,
                    close: 154.2,
                    color: "#2196f3",
                  },
                  
                ],
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date",
                name: "Stock Price",
                color: "#03a9f4",
                downColor: "#f44336",
              },
            ],
            navigator: {
              series: {
                type: "line",
                markers: {
                    visible: true,
                    border: {
                        color: "black",
                        width: 2
                    }
                },
                data: [
                  {
                    date: new Date(2024, 0, 1),
                    open: 150.25,
                    high: 152.8,
                    low: 149.5,
                    close: 152.3,
                  },
                  {
                    date: new Date(2024, 0, 2),
                    open: 152.5,
                    high: 154.2,
                    low: 151.8,
                    close: 153.75,
                  },
                  {
                    date: new Date(2024, 0, 3),
                    open: 153.8,
                    high: 155.4,
                    low: 152.9,
                    close: 154.2,
                  },
                  
                ],
                field: "close",
                dateField: "date",
                color: "#ff9800",
              },
            },
          });
    </script>

### navigator.series.markers.border.color `String`*(default: "black")*

 The color of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
            series: [
              {
                type: "candlestick",
                colorField: "color",
                data: [
                  {
                    date: new Date(2024, 0, 1),
                    open: 150.25,
                    high: 152.8,
                    low: 149.5,
                    close: 152.3,
                    color: "#f44336",
                  },
                  {
                    date: new Date(2024, 0, 2),
                    open: 152.5,
                    high: 154.2,
                    low: 151.8,
                    close: 153.75,
                    color: "#4caf50",
                  },
                  {
                    date: new Date(2024, 0, 3),
                    open: 153.8,
                    high: 155.4,
                    low: 152.9,
                    close: 154.2,
                    color: "#2196f3",
                  },
                  
                ],
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date",
                name: "Stock Price",
                color: "#03a9f4",
                downColor: "#f44336",
              },
            ],
            navigator: {
              series: {
                type: "line",
                markers: {
                    visible: true,
                    border: {
                        color: "black",
                    }
                },
                data: [
                  {
                    date: new Date(2024, 0, 1),
                    open: 150.25,
                    high: 152.8,
                    low: 149.5,
                    close: 152.3,
                  },
                  {
                    date: new Date(2024, 0, 2),
                    open: 152.5,
                    high: 154.2,
                    low: 151.8,
                    close: 153.75,
                  },
                  {
                    date: new Date(2024, 0, 3),
                    open: 153.8,
                    high: 155.4,
                    low: 152.9,
                    close: 154.2,
                  },
                  
                ],
                field: "close",
                dateField: "date",
                color: "#ff9800",
              },
            },
          });
    </script>

### navigator.series.markers.border.width `Number`*(default: 0)*

 The width of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
            series: [
              {
                type: "candlestick",
                colorField: "color",
                data: [
                  {
                    date: new Date(2024, 0, 1),
                    open: 150.25,
                    high: 152.8,
                    low: 149.5,
                    close: 152.3,
                    color: "#f44336",
                  },
                  {
                    date: new Date(2024, 0, 2),
                    open: 152.5,
                    high: 154.2,
                    low: 151.8,
                    close: 153.75,
                    color: "#4caf50",
                  },
                  {
                    date: new Date(2024, 0, 3),
                    open: 153.8,
                    high: 155.4,
                    low: 152.9,
                    close: 154.2,
                    color: "#2196f3",
                  },
                  
                ],
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date",
                name: "Stock Price",
                color: "#03a9f4",
                downColor: "#f44336",
              },
            ],
            navigator: {
              series: {
                type: "line",
                markers: {
                    visible: true,
                    border: {
                        width: 3,
                    }
                },
                data: [
                  {
                    date: new Date(2024, 0, 1),
                    open: 150.25,
                    high: 152.8,
                    low: 149.5,
                    close: 152.3,
                  },
                  {
                    date: new Date(2024, 0, 2),
                    open: 152.5,
                    high: 154.2,
                    low: 151.8,
                    close: 153.75,
                  },
                  {
                    date: new Date(2024, 0, 3),
                    open: 153.8,
                    high: 155.4,
                    low: 152.9,
                    close: 154.2,
                  },
                  
                ],
                field: "close",
                dateField: "date",
                color: "#ff9800",
              },
            },
          });
    </script>

### navigator.series.markers.rotation `Number|Function`

The rotation angle of the markers.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
          series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            markers: {
              type: "square",
              rotation: 45
            },
            data: [
              { value: 1, date: new Date(2012, 1, 1) },
              { value: 2, date: new Date(2012, 1, 2) }
            ]
          }]
        }
    });
    </script>

### navigator.series.markers.size `Number`*(default: 6)*

 The marker size.

#### Example

<div id="stockChart"></div>
  <script>
    $(document).ready(function () {
    // Sample local stock data
      var stockData = [
          { date: new Date(2024, 0, 1), open: 150.25, high: 152.80, low: 149.50, close: 152.30 },
          { date: new Date(2024, 0, 2), open: 152.50, high: 154.20, low: 151.80, close: 153.75 },
          { date: new Date(2024, 0, 3), open: 153.80, high: 155.40, low: 152.90, close: 154.20 },
          
      ];
  
      $("#stockChart").kendoStockChart({
          title: {
              text: "Tech Company Inc. (TCI) - Stock Prices"
          },
          series: [{
              type: "candlestick",
              data: stockData, // Data passed directly to series
              openField: "open",
              highField: "high",
              lowField: "low",
              closeField: "close",
              dateField: "date", // Specify date field for category axis
              name: "Stock Price",
              color: "#03a9f4",
              downColor: "#f44336"
          }],
          
          // ADDED NAVIGATOR CONFIGURATION
          navigator: {
          	series: {
          	    type: "line", // You can use "area", "candlestick", "ohlc" too
          	    data: stockData, // Navigator needs its own data reference
          	    field: "close", // Use closing price for navigator
          	    dateField: "date",
          	    markers: {
                  visible: true,
          	      size: 20
          	    }
          	},
          	select: {
          	    from: new Date(2024, 0, 10), // Initial selection start
          	    to: new Date(2024, 0, 20)    // Initial selection end
          	}
          },
          categoryAxis: {
          	baseUnit: "days",
          	labels: {
          	    format: "MMM dd"
          	}
          },
          valueAxis: {
          	labels: {
          	    format: "${0}"
          	}
          }
      });
	});
  </script>

### navigator.series.markers.type `String`*(default: "circle")*

Configures the markers shape type.

#### Example

    <div id="stockChart"></div>
    <script>
        $(document).ready(function () {
        var stockData = [
            { date: new Date(2024, 0, 1), open: 150.25, high: 152.80, low: 149.50, close: 152.30 },
            { date: new Date(2024, 0, 2), open: 152.50, high: 154.20, low: 151.80, close: 153.75 },
            { date: new Date(2024, 0, 3), open: 153.80, high: 155.40, low: 152.90, close: 154.20 },    
        ];
    
        $("#stockChart").kendoStockChart({
            title: {
                text: "Tech Company Inc. (TCI) - Stock Prices"
            },
            series: [{
                type: "candlestick",
                data: stockData, // Data passed directly to series
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date", // Specify date field for category axis
                name: "Stock Price",
                color: "#03a9f4",
                downColor: "#f44336"
            }],
            
            navigator: {
                series: {
                    type: "line", // You can use "area", "candlestick", "ohlc" too
                    data: stockData, // Navigator needs its own data reference
                    field: "close", // Use closing price for navigator
                    dateField: "date",
                    markers: {
                    visible: true,
                    size: 20,
                    type: "triangle"
                    }
                },
                select: {
                    from: new Date(2024, 0, 10), // Initial selection start
                    to: new Date(2024, 0, 20)    // Initial selection end
                }
            },
            categoryAxis: {
                baseUnit: "days",
                labels: {
                    format: "MMM dd"
                }
            },
            valueAxis: {
                labels: {
                    format: "${0}"
                }
            }
        });
        });
    </script>

#### *"square"*

The marker shape is square.

#### *"triangle"*

The marker shape is triangle.

#### *"circle"*

The marker shape is circle.

#### *"cross"*

The marker shape is cross.

### navigator.series.markers.visible `Boolean`*(default: false)*

The markers visibility.

#### Example

    <div id="stockChart"></div>
    <script>
        $(document).ready(function () {
        var stockData = [
            { date: new Date(2024, 0, 1), open: 150.25, high: 152.80, low: 149.50, close: 152.30 },
            { date: new Date(2024, 0, 2), open: 152.50, high: 154.20, low: 151.80, close: 153.75 },
            { date: new Date(2024, 0, 3), open: 153.80, high: 155.40, low: 152.90, close: 154.20 },
        ];
    
        $("#stockChart").kendoStockChart({
            title: {
                text: "Tech Company Inc. (TCI) - Stock Prices"
            },
            series: [{
                type: "candlestick",
                data: stockData, // Data passed directly to series
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date", // Specify date field for category axis
                name: "Stock Price",
                color: "#03a9f4",
                downColor: "#f44336"
            }],
            
            navigator: {
                series: {
                    type: "line", // You can use "area", "candlestick", "ohlc" too
                    data: stockData, // Navigator needs its own data reference
                    field: "close", // Use closing price for navigator
                    dateField: "date",
                    markers: {
                    visible: true,
                    size: 20,
                    type: "triangle"
                    }
                },
                select: {
                    from: new Date(2024, 0, 10), // Initial selection start
                    to: new Date(2024, 0, 20)    // Initial selection end
                }
            },
            categoryAxis: {
                baseUnit: "days",
                labels: {
                    format: "MMM dd"
                }
            },
            valueAxis: {
                labels: {
                    format: "${0}"
                }
            }
        });
        });
    </script>

### navigator.series.missingValues `String`

The behavior for handling missing values. The supported values are:

* "gap" - the plot stops before the missing point and continues after it.
* "interpolate" - the value is interpolated from neighboring points.
* "zero" - the value is assumed to be zero.

> The default value is "interpolate", except for "area" and stacked series which default to "zero".

> The `missingValues` option is supported when [series.type](/api/javascript/dataviz/ui/stock-chart#configuration-series.type) is set to "area" and "line".

#### Example

    <div id="stockChart"></div>
    <script>
        $(document).ready(function () {
        // Sample local stock data
        var stockData = [
            { date: new Date(2024, 0, 1), open: 150.25, high: 152.80, low: 149.50, close: 152.30 },
            { date: new Date(2024, 0, 2), open: 152.50, high: 154.20, low: 151.80, close: 153.75 },
            { date: new Date(2024, 0, 3), open: 153.80, high: 155.40, low: 152.90, close: 154.20 },  
        ];
    
        $("#stockChart").kendoStockChart({
            series: [{
                type: "candlestick",
                data: stockData, // Data passed directly to series
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date", // Specify date field for category axis
                name: "Stock Price"
            }],
            navigator: {
                series: {
                    type: "line", // You can use "area", "candlestick", "ohlc" too
                    data: stockData, // Navigator needs its own data reference
                    field: "close", // Use closing price for navigator
                    dateField: "date",
                    markers: {
                    visible: true,
                    missingValues: "gap"
                    }
                },
                select: {
                    from: new Date(2024, 0, 10), // Initial selection start
                    to: new Date(2024, 0, 20)    // Initial selection end
                }
            },
            categoryAxis: {
                baseUnit: "days",
                labels: {
                    format: "MMM dd"
                }
            },
            valueAxis: {
                labels: {
                    format: "${0}"
                }
            }
        });
        });
    </script>

### navigator.series.style `String` *(default: "normal")*

The supported values are:

* "normal" - The values will be connected with straight line.
* "step" - The values will be connected with a line with right angle.

> The default value is "normal".

> The `style` option is supported when [series.type](/api/javascript/dataviz/ui/stock-chart#configuration-series.type) is set to "area", "line".

#### Example

<div id="stockChart"></div>
    <script>
      $(document).ready(function () {
      // Sample local stock data
        var stockData = [
            { date: new Date(2024, 0, 1), open: 150.25, high: 152.80, low: 149.50, close: 152.30 },
            { date: new Date(2024, 0, 2), open: 152.50, high: 154.20, low: 151.80, close: 153.75 },
            { date: new Date(2024, 0, 3), open: 153.80, high: 155.40, low: 152.90, close: 154.20 },
            
        ];
    
        $("#stockChart").kendoStockChart({
            series: [{
                type: "area",
                data: stockData, // Data passed directly to series
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date", // Specify date field for category axis
                name: "Stock Price"
            }],
            navigator: {
            	series: {
            	    type: "area",
            	    data: stockData, // Navigator needs its own data reference
            	    field: "close", // Use closing price for navigator
            	    dateField: "date",
            	    markers: {
                    visible: true,
            	      style: "step"
            	    }
            	},
            	select: {
            	    from: new Date(2024, 0, 10), // Initial selection start
            	    to: new Date(2024, 0, 20)    // Initial selection end
            	}
            },
            categoryAxis: {
            	baseUnit: "days",
            	labels: {
            	    format: "MMM dd"
            	}
            },
            valueAxis: {
            	labels: {
            	    format: "${0}"
            	}
            }
        });
  	});
    </script>

### navigator.series.opacity `Number`

The series opacity.

#### Example

    <div id="stockChart"></div>
    <script>
      $(document).ready(function () {
        var stockData = [
            { date: new Date(2024, 0, 1), open: 150.25, high: 152.80, low: 149.50, close: 152.30 },
            { date: new Date(2024, 0, 2), open: 152.50, high: 154.20, low: 151.80, close: 153.75 },
            { date: new Date(2024, 0, 3), open: 153.80, high: 155.40, low: 152.90, close: 154.20 },   
        ];
    
        $("#stockChart").kendoStockChart({
            series: [{
                type: "candlestick",
                data: stockData, // Data passed directly to series
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date", // Specify date field for category axis
                name: "Stock Price"
            }],
            navigator: {
            	series: {
            	    type: "candlestick",
            	    data: stockData,
            	    field: "close",
            	    dateField: "date",
            	    opacity: 0.5
            	},
            	select: {
            	    from: new Date(2024, 0, 10), // Initial selection start
            	    to: new Date(2024, 0, 20)    // Initial selection end
            	}
            },
            categoryAxis: {
            	baseUnit: "days",
            	labels: {
            	    format: "MMM dd"
            	}
            },
            valueAxis: {
            	labels: {
            	    format: "${0}"
            	}
            }
        });
  	});
    </script>

### navigator.series.openField `String`

The data field containing the open value.

** Available for candlestick and ohlc series **

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            series: [{
                type: "candlestick",
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close"
            }]
        },
        dataSource: {
            data: [
                { date: new Date("2016/01/01"), open: 1, high: 3, low: 0.5, close: 2 },
                { date: new Date("2016/01/02"), open: 2, high: 4, low: 1.5, close: 3 }
            ]
        }
    });
    </script>

### navigator.series.overlay `Object`

The effects overlay.

#### Example

    <div id="stockChart"></div>
    <script>
      $(document).ready(function () {
      // Sample local stock data
        var stockData = [
            { date: new Date(2024, 0, 1), open: 150.25, high: 152.80, low: 149.50, close: 152.30 },
            { date: new Date(2024, 0, 2), open: 152.50, high: 154.20, low: 151.80, close: 153.75 },
            { date: new Date(2024, 0, 3), open: 153.80, high: 155.40, low: 152.90, close: 154.20 },    
        ];
    
        $("#stockChart").kendoStockChart({
            series: [{
                type: "candlestick",
                data: stockData, // Data passed directly to series
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date", // Specify date field for category axis
                name: "Stock Price"
            }],
            navigator: {
            	series: {
            	    type: "candlestick", 
            	    data: stockData, // Navigator needs its own data reference
            	    field: "close", // Use closing price for navigator
            	    dateField: "date",
            	    overlay: {
                    	gradient: "glass"
                	}
            	},
            	select: {
            	    from: new Date(2024, 0, 10), // Initial selection start
            	    to: new Date(2024, 0, 20)    // Initial selection end
            	}
            },
            categoryAxis: {
            	baseUnit: "days",
            	labels: {
            	    format: "MMM dd"
            	}
            },
            valueAxis: {
            	labels: {
            	    format: "${0}"
            	}
            }
        });
  	});
    </script>

### navigator.series.overlay.gradient `String`

The gradient name.

Available options:

* **glass** (column and candlestick series)
* **none**

#### Example

    <div id="stockChart"></div>
    <script>
      $(document).ready(function () {
      // Sample local stock data
        var stockData = [
            { date: new Date(2024, 0, 1), open: 150.25, high: 152.80, low: 149.50, close: 152.30 },
            { date: new Date(2024, 0, 2), open: 152.50, high: 154.20, low: 151.80, close: 153.75 },
            { date: new Date(2024, 0, 3), open: 153.80, high: 155.40, low: 152.90, close: 154.20 },     
        ];
    
        $("#stockChart").kendoStockChart({
            series: [{
                type: "candlestick",
                data: stockData, // Data passed directly to series
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date", // Specify date field for category axis
                name: "Stock Price"
            }],
            navigator: {
            	series: {
            	    type: "candlestick", 
            	    data: stockData, // Navigator needs its own data reference
            	    field: "close", // Use closing price for navigator
            	    dateField: "date",
            	    overlay: {
                    	gradient: "glass"
                	}
            	},
            	select: {
            	    from: new Date(2024, 0, 10), // Initial selection start
            	    to: new Date(2024, 0, 20)    // Initial selection end
            	}
            },
            categoryAxis: {
            	baseUnit: "days",
            	labels: {
            	    format: "MMM dd"
            	}
            },
            valueAxis: {
            	labels: {
            	    format: "${0}"
            	}
            }
        });
  	});
    </script>

### navigator.series.spacing `Number`*(default: 0.4)*

Space between points as proportion of the point width.

Available for column, candlestick and ohlc series.

#### Example

    <div id="stockChart"></div>
    <script>
      $(document).ready(function () {
      // Sample local stock data
        var stockData = [
            { date: new Date(2024, 0, 1), open: 150.25, high: 152.80, low: 149.50, close: 152.30 },
            { date: new Date(2024, 0, 2), open: 152.50, high: 154.20, low: 151.80, close: 153.75 },
            { date: new Date(2024, 0, 3), open: 153.80, high: 155.40, low: 152.90, close: 154.20 }, 
        ];
    
        $("#stockChart").kendoStockChart({
            series: [{
                type: "candlestick",
                data: stockData, // Data passed directly to series
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date", // Specify date field for category axis
                name: "Stock Price"
            }],
            navigator: {
            	series: {
            	    type: "candlestick", 
            	    data: stockData, // Navigator needs its own data reference
            	    field: "close", // Use closing price for navigator
            	    dateField: "date",
            	    spacing: 0.8
            	},
            	select: {
            	    from: new Date(2024, 0, 10), // Initial selection start
            	    to: new Date(2024, 0, 20)    // Initial selection end
            	}
            },
            categoryAxis: {
            	baseUnit: "days",
            	labels: {
            	    format: "MMM dd"
            	}
            },
            valueAxis: {
            	labels: {
            	    format: "${0}"
            	}
            }
        });
  	});
    </script>

### navigator.series.stack `Boolean|String|Object` *(default: false)*

A boolean value indicating if the series should be stacked.
A string value is interpreted as [navigator.series.stack.group](/api/javascript/dataviz/ui/stock-chart#configuration-series.stack.group).

> The `stack` options is supported when [navigator.series.type](/api/javascript/dataviz/ui/stock-chart#configuration-series.type) is set to "bar", "column", "line", "area", "verticalLine", "verticalArea", "radarLine", "radarArea" and "radarColumn".

> Stack settings of the first series are applied to the rest of the series.

#### Example

    <div id="stockChart"></div>
    <script>
      $(document).ready(function () {
      // Sample local stock data
        var stockData = [
            { date: new Date(2024, 0, 1), open: 150.25, high: 152.80, low: 149.50, close: 152.30 },
            { date: new Date(2024, 0, 2), open: 152.50, high: 154.20, low: 151.80, close: 153.75 },
            { date: new Date(2024, 0, 3), open: 153.80, high: 155.40, low: 152.90, close: 154.20 },
        ];
    
        $("#stockChart").kendoStockChart({
            series: [{
                type: "candlestick",
                data: stockData, // Data passed directly to series
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date", // Specify date field for category axis
                name: "Stock Price"
            }],
            navigator: {
            	series: {
            	    type: "bar", 
            	    data: stockData, // Navigator needs its own data reference
            	    field: "close", // Use closing price for navigator
            	    dateField: "date",
            	    stack: true
            	},
            	select: {
            	    from: new Date(2024, 0, 10), // Initial selection start
            	    to: new Date(2024, 0, 20)    // Initial selection end
            	}
            },
            categoryAxis: {
            	baseUnit: "days",
            	labels: {
            	    format: "MMM dd"
            	}
            },
            valueAxis: {
            	labels: {
            	    format: "${0}"
            	}
            }
        });
  	});
    </script>

### navigator.series.stack.type `String` *(default: "normal")*

The type of stack to plot. The following types are supported:

* "normal" - the value of the stack is the sum of all points in the category (or group)
* "100%" - the value of the stack is always 100% (1.00). Points within the category (or group) are represented as percentages.

#### Example

    <div id="stockChart"></div>
    <script>
      $(document).ready(function () {
        var stockData = [
            { date: new Date(2024, 0, 1), open: 150.25, high: 152.80, low: 149.50, close: 152.30 },
            { date: new Date(2024, 0, 2), open: 152.50, high: 154.20, low: 151.80, close: 153.75 },
            { date: new Date(2024, 0, 3), open: 153.80, high: 155.40, low: 152.90, close: 154.20 },  
        ];
    
        $("#stockChart").kendoStockChart({
            series: [{
                type: "candlestick",
                data: stockData, // Data passed directly to series
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date", // Specify date field for category axis
                name: "Stock Price"
            }],
            navigator: {
            	series: {
            	    type: "bar", 
            	    data: stockData, // Navigator needs its own data reference
            	    field: "close", // Use closing price for navigator
            	    dateField: "date",
            	    stack: { type: "100%" }
            	},
            	select: {
            	    from: new Date(2024, 0, 10), // Initial selection start
            	    to: new Date(2024, 0, 20)    // Initial selection end
            	}
            },
            categoryAxis: {
            	baseUnit: "days",
            	labels: {
            	    format: "MMM dd"
            	}
            },
            valueAxis: {
            	labels: {
            	    format: "${0}"
            	}
            }
        });
  	});
    </script>

### navigator.series.stack.group `String`

Indicates that the series should be stacked in a group with the specified name.

> The `group` option is supported when [navigator.series.type](/api/javascript/dataviz/ui/stock-chart#configuration-series.type) is set to "bar" or "column".

#### Example

    <div id="stockChart"></div>
    <script>
      $(document).ready(function () {
      // Sample local stock data
        var stockData = [
            { date: new Date(2024, 0, 1), open: 150.25, high: 152.80, low: 149.50, close: 152.30 },
            { date: new Date(2024, 0, 2), open: 152.50, high: 154.20, low: 151.80, close: 153.75 },
            { date: new Date(2024, 0, 3), open: 153.80, high: 155.40, low: 152.90, close: 154.20 },
        ];
    
        $("#stockChart").kendoStockChart({
            series: [{
                type: "candlestick",
                data: stockData, // Data passed directly to series
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date", // Specify date field for category axis
                name: "Stock Price"
            }],
            navigator: {
            	series: {
            	    type: "bar", 
            	    data: stockData, // Navigator needs its own data reference
            	    field: "close", // Use closing price for navigator
            	    dateField: "date",
            	    stack: { group: "group1" }
            	},
            	select: {
            	    from: new Date(2024, 0, 10), // Initial selection start
            	    to: new Date(2024, 0, 20)    // Initial selection end
            	}
            },
            categoryAxis: {
            	baseUnit: "days",
            	labels: {
            	    format: "MMM dd"
            	}
            },
            valueAxis: {
            	labels: {
            	    format: "${0}"
            	}
            }
        });
  	});
  </script>

### navigator.series.tooltip `Object`

The data point tooltip configuration options.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            series: {
                tooltip: {
                    visible: true,
                    template: "Value: #= value #"
                }
            }
        }
    });
    </script>

### navigator.series.tooltip.background `String`

The background color of the tooltip. The default is determined from the series color.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            series: {
                tooltip: {
                    background: "#ffcc00"
                }
            }
        }
    });
    </script>

### navigator.series.tooltip.border `Object`

The border configuration options.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            series: {
                tooltip: {
                    border: {
                        color: "red",
                        width: 2
                    }
                }
            }
        }
    });
    </script>

### navigator.series.tooltip.border.color `String`*(default: "black")*

The color of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            series: {
                tooltip: {
                    border: {
                        color: "blue"
                    }
                }
            }
        }
    });
    </script>

### navigator.series.tooltip.border.width `Number`*(default: 0)*

The width of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            series: {
                tooltip: {
                    border: {
                        width: 3
                    }
                }
            }
        }
    });
    </script>

### navigator.series.tooltip.color `String`

The text color of the tooltip. The default is the same as the series labels color.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            series: {
                tooltip: {
                    color: "white"
                }
            }
        }
    });
    </script>

### navigator.series.tooltip.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The tooltip font.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            series: {
                tooltip: {
                    font: "14px Arial, sans-serif"
                }
            }
        }
    });
    </script>

### navigator.series.tooltip.format `String`

The tooltip format. Format variables depend on the series type:

* Area, column, line and pie
    *   **0** - value
* Candlestick and OHLC
    *   **0** - open value
    *   **1** - high value
    *   **2** - low value
    *   **3** - close value
    *   **4** - category name

#### Example

```pseudo
    //sets format of the tooltip
    format: "{0:C}--{1:C}"
```

### navigator.series.tooltip.padding `Number|Object`

The padding of the tooltip.

#### Example

```pseudo
    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // right and bottom padding are left at their default values
    padding: { top: 1, left: 1 }
```

### navigator.series.tooltip.template `String|Function`

The tooltip template.
Template variables:

*   **value** - the point value (either a number or an object)
*   **category** - the category name
*   **series** - the data series
*   **dataItem** - the original data item used to construct the point.
        Will be null if binding to array.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
          series: {
            tooltip: {
              visible: true,
              template: "#= value # - #= date #"
            },

            type: "line",
            field: "value",
            categoryField: "date",
            data: [
              { value: 1, date: new Date(2012, 1, 1) },
              { value: 2, date: new Date(2012, 1, 2) }
            ]
          }
        }
    });
    </script>

### navigator.series.tooltip.visible `Boolean`*(default: false)*

A value indicating if the tooltip should be displayed.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            series: {
                tooltip: {
                    visible: true
                }
            }
        }
    });
    </script>

### navigator.series.width `Number`

The line width.

** Applicable for line series. **

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            series: {
                type: "line",
                width: 3
            }
        }
    });
    </script>

### navigator.select `Object`

Specifies the initially selected range.

The full range of values is shown if no range is specified.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
          select: {
              from: "2012/02/01",
              to: "2012/02/02"
          },

          series: {
            type: "line",
            field: "value",
            categoryField: "date",
            tooltip: {
              visible: true,
              template: "#= value # - #= date #"
            },
            data: [
              { value: 1, date: new Date(2012, 1, 1) },
              { value: 2, date: new Date(2012, 1, 2) },
              { value: 1, date: new Date(2012, 1, 3) }
            ]
          }
        }
    });
    </script>

### navigator.select.from `Date`|`String`

The lower boundary of the selected range.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            select: {
                from: new Date("2023/1/1"),
                to: new Date("2023/3/1")
            }
        }
    });
    </script>

### navigator.select.mousewheel `Object | Boolean`

The mousewheel configuration of the selection.

If set to `false` the mousewheel will not update the selection.

#### Example - configure the selection mousewheel behavior

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
          select: {
              from: "2012/02/01",
              to: "2012/02/02",
              mousewheel: {
                reverse: true,
                zoom: "both"
              }
          },

          series: {
            type: "line",
            field: "value",
            categoryField: "date",
            tooltip: {
              visible: true,
              template: "#= value # - #= date #"
            },
            data: [
              { value: 1, date: new Date(2012, 1, 1) },
              { value: 2, date: new Date(2012, 1, 2) },
              { value: 1, date: new Date(2012, 1, 3) }
            ]
          }
        }
    });
    </script>

#### Example - disable the selection mousewheel behavior

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
          select: {
              from: "2012/02/01",
              to: "2012/02/02",
              mousewheel: false
          },

          series: {
            type: "line",
            field: "value",
            categoryField: "date",
            tooltip: {
              visible: true,
              template: "#= value # - #= date #"
            },
            data: [
              { value: 1, date: new Date(2012, 1, 1) },
              { value: 2, date: new Date(2012, 1, 2) },
              { value: 1, date: new Date(2012, 1, 3) }
            ]
          }
        }
    });
    </script>

### navigator.select.mousewheel.reverse `Boolean` *(default: false)*

If set to `true` will reverse the mouse wheel direction. The normal direction is down for "zoom out", up for "zoom in".

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            select: {
                mousewheel: {
                    reverse: true
                }
            }
        }
    });
    </script>

### navigator.select.mousewheel.zoom `String` *(default: "both")*

The zoom direction.

The supported values are:

* "both" - zooming expands and contracts the selection both sides
* "left" - zooming expands and contracts the selection left side only
* "right" - zooming expands and contracts the selection right side only

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            select: {
                mousewheel: {
                    zoom: "left"
                }
            }
        }
    });
    </script>


### navigator.select.to `Date`|`String`

The upper boundary of the selected range.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            select: {
                from: new Date("2023/1/1"),
                to: new Date("2023/6/1")
            }
        }
    });
    </script>

### navigator.hint `Object`

Default options for the navigator hint.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            hint: {
                visible: true,
                format: "From: {0:d} To: {1:d}"
            }
        }
    });
    </script>

### navigator.hint.visible `Boolean`*(default: true)*

The visibility of the hint.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            hint: {
                visible: false
            }
        }
    });
    </script>

### navigator.hint.template `String | Function`

The hint template.
Template variables:

*   **from** - The lower boundary of the selected range
*   **to** - Theupper boundary of the selected range

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
          hint: {
            template: "From: #= from # To: #= to #"
          },

          series: {
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
              { value: 1, date: new Date(2012, 1, 1) },
              { value: 2, date: new Date(2012, 1, 2) },
              { value: 1, date: new Date(2012, 1, 3) }
            ]
          }
        }
    });
    </script>

### navigator.hint.format `String`

The format of the hint.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        navigator: {
            hint: {
                format: "From: {0:MMM yyyy} To: {1:MMM yyyy}"
            }
        }
    });
    </script>

### navigator.visible `Boolean`*(default: true)*

The visibility of the navigator.


#### Example

```pseudo
    //sets format of the hint
    format: "From: {0:d} To: {1:d}"
```

### axisDefaults `Object`

Default options for all chart axes.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        axisDefaults: {
            line: {
                color: "red",
                width: 2
            },
            labels: {
                color: "blue",
                font: "12px Arial"
            }
        }
    });
    </script>

### categoryAxis `Array`

The category axis configuration options.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        categoryAxis: {
            field: "date",
            labels: {
                format: "MMM yyyy"
            },
            majorGridLines: {
                visible: true
            }
        }
    });
    </script>

### categoryAxis.axisCrossingValue `Object | Date | Array`

Category index at which the first value axis crosses this axis. (Only for object)

Category indicies at which the value axes cross the category axis. (Only for array)

**Note:** Specify an index greater than or equal to the number
of categories to denote the far end of the axis.

#### Example

```pseudo
    $("#stock-chart").kendoStockChart({
         categoryAxis: {
             categories: ["A", "B"],
             axisCrossingValue: [0, 100]
         },
         valueAxis: [{ }, { name: "secondary" }]
    });
```

### categoryAxis.color `String`

Color to apply to all axis elements. Any valid CSS color string will work here, including hex and rgb.
Individual color settings for line and labels take priority.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        categoryAxis: {
            color: "green"
        }
    });
    </script>

### categoryAxis.field `String`

The data field containing the category name.

#### Example

    <div id="chart"></div>
    <script>

    // assuming the following data...
    var data = [ { sales: 200, year: 2005 }, { sales: 300, year: 2006 }, { sales: 400, year: 2007 }];
    // specify the "year" as the field for the category axis
    $("#chart").kendoChart({
        dataSource: {
            data: data
        },
        categoryAxis: {
            field: "year"
        }
    });
    </script>

### categoryAxis.justified `Boolean`*(default: false)*

Positions categories and series points on major ticks. This removes the empty space before and after the series.

This option is ignored if either column, ohlc or candlestick series are plotted on the axis.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        categoryAxis: {
            justified: true
        }
    });
    </script>

### categoryAxis.labels `Object`

Configures the axis labels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        categoryAxis: {
            labels: {
                color: "red",
                font: "12px Arial",
                rotation: 45
            }
        }
    });
    </script>

### categoryAxis.labels.background `String`

The background color of the labels. Any valid CSS color string will work here, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        categoryAxis: {
            labels: {
                background: "yellow"
            }
        }
    });
    </script>

### categoryAxis.labels.border `Object`

The border of the labels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        categoryAxis: {
            labels: {
                border: {
                    color: "blue",
                    width: 1,
                    dashType: "solid"
                }
            }
        }
    });
    </script>

### categoryAxis.labels.border.color `String`*(default: "black")*

The color of the border. Any valid CSS color string will work here, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        categoryAxis: {
            labels: {
                border: {
                    color: "red"
                }
            }
        }
    });
    </script>

### categoryAxis.labels.border.dashType `String`*(default: "solid")*

The dash type of the border.

#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        categoryAxis: {
            labels: {
                border: {
                    dashType: "dash"
                }
            }
        }
    });
    </script>

### categoryAxis.labels.border.width `Number`*(default: 0)*

The width of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        categoryAxis: {
            labels: {
                border: {
                    width: 2
                }
            }
        }
    });
    </script>

### categoryAxis.labels.color `String`

The text color of the labels. Any valid CSS color string will work here, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        categoryAxis: {
            labels: {
                color: "blue"
            }
        }
    });
    </script>

### categoryAxis.labels.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        categoryAxis: {
            labels: {
                font: "14px Verdana"
            }
        }
    });
    </script>

### categoryAxis.labels.format `String`

The format of the labels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        categoryAxis: {
            labels: {
                format: "MMM yyyy"
            }
        }
    });
    </script>

### categoryAxis.labels.margin `Number | Object`*(default: 0)*

The margin of the labels.

#### Example

```pseudo
    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and left margin to 1px
    // margin right and bottom are with 0px (by default)
    margin: { top: 1, left: 1 }
```

### categoryAxis.labels.mirror `Boolean`

Mirrors the axis labels and ticks.
If the labels are normally on the left side of the axis,
mirroring the axis will render them to the right.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        categoryAxis: {
            labels: {
                mirror: true
            }
        }
    });
    </script>

### categoryAxis.labels.padding `Number | Object`*(default: 0)*

The padding of the labels.

#### Example

```pseudo
    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // padding right and bottom are with 0px (by default)
    padding: { top: 1, left: 1 }
```

### categoryAxis.labels.rotation `Number`*(default: 0)*

The rotation angle of the labels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        categoryAxis: {
            labels: {
                rotation: 45
            }
        }
    });
    </script>

### categoryAxis.labels.skip `Number`*(default: 1)*

Number of labels to skip.
Skips rendering the first n labels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        categoryAxis: {
            labels: {
                skip: 2
            }
        }
    });
    </script>

### categoryAxis.labels.step `Number`*(default: 1)*

Label rendering step.
Every n-th label is rendered where n is the step

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        categoryAxis: {
            labels: {
                step: 2
            }
        }
    });
    </script>

### categoryAxis.labels.template `String | Function`

The [template](/api/framework/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* value - the category value
* dataItem - the data item for the category
* format - the default format of the label
* culture - the default culture (if set) on the label
* index - the 0-based index of the current label
* count - the total number of labels on the axis

#### Example

    <div id="chart"></div>
    <script>
    // chart initialization
    $("#chart").kendoChart({
         title: {
             text: "My Chart Title"
         },
         series: [{
             name: "Series 1",
             data: [200, 450, 300, 125]
         }],
         categoryAxis: {
             categories: [2000, 2001, 2002, 2003],
             labels: {
                 // labels template
                 template: "Year: #= value #"
             }
         }
    });
    </script>

### categoryAxis.labels.visible `Boolean`*(default: true)*

The visibility of the labels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        categoryAxis: {
            labels: {
                visible: false
            }
        }
    });
    </script>

### categoryAxis.line `Object`

Configures the axis line. This will also effect major and minor ticks, but not gridlines.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            line: {
                color: "#ff6800",
                width: 3,
                visible: true
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.line.color `String`*(default: "black")*

The color of the lines. Any valid CSS color string will work here, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            line: {
                color: "#ff6800"
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

**Note:** This will also effect the major and minor ticks, but not the grid lines.

### categoryAxis.line.dashType `String`*(default: "solid")*

The dash type of the line.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            line: {
                dashType: "dash"
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### categoryAxis.line.visible `Boolean`*(default: true)*

The visibility of the lines.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            line: {
                visible: false
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.line.width `Number`*(default: 1)*

The width of the line. This will also effect the major and minor ticks, but
not the grid lines.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            line: {
                width: 3
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.majorGridLines `Object`

Configures the major grid lines. These are the lines that are an extension of the major ticks through the
body of the chart.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            majorGridLines: {
                visible: true,
                color: "#cccccc",
                width: 1
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.majorGridLines.color `String`*(default: "black")*

The color of the lines. Any valid CSS color string will work here, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            majorGridLines: {
                color: "#ff6800"
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.majorGridLines.dashType `String`*(default: "solid")*

The dash type of the grid lines.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            majorGridLines: {
                dashType: "dash"
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### categoryAxis.majorGridLines.visible `Boolean`*(default: false)*

The visibility of the lines.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            majorGridLines: {
                visible: true
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.majorGridLines.width `Number`*(default: 1)*

The width of the lines.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            majorGridLines: {
                width: 2
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.majorGridLines.step `Number` *(default: 1)*

The step of the category axis major grid lines.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 },
                { date: new Date("2012/01/04"), close: 330, volume: 55000 },
                { date: new Date("2012/01/05"), close: 340, volume: 60000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            majorGridLines: {
                step: 2
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.majorGridLines.skip `Number` *(default: 0)*

The skip of the category axis major grid lines.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 },
                { date: new Date("2012/01/04"), close: 330, volume: 55000 },
                { date: new Date("2012/01/05"), close: 340, volume: 60000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            majorGridLines: {
                skip: 1
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.majorTicks `Object`

The major ticks of the axis.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            majorTicks: {
                visible: true,
                color: "#ff6800",
                size: 6
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.majorTicks.color `String` *(default: "black")*

The color of the category axis major ticks lines. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            majorTicks: {
                color: "#ff6800"
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.majorTicks.size `Number`*(default: 4)*

The axis major tick size. This is the length of the line in pixels that is drawn to indicate the tick
on the chart.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            majorTicks: {
                size: 8
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.majorTicks.width `Number` *(default: 1)*

The width of the major ticks in pixels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            majorTicks: {
                width: 3
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.majorTicks.visible `Boolean`*(default: true)*

The visibility of the major ticks.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            majorTicks: {
                visible: false
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.majorTicks.step `Number` *(default: 1)*

The step of the category axis major ticks.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 },
                { date: new Date("2012/01/04"), close: 330, volume: 55000 },
                { date: new Date("2012/01/05"), close: 340, volume: 60000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            majorTicks: {
                step: 2
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.majorTicks.skip `Number` *(default: 0)*

The skip of the category axis major ticks.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 },
                { date: new Date("2012/01/04"), close: 330, volume: 55000 },
                { date: new Date("2012/01/05"), close: 340, volume: 60000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            majorTicks: {
                skip: 1
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.minorGridLines `Object`

Configures the minor grid lines.  These are the lines that are an extension of the minor ticks through
the body of the chart.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            minorGridLines: {
                visible: true,
                color: "#f0f0f0",
                width: 1
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

Note that minor grid lines are not visible by default, therefore none of these settings will take effect with the minor grid lines visibility being set to **true**.

### categoryAxis.minorGridLines.color `String`*(default: "black")*

The color of the lines. Any valid CSS color string will work here, including hex and
rgb.

Note that this setting has no effect if the visibility of the minor
grid lines is not set to **true**.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            minorGridLines: {
                visible: true,
                color: "#ff6800"
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.minorGridLines.dashType `String`*(default: "solid")*

The dash type of the grid lines.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            minorGridLines: {
                visible: true,
                dashType: "dash"
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### categoryAxis.minorGridLines.visible `Boolean`*(default: false)*

The visibility of the lines.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            minorGridLines: {
                visible: true
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.minorGridLines.width `Number`

The width of the lines.

Note that this setting has no effect if the visibility of the minor
grid lines is not set to **true**.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            minorGridLines: {
                visible: true,
                width: 2
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.minorGridLines.step `Number` *(default: 1)*

The step of the category axis minor grid lines.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 },
                { date: new Date("2012/01/04"), close: 330, volume: 55000 },
                { date: new Date("2012/01/05"), close: 340, volume: 60000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            minorGridLines: {
                visible: true,
                step: 2
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.minorGridLines.skip `Number` *(default: 0)*

The skip of the category axis minor grid lines.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 },
                { date: new Date("2012/01/04"), close: 330, volume: 55000 },
                { date: new Date("2012/01/05"), close: 340, volume: 60000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            minorGridLines: {
                visible: true,
                skip: 1
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.minorTicks `Object`

The minor ticks of the axis.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            minorTicks: {
                visible: true,
                color: "#ff6800",
                size: 4
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.minorTicks.size `Number`*(default: 3)*

The axis minor tick size. This is the length of the line in pixels that is drawn to indicate the tick
on the chart.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            minorTicks: {
                visible: true,
                size: 6
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.minorTicks.visible `Boolean`*(default: false)*

The visibility of the minor ticks.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            minorTicks: {
                visible: true
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.minorTicks.color `String` *(default: "black")*

The color of the category axis minor ticks lines. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            minorTicks: {
                visible: true,
                color: "#ff6800"
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.minorTicks.width `Number` *(default: 1)*

The width of the minor ticks in pixels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            minorTicks: {
                visible: true,
                width: 2
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.minorTicks.step `Number` *(default: 1)*

The step of the category axis minor ticks.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 },
                { date: new Date("2012/01/04"), close: 330, volume: 55000 },
                { date: new Date("2012/01/05"), close: 340, volume: 60000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            minorTicks: {
                visible: true,
                step: 2
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.minorTicks.skip `Number` *(default: 0)*

The skip of the category axis minor ticks.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 },
                { date: new Date("2012/01/04"), close: 330, volume: 55000 },
                { date: new Date("2012/01/05"), close: 340, volume: 60000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            minorTicks: {
                visible: true,
                skip: 1
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.name `String`*(default: "primary")*

The unique axis name.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            name: "mainCategory"
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.pane `String`

The name of the pane that the axis should be rendered in.
The axis will be rendered in the first (default) pane if not set.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            pane: "bottom"
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.plotBands `Array`

The plot bands of the category axis.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 },
                { date: new Date("2012/01/04"), close: 330, volume: 55000 },
                { date: new Date("2012/01/05"), close: 340, volume: 60000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            plotBands: [{
                from: new Date("2012/01/02"),
                to: new Date("2012/01/04"),
                color: "#ffcccc",
                opacity: 0.5
            }]
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.plotBands.from `Number`

The start position of the plot band in axis units.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 },
                { date: new Date("2012/01/04"), close: 330, volume: 55000 },
                { date: new Date("2012/01/05"), close: 340, volume: 60000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            plotBands: [{
                from: new Date("2012/01/02"),
                to: new Date("2012/01/04"),
                color: "#ffcccc"
            }]
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.plotBands.to `Number`

The end position of the plot band in axis units.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 },
                { date: new Date("2012/01/04"), close: 330, volume: 55000 },
                { date: new Date("2012/01/05"), close: 340, volume: 60000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            plotBands: [{
                from: new Date("2012/01/02"),
                to: new Date("2012/01/04"),
                color: "#ffcccc"
            }]
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.plotBands.color `String`

The color of the plot band.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 },
                { date: new Date("2012/01/04"), close: 330, volume: 55000 },
                { date: new Date("2012/01/05"), close: 340, volume: 60000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            plotBands: [{
                from: new Date("2012/01/02"),
                to: new Date("2012/01/04"),
                color: "#ff6800"
            }]
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.plotBands.opacity `Number`

The opacity of the plot band.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 },
                { date: new Date("2012/01/04"), close: 330, volume: 55000 },
                { date: new Date("2012/01/05"), close: 340, volume: 60000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            plotBands: [{
                from: new Date("2012/01/02"),
                to: new Date("2012/01/04"),
                color: "#ff6800",
                opacity: 0.3
            }]
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.reverse `Boolean`*(default: false)*

Reverses the axis direction -
categories are listed from right to left and from top to bottom.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            reverse: true
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.select `Object`

The selected axis range. If configured, axis selection will be enabled.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 },
                { date: new Date("2012/01/04"), close: 330, volume: 55000 },
                { date: new Date("2012/01/05"), close: 340, volume: 60000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            select: {
                from: new Date("2012/01/02"),
                to: new Date("2012/01/04")
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.select.from `String|Date`

The lower boundary of the selected range.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 },
                { date: new Date("2012/01/04"), close: 330, volume: 55000 },
                { date: new Date("2012/01/05"), close: 340, volume: 60000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            select: {
                from: new Date("2012/01/02")
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.select.to `String|Date`

The upper boundary of the selected range.

*Note*: The category with the specified date is not included in the selected range
unless the axis is justified. In order to select all categories specify
a value larger than the last category date.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 },
                { date: new Date("2012/01/04"), close: 330, volume: 55000 },
                { date: new Date("2012/01/05"), close: 340, volume: 60000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            select: {
                to: new Date("2012/01/04")
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.select.min `Object`

The minimum value that is selectable by the user.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 },
                { date: new Date("2012/01/04"), close: 330, volume: 55000 },
                { date: new Date("2012/01/05"), close: 340, volume: 60000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            select: {
                min: new Date("2012/01/01")
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.select.max `Object`

The maximum value that is selectable by the user.

*Note*: The category with the specified index (date) is not included in the selected range
unless the axis is justified. In order to select all categories specify
a value larger than the last category index (date).

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 },
                { date: new Date("2012/01/04"), close: 330, volume: 55000 },
                { date: new Date("2012/01/05"), close: 340, volume: 60000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            select: {
                max: new Date("2012/01/05")
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.select.mousewheel `Object`

Mousewheel zoom settings for the selection.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 },
                { date: new Date("2012/01/04"), close: 330, volume: 55000 },
                { date: new Date("2012/01/05"), close: 340, volume: 60000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            select: {
                mousewheel: {
                    reverse: false,
                    zoom: "both"
                }
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.select.mousewheel.reverse `Boolean`*(default: true)*

Reverses the mousewheel zoom direction.
Normal direction is down for "zoom out", up for "zoom in".

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 },
                { date: new Date("2012/01/04"), close: 330, volume: 55000 },
                { date: new Date("2012/01/05"), close: 340, volume: 60000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            select: {
                mousewheel: {
                    reverse: false
                }
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.select.mousewheel.zoom `String`*(default: "both")*

The zoom direction. Possible values:

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 },
                { date: new Date("2012/01/04"), close: 330, volume: 55000 },
                { date: new Date("2012/01/05"), close: 340, volume: 60000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            select: {
                mousewheel: {
                    zoom: "left"
                }
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

#### *"both"*
Zooming expands and contracts the selection both sides.

#### *"left"*
Zooming expands and contracts the selection left side only.

#### *"right"*
Zooming expands and contracts the selection right side only.

### categoryAxis.title `Object`

The title of the category axis.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            title: {
                text: "Date",
                color: "#ff6800",
                font: "16px Arial"
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.title.background `String`

The background color of the title. Any valid CSS color string will work here, including
hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            title: {
                text: "Date",
                background: "#ffcccc"
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.title.border `Object`

The border of the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            title: {
                text: "Date",
                border: {
                    color: "#ff6800",
                    width: 2
                }
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.title.border.color `String`*(default: "black")*

The color of the border. Any valid CSS color string will work here, including
hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2012/01/01"), close: 300, volume: 40000 },
                { date: new Date("2012/01/02"), close: 310, volume: 50000 },
                { date: new Date("2012/01/03"), close: 320, volume: 45000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            title: {
                text: "Date",
                border: {
                    color: "#ff6800"
                }
            }
        },
        series: [{
            type: "candlestick",
            field: "close"
        }]
    });
    </script>

### categoryAxis.title.border.dashType `String`*(default: "solid")*

The dash type of the border.

#### Example

<div id="stockChart"></div>
    <script>
      $(document).ready(function () {
      // Sample local stock data
        var stockData = [
            { date: new Date(2024, 0, 1), open: 150.25, high: 152.80, low: 149.50, close: 152.30 },
            { date: new Date(2024, 0, 2), open: 152.50, high: 154.20, low: 151.80, close: 153.75 },
            { date: new Date(2024, 0, 3), open: 153.80, high: 155.40, low: 152.90, close: 154.20 },
            
        ];
    
        $("#stockChart").kendoStockChart({
            series: [{
                type: "candlestick",
                data: stockData, // Data passed directly to series
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date" // Specify date field for category axis
            }],
            navigator: {
            	series: {
            	    type: "candlestick", 
            	    data: stockData, // Navigator needs its own data reference
            	    field: "close", // Use closing price for navigator
            	    dateField: "date",
            	    stack: { group: "group1" }
            	},
            	select: {
            	    from: new Date(2024, 0, 10), // Initial selection start
            	    to: new Date(2024, 0, 20)    // Initial selection end
            	}
            },
            categoryAxis: {
              title: {
                text: "Category Title",
                border: {
                    dashType: "dash",
                  	width: 2,
                    color: "red"
                },
              },
            	baseUnit: "days",
            	labels: {
            	    format: "MMM dd"
            	}
            },
            valueAxis: {
            	labels: {
            	    format: "${0}"
            	}
            }
        });
  	});
  </script>

#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### categoryAxis.title.border.width `Number`*(default: 0)*

The width of the border.

#### Example

<div id="stockChart"></div>
    <script>
      $(document).ready(function () {
      // Sample local stock data
        var stockData = [
            { date: new Date(2024, 0, 1), open: 150.25, high: 152.80, low: 149.50, close: 152.30 },
            { date: new Date(2024, 0, 2), open: 152.50, high: 154.20, low: 151.80, close: 153.75 },
            { date: new Date(2024, 0, 3), open: 153.80, high: 155.40, low: 152.90, close: 154.20 },
            
        ];
    
        $("#stockChart").kendoStockChart({
            series: [{
                type: "candlestick",
                data: stockData, // Data passed directly to series
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date" // Specify date field for category axis
            }],
            navigator: {
            	series: {
            	    type: "candlestick", 
            	    data: stockData, // Navigator needs its own data reference
            	    field: "close", // Use closing price for navigator
            	    dateField: "date",
            	    stack: { group: "group1" }
            	},
            	select: {
            	    from: new Date(2024, 0, 10), // Initial selection start
            	    to: new Date(2024, 0, 20)    // Initial selection end
            	}
            },
            categoryAxis: {
              title: {
                text: "Category Title",
                border: {
                    dashType: "dash",
                  	width: 2,
                    color: "red"
                },
              },
            	baseUnit: "days",
            	labels: {
            	    format: "MMM dd"
            	}
            },
            valueAxis: {
            	labels: {
            	    format: "${0}"
            	}
            }
        });
  	});
  </script>

### categoryAxis.title.color `String`

The text color of the title. Any valid CSS color string will work here, including hex and rgb.

#### Example

<div id="stockChart"></div>
    <script>
      $(document).ready(function () {
      // Sample local stock data
        var stockData = [
            { date: new Date(2024, 0, 1), open: 150.25, high: 152.80, low: 149.50, close: 152.30 },
            { date: new Date(2024, 0, 2), open: 152.50, high: 154.20, low: 151.80, close: 153.75 },
            { date: new Date(2024, 0, 3), open: 153.80, high: 155.40, low: 152.90, close: 154.20 },
            
        ];
    
        $("#stockChart").kendoStockChart({
            series: [{
                type: "candlestick",
                data: stockData, // Data passed directly to series
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date", // Specify date field for category axis
                name: "Stock Price"
            }],
            navigator: {
            	series: {
            	    type: "candlestick", 
            	    data: stockData, // Navigator needs its own data reference
            	    field: "close", // Use closing price for navigator
            	    dateField: "date"
            	},
            	select: {
            	    from: new Date(2024, 0, 10), // Initial selection start
            	    to: new Date(2024, 0, 20)    // Initial selection end
            	}
            },
            categoryAxis: {
              title: {
                text: "Category Title",
                border: {
                    dashType: "dash",
                  	width: 2,
                    color: "red"
                },
              },
            	baseUnit: "days",
            	labels: {
            	    format: "MMM dd"
            	}
            },
            valueAxis: {
            	labels: {
            	    format: "${0}"
            	}
            }
        });
  	});
  </script>

### categoryAxis.title.font `String`*(default: "16px Arial,Helvetica,sans-serif")*

The font style of the title.

#### Example

    <div id="stockChart"></div>
    <script>
      $(document).ready(function () {
      // Sample local stock data
        var stockData = [
            { date: new Date(2024, 0, 1), open: 150.25, high: 152.80, low: 149.50, close: 152.30 },
            { date: new Date(2024, 0, 2), open: 152.50, high: 154.20, low: 151.80, close: 153.75 },
            { date: new Date(2024, 0, 3), open: 153.80, high: 155.40, low: 152.90, close: 154.20 },
            
        ];
    
        $("#stockChart").kendoStockChart({
            series: [{
                type: "candlestick",
                data: stockData, // Data passed directly to series
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date", // Specify date field for category axis
                name: "Stock Price"
            }],
            navigator: {
            	series: {
            	    type: "candlestick", 
            	    data: stockData, // Navigator needs its own data reference
            	    field: "close", // Use closing price for navigator
            	    dateField: "date"
            	},
            	select: {
            	    from: new Date(2024, 0, 10), // Initial selection start
            	    to: new Date(2024, 0, 20)    // Initial selection end
            	}
            },
            categoryAxis: {
              title: {
                text: "Category Title",
                font: "16px sans-serif",
              },
            	baseUnit: "days",
            	labels: {
            	    format: "MMM dd"
            	}
            },
            valueAxis: {
            	labels: {
            	    format: "${0}"
            	}
            }
        });
  	});
  </script>

### categoryAxis.title.margin `Number|Object`*(default: 5)*

The margin of the title.

#### Example

    <div id="stockChart"></div>
    <script>
      $(document).ready(function () {
      // Sample local stock data
        var stockData = [
            { date: new Date(2024, 0, 1), open: 150.25, high: 152.80, low: 149.50, close: 152.30 },
            { date: new Date(2024, 0, 2), open: 152.50, high: 154.20, low: 151.80, close: 153.75 },
            { date: new Date(2024, 0, 3), open: 153.80, high: 155.40, low: 152.90, close: 154.20 },
            
        ];
    
        $("#stockChart").kendoStockChart({
            series: [{
                type: "candlestick",
                data: stockData, // Data passed directly to series
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date", // Specify date field for category axis
                name: "Stock Price"
            }],
            navigator: {
            	series: {
            	    type: "candlestick", 
            	    data: stockData, // Navigator needs its own data reference
            	    field: "close", // Use closing price for navigator
            	    dateField: "date"
            	},
            	select: {
            	    from: new Date(2024, 0, 10), // Initial selection start
            	    to: new Date(2024, 0, 20)    // Initial selection end
            	}
            },
            categoryAxis: {
              title: {
                text: "Category Title",
                margin: 15
              },
            	baseUnit: "days",
            	labels: {
            	    format: "MMM dd"
            	}
            },
            valueAxis: {
            	labels: {
            	    format: "${0}"
            	}
            }
        });
  	});
  </script>

### categoryAxis.title.position `String`*(default: "center")*

The position of the title.

#### Example

    <div id="stockChart"></div>
    <script>
      $(document).ready(function () {
      // Sample local stock data
        var stockData = [
            { date: new Date(2024, 0, 1), open: 150.25, high: 152.80, low: 149.50, close: 152.30 },
            { date: new Date(2024, 0, 2), open: 152.50, high: 154.20, low: 151.80, close: 153.75 },
            { date: new Date(2024, 0, 3), open: 153.80, high: 155.40, low: 152.90, close: 154.20 },
            
        ];
    
        $("#stockChart").kendoStockChart({
            series: [{
                type: "candlestick",
                data: stockData, // Data passed directly to series
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date", // Specify date field for category axis
                name: "Stock Price"
            }],
            navigator: {
            	series: {
            	    type: "candlestick", 
            	    data: stockData, // Navigator needs its own data reference
            	    field: "close", // Use closing price for navigator
            	    dateField: "date"
            	},
            	select: {
            	    from: new Date(2024, 0, 10), // Initial selection start
            	    to: new Date(2024, 0, 20)    // Initial selection end
            	}
            },
            categoryAxis: {
              title: {
                text: "Category Title",
                position: "left"
              },
            	baseUnit: "days",
            	labels: {
            	    format: "MMM dd"
            	}
            },
            valueAxis: {
            	labels: {
            	    format: "${0}"
            	}
            }
        });
  	});
  </script>

#### *"top"*

The axis title is positioned on the top (applicable to vertical axis)

#### *"bottom"*

The axis title is positioned on the bottom (applicable to vertical axis)

#### *"left"*

The axis title is positioned on the left (applicable to horizontal axis)

#### *"right"*

The axis title is positioned on the right (applicable to horizontal axis)

#### *"center"*

The axis title is positioned in the center

### categoryAxis.title.rotation `Number`*(default: 0)*

The rotation angle of the title.

#### Example

    <div id="stockChart"></div>
    <script>
      $(document).ready(function () {
      // Sample local stock data
        var stockData = [
            { date: new Date(2024, 0, 1), open: 150.25, high: 152.80, low: 149.50, close: 152.30 },
            { date: new Date(2024, 0, 2), open: 152.50, high: 154.20, low: 151.80, close: 153.75 },
            { date: new Date(2024, 0, 3), open: 153.80, high: 155.40, low: 152.90, close: 154.20 },
            
        ];
    
        $("#stockChart").kendoStockChart({
            series: [{
                type: "candlestick",
                data: stockData, // Data passed directly to series
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date", // Specify date field for category axis
                name: "Stock Price"
            }],
            navigator: {
            	series: {
            	    type: "candlestick", 
            	    data: stockData, // Navigator needs its own data reference
            	    field: "close", // Use closing price for navigator
            	    dateField: "date"
            	},
            	select: {
            	    from: new Date(2024, 0, 10), // Initial selection start
            	    to: new Date(2024, 0, 20)    // Initial selection end
            	}
            },
            categoryAxis: {
              title: {
                text: "Category Title",
                rotation: 45
              },
            	baseUnit: "days",
            	labels: {
            	    format: "MMM dd"
            	}
            },
            valueAxis: {
            	labels: {
            	    format: "${0}"
            	}
            }
        });
  	});
  </script>

### categoryAxis.title.text `String`

The text of the title.

#### Example

    <div id="stockChart"></div>
    <script>
      $(document).ready(function () {
      // Sample local stock data
        var stockData = [
            { date: new Date(2024, 0, 1), open: 150.25, high: 152.80, low: 149.50, close: 152.30 },
            { date: new Date(2024, 0, 2), open: 152.50, high: 154.20, low: 151.80, close: 153.75 },
            { date: new Date(2024, 0, 3), open: 153.80, high: 155.40, low: 152.90, close: 154.20 },
            
        ];
    
        $("#stockChart").kendoStockChart({
            series: [{
                type: "candlestick",
                data: stockData, // Data passed directly to series
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date", // Specify date field for category axis
                name: "Stock Price"
            }],
            navigator: {
            	series: {
            	    type: "candlestick", 
            	    data: stockData, // Navigator needs its own data reference
            	    field: "close", // Use closing price for navigator
            	    dateField: "date"
            	},
            	select: {
            	    from: new Date(2024, 0, 10), // Initial selection start
            	    to: new Date(2024, 0, 20)    // Initial selection end
            	}
            },
            categoryAxis: {
              title: {
                text: "Category Title"
              },
            	baseUnit: "days",
            	labels: {
            	    format: "MMM dd"
            	}
            },
            valueAxis: {
            	labels: {
            	    format: "${0}"
            	}
            }
        });
  	});
  </script>

### categoryAxis.title.visible `Boolean`*(default: true)*

The visibility of the title.

#### Example

    <div id="stockChart"></div>
    <script>
      $(document).ready(function () {
      // Sample local stock data
        var stockData = [
            { date: new Date(2024, 0, 1), open: 150.25, high: 152.80, low: 149.50, close: 152.30 },
            { date: new Date(2024, 0, 2), open: 152.50, high: 154.20, low: 151.80, close: 153.75 },
            { date: new Date(2024, 0, 3), open: 153.80, high: 155.40, low: 152.90, close: 154.20 },
            
        ];
    
        $("#stockChart").kendoStockChart({
            series: [{
                type: "candlestick",
                data: stockData, // Data passed directly to series
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date", // Specify date field for category axis
                name: "Stock Price"
            }],
            navigator: {
            	series: {
            	    type: "candlestick", 
            	    data: stockData, // Navigator needs its own data reference
            	    field: "close", // Use closing price for navigator
            	    dateField: "date"
            	},
            	select: {
            	    from: new Date(2024, 0, 10), // Initial selection start
            	    to: new Date(2024, 0, 20)    // Initial selection end
            	}
            },
            categoryAxis: {
              title: {
                text: "Category Title",
                visible: false
              },
            	baseUnit: "days",
            	labels: {
            	    format: "MMM dd"
            	}
            },
            valueAxis: {
            	labels: {
            	    format: "${0}"
            	}
            }
        });
  	});
  </script>

### categoryAxis.type `String`*(default: "category")*

The axis type.

#### Example

    <div id="stockChart"></div>
    <script>
      $(document).ready(function () {
      // Sample local stock data
        var stockData = [
            { date: new Date(2024, 0, 1), open: 150.25, high: 152.80, low: 149.50, close: 152.30 },
            { date: new Date(2024, 0, 2), open: 152.50, high: 154.20, low: 151.80, close: 153.75 },
            { date: new Date(2024, 0, 3), open: 153.80, high: 155.40, low: 152.90, close: 154.20 },
            
        ];
    
        $("#stockChart").kendoStockChart({
            series: [{
                type: "candlestick",
                data: stockData, // Data passed directly to series
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date", // Specify date field for category axis
                name: "Stock Price"
            }],
            navigator: {
            	series: {
            	    type: "candlestick", 
            	    data: stockData, // Navigator needs its own data reference
            	    field: "close", // Use closing price for navigator
            	    dateField: "date"
            	},
            	select: {
            	    from: new Date(2024, 0, 10), // Initial selection start
            	    to: new Date(2024, 0, 20)    // Initial selection end
            	}
            },
            categoryAxis: {
              type: "date",
            	baseUnit: "days",
            	labels: {
            	    format: "MMM dd"
            	}
            },
            valueAxis: {
            	labels: {
            	    format: "${0}"
            	}
            }
        });
  	});
  </script>

#### *"category"*

Discrete category axis.

#### *"date"*

Specialized axis for displaying chronological data.

### categoryAxis.autoBaseUnitSteps `Object`

The discrete [categoryAxis.baseUnitStep](/api/javascript/dataviz/ui/stock-chart#configuration-categoryAxis.baseUnitStep) values when
either [categoryAxis.baseUnit](/api/javascript/dataviz/ui/stock-chart#configuration-categoryAxis.baseUnit) is set to "fit" or
[categoryAxis.baseUnitStep](/api/javascript/dataviz/ui/stock-chart#configuration-categoryAxis.baseUnitStep) is set to "auto".

#### Example - set category axis auto base unit steps

    <div id="stockChart"></div>
    <script>
      $(document).ready(function () {
      // Sample local stock data
        var stockData = [
            { date: new Date(2024, 0, 1), open: 150.25, high: 152.80, low: 149.50, close: 152.30 },
            { date: new Date(2024, 0, 2), open: 152.50, high: 154.20, low: 151.80, close: 153.75 },
            { date: new Date(2024, 0, 3), open: 153.80, high: 155.40, low: 152.90, close: 154.20 },
            
        ];
    
        $("#stockChart").kendoStockChart({
            series: [{
                type: "candlestick",
                data: stockData, // Data passed directly to series
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date", // Specify date field for category axis
                name: "Stock Price"
            }],
            navigator: {
            	series: {
            	    type: "candlestick", 
            	    data: stockData, // Navigator needs its own data reference
            	    field: "close", // Use closing price for navigator
            	    dateField: "date"
            	},
            	select: {
            	    from: new Date(2024, 0, 10), // Initial selection start
            	    to: new Date(2024, 0, 20)    // Initial selection end
            	}
            },
            categoryAxis: {
              baseUnitStep: "auto",
                	autoBaseUnitSteps: {
                	days: [3]
            	},
            	labels: {
            	    format: "MMM dd"
            	}
            },
            valueAxis: {
            	labels: {
            	    format: "${0}"
            	}
            }
        });
  	});
  </script>

### categoryAxis.autoBaseUnitSteps.days `Array` *(default: [1, 2, 3])*

The days unit steps.

#### Example

    <div id="stockChart"></div>
    <script>
      $(document).ready(function () {
      // Sample local stock data
        var stockData = [
            { date: new Date(2024, 0, 1), open: 150.25, high: 152.80, low: 149.50, close: 152.30 },
            { date: new Date(2024, 0, 2), open: 152.50, high: 154.20, low: 151.80, close: 153.75 },
            { date: new Date(2024, 0, 3), open: 153.80, high: 155.40, low: 152.90, close: 154.20 },
            
        ];
    
        $("#stockChart").kendoStockChart({
            series: [{
                type: "candlestick",
                data: stockData, // Data passed directly to series
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date", // Specify date field for category axis
                name: "Stock Price"
            }],
            navigator: {
            	series: {
            	    type: "candlestick", 
            	    data: stockData, // Navigator needs its own data reference
            	    field: "close", // Use closing price for navigator
            	    dateField: "date"
            	},
            	select: {
            	    from: new Date(2024, 0, 10), // Initial selection start
            	    to: new Date(2024, 0, 20)    // Initial selection end
            	}
            },
            categoryAxis: {
              baseUnitStep: "auto",
                	autoBaseUnitSteps: {
                	days: [1, 2, 3, 7]
            	},
            	labels: {
            	    format: "MMM dd"
            	}
            },
            valueAxis: {
            	labels: {
            	    format: "${0}"
            	}
            }
        });
  	});
  </script>

### categoryAxis.autoBaseUnitSteps.hours `Array` *(default: [1, 2, 3])*

The hours unit steps.

#### Example

    <div id="stockChart"></div>
    <script>
      $(document).ready(function () {
      // Sample local stock data
        var stockData = [
            { date: new Date(2024, 0, 1), open: 150.25, high: 152.80, low: 149.50, close: 152.30 },
            { date: new Date(2024, 0, 2), open: 152.50, high: 154.20, low: 151.80, close: 153.75 },
            { date: new Date(2024, 0, 3), open: 153.80, high: 155.40, low: 152.90, close: 154.20 },
            
        ];
    
        $("#stockChart").kendoStockChart({
            series: [{
                type: "candlestick",
                data: stockData, // Data passed directly to series
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date", // Specify date field for category axis
                name: "Stock Price"
            }],
            navigator: {
            	series: {
            	    type: "candlestick", 
            	    data: stockData, // Navigator needs its own data reference
            	    field: "close", // Use closing price for navigator
            	    dateField: "date"
            	},
            	select: {
            	    from: new Date(2024, 0, 10), // Initial selection start
            	    to: new Date(2024, 0, 20)    // Initial selection end
            	}
            },
            categoryAxis: {
              baseUnitStep: "auto",
                autoBaseUnitSteps: {
                  	hours: [1, 2, 4, 6, 12]
            	},
            	labels: {
            	    format: "MMM dd"
            	}
            },
            valueAxis: {
            	labels: {
            	    format: "${0}"
            	}
            }
        });
  	});
  </script>

### categoryAxis.autoBaseUnitSteps.minutes `Array` *(default: [1, 2, 5, 15, 30])*

The minutes unit steps.

#### Example

    <div id="stockChart"></div>
    <script>
      $(document).ready(function () {
      // Sample local stock data
        var stockData = [
            { date: new Date(2024, 0, 1), open: 150.25, high: 152.80, low: 149.50, close: 152.30 },
            { date: new Date(2024, 0, 2), open: 152.50, high: 154.20, low: 151.80, close: 153.75 },
            { date: new Date(2024, 0, 3), open: 153.80, high: 155.40, low: 152.90, close: 154.20 },
            
        ];
    
        $("#stockChart").kendoStockChart({
            series: [{
                type: "candlestick",
                data: stockData, // Data passed directly to series
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date", // Specify date field for category axis
                name: "Stock Price"
            }],
            navigator: {
            	series: {
            	    type: "candlestick", 
            	    data: stockData, // Navigator needs its own data reference
            	    field: "close", // Use closing price for navigator
            	    dateField: "date"
            	},
            	select: {
            	    from: new Date(2024, 0, 10), // Initial selection start
            	    to: new Date(2024, 0, 20)    // Initial selection end
            	}
            },
            categoryAxis: {
              baseUnitStep: "auto",
                autoBaseUnitSteps: {
                  	minutes: [1, 5, 10, 15, 30, 60]
            	},
            	labels: {
            	    format: "MMM dd"
            	}
            },
            valueAxis: {
            	labels: {
            	    format: "${0}"
            	}
            }
        });
  	});
  </script>

### categoryAxis.autoBaseUnitSteps.months `Array` *(default: [1, 2, 3, 6])*

The months unit steps.

#### Example

    <div id="stockChart"></div>
    <script>
      $(document).ready(function () {
      // Sample local stock data
        var stockData = [
            { date: new Date(2024, 0, 1), open: 150.25, high: 152.80, low: 149.50, close: 152.30 },
            { date: new Date(2024, 0, 2), open: 152.50, high: 154.20, low: 151.80, close: 153.75 },
            { date: new Date(2024, 0, 3), open: 153.80, high: 155.40, low: 152.90, close: 154.20 },
            
        ];
    
        $("#stockChart").kendoStockChart({
            series: [{
                type: "candlestick",
                data: stockData, // Data passed directly to series
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date", // Specify date field for category axis
                name: "Stock Price"
            }],
            navigator: {
            	series: {
            	    type: "candlestick", 
            	    data: stockData, // Navigator needs its own data reference
            	    field: "close", // Use closing price for navigator
            	    dateField: "date"
            	},
            	select: {
            	    from: new Date(2024, 0, 10), // Initial selection start
            	    to: new Date(2024, 0, 20)    // Initial selection end
            	}
            },
            categoryAxis: {
              baseUnitStep: "auto",
                autoBaseUnitSteps: {
                  	months: [1, 3, 6, 12]
            	},
            	labels: {
            	    format: "MMM dd"
            	}
            },
            valueAxis: {
            	labels: {
            	    format: "${0}"
            	}
            }
        });
  	});
  </script>

### categoryAxis.autoBaseUnitSteps.weeks `Array` *(default: [1, 2])*

The weeks unit steps.

#### Example

    <div id="stockChart"></div>
    <script>
      $(document).ready(function () {
      // Sample local stock data
        var stockData = [
            { date: new Date(2024, 0, 1), open: 150.25, high: 152.80, low: 149.50, close: 152.30 },
            { date: new Date(2024, 0, 2), open: 152.50, high: 154.20, low: 151.80, close: 153.75 },
            { date: new Date(2024, 0, 3), open: 153.80, high: 155.40, low: 152.90, close: 154.20 },
            
        ];
    
        $("#stockChart").kendoStockChart({
            series: [{
                type: "candlestick",
                data: stockData, // Data passed directly to series
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date", // Specify date field for category axis
                name: "Stock Price"
            }],
            navigator: {
            	series: {
            	    type: "candlestick", 
            	    data: stockData, // Navigator needs its own data reference
            	    field: "close", // Use closing price for navigator
            	    dateField: "date"
            	},
            	select: {
            	    from: new Date(2024, 0, 10), // Initial selection start
            	    to: new Date(2024, 0, 20)    // Initial selection end
            	}
            },
            categoryAxis: {
              baseUnitStep: "auto",
                autoBaseUnitSteps: {
                  	weeks: [1, 2, 4]
            	},
            	labels: {
            	    format: "MMM dd"
            	}
            },
            valueAxis: {
            	labels: {
            	    format: "${0}"
            	}
            }
        });
  	});
  </script>

### categoryAxis.autoBaseUnitSteps.years `Array` *(default: [1, 2, 3, 5, 10, 25, 50])*

The years unit steps.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        categoryAxis: {
            autoBaseUnitSteps: {
                years: [1, 2, 5, 10, 20]
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ],
        }]
    });
    </script>

### categoryAxis.background `String`

The background color of the axis.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        categoryAxis: {
            background: "lightblue"
        },
        series: [{
            type: "line",
             data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ],
        }]
    });
    </script>

### categoryAxis.baseUnit `String`

The base time interval for the date axis. The default base unit is determined automatically from the minimum difference
between subsequent categories.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        categoryAxis: {
            baseUnit: "days"
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ],
            field: "value",
            categoryField: "date"
        }]
    });
    </script>

The supported values are:

* "days"
* "fit"
* "hours"
* "minutes"
* "months"
* "weeks"
* "years"

Setting `baseUnit` to "fit" will set such base unit and [categoryAxis.baseUnitStep](/api/javascript/dataviz/ui/stock-chart#configuration-categoryAxis.baseUnitStep)
that the total number of categories does not exceed [categoryAxis.maxDateGroups](/api/javascript/dataviz/ui/stock-chart#configuration-categoryAxis.maxDateGroups).

Series data is aggregated for the specified base unit using the [series.aggregate](/api/javascript/dataviz/ui/stock-chart#configuration-series.aggregate) function.

### categoryAxis.baseUnitStep `Object` *(default: 1)*

The step (interval) between categories in base units. Setting it to "auto" will set the step to such value
that the total number of categories does not exceed [categoryAxis.maxDateGroups](/api/javascript/dataviz/ui/stock-chart#configuration-categoryAxis.maxDateGroups).

This option is ignored if [categoryAxis.baseUnit](/api/javascript/dataviz/ui/stock-chart#configuration-categoryAxis.baseUnit) is set to "fit".

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        categoryAxis: {
            baseUnitStep: 2
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 },
                { date: new Date(2023, 0, 4), value: 25 }
            ],
            field: "value",
            categoryField: "date"
        }]
    });
    </script>

### categoryAxis.labels.culture `String`

Culture to use for formatting the dates. See [Globalization](/framework/globalization/overview) for more information.
It defaults to the global culture.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        categoryAxis: {
            labels: {
                culture: "de-DE"
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ],
            field: "value",
            categoryField: "date"
        }]
    });
    </script>

### categoryAxis.labels.dateFormats `Object`

Date format strings

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        categoryAxis: {
            labels: {
                dateFormats: {
                    days: "dd/MM",
                    months: "MMM yyyy"
                }
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 1, 1), value: 20 },
                { date: new Date(2023, 2, 1), value: 15 }
            ],
            field: "value",
            categoryField: "date"
        }]
    });
    </script>

#### *"hours"*

"HH:mm"

#### *"days"*

"M/d"

#### *"weeks"*

"M/d"

#### *"months"*

"MMM 'yy"

#### *"years"*

"yyyy"

The Chart will choose the appropriate format for the current `baseUnit`.
Setting the labels **format** option will override these defaults.

### categoryAxis.max `Object`

The last date displayed on the axis.
By default, the minimum date is the same as the last category.
This is often used in combination with the **min** and **roundToBaseUnit** configuration options to
set up a fixed date range.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        categoryAxis: {
            max: new Date(2023, 11, 31)
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 5, 1), value: 20 },
                { date: new Date(2023, 11, 1), value: 15 }
            ],
            field: "value",
            categoryField: "date"
        }]
    });
    </script>

### categoryAxis.min `Object`

The first date displayed on the axis.
By default, the minimum date is the same as the first category.
This is often used in combination with the **max** and **roundToBaseUnit** configuration options to
set up a fixed date range.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        categoryAxis: {
            min: new Date(2023, 0, 1)
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 5, 1), value: 20 },
                { date: new Date(2023, 11, 1), value: 15 }
            ],
            field: "value",
            categoryField: "date"
        }]
    });
    </script>

### categoryAxis.roundToBaseUnit `Boolean`*(default: true)*

By default, the first and last dates will be rounded off to the nearest base unit.
Specifying **false** for this option will disable this behavior.

This option is most useful in combination with explicit **min** and **max** dates.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        categoryAxis: {
            roundToBaseUnit: false,
            min: new Date(2023, 0, 15),
            max: new Date(2023, 0, 25)
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 16), value: 10 },
                { date: new Date(2023, 0, 18), value: 20 },
                { date: new Date(2023, 0, 24), value: 15 }
            ],
            field: "value",
            categoryField: "date"
        }]
    });
    </script>

It will be ignored if either column, ohlc or candlestick series are plotted on the axis.

### categoryAxis.weekStartDay `Number`*(default: kendo.days.Sunday)*

Specifies the week start day when **baseUnit** is set to "weeks".
Use the *kendo.days* constants to specify the day by name.

* kendo.days.Sunday (0)
* kendo.days.Monday (1)
* kendo.days.Tuesday (2)
* kendo.days.Wednesday (3)
* kendo.days.Thursday (4)
* kendo.days.Friday (5)
* kendo.days.Saturday (6)

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        categoryAxis: {
            baseUnit: "weeks",
            weekStartDay: kendo.days.Monday
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 8), value: 20 },
                { date: new Date(2023, 0, 15), value: 15 }
            ],
            field: "value",
            categoryField: "date"
        }]
    });
    </script>

### categoryAxis.maxDateGroups `Number`

Specifies the maximum number of groups (categories) to produce when
either **baseUnit** is set to "fit" or **baseUnitStep** is set to "auto".

This option is ignored in all other cases.

The default value is approximately equal to `[widget width, px] / 30`

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        categoryAxis: {
            maxDateGroups: 10
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 1, 1), value: 20 },
                { date: new Date(2023, 2, 1), value: 15 }
            ],
            field: "value",
            categoryField: "date"
        }]
    });
    </script>

### categoryAxis.maxDivisions `Number`

The maximum number of ticks and labels to display.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        categoryAxis: {
            maxDivisions: 5
        },
        series: [{
            type: "line",
             data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 25 },
                { date: new Date(2023, 0, 4), value: 35 },
                { date: new Date(2023, 0, 5), value: 45 },
                { date: new Date(2023, 0, 6), value: 35 },
                { date: new Date(2023, 0, 7), value: 15 },
                { date: new Date(2023, 0, 8), value: 60 },
               
            ],
        }]
    });
    </script>

### categoryAxis.visible `Boolean`*(default: true)*

The visibility of the axis.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        categoryAxis: {
            visible: false
        },
        series: [{
            type: "line",
             data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 25 },
                { date: new Date(2023, 0, 3), value: 15 }             
            ],
        }]
    });
    </script>

### categoryAxis.crosshair `Object`

The crosshair configuration options.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        categoryAxis: {
            crosshair: {
                visible: true,
                color: "red",
                width: 2
            }
        },
        series: [{
            type: "line",
             data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 25 },
                { date: new Date(2023, 0, 3), value: 15 }             
            ],
        }]
    });
    </script>

### categoryAxis.crosshair.color `String`

The color of the crosshair.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        categoryAxis: {
            crosshair: {
                visible: true,
                color: "blue"
            }
        },
        series: [{
            type: "line",
             data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 25 },
                { date: new Date(2023, 0, 3), value: 15 }             
            ],
        }]
    });
    </script>

### categoryAxis.crosshair.width `Number`

The width of the crosshair.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        categoryAxis: {
            crosshair: {
                visible: true,
                width: 3
            }
        },
        series: [{
            type: "line",
             data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 25 },
                { date: new Date(2023, 0, 3), value: 15 }             
            ],
        }]
    });
    </script>

### categoryAxis.crosshair.opacity `Number`

The opacity of the crosshair.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        categoryAxis: {
            crosshair: {
                visible: true,
                opacity: 0.5
            }
        },
        series: [{
            type: "line",
             data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 25 },
                { date: new Date(2023, 0, 3), value: 15 }             
            ],
        }]
    });
    </script>

### categoryAxis.crosshair.dashType `Number`

The dash type of the crosshair.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        categoryAxis: {
            crosshair: {
                visible: true,
                dashType: "dash"
            }
        },
        series: [{
            type: "line",
             data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 25 },
                { date: new Date(2023, 0, 3), value: 15 }             
            ],
        }]
    });
    </script>

### categoryAxis.crosshair.visible `Boolean`*(default: false)*

The dash type of the crosshair.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        categoryAxis: {
            crosshair: {
                visible: true
            }
        },
        series: [{
            type: "line",
             data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 25 },
                { date: new Date(2023, 0, 3), value: 15 }             
            ],
        }]
    });
    </script>

### categoryAxis.crosshair.tooltip `Object`

The crosshair tooltip configuration options.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        categoryAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true,
                    background: "yellow"
                }
            }
        },
        series: [{
            type: "line",
             data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 25 },
                { date: new Date(2023, 0, 3), value: 15 }             
            ],
        }]
    });
    </script>

### categoryAxis.crosshair.tooltip.background `String`

The background color of the tooltip.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 16, volume: 1500 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true,
                    background: "#ff6800"
                }
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### categoryAxis.crosshair.tooltip.border `Object`

The border configuration options.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 16, volume: 1500 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true,
                    border: {
                        color: "red",
                        width: 2
                    }
                }
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### categoryAxis.crosshair.tooltip.border.color `String`*(default: "black")*

The color of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 16, volume: 1500 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true,
                    border: {
                        color: "blue"
                    }
                }
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### categoryAxis.crosshair.tooltip.border.width `Number`*(default: 0)*

The width of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 16, volume: 1500 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true,
                    border: {
                        width: 3
                    }
                }
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### categoryAxis.crosshair.tooltip.color `String`

The text color of the tooltip.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 16, volume: 1500 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true,
                    color: "white"
                }
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### categoryAxis.crosshair.tooltip.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The tooltip font.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 16, volume: 1500 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true,
                    font: "16px Arial"
                }
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### categoryAxis.crosshair.tooltip.format `String`

The tooltip format.

#### Example

```pseudo
    //sets format of the tooltip
    format: "C"
```

### categoryAxis.crosshair.tooltip.padding `Number|Object`

The padding of the tooltip.

#### Example

```pseudo
    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // right and bottom padding are left at their default values
    padding: { top: 1, left: 1 }
```

### categoryAxis.crosshair.tooltip.template `String|Function`

The tooltip template.
Template variables:

*   **value** - the point value (either a number or an object)

#### Example

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
         title: {
             text: "My Chart Title"
         },
         series: [{
             type: "area",
             name: "Series 1",
             data: [200, 450, 300, 125]
         }],
         categoryAxis: {
             categories: [2000, 2001, 2002, 2003],
             crosshair: {
                 visible: true,
                 tooltip: {
                     visible: true,
                     template: "|#= value #|"
                 }
             }
         }
    });
    </script>

### categoryAxis.crosshair.tooltip.visible `Boolean`*(default: false)*

A value indicating if the tooltip should be displayed.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 16, volume: 1500 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true
                }
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### categoryAxis.notes `Object`

The category axis notes configuration.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 16, volume: 1500 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            notes: {
                data: [{ value: new Date("2012/01/01"), text: "Important date" }],
                icon: {
                    background: "red",
                    size: 10
                }
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### categoryAxis.notes.position `String`

The position of the category axis note.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 16, volume: 1500 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            notes: {
                position: "top",
                data: [{ value: new Date("2012/01/01"), text: "Important date" }]
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

* "top" - The note is positioned on the top.
* "bottom" - The note is positioned on the bottom.
* "left" - The note is positioned on the left.
* "right" - The note is positioned on the right.

### categoryAxis.notes.icon `Object`

The icon of the notes.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 16, volume: 1500 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            notes: {
                data: [{ value: new Date("2012/01/01"), text: "Important date" }],
                icon: {
                    background: "red",
                    size: 15,
                    type: "square"
                }
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### categoryAxis.notes.icon.background `String`

The background color of the notes icon.

#### Example - set the category axis notes icon background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          icon: {
            background: "red"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.icon.border `Object`

The border of the icon.

#### Example - set the category axis notes icon border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          icon: {
            border: {
              width: 2,
              color: "red"
            }
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.icon.border.color `String`

The border color of the icon.

#### Example - set the category axis notes icon border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          icon: {
            border: {
              width: 2,
              color: "red"
            }
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.icon.border.width `Number`

The border width of the icon.

#### Example - set the category axis notes icon border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          icon: {
            border: {
              width: 2,
              color: "red"
            }
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.icon.size `Number`

The size of the icon.

#### Example - set the category axis notes icon size

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          icon: {
            size: 30
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.icon.type `String` *(default: "circle")*

The icon shape.

The supported values are:
* "circle" - the marker shape is circle.
* "square" - the marker shape is square.
* "triangle" - the marker shape is triangle.
* "cross" - the marker shape is cross.

#### Example - set the category axis notes icon shape

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          icon: {
            shape: "triangle"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.icon.visible `Boolean` *(default: "true")*

The icon visibility.

#### Example - set the category axis notes icon visibility

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          icon: {
            visible: false
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.label `Object`

The label of the notes.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 16, volume: 1500 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            notes: {
                data: [{ value: new Date("2012/01/01"), text: "Important date" }],
                label: {
                    background: "yellow",
                    color: "black"
                }
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### categoryAxis.notes.label.background `String`

The background color of the label. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the category axis label background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          label: {
            background: "red"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.label.border `Object`

The border of the label.

#### Example - set the category axis label border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          label: {
            border: {
              color: "green",
              dashType: "dashDot",
              width: 1
            }
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.label.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the category axis label border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          label: {
            border: {
              color: "green"
            }
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.label.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the category axis label border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          label: {
            border: {
              dashType: "dashDot",
              width: 1
            }
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.label.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the category axis label border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          label: {
            border: {
              width: 1
            }
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.label.color `String`

The text color of the label. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the category axis label color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          label: {
            color: "#aa00bb"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.label.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the label.

#### Example - set the chart series label font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          label: {
            font: "20px sans-serif"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.label.template `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* value - the category value

#### Example - set the category axis notes label template as a string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          label: {
            template: "Year: #: value #"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.label.visible `Boolean` *(default: true)*

If set to `true` the chart will display the category notes label. By default the category notes label are visible.

#### Example - hide the category axis notes label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          label: {
            visible: false
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.label.rotation `Number` *(default: 0)*

The rotation angle of the label. By default the label are not rotated.

#### Example - rotate the category axis notes label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          label: {
            rotation: 90
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.label.format `String` *(default: "{0}")*

The format used to display the notes label. Uses [kendo.format](/api/framework/kendo#methods-format). Contains one placeholder ("{0}") which represents the category value.

#### Example - set the category axis notes label format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          label: {
            format: "Category slot: {0}"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.label.position `String` *(default: "inside")*

The position of the labels.

* "inside" - the label is positioned inside of the icon.
* "outside" - the label is positioned outside of the icon.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 16, volume: 1500 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            notes: {
                data: [{ value: new Date("2012/01/01"), text: "Important date" }],
                label: {
                    position: "outside"
                }
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### categoryAxis.notes.line `Object`

The line of the notes.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 16, volume: 1500 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            notes: {
                data: [{ value: new Date("2012/01/01"), text: "Important date" }],
                line: {
                    width: 3,
                    color: "red"
                }
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### categoryAxis.notes.line.width `Number`

The line width of the notes.

#### Example - set the category axis notes line width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          line: {
            width: 4
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.line.color `String`

The line color of the notes.

#### Example - set the category axis notes color width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          line: {
            color: "#aa00bb"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.line.length `Number`

The length of the connecting lines in pixels.

#### Example - set the category axis notes color width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          line: {
            length: 20
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.data `Array`

The items of the notes.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 16, volume: 1500 },
                { date: "2012/01/03", open: 16, high: 20, low: 14, close: 18, volume: 2000 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            notes: {
                data: [
                    { value: new Date("2012/01/01"), text: "Start date" },
                    { value: new Date("2012/01/03"), text: "End date" }
                ]
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### categoryAxis.notes.data.value `Object`

The value of the note.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 16, volume: 1500 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            notes: {
                data: [
                    { value: new Date("2012/01/01"), text: "Start date" }
                ]
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### categoryAxis.notes.data.position `String`

The position of the category axis note.

* "top" - The note is positioned on the top.
* "bottom" - The note is positioned on the bottom.
* "left" - The note is positioned on the left.
* "right" - The note is positioned on the right.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 16, volume: 1500 }
            ]
        },
        dateField: "date",
        categoryAxis: {
            notes: {
                data: [
                    { value: new Date("2012/01/01"), text: "Start date", position: "top" }
                ]
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>
* "right" - The note is positioned on the right.

### categoryAxis.notes.data.icon `Object`

The icon of the note.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 0, 1), value: 100 },
                { date: new Date(2023, 0, 2), value: 105 },
                { date: new Date(2023, 0, 3), value: 98 }
            ]
        },
        categoryAxis: {
            notes: {
                data: [{
                    value: new Date(2023, 0, 2),
                    icon: {
                        background: "red",
                        border: { width: 2, color: "black" },
                        size: 20,
                        type: "circle",
                        visible: true
                    }
                }]
            }
        },
        series: [{
            field: "value",
            categoryField: "date"
        }]
    });
    </script>

### categoryAxis.notes.data.icon.background `String`

The background color of the note icon.

#### Example - set the category axis note icon background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            icon: {
              background: "red"
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.icon.border `Object`

The border of the icon.

#### Example - set the category axis note icon border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            icon: {
              border: {
                width: 2,
                color: "red"
              }
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.icon.border.color `String`

The border color of the icon.

#### Example - set the category axis note icon border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            icon: {
              border: {
                width: 2,
                color: "red"
              }
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.icon.border.width `Number`

The border width of the icon.

#### Example - set the category axis note icon border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            icon: {
              border: {
                width: 2,
                color: "red"
              }
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.icon.size `Number`

The size of the icon.

#### Example - set the category axis note icon size

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            icon: {
              size: 30
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.icon.type `String` *(default: "circle")*

The icon shape.

The supported values are:
* "circle" - the marker shape is circle.
* "square" - the marker shape is square.
* "triangle" - the marker shape is triangle.
* "cross" - the marker shape is cross.

#### Example - set the category axis note icon shape

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            icon: {
              shape: "triangle"
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.icon.visible `Boolean` *(default: "true")*

The icon visibility.

#### Example - set the category axis note icon visibility

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            icon: {
              visible: false
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.label `Object`

The label of the note.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 0, 1), value: 100 },
                { date: new Date(2023, 0, 2), value: 105 },
                { date: new Date(2023, 0, 3), value: 98 }
            ]
        },
        categoryAxis: {
            notes: {
                data: [{
                    value: new Date(2023, 0, 2),
                    label: {
                        text: "Important Point",
                        background: "yellow",
                        border: { width: 1, color: "black" },
                        color: "black",
                        font: "12px Arial",
                        visible: true
                    }
                }]
            }
        },
        series: [{
            field: "value",
            categoryField: "date"
        }]
    });
    </script>

### categoryAxis.notes.data.label.background `String`

The background color of the label. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the category axis note label background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notesdata: {
          data: [{
            value: 1,
            label: {
              background: "red"
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.label.border `Object`

The border of the label.

#### Example - set the category axis note label border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              border: {
                color: "green",
                dashType: "dashDot",
                width: 1
              }
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.label.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the category axis note label border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              border: {
                color: "green"
              }
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.label.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the category axis note label border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              border: {
                dashType: "dashDot",
                width: 1
              }
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.label.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the category axis note label border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              border: {
                width: 1
              }
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.label.color `String`

The text color of the note label. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the category axis note label color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              color: "#aa00bb"
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.label.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the note label.

#### Example - set the category axis note label font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              font: "20px sans-serif"
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.label.template `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* value - the category value

#### Example - set the category axis note label template as a string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              template: "Year: #: value #"
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.label.visible `Boolean` *(default: true)*

If set to `true` the chart will display the category notes label. By default the category notes label are visible.

#### Example - hide the category axis note label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              visible: false
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.label.rotation `Number` *(default: 0)*

The rotation angle of the label. By default the label are not rotated.

#### Example - rotate the category axis note label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              rotation: 90
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.label.format `String` *(default: "{0}")*

The format used to display the note label. Uses [kendo.format](/api/framework/kendo#methods-format). Contains one placeholder ("{0}") which represents the category value.

#### Example - set the category axis note label format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              format: "Category slot: {0}"
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.label.text `String`

The label note text.

#### Example - set the category axis label note text

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              text: "A"
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.label.position `String` *(default: "inside")*

The position of the category axis note label.

* "inside" - the label is positioned inside of the icon.
* "outside" - the label is positioned outside of the icon.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 0, 1), value: 100 },
                { date: new Date(2023, 0, 2), value: 105 },
                { date: new Date(2023, 0, 3), value: 98 }
            ]
        },
        categoryAxis: {
            notes: {
                data: [{
                    value: new Date(2023, 0, 2),
                    label: {
                        text: "Outside Label",
                        position: "outside"
                    }
                }]
            }
        },
        series: [{
            field: "value",
            categoryField: "date"
        }]
    });
    </script>

### categoryAxis.notes.data.line `Object`

The line of the note.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 0, 1), value: 100 },
                { date: new Date(2023, 0, 2), value: 105 },
                { date: new Date(2023, 0, 3), value: 98 }
            ]
        },
        categoryAxis: {
            notes: {
                data: [{
                    value: new Date(2023, 0, 2),
                    line: {
                        width: 3,
                        color: "red",
                        length: 25
                    }
                }]
            }
        },
        series: [{
            field: "value",
            categoryField: "date"
        }]
    });
    </script>

### categoryAxis.notes.data.line.width `Number`

The line width of the note.

#### Example - set the category axis note line width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            line: {
              width: 4
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.line.color `String`

The line color of the note.

#### Example - set the category axis note color width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            line: {
              color: "#aa00bb"
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.line.length `Number`

The length of the connecting lines in pixels.

#### Example - set the category axis note color width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            line: {
              length: 20
            }
          }]
        }
      }
    });
    </script>

### chartArea `Object`

The chart area configuration options.
This is the entire visible area of the chart.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 16, volume: 1500 }
            ]
        },
        dateField: "date",
        chartArea: {
            background: "lightblue",
            width: 800,
            height: 500
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### chartArea.background `String`*(default: "white")*

The background color of the chart area.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 16, volume: 1500 }
            ]
        },
        dateField: "date",
        chartArea: {
            background: "#f0f0f0"
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### chartArea.opacity `Number`*(default: 1)*

The background opacity of the chart area.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 16, volume: 1500 }
            ]
        },
        dateField: "date",
        chartArea: {
            background: "lightblue",
            opacity: 0.5
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### chartArea.border `Object`

The border of the chart area.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 16, volume: 1500 }
            ]
        },
        dateField: "date",
        chartArea: {
            border: {
                color: "red",
                width: 3,
                dashType: "dash"
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### chartArea.border.color `String`*(default: "black")*

The color of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 16, volume: 1500 }
            ]
        },
        dateField: "date",
        chartArea: {
            border: {
                color: "blue",
                width: 2
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### chartArea.border.dashType `String`*(default: "solid")*

The dash type of the border.

#### *"solid"*

Specifies a solid line.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 16, volume: 1500 }
            ]
        },
        dateField: "date",
        chartArea: {
            border: {
                color: "green",
                width: 2,
                dashType: "longDash"
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### chartArea.border.width `Number`*(default: 0)*

The width of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 16, volume: 1500 }
            ]
        },
        dateField: "date",
        chartArea: {
            border: {
                color: "black",
                width: 5
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### chartArea.height `Number`*(default: 400)*

The height of the chart area.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 16, volume: 1500 }
            ]
        },
        dateField: "date",
        chartArea: {
            height: 600
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### chartArea.margin `Number|Object`*(default: 5)*

The margin of the chart area.

#### Example

```pseudo
    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and left margin to 1px
    // margin right and bottom are with 5px (by default)
    margin: { top: 1, left: 1 }
```

### chartArea.width `Number`*(default: 600)*

 The width of the chart area.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 16, volume: 1500 }
            ]
        },
        dateField: "date",
        chartArea: {
            width: 800
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### dataSource `Object`

DataSource configuration or instance.

#### Example

```pseudo
    $("#chart").kendoChart({
        dataSource: {
            transport: {
                 read: "spain-electricity.json"
            }
        },
        series: [{
            field: "value"
        }],
        categoryAxis: {
            field: "year"
        }
    });

    // Alternative configuration
    var dataSource = new kendo.data.DataSource({
        transport: {
             read: "spain-electricity.json"
        }
    });

    $("#chart").kendoChart({
        dataSource: dataSource,
        series: [{
            field: "value"
        }],
        categoryAxis: {
            field: "year"
        }
    });
```

### autoBind `Boolean`*(default: true)*

Indicates whether the chart will call read on the data source initially.

#### Example

```pseudo
    $("#stock-chart").kendoStockChart({
        dataSource: chartDataSource,
        chartBind: false
    });

    // ...
    naviDataSource.read();
```

### legend `Object`

The chart legend configuration options.

#### Example

```pseudo
    $("#chart").kendoChart({
        legend: {
            // set the background color to a dark blue
            background: "#336699",
            labels: {
                // set the font to a size of 14px
                font: "14px Arial,Helvetica,sans-serif",
                // set the color to red
                color: "red"
            },
            // move the legend to the left
            position: "left",
            // move the legend a bit closer to the chart by setting the x offset to 20
            offsetX: 20,
            // move the legend up to the top by setting the y offset to -100
            offsetY: -100,
        }
    });
```

### legend.background `String`*(default: "white")*

 The background color of the legend. Any valid CSS color string will work here, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 16, volume: 1500 }
            ]
        },
        dateField: "date",
        legend: {
            visible: true,
            background: "lightgray"
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### legend.border `Object`

The border of the legend.

#### Example

```pseudo
    $("#chart").kendoChart({
        legend: {
            border: {
                // set the border width to 2 pixels
                width: 2,
                // set the color to grey
                color: "grey",
                // set the dash type to solid. this is the default so we could leave this line out.
                dashType: "solid"
            }
        },
        ...
    });
```

### legend.border.color `String`*(default: "black")*

 The color of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 16, volume: 1500 }
            ]
        },
        dateField: "date",
        legend: {
            visible: true,
            border: {
                color: "red",
                width: 2
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### legend.border.dashType `String`*(default: "solid")*

 The dash type of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 16, volume: 1500 }
            ]
        },
        dateField: "date",
        legend: {
            visible: true,
            border: {
                dashType: "dash",
                width: 2
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>


#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### legend.border.width `Number`*(default: 0)*

 The width of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 16, volume: 1500 }
            ]
        },
        dateField: "date",
        legend: {
            visible: true,
            border: {
                width: 3
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### legend.item `Object`

The configuration of the Chart legend item.

To override the marker configuration of individual series, use the [series.legendItem](/api/javascript/dataviz/ui/stock-chart#configuration-series.legendItem) settings of the series.

#### Example - disable highlight of legend items

    <div id="chart"></div>
    <script>
    $("#chart").kendoStockChart({
      dataSource: {
        data: [{
          "Date": "2016/01/01",
          "Open": 41.62,
          "High": 41.69,
          "Low": 39.81,
          "Close": 40.12,
          "Volume": 2632000
        }, {
          "Date": "2016/03/01",
          "Open": 40.62,
          "High": 39.69,
          "Low": 40.81,
          "Close": 39.12,
          "Volume": 2631986
        }]
      },
      dateField: "Date",
      series: [{
          name: "Series 1",
          type: "line",
          markers: {
            visible: true
          },
          field: "Close"
      }],
      legend: {
        visible: true,
        position: 'bottom',
        item: {
          highlight: {
            visible: false
          }
        }
      }
    });
    </script>

#### Example - display legacy style markers in the legend

    <div id="chart"></div>
    <script>
    $("#chart").kendoStockChart({
      dataSource: {
        data: [{
          "Date": "2016/01/01",
          "Open": 41.62,
          "High": 41.69,
          "Low": 39.81,
          "Close": 40.12,
          "Volume": 2632000
        }, {
          "Date": "2016/03/01",
          "Open": 40.62,
          "High": 39.69,
          "Low": 40.81,
          "Close": 39.12,
          "Volume": 2631986
        }]
      },
      dateField: "Date",
      series: [{
        name: "Series 1",
        type: "candlestick",
        openField: "Open",
        highField: "High",
        lowField: "Low",
        closeField: "Close"
      }],
      legend: {
        visible: true,
        position: 'bottom'
      },
      seriesDefaults: {
          /* Use these settings to emulate the legacy legend item rendering */
          legendItem: {
              type: 'line',
              line: {
                  dashType: 'solid',
              },
              markers: {
                  visible: false
              },
              highlight: {
                  visible: false
              }
          }
      }
    });
    </script>

### legend.item.area `Object`

Sets the configuration of the legend items of type `area`.
By default, all series except line and scatter use this legend type.

#### Example - sets the opacity of `area` legend items

    <div id="chart"></div>
    <script>
    $("#chart").kendoStockChart({
      dataSource: {
        data: [{
          "Date": "2016/01/01",
          "Open": 41.62,
          "High": 41.69,
          "Low": 39.81,
          "Close": 40.12,
          "Volume": 2632000
        }, {
          "Date": "2016/03/01",
          "Open": 40.62,
          "High": 39.69,
          "Low": 40.81,
          "Close": 39.12,
          "Volume": 2631986
        }]
      },
      dateField: "Date",
      series: [{
        name: "Series 1",
        type: "candlestick",
        openField: "Open",
        highField: "High",
        lowField: "Low",
        closeField: "Close"
      }],
      legend: {
        visible: true,
        position: 'bottom',
        item: {
          area: {
            opacity: 0.1,
          }
        }
      }
    });
    </script>

### legend.item.area.background `String`

The background color of the legend item. Accepts a valid CSS color string, including HEX and RGB.
Defaults to the series color.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 0, 1), value: 100 },
                { date: new Date(2023, 0, 2), value: 105 },
                { date: new Date(2023, 0, 3), value: 98 }
            ]
        },
        legend: {
            item: {
                area: {
                    background: "#ff6347"
                }
            }
        },
        series: [{
            field: "value",
            categoryField: "date",
            name: "Stock Price"
        }]
    });
    </script>

### legend.item.area.opacity `Number`

The opacity of the legend item.
Defaults to the series opacity.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 0, 1), value: 100 },
                { date: new Date(2023, 0, 2), value: 105 },
                { date: new Date(2023, 0, 3), value: 98 }
            ]
        },
        legend: {
            item: {
                area: {
                    opacity: 0.7
                }
            }
        },
        series: [{
            field: "value",
            categoryField: "date",
            name: "Stock Price"
        }]
    });
    </script>

### legend.item.cursor `String`

The [cursor style](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor) of the legend item.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 0, 1), value: 100 },
                { date: new Date(2023, 0, 2), value: 105 },
                { date: new Date(2023, 0, 3), value: 98 }
            ]
        },
        legend: {
            item: {
                cursor: "pointer"
            }
        },
        series: [{
            field: "value",
            categoryField: "date",
            name: "Stock Price"
        }]
    });
    </script>

### legend.item.highlight `Object`

The highlight configuration of the legend item.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 0, 1), value: 100 },
                { date: new Date(2023, 0, 2), value: 105 },
                { date: new Date(2023, 0, 3), value: 98 }
            ]
        },
        legend: {
            item: {
                highlight: {
                    markers: {
                        background: "yellow"
                    },
                    visible: true
                }
            }
        },
        series: [{
            field: "value",
            categoryField: "date",
            name: "Stock Price"
        }]
    });
    </script>

### legend.item.highlight.markers `Object`

The `markers` configuration of the legend item when it is hovered.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 0, 1), value: 100 },
                { date: new Date(2023, 0, 2), value: 105 },
                { date: new Date(2023, 0, 3), value: 98 }
            ]
        },
        legend: {
            item: {
                highlight: {
                    markers: {
                        background: "orange",
                        border: { color: "red", width: 2 }
                    }
                }
            }
        },
        series: [{
            field: "value",
            categoryField: "date",
            name: "Stock Price"
        }]
    });
    </script>

### legend.item.highlight.markers.background `String|Function`

The background color of the highlighted legend item markers.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 0, 1), value: 100 },
                { date: new Date(2023, 0, 2), value: 105 },
                { date: new Date(2023, 0, 3), value: 98 }
            ]
        },
        legend: {
            item: {
                highlight: {
                    markers: {
                        background: "yellow"
                    }
                }
            }
        },
        series: [{
            field: "value",
            categoryField: "date",
            name: "Stock Price"
        }]
    });
    </script>

### legend.item.highlight.markers.border `Object|Function`

The border of the highlighted markers.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 0, 1), value: 100 },
                { date: new Date(2023, 0, 2), value: 105 },
                { date: new Date(2023, 0, 3), value: 98 }
            ]
        },
        legend: {
            item: {
                highlight: {
                    markers: {
                        border: {
                            color: "purple",
                            width: 3,
                            dashType: "dash"
                        }
                    }
                }
            }
        },
        series: [{
            field: "value",
            categoryField: "date",
            name: "Stock Price"
        }]
    });
    </script>

### legend.item.highlight.markers.border.color `String|Function`

The configuration of the Chart legend highlighted item markers border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 0, 1), value: 100 },
                { date: new Date(2023, 0, 2), value: 105 },
                { date: new Date(2023, 0, 3), value: 98 }
            ]
        },
        legend: {
            item: {
                highlight: {
                    markers: {
                        border: {
                            color: "red"
                        }
                    }
                }
            }
        },
        series: [{
            field: "value",
            categoryField: "date",
            name: "Stock Price"
        }]
    });
    </script>

### legend.item.highlight.markers.border.dashType `String`

The dash type of the highlighted legend item border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 0, 1), value: 100 },
                { date: new Date(2023, 0, 2), value: 105 },
                { date: new Date(2023, 0, 3), value: 98 }
            ]
        },
        legend: {
            item: {
                highlight: {
                    markers: {
                        border: {
                            dashType: "dash"
                        }
                    }
                }
            }
        },
        series: [{
            field: "value",
            categoryField: "date",
            name: "Stock Price"
        }]
    });
    </script>

### legend.item.highlight.markers.borderRadius `Number`

The border radius in pixels when `type` is set to `"roundedRect"`.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 0, 1), value: 100 },
                { date: new Date(2023, 0, 2), value: 105 },
                { date: new Date(2023, 0, 3), value: 98 }
            ]
        },
        legend: {
            item: {
                highlight: {
                    markers: {
                        type: "roundedRect",
                        borderRadius: 5
                    }
                }
            }
        },
        series: [{
            field: "value",
            categoryField: "date",
            name: "Stock Price"
        }]
    });
    </script>

### legend.item.highlight.markers.type `String|Function`

The highlighted markers shape.

The supported values are:
* "circle" - the marker shape is circle.
* "square" - the marker shape is square.
* "triangle" - the marker shape is triangle.
* "cross" - the marker shape is cross.
* "rect" - alias for "square".
* "roundedRect" - the marker shape is a rounded rectangle.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 0, 1), value: 100 },
                { date: new Date(2023, 0, 2), value: 105 },
                { date: new Date(2023, 0, 3), value: 98 }
            ]
        },
        legend: {
            item: {
                highlight: {
                    markers: {
                        type: "triangle"
                    }
                }
            }
        },
        series: [{
            field: "value",
            categoryField: "date",
            name: "Stock Price"
        }]
    });
    </script>

### legend.item.highlight.markers.visible `Boolean|Function`

If set to `true` the chart will display the legend item markers. Defaults to the series options.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 0, 1), value: 100 },
                { date: new Date(2023, 0, 2), value: 105 },
                { date: new Date(2023, 0, 3), value: 98 }
            ]
        },
        legend: {
            item: {
                highlight: {
                    markers: {
                        visible: true
                    }
                }
            }
        },
        series: [{
            field: "value",
            categoryField: "date",
            name: "Stock Price"
        }]
    });
    </script>

### legend.item.highlight.markers.visual `Function`

A function that can be used to create a custom visual for the highlighted markers. The available argument fields are:

* rect - the `kendo.geometry.Rect` that defines where the visual should be rendered.
* options - the marker options.
* createVisual - a function that can be used to get the default visual.
* category - the category of the marker point.
* dataItem - the dataItem of the marker point.
* value - the value of the marker point.
* sender - the chart instance.
* series - the series of the marker point.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 0, 1), value: 100 },
                { date: new Date(2023, 0, 2), value: 105 },
                { date: new Date(2023, 0, 3), value: 98 }
            ]
        },
        legend: {
            item: {
                highlight: {
                    markers: {
                        visual: function(e) {
                            var rect = new kendo.geometry.Rect([0, 0], [10, 10]);
                            var path = kendo.geometry.Path.fromRect(rect);
                            var visual = new kendo.drawing.Path(path);
                            visual.stroke("red", 2);
                            visual.fill("yellow");
                            return visual;
                        }
                    }
                }
            }
        },
        series: [{
            field: "value",
            categoryField: "date",
            name: "Stock Price"
        }]
    });
    </script>

### legend.item.highlight.visible `Boolean` *(default: true)*

If set to `false`, the hover effect of the legend item is disabled.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 0, 1), value: 100 },
                { date: new Date(2023, 0, 2), value: 105 },
                { date: new Date(2023, 0, 3), value: 98 }
            ]
        },
        legend: {
            item: {
                highlight: {
                    visible: false
                }
            }
        },
        series: [{
            field: "value",
            categoryField: "date",
            name: "Stock Price"
        }]
    });
    </script>

### legend.item.line `Object`

Sets the configuration of the legend items of type `line`.
This is the default legend item type for all line and scatter series.

#### Example - override the color of `line` legend items

    <div id="chart"></div>
    <script>
    $("#chart").kendoStockChart({
      dataSource: {
        data: [{
          "Date": "2016/01/01",
          "Open": 41.62,
          "High": 41.69,
          "Low": 39.81,
          "Close": 40.12,
          "Volume": 2632000
        }, {
          "Date": "2016/03/01",
          "Open": 40.62,
          "High": 39.69,
          "Low": 40.81,
          "Close": 39.12,
          "Volume": 2631986
        }]
      },
      dateField: "Date",
      series: [{
        name: "Series 1",
        type: "candlestick",
        openField: "Open",
        highField: "High",
        lowField: "Low",
        closeField: "Close"
      }],
      legend: {
        visible: true,
        position: 'bottom',
        item: {
          line: {
            color: "#777",
          }
        }
      }
    });
    </script>

### legend.item.line.color `String`

The color of the legend item of type `line`. Accepts a valid CSS color string, including HEX and RGB.
Defaults to the series color.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 0, 1), value: 100 },
                { date: new Date(2023, 0, 2), value: 105 },
                { date: new Date(2023, 0, 3), value: 98 }
            ]
        },
        legend: {
            item: {
                line: {
                    color: "blue"
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            name: "Stock Price"
        }]
    });
    </script>

### legend.item.line.dashType `String`

The dash type of the legend item of type `line`.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 0, 1), value: 100 },
                { date: new Date(2023, 0, 2), value: 105 },
                { date: new Date(2023, 0, 3), value: 98 }
            ]
        },
        legend: {
            item: {
                line: {
                    dashType: "dash"
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            name: "Stock Price"
        }]
    });
    </script>

### legend.item.line.opacity `Number`

The opacity of the legend item of type `line`.
Defaults to the series opacity.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 0, 1), value: 100 },
                { date: new Date(2023, 0, 2), value: 105 },
                { date: new Date(2023, 0, 3), value: 98 }
            ]
        },
        legend: {
            item: {
                line: {
                    opacity: 0.6
                }
            }
        },
        series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            name: "Stock Price"
        }]
    });
    </script>

### legend.item.markers `Object`

The configuration of the Chart legend item markers.

By default, the marker configuration will be the same as the [series.markers](/api/javascript/dataviz/ui/stock-chart#configuration-series.markers) settings of the displayed series.

#### Example - override marker settings for the legend

    <div id="chart"></div>
    <script>
    $("#chart").kendoStockChart({
      dataSource: {
        data: [{
          "Date": "2016/01/01",
          "Open": 41.62,
          "High": 41.69,
          "Low": 39.81,
          "Close": 40.12,
          "Volume": 2632000
        }, {
          "Date": "2016/03/01",
          "Open": 40.62,
          "High": 39.69,
          "Low": 40.81,
          "Close": 39.12,
          "Volume": 2631986
        }]
      },
      dateField: "Date",
      series: [{
        name: "Series 1",
        type: "line",
        markers: {
            visible: true
        },
        field: "Close"
      }],
      legend: {
        visible: true,
        position: 'bottom',
        item: {
          markers: {
            visible: false
          }
        }
      }
    });
    </script>

### legend.item.markers.background `String|Function`

The background color of the legend item markers.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 0, 1), value: 100 },
                { date: new Date(2023, 0, 2), value: 105 },
                { date: new Date(2023, 0, 3), value: 98 }
            ]
        },
        legend: {
            item: {
                markers: {
                    background: "orange"
                }
            }
        },
        series: [{
            field: "value",
            categoryField: "date",
            name: "Stock Price"
        }]
    });
    </script>

### legend.item.markers.border `Object|Function`

The border of the markers.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 0, 1), value: 100 },
                { date: new Date(2023, 0, 2), value: 105 },
                { date: new Date(2023, 0, 3), value: 98 }
            ]
        },
        legend: {
            item: {
                markers: {
                    border: {
                        color: "red",
                        width: 2,
                        dashType: "dash"
                    }
                }
            }
        },
        series: [{
            field: "value",
            categoryField: "date",
            name: "Stock Price"
        }]
    });
    </script>

### legend.item.markers.border.color `String|Function`

The configuration of the Chart legend item markers border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 0, 1), value: 100 },
                { date: new Date(2023, 0, 2), value: 105 },
                { date: new Date(2023, 0, 3), value: 98 }
            ]
        },
        legend: {
            item: {
                markers: {
                    border: {
                        color: "purple"
                    }
                }
            }
        },
        series: [{
            field: "value",
            categoryField: "date",
            name: "Stock Price"
        }]
    });
    </script>

### legend.item.markers.border.dashType `String`

The dash type of the legend item border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 0, 1), value: 100 },
                { date: new Date(2023, 0, 2), value: 105 },
                { date: new Date(2023, 0, 3), value: 98 }
            ]
        },
        legend: {
            item: {
                markers: {
                    border: {
                        dashType: "dot"
                    }
                }
            }
        },
        series: [{
            field: "value",
            categoryField: "date",
            name: "Stock Price"
        }]
    });
    </script>

### legend.item.markers.borderRadius `Number`

The border radius in pixels when `type` is set to `"roundedRect"`.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 0, 1), value: 100 },
                { date: new Date(2023, 0, 2), value: 105 },
                { date: new Date(2023, 0, 3), value: 98 }
            ]
        },
        legend: {
            item: {
                markers: {
                    type: "roundedRect",
                    borderRadius: 8
                }
            }
        },
        series: [{
            field: "value",
            categoryField: "date",
            name: "Stock Price"
        }]
    });
    </script>

### legend.item.markers.type `String|Function`

The markers shape.

The supported values are:
* "circle" - the marker shape is circle.
* "square" - the marker shape is square.
* "triangle" - the marker shape is triangle.
* "cross" - the marker shape is cross.
* "rect" - alias for "square".
* "roundedRect" - the marker shape is a rounded rectangle.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 0, 1), value: 100 },
                { date: new Date(2023, 0, 2), value: 105 },
                { date: new Date(2023, 0, 3), value: 98 }
            ]
        },
        legend: {
            item: {
                markers: {
                    type: "triangle"
                }
            }
        },
        series: [{
            field: "value",
            categoryField: "date",
            name: "Stock Price"
        }]
    });
    </script>

### legend.item.markers.visible `Boolean|Function`

If set to `true` the chart will display the legend item markers. Defaults to the series options.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 0, 1), value: 100 },
                { date: new Date(2023, 0, 2), value: 105 },
                { date: new Date(2023, 0, 3), value: 98 }
            ]
        },
        legend: {
            item: {
                markers: {
                    visible: true
                }
            }
        },
        series: [{
            field: "value",
            categoryField: "date",
            name: "Stock Price"
        }]
    });
    </script>

### legend.item.markers.visual `Function`

A function that can be used to create a custom visual for the markers. The available argument fields are:

* rect - the `kendo.geometry.Rect` that defines where the visual should be rendered.
* options - the marker options.
* createVisual - a function that can be used to get the default visual.
* category - the category of the marker point.
* dataItem - the dataItem of the marker point.
* value - the value of the marker point.
* sender - the chart instance.
* series - the series of the marker point.

#### Example - use custom visual for the markers

    <div id="chart"></div>
    <script>
      $("#chart").kendoStockChart({
      dataSource: {
        data: [{
          "Date": "2016/01/01",
          "Open": 41.62,
          "High": 41.69,
          "Low": 39.81,
          "Close": 40.12,
          "Volume": 2632000
        }, {
          "Date": "2016/03/01",
          "Open": 40.62,
          "High": 39.69,
          "Low": 40.81,
          "Close": 39.12,
          "Volume": 2631986
        }]
      },
      dateField: "Date",
      series: [{
        name: "Series 1",
        type: "ohlc",
        openField: "Open",
        highField: "High",
        lowField: "Low",
        closeField: "Close"
      }],
      legend: {
        visible: true,
        position: "bottom",
        item: {
          type: 'line',
          markers: {
            visible: true,
            visual: function (e) {
              var origin = e.rect.origin;
              var center = e.rect.center();
              var bottomRight = e.rect.bottomRight();

              var path = new kendo.drawing.Path({
                fill: {
                  color: e.options.border.color
                }
              })
              .moveTo(origin.x, bottomRight.y)
              .lineTo(bottomRight.x, bottomRight.y)
              .lineTo(center.x, origin.y)
              .close();

              return path;
            }
          }
        }
      }
      });
    </script>

### legend.item.type `String`

Sets the type of the legend items.
The default value is based on the series type.

The supported values are:

- `"line"`&mdash;the legend items are rendered as a line. This is the default value for line charts.
* `"area"`&mdash;the legend items are rendered as a filled rectangle. This is the default value for area charts.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        legend: {
            item: {
                type: "area"
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 25 },
                { date: new Date(2023, 0, 3), value: 15 }             
            ],
        }]
    });
    </script>

### legend.item.visual `Function`

A function that can be used to create a custom visual for the legend items. The available argument fields are:

* options - the item options.
* createVisual - a function that can be used to get the default visual.

#### Example - using custom visual for the legend items

    <div id="chart"></div>
    <script>
        $("#chart").kendoStockChart({
            legend: {
                visible: true,
                position: "bottom",
                item: {
                    visual: function (e) {
                        var color = e.options.markers.background;
                        var labelColor = e.options.labels.color;
                        var rect = new kendo.geometry.Rect([0, 0], [100, 50]);
                        var layout = new kendo.drawing.Layout(rect, {
                            spacing: 5,
                            alignItems: "center"
                        });

                        var marker = new kendo.drawing.Path({
                            fill: {
                                color: color
                            }
                        }).moveTo(10, 0).lineTo(15, 10).lineTo(5, 10).close();

                        var label = new kendo.drawing.Text(e.series.name, [0, 0], {
                            fill: {
                                color: labelColor
                            }
                        });

                        layout.append(marker, label);
                        layout.reflow()

                        return layout;
                    }
                }
            },
            dataSource: {
                data: [{
                    "Date": "2016/01/01",
                    "Open": 41.62,
                    "High": 41.69,
                    "Low": 39.81,
                    "Close": 40.12,
                    "Volume": 2632000
                }, {
                    "Date": "2016/03/01",
                    "Open": 40.62,
                    "High": 39.69,
                    "Low": 40.81,
                    "Close": 39.12,
                    "Volume": 2631986
                }
                ]
            },
            dateField: "Date",
            series: [{
                name: "Series 1",
                type: "candlestick",
                openField: "Open",
                highField: "High",
                lowField: "Low",
                closeField: "Close"
            }]
        });
    </script>

### legend.labels `Object`

Configures the legend labels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        legend: {
            labels: {
                color: "red",
                font: "16px Arial"
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 25 },
                { date: new Date(2023, 0, 3), value: 15 }             
            ],
        }]
    });
    </script>

### legend.labels.color `String`*(default: "black")*

The color of the labels.
Any valid CSS color string will work here, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        legend: {
            labels: {
                color: "blue"
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 25 },
                { date: new Date(2023, 0, 3), value: 15 }             
            ],
        }]
    });
    </script>

### legend.labels.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        legend: {
            labels: {
                font: "14px Verdana"
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 25 },
                { date: new Date(2023, 0, 3), value: 15 }             
            ],
        }]
    });
    </script>

### legend.labels.template `String`

The [template](/api/framework/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

*   text - the text the legend item.
*   series - the data series.
*   value - the point value. (only for donut and pie charts)
*   percentage - the point value represented as a percentage value. Available only for 100% stacked charts.
*   dataItem - the original data item used to construct the point.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        legend: {
            labels: {
                template: (data) => `Series: ${data.text}`
            }
        },
        series: [{
            name: "Sales",
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 25 },
                { date: new Date(2023, 0, 3), value: 15 }             
            ],
        }]
    });
    </script>


### legend.margin `Number | Object`*(default: 10)*

 The margin of the legend.

#### Example

```pseudo
    $("#chart").kendoChart({
        legend: {
            // sets the top, right, bottom and left margin to 3px.
            margin: 3
        },
        //...
    });
    //
    $("#chart").kendoChart({
        legend: {
            // sets the top and left margin to 1px
            // margin right and bottom are with 10px (by default)
            margin: { top: 1, left: 1 }
        },
        //...
    });
```

### legend.offsetX `Number`*(default: 0)*

 The X offset from its position.  The offset is relative to the current position of the legend.
For instance, a value of 20 will move the legend 20 pixels to the right of it's initial position.  A negative value will move the legend
to the left of the current position.

#### Example

```pseudo
    $("#chart").kendoChart({
        legend: {
            // move the legend to the left side of the chart
            offsetX: 20
        },
        ...
    });
```

### legend.offsetY `Number`*(default: 0)*

 The Y offset from its position.  The offset is relative to the current position of the legend.
For instance, a value of 20 will move the legend 20 pixels down from it's initial position.  A negative value will move the legend
upwards from the current position.

#### Example

```pseudo
    $("#chart").kendoChart({
        legend: {
            // move the legend up 100 pixels
            offsetY: -100
        },
        ...
    });
```

### legend.padding `Number | Object`*(default: 5)*

 The padding of the legend.

#### Example

```pseudo
    // sets the top, right, bottom and left padding to 3px.
    $("#chart").kendoChart({
        legend: {
            // sets the top, right, bottom and left padding to 3px.
            padding: 3
        },
        ...
    });
    //
    $("#chart").kendoChart({
        legend: {
           // sets the top and left padding to 1px
           // padding right and bottom are with 5px (by default)
           padding: { top: 1, left: 1 }
        },
        ...
    });
```

### legend.position `String`*(default: "right")*

 The positions of the legend.


#### *"top"*

The legend is positioned on the top.

#### *"bottom"*

The legend is positioned on the bottom.

#### *"left"*

The legend is positioned on the left.

#### *"right"*

The legend is positioned on the right.

#### *"custom"*

The legend is positioned using OffsetX and OffsetY.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        legend: {
            position: "top"
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 25 },
                { date: new Date(2023, 0, 3), value: 15 }             
            ],
        }]
    });
    </script>

### legend.reverse `Boolean` *(default: false)*

If set to `true` the legend items will be reversed.

Available in versions 2013.3.1306 and later.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        legend: {
            reverse: true
        },
        series: [{
            name: "Series 1",
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ],
        }, {
            name: "Series 2", 
            type: "line",
            data: [
                { date: new Date(2023, 0, 4), value: 50 },
                { date: new Date(2023, 0, 5), value: 30 },
                { date: new Date(2023, 0, 6), value: 45 }
            ],
        }]
    });
    </script>

### legend.visible `Boolean`*(default: false)*

 The visibility of the legend.

#### Example

```pseudo
    $("#chart").kendoChart({
        legend: {
            // show the legend
            visible: true
        },
        ...
    });
```

### legend.inactiveItems `Object`

Configures the legend inactive items.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        legend: {
            inactiveItems: {
                labels: {
                    color: "gray"
                }
            }
        },
        series: [{
            name: "Series 1",
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ],
            visibleInLegend: false
        }]
    });
    </script>

### legend.inactiveItems.labels `Object`

Configures the legend labels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        legend: {
            inactiveItems: {
                labels: {
                    color: "lightgray",
                    font: "12px Arial"
                }
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ]
        }]
    });
    </script>

### legend.inactiveItems.labels.color `String` *(default: "black")*

The color of the labels.
Any valid CSS color string will work here, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        legend: {
            inactiveItems: {
                labels: {
                    color: "#cccccc"
                }
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ]
        }]
    });
    </script>

### legend.inactiveItems.labels.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        legend: {
            inactiveItems: {
                labels: {
                    font: "10px Verdana"
                }
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ],
        }]
    });
    </script>

### legend.inactiveItems.labels.template `String`

The [template](/api/framework/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

*   text - the text the legend item.
*   series - the data series.
*   value - the point value. (only for donut and pie charts)
*   percentage - the point value represented as a percentage value. Available only for 100% stacked charts.
*   dataItem - the original data item used to construct the point.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        legend: {
            inactiveItems: {
                labels: {
                    template: (data) => `[Inactive] ${data.text}`
                }
            }
        },
        series: [{
            name: "Sales",
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ],
        }]
    });
    </script>

### legend.inactiveItems.markers `Object`

Configures the legend markers.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        legend: {
            inactiveItems: {
                markers: {
                    color: "lightgray"
                }
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ],
        }]
    });
    </script>

### legend.inactiveItems.markers.color `String`

The color of the markers.
Any valid CSS color string will work here, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        legend: {
            inactiveItems: {
                markers: {
                    color: "#aaaaaa"
                }
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ],
        }]
    });
    </script>

### legend.title `Object`

The legend title configuration options or text.

#### Example

    <div id="stock-chart"></div>
    <script>
     $("#stock-chart").kendoStockChart({
          series: [
            {
              type: "candlestick",
              data: [
                {
                  date: new Date(2024, 0, 1),
                  open: 150.25,
                  high: 152.8,
                  low: 149.5,
                  close: 152.3,
                },
                {
                  date: new Date(2024, 0, 2),
                  open: 152.5,
                  high: 154.2,
                  low: 151.8,
                  close: 153.75,
                },
                {
                  date: new Date(2024, 0, 3),
                  open: 153.8,
                  high: 155.4,
                  low: 152.9,
                  close: 154.2,
                },
                
              ],
              openField: "open",
              highField: "high",
              lowField: "low",
              closeField: "close",
              dateField: "date",
              name: "Stock Price",
              color: "#03a9f4",
              downColor: "#f44336",
            },
          ],
          legend: {
            title: {
                text: "Legend Title",
                color: "blue"
            }
          },
          navigator: {
            series: {
              type: "line",
              data: [
                {
                  date: new Date(2024, 0, 1),
                  open: 150.25,
                  high: 152.8,
                  low: 149.5,
                  close: 152.3,
                },
                {
                  date: new Date(2024, 0, 2),
                  open: 152.5,
                  high: 154.2,
                  low: 151.8,
                  close: 153.75,
                },
                {
                  date: new Date(2024, 0, 3),
                  open: 153.8,
                  high: 155.4,
                  low: 152.9,
                  close: 154.2,
                },
                
              ],
              field: "close",
              dateField: "date",
              color: "#ff9800",
            },
          },
        });
    </script>

### legend.title.align `String` *(default: "center")*

The alignment of the title.

* "center" - the text is aligned to the middle.
* "left" - the text is aligned to the left.
* "right" - the text is aligned to the right.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
          series: [
            {
              type: "candlestick",
              data: [
                {
                  date: new Date(2024, 0, 1),
                  open: 150.25,
                  high: 152.8,
                  low: 149.5,
                  close: 152.3,
                },
                {
                  date: new Date(2024, 0, 2),
                  open: 152.5,
                  high: 154.2,
                  low: 151.8,
                  close: 153.75,
                },
                {
                  date: new Date(2024, 0, 3),
                  open: 153.8,
                  high: 155.4,
                  low: 152.9,
                  close: 154.2,
                },
                
              ],
              openField: "open",
              highField: "high",
              lowField: "low",
              closeField: "close",
              dateField: "date",
              name: "Stock Price",
              color: "#03a9f4",
              downColor: "#f44336",
            },
          ],
          legend: {
            title: {
                text: "Legend Title",
                align: "left"
            }
          },
          navigator: {
            series: {
              type: "line",
              data: [
                {
                  date: new Date(2024, 0, 1),
                  open: 150.25,
                  high: 152.8,
                  low: 149.5,
                  close: 152.3,
                },
                {
                  date: new Date(2024, 0, 2),
                  open: 152.5,
                  high: 154.2,
                  low: 151.8,
                  close: 153.75,
                },
                {
                  date: new Date(2024, 0, 3),
                  open: 153.8,
                  high: 155.4,
                  low: 152.9,
                  close: 154.2,
                },
                
              ],
              field: "close",
              dateField: "date",
              color: "#ff9800",
            },
          },
        });
    </script>

### legend.title.background `String` *(default: "white")*

The background color of the title. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
     $("#stock-chart").kendoStockChart({
          series: [
            {
              type: "candlestick",
              data: [
                {
                  date: new Date(2024, 0, 1),
                  open: 150.25,
                  high: 152.8,
                  low: 149.5,
                  close: 152.3,
                },
                {
                  date: new Date(2024, 0, 2),
                  open: 152.5,
                  high: 154.2,
                  low: 151.8,
                  close: 153.75,
                },
                {
                  date: new Date(2024, 0, 3),
                  open: 153.8,
                  high: 155.4,
                  low: 152.9,
                  close: 154.2,
                },
                
              ],
              openField: "open",
              highField: "high",
              lowField: "low",
              closeField: "close",
              dateField: "date",
              name: "Stock Price",
              color: "#03a9f4",
              downColor: "#f44336",
            },
          ],
          legend: {
            title: {
                text: "Legend Title",
                background: "lightblue"
            }
          },
          navigator: {
            series: {
              type: "line",
              data: [
                {
                  date: new Date(2024, 0, 1),
                  open: 150.25,
                  high: 152.8,
                  low: 149.5,
                  close: 152.3,
                },
                {
                  date: new Date(2024, 0, 2),
                  open: 152.5,
                  high: 154.2,
                  low: 151.8,
                  close: 153.75,
                },
                {
                  date: new Date(2024, 0, 3),
                  open: 153.8,
                  high: 155.4,
                  low: 152.9,
                  close: 154.2,
                },
                
              ],
              field: "close",
              dateField: "date",
              color: "#ff9800",
            },
          },
        });
    </script>

### legend.title.border `Object`

The border of the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
          series: [
            {
              type: "candlestick",
              data: [
                {
                  date: new Date(2024, 0, 1),
                  open: 150.25,
                  high: 152.8,
                  low: 149.5,
                  close: 152.3,
                },
                {
                  date: new Date(2024, 0, 2),
                  open: 152.5,
                  high: 154.2,
                  low: 151.8,
                  close: 153.75,
                },
                {
                  date: new Date(2024, 0, 3),
                  open: 153.8,
                  high: 155.4,
                  low: 152.9,
                  close: 154.2,
                },
                
              ],
              openField: "open",
              highField: "high",
              lowField: "low",
              closeField: "close",
              dateField: "date",
              name: "Stock Price",
              color: "#03a9f4",
              downColor: "#f44336",
            },
          ],
          legend: {
            title: {
                text: "Legend Title",
                border: {
                    color: "red",
                    width: 2
                }
            }
          },
          navigator: {
            series: {
              type: "line",
              data: [
                {
                  date: new Date(2024, 0, 1),
                  open: 150.25,
                  high: 152.8,
                  low: 149.5,
                  close: 152.3,
                },
                {
                  date: new Date(2024, 0, 2),
                  open: 152.5,
                  high: 154.2,
                  low: 151.8,
                  close: 153.75,
                },
                {
                  date: new Date(2024, 0, 3),
                  open: 153.8,
                  high: 155.4,
                  low: 152.9,
                  close: 154.2,
                },
                
              ],
              field: "close",
              dateField: "date",
              color: "#ff9800",
            },
          },
        });
    </script>

### legend.title.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
          series: [
            {
              type: "candlestick",
              data: [
                {
                  date: new Date(2024, 0, 1),
                  open: 150.25,
                  high: 152.8,
                  low: 149.5,
                  close: 152.3,
                },
                {
                  date: new Date(2024, 0, 2),
                  open: 152.5,
                  high: 154.2,
                  low: 151.8,
                  close: 153.75,
                },
                {
                  date: new Date(2024, 0, 3),
                  open: 153.8,
                  high: 155.4,
                  low: 152.9,
                  close: 154.2,
                },
                
              ],
              openField: "open",
              highField: "high",
              lowField: "low",
              closeField: "close",
              dateField: "date",
              name: "Stock Price",
              color: "#03a9f4",
              downColor: "#f44336",
            },
          ],
          legend: {
            title: {
                text: "Legend Title",
                border: {
                    color: "green"
                }
            }
          },
          navigator: {
            series: {
              type: "line",
              data: [
                {
                  date: new Date(2024, 0, 1),
                  open: 150.25,
                  high: 152.8,
                  low: 149.5,
                  close: 152.3,
                },
                {
                  date: new Date(2024, 0, 2),
                  open: 152.5,
                  high: 154.2,
                  low: 151.8,
                  close: 153.75,
                },
                {
                  date: new Date(2024, 0, 3),
                  open: 153.8,
                  high: 155.4,
                  low: 152.9,
                  close: 154.2,
                },
                
              ],
              field: "close",
              dateField: "date",
              color: "#ff9800",
            },
          },
        });
    </script>

### legend.title.border.dashType `String` *(default: "solid")*

The dash type of the legend title border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
          series: [
            {
              type: "candlestick",
              data: [
                {
                  date: new Date(2024, 0, 1),
                  open: 150.25,
                  high: 152.8,
                  low: 149.5,
                  close: 152.3,
                },
                {
                  date: new Date(2024, 0, 2),
                  open: 152.5,
                  high: 154.2,
                  low: 151.8,
                  close: 153.75,
                },
                {
                  date: new Date(2024, 0, 3),
                  open: 153.8,
                  high: 155.4,
                  low: 152.9,
                  close: 154.2,
                },
                
              ],
              openField: "open",
              highField: "high",
              lowField: "low",
              closeField: "close",
              dateField: "date",
              name: "Stock Price",
              color: "#03a9f4",
              downColor: "#f44336",
            },
          ],
          legend: {
            title: {
                text: "Legend Title",
                border: {
                    color: "blue",
                    dashType: "dash",
                    width: 2
                }
            }
          },
          navigator: {
            series: {
              type: "line",
              data: [
                {
                  date: new Date(2024, 0, 1),
                  open: 150.25,
                  high: 152.8,
                  low: 149.5,
                  close: 152.3,
                },
                {
                  date: new Date(2024, 0, 2),
                  open: 152.5,
                  high: 154.2,
                  low: 151.8,
                  close: 153.75,
                },
                {
                  date: new Date(2024, 0, 3),
                  open: 153.8,
                  high: 155.4,
                  low: 152.9,
                  close: 154.2,
                },
                
              ],
              field: "close",
              dateField: "date",
              color: "#ff9800",
            },
          },
        });
    </script>

### legend.title.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
          series: [
            {
              type: "candlestick",
              data: [
                {
                  date: new Date(2024, 0, 1),
                  open: 150.25,
                  high: 152.8,
                  low: 149.5,
                  close: 152.3,
                },
                {
                  date: new Date(2024, 0, 2),
                  open: 152.5,
                  high: 154.2,
                  low: 151.8,
                  close: 153.75,
                },
                {
                  date: new Date(2024, 0, 3),
                  open: 153.8,
                  high: 155.4,
                  low: 152.9,
                  close: 154.2,
                },
                
              ],
              openField: "open",
              highField: "high",
              lowField: "low",
              closeField: "close",
              dateField: "date",
              name: "Stock Price",
              color: "#03a9f4",
              downColor: "#f44336",
            },
          ],
          legend: {
            title: {
                text: "Legend Title",
                border: {
                    color: "red",
                    width: 3
                }
            }
          },
          navigator: {
            series: {
              type: "line",
              data: [
                {
                  date: new Date(2024, 0, 1),
                  open: 150.25,
                  high: 152.8,
                  low: 149.5,
                  close: 152.3,
                },
                {
                  date: new Date(2024, 0, 2),
                  open: 152.5,
                  high: 154.2,
                  low: 151.8,
                  close: 153.75,
                },
                {
                  date: new Date(2024, 0, 3),
                  open: 153.8,
                  high: 155.4,
                  low: 152.9,
                  close: 154.2,
                },
                
              ],
              field: "close",
              dateField: "date",
              color: "#ff9800",
            },
          },
        });
    </script>

### legend.title.color `String`

The text color of the title. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
          series: [
            {
              type: "candlestick",
              data: [
                {
                  date: new Date(2024, 0, 1),
                  open: 150.25,
                  high: 152.8,
                  low: 149.5,
                  close: 152.3,
                },
                {
                  date: new Date(2024, 0, 2),
                  open: 152.5,
                  high: 154.2,
                  low: 151.8,
                  close: 153.75,
                },
                {
                  date: new Date(2024, 0, 3),
                  open: 153.8,
                  high: 155.4,
                  low: 152.9,
                  close: 154.2,
                },
                
              ],
              openField: "open",
              highField: "high",
              lowField: "low",
              closeField: "close",
              dateField: "date",
              name: "Stock Price",
              color: "#03a9f4",
              downColor: "#f44336",
            },
          ],
          legend: {
            title: {
                text: "Legend Title",
                color: "purple"
            }
          },
          navigator: {
            series: {
              type: "line",
              data: [
                {
                  date: new Date(2024, 0, 1),
                  open: 150.25,
                  high: 152.8,
                  low: 149.5,
                  close: 152.3,
                },
                {
                  date: new Date(2024, 0, 2),
                  open: 152.5,
                  high: 154.2,
                  low: 151.8,
                  close: 153.75,
                },
                {
                  date: new Date(2024, 0, 3),
                  open: 153.8,
                  high: 155.4,
                  low: 152.9,
                  close: 154.2,
                },
                
              ],
              field: "close",
              dateField: "date",
              color: "#ff9800",
            },
          },
        });
    </script>

### legend.title.font `String` *(default: "16px Arial,Helvetica,sans-serif")*

The font of the title.

#### Example

    <div id="stock-chart"></div>
    <script>
     $("#stock-chart").kendoStockChart({
          series: [
            {
              type: "candlestick",
              data: [
                {
                  date: new Date(2024, 0, 1),
                  open: 150.25,
                  high: 152.8,
                  low: 149.5,
                  close: 152.3,
                },
                {
                  date: new Date(2024, 0, 2),
                  open: 152.5,
                  high: 154.2,
                  low: 151.8,
                  close: 153.75,
                },
                {
                  date: new Date(2024, 0, 3),
                  open: 153.8,
                  high: 155.4,
                  low: 152.9,
                  close: 154.2,
                },
                
              ],
              openField: "open",
              highField: "high",
              lowField: "low",
              closeField: "close",
              dateField: "date",
              name: "Stock Price",
              color: "#03a9f4",
              downColor: "#f44336",
            },
          ],
          legend: {
            title: {
                text: "Legend Title",
                font: "18px Verdana"
            }
          },
          navigator: {
            series: {
              type: "line",
              data: [
                {
                  date: new Date(2024, 0, 1),
                  open: 150.25,
                  high: 152.8,
                  low: 149.5,
                  close: 152.3,
                },
                {
                  date: new Date(2024, 0, 2),
                  open: 152.5,
                  high: 154.2,
                  low: 151.8,
                  close: 153.75,
                },
                {
                  date: new Date(2024, 0, 3),
                  open: 153.8,
                  high: 155.4,
                  low: 152.9,
                  close: 154.2,
                },
                
              ],
              field: "close",
              dateField: "date",
              color: "#ff9800",
            },
          },
        });
    </script>

### legend.title.margin `Number|Object` *(default: 5)*

The margin of the title. A numeric value will set all margins.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
          series: [
            {
              type: "candlestick",
              data: [
                {
                  date: new Date(2024, 0, 1),
                  open: 150.25,
                  high: 152.8,
                  low: 149.5,
                  close: 152.3,
                },
                {
                  date: new Date(2024, 0, 2),
                  open: 152.5,
                  high: 154.2,
                  low: 151.8,
                  close: 153.75,
                },
                {
                  date: new Date(2024, 0, 3),
                  open: 153.8,
                  high: 155.4,
                  low: 152.9,
                  close: 154.2,
                },
                
              ],
              openField: "open",
              highField: "high",
              lowField: "low",
              closeField: "close",
              dateField: "date",
              name: "Stock Price",
              color: "#03a9f4",
              downColor: "#f44336",
            },
          ],
          legend: {
            title: {
                text: "Legend Title",
                margin: 10
            }
          },
          navigator: {
            series: {
              type: "line",
              data: [
                {
                  date: new Date(2024, 0, 1),
                  open: 150.25,
                  high: 152.8,
                  low: 149.5,
                  close: 152.3,
                },
                {
                  date: new Date(2024, 0, 2),
                  open: 152.5,
                  high: 154.2,
                  low: 151.8,
                  close: 153.75,
                },
                {
                  date: new Date(2024, 0, 3),
                  open: 153.8,
                  high: 155.4,
                  low: 152.9,
                  close: 154.2,
                },
                
              ],
              field: "close",
              dateField: "date",
              color: "#ff9800",
            },
          },
        });
    </script>

### legend.title.margin.bottom `Number` *(default: 0)*

The bottom margin of the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
          series: [
            {
              type: "candlestick",
              data: [
                {
                  date: new Date(2024, 0, 1),
                  open: 150.25,
                  high: 152.8,
                  low: 149.5,
                  close: 152.3,
                },
                {
                  date: new Date(2024, 0, 2),
                  open: 152.5,
                  high: 154.2,
                  low: 151.8,
                  close: 153.75,
                },
                {
                  date: new Date(2024, 0, 3),
                  open: 153.8,
                  high: 155.4,
                  low: 152.9,
                  close: 154.2,
                },
                
              ],
              openField: "open",
              highField: "high",
              lowField: "low",
              closeField: "close",
              dateField: "date",
              name: "Stock Price",
              color: "#03a9f4",
              downColor: "#f44336",
            },
          ],
          legend: {
            title: {
                text: "Legend Title",
                margin: {
                    bottom: 10
                }
            }
          },
          navigator: {
            series: {
              type: "line",
              data: [
                {
                  date: new Date(2024, 0, 1),
                  open: 150.25,
                  high: 152.8,
                  low: 149.5,
                  close: 152.3,
                },
                {
                  date: new Date(2024, 0, 2),
                  open: 152.5,
                  high: 154.2,
                  low: 151.8,
                  close: 153.75,
                },
                {
                  date: new Date(2024, 0, 3),
                  open: 153.8,
                  high: 155.4,
                  low: 152.9,
                  close: 154.2,
                },
                
              ],
              field: "close",
              dateField: "date",
              color: "#ff9800",
            },
          },
        });
    </script>

### legend.title.margin.left `Number` *(default: 0)*

The left margin of the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41,
                volume: 2632000
            }, {
                date: new Date(2016, 0, 2),
                close: 42,
                volume: 2631000
            }]
        },
        series: [{
            field: "close",
            name: "Price"
        }],
        legend: {
            visible: true,
            title: {
                text: "Stock Chart",
                margin: {
                    left: 20
                }
            }
        }
    });
    </script>

### legend.title.margin.right `Number` *(default: 0)*

The right margin of the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41,
                volume: 2632000
            }, {
                date: new Date(2016, 0, 2),
                close: 42,
                volume: 2631000
            }]
        },
        series: [{
            field: "close",
            name: "Price"
        }],
        legend: {
            visible: true,
            title: {
                text: "Stock Chart",
                margin: {
                    right: 15
                }
            }
        }
    });
    </script>

### legend.title.margin.top `Number` *(default: 0)*

The top margin of the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41,
                volume: 2632000
            }, {
                date: new Date(2016, 0, 2),
                close: 42,
                volume: 2631000
            }]
        },
        series: [{
            field: "close",
            name: "Price"
        }],
        legend: {
            visible: true,
            title: {
                text: "Stock Chart",
                margin: {
                    top: 10
                }
            }
        }
    });
    </script>

### legend.title.padding `Number|Object` *(default: 5)*

The padding of the title. A numeric value will set all margins.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41,
                volume: 2632000
            }, {
                date: new Date(2016, 0, 2),
                close: 42,
                volume: 2631000
            }]
        },
        series: [{
            field: "close",
            name: "Price"
        }],
        legend: {
            visible: true,
            title: {
                text: "Stock Chart",
                padding: 10
            }
        }
    });
    </script>

### legend.title.padding.bottom `Number` *(default: 0)*

The bottom padding of the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41,
                volume: 2632000
            }, {
                date: new Date(2016, 0, 2),
                close: 42,
                volume: 2631000
            }]
        },
        series: [{
            field: "close",
            name: "Price"
        }],
        legend: {
            visible: true,
            title: {
                text: "Stock Chart",
                padding: {
                    bottom: 8
                }
            }
        }
    });
    </script>

### legend.title.padding.left `Number` *(default: 0)*

The left padding of the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41,
                volume: 2632000
            }, {
                date: new Date(2016, 0, 2),
                close: 42,
                volume: 2631000
            }]
        },
        series: [{
            field: "close",
            name: "Price"
        }],
        legend: {
            visible: true,
            title: {
                text: "Stock Chart",
                padding: {
                    left: 12
                }
            }
        }
    });
    </script>

### legend.title.padding.right `Number` *(default: 0)*

The right padding of the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41,
                volume: 2632000
            }, {
                date: new Date(2016, 0, 2),
                close: 42,
                volume: 2631000
            }]
        },
        series: [{
            field: "close",
            name: "Price"
        }],
        legend: {
            visible: true,
            title: {
                text: "Stock Chart",
                padding: {
                    right: 15
                }
            }
        }
    });
    </script>

### legend.title.padding.top `Number` *(default: 0)*

The top padding of the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41,
                volume: 2632000
            }, {
                date: new Date(2016, 0, 2),
                close: 42,
                volume: 2631000
            }]
        },
        series: [{
            field: "close",
            name: "Price"
        }],
        legend: {
            visible: true,
            title: {
                text: "Stock Chart",
                padding: {
                    top: 10
                }
            }
        }
    });
    </script>

### legend.title.position `String` *(default: "top")*

The position of the title.

* "bottom" - the title is positioned on the bottom.
* "top" - the title is positioned on the top.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41,
                volume: 2632000
            }, {
                date: new Date(2016, 0, 2),
                close: 42,
                volume: 2631000
            }]
        },
        series: [{
            field: "close",
            name: "Price"
        }],
        legend: {
            visible: true,
            title: {
                text: "Stock Chart",
                position: "bottom"
            }
        }
    });
    </script>

### legend.title.text `String`

The text of the legend title. You can also set the text directly for a title with default options.

> The text can be split into multiple lines by using line feed characters ("\n").

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41,
                volume: 2632000
            }, {
                date: new Date(2016, 0, 2),
                close: 42,
                volume: 2631000
            }]
        },
        series: [{
            field: "close",
            name: "Price"
        }],
        legend: {
            visible: true,
            title: {
                text: "Stock Performance\nYearly Data"
            }
        }
    });
    </script>

### legend.title.visible `Boolean` *(default: true)*

If set to `true` the chart will display the title. By default the title will be displayed.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41,
                volume: 2632000
            }, {
                date: new Date(2016, 0, 2),
                close: 42,
                volume: 2631000
            }]
        },
        series: [{
            field: "close",
            name: "Price"
        }],
        legend: {
            visible: true,
            title: {
                text: "Stock Chart",
                visible: false
            }
        }
    });
    </script>

### panes `Array`

The chart panes configuration.

Panes are used to split the chart in two or more parts. The panes are ordered from top to bottom.

Each axis can be associated with a pane by setting its `pane` option to the name of the desired pane.
Axis that don't have specified pane are placed in the top (default) pane.

Series are moved to the desired pane by associating them with an axis.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41,
                high: 43,
                low: 40,
                open: 42,
                volume: 2632000
            }, {
                date: new Date(2016, 0, 2),
                close: 42,
                high: 44,
                low: 41,
                open: 41,
                volume: 2631000
            }]
        },
        series: [{
            field: "close",
            name: "Price",
            axis: "price"
        }, {
            field: "volume",
            name: "Volume",
            axis: "volume"
        }],
        valueAxis: [{
            name: "price",
            pane: "pricePane"
        }, {
            name: "volume",
            pane: "volumePane"
        }],
        panes: [{
            name: "pricePane",
            height: 200
        }, {
            name: "volumePane",
            height: 100
        }]
    });
    </script>

### panes.name `String`

The unique pane name.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41,
                volume: 2632000
            }, {
                date: new Date(2016, 0, 2),
                close: 42,
                volume: 2631000
            }]
        },
        series: [{
            field: "close",
            name: "Price",
            axis: "price"
        }, {
            field: "volume",
            name: "Volume",
            axis: "volume"
        }],
        valueAxis: [{
            name: "price",
            pane: "pricePane"
        }, {
            name: "volume",
            pane: "volumePane"
        }],
        panes: [{
            name: "pricePane"
        }, {
            name: "volumePane"
        }]
    });
    </script>

### panes.margin `Number|Object`

The margin of the pane.

#### Example

```pseudo
    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and left margin to 1px
    margin: { top: 1, left: 1 }
```

### panes.padding `Number|Object`

The padding of the pane.

#### Example

```pseudo
    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    padding: { top: 1, left: 1 }
```

### panes.background `String`

The background color of the pane.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41,
                volume: 2632000
            }, {
                date: new Date(2016, 0, 2),
                close: 42,
                volume: 2631000
            }]
        },
        series: [{
            field: "close",
            name: "Price"
        }],
        panes: [{
            name: "default",
            background: "#f0f0f0"
        }]
    });
    </script>

### panes.border `Object`

The border of the pane.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41,
                volume: 2632000
            }, {
                date: new Date(2016, 0, 2),
                close: 42,
                volume: 2631000
            }]
        },
        series: [{
            field: "close",
            name: "Price"
        }],
        panes: [{
            name: "default",
            border: {
                color: "blue",
                width: 2
            }
        }]
    });
    </script>

### panes.border.color `String`*(default: "black")*

The color of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41,
                volume: 2632000
            }, {
                date: new Date(2016, 0, 2),
                close: 42,
                volume: 2631000
            }]
        },
        series: [{
            field: "close",
            name: "Price"
        }],
        panes: [{
            name: "default",
            border: {
                color: "red"
            }
        }]
    });
    </script>

### panes.border.dashType `String`*(default: "solid")*

The dash type of the border.

#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41,
                volume: 2632000
            }, {
                date: new Date(2016, 0, 2),
                close: 42,
                volume: 2631000
            }]
        },
        series: [{
            field: "close",
            name: "Price"
        }],
        panes: [{
            name: "default",
            border: {
                dashType: "dash"
            }
        }]
    });
    </script>

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### panes.border.width `Number`*(default: 0)*

The width of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41,
                volume: 2632000
            }, {
                date: new Date(2016, 0, 2),
                close: 42,
                volume: 2631000
            }]
        },
        series: [{
            field: "close",
            name: "Price"
        }],
        panes: [{
            name: "default",
            border: {
                width: 3
            }
        }]
    });
    </script>

### panes.clip `Boolean`

Specifies whether the charts in the pane should be clipped.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41,
                volume: 2632000
            }, {
                date: new Date(2016, 0, 2),
                close: 42,
                volume: 2631000
            }]
        },
        series: [{
            field: "close",
            name: "Price"
        }],
        panes: [{
            name: "default",
            clip: false
        }]
    });
    </script>

### panes.height `Number`

The pane height in pixels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41,
                volume: 2632000
            }, {
                date: new Date(2016, 0, 2),
                close: 42,
                volume: 2631000
            }]
        },
        series: [{
            field: "close",
            name: "Price"
        }],
        panes: [{
            name: "default",
            height: 300
        }]
    });
    </script>

### panes.title `String|Object`

The pane title text or configuration.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41,
                volume: 2632000
            }, {
                date: new Date(2016, 0, 2),
                close: 42,
                volume: 2631000
            }]
        },
        series: [{
            field: "close",
            name: "Price"
        }],
        panes: [{
            name: "default",
            title: "Stock Price"
        }]
    });
    </script>

### panes.title.background `String`

The background color of the title. Any valid CSS color string will work here, including
hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41,
                volume: 2632000
            }, {
                date: new Date(2016, 0, 2),
                close: 42,
                volume: 2631000
            }]
        },
        series: [{
            field: "close",
            name: "Price"
        }],
        panes: [{
            name: "default",
            title: {
                text: "Stock Price",
                background: "#f0f0f0"
            }
        }]
    });
    </script>

### panes.title.border `Object`

The border of the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41,
                volume: 2632000
            }, {
                date: new Date(2016, 0, 2),
                close: 42,
                volume: 2631000
            }]
        },
        series: [{
            field: "close",
            name: "Price"
        }],
        panes: [{
            name: "default",
            title: {
                text: "Stock Price",
                border: {
                    color: "blue",
                    width: 1
                }
            }
        }]
    });
    </script>

### panes.title.border.color `String`*(default: "black")*

The color of the border. Any valid CSS color string will work here, including
hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41,
                volume: 2632000
            }, {
                date: new Date(2016, 0, 2),
                close: 42,
                volume: 2631000
            }]
        },
        series: [{
            field: "close",
            name: "Price"
        }],
        panes: [{
            name: "default",
            title: {
                text: "Stock Price",
                border: {
                    color: "red"
                }
            }
        }]
    });
    </script>

### panes.title.border.dashType `String`*(default: "solid")*

The dash type of the border.

#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41,
                volume: 2632000
            }, {
                date: new Date(2016, 0, 2),
                close: 42,
                volume: 2631000
            }]
        },
        series: [{
            field: "close",
            name: "Price"
        }],
        panes: [{
            name: "default",
            title: {
                text: "Stock Price",
                border: {
                    dashType: "dash"
                }
            }
        }]
    });
    </script>

### panes.title.border.width `Number`*(default: 0)*

The width of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41,
                volume: 2632000
            }, {
                date: new Date(2016, 0, 2),
                close: 42,
                volume: 2631000
            }]
        },
        series: [{
            field: "close",
            name: "Price"
        }],
        panes: [{
            name: "default",
            title: {
                text: "Stock Price",
                border: {
                    width: 2
                }
            }
        }]
    });
    </script>

### panes.title.color `String`

The text color of the title. Any valid CSS color string will work here, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41,
                volume: 2632000
            }, {
                date: new Date(2016, 0, 2),
                close: 42,
                volume: 2631000
            }]
        },
        series: [{
            field: "close",
            name: "Price"
        }],
        panes: [{
            name: "default",
            title: {
                text: "Stock Price",
                color: "blue"
            }
        }]
    });
    </script>

### panes.title.font `String`*(default: "16px Arial,Helvetica,sans-serif")*

The font style of the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41,
                volume: 2632000
            }, {
                date: new Date(2016, 0, 2),
                close: 42,
                volume: 2631000
            }]
        },
        series: [{
            field: "close",
            name: "Price"
        }],
        panes: [{
            name: "default",
            title: {
                text: "Stock Price",
                font: "bold 18px Arial"
            }
        }]
    });
    </script>

### panes.title.margin `Number|Object`*(default: 5)*

The margin of the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41,
                volume: 2632000
            }, {
                date: new Date(2016, 0, 2),
                close: 42,
                volume: 2631000
            }]
        },
        series: [{
            field: "close",
            name: "Price"
        }],
        panes: [{
            name: "default",
            title: {
                text: "Stock Price",
                margin: 10
            }
        }]
    });
    </script>

### panes.title.position `String`*(default: "center")*

The position of the title.

#### *"left"*

The pane title is positioned on the left

#### *"right"*

The pane title is positioned on the right

#### *"center"*

The pane title is positioned in the center

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41,
                volume: 2632000
            }, {
                date: new Date(2016, 0, 2),
                close: 42,
                volume: 2631000
            }]
        },
        series: [{
            field: "close",
            name: "Price"
        }],
        panes: [{
            name: "default",
            title: {
                text: "Stock Price",
                position: "left"
            }
        }]
    });
    </script>

### panes.title.text `String`

The text of the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41,
                volume: 2632000
            }, {
                date: new Date(2016, 0, 2),
                close: 42,
                volume: 2631000
            }]
        },
        series: [{
            field: "close",
            name: "Price"
        }],
        panes: [{
            name: "default",
            title: {
                text: "Stock Performance Chart"
            }
        }]
    });
    </script>

### panes.title.visible `Boolean`*(default: true)*

The visibility of the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41,
                volume: 2632000
            }, {
                date: new Date(2016, 0, 2),
                close: 42,
                volume: 2631000
            }]
        },
        series: [{
            field: "close",
            name: "Price"
        }],
        panes: [{
            name: "default",
            title: {
                text: "Stock Performance Chart",
                visible: false
            }
        }]
    });
    </script>

### pdf `Object`
Configures the export settings for the [exportPDF](/api/javascript/dataviz/ui/stock-chart/methods/exportpdf) method.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2000, 1, 1), open: 10, high: 15, low: 8, close: 12 },
                { date: new Date(2000, 1, 2), open: 12, high: 18, low: 10, close: 16 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }],
        pdf: {
            fileName: "stock-chart.pdf",
            proxyURL: "/save",
            author: "John Doe",
            creator: "Kendo UI",
            title: "Stock Chart Export"
        }
    });
    </script>

### pdf.author `String` *(default: null)*
The author of the PDF document.

#### Example - set the author

    <div id="stock-chart"></div>
    <script>
      $("#stock-chart").kendoStockChart({
          pdf: {
              author: "John Doe"
          },
          series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
              { value: 1, date: new Date(2012, 1, 1) },
              { value: 2, date: new Date(2012, 1, 2) }
            ]
          }]
      });

      var chart = $("#stock-chart").getKendoStockChart();
      chart.saveAsPDF();
    </script>

### pdf.creator `String` *(default: "Kendo UI PDF Generator")*
The creator of the PDF document.

#### Example - set the creator

    <div id="stock-chart"></div>
    <script>
      $("#stock-chart").kendoStockChart({
          pdf: {
              creator: "John Doe"
          },
          series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
              { value: 1, date: new Date(2012, 1, 1) },
              { value: 2, date: new Date(2012, 1, 2) }
            ]
          }]
      });

      var chart = $("#stock-chart").getKendoStockChart();
      chart.saveAsPDF();
    </script>

### pdf.date `Date`
The date when the PDF document is created. Defaults to `new Date()`.

#### Example - set the date

    <div id="stock-chart"></div>
    <script>
      $("#stock-chart").kendoStockChart({
          pdf: {
              date: new Date("2014/10/10")
          },
          series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
              { value: 1, date: new Date(2012, 1, 1) },
              { value: 2, date: new Date(2012, 1, 2) }
            ]
          }]
      });

      var chart = $("#stock-chart").getKendoStockChart();
      chart.saveAsPDF();
    </script>

### pdf.forceProxy `Boolean` *(default: false)*
If set to true, the content will be forwarded to [proxyURL](/api/javascript/dataviz/ui/stock-chart#configuration-pdf.proxyURL) even if the browser supports saving files locally.

#### Example

```pseudo
    <div id="stock-chart"></div>
    <script>
      $("#stock-chart").kendoStockChart({
          pdf: {
              proxyURL: "/save",
              forceProxy: true
          },
          series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
              { value: 1, date: new Date(2012, 1, 1) },
              { value: 2, date: new Date(2012, 1, 2) }
            ]
          }]
      });

      var chart = $("#stock-chart").getKendoStockChart();
      chart.saveAsPDF();
    </script>
```

### pdf.fileName `String` *(default: "Export.pdf")*
Specifies the file name of the exported PDF file.

#### Example - set the default PDF file name

    <div id="stock-chart"></div>
    <script>
      $("#stock-chart").kendoStockChart({
          pdf: {
              fileName: "Products.pdf"
          },
          series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
              { value: 1, date: new Date(2012, 1, 1) },
              { value: 2, date: new Date(2012, 1, 2) }
            ]
          }]
      });

      var chart = $("#stock-chart").getKendoStockChart();
      chart.saveAsPDF();
    </script>

### pdf.keywords `String` *(default: null)*
Specifies the keywords of the exported PDF file.

#### Example - set the keywords

    <div id="stock-chart"></div>
    <script>
      $("#stock-chart").kendoStockChart({
          pdf: {
              keywords: "monthly report"
          },
          series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
              { value: 1, date: new Date(2012, 1, 1) },
              { value: 2, date: new Date(2012, 1, 2) }
            ]
          }]
      });

      var chart = $("#stock-chart").getKendoStockChart();
      chart.saveAsPDF();
    </script>

### pdf.landscape `Boolean` *(default: false)*
Set to `true` to reverse the paper dimensions if needed such that width is the larger edge.

#### Example - enable landscape mode

    <div id="stock-chart"></div>
    <script>
      $("#stock-chart").kendoStockChart({
          pdf: {
              paperSize: "A4",
              landscape: true
          },
          series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
              { value: 1, date: new Date(2012, 1, 1) },
              { value: 2, date: new Date(2012, 1, 2) }
            ]
          }]
      });

      var chart = $("#stock-chart").getKendoStockChart();
      chart.saveAsPDF();
    </script>

### pdf.margin `Object`
Specifies the margins of the page (numbers or strings with units). Supported
units are "mm", "cm", "in" and "pt" (default).

#### Example - set the margins

    <div id="stock-chart" style="width: 600px; height: 400px;"></div>
    <script>
      $("#stock-chart").kendoStockChart({
          pdf: {
              margin: {
                  left: 10,
                  right: "10pt",
                  top: "10mm",
                  bottom: "1in"
              }
          },
          series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
              { value: 1, date: new Date(2012, 1, 1) },
              { value: 2, date: new Date(2012, 1, 2) }
            ]
          }]
      });

      var chart = $("#stock-chart").getKendoStockChart();
      chart.saveAsPDF();
    </script>

### pdf.margin.bottom `Number|String` *(default: 0)*
The bottom margin. Numbers are considered as "pt" units.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        pdf: {
            margin: {
                bottom: 20
            }
        },
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41
            }, {
                date: new Date(2016, 0, 2),
                close: 42
            }]
        },
        series: [{
            field: "close",
            name: "Price"
        }]
    });
    </script>

### pdf.margin.left `Number|String` *(default: 0)*
The left margin. Numbers are considered as "pt" units.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        pdf: {
            margin: {
                left: 15
            }
        },
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41
            }, {
                date: new Date(2016, 0, 2),
                close: 42
            }]
        },
        series: [{
            field: "close",
            name: "Price"
        }]
    });
    </script>

### pdf.margin.right `Number|String` *(default: 0)*
The right margin. Numbers are considered as "pt" units.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        pdf: {
            margin: {
                right: 25
            }
        },
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41
            }, {
                date: new Date(2016, 0, 2),
                close: 42
            }]
        },
        series: [{
            field: "close",
            name: "Price"
        }]
    });
    </script>

### pdf.margin.top `Number|String` *(default: 0)*
The top margin. Numbers are considered as "pt" units.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        pdf: {
            margin: {
                top: 30
            }
        },
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41
            }, {
                date: new Date(2016, 0, 2),
                close: 42
            }]
        },
        series: [{
            field: "close",
            name: "Price"
        }]
    });
    </script>

### pdf.paperSize `String|Array` *(default: "auto")*
Specifies the paper size of the PDF document.
The default "auto" means paper size is determined by content.

> The size of the content in pixels will match the size of the output in points (1 pixel = 1/72 inch).

Supported values:

* A predefined size: "A4", "A3" etc
* An array of two numbers specifying the width and height in points (1pt = 1/72in)
* An array of two strings specifying the width and height in units.
  Supported units are "mm", "cm", "in" and "pt".

#### Example - set custom paper size

    <div id="stock-chart"></div>
    <script>
      $("#stock-chart").kendoStockChart({
          pdf: {
              paperSize: ["20cm", "20cm"]
          },
          series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
              { value: 1, date: new Date(2012, 1, 1) },
              { value: 2, date: new Date(2012, 1, 2) }
            ]
          }]
      });

      var chart = $("#stock-chart").getKendoStockChart();
      chart.saveAsPDF();
    </script>

### pdf.proxyURL `String` *(default: null)*
The URL of the server side proxy which will stream the file to the end user.

A proxy will be used when the browser isn't capable of saving files locally.
Such browsers are IE version 9 and lower and Safari.

The developer is responsible for implementing the server-side proxy.

The proxy will receive a POST request with the following parameters in the request body:

* contentType: The MIME type of the file
* base64: The base-64 encoded file content
* fileName: The file name, as requested by the caller.

The proxy should return the decoded file with set "Content-Disposition" header.

#### Example - set the server proxy URL

    <div id="stock-chart"></div>
    <script>
      $("#stock-chart").kendoStockChart({
          pdf: {
              proxyURL: "/save"
          },
          series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
              { value: 1, date: new Date(2012, 1, 1) },
              { value: 2, date: new Date(2012, 1, 2) }
            ]
          }]
      });

      var chart = $("#stock-chart").getKendoStockChart();
      chart.saveAsPDF();
    </script>

### pdf.proxyTarget `String` *(default: "_self")*

A name or keyword indicating where to display the document returned from the proxy.

If you want to display the document in a new window or iframe,
the proxy should set the "Content-Disposition" header to `inline; filename="<fileName.pdf>"`.

#### Example - open the generated document in a new window

    <div id="stock-chart"></div>
    <script>
      $("#stock-chart").kendoStockChart({
          pdf: {
              forceProxy: true,
              proxyURL: "/save",
              proxyTarget: "_blank"
          },
          series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
              { value: 1, date: new Date(2012, 1, 1) },
              { value: 2, date: new Date(2012, 1, 2) }
            ]
          }]
      });

      var chart = $("#stock-chart").getKendoStockChart();
      chart.saveAsPDF();
    </script>

### pdf.subject `String` *(default: null)*
Sets the subject of the PDF file.

#### Example - set the subject

    <div id="stock-chart"></div>
    <script>
      $("#stock-chart").kendoStockChart({
          pdf: {
              subject: "Products"
          },
          series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
              { value: 1, date: new Date(2012, 1, 1) },
              { value: 2, date: new Date(2012, 1, 2) }
            ]
          }]
      });

      var chart = $("#stock-chart").getKendoStockChart();
      chart.saveAsPDF();
    </script>

### pdf.title `String` *(default: null)*
Sets the title of the PDF file.

#### Example - set the title

    <div id="stock-chart"></div>
    <script>
      $("#stock-chart").kendoStockChart({
          pdf: {
              title: "Products"
          },
          series: [{
            type: "line",
            field: "value",
            categoryField: "date",
            data: [
              { value: 1, date: new Date(2012, 1, 1) },
              { value: 2, date: new Date(2012, 1, 2) }
            ]
          }]
      });

      var chart = $("#stock-chart").getKendoStockChart();
      chart.saveAsPDF();
    </script>

### persistSeriesVisibility `Boolean` *(default: true)*

Specifies if the series visible option should be persisted when changing the dataSource data.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        persistSeriesVisibility: false,
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41
            }, {
                date: new Date(2016, 0, 2),
                close: 42
            }]
        },
        series: [{
            field: "close",
            name: "Price"
        }]
    });
    </script>

### plotArea `Object`

The plot area configuration options. This is the area containing the plotted series.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41
            }, {
                date: new Date(2016, 0, 2),
                close: 42
            }]
        },
        series: [{
            field: "close",
            name: "Price"
        }],
        plotArea: {
            background: "#f5f5f5",
            opacity: 0.8
        }
    });
    </script>

### plotArea.background `String`*(default: "white")*

 The background color of the plot area.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41
            }, {
                date: new Date(2016, 0, 2),
                close: 42
            }]
        },
        series: [{
            field: "close",
            name: "Price"
        }],
        plotArea: {
            background: "#e6f2ff"
        }
    });
    </script>

### plotArea.opacity `Number`*(default: 1)*

The background opacity of the plot area.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41
            }, {
                date: new Date(2016, 0, 2),
                close: 42
            }]
        },
        series: [{
            field: "close",
            name: "Price"
        }],
        plotArea: {
            background: "#e6f2ff",
            opacity: 0.7
        }
    });
    </script>

### plotArea.border `Object`

The border of the plot area.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41
            }, {
                date: new Date(2016, 0, 2),
                close: 42
            }]
        },
        series: [{
            field: "close",
            name: "Price"
        }],
        plotArea: {
            border: {
                color: "blue",
                width: 2,
                dashType: "dash"
            }
        }
    });
    </script>

### plotArea.border.color `String`*(default: "black")*

 The color of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41
            }, {
                date: new Date(2016, 0, 2),
                close: 42
            }]
        },
        series: [{
            field: "close",
            name: "Price"
        }],
        plotArea: {
            border: {
                color: "red"
            }
        }
    });
    </script>

### plotArea.border.dashType `String`*(default: "solid")*

 The dash type of the border.


#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41
            }, {
                date: new Date(2016, 0, 2),
                close: 42
            }]
        },
        series: [{
            field: "close",
            name: "Price"
        }],
        plotArea: {
            border: {
                dashType: "dash"
            }
        }
    });
    </script>

### plotArea.border.width `Number`*(default: 0)*

 The width of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41
            }, {
                date: new Date(2016, 0, 2),
                close: 42
            }]
        },
        series: [{
            field: "close",
            name: "Price"
        }],
        plotArea: {
            border: {
                width: 3
            }
        }
    });
    </script>

### plotArea.margin `Number|Object`*(default: 5)*

 The margin of the plot area.

#### Example

```pseudo
    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and left margin to 1px
    // margin right and bottom are with 5px (by default)
    margin: { top: 1, left: 1 }
```

### renderAs `String`

Sets the preferred rendering engine.
If it is not supported by the browser, the Chart will switch to the first available mode.

The supported values are:

* "svg" - renders the widget as inline SVG document, if available
* "canvas" - renders the widget as a Canvas element, if available.

#### Example - Render as Canvas, if supported

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        renderAs: "canvas",
        series: [{
          type: "line",
          field: "value",
          categoryField: "date",
          data: [
            { value: 1, date: new Date(2012, 1, 1) },
            { value: 2, date: new Date(2012, 1, 2) }
          ]
        }]
    });
    </script>

### series `Array`

Array of series definitions.

The series type is determined by the value of the type field.
If a type value is missing, the type is assumed to be the one specified in seriesDefaults.

Each series type has a different set of options.

> **Info:** Some options accept function as argument. They will be evaluated for each point (supplied as parameter). The theme/seriesDefaults value will be used if no value is returned.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41,
                high: 43,
                low: 39,
                open: 40,
                volume: 2632000
            }, {
                date: new Date(2016, 0, 2),
                close: 42,
                high: 44,
                low: 40,
                open: 41,
                volume: 2631000
            }]
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            name: "Price"
        }, {
            type: "column",
            field: "volume",
            name: "Volume",
        }]
    });
    </script>

### series.type `String`

The type of the series. Available types:

* `area`
* `candlestick`
* `column`
* `exponentialTrendline`
* `line`
* `linearTrendline`
* `logarithmicTrendline`
* `movingAverageTrendline`
* `ohlc`
* `polynomialTrendline`
* `powerTrendline`

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41
            }, {
                date: new Date(2016, 0, 2),
                close: 42
            }]
        },
        series: [{
            type: "line",
            field: "close",
            name: "Price"
        }]
    });
    </script>

### series.dashType `String`*(default: "solid")*

The series line dash type.

** Applicable only to line series **

#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41
            }, {
                date: new Date(2016, 0, 2),
                close: 42
            }]
        },
        series: [{
            type: "line",
            field: "close",
            name: "Price",
            dashType: "dash"
        }]
    });
    </script>

### series.data `Array`

Array of data items. The data item type can be either a:

* Array of objects. Each point is bound to the specified series fields.
* Array of numbers. Available for area, column and line series.
* Array of arrays of numbers. Available for:
    * OHLC and candlestick series (open, high, low, close)

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        series: [{
            type: "line",
            data: [
                { date: new Date(2016, 0, 1), close: 41 },
                { date: new Date(2016, 0, 2), close: 42 },
                { date: new Date(2016, 0, 3), close: 43 }
            ],
            field: "close",
            categoryField: "date",
            name: "Price"
        }]
    });
    </script>

### series.highField `String`

The data field containing the high value.

** Available for candlestick and ohlc series only **

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                high: 43,
                low: 39,
                open: 40,
                close: 41
            }, {
                date: new Date(2016, 0, 2),
                high: 44,
                low: 40,
                open: 41,
                close: 42
            }]
        },
        series: [{
            type: "candlestick",
            highField: "high",
            lowField: "low",
            openField: "open",
            closeField: "close",
            name: "Price"
        }]
    });
    </script>

### series.field `String`

The data field containing the series value.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                price: 41
            }, {
                date: new Date(2016, 0, 2),
                price: 42
            }]
        },
        series: [{
            type: "line",
            field: "price",
            name: "Stock Price"
        }]
    });
    </script>

### series.categoryField `String` *(default: "category")*

The data item field which contains the category name or date.

> The points will be rendered in chronological order if the category is a date.

> If specified, the [dateField](/api/javascript/dataviz/ui/stock-chart#configuration-dateField) option is used as a default.

#### Example - set series date category field

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        series: [{
          type: "line",
          field: "value",
          categoryField: "date",
          data: [
            { value: 1, date: new Date(2012, 1, 1) },
            { value: 2, date: new Date(2012, 1, 2) }
          ]
        }]
    });
    </script>

### series.currentField `String`

The data field containing the current value.

** Available for bullet and verticalBullet series. **

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                current: 41,
                target: 45
            }, {
                date: new Date(2016, 0, 2),
                current: 42,
                target: 46
            }]
        },
        series: [{
            type: "bullet",
            currentField: "current",
            targetField: "target",
            name: "Performance"
        }]
    });
    </script>

### series.targetField `String`

The data field containing the target value.

** Available for bullet and verticalBullet series. **

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                current: 41,
                target: 45
            }, {
                date: new Date(2016, 0, 2),
                current: 42,
                target: 46
            }]
        },
        series: [{
            type: "bullet",
            currentField: "current",
            targetField: "target",
            name: "Performance"
        }]
    });
    </script>

### series.for `String`

The name of the parent series of the trendline.

> The `for` option is supported when [series.type](/api/javascript/dataviz/ui/stock-chart#configuration-series.type) is set to
> "`linearTrendline`", "`exponentialTrendline`", "`logarithmicTrendline`", "`powerTrendline`", "`polynomialTrendline`" or "`movingAverageTrendline`".

#### Example - set the trendline parent series for field

	  <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date("2021-01-01"),
                price: 111
            }, {
                date: new Date("2021-04-01"),
                price: 121
            }, {
                date: new Date("2021-07-01"),
                price: 105
            }, {
                date: new Date("2021-10-01"),
                price: 105
            }]
        },
        dateField: "date",
        series: [{
            name: "Price",
            type: "line",
            field: "price"
        }, {
            name: "Trend (LINEAR)",
            type: "linearTrendline",
            for: "Price"
        }],
        legend: {
            visible: true,
            position: 'bottom'
        }
    });
    </script>

### series.trendline `Object`

The trendline configuration options.

> The `trendline` option is supported when [series.type](/api/javascript/dataviz/ui/stock-chart#configuration-series.type) is set to "linearTrendline", "exponentialTrendline", "logarithmicTrendline", "powerTrendline" or "movingAverageTrendline".

#### Example - set the trendline options

	  <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date("2021-01-01"),
                price: 111
            }, {
                date: new Date("2021-04-01"),
                price: 121
            }, {
                date: new Date("2021-07-01"),
                price: 105
            }, {
                date: new Date("2021-10-01"),
                price: 105
            }]
        },
        dateField: "date",
        series: [{
            name: "Price",
            type: "line",
            field: "price"
        }, {
            name: "Average",
            type: "movingAverageTrendline",
            for: "Price",
            trendline: {
              period: 3
            }
        }],
        legend: {
            visible: true,
            position: 'bottom'
        }
    });
    </script>

### series.trendline.forecast `Object`

The trendline forecast settings. By default, the trendline does not display a forecast.

> The `forecast` option is supported when [series.type](/api/javascript/dataviz/ui/stock-chart#configuration-series.type) is set to "linearTrendline", "exponentialTrendline", "logarithmicTrendline" or "powerTrendline" and the parent series are either [Date Series]({% slug dateseries_charts_widget %}), "scatter" or "scatterLine" series.

#### Example - set the trendline forecast

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date("2021-01-01"),
                price: 111
            }, {
                date: new Date("2021-02-01"),
                price: 141
            }, {
                date: new Date("2021-03-01"),
                price: 151
            }, {
                date: new Date("2021-04-01"),
                price: 121
            }, {
                date: new Date("2021-05-01"),
                price: 111
            }, {
                date: new Date("2021-06-01"),
                price: 111
            }, {
                date: new Date("2021-07-01"),
                price: 145
            }, {
                date: new Date("2021-08-01"),
                price: 125
            }, {
                date: new Date("2021-09-01"),
                price: 145
            }, {
                date: new Date("2021-10-01"),
                price: 135
            }, {
                date: new Date("2021-11-01"),
                price: 155
            }, {
                date: new Date("2021-12-01"),
                price: 185
            }]
        },
        dateField: "date",
        series: [{
            name: "Price",
            type: "line",
            field: "price"
        }, {
            name: "Forecast",
            type: "linearTrendline",
            for: "Price",
            trendline: {
                forecast: {
                    before: 3,
                    after: 20
                }
            }
        }],
        legend: {
            visible: true,
            position: 'bottom'
        }
    });
    </script>

### series.trendline.forecast.before `Number` *(default: 0)*

The number of intervals to extend the trendline before the first data point.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41
            }, {
                date: new Date(2016, 0, 2),
                close: 42
            }, {
                date: new Date(2016, 0, 3),
                close: 43
            }]
        },
        series: [{
            type: "line",
            field: "close",
            name: "Price"
        }, {
            type: "linearTrendline",
            for: "Price",
            trendline: {
                forecast: {
                    before: 2
                }
            }
        }]
    });
    </script>

### series.trendline.forecast.after `Number` *(default: 0)*

The number of intervals to extend the trendline after the last data point.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41
            }, {
                date: new Date(2016, 0, 2),
                close: 42
            }, {
                date: new Date(2016, 0, 3),
                close: 43
            }]
        },
        series: [{
            type: "line",
            field: "close",
            name: "Price"
        }, {
            type: "linearTrendline",
            for: "Price",
            trendline: {
                forecast: {
                    after: 3
                }
            }
        }]
    });
    </script>

### series.trendline.order `Number` *(default: 2)*

The order (degree) of the Polynomial trendline. The default value is 2.

Accepted values are from 2 to 6:
* 2: a Quadratic polynomial trendline with a single extreme point (minimum or maximum) point.
* 3: a Cubic polynomial trendline with up to 2 extreme points.
* 4: a polynomial trendline of 4th degree with up to 3 extreme points.
* 5: a polynomial trendline of 5th degree with up to 4 extreme points.
* 6: a polynomial trendline of 6th degree with up to 5 extreme points.

#### Example - set the polynomial trendline order (degree)

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date("2021-01-01"),
                price: 111
            }, {
                date: new Date("2021-02-01"),
                price: 141
            }, {
                date: new Date("2021-03-01"),
                price: 151
            }, {
                date: new Date("2021-04-01"),
                price: 121
            }, {
                date: new Date("2021-05-01"),
                price: 111
            }, {
                date: new Date("2021-06-01"),
                price: 111
            }, {
                date: new Date("2021-07-01"),
                price: 145
            }, {
                date: new Date("2021-08-01"),
                price: 125
            }, {
                date: new Date("2021-09-01"),
                price: 145
            }, {
                date: new Date("2021-10-01"),
                price: 135
            }, {
                date: new Date("2021-11-01"),
                price: 155
            }, {
                date: new Date("2021-12-01"),
                price: 185
            }]
        },
        dateField: "date",
        series: [{
            name: "Price",
            type: "line",
            field: "price"
        }, {
            name: "Trend",
            type: "polynomialTrendline",
            for: "Price",
            trendline: {
                order: 3
            }
        }],
        legend: {
            visible: true,
            position: 'bottom'
        }
    });
    </script>

### series.trendline.period `Number` *(default: 2)*

The number of intervals to take when calculating averages. The value should be an integer greater than 2.

> The period setting is supported only when [series.type](/api/javascript/dataviz/ui/stock-chart#configuration-series.type) is set to "movingAverageTrendline".

#### Example - set the moving average trendline period

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date("2021-01-01"),
                price: 111
            }, {
                date: new Date("2021-02-01"),
                price: 141
            }, {
                date: new Date("2021-03-01"),
                price: 151
            }, {
                date: new Date("2021-04-01"),
                price: 121
            }, {
                date: new Date("2021-05-01"),
                price: 111
            }, {
                date: new Date("2021-06-01"),
                price: 111
            }, {
                date: new Date("2021-07-01"),
                price: 145
            }, {
                date: new Date("2021-08-01"),
                price: 125
            }, {
                date: new Date("2021-09-01"),
                price: 145
            }, {
                date: new Date("2021-10-01"),
                price: 135
            }, {
                date: new Date("2021-11-01"),
                price: 155
            }, {
                date: new Date("2021-12-01"),
                price: 185
            }]
        },
        dateField: "date",
        series: [{
            name: "Price",
            type: "line",
            field: "price"
        }, {
            name: "Average",
            type: "movingAverageTrendline",
            for: "Price",
            trendline: {
                period: 3
            }
        }],
        legend: {
            visible: true,
            position: 'bottom'
        }
    });
    </script>

### series.name `String`

The series name visible in the legend.

#### Example - set the series name

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
      dataSource: {
        data: [
          { value: 1, category: "One", date: new Date(2012, 1, 1)},
          { value: 2, category: "Two", date: new Date(2012, 1, 2)}
        ]
      },
      dateField: "date",
      series: [
        {
          field: "value",
          name: "Value"
        }
      ],
      legend: {
        visible: true,
        position: "bottom"
      }
    });
    </script>

The name can also be a [template](/api/framework/kendo#methods-template) which sets the name of the series when bound to grouped data source.

The fields which can be used in the template are:

*   series - the series options
*   group - the data group
*   group.field - the name of the field used for grouping
*   group.value - the field value for this group.

#### Example - set the chart series group name template

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
      dataSource: {
        data: [
          { value: 1, category: "One", date: new Date(2012, 1, 1)},
          { value: 2, category: "Two", date: new Date(2012, 1, 2)}
        ],
        group: { field: "category" }
      },
      dateField: "date",
      series: [
        {
          field: "value",
          name: "Category: #: group.value #"
        }
      ],
      legend: {
        visible: true,
        position: "bottom"
      }
    });
    </script>

### series.highlight `Object`

Configures the appearance of highlighted points.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date(2016, 0, 1),
                close: 41
            }, {
                date: new Date(2016, 0, 2),
                close: 42
            }]
        },
        series: [{
            type: "line",
            field: "close",
            name: "Price",
            highlight: {
                visible: true,
                color: "red",
                opacity: 0.8
            }
        }]
    });
    </script>

### series.highlight.visible `Boolean`*(default: true)*

A value indicating if the series points should be highlighted.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2000, 1, 1), open: 10, high: 15, low: 8, close: 12 },
                { date: new Date(2000, 1, 2), open: 12, high: 18, low: 10, close: 16 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            highlight: {
                visible: true
            }
        }]
    });
    </script>

### series.highlight.border `Object`

The border of highlighted points. The color is computed automatically from the base point color.

** Applicable to bubble, pie, candlestick and ohlc series. **

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2000, 1, 1), open: 10, high: 15, low: 8, close: 12 },
                { date: new Date(2000, 1, 2), open: 12, high: 18, low: 10, close: 16 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            highlight: {
                border: {
                    width: 2,
                    color: "red",
                    opacity: 0.5
                }
            }
        }]
    });
    </script>

### series.highlight.border.width `Number`

The width of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2000, 1, 1), open: 10, high: 15, low: 8, close: 12 },
                { date: new Date(2000, 1, 2), open: 12, high: 18, low: 10, close: 16 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            highlight: {
                border: {
                    width: 3
                }
            }
        }]
    });
    </script>

### series.highlight.border.color `String`

The border color.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2000, 1, 1), open: 10, high: 15, low: 8, close: 12 },
                { date: new Date(2000, 1, 2), open: 12, high: 18, low: 10, close: 16 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            highlight: {
                border: {
                    color: "red"
                }
            }
        }]
    });
    </script>

### series.highlight.border.opacity `Number`

The border opacity.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2000, 1, 1), open: 10, high: 15, low: 8, close: 12 },
                { date: new Date(2000, 1, 2), open: 12, high: 18, low: 10, close: 16 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            highlight: {
                border: {
                    opacity: 0.5
                }
            }
        }]
    });
    </script>

### series.highlight.color `String`

The highlight color.

** Available only for pie series **

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2000, 1, 1), open: 10, high: 15, low: 8, close: 12 },
                { date: new Date(2000, 1, 2), open: 12, high: 18, low: 10, close: 16 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            highlight: {
                color: "yellow"
            }
        }]
    });
    </script>

### series.highlight.line `Object`

Line options for highlighted points. The color is computed automatically from the base point color.

** Available only for candlestick series **

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2000, 1, 1), open: 10, high: 15, low: 8, close: 12 },
                { date: new Date(2000, 1, 2), open: 12, high: 18, low: 10, close: 16 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            highlight: {
                line: {
                    width: 2,
                    color: "red",
                    opacity: 0.8
                }
            }
        }]
    });
    </script>

### series.highlight.line.width `Number`

The width of the line.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2000, 1, 1), open: 10, high: 15, low: 8, close: 12 },
                { date: new Date(2000, 1, 2), open: 12, high: 18, low: 10, close: 16 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            highlight: {
                line: {
                    width: 3
                }
            }
        }]
    });
    </script>

### series.highlight.line.color `String`

The line color.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2000, 1, 1), open: 10, high: 15, low: 8, close: 12 },
                { date: new Date(2000, 1, 2), open: 12, high: 18, low: 10, close: 16 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            highlight: {
                line: {
                    color: "blue"
                }
            }
        }]
    });
    </script>

### series.highlight.line.opacity `Number`

The opacity of the line.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2000, 1, 1), open: 10, high: 15, low: 8, close: 12 },
                { date: new Date(2000, 1, 2), open: 12, high: 18, low: 10, close: 16 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            highlight: {
                line: {
                    opacity: 0.6
                }
            }
        }]
    });
    </script>

### series.highlight.opacity `Number`

The opacity of the highlighted points.

** Applicable to bubble, pie, candlestick and ohlc series. **

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2000, 1, 1), open: 10, high: 15, low: 8, close: 12 },
                { date: new Date(2000, 1, 2), open: 12, high: 18, low: 10, close: 16 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            highlight: {
                opacity: 0.7
            }
        }]
    });
    </script>

### series.aggregate `String|Function` *(default: "max")*

The aggregate function to apply for date series.

This function is used when a category (an year, month, etc.) contains two or more points.
The function return value is displayed instead of the individual points.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2000, 1, 1), open: 10, high: 15, low: 8, close: 12 },
                { date: new Date(2000, 1, 2), open: 12, high: 18, low: 10, close: 16 },
                { date: new Date(2000, 1, 3), open: 16, high: 20, low: 14, close: 18 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            aggregate: "max"
        }]
    });
    </script>

The supported values are:

* "avg" - the average of all values for the date period.
* "count" - the number of values for the date period.
* "max" - the highest value for the date period.
* "min" - the lowest value for the date period.
* "sum" - the sum of all values for the date period. Defaults to 0 if no data points are defined.
* "sumOrNull" - the sum of all values for the date period. Defaults to `null` if no data points are defined.
* "first" - the first value
* function(values, series, dataItems, category) - user-defined aggregate function. Returns single value or data item.
* object  - (compound aggregate) **Applicable to "candlestick" and ohlc "series"**. Specifies the aggregate for each data item field.

##### Example

```pseudo
    aggregate: {
        open: "max",
        high: "max",
        close: "min",
        low: "max"
    }
```

### series.axis `String`*(default: "primary")*

The name of the value axis to use.

** Applicable to area, column, line, ohlc and candlestick series **

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2000, 1, 1), open: 10, high: 15, low: 8, close: 12 },
                { date: new Date(2000, 1, 2), open: 12, high: 18, low: 10, close: 16 }
            ]
        },
        dateField: "date",
        valueAxis: [
            { name: "primary" },
            { name: "secondary" }
        ],
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            axis: "primary"
        }]
    });
    </script>

### series.border `Object`

The border of the points.

** Applicable to column, ohlc and candlestick series **

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2000, 1, 1), open: 10, high: 15, low: 8, close: 12 },
                { date: new Date(2000, 1, 2), open: 12, high: 18, low: 10, close: 16 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            border: {
                color: "red",
                width: 2,
                dashType: "solid"
            }
        }]
    });
    </script>

### series.border.color `String|Function`

The color of the border.  It defaults to the color of the current series.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2000, 1, 1), open: 10, high: 15, low: 8, close: 12 },
                { date: new Date(2000, 1, 2), open: 12, high: 18, low: 10, close: 16 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            border: {
                color: "blue"
            }
        }]
    });
    </script>

### series.border.dashType `String|Function`*(default: "solid")*

The dash type of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2000, 1, 1), open: 10, high: 15, low: 8, close: 12 },
                { date: new Date(2000, 1, 2), open: 12, high: 18, low: 10, close: 16 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            border: {
                dashType: "dash"
            }
        }]
    });
    </script>

#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### series.border.opacity `Number|Function`

The border opacity.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2000, 1, 1), open: 10, high: 15, low: 8, close: 12 },
                { date: new Date(2000, 1, 2), open: 12, high: 18, low: 10, close: 16 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            border: {
                opacity: 0.7
            }
        }]
    });
    </script>

### series.border.width `Number|Function`*(default: 1)*

The width of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2000, 1, 1), open: 10, high: 15, low: 8, close: 12 },
                { date: new Date(2000, 1, 2), open: 12, high: 18, low: 10, close: 16 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            border: {
                width: 3
            }
        }]
    });
    </script>

### series.closeField `String`

The data field containing the close value.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2000, 1, 1), open: 10, high: 15, low: 8, close: 12 },
                { date: new Date(2000, 1, 2), open: 12, high: 18, low: 10, close: 16 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

** Available for candlestick and ohlc series only **

### series.color `String|Function`

The series base color. The supported values are:

* CSS color string, including hex and rgb
* function(point) - user-defined function that will be evaluated for each point. Returning `undefined` will assume the default series color.

#### Example - set color as a string

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date("2012-03-01 00:00"),
                price: 111
            }, {
                date: new Date("2012-03-02 00:00"),
                price: 121
            }, {
                date: new Date("2012-03-05 00:00"),
                price: 105
            }]
        },
        dateField: "date",
        series: [{
            type: "column",
            field: "price",
            color: "#ff0000"
        }]
    });
    </script>

#### Example set color as a function

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [{
                date: new Date("2012-03-01 00:00"),
                price: 111
            }, {
                date: new Date("2012-03-02 00:00"),
                price: 121
            }, {
                date: new Date("2012-03-05 00:00"),
                price: 95
            }]
        },
        dateField: "date",
        series: [{
            type: "column",
            field: "price",
            color: function(point) {
                if (point.value < 100) {
                    // Colorize matching points
                    return "#f00";
                }

                // Use default theme color
            }
        }]
    });
    </script>

### series.colorField `String`

The data field containing the point color.

** Applicable for column, candlestick and ohlc series. **

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
            series: [
              {
                type: "candlestick",
                colorField: "color",
                labels: {
                  visible: true,
                  format: "{0}",
                },
                data: [
                  {
                    date: new Date(2024, 0, 1),
                    open: 150.25,
                    high: 152.8,
                    low: 149.5,
                    close: 152.3,
                    color: "#f44336",
                  },
                  {
                    date: new Date(2024, 0, 2),
                    open: 152.5,
                    high: 154.2,
                    low: 151.8,
                    close: 153.75,
                    color: "#4caf50",
                  },
                  {
                    date: new Date(2024, 0, 3),
                    open: 153.8,
                    high: 155.4,
                    low: 152.9,
                    close: 154.2,
                    color: "#2196f3",
                  },
                  
                ],
                openField: "open",
                highField: "high",
                lowField: "low",
                closeField: "close",
                dateField: "date",
                name: "Stock Price",
                color: "#03a9f4",
                downColor: "#f44336",
              },
            ],
            navigator: {
              series: {
                type: "line",
                data: [
                  {
                    date: new Date(2024, 0, 1),
                    open: 150.25,
                    high: 152.8,
                    low: 149.5,
                    close: 152.3,
                  },
                  {
                    date: new Date(2024, 0, 2),
                    open: 152.5,
                    high: 154.2,
                    low: 151.8,
                    close: 153.75,
                  },
                  {
                    date: new Date(2024, 0, 3),
                    open: 153.8,
                    high: 155.4,
                    low: 152.9,
                    close: 154.2,
                  },
                  
                ],
                field: "close",
                dateField: "date",
                color: "#ff9800",
              },
            },
          });
    </script>

### series.downColor `String|Function`

The series color when the open value is greater than the close value.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2000, 1, 1), open: 10, high: 15, low: 8, close: 12 },
                { date: new Date(2000, 1, 2), open: 18, high: 20, low: 16, close: 16 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            downColor: "red"
        }]
    });
    </script>

** Available for candlestick series only **

### series.downColorField `String`

The data field containing the color applied when the open value is greater than the close value.

** Available for candlestick series only **

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2000, 1, 1), open: 10, high: 15, low: 8, close: 12, downColor: "red" },
                { date: new Date(2000, 1, 2), open: 18, high: 20, low: 16, close: 16, downColor: "blue" }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            downColorField: "downColor"
        }]
    });
    </script>

### series.gap `Number`*(default: 1.5)*

The distance between category clusters.

** Applicable for column, candlestick and ohlc series. **

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2000, 1, 1), open: 10, high: 15, low: 8, close: 12 },
                { date: new Date(2000, 1, 2), open: 12, high: 18, low: 10, close: 16 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            gap: 2
        }]
    });
    </script>

### series.labels `Object`

Configures the series data labels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2000, 1, 1), open: 10, high: 15, low: 8, close: 12 },
                { date: new Date(2000, 1, 2), open: 12, high: 18, low: 10, close: 16 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            labels: {
                visible: true,
                background: "yellow",
                color: "black"
            }
        }]
    });
    </script>

#### *"circle"*

The labels are positioned in circle around the chart.

#### *"column"*

The labels are positioned in columns to the left and right of the chart.

### series.labels.background `String|Function`

The background color of the labels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2000, 1, 1), open: 10, high: 15, low: 8, close: 12 },
                { date: new Date(2000, 1, 2), open: 12, high: 18, low: 10, close: 16 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            labels: {
                visible: true,
                background: "lightblue"
            }
        }]
    });
    </script>

### series.labels.border `Object`

The border of the labels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2000, 1, 1), open: 10, high: 15, low: 8, close: 12 },
                { date: new Date(2000, 1, 2), open: 12, high: 18, low: 10, close: 16 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            labels: {
                visible: true,
                border: {
                    color: "red",
                    width: 1
                }
            }
        }]
    });
    </script>

### series.labels.border.color `String|Function`*(default: "black")*

 The color of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2000, 1, 1), open: 10, high: 15, low: 8, close: 12 },
                { date: new Date(2000, 1, 2), open: 12, high: 18, low: 10, close: 16 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            labels: {
                visible: true,
                border: {
                    color: "blue"
                }
            }
        }]
    });
    </script>

### series.labels.border.dashType `String|Function`*(default: "solid")*

 The dash type of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2000, 1, 1), open: 10, high: 15, low: 8, close: 12 },
                { date: new Date(2000, 1, 2), open: 12, high: 18, low: 10, close: 16 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            labels: {
                visible: true,
                border: {
                    dashType: "dash"
                }
            }
        }]
    });
    </script>

#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### series.labels.border.width `Number|Function`*(default: 0)*

 The width of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2000, 1, 1), open: 10, high: 15, low: 8, close: 12 },
                { date: new Date(2000, 1, 2), open: 12, high: 18, low: 10, close: 16 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            labels: {
                visible: true,
                border: {
                    width: 2
                }
            }
        }]
    });
    </script>

### series.labels.color `String|Function`

The text color of the labels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2000, 1, 1), open: 10, high: 15, low: 8, close: 12 },
                { date: new Date(2000, 1, 2), open: 12, high: 18, low: 10, close: 16 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            labels: {
                visible: true,
                color: "red"
            }
        }]
    });
    </script>

### series.labels.font `String|Function`*(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2000, 1, 1), open: 10, high: 15, low: 8, close: 12 },
                { date: new Date(2000, 1, 2), open: 12, high: 18, low: 10, close: 16 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            labels: {
                visible: true,
                font: "16px Arial"
            }
        }]
    });
    </script>

### series.labels.format `String|Function`

The format of the labels.

#### Example

```pseudo
    //sets format of the labels
    format: "C"
```

### series.labels.margin `Number|Object`*(default: { left: 5, right: 5})*

The margin of the labels.

#### Example

```pseudo
    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and bottom margin to 1px
    // margin left and right are with 5px (by default)
    margin: { top: 1, bottom: 1 }
```

### series.labels.padding `Number|Object`*(default: 0)*

 The padding of the labels.

#### Example

```pseudo
    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // padding right and bottom are with 0px (by default)
    padding: { top: 1, left: 1 }
```

### series.labels.position `String|Function`*(default: "above")*

Defines the position of the labels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2000, 1, 1), open: 10, high: 15, low: 8, close: 12 },
                { date: new Date(2000, 1, 2), open: 12, high: 18, low: 10, close: 16 }
            ]
        },
        dateField: "date",
        series: [{
            type: "line",
            field: "close",
            labels: {
                visible: true,
                position: "above"
            }
        }]
    });
    </script>

#### *"above"*

The label is positioned at the top of the marker.

** Applicable for area and line series. **

#### *"center"*

The label is positioned at the point center.

** Applicable for column series only. **

#### *"insideEnd"*

The label is positioned inside, near the end of the point.

** Applicable for column series only. **

#### *"insideBase"*

The label is positioned inside, near the base of the bar.

** Applicable for column series. **

#### *"outsideEnd"*

The label is positioned outside, near the end of the bar.

** Applicable for column series only. Not applicable for stacked series. **

#### *"right"*

The label is positioned to the right of the marker.

** Applicable for area and line series. **

#### *"below"*

The label is positioned at the bottom of the marker.

** Applicable for area and line series. **

#### *"left"*

The label is positioned to the left of the marker.

** Applicable for area and line series. **

### series.labels.template `String | Function`

The [template](/api/framework/kendo#methods-template) which renders the chart series label.

The fields which can be used in the template are:

*   category - the category name. Available for area, bar, column, bubble, donut, line and pie series.
*   dataItem - the original data item used to construct the point. Will be null if binding to array.
*   percentage - the point value represented as a percentage value. Available only for 100% stacked charts.
*   series - the data series
*   value - the point value. Can be a number or object containing each bound field.

#### Example

```pseudo
    // chart initialization
    $("#chart").kendoChart({
         title: {
             text: "My Chart Title"
         },
         series: [
             {
                 type: "area",
                 name: "Series 1",
                 data: [200, 450, 300, 125],
                 labels: {
                     // label template
                     template: "#= value #%",
                     visible: true
                 }
             }
         ],
         categoryAxis: {
             categories: [2000, 2001, 2002, 2003]
         }
    });
```

### series.labels.visible `Boolean|Function`*(default: false)*

 The visibility of the labels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2000, 1, 1), open: 10, high: 15, low: 8, close: 12 },
                { date: new Date(2000, 1, 2), open: 12, high: 18, low: 10, close: 16 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            labels: {
                visible: true
            }
        }]
    });
    </script>

### series.legendItem `Object`

The configuration of the Chart legend item for this series.

#### Example - override the legend item type for the series

    <div id="chart"></div>
    <script>
    $("#chart").kendoStockChart({
      dataSource: {
        data: [{
          "Date": "2016/01/01",
          "Open": 41.62,
          "High": 41.69,
          "Low": 39.81,
          "Close": 40.12,
          "Volume": 2632000
        }, {
          "Date": "2016/03/01",
          "Open": 40.62,
          "High": 39.69,
          "Low": 40.81,
          "Close": 39.12,
          "Volume": 2631986
        }]
      },
      dateField: "Date",
      series: [{
        name: "Series 1",
        type: "candlestick",
        openField: "Open",
        highField: "High",
        lowField: "Low",
        closeField: "Close",
        legendItem: {
          type: "line"
        }
      }],
      legend: {
        visible: true,
        position: 'bottom'
      }
    });
    </script>

### series.legendItem.area `Object`

Sets the configuration of the legend items of type `area`.
By default, all series except line and scatter use this legend type.

#### Example - sets the opacity of `area` legend items

    <div id="chart"></div>
    <script>
    $("#chart").kendoStockChart({
      dataSource: {
        data: [{
          "Date": "2016/01/01",
          "Open": 41.62,
          "High": 41.69,
          "Low": 39.81,
          "Close": 40.12,
          "Volume": 2632000
        }, {
          "Date": "2016/03/01",
          "Open": 40.62,
          "High": 39.69,
          "Low": 40.81,
          "Close": 39.12,
          "Volume": 2631986
        }]
      },
      dateField: "Date",
      series: [{
        name: "Series 1",
        type: "candlestick",
        openField: "Open",
        highField: "High",
        lowField: "Low",
        closeField: "Close",
        legendItem: {
          area: {
            opacity: 0.1,
          }
        }
      }],
      legend: {
        visible: true,
        position: 'bottom'
      }
    });
    </script>

### series.legendItem.area.background `String`

The background color of the legend item. Accepts a valid CSS color string, including HEX and RGB.
Defaults to the series color.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2000, 1, 1), open: 10, high: 15, low: 8, close: 12 },
                { date: new Date(2000, 1, 2), open: 12, high: 18, low: 10, close: 16 }
            ]
        },
        dateField: "date",
        series: [{
            type: "area",
            field: "close",
            legendItem: {
                area: {
                    background: "lightblue"
                }
            }
        }]
    });
    </script>

### series.legendItem.area.opacity `Number`

The opacity of the legend item.
Defaults to the series opacity.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2000, 1, 1), open: 10, high: 15, low: 8, close: 12 },
                { date: new Date(2000, 1, 2), open: 12, high: 18, low: 10, close: 16 }
            ]
        },
        dateField: "date",
        series: [{
            type: "area",
            field: "close",
            legendItem: {
                area: {
                    opacity: 0.7
                }
            }
        }]
    });
    </script>

### series.legendItem.cursor `String`
The [cursor style](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor) of the legend item.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2000, 1, 1), open: 10, high: 15, low: 8, close: 12 },
                { date: new Date(2000, 1, 2), open: 12, high: 18, low: 10, close: 16 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            legendItem: {
                cursor: "pointer"
            }
        }]
    });
    </script>

### series.legendItem.highlight `Object`

The highlight configuration of the legend item.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2000, 1, 1), open: 10, high: 15, low: 8, close: 12 },
                { date: new Date(2000, 1, 2), open: 12, high: 18, low: 10, close: 16 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            legendItem: {
                highlight: {
                    visible: true,
                    markers: {
                        background: "yellow"
                    }
                }
            }
        }]
    });
    </script>

### series.legendItem.highlight.markers `Object`

The `markers` configuration of the legend item when it is hovered.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2000, 1, 1), open: 10, high: 15, low: 8, close: 12 },
                { date: new Date(2000, 1, 2), open: 12, high: 18, low: 10, close: 16 }
            ]
        },
        dateField: "date",
        series: [{
            type: "line",
            field: "close",
            legendItem: {
                highlight: {
                    markers: {
                        background: "red",
                        border: {
                            color: "blue",
                            width: 2
                        }
                    }
                }
            }
        }]
    });
    </script>

### series.legendItem.highlight.markers.background `String|Function`

The background color of the highlighted legend item markers.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2000, 1, 1), open: 10, high: 15, low: 8, close: 12 },
                { date: new Date(2000, 1, 2), open: 12, high: 18, low: 10, close: 16 }
            ]
        },
        dateField: "date",
        series: [{
            type: "line",
            field: "close",
            legendItem: {
                highlight: {
                    markers: {
                        background: "orange"
                    }
                }
            }
        }]
    });
    </script>

### series.legendItem.highlight.markers.border `Object|Function`

The border of the highlighted markers.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2000, 1, 1), open: 10, high: 15, low: 8, close: 12 },
                { date: new Date(2000, 1, 2), open: 12, high: 18, low: 10, close: 16 }
            ]
        },
        dateField: "date",
        series: [{
            type: "line",
            field: "close",
            legendItem: {
                highlight: {
                    markers: {
                        border: {
                            color: "red",
                            width: 2,
                            dashType: "solid"
                        }
                    }
                }
            }
        }]
    });
    </script>

### series.legendItem.highlight.markers.border.color `String|Function`

The configuration of the Chart legend highlighted item markers border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2000, 1, 1), open: 10, high: 15, low: 8, close: 12 },
                { date: new Date(2000, 1, 2), open: 12, high: 18, low: 10, close: 16 }
            ]
        },
        dateField: "date",
        series: [{
            type: "line",
            field: "close",
            legendItem: {
                highlight: {
                    markers: {
                        border: {
                            color: "green"
                        }
                    }
                }
            }
        }]
    });
    </script>

### series.legendItem.highlight.markers.border.dashType `String`

The dash type of the highlighted legend item border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2000, 1, 1), open: 10, high: 15, low: 8, close: 12 },
                { date: new Date(2000, 1, 2), open: 12, high: 18, low: 10, close: 16 }
            ]
        },
        dateField: "date",
        series: [{
            type: "line",
            field: "close",
            legendItem: {
                highlight: {
                    markers: {
                        border: {
                            dashType: "dash"
                        }
                    }
                }
            }
        }]
    });
    </script>

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

### series.legendItem.highlight.markers.borderRadius `Number`

The border radius in pixels when `type` is set to `"roundedRect"`.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 1, 1), open: 100, high: 110, low: 90, close: 105 },
                { date: new Date(2023, 1, 2), open: 105, high: 115, low: 95, close: 110 }
            ]
        },
        categoryField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            legendItem: {
                highlight: {
                    markers: {
                        type: "roundedRect",
                        borderRadius: 8
                    }
                }
            }
        }]
    });
    </script>

### series.legendItem.highlight.markers.type `String|Function`

The highlighted markers shape.

The supported values are:
* "circle" - the marker shape is circle.
* "square" - the marker shape is square.
* "triangle" - the marker shape is triangle.
* "cross" - the marker shape is cross.
* "rect" - alias for "square".
* "roundedRect" - the marker shape is a rounded rectangle.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 1, 1), open: 100, high: 110, low: 90, close: 105 },
                { date: new Date(2023, 1, 2), open: 105, high: 115, low: 95, close: 110 }
            ]
        },
        categoryField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            legendItem: {
                highlight: {
                    markers: {
                        type: "triangle"
                    }
                }
            }
        }]
    });
    </script>

### series.legendItem.highlight.markers.visible `Boolean|Function`

If set to `true` the chart will display the legend item markers. Defaults to the series options.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 1, 1), open: 100, high: 110, low: 90, close: 105 },
                { date: new Date(2023, 1, 2), open: 105, high: 115, low: 95, close: 110 }
            ]
        },
        categoryField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            legendItem: {
                highlight: {
                    markers: {
                        visible: false
                    }
                }
            }
        }]
    });
    </script>

### series.legendItem.highlight.markers.visual `Function`

A function that can be used to create a custom visual for the highlighted markers. The available argument fields are:

* rect - the `kendo.geometry.Rect` that defines where the visual should be rendered.
* options - the marker options.
* createVisual - a function that can be used to get the default visual.
* category - the category of the marker point.
* dataItem - the dataItem of the marker point.
* value - the value of the marker point.
* sender - the chart instance.
* series - the series of the marker point.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 1, 1), open: 100, high: 110, low: 90, close: 105 },
                { date: new Date(2023, 1, 2), open: 105, high: 115, low: 95, close: 110 }
            ]
        },
        categoryField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            legendItem: {
                highlight: {
                    markers: {
                        visual: (e) => {
                            var rect = new kendo.geometry.Rect([0, 0], [10, 10]);
                            var path = new kendo.drawing.Path({
                                fill: { color: "#ff6800" },
                                stroke: { color: "#000", width: 1 }
                            });
                            path.moveTo(5, 0).lineTo(10, 10).lineTo(0, 10).close();
                            return path;
                        }
                    }
                }
            }
        }]
    });
    </script>

### series.legendItem.highlight.visible `Boolean` *(default: true)*

If set to `false`, the hover effect of the legend item is disabled.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 1, 1), open: 100, high: 110, low: 90, close: 105 },
                { date: new Date(2023, 1, 2), open: 105, high: 115, low: 95, close: 110 }
            ]
        },
        categoryField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            legendItem: {
                highlight: {
                    visible: false
                }
            }
        }]
    });
    </script>

### series.legendItem.line `Object`

Sets the configuration of the legend items of type `line`.
This is the default legend item type for all line and scatter series.

#### Example - override the color of `line` legend items

    <div id="chart"></div>
    <script>
    $("#chart").kendoStockChart({
      dataSource: {
        data: [{
          "Date": "2016/01/01",
          "Open": 41.62,
          "High": 41.69,
          "Low": 39.81,
          "Close": 40.12,
          "Volume": 2632000
        }, {
          "Date": "2016/03/01",
          "Open": 40.62,
          "High": 39.69,
          "Low": 40.81,
          "Close": 39.12,
          "Volume": 2631986
        }]
      },
      dateField: "Date",
      series: [{
        name: "Series 1",
        type: "line",
        field: "Close",
        legendItem: {
          line: {
            color: "#777",
          }
        }
      }],
      legend: {
        visible: true,
        position: 'bottom'
      }
    });
    </script>

### series.legendItem.line.color `String`

The color of the legend item of type `line`. Accepts a valid CSS color string, including HEX and RGB.
Defaults to the series color.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 1, 1), value: 100 },
                { date: new Date(2023, 1, 2), value: 105 },
                { date: new Date(2023, 1, 3), value: 98 }
            ]
        },
        categoryField: "date",
        series: [{
            type: "line",
            field: "value",
            legendItem: {
                line: {
                    color: "#ff6800"
                }
            }
        }]
    });
    </script>

### series.legendItem.line.dashType `String`

The dash type of the legend item of type `line`.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 1, 1), value: 100 },
                { date: new Date(2023, 1, 2), value: 105 },
                { date: new Date(2023, 1, 3), value: 98 }
            ]
        },
        categoryField: "date",
        series: [{
            type: "line",
            field: "value",
            legendItem: {
                line: {
                    dashType: "dash"
                }
            }
        }]
    });
    </script>

### series.legendItem.line.opacity `Number`

The opacity of the legend item of type `line`.
Defaults to the series opacity.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 1, 1), value: 100 },
                { date: new Date(2023, 1, 2), value: 105 },
                { date: new Date(2023, 1, 3), value: 98 }
            ]
        },
        categoryField: "date",
        series: [{
            type: "line",
            field: "value",
            legendItem: {
                line: {
                    opacity: 0.5
                }
            }
        }]
    });
    </script>

### series.legendItem.markers `Object`

The configuration of the Chart legend item markers.

By default, the marker configuration will be the same as the [series.markers](/api/javascript/dataviz/ui/stock-chart#configuration-series.markers) settings of the displayed series.

#### Example - override marker settings for the legend

    <div id="chart"></div>
    <script>
    $("#chart").kendoStockChart({
      dataSource: {
        data: [{
          "Date": "2016/01/01",
          "Open": 41.62,
          "High": 41.69,
          "Low": 39.81,
          "Close": 40.12,
          "Volume": 2632000
        }, {
          "Date": "2016/03/01",
          "Open": 40.62,
          "High": 39.69,
          "Low": 40.81,
          "Close": 39.12,
          "Volume": 2631986
        }]
      },
      dateField: "Date",
      series: [{
        name: "Series 1",
        type: "line",
        field: "Close",
        markers: {
          visible: true
        },
        legendItem: {
          markers: {
            visible: false
          }
        }
      }],
      legend: {
        visible: true,
        position: 'bottom'
      }
    });
    </script>

### series.legendItem.markers.background `String|Function`

The background color of the legend item markers.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 1, 1), value: 100 },
                { date: new Date(2023, 1, 2), value: 105 },
                { date: new Date(2023, 1, 3), value: 98 }
            ]
        },
        categoryField: "date",
        series: [{
            type: "line",
            field: "value",
            markers: { visible: true },
            legendItem: {
                markers: {
                    background: "#ff6800"
                }
            }
        }]
    });
    </script>

### series.legendItem.markers.border `Object|Function`

The border of the markers.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 1, 1), value: 100 },
                { date: new Date(2023, 1, 2), value: 105 },
                { date: new Date(2023, 1, 3), value: 98 }
            ]
        },
        categoryField: "date",
        series: [{
            type: "line",
            field: "value",
            markers: { visible: true },
            legendItem: {
                markers: {
                    border: {
                        color: "#000",
                        width: 2
                    }
                }
            }
        }]
    });
    </script>

### series.legendItem.markers.border.color `String|Function`

The configuration of the Chart legend item markers border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 1, 1), value: 100 },
                { date: new Date(2023, 1, 2), value: 105 },
                { date: new Date(2023, 1, 3), value: 98 }
            ]
        },
        categoryField: "date",
        series: [{
            type: "line",
            field: "value",
            markers: { visible: true },
            legendItem: {
                markers: {
                    border: {
                        color: "#ff6800"
                    }
                }
            }
        }]
    });
    </script>

### series.legendItem.markers.border.dashType `String`

The dash type of the legend item border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 1, 1), value: 100 },
                { date: new Date(2023, 1, 2), value: 105 },
                { date: new Date(2023, 1, 3), value: 98 }
            ]
        },
        categoryField: "date",
        series: [{
            type: "line",
            field: "value",
            markers: { visible: true },
            legendItem: {
                markers: {
                    border: {
                        dashType: "dash"
                    }
                }
            }
        }]
    });
    </script>

### series.legendItem.markers.borderRadius `Number`

The border radius in pixels when `type` is set to `"roundedRect"`.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 1, 1), value: 100 },
                { date: new Date(2023, 1, 2), value: 105 },
                { date: new Date(2023, 1, 3), value: 98 }
            ]
        },
        categoryField: "date",
        series: [{
            type: "line",
            field: "value",
            markers: { visible: true },
            legendItem: {
                markers: {
                    type: "roundedRect",
                    borderRadius: 8
                }
            }
        }]
    });
    </script>

### series.legendItem.markers.type `String|Function`

The markers shape.

The supported values are:
* "circle" - the marker shape is circle.
* "square" - the marker shape is square.
* "triangle" - the marker shape is triangle.
* "cross" - the marker shape is cross.
* "rect" - alias for "square".
* "roundedRect" - the marker shape is a rounded rectangle.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 1, 1), value: 100 },
                { date: new Date(2023, 1, 2), value: 105 },
                { date: new Date(2023, 1, 3), value: 98 }
            ]
        },
        categoryField: "date",
        series: [{
            type: "line",
            field: "value",
            markers: { visible: true },
            legendItem: {
                markers: {
                    type: "triangle"
                }
            }
        }]
    });
    </script>

### series.legendItem.markers.visible `Boolean|Function`

If set to `true` the chart will display the legend item markers. Defaults to the series options.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 1, 1), value: 100 },
                { date: new Date(2023, 1, 2), value: 105 },
                { date: new Date(2023, 1, 3), value: 98 }
            ]
        },
        categoryField: "date",
        series: [{
            type: "line",
            field: "value",
            markers: { visible: true },
            legendItem: {
                markers: {
                    visible: false
                }
            }
        }]
    });
    </script>

### series.legendItem.markers.visual `Function`

A function that can be used to create a custom visual for the markers. The available argument fields are:

* rect - the `kendo.geometry.Rect` that defines where the visual should be rendered.
* options - the marker options.
* createVisual - a function that can be used to get the default visual.
* category - the category of the marker point.
* dataItem - the dataItem of the marker point.
* value - the value of the marker point.
* sender - the chart instance.
* series - the series of the marker point.

#### Example - use custom visual for the markers

    <div id="chart"></div>
    <script>
    $("#chart").kendoStockChart({
      dataSource: {
        data: [{
          "Date": "2016/01/01",
          "Open": 41.62,
          "High": 41.69,
          "Low": 39.81,
          "Close": 40.12,
          "Volume": 2632000
        }, {
          "Date": "2016/03/01",
          "Open": 40.62,
          "High": 39.69,
          "Low": 40.81,
          "Close": 39.12,
          "Volume": 2631986
        }]
      },
      dateField: "Date",
      series: [{
        name: "Series 1",
        type: "line",
        field: "Close",
        markers: {
          visible: true
        },
        legendItem: {
          markers: {
            visual: function (e) {
              var origin = e.rect.origin;
              var center = e.rect.center();
              var bottomRight = e.rect.bottomRight();

              var path = new kendo.drawing.Path({
                fill: {
                  color: e.options.border.color
                }
              })
              .moveTo(origin.x, bottomRight.y)
              .lineTo(bottomRight.x, bottomRight.y)
              .lineTo(center.x, origin.y)
              .close();

              return path;
            }
          }
        }
      }],
      legend: {
        visible: true,
        position: 'bottom'
      }
    });
    </script>

### series.legendItem.type `String`

Sets the type of the legend items.
The default value is based on the series type.

The supported values are:

- `"line"`&mdash;the legend items are rendered as a line. This is the default value for line charts.
* `"area"`&mdash;the legend items are rendered as a filled rectangle. This is the default value for area charts.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 1, 1), value: 100 },
                { date: new Date(2023, 1, 2), value: 105 },
                { date: new Date(2023, 1, 3), value: 98 }
            ]
        },
        categoryField: "date",
        series: [{
            type: "line",
            field: "value",
            legendItem: {
                type: "area"
            }
        }]
    });
    </script>

### series.legendItem.visual `Function`

A function that can be used to create a custom visual for the legend items. The available argument fields are:

- `options`&mdash;The item options.
- `createVisual`&mdash;A function for getting the default visual.
- `series`&mdash;The item series.
- `pointIndex`&mdash;The index of the point in the series. Available for the Pie, Donut, and Funnel series.

#### Example - using custom visual for the legend items

    <div id="chart"></div>
    <script>
    $("#chart").kendoStockChart({
      dataSource: {
        data: [{
          "Date": "2016/01/01",
          "Open": 41.62,
          "High": 41.69,
          "Low": 39.81,
          "Close": 40.12,
          "Volume": 2632000
        }, {
          "Date": "2016/03/01",
          "Open": 40.62,
          "High": 39.69,
          "Low": 40.81,
          "Close": 39.12,
          "Volume": 2631986
        }]
      },
      dateField: "Date",
      series: [{
        name: "Series 1",
        type: "line",
        field: "Close",
        markers: {
          visible: true
        },
        legendItem: {
          visual: function (e) {
            var color = e.options.markers.background;
            var labelColor = e.options.labels.color;
            var rect = new kendo.geometry.Rect([0, 0], [100, 50]);
            var layout = new kendo.drawing.Layout(rect, {
              spacing: 5,
              alignItems: "center"
            });

            var marker = new kendo.drawing.Path({
              fill: {
                color: color
              }
            }).moveTo(10, 0).lineTo(15, 10).lineTo(5, 10).close();

            var label = new kendo.drawing.Text(e.series.name, [0, 0], {
              fill: {
                color: labelColor
              }
            });

            layout.append(marker, label);
            layout.reflow()

            return layout;
          }
        }
      }],
      legend: {
        visible: true,
        position: 'bottom'
      }
    });
    </script>

### series.line `String | Object`

Line options.

** Applicable to area, candlestick and ohlc series. **

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 1, 1), open: 100, high: 110, low: 90, close: 105 },
                { date: new Date(2023, 1, 2), open: 105, high: 115, low: 95, close: 110 }
            ]
        },
        categoryField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            line: {
                color: "#ff6800",
                width: 2
            }
        }]
    });
    </script>

### series.line.color `String`

The line color.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 1, 1), open: 100, high: 110, low: 90, close: 105 },
                { date: new Date(2023, 1, 2), open: 105, high: 115, low: 95, close: 110 }
            ]
        },
        categoryField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            line: {
                color: "#ff6800"
            }
        }]
    });
    </script>

### series.line.opacity `Number`*(default: 1)*

The line opacity.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 1, 1), open: 100, high: 110, low: 90, close: 105 },
                { date: new Date(2023, 1, 2), open: 105, high: 115, low: 95, close: 110 }
            ]
        },
        categoryField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            line: {
                opacity: 0.7
            }
        }]
    });
    </script>

### series.line.width `String`*(default: 4)*

The line width.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 1, 1), open: 100, high: 110, low: 90, close: 105 },
                { date: new Date(2023, 1, 2), open: 105, high: 115, low: 95, close: 110 }
            ]
        },
        categoryField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            line: {
                width: 3
            }
        }]
    });
    </script>

### series.line.style `String` *(default: "normal")*

The supported values are:

* "normal" - The values will be connected with straight line.
* "step" - The values will be connected with a line with right angle.
* "smooth" - The values will be connected with a smooth line.

> The default value is "normal".

> The `style` option is supported when [series.type](/api/javascript/dataviz/ui/stock-chart#configuration-series.type) is set to "area".

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 1, 1), value: 100 },
                { date: new Date(2023, 1, 2), value: 105 },
                { date: new Date(2023, 1, 3), value: 98 }
            ]
        },
        categoryField: "date",
        series: [{
            type: "area",
            field: "value",
            line: {
                style: "smooth"
            }
        }]
    });
    </script>

### series.lowField `String`

The data field containing the low value.

** Available for candlestick and ohlc series **

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 1, 1), open: 100, high: 110, low: 90, close: 105 },
                { date: new Date(2023, 1, 2), open: 105, high: 115, low: 95, close: 110 }
            ]
        },
        categoryField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### series.markers `Object`

Marker options.

** Applicable for area and line series. **

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 1, 1), value: 100 },
                { date: new Date(2023, 1, 2), value: 105 },
                { date: new Date(2023, 1, 3), value: 98 }
            ]
        },
        categoryField: "date",
        series: [{
            type: "line",
            field: "value",
            markers: {
                visible: true,
                background: "#ff6800",
                size: 8
            }
        }]
    });
    </script>

### series.markers.background `String|Function`

The background color of the current series markers.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 1, 1), value: 100 },
                { date: new Date(2023, 1, 2), value: 105 },
                { date: new Date(2023, 1, 3), value: 98 }
            ]
        },
        categoryField: "date",
        series: [{
            type: "line",
            field: "value",
            markers: {
                visible: true,
                background: "#ff6800"
            }
        }]
    });
    </script>

### series.markers.border `Object|Function`

The border of the markers.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 1, 1), value: 100 },
                { date: new Date(2023, 1, 2), value: 105 },
                { date: new Date(2023, 1, 3), value: 98 }
            ]
        },
        categoryField: "date",
        series: [{
            type: "line",
            field: "value",
            markers: {
                visible: true,
                border: {
                    color: "#000",
                    width: 2
                }
            }
        }]
    });
    </script>

### series.markers.border.color `String|Function`*(default: "black")*

 The color of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 1, 1), value: 100 },
                { date: new Date(2023, 1, 2), value: 105 },
                { date: new Date(2023, 1, 3), value: 98 }
            ]
        },
        categoryField: "date",
        series: [{
            type: "line",
            field: "value",
            markers: {
                visible: true,
                border: {
                    color: "#ff6800"
                }
            }
        }]
    });
    </script>

### series.markers.border.width `Number|Function`*(default: 0)*

 The width of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 1, 1), value: 100 },
                { date: new Date(2023, 1, 2), value: 105 },
                { date: new Date(2023, 1, 3), value: 98 }
            ]
        },
        categoryField: "date",
        series: [{
            type: "line",
            field: "value",
            markers: {
                visible: true,
                border: {
                    width: 3
                }
            }
        }]
    });
    </script>

### series.markers.size `Number|Function`*(default: 6)*

 The marker size.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 1, 1), value: 100 },
                { date: new Date(2023, 1, 2), value: 105 },
                { date: new Date(2023, 1, 3), value: 98 }
            ]
        },
        categoryField: "date",
        series: [{
            type: "line",
            field: "value",
            markers: {
                visible: true,
                size: 12
            }
        }]
    });
    </script>

### series.markers.rotation `Number|Function`

The rotation angle of the markers.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        series: [{
          type: "line",
          field: "value",
          categoryField: "date",
          markers: {
            type: "square",
            rotation: 45
          },
          data: [
            { value: 1, date: new Date(2012, 1, 1) },
            { value: 2, date: new Date(2012, 1, 2) }
          ]
        }]
    });
    </script>

### series.markers.type `String|Function`*(default: "circle")*

Configures the markers shape type.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 1, 1), value: 100 },
                { date: new Date(2023, 1, 2), value: 105 },
                { date: new Date(2023, 1, 3), value: 98 }
            ]
        },
        categoryField: "date",
        series: [{
            type: "line",
            field: "value",
            markers: {
                visible: true,
                type: "triangle"
            }
        }]
    });
    </script>

#### *"square"*

The marker shape is square.

#### *"triangle"*

The marker shape is triangle.

#### *"circle"*

The marker shape is circle.

#### *"cross"*

The marker shape is cross.

### series.markers.visible `Boolean|Function`*(default: false)*

The markers visibility.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 1, 1), value: 100 },
                { date: new Date(2023, 1, 2), value: 105 },
                { date: new Date(2023, 1, 3), value: 98 }
            ]
        },
        categoryField: "date",
        series: [{
            type: "line",
            field: "value",
            markers: {
                visible: true
            }
        }]
    });
    </script>

### series.missingValues `String`

The behavior for handling missing values. The supported values are:

* "gap" - the plot stops before the missing point and continues after it.
* "interpolate" - the value is interpolated from neighboring points.
* "zero" - the value is assumed to be zero.

> The default value is "interpolate", except for "area" and stacked series which default to "zero".

> The `missingValues` option is supported when [series.type](/api/javascript/dataviz/ui/stock-chart#configuration-series.type) is set to "area" and "line".

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 1, 1), value: 100 },
                { date: new Date(2023, 1, 2), value: null },
                { date: new Date(2023, 1, 3), value: 98 }
            ]
        },
        categoryField: "date",
        series: [{
            type: "line",
            field: "value",
            missingValues: "gap"
        }]
    });
    </script>

### series.style `String` *(default: "normal")*

The supported values are:

* "normal" - The values will be connected with straight line.
* "step" - The values will be connected with a line at right.
* "smooth" - The values will be connected with a smooth line.

> The default value is "normal".

> The `style` option is supported when [series.type](/api/javascript/dataviz/ui/stock-chart#configuration-series.type) is set to "line".

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 1, 1), value: 100 },
                { date: new Date(2023, 1, 2), value: 105 },
                { date: new Date(2023, 1, 3), value: 98 }
            ]
        },
        categoryField: "date",
        series: [{
            type: "line",
            field: "value",
            style: "smooth"
        }]
    });
    </script>

### series.negativeColor `String`

Color to use for bars with negative values.

** Applicable only to column series. **

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 1, 1), value: 100 },
                { date: new Date(2023, 1, 2), value: -50 },
                { date: new Date(2023, 1, 3), value: 80 }
            ]
        },
        categoryField: "date",
        series: [{
            type: "column",
            field: "value",
            negativeColor: "#ff0000"
        }]
    });
    </script>

The plot stops before the missing point and continues after it.

### series.opacity `Number`

The series opacity.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 1, 1), value: 100 },
                { date: new Date(2023, 1, 2), value: 105 },
                { date: new Date(2023, 1, 3), value: 98 }
            ]
        },
        categoryField: "date",
        series: [{
            type: "area",
            field: "value",
            opacity: 0.7
        }]
    });
    </script>

### series.openField `String`

The data field containing the open value.

** Available for candlestick and ohlc series **

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 1, 1), open: 100, high: 110, low: 90, close: 105 },
                { date: new Date(2023, 1, 2), open: 105, high: 115, low: 95, close: 110 }
            ]
        },
        categoryField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### series.overlay `Object`

The effects overlay.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 1, 1), open: 100, high: 110, low: 90, close: 105 },
                { date: new Date(2023, 1, 2), open: 105, high: 115, low: 95, close: 110 }
            ]
        },
        categoryField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            overlay: {
                gradient: "glass"
            }
        }]
    });
    </script>

### series.overlay.gradient `String`

The gradient name.

Available options:

* **glass** (column and candlestick series)
* **none**

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 1, 1), open: 100, high: 110, low: 90, close: 105 },
                { date: new Date(2023, 1, 2), open: 105, high: 115, low: 95, close: 110 }
            ]
        },
        categoryField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            overlay: {
                gradient: "glass"
            }
        }]
    });
    </script>

### series.spacing `Number`*(default: 0.4)*

Space between points as proportion of the point width.

Available for column, candlestick and ohlc series.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2013/01/01", open: 40, high: 45, low: 38, close: 42 },
                { date: "2013/01/02", open: 42, high: 48, low: 40, close: 45 }
            ]
        },
        series: [{
            type: "column",
            field: "close",
            spacing: 0.8
        }],
        categoryAxis: {
            field: "date"
        }
    });
    </script>

### series.stack `Boolean|String|Object` *(default: false)*

A boolean value indicating if the series should be stacked.
A string value is interpreted as [series.stack.group](/api/javascript/dataviz/ui/stock-chart#configuration-series.stack.group).

> The `stack` options is supported when [series.type](/api/javascript/dataviz/ui/stock-chart#configuration-series.type) is set to "bar", "column", "line", "area", "verticalLine", "verticalArea", "radarLine", "radarArea" and "radarColumn".

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2013/01/01", value1: 40, value2: 20 },
                { date: "2013/01/02", value1: 42, value2: 25 }
            ]
        },
        series: [{
            type: "column",
            field: "value1",
            stack: true
        }, {
            type: "column", 
            field: "value2",
            stack: true
        }],
        categoryAxis: {
            field: "date"
        }
    });
    </script>

> Stack settings of the first series are applied to the rest of the series.

### series.stack.type `String` *(default: "normal")*

The type of stack to plot. The following types are supported:

* "normal" - the value of the stack is the sum of all points in the category (or group)
* "100%" - the value of the stack is always 100% (1.00). Points within the category (or group) are represented as percentages.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2013/01/01", value1: 40, value2: 60 },
                { date: "2013/01/02", value1: 42, value2: 58 }
            ]
        },
        series: [{
            type: "column",
            field: "value1",
            stack: {
                type: "100%"
            }
        }, {
            type: "column", 
            field: "value2",
            stack: {
                type: "100%"
            }
        }],
        categoryAxis: {
            field: "date"
        }
    });
    </script>

### series.stack.group `String`

Indicates that the series should be stacked in a group with the specified name.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2013/01/01", value1: 40, value2: 60, value3: 30 },
                { date: "2013/01/02", value1: 42, value2: 58, value3: 32 }
            ]
        },
        series: [{
            type: "column",
            field: "value1",
            stack: {
                group: "groupA"
            }
        }, {
            type: "column", 
            field: "value2",
            stack: {
                group: "groupA"
            }
        }, {
            type: "column", 
            field: "value3",
            stack: {
                group: "groupB"
            }
        }],
        categoryAxis: {
            field: "date"
        }
    });
    </script>

> The `group` option is supported when [series.type](/api/javascript/dataviz/ui/stock-chart#configuration-series.type) is set to "bar" or "column".

### series.tooltip `Object`

The data point tooltip configuration options.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2013/01/01", open: 40, high: 45, low: 38, close: 42 },
                { date: "2013/01/02", open: 42, high: 48, low: 40, close: 45 }
            ]
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            tooltip: {
                background: "yellow",
                color: "black",
                visible: true
            }
        }],
        categoryAxis: {
            field: "date"
        }
    });
    </script>

### series.tooltip.background `String`

The background color of the tooltip. The default is determined from the series color.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2013/01/01", value: 40 },
                { date: "2013/01/02", value: 42 }
            ]
        },
        series: [{
            field: "value",
            tooltip: {
                background: "#ffcc00"
            }
        }],
        categoryAxis: {
            field: "date"
        }
    });
    </script>

### series.tooltip.border `Object`

The border configuration options.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2013/01/01", value: 40 },
                { date: "2013/01/02", value: 42 }
            ]
        },
        series: [{
            field: "value",
            tooltip: {
                border: {
                    color: "red",
                    width: 2
                }
            }
        }],
        categoryAxis: {
            field: "date"
        }
    });
    </script>

### series.tooltip.border.color `String`*(default: "black")*

The color of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2013/01/01", value: 40 },
                { date: "2013/01/02", value: 42 }
            ]
        },
        series: [{
            field: "value",
            tooltip: {
                border: {
                    color: "blue",
                    width: 1
                }
            }
        }],
        categoryAxis: {
            field: "date"
        }
    });
    </script>

### series.tooltip.border.width `Number`*(default: 0)*

The width of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2013/01/01", value: 40 },
                { date: "2013/01/02", value: 42 }
            ]
        },
        series: [{
            field: "value",
            tooltip: {
                border: {
                    color: "green",
                    width: 3
                }
            }
        }],
        categoryAxis: {
            field: "date"
        }
    });
    </script>

### series.tooltip.color `String`

The text color of the tooltip. The default is the same as the series labels color.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2013/01/01", value: 40 },
                { date: "2013/01/02", value: 42 }
            ]
        },
        series: [{
            field: "value",
            tooltip: {
                color: "white",
                background: "darkblue"
            }
        }],
        categoryAxis: {
            field: "date"
        }
    });
    </script>

### series.tooltip.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The tooltip font.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2013/01/01", value: 40 },
                { date: "2013/01/02", value: 42 }
            ]
        },
        series: [{
            field: "value",
            tooltip: {
                font: "14px Verdana"
            }
        }],
        categoryAxis: {
            field: "date"
        }
    });
    </script>

### series.tooltip.format `String`

The tooltip format. Format variables depend on the series type:

* Area, column, line and pie
    *   **0** - value
* Candlestick and OHLC
    *   **0** - open value
    *   **1** - high value
    *   **2** - low value
    *   **3** - close value
    *   **4** - category name

#### Example

```pseudo
    //sets format of the tooltip
    format: "{0:C}--{1:C}"
```

### series.tooltip.padding `Number|Object`

The padding of the tooltip.

#### Example

```pseudo
    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // right and bottom padding are left at their default values
    padding: { top: 1, left: 1 }
```

### series.tooltip.template `String|Function`

The tooltip template.
Template variables:

*   **value** - the point value (either a number or an object)
*   **category** - the category name
*   **series** - the data series
*   **dataItem** - the original data item used to construct the point.
        Will be null if binding to array.

#### Example

```pseudo
    $("#chart").kendoChart({
         title: {
             text: "My Chart Title"
         },
         series: [
             {
                 type: "area",
                 name: "Series 1",
                 data: [200, 450, 300, 125],
                 tooltip: {
                     visible: true,
                     template: "#= category # - #= value #"
                 }
             }
         ],
         categoryAxis: {
             categories: [2000, 2001, 2002, 2003]
         }
    });
```

### series.tooltip.visible `Boolean`*(default: false)*

A value indicating if the tooltip should be displayed.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2013/01/01", value: 40 },
                { date: "2013/01/02", value: 42 }
            ]
        },
        series: [{
            field: "value",
            tooltip: {
                visible: true
            }
        }],
        categoryAxis: {
            field: "date"
        }
    });
    </script>

### series.visibleInLegend `Boolean`*(default: true)*

A value indicating whether to show the series name in the legend.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2013/01/01", value: 40 },
                { date: "2013/01/02", value: 42 }
            ]
        },
        legend: {
            visible: true
        },
        series: [{
            name: "Value",
            field: "value",
            visibleInLegend: false
        }],
        categoryAxis: {
            field: "date"
        }
    });
    </script>

### series.width `Number`

The line width.

** Applicable for area and line series. **

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2013/01/01", value: 40 },
                { date: "2013/01/02", value: 42 }
            ]
        },
        series: [{
            type: "line",
            field: "value",
            width: 5
        }],
        categoryAxis: {
            field: "date"
        }
    });
    </script>

### series.target `Object`

The target of the bullet chart.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2013/01/01", value: 40, target: 45 },
                { date: "2013/01/02", value: 42, target: 48 }
            ]
        },
        series: [{
            type: "bullet",
            field: "value",
            target: {
                field: "target",
                color: "red"
            }
        }],
        categoryAxis: {
            field: "date"
        }
    });
    </script>

### series.target.line `Object`

The target line.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2013/01/01", value: 40, target: 45 },
                { date: "2013/01/02", value: 42, target: 48 }
            ]
        },
        series: [{
            type: "bullet",
            field: "value",
            target: {
                field: "target",
                line: {
                    width: 3
                }
            }
        }],
        categoryAxis: {
            field: "date"
        }
    });
    </script>

### series.target.line.width `Object|Function`

The width of the line.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2013/01/01", value: 40, target: 45 },
                { date: "2013/01/02", value: 42, target: 48 }
            ]
        },
        series: [{
            type: "bullet",
            field: "value",
            target: {
                field: "target",
                line: {
                    width: 4
                }
            }
        }],
        categoryAxis: {
            field: "date"
        }
    });
    </script>

### series.target.color `String|Function`

The target color.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2013/01/01", value: 40, target: 45 },
                { date: "2013/01/02", value: 42, target: 48 }
            ]
        },
        series: [{
            type: "bullet",
            field: "value",
            target: {
                field: "target",
                color: "orange"
            }
        }],
        categoryAxis: {
            field: "date"
        }
    });
    </script>

### series.target.border `Object|Function`

The border of the target.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2013/01/01", value: 40, target: 45 },
                { date: "2013/01/02", value: 42, target: 48 }
            ]
        },
        series: [{
            type: "bullet",
            field: "value",
            target: {
                field: "target",
                border: {
                    color: "purple",
                    width: 2
                }
            }
        }],
        categoryAxis: {
            field: "date"
        }
    });
    </script>

### series.target.border.color `String|Function`*(default: "black")*

The color of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2013/01/01", value: 40, target: 45 },
                { date: "2013/01/02", value: 42, target: 48 }
            ]
        },
        series: [{
            type: "bullet",
            field: "value",
            target: {
                field: "target",
                border: {
                    color: "navy"
                }
            }
        }],
        categoryAxis: {
            field: "date"
        }
    });
    </script>

### series.target.border.dashType `String|Function`*(default: "solid")*

The dash type of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2013/01/01", value: 40, target: 45 },
                { date: "2013/01/02", value: 42, target: 48 }
            ]
        },
        series: [{
            type: "bullet",
            field: "value",
            target: {
                field: "target",
                border: {
                    color: "red",
                    dashType: "dash"
                }
            }
        }],
        categoryAxis: {
            field: "date"
        }
    });
    </script>

#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### series.target.border.width `Number|Function`*(default: 0)*

The width of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2013/01/01", value: 40, target: 45 },
                { date: "2013/01/02", value: 42, target: 48 }
            ]
        },
        series: [{
            type: "bullet",
            field: "value",
            target: {
                field: "target",
                border: {
                    color: "green",
                    width: 3
                }
            }
        }],
        categoryAxis: {
            field: "date"
        }
    });
    </script>

### series.notes `Object`
The series notes configuration.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2013/01/01", value: 40 },
                { date: "2013/01/02", value: 42 }
            ]
        },
        series: [{
            field: "value",
            notes: {
                data: [{
                    value: 41,
                    position: "top"
                }]
            }
        }],
        categoryAxis: {
            field: "date"
        }
    });
    </script>

### series.notes.icon `Object`
The icon of the notes.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2013/01/01", value: 40 },
                { date: "2013/01/02", value: 42 }
            ]
        },
        series: [{
            field: "value",
            notes: {
                icon: {
                    background: "red",
                    type: "circle",
                    size: 15
                },
                data: [{
                    value: 41
                }]
            }
        }],
        categoryAxis: {
            field: "date"
        }
    });
    </script>

### series.notes.position `String`
The position of the series note.

* "top" - The note is positioned on the top.
* "bottom" - The note is positioned on the bottom.
* "left" - The note is positioned on the left.
* "right" - The note is positioned on the right.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2013/01/01", value: 40 },
                { date: "2013/01/02", value: 42 }
            ]
        },
        series: [{
            field: "value",
            notes: {
                position: "top",
                data: [{
                    value: 41
                }]
            }
        }],
        categoryAxis: {
            field: "date"
        }
    });
    </script>

### series.notes.icon.background `String`
The background color of the notes icon.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2013/01/01", value: 40 },
                { date: "2013/01/02", value: 42 }
            ]
        },
        series: [{
            field: "value",
            notes: {
                icon: {
                    background: "yellow"
                },
                data: [{
                    value: 41
                }]
            }
        }],
        categoryAxis: {
            field: "date"
        }
    });
    </script>

### series.notes.icon.border `Object`
The border of the icon.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        series: [{
            type: "candlestick",
            data: [[new Date(2023, 0, 1), 100, 110, 95, 105]],
            notes: {
                data: [{
                    value: new Date(2023, 0, 1),
                    icon: {
                        border: {
                            color: "#ff0000",
                            width: 2
                        }
                    }
                }]
            }
        }]
    });
    </script>

### series.notes.icon.border.color `String`
The border color of the icon.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        series: [{
            type: "candlestick",
            data: [[new Date(2023, 0, 1), 100, 110, 95, 105]],
            notes: {
                data: [{
                    value: new Date(2023, 0, 1),
                    icon: {
                        border: {
                            color: "#ff0000"
                        }
                    }
                }]
            }
        }]
    });
    </script>

### series.notes.icon.border.width `Number`
The border width of the icon.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        series: [{
            type: "candlestick",
            data: [[new Date(2023, 0, 1), 100, 110, 95, 105]],
            notes: {
                data: [{
                    value: new Date(2023, 0, 1),
                    icon: {
                        border: {
                            width: 3
                        }
                    }
                }]
            }
        }]
    });
    </script>

### series.notes.icon.size `Number`
The size of the icon.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        series: [{
            type: "candlestick",
            data: [[new Date(2023, 0, 1), 100, 110, 95, 105]],
            notes: {
                data: [{
                    value: new Date(2023, 0, 1),
                    icon: {
                        size: 20
                    }
                }]
            }
        }]
    });
    </script>

### series.notes.icon.type `String` *(default: "circle")*
The icon shape.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        series: [{
            type: "candlestick",
            data: [[new Date(2023, 0, 1), 100, 110, 95, 105]],
            notes: {
                data: [{
                    value: new Date(2023, 0, 1),
                    icon: {
                        type: "square"
                    }
                }]
            }
        }]
    });
    </script>

The supported values are:
* "circle" - the marker shape is circle.
* "square" - the marker shape is square.
* "triangle" - the marker shape is triangle.
* "cross" - the marker shape is cross.

### series.notes.icon.visible `Boolean` *(default: "true")*
The icon visibility.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        series: [{
            type: "candlestick",
            data: [[new Date(2023, 0, 1), 100, 110, 95, 105]],
            notes: {
                data: [{
                    value: new Date(2023, 0, 1),
                    icon: {
                        visible: false
                    }
                }]
            }
        }]
    });
    </script>

### series.notes.label `Object`
The label of the notes.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        series: [{
            type: "candlestick",
            data: [[new Date(2023, 0, 1), 100, 110, 95, 105]],
            notes: {
                data: [{
                    value: new Date(2023, 0, 1),
                    label: {
                        text: "Important note",
                        position: "top"
                    }
                }]
            }
        }]
    });
    </script>

### series.notes.label.background `String`
The background color of the label. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        series: [{
            type: "candlestick",
            data: [[new Date(2023, 0, 1), 100, 110, 95, 105]],
            notes: {
                data: [{
                    value: new Date(2023, 0, 1),
                    label: {
                        text: "Important note",
                        background: "#ff0000"
                    }
                }]
            }
        }]
    });
    </script>

### series.notes.label.border `Object`
The border of the label.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        series: [{
            type: "candlestick",
            data: [[new Date(2023, 0, 1), 100, 110, 95, 105]],
            notes: {
                data: [{
                    value: new Date(2023, 0, 1),
                    label: {
                        text: "Important note",
                        border: {
                            color: "#ff0000",
                            width: 2
                        }
                    }
                }]
            }
        }]
    });
    </script>

### series.notes.label.border.color `String` *(default: "black")*
The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        series: [{
            type: "candlestick",
            data: [[new Date(2023, 0, 1), 100, 110, 95, 105]],
            notes: {
                data: [{
                    value: new Date(2023, 0, 1),
                    label: {
                        text: "Important note",
                        border: {
                            color: "#ff0000"
                        }
                    }
                }]
            }
        }]
    });
    </script>

### series.notes.label.border.dashType `String` *(default: "solid")*
The dash type of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        series: [{
            type: "candlestick",
            data: [[new Date(2023, 0, 1), 100, 110, 95, 105]],
            notes: {
                data: [{
                    value: new Date(2023, 0, 1),
                    label: {
                        text: "Important note",
                        border: {
                            dashType: "dash"
                        }
                    }
                }]
            }
        }]
    });
    </script>

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

### series.notes.label.border.width `Number` *(default: 0)*
The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        series: [{
            type: "candlestick",
            data: [[new Date(2023, 0, 1), 100, 110, 95, 105]],
            notes: {
                data: [{
                    value: new Date(2023, 0, 1),
                    label: {
                        text: "Important note",
                        border: {
                            width: 3
                        }
                    }
                }]
            }
        }]
    });
    </script>

### series.notes.label.color `String`
The text color of the label. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        series: [{
            type: "candlestick",
            data: [[new Date(2023, 0, 1), 100, 110, 95, 105]],
            notes: {
                data: [{
                    value: new Date(2023, 0, 1),
                    label: {
                        text: "Important note",
                        color: "#ff0000"
                    }
                }]
            }
        }]
    });
    </script>

### series.notes.label.font `String` *(default: "12px Arial,Helvetica,sans-serif")*
The font style of the label.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        series: [{
            type: "candlestick",
            data: [[new Date(2023, 0, 1), 100, 110, 95, 105]],
            notes: {
                data: [{
                    value: new Date(2023, 0, 1),
                    label: {
                        text: "Important note",
                        font: "16px Arial"
                    }
                }]
            }
        }]
    });
    </script>

### series.notes.label.template `String|Function`
The [template](/api/framework/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* value - the point value

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        series: [{
            type: "candlestick",
            data: [[new Date(2023, 0, 1), 100, 110, 95, 105]],
            notes: {
                data: [{
                    value: new Date(2023, 0, 1),
                    label: {
                        template: (data) => `Note: ${data.value}`
                    }
                }]
            }
        }]
    });
    </script>

### series.notes.label.visible `Boolean` *(default: true)*
If set to `true` the chart will display the series notes label. By default the series notes label are visible.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        series: [{
            type: "candlestick",
            data: [[new Date(2023, 0, 1), 100, 110, 95, 105]],
            notes: {
                data: [{
                    value: new Date(2023, 0, 1),
                    label: {
                        text: "Important note",
                        visible: false
                    }
                }]
            }
        }]
    });
    </script>

### series.notes.label.rotation `Number` *(default: 0)*
The rotation angle of the label. By default the label are not rotated.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        series: [{
            type: "candlestick",
            data: [[new Date(2023, 0, 1), 100, 110, 95, 105]],
            notes: {
                data: [{
                    value: new Date(2023, 0, 1),
                    label: {
                        text: "Important note",
                        rotation: 45
                    }
                }]
            }
        }]
    });
    </script>

### series.notes.label.format `String` *(default: "{0}")*
The format used to display the notes label. Uses [kendo.format](/api/framework/kendo#methods-format). Contains one placeholder ("{0}") which represents the axis value.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        series: [{
            type: "candlestick",
            data: [[new Date(2023, 0, 1), 100, 110, 95, 105]],
            notes: {
                data: [{
                    value: new Date(2023, 0, 1),
                    label: {
                        format: "Value: {0}"
                    }
                }]
            }
        }]
    });
    </script>

### series.notes.label.position `String` *(default: "inside")*
The position of the labels.

* "inside" - the label is positioned inside of the icon.
* "outside" - the label is positioned outside of the icon.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        series: [{
            type: "candlestick",
            data: [[new Date(2023, 0, 1), 100, 110, 95, 105]],
            notes: {
                data: [{
                    value: new Date(2023, 0, 1),
                    label: {
                        text: "Important note",
                        position: "outside"
                    }
                }]
            }
        }]
    });
    </script>

### series.notes.line `Object`
The line of the notes.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        series: [{
            type: "candlestick",
            data: [[new Date(2023, 0, 1), 100, 110, 95, 105]],
            notes: {
                data: [{
                    value: new Date(2023, 0, 1),
                    line: {
                        width: 2,
                        color: "#ff0000"
                    }
                }]
            }
        }]
    });
    </script>

### series.notes.line.width `Number`
The line width of the notes.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        series: [{
            type: "candlestick",
            data: [[new Date(2023, 0, 1), 100, 110, 95, 105]],
            notes: {
                data: [{
                    value: new Date(2023, 0, 1),
                    line: {
                        width: 3
                    }
                }]
            }
        }]
    });
    </script>

### series.notes.line.color `String`
The line color of the notes.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        series: [{
            type: "candlestick",
            data: [[new Date(2023, 0, 1), 100, 110, 95, 105]],
            notes: {
                data: [{
                    value: new Date(2023, 0, 1),
                    line: {
                        color: "#ff0000"
                    }
                }]
            }
        }]
    });
    </script>

### series.notes.line.length `Number`
The length of the connecting lines in pixels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        series: [{
            type: "candlestick",
            data: [[new Date(2023, 0, 1), 100, 110, 95, 105]],
            notes: {
                data: [{
                    value: new Date(2023, 0, 1),
                    line: {
                        length: 50
                    }
                }]
            }
        }]
    });
    </script>

### series.zIndex `Number`
An optional Z-index that can be used to change the default stacking order of series.

The series with the highest Z-index will be placed on top.

Series with no Z-index will use the default stacking order based on series type.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2000, 1, 1), open: 10, high: 15, low: 8, close: 12 },
                { date: new Date(2000, 1, 2), open: 12, high: 18, low: 10, close: 16 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            zIndex: 1
        }, {
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close",
            zIndex: 2
        }]
    });
    </script>
For example line series will be on top with bar and area following below.

### seriesColors `Array`

The default colors for the chart's series. When all colors are used, new colors are pulled from the start again.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 1, 1), value1: 100, value2: 80 },
                { date: new Date(2023, 1, 2), value1: 105, value2: 85 },
                { date: new Date(2023, 1, 3), value1: 98, value2: 90 }
            ]
        },
        categoryField: "date",
        seriesColors: ["#ff6800", "#33cc33", "#0066cc"],
        series: [
            { type: "line", field: "value1", name: "Series 1" },
            { type: "line", field: "value2", name: "Series 2" }
        ]
    });
    </script>

### seriesDefaults `Object`

Default values for each series.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date(2023, 1, 1), value1: 100, value2: 80 },
                { date: new Date(2023, 1, 2), value1: 105, value2: 85 },
                { date: new Date(2023, 1, 3), value1: 98, value2: 90 }
            ]
        },
        categoryField: "date",
        seriesDefaults: {
            type: "line",
            opacity: 0.8,
            markers: {
                visible: true
            }
        },
        series: [
            { field: "value1", name: "Series 1" },
            { field: "value2", name: "Series 2" }
        ]
    });
    </script>

### seriesDefaults.area `Object`

The area configuration options.
The default options for all area series. For more details see the series options.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dateField: "date",
        seriesDefaults: {
              area: {
                  color: "#ff0000",
                  opacity: 0.5
              }
          },
        series: [{
            type: "area",
            data: [
                { date: new Date(2000, 1, 1), value: 300 },
                { date: new Date(2000, 1, 2), value: 200 }
            ]
        }]
    });
    </script>

### seriesDefaults.candlestick `Object`

The candlestick configuration options.
The default options for all candlestick series. For more details see the series options.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        seriesDefaults: {
            candlestick: {
                gap: 0.5,
                spacing: 0.2
            }
        },
        series: [{
            type: "candlestick",
            data: [[new Date(2023, 0, 1), 100, 110, 95, 105]]
        }]
    });
    </script>

### seriesDefaults.ohlc `Object`

The ohlc configuration options.
The default options for all ohlc series. For more details see the series options.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        seriesDefaults: {
            ohlc: {
                gap: 0.3,
                spacing: 0.1
            }
        },
        series: [{
            type: "ohlc",
            data: [[new Date(2023, 0, 1), 100, 110, 95, 105]]
        }]
    });
    </script>

### seriesDefaults.border `Object`

The border of the series.

#### Example

    <div id="stock-chart"></div>
    <script>
     $("#stock-chart").kendoStockChart({
        dateField: "date",
        seriesDefaults: {
             border: {
                color: "#ff0000",
                width: 5
            }
          },
        series: [{
            type: "column",
          	color: "yellow",
            data: [
                { date: new Date(2000, 1, 1), value: 300 },
                { date: new Date(2000, 1, 2), value: 200 }
            ]
        }]
    });
    </script>

### seriesDefaults.border.color `String`*(default: "black")*

The color of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dateField: "date",
        seriesDefaults: {
             border: {
                color: "black",
            }
          },
        series: [{
            type: "column",
          	color: "yellow",
            data: [
                { date: new Date(2000, 1, 1), value: 300 },
                { date: new Date(2000, 1, 2), value: 200 }
            ]
        }]
    });
    </script>

### seriesDefaults.border.dashType `String`*(default: "solid")*

The dash type of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dateField: "date",
        seriesDefaults: {
             border: {
                color: "black",
                dashType: "dash"
            }
          },
        series: [{
            type: "column",
          	color: "yellow",
            data: [
                { date: new Date(2000, 1, 1), value: 300 },
                { date: new Date(2000, 1, 2), value: 200 }
            ]
        }]
    });
    </script>

#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### seriesDefaults.border.width `Number`*(default: 0)*

 The width of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dateField: "date",
        seriesDefaults: {
             border: {
                color: "black",
                width: 5
            }
          },
        series: [{
            type: "column",
          	color: "yellow",
            data: [
                { date: new Date(2000, 1, 1), value: 300 },
                { date: new Date(2000, 1, 2), value: 200 }
            ]
        }]
    });;
    </script>

### seriesDefaults.column `Object`

The column configuration options.
The default options for all column series. For more details see the series options.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dateField: "date",
        seriesDefaults: {
             column: {
               gap: 0.5,
               spacing: 0.2
             }
          },
        series: [{
            type: "column",
          	color: "yellow",
            data: [
                { date: new Date(2000, 1, 1), value: 300 },
                { date: new Date(2000, 1, 2), value: 200 }
            ]
        }]
    });
    </script>

### seriesDefaults.gap `Number`*(default: 1.5)*

 The distance between category clusters.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dateField: "date",
        seriesDefaults: {
             column: {
               gap: 0.5,
             }
          },
        series: [{
            type: "column",
          	color: "yellow",
            data: [
                { date: new Date(2000, 1, 1), value: 300 },
                { date: new Date(2000, 1, 2), value: 200 }
            ]
        }]
    });
    </script>

### seriesDefaults.labels `Object`

Configures the series data labels.

#### Example

```pseudo
    $("#chart").kendoChart({
        seriesDefault: {
            // adjust the default label appearence for all series
            labels: {
                // set the margin on all sides to 1
                margin: 1,
                // format the labels as currency
                format: "C"
            }
        },
        //...
    });
```

### seriesDefaults.labels.ariaTemplate `String | Function`

The [template](/api/framework/kendo#methods-template) which renders the ARIA label for the series labels.

The fields which can be used in the template are:

*   category - the category name. Available for area, bar, column, bubble, donut, line and pie series.
*   dataItem - the original data item used to construct the point. Will be null if binding to array.
*   percentage - the point value represented as a percentage value. Available only for 100% stacked charts.
*   series - the data series
*   value - the point value. Can be a number or object containing each bound field.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
      dataSource: {
        data: [
          { value: 1, date: new Date(2012, 1, 1)},
          { value: 2, date: new Date(2012, 1, 2)}
        ]
      },
      dateField: "date",
      seriesDefaults: {
        labels: {
          template: "#= value #%",
          ariaTemplate: "The value for #= series.name # on #= category # is #= value #",
          visible: true
        }
      },
      series: [
        {
          field: "value",
          name: "Series 1"
        }
      ]
    });
    </script>

### seriesDefaults.labels.background `String`

The background color of the labels. Any valid CSS color string will work here,
including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dateField: "date",
        seriesDefaults: {
             labels: {
                background: "#ff0000",
                visible: true
            }
          },
        series: [{
            type: "column",
          	color: "yellow",
            data: [
                { date: new Date(2000, 1, 1), value: 300 },
                { date: new Date(2000, 1, 2), value: 200 }
            ]
        }]
    });
    </script>

### seriesDefaults.labels.border `Object`

The border of the labels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dateField: "date",
        seriesDefaults: {
             labels: {
                border: {
                    color: "#ff0000",
                    width: 2
                },
                visible: true
            }
          },
        series: [{
            type: "column",
          	color: "yellow",
            data: [
                { date: new Date(2000, 1, 1), value: 300 },
                { date: new Date(2000, 1, 2), value: 200 }
            ]
        }]
    });
    </script>

### seriesDefaults.labels.border.color `String`*(default: "black")*

 The color of the border.

#### Example

    $("#stock-chart").kendoStockChart({
        dateField: "date",
        seriesDefaults: {
             labels: {
                border: {
                    color: "#ff0000",
                },
                visible: true
            }
          },
        series: [{
            type: "column",
          	color: "yellow",
            data: [
                { date: new Date(2000, 1, 1), value: 300 },
                { date: new Date(2000, 1, 2), value: 200 }
            ]
        }]
    });
    </script>

### seriesDefaults.labels.border.dashType `String`*(default: "solid")*

 The dash type of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dateField: "date",
        seriesDefaults: {
             labels: {
                border: {
                    dashType: "dash",
                  	width: 1,
                  	color: "black"
                },
                visible: true
            }
          },
        series: [{
            type: "column",
          	color: "yellow",
            data: [
                { date: new Date(2000, 1, 1), value: 300 },
                { date: new Date(2000, 1, 2), value: 200 }
            ]
        }]
    });
    </script>


#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### seriesDefaults.labels.border.width `Number`*(default: 0)*

 The width of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dateField: "date",
        seriesDefaults: {
             labels: {
                border: {
                  	width: 1,
                  	color: "black"
                },
                visible: true
            }
          },
        series: [{
            type: "column",
          	color: "yellow",
            data: [
                { date: new Date(2000, 1, 1), value: 300 },
                { date: new Date(2000, 1, 2), value: 200 }
            ]
        }]
    });
    </script>

### seriesDefaults.labels.color `String`

The text color of the labels. Any valid CSS color string will work here, including hex
and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dateField: "date",
        seriesDefaults: {
             labels: {
                color: "#ff0000",
                visible: true
            }
          },
        series: [{
            type: "column",
          	color: "yellow",
            data: [
                { date: new Date(2000, 1, 1), value: 300 },
                { date: new Date(2000, 1, 2), value: 200 }
            ]
        }]
    });
    </script>

### seriesDefaults.labels.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.
labels

#### Example

```pseudo
    $("#chart").kendoChart({
        seriesDefault: {
            // adjust the default label appearence for all series
            labels: {
                // set the font size to 14px
                font: "14px Arial,Helvetica,sans-serif"
            }
        },
        //...
    });
```

### seriesDefaults.labels.format `String`

The format of the labels.

#### Example

```pseudo
    //sets format of the labels
    format: "C"
```

### seriesDefaults.labels.margin `Number|Object`*(default: 0)*

 The margin of the labels.

#### Example

```pseudo
    $("#chart).kendoChart({
         labels: {
             // sets the top, right, bottom and left margin to 3px.
             margin: 3
         },
         //...
    });

    $("#chart").kendoChart({
         labels: {
             // sets the top and left margin to 1px
             // margin right and bottom are with 0px (by default)
             margin: { top: 1, left: 1 }
         },
         //...
    });
```

### seriesDefaults.labels.padding `Number|Object`*(default: 0)*

 The padding of the labels.

#### Example

```pseudo
    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // padding right and bottom are with 0px (by default)
    padding: { top: 1, left: 1 }
```

### seriesDefaults.labels.template `String | Function`

The label template.
Template variables:

*   **value** - the point value
*   **category** - the category name
*   **series** - the data series
*   **dataItem** - the original data item used to construct the point.
        Will be null if binding to array.

#### Example

```pseudo
    // chart initialization
    $("#chart").kendoChart({
         title: {
             text: "My Chart Title"
         },
         seriesDefault: {
             labels: {
                 // label template
                 template: "#= value  #%",
                 visible: true
             }
         },
         series: [
             {
                 name: "Series 1",
                 data: [200, 450, 300, 125]
             }
         ],
         categoryAxis: {
             categories: [2000, 2001, 2002, 2003]
         }
    });
```

### seriesDefaults.labels.visible `Boolean`*(default: false)*

 The visibility of the labels.

#### Example

```pseudo
    $("#chart").kendoChart({
        seriesDefault: {
            labels: {
                // hide all the series labels by default
                visible: true
            },
            //...
        }
    });
```

### seriesDefaults.line `Object`

The line configuration options.
The default options for all line series. For more details see the series options.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dateField: "date",
        seriesDefaults: {
             line: {
                width: 3,
                dashType: "dash"
            }
          },
        series: [{
            type: "line",
          	color: "red",
            data: [
                { date: new Date(2000, 1, 1), value: 300 },
                { date: new Date(2000, 1, 2), value: 200 }
            ]
        }]
    });
    </script>

### seriesDefaults.legendItem `Object`

The configuration of the Chart legend item for all series.

#### Example - override the legend item type for the series

    <div id="chart"></div>
    <script>
    $("#chart").kendoStockChart({
      dataSource: {
        data: [{
          "Date": "2016/01/01",
          "Open": 41.62,
          "High": 41.69,
          "Low": 39.81,
          "Close": 40.12,
          "Volume": 2632000
        }, {
          "Date": "2016/03/01",
          "Open": 40.62,
          "High": 39.69,
          "Low": 40.81,
          "Close": 39.12,
          "Volume": 2631986
        }]
      },
      dateField: "Date",
      series: [{
        name: "Series 1",
        type: "candlestick",
        openField: "Open",
        highField: "High",
        lowField: "Low",
        closeField: "Close",
        legendItem: {
          type: "line"
        }
      }],
      legend: {
        visible: true,
        position: 'bottom'
      }
    });
    </script>

### seriesDefaults.legendItem.area `Object`

Sets the configuration of the legend items of type `area`.
By default, all series except line and scatter use this legend type.

#### Example - sets the opacity of `area` legend items

    <div id="chart"></div>
    <script>
    $("#chart").kendoStockChart({
      dataSource: {
        data: [{
          "Date": "2016/01/01",
          "Open": 41.62,
          "High": 41.69,
          "Low": 39.81,
          "Close": 40.12,
          "Volume": 2632000
        }, {
          "Date": "2016/03/01",
          "Open": 40.62,
          "High": 39.69,
          "Low": 40.81,
          "Close": 39.12,
          "Volume": 2631986
        }]
      },
      dateField: "Date",
      series: [{
        name: "Series 1",
        type: "candlestick",
        openField: "Open",
        highField: "High",
        lowField: "Low",
        closeField: "Close",
        legendItem: {
          area: {
            opacity: 0.1,
          }
        }
      }],
      legend: {
        visible: true,
        position: 'bottom'
      }
    });
    </script>

### seriesDefaults.legendItem.area.background `String`

The background color of the legend item. Accepts a valid CSS color string, including HEX and RGB.
Defaults to the series color.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dateField: "date",
        seriesDefaults: {
             legendItem: {
                area: {
                    background: "blue"
                }
            }
          },
        series: [{
            type: "area",
          	color: "red",
            data: [
                { date: new Date(2000, 1, 1), value: 300 },
                { date: new Date(2000, 1, 2), value: 200 }
            ]
        }]
    });
    </script>

### seriesDefaults.legendItem.area.opacity `Number`

The opacity of the legend item.
Defaults to the series opacity.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dateField: "date",
        seriesDefaults: {
            legendItem: {
                area: {
                    opacity: 0.5
                }
            }
        },
        series: [{
            type: "area",
          	color: "red",
            data: [
                { date: new Date(2000, 1, 1), value: 300 },
                { date: new Date(2000, 1, 2), value: 200 }
            ]
        }]
    });
    </script>

### seriesDefaults.legendItem.cursor `String`
The [cursor style](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor) of the legend item.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dateField: "date",
        seriesDefaults: {
            legendItem: {
                cursor: "pointer"
            }
        },
        series: [{
            type: "area",
          	color: "red",
            data: [
                { date: new Date(2000, 1, 1), value: 300 },
                { date: new Date(2000, 1, 2), value: 200 }
            ]
        }]
    });
    </script>

### seriesDefaults.legendItem.line `Object`

Sets the configuration of the legend items of type `line`.
This is the default legend item type for all line and scatter series.

#### Example - override the color of `line` legend items

    <div id="chart"></div>
    <script>
    $("#chart").kendoStockChart({
      dataSource: {
        data: [{
          "Date": "2016/01/01",
          "Open": 41.62,
          "High": 41.69,
          "Low": 39.81,
          "Close": 40.12,
          "Volume": 2632000
        }, {
          "Date": "2016/03/01",
          "Open": 40.62,
          "High": 39.69,
          "Low": 40.81,
          "Close": 39.12,
          "Volume": 2631986
        }]
      },
      dateField: "Date",
      series: [{
        name: "Series 1",
        type: "line",
        field: "Close",
        legendItem: {
          line: {
            color: "#777",
          }
        }
      }],
      legend: {
        visible: true,
        position: 'bottom'
      }
    });
    </script>

### seriesDefaults.legendItem.line.color `String`

The color of the legend item of type `line`. Accepts a valid CSS color string, including HEX and RGB.
Defaults to the series color.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        seriesDefaults: {
            legendItem: {
                line: {
                    color: "#ff0000"
                }
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ]
        }]
    });
    </script>

### seriesDefaults.legendItem.line.dashType `String`

The dash type of the legend item of type `line`.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        seriesDefaults: {
            legendItem: {
                line: {
                    dashType: "dash"
                }
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ]
        }]
    });
    </script>

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

### seriesDefaults.legendItem.line.opacity `Number`

The opacity of the legend item of type `line`.
Defaults to the series opacity.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        seriesDefaults: {
            legendItem: {
                line: {
                    opacity: 0.5
                }
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ]
        }]
    });
    </script>

### seriesDefaults.legendItem.markers `Object`

The configuration of the Chart legend item markers.

By default, the marker configuration will be the same as the [series.markers](/api/javascript/dataviz/ui/stock-chart#configuration-series.markers) settings of the displayed series.

#### Example - override marker settings for the legend

    <div id="chart"></div>
    <script>
    $("#chart").kendoStockChart({
      dataSource: {
        data: [{
          "Date": "2016/01/01",
          "Open": 41.62,
          "High": 41.69,
          "Low": 39.81,
          "Close": 40.12,
          "Volume": 2632000
        }, {
          "Date": "2016/03/01",
          "Open": 40.62,
          "High": 39.69,
          "Low": 40.81,
          "Close": 39.12,
          "Volume": 2631986
        }]
      },
      dateField: "Date",
      series: [{
        name: "Series 1",
        type: "line",
        field: "Close",
        markers: {
          visible: true
        },
        legendItem: {
          markers: {
            visible: false
          }
        }
      }],
      legend: {
        visible: true,
        position: 'bottom'
      }
    });
    </script>

### seriesDefaults.legendItem.markers.background `String|Function`

The background color of the legend item markers.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        seriesDefaults: {
            legendItem: {
                markers: {
                    background: "#ff0000"
                }
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ],
        }]
    });
    </script>

### seriesDefaults.legendItem.markers.border `Object|Function`

The border of the markers.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        seriesDefaults: {
            legendItem: {
                markers: {
                    border: {
                        color: "#ff0000",
                        width: 2
                    }
                }
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ],
        }]
    });
    </script>

### seriesDefaults.legendItem.markers.border.color `String|Function`

The configuration of the Chart legend item markers border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        seriesDefaults: {
            legendItem: {
                markers: {
                    border: {
                        color: "#ff0000"
                    }
                }
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ],
        }]
    });
    </script>

### seriesDefaults.legendItem.markers.border.dashType `String`

The dash type of the legend item border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        seriesDefaults: {
            legendItem: {
                markers: {
                    border: {
                        dashType: "dash"
                    }
                }
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ],
        }]
    });
    </script>

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

### seriesDefaults.legendItem.markers.borderRadius `Number`

The border radius in pixels when `type` is set to `"roundedRect"`.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        seriesDefaults: {
            legendItem: {
                markers: {
                    type: "roundedRect",
                    borderRadius: 5
                }
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ],
        }]
    });
    </script>

### seriesDefaults.legendItem.markers.type `String|Function`

The markers shape.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        seriesDefaults: {
            legendItem: {
                markers: {
                    type: "square"
                }
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ],
        }]
    });
    </script>

The supported values are:
* "circle" - the marker shape is circle.
* "square" - the marker shape is square.
* "triangle" - the marker shape is triangle.
* "cross" - the marker shape is cross.
* "rect" - alias for "square".
* "roundedRect" - the marker shape is a rounded rectangle.

### seriesDefaults.legendItem.markers.visible `Boolean|Function`

If set to `true` the chart will display the legend item markers. Defaults to the series options.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        seriesDefaults: {
            legendItem: {
                markers: {
                    visible: false
                }
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ],
        }]
    });
    </script>

### seriesDefaults.legendItem.markers.visual `Function`

A function that can be used to create a custom visual for the markers. The available argument fields are:

* rect - the `kendo.geometry.Rect` that defines where the visual should be rendered.
* options - the marker options.
* createVisual - a function that can be used to get the default visual.
* category - the category of the marker point.
* dataItem - the dataItem of the marker point.
* value - the value of the marker point.
* sender - the chart instance.
* series - the series of the marker point.

#### Example - use custom visual for the markers

    <div id="chart"></div>
    <script>
    $("#chart").kendoStockChart({
      dataSource: {
        data: [{
          "Date": "2016/01/01",
          "Open": 41.62,
          "High": 41.69,
          "Low": 39.81,
          "Close": 40.12,
          "Volume": 2632000
        }, {
          "Date": "2016/03/01",
          "Open": 40.62,
          "High": 39.69,
          "Low": 40.81,
          "Close": 39.12,
          "Volume": 2631986
        }]
      },
      dateField: "Date",
      series: [{
        name: "Series 1",
        type: "line",
        field: "Close",
        markers: {
          visible: true
        },
        legendItem: {
          markers: {
            visual: function (e) {
              var origin = e.rect.origin;
              var center = e.rect.center();
              var bottomRight = e.rect.bottomRight();

              var path = new kendo.drawing.Path({
                fill: {
                  color: e.options.border.color
                }
              })
              .moveTo(origin.x, bottomRight.y)
              .lineTo(bottomRight.x, bottomRight.y)
              .lineTo(center.x, origin.y)
              .close();

              return path;
            }
          }
        }
      }],
      legend: {
        visible: true,
        position: 'bottom'
      }
    });
    </script>

### seriesDefaults.legendItem.type `String`

Sets the type of the legend items.
The default value is based on the series type.

The supported values are:

- `"line"`&mdash;the legend items are rendered as a line. This is the default value for line charts.
* `"area"`&mdash;the legend items are rendered as a filled rectangle. This is the default value for area charts.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        seriesDefaults: {
            legendItem: {
                type: "area"
            }
        },
        series: [{
            type: "line",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }],
        legend: {
            visible: true
        }
    });
    </script>

### seriesDefaults.legendItem.visual `Function`

A function that can be used to create a custom visual for the legend items. The available argument fields are:

- `options`&mdash;The item options.
- `createVisual`&mdash;A function for getting the default visual.
- `series`&mdash;The item series.
- `pointIndex`&mdash;The index of the point in the series. Available for the Pie, Donut, and Funnel series.

#### Example - using custom visual for the legend items

    <div id="chart"></div>
    <script>
    $("#chart").kendoStockChart({
      dataSource: {
        data: [{
          "Date": "2016/01/01",
          "Open": 41.62,
          "High": 41.69,
          "Low": 39.81,
          "Close": 40.12,
          "Volume": 2632000
        }, {
          "Date": "2016/03/01",
          "Open": 40.62,
          "High": 39.69,
          "Low": 40.81,
          "Close": 39.12,
          "Volume": 2631986
        }]
      },
      dateField: "Date",
      series: [{
        name: "Series 1",
        type: "line",
        field: "Close",
        markers: {
          visible: true
        },
        legendItem: {
          visual: function (e) {
            var color = e.options.markers.background;
            var labelColor = e.options.labels.color;
            var rect = new kendo.geometry.Rect([0, 0], [100, 50]);
            var layout = new kendo.drawing.Layout(rect, {
              spacing: 5,
              alignItems: "center"
            });

            var marker = new kendo.drawing.Path({
              fill: {
                color: color
              }
            }).moveTo(10, 0).lineTo(15, 10).lineTo(5, 10).close();

            var label = new kendo.drawing.Text(e.series.name, [0, 0], {
              fill: {
                color: labelColor
              }
            });

            layout.append(marker, label);
            layout.reflow()

            return layout;
          }
        }
      }],
      legend: {
        visible: true,
        position: 'bottom'
      }
    });
    </script>

### seriesDefaults.overlay `Object`

The effects overlay.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        seriesDefaults: {
            overlay: {
                gradient: "glass"
            }
        },
        series: [{
            type: "column",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ],
        }]
    });
    </script>

### seriesDefaults.spacing `Number`*(default: 0.4)*

 Space between bars.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        seriesDefaults: {
            spacing: 0.8
        },
        series: [{
            type: "column",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ],
        }]
    });
    </script>

### seriesDefaults.stack `Boolean|Object` *(default: false)*

A boolean value indicating if the series should be stacked.

> The `stack` options is supported when [series.type](/api/javascript/dataviz/ui/stock-chart#configuration-series.type) is set to "bar", "column", "line", "area", "verticalLine", "verticalArea", "radarLine", "radarArea" and "radarColumn".

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        seriesDefaults: {
            stack: true
        },
        series: [{
            type: "column",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ],
        }, {
            type: "column", 
            data: [
                { date: new Date(2023, 0, 5), value: 30 },
                { date: new Date(2023, 0, 6), value: 20 },
                { date: new Date(2023, 0, 7), value: 45 }
            ],
        }]
    });
    </script>

### seriesDefaults.stack.type `String` *(default: "normal")*

The type of stack to plot. The following types are supported:

* "normal" - the value of the stack is the sum of all points in the category (or group)
* "100%" - the value of the stack is always 100% (1.00). Points within the category (or group) are represented as percentages.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        seriesDefaults: {
            stack: {
                type: "100%"
            }
        },
        series: [{
            type: "column",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ],
        }, {
            type: "column", 
            data: [
                { date: new Date(2023, 0, 5), value: 30 },
                { date: new Date(2023, 0, 6), value: 20 },
                { date: new Date(2023, 0, 7), value: 45 }
            ],
        }]
    });
    </script>

### seriesDefaults.type `String`

The default type of the series.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        seriesDefaults: {
            type: "area"
        },
        data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
        ],
    });
    </script>

The supported values are:

* area
* column
* line
* candlestick, ohlc
* bullet

### seriesDefaults.tooltip `Object`

The data point tooltip configuration options.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        seriesDefaults: {
            tooltip: {
                visible: true,
                background: "#ff0000"
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ],
        }]
    });
    </script>

### seriesDefaults.tooltip.background `String`

The background color of the tooltip. The default is determined from the series color.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        seriesDefaults: {
            tooltip: {
                visible: true,
                background: "#ff0000"
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ],
        }]
    });
    </script>

### seriesDefaults.tooltip.border `Object`

The border configuration options.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        seriesDefaults: {
            tooltip: {
                visible: true,
                border: {
                    color: "#ff0000",
                    width: 2
                }
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ],
        }]
    });
    </script>

### seriesDefaults.tooltip.border.color `String`*(default: "black")*

 The color of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        seriesDefaults: {
            tooltip: {
                visible: true,
                border: {
                    color: "#ff0000"
                }
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ],
        }]
    });
    </script>

### seriesDefaults.tooltip.border.width `Number`*(default: 0)*

 The width of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        seriesDefaults: {
            tooltip: {
                visible: true,
                border: {
                    width: 3
                }
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ],
        }]
    });
    </script>

### seriesDefaults.tooltip.color `String`

The text color of the tooltip. The default is the same as the series labels color.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        seriesDefaults: {
            tooltip: {
                visible: true,
                color: "#ff0000"
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ],
        }]
    });
    </script>

### seriesDefaults.tooltip.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

 The tooltip font.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        seriesDefaults: {
            tooltip: {
                visible: true,
                font: "16px Arial"
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ],
        }]
    });
    </script>

### seriesDefaults.tooltip.format `String`

The tooltip format.

#### Example

```pseudo
    //sets format of the tooltip
    format: "C"
```

### seriesDefaults.tooltip.padding `Number|Object`

The padding of the tooltip.

#### Example

```pseudo
    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // right and bottom padding are left at their default values
    padding: { top: 1, left: 1 }
```

### seriesDefaults.tooltip.template `String|Function`

The tooltip template.
Template variables:

*   **value** - the point value
*   **category** - the category name
*   **series** - the data series
*   **dataItem** - the original data item used to construct the point.
        Will be null if binding to array.

#### Example

```pseudo
    $("#chart").kendoChart({
         title: {
             text: "My Chart Title"
         },
         seriesDefaults: {
             tooltip: {
                 visible: true,
                 template: "#= category # - #= value #"
             }
         },
         series: [
             {
                 name: "Series 1",
                 data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ],
             }
         ],
         categoryAxis: {
             categories: [2000, 2001, 2002, 2003]
         }
    });
```

### seriesDefaults.tooltip.visible `Boolean`*(default: false)*

 A value indicating if the tooltip should be displayed.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        seriesDefaults: {
            tooltip: {
                visible: true
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ],
        }]
    });
    </script>

### subtitle `Object|String`

The chart subtitle configuration options or text.

#### Example - set the chart title and subtitle as a string
    <div id="chart"></div>
    <script>
    $("#chart").kendoStockChart({
      title: "Title",
      subtitle: "Subtitle"
    });
    </script>

#### Example - configure the chart title and subtitle
    <div id="chart"></div>
    <script>
    $("#chart").kendoStockChart({
      title: {
        text: "Title",
        align: "left"
      },
      subtitle: {
        text: "Subtitle",
        align: "left"
      }
    });
    </script>

### subtitle.align `String`

The alignment of the subtitle.

* "center" - the text is aligned to the middle.
* "left" - the text is aligned to the left.
* "right" - the text is aligned to the right.

By default, the subtitle has the same alignment as the title.

#### Example - configure the chart title and subtitle alignment
    <div id="chart"></div>
    <script>
    $("#chart").kendoStockChart({
      title: {
        text: "Title",
        align: "left"
      },
      subtitle: {
        text: "Subtitle",
        align: "left"
      }
    });
    </script>

### subtitle.background `String` *(default: "white")*

The background color of the subtitle. Accepts a valid CSS color string, including hex and rgb.

#### Example - configure the chart subtitle alignment
    <div id="chart"></div>
    <script>
    $("#chart").kendoStockChart({
      title: {
        text: "Title"
      },
      subtitle: {
        text: "Subtitle",
        background: "green"
      }
    });
    </script>

### subtitle.border `Object`

The border of the subtitle.

#### Example - set the chart subtitle border

    <div id="chart"></div>
    <script>
    $("#chart").kendoStockChart({
      title: {
        text: "Title"
      },
      subtitle: {
        text: "Subtitle",
        border: {
          color: "green",
          width: 2
        }
      }
    });
    </script>

### subtitle.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the chart subtitle border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoStockChart({
      title: {
        text: "Title"
      },
      subtitle: {
        text: "Subtitle",
        border: {
          color: "green",
          width: 2
        }
      }
    });
    </script>

### subtitle.border.dashType `String` *(default: "solid")*

The dash type of the chart subtitle border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the chart subtitle border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoStockChart({
      title: {
        text: "Title"
      },
      subtitle: {
        text: "Subtitle",
        border: {
          dashType: "dashDot",
          width: 2
        }
      }
    });
    </script>

### subtitle.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the chart subtitle border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoStockChart({
      title: {
        text: "Title"
      },
      subtitle: {
        text: "Subtitle",
        border: {
          width: 2
        }
      }
    });
    </script>

### subtitle.color `String`

The text color of the subtitle. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the subtitle color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoStockChart({
      title: {
        text: "Chart Title"
      },
      subtitle: {
        text: "Chart Subtitle",
        color: "#aa00bb"
      }
    });
    </script>

### subtitle.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font of the title.

#### Example - set the chart title and subtitle font

    <div id="chart"></div>
    <script>
    $("#chart").kendoStockChart({
      title: {
        text: "Title"
      },
      subtitle: {
        text: "Title",
        font: "20px sans-serif"
      }
    });
    </script>

### subtitle.margin `Number|Object` *(default: 5)*

The margin of the subtitle. A numeric value will set all margins.

#### Example - set the chart subtitle margin as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoStockChart({
      title: {
        text: "Title"
      },
      subtitle: {
        text: "Subtitle",
        margin: 10
      }
    });
    </script>

### subtitle.margin.bottom `Number` *(default: 0)*

The bottom margin of the subtitle.

#### Example - set the chart subtitle bottom margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoStockChart({
      title: {
        text: "Title"
      },
      subtitle: {
        text: "Subtitle",
        margin: {
          bottom: 10
        }
      }
    });
    </script>

### subtitle.margin.left `Number` *(default: 0)*

The left margin of the subtitle.

#### Example - set the chart subtitle left margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoStockChart({
      title: {
        text: "Title",
        margin: {
          left: 10
        }
      },
      subtitle: {
        text: "Subtitle"
      }
    });
    </script>

### subtitle.margin.right `Number` *(default: 0)*

The right margin of the subtitle.

#### Example - set the chart series subtitle right margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoStockChart({
      title: {
        text: "Title"
      },
      subtitle: {
        text: "Title",
        margin: {
          right: 10
        }
      }
    });
    </script>

### subtitle.margin.top `Number` *(default: 0)*

The top margin of the subtitle.

#### Example - set the chart subtitle top margin

    <div id="chart"></div>
    <script>
    $("#chart").kendoStockChart({
      title: {
        text: "Title"
      },
      subtitle: {
        text: "Subtitle",
        margin: {
          top: 10
        }
      }
    });
    </script>

### subtitle.padding `Number|Object` *(default: 5)*

The padding of the subtitle. A numeric value will set all margins.

#### Example - set the chart subtitle padding as a number

    <div id="chart"></div>
    <script>
    $("#chart").kendoStockChart({
      title: {
        text: "Title"
      },
      subtitle: {
        text: "Subtitle",
        padding: 10
      }
    });
    </script>

### subtitle.padding.bottom `Number` *(default: 0)*

The bottom padding of the subtitle.

#### Example - set the chart subtitle bottom padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoStockChart({
      title: {
        text: "Title"
      },
      subtitle: {
        text: "Title",
        padding: {
          bottom: 10
        }
      }
    });
    </script>

### subtitle.padding.left `Number` *(default: 0)*

The left padding of the subtitle.

#### Example - set the chart subtitle left padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoStockChart({
      title: {
        text: "Title"
      },
      subtitle: {
        text: "Subtitle",
        padding: {
          left: 10
        }
      }
    });
    </script>

### subtitle.padding.right `Number` *(default: 0)*

The right padding of the subtitle.

#### Example - set the chart subtitle right padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoStockChart({
      title: {
        text: "Title"
      },
      subtitle: {
        text: "Title",
        padding: {
          right: 10
        }
      }
    });
    </script>

### subtitle.padding.top `Number` *(default: 0)*

The top padding of the subtitle.

#### Example - set the chart subtitle top padding

    <div id="chart"></div>
    <script>
    $("#chart").kendoStockChart({
      title: {
        text: "Title"
      },
      subtitle: {
        text: "Subtitle",
        padding: {
          top: 10
        }
      }
    });
    </script>

### subtitle.position `String` *(default: "top")*

The position of the subtitle.

* "bottom" - the title is positioned on the bottom.
* "top" - the title is positioned on the top.

By default, the subtitle is placed in the same position as the title.

#### Example - set the chart subtitle position

    <div id="chart"></div>
    <script>
    $("#chart").kendoStockChart({
      title: {
        text: "Title",
        position: "bottom"
      },
      subtitle: {
        text: "Subtitle",
        position: "bottom"
      }
    });
    </script>

### subtitle.text `String`

The text of the chart subtitle. You can also set the text directly for a title with default options.

> The text can be split into multiple lines by using line feed characters ("\n").

#### Example - set the chart subtitle text

    <div id="chart"></div>
    <script>
    $("#chart").kendoStockChart({
      title: {
        text: "Title"
      },
      subtitle: {
        text: "Subtitle",
        position: "bottom"
      }
    });
    </script>

### subtitle.visible `Boolean` *(default: true)*

If set to `true` the chart will display the subtitle. By default the subtitle will be displayed.

#### Example - hide the subtitle

    <div id="chart"></div>
    <script>
    $("#chart").kendoStockChart({
      title: {
        text: "Title",
        visible: false
      },
      subtitle: {
        text: "Subtitle",
        visible: false
      }
    });
    </script>

### theme `String`

The chart theme. This can be either a built-in theme or "sass".
When set to "sass" the chart will read the variables from the [Sass-based themes]({% slug sassbasedthemes_kendoui %}).

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        theme: "bootstrap",
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ],
        }]
    });
    </script>

The supported values are:

* "sass" - special value, see notes
* "black"
* "blueopal"
* "bootstrap"
* "default"
* "highcontrast"
* "metro"
* "metroblack"
* "moonlight"
* "silver"
* "uniform"

### title `Object`, `String`

The chart title configuration options or text.

#### Example
    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        title: "Stock Chart Title",
        series: [{
            type: "line",
             data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ],
        }]
    });
    </script>

### title.align `String`*(default: "center")*

 The alignment of the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        title: {
            text: "Stock Chart Title",
            align: "left"
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ],
        }]
    });
    </script>

#### *"left"*

The text is aligned to the left.

#### *"center"*

The text is aligned to the middle.

#### *"right"*

The text is aligned to the right.

### title.background `String`*(default: "white")*

 The background color of the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        title: {
            text: "Stock Chart Title",
            background: "#ff0000"
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ],
        }]
    });
    </script>

### title.border `Object`

The border of the title.

#### Example

```pseudo
    $("#chart").kendoChart({
        // set border options on the title
        title: {
            border: {
                // set the border color to a dark blue
                color: "#336699",
                // set the width of the border to 2 pixels
                width: 2,
                // set the border style to long dashes
                dashType: "longDash"
            }
        }
    });
```

### title.border.color `String`*(default: "black")*

 The color of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        title: {
            text: "Stock Chart Title",
            border: {
                color: "#ff0000"
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ],
        }]
    });
    </script>

### title.border.dashType `String`*(default: "solid")*

 The dash type of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        title: {
            text: "Stock Chart Title",
            border: {
                dashType: "dash"
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ],
        }]
    });
    </script>


#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### title.border.width `Number`*(default: 0)*

 The width of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        title: {
            text: "Stock Chart Title",
            border: {
                width: 3
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ],
        }]
    });
    </script>

### title.font `String`*(default: "16px Arial,Helvetica,sans-serif")*

 The font of the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        title: {
            text: "Stock Chart Title",
            font: "20px Arial"
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ],
        }]
    });
    </script>

### title.color `String`

The text color of the title. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        title: {
            text: "Stock Chart Title",
            color: "#ff0000"
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ],
        }]
    });
    </script>

### title.description `String`

The accessible description of the Chart. The description is announced by screen readers when the Chart is focused.

#### Example - set the chart description

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
      title: {
        text: "Stock Chart",
        description: "A sample stock chart with mock data"
      },
      dataSource: {
        data: [
          { value: 1, date: new Date(2012, 1, 1)},
          { value: 2, date: new Date(2012, 1, 2)}
        ]
      },
      dateField: "date",
      series: [
        {
          field: "value",
          name: "Value"
        }
      ]
    });
    </script>

### title.margin `Number | Object`*(default: 5)*

 The margin of the title.

#### Example

```pseudo
    $("#chart").kendoChart({
        // sets the top, right, bottom and left margin to 3px.
        title: {
            margin: 3
        },
        //...
    });
    //
    $("#chart").kendoChart({
        // sets the top and left margin to 1px
        // margin right and bottom are with 5px (by default)
        title: {
            margin: { top: 1, left: 1 }
        },
        //...
    });
```

### title.padding `Number | Object`*(default: 5)*

 The padding of the title.

#### Example

```pseudo
    $("#chart").kendoChart({
        // sets the top, right, bottom and left padding to 3px.
        title: {
            padding: 3
        },
        //...
    });

    $("#chart").kendoChart({
        // sets the top and left padding to 1px
        // padding right and bottom are with 5px (by default)
        title: {
            padding: { top: 1, left: 1 }
        },
        //...
    });
```

### title.position `String`*(default: "top")*

 The position of the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        title: {
            text: "Stock Price",
            position: "bottom"
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

#### *"top"*

The title is positioned on the top.

#### *"bottom"*

The title is positioned on the bottom.

### title.text `String`

The title of the chart. You can also set the text directly for a title with default options.

#### Example

```pseudo
    $("#chart ").kendoChart({
        title: {
            text: "Sales data"
        },
        //...
    });

    $("#chart ").kendoChart({
        title: "Sales data",
        //...
    });
```

### title.visible `Boolean`*(default: false)*

 The visibility of the title.

#### Example

```pseudo
    $("#chart ").kendoChart({
        title: {
            // hides the title
            visible: false
        },
        //...
    });
```

### tooltip `Object`

The data point tooltip configuration options.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        tooltip: {
            visible: true
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ]
        }]
    });
    </script>

### tooltip.background `String`

The background color of the tooltip. The default is determined from the series color.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        tooltip: {
            visible: true,
            background: "#ff0000"
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ]
        }]
    });
    </script>

### tooltip.border `Object`

The border configuration options.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        tooltip: {
            visible: true,
            border: {
                color: "#ff0000",
                width: 2
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ]
        }]
    });
    </script>

### tooltip.border.color `String`*(default: "black")*

 The color of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        tooltip: {
            visible: true,
            border: {
                color: "#ff0000"
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ]
        }]
    });
    </script>

### tooltip.border.width `Number`*(default: 0)*

 The width of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        tooltip: {
            visible: true,
            border: {
                width: 3
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ]
        }]
    });
    </script>

### tooltip.color `String`

The text color of the tooltip. The default is the same as the series labels color.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        tooltip: {
            visible: true,
            color: "#ff0000"
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ]
        }]
    });
    </script>

### tooltip.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

 The tooltip font.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        tooltip: {
            visible: true,
            font: "16px Arial"
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ]
        }]
    });
    </script>

### tooltip.format `String`

The tooltip format.

#### Example

```pseudo
    //sets format of the tooltip
    format: "C"
```

### tooltip.padding `Number|Object`

The padding of the tooltip.

#### Example

```pseudo
    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // right and bottom padding are left at their default values
    padding: { top: 1, left: 1 }
```

### tooltip.template `String|Function`

The tooltip template.
Template variables:


*   **value** - the point value
*   **category** - the category name
*   **series** - the data series
*   **dataItem** - the original data item used to construct the point.
        Will be null if binding to array.

#### Example

    <div id="chart"></div>
    <script>
    $("#chart").kendoStockChart({
         title: {
             text: "My Chart Title"
         },
         series: [{
             name: "Series 1",
             data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ],
         }],
         categoryAxis: {
             categories: [2000, 2001, 2002, 2003]
         },
         tooltip: {
             visible: true,
             template: "#= category # - #= value #"
         }
    });
    </script>

### tooltip.visible `Boolean`*(default: false)*

A value indicating if the tooltip should be displayed.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        tooltip: {
            visible: true
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ]
        }]
    });
    </script>

### tooltip.shared `Boolean`*(default: false)*

A value indicating if the tooltip should be shared.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        tooltip: {
            visible: true,
            shared: true
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ],
        }, {
            type: "line",
            data: [
                { date: new Date(2023, 0, 4), value: 30 },
                { date: new Date(2023, 0, 5), value: 25 },
                { date: new Date(2023, 0, 6), value: 40 }
            ],
        }]
    });
    </script>

### tooltip.sharedTemplate `String`

The shared tooltip template.
Template variables:

*   **points** - the category points
*   **category** - the category name

#### Example

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
         title: {
             text: "Internet Users"
         },
         series: [{
             name: "United States",
             data: [67.96, 68.93, 75, 74, 78]
         }, {
             name: "World",
             data: [15.7, 16.7, 20, 23.5, 26.6]
         }],
         categoryAxis: {
             categories: [2005, 2006, 2007, 2008, 2009]
         },
         tooltip: {
             visible: true,
             shared: true,
             sharedTemplate:
                "#= category # </br>" +
                "# for (var i = 0; i < points.length; i++) { #" +
                    "#= points[i].series.name #: #= points[i].value # </br>" +
                "# } #"
         }
    });
    </script>

### transitions `Boolean`*(default: true)*

A value indicating if transition animations should be played.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        transitions: false,
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ]
        }]
    });
    </script>

### valueAxis `Array`

The value axis configuration options.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        valueAxis: {
            min: 0,
            max: 100,
            title: {
                text: "Value"
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ]
        }]
    });
    </script>

### valueAxis.axisCrossingValue `Object | Date | Array`

Value at which the category axis crosses this axis. (Only for object)

Value indicies at which the category axes cross the value axis. (Only for array)

Date at which the category axis crosses this axis. (Only for date)

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        valueAxis: {
            axisCrossingValue: 10
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ]
        }]
    });
    </script>

### valueAxis.background `String`

The background color of the axis.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        valueAxis: {
            background: "#ff0000"
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ]
        }]
    });
    </script>

### valueAxis.color `String`

Color to apply to all axis elements.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        valueAxis: {
            color: "#ff0000"
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ]
        }]
    });
    </script>

Individual color settings for line and labels take priority. Any valid CSS color string will work here, including hex and rgb.

### valueAxis.labels `Object`

Configures the axis labels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        valueAxis: {
            labels: {
                background: "#ff0000",
                color: "#ffffff"
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ]
        }]
    });
    </script>

### valueAxis.labels.background `String`

The background color of the labels. Any valid CSS color string will work here, including
hex and rgb

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        valueAxis: {
            labels: {
                background: "#ff0000"
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ]
        }]
    });
    </script>

### valueAxis.labels.border `Object`

The border of the labels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        valueAxis: {
            labels: {
                border: {
                    color: "#ff0000",
                    width: 2
                }
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ]
        }]
    });
    </script>

### valueAxis.labels.border.color `String`*(default: "black")*

The color of the border. Any valid CSS color string will work here, including
hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        valueAxis: {
            labels: {
                border: {
                    color: "#ff0000"
                }
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ]
        }]
    });
    </script>

### valueAxis.labels.border.dashType `String`*(default: "solid")*

The dash type of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        valueAxis: {
            labels: {
                border: {
                    dashType: "dash"
                }
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ]
        }]
    });
    </script>

#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### valueAxis.labels.border.width `Number`*(default: 0)*

The width of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        valueAxis: {
            labels: {
                border: {
                    width: 3
                }
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ]
        }]
    });
    </script>

### valueAxis.labels.color `String`

The text color of the labels. Any valid CSS color string will work here, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        valueAxis: {
            labels: {
                color: "#ff0000"
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ]
        }]
    });
    </script>

### valueAxis.labels.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        valueAxis: {
            labels: {
                font: "16px Arial"
            }
        },
        series: [{
            type: "line",
            data: [
                { date: new Date(2023, 0, 1), value: 10 },
                { date: new Date(2023, 0, 2), value: 20 },
                { date: new Date(2023, 0, 3), value: 15 }
            ]
        }]
    });
    </script>

### valueAxis.labels.format `String`

The format of the labels.

#### Example

```pseudo
    $("#chart").kendoChart({
        valueAxis: {
           labels: {
               // set the format to currency
               format: "C"
           }
        },
        //...
    });
```

### valueAxis.labels.margin `Number|Object`*(default: 0)*

The margin of the labels.

#### Example

```pseudo
    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and left margin to 1px
    // margin right and bottom are with 0px (by default)
    margin: { top: 1, left: 1 }
```

### valueAxis.labels.mirror `Boolean`

Mirrors the axis labels and ticks.
If the labels are normally on the left side of the axis,
mirroring the axis will render them to the right.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            labels: {
                mirror: true
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.labels.padding `Number | Object`*(default: 0)*

The padding of the labels.

#### Example

```pseudo
    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // padding right and bottom are with 0px (by default)
    padding: { top: 1, left: 1 }
```

### valueAxis.labels.rotation `Number`*(default: 0)*

The rotation angle of the labels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            labels: {
                rotation: 45
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.labels.skip `Number`*(default: 1)*

Number of labels to skip.
Skips rendering the first n labels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 },
                { date: "2012/01/03", open: 15, high: 20, low: 12, close: 18, volume: 1500 }
            ]
        },
        dateField: "date",
        valueAxis: {
            labels: {
                skip: 2
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.labels.step `Number`*(default: 1)*

Label rendering step.
Every n-th label is rendered where n is the step

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 },
                { date: "2012/01/03", open: 15, high: 20, low: 12, close: 18, volume: 1500 },
                { date: "2012/01/04", open: 18, high: 22, low: 16, close: 20, volume: 1800 }
            ]
        },
        dateField: "date",
        valueAxis: {
            labels: {
                step: 2
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.labels.template `String | Function`

The label template.
Template variables:

*   **value** - the value

#### Example

    <div id="chart"></div>
    <script>
    // chart initialization
    $("#chart").kendoChart({
         title: {
             text: "My Chart Title"
         },
         series: [
             {
                 name: "Series 1",
                 data: [200, 450, 300, 125]
             }
         ],
         categoryAxis: {
             categories: [2000, 2001, 2002, 2003]
         },
         valueAxis: {
             labels: {
                 // labels template
                 template: "#= value #%"
             }
         }
    });
    </script>

### valueAxis.labels.visible `Boolean`*(default: true)*

The visibility of the labels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            labels: {
                visible: false
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.line `Object`

Configures the axis line. This will also affect the major and minor ticks, but not the grid lines.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            line: {
                color: "red",
                width: 3,
                dashType: "dash"
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.line.color `String`*(default: "black")*

The color of the line. This will also effect the major and minor ticks, but
not the grid lines.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            line: {
                color: "blue"
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.line.dashType `String`*(default: "solid")*

The dash type of the line.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            line: {
                dashType: "dash"
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### valueAxis.line.visible `Boolean`*(default: true)*

The visibility of the line.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            line: {
                visible: false
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.line.width `Number`*(default: 1)*

The width of the line. This will also effect the major and minor ticks, but
not the grid lines.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            line: {
                width: 3
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.majorGridLines `Object`

Configures the major grid lines. These are the lines that are an extension of the major ticks through the
body of the chart.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            majorGridLines: {
                color: "green",
                width: 2,
                visible: true
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.majorGridLines.color `String`*(default: "black")*

The color of the lines.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            majorGridLines: {
                color: "red"
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.majorGridLines.visible `Boolean`*(default: true)*

The visibility of the lines.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            majorGridLines: {
                visible: false
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.majorGridLines.width `Number`*(default: 1)*

The width of the lines.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            majorGridLines: {
                width: 3
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.majorGridLines.step `Number` *(default: 1)*

The step of the value axis major grid lines.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 },
                { date: "2012/01/03", open: 15, high: 20, low: 12, close: 18, volume: 1500 }
            ]
        },
        dateField: "date",
        valueAxis: {
            majorGridLines: {
                step: 2
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.majorGridLines.skip `Number` *(default: 0)*

The skip of the value axis major grid lines.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 },
                { date: "2012/01/03", open: 15, high: 20, low: 12, close: 18, volume: 1500 }
            ]
        },
        dateField: "date",
        valueAxis: {
            majorGridLines: {
                skip: 1
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.majorTicks `Object`

The major ticks of the axis.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            majorTicks: {
                size: 10,
                color: "blue",
                width: 2,
                visible: true
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.majorTicks.size `Number`*(default: 4)*

The axis major tick size. This is the length of the line in pixels that is drawn to indicate the tick on the chart.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            majorTicks: {
                size: 8
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.majorTicks.visible `Boolean`*(default: true)*

The visibility of the major ticks.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            majorTicks: {
                visible: false
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.majorTicks.color `String` *(default: "black")*

The color of the value axis major ticks lines. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            majorTicks: {
                color: "red"
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.majorTicks.width `Number` *(default: 1)*

The width of the major ticks in pixels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            majorTicks: {
                width: 3
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.majorTicks.step `Number` *(default: 1)*

The step of the value axis major ticks.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 },
                { date: "2012/01/03", open: 15, high: 20, low: 12, close: 18, volume: 1500 }
            ]
        },
        dateField: "date",
        valueAxis: {
            majorTicks: {
                step: 2
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.majorTicks.skip `Number` *(default: 0)*

The skip of the value axis major ticks.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 },
                { date: "2012/01/03", open: 15, high: 20, low: 12, close: 18, volume: 1500 }
            ]
        },
        dateField: "date",
        valueAxis: {
            majorTicks: {
                skip: 1
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.majorUnit `Number`

The interval between major divisions.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            majorUnit: 5
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.max `Number`*(default: 1)*

The maximum value of the axis.
This is often used in combination with the **min** configuration option.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            max: 25
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.min `Number`*(default: 0)*

The minimum value of the axis.
This is often used in combination with the **max** configuration option.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            min: 5
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.minorGridLines `Object`

Configures the minor grid lines.  These are the lines that are an extension of the minor ticks through the
body of the chart.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            minorGridLines: {
                visible: true,
                color: "lightgray",
                width: 1
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.minorGridLines.color `String`*(default: "black")*

The color of the lines.

Note that this has no effect if the visibility of the minor grid lines is not set to **true**.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            minorGridLines: {
                visible: true,
                color: "red"
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.minorGridLines.dashType `String`*(default: "solid")*

The dash type of the minor grid lines.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), open: 100, high: 110, low: 95, close: 105 },
                { date: new Date("2023/1/2"), open: 105, high: 115, low: 100, close: 110 }
            ]
        },
        dateField: "date",
        valueAxis: {
            minorGridLines: {
                dashType: "dot",
                visible: true
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.
body of the chart.

Note that minor grid lines are not visible by default, therefore none of these settings will take effect without the minor grid lines visibility being set to **true**.

### valueAxis.minorGridLines.visible `Boolean`*(default: false)*

The visibility of the lines.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            minorGridLines: {
                visible: true
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.minorGridLines.width `Number`*(default: 1)*

The width of the lines.

Note that this settings has no effect if the visibility of the minor grid lines is not set to **true**.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            minorGridLines: {
                visible: true,
                width: 2
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.minorGridLines.step `Number` *(default: 1)*

The step of the value axis minor grid lines.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 },
                { date: "2012/01/03", open: 15, high: 20, low: 12, close: 18, volume: 1500 }
            ]
        },
        dateField: "date",
        valueAxis: {
            minorGridLines: {
                visible: true,
                step: 2
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.minorGridLines.skip `Number` *(default: 0)*

The skip of the value axis minor grid lines.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 },
                { date: "2012/01/03", open: 15, high: 20, low: 12, close: 18, volume: 1500 }
            ]
        },
        dateField: "date",
        valueAxis: {
            minorGridLines: {
                visible: true,
                skip: 1
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.minorTicks `Object`

The minor ticks of the axis.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            minorTicks: {
                visible: true,
                size: 5,
                color: "blue",
                width: 2
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.minorTicks.size `Number`*(default: 3)*

The axis minor tick size. This is the length of the line in pixels that is drawn to indicate the tick on the chart.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            minorTicks: {
                visible: true,
                size: 6
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.minorTicks.color `String` *(default: "black")*

The color of the value axis minor ticks lines. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            minorTicks: {
                visible: true,
                color: "green"
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.minorTicks.width `Number` *(default: 1)*

The width of the minor ticks in pixels.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            minorTicks: {
                visible: true,
                width: 3
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.minorTicks.visible `Boolean`*(default: false)*

The visibility of the minor ticks.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            minorTicks: {
                visible: true
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.minorTicks.step `Number` *(default: 1)*

The step of the value axis minor ticks.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 },
                { date: "2012/01/03", open: 15, high: 20, low: 12, close: 18, volume: 1500 }
            ]
        },
        dateField: "date",
        valueAxis: {
            minorTicks: {
                visible: true,
                step: 2
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.minorTicks.skip `Number` *(default: 0)*

The skip of the value axis minor ticks.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 },
                { date: "2012/01/03", open: 15, high: 20, low: 12, close: 18, volume: 1500 }
            ]
        },
        dateField: "date",
        valueAxis: {
            minorTicks: {
                visible: true,
                skip: 1
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.minorUnit `Number`

The interval between minor divisions.
It defaults to 1/5th of the majorUnit.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            minorUnit: 2
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.name `Object`*(default: "primary")*

The unique axis name.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            name: "stockValue"
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.narrowRange `Boolean`*(default: false)*

Prevents the automatic axis range from snapping to 0.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            narrowRange: true
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.pane `String`

The name of the pane that the axis should be rendered in.
The axis will be rendered in the first (default) pane if not set.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        panes: [
            { name: "topPane" },
            { name: "bottomPane" }
        ],
        valueAxis: {
            pane: "topPane"
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.plotBands `Array`

The plot bands of the value axis.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            plotBands: [{
                from: 11,
                to: 14,
                color: "lightblue",
                opacity: 0.5
            }]
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.plotBands.from `Number`

The start position of the plot band in axis units.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            plotBands: [{
                from: 10
            }]
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.plotBands.to `Number`

The end position of the plot band in axis units.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            plotBands: [{
                to: 15
            }]
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.plotBands.color `String`

The color of the plot band.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            plotBands: [{
                from: 11,
                to: 14,
                color: "yellow"
            }]
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.plotBands.opacity `Number`

The opacity of the plot band.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            plotBands: [{
                from: 11,
                to: 14,
                color: "red",
                opacity: 0.3
            }]
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.reverse `Boolean`*(default: false)*

Reverses the axis direction -
values increase from right to left and from top to bottom.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            reverse: true
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.title `Object`

The title of the value axis.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            title: {
                text: "Price",
                color: "blue"
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.title.background `String`

The background color of the title. Any valid CSS color string will work here, including
hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            title: {
                text: "Price",
                background: "lightgray"
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.title.border `Object`

The border of the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            title: {
                text: "Price",
                border: {
                    color: "blue",
                    width: 2
                }
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.title.border.color `String`*(default: "black")*

The color of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            title: {
                text: "Price",
                border: {
                    color: "red"
                }
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.title.border.dashType `String`*(default: "solid")*

The dash type of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), open: 100, high: 110, low: 95, close: 105 },
                { date: new Date("2023/1/2"), open: 105, high: 115, low: 100, close: 110 }
            ]
        },
        dateField: "date",
        valueAxis: {
            title: {
                text: "Price",
                border: {
                    dashType: "dot",
                    color: "blue",
                    width: 2
                }
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### valueAxis.title.border.width `Number`*(default: 0)*

The width of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            title: {
                text: "Price",
                border: {
                    width: 3
                }
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.title.color `String`

The text color of the title. Any valid CSS color string will work here, including hex and rgb.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            title: {
                text: "Price",
                color: "green"
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.title.font `String`*(default: "16px Arial,Helvetica,sans-serif")*

The font style of the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            title: {
                text: "Price",
                font: "bold 18px Arial"
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.title.margin `Number | Object`*(default: 5)*

The margin of the title.

#### Example

```pseudo
    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and left margin to 1px
    // margin right and bottom are with 0px (by default)
    margin: { top: 1, left: 1 }
```

### valueAxis.title.padding `Number | Object`*(default: 0)*

The padding of the title.

#### Example

```pseudo
    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // padding right and bottom are with 0px (by default)
    padding: { top: 1, left: 1 }
```

### valueAxis.title.position `String`*(default: "center")*

The position of the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            title: {
                text: "Price",
                position: "top"
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

#### *"top"*

The axis title is positioned on the top (applicable to vertical axis).

#### *"bottom"*

The axis title is positioned on the bottom (applicable to vertical axis).

#### *"left"*

The axis title is positioned on the left (applicable to horizontal axis).

#### *"right"*

"The axis title is positioned on the right (applicable to horizontal axis).

#### *"center"*

"The axis title is positioned in the center.

### valueAxis.title.rotation `Number`*(default: 0)*

The rotation angle of the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            title: {
                text: "Price",
                rotation: 90
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.title.text `String`

The text of the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            title: {
                text: "Stock Price ($)"
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.title.visible `Boolean`*(default: true)*

The visibility of the title.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            title: {
                text: "Price",
                visible: false
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.visible `Boolean`*(default: true)*

The visibility of the axis.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            visible: false
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.crosshair `Object`

The crosshair configuration options.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        valueAxis: {
            crosshair: {
                visible: true,
                color: "red",
                width: 2
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.crosshair.color `String`

The color of the crosshair.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), open: 100, high: 110, low: 95, close: 105 },
                { date: new Date("2023/1/2"), open: 105, high: 115, low: 100, close: 110 }
            ]
        },
        dateField: "date",
        valueAxis: {
            crosshair: {
                visible: true,
                color: "red"
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.crosshair.width `Number`

The width of the crosshair.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), open: 100, high: 110, low: 95, close: 105 },
                { date: new Date("2023/1/2"), open: 105, high: 115, low: 100, close: 110 }
            ]
        },
        dateField: "date",
        valueAxis: {
            crosshair: {
                visible: true,
                width: 3
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.crosshair.opacity `Number`

The opacity of the crosshair.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), open: 100, high: 110, low: 95, close: 105 },
                { date: new Date("2023/1/2"), open: 105, high: 115, low: 100, close: 110 }
            ]
        },
        dateField: "date",
        valueAxis: {
            crosshair: {
                visible: true,
                opacity: 0.7
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.crosshair.dashType `Number`

The dash type of the crosshair.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), open: 100, high: 110, low: 95, close: 105 },
                { date: new Date("2023/1/2"), open: 105, high: 115, low: 100, close: 110 }
            ]
        },
        dateField: "date",
        valueAxis: {
            crosshair: {
                visible: true,
                dashType: "dot"
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.crosshair.visible `Boolean`*(default: false)*

The dash type of the crosshair.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), open: 100, high: 110, low: 95, close: 105 },
                { date: new Date("2023/1/2"), open: 105, high: 115, low: 100, close: 110 }
            ]
        },
        dateField: "date",
        valueAxis: {
            crosshair: {
                visible: true
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.crosshair.tooltip `Object`

The crosshair tooltip configuration options.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), open: 100, high: 110, low: 95, close: 105 },
                { date: new Date("2023/1/2"), open: 105, high: 115, low: 100, close: 110 }
            ]
        },
        dateField: "date",
        valueAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true,
                    color: "white",
                    background: "black"
                }
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.crosshair.tooltip.background `String`

The background color of the tooltip.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), open: 100, high: 110, low: 95, close: 105 },
                { date: new Date("2023/1/2"), open: 105, high: 115, low: 100, close: 110 }
            ]
        },
        dateField: "date",
        valueAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true,
                    background: "lightblue"
                }
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.crosshair.tooltip.border `Object`

The border configuration options.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), open: 100, high: 110, low: 95, close: 105 },
                { date: new Date("2023/1/2"), open: 105, high: 115, low: 100, close: 110 }
            ]
        },
        dateField: "date",
        valueAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true,
                    border: {
                        color: "red",
                        width: 2
                    }
                }
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.crosshair.tooltip.border.color `String`*(default: "black")*

The color of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), open: 100, high: 110, low: 95, close: 105 },
                { date: new Date("2023/1/2"), open: 105, high: 115, low: 100, close: 110 }
            ]
        },
        dateField: "date",
        valueAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true,
                    border: {
                        color: "blue"
                    }
                }
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.crosshair.tooltip.border.width `Number`*(default: 0)*

The width of the border.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), open: 100, high: 110, low: 95, close: 105 },
                { date: new Date("2023/1/2"), open: 105, high: 115, low: 100, close: 110 }
            ]
        },
        dateField: "date",
        valueAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true,
                    border: {
                        width: 3
                    }
                }
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.crosshair.tooltip.color `String`

The text color of the tooltip.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), open: 100, high: 110, low: 95, close: 105 },
                { date: new Date("2023/1/2"), open: 105, high: 115, low: 100, close: 110 }
            ]
        },
        dateField: "date",
        valueAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true,
                    color: "white"
                }
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.crosshair.tooltip.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The tooltip font.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), open: 100, high: 110, low: 95, close: 105 },
                { date: new Date("2023/1/2"), open: 105, high: 115, low: 100, close: 110 }
            ]
        },
        dateField: "date",
        valueAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true,
                    font: "16px Arial"
                }
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.crosshair.tooltip.format `String`

The tooltip format.

#### Example

```pseudo
    //sets format of the tooltip
    format: "C"
```

### valueAxis.crosshair.tooltip.padding `Number|Object`

The padding of the tooltip.

#### Example

```pseudo
    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // right and bottom padding are left at their default values
    padding: { top: 1, left: 1 }
```

### valueAxis.crosshair.tooltip.template `String|Function`

The tooltip template.
Template variables:

*   **value** - the point value (either a number or an object)

#### Example

    <div id="chart"></div>
    <script>
    // chart initialization
    $("#chart").kendoChart({
         title: {
             text: "My Chart Title"
         },
         series: [{
                 name: "Series 1",
                 data: [200, 450, 300, 125]
         }],
         categoryAxis: {
             categories: [2000, 2001, 2002, 2003]
         },
         valueAxis: {
             crosshair: {
                 visible: true,
                 tooltip: {
                     visible: true,
                     template: "value: #= value #"
                 }
             }
         }
    });
    </script>

### valueAxis.crosshair.tooltip.visible `Boolean`*(default: false)*

A value indicating if the tooltip should be displayed.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), open: 100, high: 110, low: 95, close: 105 },
                { date: new Date("2023/1/2"), open: 105, high: 115, low: 100, close: 110 }
            ]
        },
        dateField: "date",
        valueAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true
                }
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.notes `Object`

The value axis notes configuration.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), open: 100, high: 110, low: 95, close: 105 },
                { date: new Date("2023/1/2"), open: 105, high: 115, low: 100, close: 110 }
            ]
        },
        dateField: "date",
        valueAxis: {
            notes: {
                position: "left",
                data: [{
                    value: 105,
                    label: { text: "Important level" }
                }]
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.notes.position `String`

The position of the value axis note.

* "top" - The note is positioned on the top.
* "bottom" - The note is positioned on the bottom.
* "left" - The note is positioned on the left.
* "right" - The note is positioned on the right.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), open: 100, high: 110, low: 95, close: 105 },
                { date: new Date("2023/1/2"), open: 105, high: 115, low: 100, close: 110 }
            ]
        },
        dateField: "date",
        valueAxis: {
            notes: {
                position: "right",
                data: [{
                    value: 105,
                    label: { text: "Important level" }
                }]
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.notes.icon `Object`

The icon of the notes.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), open: 100, high: 110, low: 95, close: 105 },
                { date: new Date("2023/1/2"), open: 105, high: 115, low: 100, close: 110 }
            ]
        },
        dateField: "date",
        valueAxis: {
            notes: {
                data: [{
                    value: 105,
                    icon: {
                        background: "red",
                        type: "circle",
                        size: 10,
                        visible: true
                    }
                }]
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.notes.icon.background `String`

The background color of the notes icon.

#### Example - set the value axis notes icon background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          icon: {
            background: "red"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.icon.border `Object`

The border of the icon.

#### Example - set the value axis notes icon border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          icon: {
            border: {
              width: 2,
              color: "red"
            }
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.icon.border.color `String`

The border color of the icon.

#### Example - set the value axis notes icon border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          icon: {
            border: {
              width: 2,
              color: "red"
            }
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.icon.border.width `Number`

The border width of the icon.

#### Example - set the value axis notes icon border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          icon: {
            border: {
              width: 2,
              color: "red"
            }
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.icon.size `Number`

The size of the icon.

#### Example - set the value axis notes icon size

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          icon: {
            size: 30
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.icon.type `String` *(default: "circle")*

The icon shape.

The supported values are:
* "circle" - the marker shape is circle.
* "square" - the marker shape is square.
* "triangle" - the marker shape is triangle.
* "cross" - the marker shape is cross.

#### Example - set the value axis notes icon shape

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          icon: {
            shape: "triangle"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.icon.visible `Boolean` *(default: "true")*

The icon visibility.

#### Example - set the value axis notes icon visibility

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          icon: {
            visible: false
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.label `Object`

The label of the notes.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), open: 100, high: 110, low: 95, close: 105 },
                { date: new Date("2023/1/2"), open: 105, high: 115, low: 100, close: 110 }
            ]
        },
        dateField: "date",
        valueAxis: {
            notes: {
                data: [{
                    value: 105,
                    label: {
                        text: "Important level",
                        background: "yellow",
                        color: "black",
                        visible: true
                    }
                }]
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.notes.label.background `String`

The background color of the label. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the value axis label background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          label: {
            background: "red"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.label.border `Object`

The border of the label.

#### Example - set the value axis label border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          label: {
            border: {
              color: "green",
              dashType: "dashDot",
              width: 1
            }
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.label.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the value axis label border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          label: {
            border: {
              color: "green"
            }
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.label.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the value axis label border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          label: {
            border: {
              dashType: "dashDot",
              width: 1
            }
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.label.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the value axis label border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          label: {
            border: {
              width: 1
            }
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.label.color `String`

The text color of the label. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the value axis label color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          label: {
            color: "#aa00bb"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.label.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the label.

#### Example - set the chart series label font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          label: {
            font: "20px sans-serif"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.label.template `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* value - the value value

#### Example - set the value axis notes label template as a string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          label: {
            template: "Year: #: value #"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.label.visible `Boolean` *(default: true)*

If set to `true` the chart will display the value axis notes label. By default the value axis notes label are visible.

#### Example - hide the value axis notes label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          label: {
            visible: false
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.label.rotation `Number` *(default: 0)*

The rotation angle of the label. By default the label are not rotated.

#### Example - rotate the value axis notes label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          label: {
            rotation: 90
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.label.format `String` *(default: "{0}")*

The format used to display the notes label. Uses [kendo.format](/api/framework/kendo#methods-format). Contains one placeholder ("{0}") which represents the axis value.

#### Example - set the value axis notes label format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          label: {
            format: "value slot: {0}"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.label.position `String` *(default: "inside")*

The position of the labels.

* "inside" - the label is positioned inside of the icon.
* "outside" - the label is positioned outside of the icon.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), open: 100, high: 110, low: 95, close: 105 },
                { date: new Date("2023/1/2"), open: 105, high: 115, low: 100, close: 110 }
            ]
        },
        dateField: "date",
        valueAxis: {
            notes: {
                data: [{
                    value: 105,
                    label: {
                        text: "Important level",
                        position: "outside"
                    }
                }]
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.notes.line `Object`

The line of the notes.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), open: 100, high: 110, low: 95, close: 105 },
                { date: new Date("2023/1/2"), open: 105, high: 115, low: 100, close: 110 }
            ]
        },
        dateField: "date",
        valueAxis: {
            notes: {
                data: [{
                    value: 105,
                    line: {
                        width: 3,
                        color: "red",
                        length: 20
                    }
                }]
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.notes.line.width `Number`

The line width of the notes.

#### Example - set the value axis notes line width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          line: {
            width: 4
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.line.color `String`

The line color of the notes.

#### Example - set the value axis notes color width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          line: {
            color: "#aa00bb"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.line.length `Number`

The length of the connecting lines in pixels.

#### Example - set the value axis notes color width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          line: {
            length: 20
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.data `Array`

The items of the notes.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), open: 100, high: 110, low: 95, close: 105 },
                { date: new Date("2023/1/2"), open: 105, high: 115, low: 100, close: 110 }
            ]
        },
        dateField: "date",
        valueAxis: {
            notes: {
                data: [
                    { value: 100, label: { text: "Low point" } },
                    { value: 110, label: { text: "High point" } }
                ]
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.notes.data.value `Object`

The value of the note.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), open: 100, high: 110, low: 95, close: 105 },
                { date: new Date("2023/1/2"), open: 105, high: 115, low: 100, close: 110 }
            ]
        },
        dateField: "date",
        valueAxis: {
            notes: {
                data: [{
                    value: 107.5,
                    label: { text: "Target price" }
                }]
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.notes.data.position `String`

The position of the value axis note.

* "top" - The note is positioned on the top.
* "bottom" - The note is positioned on the bottom.
* "left" - The note is positioned on the left.
* "right" - The note is positioned on the right.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), open: 100, high: 110, low: 95, close: 105 },
                { date: new Date("2023/1/2"), open: 105, high: 115, low: 100, close: 110 }
            ]
        },
        dateField: "date",
        valueAxis: {
            notes: {
                data: [{
                    value: 107.5,
                    position: "left",
                    label: { text: "Target price" }
                }]
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.notes.data.icon `Object`

The icon of the note.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), open: 100, high: 110, low: 95, close: 105 },
                { date: new Date("2023/1/2"), open: 105, high: 115, low: 100, close: 110 }
            ]
        },
        dateField: "date",
        valueAxis: {
            notes: {
                data: [{
                    value: 107.5,
                    icon: {
                        background: "red",
                        type: "circle",
                        size: 15,
                        visible: true
                    }
                }]
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.notes.data.icon.background `String`

The background color of the note icon.

#### Example - set the value axis note icon background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            icon: {
              background: "red"
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.icon.border `Object`

The border of the icon.

#### Example - set the value axis note icon border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            icon: {
              border: {
                width: 2,
                color: "red"
              }
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.icon.border.color `String`

The border color of the icon.

#### Example - set the value axis note icon border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            icon: {
              border: {
                width: 2,
                color: "red"
              }
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.icon.border.width `Number`

The border width of the icon.

#### Example - set the value axis note icon border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            icon: {
              border: {
                width: 2,
                color: "red"
              }
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.icon.size `Number`

The size of the icon.

#### Example - set the value axis note icon size

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            icon: {
              size: 30
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.icon.type `String` *(default: "circle")*

The icon shape.

The supported values are:
* "circle" - the marker shape is circle.
* "square" - the marker shape is square.
* "triangle" - the marker shape is triangle.
* "cross" - the marker shape is cross.

#### Example - set the value axis note icon shape

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            icon: {
              shape: "triangle"
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.icon.visible `Boolean` *(default: "true")*

The icon visibility.

#### Example - set the value axis note icon visibility

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            icon: {
              visible: false
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.label `Object`

The label of the note.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), open: 100, high: 110, low: 95, close: 105 },
                { date: new Date("2023/1/2"), open: 105, high: 115, low: 100, close: 110 }
            ]
        },
        dateField: "date",
        valueAxis: {
            notes: {
                data: [{
                    value: 107.5,
                    label: {
                        text: "Important level",
                        background: "yellow",
                        color: "black",
                        position: "outside"
                    }
                }]
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.notes.data.label.background `String`

The background color of the label. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the value axis note label background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notesdata: {
          data: [{
            value: 1,
            label: {
              background: "red"
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.label.border `Object`

The border of the label.

#### Example - set the value axis note label border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              border: {
                color: "green",
                dashType: "dashDot",
                width: 1
              }
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.label.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the value axis note label border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              border: {
                color: "green"
              }
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.label.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

#### Example - set the value axis note label border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              border: {
                dashType: "dashDot",
                width: 1
              }
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.label.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example - set the value axis note label border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              border: {
                width: 1
              }
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.label.color `String`

The text color of the note label. Accepts a valid CSS color string, including hex and rgb.

#### Example - set the value axis note label color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              color: "#aa00bb"
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.label.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the note label.

#### Example - set the value axis note label font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              font: "20px sans-serif"
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.label.template `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* value - the axis value

#### Example - set the value axis note label template as a string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              template: "Year: #: value #"
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.label.visible `Boolean` *(default: true)*

If set to `true` the chart will display the value axis notes label. By default the value axis notes label are visible.

#### Example - hide the value axis note label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              visible: false
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.label.rotation `Number` *(default: 0)*

The rotation angle of the label. By default the label are not rotated.

#### Example - rotate the value axis note label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              rotation: 90
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.label.format `String` *(default: "{0}")*

The format used to display the note label. Uses [kendo.format](/api/framework/kendo#methods-format). Contains one placeholder ("{0}") which represents the axis value.

#### Example - set the value axis note label format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              format: "value slot: {0}"
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.label.text `String`

The label note text.

#### Example - set the value axis label note text

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              text: "A"
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.label.position `String` *(default: "inside")*

The position of the value axis note label.

* "inside" - the label is positioned inside of the icon.
* "outside" - the label is positioned outside of the icon.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), open: 100, high: 110, low: 95, close: 105 },
                { date: new Date("2023/1/2"), open: 105, high: 115, low: 100, close: 110 }
            ]
        },
        dateField: "date",
        valueAxis: {
            notes: {
                data: [{
                    value: 107.5,
                    label: {
                        text: "Important level",
                        position: "outside"
                    }
                }]
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.notes.data.line `Object`

The line of the note.

#### Example

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), open: 100, high: 110, low: 95, close: 105 },
                { date: new Date("2023/1/2"), open: 105, high: 115, low: 100, close: 110 }
            ]
        },
        dateField: "date",
        valueAxis: {
            notes: {
                data: [{
                    value: 107.5,
                    line: {
                        width: 3,
                        color: "blue",
                        length: 25
                    }
                }]
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }]
    });
    </script>

### valueAxis.notes.data.line.width `Number`

The line width of the note.

#### Example - set the value axis note line width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            line: {
              width: 4
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.line.color `String`

The line color of the note.

#### Example - set the value axis note color width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            line: {
              color: "#aa00bb"
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.line.length `Number`

The length of the connecting lines in pixels.

#### Example - set the value axis note color width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            line: {
              length: 20
            }
          }]
        }
      }
    });
    </script>

## Fields

### navigator `kendo.dataviz.Navigator`

A reference to the Stock Chart built-in [navigator](/api/javascript/dataviz/navigator) instance (the lower widget pane). Obtain the instance to call the available [navigator methods](/api/javascript/dataviz/navigator).

#### Example

    <div id="stock-chart"></div>
    <script>
    var stockChart = $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    }).data("kendoStockChart");

    // Access the navigator instance
    var navigator = stockChart.navigator;
    console.log(navigator);
    </script>

> **Important**
>
> The navigator field is available in Kendo UI v.2016.2.517 and later

## Methods

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> This method does not remove the widget element from DOM.

#### Example

    <div id="stock-chart"></div>
    <script>
    var stockChart = $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    }).data("kendoStockChart");

    // Destroy the stock chart
    stockChart.destroy();
    </script>

### exportImage
Exports the chart as an image.

Inherited from [Chart.exportImage](/api/javascript/dataviz/ui/stock-chart#methods-exportImage)

#### Example

    <div id="stock-chart"></div>
    <script>
    var stockChart = $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    }).data("kendoStockChart");

    // Export as image
    stockChart.exportImage({ width: "800px", height: "600px" }).done(function(data) {
        kendo.saveAs({
            dataURI: data,
            fileName: "stock-chart.png"
        });
    });
    </script>

#### Parameters

##### options `Object` *(optional)*
Parameters for the exported image.

##### options.width `String`
The width of the exported image. Defaults to the chart width.

##### options.height `String`
The height of the exported image. Defaults to the chart height.

#### Returns
`Promise` A promise that will be resolved with a PNG image encoded as a Data URI.


### exportPDF
Exports the chart as a PDF file.

Inherited from [Chart.exportPDF](/api/javascript/dataviz/ui/stock-chart#methods-exportPDF)

#### Example

    <div id="stock-chart"></div>
    <script>
    var stockChart = $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    }).data("kendoStockChart");

    // Export as PDF
    stockChart.exportPDF({ paperSize: "A4", landscape: true }).done(function(data) {
        kendo.saveAs({
            dataURI: data,
            fileName: "stock-chart.pdf"
        });
    });
    </script>

#### Parameters

##### options `kendo.drawing.PDFOptions` *(optional)*
Parameters for the exported PDF file.

#### Returns
`Promise` A promise that will be resolved with a PDF file encoded as a Data URI.


### exportSVG
Exports the chart as an SVG document.

Inherited from [Chart.exportSVG](/api/javascript/dataviz/ui/stock-chart#methods-exportSVG)

#### Example

    <div id="stock-chart"></div>
    <script>
    var stockChart = $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    }).data("kendoStockChart");

    // Export as SVG
    stockChart.exportSVG().done(function(data) {
        kendo.saveAs({
            dataURI: data,
            fileName: "stock-chart.svg"
        });
    });
    </script>

#### Parameters

##### options `Object` *(optional)*
Export options.

##### options.raw `Boolean` *(default: false)*
Resolves the promise with the raw SVG document without the Data URI prefix.

#### Returns
`Promise` A promise that will be resolved with a SVG document encoded as a Data URI.

### redraw

Repaints the chart using the currently loaded data.

#### Example

    <div id="stock-chart"></div>
    <script>
    var stockChart = $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    }).data("kendoStockChart");

    // Redraw the chart
    stockChart.redraw();
    </script>

### refresh

Reloads the data and renders the chart.

#### Example

    <div id="stock-chart"></div>
    <script>
    var stockChart = $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    }).data("kendoStockChart");

    // Refresh the chart
    stockChart.refresh();
    </script>

### resize

Adjusts the chart layout to match the size of the container.

#### Example

    <div id="stock-chart" style="width: 400px; height: 300px;"></div>
    <script>
    var stockChart = $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    }).data("kendoStockChart");

    // Resize container and update chart
    $("#stock-chart").css({ width: "600px", height: "400px" });
    stockChart.resize();
    </script>

#### Parameters

##### force `Boolean` *optional*

Defines whether the widget should proceed with resizing even if the element dimensions have not changed.

### setDataSource

Sets the data source of the widget.

#### Example

    <div id="stock-chart"></div>
    <script>
    var stockChart = $("#stock-chart").kendoStockChart({
        dataSource: {
            data: []
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    }).data("kendoStockChart");

    // Set new data source
    var newDataSource = new kendo.data.DataSource({
        data: [
            { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
            { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
        ]
    });
    stockChart.setDataSource(newDataSource);
    </script>

#### Parameters

##### dataSource `kendo.data.DataSource`

The data source to which the widget should be bound.

### setOptions

Sets the widget options. Changes are cumulative.

#### Example

    <div id="stock-chart"></div>
    <script>
    var stockChart = $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: "2012/01/01", open: 10, high: 15, low: 8, close: 12, volume: 1000 },
                { date: "2012/01/02", open: 12, high: 18, low: 10, close: 15, volume: 1200 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high", 
            lowField: "low",
            closeField: "close"
        }]
    }).data("kendoStockChart");

    // Update chart options
    stockChart.setOptions({
        title: { text: "Updated Stock Chart" },
        legend: { visible: true }
    });
    </script>

#### Parameters

##### options `Object`

The chart settings to update.

### svg

Returns the [SVG](https://www.w3.org/Graphics/SVG/) representation of the chart.
The returned string is a self-contained SVG document that can be used as is or
converted to other formats using tools like [Inkscape](https://inkscape.org/en) and
[ImageMagick](https://www.imagemagick.org/).
Both programs provide command-line interface suitable for server-side processing.

> This method is obsoleted by [exportSVG](/api/javascript/dataviz/ui/stock-chart/methods/exportsvg), but will remain fully functional.

#### Returns
`String` the SVG representation of the chart.

#### Example - get the SVG representation of the chart

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        series: [{
          type: "line",
          field: "value",
          categoryField: "date",
          data: [
            { value: 1, date: new Date(2012, 1, 1) },
            { value: 2, date: new Date(2012, 1, 2) }
          ]
        }]
    });

    var chart = $("#stock-chart").data("kendoStockChart");
    var svg = chart.svg();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(svg); // displays the SVG string
    </script>

### imageDataURL

Returns a PNG image of the chart encoded as a [Data URL](https://developer.mozilla.org/en-US/docs/data_URIs).

> This method is deprecated and replaced by [exportImage](/api/javascript/dataviz/ui/stock-chart/methods/exportimage).

#### Returns

`String` A data URL with `image/png` MIME type. Will be `null` if the browser does not support the `canvas` element.

#### Example - show a snapshot of the Chart

    <div id="stock-chart"></div>
    <a download="export.png" id="export" class="k-button">Export PNG</a>
    <script>
    $("#stock-chart").kendoStockChart({
        series: [{
          type: "line",
          field: "value",
          categoryField: "date",
          data: [
            { value: 1, date: new Date(2012, 1, 1) },
            { value: 2, date: new Date(2012, 1, 2) }
          ]
        }]
    });

    $("#export").on("click", function() {
      var chart = $("#stock-chart").data("kendoStockChart");
      var imageDataURL = chart.imageDataURL();

      if (navigator.msSaveBlob) {
        var blob = toBlob(imageDataURL, "image/png");
        navigator.msSaveBlob(blob, this.getAttribute("download"));
      } else {
        this.href = imageDataURL;
      }
    });

    // See: https://goo.gl/qlg5dd
    function toBlob(base64, type) {
      var rawData = base64.substring(base64.indexOf("base64,") + 7);
      var data = atob(rawData);
      var arr = new Uint8Array(data.length);

      for (var i = 0; i < data.length; ++i) {
        arr[i] = data.charCodeAt(i);
      }

      return new Blob([ arr.buffer ], { type: type });
    }
    </script>

## Events

### axisLabelClick

Fires when an axis label is clicked.

#### Example

    function onAxisLabelClick(e) {
        alert("Clicked " + e.axis.type + " axis label with value: " + e.value);
    }

#### Event Data

##### e.axis `Object`

The axis that the label belongs to.

##### e.value `Object`

The label value or category name.

##### e.text `Object`

The label text.

##### e.index `Object`

The label sequential index or category index.

##### e.dataItem `Object`

The original data item used to generate the label.
** Applicable only for data bound category axis. **

##### e.element `Object`

The DOM element of the label.

##### e.sender `kendo.dataviz.ui.StockChart`

The widget instance which fired the event.

### dataBound

Fires when the chart has received data from the data source
and is about to render it.

#### Example

    function onDataBound(e) {
        // Series data is now available
    }

### dragStart

Fires when the user has used the mouse or a swipe gesture to drag the chart.

The drag operation can be aborted by calling `e.preventDefault()`.

#### Example - subscribe to the "dragStart" event during initialization

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), open: 100, high: 110, low: 95, close: 105 },
                { date: new Date("2023/1/2"), open: 105, high: 115, low: 100, close: 110 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }],
        dragStart: function(e) {
            console.log("Drag started", e.axisRanges);
        }
    });
    </script>

#### Event Data

##### e.axisRanges `Object`

A hastable containing the initial range (min and max values) of *named* axes.
The axis name is used as a key.

##### e.originalEvent `Object`

The original user event that triggered the drag action.

##### e.sender `kendo.dataviz.ui.StockChart`

The widget instance which fired the event.

### drag

Fires as long as the user is dragging the chart using the mouse or swipe gestures.

#### Example - subscribe to the "drag" event during initialization

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), open: 100, high: 110, low: 95, close: 105 },
                { date: new Date("2023/1/2"), open: 105, high: 115, low: 100, close: 110 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }],
        drag: function(e) {
            console.log("Dragging", e.axisRanges);
        }
    });
    </script>

#### Event Data

##### e.axisRanges `Object`

A hastable containing the suggested current range (min and max values) of *named* axes.
The axis name is used as a key.

Note that the axis ranges are not updated automatically. You need to call
set_options with either the suggested or custom min/max values for them to take effect.

##### e.originalEvent `Object`

The original user event that triggered the drag action.

##### e.sender `kendo.dataviz.ui.StockChart`

The widget instance which fired the event.

### dragEnd

Fires when the user stops dragging the chart.

#### Example - subscribe to the "dragEnd" event during initialization

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), open: 100, high: 110, low: 95, close: 105 },
                { date: new Date("2023/1/2"), open: 105, high: 115, low: 100, close: 110 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }],
        dragEnd: function(e) {
            console.log("Drag ended", e.axisRanges);
        }
    });
    </script>

#### Event Data

##### e.axisRanges `Object`

A hastable containing the final range (min and max values) of *named* axes.
The axis name is used as a key.

##### e.originalEvent `Object`

The original user event that triggered the drag action.

##### e.sender `kendo.dataviz.ui.StockChart`

The widget instance which fired the event.

### legendItemClick

Fires when an legend item is clicked, before the selected series visibility is toggled.
Can be cancelled.

#### Example - prevent toggling the series visibility on legend item click
    function onLegendItemClick(e) {
        e.preventDefault();
    }

#### Event Data

##### e.text `String`

The name of the series.

##### e.series `Object`

The series options.

##### e.seriesIndex `Number`

The series index.

##### e.pointIndex `Number`

The point index.

##### e.preventDefault `Function`

If invoked the default action (toggle series visibility) will be prevented.

##### e.element `Object`

The DOM element of the plot area.

##### e.sender `kendo.dataviz.ui.StockChart`

The widget instance which fired the event.

### legendItemHover

Fires when an legend item is hovered.

#### Example

    function onLegendItemHover(e) {
        alert("Hovered " + e.text + " series");
    }

#### Event Data

##### e.text `String`

The name of the series.

##### e.series `Object`

The series options.

##### e.seriesIndex `Number`

The series index.

##### e.pointIndex `Number`

The point index.

##### e.element `Object`

The DOM element of the plot area.

##### e.sender `kendo.dataviz.ui.StockChart`

The widget instance which fired the event.

### legendItemLeave

Fires when the cursor leaves a legend item.

#### Example - subscribe to the "legendItemLeave" event during initialization

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), open: 100, high: 110, low: 95, close: 105 },
                { date: new Date("2023/1/2"), open: 105, high: 115, low: 100, close: 110 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }],
        legendItemLeave: function(e) {
            console.log("Legend item leave", e.pointIndex);
        }
    });
    </script>

#### Event Data

##### e.element `Object`

The DOM element of the plot area.

##### e.pointIndex `Number`

The point index.

##### e.sender `kendo.dataviz.ui.StockChart`

The widget instance which fired the event.

##### e.series `Object`

The series options.

##### e.seriesIndex `Number`

The series index.

##### e.text `String`

The name of the series.

### noteClick

Fired when the user clicks one of the notes.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Example - subscribe to the "noteClick" event during initialization

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), open: 100, high: 110, low: 95, close: 105 },
                { date: new Date("2023/1/2"), open: 105, high: 115, low: 100, close: 110 }
            ]
        },
        dateField: "date",
        valueAxis: {
            notes: {
                data: [{ value: 105, label: { text: "Important level" } }]
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }],
        noteClick: function(e) {
            console.log("Note clicked", e.value);
        }
    });
    </script>

#### Event Data

##### e.category `Object`

The data point category. Available only for categorical charts (bar, line, area and similar).

##### e.element `Object`

The DOM element of the plot area.

##### e.sender `kendo.dataviz.ui.StockChart`

The widget instance which fired the event.

##### e.value `Object`

The data point value.

##### e.series `Object`

The series of the note.

##### e.dataItem `Object`

The data item of the point's note.

##### e.sender `kendo.dataviz.ui.StockChart`

The widget instance which fired the event.

### noteHover

Fired when the user hovers one of the notes.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Example - subscribe to the "noteHover" event during initialization

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), open: 100, high: 110, low: 95, close: 105 },
                { date: new Date("2023/1/2"), open: 105, high: 115, low: 100, close: 110 }
            ]
        },
        dateField: "date",
        valueAxis: {
            notes: {
                data: [{ value: 105, label: { text: "Important level" } }]
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }],
        noteHover: function(e) {
            console.log("Note hovered", e.value);
        }
    });
    </script>

#### Event Data

##### e.category `Object`

The data point category. Available only for categorical charts (bar, line, area and similar).

##### e.element `Object`

The DOM element of the plot area.

##### e.sender `kendo.dataviz.ui.StockChart`

The widget instance which fired the event.

##### e.value `Object`

The data point value.

##### e.series `Object`

The series of the note.

##### e.dataItem `Object`

The data item of the point's note.

##### e.sender `kendo.dataviz.ui.StockChart`

The widget instance which fired the event.

### noteLeave

Fired when the cursor leaves a note.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Example - subscribe to the "noteLeave" event during initialization

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), open: 100, high: 110, low: 95, close: 105 },
                { date: new Date("2023/1/2"), open: 105, high: 115, low: 100, close: 110 }
            ]
        },
        dateField: "date",
        valueAxis: {
            notes: {
                data: [{ value: 105, label: { text: "Important level" } }]
            }
        },
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }],
        noteLeave: function(e) {
            console.log("Note leave", e.value);
        }
    });
    </script>

#### Event Data

##### e.category `Object`

The data point category. Available only for categorical charts (bar, line, area and similar).

##### e.dataItem `Object`

The data item of the point's note.

##### e.element `Object`

The DOM element of the plot area.

##### e.sender `kendo.dataviz.ui.StockChart`

The widget instance which fired the event.

##### e.series `Object`

The series of the note.

##### e.value `Object`

The data point value.

##### e.visual `Object`

The note visual element.

### paneRender

Fires when a pane is rendered because the chart is rendered, or the chart performs panning or zooming, or because the chart is exported with different options. The event can be used to render custom visuals in the panes.

#### Example - subscribe to the "paneRender" event during initialization

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), open: 100, high: 110, low: 95, close: 105 },
                { date: new Date("2023/1/2"), open: 105, high: 115, low: 100, close: 110 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }],
        paneRender: function(e) {
            console.log("Pane rendered", e.name);
        }
    });
    </script>

#### Event Data

##### pane `kendo.dataviz.ui.StockChart`

The chart pane that was rendered.

##### name `String`

The pane name.

##### index `Number`

The pane index.

##### e.sender `kendo.dataviz.ui.Chart`

The widget instance which fired the event.

### plotAreaClick

Fires when plot area is clicked.

#### Example

    function onPlotAreaClick(e) {
        alert("Clicked X axis value: " + e.x);
    }

#### Event Data

##### e.value `Object`

The data point value.
Available only for categorical charts (bar, line, area and similar).

##### e.category `Object`

The data point category.
Available only for categorical charts (bar, line, area and similar).

##### e.element `Object`

The DOM element of the plot area.

##### e.x `Object`

The X axis value or array of values for multi-axis charts.

##### e.y `Object`

The Y axis value or array of values for multi-axis charts.

##### e.sender `kendo.dataviz.ui.StockChart`

The widget instance which fired the event.

### plotAreaHover

Fired when the user hovers the plot area.

#### Example - subscribe to the "plotAreaHover" event during initialization

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), open: 100, high: 110, low: 95, close: 105 },
                { date: new Date("2023/1/2"), open: 105, high: 115, low: 100, close: 110 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }],
        plotAreaHover: function(e) {
            console.log("Plot area hovered", e.category);
        }
    });
    </script>

#### Event Data

##### e.category `Object`

The data point category. Available only for categorical charts (bar, line, area and similar).

##### e.element `Object`

The DOM element of the plot area.

##### e.sender `kendo.dataviz.ui.StockChart`

The widget instance which fired the event.

##### e.originalEvent `Object`

The original browser event that triggered the hover action.

##### e.value `Object`

The data point value. Available only for categorical charts (bar, line, area and similar).

##### e.x `Object`

The X axis value or array of values for multi-axis charts.

##### e.y `Object`

The Y axis value or array of values for multi-axis charts.

##### e.sender `kendo.dataviz.ui.StockChart`

The widget instance which fired the event.

### plotAreaLeave

Fired when the cursor leaves the plotArea.

#### Example - subscribe to the "plotAreaLeave" event during initialization

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), open: 100, high: 110, low: 95, close: 105 },
                { date: new Date("2023/1/2"), open: 105, high: 115, low: 100, close: 110 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }],
        plotAreaLeave: function(e) {
            console.log("Plot area leave");
        }
    });
    </script>

#### Event Data

##### e.sender `kendo.dataviz.ui.StockChart`

### render

Fired when the chart is ready to render on screen.

Can be used, for example, to remove loading indicators. Changes to options will be ignored.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Example - subscribe to the "render" event during initialization

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), open: 100, high: 110, low: 95, close: 105 },
                { date: new Date("2023/1/2"), open: 105, high: 115, low: 100, close: 110 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }],
        render: function(e) {
            console.log("Chart rendered");
        }
    });
    </script>

#### Event Data

##### e.sender `kendo.dataviz.ui.StockChart`

The widget instance which fired the event.

### select

Fired when the user modifies the selection.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Example - subscribe to the "select" event during initialization

    <div id="stock-chart"></div>
    <script>
    $("#stock-chart").kendoStockChart({
        dataSource: {
            data: [
                { date: new Date("2023/1/1"), open: 100, high: 110, low: 95, close: 105 },
                { date: new Date("2023/1/2"), open: 105, high: 115, low: 100, close: 110 }
            ]
        },
        dateField: "date",
        series: [{
            type: "candlestick",
            openField: "open",
            highField: "high",
            lowField: "low",
            closeField: "close"
        }],
        select: function(e) {
            console.log("Selection changed", e.from, e.to);
        }
    });
    </script>

#### Event Data

##### e.axis `Object`

The target axis configuration.

##### e.from `Date`

The lower boundary of the selected range.

##### e.sender `kendo.dataviz.ui.StockChart`

The widget instance which fired the event.

##### e.to `Date`

The upper boundary of the selected range.

The last selected category is at index [to - 1] unless the axis is justified. In this case it is at index [to].

### selectEnd

Fired when the user completes modifying the selection.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.axis `Object`

The target axis configuration.

##### e.from `Date`

The lower boundary of the selected range.

##### e.sender `kendo.dataviz.ui.StockChart`

The widget instance which fired the event.

##### e.to `Date`

The upper boundary of the selected range.

The last selected category is at index [to - 1] unless the axis is justified. In this case it is at index [to].

#### Example

    <div id="stockChart"></div>
    <script>
    $("#stockChart").kendoStockChart({
        dateField: "date",
        series: [{
            field: "value",
            data: [
                { date: new Date("2022/1/1"), value: 10 },
                { date: new Date("2022/1/2"), value: 15 },
                { date: new Date("2022/1/3"), value: 20 }
            ]
        }],
        selectEnd: function(e) {
            console.log("Selection ended - from:", e.from, "to:", e.to);
        }
    });
    </script>

### selectStart

Fired when the user starts modifying the axis selection.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.axis `Object`

The target axis configuration.

##### e.from `Date`

The lower boundary of the selected range.

##### e.sender `kendo.dataviz.ui.StockChart`

The widget instance which fired the event.

##### e.to `Date`

The upper boundary of the selected range.

The last selected category is at index [to - 1] unless the axis is justified. In this case it is at index [to].

#### Example

    <div id="stockChart"></div>
    <script>
    $("#stockChart").kendoStockChart({
        dateField: "date",
        series: [{
            field: "value",
            data: [
                { date: new Date("2022/1/1"), value: 10 },
                { date: new Date("2022/1/2"), value: 15 },
                { date: new Date("2022/1/3"), value: 20 }
            ]
        }],
        selectStart: function(e) {
            console.log("Selection started - from:", e.from, "to:", e.to);
        }
    });
    </script>

### seriesClick

Fires when chart series are clicked.

#### Example

    function onSeriesClick(e) {
        alert("Clicked value: " + e.value);
    }

#### Event Data

##### e.value `Object`

The data point value.

##### e.category `Object`

The data point category

##### e.series `Object`

The clicked series.

##### e.series.type `String`

The series type

##### e.series.name `String`

The series name

##### e.series.data `Array`

The series data points

##### e.dataItem `Object`

The original data item (when binding to dataSource).

##### e.element `Object`

The DOM element of the data point.

##### e.percentage `Object`

The point value represented as a percentage value. Available only for donut, pie and 100% stacked charts.

##### e.sender `kendo.dataviz.ui.StockChart`

The widget instance which fired the event.

### seriesHover

Fires when chart series are hovered.

#### Example

    function onSeriesHover(e) {
        alert("Hovered value: " + e.value);
    }

#### Event Data

##### e.value `Object`

The data point value.

##### e.category `Object`

The data point category

##### e.series `Object`

The clicked series.

##### e.series.type `String`

The series type

##### e.series.name `String`

The series name

##### e.series.data `Array`

The series data points

##### e.dataItem `Object`

The original data item (when binding to dataSource).

##### e.element `Object`

The DOM element of the data point.

##### e.percentage `Object`

The point value represented as a percentage value. Available only for donut, pie and 100% stacked charts.

##### e.sender `kendo.dataviz.ui.StockChart`

The widget instance which fired the event.

### seriesOver

Fired when the cursor is over the chart series.

#### Event Data

##### e.category `Object`

The data point category

##### e.dataItem `Object`

The original data item (when binding to dataSource).

##### e.element `Object`

The DOM element of the data point.

##### e.originalEvent `Object`

The original browser event that triggered the hover action.

##### e.percentage `Object`

The point value represented as a percentage value. Available only for 100% stacked charts.

##### e.sender `kendo.dataviz.ui.StockChart`

The widget instance which fired the event.

##### e.series `Object`

The clicked series.

##### e.series.type `String`

The series type

##### e.series.name `String`

The series name

##### e.series.data `Array`

The series data points

##### e.stackValue `Object`

The cumulative point value on the stack. Available only for stackable series.

##### e.value `Object`

The data point value.

#### Example

    <div id="stockChart"></div>
    <script>
    $("#stockChart").kendoStockChart({
        dateField: "date",
        series: [{
            field: "value",
            data: [
                { date: new Date("2022/1/1"), value: 10 },
                { date: new Date("2022/1/2"), value: 15 },
                { date: new Date("2022/1/3"), value: 20 }
            ]
        }],
        seriesOver: function(e) {
            console.log("Mouse over series - value:", e.value);
        }
    });
    </script>

### seriesLeave

Fired when the cursor leaves a chart series.

#### Event Data

##### e.category `Object`

The data point category

##### e.dataItem `Object`

The original data item (when binding to dataSource).

##### e.element `Object`

The DOM element of the data point.

##### e.originalEvent `Object`

The original browser event that triggered the hover action.

##### e.percentage `Object`

The point value represented as a percentage value. Available only for 100% stacked charts.

##### e.sender `kendo.dataviz.ui.StockChart`

The widget instance which fired the event.

##### e.series `Object`

The clicked series.

##### e.series.type `String`

The series type

##### e.series.name `String`

The series name

##### e.series.data `Array`

The series data points

##### e.stackValue `Object`

The cumulative point value on the stack. Available only for stackable series.

##### e.value `Object`

The data point value.

#### Example

    <div id="stockChart"></div>
    <script>
    $("#stockChart").kendoStockChart({
        dateField: "date",
        series: [{
            field: "value",
            data: [
                { date: new Date("2022/1/1"), value: 10 },
                { date: new Date("2022/1/2"), value: 15 },
                { date: new Date("2022/1/3"), value: 20 }
            ]
        }],
        seriesLeave: function(e) {
            console.log("Mouse left series - value:", e.value);
        }
    });
    </script>

### zoomStart

Fires when the user has used the mousewheel to zoom the chart.

The zoom operation can be aborted by calling `e.preventDefault()`.

#### Event Data

##### e.axisRanges `Object`

A hastable containing the initial range (min and max values) of *named* axes.
The axis name is used as a key.

##### e.originalEvent `Object`

The original user event that triggered the zoom action.

##### e.sender `kendo.dataviz.ui.StockChart`

The widget instance which fired the event.

#### Example

    <div id="stockChart"></div>
    <script>
    $("#stockChart").kendoStockChart({
        dateField: "date",
        series: [{
            field: "value",
            data: [
                { date: new Date("2022/1/1"), value: 10 },
                { date: new Date("2022/1/2"), value: 15 },
                { date: new Date("2022/1/3"), value: 20 }
            ]
        }],
        zoomStart: function(e) {
            console.log("Zoom started - axis ranges:", e.axisRanges);
        }
    });
    </script>

### zoom

Fires as long as the user is zooming the chart using the mousewheel.

#### Event Data

##### e.axisRanges `Object`

A hastable containing the suggested current range (min and max values) of *named* axes.
The axis name is used as a key.

Note that the axis ranges are not updated automatically. You need to call
set_options with either the suggested or custom min/max values for them to take effect.

##### e.delta `Number`

A number that indicates the zoom amount and direction.

A negative delta indicates "zoom in", while a positive "zoom out".

##### e.originalEvent `Object`

The original user event that triggered the zoom action.

This event can be used to prevent the default mousewheel action (scroll).

#### Example

    function onZoom(e) {
        // Prevent window scroll
        e.originalEvent.preventDefault();
    }

##### e.sender `kendo.dataviz.ui.StockChart`

The widget instance which fired the event.

The original user event that triggered the zoom action.

##### e.sender `kendo.dataviz.ui.StockChart`

The widget instance which fired the event.

#### Example

    <div id="stockChart"></div>
    <script>
    $("#stockChart").kendoStockChart({
        dateField: "date",
        series: [{
            field: "value",
            data: [
                { date: new Date("2022/1/1"), value: 10 },
                { date: new Date("2022/1/2"), value: 15 },
                { date: new Date("2022/1/3"), value: 20 }
            ]
        }],
        zoomEnd: function(e) {
            console.log("Zoom ended - final axis ranges:", e.axisRanges);
        }
    });
    </script>
