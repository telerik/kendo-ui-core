---
title: Cards
page_title: Kendo UI for jQuery TaskBoard Documentation - Cards
description: "Get started with the Kendo UI for jQuery TaskBoard and learn about its cards."
slug: cards_kendoui_taskboard_widget
position: 4
---

# Cards

The TaskBoard displays tasks, notes, projects, or other types of items as cards grouped by certain criteria in columns (lanes). Cards can be reordered, dropped onto another column, edited, or deleted.

## Card States

A card can be in one of three states:

* enabled (by default)
* disabled
* readonly

You can disable/enable individual cards, or all cards in a column. 

The following example demonstrates how to disable a specific card.

```dojo
    <div id="taskBoard"></div>

    <script>
        var taskBoard = $("#taskBoard").kendoTaskBoard({
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
        }).data("kendoTaskBoard");

        taskBoard.enable(taskBoard.items().eq(0), false);
    </script>
```

You can also set readonly status to specific cards, or to all cards in a column.

The following example demonstrates how to set all cards in a column to readonly.

```dojo
    <div id="taskBoard"></div>

    <script>
        var taskBoard = $("#taskBoard").kendoTaskBoard({
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
        }).data("kendoTaskBoard");

        taskBoard.readOnlyByColumn(taskBoard.columns().eq(0));
    </script>
```

## Card Menu

The TaskBoard renders a menu button in each card, which provides options for deleting or editing the cards. Clicking them executes the DeleteCardCommand or the EditCardCommand, respectively.

The available card commands are:

* SelectCardCommand
* SaveChangesCommand
* DeleteCardCommand
* MoveCardCommand
* EditCardCommand
* AddCardCommand

Additional custom buttons can be added through the `cardMenu` configuration.

The following example demonstrates how to use a custom button that executes a custom command in the card menu.

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
            cardMenu: [ { name: "CustomButton", text: "My Custom Tool", icon: "gear", command: "MyCustomCommand", options: "myvalue" } ]
        });

        kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
            exec: function () {
                var taskboard = this.taskboard;
                var options = this.options;
                var card = options.card;
                var cardElm = options.cardElement;
                var column = options.column;
                var columnElm = options.columnElement;

                cardElm.css("border", "solid red 3px");
                columnElm.css("border", "solid red 3px");
                alert(kendo.format("{0} Card executed Custom command in column with status {1} with value {2}", card.get("title"), column.get("status"), options.value));
            } 
        });
    </script>
```

## See Also

* [Kendo UI TaskBoard Columns]({% slug columns_kendoui_taskboard_widget %})
* [JavaScript API Reference of the Kendo UI TaskBoard](/api/javascript/ui/taskboard)
