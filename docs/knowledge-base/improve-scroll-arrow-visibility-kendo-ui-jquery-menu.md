---
title: Enhancing Scroll Arrow Visibility in Kendo UI for jQuery Menu
description: Learn how to improve the visibility of scroll arrows in the Kendo UI for jQuery Menu component using CSS and JavaScript.
type: how-to
page_title: How to Improve Context Menu Scroll Arrow Visibility in Kendo UI for jQuery
meta_title: Improve Scroll Arrow Visibility in Kendo UI for jQuery Menu
slug: improve-scroll-arrow-visibility-kendo-ui-jquery-menu
tags: kendo-ui-for-jquery, menu, scroll, visibility, css, javascript
res_type: kb
components: ["menu"]
ticketid: 1696902
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td>Kendo UI for jQuery Menu</td>
</tr>
<tr>
<td> Version </td>
<td>2025.3.812</td>
</tr>
</tbody>
</table>

## Description

I find the visibility of scroll arrows in the Kendo UI for jQuery [Menu](https://www.telerik.com/kendo-jquery-ui/documentation/controls/menu/overview) component too low when using the scroll feature. When hovering over the arrows, the color change is minimal, making them hard to notice. Additionally, the current design of the arrows does not intuitively indicate whether more items are available to scroll above or below.

This knowledge base article also answers the following questions:
- How can I make scroll arrows in the Kendo UI for jQuery Menu more visible?
- How to improve the hover effect on Menu scroll arrows?
- How to add intuitive indicators for Kendo UI Menu scroll functionality?

## Solution

To enhance the visibility of scroll arrows in the Kendo UI for jQuery Menu:

1. **Change the color on hover using CSS**:  
   Use the `.k-button-icon:hover` selector to modify the background of the arrow icon when hovered.

   ```css
   .k-button-icon:hover {
       background: pink;
   }
   ```

   This changes the color only when the user hovers over the arrow icon.

2. **Change the color when hovering over the entire scroll button using JavaScript**:
   Use the `.k-menu-scroll-button` class and jQuery's `mouseenter` and `mouseleave` events to dynamically update the styling.

   ```javascript
   activate: function (e) {
       setTimeout(function () {
           $(".k-menu-scroll-button").on("mouseenter", function () {
               $(this).find(".k-icon").css("color", "red"); // Change arrow color to red on hover
           });

           $(".k-menu-scroll-button").on("mouseleave", function () {
               $(this).find(".k-icon").css("color", "initial"); // Reset arrow color on hover out
           });
       }, 200);
   }
   ```

   This approach ensures that the color change applies to the entire scroll button, making the arrows more noticeable.

3. **Demo**:
   Refer to the following for a live demonstration of the solution.

```dojo
 <style>
      #target {
        width: 300px;
        height: 200px;
        border: 1px solid #ccc;
        margin: 50px auto;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f5f5f5;
      }
      /* More noticeable highlight on hover */
      .k-button-icon:hover {
        background: pink;
      }
    </style>
    <div id="target">Click here!</div>

    <ul id="context-menu">
      <li>Parent Item 1</li>
      <li>
        Parent Item 2
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
          <li>Item 4</li>
          <li>Item 5</li>
          <li>Item 6</li>
          <li>Item 7</li>
          <li>Item 8</li>
          <li>Item 9</li>
          <li>Item 10</li>
          <li>Item 11</li>
          <li>Item 12</li>
          <li>Item 13</li>
          <li>Item 14</li>
          <li>Item 15</li>
          <li>Item 16</li>
          <li>Item 17</li>
          <li>Item 18</li>
          <li>Item 19</li>
          <li>Item 20</li>
          <li>Item 21</li>
          <li>Item 22</li>
          <li>Item 23</li>
          <li>Item 24</li>
          <li>Item 25</li>
          <li>Item 26</li>
          <li>Item 27</li>
          <li>Item 28</li>
          <li>Item 29</li>
        </ul>
      </li>
      <li>Help</li>
    </ul>

    <script>
      var isMaster = false;
      var callback = function () {};

      $(document).ready(function () {
        $("#context-menu").kendoContextMenu({
          alignToAnchor: true,
          showOn: "click",
          popupCollision: "fit",
          target: "#target",
          orientation: "vertical",
          scrollable: { enabled: true },

          activate: function (e) {
            setTimeout(function () {
              $(".k-menu-scroll-button").on("mouseenter", function () {
                $(this).find(".k-icon").css("color", "red");
              });

              $(".k-menu-scroll-button").on("mouseleave", function () {
                $(this).find(".k-icon").css("color", "initial");
              });
            }, 200);
          },
        });
      });
    </script>
```

## See Also

- [Kendo UI for jQuery Menu API](https://docs.telerik.com/kendo-ui/api/javascript/ui/menu)
- [Kendo UI for jQuery Menu Overview](https://www.telerik.com/kendo-jquery-ui/documentation/controls/menu/overview)
