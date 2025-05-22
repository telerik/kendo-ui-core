---
title: Getting Started
page_title: jQuery ToolBar Documentation - Getting Started with the ToolBar
description: "Get started with the jQuery ToolBar by Kendo UI and learn how to create and initialize the component."
slug: getting_started_kendoui_toolbar
position: 1
---

# Getting Started with the ToolBar

This guide demonstrates how to get up and running with the Kendo UI for jQuery ToolBar.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
            size:"large",
            items: [
                { type: "button", text: "Button" },
                { type: "button", text: "Toggle", togglable: true },
                { type: "splitButton", text: "SplitButton", menuButtons: [{text: "Option 1"}, {text: "Option 2"}] }
            ]
        });
    </script>
```

## 1. Create a Div Element

First, create an empty `<div>` element on the page that will serve as the main container of the ToolBar component.

```html
<div id="toolbar"></div>
```

## 2. Initialize the ToolBar

In this step, you will initialize the ToolBar from the `<div>` element. All settings of the ToolBar will be provided in the initialization script statement and you have to describe its layout and configuration in JavaScript.

```html
<div id="toolbar"></div>

<script>
    // Target the div element by using jQuery and then call the kendoToolBar() method.
    $("#toolbar").kendoToolBar();
</script>
```

## 3. Set the Size of the ToolBar

The ToolBar allows you to change its size. The following example demonstrates how to apply a different [`size`](https://docs.telerik.com/kendo-ui/api/javascript/ui/toolbar/configuration/size) to the component.

```html
<div id="toolbar"></div>

<script>
    $("#toolbar").kendoToolBar({
        size:"large"
    });
</script>
```

## 4. Configure the Items of the ToolBar

The ToolBar enables you to configure its items by using the [`items`](https://docs.telerik.com/kendo-ui/api/javascript/ui/toolbar/configuration/items) property.

```html
<div id="toolbar"></div>

<script>
    $("#toolbar").kendoToolBar({
        value: "Some text",
        items: [
            { type: "button", text: "Button" },
            { type: "button", text: "Toggle", togglable: true },
            { type: "splitButton", text: "SplitButton", menuButtons: [{text: "Option 1"}, {text: "Option 2"}] }
        ]
    });
</script>
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the ToolBar](https://demos.telerik.com/kendo-ui/toolbar/index)

## See Also 

* [JavaScript API Reference of the ToolBar](/api/javascript/ui/toolbar)
* [Knowledge Base Section](/knowledge-base)


