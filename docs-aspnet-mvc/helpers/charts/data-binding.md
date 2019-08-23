---
title: Data Binding
page_title: Data Binding | Telerik UI Chart HtmlHelper for ASP.NET MVC
description: "Learn the basics about binding the Telerik UI Chart HtmlHelper for ASP.NET MVC to data."
previous_url: /helpers/chart/ajax-binding
slug: ajaxbinding_charthelper_aspnetmvc
position: 2
---

# Data Binding

The Chart enables you to populate it with data by using [server](#server-binding) and [Ajax](#ajax-binding) data binding.

## Server Binding

The server binding binds the Chart to a supplied model.

To configure the Chart for server binding to the **InternetUsers** list:

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a new action method and pass the **InternetUsers** list as the model.

        public ActionResult Index()
        {
            return View(ChartDataRepository.InternetUsers());
        }

1. Make your view strongly typed.

    ```ASPX
        <%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master"
            Inherits="System.Web.Mvc.ViewPage<IEnumerable<MvcApplication1.Models.InternetUsers>>" %>
    ```
    ```Razor
        @model IEnumerable<MvcApplication1.Models.InternetUsers>
    ```

1. Add a server-bound Chart.

    ```ASPX
        <%: Html.Kendo().Chart(Model) // The Chart will be bound to the Model which is the InternetUsers list.
                .Name("internetUsersChart") // The name of the Chart is mandatory. It specifies the "id" attribute of the widget.
                .Title("Internet Users")
                .Series(series => {
                    series.Bar(model => model.Value) // Create a Bar Chart series bound to the "Value" property.
                            .Name("United States");
                })
                .CategoryAxis(axis => axis
                    .Categories(model => model.Year)
                )
        %>
    ```
    ```Razor
        @(Html.Kendo().Chart(Model) // The Chart will be bound to the Model which is the InternetUsers list.
                .Name("internetUsersChart") // The name of the Chart is mandatory. It specifies the "id" attribute of the widget.
                .Title("Internet Users")
                .Series(series => {
                    series.Bar(model => model.Value) // Create a Bar Chart series that is bound to the "Value" property.
                        .Name("United States");
                })
                .CategoryAxis(axis => axis
                    .Categories(model => model.Year)
                )
        )
    ```

## Ajax Binding

The Ajax binding makes Ajax requests to get the data for the Chart.

To configure the Chart for Ajax binding:

1. Add a new action method which returns data to populate the Chart.

        public ActionResult InternetUsers_Read()
        {
            var data = ChartDataRepository.InternetUsers();
        }

1. Return the data as JSON.

        public ActionResult InternetUsers_Read()
        {
            var data = ChartDataRepository.InternetUsers();
            return Json(data);
        }

1. In the view, configure the Chart to use the action method created in the previous steps.

        ```ASPX

                <%: Html.Kendo().Chart<MvcApplication1.Models.InternetUsers>()
                        .Name("internetUsersChart")
                        .DataSource(dataSource => dataSource
                            .Read(read => read.Action("InternetUsers_Read", "Home")) // Specify the action method and controller names.
                        )
                        .Series(series => {
                            series.Bar(d => d.Value)
                                  .Name("United States");
                        })
                        .CategoryAxis(axis => axis
                            .Categories(model => model.Year)
                        )
                %>
        ```
        ```Razor

                @(Html.Kendo().Chart<MvcApplication1.Models.InternetUsers>()
                      .Name("internetUsersChart")
                      .DataSource(dataSource => dataSource
                          .Read(read => read.Action("InternetUsers_Read", "Home")) // Specify the action method and controller names.
                      )
                      .Series(series => {
                          series.Bar(d => d.Value)
                                .Name("United States");
                      })
                      .CategoryAxis(axis => axis
                          .Categories(model => model.Year)
                      )
                )
        ```

## See Also

* [Using the API of the Chart HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/chart-api/index)
* [Basic Usage of the Area Chart HtmlHelper for ASP.NET MVC (Demos)](https://demos.telerik.com/aspnet-mvc/area-charts/index)
* [Server-Side API](/api/chart)
