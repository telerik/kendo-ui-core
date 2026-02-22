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


<div class="meta-api-description">
How to specify target elements for ripple animation in Kendo UI? Control and customize where the ripple animation appears by specifying a list or array of target elements to apply the ripple effect, enabling precise scoping to buttons, checkboxes, radio buttons, list items, or any configured elements, allowing developers to enable, restrict, or configure ripple animations on selected DOM elements rather than having the effect automatically on all supported controls, offering flexibility to set, limit, or target ripple visuals on specific components for interactive feedback customization.
</div>

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