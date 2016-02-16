---
title: Execute Custom Click Actions Based on Class Name
page_title: Execute Custom Click Actions Based on Class Name | Kendo UI Menu
description: "Learn how to execute a custom click action depending on the class name of the clicked item in the Kendo UI Menu widget."
slug: howto_execute_custom_click_actions_basedon_classnames_menu
---

# Execute Custom Click Actions Based on Class Name

The example below demonstrates how to execute a custom click action based on the class name of the clicked item.

###### Example

```html
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
          background-image: url("../content/shared/styles/flags.png");
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

Other articles on Kendo UI Menu:

* [Menu JavaScript API Reference](/api/javascript/ui/menu)
* [How to Create Split Button]({% slug howto_createa_split_button_menu %})
* [How to Use FontAwesome Icons]({% slug howto_use_fontawesome_icons_menu %})
