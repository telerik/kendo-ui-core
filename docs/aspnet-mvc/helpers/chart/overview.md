---
title: Overview
page_title: Chart HtmlHelper extension | Kendo UI documentation
description: Configuration of Kendo UI Chart widget for server binding in quick steps, add Chart HtmlHelper extension, manipulate Kendo UI chart events.
---

# Chart

The Chart HtmlHelper extension is a server-side wrapper for the [Kendo UI Chart](/api/dataviz/chart) widget.

## Getting Started

There are two ways to bind a Kendo Chart for ASP.NET MVC:

*   server - the chart will bind to a supplied model
*   ajax - the chart will make ajax requests when binding

Here is how to configure the Kendo Chart for server binding to the list of InternetUsers:

1.  Make sure you have followed all the steps from the [Introduction](/aspnet-mvc/introduction) help topic.

2.  Create a new action method and pass the InternetUsers list as the model:

        public ActionResult Index()
        {
            return View(ChartDataRepository.InternetUsers());
        }

3.  Make your view strongly typed:
    - WebForms

            <%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master"
               Inherits="System.Web.Mvc.ViewPage<IEnumerable<MvcApplication1.Models.InternetUsers>>" %>
    - Razor

            @model IEnumerable<MvcApplication1.Models.InternetUsers>
4.  Add a server bound chart:
    - WebForms

            <%: Html.Kendo().Chart(Model) // The chart will be bound to the Model which is the InternetUsers list
                    .Name("internetUsersChart") // The name of the chart is mandatory. It specifies the "id" attribute of the widget.
                    .Title("Internet Users")
                    .Series(series => {
                        series.Bar(model => model.Value) // Create a bar chart series bound to the "Value" property
                              .Name("United States");
                    })
                    .CategoryAxis(axis => axis
                        .Categories(model => model.Year)
                    )
            %>
    - Razor

            @(Html.Kendo().Chart(Model) // The chart will be bound to the Model which is the InternetUsers list
                  .Name("internetUsersChart") // The name of the chart is mandatory. It specifies the "id" attribute of the widget.
                  .Title("Internet Users")
                  .Series(series => {
                      series.Bar(model => model.Value) // Create a bar chart series bound to the "Value" property
                            .Name("United States");
                  })
                  .CategoryAxis(axis => axis
                      .Categories(model => model.Year)
                  )
            )

## Accessing an Existing Chart

You can reference an existing chart instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/dataviz/chart#methods) to control its behavior.

### Accessing an existing Chart instance

    // Put this after your Kendo Chart for ASP.NET MVC declaration
    <script>
        $(function() {
            // Notice that the Name() of the chart is used to get its client-side instance
            var chart = $("#internetUsersChart").data("kendoChart");
        });
    </script>

## Handling Kendo UI Chart events

You can subscribe to all [events](/api/dataviz/chart#events) exposed by Kendo UI Chart:


### WebForms - subscribe by handler name

    <%: Html.Kendo().Chart(Model)
            .Name("internetUsersChart")
            .Events(e => e
                .DataBound("internetUsersChart_dataBound")
                .SeriesClick("internetUsersChart_seriesClick")
            )
    %>

    <script>
        function internetUsersChart_dataBound() {
            // Handle the dataBound event
        }

        function internetUsersChart_seriesClick() {
            // Handle the series click event
        }
    </script>


### Razor - subscribe by handler name

    @(Html.Kendo().Chart(Model)
          .Name("internetUsersChart")
          .Events(e => e
              .DataBound("internetUsersChart_dataBound")
              .SeriesClick("internetUsersChart_seriesClick")
          )
    )

    <script>
        function internetUsersChart_dataBound() {
            // Handle the dataBound event
        }

        function internetUsersChart_seriesClick() {
            // Handle the seriesClick event
        }
    </script>


### Razor - subscribe by template delegate

    @(Html.Kendo().Chart(Model)
          .Name("internetUsersChart")
          .Events(e => e
              .DataBound(@<text>
                   function() {
                       // Handle the dataBound event inline
                   }
              </text>)
              .SeriesClick(@<text>
                   function() {
                       // Handle the seriesClick event inline
                   }
              </text>)
          )
    )

