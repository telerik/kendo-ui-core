---
title: Handle Unique Identifiers with Menu Items
page_title: Handle Unique Identifiers with Menu Items | Kendo UI Menu HtmlHelper
description: "Learn how to handle unique identifiers with Kendo UI Menu items in ASP.NET MVC applications."
slug: howto_handleuniqueidentifiers_menuaspnetmvc
---

# Handle Unique Identifiers with Menu Items

Commonly, you are required to handle custom identifiers with click handlers or, as in this case, by using the [`select`](/api/javascript/ui/menu#events-select) event.

To provide for the functionality, the Kendo UI Menu mainly uses the HTML elements that are rendered. That is why you can use custom HTML attributes to serve you as unique identifiers in your code.  

In this way, you can programmatically:

* Identify the clicked item.
* Utilize values that are specific to the item other than text.
* Remove a specific item from the Menu by identifying it through an attribute.
* Run the specific logic for particular items.

The following example demonstrates how to handle a custom command attribute to accomplish specific application requirements such as the ones mentioned in the previous list.

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
