---
title: Search Tool
page_title: Search Tool
description: "Get started with the Telerik UI for {{ site.framework }} TaskBoard and learn how to enable the search tool to search through its cards."
slug: htmlhelpers_taskboard_aspnetcore_search
position: 6
---

# Search Tool

The TaskBoard has a built-in search tool in its toolbar that allows you to search through the cards data. The search tool uses filtering under the hood to show only the relevant cards that have titles matching the search text.

## Enabling the Search Tool

The search tool is enabled by default. If the `Toolbar` configuration is used to show additional tools, the search tool must be included in the toolbar items collection.

The following example demonstrates how to show the default tools along with a custom button.

```HtmlHelper
    @(Html.Kendo().TaskBoard()
        .Name("taskBoard")
        .Toolbar(t => t.Items(items =>
        {
            items.Add().Type("button").Command("AddColumnCommand").Name("addColumn").Text("Add Column").Icon("plus");
            items.Add().Type("button").Text("myCustomButton");
            items.Add().Type("spacer");
            items.Add().Type("TaskBoardSearch").Command("SearchCommand").Name("search").Text("Search").Icon("search");
        }))
        .Columns(c =>
        {
            c.Add().Text("To-do").Status("todo");
            c.Add().Text("In Progress").Status("inProgress");
            c.Add().Text("Done").Status("done");
        })
        .DataDescriptionField("Description")
        .DataStatusField("Status")
        .DataTitleField("Title")
        .DataOrderField("Order")
        .BindTo((IEnumerable<Kendo.Mvc.Examples.Models.TaskBoard.CardViewModel>)ViewBag.Cards)
    )
```

## See Also

* [Overview of the TaskBoard (Demo)](https://demos.telerik.com/{{ site.platform }}/taskboard/index)
* [{{ site.framework }} TaskBoard Toolbar]({% slug htmlhelpers_taskboard_aspnetcore_toolbar %})
