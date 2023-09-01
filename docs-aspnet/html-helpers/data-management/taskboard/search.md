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
            items.Add().Type("button").Text("myCustomButton");
            items.Add().Type("spacer");
            items.Add().Name("search").Icon("eye"); // add the Search tool and customize the icon
        }))
        .Messages(messages => messages
            .Search("Find Tasks")) //customize the Search tool placeholder
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
                <item type="button" command="AddColumnCommand" name="addColumn" text="Add Column" icon="plus"></item>
                <item type="button" text="myCustomButton"></item>
                <item type="spacer"></item>
                <item name="search" icon="eye"></item>
            </items>
        </toolbar>
        <messages search="Find Task"></messages>
        <taskboard-columns>
            <column text="To-do" status="todo"></column>
            <column text="In progress" status="inProgress"></column>
            <column text="Done" status="done"></column>
        </taskboard-columns>
    </kendo-taskboard>
```
{% endif %}

## See Also

* [Overview of the TaskBoard (Demo)](https://demos.telerik.com/{{ site.platform }}/taskboard/index)
* [{{ site.framework }} TaskBoard Toolbar]({% slug htmlhelpers_taskboard_aspnetcore_toolbar %})
