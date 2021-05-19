---
title: Search Panel
page_title: Search Panel
description: "Learn how to enable the searching functionality of the Telerik UI Grid for ASP.NET Core."
slug: taghelpers_grid_aspnetcore_searchpanel
position: 5
---

# Search Panel

Out of the box, the Grid enables the users to search through its data by using the search panel.

Under the hood, the search panel uses filtering to show only the relevant records in the Grid.

## Getting Started

To enable the search panel functionality, include the `Search` option to the toolbar configuration.

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

You can also customize which fields to search through the data when a value is entered in the search input.

    ...
    <kendo-grid name="grid" height="550">
        <search fields="@(new string[] { "ContactName", "Country"})">
        </search>

## Known Limitations

* When filtering is enabled in the filter textboxes for all Grid columns will be populated with the value entered in the search textbox.
* When the server operations are enabled, you can search only by using string fields. Using the `Contains` filter operation is available only for string types.

## See Also

* [Server-Side API](/api/grid)
* [Knowledge Base Section](/knowledge-base)
