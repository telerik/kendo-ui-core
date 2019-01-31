---
title: Style Hovered Menu Item with CSS
description: An example demonstrating how to set the background color of a hovered Kendo UI Menu item
type: how-to
page_title: Set Background Color of Hovered Menu Item | Kendo UI Menu
slug: menu-color-background-hover-css
tags: menu, color, background, hover, css
ticketid: 1173746
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Menu for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2018.2.620</td>
 </tr>
</table>

## Description

How can I change the background color of a Kendo UI Menu item when a user hovers over it?

## Solution

Setting a different [background color](https://www.w3schools.com/css/css_background.asp) for a Kendo UI Menu item can be achieved using CSS:  
```CSS
  /*specific menu*/
  #specificMenu.k-menu .k-state-hover>.k-link{
    background-color: lightgray;
  }

  /*all menus*/
  .k-menu .k-state-hover>.k-link{
    color: forestgreen;
    background-color: khaki;
  }
```

The following demonstrates two Kendo UI Menus with different styles for hovered items:

```dojo
    <style>
      /*specific menu*/
      #computerMenu.k-menu .k-state-hover>.k-link{
        background-color: pink;
      }

      /*all menus*/
      .k-menu .k-state-hover>.k-link{
        color: forestgreen;
        background-color: khaki;
      }
    </style>

    <div id="example">

      <ul id="computerMenu">
        <li>
          File
          <ul>
            <li>
              New
              <ul>
                <li>Project</li>
                <li>File</li>
              </ul>
            </li>
            <li>
              Open
              <ul>
                <li>Project</li>
                <li>File</li>
              </ul>
            </li>
            <li>
              Exit
            </li>
          </ul>
        </li>
        <li>
          Edit
          <ul>
            <li>
              Go To
              <ul>
                <li>Go To All</li>
                <li>Go To File</li>
              </ul>
            </li>
            <li>
              Find and Replace
              <ul>
                <li>Quick Find</li>
                <li>Quick Replace</li>
              </ul>
            </li>
            <li>
              Undo
            </li>
            <li>
              Redo
            </li>
          </ul>
        </li>
      </ul>

      <br />
      <br />

      <ul id="smallMenu">
        <li>
          One
          <ul>
            <li>
              A
              <ul>
                <li>A1</li>
                <li>A2</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
      <script>
        $(document).ready(function() {
          $("#computerMenu").kendoMenu();
          $("#smallMenu").kendoMenu();
        });
      </script>
    </div>
```

## See Also

* [Demo on Basic Usage of the Kendo UI Menu](https://demos.telerik.com/kendo-ui/menu/index)
* [Background Color on W3Schools](https://www.w3schools.com/css/css_background.asp)
