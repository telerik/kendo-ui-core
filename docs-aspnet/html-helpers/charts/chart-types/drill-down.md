---
title: Drilldown Charts
page_title: Drilldown Charts
description: "Learn the basics when working with the Drilldown Charts in the {{ site.product }} suite."
slug: htmlhelpers_drilldowncharts_aspnetcore
position: 3
---

# Drilldown Charts

The {{ site.product }} Chart supports a drill-down functionality that allows the user to explore the data.

The drill-down function allows users to click on a point (bar, pie segment, etc.) in order to navigate to a different view.
The new view usually contains finer-grained data about the selected item, like breakdown by product of the selected category.

The view hierarchy is displayed in a breadcrumb for easy navigation back to previous views.

## Getting Started

To configure a chart series for drill-down:

1. Set the [`DrilldownField()`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/chartbuilder#drilldownfieldsystemstring) to a field that contains the drill-down series configuration for each point.
1. Add a `ChartBreadcrumb` component and link it to the Chart.


```HtmlHelper
    @(Html.Kendo().ChartBreadcrumb()
        .Name("cb")
        .Chart("chart")
    )

    @(Html.Kendo().Chart<Kendo.Mvc.Examples.Models.CompanyModel>()
        .Name("chart")
        .Series(series =>
        {
            series.Column(model => model.Sales)
            .Name("Company sales")
            .CategoryField("CompanyName")
            .DrilldownField("Products")
            .DrilldownSeriesFactory("drillDownHandler");
        })
        .DataSource(dataSource => dataSource.Read(read => read.Action("Get_Companies", "Drilldown_Charts")))
        .Legend(legend => legend.Position(ChartLegendPosition.Bottom))
    )

    <script>
        function drillDownHandler(chartPoint) {
            return {
                type: 'column',
                name: chartPoint.parent().CompanyName + ' Products',
                data: chartPoint,
                field: 'Sales',
                categoryField: 'ProductName',
            };
        }
    </script>
```

{% if site.core %}
```TagHelper
        <kendo-chartbreadcrumb name="cb" chart="chart"></kendo-chartbreadcrumb>

        <kendo-chart name="chart">
            <series>
                <series-item type="ChartSeriesType.Column"
                             name="Company sales"
                             category-field="CompanyName"
                             field="Sales"
                             drilldown-field="Products" drilldown-series-factory="drillDownHandler">
                </series-item>
            </series>
            <chart-legend position="ChartLegendPosition.Bottom"></chart-legend>
            <datasource>
                <transport>
                    <read type="post" url="@Url.Action("Get_Companies", "Drilldown_Charts")" />
                </transport>
                <schema>
                    <model>
                        <fields>
                            <field name="CompanyName" type="string"></field>
                            <field name="Sales" type="number"></field>
                            <field name="Products" type="object"></field>
                        </fields>
                    </model>
                </schema>
            </datasource>
        </kendo-chart>
        <script>
            function drillDownHandler(chartPoint) {
                return {
                    type: 'column',
                    name: chartPoint.parent().CompanyName + ' Products',
                    data: chartPoint,
                    field: 'Sales',
                    categoryField: 'ProductName',
                };
            }
        </script>
```
```Controller
    public IActionResult Get_Companies()
    {
        return Json(ChartDataRepository.Companies());
    }
```
{% else %}

```Controller
    public ActionResult Get_Companies()
    {
        return Json(ChartDataRepository.Companies(), JsonRequestBehavior.AllowGet);
    }
```
{% endif %}

```C# ChartDataRepository
    public partial class ChartDataRepository
    {
        public static List<CompanyModel> Companies()
        {
            return new List<CompanyModel>()
            {
                new CompanyModel(){
                    CompanyName = "Company 1",
                    Sales = 100M,
                    Products = new List<ProductModel>()
                    {
                        new ProductModel(){ProductName = "Product A", Sales = 80M},
                        new ProductModel(){ProductName = "Product B", Sales = 20M},
                    }
                },
                new CompanyModel() {
                    CompanyName = "Company 2" ,
                    Sales = 200M,
                    Products = new List<ProductModel>()
                    {
                        new ProductModel(){ProductName = "Product A", Sales = 40M},
                        new ProductModel(){ProductName = "Product B", Sales = 160M},
                    }
                }
            };
        }
    }
```

## Drilling Down with Dynamic Data

The drill-down functionality enables you to drill past arbitrary data which is based on a upward level criteria.

To populate the drill-down series on dynamically:

1. Set the [`DrilldownField()`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/chartbuilder#drilldownfieldsystemstring) option to a field that contains the drill-down value field for each point.
1. Define a [`DrilldownSeriesFactory()`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/chartbuilder#drilldownseriesfactorysystemstring) function handler that returns the series definition for each data point.


{% if site.core %}
```HtmlHelper
    @(Html.Kendo().ChartBreadcrumb()
         .Name("cb")
         .Chart("chart")
    )

    @(Html.Kendo().Chart<Kendo.Mvc.Examples.Models.VehicleMake>()
        .Name("chart")
        .Series(series => 
        {
           series.Column(model => model.Count)
           .Name("Battery EVs registered in 2022")
           .CategoryField("Company")
           .DrilldownField("Company")
           .DrilldownSeriesFactory("drilldownByModel");
        })
        .DataSource(dataSource => dataSource.Read(read => read.Action("Get_VehicleMakes","Drilldown_Charts")))
        .Legend(legend => legend.Position(ChartLegendPosition.Bottom))
    )

    <script>
       var vehiclesByQuarter = @Html.Raw(Json.Serialize(@ViewData["VehiclesByQuarter"]));
       var vehiclesByModel = @Html.Raw(Json.Serialize(@ViewData["VehiclesByModel"]));
       function drilldownByQuarter(model) {
           const data = vehiclesByQuarter[model];
           
           if (data) {
               return {
                   type: 'column',
                   name: model + ' Sales by Quarter',
                   data,
                   field: 'Count',
                   categoryField: 'Period'
               };
           }
       }
       function drilldownByModel(make) {
           const data = vehiclesByModel[make];
           if (data) {
               return {
                   type: 'column',
                   name: make + ' Sales by Model',
                   data,
                   field: 'Count',
                   categoryField: 'Model',
                   drilldownField: 'Model',
                   drilldownSeriesFactory: drilldownByQuarter
               };
           }
       }
    </script>        
```
```TagHelper
    <kendo-chartbreadcrumb name="cb" chart="chart"></kendo-chartbreadcrumb>

    <kendo-chart name="chart">
        <series>
            <series-item type="ChartSeriesType.Column"
                         name="Battery EVs registered in 2022"
                         category-field="Company"
                         field="Count"
                         drilldown-field="Company" drilldown-series-factory="drilldownByModel">
            </series-item>
        </series>
        <chart-legend position="ChartLegendPosition.Bottom"></chart-legend>
        <datasource>
            <transport>
                <read type="post" url="@Url.Action("Get_VehicleMakes", "Drilldown_Charts")" />
            </transport>
            <schema>
                <model>
                    <fields>
                        <field name="Company" type="string"></field>
                        <field name="Count" type="number"></field>
                    </fields>
                </model>
            </schema>
        </datasource>
    </kendo-chart>

   <script>
       var vehiclesByQuarter = @Html.Raw(Json.Serialize(@ViewData["VehiclesByQuarter"]));
       var vehiclesByModel = @Html.Raw(Json.Serialize(@ViewData["VehiclesByModel"]));
       function drilldownByQuarter(model) {
           const data = vehiclesByQuarter[model];
           
           if (data) {
               return {
                   type: 'column',
                   name: model + ' Sales by Quarter',
                   data,
                   field: 'Count',
                   categoryField: 'Period'
               };
           }
       }
       function drilldownByModel(make) {
           const data = vehiclesByModel[make];
           if (data) {
               return {
                   type: 'column',
                   name: make + ' Sales by Model',
                   data,
                   field: 'Count',
                   categoryField: 'Model',
                   drilldownField: 'Model',
                   drilldownSeriesFactory: drilldownByQuarter
               };
           }
       }
    </script>        
```
```Controller
        public IActionResult Dynamic_Data()
        {
            ViewData["VehiclesByModel"] = ChartDataRepository.VehicleModels();
            ViewData["VehiclesByQuarter"] = ChartDataRepository.VehicleQuarters();

            return View();
        }

        public IActionResult Get_VehicleMakes()
        {
            return Json(ChartDataRepository.VehicleMakes());    
        }
```
{% else %}
```HtmlHelper
    @(Html.Kendo().ChartBreadcrumb()
         .Name("cb")
         .Chart("chart")
    )

    @(Html.Kendo().Chart<Kendo.Mvc.Examples.Models.VehicleMake>()
        .Name("chart")
        .Series(series => 
        {
           series.Column(model => model.Count)
           .Name("Battery EVs registered in 2022")
           .CategoryField("Company")
           .DrilldownField("Company")
           .DrilldownSeriesFactory("drilldownByModel");
        })
        .DataSource(dataSource => dataSource.Read(read => read.Action("Get_VehicleMakes","Drilldown_Charts")))
        .Legend(legend => legend.Position(ChartLegendPosition.Bottom))
    )

    <script>
       var vehiclesByQuarter = @Html.Raw(Json.Encode(@ViewData["VehiclesByQuarter"]));
       var vehiclesByModel = @Html.Raw(Json.Encode(@ViewData["VehiclesByModel"]));
       function drilldownByQuarter(model) {
           const data = vehiclesByQuarter[model];
           
           if (data) {
               return {
                   type: 'column',
                   name: model + ' Sales by Quarter',
                   data,
                   field: 'Count',
                   categoryField: 'Period'
               };
           }
       }
       function drilldownByModel(make) {
           const data = vehiclesByModel[make];
           if (data) {
               return {
                   type: 'column',
                   name: make + ' Sales by Model',
                   data,
                   field: 'Count',
                   categoryField: 'Model',
                   drilldownField: 'Model',
                   drilldownSeriesFactory: drilldownByQuarter
               };
           }
       }
    </script>     
```
```Controller
        public ActionResult Dynamic_Data()
        {
            ViewData["VehiclesByModel"] = ChartDataRepository.VehicleModels();
            ViewData["VehiclesByQuarter"] = ChartDataRepository.VehicleQuarters();

            return View();
        }

        public ActionResult Get_VehicleMakes()
        {
            return Json(ChartDataRepository.VehicleMakes(), JsonRequestBehavior.AllowGet);    
        }
```
{% endif %}

```C# ChartDataRepository
    public partial class ChartDataRepository
    {
        public static List<VehicleMake> VehicleMakes()
        {
            return new List<VehicleMake> {
                new VehicleMake { Company = "Tesla", Count = 314159 },
                new VehicleMake { Company = "VW", Count = 112645  },
            };
        }

        public static Dictionary<string, List<VehicleModel>> VehicleModels()
        {
            var vehiclesByModel = new Dictionary<string, List<VehicleModel>>
            {
                {
                    "Tesla",
                    new List<VehicleModel>()
                    {
                        new VehicleModel { Model = "Model 3", Count = 225350},
                        new VehicleModel { Model = "Model Y", Count = 40159}
                    }
                },

                {
                    "VW",
                    new List<VehicleModel>()
                    {
                        new VehicleModel { Model = "ID.3", Count = 60274},
                        new VehicleModel { Model = "ID.4", Count = 20302}
                    }
                }
            };

            return vehiclesByModel;
        }

        public static Dictionary<string, List<Quarter>> VehicleQuarters()
        {
            var vehiclesByModel = new Dictionary<string, List<Quarter>>
            {
                {
                    "Model 3",
                    new List<Quarter>()
                    {
                        new Quarter { Period = "2022 Q1", Count = 97436},
                        new Quarter { Period = "2022 Q2", Count = 103436},
                        new Quarter { Period = "2022 Q3", Count = 113461}
                    }
                },

                {
                    "Model Y",
                    new List<Quarter>()
                    {
                        new Quarter { Period = "2022 Q1", Count = 7738},
                        new Quarter { Period = "2022 Q2", Count = 11932},
                        new Quarter { Period = "2022 Q3", Count = 20489}
                    }
                },

                {
                    "ID.3",
                    new List<Quarter>()
                    {
                        new Quarter { Period = "2022 Q1", Count = 18164},
                        new Quarter { Period = "2022 Q2", Count = 20087},
                        new Quarter { Period = "2022 Q3", Count = 22023}
                    }
                },

                {
                    "ID.4",
                    new List<Quarter>()
                    {
                        new Quarter { Period = "2022 Q1", Count = 5841},
                        new Quarter { Period = "2022 Q2", Count = 6715},
                        new Quarter { Period = "2022 Q3", Count = 7746}
                    }
                }
            };

            return vehiclesByModel;
        }
    }
```

## Drilling Down with Async Data

The drill-down functionality gives you the ability to configure the drill levels in an asynchronous manner by using a `Promise`.

To populate the drilldown series asynchronously:

1. Set the [`DrilldownField()`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/chartbuilder#drilldownfieldsystemstring) option to a field that contains the drill-down value field for each point.
1. Define a [`DrilldownSeriesFactory()`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/chartbuilder#drilldownseriesfactorysystemstring) function handler that returns a `Promise` that resolves to the series definition for each data point.

{% if site.core %}
```HtmlHelper
    @(Html.Kendo().ChartBreadcrumb()
         .Name("cb")
         .Chart("chart")
    )

    @(Html.Kendo().Chart<Kendo.Mvc.Examples.Models.VehicleMake>()
        .Name("chart")
        .Series(series => 
        {
           series.Column(model => model.Count)
           .Name("Battery EVs registered in 2022")
           .CategoryField("Company")
           .DrilldownField("Company").DrilldownSeriesFactory("drilldownByModel");
        })
        .DataSource(dataSource => dataSource.Read(read => read.Action("Get_VehicleMakes","Drilldown_Charts")))
        .Legend(legend => legend.Position(ChartLegendPosition.Bottom))
    )

    <script>
       var vehiclesByModel = @Html.Raw(Json.Serialize(@ViewData["VehiclesByModel"]));

       function drilldownByModel(make) {
           return new Promise(function(resolve, reject) {
            const data = vehiclesByModel[make];
            if (data) {
                resolve({
                    type: 'column',
                    name: make + ' Sales by Model',
                    data,
                    field: 'count',
                    categoryField: 'model'
                });
            } else {
                reject('No data for ' + model);
            }
          });
       }
    </script>        
```
```TagHelper
    <kendo-chartbreadcrumb name="cb" chart="chart"></kendo-chartbreadcrumb>

    <kendo-chart name="chart">
        <series>
            <series-item type="ChartSeriesType.Column"
                         name="Battery EVs registered in 2022"
                         category-field="Company"
                         field="Count"
                         drilldown-field="Company" drilldown-series-factory="drilldownByModel">
            </series-item>
        </series>
        <chart-legend position="ChartLegendPosition.Bottom"></chart-legend>
        <datasource>
            <transport>
                <read type="post" url="@Url.Action("Get_VehicleMakes", "Drilldown_Charts")" />
            </transport>
            <schema>
                <model>
                    <fields>
                        <field name="Company" type="string"></field>
                        <field name="Count" type="number"></field>
                    </fields>
                </model>
            </schema>
        </datasource>
    </kendo-chart>

   <script>
       var vehiclesByModel = @Html.Raw(Json.Serialize(@ViewData["VehiclesByModel"]));

       function drilldownByModel(make) {
           return new Promise(function(resolve, reject) {
            const data = vehiclesByModel[make];
            if (data) {
                resolve({
                    type: 'column',
                    name: make + ' Sales by Model',
                    data,
                    field: 'count',
                    categoryField: 'model'
                });
            } else {
                reject('No data for ' + model);
            }
          });
       }
    </script>        
```
```Controller
    public IActionResult Dynamic_Data()
    {
        ViewData["VehiclesByModel"] = ChartDataRepository.VehicleModels();

        return View();
    }

    public IActionResult Get_VehicleMakes()
    {
        return Json(ChartDataRepository.VehicleMakes());    
    }
```
{% else %}
```HtmlHelper
    @(Html.Kendo().ChartBreadcrumb()
         .Name("cb")
         .Chart("chart")
    )

    @(Html.Kendo().Chart<Kendo.Mvc.Examples.Models.VehicleMake>()
        .Name("chart")
        .Series(series => 
        {
           series.Column(model => model.Count)
           .Name("Battery EVs registered in 2022")
           .CategoryField("Company")
           .DrilldownField("Company").DrilldownSeriesFactory("drilldownByModel");
        })
        .DataSource(dataSource => dataSource.Read(read => read.Action("Get_VehicleMakes","Drilldown_Charts")))
        .Legend(legend => legend.Position(ChartLegendPosition.Bottom))
    )

    <script>
       var vehiclesByModel = @Html.Raw(Json.Encode(@ViewData["VehiclesByModel"]));
       
       function drilldownByModel(make) {
         return new Promise(function(resolve, reject) {
            const data = vehiclesByModel[make];
            if (data) {
                resolve({
                    type: 'column',
                    name: make + ' Sales by Model',
                    data,
                    field: 'count',
                    categoryField: 'model'
                });
            } else {
                reject('No data for ' + model);
            }
          });
       }
    </script>     
```
```Controller
    public ActionResult Dynamic_Data()
    {
        ViewData["VehiclesByModel"] = ChartDataRepository.VehicleModels();

        return View();
    }

    public ActionResult Get_VehicleMakes()
    {
        return Json(ChartDataRepository.VehicleMakes(), JsonRequestBehavior.AllowGet);    
    }
```
{% endif %}

```C# ChartDataRepository
    public partial class ChartDataRepository
    {
        public static List<VehicleMake> VehicleMakes()
        {
            return new List<VehicleMake> {
                new VehicleMake { Company = "Tesla", Count = 314159 },
                new VehicleMake { Company = "VW", Count = 112645  },
            };
        }

        public static Dictionary<string, List<VehicleModel>> VehicleModels()
        {
            var vehiclesByModel = new Dictionary<string, List<VehicleModel>>
            {
                {
                    "Tesla",
                    new List<VehicleModel>()
                    {
                        new VehicleModel { Model = "Model 3", Count = 225350},
                        new VehicleModel { Model = "Model Y", Count = 40159}
                    }
                },

                {
                    "VW",
                    new List<VehicleModel>()
                    {
                        new VehicleModel { Model = "ID.3", Count = 60274},
                        new VehicleModel { Model = "ID.4", Count = 20302}
                    }
                }
            };

            return vehiclesByModel;
        }
    }
```

## Customizing the Breadcrumb Root Item

To customize the root item of the Chart's Breadcrumb and change its appearance, set the `RootItem()` of the `ChartBreadCrumb` component.

```HtmlHelper
    @(Html.Kendo().ChartBreadcrumb()
        .Name("cb")
        .RootItem(rootItem => {
            rootItem.Type("rootItem");
            rootItem.Text("Home");
            rootItem.ShowIcon(false);
            rootItem.ShowText(true);
        })
        .Chart("chart")
    )

    @(Html.Kendo().Chart<Kendo.Mvc.Examples.Models.CompanyModel>()
        .Name("chart")
        .Series(series =>
        {
            series.Column(model => model.Sales)
            .Name("Company sales")
            .CategoryField("CompanyName")
            .DrilldownField("Products")
            .DrilldownSeriesFactory("drillDownHandler");
        })
        .DataSource(dataSource => dataSource.Read(read => read.Action("Get_Companies", "Drilldown_Charts")))
        .Legend(legend => legend.Position(ChartLegendPosition.Bottom))
    )

    <script>
        function drillDownHandler(chartPoint) {
            return {
                type: 'column',
                name: chartPoint.parent().CompanyName + ' Products',
                data: chartPoint,
                field: 'Sales',
                categoryField: 'ProductName',
            };
        }
    </script>
```

{% if site.core %}
```TagHelper
        <kendo-chartbreadcrumb name="cb" chart="chart">
            <root-item type="rootItem" text="Home" showIcon="false" showText="show"/>
        </kendo-chartbreadcrumb>

        <kendo-chart name="chart">
            <series>
                <series-item type="ChartSeriesType.Column"
                             name="Company sales"
                             category-field="CompanyName"
                             field="Sales"
                             drilldown-field="Products" drilldown-series-factory="drillDownHandler">
                </series-item>
            </series>
            <chart-legend position="ChartLegendPosition.Bottom"></chart-legend>
            <datasource>
                <transport>
                    <read type="post" url="@Url.Action("Get_Companies", "Drilldown_Charts")" />
                </transport>
                <schema>
                    <model>
                        <fields>
                            <field name="CompanyName" type="string"></field>
                            <field name="Sales" type="number"></field>
                            <field name="Products" type="object"></field>
                        </fields>
                    </model>
                </schema>
            </datasource>
        </kendo-chart>
        <script>
            function drillDownHandler(chartPoint) {
                return {
                    type: 'column',
                    name: chartPoint.parent().CompanyName + ' Products',
                    data: chartPoint,
                    field: 'Sales',
                    categoryField: 'ProductName',
                };
            }
        </script>
```
```Controller
    public IActionResult Get_Companies()
    {
        return Json(ChartDataRepository.Companies());
    }
```
{% else %}

```Controller
    public ActionResult Get_Companies()
    {
        return Json(ChartDataRepository.Companies(), JsonRequestBehavior.AllowGet);
    }
```
{% endif %}

```C# ChartDataRepository
    public partial class ChartDataRepository
    {
        public static List<CompanyModel> Companies()
        {
            return new List<CompanyModel>()
            {
                new CompanyModel(){
                    CompanyName = "Company 1",
                    Sales = 100M,
                    Products = new List<ProductModel>()
                    {
                        new ProductModel(){ProductName = "Product A", Sales = 80M},
                        new ProductModel(){ProductName = "Product B", Sales = 20M},
                    }
                },
                new CompanyModel() {
                    CompanyName = "Company 2" ,
                    Sales = 200M,
                    Products = new List<ProductModel>()
                    {
                        new ProductModel(){ProductName = "Product A", Sales = 40M},
                        new ProductModel(){ProductName = "Product B", Sales = 160M},
                    }
                }
            };
        }
    }
```

## Implementing Custom Navigation

The drill-down functionality enables you to alter the default navigation and provide a custom incarnation of your own, by programmatically changing the navigational items.

To implement a custom drill-down navigation:

1. Handle the [`DrillDown`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/charteventbuilder#databoundsystemstring) event to append new drill-down levels to the navigation.
1. Within the handler, call the [`resetDrilldownLevel()`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart/methods/resetdrilldownlevel) client-side method to return to a previous level.

```HtmlHelper
    @(Html.Kendo().ChartBreadcrumb()
        .Name("cb")
        .Events(events => events.Click("onBreadcrumbClick"))
        .Chart("chart")
    )

    @(Html.Kendo().Chart<Kendo.Mvc.Examples.Models.CompanyModel>()
        .Name("chart")
        .Events(events => events.Drilldown("onDrillDown"))
        .Series(series =>
        {
            series.Column(model => model.Sales)
            .Name("Company sales")
            .CategoryField("CompanyName")
            .DrilldownField("Products").DrilldownSeriesFactory("drillDownHandler");
        })
        .DataSource(dataSource => dataSource.Read(read => read.Action("Get_Companies", "Drilldown_Charts")))
        .Legend(legend => legend.Position(ChartLegendPosition.Bottom))
    )

    <script>
        var navItems = [{
          type: 'rootitem',
          icon: 'home',
          text: 'Home',
          showIcon: true
        }];

        function refreshBreadcrumb() {
          var breadcrumb = $('#cb').getKendoBreadcrumb();
          breadcrumb.items(navItems);
        }

        function onDrilldown(e) {
            navItems.push({
              text: e.point.category.toString()
            });
            refreshBreadcrumb();
        }

        function onBreadcrumbClick(e) {
            var level = navItems.indexOf(e.item);
            $("#chart").getKendoChart().resetDrilldownLevel(level);
            navItems = navItems.slice(0, level + 1);
            refreshBreadcrumb();
        }

        function drillDownHandler(chartPoint) {
            return {
                type: 'column',
                name: chartPoint.parent().CompanyName + ' Products',
                data: chartPoint,
                field: 'Sales',
                categoryField: 'ProductName',
            };
        }
    </script>
```

{% if site.core %}
```TagHelper
        <kendo-chartbreadcrumb name="cb" chart="chart" on-click="onBreadcrumbClick">
            <root-item type="rootItem" text="Home" showIcon="false" showText="show"/>
        </kendo-chartbreadcrumb>

        <kendo-chart name="chart" on-drilldown="onDrilldown">
            <series>
                <series-item type="ChartSeriesType.Column"
                             name="Company sales"
                             category-field="CompanyName"
                             field="Sales"
                             drilldown-field="Products" drilldown-series-factory="drillDownHandler">
                </series-item>
            </series>
            <chart-legend position="ChartLegendPosition.Bottom"></chart-legend>
            <datasource>
                <transport>
                    <read type="post" url="@Url.Action("Get_Companies", "Drilldown_Charts")" />
                </transport>
                <schema>
                    <model>
                        <fields>
                            <field name="CompanyName" type="string"></field>
                            <field name="Sales" type="number"></field>
                            <field name="Products" type="object"></field>
                        </fields>
                    </model>
                </schema>
            </datasource>
        </kendo-chart>
        <script>
             var navItems = [{
              type: 'rootitem',
              icon: 'home',
              text: 'Home',
              showIcon: true
            }];

            function refreshBreadcrumb() {
              var breadcrumb = $('#cb').getKendoBreadcrumb();
              breadcrumb.items(navItems);
            }

            function onDrilldown(e) {
                navItems.push({
                  text: e.point.category.toString()
                });
                refreshBreadcrumb();
            }

            function onBreadcrumbClick(e) {
                var level = navItems.indexOf(e.item);
                $("#chart").getKendoChart().resetDrilldownLevel(level);
                navItems = navItems.slice(0, level + 1);
                refreshBreadcrumb();
            }
            function drillDownHandler(chartPoint) {
                return {
                    type: 'column',
                    name: chartPoint.parent().CompanyName + ' Products',
                    data: chartPoint,
                    field: 'Sales',
                    categoryField: 'ProductName',
                };
            }
        </script>
```
```Controller
    public IActionResult Get_Companies()
    {
        return Json(ChartDataRepository.Companies());
    }
```
{% else %}

```Controller
    public ActionResult Get_Companies()
    {
        return Json(ChartDataRepository.Companies(), JsonRequestBehavior.AllowGet);
    }
```
{% endif %}

```C# ChartDataRepository
    public partial class ChartDataRepository
    {
        public static List<CompanyModel> Companies()
        {
            return new List<CompanyModel>()
            {
                new CompanyModel(){
                    CompanyName = "Company 1",
                    Sales = 100M,
                    Products = new List<ProductModel>()
                    {
                        new ProductModel(){ProductName = "Product A", Sales = 80M},
                        new ProductModel(){ProductName = "Product B", Sales = 20M},
                    }
                },
                new CompanyModel() {
                    CompanyName = "Company 2" ,
                    Sales = 200M,
                    Products = new List<ProductModel>()
                    {
                        new ProductModel(){ProductName = "Product A", Sales = 40M},
                        new ProductModel(){ProductName = "Product B", Sales = 160M},
                    }
                }
            };
        }
    }
```

## See Also

* [Drilldown Chart HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/drilldown-charts/index)
* [Server-Side API for {{ site.framework }} ](/api/chart)