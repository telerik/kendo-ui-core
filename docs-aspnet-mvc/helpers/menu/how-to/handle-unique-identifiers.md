---
title: Handle Unique Identifiers with Menu Items
page_title: Handle Unique Identifiers with Menu Items | Kendo UI Menu HtmlHelper
description: "Learn how to Handle Unique Identifiers with Menu Items with the Kendo UI Menu in ASP.NET MVC applications."
slug: howto_handleuniqueidentifiers_menu
---

# Handle Unique Identifiers with Menu Items

Commonly, it is required to handle custom identifiers with click handlers (or in this case the [select event](/api/javascript/ui/menu#events-select)). As the Kendo Menu mainly uses the HTML elements rendered to provide functionality, you can use custom HTML attributes to serve you as unique identifiers in your code.  

With that you can programmatically:

* Identify the item clicked;
* Utilize values specific to the item different than text;
* Remove a specific item from the Menu vy identifying it via attribute;
* Run specific logic for a particular item(s). 

In the examples below you can examine how to handle a custom command attribute to accomplish some specific application requirements (like the ones mentioned in the list above).

##### Example

```js
@(Html.Kendo().Menu()
    .Name("menu")
    .Items(items => {
        items.Add()
            .Text("Command 1")
            .HtmlAttributes(new { data_command = "command1" });

        items.Add()
            .Text("Command 2")
            .HtmlAttributes(new { data_command = "command2" });

        items.Add()
            .Text("Remove Command 2")
            .HtmlAttributes(new { @class = "remove-command", data_removecommand = "command2" });
    })
    .Events(events => events.Select("onSelect"))
)

<script>
    function onSelect(ev) {
        var clickedItem = $(ev.item);
        var command = clickedItem.data("command");

        if (command) {
            alert(command);
        }
    }

    $(".remove-command").click(function(ev){
        var commandToRemove = $(ev.target).parent("li").data("removecommand");
        removeCommand(commandToRemove);
    })

    function removeCommand(command){
        $("#menu").data("kendoMenu").remove("[data-command='" + command + "']");
    }
</script>
```

## See Also

* [Overview of the Menu HtmlHelper]({% slug overview_menu_aspnetmvc %})
* [MenuBuilder API Reference](/api/Kendo.Mvc.UI.Fluent/MenuBuilder)
