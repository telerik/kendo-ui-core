---
title: Remove Scroll Buttons from Menus
description: The scroll buttons of the Kendo UI Menu and Context Menu can be hidden using CSS.
type: how-to
page_title: Hide Scroll Buttons | Kendo UI Menu for jQuery
slug: menu-contextmenu-remove-scroll-buttons
position: 
tags: menu, contextmenu, scroll, buttons, remove, hide, navigation
ticketid: 1442750
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2019.3.1023</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Progress® Kendo UI® Menu, Progress® Kendo UI® ContextMenu</td>
		</tr>
	</tbody>
</table>


## Description
In my Kendo UI Menu, I'd like to have it scrollable without the scroll buttons visible.  How can I get this behavior?

## Solution
In order to hide the scroll buttons, add a new class to the Kendo UI ContextMenu and use CSS to hide the elements.

```html
        <ul id="menu" class="noScrollButtons" style="width:400px">
          <li>
             <!--content-->
          </li>
        </ul>
```

Using the ```important``` selector with the specific class will make the scrollbars hidden only to the applied menus.  

```css
      .noScrollButtons ~ span.k-menu-scroll-button.k-scroll-down,
      .noScrollButtons ~ span.k-menu-scroll-button.k-scroll-up, 
      .noScrollButtons ~ span.k-menu-scroll-button.k-scroll-left,
      .noScrollButtons ~ span.k-menu-scroll-button.k-scroll-right {
        display: none !important;
      }
```

#### Example

```dojo
        <h4>Horizontal</h4>
        <ul id="horizontalMenu" class="noScrollButtons" style="width:400px">
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
        </ul>

        <h4 style="padding-top:2em; margin-top:30px">Vertical</h4>

        <ul id="verticalMenu"  class="noScrollButtons" style="width:100px; height:150px;">
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
          <li>News</li>
          <li>About us</li>
        </ul>

        <h4>Focus</h4>
        <ul class="keyboard-legend">
          <li>
            <span class="button-preview">
              <span class="key-button leftAlign">Alt</span>
              +
              <span class="key-button">W</span>
            </span>
            <span class="button-descr">
              focuses vertical menu (clicking on it or tabbing also work)
            </span>
          </li>
          <li>
            <span class="button-preview">
              <span class="key-button leftAlign">Alt</span>
              +
              <span class="key-button">Q</span>
            </span>
            <span class="button-descr">
              focuses the horizontal menu (clicking on it or tabbing also work)
            </span>
          </li>
        </ul>

    <script>
      $(document.body).keydown(function(e) {
        if (e.altKey && e.keyCode == 87) {
          $("#verticalMenu").focus();
        } else if (e.altKey && e.keyCode == 81) {
          $("#horizontalMenu").focus();
        }
      });

      $(document).ready(function() {
        $("#horizontalMenu").kendoMenu({
          scrollable: true
        });

        $("#verticalMenu").kendoMenu({
          scrollable: true,
          orientation: "vertical"
        });
      });
    </script>

    <style>
      .noScrollButtons ~ span.k-menu-scroll-button.k-scroll-down,
      .noScrollButtons ~ span.k-menu-scroll-button.k-scroll-up, 
      .noScrollButtons ~ span.k-menu-scroll-button.k-scroll-left,
      .noScrollButtons ~ span.k-menu-scroll-button.k-scroll-right {
        display: none !important;
      }
    </style>
```
