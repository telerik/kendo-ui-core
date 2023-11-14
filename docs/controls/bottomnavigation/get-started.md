---
title: Getting Started
page_title: jQuery BottomNavigation Documentation - Getting Started with the BottomNavigation
description: "Get started with the jQuery BottomNavigation by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_bottomnavigation_component
position: 2
---

# Getting Started with the BottomNavigation 

This guide demonstrates how to get up and running with the Kendo UI for jQuery BottomNavigation.

After the completion of this guide, you will achieve the following end result:

```dojo
  <nav id="bottomnavigation"></nav>

    <script>
        $("#bottomnavigation").kendoBottomNavigation({
            items: [
                { text: "Home", icon: "home" },
                { text: "Info", icon: "info-circle" },
                { text: "Contact", icon: "envelope" }
            ]
        });
    </script>
```

## 1. Create a Nav Element

First, create a `<nav>` element on the page that will be used to initialize the component. The content of the `<nav>` will be the content of the BottomNavigation.

```html
    <nav id="bottomnavigation"></nav>
```

## 2. Initialize the BottomNavigation

In this step, you will initialize the BottomNavigation from the `<nav>` element.

```html
  <nav id="bottomnavigation"></nav>

    <script>
        $("#bottomnavigation").kendoBottomNavigation();
    </script>
```

## 3. Specify the Items

Here, you will specify the [`items`](/api/javascript/ui/bottomnavigation/configuration/items) of the BottomNavigation.

```dojo
  <nav id="bottomnavigation"></nav>

    <script>
        $("#bottomnavigation").kendoBottomNavigation({
            items: [
                { text: "Home", icon: "home" },
                { text: "Info", icon: "info-circle" },
                { text: "Contact", icon: "envelope" }
            ]
        });
    </script>
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the BottomNavigation](https://demos.telerik.com/kendo-ui/bottomnavigation/index)

## See Also 

* [JavaScript API Reference of the BottomNavigation](/api/javascript/ui/bottomnavigation)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
