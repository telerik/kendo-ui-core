---
title: Making Kendo UI Responsive Panel Content Overflow Visible
description: Learn how to prevent scrollbars on a Kendo UI Responsive Panel when using a Kendo Menu inside it.
type: how-to
page_title: How to Fix Scrollbars Appearing in Kendo UI Responsive Panel with Menu
slug: prevent-scrollbars-kendo-ui-responsive-panel
tags: kendo ui, responsive panel, overflow, css, menu
res_type: kb
components: ["menu"]
ticketid: 1661761
---

## Environment

| Product | Version |
| --- | --- |
| Kendo UI for jQuery | 2024.3.806 |

## Description

I am seeing an issue with the [ResponsivePanel](https://docs.telerik.com/kendo-ui/api/javascript/ui/responsivepanel) component in Kendo UI for jQuery. There is a Kendo Menu inside the Responsive Panel, but when displaying the horizontal menu, it shows both horizontal and vertical scroll bars when hovering over a menu item. Additionally, the menu group item is not visible due to the Responsive Panel's height being limited to the initial height of the horizontal menu. This occurs because the Kendo UI framework sets the `overflow` to `auto`, which causes scrollbars to appear for the Responsive Panel.

This KB article also answers the following questions:
- How can I prevent scrollbars from appearing in the Kendo UI Responsive Panel?
- How do I make the overflow content of a Kendo UI Responsive Panel visible?
- What CSS changes are needed to display Kendo Menu items properly inside a Kendo UI Responsive Panel?

## Solution

To solve the issue of scrollbars appearing and ensure the Kendo Menu items inside the Responsive Panel are fully visible, apply the following CSS change to the Responsive Panel:

```css
#responsivepanel-id {
    overflow: visible;
}
```

This CSS rule overrides the default `overflow: auto` setting applied by the Kendo UI framework to the Responsive Panel, making all overflow content visible without scrollbars. 

Below is a runnable example:

```dojo
<style>
      #sidebar{
        overflow: visible
      }
    </style>
    <nav id="nav1">
      <button class="k-button" id="btnMenuToggle" data-role="button" role="button" aria-disabled="false" tabindex="0"><span class="km-icon km-drawer-icon"></span></button>
      <div id="sidebar">
        <ul id="mainMenu"></ul>
      </div>

    </nav>
    <script>
      $(document).ready(function() {
        $("#sidebar")
          .kendoResponsivePanel({
          breakpoint: 769,//have this more than 768 since if its 768 then responsive panel will not display at screen width >= 768 rather than screen width > 768
          orientation: "left",
          toggleButton: "#btnMenuToggle"
        })
          .children("#mainMenu").kendoMenu({
          orientation: ($(window).width() > 768 ? "horizontal" : "vertical"),
          direction: "bottom left",
          dataSource: [
            {
              text: "Foo", items: [
                {text: "Qux ddsd sdsdsd dsdsd sdddsdds sdsdsd dsdsdsdsd zzz"},
                {text: "Hi Abc! ddsd sdsdsd dsdsd sdddsdds sdsdsd dsdsdsdsd zzz"},
                {text: "Hi Klm! ddsd sdsdsd dsdsd sdddsdds sdsdsd dsdsdsdsd zzz"},
                {text: "Hi Xyz! ddsd sdsdsd dsdsd sdddsdds sdsdsd dsdsdsdsd zzz"}
              ]
            },
            {text: "Bar"}
          ]
        });
      });
    </script>
```

## Notes

- This solution involves manually overriding the default styles of the Kendo UI Responsive Panel. Please test the changes thoroughly to ensure they do not affect your application's other responsive behaviors or layouts.

## See Also

- [Kendo UI ResponsivePanel API](https://docs.telerik.com/kendo-ui/api/javascript/ui/responsivepanel)
- [Kendo UI Menu API](https://docs.telerik.com/kendo-ui/api/javascript/ui/menu)
