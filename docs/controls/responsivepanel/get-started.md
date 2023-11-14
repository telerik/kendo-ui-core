---
title: Getting Started
page_title: jQuery ResponsivePanel Documentation - Getting Started with the ResponsivePanel
description: "Get started with the jQuery ResponsivePanel by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_responsivepanel_widget
position: 1
---

# Getting Started with the ResponsivePanel

This guide demonstrates how to get up and running with the Kendo UI for jQuery ResponsivePanel.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <header>
      <button class="toggle-button"><span class="k-icon k-i-menu"></span></button>
      Logo
    </header>

    <nav id="navigation">
      <a href="#">Home</a>
      <a href="#">Products</a>
    </nav>

    <article>
      Content
    </article>

    <script>
      $("#navigation").kendoResponsivePanel({
        orientation: "top",
        toggleButton: ".toggle-button",
        breakpoint: 700
      });
    </script>
```

## 1. Create an input Element

First, create an `<nav>` element on the page that will be used to initialize the component.

```html
    <nav id="navigation">
      <a href="#">Home</a>
      <a href="#">Products</a>
    </nav>
```

## 2. Initialize the ResponsivePanel 

In this step, you will initialize the ResponsivePanel from the `<nav>` element.

```html
    <nav id="navigation">
      <a href="#">Home</a>
      <a href="#">Products</a>
    </nav>

    <script>
      // Target the nav element by using jQuery and then call the kendoResponsivePanel() method.
      $("#navigation").kendoResponsivePanel({
        orientation: "top",
        toggleButton: ".toggle-button",
        breakpoint: 700
      });
    </script>
```

## 3. Apply Basic Configurations

The ResponsivePanel provides several options that enable you to modify its behavior. The following example demonstrates how to apply a top [`orientation`](/api/javascript/ui/responsivepanel/configuration/orientation), a [`toggleButton`](/api/javascript/ui/responsivepanel/configuration/togglebutton), and a [`700`](/api/javascript/ui/responsivepanel/configuration/breakpoint) orientation to the component.

```html
    <nav id="navigation">
      <a href="#">Home</a>
      <a href="#">Products</a>
    </nav>

    <article>
      Content
    </article>

    <script>
      $("#navigation").kendoResponsivePanel({
        orientation: "top",
        toggleButton: ".toggle-button",
        breakpoint: 700
      });
    </script>
```

## Next Steps 

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %}) 
* [Demo Page for the jQuery ResponsivePanel](https://demos.telerik.com/kendo-ui/responsive-panel/index)

## See Also 

* [JavaScript API Reference of the jQuery ResponsivePanel](/api/javascript/ui/responsivepanel)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
