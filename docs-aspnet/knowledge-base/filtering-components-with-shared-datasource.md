---
title: Filtering Components Independently that Use a Shared DataSource
description: Learn how to filter different components independently that use a shared DataSource.
type: how-to
page_title: Filtering Components Independently that Use a Shared DataSource
slug: filtering-components-with-shared-datasource
tags: DataSource, shared, filtering, widgets, components, telerik, core, mvc
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2023.2.829</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>DataSource for {{ site.framework }}</td>
		</tr>
	</tbody>
</table>


## Description

By design, the components that bind to a shared DataSource listen for the `change` event of the DataSource and refresh automatically when it fires. As a result, when filtering one of the components, the rest of the components will rebind and display the filtered data, as well.

How can I filter the components that use a shared DataSource independently?

## Solution

The example below shows how to bind two Grids to the same DataSource and allow the user to filter them independently.

1. Create an additional DataSource for each Grid that is not bound to data and has an initial filter criteria:

    ```HtmlHelper
        @(Html.Kendo().DataSource<Kendo.Mvc.Examples.Models.ProductViewModel>()
            .Name("mainDS")
            .Ajax(dataSource => dataSource
                .Read(read => read.Action("Products_Read", "Grid"))
                .ServerOperation(false)
            )
        )

        @(Html.Kendo().DataSource<Kendo.Mvc.Examples.Models.ProductViewModel>()
            .Name("dataSourceGrid1")
            .Ajax(dataSource => dataSource
                .Filter(filters =>
                {
                    filters.Add(product => product.Discontinued).IsEqualTo(true);
                })
                .ServerOperation(false)
            )
        )

        @(Html.Kendo().DataSource<Kendo.Mvc.Examples.Models.ProductViewModel>()
            .Name("dataSourceGrid2")
            .Ajax(dataSource => dataSource
                .Filter(filters =>
                {
                    filters.Add(product => product.Discontinued).IsEqualTo(false);
                })
                .ServerOperation(false)
            )
        )

        @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
            .Name("grid1")
            .AutoBind(false)
            .DataSource("dataSourceGrid1")
            ...
        )

        @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
            .Name("grid2")
            .AutoBind(false)
            .DataSource("dataSourceGrid2")
            ...
        )
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc

        <kendo-datasource name="mainDS" type="DataSourceTagHelperType.Ajax" server-operation="false">
            <transport>
                <read url="@Url.Action("Products_Read", "Grid")" />
            </transport>
        </kendo-datasource>

        <kendo-datasource name="dataSourceGrid1" type="DataSourceTagHelperType.Ajax" server-operation="false">
            <filters>
                <datasource-filter logic="and">
                    <filters>
                        <datasource-filter field="Discontinued" operator="eq" value="true"></datasource-filter>
                    </filters>
                </datasource-filter>
            </filters>
        </kendo-datasource>

        <kendo-datasource name="dataSourceGrid2" type="DataSourceTagHelperType.Ajax" server-operation="false">
            <filters>
                <datasource-filter logic="and">
                    <filters>
                        <datasource-filter field="Discontinued" operator="eq" value="false"></datasource-filter>
                    </filters>
                </datasource-filter>
            </filters>
        </kendo-datasource>

        <kendo-grid name="grid1" datasource-id="dataSourceGrid1" auto-bind="false">
            ...
        </kendo-grid>

        <kendo-grid name="grid2" datasource-id="dataSourceGrid2" auto-bind="false">
            ...
        </kendo-grid>
    ```
    {% endif %}

1. Within the `$(document).ready()` function, access the main DataSource and handle once its [`requestEnd`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/events/requestend) event to access the data when it is received from the server. Use the [`data()`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/data) method to set the received data to the additional DataSources that are used by the Grids.

    ```JS scripts
    <script>
        $(document).ready(function () {
            mainDS.read();
            mainDS.one("requestEnd", function (e) {
                if (e.response.Data.length > 0) {
                    dataSourceGrid1.data(e.response.Data); // Set the received data to the DataSource of "grid1".
                    dataSourceGrid2.data(e.response.Data); // Set the received data to the DataSource of "grid2".
                }
            });
        });
    </script>

    ```


## More {{ site.framework }} DataSource Resources

* [{{ site.framework }} DataSource Documentation]({%slug htmlhelpers_datasource_aspnetcore%})

* [{{ site.framework }} DataSource Demos](https://demos.telerik.com/{{ site.platform }}/datasource/index)

{% if site.core %}

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the DataSource for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource)
* [Server-Side API Reference of the DataSource for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/datasource)
{% if site.core %}
* [Server-Side TagHelper API Reference of the DataSource for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/datasource)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
