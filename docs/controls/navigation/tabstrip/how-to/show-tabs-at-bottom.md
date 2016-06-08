---
title: Display Buttons at the Bottom
page_title: Display Buttons at the Bottom | Kendo UI TabStrip
description: "Learn how to display tab buttons at the bottom of the Kendo UI TabStrip widget."
slug: howto_displaybuttonsatthebottom_tabstrip
---

# Display Buttons at the Bottom

The example below demonstrates how to display the tab buttons at the bottom of the TabStrip widget.

> **Important**
>
> This example is now obsolete unless you are working with a very old Kendo UI version. For recent versions, use the [`tabPosition` property](/api/javascript/ui/tabstrip#configuration-tabPosition) instead.

###### Example

```html
    <style>
        html{font:12px sans-serif;}

        #tabstrip
        {
            position: relative;
            padding-top: 4px;
            padding-bottom: 28px;
        }

        #tabstrip > .k-tabstrip-items
        {
            position: absolute;
            bottom: 4px;
            left: 0;
        }

        #tabstrip > .k-tabstrip-items .k-item
        {
            border-width: 0 1px 1px;
            border-radius: 0 0 4px 4px;
        }

        #tabstrip > .k-tabstrip-items .k-state-active
        {
            margin-top: -1px;
            padding-top: 1px;
            margin-bottom: 0;
            padding-bottom: 0;
        }

        #tabstrip > .k-content
        {
            height: 100px;
            overflow: auto;
        }
    </style>
    <div id="tabstrip">
        <ul>
            <li class="k-state-active">tab 1</li>
            <li>tab 2</li>
        </ul>
        <div>
            Tab container 1<br />1<br />2<br />3<br />4<br />5<br />6<br />7<br />bottom content
        </div>
        <div>
            Tab container 2<br /><br />
        </div>
    </div>
    <script>
        $("#tabstrip").kendoTabStrip({
            animation: {
                open: {
                    effects: "fadeIn"
                }
            }
        });
    </script>
```

## See Also

Other articles on Kendo UI TabStrip:

* [TabStrip JavaScript API Reference](/api/javascript/ui/tabstrip)
* [How to Add Close Button to Tabs]({% slug howto_addclosebuttontotabs_tabstrip %})
* [How to Disable TabStrip Content Scrolling]({% slug howto_disablecontentscrolling_tabstrip %})
* [How to Expand to 100% Height and Auto-Resize]({% slug howto_expandto100percentheightautoresize_tabstrip %})
* [How to Initialize the Grid in Kendo UI TabStrip]({% slug initialize_thegrid_tabstrip_widget %})
* [How to Scroll TabStrip with Keyboard]({% slug howto_scrolltabstripwithkeyboard_tabstrip %})
