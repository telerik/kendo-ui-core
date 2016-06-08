---
title: Scroll TabStrip with Keyboard
page_title: Scroll TabStrip with Keyboard | Kendo UI TabStrip
description: "Learn how to vertically scroll the Knedo UI TabStrip widget using keyboard navigation."
slug: howto_scrolltabstripwithkeyboard_tabstrip
---

# Scroll TabStrip with Keyboard

Keyboard navigation requires an element to be focused. Non-form elements normally do not receive focus. To overcome this, the TabStrip `<div>` wrapper has a `tabindex` attribute. Logically, `Left Arrow` and `Right Arrow` keys switch the active tab. `Up Arrow` and `Down Arrow` keys do the same as this is what accessibility standards require. When the TabStrip [wrapper](/framework/widgets/wrapper-element) has the focus, and its active content container is scrollable, then the `Up Arrow` and `Down Arrow` keys do not scroll the container even if the widget ignores these keystrokes. This is because the focused element is a parent of the scrollable one and the browser has no idea that it is supposed to scroll the child element in this situation.

There is a way to make the scrollable content container become focused: add a `tabindex` attribute to it. Then, scrolling with the `Up Arrow` and `Down Arrow` keys start working, but TabStrip keyboard navigation completely stops working. This is because Kendo UI TabStrip handles key events only if its wrapper is the focused element. The idea behind this behavior is that the widget is not supposed to interfere with the keyboard navigation of nested form elements, child widgets, etc.

To vertically scroll the TabStrip content containers with the help of the keyboard, do the following:

**Step 1.** Drop the keyboard navigation of the TabStrip altogether by removing the wrapper's `tabindex` after widget initialization. In this way the TabStrip is not able to receive focus and capture keyboard events.

        $("#tabstrip").kendoTabStrip();
        $("#tabstrip").removeAttr("tabindex");

**Step 2.** Scroll the container using Javascript, as the example below demonstrates.

###### Example

```html
    <style>

        #tabstrip > .k-content
        {
            height: 200px;
            overflow: auto;
        }

    </style>

    <div id="tabstrip">
        <ul>
            <li class="k-state-active">
                One
            </li>
            <li>
                Two
            </li>
        </ul>
        <div>
            1<br /><br /><br />2<br /><br /><br />3<br /><br /><br />4<br /><br /><br />
            5<br /><br /><br />6<br /><br /><br />7<br /><br /><br />8<br /><br /><br />
        </div>
        <div>
            1<br /><br /><br />2<br /><br /><br />3<br /><br /><br />4<br /><br /><br />
            5<br /><br /><br />6<br /><br /><br />7<br /><br /><br />8<br /><br /><br />
        </div>
    </div>

    <script>
        $(document).ready(function () {
            // this handler should be attached before the TabStrip is initialized!
            $("#tabstrip").on("keydown", function (e) {
                // kendo.keys is documented at http://docs.telerik.com/kendo-ui/api/javascript/kendo#fields-keys
                if (e.keyCode == kendo.keys.DOWN || e.keyCode == kendo.keys.UP) {
                    // prevent the built-in TabStrip keyboard navigation
                    e.stopImmediatePropagation();
                    // prevent page scroll
                    e.preventDefault();
                    // get the visible TabStrip container
                    var visibleContainer = $(e.target).data("kendoTabStrip").wrapper.children(".k-content").filter(":visible");
                    if (e.keyCode == kendo.keys.DOWN) {
                        visibleContainer.scrollTop(visibleContainer.scrollTop() + 50);
                    } else {
                        visibleContainer.scrollTop(visibleContainer.scrollTop() - 50);
                    }
                }
            });

            $("#tabstrip").kendoTabStrip({
                animation: {
                    open: {
                        // the default expand animation should be replaced or disabled
                        // when the TabStrip containers have an explicit height
                        effects: "fadeIn"
                    }
                }
            });

            $("#tabstrip").focus();

        });
    </script>
```

## See Also

Other articles on Kendo UI TabStrip:

* [TabStrip JavaScript API Reference](/api/javascript/ui/tabstrip)
* [How to Add Close Button to Tabs]({% slug howto_addclosebuttontotabs_tabstrip %})
* [How to Disable TabStrip Content Scrolling]({% slug howto_disablecontentscrolling_tabstrip %})
* [How to Display Buttons at the Bottom]({% slug howto_displaybuttonsatthebottom_tabstrip %})
* [How to Expand to 100% Height and Auto-Resize]({% slug howto_expandto100percentheightautoresize_tabstrip %})
* [How to Initialize the Grid in Kendo UI TabStrip]({% slug initialize_thegrid_tabstrip_widget %})
