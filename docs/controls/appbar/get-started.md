---
title: Getting Started
page_title: jQuery AppBar Documentation - Getting Started with the AppBar
description: "Get started with the jQuery AppBar by Kendo UI and learn how to create the component."
slug: getting_started_kendoui_appbar_widget
position: 1
---

# Getting Started with the AppBar

This guide demonstrates how to get up and running with the Kendo UI for jQuery AppBar.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <div id="appbar"></div>
    <script>
        $("#appbar").kendoAppBar({
            items: [
                {
                    type: "contentItem",
                    template: "<span><input /><span>"
                },
                {
                    type: "spacer"
                },
                {
                    type: "contentItem",
                    template: "<h1>This is just a text</h1>"
                },
            ]
        });
    </script>
```

## 1. Create an Empty Div Element

First, create an empty `<div>` element on the page that will serve as the main container of the AppBar component.

```html
<div id="appbar"></div>
```

## 2. Initialize the AppBar

In this step, you will initialize the AppBar from the empty `<div>` element. All settings of the AppBar will be provided in the initialization script statement and you have to describe its layout and configuration in JavaScript.

```html
<div id="appbar"></div>

<script>
    // Target the div element by using jQuery and then call the kendoAppBar() method.
    $("#appbar").kendoAppBar();
</script>
```

## 3. Add Content in the AppBar

You fill the AppBar with content of your choice through the [`items`](/api/javascript/ui/appbar/configuration/items) configuration.

```html
    <div id="appbar"></div>

    <script>
        $("#appbar").kendoAppBar({
            items: [
                {
                    type: "contentItem",
                    template: "<span><input /><span>"
                },
                {
                    type: "spacer"
                },
                {
                    type: "contentItem",
                    template: "<h1>This is just a text</h1>"
                },
            ]
        });
    </script>
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the Kendo UI for jQuery AppBar](https://demos.telerik.com/kendo-ui/appbar/index)

## See Also

* [JavaScript API Reference of the jQuery AppBar](/api/javascript/ui/appbar)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
