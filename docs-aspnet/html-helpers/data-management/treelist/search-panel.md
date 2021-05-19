---
title: Search Panel
page_title: Search Panel
description: "Learn how to enable the searching functionality of the Telerik UI TreeList for {{ site.framework }}."
slug: htmlhelpers_treeList_aspnetcore_searchpanel
position: 5
---

# Search Panel

Out of the box, the TreeList enables the users to search through its data by using the search panel.

Under the hood, the search panel uses filtering to show only the relevant records in the TreeList.

## Getting Started

To enable the search panel functionality, include the `Search` option to the toolbar configuration.

    @(Html.Kendo().TreeList<CustomerViewModel>()
        .Name("treeList")
        .ToolBar(t => t.Search()) // Enable the Search panel.
        ...

You can also customize which fields to search through the data when a value is entered in the search input.

    ...
    .Search(s=> { s.Field(c => c.ContactName); })

## Known Limitations

* When filtering is enabled in the filter textboxes for all TreeList columns will be populated with the value entered in the search textbox.
* When the server operations are enabled, you can search only by using string fields. Using the `Contains` filter operation is available only for string types.

## See Also

* [Server-Side API](/api/treelist)
* [Knowledge Base Section](/knowledge-base)
