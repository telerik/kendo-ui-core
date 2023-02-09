---
title: Scroll the TabStrip with the Keyboard
page_title: Scroll the TabStrip with the Keyboard
description: "Learn how to vertically scroll the Kendo UI TabStrip widget by using the keyboard navigation."
slug: howto_scrolltabstripwithkeyboard_tabstrip
previous_url: /controls/navigation/tabstrip/how-to/vertical-keyboard-scroll
tags: telerik, kendo, jquery, tabstrip, scroll, with, keyboard, use, vertical, scrolling
component: tabstrip
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® TabStrip for jQuery</td>
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

How can I implement vertical scrolling with the keyboard in a Kendo UI for jQuery TabStrip?

## Solution

To work properly, keyboard navigation requires a focused element. Non-form elements normally do not receive focus. 

To overcome this, the TabStrip `<div>` wrapper provides a `tabindex` attribute. Logically, the `Left Arrow` and `Right Arrow` keys switch the active tab. The `Up Arrow` and `Down Arrow` keys do the same as this is what accessibility standards require. 

When the TabStrip [wrapper](/framework/widgets/wrapper-element) has the focus, and its active content container is scrollable, then the `Up Arrow` and `Down Arrow` keys do not scroll the container even if the widget ignores these keystrokes. This behavior is applied because the focused element is a parent of the scrollable one and the browser has no idea that it is supposed to scroll the child element in this situation.

It is not possible to make the scrollable content container become focused. Even if you add a `tabindex` attribute to it and scrolling with the `Up Arrow` and `Down Arrow` keys starts working, the TabStrip keyboard navigation is completely non-functional. This behavior is acquired because the Kendo UI TabStrip handles key events only if its wrapper is the focused element. The idea behind this behavior is that the widget is not supposed to interfere with the keyboard navigation of nested form elements, child widgets, and so on.

To vertically scroll the TabStrip content containers with the help of the keyboard, use the following approach:

1. Drop the keyboard navigation of the TabStrip altogether by removing the wrapper `tabindex` after the widget is initialized. In this way, the TabStrip will not be able to receive focus and capture keyboard events.

    $("#tabstrip").kendoTabStrip();
    $("#tabstrip").removeAttr("tabindex");

1. Scroll the container by using JavaScript.

The following example demonstrates how to implement the suggested approach. 

```dojo
    <style>

        #tabstrip > .k-content
        {
            height: 200px;
            overflow: auto;
        }

    </style>

    <div id="tabstrip">
        <ul>
            <li class="k-active">
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
                // kendo.keys is documented at https://docs.telerik.com/kendo-ui/api/javascript/kendo#fields-keys
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

* [TabStrip JavaScript API Reference](/api/javascript/ui/tabstrip)
* [How to Expand to 100% Height and Auto-Resize]({% slug howto_expandto100percentheightautoresize_tabstrip %})
* [How to Save Content Scroll Position]({% slug howto_savecontentscrollposition_tabstrip %})


