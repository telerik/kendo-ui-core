---
title: Responsive Columns
page_title: Responsive Columns
description: "Learn how to make the Telerik UI for {{ site.framework}} Grid columns responsive for different viewport dimensions."
slug: responsive_columns_grid
position: 12
---

# Responsive Columns

The {{ site.product }} Grid provides the built-in functionality to conditionally make a column visible based on the width of the viewport.

For a runnable example, refer to the [demo on Responsive Columns for the Grid component](https://demos.telerik.com/{{ site.platform }}/grid/responsive-columns).

> * The [`Hidden()`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/gridboundcolumnbuilder#hiddensystemboolean) configuration method takes precedence over the `Media()` configuration.
> * The [`Media()`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/gridboundcolumnbuilder#mediasystemstring) configuration method cannot be used with the [`MinScreenWidth()`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/gridboundcolumnbuilder#minscreenwidthsystemint32) option simultaneously.

## Configuration

Set the [`Media()`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/gridboundcolumnbuilder#mediasystemstring) configuration method of the column to a [valid string](#accepted-values). When set, the column will predominantly remain visible if the specified condition is satisfied.

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.Customer>()
            .Name("grid")
            .Columns(columns =>
            {
                columns.Bound(c => c.ContactName).Media("(min-width: 450px)");
                columns.Bound(c => c.ContactTitle).Width(250).Media("(min-width: 850px)");
                columns.Bound(c => c.CompanyName).Width(250).Media("(min-width: 850px)");
                columns.Bound(c => c.Country).Media("(min-width: 450px)");
            })
            .HtmlAttributes(new { style = "height: 550px;" })
            .Scrollable()
            .Groupable()
            .Sortable()
            .Pageable(pageable => pageable
                .Refresh(true)
                .PageSizes(true)
                .ButtonCount(5))
            .DataSource(dataSource => dataSource
                .Ajax()
                .Read(read => read.Action("Responsive_Columns_Customers_Read", "Grid"))
                .PageSize(20)
            )
    )
```
{% if site.core %}
```TagHelper
    <kendo-grid name="grid" style="height:550px;" resizable="true">
        <columns>
            <column field="ContactName" media="(min-width: 450px)">
            </column>
            <column field="ContactTitle" width="250" media="(min-width: 850px)">
            </column>
            <column field="CompanyName" width="250" media="(min-width: 850px)">
            </column>
            <column field="Country" media="(min-width: 450px)">
            </column>
        </columns>
        <sortable enabled="true" />
        <scrollable enabled="true" />
        <reorderable enabled="true" />
        <column-menu enabled="true" />
        <filterable enabled="true" mode="row" />
        <pageable enabled="true" refresh="true" page-sizes-enabled="true" button-count="5" />
        <datasource page="0" type="DataSourceTagHelperType.Ajax" page-size="20">
            <schema data="Data" total="Total" errors="Errors">
            </schema>
            <transport>
                <read url="@Url.Action("Responsive_Columns_Customers_Read","Grid")" />
            </transport>
        </datasource>
    </kendo-grid>
```
{% endif %}

## Accepted Values

1. The property accepts valid strings for the [`matchMedia browser API`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) (assuming the property is supported by the browser) and toggles the visibility of the columns based on the media queries.

1. The property accepts the device identifiers that are available in [Bootstrap 5](https://getbootstrap.com/docs/5.0/layout/grid/#grid-options):

- **xs** is equivalent to "(max-width: 576px)"
- **sm** is equivalent to "(min-width: 576px)"
- **md** is equivalent to "(min-width: 768px)"
- **lg** is equivalent to "(min-width: 992px)"
- **xl** is equivalent to "(min-width: 1200px)"

## Column Template

The Responsive Column functionality works in strong symbiosis with the Column Template functionality. The column template is used for melding all columns into an autonomous container by using the [Kendo UI Template](https://docs.telerik.com/kendo-ui/framework/templates/overview) conventions.

The content within the column `Template()` method will be displayed when the condition specified in the `Media()` is met (for example, the viewport is not wider than 450px). This functionality is useful, as it allows you to alter the existing column structure based on the current viewport dimensions.

```HtmlHelper
@(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.Customer>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(c => c.ContactName).Media("(min-width: 450px)");
            columns.Bound(c => c.ContactTitle).Width(250).Media("(min-width: 850px)");
            columns.Bound(c => c.CompanyName).Width(250).Media("(min-width: 850px)");
            columns.Bound(c => c.Country).Media("(min-width: 450px)");
            columns.Template("#=resColTemplate(data)#").Title("Items").Media("(max-width: 450px)");
        })
        .HtmlAttributes(new { style = "height: 550px;" })
        .Scrollable()
        .Groupable()
        .Sortable()
        .Pageable(pageable => pageable
            .Refresh(true)
            .PageSizes(true)
            .ButtonCount(5))
        .DataSource(dataSource => dataSource
            .Ajax()
            .Read(read => read.Action("Responsive_Columns_Customers_Read", "Grid"))
            .PageSize(20)
        )
)
```
{% if site.core %}
```TagHelper
  <kendo-grid name="grid" style="height:550px;" resizable="true">
    <columns>
        <column field="ContactName" media="(min-width: 450px)">
        </column>
        <column field="ContactTitle" width="250" media="(min-width: 850px)">
        </column>
        <column field="CompanyName" width="250" media="(min-width: 850px)">
        </column>
        <column field="Country" media="(min-width: 450px)">
        </column>
        <column template="#=resColTemplate(data)#" title="Items" media="(min-width: 450px)">
        </column>
    </columns>
    <sortable enabled="true" />
    <scrollable enabled="true" />
    <reorderable enabled="true" />
    <column-menu enabled="true" />
    <filterable enabled="true" mode="row" />
    <pageable enabled="true" refresh="true" page-sizes-enabled="true" button-count="5" />
    <datasource page="0" type="DataSourceTagHelperType.Ajax" page-size="20">
        <schema data="Data" total="Total" errors="Errors">
        </schema>
        <transport>
            <read url="@Url.Action("Responsive_Columns_Customers_Read","Grid")" />
        </transport>
    </datasource>
  </kendo-grid>
```
{% endif %}
```Script
    <script>
        var resColTemplate;

        $(document).ready( function () {
            // Extract the template content from script tag with id "responsive-column-template" and compile a template.
            resColTemplate = kendo.template($("#responsive-column-template").html()); 
        });
    </script>
```
```Template
    <script id="responsive-column-template" type="text/x-kendo-template">
        <strong>Contact Name</strong>
        <p class="col-template-val">#=data.ContactName#</p>

        <strong>Contact Title</strong>
        <p class="col-template-val">#=data.ContactTitle#</p>

        <strong>Company Name</strong>
        <p class="col-template-val">#=data.CompanyName#</p>

        <strong>Country</strong>
        <p class="col-template-val">#=data.Country#</p>
    </script>
```

## See Also

* [Responsive Columns for the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/responsive-columns)
* [Server-Side API](/api/grid)