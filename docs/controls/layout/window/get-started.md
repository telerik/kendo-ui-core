---
title: Getting Started
page_title: jQuery Window Documentation | Getting Started with the Window
description: "Get started with the jQuery Window by Kendo UI and learn how to create and initialize the widget."
slug: getting_started_kendoui_window_widget
position: 1
---

# Getting Started with the Window

This guide demonstrates how to get up and running with the Kendo UI for jQuery Window. 

After the completion of this guide, you will be able to achieve the following end result:

```dojo
<div id="window"></div>

<script>
    $("#window").kendoWindow({
      height:500,
      width:500,
      title: "Your Kendo Window",
      content: "../content/web/window/ajax/ajaxContent.html"
    });
</script>
```

## 1. Create an Empty div Element

First, create an empty `<div>` element on the page that will serve as the main container of the Window widget.

```html
<div id="window"></div>
```

## 2. Initialize the Window 

In this step, you will initialize the Window from the empty `<div>` element. When you initialize the widget from an empty `div`, all settings of the Window will be provided in the initialization script statement and you have to describe its layout and configuration in JavaScript.

```html
<div id="window"></div>

<script>
    // Target the div element by using jQuery and then call the kendoWindow() method.
    $("#window").kendoWindow({
        // Add some basic configurations such as width and height.
        width: 500,
        height: 500
    });
</script>
```

## 3. Load the Content with AJAX 

Once the basic initialization is completed, you can start adding additional configurations to the Window such as loading its content through an AJAX request.

```html
<div id="window"></div>

<script>
    $("#window").kendoWindow({
      height:500,
      width:500,
      title: "Your Kendo Window",
      content: "../content/web/window/ajax/ajaxContent.html"
    });
</script>
```

## Next Steps 

* [Referencing Existing Widget Instances]({% slug widget_methodsand_events_kendoui_installation %}) 
* [Demo Page for the Window](https://demos.telerik.com/kendo-ui/window/index)

## See Also 

* [JavaScript API Reference of the Grid](/api/javascript/ui/window)
* [Knowledge Base Section](/knowledge-base)