---
title: Overview
page_title: Overview | Kendo UI Chart HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI Chart widget for ASP.NET MVC."
slug: overview_charthelper_aspnetmvc
position: 1
---

# Chart HtmlHelper Overview

The Chart HtmlHelper extension is a server-side wrapper for the [Kendo UI Chart](https://demos.telerik.com/kendo-ui/area-charts/index) widgets.

## Getting Started

### The Basics

There are two ways to bind a Kendo UI Chart for ASP.NET MVC:

* `server`&mdash;The Chart is bound to a supplied model.
* `ajax`&mdash;The Chart makes Ajax requests to get the data.

### Server Binding

Below are listed the steps for you to follow when configuring the Kendo UI Chart for server binding to the to the list of **InternetUsers**.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

**Step 2** Create a new action method and pass the **InternetUsers** list as the model.

###### Example

        public ActionResult Index()
        {
            return View(ChartDataRepository.InternetUsers());
        }

**Step 3** Make your view strongly typed.

###### Example

```tab-ASPX

        <%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master"
           Inherits="System.Web.Mvc.ViewPage<IEnumerable<MvcApplication1.Models.InternetUsers>>" %>
```
```tab-Razor

        @model IEnumerable<MvcApplication1.Models.InternetUsers>
```

**Step 4** Add a server-bound Chart.

###### Example

```tab-ASPX

        <%: Html.Kendo().Chart(Model) //The Chart will be bound to the Model which is the InternetUsers list.
                .Name("internetUsersChart") //The name of the Chart is mandatory. It specifies the "id" attribute of the widget.
                .Title("Internet Users")
                .Series(series => {
                    series.Bar(model => model.Value) //Create a Bar Chart series bound to the "Value" property.
                          .Name("United States");
                })
                .CategoryAxis(axis => axis
                    .Categories(model => model.Year)
                )
        %>
```
```tab-Razor

        @(Html.Kendo().Chart(Model) //The Chart will be bound to the Model which is the InternetUsers list
              .Name("internetUsersChart") //The name of the Chart is mandatory. It specifies the "id" attribute of the widget.
              .Title("Internet Users")
              .Series(series => {
                  series.Bar(model => model.Value) //Create a Bar Chart series bound to the "Value" property.
                        .Name("United States");
              })
              .CategoryAxis(axis => axis
                  .Categories(model => model.Year)
              )
        )
```

## Event Handling

You can subscribe to all Chart [events](/api/javascript/dataviz/ui/chart#events).

### By Handler Name

The examples below demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

      <%: Html.Kendo().Chart(Model)
              .Name("internetUsersChart")
              .Events(e => e
                  .DataBound("internetUsersChart_dataBound")
                  .SeriesClick("internetUsersChart_seriesClick")
              )
      %>

      <script>
          function internetUsersChart_dataBound() {
              //Handle the dataBound event.
          }

          function internetUsersChart_seriesClick() {
              //Handle the series click event.
          }
      </script>
```
```tab-Razor

      @(Html.Kendo().Chart(Model)
            .Name("internetUsersChart")
            .Events(e => e
                .DataBound("internetUsersChart_dataBound")
                .SeriesClick("internetUsersChart_seriesClick")
            )
      )

      <script>
          function internetUsersChart_dataBound() {
              //Handle the dataBound event.
          }

          function internetUsersChart_seriesClick() {
              //Handle the seriesClick event.
          }
      </script>
```

### By Template Delegate

The example below demonstrates how to subscribe to events by a template delegate.

###### Example

```tab-Razor

      @(Html.Kendo().Chart(Model)
            .Name("internetUsersChart")
            .Events(e => e
                .DataBound(@<text>
                     function() {
                         //Handle the dataBound event inline.
                     }
                </text>)
                .SeriesClick(@<text>
                     function() {
                         //Handle the seriesClick event inline.
                     }
                </text>)
            )
      )
```

## Reference

### Existing Instances

You can reference an existing Kendo UI Chart instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [Chart API](/api/javascript/dataviz/ui/chart#methods) to control its behavior.

###### Example

      //Put this after your Kendo UI Chart for ASP.NET MVC declaration.
      <script>
          $(function() {
              //Notice that the Name() of the Chart is used to get its client-side instance.
              var chart = $("#internetUsersChart").data("kendoChart");
          });
      </script>

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the Chart:

* [ASP.NET MVC API Reference: ChartBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartBuilder)
* [How to Bind to SignalR Hubs in ASP.NET MVC Apps]({% slug howto_bindtosignalr_chartaspnetmvc %})
* [How to Create View Model Bound Dynamic Series in ASP.NET MVC Apps]({% slug howto_cerateviewmodelboundseries_chartaspnetmvc %})
* [Ajax Binding of the Kendo UI Chart for ASP.NET MVC]({% slug ajaxbinding_charthelper_aspnetmvc %})
* [Scaffolding of the Kendo UI Chart for ASP.NET MVC]({% slug scaffoldingchart_aspnetmvc %})
* [Overview of the Kendo UI Chart Widget]({% slug overview_kendoui_charts_widget %})
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
