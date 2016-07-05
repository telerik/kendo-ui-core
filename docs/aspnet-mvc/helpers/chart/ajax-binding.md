---
title: Ajax Binding
page_title: Ajax Binding | Kendo UI Chart HtmlHelper
description: "Configure the Kendo UI Chart for ASP.NET MVC for Ajax binding."
slug: ajaxbinding_charthelper_aspnetmvc
position: 2
---

# Ajax Binding

When configured for an Ajax binding, the Kendo UI Chart for ASP.NET MVC makes Ajax requests to populate its series.

## Configuration

Below are steps for you to follow when configuring the Kendo UI Chart for ASP.NET MVC for Ajax binding.

### Add a New Action Method

Add a new action method which returns data to populate the Chart.

###### Example

        public ActionResult InternetUsers_Read()
        {
            var data = ChartDataRepository.InternetUsers();
        }

### Return Data

Return the data as JSON.

###### Example

        public ActionResult InternetUsers_Read()
        {
            var data = ChartDataRepository.InternetUsers();
            return Json(data);
        }

### Configure the Chart

In the view, configure the Chart to use the action method created in the previous steps.

###### Example

```tab-ASPX

        <%: Html.Kendo().Chart<MvcApplication1.Models.InternetUsers>()
                .Name("internetUsersChart")
                .DataSource(dataSource => dataSource
                    .Read(read => read.Action("InternetUsers_Read", "Home")) //Specify the action method and controller names.
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
```tab-Razor

        @(Html.Kendo().Chart<MvcApplication1.Models.InternetUsers>()
              .Name("internetUsersChart")
              .DataSource(dataSource => dataSource
                  .Read(read => read.Action("InternetUsers_Read", "Home")) //Specify the action method and controller names.
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

Other articles on Telerik UI for ASP.NET MVC and on the Chart:

* [Overview of the Kendo UI Chart for ASP.NET MVC]({% slug overview_charthelper_aspnetmvc %})
* [How to Bind to SignalR Hubs in ASP.NET MVC Apps]({% slug howto_bindtosignalr_chartaspnetmvc %})
* [How to Create View Model Bound Dynamic Series in ASP.NET MVC Apps]({% slug howto_cerateviewmodelboundseries_chartaspnetmvc %})
* [Scaffolding of the Kendo UI Chart for ASP.NET MVC]({% slug scaffoldingchart_aspnetmvc %})
* [Overview of the Kendo UI Chart Widget]({% slug overview_kendoui_charts_widget %})
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
