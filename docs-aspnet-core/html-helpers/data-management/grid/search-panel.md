---
title: Search Panel
page_title: Search Panel | Telerik UI Grid HtmlHelper for ASP.NET Core
description: "Learn how to enable the searching functionality of the Telerik UI Grid for ASP.NET Core."
slug: htmlhelpers_grid_aspnetcore_searchpanel
position: 5
---

# Search Panel

The Grid component has a built-in feature that enables the users to search through the data. The Search Panel uses filtering under the hood to show only the relevant records in the Grid.

## Getting Started

To enable the functionality include the `Search` option to the toolbar configuration.

    @(Html.Kendo().Grid<CustomerViewModel>()
        .Name("Grid")
        .ToolBar(t => t.Search()) // Enable the Search panel.
        ...

In addition it is possible to customize which fields to search when a value is entered in the search input.

    ...
    .Search(s=> { s.Field(c => c.ContactName); })
    

> When server operations are enabled it is possible to search only using string fields. Using `Contains` filter operation is available only for string types. 


## Known Limitations

* When filtering is enabled in the filter textboxes for all Grid columns will be populated with the value entered in the search textbox.



## See Also

* [Search Panel in the Grid HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/grid/search-panel)
* [JavaScript API Reference of the Grid HtmlHelper for ASP.NET Core](/api/grid)
