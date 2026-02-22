---
title: Getting Started
page_title: jQuery ButtonGroup Documentation - Getting Started with the ButtonGroup
description: "Get started with the jQuery ButtonGroup by Kendo UI and learn how to create, initialize, and enable the component."
components: ["buttongroup"]
slug: getting_started_kendoui_buttongroup_widget
position: 1
---

# Getting Started with the ButtonGroup

This guide demonstrates how to get up and running with the Kendo UI for jQuery ButtonGroup.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
	<div id="buttonGroup"></div>

    <script>
        $("#buttonGroup").kendoButtonGroup({
            size:"large",
            rounded:'full',
            themeColor:"success",
            fillMode: "outline",
            items: [
                { text: "<b>First Button</b>", encoded: false },
                { text: "<b>Second Button</b>", encoded: true }
            ]
        });
    </script>
```

## 1. Create an Empty Div Element

First, create an empty `<div>` element on the page from which the ButtonGroup component will be initialized.

```html
    <div id="buttonGroup"></div>
```

## 2. Initialize the ButtonGroup

In this step, you will initialize the ButtonGroup from the `<div>` element. When you initialize the component, all settings of the ButtonGroup will be provided in the script statement. You have to describe its configuration and event handlers in JavaScript.

```html
    <div id="buttonGroup"></div>

    <script>
        // Target the div element by using jQuery and then call the kendoButtonGroup() method.
        $("#buttonGroup").kendoButtonGroup();
    </script>
```

Once the basic initialization is completed, you can start adding additional configurations to the ButtonGroup.

## 3. Change the Appearance of the ButtonGroup

The ButtonGroup provides various configurations to change its appearance. Below you can see how to use the [`fillMode`](/api/javascript/ui/buttongroup/configuration/fillmode), [`rounded`](/api/javascript/ui/buttongroup/configuration/rounded), [`themeColor`](/api/javascript/ui/buttongroup/configuration/themecolor), and [`size`](/api/javascript/ui/buttongroup/configuration/size) options.

```html
    <div id="buttonGroup"></div>

    <script>
        $("#buttonGroup").kendoButtonGroup({
            size:"large",
            rounded:'full',
            themeColor:"success",
            fillMode: "outline",
            items: [
                { text: "<b>First Button</b>", encoded: false },
                { text: "<b>Second Button</b>", encoded: true }
            ]
        });
    </script>
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the ButtonGroup](https://demos.telerik.com/kendo-ui/buttongroup/index)

## See Also

* [JavaScript API Reference of the ButtonGroup](/api/javascript/ui/buttongroup)
* [Knowledge Base Section](/knowledge-base)


