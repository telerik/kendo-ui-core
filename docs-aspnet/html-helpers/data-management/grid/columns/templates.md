---
title: Templates
page_title: Template Columns
description: "Learn how to configure Telerik UI Grid template columns in {{ site.framework }} to render custom and conditional cell content."
components: ["grid"]
slug: htmlhelper_grid_template_columns
position: 4
---

# Template Columns

Use a template column to customize how the Grid displays data in a cell. the examples below demonstrate how to use CSP-compatible templates via the use of a template handler or the Template component.

Template handlers support custom and conditional markup. Store the handler in an external JavaScript file when your application uses a strict Content Security Policy (CSP).

```HtmlHelper
@(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.Customer>()
    .Name("grid")
    .Columns(columns =>
    {
        columns.Bound(customer => customer.ContactName)
            .Width(140)
            .ClientTemplateHandler("contactNameTemplateHandler");
        columns.Bound(customer => customer.ContactTitle).Width(190);
        columns.Bound(customer => customer.CompanyName);
        columns.Bound(customer => customer.Country).Width(110);
    })
    .HtmlAttributes(new { style = "height: 380px;" })
    .Scrollable()
    .Groupable()
    .Sortable()
    .Pageable(pageable => pageable.Refresh(true).PageSizes(true).ButtonCount(5))
    .DataSource(dataSource => dataSource
        .Ajax()
        .Read(read => read.Action("Customers_Read", "Grid"))
    )
)
```

{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-grid name="grid" height="380">
    <datasource type="DataSourceTagHelperType.Ajax" page-size="20">
        <schema data="Data" total="Total" errors="Errors"></schema>
        <transport>
            <read url="@Url.Action("Customers_Read", "Grid")" />
        </transport>
    </datasource>
    <scrollable enabled="true" />
    <groupable enabled="true" />
    <sortable enabled="true" />
    <pageable button-count="5" refresh="true" page-sizes-enabled="true"></pageable>
    <columns>
        <column field="ContactName" template-handler="contactNameTemplateHandler" title="Contact Name" width="140" />
        <column field="ContactTitle" title="Contact Title" width="190" />
        <column field="CompanyName" title="Company Name" />
        <column field="Country" title="Country" width="110" />
    </columns>
</kendo-grid>
```
{% endif %}

```JS scripts.js
function contactNameTemplateHandler(data) {
    const contactName = kendo.htmlEncode(data.ContactName);

    return "<div class='customer-name'>" + contactName + "</div>";
}
```

## Use the Template Component

Use the Template component when you want to define the markup declaratively or compose the template with nested Telerik UI components. `AddHtml()` adds markup, and `AddComponent()` declares a nested component. See the [Template Overview]({% slug htmlhelpers_overview_template %}) for details.

```HtmlHelper
@(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.Customer>()
    .Name("grid")
    .Columns(columns =>
    {
        columns.Bound(customer => customer.ContactName)
            .ClientTemplate(Html.Kendo().Template()
                .AddHtml("<span class='customer-name'>${kendo.htmlEncode(data.ContactName)}</span>")
            );
    })
)
```

{% if site.core %}
For TagHelpers, define the template markup inside `<column-template>`.

```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-grid name="grid">
    <columns>
        <column field="ContactName">
            <column-template>
                <span class="customer-name">${kendo.htmlEncode(data.ContactName)}</span>
            </column-template>
        </column>
    </columns>
</kendo-grid>
```
{% endif %}

Use `${data.Property}` expressions to access the current data item. When returning markup from a handler, HTML-encode values that can contain user input before adding them to the output.

## Style the Template Content

The following CSS styles the customer name in the examples above.

```CSS Styles
<style type="text/css">
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
* [Template Overview]({% slug htmlhelpers_overview_template %})
* [Implementing Template Columns in the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/column-template)
* [Server-Side API](/api/grid)
