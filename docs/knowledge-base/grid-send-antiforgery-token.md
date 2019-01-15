---
title: Send an antiforgery token with the requests of a Grid in ASP.NET Core and ASP.NET MVC projects
description: An example on how to Send an antiforgery token with the requests of a Grid in ASP.NET Core and ASP.NET MVC projects.
type: how-to
page_title: Send an antiforgery token with the requests of a Grid in ASP.NET Core and ASP.NET MVC projects | Kendo UI Grid
slug: grid-send-antiforgery-token
tags: kendoui, kendo, grid, core, mvc, anti, forgery, token, antiforgery, send, antiforgerytoken
res_type: kb
component: grid
---

## Description

How can I send an antiforgery token with the requests of a Grid in ASP.NET Core and ASP.NET MVC projects?

## Solution

To include an antiforgery token within the requests of the grid is necessary to add an antyforgery token to the page which contains the grid and using the Transport.Data handler send the token as a parameter.

```
    @Html.AntiForgeryToken()

    @(Html.Kendo().Grid<OrderViewModel>()
                    .Name("grid")
                    .Groupable()
                    .Sortable()
                    .Editable()
                    .Scrollable()
                    .ToolBar(x => x.Excel())
                    .Columns(columns =>
                    {
                        columns.Bound(column => column.Freight);
                        columns.Bound(column => column.ShipName);
                        columns.Bound(column => column.ShipCity);
                        columns.Command(column =>
                        {
                            column.Edit();
                            column.Destroy();
                        });
                    })
                    .Excel(excel => excel
                                .FileName("Export.xlsx")
                                .Filterable(true)
                                .ProxyURL("/Index?handler=Save")
                            )
                    .DataSource(ds => ds.Ajax()
                        .Read(r => r.Url("/Index?handler=Read").Data("forgeryToken"))
                        .Update(u => u.Url("/Index?handler=Update").Data("forgeryToken"))
                        .Create(c => c.Url("/Index?handler=Create").Data("forgeryToken"))
                        .Destroy(d => d.Url("/Index?handler=Destroy").Data("forgeryToken"))
                        .Model(m => m.Id(id => id.OrderID))
                        .PageSize(10)
                    )
                    .Pageable()
    )

    <script>
        function forgeryToken() {
            return kendo.antiForgeryTokens();
        }
    </script>
```

## Notes

The [kendo.antiforgerytokens](https://docs.telerik.com/kendo-ui/api/javascript/kendo/methods/antiforgerytokens) method returns an object that contains common CSRF tokens found on the page.