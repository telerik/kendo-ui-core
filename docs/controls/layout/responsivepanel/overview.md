---
title: Overview
page_title: jQuery ResponsivePanel Documentation - ResponsivePanel Overview
description: "Try now the Kendo UI for jQuery ResponsivePanel component providing options for hiding parts of the page content when the user is viewing the application on a small screen."
slug: overview_kendoui_responsivepanel_widget
position: 1
---

# {{ site.product }} ResponsivePanel Overview

The Kendo UI ResponsivePanel allows you to hide part of the page content when the user is viewing it on a small screen.

> Only Internet Explorer 9 and later versions support CSS3 media queries.

* [Demo page for the ResponsivePanel](https://demos.telerik.com/kendo-ui/responsive-panel/index)

## Basic Configuration

To specify the page width where the content will become hidden, use the `breakpoint` configuration option of the ResponsivePanel. To define the placement of the expandable content, use the `orientation` option of the component.

The following example demonstrates how to collapse the menu on the left of small screens.

```dojo
  <header>
    <!-- toggle icon, .k-rpanel-toggle hides it on page width > breakpoint -->
    <button class="k-rpanel-toggle"><i class="k-icon k-i-menu"></i></button>

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
        // Handle clicks of dummy items. Actual links do not need this.
        alert($(e.target).text() + " clicked");
        $("#sidebar").kendoResponsivePanel("close");
      });
  </script>

  <style>
    #sidebar {
      /* The panel background has to be set to match the design. */
        background: #092646;
    }

    article {
      /* Clear the floating sidebar. */
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

## Next Steps 

* [Getting Started with the Kendo UI Editor for ResponsivePanel]({% slug getting_started_kendoui_editor_widget %})
* [Basic Usage of the ResponsivePanel (Demo)](https://demos.telerik.com/kendo-ui/responsive-panel/index)

## See Also

* [JavaScript API Reference of the ResponsivePanel](/api/javascript/ui/responsivepanel)
* [Knowledge Base Section](/knowledge-base)
* [jQuery ResponsivePanel Product Page](https://www.telerik.com/kendo-jquery-ui/responsivepanel)
