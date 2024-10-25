---
title: Columns
page_title: Kendo UI for jQuery TaskBoard Documentation - Columns
description: "Get started with the Kendo UI for jQuery TaskBoard and learn about its columns."
slug: columns_kendoui_taskboard_widget
position: 5
---

# Columns

The TaskBoard displays cards grouped by certain criteria in columns (lanes). Different aspects of the columns such as column width, the use of templates, the buttons rendered in the columns, etc., can be controlled through the `columnSettings` configuration. It has effect over all columns. 

## Column Settings

The default buttons rendered in the TaskBoard columns are: `edit column`, `add card` and `delete column`.

The following example demonstrates how to customize the columns by setting `width` and display only one of the three default column buttons. 

```dojo
    <div id="taskBoard"></div>

    <script>
        $("#taskBoard").kendoTaskBoard({
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
            ],
            columnSettings: {
                width: 200,
                buttons: ["addCard"]
            }
        });
    </script>
```

## Column Commands

The available column commands are:

* AddColumnCommand
* EditColumnCommand
* DeleteColumnCommand
* SaveColumnCommand
* CancelEditColumnCommand

In addition to the default buttons, you have the option to add custom buttons to the TaskBoard columns.

The following example demonstrates how to use the `columnSettings` configuration to add a custom button. A custom command is created, to be triggered on clicking the custom button.

```dojo
    <div id="taskBoard"></div>

    <script>
        $("#taskBoard").kendoTaskBoard({
            dataOrderField: "order",
            dataSource: [
                { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
                { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
                { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
                { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
                { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
            ],
            columns: [
                { text: "Backlog", status: "backlog" },
                { text: "Doing", status: "doing" },
                { text: "Done", status: "done" }
            ],
            columnSettings: {
                buttons: [{ name: "CustomButton", text: "My Custom Tool", icon: "gear", command: "MyCustomCommand", options: "myvalue" }]
            }
        });

        kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
            exec: function () {
                var taskboard = this.taskboard;
                var options = this.options;
                var column = options.column;
                var columnElm = options.columnElement;

                columnElm.css("border", "solid red 3px");
                alert(kendo.format("Custom command executed for column with status {0} and value {1}", column.get("status"), options.value));
            } 
        });
    </script>
```

## See Also

* [Kendo UI TaskBoard Cards]({% slug cards_kendoui_taskboard_widget %})
* [JavaScript API Reference of the Kendo UI TaskBoard](/api/javascript/ui/taskboard)
