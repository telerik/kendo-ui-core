---
title: Creating Split Button
page_title: Creating Split Button
description: Creating Split Button.
---

# Creating Split Button. 

The example below demonstrates how to create a Split Button using Kendo UI Menu.

#### Example:

```html
    <ul id="myMenu">
      <li onclick="defaultitemclick();" class="defaultItem" data-action="1">action 1</li>
      <li class="emptyItem"><span class="empty">&nbsp;</span>
        <ul>
          <li class="item1" onclick="item1click();">Item 1</li>
          <li class="item2" onclick="item2click();">Item 2</li>
          <li class="item3" onclick="item3click();">Item 3</li>
        </ul>
      </li>
    </ul>
    <script>
      function item1click() {
        $(".defaultItem").data("action", "1").children(".k-link").text("action 1");
      }

      function item2click() {
        $(".defaultItem").data("action", "2").children(".k-link").text("action 2");
      }

      function item3click() {
        $(".defaultItem").data("action", "3").children(".k-link").text("action 3");
      }

      function defaultitemclick() {
        alert($(".defaultItem").data("action"));
      }

      $(document).ready(function () {
        $("#myMenu").kendoMenu({
          openOnClick: true
        });
      });
    </script>
    <style>
      html {
        font:12px sans-serif;
      }

      #myMenu {
        display: inline-block;
      }

      #myMenu .emptyItem {
        border-right-width: 0;
      }

      #myMenu .emptyItem > .k-link {
        padding-left: 0 !important;
      }
    </style>
```
