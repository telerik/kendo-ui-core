---
title: Handle Unique Identifiers with Menu Items
page_title: Handle Unique Identifiers with Menu Items | Kendo UI Menu
description: "Learn how to handle unique identifiers with Kendo UI Menu items."
slug: howto_handleuniqueidentifiers_menu
---

# Handle Unique Identifiers with Menu Items

Commonly, you are required to handle custom identifiers with click handlers or, as in this case, by using the [`select`](/api/javascript/ui/menu#events-select) event.

To provide for the functionality, the Kendo UI Menu mainly uses the HTML elements that are rendered. That is why you can use custom HTML attributes to serve you as unique identifiers in your code.  

In this way, you can programmatically:

* Identify the clicked item.
* Utilize values that are specific to the item other than text.
* Remove a specific item from the Menu by identifying it through an attribute.
* Run the specific logic for particular items.

The following examples demonstrate how to handle a custom command attribute to accomplish specific application requirements such as the ones mentioned in the previous list.

## Bound with JSON Data

###### Example

```html
<ul id="menu"></ul>

<script>
  var imgUrl = "http://demos.telerik.com/kendo-ui/content/shared/icons/sports/swimming.png";
  $(document).ready(function() {
    $("#menu").kendoMenu({
      dataSource:
        [{
            text: "Command 1",
            attr: {
                command: "command1"
            }
        },{
            text: "Command 2",
            attr: {
                command: "command2"
            }
        },{
            text: "Remove Command 2",
            attr: {
                command_to_remove: "command2"
            },
            select: function (ev){
                var commandToRemove = ev.target.parent("li").attr("command_to_remove");
                removeCommand(commandToRemove);
            }
        }],
        select: function (ev){
            var clickedItem = $(ev.item);
            var command = clickedItem.attr("command");

            if(command){
                alert(command);
            }
        }
    });
  });

  function removeCommand(command){
      $("#menu").data("kendoMenu").remove("[command='" + command + "']");
  }
</script>
```

## Created with HTML Elements

###### Example

```html
<ul id="menu">
    <li data-command="command1">Command 1</li>
    <li data-command="command2">Command 2</li>
    <li data-removecommand="command2" class="remove-command">Remove Command 2</li>
</ul>

<script>
  var imgUrl = "http://demos.telerik.com/kendo-ui/content/shared/icons/sports/swimming.png";
  $(document).ready(function() {
    $("#menu").kendoMenu({
        select: function (ev){
            var clickedItem = $(ev.item);
            var command = clickedItem.data("command");

            if(command){
                alert(command);
            }
        }
    });
  });

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

* [Menu JavaScript API Reference](/api/javascript/ui/menu)
* [How to Create Split Button]({% slug howto_createa_split_button_menu %})
* [How to Use FontAwesome Icons]({% slug howto_use_fontawesome_icons_menu %})

For more runnable examples on the Kendo UI Menu, browse the [**How To** documentation folder]({% slug howto_showcontextmenuintreelist_menu %}).
