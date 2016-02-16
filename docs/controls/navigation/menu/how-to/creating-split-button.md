---
title: Create Split Button
page_title: Create Split Button | Kendo UI Menu
description: "Learn how to create a Split button in the Kendo UI Menu widget."
slug: howto_createa_split_button_menu
---

# Create Split Button

The example below demonstrates how to create a Split button using Kendo UI Menu.

###### Example

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

## See Also

Other articles on Kendo UI Menu:

* [Menu JavaScript API Reference](/api/javascript/ui/menu)
* [How to Execute Custom Click Actions Based on Class Name]({% slug howto_execute_custom_click_actions_basedon_classnames_menu %})
* [How to Use FontAwesome Icons]({% slug howto_use_fontawesome_icons_menu %})
