---
title: Razor Pages
page_title: Razor Pages
description: "Telerik UI PivotGridV2 for {{ site.framework }} in a Razor Pages application."
components: ["pivotgridv2"]
slug: razorpages_pivotgridv2_aspnetcore
position: 6
---

# PivotGridV2 in Razor Pages

This article describes how to seamlessly integrate and configure the Telerik UI PivotGridV2 for {{ site.framework }} in Razor Pages applications.

> You can use any of the available [data binding approaches]({% slug databinding_pivotgridv2helper_aspnetcore %}) to bind the component to data in a Razor Pages application.

@[template](/_contentTemplates/core/razor-pages-general-info.md#referencing-handler-methods)

## Binding to Remote Data

The following example demonstrates how to configure the PivotGridV2 DataSource for Ajax data binding to an [Online Analytical Processing (OLAP)](https://learn.microsoft.com/en-us/previous-versions/sql/sql-server-2005/ms175367(v=sql.90)) cube within a Razor Pages application.

1. Add the OLAP service dll (`https://demos.telerik.com/service/v2/olap/msmdpump.dll`) as a Read request URL in the `DataSource` configuration to bind the PivotGridV2 to data over an [OLAP cube]({% slug htmlhelpers_pivotgridv2_aspnetcore_fundamentals%}#what-is-an-olap-cube). Since the data is requested from the online accessible OLAP service, it is not required to send the anti-forgery token with the POST request.

1. Define the desired initial rows, columns and measures in the `DataSource`.

    ```HtmlHelper
        @page
        @model IndexModel
        @using Kendo.Mvc.UI

        @(Html.Kendo().PivotGridV2()
            .Name("pivotgrid")
            .ColumnWidth(200)
            .Height(580)
            .DataSource(dataSource => dataSource
                .Xmla()
                .Columns(columns => {
                    columns.Add("[Date].[Calendar]").Expand(true);
                    columns.Add("[Product].[Category]");
                })
                .Rows(rows => rows.Add("[Geography].[City]").Expand(true))
                .Measures(measures => measures.Values(new string[]{"[Measures].[Reseller Freight Cost]"}))
                .Transport(transport => transport
                    .Connection(connection => connection
                        .Catalog("Adventure Works DW 2008R2")
                        .Cube("Adventure Works"))
                    .Read("https://demos.telerik.com/service/v2/olap/msmdpump.dll")
                )
            )
        )
    ```
    ```TagHelper
        @page
        @model IndexModel
        @using Kendo.Mvc.UI

        <kendo-pivotgridv2 name="pivotgrid" column-width="200" height="580">
            <pivot-datasource type="PivotDataSourceType.Xmla">
                <columns>
                    <pivot-datasource-column name="[Date].[Calendar]" expand="true"></pivot-datasource-column>
                    <pivot-datasource-column name="[Product].[Category]"></pivot-datasource-column>
                </columns>
                <rows>
                    <row name="[Geography].[City]" expand="true"></row>
                </rows>
                <measures values=@(new string[] {"[Measures].[Reseller Freight Cost]"} )></measures>
                <transport read-url="https://demos.telerik.com/service/v2/olap/msmdpump.dll">
                    <connection catalog="Adventure Works DW 2008R2" cube="Adventure Works"></connection>
                </transport>
            </pivot-datasource>
        </kendo-pivotgridv2>
    ```
    ```C# Index.cshtml.cs
        public class IndexModel : PageModel
        {
            public void OnGet()
            {

            }
        }
    ```

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the PivotGridV2](https://docs.telerik.com/kendo-ui/api/javascript/ui/pivotgridv2)
* [Server-Side HtmlHelper API of the PivotGridV2](/api/pivotgridv2)
* [Server-Side TagHelper API of the PivotGridV2](/api/taghelpers/pivotgridv2)
* [Knowledge Base Section](/knowledge-base)
