---
title: Send Anti-Forgery Token with Grid Requests in ASP.NET Core and ASP.NET MVC Projects
description: An example on how to send an anti-forgery token with the requests of a Grid in ASP.NET Core and ASP.NET MVC projects.
type: how-to
page_title: Send Anti-Forgery Token with Grid Requests in ASP.NET Core and ASP.NET MVC Projects
slug: grid-send-antiforgery-token
tags: kendo, grid, core, mvc, anti, forgery, token, antiforgery, send, antiforgerytoken
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress {{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2022.1.119 version</td>
 </tr>
</table>

## Description

How can I send an anti-forgery token with the requests of a {{ site.product }} Grid in ASP.NET Core and ASP.NET MVC projects?

## Solution

* To include an anti-forgery token within the requests of the Grid, add an anti-forgery token to the page which contains the Grid and send the token as a parameter by using the `Data` handler.

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
* To include additional parameters including the anti-forgery token, add the `__RequestVerificationToken` generated hidden field inside the `Data` handler.

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
                        .Read(r => r.Url("/Index?handler=Read").Data("dataFunction"))
                        .Update(u => u.Url("/Index?handler=Update").Data("dataFunction"))
                        .Create(c => c.Url("/Index?handler=Create").Data("dataFunction"))
                        .Destroy(d => d.Url("/Index?handler=Destroy").Data("dataFunction"))
                        .Model(m => m.Id(id => id.OrderID))
                        .PageSize(10)
                    )
                    .Pageable()
    )

    <script>
        function dataFunction() {
            return {
                __RequestVerificationToken: kendo.antiForgeryTokens().__RequestVerificationToken,
                additionalParameter: "test"
            };
        }
    </script>
```
The [`kendo.antiforgerytokens`](https://docs.telerik.com/kendo-ui/api/javascript/kendo/methods/antiforgerytokens) method returns an object that contains common CSRF tokens which are found on the page.

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
