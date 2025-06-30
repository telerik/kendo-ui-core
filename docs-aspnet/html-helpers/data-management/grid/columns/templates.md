---
title: Templates
page_title: Template Columns
description: "Get started with the Telerik UI Grid component for {{ site.framework }} supporting template columns."
slug: htmlhelper_grid_template_columns
position: 4
---

# Template Columns

Template columns enable you to cusomize the way data is displayed based on your specific preferences.

The following example demonstrates how to specify your own custom layout for the Grid columns by using images and property bindings from the underlying data source. The templates are defined by using JavaScript functions.

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
                    style= 'background-image: url(https://demos.telerik.com/kendo-ui/content/web/Customers/${data.CustomerID}.jpg);' ></div >
                    <div class='customer-name'>${ data.ContactName} </div>
                    `
        }
    </script>
````
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
                    style= 'background-image: url(https://demos.telerik.com/kendo-ui/content/web/Customers/${data.CustomerID}.jpg);' ></div >
                    <div class='customer-name'>${ data.ContactName} </div>
                    `
        }
    </script>
```
{% endif %}
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
