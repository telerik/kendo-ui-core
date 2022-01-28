---
title: Send Anti-Forgery Token with Grid Requests in ASP.NET Core and ASP.NET MVC Projects
description: An example on how to send an anti-forgery token with the requests of a Grid in ASP.NET Core and ASP.NET MVC projects.
type: how-to
page_title: Send Anti-Forgery Token with Grid Requests in ASP.NET Core and ASP.NET MVC Projects | Kendo UI Grid for jQuery
slug: grid-send-antiforgery-token
tags: kendoui, kendo, grid, core, mvc, anti, forgery, token, antiforgery, send, antiforgerytoken
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Created with the 2017.3.1026 version</td>
 </tr>
</table>

## Description

How can I send an anti-forgery token with the requests of a Kendo UI Grid in ASP.NET Core and ASP.NET MVC projects?

## Solution

To include an anti-forgery token within the requests of the Grid, add an anti-forgery token to the page which contains the Grid and send the token as a parameter by using the `Transport.Data` handler.

The [`kendo.antiforgerytokens`](https://docs.telerik.com/kendo-ui/api/javascript/kendo/methods/antiforgerytokens) method returns an object that contains common CSRF tokens which are found on the page.

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
