---
title: Getting Started
page_title: jQuery Menu Documentation - Getting Started with the Menu
description: "Get started with the jQuery Menu by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_menu_widget
position: 1
---

# Getting Started with the Menu

This guide demonstrates how to get up and running with the Kendo UI for jQuery Menu.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <ul id="menu">
    </ul>
    <script>
      $(document).ready(function() {
        $("#menu").kendoMenu({
          dataSource: {
            data: [
              {
                title: "Furniture", items: [
                  { title: "Tables & Chairs" },
                  { title: "Sofas" },
                  { title: "Occasional Furniture" }
                ]
              },
              {
                title: "Decor", items: [
                  { title: "Bed Linen" },
                  { title: "Curtains & Blinds" },
                  { title: "Carpets" }
                ]
              }
            ]
          },
          dataTextField: "title",
          animation: {
            open: { effects: "slideIn:up" }
          },
        });
      });
    </script>
```

## 1. Create an ul Element

First, create an `<ul>` element on the page from which the Menu component will be initialized.

```html
    <ul id="menu"></ul>
```

## 2. Initialize the Menu

In this step, you will initialize the Menu from an `<ul>` element. When you initialize the component, all settings of the component will be provided in the script statement. You have to describe its layout, configuration and event handlers in JavaScript.

```html
    <ul id="menu"></ul>
    <script>
      $("#menu").kendoMenu({});
    </script>
```

## 3. Configure the DataSource

The Menu items can be loaded from a JSON array of data. To use this approach, configure the [`dataSource`]({% slug overview_kendoui_datasourcecomponent %}) setting.

```html
    <ul id="menu"></ul>
    <script>
      $(document).ready(function() {
        $("#menu").kendoMenu({
          dataSource: {
            data: [
              {
                title: "Furniture", items: [
                  { title: "Tables & Chairs" },
                  { title: "Sofas" },
                  { title: "Occasional Furniture" }
                ]
              },
              {
                title: "Decor", items: [
                  { title: "Bed Linen" },
                  { title: "Curtains & Blinds" },
                  { title: "Carpets" }
                ]
              }
            ]
          }
        });
      });
    </script>
```

## 4. Specify the DataTextField

The [`dataTextField`](/api/javascript/ui/menu/configuration/datatextfield) configuration must point to a field in the `dataSource` data.

```html
    <ul id="menu"></ul>
    <script>
      $(document).ready(function() {
        $("#menu").kendoMenu({
          dataSource: {
            data: [
              {
                title: "Furniture", items: [
                  { title: "Tables & Chairs" },
                  { title: "Sofas" },
                  { title: "Occasional Furniture" }
                ]
              },
              {
                title: "Decor", items: [
                  { title: "Bed Linen" },
                  { title: "Curtains & Blinds" },
                  { title: "Carpets" }
                ]
              }
            ]
          },
          dataTextField: "title", // The text of the Menu item will be retrieved from the "title" field in the dataSource.
        });
      });
    </script>
```

## 5. Modify the Animations

The Menu enables you to modify the default open and close [`animations`](/api/javascript/ui/menu/configuration/animation).

```html
    <ul id="menu"></ul>
    <script>
      $(document).ready(function() {
        $("#menu").kendoMenu({
          dataSource: {
            data: [
              {
                title: "Furniture", items: [
                  { title: "Tables & Chairs" },
                  { title: "Sofas" },
                  { title: "Occasional Furniture" }
                ]
              },
              {
                title: "Decor", items: [
                  { title: "Bed Linen" },
                  { title: "Curtains & Blinds" },
                  { title: "Carpets" }
                ]
              }
            ]
          },
          dataTextField: "title",
          animation: {
            open: { effects: "slideIn:up" } // When a Menu item is hovered, the Menu will slide up instead of down.
          },
        });
      });
    </script>
```

## Next Steps 

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %}) 
* [Demo Page for the jQuery Menu](https://demos.telerik.com/kendo-ui/menu/index)

## See Also 

* [JavaScript API Reference of the jQuery Menu](/api/javascript/ui/menu)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>