---
title: Create a Split Button in the Menu
page_title: Create a Split Button in the Menu
description: "Learn how to create a Split button in the Kendo UI Menu widget."
slug: howto_createa_split_button_menu
previous_url: /controls/navigation/menu/how-to/creating-split-button
tags: telerik, kendo, jquery, menu, create, a, split, button
component: menu
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Menu for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I create a Split button in the Kendo UI for jQuery Menu?

## Solution

The example below demonstrates how to achieve the desired scenario.


```dojo
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
        width: fit-content;
      }
      #myMenu .emptyItem {
        border-right-width: 0;
      }
      #myMenu .emptyItem > .k-link {
        padding-left: 0 !important;
      }
    </style>
```

## See Also

* [Menu JavaScript API Reference](/api/javascript/ui/menu)
* [How to Execute Custom Click Actions Based on Class Name]({% slug howto_execute_custom_click_actions_basedon_classnames_menu %})
* [How to Use FontAwesome Icons]({% slug howto_use_fontawesome_icons_menu %})


