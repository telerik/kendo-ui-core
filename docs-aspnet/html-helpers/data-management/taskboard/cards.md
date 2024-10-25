---
title: Cards
page_title: Cards
description: "Get started with the Telerik UI for {{ site.framework }} TaskBoard and learn about its cards."
slug: htmlhelpers_taskboard_aspnetcore_cards
position: 3
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

```HtmlHelper
    @(Html.Kendo().TaskBoard()
        .Name("taskBoard")
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

    <script>
        $(document).ready(function() {
            var taskBoard = $("#taskBoard").data("kendoTaskBoard");

            taskBoard.enable(taskBoard.items().eq(0), false);
        });
    </script>
```
{% if site.core %}
```TagHelper
    @{
        var cards=(IEnumerable<CardViewModel>)ViewBag.Cards;
    }

    <kendo-taskboard 
        dataorderfield="Order" 
        datadescriptionfield="Description" 
        datastatusfield="Status" 
        datatitlefield="Title" 
        height="980" name="taskBoard" 
        bind-to="cards">
        <taskboard-columns>
            <column text="To-do" status="todo"></column>
            <column text="In progress" status="inProgress"></column>
            <column text="Done" status="done"></column>
        </taskboard-columns>
    </kendo-taskboard>

   <script>
        $(document).ready(function() {
            var taskBoard = $("#taskBoard").data("kendoTaskBoard");

            taskBoard.enable(taskBoard.items().eq(0), false);
        });
    </script>

```
{% endif %}
You can also set readonly status to specific cards, or to all cards in a column.

The following example demonstrates how to set all cards in a column to readonly.

```HtmlHelper
    @(Html.Kendo().TaskBoard()
        .Name("taskBoard")
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

    <script>
        $(document).ready(function() {
            var taskBoard = $("#taskBoard").data("kendoTaskBoard");

            taskBoard.readOnlyByColumn(taskBoard.columns().eq(0));
        });
    </script>
```
{% if site.core %}
```TagHelper
    @{
        var cards=(IEnumerable<CardViewModel>)ViewBag.Cards;
    }

    <kendo-taskboard 
        dataorderfield="Order" 
        datadescriptionfield="Description" 
        datastatusfield="Status" 
        datatitlefield="Title"
        name="taskBoard" 
        bind-to="cards">
        <taskboard-columns>
            <column text="To-do" status="todo"></column>
            <column text="In progress" status="inProgress"></column>
            <column text="Done" status="done"></column>
        </taskboard-columns>
    </kendo-taskboard>

    <script>
        $(document).ready(function() {
            var taskBoard = $("#taskBoard").data("kendoTaskBoard");

            taskBoard.readOnlyByColumn(taskBoard.columns().eq(0));
        });
    </script>

```
{% endif %}

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

```HtmlHelper
    <script>
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

    @(Html.Kendo().TaskBoard()
        .Name("taskBoard")
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
        .CardMenu(m => m.Add().Name("CustomButton").Text("My Custom Tool").Icon("gear").Command("MyCustomCommand").Options("myvalue"))
    )
```

## See Also

* [{{ site.framework }} TaskBoard Columns]({% slug htmlhelpers_taskboard_aspnetcore_columns %})
* [JavaScript API Reference of the TaskBoard](https://docs.telerik.com/kendo-ui/api/javascript/ui/taskboard)
