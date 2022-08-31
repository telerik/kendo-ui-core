---
title: Search Panel
page_title: Search Panel
description: "Learn how to enable the searching functionality of the Telerik UI Grid for {{ site.framework }}."
slug: htmlhelpers_grid_aspnetcore_searchpanel
previous_url: /helpers/html-helpers/grid/features/searching, /html-helpers/data-management/grid/features/searching
position: 9
---

# Search Panel

Out of the box, the Grid enables the users to search through its data by using the search panel.

Under the hood, the search panel uses filtering to show only the relevant records in the Grid.

## Getting Started

To enable the search panel functionality, include the `Search` option to the toolbar configuration.

```HtmlHelper
    @(Html.Kendo().Grid<CustomerViewModel>()
        .Name("Grid")
        .ToolBar(t => t.Search()) // Enable the Search panel.
        ...
```
{% if site.core %}
```TagHelper
    <kendo-grid name="grid" height="550">
        <datasource type="DataSourceTagHelperType.Custom" custom-type="odata" page-size="20">
            <transport>
                <read url="https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers" />
            </transport>
        </datasource>
        <toolbar>
            <toolbar-button name="search"></toolbar-button>
        </toolbar>

        <groupable enabled="true" />
        <sortable enabled="true" />
        <pageable button-count="5" refresh="true" page-sizes="new int[] { 5, 10, 20 }">
        </pageable>
        <filterable enabled="true" />
        <columns>
            <column field="ContactName" title="Contact Name" width="240" />
            <column field="ContactTitle" title="Contact Title" />
            <column field="CompanyName" title="Company Name" />
            <column field="Country" title="Country" width="150" />
        </columns>
    </kendo-grid>
```
{% endif %}


You can also customize which fields to search through the data when a value is entered in the search input.

```HtmlHelper
    ...
    .Search(s=> 
    { 
        s.Field(c => c.ContactName);
        s.Field(c => c.CompanyName); 
    })
```
{% if site.core %}
```TagHelper
    <kendo-grid name="grid" height="550">
        <search fields="@(new string[] { "ContactName", "Country"})">
        </search>
```
{% endif %}

## Specify the filter operator

As of Kendo UI 2021 R3 SP1, you can specify filter operators for each filter type. With this update, you can filter non-string types.

The following example demonstrates how to specify which fields to include in the search

```HtmlHelper
    .Search(s => {
            s.Field(o => o.OrderID, "eq");
            s.Field(o => o.Freight, "gt");
            s.Field(o => o.ShipName, "contains");
            s.Field(o => o.ShipCity, "contains");
    })
```
{% if site.core %}
```TagHelper
    <search fields-extended="@(new object[]
            {new {Name = "OrderID", Operator = "eq"},
                new {Name = "ShipName", Operator = "contains"},
                new {Name = "ShipCity", Operator = "contains"}})">
    </search>
```
{% endif %}



The code snippets from above can be seen in action in the following demo:

* [Search Panel of the Grid for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/search-panel)

## Known Limitations

* When filtering is enabled, the filter textboxes for all Grid columns will be populated with the value entered in the search textbox.

## See Also

* [Server-Side API](/api/grid)
* [Knowledge Base Section](/knowledge-base)
