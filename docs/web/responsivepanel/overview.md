---
title: Overview
page_title: Overview of ResponsivePanel UI widget | Kendo UI Documentation
description: Quick steps to help you use the Kendo UI ResponsivePanel.
position: 1
---

# ResponsivePanel Overview

The ReponsivePanel widget allows you to hide part of the content of the page on small screens.
This allows more screen estate for content for mobile users.

> CSS3 media queries are supported in IE9 and above, so this widget does not support IE7 and IE8.

## Configuring the ResponsivePanel

You can specify the page width when the content will become hidden via the breakpoint configuration option, and the placement of the expandable content via the orientation configuration option.

#### Collapse menu on the left on small screens

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
