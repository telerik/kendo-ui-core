---
title: Configure a Custom DataSource for the Grid in Razor Pages
description: An example on how to configure a custom DataSource to populate the Telerik UI for ASP.NET Core Grid HtmlHelper in a Razor Page.
type: how-to
page_title: Configure Custom Grid DataSource in Razor Pages
slug: grid-custom-datasource-razor-ages
tags: aspnet, core, dotnet-core, kendo, kendo-ui, grid, datasource, custom, custom-datasource, razor-pages, pages
res_type: kb
component: grid, datasource
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Telerik® UI for ASP.NET Core</td>
 </tr>
 <tr>
  <td>Product</td>
  <td>DataSource for Progress® Telerik® UI for ASP.NET Core</td>
 </tr>
</table>

## Description

How can I configure a custom DataSource for the Grid HtmlHelper that is used in a Razor Page?

## Solution

The snippet below shows how to configure the DataSource.

    ```
        @(Html.Kendo().Grid<Telerik.Examples.RazorPages.Models.Customer>().Name("grid")
            .AutoBind(false)
            .Columns(x =>
            {
                x.Bound(p => p.Address);
                x.Bound(p => p.ClockOut).EditorTemplateName("TimePicker").Format("{0:hh:mm tt}");
                x.Command(c => c.Edit());
            })
            .Editable(editable => editable.Mode(GridEditMode.InLine))
            .DataSource(d =>
                d.Custom()
                .Transport(t =>
                {
                    t.Read(r => r.Action("Grid", "GridCustomDataSource", new { handler = "ReadRecords" }).Type(HttpVerbs.Post));
                    t.Update(r => r.Action("Grid", "GridCustomDataSource", new { handler = "UpdateRecord" }).Type(HttpVerbs.Post));
                    t.ParameterMap("parameterMap");
                })
                .Schema(s => s.Model(m =>
                {
                    m.Id(i => i.CustomerId);
                    m.Field("ClockOut", typeof(DateTime?));
                }))
                .PageSize(10)                
            )
            .Pageable()
        )

        <script>
            function parameterMap(options, operation) {
                if (operation === "update") {            
                    options.ClockOut = options.ClockOut.toUTCString();
                    return options;
                }
            }
        </script>

        <script>
            $(function () {
                var grid = $("#grid").data("kendoGrid");
                grid.dataSource.transport.options.read.beforeSend = function (req) {
                    req.setRequestHeader('RequestVerificationToken', $('input:hidden[name="__RequestVerificationToken"]').val());
                };
                grid.dataSource.transport.options.update.beforeSend = function (req) {
                    req.setRequestHeader('RequestVerificationToken', $('input:hidden[name="__RequestVerificationToken"]').val());
                };
                grid.dataSource.read();
            });
        </script>
    ```

For the complete implementation on how to configure a custom DataSource to properly populate a Telerik UI Grid HtmlHelper for ASP.NET Core in a Razor Page, refer to [this GitHub project](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

## See Also

* [API Reference of the Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [API Reference of the DataSource](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource)
