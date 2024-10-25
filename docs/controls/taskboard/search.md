---
title: Search Tool
page_title: Kendo UI for jQuery TaskBoard Documentation - Search Tool
description: "Get started with the Kendo UI for jQuery TaskBoard and learn how to enable the search tool to search through its cards."
slug: search_kendoui_taskboard_widget
position: 7
---

# Search Tool

The TaskBoard has a built-in search tool in its toolbar that allows you to search through the cards data. The search tool uses filtering under the hood to show only the relevant cards that have titles matching the search text.

## Enabling the Search Tool

The search tool is enabled by default. If the toolbar configuration is used to show additional tools, the search tool must be included in the toolbar items collection.

The following example demonstrates how to show the default tools along with a custom button.

```dojo
    <div id="taskBoard"></div>

    <script>
        $("#taskBoard").kendoTaskBoard({
            toolbar: [
                "addColumn",
                "myCustomButton", // Custom button
                "spacer",
                "search"
            ],
            dataOrderField: "order",
            dataSource: [
                { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
                { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
                { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
                { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
                { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
            ],
            columns: [
                { text: "Doing", status: "doing" },
                { text: "Backlog", status: "backlog" },
                { text: "Done", status: "done" }
            ]
        });
    </script>
```

## See Also

* [Overview Kendo UI TaskBoard (Demo)](https://demos.telerik.com/kendo-ui/taskboard/index)
* [JavaScript API Reference of the Kendo UI TaskBoard](/api/javascript/ui/taskboard)
