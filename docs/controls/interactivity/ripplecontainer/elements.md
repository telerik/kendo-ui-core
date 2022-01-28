---
title: Elements
page_title: jQuery RippleContainer Documentation | Elements
description: "Get started with the jQuery RippleContainer by Kendo UI and apply the ripple effect to specific elements."
slug: elements_kendoui_ripplecontainer
position: 2
---

# Elements

By default, the RippleContainer renders the ripple effect to all elements it supports such as buttons, checkboxes, radio buttons, and list items.

When the `elements` option is configured, the ripple effect is displayed only for the specified elements.

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

## See Also

* [Basic Usage of the RippleContainer (Demo)](https://demos.telerik.com/kendo-ui/ripplecontainer/index)
* [JavaScript API Reference of the RippleContainer](/api/javascript/ui/ripplecontainer)
