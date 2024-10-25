---
title: Getting Started
page_title: jQuery Breadcrumb Documentation - Getting Started with the Breadcrumb
description: "Get started with the jQuery Breadcrumb by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_Breadcrumb_component
position: 2
---

# Getting Started with the Breadcrumb 

This guide demonstrates how to get up and running with the Kendo UI for jQuery Breadcrumb.

After the completion of this guide, you will achieve the following end result:

```dojo
    <nav id="breadcrumb"></nav>
    <script>
      $("#breadcrumb").kendoBreadcrumb({
        size: "small",
        rootIcon: "home",
        items: [
          {
            type: "rootitem",
            href: "https://demos.telerik.com/kendo-ui/",
            text: "All Components",
            showText: true,
            showIcon: true
          },
          {
            type: "item",
            href: "/breadcrumb",
            text: "Breadcrumb",
            showText: true
          },
          {
            type: "item",
            href: "/index",
            text: "Getting Started",
            showText: true
          }
        ]
      });
    </script>
```

## 1. Create a Nav Element

First, create a `<nav>` element on the page that will be used to initialize the component.  

```html
    <nav id="breadcrumb"></nav>
```

## 2. Initialize the Breadcrumb

In this step, you will initialize the Breadcrumb from the `<nav>` element. When you initialize the component, all settings of the Breadcrumb will be provided in the script statement. You have to describe its layout, configuration, and event handlers in JavaScript.

```html
    <nav id="breadcrumb"></nav>
    <script>
      $("#breadcrumb").kendoBreadcrumb();
    </script>
```

## 3. Specify the Items

Here, you will specify a list of [`items`](/api/javascript/ui/breadcrumb/configuration/items) to be rendered in Breadcrumb. 

```dojo
    <nav id="breadcrumb"></nav>
    <script>
      $("#breadcrumb").kendoBreadcrumb({
        items: [
          {
            type: "rootitem",
            href: "https://demos.telerik.com/kendo-ui/",
            text: "All Components",
            showText: true,
            showIcon: true
          },
          {
            type: "item",
            href: "/breadcrumb",
            text: "Breadcrumb",
            showText: true
          },
          {
            type: "item",
            href: "/index",
            text: "Getting Started",
            showText: true
          }
        ]
      });
    </script>
```

## 4. Customize the Breadcrumb

In this step, you will apply Breadcrumb configuration settings, such as [`size`](/api/javascript/ui/breadcrumb/configuration/size) and [`rootIcon`](/api/javascript/ui/breadcrumb/configuration/rooticon).

```dojo
    <nav id="breadcrumb"></nav>
    <script>
      $("#breadcrumb").kendoBreadcrumb({
        size: "small", // Apply a 'small' size of the component
        rootIcon: "home", // Specify a 'home' icon to the first item of Breadcrumb path
        items: [
          {
            type: "rootitem",
            href: "https://demos.telerik.com/kendo-ui/",
            text: "All Components",
            showText: true,
            showIcon: true
          },
          {
            type: "item",
            href: "/breadcrumb",
            text: "Breadcrumb",
            showText: true
          },
          {
            type: "item",
            href: "/index",
            text: "Getting Started",
            showText: true
          }
        ]
      });
    </script>
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the Breadcrumb](https://demos.telerik.com/kendo-ui/breadcrumb/index)

## See Also 

* [JavaScript API Reference of the Breadcrumb](/api/javascript/ui/breadcrumb)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
