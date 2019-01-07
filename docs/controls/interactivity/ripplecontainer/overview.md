---
title: Overview
page_title: Overview | Kendo UI RippleContainer
description: "Learn how to initialize the Kendo UI RippleContainer widget and configure its behavior."
slug: overview_kendoui_ripplecontainer_widget
position: 1
---

# RippleContainer Overview

The [Kendo UI RippleContainer widget](http://demos.telerik.com/kendo-ui/ripplecontainer/index) provides [the Material ink ripple effect](https://material.io/design/motion/choreography.html#sequencing) for the Kendo UI components and is compatible only with [the Sass-based Material Theme](https://docs.telerik.com/kendo-ui/styles-and-layout/sass-themes).

The effect gets applied to all components that are located inside the RippleContainer element.

## Getting Started

### Initialize the RippleContainer

To initialize the RippleContainer, use the following example.

```dojo
    <div id="example">
        <button class="k-button">Default Button</button>
    </div>

    <script>
      $(document).ready(function(){
         $("#example").kendoRippleContainer();
      });
    </script>
```

## Configuration

### Elements

By default, the RippleContainer configures the ripple effect to be shown on all supported elements:

* `Buttons`
* `Checkboxes`
* `Radio Buttons`
* `List Items`

When `the elements options` is configured, the ripple effect will show only on the specified elements:

```dojo
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
```

## Reference

### Existing Instances

Make a reference to an existing RippleContainer instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once done, use the [RippleContainer API](/api/web/ripplecontainer) to control its behavior.

The example below demonstrates how to access an existing ProgressBar instance.

```js
var ripple = $("#container").data("kendoRippleContainer");
```

## See Also

Other articles on Kendo UI RippleContainer:

* [RippleContainer JavaScript API Reference](/api/javascript/ui/ripplecontainer)
