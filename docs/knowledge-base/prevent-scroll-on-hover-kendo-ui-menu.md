---
title: Scroll on Click in Kendo UI Menu
description: Learn how to disable the scroll-on-hover feature in the Kendo UI Menu and implement custom scrolling with button clicks.
type: how-to
page_title: How to Scroll on Click in Kendo UI Menu
slug: prevent-scroll-on-hover-kendo-ui-menu
tags: kendo ui, menu, scroll, hover, custom scrolling
res_type: kb
ticketid: 1662811
---

## Environment

| Product | Version |
| --- | --- |
| Menu for Progress® Kendo UI® | 2024.3.806 |

## Description

When hovering over the left or right arrow on the Menu, it automatically scrolls. The requirement is to prevent the Menu from scrolling on hover and enable scrolling only when clicking on the left/right arrow.

This KB article also answers the following questions:
- How can I disable automatic scrolling on hover in the Kendo UI Menu?
- Is it possible to control Kendo UI Menu scrolling with custom buttons?
- How do I add custom scroll buttons to the Kendo UI Menu?

## Solution

To disable the default scrolling behavior on hover and implement custom scrolling with button clicks, follow these steps:

1. Enable [scrolling](/api/javascript/ui/menu/configuration/scrollable) in the Menu but hide the default scroll buttons.
2. Add custom buttons for scrolling.
3. Use the custom buttons to programmatically scroll the Menu.

```javascript
$("#horizontalMenu").kendoMenu({
  scrollable: true
});

var menu = $("#horizontalMenu").data('kendoMenu');
var scrollElement = menu.element;

$('#btn-left').kendoButton({
  icon: 'chevron-left',
  click: function(){
    scrollElement.animate({"scrollLeft": "+=50"}, "fast", "linear");
  }
});

$('#btn-right').kendoButton({
  icon: 'chevron-right',
  click: function(){
    scrollElement.animate({"scrollLeft": "-=50"}, "fast", "linear");
  }
});
```

Ensure to include jQuery and Kendo UI scripts and styles in your page. Additionally, add the custom buttons (`#btn-left` and `#btn-right`) to your page.

For a live demonstration, refer to the following example:

```dojo
<style>
    .test{
      display: flex !important
    }

    .k-menu-scroll-button{
      display: none !important
    }
  </style>
  <body>
    <div class="test">
      <button id="btn-left"></button>
      <div style="width:300px;">

        <ul id="horizontalMenu">
          <li>
            Mens
            <ul>
              <li>Jackets and Coats</li>
              <li>Jeans</li>
              <li>Knitwear</li>
              <li>Shirts</li>
              <li>Belts</li>
              <li>Socks</li>
              <li>Fan Zone</li>
            </ul>
          </li>
          <li>
            Ladies
            <ul>
              <li>Jackets and Coats</li>
              <li>Jeans</li>
              <li>Knitwear</li>
              <li>Shirts</li>
              <li>Belts</li>
              <li>Socks</li>
              <li>Fan Zone</li>
            </ul>
          </li>
          <li>
            Kids
            <ul>
              <li>Jackets and Coats</li>
              <li>Jeans</li>
              <li>Knitwear</li>
              <li>Shirts</li>
              <li>Belts</li>
              <li>Socks</li>
              <li>Fan Zone</li>
            </ul>
          </li>
          <li>Sports</li>
          <li>Brands</li>
          <li>Accessories</li>
          <li>Promotions</li>
          <li>Contacts</li>
          <li>About us</li>
        </ul>       
      </div>
      <button id="btn-right"></button>

    </div>

    <script>
      $(document).ready(function() {
        $("#horizontalMenu").kendoMenu({
          scrollable: true
        });

        var menu = $("#horizontalMenu").data('kendoMenu')
        var scrollElement =  menu.element;

        $('#btn-left').kendoButton({
          icon: 'chevron-left',
          fillMode: "flat",
          themeColor: 'primary',
          click: function(){
            scrollElement.animate({"scrollLeft": "+=50"}, "fast", "linear");
          }
        })

        $('#btn-right').kendoButton({
          icon: 'chevron-right',
          fillMode: "flat",
          themeColor: 'primary',
          click: function(){            
            scrollElement.animate({"scrollLeft": "-=50"}, "fast", "linear");
          }
        })

      });
    </script>

```

## See Also

- [Kendo UI Menu Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/menu)
- [Kendo UI Menu Scrollable Demo](https://demos.telerik.com/kendo-ui/menu/scrollable)
- [Kendo UI Button Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/button)
