---
title: Overview
page_title: Overview | Kendo UI ResponsivePanel
description: "Learn how to initialize the Kendo UI ResponsivePanel widget and configure its behaviors."
slug: overview_kendoui_responsivepanel_widget
position: 1
---

# ResponsivePanel Overview

The [Kendo UI ReponsivePanel widget](http://demos.telerik.com/kendo-ui/responsive-panel/index) allows you to hide part of a page content on small screens. This allows more space for content on mobile screens.

> **Important**  
>
> CSS3 media queries are supported in Internet Explorer 9 and later versions. This means that Kendo UI ResponsivePanel does not support Internet Explorer 7 and Internet Explorer 8.

## Configuration

### Specify Width and Placement

Specify the page width when the content becomes hidden via the `breakpoint` configuration option. The placement of the expandable content can be configured via the `orientation` option.

The example below demonstrates how to collapse the menu on the left of small screens.

###### Example

```html
  <header>
    <!-- toggle icon, .k-rpanel-toggle hides it on page width > breakpoint -->
    <button class="k-rpanel-toggle"><i class="k-icon k-i-hbars"></i></button>

    <h1>Site header</h1>
  </header>

  <!-- responsive panel -->
  <nav id="sidebar">
    <a href="#">Home</a>
    <a href="#">About</a>
  </nav>

  <article id="content">
    <p>Lorem ipsum<p>
  </article>

  <script>
    $("#sidebar")
      .kendoResponsivePanel({
        breakpoint: 768,
        orientation: "left"
      })
      .on("click", "a", function(e) {
        // handle clicks of dummy items, actual links do not need this
        alert($(e.target).text() + " clicked");
        $("#sidebar").kendoResponsivePanel("close");
      });
  </script>

  <style>
    #sidebar {
      /* panel background should be set to match design */
        background: #092646;
    }

    article {
      /* clear the floating sidebar */
      overflow: hidden;
    }

    html, body {
        margin: 0;
      padding: 0;
    }
    body {
        font-family: Arial,sans-serif;
    }
    header {
        padding: 1em;
        color: #fff;
      background-image: linear-gradient(to top, #014F80 0%, #092646 100%);
    }

    h1 { display: inline; }
    p { padding: 2em; }
    nav a {
        border: 1px solid #ccc;
      background: #ddd;
      display: block;
      text-decoration: none;
      padding: .5em;
    }
  </style>
```

## See Also

Other articles on Kendo UI ResponsivePanel:

* [ResponsivePanel JavaScript API Reference](/api/javascript/ui/responsivepanel)
