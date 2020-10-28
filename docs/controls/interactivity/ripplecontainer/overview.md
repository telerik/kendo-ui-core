---
title: Overview
page_title: jQuery RippleContainer Documentation | RippleContainer Overview
description: "Get started with the jQuery RippleContainer by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_ripplecontainer_widget
position: 1
---

# RippleContainer Overview

The Kendo UI RippleContainer widget provides [the Material ink ripple effect](https://material.io/design/motion/choreography.html#sequencing) for the Kendo UI components.

The RippleContainer is compatible only with [the SASS-based Material Theme](https://docs.telerik.com/kendo-ui/styles-and-layout/sass-themes). The ripple effect is applied to all components that are located inside the `RippleContainer` element.

* [Demo page for the RippleContainer](https://demos.telerik.com/kendo-ui/ripplecontainer/index)

## Initializing the RippleContainer

The following example demonstrates how to initialize the RippleContainer.

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

## Functionality and Features

The RippleContainer provides a [set of elements]({% slug elements_kendoui_ripplecontainer %}).

## Referencing Existing Instances

To reference an existing RippleContainer instance, use [`jQuery.data()`](https://api.jquery.com/jQuery.data/) and the [RippleContainer API](/api/web/ripplecontainer) to control its behavior.

The following example demonstrates how to access an existing RippleContainer instance.

```js
var ripple = $("#container").data("kendoRippleContainer");
```

## See Also

* [Basic Usage of the RippleContainer (Demo)](https://demos.telerik.com/kendo-ui/ripplecontainer/index)
* [JavaScript API Reference of the RippleContainer](/api/javascript/ui/ripplecontainer)
