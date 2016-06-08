---
title: Disable TabStrip Content Scrolling
page_title: Disable TabStrip Content Scrolling | Kendo UI TabStrip
description: "Learn how to disable the content scrolling of the TabStrip."
slug: howto_disablecontentscrolling_tabstrip
---

# Disable TabStrip Content Scrolling

The TabStrip content containers are scrollable by default. This allows the widget to display scrollbars if it has a fixed height and holds large content that cannot fit. If needed, it is possible to disable the TabStrip content scrolling. This helps in scenarios where the TabStrip hosts a widget, such as a Menu, that needs to overflow outside the TabStrip.

The milestones of the approach are:

* Apply an `overflow:visible` CSS style to the `div.k-content` elements that hold each TabStrip tab content.
* The `.k-content` class is used by other widgets too. Make sure the CSS selector targets only the appropriate elements.

The example below demonstrates how to disable content scrolling for a specific TabStrip instance only by using its ID in the CSS selector.

###### Example

```html
    <div id="tabstrip1">
      <ul>
        <li class="k-state-active">
          First tab
        </li>
        <li>
          Second tab
        </li>
      </ul>
      <div style="height:100px">
        <p>Container is scrollable, the Menu group will open inside the TabStrip.</p>
            <ul id="menu1">
                <li>
                    First Item
                    <ul>
                        <li>Sub Item 1</li>
                        <li>Sub Item 2</li>
                        <li>Sub Item 3</li>
                        <li>Sub Item 4</li>
                    </ul>
                </li>
            </ul>        
      </div>
      <div>Second content container</div>
    </div>

    <br /><br />

    <div id="tabstrip2">
      <ul>
        <li class="k-state-active">
          First tab
        </li>
        <li>
          Second tab
        </li>
      </ul>
      <div style="height:100px">
        <p>Container is not scrollable, the Menu group will open outside the TabStrip.</p>
            <ul id="menu2">
                <li>
                    First Item
                    <ul>
                        <li>Sub Item 1</li>
                        <li>Sub Item 2</li>
                        <li>Sub Item 3</li>
                        <li>Sub Item 4</li>
                    </ul>
                </li>
            </ul>
      </div>
      <div>Second content container</div>
    </div>

    <style>

      #tabstrip2 > .k-content {
        overflow: visible;
      }

    </style>

    <script>

      $(function() {
        $("#tabstrip1").kendoTabStrip();
        $("#menu1").kendoMenu();

        $("#tabstrip2").kendoTabStrip();
        $("#menu2").kendoMenu();
      });

    </script>
```

## See Also

Other articles on Kendo UI TabStrip:

* [TabStrip JavaScript API Reference](/api/javascript/ui/tabstrip)
* [How to Expand to 100% Height and Auto-Resize]({% slug howto_expandto100percentheightautoresize_tabstrip %})
* [How to Add Close Button to Tabs]({% slug howto_addclosebuttontotabs_tabstrip %})
* [How to Display Buttons at the Bottom]({% slug howto_displaybuttonsatthebottom_tabstrip %})
* [How to Initialize the Grid in Kendo UI TabStrip]({% slug initialize_thegrid_tabstrip_widget %})
* [How to Scroll TabStrip with Keyboard]({% slug howto_scrolltabstripwithkeyboard_tabstrip %})
