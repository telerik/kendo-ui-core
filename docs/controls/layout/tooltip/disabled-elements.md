---
title: Disabled Elements
page_title: jQuery Tooltip Documentation | Disabled Elements
description: "Get started with the jQuery Tooltip by Kendo UI and render it over disabled elements."
slug: disabledelements_kendoui_tooltip
position: 3
---

# Disabled Elements

The Tooltip enables you render it over disabled elements.

While the Tooltip relies on the `mouseenter` and `mouseleave` events to work, disabled elements do not fire events by design. To render the Tooltip over disabled elements, initialize the Tooltip over the parent of the disabled element. Include some empty space between the disabled element and the boundaries of its parent so that the `mouseenter` event can be fired.

```dojo
<style>
.parent {
    display: inline-block;
    border: 1px solid;
    margin: 2em;
    padding: 0.2em;
}
</style>

<div id="example">

  <span id="btn1-parent" class="parent" style="border-color:#f00;">
    <button id="btn1" class="k-button" disabled="disabled">No tooltip</button>
  </span>

  <span id="btn2-parent" class="parent" style="border-color:#0c0;">
    <button id="btn2" class="k-button" disabled="disabled">Tooltip works</button>
  </span>

</div>

<script>
  $(function() {
    $("#btn1, #btn2-parent").kendoTooltip({
      content: "Hello!",
      position: "right"
    });
  });
</script>
```

## See Also

* [Basic Usage of the Tooltip (Demo)](https://demos.telerik.com/kendo-ui/tooltip/index)
* [Using the API of the Tooltip (Demo)](https://demos.telerik.com/kendo-ui/tooltip/api)
* [JavaScript API Reference of the Tooltip](/api/javascript/ui/tooltip)
