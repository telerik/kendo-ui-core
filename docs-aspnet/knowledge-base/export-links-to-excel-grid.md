---
title: Exporting Links To Excel
page_title: Exporting Links To Excel
description: "Learn how to export links to Excel in the {{ site.product }} Grid."
slug: export_grid_links_to_excel
tags: grid, export, excel, links, hyperlink, hyperlinks, link, url, wrappers, telerik
component: grid
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Telerik® UI for {{ site.framework }}</td>
 </tr>
</table>

## Description

I have a {{ site.product }} Grid column that contains a [hyperlink](https://www.w3schools.com/html/html_links.asp). The link is clickable in the Grid. However, when I export the data to Excel, I can no longer interact with it. I want to be able to click on the exported links.

## Solution

The [`Workbook API`](https://docs.telerik.com/kendo-ui/api/javascript/ooxml/workbook/configuration/sheets.hyperlinks) exposes a configuration that enables you to set hyperlinks to specific cells.

To achieve the desired outcome:

1. Configure a column with by using the [Template component](https://docs.telerik.com/{{ site.platform }}/html-helpers/template/overview).
2. Subscribe to the [`ExcelExport`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/grideventbuilder#excelexportsystemstring) event of the Grid.
3. Within the handler, generate the `hyperlinks` array by using information from the already generated Workbook.
4. **(Optional)** Define an optional method that enables you to convert the current Grid column index to a corresponding Excel column name. For example: `A, B, C ... AA`.

{% if site.core %}
```HtmlHelper
    @{
        var data = new List<GridModel>()
        {
            new GridModel
            {
                Name = "Jane Doe",
                Link = "https://google.com"
            },
            new GridModel
            {
                Name = "Jane Doe",
                Link = "https://youtube.com"
            }
        };
    }

    @(Html.Kendo().Grid<GridModel>()
        .Name("grid")
        .ToolBar(toolbar => toolbar
            .Excel()
        )
        .Columns(columns =>
        {
            columns.Bound(column => column.Name);
            columns.Bound(column => column.Link).ClientTemplate(Html.Kendo().Template()
                                                    .AddHtml(@<text>
                                                        <a href="${data.Link}">${data.Link}</a>
                                                    </text>)
                                                );
        })
        .DataSource(dataSource => dataSource
            .Ajax()
            .Read(read => read.Action("Read_Data", "Grid"))
        )
        .Events(events => events.ExcelExport("onExcelExport"))
        .BindTo(data)
    )
```
```TagHelper
    @{
        var data = new List<GridModel>()
        {
            new GridModel
            {
                Name = "Jane Doe",
                Link = "https://google.com"
            },
            new GridModel
            {
                Name = "Jane Doe",
                Link = "https://youtube.com"
            }
        };
    }

    <kendo-grid name="grid"
                on-excel-export="onExcelExport">
        <toolbar>
            <toolbar-button name="excel"/>
        </toolbar>
        <columns>
            <column field="Name"/>
            <column field="Link">
                <column-template>
                    <a href="${data.Link}">${data.Link}</a>
                </column-template>
            </column>
        </columns>
        <datasource type="DataSourceTagHelperType.Custom" 
                    data="@data" 
                    server-operation="false">
        </datasource>
    </kendo-grid>
```
{% else %}
```Index.cshtml
    @{
        var data = new List<GridModel>()
        {
            new GridModel
            {
                Name = "Jane Doe",
                Link = "https://google.com"
            },
            new GridModel
            {
                Name = "Jane Doe",
                Link = "https://youtube.com"
            }
        };
    }

    @(Html.Kendo().Grid<GridModel>()
        .Name("grid")
        .ToolBar(toolbar => toolbar
            .Excel()
        )
        .Columns(columns =>
        {
            columns.Bound(column => column.Name);
            columns.Bound(column => column.Link).ClientTemplate(Html.Kendo().Template()
                                                    .AddHtml(@<text>
                                                        <a href="${data.Link}">${data.Link}</a>
                                                    </text>)
                                                );
        })
        .DataSource(dataSource => dataSource
            .Ajax()
            .Read(read => read.Action("Read_Data", "Grid"))
        )
        .Events(events => events.ExcelExport("onExcelExport"))
        .BindTo(data)
    )
```
{% endif %}
```Model.cs
    public class GridModel
    {
        public string Name { get; set; }
        public string Link { get; set; }
    }
```
```Script.js
    <script>
        function onExcelExport(e) {
            let columnIndex = 1, // The Link column is in the first index.
                colName = getColumnName(columnIndex), // We need the excel column name to use as a reference. E.g. A, B, C,     D, AA, AB, AC, BA, BB, etc.
                sheet = e.workbook.sheets[0];
            // Create a hyperlink for each cell under the "link" column.
            sheet.hyperlinks = constructHyperlinks(sheet.rows, columnIndex, colName);
        }

        function constructHyperlinks(rows, colIndex, colName) {
            const result = [];
            rows.forEach((row, i) => {
                if (row.type === "data") {
                    const value = row.cells[colIndex].value,
                        colRef = colName + (i + 1); // A1,B1,C1, etc. are the headers. We want to start from A2, B2, etc.
                    result.push({ ref: colRef, target: value });
                }
            });
            return result;
        }
        // https://stackoverflow.com/a/8241071
        // This is an optional method that enables you to convert the current Grid column index to a corresponding Excel    column name - A, B, C ... AA, AB ... BA, BB ... CA, CC, etc.
        function getColumnName(n) {
            var ordA = 'A'.charCodeAt(0);
            var ordZ = 'Z'.charCodeAt(0);
            var len = ordZ - ordA + 1;
            var s = "";
            while (n >= 0) {
                s = String.fromCharCode(n % len + ordA) + s;
                n = Math.floor(n / len) - 1;
            }
            return s;
        }
    </script>
```

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

* [Workbook API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ooxml/workbook)
* [Grid Server Export Demo](https://demos.telerik.com/{{ site.platform }}/grid/server-export)
* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
{% if site.core %}
* [TagHelper API reference of the Grid](https://docs.telerik.com/aspnet-core/api/taghelpers/grid)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)