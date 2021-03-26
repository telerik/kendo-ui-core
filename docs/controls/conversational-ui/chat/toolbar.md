---
title: Toolbar
page_title: jQuery Chat Documentation | Toolbar
description: "Get started with the jQuery Chat by Kendo UI and learn how to configure the Toolbar for the Chat UI."
slug: toolbar_for_chat
position: 3
---

# Toolbar

The toolbar of the Chat allows you to add toolbar actions for achieving a more user-friendly conversational UI.

The toolbar is located below the input box of the Chat. You can display or hide the toolbar by clicking the toolbar icon which is placed to the left of the **Send** button. The Chat toolbar enables you to add buttons for end-user interaction. Depending on the executed command in the toolbar, you can also implement a specific functionality by handling the [`toolClick`](/api/javascript/ui/chat/events/toolclick) event.

## Configuring the Items

To configure the Toolbar items, use the [`toolbar.buttons`](/api/javascript/ui/chat/configuration/toolbar.buttons) option of the Chat.

```dojo
<div id="chat"></div>
<script>
    $("#chat").kendoChat({
        toolClick: function(e) {
            console.log("Button name: " + e.name);
        },
        toolbar: {
            buttons: [
                { name: "ButtonA", iconClass: "k-icon k-i-image" },
                { name: "ButtonB", iconClass: "k-icon k-i-wrench" }
            ]
        }
    });
</script>
```

## Configuring the Behavior

The Chat configuration object allows you to configure the following behavior aspects of the toolbar:

* The [animation](/api/javascript/ui/chat/configuration/toolbar.animation) behavior of its toolbar.
* Whether the toolbar will be [scrollable](/api/javascript/ui/chat/configuration/toolbar.scrollable). A scrollbar is useful when the buttons cannot entirely fit within the width of the Chat.
* Whether the toolbar will be [displayed or hidden](/api/javascript/ui/chat/configuration/toolbar.toggleable) upon a button click.

```dojo
<div id="chat"></div>
<script>
    $("#chat").kendoChat({
        toolbar: {
            toggleable: true,
            scrollable: true,
            animation: {
                collapse: {
                    effects: "expandVertical fadeIn",
                    duration: 500
                },
                expand: {
                    effects: "expandVertical fadeIn",
                    duration: 500
                }
            },
            buttons: [
                { name: "ButtonA", iconClass: "k-icon k-i-image" },
                { name: "ButtonB", iconClass: "k-icon k-i-wrench" }
            ]
        }
    });
</script>
```

## See Also

* [Basic Usage of the Chat (Demo)](https://demos.telerik.com/kendo-ui/chat/index)
* [JavaScript API Reference of the Chat](/api/javascript/ui/chat)
