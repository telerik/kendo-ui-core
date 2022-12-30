---
title: Error Bars
page_title: Error Bars
description: "Learn how to configure the error bars of Telerik UI Charts, bind them to the series data and set their value."
slug: htmlhelpers_charts_errorbars_aspnetcore
---
{% if site.core %}
    {% assign ErrorLowField = "/api/Kendo.Mvc.UI.Fluent/ChartSeriesBuilder#errorlowfieldsystemstring" %}
    {% assign ErrorHighField = "/api/Kendo.Mvc.UI.Fluent/ChartSeriesBuilder#errorhighfieldsystemstring" %}
    {% assign XErrorLowField = "/api/Kendo.Mvc.UI.Fluent/ChartSeriesBuilder#xerrorlowfieldsystemstring" %}
    {% assign XErrorHighField = "/api/Kendo.Mvc.UI.Fluent/ChartSeriesBuilder#xerrorhighfieldsystemstring" %}
    {% assign YErrorLowField = "/api/Kendo.Mvc.UI.Fluent/ChartSeriesBuilder#yerrorlowfieldsystemstring" %}
    {% assign YErrorHighField = "/api/Kendo.Mvc.UI.Fluent/ChartSeriesBuilder#yerrorhighfieldsystemstring" %}
    {% assign ErrorBarsValue = "/api/Kendo.Mvc.UI.Fluent/ChartSeriesErrorBarsSettingsBuilder#valuesystemstring" %}
    {% assign ErrorBarsXValue = "/api/Kendo.Mvc.UI.Fluent/ChartSeriesErrorBarsSettingsBuilder#xvaluesystemstring" %}
    {% assign ErrorBarsYValue = "/api/Kendo.Mvc.UI.Fluent/ChartSeriesErrorBarsSettingsBuilder#yvaluesystemstring" %}
{% else %}
    {% assign ErrorLowField = "/api/Kendo.Mvc.UI.Fluent/CategoricalErrorBarsBuilder#lowfieldsystemstring" %}
    {% assign ErrorHighField = "/api/Kendo.Mvc.UI.Fluent/CategoricalErrorBarsBuilder#highfieldsystemstring" %}
    {% assign XErrorLowField = "/api/Kendo.Mvc.UI.Fluent/ScatterErrorBarsBuilder#xlowfieldsystemstring" %}
    {% assign XErrorHighField = "/api/Kendo.Mvc.UI.Fluent/ScatterErrorBarsBuilder#xhighfieldsystemstring" %}
    {% assign YErrorLowField = "/api/Kendo.Mvc.UI.Fluent/ScatterErrorBarsBuilder#ylowfieldsystemstring" %}
    {% assign YErrorHighField = "/api/Kendo.Mvc.UI.Fluent/ScatterErrorBarsBuilder#yhighfieldsystemstring" %}
    {% assign ErrorBarsValue = "/api/Kendo.Mvc.UI.Fluent/CategoricalErrorBarsBuilder#valuesystemstring" %}
    {% assign ErrorBarsXValue = "/api/Kendo.Mvc.UI.Fluent/ScatterErrorBarsBuilder#xvaluesystemstring" %}
    {% assign ErrorBarsYValue = "/api/Kendo.Mvc.UI.Fluent/ScatterErrorBarsBuilder#yvaluesystemstring" %}
{% endif %}

# Error Bars

The Chart enables you to implement error bars which show the variability of data.

The low and high value for the error bars can be either bound to the data or calculated from the point or series values. The error bars are specified as part of the series definition.

The following series types support error bars:

* Area
* Vertical Area
* Column
* Bar
* Line
* Vertical Line
* Scatter
* ScatterLine

## Binding to Categorical Series

To bind the low and high values of the error bars when using categorical series, set the [`ErrorLowField`]({{ ErrorLowField }}) and [`ErrorHighField`]({{ ErrorHighField }}) options to the fields in the data that hold the low and high value.

```HtmlHelper
    @(Html.Kendo().Chart()
        .Name("chart")
        .Series(s => s
            .Column(new object[] {
                new {
                    value = 4.743,
                    low = 4.5,
                    high = 5
                },
                new {
                    value = 7.295,
                    low = 7,
                    high = 8
                },
                new {
                    value = 6.376,
                    low = 5,
                    high = 6.5
                }
            })
            .ErrorLowField("low")
            .ErrorHighField("high")
        )
    )
```
{% if site.core %}
```TagHelper

    @addTagHelper *, Kendo.Mvc

    @{
        var column_data = new object[] {
            new {
                value = 4.743,
                low = 4.5,
                high = 5
            },
            new {
                value = 7.295,
                low = 7,
                high = 8
            },
            new {
                value = 6.376,
                low = 5,
                high = 6.5
            }
        };
    }

    <kendo-chart name="chart">
        <series>
            <series-item type="ChartSeriesType.Column" data="column_data" error-low-field="low" error-high-field="high">
            </series-item>
        </series>
    </kendo-chart>

```
{% endif %}

## Binding to Scatter Series

You can also display error bars for the series `x` or `y` value, or both. To set the low and high fields for the series `x` value, set the [`XErrorLowField`]({{ XErrorLowField }}) and [`XErrorHighField`]({{ XErrorHighField }}) series options. To specify the low and high fields for the `y` value of the series, use the [`YErrorLowField`]({{ YErrorLowField }}) and [`YErrorHighField`]({{ YErrorHighField }}) options.

The following example demonstrates how to bind the error bars for the `x` value of the series.

```HtmlHelper
    @(Html.Kendo().Chart()
            .Name("chart")
            .Series(s => s
                .Scatter(new object[] {
                    new {
                        x= 6.4,
                        y= 13.4,
                        low= 5,
                        high= 7
                    },
                    new {
                        x= 1.7,
                        y= 11,
                        low= 1,
                        high= 3
                    }, new {
                        x= 5.4,
                        y= 8,
                        low= 3,
                        high= 6}
                })
                .XErrorLowField("low")
                .XErrorHighField("high")
            )
    )
```
{% if site.core %}
```TagHelper

    @addTagHelper *, Kendo.Mvc

    @{
        var scatter_data = new object[] {
            new {
                x= 6.4,
                y= 13.4,
                low= 5,
                high= 7
            },
            new {
                x= 1.7,
                y= 11,
                low= 1,
                high= 3
            }, 
            new {
                x= 5.4,
                y= 8,
                low= 3,
                high= 6
            }
        };
    }

    <kendo-chart name="chart">
        <series>
            <series-item type="ChartSeriesType.Scatter" data="scatter_data" x-error-low-field="low" x-error-high-field="high">
            </series-item>
        </series>
    </kendo-chart>

```
{% endif %}

The following example demonstrates how to bind the error bars for the `y` value of the series.

```HtmlHelper
    @(Html.Kendo().Chart()
            .Name("chart")
            .Series(s => s
                .Scatter(new object[] {
                    new {
                        x= 6.4,
                        y= 13.4,
                        low= 12,
                        high= 17
                    },
                    new {
                        x= 1.7,
                        y= 11,
                        low= 11,
                        high= 14
                    }, new {
                        x= 5.4,
                        y= 8,
                        low= 5,
                        high= 8}
                })
                .YErrorLowField("low")
                .YErrorHighField("high")
            )
    )
```
{% if site.core %}
```TagHelper

    @addTagHelper *, Kendo.Mvc

    @{
        var scatter_data = new object[] {
            new {
                x= 6.4,
                y= 13.4,
                low= 12,
                high= 17
            },
            new {
                x= 1.7,
                y= 11,
                low= 11,
                high= 14
            }, 
            new {
                x= 5.4,
                y= 8,
                low= 5,
                high= 8
            }
        };
    }

    <kendo-chart name="chart">
        <series>
            <series-item type="ChartSeriesType.Scatter" data="scatter_data" y-error-low-field="low" y-error-high-field="high">
            </series-item>
        </series>
    </kendo-chart>

```
{% endif %}

## Setting the Error Bar Values

You can calculate the low and high values of the error bars based on the series point values. To set the error bars value for categorical series, specify the [`ErrorBars.Value`]({{ ErrorBarsValue }}) option. For scatter series, set the [`ErrorBars.XValue`]({{ ErrorBarsXValue }}) or [`ErrorBars.YValue`]({{ ErrorBarsYValue }}) options, or both.

### Setting Numeric Values

If the value of the error bar is set to a number (must not be negative), the low and high value are calculated by subtracting or adding the value to the series value.

The following example demonstrates how to set a numeric value for the categorical series.

```HtmlHelper
    @(Html.Kendo().Chart()
        .Name("chart")
        .Series(s => s
            .Column(new object[] {
                new {
                    value = 4.743
                },
                new {
                    value = 7.295
                },
                new {
                    value = 6.376
                }
            })
            .ErrorBars(err => err.Value("1"))
        )
    )
```
{% if site.core %}
```TagHelper

    @addTagHelper *, Kendo.Mvc

    @{
        var column_data = new object[] {
            new {
                value = 4.743
            },
            new {
                value = 7.295
            },
            new {
                value = 6.376
            }
        };
    }

    <kendo-chart name="chart">
        <series>
            <series-item type="ChartSeriesType.Column" data="column_data">
                <error-bars value="1"/>
            </series-item>
        </series>
    </kendo-chart>

```
{% endif %}

The following example demonstrates how to set a numeric value for the scatter series.

```HtmlHelper
    @(Html.Kendo().Chart()
        .Name("chart")
        .Series(s => s
            .Scatter(new object[] {
                new {
                    x = 6.4,
                    y = 13.4
                },
                new {
                    x = 1.7,
                    y = 11
                },
                new {
                    x = 5.4,
                    y = 8
                }
            })
            .ErrorBars(err => err.YValue("1"))
        )
    )
```
{% if site.core %}
```TagHelper

    @addTagHelper *, Kendo.Mvc

    @{
        var scatter_data = new object[] {
            new {
                x= 6.4,
                y= 13.4
            },
            new {
                x= 1.7,
                y= 11
            }, 
            new {
                x= 5.4,
                y= 8
            }
        };
    }

    <kendo-chart name="chart">
        <series>
            <series-item type="ChartSeriesType.Scatter" data="scatter_data">
                <error-bars y-value="1"/>
            </series-item>
        </series>
    </kendo-chart>

```
{% endif %}

### Setting Percentage Values

You can also set the difference of the point value as percentage by setting a string value in the `"percenatage(n)"` format where `n` indicates the percent value.

```HtmlHelper
    @(Html.Kendo().Chart()
        .Name("chart")
        .Series(s => s
            .Column(new object[] {
                new {
                    value = 4.743
                },
                new {
                    value = 7.295
                },
                new {
                    value = 6.376
                }
            })
        )
        .ErrorBars(err => err.Value("percentage(20)"))
    )
```
{% if site.core %}
```TagHelper

    @addTagHelper *, Kendo.Mvc

    @{
        var column_data = new object[] {
            new {
                value = 4.743
            },
            new {
                value = 7.295
            },
            new {
                value = 6.376
            }
        };
    }

    <kendo-chart name="chart">
        <series>
            <series-item type="ChartSeriesType.Column" data="column_data">
                <error-bars value="percentage(20)"/>
            </series-item>
        </series>
    </kendo-chart>

```
{% endif %}

### Setting Statistical Values

The error bars support statistical calculations based on the series data. The supported types are the [standard error](http://en.wikipedia.org/wiki/Standard_error) and [population standard deviation](http://en.wikipedia.org/wiki/Standard_deviation). To specify that the standard error has to be used, set `"stderr"` as a value. To use standard deviation, set `"stddev"` with an optional number between parentheses appended at the end. The number will be multiplied by the calculated standard deviation value.

The following example demonstrates how to use the standard error type.

```HtmlHelper
    @(Html.Kendo().Chart()
        .Name("chart")
        .Series(s => s
            .Column(new object[] {
                new {
                    value = 4.743
                },
                new {
                    value = 7.295
                },
                new {
                    value = 6.376
                }
            })
        )
        .ErrorBars(err => err.Value("stderr"))
    )
```
{% if site.core %}
```TagHelper

    @addTagHelper *, Kendo.Mvc

    @{
        var column_data = new object[] {
            new {
                value = 4.743
            },
            new {
                value = 7.295
            },
            new {
                value = 6.376
            }
        };
    }

    <kendo-chart name="chart">
        <series>
            <series-item type="ChartSeriesType.Column" data="column_data">
                <error-bars value="stderr"/>
            </series-item>
        </series>
    </kendo-chart>

```
{% endif %}

The following example demonstrates how to use the standard deviation type.

```HtmlHelper
    @(Html.Kendo().Chart()
        .Name("chart")
        .Series(s => s
            .Column(new object[] {
                new {
                    value = 4.743
                },
                new {
                    value = 7.295
                },
                new {
                    value = 6.376
                }
            })
        )
        .ErrorBars(err => err.Value("stddev(0.5)"))
    )
```
{% if site.core %}
```TagHelper

    @addTagHelper *, Kendo.Mvc

    @{
        var column_data = new object[] {
            new {
                value = 4.743
            },
            new {
                value = 7.295
            },
            new {
                value = 6.376
            }
        };
    }

    <kendo-chart name="chart">
        <series>
            <series-item type="ChartSeriesType.Column" data="column_data">
                <error-bars value="stddev(0.5)"/>
            </series-item>
        </series>
    </kendo-chart>

```
{% endif %}

### Calculating Low and High Values

If you need a custom algorithm to calculate the low and high value, specify a function. The function accepts an object and returns a valid error bar value.

The following fields are available as object parameters:

* `dataItem`&mdash;The point data item.
* `value`&mdash;The point value.
* `index`&mdash;The point index in the series data.
* `category`&mdash;The point category value if a categorical chart is used.
* `series`&mdash;The series configuration.

The following example demonstrates how to use different percentages for the low and high values.

```HtmlHelper
    @(Html.Kendo().Chart()
        .Name("chart")
        .Series(s => s
            .Column(new object[] {
                new {
                    value = 4.743
                },
                new {
                    value = 7.295
                },
                new {
                    value = 6.376
                }
            })
        )
        .ErrorBars(err => err.ValueHandler("calculateError"))
    )
```
{% if site.core %}
```TagHelper

    @addTagHelper *, Kendo.Mvc

    @{
        var column_data = new object[] {
            new {
                value = 4.743
            },
            new {
                value = 7.295
            },
            new {
                value = 6.376
            }
        };
    }

    <kendo-chart name="chart">
        <series>
            <series-item type="ChartSeriesType.Column" data="column_data">
                <error-bars value-handler="calculateError"/>
            </series-item>
        </series>
    </kendo-chart>

```
{% endif %}
```JavaScript
    function calculateError(data) {
        var value = data.value;
        var lowPercentage = value * 0.05;
        var highPercentage = value * 0.1;

        return [lowPercentage, highPercentage];
    }
```

## See Also

* [Using the API of the Chart HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/chart-api/index)
* [Basic Usage of the Area Chart HtmlHelper for {{ site.framework }} (Demos)](https://demos.telerik.com/{{ site.platform }}/area-charts/index)
* [Basic Usage of the Area Chart TagHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/area-charts/tag-helper)
* [Server-Side API of the Chart for {{ site.framework }}](/api/chart)
