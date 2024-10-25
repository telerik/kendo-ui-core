---
title: Getting Started
page_title: jQuery Chat Documentation - Getting Started with the Chat
description: "Get started with the jQuery Chat by Kendo UI and learn how to create and initialize the component in a few easy steps."
slug: getting_started_kendoui_chat_component
position: 2
---


# Getting Started with the Chat 

This guide demonstrates how to get up and running with the Kendo UI for jQuery Chat.

After the completion of this guide, you will achieve the following end result:

```dojo
    <div id="chat"></div>
    <script>
        $("#chat").kendoChat({
            toolbar: {
                buttons: [
                    { name: "ButtonA", iconClass: "k-icon k-i-gear" },
                    { name: "ButtonB", iconClass: "k-icon k-i-arrow-rotate-cw" }
                ]
            },
            messages: {
                placeholder: "Type here..."
            }
        });
    </script>
```

## 1. Create a Div Element

First, create a `<div>` element on the page that will be used to initialize the component.

```html
    <div id="chat"></div>
```

## 2. Initialize the Chat

In this step, you will initialize the Chat from the `<div>` element.

```dojo
    <div id="chat"></div>
    <script>
        $("#chat").kendoChat();
    </script>
```

## 3. Apply Configuration Settings

Here, you will apply some settings, such as [`toolbar.buttons`](/api/javascript/ui/chat/configuration/toolbar.buttons), and [`messages.placeholder`](/api/javascript/ui/chat/configuration/messages.placeholder).

```dojo
    <div id="chat"></div>
    <script>
        $("#chat").kendoChat({
            toolbar: {
                // Defines the collection of buttons that will be rendered.
                buttons: [
                    { name: "ButtonA", iconClass: "k-icon k-i-gear" },
                    { name: "ButtonB", iconClass: "k-icon k-i-arrow-rotate-cw" }
                ]
            },
            messages: {
                // The hint that is displayed in the input textbox of the component.
                placeholder: "Type here..."
            }
        });
    </script>
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the Chat](https://demos.telerik.com/kendo-ui/chat/index)

## See Also 

* [JavaScript API Reference of the Chat](/api/javascript/ui/chat)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
