---
title: Chat Toolbar
page_title: Chat Toolbar | Kendo UI Chat
description: "Learn how to configure the Toolbar for the Chat UI."
slug: toolbar_for_chat
position: 3
---

# Chat Toolbar

The Chat Toolbar allows adding different toolbar actions for achieving more user friendly conversational UI.

The Toolbar is placed below the Chat input box and it can be shown/hidden by clicking the toolbar icon placed just to the left from the send button. The Chat Toolbar allows you to include buttons, which the end users can interact with. By handling the [`toolClick`](/api/javascript/ui/chat/events/toolclick) event you can implement functionality based on the command executed in the toolbar.

## Configure Toolbar Items

In order to configure the Toolbar items, you will need to use the [`toolbar.buttons`](/api/javascript/ui/chat/configuration/toolbar.buttons) configuration option of the Chat widget:

```html
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

## Configure Toolbar Behavior

The Chat configuration object allows you to configure:

* The [animation](/api/javascript/ui/chat/configuration/toolbar.animation) behavior of its Toolbar.

* Wether the Toolbar will have a [scroll](/api/javascript/ui/chat/configuration/toolbar.scrollable). That is useful in cases when the buttons could not entirely fit within the width of the widget.

* Wether it could be [hidden and shown](/api/javascript/ui/chat/configuration/toolbar.toggleable) upon a button click.

```html
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

* [Chat Overview]({% slug overview_kendoui_chat_widget %})
* [Connecting to Chat Bot Services]({% slug connect_to_chatbot_service %})
* [Chat Items]({% slug chat_items %})
* [Chat JavaScript API Reference](/api/javascript/ui/chat)

For runnable examples on Kendo UI Chat, refer to the [Kendo UI Demos site](http://demos.telerik.com/kendo-ui/chat/index).
