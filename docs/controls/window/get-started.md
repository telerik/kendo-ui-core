---
title: Getting Started
page_title: jQuery Window Documentation - Getting Started with the Window
description: "Get started with the jQuery Window by Kendo UI and learn how to create and initialize the widget."
components: ["window"]
slug: getting_started_kendoui_window_widget
position: 1
---

# Getting Started with the Window

This guide demonstrates how to get up and running with the Kendo UI for jQuery Window. 

After the completion of this guide, you will be able to achieve the following end result:

```dojo
<div id="window">
  <p>Hello, get started with the Kendo UI for jQuery Window!</p>
</div>

<script>
    $("#window").kendoWindow({
      height:500,
      width:500,
      title: "Your Kendo Window"
    });
</script>
```

## 1. Create a div Element

First, create an `<div>` element on the page that will serve as the main container of the Window component. In the `<div>` element, you can pre-define the content for the component.

```html
<div id="window">
  <p>Hello, get started with the Kendo UI for jQuery Window!</p>
</div>
```

## 2. Initialize the Window 

In this step, you will initialize the Window from the `<div>` element. When you initialize the component from a `div`, all settings of the Window will be provided in the initialization script statement and you have to describe its layout and configuration in JavaScript.

```html
<div id="window">
  <p>Hello, get started with the Kendo UI for jQuery Window!</p>
</div>

<script>
    // Target the div element by using jQuery and then call the kendoWindow() method.
    $("#window").kendoWindow({
        // Add some basic configurations such as width and height.
        width: 500,
        height: 500,
        title: "Your Kendo Window"
    });
</script>
```

## 3. Set the Title 

You can use the [`title`](/api/javascript/ui/window/configuration/title) field to set the header text in the Window component.

```html
<div id="window">
  <p>Hello, get started with the Kendo UI for jQuery Window!</p>
</div>

<script>
    // Target the div element by using jQuery and then call the kendoWindow() method.
    $("#window").kendoWindow({
        // Add some basic configurations such as width and height.
        width: 500,
        height: 500,
        title: 
    });
</script>
```

## Next Steps 

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %}) 
* [Demo Page for the Window](https://demos.telerik.com/kendo-ui/window/index)

## See Also 

* [JavaScript API Reference of the Window](/api/javascript/ui/window)
* [Knowledge Base Section](/knowledge-base)