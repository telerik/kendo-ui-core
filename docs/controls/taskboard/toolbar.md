---
title: Toolbar
page_title: Kendo UI for jQuery TaskBoard Documentation - Toolbar
description: "Get started with the Kendo UI for jQuery TaskBoard and learn how to configure its toolbar."
slug: toolbar_kendoui_taskboard_widget
position: 10
---

# Toolbar

By default, the toolbar of the TaskBoard displays the `addColumn` and the `search` tools. Default tools can be excluded, or custom tools can be added through the `toolbar` configuration. 

## Custom Tools

The `toolbar.items` configuration allows you to set the desired tools that will be rendered in the toolbar of the TaskBoard. Tools can be added to the items collection as strings, or as objects, in case additional configuration is needed.

The following example demonstrates how to add a custom tool to the toolbar.

```dojo
    <div id="taskBoard"></div>

    <script>
        $("#taskBoard").kendoTaskBoard({
            toolbar: {
                items: [
                    { name: "addColumn", icon: "plus-circle" }, //customize a built-in command
                    { type: "button", text: "Add Card", name: "addCard", text: "Add New Card", command: "CustomAddCardCommand", icon: "plus", showText: true }, // define a custom command
                    "spacer",
                    "search"
                ]
            },
            messages: {
                addColumn: "New Column" // customize the text of a built-in command
            },
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

        kendo.ui.taskboard.commands["CustomAddCardCommand"] = kendo.ui.taskboard.Command.extend({
            exec: function () {
                var taskboard = this.taskboard;
                var options = this.options;
                
                taskboard.addCard({ status: "doing", title: "Add Title", description: "Add Description", category: "green" });
                taskboard.dataSource.sync();
            } 
        });
    </script>
```

## See Also

* [Overview Kendo UI TaskBoard (Demo)](https://demos.telerik.com/kendo-ui/taskboard/index)
* [JavaScript API Reference of the Kendo UI TaskBoard](/api/javascript/ui/taskboard)
