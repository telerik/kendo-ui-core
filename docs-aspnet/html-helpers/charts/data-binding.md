---
title: Data Binding
page_title: Data Binding
description: "Learn the basics about binding the Telerik UI Chart HtmlHelper for {{ site.framework }} (MVC 6 or {{ site.framework }} MVC) to data."
previous_url: /helpers/html-helpers/charts/chart/data-binding, /helpers/charts/data-binding
slug: htmlhelpers_charts_databinding_aspnetcore
position: 2
---

# Data Binding

You can populate the Telerik UI Chart for {{ site.framework }} with data by [binding it to inline data](#inline-data), [binding it to local data](#local-data), or [binding it to remote data](#remote-data).

## Inline Data

You can specify the data points of the Charts as part of the series definitions. The type of the data points depends on the type of the series.

* [Binding categorical series to inline data](#binding-categorical-series-to-inline-data)
* [Binding scatter series to inline data](#binding-scatter-series-to-inline-data)
* [Binding to arrays of objects](#binding-to-arrays-of-objects)

### Binding Categorical Series to Inline Data

[Categorical series]({% slug htmlhelpers_categoricalcharts_aspnetcore %}), such as Bar, Line, or Area, expect a data point of a numeric type. The category names are populated independently in the category axis.

> To keep the Chart consistent, all series have to contain the same number of points in an order that matches the order of the categories which are declared in `CategoryAxis`.

	@(Html.Kendo().Chart()
        .Name("chart")
        .Series(series =>
        {
            series.Line(new double[] { 3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855 }).Name("India");
            series.Line(new double[] { 1.988, 2.733, 3.994, 3.464, 4.001, 3.939, 1.333, -2.245, 4.339, 2.727 }).Name("World");
            series.Line(new double[] { 4.743, 7.295, 7.175, 6.376, 8.153, 8.535, 5.247, -7.832, 4.3, 4.3 }).Name("Russian Federation");
            series.Line(new double[] { -0.253, 0.362, -3.519, 1.799, 2.252, 3.343, 0.843, 2.877, -5.416, 5.590 }).Name("Haiti");
        })
        .CategoryAxis(axis => axis
            .Categories("2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011")
            .MajorGridLines(lines => lines.Visible(false))
        )
        .ValueAxis(axis => axis
            .Numeric().Labels(labels => labels.Format("{0}%"))
            .Line(line => line.Visible(false))
            .AxisCrossingValue(-10)
        )
	)

### Binding Scatter Series to Inline Data

[Scatter series]({% slug htmlhelpers_scattercharts_aspnetcore %}) include the two-dimensional Scatter and ScatterLine series. Each data point in the series has to be an array which contains an X and a Y value.

    @(Html.Kendo().Chart()
        .Name("chart")
        .Title("Rainfall - Wind Speed")
        .Legend(legend => legend
            .Position(ChartLegendPosition.Bottom)
        )
        .SeriesDefaults(seriesDefaults => seriesDefaults
            .Scatter().Labels(labels => labels
                .Visible(false)
            )
        )
        .Series(series =>
        {
            series.Scatter(new double[][] { new[] { 16.4, 5.4 }, new[] { 21.7, 2 }, new[] { 25.4, 3 }, new[] { 19.0, 2.0 }, new[] { 10.9, 1 } })
                .Name("January 2008");

            series.Scatter(new double[][] { new[] { 6.4, 13.4 }, new[] { 1.7, 11 }, new[] { 5.4, 8 }, new[] { 9.0, 17.0 }, new[] { 1.9, 4 } })
                .Name("January 2009");

            series.Scatter(new double[][] { new[] { 21.7, 3 }, new[] { 13.6, 3.5 }, new[] { 13.6, 3 }, new[] { 29.9, 3 }, new[] { 21.7, 20 } })
                .Name("January 2010");
        })
        .XAxis(x => x
            .Numeric()
            .Title(title => title.Text("Wind Speed [km/h]"))
            .Max(35)
        )
        .YAxis(y => y
            .Numeric()
            .Title(title => title.Text("Rainfall [mm]"))
            .AxisCrossingValue(-5)
            .Min(-5)
            .Max(25)
        )
    )

### Binding to Arrays of Objects

A more flexible alternative is to provide the series with an array of objects. This enables you to map each value to the corresponding series field which is useful for series that have both numeric and string fields in a single data point such as Pie, Donut, Bubble, and so on.

    @(Html.Kendo().Chart()
      .Name("chart")
      .Legend(legend => legend
          .Visible(false)
      )
      .Series(series =>
      {
          series.Donut(new dynamic[] {
          new {category = "Asia",value = 53.8,color = "#9de219"},
          new {category = "Europe",value = 16.1,color = "#90cc38"},
          new {category = "Latin America",value = 11.3,color = "#068c35"},
          new {category = "Africa",value = 9.6,color = "#006634"},
          new {category = "Middle East",value = 5.2,color = "#004d38"},
          new {category = "North America",value = 3.6,color = "#033939"}
          })
          .Name("2012")
          .Labels(labels => labels
              .Visible(true)
              .Position(ChartSeriesLabelsPosition.OutsideEnd)
              .Template("#= category #: \n #= value#%")
              .Background("transparent")
          );
      })
      .Tooltip(tooltip => tooltip
          .Visible(true)
          .Template("#= category # (#= series.name #): #= value #%")
      )
    )

## Local Data

You can bind the Chart to a data set in the view model or to items that are stored in `ViewBag`/`ViewData`.

```tab-Controller
        public IActionResult Local_Data_Binding()
        {
            var internetUsers = new InternetUsers[] {
                new InternetUsers(2000,43.1,"United States"),
                new InternetUsers(2001,49.2,"United States"),
                new InternetUsers(2002,59.0,"United States"),
                new InternetUsers(2003,61.9,"United States"),
                new InternetUsers(2004,65,"United States"),
                new InternetUsers(2005,68.3,"United States"),
                new InternetUsers(2006,69.2,"United States"),
                new InternetUsers(2007,75.3,"United States"),
                new InternetUsers(2008,74.2,"United States"),
                new InternetUsers(2009,71.2,"United States"),
                new InternetUsers(2010,74.2,"United States"),
                new InternetUsers(2011,78.2,"United States")
            };
            return View(internetUsers);
        }
```
```tab-Model
    public class InternetUsers
    {
        public InternetUsers()
        {
        }

        public InternetUsers(int year, double value, string country)
        {
            Year = year;
            Value = value;
            Country = country;
        }

        public int Year { get; set; }
        public double Value { get; set; }
        public string Country { get; set; }
    }
```
```tab-Razor
    @model IEnumerable<LocalBindingExample.Models.InternetUsers>

    @(Html.Kendo().Chart(Model)
        .Name("chart")
        .Title("Internet Users in United States")
        .Legend(legend => legend.Visible(false))
        .Series(series => {
            series.Line(model => model.Value)
                .Name("United States").CategoryField("Year")
                .Labels(labels => labels.Format("{0}%").Visible(true));
        })
        .CategoryAxis(axis => axis
            .MajorGridLines(lines => lines.Visible(false))
        )
        .ValueAxis(axis => axis.Numeric()
            .Labels(labels => labels.Format("{0}%"))
            .Line(lines => lines.Visible(false))
        )
    )
```

## Remote Data

The most flexible form of data binding is to use the DataSource component. You can easily configure the component to request data from a controller method or a remote API endpoint by using Ajax requests.

To bind to remote data by using the DataSource component:

1. Add a new action method in your controller that returns the data set.

    ```tab-Controller
            [HttpPost]
            public IActionResult _SpainElectricityProduction()
            {
                // Data is usually read from a data context. Static data is used in this example for clarity.
                var result = new ElectricityProduction[] {
                    new ElectricityProduction("2000", 18, 31807, 4727, 62206),
                    new ElectricityProduction("2001", 24, 43864, 6759, 63708),
                    new ElectricityProduction("2002", 30, 26270, 9342, 63016),
                    new ElectricityProduction("2003", 41, 43897, 12075, 61875),
                    new ElectricityProduction("2004", 56, 34439, 15700, 63606),
                    new ElectricityProduction("2005", 41, 23025, 21176, 57539),
                    new ElectricityProduction("2006", 119, 29831, 23297, 60126),
                    new ElectricityProduction("2007", 508, 30522, 27568, 55103),
                    new ElectricityProduction("2008", 2578, 26112, 32203, 58973)
                };
                return Json(result);
            }
    ```
    ```tab-Model
        public class ElectricityProduction
        {
            public ElectricityProduction()
            {
            }

            public ElectricityProduction(string year, int solar, int hydro, int wind, int nuclear)
            {
                Year = year;
                Solar = solar;
                Hydro = hydro;
                Wind = wind;
                Nuclear = nuclear;
            }

            public string Year { get; set; }
            public int Solar { get; set; }
            public int Nuclear { get; set; }
            public int Hydro { get; set; }
            public int Wind { get; set; }
        }
    ```

1. In the view, configure the Chart to use the action method that you created.

    @(Html.Kendo().Chart<RemoteBindingExample.Models.ElectricityProduction>()
        .Name("chart")
        .Title("Spain electricity production (GWh)")
        .Legend(legend => legend
            .Position(ChartLegendPosition.Top)
        )
        .DataSource(ds => ds.Read(read => read.Action("_SpainElectricityProduction", "Line_Charts")))
        .Series(series => {
            series.Line(model => model.Nuclear).Name("Nuclear").CategoryField("Year");
            series.Line(model => model.Hydro).Name("Hydro").CategoryField("Year");
            series.Line(model => model.Wind).Name("Wind").CategoryField("Year");
        })
        .CategoryAxis(axis => axis
            .Labels(labels => labels.Rotation(-90))
            .Crosshair(c => c.Visible(true))
        )
        .ValueAxis(axis => axis.Numeric()
            .Labels(labels => labels.Format("{0:N0}"))
            .MajorUnit(10000)
        )
        .Tooltip(tooltip => tooltip
            .Visible(true)
            .Shared(true)
            .Format("{0:N0}")
        )
    )

1. (Optional) Configure a Custom DataSource.

    Unlike the Grid, the Chart is configured to read a flat data response by default. If you have custom logic that requires the usage of the `ToDataSourceResult()` extension method when returning data for the Chart, configure a custom DataSource with a schema that can correctly parse the response.

    ```tab-Controller
        public IActionResult Products_Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(productService.Read().ToDataSourceResult(request));
        }
    ```
    ```tab-Razor
        @(Html.Kendo().Chart<Kendo.Mvc.Examples.Models.ProductViewModel>()
            .Name("chart")
            .Title("Product Prices")
            .Legend(legend => legend
                .Position(ChartLegendPosition.Top)
            )
            .DataSource(source =>
            {
                source.Custom()
                    .Type("aspnetmvc-ajax")
                    .Transport(transport =>
                    {
                        transport.Read("Products_Read", "Chart");
                    })
                    .Schema(schema =>
                    {
                        schema.Data("Data")
                            .Total("Total");
                    });
            })
            .Series(series =>
            {
                series.Column(model => model.UnitPrice).Name("Price").CategoryField("ProductName");
            })
        )
    ```

## See Also

* [Using the API of the Chart HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/chart-api/index)
* [Basic Usage of the Area Chart HtmlHelper for {{ site.framework }} (Demos)](https://demos.telerik.com/{{ site.platform }}/area-charts/index)
* [Server-Side API](/api/chart)
