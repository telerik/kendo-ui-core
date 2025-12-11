---
title: Getting Started
page_title: jQuery Popover Documentation - Getting Started with the Popover
description: "Get started with the jQuery Popover by Kendo UI and learn how to create and initialize the component."
components: ["popover"]
slug: getting_started_kendoui_popover
position: 1
---

# Getting Started with the Popover

This guide demonstrates how to get up and running with the Kendo UI for jQuery Popover.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
     <div id="container">
        I'm a <strong>target</strong>. I'm also a
        <strong>target</strong>.
    </div>
     
    <script>
         $(document).ready(function() {
            $("#container").kendoPopover({
                header: "Header",
                body: "Kendo Popover Body",
                filter: "strong"
            });
        });
    </script>
```

## 1. Create a Div Element

First, create a `<div>` element which will serve to initilize the Popover.

```html
    <div id="container">
        I'm a <strong>target</strong>. I'm also a
        <strong>target</strong>.
    </div>
```

## 2. Initialize the Popover 

In this step, you will initialize the Popover from the `div` element. 

```html
    <div id="container">
        I'm a <strong>target</strong>. I'm also a
        <strong>target</strong>.
    </div>
    <script>
        // Target the div element by using jQuery and then call the kendoPopover() method.
        $("#container").kendoPopover();
    </script>
```

## 3. Specify the Header and Body of the Popover

The Popover allows you to specify a [`header`](/api/javascript/ui/popover/configuration/header) and a [`body`](/api/javascript/ui/popover/configuration/body). Both options can accept either a string or a function.

```html
    <div id="container">
        I'm a <strong>target</strong>. I'm also a
        <strong>target</strong>.
    </div>
     
    <script>
         $(document).ready(function() {
            $("#container").kendoPopover({
                header: "Header",
                body: "Kendo Popover Body"
            });
        });
    </script>
```

## 4. Set the Filter for the Popover

You can specify a selector so that the Popover would appear only for certain parts of the content. In the example, the Popover will appear only for `<strong>` tags.

```html
    <div id="container">
        I'm a <strong>target</strong>. I'm also a
        <strong>target</strong>.
    </div>
     
    <script>
         $(document).ready(function() {
            $("#container").kendoPopover({
                header: "Header",
                body: "Kendo Popover Body",
                filter: "strong"
            });
        });
    </script>
```

## Next Steps 

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %}) 
* [Demo Page for the Popover](https://demos.telerik.com/kendo-ui/popover/index)

## See Also 

* [JavaScript API Reference of the Popover](/api/javascript/ui/popover)
* [Knowledge Base Section](/knowledge-base)


