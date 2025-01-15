---
title: Handle Unique Identifiers with Menu Items
page_title: Handle Unique Identifiers with Menu Items
description: "Learn how to handle unique identifiers with {{ site.product }} Menu items in {{ site.framework }} applications."
previous_url: /helpers/navigation/menu/how-to/handle-unique-identifiers, /html-helpers/navigation/menu/how-to/handle-unique-identifiers
slug: menu-handle-unique-identifiers
tags: menu, items, select
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Menu</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>Created with version 2024.4.1112</td>
 </tr>
</table>

## Description
How can I set custom identifiers to the {{ site.product }} Menu items and implement custom logic when the respective item is clicked?

## Solution
Commonly, you are required to handle custom identifiers with `click` handlers or, as in this case, by using the [client-side `Select`](/api/kendo.mvc.ui.fluent/menueventbuilder#selectsystemstring) event of the component.

To provide for the functionality, the Menu mainly uses the HTML elements that are rendered, so you can use custom HTML attributes to serve as unique identifiers.  

In this way, you can programmatically:

* Identify the clicked item.
* Utilize values that are specific to the item other than text.
* Remove a specific item from the Menu by identifying it through an attribute.
* Run a custom logic for particular items.

The following example demonstrates how to handle a custom command attribute to accomplish specific application requirements, such as the ones mentioned in the above list.

```HtmlHelper
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
```

{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-menu name="menu" on-select="onSelect">
        <items>
            <menu-item text="Command 1" data-command="command1"></menu-item>
            <menu-item text="Command 2" data-command="command2"></menu-item>
            <menu-item text="Remove Command 2" class="remove-command" data_removecommand="command2"></menu-item>
        </items>
    </kendo-menu>
```
{% endif %}

```JavaScript
    <script>
        function onSelect(ev) {
            var clickedItem = $(ev.item);
            var command = clickedItem.data("command"); // Select the value of the "data-command" attribute to identify the clicked Menu item.

            if (command) { // Execute custom logic based on the clicked Menu item.
                alert(command);
            }
        }

        $(document).ready(function(){
            $(".remove-command").click(function(ev){
                var commandToRemove = $(ev.target).parent("li").data("removecommand");
                removeCommand(commandToRemove);
            })
        })

        function removeCommand(command){
            $("#menu").data("kendoMenu").remove("[data-command='" + command + "']"); // Remove the Menu item.
        }
    </script>
```

## More {{ site.framework }} Menu Resources

* [{{ site.framework }} Menu Documentation]({%slug htmlhelpers_menu_aspnetcore%})

* [{{ site.framework }} Menu Demos](https://demos.telerik.com/{{ site.platform }}/menu)

{% if site.core %}
* [{{ site.framework }} Menu Product Page](https://www.telerik.com/aspnet-core-ui/menu)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Menu Product Page](https://www.telerik.com/aspnet-mvc/menu)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Menu for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/menu)
* [Server-Side API Reference of the Menu for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/menu/api)
{% if site.core %}
* [Server-Side TagHelper API Reference of the Menu for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/menu)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
