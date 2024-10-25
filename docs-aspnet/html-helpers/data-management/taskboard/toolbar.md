---
title: Toolbar
page_title: Toolbar
description: "Get started with the Telerik UI for {{ site.framework }} TaskBoard and learn how to configure its toolbar."
slug: htmlhelpers_taskboard_aspnetcore_toolbar
position: 9
---

# Toolbar

By default, the toolbar of the TaskBoard displays the `addColumn` and the `search` tools. Default tools can be excluded, or custom tools can be added through the `Toolbar` configuration. 

## Custom Tools

The `Toolbar Items` configuration allows you to set the desired tools that will be rendered in the toolbar of the TaskBoard.

The following example demonstrates how to add a custom tool to the toolbar.

```HtmlHelper

    @(Html.Kendo().TaskBoard()
        .Name("taskBoard")
        .Toolbar(t => t.Items(items =>
        {
            items.Add().Type("button").Command("AddColumnCommand").Name("addColumn").Icon("plus-circle"); //customize a default command
            items.Add().Type("button").Command("CustomAddCardCommand").Name("addCard").Text("Add New Card").Icon("plus"); //define a custom command
            items.Add().Type("spacer");
            items.Add().Name("search").Icon("eye"); // add the Search tool and customize the icon
        }))
         .Messages(messages => messages
            .Search("Find Tasks") //customize the Search tool placeholder
            .AddColumn("New Column")) // customize the text of the default AddColumn command
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
        var cards= (IEnumerable<CardViewModel>)ViewBag.Cards;
    }
    
    <kendo-taskboard 
	    dataorderfield="Order" 
	    datadescriptionfield="Description" 
	    datastatusfield="Status" 
	    datatitlefield="Title" 
        name="taskBoard"
	    bind-to="cards">
        <toolbar>
            <items>
                <item type="button" command="AddColumnCommand" name="addColumn" icon="plus-circle"></item> //customize a default command
                <item type="button" command="CustomAddCardCommand" name="addCard" icon="plus"></item> //define a custom command
                <item type="spacer"></item>
                <item name="search" icon="search"></item>
            </items>
        </toolbar>
        <messages search="Find Task" add-column="New Column"></messages> //customize the Search tool placeholder and the text of the default AddColumn command
        <taskboard-columns>
            <column text="To-do" status="todo"></column>
            <column text="In progress" status="inProgress"></column>
            <column text="Done" status="done"></column>
        </taskboard-columns>
    </kendo-taskboard>
```
{% endif %}
```JavaScript
    <script>
        kendo.ui.taskboard.commands["CustomAddCardCommand"] = kendo.ui.taskboard.Command.extend({
            exec: function () {
                var taskboard = this.taskboard;
                var options = this.options;
                taskboard.addCard({ Status: "todo", Title: "Add Title", Description: "Add Description", Color: "green" });
                taskboard.dataSource.sync();
            }
        });
    </script>
```

## See Also

* [Overview of the TaskBoard (Demo)](https://demos.telerik.com/kendo-ui/taskboard/index)
* [JavaScript API Reference of the TaskBoard](https://docs.telerik.com/kendo-ui/api/javascript/ui/taskboard)
