---
title: Ajax Binding
page_title: Configuration of Kendo UI Chart for ASP.NET MVC for Ajax binding
description: How to configure Kendo UI Chart for ASP.NET MVC for Ajax binding in quick steps.
---

## Ajax Binding

When configured for ajax binding the Kendo Chart for ASP.NET MVC will make an ajax requests to populate its series.

To configure the Kendo Chart for ajax binding follow these steps:

1.  Add a new action method which will return data to populate the chart:

        public ActionResult InternetUsers_Read()
        {
            var data = ChartDataRepository.InternetUsers();
        }

2.  Return the data as JSON:

        public ActionResult InternetUsers_Read()
        {
            var data = ChartDataRepository.InternetUsers();
            return Json(data);
        }

3.  In the view configure the chart to use the action method created in the previous steps:
    - WebForms

            <%: Html.Kendo().Chart<MvcApplication1.Models.InternetUsers>()
                    .Name("internetUsersChart")
                    .DataSource(dataSource => dataSource
                        .Read(read => read.Action("InternetUsers_Read", "Home")) // Specify the action method and controller name
                    )
                    .Series(series => {
                        series.Bar(d => d.Value)
                              .Name("United States");
                    })
                    .CategoryAxis(axis => axis
                        .Categories(model => model.Year)
                    )
            %>
    - Razor

            @(Html.Kendo().Chart<MvcApplication1.Models.InternetUsers>()
                  .Name("internetUsersChart")
                  .DataSource(dataSource => dataSource
                      .Read(read => read.Action("InternetUsers_Read", "Home")) // Specify the action method and controller name
                  )
                  .Series(series => {
                      series.Bar(d => d.Value)
                            .Name("United States");
                  })
                  .CategoryAxis(axis => axis
                      .Categories(model => model.Year)
                  )
            )

