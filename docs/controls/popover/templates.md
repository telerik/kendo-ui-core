---
title: Templates
page_title: jQuery Popover Documentation - Popover Templates
description: "Learn how to use templates in the Kendo UI for jQuery Popover as its body and header contents."
slug: templates_kendoui_popover_widget
position: 2
---

# Templates

The Kendo UI Popover widget for jQuery allows you to use templates to set its body and header contents.

* [Demo page for the Popover Templates](https://demos.telerik.com/kendo-ui/popover/templates)

Apart from setting the Popover body and header as strings or functions, you can use the [Kendo UI Templates]({% slug overview_kendoui_templatescomponent %}) to render the body and header of the Popover.

The following example demonstrates how to set templates for the Popover body and header.

```dojo
<div id="target" class="k-group">Target</div>
<script>
    $(document).ready(function () {
        $("#target").kendoPopover({
            showOn: "click",
            width: "330px",
            position: "right",
            header: kendo.template($("#header-template").html()),
            body: kendo.template($("#body-template").html()),
        });
    });
</script>

<script id="header-template" type="text/x-kendo-template">
    <h1>Header</h1>
</script>

<script id="body-template" type="text/x-kendo-template">
    <div class="template-wrapper">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
</script>
```

## See Also

* [Basic Usage of the Popover (Demo)](https://demos.telerik.com/kendo-ui/popover/index)
* [Using the API of the Popover (Demo)](https://demos.telerik.com/kendo-ui/popover/api)
* [JavaScript API Reference of the Popover](/api/javascript/ui/popover)



