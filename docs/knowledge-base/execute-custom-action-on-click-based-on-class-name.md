---
title: Execute Custom Click Actions Based on the Class Name in the Menu
page_title: Execute Custom Click Actions Based on the Class Name in the Menu
description: "Learn how to execute a custom click action depending on the class name of the clicked item in the Kendo UI Menu widget."
slug: howto_execute_custom_click_actions_basedon_classnames_menu
previous_url: /controls/navigation/menu/how-to/execute-custom-action-on-click-based-on-class-name
tags: telerik, kendo, jquery, menu, execute, custom, click, actions, based, on, class, name
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

How can I execute a custom click action based on the class name of the clicked item in the Kendo UI for jQuery Menu?

## Solution

The example below demonstrates how to achieve the desired scenario.


```dojo
    <div id="example">
      <div class="demo-section k-header">

        <h4>Menu with sprites</h4>

        <div id="menu-sprites"></div>

      </div>

      <script>
        var actions = {
          custom: function(item) {
            alert(item.innerHTML);
          },
          custom2: function(item) {
            alert(item.innerHTML);
          },
        };

        var actionRegExp = /a-(\w)*/;

        $("#menu-sprites").kendoMenu({
          dataSource: [{
            text: "Brazil", cssClass: "a-custom", spriteCssClass: "brazilFlag", items: [
              { text: "History", spriteCssClass: "historyIcon" },
              { text: "Geography", spriteCssClass: "geographyIcon" },
            ]
              },
              {
              text: "India", cssClass: "a-custom2", spriteCssClass: "indiaFlag", items: [
              { text: "History", spriteCssClass: "historyIcon" },
              { text: "Geography", spriteCssClass: "geographyIcon" },
            ]
          },
                       {
                         text: "Netherlands", spriteCssClass: "netherlandsFlag", items: [
                           { text: "History", spriteCssClass: "historyIcon" },
                           { text: "Geography", spriteCssClass: "geographyIcon" },
                         ]
                           }],
                         select: function(e) {
                           var item = e.item;
                           var actionClass = actionRegExp.exec(item.className);

                           if (actionClass) {
                             actionClass = actionClass[0].substring(2);
                           }

                           var action = actions[actionClass];

                           if (action) {
                             action(item);
                           }
                         }
                       });
      </script>

      <style scoped>
        .demo-section {
          width: 500px;
        }
        #menu-sprites .k-sprite {
          background-image: url("https://demos.telerik.com/kendo-ui/content/shared/styles/flags.png");
        }
        .brazilFlag {
          background-position: 0 0;
        }
        .indiaFlag {
          background-position: 0 -32px;
        }
        .netherlandsFlag {
          background-position: 0 -64px;
        }
        .historyIcon {
          background-position: 0 -96px;
        }
        .geographyIcon {
          background-position: 0 -128px;
        }
      </style>
    </div>
```

## See Also

* [Menu JavaScript API Reference](/api/javascript/ui/menu)
* [How to Create Split Button]({% slug howto_createa_split_button_menu %})
* [How to Use FontAwesome Icons]({% slug howto_use_fontawesome_icons_menu %})

