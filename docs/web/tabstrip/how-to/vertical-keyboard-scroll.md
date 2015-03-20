---
title: Scroll the TabStrip with the keyboard
page_title: Scroll the TabStrip with the keyboard
description: Scroll the TabStrip with the keyboard
---

# Scroll the TabStrip with the keyboard

Keyboard navigation requires an element to be focused. Non-form elements normally do not receive focus.
To overcome this, the TabStrip wrapper `<div>` has a `tabindex` attribute.

LEFT and RIGHT arrows switch the active tab, which looks logical to everybody. UP and DOWN arrows also do this,
which may not seem logical to everybody, but this is what accessibility standards require.

When the TabStrip [wrapper](/framework/widgets/wrapper-element) has the focus, and its active content container is scrollable, then UP and DOWN arrows will not scroll the container
even if the TabStrip ignores these keystrokes. This is because the focused element is a parent of the scrollable one and the browser
has no idea that it should scroll the child element in this situation. For example, what should the browser do if there are multiple scrollable child elements?

There is a way to make the scrollable content container receive focus - add a `tabindex` attribute to it.
Then scrolling with the UP and DOWN arrows will start working, but TabStrip keyboard navigation will stop working completely.
This is because the TabStrip handles key events only if its wrapper is the focused element.
The idea behind this behavior is that the TabStrip should not interfere with the keyboard navigation of nested form elements, child widgets, etc.

In conclusion, if you want to vertically scroll the TabStrip content containers with the keyboard, you have two options:

* sacrifice the widget's keyboard navigation altogether, by removing the wrapper's `tabindex` after widget initialization.
In this way the TabStrip will not be able to receive focus and capture keyboard events.

        $("#tabstrip").kendoTabStrip();
        $("#tabstrip").removeAttr("tabindex");
* scroll the container with Javascript, as the example below demonstrates

#### Example:

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