---
title: Display tab buttons at the bottom
page_title: Display tab buttons at the bottom
description: Display tab buttons at the bottom
---

# Display tab buttons at the bottom

The following runnable sample demonstrates how to display the tab buttons at the bottom of the widget.

#### Example:

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