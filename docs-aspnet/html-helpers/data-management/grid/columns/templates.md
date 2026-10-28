---
title: Templates
page_title: Template Columns
description: "Learn how to configure Telerik UI Grid template columns in {{ site.framework }} to render custom and conditional cell content."
components: ["grid"]
slug: htmlhelper_grid_template_columns
position: 4
---

# Template Columns

Template columns let you customize how the Grid displays data in each cell.

The following example shows how to define a custom column layout with images and field values from the data source. The templates use JavaScript functions.

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.Customer>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(c => c.ContactName).Width(140).ClientTemplate("#=template(data)#");
            columns.Bound(c => c.ContactTitle).Width(190);
            columns.Bound(c => c.CompanyName);
            columns.Bound(c => c.Country).Width(110);
        })
        .HtmlAttributes(new { style = "height: 380px;" })
        .Scrollable()
        .Groupable()
        .Sortable()
        .Pageable(pageable => pageable
            .Refresh(true)
            .PageSizes(true)
            .ButtonCount(5))
        .DataSource(dataSource => dataSource
            .Ajax()
            .Read(read => read.Action("Customers_Read", "Grid"))
        )
    )

    <script>
        function template(data) {
            return `<div class='customer-photo'
                    style='background-image: url(https://demos.telerik.com/kendo-ui/content/web/Customers/${data.CustomerID}.jpg);'></div>
                    <div class='customer-name'>${data.ContactName}</div>`;
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-grid name="grid" height="380">
        <datasource type="DataSourceTagHelperType.Ajax" page-size="20">
            <schema data="Data" total="Total" errors="Errors">
            </schema>
            <transport>
                <read url="@Url.Action("Customers_Read", "Grid")"/>
            </transport>
        </datasource>
        <scrollable enabled="true"/>
        <groupable enabled="true" />
        <sortable enabled="true" />
        <pageable button-count="5" refresh="true" page-sizes-enabled="true">
        </pageable>
        <columns>
            <column field="ContactName" template="#=template(data)#" title="Contact Name" width="140" />
            <column field="ContactTitle" title="Contact Title" width="190"/>
            <column field="CompanyName" title="Company Name" />
            <column field="Country" title="Country" width="110" />
        </columns>
    </kendo-grid>

    <script>
        function template(data) {
            return `<div class='customer-photo'
                    style='background-image: url(https://demos.telerik.com/kendo-ui/content/web/Customers/${data.CustomerID}.jpg);'></div>
                    <div class='customer-name'>${data.ContactName}</div>`;
        }
    </script>
```
{% endif %}

{% if site.core %}
## Conditional Cell Formatting with TagHelpers

To conditionally format a Grid column with TagHelpers, use the column's `template` attribute and call a JavaScript function with the current data item. The following example renders the `Title` value in bold when it equals `Special`.

```TagHelper
    <kendo-grid name="grid">
        <columns>
            <column field="Title" template="#=titleTemplate(data)#" />
        </columns>
    </kendo-grid>

    <script>
        function titleTemplate(data) {
            var title = kendo.htmlEncode(data.Title);

            return data.Title === "Special"
                ? "<strong>" + title + "</strong>"
                : title;
        }
    </script>
```
{% endif %}

Use the following CSS to style the image and text in the template column.

```CSS Styles
<style type="text/css">
    .customer-photo {
        display: inline-block;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-size: 32px 35px;
        background-position: center center;
        vertical-align: middle;
        line-height: 32px;
        box-shadow: inset 0 0 1px #999, inset 0 0 10px rgba(0,0,0,.2);
        margin-left: 5px;
    }

    .customer-name {
        display: inline-block;
        vertical-align: middle;
        line-height: 32px;
        padding-left: 3px;
    }
</style>
```

## See Also

* [Bound Column Settings]({% slug htmlhelper_gridcolumns %})
* [Implementing Template Columns in the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/column-template)
* [Server-Side API](/api/grid)
