---
title: RippleContainer
page_title: Configuration, methods and events of Kendo UI RippleContainer
description: Configuration options of the RippleContainer UI widget.
res_type: api
component: ripplecontainer
---

# kendo.ui.RippleContainer

Represents the Kendo UI RippleContainer widget. Inherits from [Widget](/api/javascript/ui/widget).

> The RippleContainer widget provides ripple effect for elements only with [the Sass-Based Material Theme](https://docs.telerik.com/kendo-ui/styles-and-layout/sass-themes#sass-based-themes).

## Configuration

### elements `Array`

A JavaScript array that contains the RippleContainer's elements configuration. When configured, the ripple effect will show only on the specified elements. By default the ripple effect will show on all of the supported elements (buttons, checkboxes, radio buttons and list elements).

#### Example - initialize RippleContainer for buttons only

    <div id="container">
        <p>Ripple on Buttons</p>
        <button class="k-button">Default Button</button><br />
    </div>
    <script>
        $("#container").kendoRippleContainer({
            elements: [
                { selector: ".k-button:not(li)" }
            ]
        });
    </script>