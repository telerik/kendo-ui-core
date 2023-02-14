---
title: Columns
page_title: Columns
description: "Get started with the Telerik UI for {{ site.framework }} TaskBoard and learn about its columns."
slug: htmlhelpers_taskboard_aspnetcore_columns
position: 4
---

# Columns

The TaskBoard displays cards grouped by certain criteria in columns (lanes). Different aspects of the columns such as column width, the use of templates, the buttons rendered in the columns, etc., can be controlled through the `ColumnSettings` configuration. It has effect over all columns. 

## Column Settings

The default buttons rendered in the TaskBoard columns are: `edit column`, `add card` and `delete column`.

The following example demonstrates how to customize the columns by setting `width` and display only one of the three default column buttons. 

```HtmlHelper
    @(Html.Kendo().TaskBoard()
        .Name("taskBoard")
        .ColumnSettings(s =>
        {
            s.Width("200");
            s.Buttons(b =>
            {
                b.Add().Command("AddCardCommand").Text("addCard");
            });
        })
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
{% if site.core %}
```TagHelper
    @{
        var cards = (IEnumerable<CardViewModel>)ViewBag.Cards;
    }

    <kendo-taskboard 
        dataorderfield="Order" 
        datacategoryfield="Color" 
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
        <column-settings datastatusfield="Status" datatextfield="Text" width="200">
            <buttons>
                <button text="addCard" command="AddCardCommand">
                </button>
            </buttons>
        </column-settings>
    </kendo-taskboard>

```
{% endif %}

## Column Commands

The available column commands are:

* AddColumnCommand
* EditColumnCommand
* DeleteColumnCommand
* SaveColumnCommand
* CancelEditColumnCommand

In addition to the default buttons, you have the option to add custom buttons to the TaskBoard columns.

The following example demonstrates how to use the `ColumnSettings` configuration to add a custom button. A custom command is created, to be triggered on clicking the custom button.

```HtmlHelper
    <script>
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

    @(Html.Kendo().TaskBoard()
        .Name("taskBoard")
        .ColumnSettings(s =>
        {
            s.Buttons(b =>
            {
                b.Add().Name("CustomButton").Text("My Custom Tool").Icon("gear").Command("MyCustomCommand").Options("myvalue");
            });
        })
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
{% if site.core %}
```TagHelper
    <script>
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

    @{
        var cards = (IEnumerable<CardViewModel>)ViewBag.Cards;
    }

    <kendo-taskboard 
        dataorderfield="Order" 
        datacategoryfield="Color" 
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
        <column-settings datastatusfield="Status" datatextfield="Text" width="200">
            <buttons>
                <button name="CustomButton" text="My Custom Tool" icon="gear" command="MyCustomCommand" options="myvalue">
	 	 	    </button>
            </buttons>
        </column-settings>
    </kendo-taskboard>

```
{% endif %}
## See Also

* [Kendo UI TaskBoard Cards]({% slug htmlhelpers_taskboard_aspnetcore_cards %})
* [JavaScript API Reference of the TaskBoard](https://docs.telerik.com/kendo-ui/api/javascript/ui/taskboard)
